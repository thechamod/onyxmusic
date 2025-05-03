import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingNotes from '../3d/FloatingNotes';

interface ArtistCardProps {
  name: string;
  image: string;
  role: string;
  index: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ name, image, role, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative overflow-hidden rounded-lg group"
    >
      <div className="relative h-96 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-black to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-2xl font-display font-bold mb-1 fire-text">{name}</h3>
          <p className="text-gray-300 opacity-80">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ArtistsPreview: React.FC = () => {
  const artists = [
    {
      name: 'Y30',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'Producer / Vocalist'
    },
    {
      name: 'W',
      image: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'Rapper / Songwriter'
    },
    {
      name: 'VIX',
      image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: 'DJ / Producer'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="noise-bg"></div>
      
      {/* 3D Floating Notes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <FloatingNotes />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Meet <span className="fire-text">BLOODROOTS</span>
            </h2>
            <p className="text-gray-300">
              The collective talent behind the fire. Our featured artists bring unique styles and incredible energy to every track.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {artists.map((artist, index) => (
            <ArtistCard 
              key={artist.name}
              name={artist.name}
              image={artist.image}
              role={artist.role}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Link to="/artists" className="button-primary">
              View All Artists
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsPreview;