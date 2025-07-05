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
      image: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/481479195_1846203492834089_8896037436071034314_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG9se2S4uUrIKc6HXGmKbZH9I5UT-9nTV_0jlRP72dNXxjC28SVEKyt9vOZ4we0zBL_1NqMtP95C-CG2f2LqKBJ&_nc_ohc=499dZoEbFyYQ7kNvwEr9pE2&_nc_oc=AdnpLqT_-NwwBKGxJO_y1DOWFNQe4VTeUI1JnqHIbtieRmVM9jR75MlkMM2rZGDqsw0&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=H7ZkQqM8OwwSKWtiama6IA&oh=00_AfGcyR_nJUNqkIMA5UmPQ7w3ui5S453iBmtOuhnSq4C6_A&oe=681BD102',
      role: 'Rapper / Songwriter'
    },
    {
      name: 'W',
      image: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/472345858_1312545273091867_1276585712862569140_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHH1St2HWdJ1ycZshwEs8qeTeCvnX8POL5N4K-dfw84vm1Euf6EJDdWakRjZgUSPhvx8K9dvbxgqzfYLkc6I6lr&_nc_ohc=3XMsGl_d390Q7kNvwELHKp9&_nc_oc=AdkG2TzzmHJVnDZkE0siOOgHdEW2UyI5u_RUAuI3hvpvXmpY4zWwh4_r28bTho79kxI&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=2qGLrYOLxZiu_efh4y4AKg&oh=00_AfHlqd2fzVbR9LTM7QtFtfmga7Pc0LkVxa93PRhinv4XoA&oe=681BDA23',
      role: 'Rapper / Songwriter'
    },
    {
      name: 'RIX',
      image: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/485040617_688294940374187_6007777225130452546_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHRaMrqtxX_GW3SDIFMNHGPiCCWyt45Cy6IIJbK3jkLLhl1rJn7in3oWNT4yyMMJtXxOfBiVnC0WipO34RLpBuW&_nc_ohc=73WHcWlP3woQ7kNvwGDHOnE&_nc_oc=AdnDyk5Kr112UfVCm5dgjzNE_8aks9_FxeR2IAfbN6OyBeYHQM_Lomb4eUmnOfbw78M&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=VHucCeorgIdEMWs2cqOohA&oh=00_AfFe7uV0QgFt6_R_Vsm5-SsrSQ7Dxpl9C9KKttVbfT8ydw&oe=681BD295',
      role: 'Rapper / Songwriter'
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
