import './App.css';
import { useState, useEffect } from 'react';
import Hangman from './components/Hangman';
import Header from './components/Header';
import Word from './components/Word';
import GuessedLetters from './components/GuessedLetters';
import RemainingGuesses from './components/RemainingGuesses';
import ResultMessage from './components/ResultMessage';
import UserInput from './components/UserInput';
import HelpModal from './components/HelpModal';
import { getRandomWord } from './utils'; // Import the getRandomWord function from utils.js

export default function App() {
  // Initialize state for the chosen word
  const [word, setWord] = useState('');
  // Initialize state to handle incorrect guesses
  const [wrongGuesses, setWrongGuesses] = useState(0)
  // Initialize state for list of guessed letters
  const [guessedLetters, setGuessedLetters] = useState([]);
  //Number of guesses = number of state GIFs counting from 0
  const maxWrongGuesses = 10;
  //State to keep track of the game
  const [gameOver, setGameOver] = useState(null);
  //State for remaining guesses
  const [remainingGuesses, setRemainingGuesses] = useState(maxWrongGuesses);
  //State for the help modal
  const [showHelpModal, setShowHelpModal] = useState(false);


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
    // Check if the game is already over
    if (gameOver) {
      return;
    }

    // Check if the game is over after updating the remaining guesses
    if (checkWin(word, guessedLetters)) {
      setGameOver(true);
      return;
    } else if (checkLoss(maxWrongGuesses, wrongGuesses)) {
      setGameOver(true);
      return;
    }

    // Update remaining guesses
    setRemainingGuesses(Math.max(maxWrongGuesses - wrongGuesses - 1, 0));

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

    //Check if the game is over after each guess
    if (checkWin(word, guessedLetters)) {
      setGameOver(true);
    } else if (checkLoss(maxWrongGuesses, wrongGuesses)) {
      setGameOver(true);
    }
  };
  
  //Winner function
  function isWinner(word, guessedLetters) {
    for (let letter of word) {
      if(!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  }

   //useEffect for gameOver, to check whethe the game is over
  //based on the current state of the values of guessedLetters, maxWrongGuesses, word, wrongGuesses and sets gameOver
  useEffect(() => {
    if(gameOver === null) {
      return;
    }

    if (wrongGuesses >= maxWrongGuesses || remainingGuesses < 1) {
      setGameOver(true);
    } else if (isWinner(word, guessedLetters) || remainingGuesses < 1) {
      setGameOver(true);
    }
  }, [guessedLetters, maxWrongGuesses, word, wrongGuesses]);

  //Function to check if the game has been won
  function checkWin(word, guessedLetters) {
    for (let letter of word) {
      if(!guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  }

  //Function to check if the game has been lost
  function checkLoss() {
    const wrongGuesses = guessedLetters.filter(letter => !word.includes(letter)).length;
    const isLoss = wrongGuesses >= maxWrongGuesses;

    //Check if game is over
    if(isLoss) {
      setGameOver(true);
    }

    return isLoss;
  }
  
  //Handler for game restart
  const handleRestart = async () => {
    const newWord = await getRandomWord();
    setWord(newWord.toUpperCase());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setRemainingGuesses(maxWrongGuesses);
    console.log(gameOver);
  }
  
  //Modal handlers
  const handleShowHelpModal = () => {
    setShowHelpModal(true);
  };

  const handleCloseHelpModal = () => {
    setShowHelpModal(false);
  }

  return (
    <div className="App">
      <Header restartGame={handleRestart} showHelpModal={handleShowHelpModal}/>
      <Hangman step={wrongGuesses + 1} />
      <UserInput  onGuess={handleGuess} guessedLetters={guessedLetters}/>
      <Word word={word} guessedLetters={guessedLetters} />
      <GuessedLetters guessedLetters={guessedLetters} />
      <RemainingGuesses remaining={Math.max(maxWrongGuesses - wrongGuesses, 0)} />
       {(gameOver || isWinner(word, guessedLetters) || checkLoss(maxWrongGuesses, wrongGuesses)) && (
        <ResultMessage 
          isWinner={isWinner(word, guessedLetters)}
          word={word}
          guessedLetters={guessedLetters}
          maxWrongGuesses={maxWrongGuesses}
          handleRestart={handleRestart}
        />
      )}
      <HelpModal show={showHelpModal} handleClose={handleCloseHelpModal} />
    </div>
  );
}
