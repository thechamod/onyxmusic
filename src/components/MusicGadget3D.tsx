import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MusicGadget3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Set renderer size and add to DOM
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Create the 3D music gadget (vinyl record-like object)
    const geometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
    
    // Try to load texture, fall back to material if not available
    let material: THREE.MeshStandardMaterial;
    
    try {
      const vinylTexture = new THREE.TextureLoader().load('/textures/vinyl_texture.jpg', 
        // Success callback
        undefined, 
        // Error callback
        (error) => {
          console.warn('Failed to load vinyl texture:', error);
        }
      );
      
      material = new THREE.MeshStandardMaterial({ 
        map: vinylTexture,
        color: 0x8B0000, // Dark red color
        metalness: 0.5,
        roughness: 0.2
      });
    } catch (error) {
      // Fallback if texture loading fails
      console.warn('Using fallback material due to:', error);
      material = new THREE.MeshStandardMaterial({ 
        color: 0x8B0000, // Dark red color
        metalness: 0.5,
        roughness: 0.2
      });
    }
    
    const vinyl = new THREE.Mesh(geometry, material);
    scene.add(vinyl);
    
    // Create groove details
    const grooveGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
    const grooveMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const groove = new THREE.Mesh(grooveGeometry, grooveMaterial);
    groove.rotation.x = Math.PI / 2;
    vinyl.add(groove);
    
    const groove2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.05, 16, 100),
      grooveMaterial
    );
    groove2.rotation.x = Math.PI / 2;
    vinyl.add(groove2);
    
    const groove3 = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.05, 16, 100),
      grooveMaterial
    );
    groove3.rotation.x = Math.PI / 2;
    vinyl.add(groove3);
    
    // Add center hole
    const centerHoleGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 32);
    const centerHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const centerHole = new THREE.Mesh(centerHoleGeometry, centerHoleMaterial);
    vinyl.add(centerHole);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 5;
    
    // Mouse move event handler
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    // Touch move event handler for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mousePosition.current = {
          x: (event.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(event.touches[0].clientY / window.innerHeight) * 2 + 1
        };
        
        // Prevent default to avoid scrolling while interacting with the 3D object
        event.preventDefault();
      }
    };
    
    // Scroll event handler
    const handleScroll = () => {
      scrollPosition.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    
    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate vinyl based on scroll position
      vinyl.rotation.y += 0.01;
      
      // Tilt based on mouse position
      vinyl.rotation.x = mousePosition.current.y * 0.3;
      vinyl.rotation.z = mousePosition.current.x * 0.3;
      
      // Move vinyl position slightly based on scroll
      vinyl.position.y = Math.sin(scrollPosition.current * Math.PI * 2) * 0.5;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="three-container"
    />
  );
};

export default MusicGadget3D;
