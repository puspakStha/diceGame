'use script';

//selecting dom elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
let currentScoreEl0 = document.querySelector('#current--0');
let currentScoreEl1 = document.querySelector('#current--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

//starting conditions
score0.textContent = '0';
score1.textContent = '0';
diceEl.classList.add('hidden');

const scores = [0, 0]; //imp
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//rolling dice funtion
rollBtn.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display rhe dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check roll 1, if true switch player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // currentScoreEl0.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  //   const currentHigh = 0;
  //   if (currentHigh < currentScore) {
  //     document.getElementById(`current--${activePlayer}`).textContent =
  //       currentScore;
  //     activePlayer = activePlayer === 0 ? 1 : 0;
  //   } else if (currentHigh < currentScore) {
  //     activePlayer = activePlayer === 0 ? 1 : 0;
  //   }
  //   console.log('the high score is ');
  //1. add current score to score of the active player
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check score is atleast 100'
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', function () {
  window.location.reload();
});
