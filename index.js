//Game Board Object

const GameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const createGameBoard = () => {
    let boardHTML = document.querySelector(".game-board");
    gameBoard.forEach((item, index) => {
      let square = document.createElement("div");
      square.id = `square-${index}`;
      square.classList.add("board-square");
      square.addEventListener(
        "click",
        (event) => {
          Game.markSquare(event);
          actualBoard(event);
        },
        { once: true }
      );
      boardHTML.appendChild(square);
    });
  };

  const actualBoard = () => {
    for (i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = document.querySelector(`#square-${i}`).innerHTML;
    }
    if (
      (gameBoard[0] === "X" && gameBoard[1] === "X" && gameBoard[2] === "X") ||
      (gameBoard[3] === "X" && gameBoard[4] === "X" && gameBoard[5] === "X") ||
      (gameBoard[6] === "X" && gameBoard[7] === "X" && gameBoard[8] === "X") ||
      (gameBoard[0] === "X" && gameBoard[3] === "X" && gameBoard[6] === "X") ||
      (gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") ||
      (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X") ||
      (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X") ||
      (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X")
    ) {
      console.log("win");
    } else if (
      (gameBoard[0] === "O" && gameBoard[1] === "O" && gameBoard[2] === "O") ||
      (gameBoard[3] === "O" && gameBoard[4] === "O" && gameBoard[5] === "O") ||
      (gameBoard[6] === "O" && gameBoard[7] === "O" && gameBoard[8] === "O") ||
      (gameBoard[0] === "O" && gameBoard[3] === "O" && gameBoard[6] === "O") ||
      (gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O") ||
      (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O") ||
      (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O") ||
      (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O")
    ) {
      console.log("O win");
    }
  };

  return { createGameBoard };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

// Game Object
const Game = (() => {
  let gameOver = false;
  let currentPlayer;
  let players;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player-1").value, "X"),
      createPlayer(document.querySelector("#player-2").value, "O"),
    ];
    currentPlayer = players[0];
    console.log(players);
    GameBoard.createGameBoard();
  };

  const markSquare = (event) => {
    event.target.innerHTML = currentPlayer.mark;
    console.log(event.target.id);

    changePlayer();
  };

  const changePlayer = () => {
    return currentPlayer === players[0]
      ? (currentPlayer = players[1])
      : (currentPlayer = players[0]);
  };

  return { start, markSquare };
})();

const startButton = document.querySelector(".start-game");
startButton.addEventListener("click", () => {
  Game.start();
});

/*
const GameBoard = () => {
  let gameBoardArr = ["", "", "", "", "", "", "", "", ""];

  const startButton = document.querySelector(".start-game");
  startButton.addEventListener("click", newGame);

  function newGame() {
    let playerX = true;
    let playerO = false;

    const boardHTML = document.querySelector(".game-board");
    boardHTML.innerHTML = "";

    gameBoardArr.forEach((item, index) => {
      let cell = document.createElement("div");
      cell.classList.add("board-square");
      cell.id = index;
      cell.addEventListener(
        "click",
        () => {
          if (playerX === true) {
            cell.innerHTML = "X";
            playerX = false;
            playerO = true;
          } else if (playerO === true) {
            cell.innerHTML = "O";
            playerO = false;
            playerX = true;
          }
        },
        { once: true }
      );
      boardHTML.appendChild(cell);
    });
  }
};
GameBoard();
*/
