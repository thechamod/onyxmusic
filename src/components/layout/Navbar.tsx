import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Flame } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled ? 'py-3 bg-onyx-black/90 backdrop-blur-md shadow-lg' : 'py-5 bg-transparent'
  }`;

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Artists', path: '/artists' },
    { title: 'Studio', path: '/studio' },
    { title: 'Booking', path: '/booking' },
    { title: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 0.5,
        when: 'afterChildren',
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-20">
          <Flame size={28} className="text-fire-red animate-flame-pulse" />
          <span className="font-display text-2xl font-bold fire-text">ONYX</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.title}
            </Link>
          ))}
          <Link to="/booking" className="button-primary ml-2">
            Book Session
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-20 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={menuVariants}
          className={`fixed inset-0 bg-onyx-black z-10 flex flex-col items-center justify-center md:hidden`}
        >
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={`text-xl font-display ${
                    location.pathname === item.path ? 'text-fire-red' : 'text-white'
                  }`}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <Link to="/booking" className="button-primary mt-4">
                Book Session
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;