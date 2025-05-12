
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { getProductById } from '@/services/productService';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        console.log("Fetching product details for ID:", id);
        const productData = await getProductById(id);
        
        if (productData) {
          console.log("Product data fetched:", productData);
          setProduct(productData);
        } else {
          console.log("Product not found");
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "The product you're looking for could not be found.",
          });
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load product details. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, toast]);

  const handleContactClick = () => {
    // Prepare product information for contact form
    const productInfo = product?.name ? encodeURIComponent(product.name) : 'Product Inquiry';
    window.location.href = `/contact?product=${productInfo}`;
  };

  // Determine which product type page to go back to
  const getBackLink = () => {
    if (!product) return "/";
    return product.categoryType === "fasteners" ? "/fasteners" : "/electrical";
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-industry-800 mb-4">Product Not Found</h2>
            <p className="mb-8 text-industry-600">The product you're looking for could not be found.</p>
            <Link to="/">
              <Button className="bg-industry-700 hover:bg-industry-800">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="mb-8">
          <Link 
            to={getBackLink()} 
            className="inline-flex items-center text-industry-600 hover:text-industry-800"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> 
            Back to {product.categoryType === "fasteners" ? "Fasteners" : "Electrical Components"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain rounded-lg mx-auto"
              style={{ maxHeight: "400px" }}
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.categories && product.categories.map((category: string, index: number) => (
                <span key={index} className="bg-industry-100 text-industry-700 px-3 py-1 rounded-full text-sm">
                  {category}
                </span>
              ))}
              {product.isNew && (
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  New
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-industry-900 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <p className="text-lg text-industry-700">{product.description}</p>
            </div>
            
            <Separator className="my-6" />

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {Object.entries(product.specifications).map(([key, value]: [string, any], index: number) => (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-200 last:border-0">
                        <div className="text-industry-600 font-medium">{key}</div>
                        <div className="sm:col-span-2 text-industry-800">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="my-6" />
              </>
            )}

            {/* Contact Button */}
            <div className="space-y-4">
              <Button 
                onClick={handleContactClick}
                className="w-full bg-industry-700 hover:bg-industry-800 text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" /> 
                Communicate About This Product
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-12 bg-white p-6 sm:p-8 rounded-lg shadow-md border border-industry-100">
          <h2 className="text-2xl font-bold text-industry-900 mb-4">Need More Information?</h2>
          <p className="text-industry-700 mb-6">
            Our team is ready to assist you with any questions about this product, including custom specifications,
            bulk orders, or technical details.
          </p>
          <Button 
            onClick={handleContactClick}
            className="bg-electric-500 hover:bg-electric-600 text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Get in Touch
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
