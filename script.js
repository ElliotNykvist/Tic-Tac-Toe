const container = document.querySelector(".container");
const restartButton = document.querySelector(".restart");

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return board;
})();

function restart() {
  const winnerText = document.querySelector(".end-text");
  gameBoard.forEach((_, index) => {
    gameBoard[index] = ""; // Reset the gameBoard array to empty
  });
  const gameBlocks = document.querySelectorAll(".game-block");
  gameBlocks.forEach((gameBlock) => {
    gameBlock.textContent = ""; // Clear the marker display in the UI
  });

  winnerText.textContent = ""; // Clear any previous winner/draw text
  container.classList.remove('active'); // Hide the form by removing the 'active' class
  currentPlayerIndex = 0; // Reset the currentPlayerIndex to the first player
}

restartButton.addEventListener('click', restart);

function createGameBoard() {
  const gameBoardSection = document.querySelector(".game-board");
  gameBoard.forEach((_, index) => {
    const gameBlock = document.createElement("div");
    gameBlock.classList.add("game-block");
    gameBlock.setAttribute("data-index", index);
    gameBlock.addEventListener("click", playersTurn);
    gameBoardSection.appendChild(gameBlock);
  });
}

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

const players = [
  new Player("player1", "x"),
  new Player("player2", "o")
];

let currentPlayerIndex = 0;

function checkWinner() {
  const winnerCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8]
  ];

  for (const combination of winnerCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== "") {
      return true;
    }
  }

  return false;
}

function draw() {
  return gameBoard.every((cell) => cell !== "");
}

function playersTurn(event) {
  const winnerText = document.querySelector(".end-text");
  const clickedGameBlock = event.target;
  const index = parseInt(clickedGameBlock.getAttribute("data-index"), 10);
  if (gameBoard[index] === "") { // Check if the block is empty
    const currentPlayer = players[currentPlayerIndex];
    gameBoard[index] = currentPlayer.marker; // Set the marker in the gameBoard array
    clickedGameBlock.textContent = currentPlayer.marker; // Display the marker in the UI

    if (checkWinner()) {
      winnerText.textContent = (`${currentPlayer.name} wins!`);
      container.classList.add('active');
      // You can also reset the game or take other actions here
    } else if (draw()) {
      winnerText.textContent = ("It's a draw!");
      container.classList.add('active');
      // You can also reset the game or take other actions here
    } else {
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player
    }
  }
}

const gameBoardSection = document.querySelector(".game-board");
createGameBoard();
