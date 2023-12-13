const startButton = document.querySelector(".start-game");
const player1Input = document.querySelector("#player-1");
const player2Input = document.querySelector("#player-2");
const container = document.querySelector(".container");
const name_board = document.querySelector(".name_board");

// Starting Game:

startButton.addEventListener("click", (event) => {
  if (player1Input.value != "" && player2Input.value != "") {
    Game.start();
    startButton.disabled = true;
  } else {
    player1Input.classList.add("input-alert");
    player1Input.placeholder = "Your Name pls 🥸";
    player2Input.classList.add("input-alert");
    player2Input.placeholder = "Another name pls 🥸";
  }
});

document.addEventListener("keydown", (event) => {
  if (
    player1Input.value != "" &&
    player2Input.value != "" &&
    event.key === "Enter"
  ) {
    event.preventDefault();
    startButton.click();
  }
});

//Game Board Object

const GameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const createGameBoard = () => {
    let boardHTML = document.querySelector(".game-board");
    boardHTML.style.backgroundColor = "#9dc08b";
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
      Game.winningMessage();
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
    GameBoard.createGameBoard();
    screenNames();
  };

  const screenNames = () => {
    const gameBoard = document.querySelector(".game-board");
    const screenName1 = document.createElement("h2");
    const screenName2 = document.createElement("h2");
    screenName1.innerHTML = `Player O: <br>${players[0].name}`;
    screenName2.innerHTML = `Player X: <br>${players[1].name}`;
    screenName1.id = "screenName";
    screenName2.id = "screenName";
    name_board.insertBefore(screenName1, gameBoard);
    name_board.appendChild(screenName2);
    player1Input.value = "";
    player2Input.value = "";
    player1Input.style.display = "none";
    player2Input.style.display = "none";
  };

  const markSquare = (event) => {
    event.target.innerHTML = currentPlayer.mark;

    if (currentPlayer.mark === "X") {
      event.target.style.color = "#FEFAE0";
    } else if (currentPlayer.mark === "O") {
      event.target.style.color = "#000000";
    }

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
    winnerText.style.display = "flex";
    winnerText.textContent = `Congratulation ${currentPlayer.name}  you WON 🥳`;
    winnerDiv.addEventListener("click", () => {
      winnerDiv.style.display = "none";
      winnerText.style.display = "none";
    });
  };

  return { start, markSquare, winningMessage, screenNames };
})();
