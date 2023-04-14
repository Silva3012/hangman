import React from 'react';

/*
This component displays the win/lose message

It takes in the word, guessedLetters array and maximum number of allowed wrong guesses

Calculates the number of wrong guesses made by filtering the guessed letters array
and checks if each letter is not included in the word. Then checks if the user has won
by verfifying if every letter in the word is included in the guessed letters array

Then renders a message based on whether the user has won or lost and displays the word,
number of wrong guesses and maximum number of allowed wrong guesses
*/

export default function ResultMessage({ word, guessedLetters, maxWrongGuesses, gameOver}) {
    const wrongGuesses = guessedLetters.filter(letter => !word.includes(letter)).length;
    const isWinner = word.split('').every(letter => guessedLetters.includes(letter));
    const message = isWinner ? 'You won!' : 'You lost!';

    // if (!gameOver) {
    //     return null;
    // }

    return (
        <div className='result-message'>
            <h2>{message}</h2>
            <p>The word was: {word}</p>
            <p>You made {wrongGuesses} wrong guesses out of {maxWrongGuesses}.</p>
        </div>
    )
}