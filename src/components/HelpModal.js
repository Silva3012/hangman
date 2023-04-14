import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ModalTitle } from 'react-bootstrap';

//HelpModal component that displays a modal with the game rules
export default function HelpModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <ModalTitle>Hangman Game Rules</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <p>The game of hangman is a word guessing game.</p> 
                <p>The computer selects a word, and the player tries to guess the word by suggesting letters one at a time.</p>
                <p>If the letter is in the word, it is revealed, otherwise a part of the hangman is drawn.</p>
                <p>The player must guess the word before the entire hangman is drawn.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}