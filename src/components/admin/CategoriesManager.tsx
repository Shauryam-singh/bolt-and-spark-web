
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
import { Edit, Trash, Plus, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  type: string;
  createdAt?: any;
}

const CategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'fasteners'
  });
  
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Category name is required.",
      });
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
    if (!editCategory || !editCategory.name.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Category name is required.",
      });
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
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for your products.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
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
              <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the selected category.
              </DialogDescription>
            </DialogHeader>
            
            {editCategory && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Category Name</Label>
                  <Input
                    id="edit-name"
                    value={editCategory.name}
                    onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                    placeholder="Enter category name"
                  />
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
              <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
        </div>
      ) : (
        <>
          {categories.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No categories found.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
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
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-600"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash className="h-4 w-4" />
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
