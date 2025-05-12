
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Loader2, Save, RefreshCw, X } from 'lucide-react';

interface ProductFormData {
  name: string;
  description: string;
  image: string;
  categories: string[];
  categoryType: string;
  isNew: boolean;
}

interface Category {
  id: string;
  name: string;
  type?: string;
}

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    image: '',
    categories: [],
    categoryType: 'fasteners',
    isNew: false
  });
  
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [imagePreviewError, setImagePreviewError] = useState('');
  
  useEffect(() => {
    fetchCategories();
    
    if (isEditing && id) {
      fetchProductDetails(id);
    }
  }, [isEditing, id]);
  
  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, 'categories');
      const snapshot = await getDocs(categoriesCollection);
      const categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      
      // Sort categories by name
      const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
      setAvailableCategories(sortedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load categories. Please try again.",
      });
    }
  };
  
  const fetchProductDetails = async (productId: string) => {
    try {
      setIsLoading(true);
      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        const productData = productSnap.data() as ProductFormData;
        setFormData(productData);
        setSelectedCategories(productData.categories || []);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Product not found.",
        });
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load product details. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Product description is required";
    }
    
    if (!formData.image.trim()) {
      errors.image = "Product image URL is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear validation error when field is updated
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      const productData = {
        ...formData,
        categories: selectedCategories,
        updatedAt: serverTimestamp(),
      };
      
      if (isEditing && id) {
        // Update existing product
        await setDoc(doc(db, 'products', id), productData, { merge: true });
        toast({
          title: "Product updated",
          description: "The product has been successfully updated.",
        });
      } else {
        // Create new product
        const productRef = await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp(),
        });
        toast({
          title: "Product created",
          description: "The new product has been successfully created.",
        });
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} product. Please try again.`,
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleImageError = () => {
    setImagePreviewError('Unable to load image preview. Please check the URL.');
  };

  const handleImageLoad = () => {
    setImagePreviewError('');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
          <p className="text-industry-700 mt-2">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/admin/products')}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-industry-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-gray-600">
            {isEditing
              ? 'Update the details of an existing product'
              : 'Create a new product in your inventory'}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={formErrors.name ? "text-red-500" : ""}>
                Product Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className={formErrors.name ? "border-red-500 focus:ring-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image" className={formErrors.image ? "text-red-500" : ""}>
                Product Image URL *
              </Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                className={formErrors.image ? "border-red-500 focus:ring-red-500" : ""}
              />
              {formErrors.image && (
                <p className="text-red-500 text-sm">{formErrors.image}</p>
              )}
              {formData.image && (
                <div className="mt-2 relative">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className={`max-w-[200px] h-auto rounded-md border ${imagePreviewError ? 'hidden' : 'block'}`}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                  {imagePreviewError && (
                    <div className="flex items-center space-x-2 text-red-500 text-sm">
                      <X size={16} />
                      <span>{imagePreviewError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoryType">Product Type *</Label>
              <Select
                value={formData.categoryType}
                onValueChange={(value) => setFormData({ ...formData, categoryType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fasteners">Fasteners</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNew"
                checked={formData.isNew}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, isNew: checked === true })
                }
              />
              <Label htmlFor="isNew" className="cursor-pointer">
                Mark as new product
              </Label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description" className={formErrors.description ? "text-red-500" : ""}>
                Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={5}
                className={formErrors.description ? "border-red-500 focus:ring-red-500" : ""}
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm">{formErrors.description}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Categories</Label>
                {selectedCategories.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedCategories.length} selected
                  </span>
                )}
              </div>
              <div className="border rounded-md p-4 h-[200px] overflow-y-auto">
                {availableCategories.length > 0 ? (
                  <div className="space-y-2">
                    {availableCategories.map((category) => (
                      <div className="flex items-center space-x-2" key={category.id}>
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <Label 
                          htmlFor={`category-${category.id}`} 
                          className="cursor-pointer flex-grow"
                        >
                          {category.name}
                        </Label>
                        {category.type && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            category.type === 'electrical' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {category.type}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-2 text-gray-500">
                    <RefreshCw size={20} />
                    <p className="text-center">No categories available</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={fetchCategories}
                      className="mt-2"
                    >
                      Refresh Categories
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            disabled={isSaving}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSaving}
            className="bg-electric-600 hover:bg-electric-700 transition-colors"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Update Product' : 'Create Product'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
