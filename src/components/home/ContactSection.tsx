
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useWeb3Forms from '@web3forms/react'; // Import Web3Forms
import HCaptcha from '@hcaptcha/react-hcaptcha'; // Import HCaptcha
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // State to hold the captcha token
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const { toast } = useToast();

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "test_access_key";  // Access key for Web3Forms with fallback

  useEffect(() => {
    // Add a safety timeout to set captchaLoaded to true if the captcha doesn't load
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
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
      setCaptchaToken(null); // Reset captcha token
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
    },
    onError: (msg, data) => {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCaptcha = (token: string) => {
    setCaptchaToken(token); // Store the captcha token when resolved
    setCaptchaLoaded(true);
  };

  const handleCaptchaLoad = () => {
    console.log("HCaptcha loaded successfully");
    setCaptchaLoaded(true);
  };

  const handleCaptchaError = (err: any) => {
    console.error("HCaptcha error:", err);
    setCaptchaLoaded(true); // Consider it loaded even on error to avoid blocking the form
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If captcha isn't loaded, assume it's an issue with the service and continue
    if (captchaLoaded && !captchaToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the CAPTCHA verification.",
      });
      return;
    }

    setIsSubmitting(true);

    // Include the captcha token in the form data and submit it
    onSubmit({
      ...formData,
      captcha_token: captchaToken || "captcha_load_failure",
    });
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
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="+91 1234567890"
                  value={formData.phone}
                  onChange={handleChange}
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
                  value={formData.company}
                  onChange={handleChange}
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
                  value={formData.subject}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full h-40 resize-none"
                />
              </div>

              {/* hCaptcha Widget with error handling */}
              <div className="mb-4">
                {typeof window !== 'undefined' && (
                  <HCaptcha
                    sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"} // Site key with fallback
                    onVerify={handleCaptcha}
                    onLoad={handleCaptchaLoad}
                    onError={handleCaptchaError}
                  />
                )}
              </div>

              <Button type="submit" className="w-full bg-electric-500 hover:bg-electric-600 text-white" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
