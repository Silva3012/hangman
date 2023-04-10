import React from 'react';
import Badge from 'react-bootstrap/Badge';

/*
This component displays the remaining number of guesses 

We also use the badge component from boostrap to display the remaining
number of guesses

We will import it to the main App and pass the remaining prop
*/

export default function RemainingGuesses({ remaining }) {
    return (
        <div className='remaining-guesses'>
            <Badge bg='danger'>{remaining}</Badge>{" "}
                {remaining === 1 ? 'guess' : 'guesses'} remaining
        </div>
    )
}