
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertCircle, Edit, Trash, Plus, Loader2, Search, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  type: string;
  createdAt?: any;
}

const CategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isDeleting, setIsDeleting] = useState<{[key: string]: boolean}>({});

  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'fasteners'
  });
  
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const [errors, setErrors] = useState({
    name: '',
  });
  
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    // Filter categories based on search term and type
    let filtered = categories;
    
    // Filter by type if not 'all'
    if (filterType !== 'all') {
      filtered = filtered.filter(category => category.type === filterType);
    }
    
    // Then filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        category => category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCategories(filtered);
  }, [searchTerm, categories, filterType]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
      
      // Sort categories by name
      categoriesList.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(categoriesList);
      setFilteredCategories(categoriesList);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load categories. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateCategory = (category: {name: string, type: string}) => {
    const newErrors = { name: '' };
    let isValid = true;
    
    if (!category.name.trim()) {
      newErrors.name = 'Category name is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleAddCategory = async () => {
    if (!validateCategory(newCategory)) {
      return;
    }

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, 'categories'), {
        name: newCategory.name.trim(),
        type: newCategory.type,
        createdAt: serverTimestamp()
      });

      setNewCategory({ name: '', type: 'fasteners' });
      setDialogOpen(false);
      await fetchCategories();

      toast({
        title: "Category added",
        description: "The category has been successfully added.",
      });
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add the category. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editCategory || !validateCategory(editCategory)) {
      return;
    }

    try {
      setIsSubmitting(true);
      const categoryRef = doc(db, 'categories', editCategory.id);
      await updateDoc(categoryRef, {
        name: editCategory.name.trim(),
        type: editCategory.type,
        updatedAt: serverTimestamp()
      });

      setEditCategory(null);
      setEditDialogOpen(false);
      await fetchCategories();

      toast({
        title: "Category updated",
        description: "The category has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update the category. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        setIsDeleting(prev => ({ ...prev, [id]: true }));
        await deleteDoc(doc(db, 'categories', id));
        setCategories(categories.filter(category => category.id !== id));
        
        toast({
          title: "Category deleted",
          description: "The category has been successfully deleted.",
        });
      } catch (error) {
        console.error('Error deleting category:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete the category. Please try again.",
        });
      } finally {
        setIsDeleting(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-industry-900">Categories</h2>
          <p className="text-gray-600">Manage your product categories</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-electric-600 hover:bg-electric-700 transition-colors">
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for your products.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
                  Category Name
                </Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => {
                    setNewCategory({ ...newCategory, name: e.target.value });
                    setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Enter category name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                    <AlertCircle size={14} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Category Type</Label>
                <Select
                  value={newCategory.type}
                  onValueChange={(value) => setNewCategory({ ...newCategory, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fasteners">Fasteners</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                setErrors({ name: '' });
              }} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} disabled={isSubmitting} className="bg-electric-600 hover:bg-electric-700">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the selected category.
              </DialogDescription>
            </DialogHeader>
            
            {editCategory && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className={errors.name ? "text-red-500" : ""}>
                    Category Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={editCategory.name}
                    onChange={(e) => {
                      setEditCategory({ ...editCategory, name: e.target.value });
                      setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Enter category name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                      <AlertCircle size={14} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Category Type</Label>
                  <Select
                    value={editCategory.type}
                    onValueChange={(value) => setEditCategory({ ...editCategory, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fasteners">Fasteners</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setEditDialogOpen(false);
                setErrors({ name: '' });
              }} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory} disabled={isSubmitting} className="bg-electric-600 hover:bg-electric-700">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select
            value={filterType}
            onValueChange={setFilterType}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="fasteners">Fasteners</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(searchTerm || filterType !== 'all') && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
            }}
            className="h-10"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
            <p className="text-industry-700 mt-2">Loading categories...</p>
          </div>
        </div>
      ) : (
        <>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No categories found matching your criteria.</p>
              {(searchTerm || filterType !== 'all') && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-md border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id} className="group hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.type === 'electrical' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {category.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditCategory(category);
                              setEditDialogOpen(true);
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteCategory(category.id)}
                            disabled={isDeleting[category.id]}
                          >
                            {isDeleting[category.id] ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesManager;
