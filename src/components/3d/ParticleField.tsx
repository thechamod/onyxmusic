import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface ParticleProps {
  count: number;
  colors: string[];
}

const Particles: React.FC<ParticleProps> = ({ count, colors }) => {
  const mesh = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Add slow upward motion and subtle swaying
      positions.array[i3 + 1] += 0.005;
      positions.array[i3] += Math.sin(time + i * 0.1) * 0.002;
      
      // Reset particles that go too high
      if (positions.array[i3 + 1] > 10) {
        positions.array[i3] = (Math.random() - 0.5) * 10;
        positions.array[i3 + 1] = -10;
        positions.array[i3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    
    positions.needsUpdate = true;
  });
  
  // Generate initial positions
  const particlePositions = new Float32Array(count * 3);
  const particleColors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Position
    particlePositions[i3] = (Math.random() - 0.5) * 10;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 20 - 5; // Start lower
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;
    
    // Color
    const color = colors[Math.floor(Math.random() * colors.length)];
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    
    particleColors[i3] = r;
    particleColors[i3 + 1] = g;
    particleColors[i3 + 2] = b;
  }
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={particlePositions} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={count} 
          array={particleColors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        vertexColors 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
};

interface ParticleFieldProps {
  className?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ className }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const particleCount = isMobile ? 200 : 500;
  const colors = ['#FF3A00', '#FF5500', '#FF7700', '#FFAA00'];
  
  return (
    <div className={`${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} colors={colors} />
      </Canvas>
    </div>
  );
};

export default ParticleField;