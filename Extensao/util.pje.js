/*
 * Baseado no repositório Lockr
 * 
 * https://github.com/tsironis/lockr
 * 
 * adaptado para modelos j2
 * @returns {window.j2.mod._._Lockr.Lockr}
 */
 
function createLockr(prefix) {
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

var lockr  = new createLockr('j2E');

var __COOKIES_EXPIRE_TIME___ = 60/(60*60*24);
var __COOKIES_DOMAIN___ = window.location.host;


function registerJ2Action(title, load){
  return lockr.set(title, load, {
    expires: __COOKIES_EXPIRE_TIME___,
    domain: __COOKIES_DOMAIN___
  });
}
function unregisterJ2Action(title){
  return cookies.rm(title);
}

openPopUp = function (id, url, width, height) {
  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  var _guid = guid();

  url = url.replace('#', '?' + _guid + '#');
  id+=_guid;

  if (!width) width = window.screen.availWidth * 0.9;
  if (!height) height = window.screen.availHeight * 0.9;
  var featurePopUp = "width="+width + ", height="+height+", resizable=YES, scrollbars=YES, status=NO, location=NO";
  
  registerJ2Action(_guid, JSON.stringify(window.j2Action));
  var popUp = window.open(url, id, featurePopUp); popUp.moveTo(0, 0);
    
  popUp.j2Action = window.j2Action;
  window.lastOpnendPopUp = popUp;   
    
    
};

/*
  var __COOKIES_EXPIRE_TIME___ = /(60*60*24);
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
};
*/

window.j2E = { env : {
  urlParms : (function searchToObject() {
    var pairs = window.location.search.substring(1).split("&"),
      obj = {},
      pair,
      i;

    for ( var i = 0; i < pairs.length; i++ ) {
      if ( pairs[i] === "" ) continue;
      pair = pairs[i].split("=");
      obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }
    return obj;
  })(),
}};


function popupRetificarAutuacao(){	
  var retificarAutuacaoUrl = '/pje/Processo/RetificacaoAutuacao/updateRetificacaoAutuacao.seam';
  retificarAutuacaoUrl += `?idProcesso=${j2E.env.urlParms.idProcesso | j2E.env.urlParms.idProcesso}&`;
  retificarAutuacaoUrl += 'tab=tabPartes';

  window.open(retificarAutuacaoUrl,'processooRetificaAutuacao');
}

setTimeout(()=>{
  document.body.textContent.includes('Escolher destinatários') &&
  document.getElementById('mpLoadingMovimentarContainer').remove()
}, 1500)


document.addEventListener('j2-transitar-frame', function(event) {
  console.log('Evento Personalizado Disparado:', event.detail, event);

  window.transitarFrame(event.detail.nomeTransicao)
});