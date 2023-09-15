// function that generates the nav bar
function generateNavBar() {
    document.write(`
        <table>
            <th>Leedle</th>
            <th>High Scores</th>
        </table>
    `)
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

function generateOnscreenKeyboard() {
    const keyboardLetters = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    for (let i = 0; i < keyboardLetters.length; i++) {
        document.write(`<div class="keyboard_row" id=keyboard_row${i + 1}>`);
        for (let letter of keyboardLetters[i]) {
            document.write(`<button id="keyboard-button-${letter}">${letter.toUpperCase()}</button>`);
        }
        document.write(`</div>`);
    }
}




