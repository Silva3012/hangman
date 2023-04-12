import './App.css';
import { useState, useEffect } from 'react';
import Hangman from './components/Hangman';
import Header from './components/Header';
import Word from './components/Word';
import GuessedLetters from './components/GuessedLetters';
import RemainingGuesses from './components/RemainingGuesses';
import ResultMessage from './components/ResultMessage';
import UserInput from './components/UserInput';
import { getRandomWord } from './utils'; // Import the getRandomWord function from utils.js

export default function App() {
  // Initialize state for the chosen word
  const [word, setWord] = useState('');
  // Initialize state to handle incorrect guesses
  const [wrongGuesses, setWrongGuesses] = useState(0)
  // Initialize state for list of guessed letters
  const [guessedLetters, setGuessedLetters] = useState([]);
  // Calculate the maximum wrong guesses allowed based on the length of the word
  const maxWrongGuesses = Math.ceil(word.length / 2);

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

  //Handler for user input 
  const handleGuess = (guess) => {
    //Check if the guessed letter is in the word
    if (word.includes(guess)) {
      // The guess is correct
      // Update guessedLetters state with the new guess
      setGuessedLetters([...guessedLetters, guess]);
    } else {
      // The guess is incorrect
      // Update guessedLetters and incorrectGuesses state with the new guess
      setGuessedLetters([...guessedLetters, guess])
      setWrongGuesses(wrongGuesses + 1);
    }
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
  
  //Handler for game restart
  const handleRestart = () => {
    setWord('');
    setGuessedLetters([]);
    setWrongGuesses(0);
  }

  return (
    <div className="App">
      <Header restartGame={handleRestart}/>
      <Hangman step={wrongGuesses + 1} />
      <UserInput  onGuess={handleGuess} guessedLetters={guessedLetters}/>
      <Word word={word} guessedLetters={guessedLetters} />
      <GuessedLetters guessedLetters={guessedLetters} />
      <RemainingGuesses remaining={maxWrongGuesses - wrongGuesses} />
      <ResultMessage 
        isWinner={isWinner}
        word={word}
        guessedLetters={guessedLetters}
        maxWrongGuesses={maxWrongGuesses}
        handleRestart={handleRestart}
      />
    </div>
  );
}
