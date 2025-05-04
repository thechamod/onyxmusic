import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MobileGadget3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create simplified 3D scene for mobile
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Using 1 as aspect ratio for square container
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Configure renderer
    renderer.setSize(100, 100); // Small fixed size for mobile
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Create simplified record
    const geometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x8B0000, // Dark red
      metalness: 0.5,
      roughness: 0.2
    });
    const vinyl = new THREE.Mesh(geometry, material);
    scene.add(vinyl);
    
    // Add center hole
    const centerHoleGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 32);
    const centerHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const centerHole = new THREE.Mesh(centerHoleGeometry, centerHoleMaterial);
    vinyl.add(centerHole);
    
    // Add groove
    const grooveGeometry = new THREE.TorusGeometry(0.6, 0.05, 16, 32);
    const grooveMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const groove = new THREE.Mesh(grooveGeometry, grooveMaterial);
    groove.rotation.x = Math.PI / 2;
    vinyl.add(groove);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 3;
    
    // Animation loop - simple rotation for mobile
    const animate = () => {
      requestAnimationFrame(animate);
      
      vinyl.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      style={{
        width: '100px',
        height: '100px'
      }}
    />
  );
};

export default MobileGadget3D;
