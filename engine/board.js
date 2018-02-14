var boardHelper = require("./boardHelper.js")

var players = ['X', 'O'];

function Board() {
  this.field = {
    playerX: 0,
    playerO: 1
  };
  this.state = []; // 这是个两维数组，参见performance/substring/v2.js
}

Board.prototype.setup = function(fen, color) {
  this.state = boardHelper.fen2state(fen);
  this.active = color; // this.field.playerR;
  this.ply = 1;
};


Board.prototype.copy = function() {
  var result = new Board();
  result.active = this.active;
  result.state = JSON.parse(JSON.stringify(this.state)); // Deep copy
  result.ply = this.ply;
  return result;
};

Board.prototype.getActions = function() {
  return boardHelper.getActions(this.state);
};

Board.prototype.doAction = function(action) {
  // [1,1]

  this.state[action[0]][action[1]] = players[this.active];
  var opponent = this.active ^ 1;

  this.active = opponent;
  ++this.ply;
};

Board.prototype.getResult = function() {
  // TODO: 到底是固定的X[1，0]，还是与active有关？即X win也可能是[0,1] ???

  // if (boardHelper.isWinning(players[this.active], this.state)) {
  //   if (!this.active) {
  //     return [1.0, 0.0]; // 当color=0时
  //   } else {
  //     return [0.0, 1.0];
  //   }
  // }

  if (boardHelper.isWinning(0, this.state)) {
    return [0.0, 1.0]; // 当color=0时
  }

  if (boardHelper.isWinning(1, this.state)) {
    return [1.0, 0.0]; // 当color=1时
  }

  // 这步需要判断是否结束
  if (boardHelper.isBoardFull(this.state)) {
    return [0.5, 0.5]
  }

  console.log("ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
};

module.exports = Board;
