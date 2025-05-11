import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import useWeb3Forms from '@web3forms/react';
import HCaptcha from '@hcaptcha/react-hcaptcha'; // Import HCaptcha

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // State to store captcha token
  const [captchaLoaded, setCaptchaLoaded] = useState(false); // Added state to track captcha loading

  // Web3Forms access key
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "test_access_key";  
  const siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001";
  const secretKey = import.meta.env.VITE_HCAPTCHA_SECRET_KEY;
  
  // Add safety timeout for captcha loading
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!captchaLoaded) {
        console.log("HCaptcha loading timed out, setting captcha as loaded");
        setCaptchaLoaded(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [captchaLoaded]);

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: 'Shayam-Venchers',
      subject: 'New Contact Message from Website',
    },
    onSuccess: (msg, data) => {
      toast.success('Your message has been sent successfully! We\'ll get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setCaptchaToken(null); // Reset captcha token after successful submission
      setIsSubmitting(false);
    },
    onError: (msg, data) => {
      toast.error('Oops! Something went wrong. Please try again.');
      setIsSubmitting(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaptcha = (token: string) => {
    setCaptchaToken(token); // Store the captcha token when it's resolved
    setCaptchaLoaded(true); // Mark captcha as loaded
  };
  
  const handleCaptchaLoad = () => {
    console.log("HCaptcha loaded successfully");
    setCaptchaLoaded(true);
  };

  const handleCaptchaError = (err: any) => {
    console.error("HCaptcha error:", err);
    setCaptchaLoaded(true); // Consider it loaded even on error to avoid blocking the form
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // If captcha is loaded but no token, require verification
    if (captchaLoaded && !captchaToken) {
      toast.error('Please complete the captcha verification.');
      return;
    }
    
    setIsSubmitting(true);
    onSubmit({ 
      ...formData, 
      captcha_token: captchaToken || "captcha_load_failure" 
    }); // Include captcha token in the form data
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-electric-500" />,
      title: 'Our Location',
      details: [
        'Unit 27-28, Industrial Area',
        'Phase II, New Delhi - 110020',
        'India',
      ],
    },
    {
      icon: <Phone className="h-5 w-5 text-electric-500" />,
      title: 'Phone Numbers',
      details: [
        '+91 11223 45678 (Main Office)',
        '+91 98765 43210 (Sales)',
        '+91 98765 43211 (Support)',
      ],
    },
    {
      icon: <Mail className="h-5 w-5 text-electric-500" />,
      title: 'Email Addresses',
      details: [
        'info@shayamvenchers.com',
        'sales@shayamvenchers.com',
        'support@shayamvenchers.com',
      ],
    },
    {
      icon: <Clock className="h-5 w-5 text-electric-500" />,
      title: 'Working Hours',
      details: [
        'Monday to Friday: 9:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Closed',
      ],
    },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-industry-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-industry-900 mb-6" data-aos="fade-up">
              Contact Us
            </h1>
            <p className="text-lg text-industry-700 mb-8" data-aos="fade-up" data-aos-delay="100">
              Have questions or need more information? Our team is here to help you with any inquiries about our products or services.
            </p>
          </div>
        </div>
      </section>

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
                      <div className="mr-3 bg-white p-2 rounded-full">{item.icon}</div>
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
              <div className="rounded-lg overflow-hidden shadow-md h-64 md:h-80" data-aos="fade-up">
                <iframe
                  src="https://www.google.com/maps/embed?pb=...yourMapEmbedLink..."
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

                  {/* hCaptcha Widget */}
                  <div>
                    <HCaptcha
                      sitekey={siteKey}
                      onVerify={handleCaptcha}
                      onLoad={handleCaptchaLoad}
                      onError={handleCaptchaError}
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
                          <path className="opacity-75" fill="currentColor" d="M4 12a8"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2" />
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
    </Layout>
  );
};

export default Contact;
