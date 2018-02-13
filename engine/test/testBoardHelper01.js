var assert = require('assert');
var bh = require('../boardHelper')

describe('fen2state', function() {
  describe('#indexOf()', function() {
    it('empty', function() {
      var fen1 = '3/3/3';
      var state1 = bh.fen2state(fen1);
      assert.equal(state1[1][1], ' ');
    });

    it('with an X', function() {
      var fen1 = '3/1X1/3';
      var state1 = bh.fen2state(fen1);
      assert.equal(state1[1][1], 'X');
    });

    it('with an O', function() {
      var fen1 = '3/1X1/2O';
      var state1 = bh.fen2state(fen1);
      assert.equal(state1[2][2], 'O');
    });


    it('is occupied', function() {
      var fen1 = '3/1X1/2O';
      var state1 = bh.fen2state(fen1);
      assert.equal(bh.isOccupied(0, 0, state1), false);
    });

    it('is occupied2', function() {
      var fen1 = '3/1X1/2O';
      var state1 = bh.fen2state(fen1);
      assert.equal(bh.isOccupied(1, 1, state1), true);
    });

    it('is occupied3', function() {
      var fen1 = '3/1X1/2O';
      var state1 = bh.fen2state(fen1);
      assert.equal(bh.isOccupied(2, 1, state1), false);
    });
    it('is occupied4', function() {
      var fen1 = '3/1X1/2O';
      var state1 = bh.fen2state(fen1);
      assert.equal(bh.isOccupied(2, 2, state1), true);
    });

    it('is full1', function() {
      var fen1 = '3/1X1/2O';
      var state1 = bh.fen2state(fen1);
      assert.equal(bh.isBoardFull(state1), false);
    });

    it('is full2', function() {
      var fen1 = 'XXX/OXO/XXO';
      var state1 = bh.fen2state(fen1);
      assert.equal(bh.isBoardFull(state1), true);
    });


    it('getActions', function() {
      var fen1 = 'XXX/OXO/XXO';
      var state1 = bh.fen2state(fen1);
      assert.deepEqual(bh.getActions(state1), []);
    });

    it('getActions', function() {
      var fen1 = '3/3/3';
      var state1 = bh.fen2state(fen1);
      var expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
      ];
      assert.deepEqual(bh.getActions(state1), expected);
    });

    it('isWinning 1', function() {
      var fen1 = '3/3/3';
      var state1 = bh.fen2state(fen1);
      var expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
      ];
      assert.equal(bh.isWinning('X', state1), false);
    });


    it('isWinning 2', function() {
      var fen1 = 'XXX/3/3';
      var state1 = bh.fen2state(fen1);
      var expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
      ];
      assert.equal(bh.isWinning('X', state1), true);
    });

    it('isWinning 2', function() {
      var fen1 = 'XXX/O2/X';
      var state1 = bh.fen2state(fen1);
      var expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
      ];
      assert.equal(bh.isWinning('X', state1), true);
    });

    it('isWinning 3', function() {
      var fen1 = 'XOO/X2/X';
      var state1 = bh.fen2state(fen1);
      var expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
      ];
      assert.equal(bh.isWinning('X', state1), true);
    });

    it('isWinning 3', function() {
      var fen1 = 'XOO/OX1/OOX';
      var state1 = bh.fen2state(fen1);
      var expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
      ];
      assert.equal(bh.isWinning('X', state1), true);
    });

  });
});
