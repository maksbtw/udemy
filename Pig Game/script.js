'use strict'

class Player {
    playerId;
    currScore = 0;
    score = 0;
    constructor(pI) {
        this.playerId = pI;
    }
    setCurrScore(value) {
        this.currScore = value;
        document.querySelector(`#current--${this.playerId}`).textContent = this.currScore;
    }
    setScore(value) {
        this.score = value;
        document.querySelector(`#score--${this.playerId}`).textContent = this.score;
    }
}

class Game {
    activePlayer = 0;
    players = [];
    constructor(p1, p2) {
        this.players.push(p1, p2);
    }
    changeActivePlayer() {
        this.activePlayer = this.activePlayer ? 0 : 1;
        document.querySelector(`.player--${this.activePlayer}`).classList.add('player--active');
        document.querySelector(`.player--${!this.activePlayer ? 1 : 0}`).classList.remove('player--active');
    }
    rollDice() {
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        if (document.querySelector('.dice').classList.contains('hidden'))
            document.querySelector('.dice').classList.remove('hidden');
        document.querySelector('.dice').src = `img/dice-${diceNum}.png`;

        const player = this.players[this.activePlayer];
        if (diceNum != 1) {
            player.setCurrScore(player.currScore + diceNum);
        } else {
            player.setCurrScore(0);
            this.changeActivePlayer();
        }
    }
    holdDice() {
        const player = this.players[this.activePlayer];
        player.setScore(player.currScore);
        player.setCurrScore(0);
        this.changeActivePlayer();
    }
    restart() {
        for (let i = 0; i < 2; i++) {
            this.players[i].setCurrScore(0);
            this.players[i].setScore(0);
            if (this.activePlayer)
                this.changeActivePlayer();
            document.querySelector('.dice').classList.add('hidden');
        }
    }
}

const game = new Game(new Player(0), new Player(1));

document.querySelector('.btn--roll').addEventListener('click', e => {
    game.rollDice();
})

document.querySelector('.btn--hold').addEventListener('click', e => {
    game.holdDice();
})

document.querySelector('.btn--new').addEventListener('click', e => {
    game.restart();
})