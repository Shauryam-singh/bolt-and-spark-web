
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, ArrowLeft, CheckCheck, Share2, Award, Truck, Package2, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, getDocs, addDoc, deleteDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById } from '@/services/productService';
import { ScrollArea } from '@/components/ui/scroll-area';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);

  console.log("Product ID from params:", id);

  // Fetch product details using the productService
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        console.log("Fetching product with ID:", id);
        // Use the getProductById service function - the ID is actually the document ID in Firestore
        const productData = await getProductById(id);
        
        console.log("Fetched product data:", productData);
        
        if (productData) {
          setProduct(productData);
          setActiveImage(productData.image);
        } else {
          toast({
            variant: "destructive",
            title: "Product Not Found",
            description: "The requested product could not be found.",
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          variant: "destructive", 
          title: "Error", 
          description: "Failed to load product details."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  // Fetch related products based on categories
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product || !product.categories || product.categories.length === 0) return;

      try {
        const productsRef = collection(db, 'products');
        // Find products with at least one matching category but exclude current product
        const q = query(
          productsRef, 
          where('categoryType', '==', product.categoryType),
          where('id', '!=', product.id)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const related = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .slice(0, 4); // Limit to 4 related products
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  // Check if product is in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || !product) return;

      try {
        const wishlistRef = collection(db, 'wishlists');
        const q = query(
          wishlistRef, 
          where('userId', '==', user.uid),
          where('productId', '==', product.id)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          setIsInWishlist(true);
          setWishlistItemId(snapshot.docs[0].id);
        } else {
          setIsInWishlist(false);
          setWishlistItemId(null);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlist();
  }, [user, product]);

  const addToWishlist = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to your wishlist.",
      });
      return;
    }

    if (!product) return;

    setAddingToWishlist(true);
    try {
      if (isInWishlist && wishlistItemId) {
        // Remove from wishlist
        await deleteDoc(doc(db, 'wishlists', wishlistItemId));
        setIsInWishlist(false);
        setWishlistItemId(null);
        toast({
          title: "Removed from Wishlist",
          description: "Product has been removed from your wishlist.",
        });
      } else {
        // Add to wishlist
        const wishlistRef = collection(db, 'wishlists');
        const docRef = await addDoc(wishlistRef, {
          userId: user.uid,
          productId: product.id,
          name: product.name,
          image: product.image,
          createdAt: serverTimestamp()
        });
        setIsInWishlist(true);
        setWishlistItemId(docRef.id);
        toast({
          title: "Added to Wishlist",
          description: "Product has been added to your wishlist.",
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update your wishlist. Please try again.",
      });
    } finally {
      setAddingToWishlist(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to your cart.",
      });
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      // Check if item already exists in cart
      const cartRef = collection(db, 'cart');
      const q = query(
        cartRef, 
        where('userId', '==', user.uid),
        where('productId', '==', product.id)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        // Item already in cart, update quantity
        const cartItem = snapshot.docs[0];
        const cartItemRef = doc(db, 'cart', cartItem.id);
        await updateDoc(cartItemRef, {
          quantity: cartItem.data().quantity + quantity,
          updatedAt: serverTimestamp()
        });
      } else {
        // Add new item to cart
        await addDoc(cartRef, {
          userId: user.uid,
          productId: product.id,
          name: product.name,
          quantity: quantity,
          image: product.image,
          createdAt: serverTimestamp()
        });
      }
      
      toast({
        title: "Added to Cart",
        description: `${quantity} item(s) added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Check out this product',
        text: product?.description || 'I found this amazing product',
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Shared Successfully",
          description: "The product has been shared.",
        });
      }).catch((error) => {
        console.error("Error sharing:", error);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-24 pb-12">
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
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
            <p className="mt-2 text-gray-600">The product you're looking for does not exist or has been removed.</p>
            <Link to="/">
              <Button className="mt-4">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const productType = product.categoryType || (id?.includes("fasteners") ? "fasteners" : "electrical");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: productType === "fasteners" ? "Fasteners" : "Electrical Components", path: `/${productType}` },
    { name: product.name, path: `/${productType}/${id}` }
  ];

  // Mock data for product display
  const productImages = [product.image];
  const specifications = [
    { name: "Material", value: "High-grade Steel" },
    { name: "Dimensions", value: "5 x 3 x 2 cm" },
    { name: "Weight", value: "350g" },
    { name: "Country of Origin", value: "India" },
    { name: "Warranty", value: "1 Year" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="inline-flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-500">{item.name}</span>
                ) : (
                  <Link to={item.path} className="text-industry-600 hover:text-industry-800">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        
        {/* Back button */}
        <Link to={`/${productType}`} className="inline-flex items-center mb-6 text-industry-600 hover:text-industry-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {productType === "fasteners" ? "Fasteners" : "Electrical Components"}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="bg-white overflow-hidden rounded-lg shadow-md">
              <div className="aspect-square p-8 flex items-center justify-center bg-white">
                <img 
                  src={activeImage || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-all duration-300 hover:scale-105"
                />
              </div>
            </Card>
            
            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`cursor-pointer border-2 rounded-md overflow-hidden ${img === activeImage ? 'border-industry-600' : 'border-gray-200'}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover aspect-square" />
                  </div>
                ))}
              </div>
            )}
            
            {/* Social Share */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center"
                >
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
              
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                In Stock
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-industry-900">{product.name}</h1>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={addToWishlist}
                  disabled={addingToWishlist}
                  className={`rounded-full ${isInWishlist ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : ''}`}
                >
                  {isInWishlist ? <Heart className="h-5 w-5 fill-current" /> : <Heart className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="flex items-center mt-2">
                {product.isNew && (
                  <Badge className="bg-green-100 text-green-800 border-green-200 mr-2">NEW</Badge>
                )}
                <div className="flex items-center space-x-2">
                  {product.categories && product.categories.map((category: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="bg-industry-100 text-industry-800 border-industry-200"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Price Section - Removed as requested */}
              <div className="mt-6 border-t border-b py-4">
                <div className="flex items-center mt-4 text-sm text-gray-600">
                  <span className="flex items-center mr-4">
                    <Truck className="mr-1 h-4 w-4 text-green-600" />
                    Free shipping
                  </span>
                  <span className="flex items-center">
                    <Package2 className="mr-1 h-4 w-4 text-blue-600" />
                    Genuine product
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <span className="mr-3 text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => handleQuantityChange('decrease')}
                      className="px-3 py-1 text-lg font-medium border-r"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange('increase')}
                      className="px-3 py-1 text-lg font-medium border-l"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    onClick={addToCart}
                    className="flex-1 h-12 text-base"
                    disabled={addingToCart}
                  >
                    {addingToCart ? (
                      <span className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </span>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={addToWishlist}
                    disabled={addingToWishlist}
                    className={`${isInWishlist ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : ''} h-12 text-base`}
                  >
                    {addingToWishlist ? (
                      <span className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </span>
                    ) : isInWishlist ? (
                      <>
                        <CheckCheck className="mr-2 h-5 w-5" />
                        In Wishlist
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-5 w-5" />
                        Add to Wishlist
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1.5 bg-industry-100 rounded-full">
                    <Award className="h-5 w-5 text-industry-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Genuine Quality</h3>
                    <p className="text-xs text-gray-600">100% authentic product with warranty</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1.5 bg-industry-100 rounded-full">
                    <RefreshCw className="h-5 w-5 text-industry-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Easy Returns</h3>
                    <p className="text-xs text-gray-600">10-day return policy for your peace of mind</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1.5 bg-industry-100 rounded-full">
                    <Truck className="h-5 w-5 text-industry-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Fast Delivery</h3>
                    <p className="text-xs text-gray-600">Delivery in 3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1.5 bg-industry-100 rounded-full">
                    <Package2 className="h-5 w-5 text-industry-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">Secure Packaging</h3>
                    <p className="text-xs text-gray-600">Products are securely packed for safe delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-700 font-medium">{spec.name}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
                
                {/* Product attributes from database */}
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-gray-700 font-medium">Product ID</span>
                  <span className="text-gray-600">{product.id}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-gray-700 font-medium">Category</span>
                  <span className="text-gray-600 capitalize">{productType}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-industry-800 mb-1">Delivery Time</h4>
                  <p className="text-gray-600 text-sm">Orders are typically processed within 1-2 business days. Shipping takes 3-5 business days for standard delivery.</p>
                </div>
                <div>
                  <h4 className="font-medium text-industry-800 mb-1">Shipping Cost</h4>
                  <p className="text-gray-600 text-sm">Free shipping on all orders above ₹500. For orders below ₹500, a shipping fee of ₹50 will be applied.</p>
                </div>
                <div>
                  <h4 className="font-medium text-industry-800 mb-1">Returns & Refunds</h4>
                  <p className="text-gray-600 text-sm">We offer a 10-day return policy from the date of delivery. Items must be unused and in the original packaging with all tags attached.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="border rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button size="sm">Write a Review</Button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review this product!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item, index) => (
                <Link key={index} to={`/${item.categoryType}/${item.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                    <div className="aspect-square p-4 bg-white">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
