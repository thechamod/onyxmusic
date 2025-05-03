import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Music } from 'lucide-react';
import FloatingNotes from '../components/3d/FloatingNotes';

interface ArtistProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks: { instagram?: string; twitter?: string; soundcloud?: string };
  genres: string[];
  index: number;
}

const ArtistProfile: React.FC<ArtistProps> = ({ 
  name, 
  role, 
  image, 
  bio, 
  socialLinks, 
  genres,
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card overflow-hidden"
    >
      <div className="md:flex">
        <div className="md:w-2/5">
          <div className="h-80 md:h-full overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="p-6 md:w-3/5">
          <h2 className="text-3xl font-display font-bold mb-1 fire-text">{name}</h2>
          <p className="text-gray-300 mb-4">{role}</p>
          
          <p className="text-gray-300 mb-4">{bio}</p>
          
          <div className="mb-4">
            <p className="text-sm text-white/70 mb-2">Genres:</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span 
                  key={genre} 
                  className="px-3 py-1 bg-onyx-light text-xs text-gray-300 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            {socialLinks.instagram && (
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fire-red transition-colors"
              >
                <Instagram size={20} />
              </a>
            )}
            
            {socialLinks.twitter && (
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fire-red transition-colors"
              >
                <Twitter size={20} />
              </a>
            )}
            
            {socialLinks.soundcloud && (
              <a 
                href={socialLinks.soundcloud} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fire-red transition-colors"
              >
                <Music size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GroupProfile: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card p-8 text-center mb-16"
    >
      <h2 className="text-4xl font-display font-bold mb-4">
        <span className="fire-text">BLOODROOTS</span>
      </h2>
      <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
        Formed in 2020, Bloodroots is a groundbreaking collective bringing together the unique talents 
        of Y30, W, and VIX. Their music fuses trap, electronic, and experimental elements to create a 
        sound that's as intense as fire and as dark as night. With multiple chart-topping releases and 
        a growing international fanbase, Bloodroots is redefining the boundaries of modern music.
      </p>
      
      <div className="w-20 h-1 mx-auto bg-fire-red rounded-full mb-6"></div>
      
      <div className="flex justify-center space-x-6">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-fire-red transition-colors"
        >
          <Instagram size={24} />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-fire-red transition-colors"
        >
          <Twitter size={24} />
        </a>
        <a 
          href="https://soundcloud.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-fire-red transition-colors"
        >
          <Music size={24} />
        </a>
      </div>
    </motion.div>
  );
};

const Artists: React.FC = () => {
  const artists = [
    {
      name: 'Y30',
      role: 'Producer / Vocalist',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Y30 is a multi-talented producer and vocalist known for creating dark, atmospheric soundscapes and haunting melodies. With a background in classical music and a passion for electronic production, Y30 brings a unique perspective to every track.',
      socialLinks: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        soundcloud: 'https://soundcloud.com'
      },
      genres: ['Electronic', 'Ambient', 'Trap', 'R&B']
    },
    {
      name: 'W',
      role: 'Rapper / Songwriter',
      image: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'W is a lyrical powerhouse with a flow that cuts through beats like fire. Known for thoughtful, introspective verses and an unmistakable delivery, W has collaborated with some of the biggest names in the industry while maintaining an independent spirit.',
      socialLinks: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        soundcloud: 'https://soundcloud.com'
      },
      genres: ['Hip-Hop', 'Rap', 'Trap', 'Alternative']
    },
    {
      name: 'VIX',
      role: 'DJ / Producer',
      image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'VIX is at the forefront of electronic music innovation, pushing boundaries with experimental sounds and infectious rhythms. As both a renowned DJ and meticulous producer, VIX brings high energy to live performances and studio productions alike.',
      socialLinks: {
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        soundcloud: 'https://soundcloud.com'
      },
      genres: ['Electronic', 'House', 'Techno', 'Experimental']
    }
  ];

  useEffect(() => {
    // Set title
    document.title = 'Our Artists | Onyx Music Studio';
    
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
      
      {/* 3D Floating Notes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <FloatingNotes count={30} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Meet Our <span className="fire-text">Artists</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            The creative forces behind Onyx Music Studio, each bringing unique talents and perspectives to the table.
          </motion.p>
        </div>
        
        <GroupProfile />
        
        <div className="space-y-12">
          {artists.map((artist, index) => (
            <ArtistProfile 
              key={artist.name}
              name={artist.name}
              role={artist.role}
              image={artist.image}
              bio={artist.bio}
              socialLinks={artist.socialLinks}
              genres={artist.genres}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Artists;