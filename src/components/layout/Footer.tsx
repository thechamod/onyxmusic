import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-onyx-dark border-t border-onyx-light/30 relative overflow-hidden">
      <div className="noise-bg"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={24} className="text-fire-red" />
              <span className="font-display text-xl font-bold fire-text">ONYX MUSIC</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional music studio owned by Chamod Wijekoon, providing high-quality production services since 2020.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-fire-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-fire-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-fire-red transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-fire-red transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/artists" className="text-gray-400 hover:text-fire-red transition-colors">Artists</Link>
              </li>
              <li>
                <Link to="/studio" className="text-gray-400 hover:text-fire-red transition-colors">Studio</Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-fire-red transition-colors">Book Session</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-fire-red transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-white font-display text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Music Production</li>
              <li className="text-gray-400">Audio Engineering</li>
              <li className="text-gray-400">Mixing & Mastering</li>
              <li className="text-gray-400">Vocal Recording</li>
              <li className="text-gray-400">Music Consulting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white font-display text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-fire-red mt-1 flex-shrink-0" />
                <span className="text-gray-400">305/4, Mahawehera, Madipola, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-fire-red flex-shrink-0" />
                <span className="text-gray-400">+94 72 128 5842</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-fire-red flex-shrink-0" />
                <span className="text-gray-400">info@onyxmusic.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-onyx-light/30 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Onyx Music Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
