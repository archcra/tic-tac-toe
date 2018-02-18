

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



## 解决了几个bug

1. 在getActions时，如果已是胜局（或满局？），就不要继续返回moves了，要返回[]
2. 算分时，要考虑当时的情况；
   是这样的，是上一次走完后，开始算分；即可能是X走完后，轮到O的局面时，开始算分；所以，分是反过来的，即：
   ```
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
   ```

   即，X胜时，当前节点的分数为0，1；即当前的局面分，是对方形成的；红胜时，是算黑的分；黑分为0，红分为1；
   而返回的数组，[分1，分2]中的分1，是当前颜色的分；所以，分值是[0，1]

  3. 遍历次数过多或过少，都可能造成分数问题：分数不够，或被过渡稀释。


  
