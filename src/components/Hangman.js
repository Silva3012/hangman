import React from 'react';
import Image from 'react-bootstrap/Image';

/*
This Hangman component displays the hangman image using the Image component
from `React-Bootstrap`.

The step prop will determine which image to display. 

Define a variable that holds the path to the correct image based on the step prop passed to the component. 
We can use a switch statement to map the step value to the correct image file name.

This will be imported into main App and pass the step value as a prop
*/

export default function Hangman({ step }) {
    let imagePath = '';

    switch (step) {
        case 1:
            imagePath = 'state1.GIF';
            break;
        case 2: 
            imagePath = 'state2.GIF';
            break;
        case 3: 
            imagePath = 'state3.GIF';
            break;
        case 4: 
            imagePath = 'state4.GIF';
            break;
        case 5: 
            imagePath = 'state5.GIF';
            break;
        case 6: 
            imagePath = 'state6.GIF';
            break;
        case 7: 
            imagePath = 'state7.GIF';
            break;
        case 8: 
            imagePath = 'state8.GIF';
            break;
        case 9: 
            imagePath = 'state9.GIF';
            break;
        case 10: 
            imagePath = 'state10.GIF';
            break;
        case 11: 
            imagePath = 'state11.GIF';
            break;
        default:
            imagePath = 'state1.GIF';
            break;
    }

    let imageSrc = require(`../assets/images/${imagePath}`);
    return <Image src={imageSrc} alt={`Hangman state ${step}`} />
}

