import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface NoteProps {
  position: [number, number, number];
  rotation: [number, number, number];
  size?: number;
  color?: string;
  speed?: number;
}

const Note: React.FC<NoteProps> = ({ 
  position, 
  rotation, 
  size = 1, 
  color = '#FF3A00',
  speed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    
    meshRef.current.position.y += Math.sin(time * speed) * 0.001;
    meshRef.current.rotation.y += 0.001 * speed;
  });
  
  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <Text
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        ♪
      </Text>
    </mesh>
  );
};

interface FloatingNotesProps {
  className?: string;
  count?: number;
}

// Generate random position within bounds
const getRandomPosition = (bound: number = 5): [number, number, number] => [
  (Math.random() - 0.5) * bound,
  (Math.random() - 0.5) * bound,
  (Math.random() - 0.5) * 2,
];

// Generate random rotation
const getRandomRotation = (): [number, number, number] => [
  Math.random() * Math.PI * 2,
  Math.random() * Math.PI * 2,
  Math.random() * Math.PI * 2,
];

const FloatingNotes: React.FC<FloatingNotesProps> = ({ className, count = 15 }) => {
  const notes = Array.from({ length: count }, (_, i) => ({
    id: i,
    position: getRandomPosition(),
    rotation: getRandomRotation(),
    size: 0.5 + Math.random() * 0.5,
    color: ['#FF3A00', '#FF7700', '#FFAA00'][Math.floor(Math.random() * 3)],
    speed: 0.5 + Math.random() * 1.5,
  }));
  
  return (
    <div className={`${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        
        {notes.map((note) => (
          <Note
            key={note.id}
            position={note.position}
            rotation={note.rotation}
            size={note.size}
            color={note.color}
            speed={note.speed}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingNotes;