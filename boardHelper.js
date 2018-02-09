ROW_HEIGHT = 3;
ROW_WIDTH = 3;

var lines = [   [[0,0], [0,1], [0, 2]],
[[1,0], [1,1], [1, 2]],
[[2,0], [2,1], [2, 2]],
[[0,0], [1,0], [2, 0]],
[[0,1], [1,1], [2, 1]],
[[0,2], [1,2], [2, 2]],
[[0,0], [1,1], [2, 2]],
[[0,2], [1,1], [2, 0]]
];

function isWinning(player, state){
  for (var i=0; i< lines.length; i++){
    if (state[lines[i][0][0]][lines[i][0][1]] == state[lines[i][1][0]][lines[i][1][1]] &&
      state[lines[i][1][0]][lines[i][1][1]] == state[lines[i][2][0]][lines[i][2][1]] &&
      state[lines[i][2][0]][lines[i][2][1]] == player){
        return true;
      }
  }
  return false;
}

function initBoard() {
  var board = [];

  for (var i = 0; i < ROW_HEIGHT; i++) {
    // 这里一定要注意，emptyRow一定每次初始化，不能重用！否则会使这些行是一个对象，层改一行，其它都跟着改！这个甚至能产生console混乱（同一对象），即在修改前显示的是修改后的值（因为console显示的是地址，到看的时候，值已被改了！)
    var emptyRow = [];
    for (var j = 0; j < ROW_WIDTH; j++) {
      emptyRow.push(' ');
    }
    board.push(emptyRow);
  }

  return board;
}


function getActions(state) {
  // Same as get un-occupied locations
  var actions = [];

  for (var i = 0; i < ROW_HEIGHT; i++) {
    for (var j = 0; j < ROW_WIDTH; j++) {
      if (!isOccupied(i, j, state)) {
        actions.push([i, j])
      }
    }
  }

  return actions;
}


function isBoardFull(state) {
  for (var i = 0; i < ROW_HEIGHT; i++) {
    for (var j = 0; j < ROW_WIDTH; j++) {
      if (!isOccupied(i, j, state)) {
        return false;
      }
    }
  }
  return true;
}

function fen2state(fen) {
  if (validFen(fen) !== true) {
    return false;
  }

  var state = initBoard();

  for (var i = 0; i < ROW_HEIGHT; i++) {
    for (var j = 0; j < ROW_WIDTH; j++) {
      state[i][j] = ' '; // Empty
    }
  }

  fen = fen.replace(/ .+$/, '');

  var rows = fen.split('/');
  var position = {};

  for (var i = 0; i < ROW_HEIGHT; i++) {
    var row = rows[i].split('');

    // loop through each character in the FEN section
    var emptySquares = 0,
      columnIndex = 0;
    for (var j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-3]/) !== -1) {
        emptySquares = parseInt(row[j], 10);
        for (var k = 0; k < emptySquares; k++) {
          columnIndex = columnIndex + 1;
        }
      }
      // piece
      else {
        state[i][columnIndex] = row[j];
        columnIndex = columnIndex + 1;
      }
    }

  }

  return state;
}


function validFen(fen) {
  if (typeof fen !== 'string') return false;

  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  // FEN should be 8 sections separated by slashes
  var chunks = fen.split('/');


  if (chunks.length !== ROW_HEIGHT) return false;
  // check the piece sections
  for (var i = 0; i < ROW_HEIGHT; i++) {
    if (chunks[i] === '' ||
      chunks[i].length > ROW_WIDTH ||
      chunks[i].search(/[^XO1-3]/) !== -1) {
      return false;
    }
  }

  return true;
}



function isOccupied(x, y, state) {
  return state[x][y] != ' ';
}


module.exports = {
  fen2state: fen2state,
  isOccupied: isOccupied,
  isBoardFull: isBoardFull,
  getActions: getActions,
  isWinning: isWinning
}
