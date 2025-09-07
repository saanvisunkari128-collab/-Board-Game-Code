// Select the game board and button
const board = document.getElementById('game-board');
const startBtn = document.getElementById('start-btn');
const topicSelect = document.getElementById('topic-select');

// A simple list of card values
const topics = {
math: [
{ question: "Solve for x: 2x + 3 = 7", answer: "x = 2" },
  { question: "", answer: "x + 2" },
{ question: "Find the slope: y = 4x + 5", answer: "4" },
 { question: "Evaluate: 2(3 + 5)", answer: "16" },
{ question: "A rectangular garden is 20 meters long and 15 meters wide. A walkway of uniform width is built around the garden, increasing the total area to 396 square meters. Find the width of the walkway.", answer : "1.28 meters"},
 { question: "Evaluate x/5 + 3 = 7", answer: "x=20" },
  {question: "The sum of a number and 12 is 25 → x + 12 = 25", answer:"x=13"}, 
  {question: "A number multiplied by 4 and decreased by 9 equals 23. What is this number?", answer= "The number is 8"},
  
],

science :








  
}
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
