// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 bg-opacity-90 shadow-md z-50">
      <div className="bg-red-600 text-white text-center py-2 px-4 font-medium">
          🚧 Work in Progress - This site is currently under construction 🚧
      </div>
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <h1
            className="text-2xl font-bold text-primary dark:text-accent cursor-pointer"
            onClick={() => scroll.scrollToTop()}
          >
            WH
          </h1>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;