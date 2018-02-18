(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tictactoe_engine = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],3:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],4:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":3,"_process":1,"inherits":2}],5:[function(require,module,exports){
var boardHelper = require("./boardHelper.js")

var players = ['X', 'O'];

function Board() {
  this.field = {
    playerX: 0,
    playerO: 1
  };
  this.state = []; // 这是个两维数组，参见performance/substring/v2.js
}

Board.prototype.setup = function(fen, color) {
  this.state = boardHelper.fen2state(fen);
  this.active = color; // this.field.playerR;
  this.ply = 1;
};


Board.prototype.copy = function() {
  var result = new Board();
  result.active = this.active;
  result.state = JSON.parse(JSON.stringify(this.state)); // Deep copy
  result.ply = this.ply;
  return result;
};

Board.prototype.getActions = function() {
  return boardHelper.getActions(this.state);
};

Board.prototype.doAction = function(action) {
  // [1,1]

  this.state[action[0]][action[1]] = players[this.active];
  var opponent = this.active ^ 1;

  this.active = opponent;
  ++this.ply;
};

Board.prototype.getResult = function() {
  // 过程是，对方走完之后，才开始计分；如X走完了，轮到黑走了，此时可能X已胜，

  // TODO: 到底是固定的X[1，0]，还是与active有关？即X win也可能是[0,1] ???



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

  console.log("ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
};

module.exports = Board;

},{"./boardHelper.js":6}],6:[function(require,module,exports){
ROW_HEIGHT = 3;
ROW_WIDTH = 3;

var lines = [   [[0,0], [0,1], [0, 2]],
[[1,0], [1,1], [1, 2]],
[[2,0], [2,1], [2, 2]],
[[0,0], [1,0], [2, 0]],
[[0,1], [1,1], [2, 1]],
[[0,2], [1,2], [2, 2]],
[[0,0], [1,1], [2, 2]],
[[0,2], [1,1], [2, 0]]
];

function isWinning(player, state){
  for (var i=0; i< lines.length; i++){
    if (state[lines[i][0][0]][lines[i][0][1]] == state[lines[i][1][0]][lines[i][1][1]] &&
      state[lines[i][1][0]][lines[i][1][1]] == state[lines[i][2][0]][lines[i][2][1]] &&
      state[lines[i][2][0]][lines[i][2][1]] == player){
        return true;
      }
  }
  return false;
}

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


function getActions(state) {
  // If is win, then return empty
  if (isWinning('X', state) || isWinning('O', state) ){
    return [];
  }

  // Same as get un-occupied locations
  var actions = [];

  for (var i = 0; i < ROW_HEIGHT; i++) {
    for (var j = 0; j < ROW_WIDTH; j++) {
      if (!isOccupied(i, j, state)) {
        actions.push([i, j])
      }
    }
  }

  return actions;
}


function isBoardFull(state) {
  for (var i = 0; i < ROW_HEIGHT; i++) {
    for (var j = 0; j < ROW_WIDTH; j++) {
      if (!isOccupied(i, j, state)) {
        return false;
      }
    }
  }
  return true;
}

function fen2state(fen) {
  if (validFen(fen) !== true) {
    return false;
  }

  var state = initBoard();

  for (var i = 0; i < ROW_HEIGHT; i++) {
    for (var j = 0; j < ROW_WIDTH; j++) {
      state[i][j] = ' '; // Empty
    }
  }

  fen = fen.replace(/ .+$/, '');

  var rows = fen.split('/');
  var position = {};

  for (var i = 0; i < ROW_HEIGHT; i++) {
    var row = rows[i].split('');

    // loop through each character in the FEN section
    var emptySquares = 0,
      columnIndex = 0;
    for (var j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-3]/) !== -1) {
        emptySquares = parseInt(row[j], 10);
        for (var k = 0; k < emptySquares; k++) {
          columnIndex = columnIndex + 1;
        }
      }
      // piece
      else {
        state[i][columnIndex] = row[j];
        columnIndex = columnIndex + 1;
      }
    }

  }

  return state;
}


function validFen(fen) {
  if (typeof fen !== 'string') return false;

  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  // FEN should be 8 sections separated by slashes
  var chunks = fen.split('/');


  if (chunks.length !== ROW_HEIGHT) return false;
  // check the piece sections
  for (var i = 0; i < ROW_HEIGHT; i++) {
    if (chunks[i] === '' ||
      chunks[i].length > ROW_WIDTH ||
      chunks[i].search(/[^XO1-3]/) !== -1) {
      return false;
    }
  }

  return true;
}



