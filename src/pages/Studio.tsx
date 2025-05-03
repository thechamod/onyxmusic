import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Music, Mic2, Headphones, Speaker, FileAudio, Users } from 'lucide-react';
import ParticleField from '../components/3d/ParticleField';

interface EquipmentItemProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  index: number;
}

const EquipmentItem: React.FC<EquipmentItemProps> = ({ title, items, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card p-6"
    >
      <div className="text-fire-red mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-300 text-sm flex items-center">
            <span className="w-1.5 h-1.5 bg-fire-red rounded-full mr-2"></span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Studio: React.FC = () => {
  const equipment = [
    {
      title: 'Recording Equipment',
      icon: <Mic2 size={28} />,
      items: [
        'Neumann U87 Microphone',
        'API 1608 Console',
        'Universal Audio Apollo Interfaces',
        'Avalon VT-737SP Preamp',
        'Shure SM7B Microphones'
      ]
    },
    {
      title: 'Software & DAWs',
      icon: <FileAudio size={28} />,
      items: [
        'FL Studio',
        'Logic Pro X',
        'Ableton Live Suite',
        'Native Instruments Komplete',
        'Waves Complete Plugin Bundle'
      ]
    },
    {
      title: 'Monitoring',
      icon: <Headphones size={28} />,
      items: [
        'Focal Shape 65 Monitors',
        'Yamaha NS10 Reference Monitors',
        'Audeze LCD-X Headphones',
        'Sonarworks Reference Calibration',
        'Subpac S2 Tactile Monitoring System'
      ]
    },
    {
      title: 'Instruments',
      icon: <Music size={28} />,
      items: [
        'Yamaha C7 Grand Piano',
        'Fender Stratocaster & Telecaster',
        'Gibson Les Paul Custom',
        'Moog Subsequent 37 Synthesizer',
        'Roland TR-8S Drum Machine'
      ]
    },
    {
      title: 'Outboard Gear',
      icon: <Speaker size={28} />,
      items: [
        'Universal Audio LA-2A Compressor',
        '1176LN Limiting Amplifier',
        'Lexicon PCM96 Reverb',
        'Empirical Labs Distressor',
        'Pultec EQP-1A Program Equalizer'
      ]
    },
    {
      title: 'Studio Amenities',
      icon: <Users size={28} />,
      items: [
        'Acoustically Treated Live Room',
        'Isolated Vocal Booth',
        'Artist Lounge & Relaxation Area',
        'High-Speed Internet & Streaming',
        '24/7 Studio Access for Projects'
      ]
    }
  ];

  useEffect(() => {
    // Set title
    document.title = 'Our Studio | Onyx Music Studio';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
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
            Our <span className="fire-text">Studio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            State-of-the-art equipment in an inspiring environment designed to bring out your best creativity.
          </motion.p>
        </div>
        
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative rounded-lg overflow-hidden"
          >
            <img 
              src="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Onyx Music Studio" 
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx-black to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">
                Main Control Room
              </h2>
              <p className="text-gray-200 max-w-2xl">
                Our primary recording and mixing space features perfect acoustics and an inspiring atmosphere.
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
            Studio <span className="fire-text">Equipment</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item, index) => (
              <EquipmentItem 
                key={item.title}
                title={item.title}
                items={item.items}
                icon={item.icon}
                index={index}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-lg overflow-hidden h-80"
            >
              <img 
                src="https://images.pexels.com/photos/4571123/pexels-photo-4571123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Vocal Booth" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-display font-bold mb-1 text-white">
                  Vocal Booth
                </h3>
                <p className="text-gray-200">
                  Isolated recording space for pristine vocal captures.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-lg overflow-hidden h-80"
            >
              <img 
                src="https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Live Room" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-display font-bold mb-1 text-white">
                  Live Room
                </h3>
                <p className="text-gray-200">
                  Spacious area for full band recordings and instrument tracking.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to <span className="fire-text">Record</span>?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Book your session at Onyx Music Studio and bring your musical vision to life with our professional equipment and experienced team.
            </p>
            <Link to="/booking" className="button-primary">
              Book Studio Time
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Studio;
