import dictionary from './assets/dictionary.txt';

export const getRandomWord = async () => {
    try {
        // HTTP request to the dictionary.txt file using the fetch method.
        const response = await fetch(dictionary);
        // We then wait for the response to come back and use the text method to extract the contents of the file as a string.
        const wordsText = await response.text()
        // We then split the string into an array of words using the split method, using the newline character \n as the delimiter. We also filter out any empty lines using the filter method.
        const words = wordsText.split('\n').filter(word => word.trim() !== '');
        // Finally, we generate a random index within the bounds of the array using Math.random and return the word at that index.
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        return randomWord;
    } catch (error) {
        console.log('Error fetching random word:', error);
    }
}
    