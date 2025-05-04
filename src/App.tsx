import React, { useState, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/common/LoadingScreen';
import useScrollAnimation from './hooks/useScrollAnimation';

// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Artists = React.lazy(() => import('./pages/Artists'));
const Studio = React.lazy(() => import('./pages/Studio'));
const Booking = React.lazy(() => import('./pages/Booking'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ScrollingBackground3D = React.lazy(() => import('./components/ScrollingBackground3D'));
const MusicGadget3D = React.lazy(() => import('./components/MusicGadget3D'));
const MobileGadget3D = React.lazy(() => import('./components/MobileGadget3D'));

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

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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

            {/* 3D Music Gadget - only show on non-mobile */}
            {!isMobile && (
              <Suspense fallback={null}>
                <MusicGadget3D />
              </Suspense>
            )}

            {/* Mobile-specific 3D Gadget */}
            {isMobile && (
              <div className="mobile-3d-placeholder">
                <Suspense fallback={null}>
                  <MobileGadget3D />
                </Suspense>
              </div>
            )}

            {/* Additional content */}
            <div className="content">
              {/* Section with fade-in animation */}
              <section className="fade-in">
                <h1>Your Music Studio</h1>
                <p>Experience the best in music production.</p>
              </section>

              {/* Services Section */}
              <section className="fade-in">
                <h2>Our Services</h2>
                <div className="services-grid">
                  {/* Add your services content here */}
                </div>
              </section>
            </div>
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
