
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully! We'll get back to you shortly.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-electric-500" />,
      title: "Our Location",
      details: [
        "Unit 27-28, Industrial Area",
        "Phase II, New Delhi - 110020",
        "India"
      ]
    },
    {
      icon: <Phone className="h-5 w-5 text-electric-500" />,
      title: "Phone Numbers",
      details: [
        "+91 11 2234 5678 (Main Office)",
        "+91 98765 43210 (Sales)",
        "+91 98765 43211 (Support)"
      ]
    },
    {
      icon: <Mail className="h-5 w-5 text-electric-500" />,
      title: "Email Addresses",
      details: [
        "info@shayamvenchers.com",
        "sales@shayamvenchers.com",
        "support@shayamvenchers.com"
      ]
    },
    {
      icon: <Clock className="h-5 w-5 text-electric-500" />,
      title: "Working Hours",
      details: [
        "Monday to Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-industry-900 mb-6" data-aos="fade-up">Contact Us</h1>
            <p className="text-lg text-industry-700 mb-8" data-aos="fade-up" data-aos-delay="100">
              Have questions or need more information? Our team is here to help you with any inquiries about our products or services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="reveal-left">
              <h2 className="text-2xl font-bold text-industry-900 mb-8">Get In Touch</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-6 bg-industry-50 rounded-lg hover:shadow-md transition-shadow duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex items-center mb-4">
                      <div className="mr-3 bg-white p-2 rounded-full">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-industry-900">{item.title}</h3>
                    </div>
                    <ul className="space-y-2 text-industry-700">
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-md h-64 md:h-80" data-aos="fade-up">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.066736272497!2d77.0651147!3d28.6283771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04ab3c053653%3A0x45ac1a6e2610de66!2sIndustrial%20Area%20Phase%20II%2C%20Naraina%2C%20Delhi!5e0!3m2!1sen!2sin!4v1619784261930!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy"
                  title="Shayam Venchers Location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="reveal-right">
              <div className="bg-industry-50 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-industry-900 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-industry-800 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-industry-800 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-industry-800 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="+91 12345 67890"
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-industry-800 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      type="text"
                      placeholder="How can we help you?"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-industry-800 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details about your inquiry..."
                      required
                      className="w-full h-32"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-electric-500 hover:bg-electric-600 text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-industry-900 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div 
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
              >
                <h3 className="text-lg font-semibold text-industry-900 mb-2">How can I place a bulk order?</h3>
                <p className="text-industry-700">
                  For bulk orders, please contact our sales team directly through the form above or call our sales number. 
                  We offer special pricing and terms for large quantity orders and can provide a detailed quote based on your specific requirements.
                </p>
              </div>
              
              <div 
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h3 className="text-lg font-semibold text-industry-900 mb-2">Do you provide samples before large orders?</h3>
                <p className="text-industry-700">
                  Yes, we can provide samples for evaluation before you commit to a large order. 
                  Sampling policies vary by product category and quantity. Please contact our sales team to arrange for product samples.
                </p>
              </div>
              
              <div 
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3 className="text-lg font-semibold text-industry-900 mb-2">What are your shipping and delivery terms?</h3>
                <p className="text-industry-700">
                  We ship throughout India and internationally. Delivery times depend on your location and the products ordered. 
                  Standard delivery within major Indian cities takes 3-5 business days. For international orders, shipping terms are determined on a case-by-case basis.
                </p>
              </div>
              
              <div 
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3 className="text-lg font-semibold text-industry-900 mb-2">Can you manufacture custom fasteners or electrical components?</h3>
                <p className="text-industry-700">
                  Yes, we offer custom manufacturing services for both fasteners and electrical components. 
                  Our engineering team can work with you to design and produce components according to your specifications. 
                  Please share your requirements through the contact form, and our team will get in touch to discuss feasibility and pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;