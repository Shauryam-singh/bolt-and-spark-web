
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, ArrowLeft, CheckCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, getDocs, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/integrations/firebase';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('id', '==', id));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const productData = snapshot.docs[0].data();
          setProduct({ id: snapshot.docs[0].id, ...productData });
        } else {
          // If not found by id field, try looking up by document ID
          const productDoc = await getDoc(doc(db, 'products', id));
          if (productDoc.exists()) {
            setProduct({ id: productDoc.id, ...productDoc.data() });
          } else {
            toast({
              variant: "destructive",
              title: "Product Not Found",
              description: "The requested product could not be found.",
            });
          }
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
          quantity: cartItem.data().quantity + 1,
          updatedAt: serverTimestamp()
        });
      } else {
        // Add new item to cart
        await addDoc(cartRef, {
          userId: user.uid,
          productId: product.id,
          name: product.name,
          price: 199.99, // Sample price, replace with actual price from your database
          quantity: 1,
          image: product.image,
          createdAt: serverTimestamp()
        });
      }
      
      toast({
        title: "Added to Cart",
        description: "Product has been added to your cart.",
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

  const productType = useMemo(() => {
    if (!id) return null;
    if (id.includes("fasteners")) return "fasteners";
    return "electrical";
  }, [id]);

  const breadcrumbs = useMemo(() => {
    if (!product || !productType) return [];
    
    return [
      { name: "Home", path: "/" },
      { name: productType === "fasteners" ? "Fasteners" : "Electrical Components", path: `/${productType}` },
      { name: product.name, path: `/${productType}/${id}` }
    ];
  }, [product, productType, id]);

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
          {/* Product Image */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="aspect-square overflow-hidden rounded-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-industry-900">{product.name}</h1>
              
              <div className="flex items-center mt-2">
                {product.isNew && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
                    NEW
                  </span>
                )}
                <div className="flex items-center space-x-2">
                  {product.categories && product.categories.map((category: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-industry-100 text-industry-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mt-8 space-y-4">
                <p className="text-xl font-bold text-industry-900">₹199.99</p>
                <p className="text-sm text-gray-500">Price is indicative. Contact us for bulk pricing.</p>
                
                <div className="flex space-x-4 mt-6">
                  <Button 
                    onClick={addToCart}
                    className="flex-1"
                    disabled={addingToCart}
                  >
                    {addingToCart ? (
                      "Adding..."
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={addToWishlist}
                    disabled={addingToWishlist}
                    className={`${isInWishlist ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : ''}`}
                  >
                    {addingToWishlist ? (
                      "Updating..."
                    ) : isInWishlist ? (
                      <>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        In Wishlist
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex">
                  <span className="font-medium w-32">Product ID:</span>
                  <span className="text-gray-600">{product.id}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Category:</span>
                  <span className="text-gray-600">{productType}</span>
                </li>
                {/* Additional product details can be added here */}
              </ul>
            </div>
            
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact our sales team for bulk inquiries or custom requirements.
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default ProductDetails;
