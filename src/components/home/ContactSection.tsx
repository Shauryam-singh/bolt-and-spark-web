
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
    // Show a success message or toast notification
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-industry-900 mb-4 reveal">Get In Touch</h2>
          <p className="text-lg text-industry-700 max-w-2xl mx-auto reveal">
            Have questions about our products or services? Contact us today and our team will be happy to assist you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 reveal-left">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-industry-800 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-industry-800 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
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
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-industry-800 mb-1">
                  Company Name
                </label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your Company"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="space-y-4 reveal-right">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-industry-800 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Product Inquiry"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-industry-800 mb-1">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  required
                  className="w-full h-40 resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full bg-electric-500 hover:bg-electric-600 text-white">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
