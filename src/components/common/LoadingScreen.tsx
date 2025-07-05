import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-onyx-black flex flex-col items-center justify-center z-50"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.div variants={item} className="mb-6">
          <Flame size={64} className="text-fire-red animate-flame-pulse" />
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