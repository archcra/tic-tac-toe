

# test
http://unitjs.com/guide/mocha.html

$ npm install mocha -g

ref:
https://mochajs.org/


# UI
## ref

https://codepen.io/solartic/pen/qEGqNL
 Tic Tac Toe board using html canvas



## 前端代码，如何使用Node.js的代码？
在engine目录下：
Buts-MacBook-Pro:engine holibut$ browserify engine.js --standalone  tictactoe_engine > tictactoe-engine.js

之后，将这个tictactoe-engine.js在前端页面中引用，然后这样使用：

var command = 'position fen 3/3/3 X'
tictactoe_engine.handleCommand(command)
command = "go"
console.log('tictactoe-engine: ', tictactoe_engine.handleCommand(command))
返回值应该是：
bestmove
:
(2) [1, 1]
info
:
"247222 nodes/sec examined. , duration: 27 with iterations: 1200"
