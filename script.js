import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';
// Selectors.
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resulText');
// Player Selectors.
const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');
// Computer Selectors.
const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');
// All Icons Selector.
const allGameIcons = document.querySelectorAll('.far');

// Object with choices.
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

// Global variables.
let computerChoice = '';
let computerScoreNumber = 0;
let playerScoreNumber = 0;

// Reset all 'selected' icons.
const resetSelected = () => {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
};

// Reset score & playerChoice/computerChoice.
const resetAll = () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
};
// We are set the 'resetAll' function on window obj so it can be selected from our HTML onclick.
window.resetAll = resetAll;

// Computer random choice.
const computerRandomChoice = () => {
  const computerChoiceNumber = Math.floor(Math.random() * 5);
  if (computerChoiceNumber === 0) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber === 1) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber === 2) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber === 3) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
};

// Add 'selected' styling & computerChoice
const displayComputerChoice = () => {
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;

    default:
      break;
  }
};

// Check results, increase scores, update resultText
const updateScore = (playerChoice) => {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = 'You Won!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
};

// Call functions to process turn.
const checkResult = (playerChoice) => {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

// Passing player selection value and styling icons.
const select = (playerChoice) => {
  checkResult(playerChoice);
  // Add 'selected' styling & playerChoice.
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;

    default:
      break;
  }
};
// We are set the 'select' function on window obj so it can be selected from our HTML onclick.
window.select = select;

// On startup, set initial values
resetAll();
