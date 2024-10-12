"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TypingTest = () => {
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [words, setWords] = useState([]); // Words to be typed
  const [typedText, setTypedText] = useState(''); // Current text typed by the user
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Tracks the current word being typed
  const [typedWords, setTypedWords] = useState([]); // Tracks all typed words
  const [isTimerActive, setIsTimerActive] = useState(false); // Whether the timer is active
  const [nextBatchWords, setNextBatchWords] = useState([]); // Holds the next batch of words
  const [showResults, setShowResults] = useState(false); // Controls when to show results
  const [wpm, setWpm] = useState(0); // Words per minute
  const [accuracy, setAccuracy] = useState(0); // Typing accuracy percentage

  // Fetch random words from the API
  const fetchWords = async () => {
    try {
      const response = await axios.get('https://random-word-api.herokuapp.com/word?number=10');
      return response.data;
    } catch (error) {
      console.error('Error fetching words:', error);
      return [];
    }
  };

  // Initial word fetch on component mount
  useEffect(() => {
    const initialFetch = async () => {
      const firstBatch = await fetchWords();
      const secondBatch = await fetchWords();
      setWords(firstBatch);        // Set the first batch of words
      setNextBatchWords(secondBatch); // Preload the second batch
    };
    initialFetch();
  }, []);

  // Handle key press and start the timer
  const handleKeyPress = (e) => {
    if (e.key === ' ') {
      // When the space key is pressed, move to the next word
      if (typedText.trim() !== '') {
        const correctWord = words[currentWordIndex];
        const isCorrect = correctWord === typedText.trim();
        setTypedWords((prev) => [...prev, { word: typedText.trim(), isCorrect }]);
        setCurrentWordIndex((prev) => prev + 1); // Move to the next word

        // Pre-fetch new words when half of the current set is typed
        if (currentWordIndex === 5 && nextBatchWords.length === 0) {
          fetchWords().then(setNextBatchWords);
        }
      }
      setTypedText(''); // Clear the typed text

      // If all 10 words are typed, swap the next batch and pre-fetch the subsequent batch
      if (currentWordIndex + 1 === 10) {
        setWords(nextBatchWords); // Replace with pre-fetched words
        setCurrentWordIndex(0);   // Reset the index
        setTypedText('');         // Clear typed text
        fetchWords().then(setNextBatchWords); // Pre-fetch the next batch of words
      }
    } else if (e.key.length === 1) { // If a letter is typed
      setTypedText((prev) => prev + e.key);

      // Start the timer on the first key press
      if (!isTimerActive) {
        setIsTimerActive(true);
      }
    }
  };

  // Handle backspace for typing
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setTypedText((prev) => prev.slice(0, -1)); // Remove the last character
    }
  };

  // Calculate WPM and accuracy after the test ends
  useEffect(() => {
    if (timer === 0) {
      // Calculate WPM and accuracy
      const correctWords = typedWords.filter(word => word.isCorrect).length;
      const totalTypedWords = typedWords.length;

      const calculatedWpm = (correctWords / (60 / 60)).toFixed(2); // Assuming 60 seconds timer
      const calculatedAccuracy = ((correctWords / totalTypedWords) * 100).toFixed(2);

      setWpm(calculatedWpm);
      setAccuracy(calculatedAccuracy);

      // Show results instead of typing test
      setShowResults(true);
    }
  }, [timer, typedWords]);

  // Start the countdown timer
  useEffect(() => {
    let countdown;

    if (isTimerActive) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown); // Clean up the timer interval
  }, [isTimerActive]);

  // Add event listeners for key press and key down
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [typedText, timer]);

  // Render words with color coding
  const renderWord = (word, index) => {
    if (index < currentWordIndex) {
      // Words that have been completed
      const { isCorrect } = typedWords[index];
      return (
        <span key={index} style={{ color: isCorrect ? 'green' : 'red' }}>
          {word}{' '}
        </span>
      );
    } else if (index === currentWordIndex) {
      // Current word being typed
      return (
        <span key={index}>
          {word.split('').map((letter, letterIndex) => {
            const isTyped = typedText[letterIndex] !== undefined;
            const isCorrect = typedText[letterIndex] === letter;

            return (
              <span
                key={letterIndex}
                style={{
                  color: isTyped ? (isCorrect ? "green" : "red") : "black",
                }}
              >
                {letter}
              </span>
            );
          })}
          {' '}
        </span>
      );
    } else {
      // Words that have not yet been typed
      return (
        <span key={index} style={{ color: 'black' }}>
          {word}{' '}
        </span>
      );
    }
  };

  return (
    <div className="container">
      {showResults ? (
        // Display results after timer ends
        <>
        <div className='header'>
            <h1>Fast Type</h1>
          </div>

        <div className='results'>
          <h1>Typing Test Results</h1>
          <div className='result-display'>
          <p>Speed: {wpm} WPM</p>
          <p>Accuracy: {accuracy}%</p>
          </div>
          
          <button onClick={() => window.location.reload()}>Retake the Test</button>
        </div>
        </>
      ) : (
        // Display typing test while timer is running
         <>
          <div className='header'>
            <h1>Fast Type</h1>
          </div>

          {/* Display timer */}
          <div className='timer'>
            <p>Time left: {timer} seconds</p>
          </div>

          <div className="typing-container">
            <p className="start-typing">Start typing the words below:</p>

            {/* Show words and highlight typed letters */}
            <p className="fetched-words">
              {words.map((word, index) => renderWord(word, index))}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default TypingTest;







