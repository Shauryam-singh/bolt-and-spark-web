
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Trash, Edit, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  // New category dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('fasteners');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});
  
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on search term and filter type
    let filtered = categories;
    
    // Filter by type if not 'all'
    if (filterType !== 'all') {
      filtered = filtered.filter(category => category.type === filterType);
    }
    
    // Then filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        category => category.name.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredCategories(filtered);
  }, [searchTerm, categories, filterType]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoriesRef = collection(db, 'categories');
      const snapshot = await getDocs(categoriesRef);
      const categoriesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Category));
      
      // Sort by type and then by name
      categoriesList.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type.localeCompare(b.type);
        }
        return a.name.localeCompare(b.name);
      });
      
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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category? This may affect products that use this category.')) {
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

  const handleAddEdit = async () => {
    // Validate
    if (!categoryName.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Category name is required.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (dialogMode === 'add') {
        // Add new category
        const categoriesRef = collection(db, 'categories');
        await addDoc(categoriesRef, {
          name: categoryName.trim(),
          type: categoryType,
          createdAt: serverTimestamp()
        });
        
        toast({
          title: "Success",
          description: "Category has been added successfully.",
        });
      } else if (dialogMode === 'edit' && currentCategory) {
        // Update existing category
        const categoryRef = doc(db, 'categories', currentCategory.id);
        await updateDoc(categoryRef, {
          name: categoryName.trim(),
          type: categoryType,
          updatedAt: serverTimestamp()
        });
        
        toast({
          title: "Success",
          description: "Category has been updated successfully.",
        });
      }
      
      // Close dialog and refresh list
      setShowDialog(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error adding/editing category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${dialogMode === 'add' ? 'add' : 'update'} category. Please try again.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddDialog = () => {
    setDialogMode('add');
    resetForm();
    setShowDialog(true);
  };

  const openEditDialog = (category: Category) => {
    setDialogMode('edit');
    setCurrentCategory(category);
    setCategoryName(category.name);
    setCategoryType(category.type);
    setShowDialog(true);
  };

  const resetForm = () => {
    setCurrentCategory(null);
    setCategoryName('');
    setCategoryType('fasteners');
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
      >
        <div>
          <h2 className="text-3xl font-bold text-industry-900">Categories</h2>
          <p className="text-gray-600">Manage product categories</p>
        </div>
        <Button 
          onClick={openAddDialog}
          className="bg-electric-600 hover:bg-electric-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
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
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
            <p className="text-industry-700 mt-2">Loading categories...</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-industry-100 rounded-full mb-4">
                <FileText size={24} className="text-industry-500" />
              </div>
              <p className="text-gray-500 mb-4">No categories found.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-md border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Type</TableHead>
                      {!isMobile && <TableHead>Created</TableHead>}
                      <TableHead className="w-[120px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredCategories.map((category) => (
                        <motion.tr 
                          key={category.id}
                          initial={{ opacity: 0, backgroundColor: '#f3f4f6' }}
                          animate={{ opacity: 1, backgroundColor: '#ffffff' }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="group hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                category.type === 'electrical'
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                              }
                            >
                              {category.type}
                            </Badge>
                          </TableCell>
                          {!isMobile && (
                            <TableCell>
                              {category.createdAt?.toDate ? 
                                new Date(category.createdAt.toDate()).toLocaleDateString() : 
                                'N/A'
                              }
                            </TableCell>
                          )}
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(category)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4 text-gray-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(category.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
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
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Add/Edit Category Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? 'Add New Category' : 'Edit Category'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'add' 
                ? 'Create a new category for your products.' 
                : 'Update the details of this category.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="categoryName" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="categoryType" className="text-sm font-medium">
                Category Type
              </label>
              <Select
                value={categoryType}
                onValueChange={setCategoryType}
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
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddEdit}
              disabled={isSubmitting}
              className="bg-electric-600 hover:bg-electric-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {dialogMode === 'add' ? 'Adding...' : 'Updating...'}
                </>
              ) : (
                dialogMode === 'add' ? 'Add Category' : 'Update Category'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesManager;
