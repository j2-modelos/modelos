/* 
 * Arquivo RUN para fonte de dados baseados em objeto javascript
 */

console.log('run.js - módulo compilante');

var _window = (j2.api && j2.api.winExt) ? j2.api.winExt : window; //mc
var _windowDocument = (j2.api && j2.api.winExt) ? j2.api.winExt.document : window.document; //mc

setInterval(function() {   
    
  var keys = [];
  var fg = false;
  var C_LIB_PREFIX = 'ROOT/res';
  

  
  function lg(m){console.log(m);};
  var i = 0;
  var _f = false;
  while(localStorage.key(i)){
    var it = localStorage.key(i);
    if(it.indexOf(C_LIB_PREFIX)===0){
      _f = true;
      
      localStorage.removeItem(it);
      lg('obsoleto: removido ' + it);        
    }
    else
      i++;
  };

  if(_f)
    lg('Limpeza completa');
  
}, 10000);

(function(){
  if(!(j2.env.j2U)){
    j2.env.j2U = {
      log : function(){},
      progBar : function(){}
    };
  }
  
  /*
  if(!(j2.env.j2U.isUpdating)){
    j2.env.j2U.log = function(txt){};
    j2.env.j2U.progBar = function(val){};
    return;
  }*/
  
  j2.env.j2U.log = function(txt){
    var pp = document.createElement('p');
    pp.classList.add('pLog');
    pp.innerHTML = txt;
    _window.document.getElementById('upLog').appendChild(pp);
    //jQ(window.document.body).find('#upLog')[0].append(jQ('<p/>', {text : txt, class : 'pLog'})[0]);
  };
  j2.env.j2U.progBar = function(val){
    jQ(_window.document.getElementById('uBar')).css('width', val +'%');
    jQ(_window.document.getElementById('uBar')).text(val*1+'%');
  };
  
  var css = '<style id="uS1">.pLog{font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;text-align:center; margin: 0; font-weight:bold;} .divCont{width:100%;margin: auto;text-align: center;}.svg-preloader{margin:auto;font-size:0;display:inline-block;-webkit-animation:outer 6.6s linear infinite;animation:outer 6.6s linear infinite} .svg-preloader svg{-webkit-animation:inner 1.32s linear infinite;animation:inner 1.32s linear infinite}.svg-preloader svg  circle{fill:none;stroke:#448AFF;stroke-linecap:square;-webkit-animation:arc 1.32s cubic-bezier(.8,0,.4,.8) infinite;animation:arc 1.32s cubic-bezier(.8,0,.4,.8) infinite}@-webkit-keyframes outer{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes outer{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes inner{0%{-webkit-transform:rotate(-100.8deg);transform:rotate(-100.8deg)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes inner{0%{-webkit-transform:rotate(-100.8deg);transform:rotate(-100.8deg)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}@-webkit-keyframes arc{0%{stroke-dasharray:1 210.49px;stroke-dashoffset:0}40%{stroke-dasharray:151.55px,210.49px;stroke-dashoffset:0}100%{stroke-dasharray:1 210.49px;stroke-dashoffset:-151.55px}}@keyframes arc{0%{stroke-dasharray:1 210.49px;stroke-dashoffset:0}40%{stroke-dasharray:151.55px,210.49px;stroke-dashoffset:0}100%{stroke-dasharray:1 210.49px;stroke-dashoffset:-151.55px}}</style>';
  var css2 = '<style id="uS2">#uBar {border-radius: 5px; width: 1%; height: 15px; background-color: #448aff;; text-align: center;  line-height: 15px;   color: white;     font-size: 10px; font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;} #uProg { border-radius: 5px; width: 20%; margin:auto; background-color: #bbd0f3;; }</style>';
  var html = '<div id="uDiv"><div class="divCont"><div class="svg-preloader"><svg version="1.1" height="30" width="30" viewBox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"></circle></svg></div></div><div id="uProg"><div id="uBar"></div> </div><div id="upLog"></div></div>';
  
  if(jQ('uS1')) jQ('uS1').remove();
  if(jQ('uS2')) jQ('uS2').remove();
  if(jQ('uDiv')) jQ('uDiv').remove();
  
  jQ(css).appendTo(_window.document.body);
  jQ(css2).appendTo(_window.document.body);
  jQ(html).appendTo(_window.document.body);

  j2.env.j2U.log('Carregando Modelo j2');
  j2.env.j2U.log('dados: javascript');
  j2.env.j2U.progBar(10);
  j2.env.j2U.log('run.js');
    
})();

/*
 * Procedimento remove as operações que realizam o processamento do conteúdo
 * quando se realiza um comando de ctrl + v
 * @returns {undefined}
 */
(function(){
  var w = window.parent;
  
  if(w.removeHTMLForms){ w.removeHTMLForms = function(){
      console.log('j2 removed functionality of removeHTMLForms ');
    };
  }
  if(w.removeHTMLComponent){ w.removeHTMLComponent = function(){
      console.log('j2 removed functionality of removeHTMLComponent ');
    }; 
  }
  if(w.removerTagHTML){ w.removerTagHTML = function(){
      console.log('j2 removed functionality of removerTagHTML ');
    };
  }
  if(w.removeCaracterEspecial){ w.removeCaracterEspecial = function(){
      console.log('j2 removed functionality of removeCaracterEspecial ');
    };
  }
  
  console.log('j2 removed functionalities for processing post ctrl + v ');
})();

/*(function(){
  function lg(t){
    console.log(t);
  };
  
  lg('Rontina de atualizacao de arquivos armazenados no armazenamento local obsoletos.');
  
  var keys = [];
  var fg = false;
  var C_LIB_PREFIX = 'ROOT';
  
  lg('Requested localStorage cleaning.');
  
  
  var i = 0;
  while(localStorage.key(i)){
    var it = localStorage.key(i);
    if(it.indexOf(C_LIB_PREFIX)===0){
      localStorage.setItem('rmv_'+ it, localStorage.getItem(it));
      
      localStorage.removeItem(it);
      lg('obsoleto: removido ' + it);        
    }
    else
      i++;
  };
    
})();*/

