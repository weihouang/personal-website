// src/components/Background3D.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { animateScroll as scroll } from 'react-scroll';
import { motion } from 'framer-motion-3d';

const HeroText: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFontSize(3);
      } else {
        setFontSize(5);
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Text
        position={[0, 0, 0]}
        fontSize={fontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
      >
        Hi, I'm Wei-Ho Uang
        <meshStandardMaterial attach="material" side={THREE.DoubleSide} />
     </Text>
    </>
  );
};

const FloatingParticles: React.FC = () => {
  const ref = useRef<THREE.Points>(null!);

  // Adjust particle count based on screen width
  const [particlesCount, setParticlesCount] = useState<number>(1000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setParticlesCount(500);
      } else {
        setParticlesCount(1000);
      }
    };

    handleResize(); // Set initial count
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 100; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
  }

  useFrame(() => {
    // Slight rotation for a dynamic effect
    ref.current.rotation.y += 0.0005;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

// Down Arrow Component
const DownArrow: React.FC = () => {
  const handleClick = () => {
    scroll.scrollTo(document.getElementById('about')?.offsetTop || 0, {
      duration: 800,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <motion.group
      onClick={handleClick}
      onPointerOver={(e) => ((e.object as THREE.Mesh).material as THREE.MeshStandardMaterial).color = new THREE.Color('hotpink')}
      onPointerOut={(e) => ((e.object as THREE.Mesh).material as THREE.MeshStandardMaterial).color = new THREE.Color('#ffffff')}
      animate={{ y: [0, -10, 0], opacity: 1 }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    >
      <Text
        position={[0, -20, 0]} // Adjust position as needed
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        ↓
        <meshStandardMaterial attach="material" side={THREE.DoubleSide} />
      </Text>
    </motion.group>
  );
};
const Background3D: React.FC = () => {
  return (
    <Canvas
      className="absolute top-0 left-0 w-full h-full z-0 cursor-pointer"
      camera={{ position: [0, 10, 50], fov: 75 }} // Elevated camera position
    >
      {/* Ambient Light for basic illumination */}
      <ambientLight intensity={0.5} />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* 3D Hero Text */}
      <HeroText />

      {/* Down Arrow */}
      <DownArrow />

      {/* OrbitControls to allow user interaction */}
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />

      {/* Preload assets */}
      <Preload all />
    </Canvas>
  );
};

export default Background3D;