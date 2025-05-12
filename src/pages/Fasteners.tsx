import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, MessageSquare, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import ProductFilter, { FilterOptions } from '@/components/ProductFilter';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  categories: string[];
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description, categories, isNew }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
        {isNew && (
          <div className="bg-secondary text-white text-xs font-bold px-3 py-1 absolute top-2 right-2 rounded-full z-10 animate-pulse">
            New
          </div>
        )}
        <div className="h-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10"></div>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map((category, index) => (
              <span 
                key={index} 
                className="bg-industry-100 text-industry-700 px-2 py-1 rounded text-xs inline-block"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {category}
              </span>
            ))}
            {categories.length > 2 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                +{categories.length - 2} more
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-industry-800 line-clamp-1 group-hover:text-electric-600 transition-colors">{name}</h3>
          <p className="text-industry-600 mb-4 line-clamp-2 text-sm">{description}</p>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <Link to={`/fasteners/${id}`} className="w-full">
              <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 w-full group">
                View Details 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Fasteners = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Fetch categories to map category IDs to names
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const snapshot = await getDocs(categoriesRef);
        const categoryMap: Record<string, string> = {};
        
        snapshot.docs.forEach(doc => {
          categoryMap[doc.id] = doc.data().name;
        });
        
        setCategoriesMap(categoryMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('categoryType', '==', 'fasteners'));
        const snapshot = await getDocs(q);
        
        const productsData = snapshot.docs.map(doc => {
          const data = doc.data();
          // Map category IDs to category names
          const mappedCategories = (data.categories || []).map((catId: string) => 
            categoriesMap[catId] || catId
          );
          
          return {
            id: doc.id,
            ...data,
            categories: mappedCategories
          };
        });
        
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again later.",
        });
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch products if we have the categories map
    if (Object.keys(categoriesMap).length > 0) {
      fetchProducts();
    }
  }, [toast, categoriesMap]);

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...products];
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.categories.some((category: string) => 
          category.toLowerCase().includes(searchLower)
        )
      );
    }
    
    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.some(catId => product.categories.includes(categoriesMap[catId]))
      );
    }
    
    // Sort products
    switch (filters.sortBy) {
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        // Assuming we have a createdAt field, otherwise keep default order
        filtered.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.seconds - a.createdAt.seconds;
          }
          return 0;
        });
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-industry-50 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-electric-100 p-2 rounded-full">
              <Wrench size={24} className="text-electric-600" />
            </div>
            <h1 className="text-4xl font-bold text-industry-900">Fasteners</h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-industry-700 max-w-3xl mb-8"
          >
            Browse our comprehensive range of high-quality fasteners designed for various industrial applications.
            All products meet or exceed industry standards for strength, durability, and performance.
          </motion.p>

          <ProductFilter 
            onFilterChange={handleFilterChange}
            defaultCategoryType="fasteners"
            showCategoryTypeFilter={false}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
                <p className="text-industry-700">Loading products...</p>
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="h-full"
                      style={{ 
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <ProductCard {...product} />
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-full text-center py-12 bg-white rounded-lg shadow"
                >
                  <div className="inline-flex justify-center items-center w-16 h-16 bg-industry-100 rounded-full mb-4">
                    <Search className="h-8 w-8 text-industry-500" />
                  </div>
                  <p className="text-lg text-industry-600 mb-4">No products found matching your search criteria.</p>
                  <Button 
                    onClick={() => handleFilterChange({
                      searchTerm: '',
                      categoryType: 'fasteners',
                      categories: [],
                      sortBy: 'newest'
                    })}
                    variant="outline" 
                    className="border-electric-300 text-electric-600 hover:bg-electric-50"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-white p-8 rounded-lg shadow-md border border-electric-100"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-industry-900 mb-4">Custom Fastener Solutions</h2>
                <p className="text-industry-700 mb-6">
                  Don't see exactly what you need? We offer custom fastener manufacturing services to meet your specific requirements.
                  Our engineering team can work with you to design and produce fasteners tailored to your application.
                </p>
                <Link to="/contact" className="bg-industry-700 hover:bg-industry-800 text-white group inline-flex items-center px-6 py-3 rounded-md transition-all hover:scale-[1.02]">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Inquire About Custom Orders
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="bg-electric-50 p-6 rounded-full w-48 h-48 flex items-center justify-center mx-auto">
                  <Wrench size={80} className="text-electric-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Fasteners;