/* simple modules definitions */
(function () {
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

    var fireLogging = true

    function EventBus() {
      this._listeners = {};
      this._fireLogging = []
      if(!fireLogging)
      this._fireLogging = 'DISABLED'

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

      var _toLog = {}
      _toLog[type] = undefined
      if(fireLogging)
        this._fireLogging.push(_toLog)

      listeners = this._listeners[type];

      if (!listeners) {
        return;
      }

      _toLog[type] = listeners

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

  class SimpleLocalDate extends Date {
    constructor(dateString) {
      // Verificar se a dateString é nula ou vazia
      if (!dateString) {
        super(); // Usar a data e hora atuais
      } else {
        super(dateString); // Usar a dateString fornecida
      }
  
      // Configurar a data sem fuso horário
      this.setUTCHours(0, 0, 0, 0);
    }
  
    getDay() {
      return this.getUTCDay();
    }
    
    getDate() {
      return this.getUTCDate();
    }

    getMonth() {
      return this.getUTCMonth(); 
    }
  
    getYear() {
      return this.getUTCFullYear();
    }
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
      //tag = (tag.indexOf('@')===-1) ? tag : tag.replace('@', ' id="') +'"';
      if(tag.indexOf('@')!==-1){
        if(tag.indexOf('[')===-1){
          tag = tag.replace('@', ' id="') +'"'
        }
        else{
          const startIndex = tag.indexOf('@') + 1;
          const endIndex = tag.indexOf('[');
          const id = tag.substring(startIndex, endIndex);
  
          tag = tag.replace(`@${id}`, ` id="${id}"`)
        }
      }

      tag = (tag.indexOf('!')===-1) ? tag : tag.replace('!', ' name="') +'"';

      if(tag.indexOf('[')!==-1){
        function styleSetter(element, classesAsString){
          classesAsString.split(' ').forEach(function(clss){
            j2.mod.builder.getStyleClass(clss).prop.forEach(function(prop){
              if(element.style[prop.name] !== 'undefinied')
                element.style[prop.name] = prop.value;
              else
                j2.log('A propriedade ' + prop.value + ' não pode ser associada às definições de estilo. Classe: ' + clss);
            });
          });
        };

        const startIndex = tag.indexOf('[') + 1;
        const endIndex = tag.indexOf(']');
        const classList = tag.substring(startIndex, endIndex);

        let _div = document.createElement('div')
        styleSetter(_div, classList)
        const tagStyle = _div.getAttribute('style');
        delete _div

        tag = tag.replace(`[${classList}]`, ` style="${tagStyle}"`)
      }
      
      
      /*if(tag.match(pPat)[1].length!==0){
        var att = tag.match(pPat)[1];
        tag = tag.replace('(' + tag.match(pPat)[1] + ')', ' name="') +'"';  
      }*/
      rep = (tag!=='BR')  ?  '<'+tag+'>' + v + '</'+tag.split(' ')[0]+'>'  :  '<'+tag+'>' ;
      text = text.replace(vn, rep);
    }
    return text;
  };
  
  window.j2.mod._._opW = {
     center : function(url, name, idProcesso, winSize, scrolled, callback, altTitle){ // wa
        if(name){
          if(idProcesso)
            name+=idProcesso;
        }
        else
          name='aW';
      
        var w = screen.width * 0.6;
        var h = screen.height * 0.6; 
        var lf = (screen.width / 2) - (w /2);
        var tp = (screen.height / 2) - (h / 2);
        var prm; 
        if(winSize)
          prm = 'width=' + winSize.width + ', height=' + winSize.height + ', top=' + tp + ', left='+lf;
        else
          prm = 'width=' + w + ', height=' + h + ', top=' + tp + ', left='+lf;
        
        if(scrolled){
          if(scrolled===true)
            prm += ', scrollbars=1';
        }
        else
          prm += ', scrollbars=1';
      
        var win = window.open(url,name,prm) ;
        win.focus();
        if(callback) // wa
          setTimeout(function(){
            callback();
            win.focus();
          }, 250); //wa
        
        var flg = false;
        setInterval(function(){
          win.document && (win.document.title = 'j2 ' + (flg ? j2.env.PJeVars.processo.numeroCurto : (altTitle || name) ));
          flg = !flg;
        }, 1500);
        
        
        return win;
      },
      corner : function(url, name, idProcesso, winSize, scrolled, callback, altTitle){ // pdf as new
        if(name){
          if(idProcesso)
            name+=idProcesso;
        }
        else
          name='aW';
      
        var w = screen.width * 0.6;
        var h = screen.height * 0.6; 
        var lf = screen.width;
        var tp = screen.height;
        var prm; 
        if(winSize)
          prm = 'width=' + winSize.width + ', height=' + winSize.height + ', top=' + tp + ', left='+lf;
        else
          prm = 'width=' + w + ', height=' + h + ', top=' + tp + ', left='+lf;
        
        if(scrolled){
          if(scrolled===true)
            prm += ', scrollbars=1';
        }
        else
          prm += ', scrollbars=1';
      
        var win = window.open(url,name,prm) ;
        if(callback) // wa
          setTimeout(function(){
            callback();
          }, 250); //wa
        
        var flg = false;
        setInterval(function(){
          win.document.title = 'j2 ' + (flg ? j2.env.PJeVars.processo.numeroCurto : (altTitle || name) );
          flg = !flg;
        }, 1500);
        
        
        return win;
      }
  };

  window.j2.mod._._formatarISOStringDataParaDataPorExtenso = function(isoDate){
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const date = new SimpleLocalDate(isoDate);

    // Verificar se a data é inválida
    if (isNaN(date.getTime())) {
      return '[DATA INVÁLIDA]';
    }

    date.setUTCHours(0, 0, 0, 0);
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const formattedDate = `${day} de ${months[monthIndex]} de ${year}`;
    return formattedDate;
  }
  
  if (_windowDocument.getElementById('PJeVarsXML'))
    window.j2.mod._.PJeVars = new DOMParser().parseFromString(_windowDocument.getElementById('PJeVarsXML').innerHTML, 'text/html');
  else if (j2?.api?.PJeVarsHTML)
    window.j2.mod._.PJeVars = new DOMParser().parseFromString(j2?.api?.PJeVarsHTML, 'text/html');
  else
    console.error('PJeVarsXML não foi localizado');
})();

window.j2.mod._._parseVar = function (var_, argsArray) {
  var isFunction = new window.j2.mod._._198; // pl 
  
  var v = var_.split('#{')[1];
  v = v.split('}')[0];
  v = v.split('.');
  var _='', r;
  /* index 0 must always be j2 */
  try{
    for(var i = 1; i < v.length; i++){
      _ = (_)?_[v[i]] : j2[v[i]];
      _ = isFunction(_) ? ( argsArray ? _.apply(null, argsArray) : _() ) : _; // pl
    }     
    r = _;
  }catch(e){
    r = 'ERRO AO PROCESSAR: ' + v.join('.');
  }
  return r;
};

window.j2.mod._._j2JSON = function () { // ndlg2
  
  var _parse    = window.j2.mod._._j2JSONparse;
  var _stringfy = function(_val){
    return JSON.stringify(_val).split('"').join("'");
  };
  
  return {
    parse : function(val){
      return _parse(val);
    },
    stringify : function(val){
      return _stringfy(val);
    }
  };
};

