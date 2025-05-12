
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  MessageSquare,
  Share,
  Info,
  ExternalLink, 
  Package
} from 'lucide-react';
import { getProductById } from '@/services/productService';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
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

  // Get the additional images from the product or use an empty array
  const additionalImages = product?.additionalImages || [];
  
  // Create an array with the main image and additional images
  const allImages = product ? [product.image, ...additionalImages] : [];

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
        {/* Breadcrumb Navigation */}
        <div className="mb-6 animate-fade-in" data-aos="fade-up">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-electric-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to={getBackLink()} className="text-sm font-medium text-gray-700 hover:text-electric-600">
                    {product.categoryType === "fasteners" ? "Fasteners" : "Electrical Components"}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm font-medium text-gray-500 line-clamp-1">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image Gallery */}
          <div className="space-y-4" data-aos="fade-right">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
              <img 
                src={allImages[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-[400px] object-contain p-4 transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            {allImages.length > 1 && (
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {allImages.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4">
                      <div className="p-1">
                        <Card className="border-2 hover:border-electric-500 cursor-pointer transition-all">
                          <CardContent className="flex items-center justify-center p-2 h-20">
                            <img 
                              src={image} 
                              alt={`${product.name} view ${index + 1}`} 
                              className="h-full w-auto object-contain"
                              onClick={() => setActiveImageIndex(index)}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6" data-aos="fade-left">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.categories && product.categories.map((category: string, index: number) => (
                  <span key={index} className="bg-industry-100 text-industry-700 px-3 py-1 rounded-full text-sm animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                    {category}
                  </span>
                ))}
                {product.isNew && (
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm animate-pulse">
                    New
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-industry-900 mb-4">{product.name}</h1>
              
              <div className="mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-electric-500 shadow-sm hover:shadow transition-all animate-fade-in">
                <p className="text-lg text-industry-700">{product.description}</p>
              </div>
            </div>
            
            <Separator className="my-6" />

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="bg-electric-100 p-2 rounded-full">
                  <Package className="text-electric-600 h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category Type</p>
                  <p className="font-medium text-industry-800 capitalize">{product.categoryType}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="bg-electric-100 p-2 rounded-full">
                  <Info className="text-electric-600 h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Product Code</p>
                  <p className="font-medium text-industry-800">{product.id}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-8 animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-electric-100 p-1 rounded-full mr-2">
                    <ExternalLink className="text-electric-600 h-4 w-4" />
                  </span>
                  Specifications
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                  {Object.entries(product.specifications).map(([key, value]: [string, any], index: number) => (
                    <div 
                      key={index} 
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-gray-200 last:border-0"
                      data-aos="fade-up" 
                      data-aos-delay={100 * index}
                    >
                      <div className="text-industry-600 font-medium">{key}</div>
                      <div className="sm:col-span-2 text-industry-800">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 space-y-4 animate-fade-in">
              <Button 
                onClick={handleContactClick}
                className="w-full bg-industry-700 hover:bg-industry-800 text-white text-lg py-6 group transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" /> 
                Communicate About This Product
              </Button>
              
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: product.description,
                        url: window.location.href
                      }).catch((error) => console.log('Sharing failed', error));
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast({
                        title: "Link copied!",
                        description: "The product link has been copied to your clipboard."
                      });
                    }
                  }}
                >
                  <Share className="mr-2 h-4 w-4" /> Share Product
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-16 space-y-12" data-aos="fade-up">
          {/* Applications Section */}
          {product.applications && product.applications.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-industry-100 transition-all hover:shadow-lg">
              <h2 className="text-2xl font-bold text-industry-900 mb-6 flex items-center">
                <span className="bg-electric-100 p-2 rounded-full mr-3">
                  <Package className="text-electric-600 h-5 w-5" />
                </span>
                Applications
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications.map((application: string, index: number) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    data-aos="fade-up"
                    data-aos-delay={100 * index}
                  >
                    <span className="text-electric-600 text-lg">•</span>
                    <span>{application}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to action */}
          <div className="bg-gradient-to-r from-industry-700 to-industry-800 p-8 rounded-lg shadow-md border border-industry-600 text-white" data-aos="fade-up">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
              <p className="text-xl opacity-90 mb-6">
                Our team is ready to assist you with any questions about this product, including custom specifications,
                bulk orders, or technical details.
              </p>
              <Button 
                onClick={handleContactClick}
                className="bg-white text-industry-800 hover:bg-gray-100 text-lg px-8 py-6 transform transition-transform hover:scale-105"
              >
                <MessageSquare className="mr-2 h-5 w-5" /> Get in Touch
              </Button>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12" data-aos="fade-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-industry-900">Similar Products</h2>
              <Link 
                to={getBackLink()} 
                className="text-electric-600 hover:text-electric-700 flex items-center transition-colors"
              >
                View All <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
              </Link>
            </div>
            <p className="text-industry-700 mb-8">Browse other products in our catalog</p>
            <Link 
              to={getBackLink()} 
              className="inline-block bg-electric-500 hover:bg-electric-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse All {product.categoryType === "fasteners" ? "Fasteners" : "Electrical Components"}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
