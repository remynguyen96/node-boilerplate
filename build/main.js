require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

__webpack_require__(4).config();
var express = __webpack_require__(0);
var path = __webpack_require__(5);
var middleware = __webpack_require__(6);
var Routes = __webpack_require__(12);
/**
 * *Description: Setup Middleware
 */
var app = express();
var _console = console,
    log = _console.log;

middleware(app);
/**
 @Description: Setup Router
 */
app.use('/api', Routes);
var views = path.join(__dirname, 'views');
app.use('/', express.static(views));
/**
 * *Description: Setup Listening Server
 */
app.listen(process.env.PORT || process.env.WEB_PORT, function (err) {
  if (err) {
    throw err;
  } else {
    log('Environment ' + "production" + ' running with port: ' + process.env.WEB_PORT);
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var morgan = __webpack_require__(7);
var bodyParser = __webpack_require__(8);
var cors = __webpack_require__(9);
var compression = __webpack_require__(10);
var helmet = __webpack_require__(11);

module.exports = function (app) {
  app.use(morgan('combined'));
  app.use(cors('*'));
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    Router = _require.Router;

var _require2 = __webpack_require__(13),
    sendMail = _require2.sendMail;

var routes = new Router();
routes.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token, X-Refresh-Token');
  next();
});

routes.post('/send-mail', sendMail);
// routes.get('/list-email-register', UserController.listMailRegister);

module.exports = routes;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable no-useless-escape,no-restricted-syntax,no-prototype-builtins */
var low = __webpack_require__(16);
var FileSync = __webpack_require__(17);

var _require = __webpack_require__(18),
    SendMailServer = _require.SendMailServer,
    MailConfirmOrder = _require.MailConfirmOrder,
    MailOwner = _require.MailOwner;

var adapter = new FileSync('db.json');
var db = low(adapter);
var verifiedForm = function verifiedForm(_ref) {
  var name = _ref.name,
      address = _ref.address,
      quantity = _ref.quantity,
      receive = _ref.receive,
      books = _ref.books;
  return new Promise(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve, reject) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                if (!name) {
                  reject(new Error('Name is required !'));
                } else if (!address) {
                  reject(new Error('Address is required !'));
                } else if (!quantity) {
                  reject(new Error('Quantity is required !'));
                } else if (!receive) {
                  reject(new Error('Place receive is required !'));
                } else if (!books) {
                  reject(new Error('Books is required !'));
                }
                resolve(true);
              } catch (err) {
                reject(err);
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var verifiedEmail = function verifiedEmail(email) {
  return new Promise(function (resolve, reject) {
    var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regx.test(email)) {
      reject(new Error('Email is not valid !'));
    }
    resolve(true);
  });
};

var verifiedPhone = function verifiedPhone(phone) {
  return new Promise(function (resolve, reject) {
    var regx = /^[^A-Za-z!@#$%^&*()]+$/g;
    if (!regx.test(phone)) {
      reject(new Error('Phone is not valid !'));
    }
    resolve(true);
  });
};

var isEmpty = function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

var sendMail = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, name, email, phone, address, quantity, receive, books, _ref4, _ref5, validateForm, validateEmail, validatePhone, templateMailOrder, templateMailOwner, id;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, address = _req$body.address, quantity = _req$body.quantity, receive = _req$body.receive, books = _req$body.books;
            _context2.next = 4;
            return Promise.all([verifiedForm({ name: name, address: address, quantity: quantity, receive: receive, books: books }), verifiedEmail(email), verifiedPhone(phone)]);

          case 4:
            _ref4 = _context2.sent;
            _ref5 = _slicedToArray(_ref4, 3);
            validateForm = _ref5[0];
            validateEmail = _ref5[1];
            validatePhone = _ref5[2];

            if (!(validateForm && validateEmail && validatePhone)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 12;
            return MailConfirmOrder(req.body);

          case 12:
            templateMailOrder = _context2.sent;
            _context2.next = 15;
            return MailOwner(req.body);

          case 15:
            templateMailOwner = _context2.sent;
            _context2.next = 18;
            return Promise.all([SendMailServer(templateMailOrder), SendMailServer(templateMailOwner)]);

          case 18:
            id = 1;

            if (!isEmpty(db.getState())) {
              db.getState();
              id += db.getState().users.length;
            }
            db.defaults({ users: [] }).write();
            db.get('users').push({ id: id, name: name, email: email, phone: phone, address: address, quantity: quantity, receive: receive, books: books }).write();
            return _context2.abrupt('return', res.status(201).json({ success: true }));

          case 23:
            return _context2.abrupt('return', res.status(401).json({ info: 'Form is not valid !' }));

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.status(400).json(_context2.t0));

          case 29:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 26]]);
  }));

  return function sendMail(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

// const listMailRegister = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const verify = Users.verifyAccessToken(token);
//     const users = await Users.findById(verify.id);
//     if (users) {
//       await users.update({ verified: true });
//       res.redirect('/');
//     }
//     return null;
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// };

module.exports = {
  sendMail: sendMail
  // listMailRegister,
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(15);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileSync");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var nodemailer = __webpack_require__(19);

var _require = __webpack_require__(20),
    TemplateMail = _require.TemplateMail;

var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

var MailConfirmOrder = function MailConfirmOrder(_ref) {
  var name = _ref.name,
      email = _ref.email,
      phone = _ref.phone,
      address = _ref.address,
      quantity = _ref.quantity,
      receive = _ref.receive,
      books = _ref.books;
  return new Promise(function (resolve, reject) {
    if (email && phone) {
      var mail = {
        from: 'Mail Xác Nhận Việc Đăng kí Mua Sách 📗 - <hoatulip8504@gmail.com>',
        to: '' + email,
        subject: name + ' \u0110\u0103ng K\xED Mua S\xE1ch Th\xE0nh C\xF4ng \u2714',
        html: TemplateMail({ name: name, email: email, phone: phone, address: address, quantity: quantity, receive: receive, books: books })
      };
      resolve(mail);
    } else {
      reject(new Error('Don\'t have infomation to send mail !'));
    }
  });
};

var MailOwner = function MailOwner(_ref2) {
  var name = _ref2.name,
      email = _ref2.email,
      phone = _ref2.phone,
      address = _ref2.address,
      quantity = _ref2.quantity,
      receive = _ref2.receive,
      books = _ref2.books;
  return new Promise(function (resolve, reject) {
    if (email && phone) {
      var mail = {
        from: '\u0110\u0103ng K\xED Mua S\xE1ch \uD83D\uDCD6 - ' + email,
        to: process.env.MAIL_OWNER,
        subject: name + ' \u0111\u0103ng k\xED mua: ' + books + ' \u2714',
        html: TemplateMail({ name: name, email: email, phone: phone, address: address, quantity: quantity, receive: receive, books: books })
      };
      resolve(mail);
    } else {
      reject(new Error('Don\'t have infomation to send mail !'));
    }
  });
};

var SendMailServer = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(templateMail) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return transporter.sendMail(templateMail, function (error, info) {
              if (error) {
                return error;
              }
              console.table({
                level: 'info',
                message: 'Mail %s sent: ' + info.messageId + ', ' + info.response
              });
              return info;
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function SendMailServer(_x) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  SendMailServer: SendMailServer,
  MailOwner: MailOwner,
  MailConfirmOrder: MailConfirmOrder
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateMail = function TemplateMail(_ref) {
  var name = _ref.name,
      email = _ref.email,
      phone = _ref.phone,
      address = _ref.address,
      quantity = _ref.quantity,
      receive = _ref.receive,
      books = _ref.books;

  var parseGetPrice = function parseGetPrice(strBooks) {
    var arr = strBooks.split(/[^0-9]/);
    return parseInt(arr.filter(function (item) {
      return item !== '';
    })[0], 10);
  };
  var total = (parseGetPrice(books) * quantity * 1000).toLocaleString('de-DE');
  var receiving = receive === 'M1' ? 'M1: Miền Bắc- Miền Trung' : 'M2: Miền Nam';
  return '\n    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"\n  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>\n  <title>Email \u0110\u0103ng K\xED Mua S\xE1ch</title>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n</head>\n<body style="margin:0; padding:10px 0 0 0;" bgcolor="#F8F8F8">\n<table align="center" border="0" cellpadding="0" cellspacing="0" width="95%%">\n  <tr>\n    <td align="center">\n      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"\n             style="border-collapse: separate; border-spacing: 2px 5px"\n             bgcolor="#FFFFFF">\n        <tr>\n          <td align="center">\n             <img src="https://daycontuhoc.herokuapp.com/bg-mail-order.jpg" alt="Image Banner" height="100%%" width="600" style="margin:0; padding:0; border:none; display:block;" border="0" /> \n          </td>\n        </tr>\n        <tr>\n          <td bgcolor="#ffffff" style="padding: 20px 30px 40px 30px;">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%%">\n              <tr>\n                <td style="color: #1dd1a1; font-weight: 700; padding: 10px 0 10px 0; font-family: Avenir, sans-serif; font-size: 24px; text-align: center; line-height: 30px;">\n                  Th\xF4ng Tin X\xE1c Nh\u1EADn \u0110\u0103ng K\xED Mua S\xE1ch\n                </td>\n              </tr>\n              <tr>\n                <td style="line-height: 28px; padding: 10px 0 10px 0; font-family: Avenir, sans-serif; font-size: 18px; text-align: center">\n                  Xin ch\xE0o <strong>' + name + '</strong>, b\u1EA1n vui l\xF2ng x\xE1c nh\u1EADn l\u1EA1i th\xF4ng tin \u0111\u0103ng k\xED mua s\xE1ch b\xEAn d\u01B0\u1EDBi:\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n        <tr>\n          <td bgcolor="#F1F7F7">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%%" style="padding: 20px 10px 10px 10px;">\n              <tr>\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        T\xEAn\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 110px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + name + '\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n                <td style="font-size: 0; line-height: 0;" width="5">\n                  &nbsp;\n                </td>\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        \u0110\u1ECBa Ch\u1EC9\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 110px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + address + '\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n                <td style="font-size: 0; line-height: 0;" width="5">\n                  &nbsp;\n                </td>\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        Email\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 110px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + email + '\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n                <td style="font-size: 0; line-height: 0;" width="5">\n                  &nbsp;\n                </td>\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 110px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + phone + '\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n        <tr style="display: inline-block; padding-top: 15px;">\n          <td bgcolor="#F1F7F7">\n            <table border="0" cellpadding="0" cellspacing="0" width="100%%" style="padding: 20px 10px 10px 10px;">\n              <tr>\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        \u0110\u0103ng K\xFD Nh\u1EADn S\xE1ch\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + receiving + '\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n                <td style="font-size: 0; line-height: 0;" width="5">\n                  &nbsp;\n                </td>\n\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        Ch\u1ECDn Mua\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + books + '\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n                <td style="font-size: 0; line-height: 0;" width="5">\n                  &nbsp;\n                </td>\n\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        S\u1ED1 L\u01B0\u1EE3ng\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + quantity + '\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n                <td style="font-size: 0; line-height: 0;" width="5">\n                  &nbsp;\n                </td>\n\n                <td width="150" valign="top" style="padding: 0 0 15px 0;">\n                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">\n                    <tr>\n                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">\n                        T\u1ED5ng Ti\u1EC1n\n                      </td>\n                    </tr>\n                    <tr>\n                      <td align="center"\n                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">\n                        ' + total + ' VN\u0110\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n              </tr>\n            </table>\n          </td>\n        </tr>\n      </table>\n    </td>\n  </tr>\n</table>\n</body>\n</html>';
};

module.exports = {
  TemplateMail: TemplateMail
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map