window.j2.mod._._j2JSONparse = function (json) {
  if(json.match(/#{[A-Za-z0-9.]+}/g)) // ndlg2 as new
    json =  j2.mod.builder.parseVars(json);
  try{
    return JSON.parse(json.split("'").join('"'));
  }catch(e){
    debugger;
  }
};

window.j2.mod._._guid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

window.j2.mod._._conversation = { //wmg as new
  bomByHora : function(){
    var day = new Date();
    var hr = day.getHours();
    if (hr >= 0 && hr < 12) {
        return 'bom dia';
    } else if (hr >= 12 && hr <= 17) {
        return 'boa tarde';
    } else {
        return 'boa noite';
    }
  }
};

/* these are the noble modules */
(function () {
  if (window.j2.mod._ === 'undefined') {
    console.error('M�dulos simples n�o est�o carregaos. Imposs�vel carrega m�dulos nobres');
    return;
  }

  window.j2.mod.forEach = new window.j2.mod._._92;
  window.j2.mod.eventBus = new window.j2.mod._._42;
  window.j2.mod.inherits = new window.j2.mod._._86;
})();

window.j2.mod._._urlParseParams = function (url) {
  if(url.indexOf('?')===-1)
    return {};
  try{
    var _ = url.split('?')[1];
    _ = _.split('&');
    var r = {};
    
    for (var i = 0; i < _.length; i++)
      r[_[i].split('=')[0].toString()] = _[i].split('=')[1];
    
    return r;
  }catch(e){
    return {};
  }
};

window.j2.mod._._injectCSS = function (css) {
  var css_ = function(){
    return '<style type="text/css" id="' + css.fileName + '">' + JSON.parse(localStorage.getItem(css.lib)).content + '</style>';
  };

  window.j2.mod.forEach(css.injectWins, function(c){
    try{
      if(window.j2.modelo[c])
        if(window.j2.modelo[c].doc)
          window.jQ3(window.j2.modelo[c].doc.head).append(css_());
    }catch(e){
      
    }
  });
};

window.j2.mod._._injectScript = function (scrp, loc) {
  var css_ = function(){
    return '<script type="text/javascript" id="' + scrp.fileName + '">' + JSON.parse(localStorage.getItem(scrp.lib)).content + '</style>';
  };

  window.j2.mod.forEach(scrp.injectWins, function(c){
    try{
      if(window.j2.modelo[c])
        if(window.j2.modelo[c].doc)
          window.jQ3(window.j2.modelo[c].doc.head).append(css_());
    }catch(e){
      
    }
  });
};

window.j2.mod._._xmlDecode = function (xml) {
  return decodeURIComponent(escape(window.atob( xml ) ) ).replace("\ufeff", "");
};

window.j2.mod._.CookieJ2 = function (bn){
  var __COOKIES_EXPIRE_TIME___ = 1800/(60*60*34);
  var _cookies  = new window.j2.mod._._cookies;
  var _bn = bn;
  var _baseCookieName = function(){
        return _bn;
  };

  //return {cookies : {
  return {
    get : function(key){
      return _cookies.get(_baseCookieName() + '.' + key);
    },
    set : function(key, value){
      _cookies.set(_baseCookieName() + '.' + key, value, {expires: __COOKIES_EXPIRE_TIME___ });
    }
  };
  //}};
};

/* based in  js-cookie v3.0.1 | MIT */
window.j2.mod._._cookies = function () { // ard as new
  'use strict';

  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  /* eslint-enable no-var */
  
  var _doc = function(){
    return window.j2.modelo.edt.doc;
  };

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof _doc() === 'undefined') {
        return;
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (_doc().cookie =
        key + '=' + converter.write(value, key) + stringifiedAttributes);
    }

    function get (key) {
      if (typeof _doc() === 'undefined' || (arguments.length && !key)) {
        return;
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = _doc().cookie ? _doc().cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar;
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

};


window.j2.mod._._getJsonFromUrl = function (url) { // ndlg2
  if(!url) url = location.href;
  var question = url.indexOf("?");
  var hash = url.indexOf("#");
  if(hash===-1 && question===-1) return {};
  if(hash===-1) hash = url.length;
  var query = question===-1 || hash===question+1 ? url.substring(hash) : 
  url.substring(question+1,hash);
  var result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    part = part.split("+").join(" "); // replace every + with space, regexp-free version
    var eq = part.indexOf("=");
    var key = eq>-1 ? part.substr(0,eq) : part;
    var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
    var from = key.indexOf("[");
    if(from===-1) result[decodeURIComponent(key)] = val;
    else {
      var to = key.indexOf("]",from);
      var index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
};

window.j2.mod._._autoHide = function (mb) { // ndlg4
  var _mb = mb;
    
  return function(tf){
    if(typeof tf === 'undefined') // ndlg5
      tf = true;
    
    var _this = this;
    _mb.forEach(function(m){
      
      if(tf)
        $(_this[m]).hide();
      else
        $(_this[m]).show();
    });
  };
};

window.j2.mod._._del = function (_class) { // ndlg6
  var __class = _class;
    
  return function(){
    var ins = (__class['_'] || __class['instances']);
      if(typeof ins === 'undefined'){
        throw new Error(__class + ': nenhuma instância foi encontrada.');
        return;
      }
      
          
    var idx = ins.indexOf(this);
    ins.splice(idx, 1);
  };
};

window.j2.mod._._filterUnique = function (array, criteria) { // 
  var filter = new window.j2.mod._._90;
  
  var _sl = filter(array, criteria);
  return _sl.length ? _sl[0] : null;
};

window.j2.mod._._inherits = function(el, _, className, superClassName) { // tappac as new
  var isArray = new window.j2.mod._._197,
      isString = new window.j2.mod._._203,
      isObject = new window.j2.mod._._201,
      forEach = window.j2.mod.forEach;

  var _getSuperClasse = function(supName, thisObject){
    if(el._ && el._.ih__class__ && el._.ih__class__.super && el._.ih__class__.super[supName]){
      if(thisObject){
        _['$'+supName] = el._.ih__class__.super[supName]._this;
        return el._.ih__class__.super[supName]._this; 
      }
      else
        return el._.ih__class__.super[supName];
    }else
      return '[NO SUPER CLASSE]';
  };
  
  _.ih__class__ = {
    name : className,
    super : (function(){
      if(isString(superClassName)){
        return _getSuperClasse(superClassName, true);
      }
      if(isArray(superClassName)){
        var _ar = [];
        forEach(superClassName, function(spn){
          _ar.push(_getSuperClasse(spn, true));
        });
        return _ar;
      }
      
    })()
  };
      
  if(!(el._.ih__class__)){
    el._.ih__class__ = { 
      super : {}
    };
    el._.ih__class__.super[className] = {
      _this : _,
      super : '[NO SUPER CLASSE]'
    };
        
  }else
    el._.ih__class__.super[className] = {
      _this : _,
      super : (function(){
        if(isString(superClassName)){
          return _getSuperClasse(superClassName);
        }
        if(isArray(superClassName)){
          var _ar = [];
          forEach(superClassName, function(spn){
            _ar.push(_getSuperClasse(spn));
          });
          return _ar;
        }

      })()
    };

};

/*
 * Baseado no repositório Lockr
 * 
 * https://github.com/tsironis/lockr
 * 
 * adaptado para modelos j2
 * @returns {window.j2.mod._._Lockr.Lockr}
 */
window.j2.mod._._Lockr = function(prefix) { // tappac as new
  'use strict';
  
  var Lockr = {};

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/)
    {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0)
      ? Math.ceil(from)
      : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++)
      {
        if (from in this &&
            this[from] === elt)
          return from;
      }
      return -1;
    };
  }

  Lockr.prefix = prefix.slice(-1).includes('.') ? prefix : (prefix + '.');

  Lockr._getPrefixedKey = function(key, options) {
    options = options || {};

    if (options.noPrefix) {
      return key;
    } else {
      return this.prefix + key;
    }

  };

  Lockr.set = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    try {
      localStorage.setItem(query_key, JSON.stringify({"data": value}));
    } catch (e) {
      if (console) console.warn("Lockr didn't successfully save the '{"+ key +": "+ value +"}' pair, because the localStorage is full.");
    }
  };

  Lockr.get = function (key, missing, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
            if(localStorage[query_key]) {
              value = {data: localStorage.getItem(query_key)};
            } else{
                value = null;
            }
    }
    
    if(!value) {
      return missing;
    }
    else if (typeof value === 'object' && typeof value.data !== 'undefined') {
      return value.data;
    }
  };

  Lockr.sadd = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json;

    var values = Lockr.smembers(key);

    if (values.indexOf(value) > -1) {
      return null;
    }
    
    for(var i = 0; i < values.length; i++){
      if (JSON.stringify(values[i]) === JSON.stringify(value) )
        return;
    }

    try {
      values.push(value);
      json = JSON.stringify({"data": values});
      localStorage.setItem(query_key, json);
    } catch (e) {
      console.log(e);
      if (console) console.warn("Lockr didn't successfully add the "+ value +" to "+ key +" set, because the localStorage is full.");
    }
  };

  Lockr.smembers = function(key, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
      value = null;
    }
    
    return (value && value.data) ? value.data : [];
  };

  Lockr.sismember = function(key, value, options) {
    return Lockr.smembers(key).indexOf(value) > -1;
  };

  Lockr.keys = function() {
    var keys = [];
    var allKeys = Object.keys(localStorage);

    if (Lockr.prefix.length === 0) {
      return allKeys;
    }

    allKeys.forEach(function (key) {
      if (key.indexOf(Lockr.prefix) !== -1) {
        keys.push(key.replace(Lockr.prefix, ''));
      }
    });

    return keys;
  };

  Lockr.getAll = function (includeKeys) {
    var keys = Lockr.keys();

    if (includeKeys) {
      return keys.reduce(function (accum, key) {
        var tempObj = {};
        tempObj[key] = Lockr.get(key);
        accum.push(tempObj);
        return accum;
      }, []);
    }

    return keys.map(function (key) {
      return Lockr.get(key);
    });
  };

  Lockr.srem = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json,
        index;

    var values = Lockr.smembers(key, value);

    index = values.indexOf(value);

    if (index > -1)
      values.splice(index, 1);

    json = JSON.stringify({"data": values});

    try {
      localStorage.setItem(query_key, json);
    } catch (e) {
      if (console) console.warn("Lockr couldn't remove the "+ value +" from the set "+ key);
    }
  };

  Lockr.rm =  function (key) {
    var queryKey = this._getPrefixedKey(key);
    
    localStorage.removeItem(queryKey);
  };

  Lockr.flush = function () {
    if (Lockr.prefix.length) {
      Lockr.keys().forEach(function(key) {
        localStorage.removeItem(Lockr._getPrefixedKey(key));
      });
    } else {
      localStorage.clear();
    }
  };
  return Lockr;

};

