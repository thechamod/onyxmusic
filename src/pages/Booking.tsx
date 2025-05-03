import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';
import ParticleField from '../components/3d/ParticleField';

const Booking: React.FC = () => {
  useEffect(() => {
    // Set title
    document.title = 'Book a Session | Onyx Music Studio';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
  const services = [
    {
      name: 'Recording Session',
      price: '3500LKR/hour',
      description: 'Professional recording in our state-of-the-art studio with an experienced engineer.',
      features: [
        'Up to 4 hours minimum booking',
        'Access to all studio equipment',
        'Basic mixing included',
        'Raw files provided after session'
      ]
    },
    {
      name: 'Mixing & Mastering',
      price: 'From 10000LKR/song',
      description: 'Professional mixing and mastering to give your tracks a polished, commercial sound.',
      features: [
        '2 rounds of revisions included',
        'Detailed attention to sonic balance',
        'Industry-standard processing',
        'Files delivered in multiple formats'
      ]
    },
    {
      name: 'Full Production Package',
      price: 'From 16000LKR/song',
      description: 'End-to-end production from concept to final master, including instrumentation and arrangement.',
      features: [
        'Beat production and instrumentation',
        'Recording of all elements',
        'Professional mixing and mastering',
        'Full rights to the final product'
      ]
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
      
      {/* Particle effect background */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Book Your <span className="fire-text">Session</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Ready to create something amazing? Book your session at Onyx Music Studio and let's bring your vision to life.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-display font-bold mb-2">{service.name}</h3>
              <p className="text-fire-red font-display font-bold mb-4">{service.price}</p>
              <p className="text-gray-300 text-sm mb-4">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start">
                    <span className="w-1.5 h-1.5 bg-fire-red rounded-full mt-1.5 mr-2"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Booking Information</h2>
            <p className="text-gray-300 mb-6">
              Our studio is available for bookings 7 days a week, from 10 AM to 2 AM. We require a 50% deposit 
              to secure your booking, with the balance due on the day of your session.
            </p>
            
            <h3 className="text-lg font-display font-bold mb-2">Cancellation Policy</h3>
            <p className="text-gray-300 mb-6">
              Cancellations made more than 48 hours in advance will receive a full refund of the deposit. 
              Cancellations made less than 48 hours in advance will forfeit the deposit.
            </p>
            
            <h3 className="text-lg font-display font-bold mb-2">What to Bring</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-fire-red rounded-full mt-1.5 mr-2"></span>
                <span>External hard drive for your files</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-fire-red rounded-full mt-1.5 mr-2"></span>
                <span>Any specific instruments you prefer to use</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-fire-red rounded-full mt-1.5 mr-2"></span>
                <span>References or inspiration tracks</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-fire-red rounded-full mt-1.5 mr-2"></span>
                <span>Lyrics and any pre-production materials</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Booking;
