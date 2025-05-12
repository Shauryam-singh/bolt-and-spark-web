
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase';

export interface FilterOptions {
  searchTerm: string;
  categoryType: string;
  categories: string[];
  sortBy: string;
}

interface ProductFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  defaultCategoryType?: string;
  showCategoryTypeFilter?: boolean;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  onFilterChange, 
  defaultCategoryType = 'all',
  showCategoryTypeFilter = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryType, setCategoryType] = useState(defaultCategoryType);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<{id: string, name: string, type: string}[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type
        }));
        setAvailableCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Apply filters
    onFilterChange({
      searchTerm,
      categoryType,
      categories: selectedCategories,
      sortBy
    });
  }, [searchTerm, categoryType, selectedCategories, sortBy, onFilterChange]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryType(defaultCategoryType);
    setSelectedCategories([]);
    setSortBy('newest');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="pl-10 bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Product Type Filter (Electrical/Fasteners) */}
          {showCategoryTypeFilter && (
            <div className="w-full sm:w-auto">
              <Select
                value={categoryType}
                onValueChange={setCategoryType}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Product Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="fasteners">Fasteners</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Sort Options */}
          <div className="w-full sm:w-auto">
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                <SelectItem value="name_desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filter Toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="ml-auto"
          >
            <SlidersHorizontal size={16} className="mr-2" />
            {showAdvancedFilters ? 'Hide Filters' : 'More Filters'}
          </Button>
        </div>

        {/* Advanced Filters (Categories) */}
        {showAdvancedFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-3 border-t mt-3"
          >
            <div className="mb-2">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto p-1">
                {availableCategories
                  .filter(cat => categoryType === 'all' || cat.type === categoryType)
                  .map(category => (
                    <Badge
                      key={category.id}
                      variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedCategories.includes(category.id) 
                          ? 'bg-electric-100 text-electric-800 hover:bg-electric-200' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      {category.name}
                      {selectedCategories.includes(category.id) && (
                        <X size={14} className="ml-1" />
                      )}
                    </Badge>
                  ))}
              </div>
            </div>
          
            {/* Clear Filters Button */}
            {(searchTerm || categoryType !== defaultCategoryType || selectedCategories.length > 0 || sortBy !== 'newest') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={14} className="mr-1" /> Clear All Filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
