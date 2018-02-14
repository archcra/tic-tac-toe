'use strict';

var lineColor = "#ddd";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

// function getInitialBoard(defaultValue) {
//   var board = [];
//
//   for (var x = 0; x < 3; x++) {
//     board.push([]);
//
//     for (var y = 0; y < 3; y++) {
//       board[x].push(defaultValue);
//     }
//   }
//
//   return board;
// }
//
// var board = getInitialBoard("");
//

function getPosition(mouse) {
  var xCordinate;
  var yCordinate;

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
        mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
        mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
      ) {
        return {
          x: x,
          y: y
        };

      }
    }
  }
  return {
    x: -1,
    y: -1
  };
}


function drawPieces() {
  var xCordinate;
  var yCordinate;

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;
      var role = board[y][x];
      if (role !== ' ') {
        clearPlayingArea(xCordinate, yCordinate);

        if (role === 'X') {
          drawX(xCordinate, yCordinate);
        } else {
          drawO(xCordinate, yCordinate);
        }
      }
    }
  }
}


function clearPlayingArea(xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  );
}

function drawO(xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI;
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX(xCordinate, yCordinate) {
  context.strokeStyle = "#f1be32";

  context.beginPath();

  var offset = 50;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

function drawLines(lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /*
   * Horizontal lines
   */
  for (var y = 1; y <= 2; y++) {
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  /*
   * Vertical lines
   */
  for (var x = 1; x <= 2; x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

drawLines(10, lineColor);

function getCanvasMousePosition(event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function(event) {


  var canvasMousePosition = getCanvasMousePosition(event);
  // addPlayingPiece(canvasMousePosition);
  var position = getPosition(canvasMousePosition);
  console.log('position is: ', position, 'click player is: ', player)

  setBoard(position, player);
  drawBoard();
  player = getOpponent(player);
  console.log('engine player is: ', player)

  // Make some waiting ...
  engineMove(player);
  drawBoard();
  player = getOpponent(player);

});


function drawBoard() {
  drawPieces();
  drawLines(10, lineColor);
}

function setBoard(position, player) {
  board[position.y][position.x] = player;
}

function engineMove(player) {
  var fen = boardToFen(board);
  var command = 'position fen ' + fen + ' ' + player
  var result =  tictactoe_engine.handleCommand(command)
  console.log('tictactoe-engine: ', result)

  // Change the board
  board[result.bestmove[0]][result.bestmove[1]] = player;

}




function boardToFen(board) {

  var fen = '';

  var currentRow = 3;
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
      var piece = board[row][column];

      // piece exists
      if (piece !== ' ') {
        fen += piece;
      }

      // empty space
      else {
        fen += '1';
      }
    }
    fen += '/';
  }

  // squeeze the numbers together
  // haha, I love this solution...
  fen = fen.replace(/111/g, '3');
  fen = fen.replace(/11/g, '2');

  // 去掉最后的 slash
  fen = fen.substring(0, fen.length - 1);
  return fen;
}

function getOpponent(player) {
  var result = '';
  if (player === 'X') {
    result = 'O';
  } else {
    result = 'X';
  }
  return result;
}
