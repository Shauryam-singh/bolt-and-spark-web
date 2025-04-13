
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-industry-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">BoltWorks</h3>
            <p className="mb-4 text-industry-100">
              Your trusted partner for quality fasteners and electrical components.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-industry-100 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-industry-100 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-industry-100 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-industry-100 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-industry-100 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/fasteners" className="text-industry-100 hover:text-white transition-colors">Fasteners</Link>
              </li>
              <li>
                <Link to="/electrical" className="text-industry-100 hover:text-white transition-colors">Electrical Components</Link>
              </li>
              <li>
                <Link to="/about" className="text-industry-100 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-industry-100 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fasteners" className="text-industry-100 hover:text-white transition-colors">Nuts & Bolts</Link>
              </li>
              <li>
                <Link to="/fasteners" className="text-industry-100 hover:text-white transition-colors">Screws</Link>
              </li>
              <li>
                <Link to="/electrical" className="text-industry-100 hover:text-white transition-colors">Switch Boards</Link>
              </li>
              <li>
                <Link to="/electrical" className="text-industry-100 hover:text-white transition-colors">Wires & Cables</Link>
              </li>
              <li>
                <Link to="/electrical" className="text-industry-100 hover:text-white transition-colors">Electrical Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-industry-100 mt-0.5" />
                <span className="text-industry-100">
                  123 Industrial Ave, Suite 100<br />Business District, City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-industry-100" />
                <a href="tel:+1234567890" className="text-industry-100 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-industry-100" />
                <a href="mailto:info@boltworks.com" className="text-industry-100 hover:text-white transition-colors">
                  info@boltworks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-industry-700 mt-8 pt-6 text-center text-industry-100">
          <p>&copy; {new Date().getFullYear()} BoltWorks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
