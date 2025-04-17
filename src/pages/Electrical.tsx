
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      {isNew && (
        <div className="bg-secondary text-white text-xs font-bold px-3 py-1 absolute top-2 right-2 rounded-full">
          New
        </div>
      )}
      <div className="h-48 overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-industry-800">{name}</h3>
        {rating && (
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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

  const createProduct = (
    name: string,
    image: string,
    description: string,
    price: string,
    rating: number,
    isNew?: boolean
  ) => ({ name, image, description, price, rating, isNew });

  const switchboards = [
    createProduct("Distribution Board 12-Way", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31", "12-way DB with MCB protection.", "$149.99", 5),
    createProduct("Industrial Switchboard", "https://images.unsplash.com/photo-1597676345712-ba4536073513", "Heavy-duty industrial switchboard.", "$399.99", 4),
    createProduct("Smart Distribution Board", "https://images.unsplash.com/photo-1581092160607-ee52953789c8", "IoT-enabled DB.", "$249.99", 5, true),
    createProduct("Outdoor Waterproof Cabinet", "https://images.unsplash.com/photo-1586864301279-ab8be21e6a82", "Weather-resistant cabinet.", "$189.99", 4),
    createProduct("MCB Box 8-Way", "https://images.unsplash.com/photo-1562183241-0f0fb8eac315", "8-way protection MCB box.", "$99.00", 4),
    createProduct("Surface Mount Panel", "https://images.unsplash.com/photo-1599492561173-890cdd3dbd16", "Easy-to-install surface panel.", "$69.00", 3)
  ];

  const wires = [
    createProduct("Copper Building Wire (100m)", "https://images.unsplash.com/photo-1624969862644-791f3dc98927", "High-quality copper building wire.", "$79.99", 5),
    createProduct("Armored Cable (50m)", "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c", "Steel wire armored cable.", "$129.99", 4),
    createProduct("Fire Resistant Cable (25m)", "https://images.unsplash.com/photo-1558959847-a71ae80fe735", "Fire-safe cabling.", "$149.99", 5, true),
    createProduct("Network Cable Cat6 (100m)", "https://images.unsplash.com/photo-1614064641938-3bbee52942c7", "Ethernet Cat6 cable.", "$59.99", 5),
    createProduct("Fiber Optic Cable", "https://images.unsplash.com/photo-1603986991481-e91ccfcb8f86", "High-speed optical cable.", "$199.99", 4),
    createProduct("Aluminum Service Wire", "https://images.unsplash.com/photo-1593032457866-e4ed1b9b26b6", "Overhead wiring solution.", "$89.99", 3)
  ];

  const accessories = [
    createProduct("Modular Wall Switches", "https://images.unsplash.com/photo-1563874257547-d19fbb71b46c", "Modern design modular switches.", "$12.99", 4),
    createProduct("Industrial Sockets Set", "https://images.unsplash.com/photo-1532959801411-cf64d5dddd73", "Heavy-duty sockets.", "$29.99", 5),
    createProduct("Smart Wi-Fi Power Outlets", "https://images.unsplash.com/photo-1558002038-1055907df827", "Remote-controlled outlets.", "$34.99", 4, true),
    createProduct("Cable Management System", "https://images.unsplash.com/photo-1603539279542-e5fc757026ba", "Wire organizers and trays.", "$19.99", 5),
    createProduct("Electric Bell", "https://images.unsplash.com/photo-1593941707874-efb51c5e5e93", "Electric door bell for homes.", "$9.99", 4),
    createProduct("Voltage Tester", "https://images.unsplash.com/photo-1615065603463-82c1ac7f4b9c", "Handheld voltage indicator.", "$14.99", 5)
  ];

  const lighting = [
    createProduct("LED Bulb 9W", "https://images.unsplash.com/photo-1589739905272-9b8c96fe59dd", "Energy-efficient LED bulb.", "$4.99", 5),
    createProduct("Tube Light 18W", "https://images.unsplash.com/photo-1637165038605-f54e44e1a435", "Long-lasting tube light.", "$7.99", 4),
    createProduct("Ceiling Panel Light", "https://images.unsplash.com/photo-1623150823819-6e5f4b334d75", "Recessed LED panel light.", "$19.99", 5),
    createProduct("Emergency Light", "https://images.unsplash.com/photo-1602691346066-e95f8cb3c2f1", "Rechargeable LED emergency light.", "$24.99", 4),
    createProduct("Bulb Holders Pack", "https://images.unsplash.com/photo-1558980672-91dfe9b3f618", "10x B22 bulb holders.", "$5.99", 3),
    createProduct("Spotlight Fixture", "https://images.unsplash.com/photo-1586350986603-3b42f5451c37", "Adjustable spotlight fitting.", "$15.99", 4)
  ];

  const conduits = [
    createProduct("PVC Electrical Conduit (25mm)", "https://images.unsplash.com/photo-1649360895486-df567c92f0f1", "Flexible and durable PVC pipe.", "$1.99", 4),
    createProduct("Flexible Conduit Roll", "https://images.unsplash.com/photo-1620996409374-2c9ab0321fcb", "Flexible pipe for tight spaces.", "$9.99", 4),
    createProduct("Conduit Junction Box", "https://images.unsplash.com/photo-1596782394791-b5c4df1a10f0", "Plastic 4-way box for conduits.", "$2.49", 5),
    createProduct("PVC Elbow Joint", "https://images.unsplash.com/photo-1621258169486-10f2b967d9da", "For right angle turns in wiring.", "$0.99", 4),
    createProduct("HDPE Underground Pipe", "https://images.unsplash.com/photo-1637191797232-e4cc1ffbc3e2", "Heavy-duty underground conduit.", "$19.99", 5),
    createProduct("Surface Mounting Box", "https://images.unsplash.com/photo-1601084882011-f5dc65c5e4f6", "PVC mounting box for switches.", "$1.49", 3)
  ];

  const tabs = [
    { id: 'switchboards', label: 'Switch Boards', products: switchboards },
    { id: 'wires', label: 'Wires & Cables', products: wires },
    { id: 'accessories', label: 'Accessories', products: accessories },
    { id: 'lighting', label: 'Lighting', products: lighting },
    { id: 'conduits', label: 'Conduits & Pipes', products: conduits }
  ];

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-industry-900 mb-4">Electrical Components</h1>
            <p className="text-lg text-industry-700 max-w-3xl mx-auto">
              Top-tier electrical products for safe, efficient installations across all sectors.
            </p>
            <div className="max-w-md mx-auto mt-6">
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

          <Tabs defaultValue="switchboards">
            <TabsList className="flex flex-wrap justify-center mb-8 gap-2">
              {tabs.map(({ id, label }) => (
                <TabsTrigger key={id} value={id} className="text-base px-5 py-2.5">{label}</TabsTrigger>
              ))}
            </TabsList>

            {tabs.map(({ id, products }) => (
              <TabsContent key={id} value={id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products
                    .filter(product =>
                      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      product.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product, index) => (
                      <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                        <ProductCard {...product} />
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-industry-900 mb-4">Need Custom Electrical Solutions?</h2>
                <p className="text-industry-700 mb-6">
                  Need help sourcing specific components? Our experts can customize and advise.
                </p>
                <Button className="bg-electric-600 hover:bg-electric-700 text-white">
                  Request a Consultation
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12" 
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
