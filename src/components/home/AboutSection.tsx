
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const strengths = [
    '25+ years of industry experience',
    'ISO 9001:2015 certified quality management',
    'Nationwide distribution network',
    'Technical support from expert engineers',
    'Custom manufacturing capabilities',
  ];

  return (
    <section className="py-20 bg-industry-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80&w=600&h=800" 
                  alt="Our Manufacturing Plant" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-electric-500 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-2xl font-bold">25+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
          
          <div className="reveal-right">
            <h2 className="text-3xl font-bold text-industry-900 mb-4">About BoltWorks</h2>
            <p className="text-lg text-industry-700 mb-6">
              Since 1998, BoltWorks has been a leading supplier of high-quality fasteners and electrical components to industries across the nation. Our commitment to excellence and innovation has established us as a trusted partner for businesses of all sizes.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-industry-800 mb-3">Our Strengths</h3>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-electric-500 mr-2" />
                    <span className="text-industry-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to="/about">
              <Button size="lg" className="bg-industry-700 hover:bg-industry-800 text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
