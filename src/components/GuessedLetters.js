import React from 'react';
import Badge from 'react-bootstrap/Badge';

/*
This component displays the letters that have been guessed.
We will display each guessed letter as a badge using the react-bootstrap badge component
Passed the guessdLetters array as a prop and used the map function to generate a badge component
for each letter.
The key prop is set to index, which is the index of the current letter in the array

We will import this component to main App and pass the guessedLetters prop to it.
*/

export default function({ guessedLetters }) {
    return (
        <div className='guessed-letters'>
            <h2>Guessed Letters</h2>
            {guessedLetters.map((letter, index) => (
                <Badge bg='secondary' key={index} className='guessed-letter'>
                    {letter}
                </Badge>
            ))}
        </div>
    )
}