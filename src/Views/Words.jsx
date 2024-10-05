import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaTextHeight, FaChevronDown, FaArrowLeft, FaArrowRight, FaPlay, FaPause } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';

function Words() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [textSize, setTextSize] = useState(localStorage.getItem('textSize') || 'md');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [words, setWords] = useState([]);
  const wordList = useSelector((state) => state.main.value);

  const wpm = parseInt(localStorage.getItem('wpm')) || 150;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('textSize', textSize);
  }, [textSize]);

  useEffect(() => {
    const textData = sessionStorage.getItem('textInput');
    if (textData) {
      setWords(textData.split(' '));
    } else {
      setWords(wordList);
    }
  }, [wordList]);

  useEffect(() => {
    if (isPlaying) {
      const millisecondsPerWord = (60000 / wpm);
      const id = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= words.length) {
            clearInterval(id);
            setIsPlaying(false);
            return prevIndex;
          }
          return nextIndex;
        });
      }, millisecondsPerWord);

      setIntervalId(id);

      return () => clearInterval(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [isPlaying, wpm, words.length]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectSize = (size) => {
    setTextSize(size);
    setIsDropdownOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const textSizeClass = {
    Small: 'text-sm',
    Medium: 'text-base',
    Large: 'text-xl',
    ExtraLarge: 'text-6xl'
  }[textSize] || 'text-base';

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div className='bg-white dark:bg-gray-900 p-4 min-h-screen flex flex-col justify-center items-center'>
      <button
        onClick={() => { window.location.href = '/' }}
        className="absolute top-4 left-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300">
        <IoMdArrowRoundBack size={20} />
      </button>

      <div className="fixed top-0 right-0 m-4 p-2 flex space-x-2">
        <div className="relative inline-block">
          <button
            onClick={handleToggleDropdown}
            className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <FaTextHeight size={20} />
            <FaChevronDown className="ml-2" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
              <ul className="flex flex-col">
                {['Small', 'Medium', 'Large', 'ExtraLarge'].map((size) => (
                  <li
                    key={size}
                    onClick={() => handleSelectSize(size)}
                    className={`cursor-pointer p-2 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${textSize === size ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                  >
                    <span className={`font-medium`}>{size.toUpperCase()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      <p className={`${textSizeClass} text-center mb-36 text-gray-800 dark:text-gray-100`}>
        {words[currentWordIndex]}
      </p>

      <div className="flex space-x-4">
        <button onClick={handlePreviousWord} className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300">
          <FaArrowLeft size={24} />
        </button>
        <button onClick={handlePlayPause} className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300">
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={handleNextWord} className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300">
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default Words;
