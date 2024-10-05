import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Silme butonu için ikon
import { useNavigate } from 'react-router-dom';
import pdfToText from 'react-pdftotext';
import { setContent } from '../redux/main/mainSlice'
import { useDispatch } from 'react-redux';

function App() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [wpm, setWpm] = useState(150);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.clear();
  },[])

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsFileUploaded(true);
      setTextInput('');
      pdfToText(file)
        .then(text => {
          extractTextFromPdf(text);
        })
        .catch(error => console.error("Failed to extract text from pdf: ", error));
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleFileClear = () => {
    setIsFileUploaded(false);
    document.getElementById('file-input').value = '';
  };

  const handleStart = () => {
    if(textInput.length === 0 && isFileUploaded === false){
      return;
    }
    if (textInput.length > 0) {
      sessionStorage.setItem('textInput', textInput);
    }
    localStorage.setItem('wpm',wpm)
    navigate(`/words`);
  };

  const extractTextFromPdf = async (textContent) => {
    console.log(textContent.trim().split(/\s+/));
    dispatch(setContent(textContent.trim().split(/\s+/))); 
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 w-full h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Speed Reading Trainer</h1>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              disabled={isFileUploaded || textInput.length !== 0}
              className={`p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${isFileUploaded ? 'border-teal-600 dark:border-teal-400' : 'border-gray-300 dark:border-gray-600'} w-full ${isFileUploaded ? 'w-[calc(100%-3rem)]' : 'w-full'}
                ${textInput.length !== 0 ? 'disabled:true border-red-500 dark:border-red-300' : ''}`}
            />
            {isFileUploaded && (
              <button
                onClick={handleFileClear}
                className="p-2 text-red-500 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-700 rounded-full"
              >
                <FaTimes size={20} />
              </button>
            )}
          </div>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className={`w-full p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out ${isFileUploaded ? 'border-red-500 dark:border-red-300' : 'border-gray-300 dark:border-gray-600'}
              ${textInput.length !== 0 ? 'border-teal-600 dark:border-teal-400' : ''}`}
            rows="6"
            placeholder="Paste or type your text here..."
            disabled={isFileUploaded}
          />
          <div className="flex items-center space-x-4">
            <label htmlFor="wpm" className="text-gray-800 dark:text-gray-100">WPM:</label>
            <input
              id="wpm"
              type="number"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              min="1"
              className="w-full text-center p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 transition duration-150 ease-in-out"
            />
          </div>
          <button
            className="w-full h-12 bg-gradient-to-r from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-700 text-white rounded-lg hover:from-teal-500 hover:to-teal-700 dark:hover:from-teal-600 dark:hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-150 ease-in-out"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
