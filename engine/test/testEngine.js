var assert = require('assert');
var engine = require('../engine.js')

describe('fen2state', function() {
  describe('#indexOf()', function() {
    it('first move', function() {
      var command1 = 'position fen 3/3/3 X';
      engine.handleCommand(command1);
      command1 = 'go';
      var response = engine.handleCommand(command1);

      assert.deepEqual(response.bestmove, [1, 1]);
    });

    it('first opponent move', function() {
      var command1 = 'position fen 3/1X1/3 O';
      engine.handleCommand(command1);
      command1 = 'go';
      var response = engine.handleCommand(command1);

      assert.deepEqual(response.bestmove, [2, 2] ); // or [0, 0]
    });

    it('second X move', function() {
      var command1 = 'position fen 3/1X1/2O X';
      engine.handleCommand(command1);
      command1 = 'go';
      var response = engine.handleCommand(command1);

      assert.deepEqual(response.bestmove, [2, 0]);
    });


  });
});
