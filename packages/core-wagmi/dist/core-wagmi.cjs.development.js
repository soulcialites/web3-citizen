'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var classNames = _interopDefault(require('classnames'));
var wagmi = require('wagmi');
var PropTypes = _interopDefault(require('prop-types'));

// Captures 0x + 4 characters, then the last 4 characters.
var truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */

var truncateAddress = function truncateAddress(address) {
  var match = address.match(truncateRegex);
  if (!match) return address;
  return match[1] + "\u2026" + match[2];
};

var Address = function Address(_ref) {
  var className = _ref.className,
      truncate = _ref.truncate,
      _ref$address = _ref.address,
      address = _ref$address === void 0 ? '0x00' : _ref$address;
  var classes = classNames(className, 'Address');

  if (truncate) {
    return React.createElement("span", {
      className: classes
    }, truncateAddress(address));
  }

  return React.createElement("span", {
    className: classes
  }, address);
};

var Balance = function Balance(_ref) {
  var className = _ref.className,
      address = _ref.address;
  var classes = classNames(className, 'Balance');

  var _useBalance = wagmi.useBalance({
    addressOrName: address
  }),
      dataBalance = _useBalance.data,
      isLoading = _useBalance.isLoading,
      isError = _useBalance.isError;

  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, dataBalance == null ? void 0 : dataBalance.formatted, " ", dataBalance == null ? void 0 : dataBalance.symbol);
};

var BlockNumber = function BlockNumber(_ref) {
  var className = _ref.className;
  var classes = classNames(className, 'BlockNumber');

  var _useBlockNumber = wagmi.useBlockNumber(),
      data = _useBlockNumber.data,
      isError = _useBlockNumber.isError,
      isLoading = _useBlockNumber.isLoading;

  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, data);
};

var EnsName = function EnsName(_ref) {
  var className = _ref.className,
      address = _ref.address;
  var classes = classNames(className, 'EnsName');

  var _useEnsName = wagmi.useEnsName({
    address: address
  }),
      data = _useEnsName.data,
      error = _useEnsName.error,
      isError = _useEnsName.isError,
      isLoading = _useEnsName.isLoading;

  console.log(data, error, isLoading, isError);
  if (isLoading) return null;
  if (isError || !isLoading) return React.createElement(Address, {
    truncate: true,
    address: address,
    className: classes
  });
  return React.createElement("div", {
    className: classes
  }, data);
};

var EnsAddress = function EnsAddress(_ref) {
  var className = _ref.className,
      name = _ref.name;
  var classes = classNames(className, 'EnsAddress');

  var _useEnsAddress = wagmi.useEnsAddress({
    name: name
  }),
      data = _useEnsAddress.data,
      isError = _useEnsAddress.isError,
      isLoading = _useEnsAddress.isLoading;

  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, data);
};

var IsWalletConnected = function IsWalletConnected(_ref) {
  var children = _ref.children,
      loading = _ref.loading;

  var _useConnect = wagmi.useConnect(),
      isConnected = _useConnect.isConnected;

  if (!isConnected) return loading;
  return children;
};
IsWalletConnected.defaultProps = {
  loading: null
};
IsWalletConnected.propTypes = {
  loading: PropTypes.func
};

var WalletAddress = function WalletAddress(_ref) {
  var className = _ref.className;
  var classes = classNames(className, 'WalletAddress');

  var _useAccount = wagmi.useAccount(),
      data = _useAccount.data,
      isError = _useAccount.isError,
      isLoading = _useAccount.isLoading;

  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, data == null ? void 0 : data.address);
};

var WalletBalance = function WalletBalance(_ref) {
  var className = _ref.className;
  var classes = classNames(className, 'WalletBalance');

  var _useAccount = wagmi.useAccount(),
      data = _useAccount.data,
      isError = _useAccount.isError,
      isLoading = _useAccount.isLoading;

  var _useBalance = wagmi.useBalance({
    addressOrName: data == null ? void 0 : data.address
  }),
      dataBalance = _useBalance.data;

  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, dataBalance == null ? void 0 : dataBalance.formatted, " ", dataBalance == null ? void 0 : dataBalance.symbol);
};

