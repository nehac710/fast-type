"use client"
import React from 'react';
import { useRouter } from 'next/router';

const Results = () => {
  const router = useRouter(); // Initialize router
  const { wpm, accuracy } = router.query; // Access the query parameters

  // Function to retake the test
  const retakeTest = () => {
    router.push('/'); // Navigate back to the TypingTest
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Typing Test Results</h1>
      <p>Your Typing Speed: {wpm} WPM</p>
      <p>Your Accuracy: {accuracy}%</p>
      <button onClick={retakeTest}>Retake the Test</button>
    </div>
  );
};

export default Results;



