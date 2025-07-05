import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import ArtistsPreview from '../components/home/ArtistsPreview';
import StudioShowcase from '../components/home/StudioShowcase';
import ContactCTA from '../components/home/ContactCTA';

const Home: React.FC = () => {
  useEffect(() => {
    // Set title
    document.title = 'Onyx Music Studio | Professional Music Production';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Scroll reveal animation
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    >
      <HeroSection />
      <ArtistsPreview />
      <StudioShowcase />
      <ContactCTA />
    </motion.div>
  );
};

export default Home;