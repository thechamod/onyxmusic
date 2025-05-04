import React, { useState, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import useScrollAnimation from './hooks/useScrollAnimation';
import LoadingScreen from './components/common/LoadingScreen';


// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Artists = React.lazy(() => import('./pages/Artists'));
const Studio = React.lazy(() => import('./pages/Studio'));
const Booking = React.lazy(() => import('./pages/Booking'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ScrollingBackground3D = React.lazy(() => import('./components/ScrollingBackground3D'));

function App(): JSX.Element {
  // State for device detection and loading
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use scroll animation hook
  useScrollAnimation();

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen app">
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </AnimatePresence>

        {/* 3D Background */}
        <Suspense fallback={<div>Loading 3D environment...</div>}>
          <ScrollingBackground3D />
        </Suspense>

        {/* Additional content */}
        <div className="content">
          {/* Section with fade-in animation */}
          <section className="fade-in">
            <h1>Onyx Music</h1>
            <p>Experience the best in music production.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
