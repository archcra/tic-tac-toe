var util = require('util');

var Uct = require('./uct/uct.js');
var boardHelper = require("./boardHelper.js")


CBoard = require("./cboard.js")

var board = new CBoard();
var uct = new Uct();


const VERSION = '0.0.1';
const NAME = 'Jane-UCCI';
const EMAIL = 'archcra@qq.com';

function handleCommand(commandLine) {
  console.log('commandLine is: ', commandLine)
  var commandArgs = commandLine.split(' ');
  var response = '';

  switch (commandArgs[0].toLowerCase()) {
    case 'ucci':
      var response = util.format("%s v%s by Arch.\n", NAME, VERSION)
      response += util.format("id name Pepe %s\n", NAME)
      response += util.format("id author %s\n", EMAIL)
      response += util.format("option name Hash type spin default 256 min 32 max 1024\n")
      response += util.format("ucciok\n")
      break;

    case 'isready':
      var response = 'readyok\n';
      break;
    case 'ucinewgame':
      break;

    case 'position':
      if (commandArgs[1].toLowerCase() == 'fen' && commandArgs.length >= 4) {
        var color;
        if (commandArgs[3] == 'w') {
          color = 0;
        } else {
          color = 1;
        }
        board.setup(commandArgs[2], color);

      } else {
        response = util.format('NOT SUPPORTED: %s', commandLine);
      }
      break;

    case 'go':
      switch (commandArgs[1].toLowerCase()) {
        case `iterations`:
          break;
        case `time`:
        case `depth`:
        case `movetime`:
          var time = parseInt(commandArgs[2]);
          if (time < 1000) {
            time = 3000;
          }
          var result = uct.getActionInfo(board, 1200000, time, false);
          var response = util.format('info %s', result.info + '\n');
          response += util.format('bestmove %s', boardHelper.move2ucci(result.action));
          // info depth 8 score 4 pv c3c4 h9g7 b0c2 i9i8 a0a1 i8d8 a1f1 g6g5
          // bestmove c3c4 ponder h9g7

          break;

        default:
          response = util.format('NOT SUPPORTED: %s', commandLine);

          break;
      }



      break;

    case 'stop':

      break;

    case 'setoption':

      break;

    default:
      response = util.format('NOT SUPPORTED: %s', commandLine);

      break;



  }
  console.log('final result is: ', response)
  return response;
}


module.exports = {
  handleCommand: handleCommand
}