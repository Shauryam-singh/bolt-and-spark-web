
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center bg-gradient-to-r from-industry-900 via-industry-800 to-industry-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border-r border-t border-industry-100"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            HS Industries: Engineering Excellence
          </h1>
          <p 
            className="text-lg md:text-xl text-industry-100 mb-8"
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            Premium quality fasteners and electrical components that meet the highest industry standards
          </p>
          <div 
            className="flex flex-wrap gap-4"
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            <Button size="lg" className="bg-electric-500 hover:bg-electric-600 text-white" onClick={scrollToProducts}>
              Explore Products
            </Button>
            <Button size="lg" className="bg-transparent border border-white hover:bg-white/10 text-white">
              Request Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={scrollToProducts} className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
