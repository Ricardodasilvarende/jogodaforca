const words = [
    { word: "PROGRAMACAO", tip: "Área de desenvolvimento" },
    { word: "JAVASCRIPT", tip: "Linguagem da Web" },
    { word: "COMPUTADOR", tip: "Máquina de trabalho" },
    { word: "INTERNET", tip: "Rede global" },
    { word: "ESTILO", tip: "Função do CSS" }
];

let selectedObj = {};
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

const categoryTip = document.getElementById('category-tip');
const wrongCount = document.getElementById('wrong-count');
const wordDisplay = document.getElementById('word-display');
const keyboard = document.getElementById('keyboard');
const restartBtn = document.getElementById('restart-btn');

function initGame() {
    selectedObj = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;

    categoryTip.innerText = selectedObj.tip;
    wrongCount.innerText = wrongGuesses;
    restartBtn.classList.add('hidden');

    renderWord();
    renderKeyboard();
}

function renderWord() {
    wordDisplay.innerHTML = "";
    for (let char of selectedObj.word) {
        const span = document.createElement('div');
        span.classList.add('letter-space');
        if (guessedLetters.includes(char)) {
            span.innerText = char;
        } else {
            span.innerText = "";
        }
        wordDisplay.appendChild(span);
    }
}

function renderKeyboard() {
    keyboard.innerHTML = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let letter of alphabet) {
        const btn = document.createElement('button');
        btn.classList.add('key-btn');
        btn.innerText = letter;
        btn.addEventListener('click', () => handleGuess(letter, btn));
        keyboard.appendChild(btn);
    }
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    guessedLetters.push(letter);

    if (selectedObj.word.includes(letter)) {
        renderWord();
        checkWin();
    } else {
        wrongGuesses++;
        wrongCount.innerText = wrongGuesses;
        checkLose();
    }
}

function checkWin() {
    const won = [...selectedObj.word].every(char => guessedLetters.includes(char));
    if (won) {
        endGame("Você Venceu! 🎉");
    }
}

function checkLose() {
    if (wrongGuesses >= maxWrong) {
        endGame("Fim de Jogo! 😢");
    }
}

function endGame(message) {
    // Revela todas as letras
    wordDisplay.querySelectorAll('.letter-space').forEach((span, idx) => {
        span.innerText = selectedObj.word[idx];
    });

    // Desativa todos os botões do teclado
    document.querySelectorAll('.key-btn').forEach(b => b.disabled = true);

    // Mostra mensagem e botão de reiniciar
    categoryTip.innerText = message;
    restartBtn.classList.remove('hidden');
}

restartBtn.addEventListener('click', initGame);

// Inicializa no primeiro carregamento
initGame();
