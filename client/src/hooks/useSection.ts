import { useState, useEffect } from 'react';

export const useSection = () => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setCurrentSection((prev) => (prev < 3 ? prev + 1 : prev));
      } else if (e.code === 'Escape') {
        e.preventDefault();
        setCurrentSection((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return { currentSection };
}; 