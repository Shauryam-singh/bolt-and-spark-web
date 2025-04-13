
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  linkTo: string;
  delay: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, description, linkTo, delay }) => {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-industry-800">{title}</h3>
        <p className="text-industry-600 mb-4">{description}</p>
        <Link to={linkTo} className="inline-flex items-center text-electric-600 hover:text-electric-700 font-medium">
          Explore <ArrowRight size={18} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const productCategories = [
    {
      image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&q=80&w=600&h=400",
      title: "Fasteners",
      description: "High-quality nuts, bolts, screws, and specialized fasteners for every industrial need.",
      linkTo: "/fasteners",
      delay: 100,
    },
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400",
      title: "Switch Boards",
      description: "Reliable and safe electrical distribution systems for residential and commercial use.",
      linkTo: "/electrical",
      delay: 200,
    },
    {
      image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&q=80&w=600&h=400",
      title: "Wires & Cables",
      description: "Premium electrical wires and cables designed for efficiency and long-lasting performance.",
      linkTo: "/electrical",
      delay: 300,
    },
    {
      image: "https://images.unsplash.com/photo-1566064352554-f36ef0ef23b2?auto=format&fit=crop&q=80&w=600&h=400",
      title: "Industrial Connectors",
      description: "Specialized connectors for various industrial applications, ensuring reliable connections.",
      linkTo: "/electrical",
      delay: 400,
    },
  ];

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-industry-900 mb-4 reveal">Our Product Range</h2>
          <p className="text-lg text-industry-700 max-w-2xl mx-auto reveal">
            Comprehensive selection of high-quality fasteners and electrical components for all your project needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((product, index) => (
            <ProductCard 
              key={index}
              image={product.image}
              title={product.title}
              description={product.description}
              linkTo={product.linkTo}
              delay={product.delay}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-industry-700 hover:bg-industry-800 text-white"
            data-aos="fade-up"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
