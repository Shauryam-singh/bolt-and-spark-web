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
    // Existing items here ...
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
    },
    // New items added
    {
      name: "Flat Washer",
      image: "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg",
      description: "Used to distribute load and prevent damage to surfaces, available in flat, lock, and fender styles.",
      categories: ["Flat", "Lock", "Fender"],
      price: "$8.99",
      isNew: true
    },
    {
      name: "Carriage Bolt",
      image: "https://www.fas10.in/wp-content/uploads/2022/10/stainless-steel-carriage-bolt.webp",
      description: "Designed for wood and metal connections, features a square neck to prevent rotation.",
      categories: ["Carriage", "Heavy-duty", "Industrial"],
      price: "$5.99"
    },
    {
      name: "Wood Screw",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/1/MT/LZ/EW/24439648/ss-wood-screws.jpg",
      description: "Ideal for woodworking, these screws provide strong holding power in wood-based applications.",
      categories: ["Wood", "Screws", "Industrial"],
      price: "$10.49"
    },
    {
      name: "Lock Nut",
      image: "https://buysupplies.in/cdn/shop/products/LockNut304_ac33f36b-284f-45df-bf25-4257533af177.jpg?v=1633667576",
      description: "A type of nut designed to resist loosening due to vibration or torque.",
      categories: ["Locking", "Industrial", "Self-locking"],
      price: "$7.99"
    },
    {
      name: "Self-Drilling Screw",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7BEPeYS9fsm342tqHNxTtnn7gcXnJu881g&s",
      description: "Designed for quick installation into metal without the need for pre-drilling.",
      categories: ["Self-drilling", "Steel", "Construction"],
      price: "$9.99"
    },
    {
      name: "Expansion Bolt",
      image: "https://m.media-amazon.com/images/I/61zSRGzp+BL._AC_UF1000,1000_QL80_.jpg",
      description: "Used for heavy-duty anchoring in concrete and masonry, expands upon installation.",
      categories: ["Heavy-duty", "Concrete", "Industrial"],
      price: "$15.99"
    },
    {
      name: "Wing Nut",
      image: "https://m.media-amazon.com/images/I/61HIGWRwMEL.jpg",
      description: "Allows for easy hand-tightening, perfect for applications requiring frequent adjustments.",
      categories: ["Wing", "Industrial", "Fastening"],
      price: "$3.99"
    }
  ];

  const specialtyFasteners = [
    // Existing items here ...
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
    },
    // New items added
    {
      name: "Flange Nut",
      image: "https://m.media-amazon.com/images/I/61CUtIG3O8L.jpg",
      description: "Has a wide flange that distributes the load, often used in automotive and industrial applications.",
      categories: ["Flange", "Nut", "Heavy-duty"],
      price: "$4.99"
    },
    {
      name: "Hex Nut",
      image: "https://m.media-amazon.com/images/I/71SvUQ9jKWL.jpg",
      description: "A standard hexagonal nut used in various industrial applications.",
      categories: ["Hex", "Industrial", "Nut"],
      price: "$1.99"
    },
    {
      name: "Lifting Eye Bolt",
      image: "https://m.media-amazon.com/images/I/61IPB3DLuUL.jpg",
      description: "Used for lifting heavy objects, these bolts provide a secure attachment point.",
      categories: ["Lifting", "Eye", "Heavy-duty"],
      price: "$13.99"
    },
    {
      name: "Retaining Ring",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0g4GBbszwoIVn3kUAJNSP1L7EjQ_USqbEeA&s",
      description: "Used in mechanical applications to retain components within a housing or on a shaft.",
      categories: ["Retaining", "Industrial", "Mechanical"],
      price: "$6.49"
    },
    {
      name: "Hollow Bolt",
      image: "https://image.made-in-china.com/2f0j00lWwfsVJywecp/Stainless-Steel-Aluminium-Brass-Nylon-Hollow-Screws.jpg",
      description: "A bolt with a hollow center, used in applications where a shaft or rod needs to pass through.",
      categories: ["Hollow", "Industrial", "Bolts"],
      price: "$9.49"
    },
    {
      name: "E-Clip",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThfSCmRa2qEJWRwlA25-6AAItRNzl-3zWcwZLmqpknPPlvkwrlvRCGe3ZM5HJ_ofGJmTQ&usqp=CAU",
      description: "A type of retaining ring used to hold parts on shafts or in housings.",
      categories: ["E-Clip", "Retaining", "Mechanical"],
      price: "$2.79"
    }
  ];

  const marineFasteners = [
    // Existing items here ...
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
    },
    // New items added
    {
      name: "Marine Anchor Bolts",
      image: "https://cdn.shopify.com/s/files/1/0269/0246/2519/collections/61v6FXGa3YL._SX342.jpg?v=1638613290",
      description: "Heavy-duty bolts used for securing anchors on ships, boats, and offshore platforms.",
      categories: ["Marine", "Heavy-duty", "Bolts"],
      price: "$35.99"
    },
    {
      name: "Nylon Screws",
      image: "https://m.media-amazon.com/images/I/5135VK3idvL.jpg",
      description: "Corrosion-resistant screws used for marine applications where metal corrosion is a concern.",
      categories: ["Nylon", "Marine", "Corrosion-resistant"],
      price: "$7.99"
    },
    {
      name: "Marine-Grade Fasteners",
      image: "https://princefastener.com/wp-content/uploads/2022/04/High-strength-bolt-fastener.jpg",
      description: "Designed specifically to resist corrosion from saltwater, these fasteners are ideal for marine environments.",
      categories: ["Marine", "Corrosion-resistant", "Outdoor"],
      price: "$19.99"
    },
    {
      name: "Stainless Steel Hex Nut",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW2C-Pk8h89ESP-wCIgeXD12UX6tWiuG2FJg&s",
      description: "A hex nut made from stainless steel, resistant to rust and corrosion, commonly used in marine environments.",
      categories: ["Marine", "Stainless Steel", "Nut"],
      price: "$5.49"
    },
    {
      name: "Deck Screws",
      image: "https://cdn11.bigcommerce.com/s-hlsk6yq0/images/stencil/1280x1280/products/340676/1345561/item-square-flat-deck-type17-ss__65923.1595960908.jpg?c=2",
      description: "Screws designed for marine decking, resistant to rust and corrosion from saltwater exposure.",
      categories: ["Deck", "Screws", "Marine"],
      price: "$8.99"
    },
    {
      name: "Marine Washers",
      image: "https://image.made-in-china.com/2f0j00OvbcYFuEnBqz/3-8-EPDM-Neoprene-316-Marine-Grade-Rubber-Bonded-Sealing-Washers.webp",
      description: "Marine-grade washers designed to prevent corrosion in high-moisture environments.",
      categories: ["Marine", "Washers", "Corrosion-resistant"],
      price: "$2.49"
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
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Fasteners;
