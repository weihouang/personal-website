import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="App font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero />
    </div>
  );
};

export default App;