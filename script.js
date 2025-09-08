// Select the game board and button
const board = document.getElementById("game-board");
const startBtn = document.getElementById("start-btn");
const winMessage = document.getElementById("win-message");
const topicSelect = document.getElementById("topic-select");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let cardPairs = [];
let selectedTopic = "math"; // default


// ----- Topics -----
const topics = {
 math: [
   { question: "Solve for x: 2x + 3 = 7", answer: "x = 2" },
   { question: "Simplify: (x + 1) + 1", answer: "x + 2" },
   { question: "Find the slope: y = 4x + 5", answer: "4" },
   { question: "Evaluate: 2(3 + 5)", answer: "16" },
   {
     question:
       "A rectangular garden is 20 meters long and 15 meters wide. A walkway of uniform width is built around the garden, increasing the total area to 396 square meters. Find the width of the walkway.",
     answer: "1.28 meters",
   },
   { question: "Solve: x/5 + 3 = 7", answer: "x = 20" },
   {
     question: "The sum of a number and 12 is 25 → x + 12 = 25",
     answer: "x = 13",
   },
   {
     question:
       "A number multiplied by 4 and decreased by 9 equals 23. What is this number?",
     answer: "8",
   },
 ],
 science: [
   { question: "Basic unit of life?", answer: "Cells" },
   { question: "Force pulling objects to Earth?", answer: "Gravity" },
   { question: "Center of an atom?", answer: "Nucleus" },
   { question: "Organ that pumps blood?", answer: "Heart" },
   { question: "Cells make what?", answer: "Tissues" },
   { question: "Tissues make what?", answer: "Organs" },
   { question: "Organs make what?", answer: "Organ Systems" },
   { question: "Organ systems make what?", answer: "Organisms" },
 ],
 spanish: [
   { question: "What is 'blue' in Spanish?", answer: "Azul" },
   { question: "How do you say 'see you' in Spanish?", answer: "Nos vemos" },
   {
     question: "How to say 'How are you?' (formal) in Spanish?",
     answer: "¿Cómo está?",
   },
   { question: "What is 'light pink' in Spanish?", answer: "Rosado claro" },
   { question: "How to say the number 28 in Spanish?", answer: "Veintiocho" },
   {
     question:
       "If today is September 10th, how would you express it in Spanish?",
     answer: "Hoy es el diez de septiembre",
   },
   {
     question:
       "How to say 'I would like to introduce you to…' (formal) in Spanish?",
     answer: "Le presento a",
   },
 ],
};


// ----- Helpers -----
function shuffleInPlace(arr) {
 for (let i = arr.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [arr[i], arr[j]] = [arr[j], arr[i]];
 }
}


function createBoard() {
 // clear UI
 board.innerHTML = "";
 winMessage.style.display = "none";
 questionBox.style.display = "none";
 board.style.display = "grid";


 // reset state
 matches = 0;
 firstCard = null;
 secondCard = null;
 lockBoard = false;


 // get selected topic
 selectedTopic = topicSelect.value;
 cardPairs = topics[selectedTopic];


 // flatten pairs into separate cards
 let cards = [];
 cardPairs.forEach((pair) => {
   cards.push({ type: "question", text: pair.question });
   cards.push({ type: "answer", text: pair.answer });
 });


 // shuffle
 shuffleInPlace(cards);


 // create card elements
 cards.forEach((cardData) => {
   const card = document.createElement("div");
   card.classList.add("card");
   card.dataset.text = cardData.text;
   card.dataset.type = cardData.type;
   card.textContent = "?";
   board.appendChild(card);
 });
}


// ----- Flip logic -----
board.addEventListener("click", function (event) {
 const clicked = event.target;
 if (!clicked.classList.contains("card") || lockBoard) return;
 if (clicked.classList.contains("flipped")) return;


 clicked.textContent = clicked.dataset.text;
 clicked.classList.add("flipped");


 if (!firstCard) {
   firstCard = clicked;
 } else {
   secondCard = clicked;
   lockBoard = true;
   setTimeout(checkMatch, 1000);
 }
});


function checkMatch() {
 const firstIndex = cardPairs.findIndex(
   (pair) =>
     pair.question === firstCard.dataset.text ||
     pair.answer === firstCard.dataset.text
 );
 const secondIndex = cardPairs.findIndex(
   (pair) =>
     pair.question === secondCard.dataset.text ||
     pair.answer === secondCard.dataset.text
 );


 if (
   firstIndex === secondIndex &&
   firstCard.dataset.text !== secondCard.dataset.text
 ) {
   matches++;
   firstCard.classList.add("matched");
   secondCard.classList.add("matched");


   if (matches === cardPairs.length) {
     winMessage.style.display = "block";
   }
 } else {
   // ❌ mismatch → flip back + show random question
   firstCard.textContent = "?";
   secondCard.textContent = "?";
   firstCard.classList.remove("flipped");
   secondCard.classList.remove("flipped");


   showRandomQuestion();
 }


 firstCard = null;
 secondCard = null;
 lockBoard = false;
}


// ----- Random Question Logic -----
function showRandomQuestion() {
 const bank = topics[selectedTopic];
 const index = Math.floor(Math.random() * bank.length);
 const q = bank[index];
 questionText.textContent = q.question;
 questionBox.style.display = "block";
}


// ----- Start button -----
startBtn.addEventListener("click", createBoard);


HTML
<!DOCTYPE html>
<html>
 <head>
   <meta charset="UTF-8" />
   <title>Flashcard Memory Game</title>
   <link rel="stylesheet" href="boardgame.css" />
 </head>
 <body>
   <h1>Flashcard Memory Game</h1>


   <!-- Topic selector -->
   <label for="topic-select">Choose a topic:</label>
   <select id="topic-select">
     <option value="math">Math</option>
     <option value="science">Science</option>
     <option value="spanish">Spanish</option>
   </select>


   <!-- Start button -->
   <button id="start-btn">Start Game</button>


   <!-- Game board -->
   <div id="game-board"></div>


   <!-- Random Question Box (shown on mismatch) -->
   <div
     id="question-box"
     style="
       display: none;
       margin-top: 15px;
       padding: 12px;
       background: #ffeaa7;
       border: 2px solid #d35400;
       border-radius: 8px;
     "
   >
     <strong>❓ Challenge Question:</strong>
     <p id="question-text"></p>
   </div>


   <!-- Win Message -->
   <p id="win-message" style="display: none; margin-top: 20px">
     🎉 You matched all the cards! <br />
     <a href="reward.html">Go to Reward Page</a>
   </p>


   <script src="boardgame.js"></script>
 </body>
</html>

CSS
body {
 font-family: Arial, sans-serif;
 text-align: center;
 background: #ca9bf7;
 margin: 0;
 padding: 0;
}


#game-board {
 display: grid;
 grid-template-columns: repeat(4, 100px); /* 4 cards per row */
 grid-gap: 10px; /* Space between cards */
 justify-content: center;
 margin: 20px auto;
 max-width: 450px;
 display: none; /* Hide board until game starts */
}


.card {
 width: 100px;
 height: 100px;
 background: #ca9bf7;
 color: rgb(70, 139, 234);
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 20px;
 border-radius: 8px;
 cursor: pointer;
}
