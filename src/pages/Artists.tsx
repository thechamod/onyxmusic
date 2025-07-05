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
      role: 'Rapper / Songwriter',
      image: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/481479195_1846203492834089_8896037436071034314_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG9se2S4uUrIKc6HXGmKbZH9I5UT-9nTV_0jlRP72dNXxjC28SVEKyt9vOZ4we0zBL_1NqMtP95C-CG2f2LqKBJ&_nc_ohc=499dZoEbFyYQ7kNvwEr9pE2&_nc_oc=AdnpLqT_-NwwBKGxJO_y1DOWFNQe4VTeUI1JnqHIbtieRmVM9jR75MlkMM2rZGDqsw0&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=H7ZkQqM8OwwSKWtiama6IA&oh=00_AfGcyR_nJUNqkIMA5UmPQ7w3ui5S453iBmtOuhnSq4C6_A&oe=681BD102',
      bio: 'Y30 is a powerful rapper and lyricist in the Bloodroots team, known for his aggressive style and bold creativity. He blends hardcore rap with rock energy, delivering fast-paced flows and raw emotion. His music reflects passion, rebellion, and fearless expression, making him a standout voice in the underground scene.',
      socialLinks: {
        instagram: 'https://www.instagram.com/yasiruthechild/',
        twitter: 'https://twitter.com',
        soundcloud: 'https://soundcloud.com'
      },
      genres: ['Rock', 'Agressive', 'Trap', 'Rap']
    },
    {
      name: 'W',
      role: 'Rapper / Songwriter',
      image: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/472345858_1312545273091867_1276585712862569140_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHH1St2HWdJ1ycZshwEs8qeTeCvnX8POL5N4K-dfw84vm1Euf6EJDdWakRjZgUSPhvx8K9dvbxgqzfYLkc6I6lr&_nc_ohc=3XMsGl_d390Q7kNvwELHKp9&_nc_oc=AdkG2TzzmHJVnDZkE0siOOgHdEW2UyI5u_RUAuI3hvpvXmpY4zWwh4_r28bTho79kxI&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=2qGLrYOLxZiu_efh4y4AKg&oh=00_AfHlqd2fzVbR9LTM7QtFtfmga7Pc0LkVxa93PRhinv4XoA&oe=681BDA23',
      bio: 'W is a dynamic trap artist in the Bloodroots team, known for his smooth flows, melodic style, and emotional depth. His music blends modern trap beats with real-life feelings, delivering a vibe that s both catchy and heartfelt.',
      socialLinks: {
        instagram: 'https://www.instagram.com/d.re_w_/',
        twitter: 'https://twitter.com',
        soundcloud: 'https://soundcloud.com'
      },
      genres: ['Melodic', 'Rap', 'Trap', 'Westcoast']
    },
    {
      name: 'RIX',
      role: 'Rapper / Songwriter',
      image: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/485040617_688294940374187_6007777225130452546_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHRaMrqtxX_GW3SDIFMNHGPiCCWyt45Cy6IIJbK3jkLLhl1rJn7in3oWNT4yyMMJtXxOfBiVnC0WipO34RLpBuW&_nc_ohc=73WHcWlP3woQ7kNvwGDHOnE&_nc_oc=AdnDyk5Kr112UfVCm5dgjzNE_8aks9_FxeR2IAfbN6OyBeYHQM_Lomb4eUmnOfbw78M&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=VHucCeorgIdEMWs2cqOohA&oh=00_AfFe7uV0QgFt6_R_Vsm5-SsrSQ7Dxpl9C9KKttVbfT8ydw&oe=681BD295',
      bio: 'Rix brings raw intensity to the Bloodroots team with his aggressive lyrics and rough, commanding vocals. A true lyrical beast, his style blends dark energy with fearless expression, turning pain and power into hard-hitting tracks that leave a lasting impact. His voice is the roar behind the rage.',
      socialLinks: {
        instagram: 'https://www.instagram.com/chamidu.senarathna/',
        twitter: 'https://twitter.com',
        soundcloud: 'https://soundcloud.com'
      },
      genres: ['Aggresive', 'Trap', 'Westcoast', 'Rock']
    },
    {
      name: 'CHAMOD',
      role: 'Mixing Engineer / CEO',
      image: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/481829960_606956168833683_5929302838862598948_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEuLvV4f44N1-AUyiFaxFZ_cYP4qQgWKmhxg_ipCBYqaPC1Fgq5KCjZpZSSUA0k9Yrw7cIJNsPaOEEDjiU4asDG&_nc_ohc=fqdWrkDABDYQ7kNvwHa2XQ8&_nc_oc=AdkFhALj-z2zNf-Xrx3PfB367C8aKuwIyft49ttAtMh1f-WmY_LdrD7FkGyxXrAwElQ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=jgewmG7x1fQ6AuDmxMf29Q&oh=00_AfH5gbRVZKq5sQMzu4x_DF442QJs3xvX2W2heYIBOcTbDw&oe=681C54A2',
      bio: 'Chamod, founder and CEO of Onyx Music, is a passionate music producer and mixing engineer. Specializing in Melodic Trap, Pop, and Hyperpop, he creates emotionally driven tracks that connect deeply with listeners. With a vision to push boundaries in sound, Chamod leads Onyx Music with creativity, precision, and heart.',
      socialLinks: {
        instagram: 'https://www.instagram.com/thechamod/',
        twitter: 'https://twitter.com',
        soundcloud: 'https://soundcloud.com'
      },
      genres: ['Melodic', 'Trap', 'Pop', 'Hyperpop']
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
