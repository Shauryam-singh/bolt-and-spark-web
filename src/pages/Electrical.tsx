import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlugZap, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  categories: string[];
  price: string;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, description, categories, price, isNew }) => {
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
        <p className="text-industry-600 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-industry-900">{price}</span>
          <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 group">
            View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Electrical = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const switchboards = [
    {
      name: "Distribution Board 12-Way",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      description: "12-way DB with MCB protection.",
      categories: ["Distribution", "Protection", "Commercial"],
      price: "$149.99",
      isNew: true
    },
    {
      name: "Industrial Switchboard",
      image: "https://images.unsplash.com/photo-1597676345712-ba4536073513",
      description: "Heavy-duty industrial switchboard.",
      categories: ["Industrial", "Heavy-duty", "Power"],
      price: "$399.99"
    },
    {
      name: "Smart Distribution Board",
      image: "https://images.unsplash.com/photo-1581092160607-ee52953789c8",
      description: "IoT-enabled DB.",
      categories: ["Smart", "IoT", "Automation"],
      price: "$249.99",
      isNew: true
    },
    {
      name: "Outdoor Waterproof Cabinet",
      image: "https://images.unsplash.com/photo-1586864301279-ab8be21e6a82",
      description: "Weather-resistant cabinet.",
      categories: ["Outdoor", "Waterproof", "Protection"],
      price: "$189.99"
    }
  ];

  const wires = [
    {
      name: "Copper Building Wire (100m)",
      image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927",
      description: "High-quality copper building wire.",
      categories: ["Copper", "Building", "Industrial"],
      price: "$79.99",
      isNew: true
    },
    {
      name: "Armored Cable (50m)",
      image: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c",
      description: "Steel wire armored cable.",
      categories: ["Armored", "Steel", "Industrial"],
      price: "$129.99"
    },
    {
      name: "Fire Resistant Cable (25m)",
      image: "https://images.unsplash.com/photo-1558959847-a71ae80fe735",
      description: "Fire-safe cabling.",
      categories: ["Fire Resistant", "Safety", "Building"],
      price: "$149.99",
      isNew: true
    }
  ];

  const accessories = [
    {
      name: "Modular Wall Switches",
      image: "https://images.unsplash.com/photo-1563874257547-d19fbb71b46c",
      description: "Modern design modular switches.",
      categories: ["Modular", "Switches", "Residential"],
      price: "$12.99"
    },
    {
      name: "Industrial Sockets Set",
      image: "https://images.unsplash.com/photo-1532959801411-cf64d5dddd73",
      description: "Heavy-duty sockets.",
      categories: ["Industrial", "Sockets", "Power"],
      price: "$29.99"
    },
    {
      name: "Smart Wi-Fi Power Outlets",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827",
      description: "Remote-controlled outlets.",
      categories: ["Smart", "Wi-Fi", "Automation"],
      price: "$34.99",
      isNew: true
    }
  ];

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

          <Tabs defaultValue="switchboards" className="w-full mb-8">
            <TabsList className="w-full flex justify-center mb-8">
              <TabsTrigger value="switchboards" className="text-base px-5 py-2.5">Switchboards</TabsTrigger>
              <TabsTrigger value="wires" className="text-base px-5 py-2.5">Wires & Cables</TabsTrigger>
              <TabsTrigger value="accessories" className="text-base px-5 py-2.5">Accessories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="switchboards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(switchboards).map((product, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="wires">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(wires).map((product, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accessories">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(accessories).map((product, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-electric-100" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-industry-900 mb-4">Custom Electrical Solutions</h2>
            <p className="text-industry-700 mb-6">
              Don't see exactly what you need? We offer custom solutions and configurations to meet your specific requirements. 
              Our engineering team can work with you to design and implement electrical systems tailored to your needs.
            </p>
            <Link to="/contact" className="bg-industry-700 hover:bg-industry-800 text-white group inline-flex items-center px-4 py-2 rounded">
              Inquire About Custom Orders 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Electrical;
