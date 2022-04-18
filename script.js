const theWord = require("./words.js");

const num_guesses = 6;
let guesses_left = num_guesses;
let curr_guess = [];
let nextLetter = 0;
let theWord = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(theWord);

addEventListener("keyup", (e) => {
    if (guesses_left == 0){
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter != 0){
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter"){
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1){
        return; 
    } else {
        insertLetter(pressedKey);
    }

});

function insertKey(pressedKey) {
    if (nextLetter == 5){
        return;
    }

    pressedKey = pressedKey.toLowerCase();

}