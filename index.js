// Game Board

let gameBoard = () => {
  let gameBoardArr = ["", "", "", "", "", "", "", "", ""];
  let winningCombination = [[1, 2, 3]];

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
      cell.addEventListener("click", () => {
        if (playerX === true) {
          cell.innerHTML = "X";
          playerX = false;
          playerO = true;
        } else if (playerO === true) {
          cell.innerHTML = "O";
          playerO = false;
          playerX = true;
        }
      });
      boardHTML.appendChild(cell);
    });
  }
};

gameBoard();