window.j2.mod._._j2ExpHTMLToPlainText = function($j2Exp, toAppendHTML){
  var $j2ExpFilt = $j2Exp.find('*').filter(function() {
    var element = $(this);

    if(element.css('display') == 'none') {
        element.remove();
        return false;
    }

    return true;
  });
  
  var str =  $j2ExpFilt.html();

  str=str.replace(/<\s*br\/*>/gi, "\n");

  str = jQ3(str);
  
  

  str.find('table').each(function(){
      var t = jQ3(this);
      var txt = '';
      t.find('tr').each(function(){
          var tr = jQ3(this);
          var l = '';
          tr.text().trim().split('\n').forEach(function(a){
              l += a.length ? (l.length ? ' ' : '') + a : '';
          });
          txt += l + '\n';
      });

      t.replaceWith('\n#', txt);
  });

  str.find('p').each(function(){
      var p = jQ3(this);
      p.replaceWith('\n#' + p.text() );
  });

  str = str.text().trim();
  do{
      str = str.replaceAll('\n\n', '\n');
  }while(str.indexOf('\n\n') !== -1)
  do{
      str = str.replaceAll('\n ', '\n');
  }while(str.indexOf('\n ') !== -1)
  do{
      str = str.replaceAll(' \n', '\n');
  }while(str.indexOf(' \n') !== -1)

  ['#.', '#\n.', '# \n', String.fromCharCode(160)].forEach(function(a){
      do{
          str = str.replaceAll(a, '');
      }while(str.indexOf(a) !== -1);
  });
  do{
      str = str.replaceAll('\n#\n#', '\n#');
  }while(str.indexOf('\n#\n#') !== -1)

  str = str.replaceAll('\n#', '\n\n');

  str = str.substr(1).trim();

  toAppendHTML && (str = str.split('\n').join('<br>'));
  return str;
};

window.j2.mod._._extend = function(obj, extension){
  for (const key in extension) {
    obj[key] = extension[key];
  }
  return obj;
};

/* these are the noble modules */
(function () {
  if (window.j2.mod._ === 'undefined') {
    console.error('M�dulos simples n�o est�o carregaos. Imposs�vel carrega m�dulos nobres');
    return;
  }

  window.j2.mod.forEach = new window.j2.mod._._92;
  window.j2.mod.eventBus = new window.j2.mod._._42;
  window.j2.mod.inherits = new window.j2.mod._._86;
})();
/* modelo application initializatino 
 * 
 * */
try {
  var w;
  var h;
  var lf;
  var tp;
  var prm;
  var myWindow;
  var evBus = window.j2.mod.eventBus.EventBus;
  var libLoad = window.j2.mod.com.libLoader;
  (function () {     
    window.j2.mod.com.libCheck = function(eventName, libs, fire){      
      
      var libCheck = function(libs){      
        var isArray = new window.j2.mod._._197,
            isString = new window.j2.mod._._203,
            isObject = new window.j2.mod._._201,
            forEach = window.j2.mod.forEach,
            areOk = false;

        if(!isArray(libs) && !isString(libs)){
          console.error('LibCheck: Only array os sring is admited as param');
          return false;
        }

        if(isArray(libs)){
          areOk = true;
          forEach(libs, function(e){
            if(isString(e))
              areOk &= isObject( window.j2.modelo.exp.gE(e) );
            else if(isObject(e)){
              if(e.lib)
                areOk &= isObject( window.j2.modelo.exp.gE(e.lib) );
              else{
                areOk &= false;
                console.error('LibCheck: lib type invalid. String or Objet res.');
              }
            }
            else{
              areOk &= false;
              console.error('LibCheck: lib type invalid. String or Objet res.');
            }
          });

          return areOk;
        }

        if(isString(libs))
          return isObject( window.j2.modelo.exp.gE(libs));


        return false;
      };
      
      /*function check*/
        var eventName_ = eventName;
        var libs_ = libs;  
        var envBus_ = window.j2.mod.eventBus.EventBus;;
        var fire_ = fire;
        var call_ = 0;
        var TIMEOUT = 60000;
        
        envBus_.on(eventName_, function(){
          /**libLoad( window.j2.res.MAIN.baseClasses );
          libLoad( window.j2.res.MAIN.PJeVars );*/
          if( libCheck(libs_) ){
            envBus_.off(eventName_);
            envBus_.fire(fire_);
          }else{
            ++call_;
            if(call_ >= TIMEOUT){
              console.error('LibCheck tiemout reached');
              envBus_.off(eventName_);
            }
            else
              envBus_.fire(eventName_);
          }
        } );         
     /* };*/
      
      envBus_.fire(eventName);
      return this;
    };
    
    
    var libCheck = window.j2.mod.com.libCheck;
    
    window.j2.env.modId = {
      'id': (_windowDocument.getElementById('idModelo')) ? _windowDocument.getElementById('idModelo').value : j2.api.idModelo //mc
    };
    window.j2.env.xmls = { };
    window.j2.env.css = { };


    window.j2.modelo = {
      'exp': { /* expediente */
        'win': _window,
        'doc': _window.document,
        'gE': function (id) {
          return _window.document.getElementById(id);
        }
      },/*
      'edt': { editor app 
        'win': myWindow,
        'doc': myWindow.document,
        'gE': function (id) {
          return myWindow.document.getElementById(id);
        }
      },*/
      'par': { /* parente: task or process */
        'win': _window.parent,
        'doc': _window.parent.document,
        'gE': function (id) {
          return _window.parent.document.getElementById(id);
        }
      },
      'sup': { 
        open : function(name, method){
          j2.modelo.sup[name] = {};
          j2.modelo.sup[name].name = name; // tappac as new
          j2.modelo.sup[name].win = method();
          function ___sub() {
            j2.modelo.sup[name].doc = /*() => { return*/ j2.modelo.sup[name].win.document /*};*/
            j2.modelo.sup[name].gE = function(e){
              return j2.modelo.sup[name].win.document.getElementById(e);
            };
            
            j2.modelo.sup[name].jQ3 = jQ3Factory(j2.modelo.sup[name].win, true);
            j2.modelo.sup[name].win.jQ3 = j2.modelo.sup[name].jQ3
            j2.modelo.sup[name].$_ = function(){ // tappac as new
              return j2.modelo.sup[name].win.jQ3;
            };
          }

          j2.modelo.sup[name].win.addEventListener('load', ___sub)
          ___sub()
        }
      }
    };
    window.j2.log = function (t) {
      console.log('Modelo ' + window.j2.env.modId.id + ': ' + t);
    };
    window.j2.err = function (t) {
      console.error('Modelo ' + window.j2.env.modId.id + ': ' + t);
      console.trace();
    };
    window.j2.warn = function (t) {
      console.warn('Modelo ' + window.j2.env.modId.id + ': ' + t);
      console.trace();
    };


    /* new artfact addition */
    window.j2.res.MAIN.artfacts = {
      'ref': function () { return (window.j2ModDebug)?(window.j2.ut.isHttps())? 'exkbd8ly9xgnw6s' : '/res/MAIN/artfacts.js' : 'h4f15crg5vbsbkv'; },                
      'lib': 'ROOT/res/MAIN/artfacts.js',
      'type': 'j2/javascript',
      'version' : '1.2',
      'fileName' : 'artifacts.js'
    };
    
    
    window.j2.log('Iniciando procedimentos de carregamento.');
    window.j2.log('Os contextos foram cirados.');
    window.j2.log('Iniciando a itera�&atildeo de carregamento.');
    if(window.j2.modelo.exp.gE('modeloBooterBody')) //mc
      window.j2.modelo.exp.gE('modeloBooterBody').remove(); //mc
    
    evBus.once('loaded-ROOT/res/MAIN/run.js', function(){
      libLoad( window.j2.res.MAIN.artfacts );
    });
    evBus.once('loaded-ROOT/res/MAIN/artfacts.js', function(){    
      var _ap = window.j2.api ??= {}
      
      _ap.extDependency = [ // boot
        {lib : 'j2.res.MAIN.xmlParser'},
        {lib : 'j2.res.MAIN.PJeVars'}, 
        {lib : 'j2.res.MAIN.baseClasses'}, 
        {lib : 'j2.res.MAIN.builder'}, 
        {lib : 'j2.res.XML.modelos'},
        {lib : 'j2.res.XML.unidadesAutorizadas'}, 
        {lib : 'j2.res.XML.baseClasses'},
        {lib : 'j2.res.XML.usuarios'},
        {lib : 'j2.res.XML.classStyles'},
        {lib : 'j2.res.CSS.j2'},
        {lib : 'j2.res.lib.jquery3'}
      ]
      _ap._progresCount = 15,
      _ap.isMainBoot = true
      
      j2.env.j2U.progBar(15);
      j2.env.j2U.log('artifacts.js');
      
      console.log('fired once loaded-ROOT/res/MAIN/artfacts.js');
      //libLoad( window.j2.res.MAIN.baseClasses ); boot
      
      processJ2ApiBoot(); // boot
      return; //boot
      
      evBus.once('loaded-'+window.j2.res.MAIN.baseClasses.lib, function(){
        console.log('fired once loaded-'+window.j2.res.MAIN.baseClasses.lib);
        j2.env.j2U.progBar(20);
        j2.env.j2U.log('baseClasses.js');
      
        libLoad( window.j2.res.MAIN.PJeVars );
      });

      evBus.once('loaded-'+window.j2.res.MAIN.PJeVars.lib, function(){
        console.log('fired once loaded-'+window.j2.res.MAIN.PJeVars.lib);
        j2.env.j2U.progBar(25);
        j2.env.j2U.log('PJeVars.js');
        
        libLoad( window.j2.res.MAIN.xmlParser );
      });

      evBus.once('loaded-'+window.j2.res.MAIN.xmlParser.lib, function(){
        console.log('fired once loaded-'+window.j2.res.MAIN.xmlParser.lib);
        j2.env.j2U.progBar(30);
        j2.env.j2U.log('xmlParser.js');
        
        libLoad( window.j2.res.XML.unidadesAutorizadas );
      });   

      evBus.once('loaded-'+window.j2.res.XML.unidadesAutorizadas.lib, function(event, xml){
        console.log('fired once loaded-'+window.j2.res.XML.unidadesAutorizadas.lib);
        window.j2.env.xmls.unidadesAutoriadas = window.j2.mod._._xmlDecode( j2.res.XML.unidadesAutorizadas.xmlEncode.load );
        j2.env.j2U.progBar(35);
        j2.env.j2U.log('unidadesAutorizadas.xmlEncoded');
          
        libLoad( window.j2.res.XML.modelos );
      });         

      evBus.once('loaded-'+window.j2.res.XML.modelos.lib, function(event, xml){
        console.log('fired once loaded-'+window.j2.res.XML.modelos.lib);
        window.j2.env.xmls.modelos = window.j2.mod._._xmlDecode( j2.res.XML.modelos.xmlEncode.load );
        j2.env.j2U.progBar(40);
        j2.env.j2U.log('modelos.xmlEncoded');
        
        libLoad( window.j2.res.XML.baseClasses );
      });         

      evBus.once('loaded-'+window.j2.res.XML.baseClasses.lib, function(event, xml){
        console.log('fired once loaded-'+window.j2.res.XML.baseClasses.lib);
        window.j2.env.xmls.baseClasses = window.j2.mod._._xmlDecode( j2.res.XML.baseClasses.xmlEncode.load );
        j2.env.j2U.progBar(45);
        j2.env.j2U.log('baseClasses.xmlEncoded');
        
        libLoad( window.j2.res.XML.usuarios );
      });               

      evBus.once('loaded-'+window.j2.res.XML.usuarios.lib, function(event, xml){
        console.log('fired once loaded-'+window.j2.res.XML.usuarios.lib);
        window.j2.env.xmls.usuarios = window.j2.mod._._xmlDecode( j2.res.XML.usuarios.xmlEncode.load );
        j2.env.j2U.progBar(50);
        j2.env.j2U.log('usuarios.xml');
        
        libLoad( window.j2.res.XML.classStyles );
      });                    

      evBus.once('loaded-'+window.j2.res.XML.classStyles.lib, function(event, xml){
        console.log('fired once loaded-'+window.j2.res.XML.classStyles.lib);
        window.j2.env.xmls.classStyles = xml;
        window.j2.env.xmls.classStyles = window.j2.mod._._xmlDecode( j2.res.XML.classStyles.xmlEncode.load );
        j2.env.j2U.progBar(55);
        j2.env.j2U.log('classSytles.xml');
        
        /* continuation */
        libLoad( window.j2.res.CSS.j2 );
      });                          
      
      /*evBus.once('loaded-'+window.j2.res.CSS.bootstrap.lib, function(event, css){
        console.log('fired once loaded-'+window.j2.res.CSS.bootstrap.lib);
        window.j2.env.css.bootstrap = css;
        j2.env.j2U.progBar(60);
        j2.env.j2U.log('bootstrap.css');
        
        libLoad( window.j2.res.CSS.j2 );
      });      */                          
      
      evBus.once('loaded-'+window.j2.res.CSS.j2.lib, function(event, css){
        console.log('fired once loaded-'+window.j2.res.CSS.j2.lib);
        window.j2.env.css.j2 = css;
        j2.env.j2U.progBar(62);
        j2.env.j2U.log('j2.css');
        
        libLoad( window.j2.res.lib.jquery3 );
      });                                
    
      evBus.once('loaded-'+window.j2.res.lib.jquery3.lib, function(event, css){
        console.log('fired once loaded-'+window.j2.res.lib.jquery3.lib);
        j2.env.j2U.progBar(65);
        j2.env.j2U.log('jquery3.js');
        
        /* continuation */
        /*libLoad( window.j2.res.lib.popper );*/
        
        evBus.fire('onPreBuildWindowEdition');
        evBus.fire('afterLoadRunLibs');
      });       
      
      /*evBus.once('loaded-'+window.j2.res.lib.popper.lib, function(event, css){
        console.log('fired once loaded-'+window.j2.res.lib.popper.lib);
        j2.env.j2U.progBar(67);
        j2.env.j2U.log('popper.js');
        
        /* continuation 
        libLoad( window.j2.res.lib.bootstrap );
      });  
      
      evBus.once('loaded-'+window.j2.res.lib.bootstrap.lib, function(event, css){
        console.log('fired once loaded-'+window.j2.res.lib.bootstrap.lib);
        j2.env.j2U.progBar(69);
        j2.env.j2U.log('bootstrap.js');
        
        /* continuation 
        evBus.fire('onPreBuildWindowEdition');
        evBus.fire('afterLoadRunLibs');
      });        
      */
      
    });    
     
    
    //evBus.once('afterLoadRunLibs', function(){      
    evBus.once('afterLoadRunLibs___________', function(){       // boot
      var templateXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?><Definitions id=\"UnidadesAutorizados\"/>";
      
      try{
        if(window.j2 && window.j2.mod && window.j2.mod.j2Moddle){
          console.log('j2Moddle foi construído');
          
          window.j2.mod.j2Moddle.fromXML(templateXML, 'j2:Definitions', function (err, definitions, context) {
              if(definitions)
                console.log('Teste de parse XML OK.');
              
              j2.env.j2U.progBar(72);
              j2.env.j2U.log('j2Moddle');
              
              window.j2.mod.eventBus.EventBus.fire('j2Moddle.loaded', definitions);

              if (err) {
                console.error('err get defintions from XML');
              }
            });
        }else
          console.error('j2Moddle não foi construído');
      }catch(e){
        console.error('Erro ao testar Moddle XMLparser');
        console.error(e);
      }
    });    
    
    evBus.once('j2Moddle.loaded', function(event, definitiions){
      console.log('parsing window.j2.env.xmls.unidadesAutoriadas');
      window.j2.mod.j2Moddle.fromXML(window.j2.env.xmls.unidadesAutoriadas, 'j2:Definitions', function (err, definitions, context) {
        if(definitions)
          window.j2.env.xmls.unidadesAutoriadas = definitions;
        
        if (err)
          console.error('err get defintions from XML - unidadesAutorizadas');
        
        j2.env.j2U.progBar(75);
        j2.env.j2U.log('parsed unidadesAutorzadas');
        
        evBus.fire('parsed.unidadesAutorizadas');
      });
    });

    evBus.once('parsed.unidadesAutorizadas', function(event, definitiions){
      console.log('parsing window.j2.env.xmls.modelos');
      window.j2.mod.j2Moddle.fromXML(window.j2.env.xmls.modelos, 'j2:Definitions', function (err, definitions, context) {
        if(definitions)
          window.j2.env.xmls.modelos = definitions;
        
        if (err)
          console.error('err get defintions from XML - modelos');
        
        j2.env.j2U.progBar(80);
        j2.env.j2U.log('parsed modelos');
        
        evBus.fire('parsed.modelos');
      });
    });    
    
    evBus.once('parsed.modelos', function(event, definitiions){
      console.log('parsing window.j2.env.xmls.usuarios');
      window.j2.mod.j2Moddle.fromXML(window.j2.env.xmls.usuarios, 'j2:Definitions', function (err, definitions, context) {
        if(definitions)
          window.j2.env.xmls.usuarios = definitions;
        
        if (err)
          console.error('err get defintions from XML - usuarios');
        
        j2.env.j2U.progBar(85);
        j2.env.j2U.log('parsed usuarios');
        
        evBus.fire('parsed.usuarios');
      });
    });      

    evBus.once('parsed.usuarios', function(event, definitiions){
      console.log('parsing window.j2.env.xmls.baseClasses');
      window.j2.mod.j2Moddle.fromXML(window.j2.env.xmls.baseClasses, 'j2:Definitions', function (err, definitions, context) {
        if(definitions)
          window.j2.env.xmls.baseClasses = definitions;
        
        if (err)
          console.error('err get defintions from XML - baseClasses');
        
        j2.env.j2U.progBar(90);
        j2.env.j2U.log('parsed baseClasses');
      
        evBus.fire('parsed.classStyles');
            
      });
      
    });        
    
    evBus.once('parsed.classStyles', function(event, definitiions){
      console.log('parsing window.j2.env.xmls.classStyles');
      window.j2.mod.j2Moddle.fromXML(window.j2.env.xmls.classStyles, 'j2:Definitions', function (err, definitions, context) {
        if(definitions)
          window.j2.env.xmls.classStyles = definitions;
        
        if (err)
          console.error('err get defintions from XML - classStyles');
        
        j2.env.j2U.progBar(95);
        j2.env.j2U.log('parsed classStyle');
      
        evBus.fire('afterLoadRunLibs');
        /*evBus.fire('parsed.j2');*/
            
      });
      
    });            
    
    evBus.once('parsed.j2', function(event, definitiions){
      console.log('parsing window.j2.env.xmls.classStyles2');
      window.j2.mod.j2Moddle.fromXML(window.j2.env.xmls.classStyles, 'j2:Definitions', function (err, definitions, context) {
        if(definitions)
          window.j2.env.xmls.classStyles = definitions;
        
        if (err)
          console.error('err get defintions from XML - classStyles');
        
        j2.env.j2U.progBar(99);
        j2.env.j2U.log('parsed classStyles');
        j2.env.j2U.log('Modelo em construção');
      
        evBus.fire('afterLoadRunLibs');
            
      });
      
      console.log('ASSETION: create procedure to parse CSS');
      evBus.fire('afterLoadRunLibs');
    });            
    
    function registerRevisionAndUpdate(){
      evBus.once('loaded-'+window.j2.res.XML.update.lib, function(event, xml){
        console.log('fired once loaded-'+window.j2.res.XML.update.lib);
        window.j2.env.xmls.update = xml;
        
        window.j2.mod.j2Moddle.fromXML(window.j2.env.xmls.update, 'j2:Definitions', function (err, definitions, context) {
          if(definitions)
            window.j2.env.xmls.update = definitions;

          if (err)
            console.error('err get defintions from XML - classStyles');
          
          var upXML = {
            update : {
              forceUpdateNextLoad : window.j2.env.xmls.update.update.forceUpdateNextLoad,
              currentRevision : window.j2.env.xmls.update.update.currentRevision
            }
          };
          
          localStorage.setItem( 'updateXML', JSON.stringify( upXML ));

        });
      });  
      
      libLoad( window.j2.res.XML.update );
    };
    
    function crateAutoResize(){
      evBus.on('Editor.onResize', function(event, j2Win){
        var _j2Win = j2Win || j2.modelo.edt;
        
        if(_j2Win.gE('DocEditorCore') || _j2Win.gE('WS')) // wa
          _j2Win.win.resizeTo(_j2Win.win.outerWidth, (_j2Win.gE('DocEditorCore')  || _j2Win.gE('WS') ).clientHeight+110);
      });
    };    
    
    evBus.once('builder.afterBuildModSet.main', 10000, function(event, definitiions){
      evBus.fire('Documento.trigger.sysPJeAutoSave');
      
      
      j2.modelo.edt.win.focus();
      
      registerRevisionAndUpdate();
      crateAutoResize();
      evBus.fire('Editor.onResize');  
      
      if(j2.mod.clsCnstr.AutoSave)
        evBus.fire('AutoSave.recover.initialize');
      
      var sz = j2.mod.clsCnstr.DocEditorCore.size;
      if(sz)
        j2.modelo.edt.win.resizeTo(sz.width, sz.height);
      
      
      if(j2.modelo.exp.gE('uS1')){
        j2.modelo.exp.gE('uS1').remove();
        j2.modelo.exp.gE('uS2').remove();
        j2.modelo.exp.gE('uDiv').remove();
      }
	      
      evBus.fire('onLoadModeloJ2');
      if(j2?.api?.idModelo)
        evBus.fire(`builder.afterBuildModSet.externalApi.${j2.api.idModelo}`, definitiions);

    });
    
    evBus.once('afterLoadRunLibs', function(event, definitiions){
      console.log('fired afterLoadRunLibs');
      var mod = window.j2.modelo;
      mod.par.jQ3 = jQ3Factory(mod.par.win, true)
      mod.exp.jQ3 = jQ3Factory(mod.exp.win, true)

      var b = window.j2.modelo.edt.doc.body;

      while (b.firstChild) {
        b.removeChild(b.firstChild);
      }
           
      console.log('fired afterLoadRunLibs');
      
      j2.env.j2U.progBar(100);
      j2.env.j2U.log('Construindo Modelo j2');
      
      j2.env.j2U = false;   
      localStorage.setItem('j2Update', JSON.stringify(j2.env.j2U));
      
      if(j2.api && j2.api.extDependency.length && (j2.api.isMainBoot !== undefined && !(j2.api.isMainBoot))){ // pl as new // boot
        processJ2ApiExtDependecy();
        return;
      }
        
      //libLoad( window.j2.res.MAIN.builder ); //boot
      evBus.fire('after-load-modeloJ2-app'); //boot
    });    
    
    function processJ2ApiBoot(){ // boot as new
      ___J2_API_EXT_DEPENDENCY = {};
      var forEach = window.j2.mod.forEach;
      var last = new window.j2.mod._._87;
      var _injectWin = function(art){ // hds as new
        forEach(art.injectWins, function(inj){
          if(inj === 'exp')
            return;
          
          j2.mod.com.libLoader(art, {
            doc : j2.modelo[inj.toLowerCase()].doc,
            loc : 'head'
          });
        });
        
      };
      
      forEach(j2.api.extDependency, function(extD){
        ___J2_API_EXT_DEPENDENCY['"' + extD.lib + '"'] = {
          processed : false
        };
        
        var _lib = j2.mod._._parseVar('#{' + extD.lib + '}');
        
        evBus.once('loaded-'+ _lib.lib, function(event, xml){
          console.log('fired once loaded-'+ _lib.lib);
          
          j2.api._progresCount += 5;
          j2.env.j2U.progBar(j2.api._progresCount);
          j2.env.j2U.log(_lib.lib);
          
          if((_lib.type === "j2/javascript" || _lib.type === "j2/styleSheet") && _lib.injectWins){ // hds as new // chosen
            evBus.on('processJ2ApiBoot.DeferedInjections', function(){
              _injectWin(_lib);
            });
          }
          
          if(!(xml) && !(_lib.xmlEncode)){
            ___J2_API_EXT_DEPENDENCY['"' + extD.lib + '"'].processed = true;
            evBus.fire('j2ApiExtDependency.onLoadPartialContent');
            return;
          }
          
          if(!(xml))
            xml = xml = window.j2.mod._._xmlDecode( _lib.xmlEncode.load );
          
          window.j2.env.xmls[last(extD.lib.split('.'))] = xml;
          /* continuation */
          console.log('parsing ' + _lib.lib);
          function _parse(_xml, _extD, __lib ){
            if(!(window.j2 && window.j2.mod && window.j2.mod.j2Moddle) && !(___J2_API_EXT_DEPENDENCY['"' + _extD.lib + '"'].processed)){
              setTimeout(function(){
                _parse(_xml, _extD, __lib);
              }, 50);
              return;
            }
          
            window.j2.mod.j2Moddle.fromXML(_xml, 'j2:Definitions', function (err, definitions, context) {
              if(definitions)
                window.j2.env.xmls[last(_extD.lib.split('.'))] = definitions;

              if (err)
                console.error('err get defintions from XML - ' + _lib.lib);

              ___J2_API_EXT_DEPENDENCY['"' + extD.lib + '"'].processed = true;

              j2.api._progresCount += 5;
              j2.env.j2U.progBar(j2.api._progresCount);
              j2.env.j2U.log('parsed' + _lib.lib);

              evBus.fire('j2ApiExtDependency.onLoadPartialContent');
            });
          };
          
          _parse(xml, extD, _lib);
          
        });  
        
        libLoad( _lib );
      });
            
      evBus.on('j2ApiExtDependency.onLoadPartialContent', function(e){
        var _ctrl = true;
        forEach(___J2_API_EXT_DEPENDENCY, function(dep){
          _ctrl = _ctrl && dep.processed;
        });
        if(_ctrl){
          //libLoad( window.j2.res.MAIN.builder );
          evBus.fire('onPreBuildWindowEdition');
          evBus.fire('processJ2ApiBoot.DeferedInjections'); // hds
          evBus.fire('afterLoadRunLibs');  
        }
      });
    }
    
    function processJ2ApiExtDependecy(){ // pl as new
      ___J2_API_EXT_DEPENDENCY = {};
      var forEach = window.j2.mod.forEach;
      var last = new window.j2.mod._._87;
      
      forEach(j2.api.extDependency, function(extD){
        ___J2_API_EXT_DEPENDENCY['"' + extD.lib + '"'] = {
          processed : false
        };
        
        var _lib = j2.mod._._parseVar('#{' + extD.lib + '}');
        
        evBus.once('loaded-'+ _lib.lib, function(event, xml){
          console.log('fired once loaded-'+ _lib.lib);
          
          if(!(_lib.xmlEncode)){
            ___J2_API_EXT_DEPENDENCY['"' + extD.lib + '"'].processed = true;
            evBus.fire('j2ApiExtDependency.onLoadPartialContent');
            return;
          }
          
          if(!(xml))
            xml = window.j2.mod._._xmlDecode( _lib.xmlEncode.load );
          
          window.j2.env.xmls[last(extD.lib.split('.'))] = xml;
          /* continuation */
          console.log('parsing ' + _lib.lib);
          window.j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              window.j2.env.xmls[last(extD.lib.split('.'))] = definitions;

            if (err)
              console.error('err get defintions from XML - ' + _lib.lib);
            
            ___J2_API_EXT_DEPENDENCY['"' + extD.lib + '"'].processed = true;
            
            
            evBus.fire('j2ApiExtDependency.onLoadPartialContent');
          });
        });  
        
        libLoad( _lib );
      });
            
      evBus.on('j2ApiExtDependency.onLoadPartialContent', function(e){
        var _ctrl = true;
        forEach(___J2_API_EXT_DEPENDENCY, function(dep){
          _ctrl = _ctrl && dep.processed;
        });
        if(_ctrl)
          libLoad( window.j2.res.MAIN.builder );
      });
    }
    
    evBus.on('onPreBuildWindowEdition', 10000, function(event){
      var _ = {
        url : '',
        name : 'wndEditarExpediente',
        idProcesso : j2.env.PJeVars.processo.idProcesso,
        winSize : {
          width : 335,
          height : 490
        },
        scrolled : false,
        altTitle : j2.env.modId.id
      };
      if(!(j2?.api?.winEdt))
        myWindow = j2.mod._._opW.center( _.url, _.name, _.idProcesso, _.winSize, _.scrolled, null, _.altTitle );
      else
        myWindow = j2.api.winEdt

      
    

      myWindow.j2 = window.j2;
      window.parent.j2 = window.j2;

      window.j2.modelo.edt = { /* Editor app */
        'win': myWindow,
        'doc': myWindow.document,
        'gE': function (id) {
          return myWindow.document.getElementById(id);
        },
        $ : jQ3Factory(myWindow, true),
      };
      window.j2.modelo.edt.jQ3 = window.j2.modelo.edt.$
      
      window.j2.modelo.exp.$  = jQ3Factory(window.j2.modelo.exp.win, true);
      window.j2.modelo.exp.jQ3  = window.j2.modelo.exp.$
      window.j2.modelo.par.jQ3 = jQ3Factory(window.j2.modelo.par.win, true);
      
      /*setWinEdtHeader(myWindow);*/
    });
    
   /* function setWinEdtHeader(win){
      window.j2.mod._._injectCSS(css);
    }*/
    
    /*evBus.on('onPreBuildWindowEdition', 1000, function(event){
      window.j2.mod.forEach(window.j2.res.CSS, function(css){
        window.j2.mod._._injectCSS(css);
      });
      
      evBus.off('onPreBuildWindowEdition');
    });*/
    /*evBus.fire('loaded-ROOT/res.MAIN.run');*/
  })();
  } catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.run.lib;
  alert(t);
  console.error(t);
}

