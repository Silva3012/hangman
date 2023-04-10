import './App.css';
import Hangman from './components/Hangman';
import Header from './components/Header';
import Word from './components/Word';
import GuessedLetters from './components/GuessedLetters';
import RemainingGuesses from './components/RemainingGuesses';
import ResultMessage from './components/ResultMessage';

//Handler for game restart
const handleRestart = () => {
  console.log(`Restart button clicked`);
}

function isWinner(word, guessedLetters) {
  for (let letter of word) {
    if(!guessedLetters.includes(letter)) {
      return false;
    }
  }
  return true;
}

export default function App() {
  return (
    <div className="App">
      <Header restartGame={handleRestart}/>
      <Hangman step={11} />
      <Word word='ntsika' guessedLetters={['n', 't', 's', 'i', 'k', 'a']} />
      <GuessedLetters guessedLetters={['n', 't', 's', 'i', 'k', 'a']} />
      <RemainingGuesses remaining={0} />
      <ResultMessage 
        isWinner={isWinner}
        word='ntsika'
        guessedLetters={['n', 't', 's', 'i', 'k', 'a']}
        maxWrongGuesses={0}
        handleRestart={handleRestart}
      />
    </div>
  );
}
