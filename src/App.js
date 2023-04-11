import './App.css';
import { useState, useEffect } from 'react';
import Hangman from './components/Hangman';
import Header from './components/Header';
import Word from './components/Word';
import GuessedLetters from './components/GuessedLetters';
import RemainingGuesses from './components/RemainingGuesses';
import ResultMessage from './components/ResultMessage';
import { getRandomWord } from './utils'; // Import the getRandomWord function from utils.js

//Handler for game restart
const handleRestart = () => {
  console.log(`Restart button clicked`);
}



//Winner function
function isWinner(word, guessedLetters) {
  for (let letter of word) {
    if(!guessedLetters.includes(letter)) {
      return false;
    }
  }
  return true;
}

export default function App() {
  // Initialize state for the chosen word
  const [word, setWord] = useState('');

  // useEffect hook to fetch a random word when the component mounts
  useEffect(() => {
    let isMounted = true;
    // define an async function to fetch the random word using the getRandomWord function
    async function fetchWord() {
      if (isMounted) {
        // Call the getRandomWord function to fetch a random word
        const randomWord = await getRandomWord();
        // update the state with the fetched random word
        setWord(randomWord.toUpperCase());
      }
    } 
    // call the fetchWord function when the component mounts, by passing an empty array as the second argument to useEffect
      fetchWord();
      return () => {
        isMounted = false;
      }
  }, []);

  

  return (
    <div className="App">
      <Header restartGame={handleRestart}/>
      <Hangman step={11} />
      <Word word={word} guessedLetters={[]} />
      <GuessedLetters guessedLetters={[]} />
      <RemainingGuesses remaining={6} />
      <ResultMessage 
        isWinner={isWinner}
        word={word}
        guessedLetters={[]}
        maxWrongGuesses={6}
        handleRestart={handleRestart}
      />
    </div>
  );
}
