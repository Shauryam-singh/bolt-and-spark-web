
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
import { ArrowLeft, Loader2 } from 'lucide-react';

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
      
      setAvailableCategories(categories);
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    
    if (!formData.name || !formData.description || !formData.image) {
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
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
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
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Product Image URL *</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                required
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="max-w-[200px] h-auto rounded-md border"
                  />
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Categories</Label>
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
                        <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No categories available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
