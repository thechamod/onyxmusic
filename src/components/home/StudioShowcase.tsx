import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Headphones, Music, Mic2, Activity } from 'lucide-react';
import ParticleField from '../3d/ParticleField';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card p-6 hover:shadow-[0_0_15px_rgba(255,58,0,0.2)] transition-all duration-300"
    >
      <div className="text-fire-red mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

const StudioShowcase: React.FC = () => {
  const services = [
    {
      icon: <Music size={28} />,
      title: 'Music Production',
      description: 'Full service music production with industry-standard equipment and experienced producers.'
    },
    {
      icon: <Mic2 size={28} />,
      title: 'Vocal Recording',
      description: 'Professional vocal recording in our acoustically treated studios with top-quality microphones.'
    },
    {
      icon: <Headphones size={28} />,
      title: 'Mixing & Mastering',
      description: 'Expert mixing and mastering services to make your tracks ready for commercial release.'
    },
    {
      icon: <Activity size={28} />,
      title: 'Sound Design',
      description: 'Creative sound design services for music, film, and multimedia projects.'
    }
  ];

  return (
    <section className="py-24 relative bg-onyx-dark overflow-hidden">
      <div className="noise-bg"></div>
      
      {/* Particle effect background */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                State-of-the-Art <span className="fire-text">Studio</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Our studio is equipped with the latest technology and designed to create an inspiring environment for artists. We provide everything you need to bring your musical vision to life.
              </p>
              <Link to="/studio" className="button-primary inline-block">
                Explore Studio
              </Link>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Onyx Music Studio" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-black to-transparent opacity-40"></div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioShowcase;