import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Waveform = ({ color, speed, height, width, position, segments = 20 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const mesh = meshRef.current;
    const positions = mesh.geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const time = clock.getElapsedTime() * speed;
      
      // Create wave effect
      if (i % 3 === 0) {
        const z = Math.sin(x * 0.5 + time) * 0.2;
        positions.setZ(i, z);
      }
    }
    
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height, segments, 1]} />
      <meshStandardMaterial color={color} wireframe={true} transparent opacity={0.6} />
    </mesh>
  );
};

interface WaveformCanvasProps {
  className?: string;
}

const WaveformCanvas: React.FC<WaveformCanvasProps> = ({ className }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div className={`${className || ''}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Waveform 
          color="#FF3A00" 
          speed={0.5} 
          height={isMobile ? 1 : 2} 
          width={isMobile ? 3 : 6} 
          position={[0, 0, 0]} 
          segments={30}
        />
        
        <Waveform 
          color="#FF7700" 
          speed={0.3} 
          height={isMobile ? 0.8 : 1.5} 
          width={isMobile ? 2.5 : 5} 
          position={[0, 0.5, 0.5]} 
          segments={25}
        />
        
        <Waveform 
          color="#FFAA00" 
          speed={0.7} 
          height={isMobile ? 0.6 : 1} 
          width={isMobile ? 2 : 4} 
          position={[0, -0.5, 1]} 
          segments={20}
        />
      </Canvas>
    </div>
  );
};

export default WaveformCanvas;