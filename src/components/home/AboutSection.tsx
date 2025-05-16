import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const strengths = [
    'Driven by innovation and customer-first approach',
    'Young and dynamic team of professionals',
    'Agile product development and rapid prototyping',
    'Commitment to quality and reliability',
    'Vision to transform the industry with smart solutions',
  ];

  return (
    <section className="py-20 bg-industry-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="t">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80&w=600&h=800" 
                  alt="Team at Work" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-electric-500 text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-2xl font-bold">2025</p>
                <p className="text-sm">Our Journey Begins</p>
              </div>
            </div>
          </div>
          
          <div className="">
            <h2 className="text-3xl font-bold text-industry-900 mb-4">About Shayama Ventures</h2>
            <p className="text-lg text-industry-700 mb-6">
              Shayama Ventures is a newly launched startup with a bold vision to redefine how fasteners and electrical components are sourced and delivered. Built on passion and purpose, we aim to blend cutting-edge technology with quality manufacturing to meet the demands of modern industries.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-industry-800 mb-3">Our Mission</h3>
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
                Learn More About Our Vision
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
