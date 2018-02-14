var assert = require('assert');
var engine = require('../engine.js')

describe('fen2state', function() {
  describe('#indexOf()', function() {
    it('first move', function() {
      var command1 = 'position fen 3/3/3 X';
      var response = engine.handleCommand(command1);

      assert.deepEqual(response.bestmove, [1, 1]);
    });

    it('first opponent move', function() {
      var command1 = 'position fen 3/1X1/3 O';
      var response = engine.handleCommand(command1);

      assert.deepEqual(response.bestmove, [2, 2] ); // or [0, 0]
    });

    it('second X move', function() {
      var command1 = 'position fen 3/1X1/2O X';
      var response = engine.handleCommand(command1);

      assert.deepEqual(response.bestmove, [2, 0]);
    });

    it('third X move for position: 1OX/1XO/3 X', function() {
      var command1 = 'position fen 1OX/1XO/3 X';
      var response = engine.handleCommand(command1);

      assert.deepEqual(response.bestmove, [2, 0]);
    });





  });
});
