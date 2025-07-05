import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Youtube } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';

const Contact: React.FC = () => {
  useEffect(() => {
    // Set title
    document.title = 'Contact Us | Onyx Music Studio';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
  const contactInfo = [
    {
      icon: <MapPin size={24} className="text-fire-red" />,
      title: 'Address',
      content: '305/4, Mahawehera, Madipola, Sri Lanka'
    },
    {
      icon: <Phone size={24} className="text-fire-red" />,
      title: 'Phone',
      content: '+94 72 128 5842'
    },
    {
      icon: <Mail size={24} className="text-fire-red" />,
      title: 'Email',
      content: 'info@onyxmusic.com'
    },
    {
      icon: <Clock size={24} className="text-fire-red" />,
      title: 'Studio Hours',
      content: 'Monday - Sunday: 10 AM - 2 AM'
    }
  ];
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="pt-32 pb-24 relative"
    >
      <div className="noise-bg"></div>
      
      {/* Background decorative elements */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,58,0,0.3) 0%, transparent 70%)'
        }}
      ></div>
      
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,58,0,0.2) 0%, transparent 70%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Get In <span className="fire-text">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Have questions or want to discuss your project? Reach out to us using any of the methods below.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-display font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-display font-bold mb-4">Follow Us</h2>
              <p className="text-gray-300 mb-4">
                Stay updated with our latest projects, artist features, and studio news.
              </p>
              
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-card p-3 text-gray-400 hover:text-fire-red transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-card p-3 text-gray-400 hover:text-fire-red transition-colors"
                >
                  <Twitter size={24} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-card p-3 text-gray-400 hover:text-fire-red transition-colors"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
