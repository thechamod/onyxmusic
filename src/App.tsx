import React, { useState, useEffect, Suspense } from 'react';
import useScrollAnimation from './hooks/useScrollAnimation';

// Dynamically import 3D components
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

    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app">
      {/* Loading screen */}
      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      {!isLoading && (
        <>
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

          {/* Main Content */}
          <main className="content">
            {/* Scroll-animated section */}
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
          </main>
        </>
      )}
    </div>
  );
}

export default App;
