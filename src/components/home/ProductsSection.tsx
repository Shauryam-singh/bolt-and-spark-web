
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Bolt, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  linkTo: string;
  delay: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, description, linkTo, delay }) => {
  return (
    <Card 
      className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-electric-100"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-96 h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-xl text-industry-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <CardDescription className="text-industry-600">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link to={linkTo} className="inline-flex items-center text-electric-600 hover:text-electric-700 font-medium">
          View Details <ArrowRight size={16} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

const ProductCategorySection: React.FC<{
  title: string;
  description: string;
  products: Array<{
    image: string;
    title: string;
    description: string;
    linkTo: string;
  }>;
  icon: React.ReactNode;
  linkTo: string;
}> = ({ title, description, products, icon, linkTo }) => {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-3 mb-4" data-aos="fade-up">
        <div className="bg-electric-100 p-2 rounded-full">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-industry-900">{title}</h3>
      </div>
      <p className="text-lg text-industry-700 mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="50">
        {description}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
            linkTo={product.linkTo}
            delay={index * 100 + 100}
          />
        ))}
      </div>
      
      <div className="text-center" data-aos="fade-up">
        <Link to={linkTo}>
          <Button 
            size="lg" 
            className="bg-industry-700 hover:bg-industry-800 text-white"
          >
            Explore More {title} <ArrowRight size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const fastenerProducts = [
    {
      image: "https://m.media-amazon.com/images/I/61VIHcLUrlL.jpg",
      title: "Socket Screws",
      description: "The socket head cap screws are 100% stainless steel 304 (A2-70), which is corrosion resistant and durable.",
      linkTo: "/fasteners/socket-screws",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPhNDhgro-YrCPzmUlvrS-xsLHkKzyl5Q5w&s",
      title: "Durlok",
      description: "Self locking, Anti Vibration Fasteners, Durlok Fasteners are used in various applications.",
      linkTo: "/fasteners/durlok",
    },
    {
      image: "https://www.fastdep.in/images/product/ss-hex-bolt-inch_hu1f6ff40bf773d9b8df443a823106ec08_400315_750x750_resize_q85_box.jpg",
      title: "Hex Bolts",
      description: "Hex bolts are used in a variety of applications, including construction, automotive, and machinery.",
      linkTo: "/fasteners/hex-bolt",
    },
    {
      image: "https://images-cdn.ubuy.co.in/667e6bc2bd456f54a4352a6b-5-16-18-50pcs-stainless-steel-hex-nuts.jpg",
      title: "Hex Nut",
      description: "Hex nuts are used in conjunction with hex bolts to fasten two or more parts together.",
      linkTo: "/fasteners/hex-nut",
    },
    {
      image: "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg",
      title: "Washers",
      description: "Washers are used to distribute the load of a threaded fastener, such as a screw or nut.",
      linkTo: "/fasteners/washers",
    },
  ];

  const electricalProducts = [
    {
      image: "https://5.imimg.com/data5/SELLER/Default/2024/5/417420416/QS/BR/BX/114588085/power-distribution-board.png",
      title: "Power Distribution Boards",
      description: "Reliable and safe electrical distribution systems for residential and commercial use.",
      linkTo: "/electrical/distribution-board-12-way",
    },
    {
      image: "https://img500.exportersindia.com/product_images/bc-500/2020/7/2154824/electric-cables-1594103183-4557025.jpeg",
      title: "Premium Cables",
      description: "High-quality electrical wires and cables designed for efficiency and long-lasting performance.",
      linkTo: "/electrical/electrical-pvc-insulated-cable",
    },
    {
      image: "https://www.generatorsource.com/getattachment/Articles/Generator-Info/How-to-Choose-a-Circuit-Breaker/Circuit-Breakers.jpg.aspx?lang=en-US", // Replace with actual image link
      title: "Circuit Breakers",
      description: "Protect your electrical circuits with our high-quality circuit breakers designed for safety.",
      linkTo: "/electrical",
    },
    {
      image: "https://5.imimg.com/data5/WZ/MT/OX/SELLER-38763336/hosper-roma-modular-switch-500x500.jpg", // Replace with actual image link
      title: "Electrical Switches",
      description: "Durable and easy-to-use electrical switches for both residential and commercial use.",
      linkTo: "/electrical/modular-wall-switches",
    },
    {
      image: "https://www.crestonhardware.com/cdn/shop/products/4_FW8420.png?v=1740970055", // Replace with actual image link
      title: "Voltage Regulators",
      description: "Maintain steady voltage levels with our reliable voltage regulators for all applications.",
      linkTo: "/electrical",
    },
  ];
  
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-industry-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-industry-900 mb-4 reveal">Our Product Range</h2>
          <p className="text-lg text-industry-700 max-w-2xl mx-auto reveal">
            Shayam Venchers offers a comprehensive selection of high-quality fasteners and electrical components for all your project needs.
            Shayam Venchers offers a comprehensive selection of high-quality fasteners and electrical components for all your project needs.
          </p>
        </div>

        <ProductCategorySection
          title="Fasteners"
          description="Our fasteners are manufactured to the highest industry standards, providing reliable and durable solutions for all your construction and manufacturing needs."
          products={fastenerProducts}
          icon={<Wrench size={24} className="text-electric-600" />}
          linkTo="/fasteners"
        />

        <ProductCategorySection
          title="Electrical Components"
          description="High-grade electrical components designed for safety, efficiency, and longevity, suitable for both residential and commercial applications."
          products={electricalProducts}
          icon={<Bolt size={24} className="text-electric-600" />}
          linkTo="/electrical"
        />
        <ProductCategorySection
          title="Fasteners"
          description="Our fasteners are manufactured to the highest industry standards, providing reliable and durable solutions for all your construction and manufacturing needs."
          products={fastenerProducts}
          icon={<Wrench size={24} className="text-electric-600" />}
          linkTo="/fasteners"
        />

        <ProductCategorySection
          title="Electrical Components"
          description="High-grade electrical components designed for safety, efficiency, and longevity, suitable for both residential and commercial applications."
          products={electricalProducts}
          icon={<Bolt size={24} className="text-electric-600" />}
          linkTo="/electrical"
        />
      </div>
    </section>
  );
};

export default ProductsSection;
