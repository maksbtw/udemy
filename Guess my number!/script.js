'use strict';

let stats = {
    numberToGuess: Math.ceil(Math.random() * 20),
    score: 20,
    highScore: 0,
}

function checkAttempt() {
    let guess = document.querySelector('.guess').value;
    if (guess != stats.numberToGuess) {
        document.querySelector('.message').textContent = (guess > stats.numberToGuess) ? 'Too high!' : 'Too low!';
        document.querySelector('.score').textContent = --stats.score;
    } else {
        document.querySelector('.message').textContent = 'Success!';
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').textContent = stats.numberToGuess;
        // changing highscore
        if (stats.score > stats.highScore) {
            stats.highScore = stats.score;
            document.querySelector('.highscore').textContent = stats.highScore;
        }
    }
}

function restart() {
    // stats reseting
    stats.numberToGuess = Math.ceil(Math.random() * 20);
    stats.score = 20;
    // DOM reseting
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = stats.score;
    document.querySelector('.guess').value = '';
}

document.querySelector('.check').addEventListener('click', () => {
    checkAttempt();
});

document.querySelector('.again').addEventListener('click', () => {
    restart();
});