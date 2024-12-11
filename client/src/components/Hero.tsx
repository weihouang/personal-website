import React, { useState, useEffect } from 'react';
import Background3D from './Background3D';

const Hero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {isLoading ? (
        <div className="text-white text-2xl flex items-center justify-center h-full">
          Loading...
        </div>
      ) : (
        <Background3D />
      )}
    </section>
  );
};

export default Hero;