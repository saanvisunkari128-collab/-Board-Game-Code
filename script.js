// Select the game board and button
const board = document.getElementById('game-board');
const startBtn = document.getElementById('start-btn');

// A simple list of card values
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Function to create cards
function createBoard() {
  board.innerHTML = ''; // Clear any old cards
  board.style.display = 'grid'; // Show the board

  cards.forEach(cardValue => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = cardValue; // For now, show the letter
    board.appendChild(card);
  });
}

// Start game when button is clicked
startBtn.addEventListener('click', createBoard);
