const grid = document.querySelector('.grid');
const square = document.querySelectorAll('.square');

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const winConditions = [
    // HORIZONTAL CONDITIONS
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // VERTICAL CONDITIONS
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // DIAGONAL CONDITIONS
    [0, 4, 8],
    [2, 4, 6],
  ];

  const displayBoard = () => {
    board.forEach((value, index) => {
      square[index].textContent = value;
      square[index].dataset.id = `${index}`;
    });
  };

  const decideWinner = (mark) => {
    let gameOver = false;
    let tieGame = false
    for (const eachWin of winConditions) {
      if (eachWin.every((num) => board[num] === mark)) {
        gameOver = true
        break
      } else if (!board.includes('')) {
        tieGame = true
      }
  }
  return {gameOver, tieGame}
};

  const updateBoard = (index, mark) => {
    board[index] = mark;
  };

  return { displayBoard, updateBoard, decideWinner };
})();

const createPlayer = (mark) => {
  return { mark };
};

const controlGame = (() => {
  let players = [];
  let currentPlayer = true;

  
  const displayWinner = (mark) => {
    let gameState = document.querySelector('.game-state')
    const counter = {
      rounds: 0,
      playerX: 0,
      player0: 0
    }
    console.log(gameBoard.decideWinner(mark));
    if (gameBoard.decideWinner(mark).gameOver) {
      square.forEach((eachSquare) => {
        eachSquare.removeEventListener('click', updateHandler);
        gameState.textContent = `Player ${mark} is the winner`
      });
    } else if (gameBoard.decideWinner(mark).tieGame) {
      gameState.textContent = `It's a tie`
    }
  }

  const updateHandler = (event) => {
    let indexClicked = event.target.dataset.id;
    let cellEmpty = event.target.textContent;

    if (currentPlayer && !cellEmpty) {
      gameBoard.updateBoard(indexClicked, players[0].mark);
      event.target.textContent = players[0].mark;
      cellEmpty = players[0].mark;
      currentPlayer = false;
      displayWinner(players[0].mark)
    } else if (!cellEmpty) {
      gameBoard.updateBoard(indexClicked, players[1].mark);
      event.target.textContent = players[1].mark;
      currentPlayer = true;
      displayWinner(players[1].mark)
    }
  };

  

  const startGame = () => {
    players = [createPlayer('X'), createPlayer('O')];
    gameBoard.displayBoard();
    square.forEach((eachSquare) => {
      eachSquare.addEventListener('click', updateHandler);
    });
  };

  return { startGame };
})();

controlGame.startGame();
