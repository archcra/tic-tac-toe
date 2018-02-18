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
  // 过程是，对方走完之后，才开始计分；如X走完了，轮到黑走了，此时可能X已胜，

  // TODO: 到底是固定的X[1，0]，还是与active有关？即X win也可能是[0,1] ???
  /*
  算分时，要考虑当时的情况；
     是这样的，是上一次走完后，开始算分；即可能是X走完后，轮到O的局面时，开始算分；所以，分是反过来的，即：
     X胜时，当前节点的分数为0，1；即当前的局面分，是对方形成的；红胜时，是算黑的分；黑分为0，红分为1；
     而返回的数组，[分1，分2]中的分1，是当前颜色的分；所以，分值是[0，1];
     结论时，分的值，是反过来的！

*/

  if (boardHelper.isWinning('X', this.state)) {
    return [0.0, 1.0]; // 当color=0时
  }

  if (boardHelper.isWinning('O', this.state)) {
    return [1.0, 0.0]; // 当color=1时
  }

  // 这步需要判断是否结束
  if (boardHelper.isBoardFull(this.state)) {
    return [0.5, 0.5]
  }

  console.log("ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
};

module.exports = Board;
