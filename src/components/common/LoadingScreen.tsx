import React from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const gemAnimation = {
    initial: { scale: 0.8, rotate: -15 },
    animate: {
      scale: [0.8, 1.1, 0.9, 1],
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const glowAnimation = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.5],
      filter: [
        'drop-shadow(0 0 8px rgba(255, 58, 0, 0.5))',
        'drop-shadow(0 0 20px rgba(255, 58, 0, 0.8))',
        'drop-shadow(0 0 8px rgba(255, 58, 0, 0.5))'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-onyx-black flex flex-col items-center justify-center z-50"
    >
      <div className="noise-bg"></div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center relative"
      >
        <motion.div 
          variants={item} 
          className="mb-6 relative"
        >
          {/* Glow effect */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={glowAnimation}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Gem size={80} className="text-fire-red" />
          </motion.div>
          
          {/* Main gem */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={gemAnimation}
            className="relative z-10"
          >
            <Gem size={64} className="text-fire-red" />
          </motion.div>
        </motion.div>
        
        <motion.div variants={item} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold fire-text">ONYX MUSIC</h1>
        </motion.div>
        
        <motion.div variants={item} className="w-48 h-1 bg-onyx-light rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-fire-red to-fire-orange"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
