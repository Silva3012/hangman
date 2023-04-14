import React from 'react';
import Button from 'react-bootstrap/Button';
/*
This Header component displays the game header, which includes the title of the game,
some instructions for the user, and a button to restart the game.

Also a function that restarts the game, which is accepted as a prop and triggered when
the restart button is clicked.
*/

export default function Header({ restartGame }) {
    return (
        <div className='header'>
            <h1>Hangman</h1>
            <p>Guess the word by input a letter using your keyboard and pressing Enter or click Guess 🙂.</p>
            <Button variant='outline-primary' onClick={restartGame}>Restart Game</Button>
        </div>
    );
};
