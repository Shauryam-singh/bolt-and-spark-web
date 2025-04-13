
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  price?: string;
  rating?: number;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, description, price, rating, isNew }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      {isNew && (
        <div className="bg-secondary text-white text-xs font-bold px-3 py-1 absolute top-2 right-2 rounded-full">
          New
        </div>
      )}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-industry-800">{name}</h3>
        {rating && (
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}
        <p className="text-industry-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          {price && <p className="text-lg font-bold text-industry-900">{price}</p>}
          <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Electrical = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Products data
  const switchboards = [
    {
      name: "Distribution Board 12-Way",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400",
      description: "12-way distribution board with MCB protection, ideal for residential applications.",
      price: "$149.99",
      rating: 5
    },
    {
      name: "Industrial Switchboard",
      image: "https://images.unsplash.com/photo-1597676345712-ba4536073513?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Heavy-duty industrial switchboard designed for factory and workshop environments.",
      price: "$399.99",
      rating: 4
    },
    {
      name: "Smart Distribution Board",
      image: "https://images.unsplash.com/photo-1581092160607-ee52953789c8?auto=format&fit=crop&q=80&w=600&h=400",
      description: "IoT-enabled distribution board with remote monitoring and control capabilities.",
      price: "$249.99",
      rating: 5,
      isNew: true
    },
    {
      name: "Outdoor Waterproof Cabinet",
      image: "https://images.unsplash.com/photo-1586864301279-ab8be21e6a82?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Weather-resistant switchboard cabinet for outdoor electrical installations.",
      price: "$189.99",
      rating: 4
    }
  ];

  const wires = [
    {
      name: "Copper Building Wire (100m)",
      image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&q=80&w=600&h=400",
      description: "High-quality copper building wire for general electrical wiring in buildings.",
      price: "$79.99",
      rating: 5
    },
    {
      name: "Armored Cable (50m)",
      image: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Steel wire armored cable for underground installations and demanding environments.",
      price: "$129.99",
      rating: 4
    },
    {
      name: "Fire Resistant Cable (25m)",
      image: "https://images.unsplash.com/photo-1558959847-a71ae80fe735?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Specialized cable that maintains circuit integrity during fire conditions.",
      price: "$149.99",
      rating: 5,
      isNew: true
    },
    {
      name: "Network Cable Cat6 (100m)",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=600&h=400",
      description: "High-speed Ethernet cable for data networking and communications.",
      price: "$59.99",
      rating: 5
    }
  ];

  const accessories = [
    {
      name: "Modular Wall Switches",
      image: "https://images.unsplash.com/photo-1563874257547-d19fbb71b46c?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Modern design modular switches with customizable plate options.",
      price: "$12.99",
      rating: 4
    },
    {
      name: "Industrial Sockets Set",
      image: "https://images.unsplash.com/photo-1532959801411-cf64d5dddd73?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Heavy-duty industrial sockets for workshop and factory applications.",
      price: "$29.99",
      rating: 5
    },
    {
      name: "Smart Wi-Fi Power Outlets",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600&h=400",
      description: "IoT-enabled power outlets with scheduling and remote control features.",
      price: "$34.99",
      rating: 4,
      isNew: true
    },
    {
      name: "Cable Management System",
      image: "https://images.unsplash.com/photo-1603539279542-e5fc757026ba?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Complete cable management solution for organizing wires and cables.",
      price: "$19.99",
      rating: 5
    }
  ];

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-industry-900 mb-4" data-aos="fade-up">Electrical Components</h1>
            <p className="text-lg text-industry-700 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              High-quality electrical components designed for safety, reliability, and efficient performance across residential, commercial, and industrial applications.
            </p>
            
            <div className="max-w-md mx-auto mt-6" data-aos="fade-up" data-aos-delay="200">
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
          </div>

          <Tabs defaultValue="switchboards" className="w-full">
            <TabsList className="w-full flex justify-center mb-8">
              <TabsTrigger value="switchboards" className="text-base px-5 py-2.5">Switch Boards</TabsTrigger>
              <TabsTrigger value="wires" className="text-base px-5 py-2.5">Wires & Cables</TabsTrigger>
              <TabsTrigger value="accessories" className="text-base px-5 py-2.5">Electrical Accessories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="switchboards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {switchboards
                  .filter(product => 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, index) => (
                    <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                      <ProductCard 
                        name={product.name}
                        image={product.image}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        isNew={product.isNew}
                      />
                    </div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="wires">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wires
                  .filter(product => 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, index) => (
                    <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                      <ProductCard 
                        name={product.name}
                        image={product.image}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        isNew={product.isNew}
                      />
                    </div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accessories">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {accessories
                  .filter(product => 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, index) => (
                    <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                      <ProductCard 
                        name={product.name}
                        image={product.image}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        isNew={product.isNew}
                      />
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md" data-aos="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-industry-900 mb-4">Need Custom Electrical Solutions?</h2>
                <p className="text-industry-700 mb-6">
                  We provide specialized electrical components designed to meet your unique project requirements. Our team of engineers can work with you to develop custom solutions for any application.
                </p>
                <Button className="bg-electric-600 hover:bg-electric-700 text-white">
                  Request a Consultation
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800&h=400" 
                  alt="Custom Electrical Solutions" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Electrical;
