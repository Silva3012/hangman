import React from 'react';

/*
This Word component displays the word to be guessed

It takes in two props: word and guessedLetters.

word prop = the word that needs to be guessed

guessedLetters prop = an array of the letters the user has guessed
*/

export default function Word({ word, guessedLetters }) {
    return (
        <div className='word'>
            {/* Using the split method to convert `word` string into an array of chars
                then map method to loop through each letter of the array and create a span
                element for each letter.
                Assigned a `key` to each span element using the index of the letter.
             */}
             {word.split('').map((letter, index) => {
                let classes = `letter`;
                if (guessedLetters.includes(letter)) {
                    classes += ` guessed`;
                }  
                return (
                    //add a conditional class
                    <span key={index} className={classes}>
                        {guessedLetters.includes(letter) ? letter : `_ `}      
                    </span>
                );
             })}
        </div>
    )
}