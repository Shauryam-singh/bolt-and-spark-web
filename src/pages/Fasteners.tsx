import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, MessageSquare, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { getProductsByType } from '@/services/productService';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

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
          <Link to={`/product/${id}`} className="w-full">
            <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 w-full group">
              View Details 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const Fasteners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProductsByType('fasteners');
        console.log("Fetched fastener products:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load products. Please try again later.",
        });
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const filterProducts = (products) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6" data-aos="fade-up">
            <div className="bg-electric-100 p-2 rounded-full">
              <Wrench size={24} className="text-electric-600" />
            </div>
            <h1 className="text-4xl font-bold text-industry-900">Fasteners</h1>
          </div>

          <p className="text-lg text-industry-700 max-w-3xl mb-12" data-aos="fade-up" data-aos-delay="100">
            Browse our comprehensive range of high-quality fasteners designed for various industrial applications.
            All products meet or exceed industry standards for strength, durability, and performance.
          </p>

          <div className="max-w-md mx-auto mt-6 mb-10" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search fasteners products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-white shadow-sm border-electric-100 focus:border-electric-300 focus-visible:ring-electric-200 transition-all"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-electric-400" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
                <p className="text-industry-700">Loading products...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterProducts(products).length > 0 ? (
                filterProducts(products).map((product, index) => (
                  <div 
                    key={product.id} 
                    data-aos="fade-up" 
                    data-aos-delay={index * 50} 
                    className="h-full"
                  >
                    <ProductCard {...product} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                  <div className="inline-flex justify-center items-center w-16 h-16 bg-industry-100 rounded-full mb-4">
                    <Search className="h-8 w-8 text-industry-500" />
                  </div>
                  <p className="text-lg text-industry-600 mb-4">No products found matching your search.</p>
                  <Button 
                    onClick={() => setSearchTerm('')}
                    variant="outline" 
                    className="border-electric-300 text-electric-600 hover:bg-electric-50"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md border border-electric-100" data-aos="fade-up">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Fasteners;
