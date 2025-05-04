import { useEffect } from 'react';

export default function useScrollAnimation(): void {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150; // how many pixels from the top before the element becomes visible
          
          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
          } else {
            element.classList.remove('visible');
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check for elements in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
