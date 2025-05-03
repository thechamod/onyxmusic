import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WaveformCanvas from '../3d/WaveformCanvas';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      sectionRef.current.style.setProperty('--mouse-x', String(x));
      sectionRef.current.style.setProperty('--mouse-y', String(y));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #1E1E1E 0%, #0A0A0A 70%)',
        '--mouse-x': '0',
        '--mouse-y': '0',
      } as React.CSSProperties}
    >
      <div className="noise-bg opacity-20"></div>
      
      {/* 3D Waveform in background */}
      <div className="absolute inset-0 opacity-30">
        <WaveformCanvas />
      </div>
      
      {/* Radial gradient that follows cursor */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at calc(50% + calc(var(--mouse-x) * 40vw)) calc(50% + calc(var(--mouse-y) * 40vh)), rgba(255, 58, 0, 0.15) 0%, transparent 50%)',
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="fire-text">ONYX MUSIC</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Where Fire Meets Sound. Professional Music Production Studio by Chamod Wijekoon.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/booking" className="button-primary">
              Book Session
            </Link>
            <Link to="/studio" className="button-secondary">
              Explore Studio
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-fire-red rounded-full mt-2"
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;