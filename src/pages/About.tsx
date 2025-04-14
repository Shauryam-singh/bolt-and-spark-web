
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Clock, Globe, Shield } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: "1998",
      title: "Company Founded",
      description: "Shayam Venchers was established as a small trading business in industrial supplies."
    },
    {
      year: "2005",
      title: "Manufacturing Begins",
      description: "Started our own manufacturing facility for fasteners with state-of-the-art equipment."
    },
    {
      year: "2010",
      title: "Electrical Division",
      description: "Expanded our product range to include electrical components and solutions."
    },
    {
      year: "2015",
      title: "ISO Certification",
      description: "Achieved ISO 9001:2015 certification for our quality management system."
    },
    {
      year: "2020",
      title: "Nationwide Expansion",
      description: "Established distribution centers across the country to better serve our customers."
    }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-electric-600" />,
      title: "Quality",
      description: "We never compromise on the quality of our products, ensuring they meet the highest industry standards."
    },
    {
      icon: <Users className="h-8 w-8 text-electric-600" />,
      title: "Customer Focus",
      description: "Our customers' needs are at the center of everything we do, from product development to after-sales service."
    },
    {
      icon: <Award className="h-8 w-8 text-electric-600" />,
      title: "Innovation",
      description: "We continuously invest in new technologies and methods to improve our products and processes."
    },
    {
      icon: <Clock className="h-8 w-8 text-electric-600" />,
      title: "Reliability",
      description: "Consistency in quality, delivery times, and customer service that you can depend on."
    },
    {
      icon: <Globe className="h-8 w-8 text-electric-600" />,
      title: "Sustainability",
      description: "Committed to environmentally responsible manufacturing practices and reducing our carbon footprint."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-industry-900 mb-6" data-aos="fade-up">About Shayam Venchers</h1>
            <p className="text-lg text-industry-700 mb-8" data-aos="fade-up" data-aos-delay="100">
              For over 25 years, we've been at the forefront of manufacturing high-quality fasteners and electrical components, 
              serving industries across the nation with reliable products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <h2 className="text-3xl font-bold text-industry-900 mb-5">Our Story</h2>
              <p className="text-industry-700 mb-4">
                Founded in 1998, Shayam Venchers began as a small trading business specializing in industrial supplies. With a vision to provide high-quality components to the manufacturing sector, we quickly established ourselves as a reliable partner for businesses of all sizes.
              </p>
              <p className="text-industry-700 mb-4">
                In 2005, we took a significant step forward by establishing our own manufacturing facility for fasteners. This move allowed us to have greater control over quality and innovate with custom solutions tailored to our customers' needs.
              </p>
              <p className="text-industry-700 mb-6">
                Today, with our expanded product line including electrical components and nationwide distribution network, we continue to grow while maintaining our commitment to quality, innovation, and customer satisfaction.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center">
                  <div className="bg-industry-100 p-3 rounded-full mr-3">
                    <Users className="h-6 w-6 text-industry-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-industry-900">200+</h4>
                    <p className="text-sm text-industry-600">Team Members</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-industry-100 p-3 rounded-full mr-3">
                    <Globe className="h-6 w-6 text-industry-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-industry-900">1000+</h4>
                    <p className="text-sm text-industry-600">Clients Nationwide</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-industry-100 p-3 rounded-full mr-3">
                    <Award className="h-6 w-6 text-industry-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-industry-900">25+</h4>
                    <p className="text-sm text-industry-600">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 reveal-right">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80&w=600&h=600" 
                  alt="Our Factory" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600&h=600" 
                  alt="Our Products" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1622473590773-f588134b6ce9?auto=format&fit=crop&q=80&w=600&h=600" 
                  alt="Quality Control" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600&h=600" 
                  alt="Our Team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-industry-900 mb-4 reveal">Our Values</h2>
            <p className="text-lg text-industry-700 reveal">
              The principles that guide our business and shape our culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-electric-100 p-3 rounded-full inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-industry-900 mb-2">{value.title}</h3>
                <p className="text-industry-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-industry-900 mb-4 reveal">Our Journey</h2>
            <p className="text-lg text-industry-700 reveal">
              Key milestones in our company's history
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-electric-200"></div>
            
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
              >
                <div className="md:w-1/2 flex justify-center items-center">
                  <div className="p-6 bg-white rounded-lg shadow-md border border-electric-100 max-w-md">
                    <div className="text-electric-600 font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-lg font-bold text-industry-900 mb-2">{milestone.title}</h3>
                    <p className="text-industry-700">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex justify-center items-center md:w-0">
                  <div className="w-5 h-5 rounded-full bg-electric-500"></div>
                </div>
                
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-industry-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6" data-aos="fade-up">Ready to Work With Us?</h2>
            <p className="text-lg text-industry-300 mb-8" data-aos="fade-up" data-aos-delay="100">
              Whether you're looking for standard components or custom solutions, 
              our team is here to help you find the right products for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
              <Link to="/contact">
                <Button size="lg" className="bg-electric-500 hover:bg-electric-600 text-white">
                  Contact Us Today
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Explore Our Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
