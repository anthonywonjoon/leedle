const word = WORDS[Math.floor(Math.random() * WORDS.length)]; // grabbing a random word from words.js
let nextSpace = 0; // what is the next space we are on (0-4)
let row = 0; // what row are we on? (0-5)

// variables holding keyboard letters
let topLetters = "qwertyuiop";
let midLetters = "asdfghjkl";
let botLetters = "zxcvbnm";

let row_guess = [false, false, false, false, false];

let userGuess = "";

document.addEventListener("keyup", function(event) {
    var pressedKey = event.key.toUpperCase();
    console.log(pressedKey);
    if (pressedKey == "BACKSPACE"){
        removeKey();
    } else if (pressedKey == "ENTER"){
        guess();
    } else {
        insertKey(pressedKey);
    }
    
})

function insertKey(key) { // function for inserting key onclick, takes param key
    if (
        nextSpace == 5 && row_guess[0] == false || 
        nextSpace == 10 && row_guess[1] == false || 
        nextSpace == 15 && row_guess[2] == false ||
        nextSpace == 20 && row_guess[3] == false ||
        nextSpace == 25 && row_guess[4] == false
        ){
        return;
    }
    console.log(key);
    document.getElementsByClassName("box" + nextSpace)[row].innerHTML = key;
    userGuess = userGuess + key;
    nextSpace++;
}

function removeKey(){ // function for removing the last key
    if (nextSpace == 0 || nextSpace == 5 && row_guess[row - 1] == true ){
        return;
    }
    document.getElementsByClassName("box" + (nextSpace - 1))[row].innerHTML = "";
    userGuess = userGuess.substring(0, userGuess.length - 1);
    nextSpace--;
}

function guess() {
    if (nextSpace != 5){
        return;
    }

    tempGuess = userGuess.toLowerCase();
    for (i = 0; i < 5; i++){
        if (word.includes(tempGuess.charAt(i))){
            if (word.indexOf(tempGuess.charAt(i)) == i || word.lastIndexOf(tempGuess.charAt(i)) == i){
                document.getElementsByClassName("box" + i)[row].classList.add("correct");
                document.getElementsByClassName("box" + i)[row].classList.add("flip-horizontal-bottom");
                if (document.getElementById(tempGuess.charAt(i)).classList.contains("correct_letter")){
                    document.getElementById(tempGuess.charAt(i)).classList.remove("correct_letter");
                }
                document.getElementById(tempGuess.charAt(i)).classList.add("correct");
                
            } else {
                document.getElementsByClassName("box" + i)[row].classList.add("correct_letter");
                document.getElementById(tempGuess.charAt(i)).classList.add("correct_letter");
            }
        } else {
            document.getElementsByClassName("box" + i)[row].classList.add("incorrect");
            document.getElementById(tempGuess.charAt(i)).classList.add("incorrect");
        }
    }

    if (document.getElementsByClassName("box" + 0)[row].classList.contains("correct") &&
        document.getElementsByClassName("box" + 1)[row].classList.contains("correct") &&
        document.getElementsByClassName("box" + 2)[row].classList.contains("correct") &&
        document.getElementsByClassName("box" + 3)[row].classList.contains("correct") &&
        document.getElementsByClassName("box" + 4)[row].classList.contains("correct") 
        ) {
            alert("You Win!");
        }


    nextSpace = 0;
    row_guess[row] = true;
    row++;
    userGuess = [];
    
}