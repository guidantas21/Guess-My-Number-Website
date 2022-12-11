"use strict";

// --- MATH FUNCTIONS

const getRandomNumber = function (max) {
  return Math.trunc(Math.random() * max) + 1;
};

const isEven = function (n) {
  return n % 2 == 0;
};

const isPerfectSquare = function (n) {
  return Number.isInteger(Math.sqrt(n));
};

const isPrime = function (n) {
  for (let i = 2; i < n; i++) if (n % i === 0) return false;
  return n > 1;
};

// Game constants
const MAX_RANDOM_NUMBER = 200;
const INITIAL_SCORE = 10;

// Game variables
let secretNumber = getRandomNumber(MAX_RANDOM_NUMBER);
let score = INITIAL_SCORE;
let highscore = 0;
let attempts = [];

// --- ELEMENTS

// Body element
const body = document.querySelector("body");

// Number range
const max = document.querySelector(".max");

// Output
const secretNumberElement = document.querySelector(".secret-number");
const message = document.querySelector(".message");

// Input guess
const guessElement = document.querySelector(".guess");
const btnCheck = document.querySelector(".btn--check");

// Playes status
const attemptsElement = document.querySelector(".attempts");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".highscore");

// Play again button
const btnAgain = document.querySelectorAll(".btn--again");
const btnAgainBottom = document.querySelector("#again-bottom");

// Modal
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalText = document.querySelector(".modal-text");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".btn--help");

// --- ELEMENT FUNCTIONS

const displayScore = function () {
  scoreElement.textContent = score;
};

const displayAttempts = function () {
  // Turn attempts array into a string and display it
  attemptsElement.textContent =
    attempts.length > 0 ? attempts.join(", ") : "None";
};

const displayMessage = function (text) {
  message.textContent = text;
};

const displaySecretNumber = function (value = secretNumber) {
  secretNumberElement.textContent = value;
};

const clearGuessInput = function () {
  guessElement.value = "";
};

const swapButtons = function () {
  // Hide the check button and display the again button instead
  btnCheck.classList.add("hidden");
  btnAgainBottom.classList.remove("hidden");
};

// --- EVENT FUNCTIONS

// Process the guess input
const checkGuess = function () {
  const guess = Number(guessElement.value);

  // No guess
  if (!guess) {
    displayMessage("No number!");

    // Repeated guess
  } else if (attempts.includes(guess)) {
    displayMessage("You already tried this number!");

    // Correct guess
  } else if (guess === secretNumber) {
    displayMessage("Correct Number!");
    displaySecretNumber();

    // Update highscore
    if (score > highscore) {
      highscore = score;
      highscoreElement.textContent = highscore;
    }

    // Victory style
    body.classList.add("background-color--victory");
    secretNumberElement.classList.add("secret-number--victory");
    message.classList.add("message--victory");

    swapButtons();

    // Wrong guess
  } else if (guess !== secretNumber) {
    score--;
    attempts.push(guess);

    displayScore();
    displayAttempts();
    clearGuessInput();

    // Hint
    if (score >= 1) {
      displayMessage(guess > secretNumber ? "Too high!" : "Too low!");

      // Defeat
    } else {
      displayMessage("You lost!");
      displaySecretNumber();

      // Defeat style
      body.classList.add("background-color--defeat");
      secretNumberElement.classList.add("secret-number--defeat");
      message.classList.add("message--defeat");

      swapButtons();
    }
  }
};

const resetGame = function () {
  // New secret number
  displaySecretNumber("?");
  secretNumber = getRandomNumber(MAX_RANDOM_NUMBER);

  // Reset score
  score = INITIAL_SCORE;
  displayScore();

  // Reset attemps
  attempts = [];
  displayAttempts();

  // Swap again btn to check bottom
  btnCheck.classList.remove("hidden");
  btnAgainBottom.classList.add("hidden");

  // Reset message and guess input
  displayMessage("Start guessing...");
  clearGuessInput();

  // Reset style

  // Hide defeat style
  if (body.classList.contains("background-color--defeat")) {
    body.classList.remove("background-color--defeat");
    secretNumberElement.classList.remove("secret-number--defeat");
    message.classList.remove("message--defeat");
    // hide victory style
  } else {
    body.classList.remove("background-color--victory");
    secretNumberElement.classList.remove("secret-number--victory");
    message.classList.remove("message--victory");
  }
};

const openModal = function () {
  // Display modal and overlay
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  // Hint
  if (score === 1) {
    modalTitle.textContent = "Some hints for you:";
    modalText.textContent = `The secret number is ${
      isEven(secretNumber) ? "even" : "odd"
    }, ${
      isPerfectSquare(secretNumber) ? "it's" : "it's not"
    } a perfect square and ${
      isPrime(secretNumber) ? "it's" : "it's not"
    } prime. Good luck ;)`;

    // No hint (score not low enough)
  } else {
    modalTitle.textContent = "Not so fast...";
    modalText.textContent =
      "You can only get help when you are about to lose (score = 1). Hope you don't need it :)";
  }
};

const closeModal = function () {
  // Hide modal and overlay
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// uPD
max.textContent = MAX_RANDOM_NUMBER;

// --- EVENT LISTENERS

// - Game events

// Verify guess (click on guess button)
btnCheck.addEventListener("click", checkGuess);

// Reset game (click on any again button)
for (let i = 0; i < btnAgain.length; i++) {
  btnAgain[i].addEventListener("click", resetGame);
}

// Keydown Enter (check guess or reset game)
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (!btnCheck.classList.contains("hidden")) checkGuess();
    else if (!btnAgainBottom.classList.contains("hidden")) resetGame();
  }
});

// - Modal events

// Open modal (click on help button)
btnOpenModal.addEventListener("click", openModal);

// Close modal

// Click on close button "x"
btnCloseModal.addEventListener("click", closeModal);

// Click on the ovelay
overlay.addEventListener("click", closeModal);

// Click on Escape if modal is not hidden
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden"))
    closeModal();
});