function isOccupied(x, y, state) {
  return state[x][y] != ' ';
}


module.exports = {
  fen2state: fen2state,
  isOccupied: isOccupied,
  isBoardFull: isBoardFull,
  getActions: getActions,
  isWinning: isWinning
}

},{}],7:[function(require,module,exports){
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

},{"./board.js":5,"./boardHelper.js":6,"./uct/uct.js":8,"util":4}],8:[function(require,module,exports){
//
// Copyright (c) 2016 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

var UctNode = require('./uctnode.js')
var boardHelper = require("../boardHelper.js") // for debug purpose
function Uct() {}

Uct.prototype.getActionInfo = function(board, maxIterations, maxTime, verbose) {
  var root = new UctNode(null, board, null);
  var startTime = (new Date()).getTime();
  var timeLimit = startTime + maxTime;
  var blockSize = 50;
  var nodesVisted = 0;
  for (var iterations = 0; iterations < maxIterations &&
    (new Date()).getTime() < timeLimit; iterations += blockSize) {
    for (var i = 0; i < blockSize; ++i) {
      var node = root;
      var variantBoard = board.copy();
      /* Selection */

      while (node.unexamined.length == 0 && node.children.length > 0) {
        node = node.selectChild();
        variantBoard.doAction(node.action);
      }
      /* Expansion */
      if (node.unexamined.length > 0) {
        var j = Math.floor(Math.random() * node.unexamined.length);
        variantBoard.doAction(node.unexamined[j]);
        node = node.addChild(variantBoard, j);
      }
      /* Simulation */
      var actions = variantBoard.getActions();

      while (actions.length > 0) {

        var thisAction = actions[Math.floor(Math.random() * actions.length)];

        variantBoard.doAction(thisAction);

        ++nodesVisted;
        actions = variantBoard.getActions();

      }
      printed = true;

      /* Backpropagation */
      var result = variantBoard.getResult();

      while (node) {
        node.update(result);
        node = node.parentNode;
      }

    }
  }
  var duration = (new Date()).getTime() - startTime;

  return {
    action: root.mostVisitedChild().action,
    info: Math.floor(nodesVisted * 1000.0 / duration) +
      " nodes/sec examined. , duration: " + duration + " with iterations: " + iterations
  };
};


module.exports = Uct;

},{"../boardHelper.js":6,"./uctnode.js":9}],9:[function(require,module,exports){
//
// Copyright (c) 2016 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

function UctNode(parentNode, board, action) {
  this.action = action;
  this.parentNode = parentNode;
  this.children = [];
  this.wins = 0;
  this.visits = 0;
  this.unexamined = board.getActions();
  this.activePlayer = board.active;
}

UctNode.prototype.addChild = function (board, index) {
  var node = new UctNode(this, board, this.unexamined[index]);
  this.unexamined.splice(index, 1);
  this.children[this.children.length] = node;
  return node;
};

UctNode.prototype.selectChild = function () {
  var selected = null;
  var bestValue = Number.NEGATIVE_INFINITY;
  for(var i=0; i<this.children.length; ++i) {
    var child = this.children[i];
    var uctValue = child.wins / child.visits +
      Math.sqrt(2 * Math.log(this.visits) / child.visits);
    if (uctValue > bestValue) {
      selected = child;
      bestValue = uctValue;
    }
  }
  return selected;
};

UctNode.prototype.update = function (result) {
  ++this.visits;
  this.wins += result[this.activePlayer];
};

UctNode.prototype.mostVisitedChild = function () {
  /*
    for(var i=0; i<this.children.length; ++i) {
      console.log(String.fromCharCode(97+this.children[i].action.x) +
        (this.children[i].action.y+1) + ' (' + this.children[i].wins +
        '/' + this.children[i].visits + ')');
    }
   */

  var mostVisited = this.children[0];
  for(var i=1; i<this.children.length; ++i) {
    if (this.children[i].visits > mostVisited.visits) {
      mostVisited = this.children[i];
    }
  }
  return mostVisited;
};



module.exports = UctNode;

},{}]},{},[7])(7)
});