
import React from 'react';
import { Shield, Clock, Award, Truck } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="text-electric-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-industry-800">{title}</h3>
      <p className="text-industry-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield size={48} />,
      title: 'Premium Quality',
      description: 'We source only the highest quality materials and components to ensure durability and reliability.',
      delay: 100,
    },
    {
      icon: <Clock size={48} />,
      title: 'Fast Delivery',
      description: 'Our efficient logistics network ensures your orders are delivered on time, every time.',
      delay: 200,
    },
    {
      icon: <Award size={48} />,
      title: 'Industry Standards',
      description: 'All our products meet or exceed relevant industry standards and specifications.',
      delay: 300,
    },
    {
      icon: <Truck size={48} />,
      title: 'Bulk Orders',
      description: 'Special pricing and dedicated support for large volume and recurring orders.',
      delay: 400,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-industry-900 mb-4">Why Choose Shayama Venchers</h2>
          <p className="text-lg text-industry-700 max-w-2xl mx-auto">
            We take pride in delivering exceptional products and services that keep your operations running smoothly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
