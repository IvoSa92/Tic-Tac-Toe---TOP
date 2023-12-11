const startButton = document.querySelector(".start-game");

startButton.addEventListener("click", () => {
  Game.start();
  startButton.disabled = true;
});

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
      Game.winningMessage();
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
    } else if (gameBoard.every((cell) => cell !== "")) {
      console.log("its a tie!");
    }
  };

  const restartGame = document.querySelector(".restart-game");
  restartGame.addEventListener("click", () => {
    refreshGameBoard();
  });

  const refreshGameBoard = () => {
    let boardHTML = document.querySelector(".game-board");
    boardHTML.innerHTML = "";
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }
    createGameBoard();
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

  const winningMessage = () => {
    let winnerDiv = document.querySelector(".message");
    let winnerText = document.querySelector(".winning-message");
    winnerDiv.style.display = "flex";
    winnerText.textContent = `Congratulation ${currentPlayer.name} you WON the Game`;
  };

  return { start, markSquare, winningMessage };
})();
