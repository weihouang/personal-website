import React, { useState, useEffect } from 'react';

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
      
    </header>
  );
};

export default Header;