// function that generates the nav bar
let leedleAnswer = newWord();
let guess = 1;
let boxPointer = 1;
let userGuess = "";


function generateNavBar() {
    document.write(`
        <table>
            <th>Leedle</th>
            <th>High Scores</th>
        </table>
    `);
}

// gets a new word from the words.js list
function newWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}


// function that creates the 5x6 grid for the gameplay area (guessing)
function generateGameplayArea() {
    for (let i = 1; i <= 6; i++) {
        document.write(`<tr id=row${i}>`);
        for (let j = 1; j <= 5; j++) {
            document.write(`<th id="box${j}_row${i}"></th>`);
        }
        document.write(`</tr>`);
    }
}

// function that generates the interactive onscreen keyboard
function generateOnscreenKeyboard() {
    const keyboardLetters = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    for (let i = 0; i < 2; i++) {
        document.write(`<div class="keyboard_row" id=keyboard_row${i + 1}>`);
        for (let letter of keyboardLetters[i]) {
            document.write(`<button id="keyboard-button-${letter}" onclick="insertKey('${letter}')">${letter.toUpperCase()}</button>`);
        }
        document.write(`</div>`);
    }

    document.write(`<div class="keyboard_row" id=keyboard_row${3}>`);
    document.write(`<button id="keyboard-button-enter" style='padding: 0.05rem; width: 3.25rem' onclick="submitGuess()">ENTER</button>`);
    for (let letter of keyboardLetters[2]) {
        document.write(`<button id="keyboard-button-${letter}" onclick="insertKey('${letter}')">${letter.toUpperCase()}</button>`);
    }
    document.write(`<button id="keyboard-button-back" style="width: 3.25rem" onclick="removeKey()"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="game-icon" data-testid="icon-backspace"><path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg></button>`);
    document.write(`</div>`);
}

document.addEventListener("keyup", function(event) {
    let pressedKey = event.key;
    if (pressedKey.toUpperCase() == "BACKSPACE") { removeKey(); }
    else if (pressedKey.toUpperCase() == "ENTER") { submitGuess(); }
    else if (pressedKey.length == 1) { insertKey(pressedKey); }
    else { return; }
});

function insertKey(pressedKey) {
    if (boxPointer < 6) { document.getElementById("leedle-modal-warnings-container").style.display="none"; }
    if (boxPointer == 0) { boxPointer++; }
    if (boxPointer == 6) { return; }
    document.getElementById(`box${boxPointer}_row${guess}`).innerHTML = pressedKey.toUpperCase();
    userGuess += pressedKey.toLowerCase();
    boxPointer++;
}

function removeKey() {
    document.getElementById("leedle-modal-warnings-container").style.display="none";
    if (boxPointer == 0) { return; }
    boxPointer--;
    if (boxPointer == 0) { return; }
    document.getElementById(`box${boxPointer}_row${guess}`).innerHTML = "";
    userGuess = userGuess.slice(0, -1);
}

function submitGuess() {
    if (boxPointer < 6) {
        document.getElementById("leedle-modal-warnings-container").style.display= "block";
        document.getElementById("leedle-modal-warning").innerHTML = "Not enough letters";
        return; 
    }
    if (userGuess == leedleAnswer) { winSequence(); return; }
    if (!WORDS.includes(userGuess)) {
        document.getElementById("leedle-modal-warnings-container").style.display= "block";
        document.getElementById("leedle-modal-warning").innerHTML = "Word is not in our bank";
        return;
    }
    
    for (let i = 1; i < 6; i++) {
        if (!leedleAnswer.includes(userGuess.charAt(i - 1))) { document.getElementById(`box${i}_row${guess}`).classList.add("leedle-answer-incorrect"); }
        else if (userGuess.charAt(i - 1) === leedleAnswer.charAt(i - 1)) { document.getElementById(`box${i}_row${guess}`).classList.add("leedle-answer-correct"); }
        else if (leedleAnswer.includes(userGuess.charAt(i - 1))) { document.getElementById(`box${i}_row${guess}`).classList.add("leedle-answer-present"); }
    }

    if (document.getElementById(`box1_row${guess}`).classList.contains("leedle-answer-correct") &&
        document.getElementById(`box2_row${guess}`).classList.contains("leedle-answer-correct") &&
        document.getElementById(`box3_row${guess}`).classList.contains("leedle-answer-correct") &&
        document.getElementById(`box4_row${guess}`).classList.contains("leedle-answer-correct") &&
        document.getElementById(`box5_row${guess}`).classList.contains("leedle-answer-correct")
    ) {
        return winSequence();
    }

    if (guess == 6) {
        return loseSequence();
    }

    userGuess = "";
    boxPointer = 0;
    guess++;
}

function winSequence() {
    document.getElementById("leedle-modal-container").style.display = "block";
    document.getElementById("leedle-modal-message").innerHTML = "You Win!";
}







