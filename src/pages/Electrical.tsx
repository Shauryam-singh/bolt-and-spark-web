
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlugZap, Search, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { getProductsByType } from '@/services/productService';
import { useToast } from '@/hooks/use-toast';

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      {isNew && (
        <div className="bg-secondary text-white text-xs font-bold px-3 py-1 absolute top-2 right-2 rounded-full">
          New
        </div>
      )}
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
        <p className="text-industry-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <Link to={`/electrical/${id}`}>
            <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 group">
              View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Electrical = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProductsByType('electrical');
        console.log("Fetched electrical products:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load electrical products. Please try again later.",
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
          <div className="flex items-center gap-3 mb-4" data-aos="fade-up">
            <div className="bg-electric-100 p-2 rounded-full">
              <PlugZap size={24} className="text-electric-600" />
            </div>
            <h1 className="text-4xl font-bold text-industry-900">Electrical Components</h1>
          </div>

          <p className="text-lg text-industry-700 max-w-3xl mb-12" data-aos="fade-up" data-aos-delay="100">
            Browse our comprehensive range of high-quality electrical components designed for various applications.
            All products meet or exceed industry standards for safety and performance.
          </p>

          <div className="max-w-md mx-auto mt-6 mb-8" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search electrical products..."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterProducts(products).length > 0 ? (
                filterProducts(products).map((product, index) => (
                  <div key={product.id} data-aos="fade-up" data-aos-delay={index * 50}>
                    <ProductCard {...product} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-industry-600">No products found matching your search.</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-electric-100" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-industry-900 mb-4">Custom Electrical Solutions</h2>
            <p className="text-industry-700 mb-6">
              Don't see exactly what you need? We offer custom solutions and configurations to meet your specific requirements.
              Our engineering team can work with you to design and implement electrical systems tailored to your needs.
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

export default Electrical;
