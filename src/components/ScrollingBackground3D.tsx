import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ScrollingBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Set renderer size and add to DOM
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Set background color to match theme (dark with red tint)
    renderer.setClearColor(0x110000);
    
    // Create particles for background effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    // Create positions array for particles
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Create music-themed particles (like notes, frequencies)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Random positions in 3D space
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50 - 25; // Push particles back
      
      // Color gradient from dark red to black
      const intensity = Math.random() * 0.7;
      colors[i] = intensity * 0.8; // Red component
      colors[i + 1] = intensity * 0.1; // Green component
      colors[i + 2] = intensity * 0.1; // Blue component
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material with custom options for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    // Create particle system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create wave-like structure (representing sound waves)
    const waveGeometry = new THREE.PlaneGeometry(40, 40, 32, 32);
    const waveMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B0000,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.rotation.x = Math.PI / 2;
    wave.position.z = -10;
    scene.add(wave);
    
    // Store wave vertices for animation
    const wavePositions = waveGeometry.getAttribute('position');
    const waveVertices: { 
      x: number;
      y: number;
      z: number;
      originalZ: number;
      randomValue: number;
    }[] = [];
    
    for (let i = 0; i < wavePositions.count; i++) {
      waveVertices.push({
        x: wavePositions.getX(i),
        y: wavePositions.getY(i),
        z: wavePositions.getZ(i),
        originalZ: wavePositions.getZ(i),
        randomValue: Math.random() * Math.PI * 2
      });
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 5;
    
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
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles slowly based on scroll
      particles.rotation.y += 0.001;
      particles.rotation.x = scrollPosition.current * Math.PI * 2;
      
      // Update wave vertices based on time and scroll
      const time = Date.now() * 0.001;
      for (let i = 0; i < wavePositions.count; i++) {
        const vertex = waveVertices[i];
        // Create wave effect
        const waveX = 0.3 * Math.sin(vertex.x * 0.5 + time + vertex.randomValue);
        const waveY = 0.3 * Math.sin(vertex.y * 0.5 + time + vertex.randomValue);
        // Scale effect based on scroll position
        const scrollEffect = scrollPosition.current * 2;
        
        wavePositions.setZ(i, vertex.originalZ + waveX + waveY + scrollEffect);
      }
      wavePositions.needsUpdate = true;
      
      // Change background color slightly based on scroll
      const r = 0.06 + scrollPosition.current * 0.1;
      const g = 0;
      const b = 0;
      renderer.setClearColor(new THREE.Color(r, g, b));
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
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
      className="three-background"
    />
  );
};

export default ScrollingBackground3D;
