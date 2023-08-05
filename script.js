const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return board;
})();

function createGameBoard() {
  const gameBoardSection = document.querySelector(".game-board");
  gameBoard.forEach((_, index) => {
    const gameBlock = document.createElement("div");
    gameBlock.classList.add("game-block");
    gameBlock.setAttribute("data-index", index);
    gameBoardSection.appendChild(gameBlock);
  });
}

function Player(name, marker){
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
  const clickedGameBlock = event.target;
  const index = parseInt(clickedGameBlock.getAttribute("data-index"), 10);
  if (gameBoard[index] === "") { // Check if the block is empty
    const currentPlayer = players[currentPlayerIndex];
    gameBoard[index] = currentPlayer.marker; // Set the marker in the gameBoard array
    clickedGameBlock.textContent = currentPlayer.marker; // Display the marker in the UI

    if (checkWinner()) {
      alert(`${currentPlayer.name} wins!`);
      // You can also reset the game or take other actions here
    } else if (draw()) {
      alert("It's a draw!");
      // You can also reset the game or take other actions here
    } else {
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player
    }
  }
}

const gameBoardSection = document.querySelector(".game-board");
gameBoardSection.addEventListener("click", playersTurn);

createGameBoard();