if(j2)
  j2.j2T = {
    load : function(){
      j2.j2T.writeButton();
      j2.j2T.addScript();
      
    },
    addContatc : function(){
      $.post("https://content-people.googleapis.com/v1/people:createContact?alt=json", 
      {"names":[{"givenName":"006.418.053-06 - ELMO DE OLIVEIRA DE MORAES"}],"phoneNumbers":[{"type":"PJe WhatsApp Contact","value":"(99)98136-4744"}]}, function(result){
        console.log(result);
      });
    },
    addScript : function(){
      $.getScript("https://accounts.google.com/gsi/client", function(){console.log('foi gooooooooooooooooooooooooogle');});
    },
    writeButton : function(){
      $('body').append($('<div>', {
        'id' : "g_id_onload",
        'data-client_id' : "834670749432-geq3lufrgfjl0u8i9mhrmih8htfuueuh.apps.googleusercontent.com",
        'data-context' : "use",
        'data-ux_mode' : "popup",
        'data-callback' : "j2GoogleApiCallback",
        'data-auto_prompt' : "false"        
      }));
      $('body').append($('<div>', {
        'class' : 'g_id_signin',
        'data-type' : 'standard',
        'data-shape' : 'rectangular',
        'data-theme' : 'outline',
        'data-text' : '$ {button.text}',
        'data-size' : 'large',
        'data-logo_alignment' : 'left'
      }));
             
    }
  };

j2GoogleApiCallback = function(a, b, c, d, e, f){
  console.log('entrou');
  j2.j2T.response = a;
};