var WalletEnsAddress = function WalletEnsAddress(_ref) {
  var className = _ref.className;
  var classes = classNames(className, 'WalletEnsAddress');

  var _useAccount = wagmi.useAccount(),
      data = _useAccount.data,
      isError = _useAccount.isError,
      isLoading = _useAccount.isLoading;

  var _useEnsName = wagmi.useEnsName({
    address: data == null ? void 0 : data.address
  }),
      dataEnsAddress = _useEnsName.data;

  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, dataEnsAddress);
};

var WalletEnsName = function WalletEnsName(_ref) {
  var className = _ref.className;
  var classes = classNames(className, 'WalletEnsName');

  var _useAccount = wagmi.useAccount(),
      data = _useAccount.data,
      isError = _useAccount.isError,
      isLoading = _useAccount.isLoading;

  var _useEnsName = wagmi.useEnsName({
    address: data == null ? void 0 : data.address
  }),
      dataEnsName = _useEnsName.data;

  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, dataEnsName);
};

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var WalletNonce = function WalletNonce(_ref) {
  var className = _ref.className;
  var classes = classNames(className, 'WalletNonce');

  var _useSigner = wagmi.useSigner(),
      signer = _useSigner.data,
      isLoading = _useSigner.isLoading,
      isError = _useSigner.isError;

  var _React$useState = React.useState(),
      nonce = _React$useState[0],
      setNonce = _React$useState[1];

  React.useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _nonce;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!signer) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return signer.getTransactionCount();

            case 3:
              _nonce = _context.sent;
              setNonce(_nonce);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, [isLoading, signer]);
  if (isLoading || isError) return null;
  return React.createElement("div", {
    className: classes
  }, nonce);
};

//@ts-nocheck
var IpfsUriImageRender = function IpfsUriImageRender(_ref) {
  var className = _ref.className,
      uri = _ref.uri,
      _ref$alt = _ref.alt,
      alt = _ref$alt === void 0 ? '' : _ref$alt;
  var classes = classNames(className, 'IpfsUriImageRender');

  var _React$useState = React.useState(''),
      imgSrc = _React$useState[0],
      setImageSrc = _React$useState[1];

  React.useEffect(function () {
    if (uri) {
      setImageSrc(uri.replace('ipfs://', 'https://ipfs.io/ipfs/'));
    }
  }, [uri]);
  return (// eslint-disable-next-line @next/next/no-img-element
    React.createElement("img", {
      className: classes,
      src: imgSrc,
      alt: alt
    })
  );
};

/* eslint-disable @next/next/no-img-element */
var IpfsUriImageBackgroundRender = function IpfsUriImageBackgroundRender(_ref) {
  var className = _ref.className,
      uri = _ref.uri;
  var classes = classNames(className, 'IpfsUriImageBackgroundRender');

  var _React$useState = React.useState(''),
      imgSrc = _React$useState[0],
      setImageSrc = _React$useState[1];

  React.useEffect(function () {
    if (uri) {
      setImageSrc(uri.replace('ipfs://', 'https://ipfs.io/ipfs/'));
    }
  }, [uri]);
  return React.createElement("div", {
    className: classes,
    style: {
      position: 'relative'
    }
  }, React.createElement("div", {
    style: {
      backgroundImage: "url(" + imgSrc + ")",
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    }
  }));
};

exports.Address = Address;
exports.Balance = Balance;
exports.BlockNumber = BlockNumber;
exports.EnsAddress = EnsAddress;
exports.EnsName = EnsName;
exports.IpfsUriImageBackgroundRender = IpfsUriImageBackgroundRender;
exports.IpfsUriImageRender = IpfsUriImageRender;
exports.IsWalletConnected = IsWalletConnected;
exports.WalletAddress = WalletAddress;
exports.WalletBalance = WalletBalance;
exports.WalletEnsAddress = WalletEnsAddress;
exports.WalletEnsName = WalletEnsName;
exports.WalletNonce = WalletNonce;
//# sourceMappingURL=core-wagmi.cjs.development.js.map
