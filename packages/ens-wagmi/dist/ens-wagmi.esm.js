import { Contract } from '@ethersproject/contracts';
import { Buffer } from 'buffer/';
import axios from 'axios';
import { CID } from 'multiformats';
import 'dompurify';
import 'is-svg';
import { urlJoin } from 'url-join-ts';
import { utils } from '@ensdomains/ens-avatar';
import { useContractRead, useContractWrite, useContract } from 'wagmi';
import ENS from '@ensdomains/ens-contracts/artifacts/contracts/registry/ENS.sol/ENS.json';
import Resolver from '@ensdomains/ens-contracts/artifacts/contracts/resolvers/Resolver.sol/Resolver.json';
import PublicResolver from '@ensdomains/ens-contracts/artifacts/contracts/resolvers/PublicResolver.sol/PublicResolver.json';
import ReverseRegistrar from '@ensdomains/ens-contracts/artifacts/contracts/registry/ReverseRegistrar.sol/ReverseRegistrar.json';
export { default as namehash } from 'eth-ens-namehash';

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

function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, void 0, groups);
  };

  var _super = RegExp.prototype,
      _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);

    return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
  }

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      return groups[name] = result[g[name]], groups;
    }, Object.create(null));
  }

  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    return result && (result.groups = buildGroups(result, this)), result;
  }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if ("string" == typeof substitution) {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    }

    if ("function" == typeof substitution) {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;
        return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
      });
    }

    return _super[Symbol.replace].call(this, str, substitution);
  }, _wrapRegExp.apply(this, arguments);
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

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

var IPFS_SUBPATH = '/ipfs/';
var IPNS_SUBPATH = '/ipns/';

var ipfsRegex = /*#__PURE__*/_wrapRegExp(/(ipfs:\/|ipns:\/)?(\/)?(ipfs\/|ipns\/)?([\w\-.]+)(\/.*)?/, {
  protocol: 1,
  root: 2,
  subpath: 3,
  target: 4,
  subtarget: 5
});

var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*)?(,)/;
function isCID(hash) {
  // check if given string or object is a valid IPFS CID
  try {
    if (typeof hash === 'string') {
      return Boolean(CID.parse(hash));
    }

    return Boolean(CID.asCID(hash));
  } catch (_error) {
    return false;
  }
} // simple assert without nested check
function resolveURI(uri, customGateway) {
  // resolves uri based on its' protocol
  var isEncoded = base64Regex.test(uri);

  if (isEncoded || uri.startsWith('http')) {
    return {
      uri: uri,
      isOnChain: isEncoded,
      isEncoded: isEncoded
    };
  }

  var ipfsGateway = customGateway || 'https://ipfs.io';
  var ipfsRegexpResult = uri.match(ipfsRegex);

  var _ref = (ipfsRegexpResult == null ? void 0 : ipfsRegexpResult.groups) || {},
      protocol = _ref.protocol,
      subpath = _ref.subpath,
      target = _ref.target,
      _ref$subtarget = _ref.subtarget,
      subtarget = _ref$subtarget === void 0 ? '' : _ref$subtarget;

  if ((protocol === 'ipns:/' || subpath === 'ipns/') && target) {
    return {
      uri: urlJoin(ipfsGateway, IPNS_SUBPATH, target, subtarget),
      isOnChain: false,
      isEncoded: false
    };
  } else if (isCID(target)) {
    // Assume that it's a regular IPFS CID and not an IPNS key
    return {
      uri: urlJoin(ipfsGateway, IPFS_SUBPATH, target, subtarget),
      isOnChain: false,
      isEncoded: false
    };
  } else {
    // we may want to throw error here
    return {
      uri: uri.replace(dataURIRegex, ''),
      isOnChain: true,
      isEncoded: false
    };
  }
}
function createCacheAdapter(fetch, ttl) {
  // creates cache adapter for axios
  var _require = require('axios-cache-interceptor'),
      setupCache = _require.setupCache;

  setupCache(fetch, {
    ttl: ttl * 1000
  });
}

function createFetcher(_ref3) {
  var ttl = _ref3.ttl;

  var _fetch = axios.create();

  if (ttl && ttl > 0) {
    createCacheAdapter(_fetch, ttl);
  }

  return _fetch;
}

var fetch = /*#__PURE__*/createFetcher({});

var abi = ['function uri(uint256 _id) public view returns (string memory)', 'function balanceOf(address account, uint256 id) public view returns (uint256)'];

