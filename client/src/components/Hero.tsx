import React from 'react';
import Background3D from './Background3D';

const Hero: React.FC = () => {
  return (
    <section className="hero-section relative h-screen bg-gray-800 flex items-center justify-center overflow-hidden">
      {/* 3D Background with Integrated Text and Header */}
      <Background3D />
    </section>
  );
};

export default Hero;