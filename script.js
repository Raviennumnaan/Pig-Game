'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let playing, activePlayer, currentScore, scores;

function initialConditions() {
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
}

// Starting Conditions
initialConditions();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Dice Random Number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for 1
    if (dice !== 1) {
      // Add to Current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add Current score to score of active player
    scores[activePlayer] += currentScore;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];

    // Check score is 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialConditions);
