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
  isNew?: boolean;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, description, categories, isNew, price }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      {isNew && (
        <div className="bg-secondary text-white text-xs font-bold px-3 py-1 absolute top-2 right-2 rounded-full">
          New
        </div>
      )}
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
          {price && <p className="text-lg font-bold text-industry-900">{price}</p>}
          <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        </div>
    </div>
  );
};

const Fasteners = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const createProduct = (
    name: string,
    image: string,
    description: string,
    price: string,
    categories: string[],
    isNew = false
  ) => ({ name, image, description, price, categories, isNew });

  const industrialFasteners = [
    createProduct("Socket Screws", "https://m.media-amazon.com/images/I/61VIHcLUrlL.jpg", "High-torque rated socket screws for precision.", "$1.99", ["Hex", "Allen", "Industrial"], true),
    createProduct("Durlok", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPhNDhgro-YrCPzmUlvrS-xsLHkKzyl5Q5w&s", "Vibration-resistant patented fastener system.", "$2.49", ["Self-locking", "Anti-vibration", "Heavy-duty"]),
    createProduct("Hex Bolt", "https://www.fastdep.in/images/product/ss-hex-bolt-inch_hu1f6ff40bf773d9b8df443a823106ec08_400315_750x750_resize_q85_box.jpg", "Reliable steel hex bolts for construction and machinery.", "$0.75", ["Steel", "Stainless", "Galvanized"]),
    createProduct("Hex Nut", "https://images-cdn.ubuy.co.in/667e6bc2bd456f54a4352a6b-5-16-18-50pcs-stainless-steel-hex-nuts.jpg", "Standard fastening nuts for bolts.", "$0.35", ["Steel", "Stainless", "Brass"]),
    createProduct("Carriage Bolts", "https://www.boltdepot.com/images/catalog/Carriage-bolt-full-thread-steel-zinc.jpg", "Wood-to-wood bolts with smooth rounded heads.", "$0.99", ["Wood", "Rounded Head", "Zinc"], true),
    createProduct("Stud Bolts", "https://cdn11.bigcommerce.com/s-04e33/images/stencil/1280x1280/products/2510/2453/stud-bolts__30392.1638797286.jpg", "Heavy-duty bolting for pipelines.", "$3.75", ["Industrial", "Flange", "Steel"]),
    createProduct("U-Bolts", "https://www.boltdepot.com/images/catalog/U-bolt-round-steel-zinc.jpg", "Secure piping and round objects to surfaces.", "$1.25", ["Pipe", "Support", "Zinc"]),
    createProduct("Eye Bolts", "https://www.boltdepot.com/images/catalog/Eyebolt-shoulder-lag-stainless.jpg", "Secure rigging for ropes and cables.", "$1.99", ["Rigging", "Lifting", "Stainless"]),
    createProduct("Threaded Rods", "https://www.boltdepot.com/images/catalog/Threaded-rod-steel-zinc.jpg", "Full-length threaded rods for structural support.", "$2.49", ["Rod", "Threaded", "Support"]),
    createProduct("Flange Bolts", "https://cdn11.bigcommerce.com/s-85a5e/images/stencil/1280x1280/products/697/3770/hex-flange-bolts-yellow-zinc-1__83014.1574962443.jpg", "Integrated washer bolts for better clamping.", "$1.85", ["Steel", "Integrated Washer", "High Torque"]),
    createProduct("Anchor Bolts", "https://5.imimg.com/data5/QB/BP/MY-49540910/anchor-bolts.jpg", "Anchor supports into concrete foundations.", "$2.99", ["Concrete", "Structural", "Heavy-duty"])
  ];

  const specialtyFasteners = [
    createProduct("Washers", "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg", "Distributes load and reduces surface damage.", "$0.20", ["Flat", "Lock", "Fender"], true),
    createProduct("Structural Assemblies", "https://www.allfasteners.com.au/pub/media/catalog/product/cache/edb9286c9d01d6f06c69c30d5c8dd932/6/d/6d.001_3_4.jpg", "Pre-assembled fastener kits for heavy-duty jobs.", "$4.99", ["Heavy-duty", "Industrial", "Construction"]),
    createProduct("Panel Fasteners", "https://www.electronicspecifier.com/uploads/images/1b9d8d42b61db0540717b6377b46c356.jpg", "Quick-access fasteners for removable panels.", "$1.49", ["Removable", "Panel", "Quick-Release"]),
    createProduct("Captive Screws", "https://cdn.shopify.com/s/files/1/0020/7603/9960/products/captive-screw_1800x1800.jpg", "Retains screws in place even when loosened.", "$1.25", ["Non-removable", "Safety", "Panel"]),
    createProduct("Spring Clips", "https://5.imimg.com/data5/SELLER/Default/2021/4/RO/QD/XB/49294891/industrial-metal-spring-clip-500x500.jpg", "Retaining clips for tension-secured components.", "$0.89", ["Retaining", "Tension", "Metal"]),
    createProduct("Shear Bolts", "https://5.imimg.com/data5/BG/HY/VJ/SELLER-81245025/shear-bolts-500x500.jpg", "Tamper-proof bolts break at a preset torque.", "$1.99", ["Security", "Tamper-proof", "Controlled Torque"]),
    createProduct("Security Screws", "https://www.boltdepot.com/images/catalog/Security-screw-pin-hex-stainless.jpg", "Special removal tools required.", "$0.75", ["Tamper-resistant", "Special Tools", "Secure"]),
    createProduct("Blind Rivets", "https://cdn11.bigcommerce.com/s-e2a4a/images/stencil/1280x1280/products/199/1329/aluminum-pop-rivets__17490.1600118659.jpg", "One-sided installation rivets.", "$0.30", ["One-sided", "Aluminum", "Structural"]),
    createProduct("Retaining Rings", "https://5.imimg.com/data5/SELLER/Default/2022/4/ZD/RJ/XF/10919470/internal-circlips-500x500.jpg", "Snap-in rings to hold assemblies together.", "$0.45", ["Circlip", "Internal", "Retaining"])
  ];

  const marineFasteners = [
    createProduct("Stainless Steel", "https://m.media-amazon.com/images/I/61nlYFCSOkL.jpg", "Marine-grade corrosion-resistant fasteners.", "$1.49", ["Marine", "Corrosion-resistant", "Outdoor"]),
    createProduct("Petrochemical Studbolts", "https://5.imimg.com/data5/SELLER/Default/2025/3/494482212/QK/GN/TQ/8047850/b7-stud-bolts-500x500.webp", "For high-temp and high-pressure chemical use.", "$3.99", ["High-temperature", "High-pressure", "Petrochemical"], true),
    createProduct("Brass Fasteners", "https://5.imimg.com/data5/SELLER/Default/2023/7/331122208/AV/QF/ME/11175268/brass-fasteners.jpg", "Naturally corrosion-resistant marine fasteners.", "$1.25", ["Marine", "Brass", "Corrosion-resistant"]),
    createProduct("316 Stainless Steel Screws", "https://www.boltdepot.com/images/catalog/Screw-sheet-metal-pan-316.jpg", "Top-tier marine-grade stainless fasteners.", "$1.99", ["316", "Marine", "High-corrosion"]),
    createProduct("Nylon Fasteners", "https://cdn11.bigcommerce.com/s-v1ztgoyc/images/stencil/1280x1280/products/674/1181/nylon-machine-screws__27470.1549409013.jpg", "Non-metallic fasteners for sensitive electronics.", "$0.65", ["Nylon", "Lightweight", "Non-metallic"]),
    createProduct("Silicon Bronze Screws", "https://cdn11.bigcommerce.com/s-c7s9hhq/images/stencil/1280x1280/products/288/2681/bronze-wood-screws__09412.1607435893.jpg", "Perfect for wooden boat building.", "$2.25", ["Bronze", "Wood", "Marine"]),
    createProduct("Titanium Fasteners", "https://m.media-amazon.com/images/I/61dguXtA3HL.jpg", "Ultra-durable titanium fasteners for marine/chemical use.", "$5.99", ["Titanium", "Premium", "Corrosion-proof"], true),
    createProduct("Duplex Steel Fasteners", "https://5.imimg.com/data5/ANDROID/Default/2022/9/OL/LP/YX/65624195/product-jpeg-500x500.jpg", "Ideal for extreme chemical environments.", "$4.75", ["Duplex", "High-strength", "Marine"])
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
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-electric-100 p-2 rounded-full">
              <Wrench size={24} className="text-electric-600" />
            </div>
            <h1 className="text-4xl font-bold text-industry-900">Fasteners</h1>
          </div>

          <p className="text-lg text-industry-700 max-w-3xl mb-12">
            Explore premium fasteners engineered for strength, corrosion-resistance, and industrial-grade performance.
          </p>

          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search fasteners by name, category, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <Tabs defaultValue="industrial" className="w-full mb-8">
            <TabsList className="w-full flex justify-center gap-4">
              <TabsTrigger value="industrial">Industrial</TabsTrigger>
              <TabsTrigger value="specialty">Specialty</TabsTrigger>
              <TabsTrigger value="marine">Marine & Chemical</TabsTrigger>
            </TabsList>

            <TabsContent value="industrial">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(industrialFasteners).map((product, idx) => (
                  <ProductCard key={idx} {...product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specialty">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(specialtyFasteners).map((product, idx) => (
                  <ProductCard key={idx} {...product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="marine">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterProducts(marineFasteners).map((product, idx) => (
                  <ProductCard key={idx} {...product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-electric-100">
            <h2 className="text-2xl font-bold text-industry-900 mb-4">Custom Fastener Solutions</h2>
            <p className="text-industry-700 mb-6">
              Need something more specific? We offer custom fasteners tailored to your technical and structural needs.
            </p>
            <Link to="/contact" className="bg-industry-700 hover:bg-industry-800 text-white inline-flex items-center px-4 py-2 rounded group">
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
