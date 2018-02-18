var assert = require('assert');
var Board = require('../board.js')

describe('test board', function() {
  describe('get score, etc', function() {
    it('Score for 3 X in a line', function() {
      var board = new Board();
      board.setup('1OX/1XO/X2', 0);
      assert.deepEqual(board.getResult(), [1, 0]);
    });

    it('Score for 3 O in a line', function() {
      var board = new Board()

      ;
      board.setup('O2/OX1/OX1', 1);
      assert.deepEqual(board.getResult(), [0, 1]);
    });

    it('get actions 0: ', function() {
      var board = new Board()

      ;
      board.setup('O2/OX1/OX1', 1);

      assert.deepEqual(board.getActions(), []);
    });
    it.only('get actions 1: ', function() {
      var board = new Board()

      ;
      board.setup('O2/OX1/XX1', 1);

      assert.deepEqual(board.getActions(), [[0,1],[0,2],[1,2],[2,2]]);
    });

  });
});
