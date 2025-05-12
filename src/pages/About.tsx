
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Clock, Globe, Shield } from 'lucide-react';

const About = () => {
    const milestones = [
        {
          year: "2020",
          title: "Founded",
          description: "Our journey began with a mission to simplify industrial procurement through digital innovation."
        },
        {
          year: "2021",
          title: "First Product Launch",
          description: "Launched our MVP platform to streamline B2B industrial supplies ordering for small manufacturers."
        },
        {
          year: "2022",
          title: "Seed Funding Secured",
          description: "Raised seed funding to scale operations, onboard suppliers, and enhance our logistics network."
        },
        {
          year: "2023",
          title: "Pan-India Presence",
          description: "Expanded operations across major industrial hubs with a growing supplier and customer base."
        },
        {
          year: "2024",
          title: "AI-Driven Procurement",
          description: "Integrated AI-driven demand forecasting and automated restocking to elevate supply chain efficiency."
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
            <h1 className="text-4xl md:text-5xl font-bold text-industry-900 mb-6" data-aos="fade-up">About Shayam Ventures</h1>
            <p className="text-lg text-industry-700 mb-8" data-aos="fade-up" data-aos-delay="100">
                Shayam Ventures is a bold, innovative startup on a mission to transform the future of smart manufacturing and sustainable tech. 
                With cutting-edge ideas and a passion for excellence, we’re building the next generation of products to empower industries and uplift communities.
            </p>
            </div>
        </div>
      </section>

      {/* Company Overview */}
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="">
                <h2 className="text-3xl font-bold text-industry-900 mb-5">Our Story</h2>
                <p className="text-industry-700 mb-4">
                Shayam Ventures was born out of a shared vision: to rethink how modern industries access smart, sustainable, and reliable manufacturing solutions. Founded in 2023 by a team of engineers and innovators, we set out to bridge the gap between traditional manufacturing and future-forward technologies.
                </p>
                <p className="text-industry-700 mb-4">
                From our humble beginnings in a small co-working lab, we’ve grown into a fast-moving startup, developing modular fasteners and intelligent electrical components that adapt to the needs of next-gen industries.
                </p>
                <p className="text-industry-700 mb-6">
                As we scale, our mission remains clear — to empower manufacturers and builders with tools that are not only efficient but also eco-conscious. We believe that great products come from a blend of innovation, empathy, and resilience.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center">
                    <div className="bg-industry-100 p-3 rounded-full mr-3">
                    <Users className="h-6 w-6 text-industry-700" />
                    </div>
                    <div>
                    <h4 className="font-bold text-industry-900">20+</h4>
                    <p className="text-sm text-industry-600">Core Team Members</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="bg-industry-100 p-3 rounded-full mr-3">
                    <Globe className="h-6 w-6 text-industry-700" />
                    </div>
                    <div>
                    <h4 className="font-bold text-industry-900">50+</h4>
                    <p className="text-sm text-industry-600">Clients Onboarded</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="bg-industry-100 p-3 rounded-full mr-3">
                    <Award className="h-6 w-6 text-industry-700" />
                    </div>
                    <div>
                    <h4 className="font-bold text-industry-900">1+</h4>
                    <p className="text-sm text-industry-600">Years of Disruption</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4t">
                <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                    src="https://images.unsplash.com/photo-1502810190503-8303352d0dd1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JlYXRpdmUlMjB3b3Jrc3BhY2V8ZW58MHx8MHx8fDA%3D" 
                    alt="Innovating Workspace" 
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md mt-8">
                <img 
                    src="https://images.unsplash.com/photo-1602267774924-38124c047174?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzdGVuZXJzfGVufDB8fDB8fHww" 
                    alt="Smart Prototyping" 
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                    src="https://plus.unsplash.com/premium_photo-1682129816388-22b6b6f489a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXVhbGl0eSUyMFRlc3Rpbmd8ZW58MHx8MHx8fDA%3D" 
                    alt="Quality Testing" 
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md mt-8">
                <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=600" 
                    alt="Driven Team" 
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
            <h2 className="text-3xl font-bold text-industry-900 mb-4">Our Values</h2>
            <p className="text-lg text-industry-700">
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
            <h2 className="text-3xl font-bold text-industry-900 mb-4">Our Journey</h2>
            <p className="text-lg text-industry-700">
              Key milestones in our company's history
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-electric-200"></div>

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
    <section className="py-16 bg-industry-900 text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-lg mb-6">Join hundreds of clients who trust Shayam Venchers for quality and reliability.</p>
            <Link to="/contact">
            <Button className="bg-electric-600 hover:bg-electric-700 text-white">Contact Us</Button>
            </Link>
        </div>
    </section>

    </Layout>
  );
};

export default About;
