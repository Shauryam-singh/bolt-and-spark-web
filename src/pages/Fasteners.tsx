import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Wrench } from 'lucide-react';
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

const Fasteners = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const industrialFasteners = [
    {
      name: "Socket Screws",
      image: "https://m.media-amazon.com/images/I/61VIHcLUrlL.jpg",
      description: "Designed for high-torque applications, available in various head styles and materials.",
      categories: ["Hex", "Allen", "Industrial"],
      price: "$12.99",
      isNew: true
    },
    {
      name: "Durlok",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPhNDhgro-YrCPzmUlvrS-xsLHkKzyl5Q5w&s",
      description: "A patented fastener system that provides a secure, vibration-resistant connection.",
      categories: ["Self-locking", "Anti-vibration", "Heavy-duty"]
    },
    {
      name: "Hex Bolt",
      image: "https://www.fastdep.in/images/product/ss-hex-bolt-inch_hu1f6ff40bf773d9b8df443a823106ec08_400315_750x750_resize_q85_box.jpg",
      description: "Hex bolts are used in a variety of applications, including construction, automotive, and machinery.",
      categories: ["Steel", "Stainless", "Galvanized"]
    },
    {
      name: "Hex Nut",
      image: "https://images-cdn.ubuy.co.in/667e6bc2bd456f54a4352a6b-5-16-18-50pcs-stainless-steel-hex-nuts.jpg",
      description: "Hex nuts are used with bolts to create a secure fastening system, available in various sizes and materials.",
      categories: ["Steel", "Stainless", "Brass"]
    }
  ];

  const specialtyFasteners = [
    {
      name: "Washers",
      image: "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg",
      description: "Used to distribute load and prevent damage to surfaces, available in flat, lock, and fender styles.",
      categories: ["Flat", "Lock", "Fender"],
      price: "$8.99",
      isNew: true
    },
    {
      name: "Structural Assemblies",
      image: "https://www.allfasteners.com.au/pub/media/catalog/product/cache/edb9286c9d01d6f06c69c30d5c8dd932/6/d/6d.001_3_4.jpg",
      description: "Designed for heavy-duty applications, these assemblies include bolts, nuts, and washers for secure connections.",
      categories: ["Heavy-duty", "Industrial", "Construction"]
    }
  ];

  const marineFasteners = [
    {
      name: "Stainless Steel",
      image: "https://m.media-amazon.com/images/I/61nlYFCSOkL.jpg",
      description: "Corrosion-resistant fasteners suitable for marine and outdoor applications, available in various grades.",
      categories: ["Marine", "Corrosion-resistant", "Outdoor"],
      price: "$24.99"
    },
    {
      name: "Petrochemical Studbolts",
      image: "https://5.imimg.com/data5/SELLER/Default/2025/3/494482212/QK/GN/TQ/8047850/b7-stud-bolts-500x500.webp",
      description: "Specialized fasteners designed for high-temperature and high-pressure.",
      categories: ["High-temperature", "High-pressure", "Petrochemical"],
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
              <Wrench size={24} className="text-electric-600" />
            </div>
            <h1 className="text-4xl font-bold text-industry-900" data-aos="fade-up">Fasteners</h1>
          </div>
          
          <p className="text-lg text-industry-700 max-w-3xl mb-12" data-aos="fade-up" data-aos-delay="100">
            Browse our comprehensive range of high-quality fasteners designed for various industrial applications. 
            All Shayam Venchers products meet or exceed industry standards for strength, durability, and performance.
          </p>

          <div className="max-w-md mx-auto mt-6 mb-8" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search fasteners by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <Tabs defaultValue="industrial" className="w-full mb-8">
            <TabsList className="w-full flex justify-center mb-8">
              <TabsTrigger value="industrial" className="text-base px-5 py-2.5">Industrial Fasteners</TabsTrigger>
              <TabsTrigger value="specialty" className="text-base px-5 py-2.5">Specialty Fasteners</TabsTrigger>
              <TabsTrigger value="marine" className="text-base px-5 py-2.5">Marine & Chemical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="industrial">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(industrialFasteners).map((product, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                    <ProductCard 
                      name={product.name}
                      image={product.image}
                      description={product.description}
                      categories={product.categories}
                      price={product.price}
                      isNew={product.isNew}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="specialty">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(specialtyFasteners).map((product, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                    <ProductCard 
                      name={product.name}
                      image={product.image}
                      description={product.description}
                      categories={product.categories}
                      price={product.price}
                      isNew={product.isNew}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="marine">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(marineFasteners).map((product, index) => (
                  <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                    <ProductCard 
                      name={product.name}
                      image={product.image}
                      description={product.description}
                      categories={product.categories}
                      price={product.price}
                      isNew={product.isNew}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-electric-100" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-industry-900 mb-4">Custom Fastener Solutions</h2>
            <p className="text-industry-700 mb-6">
              Don't see exactly what you need? We offer custom fastener manufacturing services to meet your specific requirements. 
              Our engineering team can work with you to design and produce fasteners tailored to your application.
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

export default Fasteners;
