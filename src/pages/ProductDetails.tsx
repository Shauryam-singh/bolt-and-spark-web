
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProductDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  // Helper function to get product details
  const getProductDetails = () => {
    if (category === 'fasteners') {
      const allProducts = [
        ...industrialFasteners,
        ...specialtyFasteners,
        ...marineFasteners
      ];
      return allProducts.find(product => product.id === id);
    }
    return null;
  };

  const product = getProductDetails();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            {product.isNew && (
              <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                New
              </div>
            )}
            <Card>
              <CardContent className="p-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-industry-900 mb-4">{product.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="bg-industry-100 text-industry-700 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-xl font-bold text-industry-900 mb-4">{product.price}</p>
            <p className="text-industry-600 mb-8">{product.description}</p>
            
            <Button className="w-full md:w-auto">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
