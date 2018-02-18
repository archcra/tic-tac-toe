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

var board = initBoard();
var player = 'X';


engineMove(player);
drawBoard();
player = getOpponent(player);
