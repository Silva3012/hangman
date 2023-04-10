import React from 'react';
import Image from 'react-bootstrap/Image';

/*
This Hangman component displays the hangman image using the Image component
from `React-Bootstrap`.

The step prop will determine which image to display. 

This will be imported into main App and pass the step value as a prop
*/

export default function Hangman({ step }) {
    let imageSrc = require(`../assets/images/state${step}.GIF`);
    return <Image src={imageSrc} alt={`Hangman state ${step}`} />
}

