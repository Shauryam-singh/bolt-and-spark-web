
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { getProductsByType } from '@/services/productService';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/useWishlist';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  categories: string[];
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description, categories, isNew }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  const handleViewDetails = () => {
    console.log("Navigating to product details with ID:", id);
    navigate(`/fasteners/${id}`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      {isNew && (
        <div className="bg-secondary text-white text-xs font-bold px-3 py-1 absolute top-2 right-2 rounded-full">
          New
        </div>
      )}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(id, { id, name, image, description, categories, isNew });
        }}
        className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-sm z-10"
      >
        {isWishlisted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ff4545" stroke="#ff4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        )}
      </button>
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-industry-800">{name}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category, index) => (
            <span key={index} className="bg-industry-100 text-industry-700 px-2 py-1 rounded text-xs">
              {category}
            </span>
          ))}
        </div>
        <p className="text-industry-600 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 group"
            onClick={handleViewDetails}
          >
            View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Fasteners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Categories for tabs
  const [industrialProducts, setIndustrialProducts] = useState<any[]>([]);
  const [specialtyProducts, setSpecialtyProducts] = useState<any[]>([]);
  const [marineProducts, setMarineProducts] = useState<any[]>([]);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProductsByType('fasteners');
        console.log('Fetched fastener products:', productsData);
        
        if (productsData.length > 0) {
          setProducts(productsData);
          
          // Categorize products
          const industrial = productsData.filter(p => 
            p.categories?.some((cat: string) => 
              ['industrial', 'steel', 'bolt', 'nut', 'screw'].some(keyword => 
                cat.toLowerCase().includes(keyword)
              )
            )
          );
          
          const specialty = productsData.filter(p => 
            p.categories?.some((cat: string) => 
              ['specialty', 'special', 'retaining', 'washer'].some(keyword => 
                cat.toLowerCase().includes(keyword)
              )
            )
          );
          
          const marine = productsData.filter(p => 
            p.categories?.some((cat: string) => 
              ['marine', 'chemical', 'stainless', 'corrosion'].some(keyword => 
                cat.toLowerCase().includes(keyword)
              )
            )
          );
          
          // If a product doesn't fit in any category, put it in industrial
          const uncategorized = productsData.filter(p => 
            !industrial.includes(p) && !specialty.includes(p) && !marine.includes(p)
          );
          
          setIndustrialProducts([...industrial, ...uncategorized]);
          setSpecialtyProducts(specialty);
          setMarineProducts(marine);
        } else {
          toast({
            title: "No products found",
            description: "No fastener products found in the database.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const filterProducts = (productsToFilter: ProductCardProps[]) => {
    return productsToFilter.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categories?.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4" data-aos="fade-up">
            <div className="bg-electric-100 p-2 rounded-full">
              <Wrench size={24} className="text-electric-600" />
            </div>
            <h1 className="text-4xl font-bold text-industry-900" data-aos="fade-up">Fasteners</h1>
          </div>
          
          <p className="text-lg text-industry-700 max-w-3xl mb-12" data-aos="fade-up" data-aos-delay="100">
            Browse our comprehensive range of high-quality fasteners designed for various industrial applications. 
            All Shayam Venchers products meet or exceed industry standards for strength, durability, and performance.
          </p>

          <div className="max-w-md mx-auto mt-6 mb-8" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search fasteners by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
            </div>
          ) : (
            <Tabs defaultValue="industrial" className="w-full mb-8">
              <TabsList className="w-full flex justify-center mb-8">
                <TabsTrigger value="industrial" className="text-base px-5 py-2.5">Industrial Fasteners</TabsTrigger>
                <TabsTrigger value="specialty" className="text-base px-5 py-2.5">Specialty Fasteners</TabsTrigger>
                <TabsTrigger value="marine" className="text-base px-5 py-2.5">Marine & Chemical</TabsTrigger>
              </TabsList>
              
              <TabsContent value="industrial">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterProducts(industrialProducts).map((product, index) => (
                    <div key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                      <ProductCard 
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        description={product.description}
                        categories={product.categories || []}
                        isNew={product.isNew}
                      />
                    </div>
                  ))}
                  {filterProducts(industrialProducts).length === 0 && (
                    <div className="col-span-full text-center py-10">
                      <p className="text-gray-500">No products match your search.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="specialty">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterProducts(specialtyProducts).map((product, index) => (
                    <div key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                      <ProductCard 
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        description={product.description}
                        categories={product.categories || []}
                        isNew={product.isNew}
                      />
                    </div>
                  ))}
                  {filterProducts(specialtyProducts).length === 0 && (
                    <div className="col-span-full text-center py-10">
                      <p className="text-gray-500">No products match your search.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="marine">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filterProducts(marineProducts).map((product, index) => (
                    <div key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                      <ProductCard 
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        description={product.description}
                        categories={product.categories || []}
                        isNew={product.isNew}
                      />
                    </div>
                  ))}
                  {filterProducts(marineProducts).length === 0 && (
                    <div className="col-span-full text-center py-10">
                      <p className="text-gray-500">No products match your search.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-electric-100" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-industry-900 mb-4">Custom Fastener Solutions</h2>
            <p className="text-industry-700 mb-6">
              Don't see exactly what you need? We offer custom fastener manufacturing services to meet your specific requirements. 
              Our engineering team can work with you to design and produce fasteners tailored to your application.
            </p>
            <Link to="/contact" className="bg-industry-700 hover:bg-industry-800 text-white group inline-flex items-center px-4 py-2 rounded">
              Inquire About Custom Orders 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Fasteners;
