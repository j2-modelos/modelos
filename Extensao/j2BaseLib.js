Array.prototype.forEachOriginal = Array.prototype.forEach;

// Sobrescrevendo Array.prototype.forEach com uma versão assíncrona
Array.prototype.forEach = async function(callbackfn, thisArg) {
  const promises = this.map((value, index, array) => {
    const result = callbackfn.call(thisArg, value, index, array);

    // Se o retorno não é uma Promise, cria uma Promise com setTimeout
    return result instanceof Promise
      ? result
      : new Promise(resolve => {
          // Garantia de que o callback é tratado de maneira assíncrona
          setTimeout(() => resolve(result), 0);
        });
  });
  await Promise.all(promises);
};

(function () {
    ;(function sobreporWindowConsole(){
      const VERBOSE_ATIVADA = false
      const console = window.console

      const meuConsole = {
        log: function(...args) {
          VERBOSE_ATIVADA && console.log(...args);
        },
        warn: function(...args) {
          VERBOSE_ATIVADA && console.warn(...args);
        },
        error: function(...args) {
            console.error(...args);
        },
        info: function(...args) {
          VERBOSE_ATIVADA && console.info(...args);
        },
        debug: function(...args) {
          VERBOSE_ATIVADA && console.debug(...args);
        },
        assert: function(assertion, ...args) {
          VERBOSE_ATIVADA && console.assert(assertion, ...args);
        },
        clear: function() {
          VERBOSE_ATIVADA && console.clear();
        },
        count: function(label) {
          VERBOSE_ATIVADA && console.count(label);
        },
        countReset: function(label) {
          VERBOSE_ATIVADA && console.countReset(label);
        },
        group: function(...label) {
          VERBOSE_ATIVADA && console.group(...label);
        },
        groupCollapsed: function(...label) {
          VERBOSE_ATIVADA && console.groupCollapsed(...label);
        },
        groupEnd: function() {
          VERBOSE_ATIVADA && console.groupEnd();
        },
        time: function(label) {
          VERBOSE_ATIVADA && console.time(label);
        },
        timeEnd: function(label) {
          VERBOSE_ATIVADA && console.timeEnd(label);
        },
        table: function(data, columns) {
          VERBOSE_ATIVADA && console.table(data, columns);
        }
        // Adicione outros métodos conforme necessário
    };

    // Substituindo o console padrão pelo console personalizado
    window.console = meuConsole;
  })()


  console.log('run.js - rev 03');

  
  /*stringfy RUN for other purposes in framework*/  
  if (!window.j2)
    window.j2 = {};
  if (!window.j2.mod)
    window.j2.mod = {};
  if (!window.j2.mod._)
    window.j2.mod._ = {};

  
  window.j2.mod._._42 = function () {
    var isFunction = new window.j2.mod._._198,
          isArray = new window.j2.mod._._197,
          isNumber = new window.j2.mod._._200,
          bind = new window.j2.mod._._99,
          assign = new window.j2.mod._._206;

    var FN_REF = '__fn';

    var DEFAULT_PRIORITY = 1000;

    var slice = Array.prototype.slice;

    function EventBus() {
      this._listeners = {};

      this.on('diagram.destroy', 1, this._destroy, this);
    };

    EventBus.prototype.on = function (events, priority, callback, that) {

      events = isArray(events) ? events : [events];

      if (isFunction(priority)) {
        that = callback;
        callback = priority;
        priority = DEFAULT_PRIORITY;
      }

      if (!isNumber(priority)) {
        throw new Error('priority must be a number');
      }

      var actualCallback = callback;

      if (that) {
        actualCallback = bind(callback, that);

        actualCallback[FN_REF] = callback[FN_REF] || callback;
      }

      var self = this,
          listener = { priority: priority, callback: actualCallback };

      events.forEach(function (e) {
        self._addListener(e, listener);
      });
    };

    EventBus.prototype.once = function (event, priority, callback, that) {
      var self = this;

      if (isFunction(priority)) {
        that = callback;
        callback = priority;
        priority = DEFAULT_PRIORITY;
      }

      if (!isNumber(priority)) {
        throw new Error('priority must be a number');
      }

      function wrappedCallback() {
        self.off(event, wrappedCallback);
        return callback.apply(that, arguments);
      };

      wrappedCallback[FN_REF] = callback;

      this.on(event, priority, wrappedCallback);
    };

    EventBus.prototype.off = function (event, callback) {
      var listeners = this._getListeners(event),
          listener,
          listenerCallback,
          idx;

      if (callback) {
        for (idx = listeners.length - 1; (listener = listeners[idx]) ; idx--) {
          listenerCallback = listener.callback;

          if (listenerCallback === callback || listenerCallback[FN_REF] === callback) {
            listeners.splice(idx, 1);
          }
        }
      } else {
        listeners.length = 0;
      }
    };


    EventBus.prototype.fire = function (type, data) {

      var event,
          listeners,
          returnValue,
          args;

      args = slice.call(arguments);

      if (typeof type === 'object') {
        event = type;
        type = event.type;
      }

      if (!type) {
        throw new Error('no event type specified');
      }

      listeners = this._listeners[type];

      if (!listeners) {
        return;
      }

      if (data instanceof Event) {
        event = data;
      } else {
        event = new Event();
        event.init(data);
      }

      args[0] = event;

      var originalType = event.type;

      if (type !== originalType) {
        event.type = type;
      }

      try {
        returnValue = this._invokeListeners(event, args, listeners);
      } finally {
        if (type !== originalType) {
          event.type = originalType;
        }
      }

      if (returnValue === undefined && event.defaultPrevented) {
        returnValue = false;
      }

      return returnValue;
    };


    EventBus.prototype.handleError = function (error) {
      return this.fire('error', { error: error }) === false;
    };


    EventBus.prototype._destroy = function () {
      this._listeners = {};
    };

    EventBus.prototype._invokeListeners = function (event, args, listeners) {

      var idx,
          listener,
          returnValue;

      for (idx = 0; (listener = listeners[idx]) ; idx++) {

        if (event.cancelBubble) {
          break;
        }

        returnValue = this._invokeListener(event, args, listener);
      }

      return returnValue;
    };

    EventBus.prototype._invokeListener = function (event, args, listener) {

      var returnValue;

      try {
        returnValue = invokeFunction(listener.callback, args);

        if (returnValue !== undefined) {
          event.returnValue = returnValue;
          event.stopPropagation();
        }

        if (returnValue === false) {
          event.preventDefault();
        }
      } catch (e) {
        if (!this.handleError(e)) {
          console.error('unhandled error in event listener');
          console.error(e.stack);

          throw e;
        }
      }

      return returnValue;
    };

    EventBus.prototype._addListener = function (event, newListener) {

      var listeners = this._getListeners(event),
          existingListener,
          idx;

      for (idx = 0; (existingListener = listeners[idx]) ; idx++) {
        if (existingListener.priority < newListener.priority) {

          listeners.splice(idx, 0, newListener);
          return;
        }
      }

      listeners.push(newListener);
    };


    EventBus.prototype._getListeners = function (name) {
      var listeners = this._listeners[name];

      if (!listeners) {
        this._listeners[name] = listeners = [];
      }

      return listeners;
    };

    function Event() { };

   

    Event.prototype.stopPropagation = function () {
      this.cancelBubble = true;
    };

    Event.prototype.preventDefault = function () {
      this.defaultPrevented = true;
    };

    Event.prototype.init = function (data) {
      assign(this, data || {});
    };

    function invokeFunction(fn, args) {
      return fn.apply(null, args);
    };
    
    return {
      'Event' : new Event,
      'EventBus' : new EventBus
    };
  };

  window.j2.mod._._86 = function (){
      if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        return function inherits(ctor, superCtor) {
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
        return function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function () { };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
  };
  
  window.j2.mod._._87 = function (){
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    };

    return last;
  };
  
  window.j2.mod._._90 = function (){
    var arrayFilter = new window.j2.mod._._109,
        baseCallback = new window.j2.mod._._116,
        baseFilter = new window.j2.mod._._123,
        isArray = new window.j2.mod._._197;

    function filter(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = baseCallback(predicate, thisArg, 3);
      return func(collection, predicate);
    };

    return filter;    
  };
  
  window.j2.mod._._91 = function (){
    var baseEach = new window.j2.mod._._121,
        createFind = new window.j2.mod._._161;

    var find = createFind(baseEach);

    return find;    
  };
  
  window.j2.mod._._92 = function () { 

    var arrayEach = new window.j2.mod._._107;
    var baseEach = new window.j2.mod._._121;
    var createForEach = new window.j2.mod._._162;

    return createForEach(arrayEach, baseEach);
  };
  
  window.j2.mod._._96 = function (){
    var arrayReduce = new window.j2.mod._._112,
        baseEach = new window.j2.mod._._121,
        createReduce = new window.j2.mod._._165;

    var reduce = createReduce(arrayReduce, baseEach);

    return reduce;
  };  
  
  window.j2.mod._._98 = function () {
    var getNative = new window.j2.mod._._174;

    var nativeNow = getNative(Date, 'now');


    var now = nativeNow || function () {
      return new Date().getTime();
    };

    return now;    
  };
  
  window.j2.mod._._99 = function () {
    var isObject = new window.j2.mod._._201,
        now = new window.j2.mod._._98;

    var FUNC_ERROR_TEXT = 'Expected a function';

    var nativeMax = Math.max;

    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = wait < 0 ? 0 : (+wait || 0);
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = !!options.leading;
        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function cancel() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        lastCalled = 0;
        maxTimeoutId = timeoutId = trailingCall = undefined;
      };

      function complete(isCalled, id) {
        if (id) {
          clearTimeout(id);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (isCalled) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = undefined;
          }
        }
      };

      function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
          complete(trailingCall, maxTimeoutId);
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      };

      function maxDelayed() {
        complete(trailing, timeoutId);
      };

      function debounced() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0 || remaining > maxWait;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = undefined;
        }
        return result;
      };
      debounced.cancel = cancel;
      return debounced;
    };

    return debounce;    
  };
  
  window.j2.mod._._101 = function (){
      var baseDelay = new window.j2.mod._._119,
          restParam = new window.j2.mod._._102;

      var defer = restParam(function (func, args) {
        return baseDelay(func, 1, args);
      });

      return defer;
  };
  
  window.j2.mod._._102 = function (){
    var FUNC_ERROR_TEXT = 'Expected a function';
    var nativeMax = Math.max;

    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
      return function () {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);

        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, args[0], rest);
          case 2: return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    };

    return restParam;
  };
  
  window.j2.mod._._106 = function (){
      function arrayCopy(source, array) {
        var index = -1,
            length = source.length;

        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      };

      return arrayCopy;
  };
  
  window.j2.mod._._107 = function () {

    function arrayEach(array, iteratee) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    };

    return arrayEach;
  };
  
  window.j2.mod._._109 = function () {
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[++resIndex] = value;
        }
      }
      return result;
    };

    return arrayFilter;    
  };
  
  window.j2.mod._._111 = function () {
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    };

    return arrayPush;
  };
  
  window.j2.mod._._112 = function (){
    function arrayReduce(array, iteratee, accumulator, initFromArray) {
      var index = -1,
          length = array.length;

      if (initFromArray && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    };

    return arrayReduce;
  };
  
  window.j2.mod._._113 = function (){
    function arraySome(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    };

    return arraySome;
  };  
  
  window.j2.mod._._114 = function (){
      var keys = new window.j2.mod._._207;

      function assignWith(object, source, customizer) {
        var index = -1,
            props = keys(source),
            length = props.length;

        while (++index < length) {
          var key = props[index],
              value = object[key],
              result = customizer(value, source[key], key, object, source);

          if ((result === result ? (result !== value) : (value === value)) ||
              (value === undefined && !(key in object))) {
            object[key] = result;
          }
        }
        return object;
      };

      return assignWith;    
  };

  window.j2.mod._._115 = function (){
    var baseCopy = new window.j2.mod._._117,
        keys = new window.j2.mod._._207;

    function baseAssign(object, source) {
      return source == null
        ? object
        : baseCopy(source, keys(source), object);
    };

    return baseAssign;
  };

  window.j2.mod._._116 = function (){
    var baseMatches = new window.j2.mod._._137,
        baseMatchesProperty = new window.j2.mod._._138, 
        bindCallback = new window.j2.mod._._149,
        identity = new window.j2.mod._._214,
        property = new window.j2.mod._._216;

    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == 'function') {
        return thisArg === undefined
          ? func
          : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == 'object') {
        return baseMatches(func);
      }
      return thisArg === undefined
        ? property(func)
        : baseMatchesProperty(func, thisArg);
    };

    return baseCallback;    
  };
  
  window.j2.mod._._117 = function (){
    function baseCopy(source, props, object) {
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    };

    return baseCopy;    
  };

  window.j2.mod._._119 = function (){
    var FUNC_ERROR_TEXT = 'Expected a function';

    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function () { func.apply(undefined, args); }, wait);
    };

    return baseDelay;
  };
  
  window.j2.mod._._121 = function () {
    var baseForOwn = new window.j2.mod._._129,
        createBaseEach = new window.j2.mod._._156;

    var baseEach = createBaseEach(baseForOwn);

    return baseEach;
  };

  window.j2.mod._._123 = function (){
    var baseEach = new window.j2.mod._._121;

    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function (value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    };

    return baseFilter;    
  };
  
  window.j2.mod._._124 = function (){
    function baseFind(collection, predicate, eachFunc, retKey) {
      var result;
      eachFunc(collection, function (value, key, collection) {
        if (predicate(value, key, collection)) {
          result = retKey ? key : value;
          return false;
        }
      });
      return result;
    };

    return baseFind;
  };

  window.j2.mod._._125 = function (){
      function baseFindIndex(array, predicate, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length)) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      };

      return baseFindIndex;
  };
  
  window.j2.mod._._126 = function (){
    
    var arrayPush = new window.j2.mod._._111,
        isArguments = new window.j2.mod._._196,
        isArray = new window.j2.mod._._197,
        isArrayLike = new window.j2.mod._._176,
        isObjectLike = new window.j2.mod._._182;

    function baseFlatten(array, isDeep, isStrict, result) {
      result || (result = []);

      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index];
        if (isObjectLike(value) && isArrayLike(value) &&
            (isStrict || isArray(value) || isArguments(value))) {
          if (isDeep) {
            baseFlatten(value, isDeep, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    };

    return baseFlatten;
  };
  
  window.j2.mod._._127 = function () {
    var createBaseFor = new window.j2.mod._._157;

    var baseFor_ = createBaseFor();

    return baseFor_;

  };

  window.j2.mod._._128 = function (){
    var baseFor = new window.j2.mod._._127,
        keysIn = new window.j2.mod._._208;

    function baseForIn(object, iteratee) {
      return baseFor(object, iteratee, keysIn);
    };

    return baseForIn;
  };
  
  window.j2.mod._._129 = function () {
    var baseFor = new window.j2.mod._._127,
        keys = new window.j2.mod._._207;

    function baseForOwn(object, iteratee) {
      return baseFor(object, iteratee, keys);
    };

    return baseForOwn;
  };
  
  window.j2.mod._._130 = function (){
    var toObject = new window.j2.mod._._193;

    function baseGet(object, path, pathKey) {
      if (object == null) {
        return;
      }
      if (pathKey !== undefined && pathKey in toObject(object)) {
        path = [pathKey];
      }
      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[path[index++]];
      }
      return (index && index == length) ? object : undefined;
    };

    return baseGet;
  };

  window.j2.mod._._132 = function (){
    var baseIsEqualDeep = new window.j2.mod._._133,
        isObject = new window.j2.mod._._201,
        isObjectLike = new window.j2.mod._._182;

    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    };

    return baseIsEqual;
  };
  
  window.j2.mod._._133 = function (){
    var equalArrays = new window.j2.mod._._167,
        equalByTag = new window.j2.mod._._168,
        equalObjects = new window.j2.mod._._169,
        isArray = new window.j2.mod._._197,
        isTypedArray = new window.j2.mod._._204;
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        objectTag = '[object Object]';
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objToString = objectProto.toString;


    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isSameTag) {
        return false;
      }

      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }

      stackA.push(object);
      stackB.push(other);

      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

      stackA.pop();
      stackB.pop();

      return result;
    };

    return baseIsEqualDeep;
  };
  
  window.j2.mod._._134 = function (){
    var baseIsEqual = new window.j2.mod._._132,
        toObject = new window.j2.mod._._193;

    function baseIsMatch(object, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = toObject(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var result = customizer ? customizer(objValue, srcValue, key) : undefined;
          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
            return false;
          }
        }
      }
      return true;
    };

    return baseIsMatch;
  };
  
  window.j2.mod._._137 = function (){
    var baseIsMatch = new window.j2.mod._._134,
        getMatchData = new window.j2.mod._._173,
        toObject = new window.j2.mod._._193;

    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        var key = matchData[0][0],
            value = matchData[0][1];

        return function (object) {
          if (object == null) {
            return false;
          }
          return object[key] === value && (value !== undefined || (key in toObject(object)));
        };
      }
      return function (object) {
        return baseIsMatch(object, matchData);
      };
    };

    return baseMatches;
  };

  window.j2.mod._._138 = function (){
    var baseGet = new window.j2.mod._._130,
        baseIsEqual = new window.j2.mod._._132,
        baseSlice = new window.j2.mod._._145,
        isArray = new window.j2.mod._._197,
        isKey = new window.j2.mod._._179,
        isStrictComparable = new window.j2.mod._._183,
        last = new window.j2.mod._._87,
        toObject = new window.j2.mod._._193,
        toPath = new window.j2.mod._._194;

    function baseMatchesProperty(path, srcValue) {
      var isArr = isArray(path),
          isCommon = isKey(path) && isStrictComparable(srcValue),
          pathKey = (path + '');

      path = toPath(path);
      return function (object) {
        if (object == null) {
          return false;
        }
        var key = pathKey;
        object = toObject(object);
        if ((isArr || !isCommon) && !(key in object)) {
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          if (object == null) {
            return false;
          }
          key = last(path);
          object = toObject(object);
        }
        return object[key] === srcValue
          ? (srcValue !== undefined || (key in object))
          : baseIsEqual(srcValue, object[key], undefined, true);
      };
    };

    return baseMatchesProperty;
  };

  window.j2.mod._._141 = function () {
    function baseProperty(key) {
      return function (object) {
        return object == null ? undefined : object[key];
      };
    };

    return baseProperty;
  };

  window.j2.mod._._142 = function (){
      var baseGet = new window.j2.mod._._130,
          toPath = new window.j2.mod._._194;

      function basePropertyDeep(path) {
        var pathKey = (path + '');
        path = toPath(path);
        return function (object) {
          return baseGet(object, path, pathKey);
        };
      };

      return basePropertyDeep;
  };
  
  window.j2.mod._._143 = function (){
      function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
        eachFunc(collection, function (value, index, collection) {
          accumulator = initFromCollection
            ? (initFromCollection = false, value)
            : iteratee(accumulator, value, index, collection);
        });
        return accumulator;
      };

      return baseReduce;
  };
  
  window.j2.mod._._145 = function (){
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    };

    return baseSlice;
  };

  window.j2.mod._._147 = function (){
    function baseToString(value) {
      return value == null ? '' : (value + '');
    };

    return baseToString;
  };
  
  window.j2.mod._._149 = function () {
    var identity = new window.j2.mod._._214;
    return (
      function bindCallback(func, thisArg, argCount) {
        if (typeof func != 'function') {
          return identity;
        }
        if (thisArg === undefined) {
          return func;
        }
        switch (argCount) {
          case 1: return function (value) {
            return func.call(thisArg, value);
          };
          case 3: return function (value, index, collection) {
            return func.call(thisArg, value, index, collection);
          };
          case 4: return function (accumulator, value, index, collection) {
            return func.call(thisArg, accumulator, value, index, collection);
          };
          case 5: return function (value, other, key, object, source) {
            return func.call(thisArg, value, other, key, object, source);
          };
        }
        return function () {
          return func.apply(thisArg, arguments);
        };
      }
    );
  };

  window.j2.mod._._152 = function (){
    var nativeMax = Math.max;

    function composeArgs(args, partials, holders) {
      var holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          leftIndex = -1,
          leftLength = partials.length,
          result = Array(leftLength + argsLength);

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
      while (argsLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    };

    return composeArgs;
  };
  
  window.j2.mod._._153 = function (){
    var nativeMax = Math.max;
    
    function composeArgsRight(args, partials, holders) {
      var holdersIndex = -1,
          holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          rightIndex = -1,
          rightLength = partials.length,
          result = Array(argsLength + rightLength);

      while (++argsIndex < argsLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
      return result;
    };

    return composeArgsRight;
  };  
  
  window.j2.mod._._155 = function (){
    var bindCallback = new window.j2.mod._._149,
        isIterateeCall = new window.j2.mod._._178,
        restParam = new window.j2.mod._._102;

    function createAssigner(assigner) {
      return restParam(function (object, sources) {
        var index = -1,
            length = object == null ? 0 : sources.length,
            customizer = length > 2 ? sources[length - 2] : undefined,
            guard = length > 2 ? sources[2] : undefined,
            thisArg = length > 1 ? sources[length - 1] : undefined;

        if (typeof customizer == 'function') {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == 'function' ? thisArg : undefined;
          length -= (customizer ? 1 : 0);
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    };

    return createAssigner;
  };
  
  window.j2.mod._._156 = function () {
    var getLength = new window.j2.mod._._172;
    var isLength = new window.j2.mod._._181;
    var toObject = new window.j2.mod._._193;

    function createBaseEach(eachFunc, fromRight) {
      return function (collection, iteratee) {
        var length = collection ? getLength(collection) : 0;
        if (!isLength(length)) {
          return eachFunc(collection, iteratee);
        }
        var index = fromRight ? length : -1,
            iterable = toObject(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    };

    return createBaseEach;
  };

  window.j2.mod._._157 = function () {
    var toObject = new window.j2.mod._._193;

    function createBaseFor(fromRight) {
      return function (object, iteratee, keysFunc) {
        var iterable = toObject(object),
            props = keysFunc(object),
            length = props.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length)) {
          var key = props[index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    };

    return createBaseFor;
  };

  window.j2.mod._._161 = function (){
    var baseCallback = new window.j2.mod._._116,
        baseFind = new window.j2.mod._._124,
        baseFindIndex = new window.j2.mod._._125,
        isArray = new window.j2.mod._._197;

    function createFind(eachFunc, fromRight) {
      return function (collection, predicate, thisArg) {
        predicate = baseCallback(predicate, thisArg, 3);
        if (isArray(collection)) {
          var index = baseFindIndex(collection, predicate, fromRight);
          return index > -1 ? collection[index] : undefined;
        }
        return baseFind(collection, predicate, eachFunc);
      };
    };

    return createFind;    
  };
  
  window.j2.mod._._162 = function () {
    var bindCallback = new window.j2.mod._._149,
    isArray = new window.j2.mod._._197;

    return (function createForEach(arrayFunc, eachFunc) {
      return function (collection, iteratee, thisArg) {
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
          ? arrayFunc(collection, iteratee)
          : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
      };
    });
  };

  window.j2.mod._._165 = function (){
      var baseCallback = new window.j2.mod._._116,
          baseReduce = new window.j2.mod._._143,
          isArray = new window.j2.mod._._197;

      function createReduce(arrayFunc, eachFunc) {
        return function (collection, iteratee, accumulator, thisArg) {
          var initFromArray = arguments.length < 3;
          return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
            ? arrayFunc(collection, iteratee, accumulator, initFromArray)
            : baseReduce(collection, baseCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
        };
      };

      return createReduce;
  };
  
  window.j2.mod._._167 = function (){
    var arraySome = new window.j2.mod._._113;

    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }

      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index],
            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

        if (result !== undefined) {
          if (result) {
            continue;
          }
          return false;
        }

        if (isLoose) {
          if (!arraySome(other, function (othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
            return false;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
          return false;
        }
      }
      return true;
    };

    return equalArrays;
  };
  
  window.j2.mod._._168 = function (){
    var boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        numberTag = '[object Number]',
        regexpTag = '[object RegExp]',
        stringTag = '[object String]';

    function equalByTag(object, other, tag) {
      switch (tag) {
        case boolTag:
        case dateTag:

          return +object == +other;

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case numberTag:
          return (object != +object)
            ? other != +other
            : object == +other;

        case regexpTag:
        case stringTag:

          return object == (other + '');
      }
      return false;
    };

    return equalByTag;
  };
  
  window.j2.mod._._169 = function (){
    var keys = new window.j2.mod._._207;

    var objectProto = Object.prototype;

    var hasOwnProperty = objectProto.hasOwnProperty;

    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var skipCtor = isLoose;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key],
            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;

        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (!skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    };

    return equalObjects;
  };

  window.j2.mod._._172 = function () {
    var baseProperty = new window.j2.mod._._141;

    var getLength = baseProperty('length');

    return getLength;
  };

  window.j2.mod._._173 = function () {
    var isStrictComparable = new window.j2.mod._._183,
        pairs = new window.j2.mod._._211;

    function getMatchData(object) {
      var result = pairs(object),
          length = result.length;

      while (length--) {
        result[length][2] = isStrictComparable(result[length][1]);
      }
      return result;
    };

    return getMatchData;
  };

  window.j2.mod._._174 = function () {
    var isNative = new window.j2.mod._._199;

    function getNative(object, key) {
      var value = object == null ? undefined : object[key];
      return isNative(value) ? value : undefined;
    };

    return getNative;
  };

  window.j2.mod._._176 = function () {
    var getLength = new window.j2.mod._._172;
    var isLength = new window.j2.mod._._181;

    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    };

    return isArrayLike;
  };

  window.j2.mod._._177 = function () {
    
    var reIsUint = /^\d+$/;


    var MAX_SAFE_INTEGER = 9007199254740991;


    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    };

    return isIndex;
  };

  window.j2.mod._._178 = function (){
    var isArrayLike = new window.j2.mod._._176,
        isIndex = new window.j2.mod._._177,
        isObject = new window.j2.mod._._201;

    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)) {
        var other = object[index];
        return value === value ? (value === other) : (other !== other);
      }
      return false;
    };

    return isIterateeCall;
  };
  
  window.j2.mod._._179 = function (){
      var isArray = new window.j2.mod._._197,
          toObject = new window.j2.mod._._193;

      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
          reIsPlainProp = /^\w*$/;

      function isKey(value, object) {
        var type = typeof value;
        if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
          return true;
        }
        if (isArray(value)) {
          return false;
        }
        var result = !reIsDeepProp.test(value);
        return result || (object != null && value in toObject(object));
      };

      return isKey;
  };
  
  window.j2.mod._._181 = function () {

    var MAX_SAFE_INTEGER = 9007199254740991;

    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    };

    return isLength;
  };

  window.j2.mod._._182 = function () {
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    };

    return isObjectLike;
  };

  window.j2.mod._._183 = function (){
    var isObject = new window.j2.mod._._201;

    function isStrictComparable(value) {
      return value === value && !isObject(value);
    };

    return isStrictComparable;
  };

  window.j2.mod._._186 = function (){
    var toObject = new window.j2.mod._._193;

    function pickByArray(object, props) {
      object = toObject(object);

      var index = -1,
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
      return result;
    };

    return pickByArray;
  };
  
  window.j2.mod._._187 = function (){
      var baseForIn = new window.j2.mod._._128;

      function pickByCallback(object, predicate) {
        var result = {};
        baseForIn(object, function (value, key, object) {
          if (predicate(value, key, object)) {
            result[key] = value;
          }
        });
        return result;
      };

      return pickByCallback;
  };  
  
  window.j2.mod._._190 = function (){
    var PLACEHOLDER = '__lodash_placeholder__';
    
    function replaceHolders(array, placeholder) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        if (array[index] === placeholder) {
          array[index] = PLACEHOLDER;
          result[++resIndex] = index;
        }
      }
      return result;
    };

    return replaceHolders;
  };  
  window.j2.mod._._192 = function () {
    var isArguments = new window.j2.mod._._196;
    var isArray = new window.j2.mod._._197;
    var isIndex = new window.j2.mod._._177;
    var isLength = new window.j2.mod._._181;
    var keysIn = new window.j2.mod._._208;

    var objectProto = Object.prototype;

    var hasOwnProperty = objectProto.hasOwnProperty;

    function shimKeys(object) {
      var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;

      var allowIndexes = !!length && isLength(length) &&
        (isArray(object) || isArguments(object));

      var index = -1,
          result = [];

      while (++index < propsLength) {
        var key = props[index];
        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      };
      return result;
    };

    return shimKeys;
  };

  window.j2.mod._._193 = function () {
    var isObject = new window.j2.mod._._201;

    function toObject(value) {
      return isObject(value) ? value : Object(value);
    };

    return toObject;
  };

  window.j2.mod._._194 = function (){
    var baseToString = new window.j2.mod._._147,
        isArray = new window.j2.mod._._197;

    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

    var reEscapeChar = /\\(\\)?/g;

    function toPath(value) {
      if (isArray(value)) {
        return value;
      }
      var result = [];
      baseToString(value).replace(rePropName, function (match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    };

    return toPath;
  };

  window.j2.mod._._196 = function () {
    var isArrayLike = new window.j2.mod._._176;
    var isObjectLike = new window.j2.mod._._182;

    var objectProto = Object.prototype;

    var hasOwnProperty = objectProto.hasOwnProperty;

    var propertyIsEnumerable = objectProto.propertyIsEnumerable;

    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) &&
        hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    };

    return isArguments;
  };

  window.j2.mod._._197 = function () {
    var getNative = new window.j2.mod._._174;
    var isLength = new window.j2.mod._._181;
    var isObjectLike = new window.j2.mod._._182;

    var arrayTag = '[object Array]';

    var objectProto = Object.prototype;

    var objToString = objectProto.toString;

    var nativeIsArray = getNative(Array, 'isArray');

    var isArray_ = nativeIsArray || function (value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };


    return isArray_;


  };

  window.j2.mod._._198 = function () {
    var isObject = new window.j2.mod._._201;

    var funcTag = '[object Function]';

    var objectProto = Object.prototype;

    var objToString = objectProto.toString;

    function isFunction(value) {
      return isObject(value) && objToString.call(value) == funcTag;
    };

    return isFunction;
  };

  window.j2.mod._._199 = function () {
    var isFunction = new window.j2.mod._._198;
    var isObjectLike = new window.j2.mod._._182;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var objectProto = Object.prototype;
    var fnToString = Function.prototype.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;

    var reIsNative = RegExp('^' +
      fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (isFunction(value)) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    };

    return isNative;
  };
  window.j2.mod._._200 = function () {
    var isObjectLike = new window.j2.mod._._182;
    var numberTag = '[object Number]';
    var objectProto = Object.prototype;
    var objToString = objectProto.toString;

    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
    };

    return isNumber;    
  };
  
  window.j2.mod._._201 = function () {
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    };

    return isObject;
  };
  
  window.j2.mod._._203 = function () {
    var isObjectLike = new window.j2.mod._._182;

    var stringTag = '[object String]';


    var objectProto = Object.prototype;

    var objToString = objectProto.toString;

    function isString(value) {
      return typeof value === 'string' || (isObjectLike(value) && objToString.call(value) === stringTag);
    };

    return isString;
  };
  
  window.j2.mod._._204 = function (){
    var isLength = new window.j2.mod._._181,
        isObjectLike = new window.j2.mod._._182;

    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dateTag] = typedArrayTags[errorTag] =
    typedArrayTags[funcTag] = typedArrayTags[mapTag] =
    typedArrayTags[numberTag] = typedArrayTags[objectTag] =
    typedArrayTags[regexpTag] = typedArrayTags[setTag] =
    typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

    var objectProto = Object.prototype;

    var objToString = objectProto.toString;

    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    };

    return isTypedArray;
  };
  
  window.j2.mod._._206 = function () {
    var assignWith = new window.j2.mod._._114,
        baseAssign = new window.j2.mod._._115,
        createAssigner = new window.j2.mod._._155;

    var assign = createAssigner(function (object, source, customizer) {
      return customizer
        ? assignWith(object, source, customizer)
        : baseAssign(object, source);
    });

    return assign;    
  };
  
  window.j2.mod._._207 = function () {
    var getNative = new window.j2.mod._._174;
    var isArrayLike = new window.j2.mod._._176;
    var isObject = new window.j2.mod._._201;
    var shimKeys = new window.j2.mod._._192;

    var nativeKeys = getNative(Object, 'keys');

    var keys_ = !nativeKeys ? shimKeys : function (object) {
      var Ctor = object == null ? undefined : object.constructor;
      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
          (typeof object != 'function' && isArrayLike(object))) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };


    return keys_;

  };

  window.j2.mod._._208 = function () {
    var isArguments = new window.j2.mod._._196;
    var isArray = new window.j2.mod._._197;
    var isIndex = new window.j2.mod._._177;
    var isLength = new window.j2.mod._._181;
    var isObject = new window.j2.mod._._201;



    var objectProto = Object.prototype;


    var hasOwnProperty = objectProto.hasOwnProperty;

    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = (length && isLength(length) &&
        (isArray(object) || isArguments(object)) && length) || 0;

      var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;

      while (++index < length) {
        result[index] = (index + '');
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) &&
            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    };

    return keysIn;
  };

  window.j2.mod._._211 = function (){
      var keys = new window.j2.mod._._207,
          toObject = new window.j2.mod._._193;

      function pairs(object) {
        object = toObject(object);

        var index = -1,
            props = keys(object),
            length = props.length,
            result = Array(length);

        while (++index < length) {
          var key = props[index];
          result[index] = [key, object[key]];
        }
        return result;
      };

      return pairs;
  };
  
  window.j2.mod._._212 = function (){
      var baseFlatten = new window.j2.mod._._126,
          bindCallback = new window.j2.mod._._149,
          pickByArray = new window.j2.mod._._186,
          pickByCallback = new window.j2.mod._._187,
          restParam = new window.j2.mod._._102;

      var pick = restParam(function (object, props) {
        if (object == null) {
          return {};
        }
        return typeof props[0] == 'function'
          ? pickByCallback(object, bindCallback(props[0], props[1], 3))
          : pickByArray(object, baseFlatten(props));
      });

      return pick;
  };
  
  window.j2.mod._._214 = function () {
    function identity(value) {
      return value;
    };

    return identity;
  };
  
  window.j2.mod._._216 = function (){
    var baseProperty = new window.j2.mod._._141,
        basePropertyDeep = new window.j2.mod._._142,
        isKey = new window.j2.mod._._179;

    function property(path) {
      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
    };

    return property;
  };
  
  window.j2.mod._._233 = function(){
      var innerHTMLBug = false;
      var bugTestDiv;
      if (typeof document !== 'undefined') {
        bugTestDiv = document.createElement('div');
        bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
        innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
        bugTestDiv = undefined;
      }


      var map = {
        legend: [1, '<fieldset>', '</fieldset>'],
        tr: [2, '<table><tbody>', '</tbody></table>'],
        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
        _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
      };

      map.td =
      map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

      map.option =
      map.optgroup = [1, '<select multiple="multiple">', '</select>'];

      map.thead =
      map.tbody =
      map.colgroup =
      map.caption =
      map.tfoot = [1, '<table>', '</table>'];

      map.polyline =
      map.ellipse =
      map.polygon =
      map.circle =
      map.text =
      map.line =
      map.path =
      map.rect =
      map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'];

      function parse(html, doc) {
        if ('string' != typeof html) throw new TypeError('String expected');

        if (!doc) doc = document;

        var m = /<([\w:]+)/.exec(html);
        if (!m) return doc.createTextNode(html);

        html = html.replace(/^\s+|\s+$/g, '');

        var tag = m[1];

        if (tag == 'body') {
          var el = doc.createElement('html');
          el.innerHTML = html;
          return el.removeChild(el.lastChild);
        }

        var wrap = map[tag] || map._default;
        var depth = wrap[0];
        var prefix = wrap[1];
        var suffix = wrap[2];
        var el = doc.createElement('div');
        el.innerHTML = prefix + html + suffix;
        while (depth--) el = el.lastChild;

        if (el.firstChild == el.lastChild) {
          return el.removeChild(el.firstChild);
        }

        var fragment = doc.createDocumentFragment();
        while (el.firstChild) {
          fragment.appendChild(el.removeChild(el.firstChild));
        }

        return fragment;
      }      
      
      return parse;
    };
  
  String.prototype.captFirst = function(){ //wmg
    var _ar = this.split(' ');
    var r;
    for(var i = 0; i < 1; i++)
      _ar[i] = _ar[i].charAt(0).toUpperCase() + _ar[i].slice(1).toLowerCase();    
    return _ar.join(' ');
  };  
  String.prototype.capt = function(){
    var _ar = this.split(' ');
    var r;
    for(var i = 0; i < _ar.length; i++)
      _ar[i] = _ar[i].length < 3 ? _ar[i].toLowerCase() :_ar[i].charAt(0).toUpperCase() + _ar[i].slice(1).toLowerCase();    // ndlg2
    return _ar.join(' ');
  };
  String.prototype.jQId = function(){
    var tmp = this.split('.').join('\\.').split('@').join('\\@').split('#').join('\\#');
    if(tmp.startsWith('\\#'))
      tmp = tmp.substring(1);
    return tmp;
  };
  String.prototype.itemId = function(){
    return this.substring(0, this.length-1);
  };
  String.prototype.trimSpaces = function(){
    var _ = this.split(' ');
    var i = 0;
    do{
      if((_[i].length ===0) || (_[i]===[10].fromASCII()))
        _.splice(i, 1);
      else
        i++;
    }while(i < _.length);
        
    return _.join(' ');;
  };
    String.prototype.hashCode = function() {// as2
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
  
  Array.prototype.fromASCII = function(){
    var _ = [];
    this.map(function(c){
      _.push(String.fromCharCode(c));
    });
    return _.join('');
  };
    
  Array.prototype.joinListE = function(applyEachString){ // ndlg2
    var isString = new window.j2.mod._._203;
    var isFunction = new window.j2.mod._._198; // pl
    
    this.sort();
    
    var _ = [];
    this.map(function(c){
      if(! isString( c )){
        throw new Error('####Erro: jonListE supports only string elemetns');
        return '####Erro: jonListE supports only string elemetns';
      }
    });
    
    var tx = ''; 
    var txT = '';
    for(var i = 0; i < this.length; i++){
      txT = (tx.length) ? ( (i===this.length-1)? ' e ': ', ' ) + this[i] : this[i];
      tx += (applyEachString) ? ( isString(applyEachString) ? txT[applyEachString]() : ( isFunction(applyEachString) ? applyEachString(txT) : txT ) ) : txT ;
    }
    
    return tx;
  };

  window.j2.mod._.codificarNomeTarefa = function(tarefa){
    return encodeURI(tarefa).replace(/[()]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  window.j2.mod._.prepararLinkTarefa = function (nomeTarefaNaoCodificado, criterios, searchString) {
    const codificarNomeTarefa = j2.mod._.codificarNomeTarefa

    const hashAngularTarefaComCriterios = `https://pje.tjma.jus.br/pje/ng2/dev.seam${
      searchString ? `?${searchString}` : ''}#/painel-usuario-interno/lista-processos-tarefa/${
      codificarNomeTarefa(
        nomeTarefaNaoCodificado
    )}/${encodeURIComponent(btoa(JSON.stringify(criterios)))}`

    return hashAngularTarefaComCriterios
  }
  
  window.j2.mod._._capitalizeFirstLetter = function (string) {
    return string.capt();
  };
  
  window.j2.mod._._j2TagsConverter = function(text){
    var pPat = /\((.*?)\)/;
    while(text.indexOf('#:')!==-1){
      var v = text.split('#:');
      var _ = '';
      var inTagCount = 0;
      for(var i = 1; i < v.length; i++)
        if (_.length){
          _ += '#:' + v[i];
          inTagCount++;
          if(v[i].indexOf('}')!==-1)
            if(_.split('{').length === _.split('}').length)
              break;
        }
        else{
          _ = v[i];
          if(v[i].indexOf('}')!==-1)
            if(_.split('{').length === _.split('}').length)
              break;
        }
      
      v = _;
      

      v = v.split('}');
      _ = [];
      for(var i = 0; i <= inTagCount; i++)
        _[i] = v[i];

      var __ = _[0].split('{');
      var tag = __[0];
      for(var j = 1; j < __.length; j++)
        if(j===1)
          _[0] = __[j];
        else
          _[0] += '{' + __[j];
      
      
      v = _.join('}');
      
      var vn = v;
      var rep;
      
      vn = '#:' + tag + '{' + vn + '}';
      tag = (tag.indexOf('@')===-1) ? tag : tag.replace('@', ' id="') +'"';
      tag = (tag.indexOf('!')===-1) ? tag : tag.replace('!', ' name="') +'"';
      /*if(tag.match(pPat)[1].length!==0){
        var att = tag.match(pPat)[1];
        tag = tag.replace('(' + tag.match(pPat)[1] + ')', ' name="') +'"';  
      }*/
      rep = (tag!=='BR')  ?  '<'+tag+'>' + v + '</'+tag.split(' ')[0]+'>'  :  '<'+tag+'>' ;
      text = text.replace(vn, rep);
    }
    return text;
  };
  
})();


