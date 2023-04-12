import React, {useState} from 'react';

//component for user input
export default function UserInput(props) {
    //Declare a state variable for the input value
    const [inputValue, setInputValue] = useState('');

    //Event handler for the input change
    const handleInputChange = (event) => {
        //Update the input value state
        setInputValue(event.target.value.toUpperCase());
    };

    //Event handler for the form submit
    const handleSubmit = (event) => {
        //Prevent the default form submission behavior
        event.preventDefault();
        // Check if the input value is a valid guess (a single letter that hasn't been guessed before)
        if (/^[a-zA-Z]$/.test(inputValue) && !props.guessedLetters.includes(inputValue)) {
            //Call the onGuess function passed down through props, paassing he inpue value as an arguement
            props.onGuess(inputValue);
            //Clear the input value state
            setInputValue('');
        }
    };

    return (
        // Using Bootstrap classes to style the form and input field
        <div className='row justify-content-center'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='guessInput'>Guess a letter:</label>
                    <div className='input-group mb-3'>
                        <input 
                            type='text'
                            className='form-control'
                            id='guessInput'
                            placeholder='Enter a letter'
                            maxLength='1'
                            value={inputValue}
                            onChange={handleInputChange}
                            disabled={props.gameOver}
                            required
                        />
                        <div className='input-group-append'>
                            <button
                                type='submit'
                                className='btn btn-primary'
                                disabled={props.gameOver}
                            >
                                Guess
                            </button>
                        </div>
                    </div> 
                    {props.invalidGuess && (
                        <div className='alert alert-danger' role='alert'>
                            Please enter a valid letter that hasn't been guessed before.
                        </div>
                    )} 
                </div>
            </form>
        </div>
    );
}