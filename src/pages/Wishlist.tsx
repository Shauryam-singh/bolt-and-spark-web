
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useWishlist } from '@/hooks/useWishlist';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Wishlist = () => {
  const { wishlistItems, isInWishlist, toggleWishlist, loading } = useWishlist();
  const { user } = useAuth();

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-industry-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8" data-aos="fade-up">
            <div className="bg-electric-100 p-2 rounded-full">
              <Heart size={24} className="text-electric-600" />
            </div>
            <h1 className="text-4xl font-bold text-industry-900">My Wishlist</h1>
          </div>

          {!user ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>
              <p className="text-gray-600 mb-6">You need to be signed in to view your wishlist</p>
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-industry-700" />
              <span className="ml-2 text-lg">Loading your wishlist...</span>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Browse our products and add items to your wishlist</p>
              <div className="flex justify-center gap-4">
                <Link to="/fasteners">
                  <Button variant="outline">Browse Fasteners</Button>
                </Link>
                <Link to="/electrical">
                  <Button variant="outline">Browse Electrical</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg text-industry-700 mb-8" data-aos="fade-up" data-aos-delay="100">
                You have {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => {
                  const productType = item.categories?.some(cat => 
                    ['electrical', 'power', 'cable', 'wire', 'switch'].includes(cat.toLowerCase())
                  ) ? 'electrical' : 'fasteners';
                  
                  const link = `/${productType}/${item.id}`;
                  
                  return (
                    <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => toggleWishlist(item.id, item)}
                          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ff4545" stroke="#ff4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2 text-industry-800">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.categories?.map((category, idx) => (
                            <span key={idx} className="bg-industry-100 text-industry-700 px-2 py-1 rounded text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                        <p className="text-industry-600 line-clamp-3">{item.description}</p>
                      </CardContent>
                      <CardFooter className="px-4 pb-4 pt-0">
                        <Link to={link}>
                          <Button 
                            variant="outline" 
                            className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 group"
                          >
                            View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
