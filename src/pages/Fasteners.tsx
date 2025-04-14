
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench } from 'lucide-react';

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  categories: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, description, categories }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
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
        <Button variant="outline" className="text-electric-600 hover:text-electric-700 border-electric-300 hover:bg-electric-50 group">
          View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

const Fasteners = () => {
  const products = [
    {
      name: "Hex Bolts",
      image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&q=80&w=600&h=400",
      description: "High-strength hex bolts for structural applications, available in various grades and finishes.",
      categories: ["Construction", "Steel", "Structural"]
    },
    {
      name: "Self-Tapping Screws",
      image: "https://images.unsplash.com/photo-1611079829529-23db09f66251?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Create their own threads as they're driven into material, eliminating the need for pre-drilling.",
      categories: ["Wood", "Metal", "Self-drilling"]
    },
    {
      name: "Hexagonal Nuts",
      image: "https://images.unsplash.com/photo-1594921728553-fccbb6051d1c?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Compatible with hex bolts and threaded rods, available in standard and heavy patterns.",
      categories: ["Steel", "Brass", "Stainless"]
    },
    {
      name: "Lock Washers",
      image: "https://images.unsplash.com/photo-1615147342761-9238e15d8ba6?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Prevent loosening of threaded fasteners due to vibration and torque.",
      categories: ["Split", "Toothed", "External"]
    },
    {
      name: "Carriage Bolts",
      image: "https://images.unsplash.com/photo-1602706294170-1ce5019a2840?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Feature a smooth, rounded head with a square section underneath that locks into the material.",
      categories: ["Wood", "Square-neck", "Construction"]
    },
    {
      name: "Machine Screws",
      image: "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Used with pre-tapped holes or nuts, available with various drive types and head styles.",
      categories: ["Phillips", "Slotted", "Precision"]
    },
    {
      name: "Anchors",
      image: "https://images.unsplash.com/photo-1517646331032-9e8d337c95e6?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Specialized fasteners designed to attach objects to concrete, brick, stone, and other masonry.",
      categories: ["Wall", "Concrete", "Toggle"]
    },
    {
      name: "Rivets",
      image: "https://images.unsplash.com/photo-1473621038790-b778b4750efe?auto=format&fit=crop&q=80&w=600&h=400",
      description: "Permanent mechanical fasteners that create strong joints in applications where access is limited.",
      categories: ["Blind", "Solid", "Industrial"]
    },
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                <ProductCard 
                  name={product.name}
                  image={product.image}
                  description={product.description}
                  categories={product.categories}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-electric-100" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-industry-900 mb-4">Custom Fastener Solutions</h2>
            <p className="text-industry-700 mb-6">
              Don't see exactly what you need? We offer custom fastener manufacturing services to meet your specific requirements. 
              Our engineering team can work with you to design and produce fasteners tailored to your application.
            </p>
            <Button className="bg-industry-700 hover:bg-industry-800 text-white group">
              Inquire About Custom Orders <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Fasteners;
