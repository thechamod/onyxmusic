import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactCTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-onyx-black to-onyx-dark">
      <div className="noise-bg"></div>
      
      {/* Background decorative element */}
      <div 
        className="absolute -top-64 -right-64 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,58,0,0.3) 0%, transparent 70%)'
        }}
      ></div>
      
      <div 
        className="absolute -bottom-64 -left-64 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,58,0,0.3) 0%, transparent 70%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Ready to <span className="fire-text">Ignite</span> Your Sound?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-gray-300 mb-10"
          >
            Let's create something amazing together. Contact us to discuss your project or book a session at Onyx Music Studio.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/booking" className="button-primary">
              Book Session
            </Link>
            <Link to="/contact" className="button-secondary">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;