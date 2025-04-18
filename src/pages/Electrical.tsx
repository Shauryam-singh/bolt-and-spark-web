
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
  id: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description, categories, price, isNew }) => {
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
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-industry-900">{price}</span>
          <Link to={`/electrical/${id}`}>
            <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 group">
              View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Electrical = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const switchboards = [
    {
      id: "distribution-board-12-way",
      name: "Distribution Board 12-Way",
      image: "https://cdn.moglix.com/p/LJQ1jN6NcFNt7-xxlarge.jpg",
      description: "12-way DB with MCB protection.",
      categories: ["Distribution", "Protection", "Commercial"],
      price: "$149.99",
      isNew: true
    },
    {
      id: "industrial-switchboard",
      name: "Industrial Switchboard",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ru5uHeu7wf0TTn73g5tl9zkpFd2tccqFmA&s",
      description: "Heavy-duty industrial switchboard.",
      categories: ["Industrial", "Heavy-duty", "Power"],
      price: "$399.99",
      isNew: false
    },
    {
      id: "smart-distribution-board",
      name: "Smart Distribution Board",
      image: "https://powereasy.in/assets/images/products/main/smart-db/single-phase/smart-db-single-phase.png",
      description: "IoT-enabled DB.",
      categories: ["Smart", "IoT", "Automation"],
      price: "$249.99",
      isNew: true
    },
    {
      id: "outdoor-waterproof-cabinet",
      name: "Outdoor Waterproof Cabinet",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTexWTeW6IeUBRN3QT6CWf5fypeoKS_FbI5kn2uv0BQLGIAX-EOUZ-pvJrQYHaNvfjFEfU&usqp=CAU",
      description: "Weather-resistant cabinet.",
      categories: ["Outdoor", "Waterproof", "Protection"],
      price: "$189.99",
      isNew: false
    },
    {
      id: "load-center-8-way",
      name: "Load Center 8-Way",
      image: "https://s.alicdn.com/@sc04/kf/HTB1rha7KkSWBuNjSszdq6zeSpXaT.jpg_720x720q50.jpg",
      description: "8-way load center for residential and commercial use.",
      categories: ["Residential", "Commercial", "Power"],
      price: "$129.99",
      isNew: true
    },
    {
      id: "heavy-duty-power-switchboard",
      name: "Heavy Duty Power Switchboard",
      image: "https://tiimg.tistatic.com/fp/1/007/875/rectangular-shape-plastic-electrical-switch-board-for-home-and-office--449.jpg",
      description: "For heavy industrial applications.",
      categories: ["Industrial", "Heavy-duty", "Power"],
      price: "$499.99",
      isNew: false
    },
    {
      id: "panelboard-24-way",
      name: "Panelboard 24-Way",
      image: "https://5.imimg.com/data5/SX/TN/FJ/SELLER-4015706/electric-distribution-board-500x500.jpg",
      description: "24-way panelboard for large-scale systems.",
      categories: ["Industrial", "Power", "Commercial"],
      price: "$559.99",
      isNew: true
    },
    {
      id: "compact-distribution-board",
      name: "Compact Distribution Board",
      image: "https://3.imimg.com/data3/EW/OH/MY-2693575/compact-distribution-board-500x500.jpg",
      description: "Compact distribution board for smaller installations.",
      categories: ["Residential", "Compact", "Energy"],
      price: "$99.99",
      isNew: false
    }
  ];

  const wires = [
    {
      id: "copper-building-wire-100m",
      name: "Copper Building Wire (100m)",
      image: "https://image.made-in-china.com/202f0j00CicbyIUzgEkD/Weight-Copper-Cable-Cable-Electrical-Italy-100m-Power-Cable.jpg",
      description: "High-quality copper building wire.",
      categories: ["Copper", "Building", "Industrial"],
      price: "$79.99",
      isNew: true
    },
    {
      id: "armored-cable-50m",
      name: "Armored Cable (50m)",
      image: "https://m.media-amazon.com/images/I/51rofQXGpKL.jpg",
      description: "Steel wire armored cable.",
      categories: ["Armored", "Steel", "Industrial"],
      price: "$129.99",
      isNew: false
    },
    {
      id: "fire-resistant-cable-25m",
      name: "Fire Resistant Cable (25m)",
      image: "https://media.screwfix.com/is/image/ae235/339PF_P?$fxSharpen$=&wid=257&hei=257&dpr=on",
      description: "Fire-safe cabling.",
      categories: ["Fire Resistant", "Safety", "Building"],
      price: "$149.99",
      isNew: true
    },
    {
      id: "electrical-pvc-insulated-cable",
      name: "Electrical PVC Insulated Cable",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftG1mNNmxE825d7ZuOfJfzKwHAxIyhs9eTQ&s",
      description: "PVC insulated cable for general wiring.",
      categories: ["PVC", "Insulated", "Building"],
      price: "$49.99",
      isNew: false
    },
    {
      id: "flexible-extension-cable-10m",
      name: "Flexible Extension Cable (10m)",
      image: "https://m.media-amazon.com/images/I/61+neQ3vAzL._AC_UF1000,1000_QL80_.jpg",
      description: "Flexible and durable extension cable.",
      categories: ["Flexible", "Extension", "Power"],
      price: "$19.99",
      isNew: false
    },
    {
      id: "multi-core-cable-100m",
      name: "Multi-Core Cable (100m)",
      image: "https://5.imimg.com/data5/CU/IK/JC/SELLER-3059229/electrical-wires-1-mm-4-core-500x500.jpg",
      description: "Multi-core cable for various applications.",
      categories: ["Multi-Core", "Industrial", "Power"],
      price: "$189.99",
      isNew: true
    },
    {
      id: "low-voltage-power-cable",
      name: "Low Voltage Power Cable",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZTxgCL5Sq9nLsAaRxMK7vL356yLKswISNg&s",
      description: "Low voltage cable for power distribution.",
      categories: ["Low Voltage", "Power", "Building"],
      price: "$99.99",
      isNew: false
    }
  ];

  const accessories = [
    {
      id: "modular-wall-switches",
      name: "Modular Wall Switches",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/352782418/GA/AJ/KV/90013704/black-modular-electrical-switch-boards.jpg",
      description: "Modern design modular switches.",
      categories: ["Modular", "Switches", "Residential"],
      price: "$12.99",
      isNew: false
    },
    {
      id: "industrial-sockets-set",
      name: "Industrial Sockets Set",
      image: "https://images-cdn.ubuy.co.in/661730a73ce78476ff438d8b-industrial-plug-socket-3-phase-plug-4.jpg",
      description: "Heavy-duty sockets.",
      categories: ["Industrial", "Sockets", "Power"],
      price: "$29.99",
      isNew: false
    },
    {
      id: "smart-wi-fi-power-outlets",
      name: "Smart Wi-Fi Power Outlets",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU35Bo-yaB3gHwjCyhRedXTNtdMEQpqT20UsQaC2vW9IOo2SALjufLk0Hvv4jgVkwyDKk&usqp=CAU",
      description: "Remote-controlled outlets.",
      categories: ["Smart", "Wi-Fi", "Automation"],
      price: "$34.99",
      isNew: true
    },
    {
      id: "ceiling-fan-regulator",
      name: "Ceiling Fan Regulator",
      image: "https://havells.com/media/catalog/product/cache/844a913d283fe95e56e39582c5f2767b/import/REO-Switches/AHERFXW001.jpg",
      description: "Regulate ceiling fan speed.",
      categories: ["Fan", "Regulator", "Residential"],
      price: "$18.99",
      isNew: false
    },
    {
      id: "power-strip-with-usb",
      name: "Power Strip with USB",
      image: "https://m.media-amazon.com/images/I/71FtSiqsK3L.jpg",
      description: "Power strip with multiple outlets and USB ports.",
      categories: ["Power", "USB", "Accessories"],
      price: "$25.99",
      isNew: true
    },
    {
      id: "smart-led-light-switch",
      name: "Smart LED Light Switch",
      image: "https://img.joomcdn.net/ddb08b986aa428e819f3e5f70791d46e5c0e9794_original.jpeg",
      description: "Smart LED light switch for modern homes.",
      categories: ["Smart", "LED", "Switches"],
      price: "$29.99",
      isNew: false
    },
    {
      id: "surge-protector-power-strip",
      name: "Surge Protector Power Strip",
      image: "https://honeywellconnection.com/in/wp-content/uploads/2024/08/1-2.jpg",
      description: "Surge protector power strip with 6 outlets.",
      categories: ["Surge Protector", "Power", "Safety"],
      price: "$19.99",
      isNew: false
    }
  ];

  const filterProducts = (products: ProductCardProps[]) => {
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
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Electrical;
