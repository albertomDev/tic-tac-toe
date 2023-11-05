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

  const displayWinner = (mark, index) => {
    // console.log(index);
    // console.log(board[index], mark);

    for (const eachWin of winConditions) {
      if (eachWin.every((num) => board[num] === board[index])) {
        console.log(true);
        break
      }
    }
  };

  const updateBoard = (index, mark) => {
    board[index] = mark;
   // console.log(board);
    let indexInt = parseInt(index);
    displayWinner(mark, indexInt);
  };

  return { displayBoard, updateBoard };
})();

const createPlayer = (mark) => {
  return { mark };
};

const controlGame = (() => {
  let players = [];
  let currentPlayer = true;

  const updateHandler = (event) => {
    let indexClicked = event.target.dataset.id;
    let cellEmpty = event.target.textContent;

    if (currentPlayer && !cellEmpty) {
      gameBoard.updateBoard(indexClicked, players[0].mark);
      event.target.textContent = players[0].mark;
      cellEmpty = players[0].mark;
      currentPlayer = false;
    } else if (!cellEmpty) {
      gameBoard.updateBoard(indexClicked, players[1].mark);
      event.target.textContent = players[1].mark;
      currentPlayer = true;
    }
  };

  const startGame = () => {
    players = [createPlayer('X'), createPlayer('O')];
    gameBoard.displayBoard();
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', updateHandler);
    });
  };

  return { startGame };
})();

controlGame.startGame();
