import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  let currentPath = window.location.pathname;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
  <div className={`${ currentPath !== '/' && currentPath !== '/words' ? 'hidden' : ''} fixed top-0 right-0 m-4 p-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 rounded-full`}>
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
    >
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  </div>
  );
}

export default Navbar;
