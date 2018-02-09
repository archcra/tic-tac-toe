var assert = require('assert');
var engine = require('../engine.js')

describe('fen2state', function() {
  describe('#indexOf()', function() {
    it('first move', function() {
      var command1 = 'position fen 3/3/3 X';
      engine.handleCommand(command1);
      command1 = 'go';
      var response = engine.handleCommand(command1);

      assert.equal(response, ' ');
    });



  });
});