var ERC1155 = /*#__PURE__*/function () {
  function ERC1155() {}

  var _proto = ERC1155.prototype;

  _proto.getMetadata = /*#__PURE__*/function () {
    var _getMetadata = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(provider, ownerAddress, contractAddress, tokenID) {
      var tokenIDHex, contract, _yield$Promise$all, tokenURI, balance, isOwner, _resolveURI, resolvedURI, isOnChain, isEncoded, _resolvedUri, response, metadata;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // exclude opensea api which does not follow erc1155 spec
              tokenIDHex = !tokenID.startsWith('https://api.opensea.io') ? tokenID.replace('0x', '').padStart(64, '0') : tokenID;
              contract = new Contract(contractAddress, abi, provider);
              _context.next = 4;
              return Promise.all([contract.uri(tokenID), ownerAddress && contract.balanceOf(ownerAddress, tokenID)]);

            case 4:
              _yield$Promise$all = _context.sent;
              tokenURI = _yield$Promise$all[0];
              balance = _yield$Promise$all[1];
              // if user has valid address and if token balance of given address is greater than 0
              isOwner = !!(ownerAddress && balance.gt(0));
              _resolveURI = resolveURI(tokenURI), resolvedURI = _resolveURI.uri, isOnChain = _resolveURI.isOnChain, isEncoded = _resolveURI.isEncoded;
              _resolvedUri = resolvedURI;

              if (!isOnChain) {
                _context.next = 13;
                break;
              }

              if (isEncoded) {
                _resolvedUri = Buffer.from(resolvedURI.replace('data:application/json;base64,', ''), 'base64').toString();
              }

              return _context.abrupt("return", JSON.parse(_resolvedUri));

            case 13:
              _context.next = 15;
              return fetch(resolvedURI.replace(/(?:0x)?{id}/, tokenIDHex));

            case 15:
              response = _context.sent;
              _context.next = 18;
              return response == null ? void 0 : response.data;

            case 18:
              metadata = _context.sent;
              return _context.abrupt("return", _extends({}, metadata, {
                is_owner: isOwner
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getMetadata(_x, _x2, _x3, _x4) {
      return _getMetadata.apply(this, arguments);
    }

    return getMetadata;
  }();

  return ERC1155;
}();

var abi$1 = ['function tokenURI(uint256 tokenId) external view returns (string memory)', 'function ownerOf(uint256 tokenId) public view returns (address)'];

var ERC721 = /*#__PURE__*/function () {
  function ERC721() {}

  var _proto = ERC721.prototype;

  _proto.getMetadata = /*#__PURE__*/function () {
    var _getMetadata = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(provider, ownerAddress, contractAddress, tokenID) {
      var contract, _yield$Promise$all, tokenURI, owner, isOwner, _resolveURI, resolvedURI, isOnChain, isEncoded, _resolvedUri, response, metadata;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              contract = new Contract(contractAddress, abi$1, provider);
              _context.next = 3;
              return Promise.all([contract.tokenURI(tokenID), ownerAddress && contract.ownerOf(tokenID)]);

            case 3:
              _yield$Promise$all = _context.sent;
              tokenURI = _yield$Promise$all[0];
              owner = _yield$Promise$all[1];
              // if user has valid address and if owner of the nft matches with the owner address
              isOwner = !!(ownerAddress && owner.toLowerCase() === ownerAddress.toLowerCase());
              _resolveURI = resolveURI(tokenURI), resolvedURI = _resolveURI.uri, isOnChain = _resolveURI.isOnChain, isEncoded = _resolveURI.isEncoded;
              _resolvedUri = resolvedURI;

              if (!isOnChain) {
                _context.next = 12;
                break;
              }

              if (isEncoded) {
                _resolvedUri = Buffer.from(resolvedURI.replace('data:application/json;base64,', ''), 'base64').toString();
              }

              return _context.abrupt("return", JSON.parse(_resolvedUri));

            case 12:
              _context.next = 14;
              return fetch(resolvedURI.replace(/(?:0x)?{id}/, tokenID));

            case 14:
              response = _context.sent;
              _context.next = 17;
              return response == null ? void 0 : response.data;

            case 17:
              metadata = _context.sent;
              return _context.abrupt("return", _extends({}, metadata, {
                is_owner: isOwner
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getMetadata(_x, _x2, _x3, _x4) {
      return _getMetadata.apply(this, arguments);
    }

    return getMetadata;
  }();

  return ERC721;
}();

var URI = /*#__PURE__*/function () {
  function URI() {}

  var _proto = URI.prototype;

  _proto.getMetadata = /*#__PURE__*/function () {
    var _getMetadata = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(uri) {
      var _resolveURI, resolvedURI, isOnChain, isImage, response;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _resolveURI = resolveURI(uri), resolvedURI = _resolveURI.uri, isOnChain = _resolveURI.isOnChain;

              if (!isOnChain) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", {
                image: resolvedURI
              });

            case 3:
              _context.next = 5;
              return isImageURI(resolvedURI);

            case 5:
              isImage = _context.sent;

              if (!isImage) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", {
                image: resolvedURI
              });

            case 8:
              _context.next = 10;
              return fetch(resolvedURI);

            case 10:
              response = _context.sent;
              return _context.abrupt("return", {
                image: response == null ? void 0 : response.data
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getMetadata(_x) {
      return _getMetadata.apply(this, arguments);
    }

    return getMetadata;
  }();

  return URI;
}();

function isImageURI(url) {
  return new Promise(function (resolve) {
    fetch({
      url: url,
      method: 'HEAD'
    }).then(function (result) {
      if (result.status === 200) {
        // retrieve content type header to check if content is image
        var contentType = result.headers['content-type'];
        resolve(contentType == null ? void 0 : contentType.startsWith('image/'));
      } else {
        resolve(false);
      }
    })["catch"](function (error) {
      // if error is not cors related then fail
      if (typeof error.response !== 'undefined') {
        // in case of cors, use image api to validate if given url is an actual image
        resolve(false);
        return;
      }

      if (!globalThis.hasOwnProperty('Image')) {
        // fail in NodeJS, since the error is not cors but any other network issue
        resolve(false);
        return;
      }

      var img = new Image();

      img.onload = function () {
        resolve(true);
      };

      img.onerror = function () {
        resolve(false);
      };

      img.src = url;
    });
  });
}

var specs = /*#__PURE__*/Object.freeze({
  erc721: ERC721,
  erc1155: ERC1155
});
function parseAvatarString(_x2, _x3, _x4) {
  return _parseAvatarString.apply(this, arguments);
}

function _parseAvatarString() {
  _parseAvatarString = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(walletAddress, avatarURI, provider) {
    var uriSpec, _metadata, _utils$parseNFT, chainID, namespace, contractAddress, tokenID, Spec, spec, host_meta, metadata, meta_;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (/eip155:/i.test(avatarURI)) {
              _context2.next = 6;
              break;
            }

            uriSpec = new URI();
            _context2.next = 4;
            return uriSpec.getMetadata(avatarURI);

          case 4:
            _metadata = _context2.sent;
            return _context2.abrupt("return", utils.getImageURI({
              metadata: _metadata
            }));

          case 6:
            // parse retrieved avatar uri
            _utils$parseNFT = utils.parseNFT(avatarURI), chainID = _utils$parseNFT.chainID, namespace = _utils$parseNFT.namespace, contractAddress = _utils$parseNFT.contractAddress, tokenID = _utils$parseNFT.tokenID; // detect avatar spec by namespace

            Spec = specs[namespace];

            if (Spec) {
              _context2.next = 10;
              break;
            }

            throw new Error("Unsupported namespace: " + namespace);

          case 10:
            spec = new Spec(); // add meta information of the avatar record

            host_meta = {
              chain_id: chainID,
              namespace: namespace,
              contract_address: contractAddress,
              token_id: tokenID,
              reference_url: "https://opensea.io/assets/" + contractAddress + "/" + tokenID
            };
            _context2.next = 14;
            return spec.getMetadata(provider, walletAddress, contractAddress, tokenID);

          case 14:
            metadata = _context2.sent;
            meta_ = _extends({
              host_meta: host_meta
            }, metadata);
            return _context2.abrupt("return", utils.getImageURI({
              metadata: meta_
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _parseAvatarString.apply(this, arguments);
}

function useEnsContractRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: ENS.abi
  }, method, {
    args: args
  });
}

function useEnsContractWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: ENS.abi
  }, method, {
    args: args
  });
}

function useResolverContract(address) {
  return useContract({
    addressOrName: address,
    contractInterface: Resolver.abi
  });
}

function useResolverContractRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: Resolver.abi
  }, method, {
    args: args
  });
}

function useResolverContractWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: Resolver.abi
  }, method, {
    args: args
  });
}

function usePublicResolverContract(address) {
  return useContract({
    addressOrName: address,
    contractInterface: PublicResolver.abi
  });
}

function usePublicResolverRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: PublicResolver.abi
  }, method, {
    args: args
  });
}

function usePublicResolverWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: PublicResolver.abi
  }, method, {
    args: args
  });
}

function useReverseRegistrarContractRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: ReverseRegistrar.abi
  }, method, {
    args: args
  });
}

function useReverseRegistrarContractWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: ReverseRegistrar.abi
  }, method, {
    args: args
  });
}

export { parseAvatarString, useEnsContractRead, useEnsContractWrite, usePublicResolverContract, usePublicResolverRead, usePublicResolverWrite, useResolverContract, useResolverContractRead, useResolverContractWrite, useReverseRegistrarContractRead, useReverseRegistrarContractWrite };
//# sourceMappingURL=ens-wagmi.esm.js.map
