var util = require('util');

var Uct = require('./uct/uct.js');
var boardHelper = require("./boardHelper.js")

const INTERATIONS = 1000;
const MAX_TIME = 1000; //milisecond

var Board = require("./board.js")

var board = new Board();
var uct = new Uct();


const VERSION = '0.0.1';
const NAME = 'TIC_TAC_TOE-MCTS_ENGINE';
const EMAIL = 'archcra@qq.com';

function handleCommand(commandLine) {
  var commandArgs = commandLine.split(' ');
  var response = '';

  switch (commandArgs[0].toLowerCase()) {
    case 'info':
      var response = util.format("Engine name: %s v%s by Arch.\n", NAME, VERSION)
      response += util.format("Author %s\n", EMAIL)
      break;

    case 'isready':
      var response = 'readyok\n';
      break;

    case 'position':
      if (commandArgs[1].toLowerCase() == 'fen' && commandArgs.length >= 4) {
        var color;
        if (commandArgs[3] == 'X') {
          color = 0;
        } else {
          color = 1;
        }

        board.setup(commandArgs[2], color);
        var response = {};

        // 如果是胜局，或满局，就不要计算了
        if (board.getActions().length == 0) {
          response.info = '没法算了';
          response.bestmove = [-1, -1];
        }else{

          var result = uct.getActionInfo(board, 1200, 1000, false);
          response.info = result.info
          response.bestmove = result.action;
        }
      } else {
        response = util.format('NOT SUPPORTED: %s', commandLine);
      }
      break;

    default:
      response = util.format('NOT SUPPORTED: %s', commandLine);

      break;
  }
  return response;
}

module.exports = {
  handleCommand: handleCommand
}
