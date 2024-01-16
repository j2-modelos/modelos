/* 
 * Lib for j2E
 */
if( ! (window.j2E) )
  window.j2E = {};


j2E.env = {
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
  tempData : {}
};

var j2EOpW = {
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
         callback(win);
         win.focus();
       }, 250); //wa


     /*var flg = false;
     setInterval(function(){
       win.document.title = 'j2 ' + (flg ? j2.env.PJeVars.processo.numeroCurto : (altTitle || name) );
       flg = !flg;
     }, 1000);*/

     altTitle && ( win.document.title = 'j2 ' + altTitle );
     
     return win;
   },
  corner : function(url, name, idProcesso, winSize, scrolled, callback){ // pdf as new //wa
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
     win.focus();
     if(callback) // wa
       setTimeout(function(){
         callback();
         win.focus();
       }, 250); //wa


     /*var flg = false;
     setInterval(function(){
       win.document.title = 'j2 ' + (flg ? j2.env.PJeVars.processo.numeroCurto : (altTitle || name) );
       flg = !flg;
     }, 1000);*/

     return win;
   }
};

String.prototype.allMatches = function(re){
  var _ = [];
  var _t;
  var m;
  
  _t = this;
  do {
      m = re.exec(_t);
      if (m){
        _.push(m[0]);
        _t = _t.replace(re, 'xxxxxxxxxxxxxxx');
      }
  } while( re.exec(_t) );  
  
  return _;
};

Date.prototype.miliDiff = function(){
  return new Date().getTime() - this.getTime();
};

Number.prototype.asDateMiliDiff = function(){
  return new Date().getTime() - this; 
};

function j2ExpHTMLToPlainText(){
  var str = jQ3('#j2Exp').html();

  str=str.replace(/<\s*br\/*>/gi, "\n");

  str = jQ3(str);
  debugger;


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

  return str;
}


function addScript(name, _doc){
  if( !(chrome.runtime.getURL))
    return;
  
  var head  = (_doc || document).getElementsByTagName('head')[0];
  var script = (_doc || document).createElement("script");
  script.src = chrome.runtime.getURL(name);
  script.type = "application/javascript";
  script.id = name;
  head.appendChild(script);
};
function addStyleSheet(name, _doc){
  if( !(chrome.runtime.getURL))
    return;
  
  var head  = (_doc || document).getElementsByTagName('head')[0];
  var link  = (_doc || document).createElement('link');
  
  link.id   = name;
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL(name);;
  link.media = 'all';
  
  head.appendChild(link);
};

/*
 * Baseado no repositório Lockr
 * 
 * https://github.com/tsironis/lockr
 * 
 * adaptado para modelos j2
 * @returns {window.j2.mod._._Lockr.Lockr}
 */
 
function createLockr(prefix, storage) {
  'use strict';
  
  var Lockr = {};
  if(!(storage))
    storage = window.localStorage;
  else
    storage = window[storage];

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
      var toStore = {"data": value}
      if( options?.expiration ){
        var exp = options.expiration
        var now = (new Date()).getTime()
        if( exp < now ){
          now += exp
        }
        toStore.expiration = now
      }
      storage.setItem(query_key, JSON.stringify( toStore ));
    } catch (e) {
      if (console) console.warn("Lockr didn't successfully save the '{"+ key +": "+ value +"}' pair, because the storage is full.");
    }
  };

  Lockr.get = function (key, missing, options) {
    options = options || {};
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(storage.getItem(query_key));
    } catch (e) {
            if(storage[query_key]) {
              value = {data: storage.getItem(query_key)};
            } else{
                value = null;
            }
    }
    
    if(!value) {
      return missing;
    }
    else if (typeof value === 'object' && typeof value.data !== 'undefined') {
      if(typeof value.expiration !== 'undefined' ){
        var now = (new Date()).getTime()
        if( now > value.expiration ){
          if(options.flagMissingExpiration && typeof missing === 'object' ){
            missing.expired = true
            missing.expiredData = value.data
          }
          return missing
        }
      }
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
      storage.setItem(query_key, json);
    } catch (e) {
      console.log(e);
      if (console) console.warn("Lockr didn't successfully add the "+ value +" to "+ key +" set, because the storage is full.");
    }
  };

  Lockr.smembers = function(key, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
      value = JSON.parse(storage.getItem(query_key));
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
    var allKeys = Object.keys(storage);

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

  Lockr.getAll = function (includeKeys, keyStartsWith) {
    var keys = Lockr.keys();

    if (includeKeys) {
      return keys.reduce(function (accum, key) {
        var tempObj = {};
        
        tempObj[key] = Lockr.get(key);
        if(keyStartsWith){
          if( key.startsWith(keyStartsWith)){
            accum.push(tempObj);
          }
        }else{
          accum.push(tempObj);
        }
        
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
      storage.setItem(query_key, json);
    } catch (e) {
      if (console) console.warn("Lockr couldn't remove the "+ value +" from the set "+ key);
    }
  };

  Lockr.rm =  function (key) {
    var queryKey = this._getPrefixedKey(key);
    
    storage.removeItem(queryKey);
  };

  Lockr.flush = function () {
    if (Lockr.prefix.length) {
      Lockr.keys().forEach(function(key) {
        storage.removeItem(Lockr._getPrefixedKey(key));
      });
    } else {
      storage.clear();
    }
  };
  return Lockr;

};

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

function createDefer(){
  function createBaseDelay(){
    var FUNC_ERROR_TEXT = 'Expected a function';

    function baseDelay(func, wait, args) {
      if (typeof func !== 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function () { func.apply(undefined, args); }, wait);
    };

    return baseDelay;
  };
  function createRestParam(){
    var FUNC_ERROR_TEXT = 'Expected a function';
    var nativeMax = Math.max;

    function restParam(func, start) {
      if (typeof func !== 'function') {
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
      var baseDelay = new createBaseDelay,
          restParam = new createRestParam;

      var defer = restParam(function (func, args) {
        return baseDelay(func, 1, args);
      });

      return defer;
};

String.prototype.tarfNameFromTarefaTitle = function(){ 
  var aTextAr = this.split(' - ');
  return aTextAr.slice(1).join(' - ').trim();
};

String.prototype.dURI = function(){ 
  return decodeURI(this);
};
String.prototype.eURI = function(){ 
  return encodeURI(this);
};

String.prototype.esc = function(){ 
  return encodeURI(escape(this));
};
String.prototype.une = function(){ 
  return unescape(decodeURI(this));
};

String.prototype.escPtBr = function(){ 
  var accents =   "ÀÁÂÃàáâãÒÓÔÕóôõÉÊéêÇçÍíÚúüªº§°";
  var _this = this;
  for (var i = 0; i < accents.length; i++)
    _this = _this.replace(new RegExp(accents[i], 'g'), encodeURI( escape(accents[i]) ) );
  
  return _this.toString();
};
String.prototype.unePtBr = function(){ 
  return unescape(decodeURI(this));
};

String.prototype.PJeDataStringParaLocaleEn = function(){ 
  var _monthsShortPtBr = 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_');
  var _monthsShortEn = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
  
  var _thisSp = this.split(' ');
  
  _thisSp[1] = _monthsShortEn[_monthsShortPtBr.indexOf(_thisSp[1])];
  
  return _thisSp.join(' ');
};

String.prototype.replaceOrd = function(){ 
  var args = Array.from(arguments);
  var char = args.shift();
  var _this = this;
  for(var i in args)
    _this = _this.replace(char, args[i]);
    
  return _this;
};

// Extendendo a classe Date
class DataComFromatos extends Date {
  // Método para formatar a data no formato "dd-mm-yy"
  PJeFrontEndTarefaCardData() {
    const day = String(this.getDate()).padStart(2, '0');
    const month = String(this.getMonth() + 1).padStart(2, '0');
    const year = String(this.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  }

  PJeFrontEndTarefaCardDataNaDescricaoDoMovimento(){
    const day = String(this.getDate()).padStart(2, '0');
    const month = String(this.getMonth() + 1).padStart(2, '0');
    const year = String(this.getFullYear());

    return `${day}/${month}/${year}`;
  }

  static incrementarDecrementarDataString(incrementaTrueDecrementaFalse, inputDateAsString, passo){
    if(!passo)
      passo = 1
    // Parse a date string in the format "03/11/2023 23:59:59"
    const parts = inputDateAsString.split(/[\s/:-]/);
    const year = parseInt(parts[2], 10).toString().padStart(4, '0');
    const month = parseInt(parts[1], 10).toString().padStart(2, '0'); 
    const day = parseInt(parts[0], 10).toString().padStart(2, '0');
    const hour = parseInt(parts[3], 10).toString().padStart(2, '0');
    const minute = parseInt(parts[4], 10).toString().padStart(2, '0');
    const second = parseInt(parts[5], 10).toString().padStart(2, '0');
  
    // Crie uma nova data em UTC (sem considerar o fuso horário)
    let dateInUTC = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`).getTime();
    const DIA = 24 * 60 * 60 * 1000
  
    dateInUTC += incrementaTrueDecrementaFalse ? (DIA * passo) : (-1 * DIA * passo)
  
    dateInUTC = new Date(dateInUTC)
  
    // Converta a data para uma string no formato ISO 8601
    const isoString = dateInUTC.toISOString();
  
    return isoString;
  }

  static convertISOToBrazilianDateTime(isoString) {
    const date = new Date(isoString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Mês é base 0 (0 - janeiro, 1 - fevereiro, etc.)
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
  
    // Formate os componentes da data e hora para o formato brasileiro
    const formattedDateTime = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return formattedDateTime;
  }
}







var j2EUi = {
  createPanel : function(titleAsString, bodyAsJQuery, j2Attr, collapsable, panelClass){
    var divDef = {
      class : panelClass || 'rich-panel col-sm-12'
    }
    if(j2Attr)
      divDef[j2Attr] = j2Attr

    var $panel = jQ3('<div>', divDef)
    var $header = jQ3('<div>', {class : 'rich-panel-header', text : titleAsString})
    var $body = jQ3('<div>', {class : 'rich-panel-body panel', 'j2-ui-content':'j2'}).append(bodyAsJQuery)

    if(typeof collapsable !== 'undefined'){
      var [_id] = guid().split('-')
      _id = `j2-tog-${_id}`

      var $marker = jQ3(`<div class="rich-stglpanel-marker">
        <div class="rich-stglpnl-marker collapse" j2-marker ${_id}-marker >
          »
        </div>
      </div>`)      
      $header.prepend($marker)

      $body.attr(`${_id}-body`, '')
      $body.addClass('collpase')
      $marker.find('> div').addClass('collpase')

      $header.attr('data-toggle', 'collapse')
      $header.attr('data-target', `[${_id}-marker], [${_id}-body]`)
      if(collapsable.initExpanded){
        $body.attr('aria-expanded', collapsable.initExpanded)
        $marker.find('> div').attr('aria-expanded', collapsable.initExpanded)

        $body.addClass('in')
        $marker.find('> div').addClass('in')
      }
    }

    $panel.append(
      $header
    ).append(
      $body
    )

    $panel.$header = $header
    $panel.$body = $body

    return $panel
  },
  createWarnElements : function(warnTextOr$, severityClass){
    severityClass = severityClass || 'text-danger'
    var $set = jQ3(`<img src="/pje/img/al/secam.png"><span class="${severityClass}"></span>`)
    jQ3($set[1]).append(warnTextOr$)
    return $set
  },
  createTable : function(data){
    var table = jQ3('<table>', {class : 'rich-table'});
    var head  = jQ3('<thead>', {class : 'rich-table-thead'});
    var body  = jQ3('<tbody>');
    
    table.append(head);
    table.append(body);
    jQ3.each(data, function(key, row){
      var tr;
      if(key === 0){
        tr = jQ3('<tr>', {class : 'rich-table-subheader '});
        head.append(tr);
      }else{
        tr = jQ3('<tr>', {class : 'rich-table-row ' + (key === 1 ? 'rich-table-firstrow ' : '') });
        body.append(tr);
      }
      
      jQ3.each(row, function(key_, col){
        var tdh, div, span;
        
        if(key === 0){
          tdh = jQ3('<th>', {class : 'rich-table-subheadercell '}).append('<div>');
          div = jQ3('<div>');
          span = jQ3('<span>', {class : 'ml-5 mr-5 text-left'});
        }else{
          tdh = jQ3('<td>', {class : 'rich-table-cell text-break text-left '});
          div = jQ3('<div>', {class : 'col-sm-12'});
          span = jQ3('<span>', {class : 'text-left'});
        }  
        tr.append(tdh);
        tdh.append(div);
        div.append(span);
        span.html(col);
      });
    });
    
    return table;
  },
  spinnerHTML : ()=> { return `
    <style id="uS1">
      .pLog{font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;text-align:center; margin: 0; font-weight:bold;} 
      .divCont{width:100%;margin: auto;text-align: center;}
      .svg-preloader{margin:auto;font-size:0;display:inline-block;-webkit-animation:outer 6.6s linear infinite;animation:outer 6.6s linear infinite} 
      .svg-preloader svg{-webkit-animation:inner 1.32s linear infinite;animation:inner 1.32s linear infinite}
      .svg-preloader svg  circle{fill:none;stroke:#448AFF;stroke-linecap:square;-webkit-animation:arc 1.32s cubic-bezier(.8,0,.4,.8) infinite;animation:arc 1.32s cubic-bezier(.8,0,.4,.8) infinite}
      @-webkit-keyframes outer{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}
      @keyframes outer{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}
      @-webkit-keyframes inner{0%{-webkit-transform:rotate(-100.8deg);transform:rotate(-100.8deg)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}
      @keyframes inner{0%{-webkit-transform:rotate(-100.8deg);transform:rotate(-100.8deg)}100%{-webkit-transform:rotate(0);transform:rotate(0)}}
      @-webkit-keyframes arc{0%{stroke-dasharray:1 210.49px;stroke-dashoffset:0}40%{stroke-dasharray:151.55px,210.49px;stroke-dashoffset:0}100%{stroke-dasharray:1 210.49px;stroke-dashoffset:-151.55px}}
      @keyframes arc{0%{stroke-dasharray:1 210.49px;stroke-dashoffset:0}40%{stroke-dasharray:151.55px,210.49px;stroke-dashoffset:0}100%{stroke-dasharray:1 210.49px;stroke-dashoffset:-151.55px}}
    </style>
    <div class="divCont">
      <div class="svg-preloader">
          <svg version="1.1" height="30" width="30" viewBox="0 0 75 75">
              <circle cx="37.5" cy="37.5" r="33.5" stroke-width="8">
              </circle>
          </svg>
      </div>
    </div>     ` 
  },
  createButton : (textoButtonOrData, classButton, onclickAttr, id, tag, callback, moreAttrs) =>{    
        
    if (typeof textoButtonOrData === "object" && textoButtonOrData !== null) {
      classButton = textoButtonOrData.classButton
      onclickAttr = textoButtonOrData.onclickAttr
      id = textoButtonOrData.id
      tag = textoButtonOrData.tag
      callback = textoButtonOrData.callback
      moreAttrs = textoButtonOrData.moreAttrs
      textoButtonOrData = textoButtonOrData.textoButton
    }

    var $newBut =  jQ3(`<${tag || 'button'}>`, jQ3.extend({
      id : id || guid(),
      text : textoButtonOrData || '[TEXTO DO BOTÃO]',
      class : `btn ${classButton || ''}`,
      onclick : onclickAttr || 'event.preventDefault();'
    }, moreAttrs || {}));

    if(callback)
      $newBut.click( callback )

    return $newBut
  },
  createRichModal: ()=>{
    const $modal = jQ3(/*html*/`
      <div class="rich-modalpanel modal-small" id="j2E-rich-modal" style="position: absolute; z-index: 100; background-color: inherit;">
          <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="mpProgressoDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="mpProgressoFirstHref"></button></div>
          <div class="rich-mpnl-panel">
              <div class="rich-mp-container" id="mpProgressoCDiv" style="position: absolute; left: 527px; top: 323px; z-index: 9;">
                  <div class="rich-mpnl-shadow" id="mpProgressoShadowDiv" style="width: 0px; height: 0px;"></div>
                  <div class="rich-mpnl-ovf-hd rich-mpnl-trim rich-mpnl-content" id="mpProgressoContentDiv" style="width: 300px; height: 110px;">
                      <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="mpProgressoContentTable" style="height: 100%; width: 100%;">
                          <tbody>
                              <tr style="height: 99%;">
                                  <td class="rich-mpnl-body" valign="top">
                                      <div class="media">
                                          <div class="media-left media-middle">
                                              <div class="svg-preloader">
                                                  <svg version="1.1" height="30" width="30" viewBox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"></circle></svg>
                                              </div>
                                          </div>
                                          <div class="media-body">
                                              <h6>Por favor aguarde</h6>
                                          </div>
                                      </div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
          <div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="mpProgressoCursorDiv" style="z-index: -200;"><button class="rich-mpnl-button" id="mpProgressoLastHref"></button></div>
      </div>
    `)

    jQ3('body').append($modal)

    return {
      $mainContainer: $modal,
      replaceContent: ($newContent)=>{
        $modal.find('.rich-mpnl-content').replaceWith($newContent)
      }
    }
  },
  createRichModalComIframePainelUsuario: (headerDoPainel, urlIframe, userCloseCallback)=>{
    const $modal = jQ3(`<div class="rich-modalpanel modal-small" id="j2E-modalWithIframePainelUsuario" style="position: absolute; z-index: 100; background-color: inherit;">
                          <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="mpProgressoDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="mpProgressoFirstHref"></button></div>
                          <div class="rich-mpnl-panel">
                              <div class="rich-mp-container" id="modalWithIframePainelUsuarioDiv" style="position: absolute; left: 960px; top: 440px; z-index: 9;">
                                  <div class="rich-mpnl-shadow" id="modalWithIframePainelUsuarioDivDiv" style="width: 0px; height: 0px;"></div>
                                  <div class="rich-mpnl-ovf-hd rich-mpnl-trim rich-mpnl-content" id="mpProgressoContentDiv" style="width: 80vw; height: 80vh; max-width: unset;">
                                      <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="mpProgressoContentTable" style="height: 100%; width: 100%;">
                                          <tbody>
                                              <tr style="height: 99%;">
                                                  <td class="rich-mpnl-body" valign="top">
                                                    <div class="media" style="height: calc(75vh - 2px);">
                                                          <div class="media-body" style="height: 75vh;">
                                                          <i class="fa fa-times" style="float: right; padding: 9px 8px 5px 5px; font-size: 120%; cursor: pointer;"></i>
                                                              <h6>${headerDoPainel}</h6>
                                                              <iframe src="${urlIframe}" j2-modal-iframe="" style="height: 70vh; width: 100%; border-radius: 5px; border: 1px solid #0078aa;"></iframe>
                                                          </div>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
                          <div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="mpProgressoCursorDiv" style="z-index: -200;"><button class="rich-mpnl-button" id="mpProgressoLastHref"></button></div>
                      </div>`)

    jQ3('body').append($modal)
    $modal.find('i').click(()=>{
      j2EUi.removeModal()
      userCloseCallback && userCloseCallback()
    })
    return {
      $modal,
      header: $modal.find('h6'),
      iframe: $modal.find('iframe'),
    }
  },
  createNgModal:()=>{

  },
  removeModal:(modalId)=>{
    jQ3( modalId || '#j2E-modalWithIframePainelUsuario, #j2E-rich-modal, #j2E-ng-modal')
    .hide(500, function(){
      this.remove()
    })
  },
  Audiencias: {
    createPautaAudienciaContentOverlay:(result, dataPtBrFormato)=>{
      const CONTENT_TEMPLATE = /*html*/`
        <div class="rich-mpnl-content" >
            <div class="rich-mpnl-text rich-mpnl-controls">
                <a
                    id="fechar-modal-pauta-j2"
                    title="Fechar"
                    class="btn-fechar"
                >
                    <i class="icon-fechar"></i>
                </a>
            </div>
            <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table"  style="width: 800px; height: 1px;">
                <tbody>
                    <tr style="height: 1%;">
                        <td class="rich-mpnl-header-cell">
                            <div class="rich-mpnl-text rich-mpnl-header" style="white-space: nowrap; cursor: move;">Pauta de audiência para ${dataPtBrFormato}</div>
                        </td>
                    </tr>
                    <tr style="height: 99%;">
                        <td class="rich-mpnl-body" valign="top">
                            <table class="rich-table" style="vertical-aligment: top; white-space: nowrap;" border="0" cellpadding="0" cellspacing="0">
                                <colgroup span="5"></colgroup>
                                <thead class="rich-table-thead">
                                    <tr class="rich-table-header">
                                        <th class="rich-table-headercell" >Sala</th>
                                        <th class="rich-table-headercell" >Hora</th>
                                        <th class="rich-table-headercell" >Processo</th>
                                        <th class="rich-table-headercell" >Partes</th>
                                    </tr>
                                </thead>
                                <tbody id="processo-pauta-j2">
                                    
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      `
      const $content = jQ3(CONTENT_TEMPLATE)
      const $body = $content.find('tbody#processo-pauta-j2')

      result.jsonTable.forEach(jsonTr=>{
        const $tr = jQ3(/*html*/`
          <tr class="rich-table-row rich-table-firstrow">
              <td class="rich-table-cell text-center" >${jsonTr.Sala}</td>
              <td class="rich-table-cell text-center" >${jsonTr['Data/Hora'].match(/\b(\d{2}:\d{2})\b/).at(1)}</td>
              <td class="rich-table-cell text-center" ><a style="cursor:pointer" title="Visualizar processo ${jsonTr.Processo}">${jsonTr.Processo}</a></td>
              <td class="rich-table-cell text-left" >${jsonTr.Partes.replace(' X ', '<br/>')}</td>
          </tr>
        `)

        $tr.find('a').click(()=>{
          const url = result.$elementoTableAudiencias.find(`tr:contains("${jsonTr.Processo}")`).find('a').prop('href')
          if(!url) 
            return
          const [match, idProcesso, ca] = url.match(/(?:\?|&)id=(\d+).*?&ca=([a-f\d]+)/)
          j2EOpW.center(url, 'visualizar-proesso-de-pauta-', idProcesso)
        })

        $body.append($tr)
      })
      

      $content.find('#fechar-modal-pauta-j2').click(()=>{
        j2EUi.removeModal()
      })
      return $content
    },
    createLinkExibirPautaAudienciaDataAudienciaTarefa: (dataPtBrFormato)=>{
      const $aLink = jQ3(/*html*/`
        <a style="cursor:pointer" title="Ver pauta de audiência para ${dataPtBrFormato}">
          <span>${dataPtBrFormato}<i class="far fa-calendar-alt pl-5"></i></span>
        </a>
      `)

      $aLink.click(()=>{
        const dataIsoString = dataPtBrFormato.split('/').reverse().join('-')
        const $modal = j2EUi.createRichModal()
        j2E.SeamIteraction.audiencia.acoes.consultaPautaAudienciaData(dataIsoString).then(result=>{
          $modal.replaceContent(  j2EUi.Audiencias.createPautaAudienciaContentOverlay(result, dataPtBrFormato) )
          $modal.$mainContainer.removeClass('modal-small')
        })
      })

      return $aLink
    }
  },
  TarefaNumClique : {
    createTags : (arrayTags, tagsContainerClass, excluivel)=>{
      var _createTag = (tag)=>{
        var $tag = jQ3('<a>', {
          class: `btn btn-sm j2-tag-btn ${ excluivel ? ' j2-tag-no-pointer' : '' }`,
          onclick: 'event.stopPropagation(); event.preventDefault();',
          title: typeof tag === 'string' ? tag : tag.nomeTagCompleto,
          text : typeof tag === 'string' ? tag : tag.nomeTag,
          'j2-tag-a' : ''
        }).prepend(jQ3('<i>', {
          class : 'fa fa-tag',
          //title : 'title da tag', 
          'j2-tag-i' : ''
        }))
        if(excluivel){
          const $iRem = jQ3('<i>', {
            class : 'fa fa-times',
            //title : 'title da tag', 
            'j2-tag-i' : ''
          })
          $tag.append($iRem)
          $iRem.click(()=>{
            j2EPJeRest.etiquetas.remover(tag.idProcesso, tag.id)
            .done(res => $tag.remove() )
          })
        }
  
        return $tag;
      }

      var $div = jQ3('<div>', {
        class : tagsContainerClass || 'j2-tags-tarefa-num-clique'
      }).attr('j2-tags-rapidas', '')

      arrayTags.forEach(tag=>{
        $div.append( _createTag(tag) )
      })

      return $div;
    }
  },
  richModal : show =>{
    const _html = `
      <div j2-modal class="rich-modalpanel ajax-loader" id="modalStatusContainer-j2" style="position: absolute;z-index: 100;background-color: inherit;">
        <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="modalStatusDiv" style="z-index: -1;">
          <button class="rich-mpnl-button" id="modalStatusFirstHref"></button>
        </div>
        <div class="rich-mpnl-panel">
          <div class="rich-mp-container" id="modalStatusCDiv" style="position: absolute; left: 0px; top: 0px; z-index: 9;">
            <div class="rich-mpnl-shadow" id="modalStatusShadowDiv" style="opacity: 0; width: 1043px; height: 645px;" wfd-invisible="true"></div>
            <div class="rich-mpnl-ovf-hd rich-mpnl-trim rich-mpnl-content" id="modalStatusContentDiv" style="width: 300px; height: 200px;">
              <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="modalStatusContentTable" style="height: 100%; width: 100%;" wfd-invisible="true">
                <tbody>
                  <tr style="height: 99%">
                    <td class="rich-mpnl-body" valign="top"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- div class="rich-mpnl-resizer" id="modalStatusResizerN" style="width: 1043px; height: 4px; cursor: n-resize; left: 0px; top: 0px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerE" style="height: 645px; width: 4px; cursor: e-resize; left: 1039px; top: 0px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerS" style="width: 1043px; height: 4px; cursor: s-resize; left: 0px; top: 641px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerW" style="height: 645px; width: 4px; cursor: w-resize; left: 0px; top: 0px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerNWU" style="width: 40px; height: 4px; cursor: nw-resize; left: 0px; top: 0px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerNEU" style="height: 40px; width: 4px; cursor: ne-resize; left: 1039px; top: 0px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerNEL" style="width: 40px; height: 4px; cursor: ne-resize; left: 1003px; top: 0px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerSEU" style="height: 40px; width: 4px; cursor: se-resize; left: 1039px; top: 605px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerSEL" style="width: 40px; height: 4px; cursor: se-resize; left: 1003px; top: 641px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerSWL" style="height: 40px; width: 4px; cursor: sw-resize; left: 0px; top: 605px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerSWU" style="width: 40px; height: 4px; cursor: sw-resize; left: 0px; top: 641px;"></div>
            <div class="rich-mpnl-resizer" id="modalStatusResizerNWL" style="height: 40px; width: 4px; cursor: nw-resize; left: 0px; top: 0px;"></div-->
          </div>
        </div>
        <div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="modalStatusCursorDiv" style="z-index: -200;">
          <button class="rich-mpnl-button" id="modalStatusLastHref"></button>
        </div>
      </div>
    `;
    
    if (typeof show === 'undefined' || show) 
      jQ3('body').append(_html)
    else
      jQ3('#modalStatusContainer-j2').remove()
  }
};

function triggerMouseEvent(domNode){
  function _trigger(node, eventType) {
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
  }
  
  //--- Simulate a natural mouse-click sequence.
  _trigger (domNode, "mouseover");
  _trigger (domNode, "mousedown");
  _trigger (domNode, "mouseup");
  _trigger (domNode, "click");
}

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
(window.Modernizr = (function (a, b, c) {
  if(!(document.getElementsByTagName("script")[0]))
    return;
  
  function z(a) {
    j.cssText = a;
  }
  function A(a, b) {
    return z(m.join(a + ";") + (b || ""));
  }
  function B(a, b) {
    return typeof a === b;
  }
  function C(a, b) {
    return !!~("" + a).indexOf(b);
  }
  function D(a, b) {
    for (var d in a) {
      var e = a[d];
      if (!C(e, "-") && j[e] !== c) return b == "pfx" ? e : !0;
    }
    return !1;
  }
  function E(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f;
    }
    return !1;
  }
  function F(a, b, c) {
    var d = a.charAt(0).toUpperCase() + a.slice(1),
      e = (a + " " + o.join(d + " ") + d).split(" ");
    return B(b, "string") || B(b, "undefined") ? D(e, b) : ((e = (a + " " + p.join(d + " ") + d).split(" ")), E(e, b, c));
  }
  var d = "2.6.2",
    e = {},
    f = !0,
    g = b.documentElement,
    h = "modernizr",
    i = b.createElement(h),
    j = i.style,
    k,
    l = {}.toString,
    m = " -webkit- -moz- -o- -ms- ".split(" "),
    n = "Webkit Moz O ms",
    o = n.split(" "),
    p = n.toLowerCase().split(" "),
    q = {},
    r = {},
    s = {},
    t = [],
    u = t.slice,
    v,
    w = function (a, c, d, e) {
      var f,
        i,
        j,
        k,
        l = b.createElement("div"),
        m = b.body,
        n = m || b.createElement("body");
      if (parseInt(d, 10)) while (d--) (j = b.createElement("div")), (j.id = e ? e[d] : h + (d + 1)), l.appendChild(j);
      return (
        (f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join("")),
        (l.id = h),
        ((m ? l : n).innerHTML += f),
        n.appendChild(l),
        m || ((n.style.background = ""), (n.style.overflow = "hidden"), (k = g.style.overflow), (g.style.overflow = "hidden"), g.appendChild(n)),
        (i = c(l, a)),
        m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), (g.style.overflow = k)),
        !!i
      );
    },
    x = {}.hasOwnProperty,
    y;
  !B(x, "undefined") && !B(x.call, "undefined")
    ? (y = function (a, b) {
        return x.call(a, b);
      })
    : (y = function (a, b) {
        return b in a && B(a.constructor.prototype[b], "undefined");
      }),
    Function.prototype.bind ||
      (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError();
        var d = u.call(arguments, 1),
          e = function () {
            if (this instanceof e) {
              var a = function () {};
              a.prototype = c.prototype;
              var f = new a(),
                g = c.apply(f, d.concat(u.call(arguments)));
              return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(u.call(arguments)));
          };
        return e;
      }),
    (q.csstransforms3d = function () {
      var a = !!F("perspective");
      return (
        a &&
          "webkitPerspective" in g.style &&
          w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b, c) {
            a = b.offsetLeft === 9 && b.offsetHeight === 3;
          }),
        a
      );
    });
  for (var G in q) y(q, G) && ((v = G.toLowerCase()), (e[v] = q[G]()), t.push((e[v] ? "" : "no-") + v));
  return (
    (e.addTest = function (a, b) {
      if (typeof a == "object") for (var d in a) y(a, d) && e.addTest(d, a[d]);
      else {
        a = a.toLowerCase();
        if (e[a] !== c) return e;
        (b = typeof b == "function" ? b() : b), typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), (e[a] = b);
      }
      return e;
    }),
    z(""),
    (i = k = null),
    (function (a, b) {
      function k(a, b) {
        var c = a.createElement("p"),
          d = a.getElementsByTagName("head")[0] || a.documentElement;
        return (c.innerHTML = "x<style>" + b + "</style>"), d.insertBefore(c.lastChild, d.firstChild);
      }
      function l() {
        var a = r.elements;
        return typeof a == "string" ? a.split(" ") : a;
      }
      function m(a) {
        var b = i[a[g]];
        return b || ((b = {}), h++, (a[g] = h), (i[h] = b)), b;
      }
      function n(a, c, f) {
        c || (c = b);
        if (j) return c.createElement(a);
        f || (f = m(c));
        var g;
        return f.cache[a] ? (g = f.cache[a].cloneNode()) : e.test(a) ? (g = (f.cache[a] = f.createElem(a)).cloneNode()) : (g = f.createElem(a)), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g;
      }
      function o(a, c) {
        a || (a = b);
        if (j) return a.createDocumentFragment();
        c = c || m(a);
        var d = c.frag.cloneNode(),
          e = 0,
          f = l(),
          g = f.length;
        for (; e < g; e++) d.createElement(f[e]);
        return d;
      }
      function p(a, b) {
        b.cache || ((b.cache = {}), (b.createElem = a.createElement), (b.createFrag = a.createDocumentFragment), (b.frag = b.createFrag())),
          (a.createElement = function (c) {
            return r.shivMethods ? n(c, a, b) : b.createElem(c);
          }),
          (a.createDocumentFragment = Function(
            "h,f",
            "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
              l()
                .join()
                .replace(/\w+/g, function (a) {
                  return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
                }) +
              ");return n}"
          )(r, b.frag));
      }
      function q(a) {
        a || (a = b);
        var c = m(a);
        return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a;
      }
      var c = a.html5 || {},
        d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        f,
        g = "_html5shiv",
        h = 0,
        i = {},
        j;
      (function () {
        try {
          var a = b.createElement("a");
          (a.innerHTML = "<xyz></xyz>"),
            (f = "hidden" in a),
            (j =
              a.childNodes.length == 1 ||
              (function () {
                b.createElement("a");
                var a = b.createDocumentFragment();
                return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined";
              })());
        } catch (c) {
          (f = !0), (j = !0);
        }
      })();
      var r = {
        elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: c.shivCSS !== !1,
        supportsUnknownElements: j,
        shivMethods: c.shivMethods !== !1,
        type: "default",
        shivDocument: q,
        createElement: n,
        createDocumentFragment: o,
      };
      (a.html5 = r), q(b);
    })(this, b),
    (e._version = d),
    (e._prefixes = m),
    (e._domPrefixes = p),
    (e._cssomPrefixes = o),
    (e.testProp = function (a) {
      return D([a]);
    }),
    (e.testAllProps = F),
    (e.testStyles = w),
    (g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : "")),
    e
  );
})(this, this.document)),
  (function (a, b, c) {
    function d(a) {
      return "[object Function]" == o.call(a);
    }
    function e(a) {
      return "string" == typeof a;
    }
    function f() {}
    function g(a) {
      return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
      var a = p.shift();
      (q = 1),
        a
          ? a.t
            ? m(function () {
                ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
              }, 0)
            : (a(), h())
          : (q = 0);
    }
    function i(a, c, d, e, f, i, j) {
      function k(b) {
        if (!o && g(l.readyState) && ((u.r = o = 1), !q && h(), (l.onload = l.onreadystatechange = null), b)) {
          "img" != a &&
            m(function () {
              t.removeChild(l);
            }, 50);
          for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
        }
      }
      var j = j || B.errorTimeout,
        l = b.createElement(a),
        o = 0,
        r = 0,
        u = { t: d, s: c, e: f, a: i, x: j };
      1 === y[c] && ((r = 1), (y[c] = [])),
        "object" == a ? (l.data = c) : ((l.src = c), (l.type = a)),
        (l.width = l.height = "0"),
        (l.onerror = l.onload = l.onreadystatechange = function () {
          k.call(this, r);
        }),
        p.splice(e, 0, u),
        "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l));
    }
    function j(a, b, c, d, f) {
      return (q = 0), (b = b || "j"), e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this;
    }
    function k() {
      var a = B;
      return (a.loader = { load: j, i: 0 }), a;
    }
    var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0];
      if(!(n))
        return;
      var o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !!b.createRange().compareNode,
      t = s ? l : n.parentNode,
      l = a.opera && "[object Opera]" == o.call(a.opera),
      l = !!b.attachEvent && !l,
      u = r ? "object" : l ? "script" : "img",
      v = l ? "script" : u,
      w =
        Array.isArray ||
        function (a) {
          return "[object Array]" == o.call(a);
        },
      x = [],
      y = {},
      z = {
        timeout: function (a, b) {
          return b.length && (a.timeout = b[0]), a;
        },
      },
      A,
      B;
    (B = function (a) {
      function b(a) {
        var a = a.split("!"),
          b = x.length,
          c = a.pop(),
          d = a.length,
          c = { url: c, origUrl: c, prefixes: a },
          e,
          f,
          g;
        for (f = 0; f < d; f++) (g = a[f].split("=")), (e = z[g.shift()]) && (c = e(c, g));
        for (f = 0; f < b; f++) c = x[f](c);
        return c;
      }
      function g(a, e, f, g, h) {
        var i = b(a),
          j = i.autoCallback;
        i.url.split(".").pop().split("?").shift(),
          i.bypass ||
            (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]),
            i.instead
              ? i.instead(a, e, f, g, h)
              : (y[i.url] ? (i.noexec = !0) : (y[i.url] = 1),
                f.load(i.url, i.forceCSS || (!i.forceJS && "css" == i.url.split(".").pop().split("?").shift()) ? "c" : c, i.noexec, i.attrs, i.timeout),
                (d(e) || d(j)) &&
                  f.load(function () {
                    k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), (y[i.url] = 2);
                  })));
      }
      function h(a, b) {
        function c(a, c) {
          if (a) {
            if (e(a))
              c ||
                (j = function () {
                  var a = [].slice.call(arguments);
                  k.apply(this, a), l();
                }),
                g(a, j, b, 0, h);
            else if (Object(a) === a)
              for (n in ((m = (function () {
                var b = 0,
                  c;
                for (c in a) a.hasOwnProperty(c) && b++;
                return b;
              })()),
              a))
                a.hasOwnProperty(n) &&
                  (!c &&
                    !--m &&
                    (d(j)
                      ? (j = function () {
                          var a = [].slice.call(arguments);
                          k.apply(this, a), l();
                        })
                      : (j[n] = (function (a) {
                          return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l();
                          };
                        })(k[n]))),
                  g(a[n], j, b, n, h));
          } else !c && l();
        }
        var h = !!a.test,
          i = a.load || a.both,
          j = a.callback || f,
          k = j,
          l = a.complete || f,
          m,
          n;
        c(h ? a.yep : a.nope, !!i), i && c(i);
      }
      var i,
        j,
        l = this.yepnope.loader;
      if (e(a)) g(a, 0, l, 0);
      else if (w(a)) for (i = 0; i < a.length; i++) (j = a[i]), e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
      else Object(a) === a && h(a, l);
    }),
      (B.addPrefix = function (a, b) {
        z[a] = b;
      }),
      (B.addFilter = function (a) {
        x.push(a);
      }),
      (B.errorTimeout = 1e4),
      null == b.readyState &&
        b.addEventListener &&
        ((b.readyState = "loading"),
        b.addEventListener(
          "DOMContentLoaded",
          (A = function () {
            b.removeEventListener("DOMContentLoaded", A, 0), (b.readyState = "complete");
          }),
          0
        )),
      (a.yepnope = k()),
      (a.yepnope.executeStack = h),
      (a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"),
          l,
          o,
          e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        (c = j ? h : c || f),
          (k.onreadystatechange = k.onload = function () {
            !l && g(k.readyState) && ((l = 1), c(), (k.onload = k.onreadystatechange = null));
          }),
          m(function () {
            l || ((l = 1), c(1));
          }, e),
          i ? k.onload() : n.parentNode.insertBefore(k, n);
      }),
      (a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"),
          j,
          c = i ? h : c || f;
        (e.href = a), (e.rel = "stylesheet"), (e.type = "text/css");
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0));
      });
  })(this, document),
  (typeof Modernizr !== 'undefined' && (Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0));
  }));


/* baseado no menu.js do PJe*/
function PJeMenuFactory(window, $) {
    'use strict';
    if(!(document.getElementsByTagName("script")[0]))
      return;
  
    var mapaCaracteresAcentuados = [
        {'base':'A', 'letras':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
        {'base':'AA','letras':/[\uA732]/g},
        {'base':'AE','letras':/[\u00C6\u01FC\u01E2]/g},
        {'base':'AO','letras':/[\uA734]/g},
        {'base':'AU','letras':/[\uA736]/g},
        {'base':'AV','letras':/[\uA738\uA73A]/g},
        {'base':'AY','letras':/[\uA73C]/g},
        {'base':'B', 'letras':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
        {'base':'C', 'letras':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
        {'base':'D', 'letras':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
        {'base':'DZ','letras':/[\u01F1\u01C4]/g},
        {'base':'Dz','letras':/[\u01F2\u01C5]/g},
        {'base':'E', 'letras':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
        {'base':'F', 'letras':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
        {'base':'G', 'letras':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
        {'base':'H', 'letras':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
        {'base':'I', 'letras':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
        {'base':'J', 'letras':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
        {'base':'K', 'letras':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
        {'base':'L', 'letras':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
        {'base':'LJ','letras':/[\u01C7]/g},
        {'base':'Lj','letras':/[\u01C8]/g},
        {'base':'M', 'letras':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
        {'base':'N', 'letras':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
        {'base':'NJ','letras':/[\u01CA]/g},
        {'base':'Nj','letras':/[\u01CB]/g},
        {'base':'O', 'letras':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
        {'base':'OI','letras':/[\u01A2]/g},
        {'base':'OO','letras':/[\uA74E]/g},
        {'base':'OU','letras':/[\u0222]/g},
        {'base':'P', 'letras':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
        {'base':'Q', 'letras':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
        {'base':'R', 'letras':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
        {'base':'S', 'letras':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
        {'base':'T', 'letras':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
        {'base':'TZ','letras':/[\uA728]/g},
        {'base':'U', 'letras':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
        {'base':'V', 'letras':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
        {'base':'VY','letras':/[\uA760]/g},
        {'base':'W', 'letras':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
        {'base':'X', 'letras':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
        {'base':'Y', 'letras':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
        {'base':'Z', 'letras':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
        {'base':'a', 'letras':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
        {'base':'aa','letras':/[\uA733]/g},
        {'base':'ae','letras':/[\u00E6\u01FD\u01E3]/g},
        {'base':'ao','letras':/[\uA735]/g},
        {'base':'au','letras':/[\uA737]/g},
        {'base':'av','letras':/[\uA739\uA73B]/g},
        {'base':'ay','letras':/[\uA73D]/g},
        {'base':'b', 'letras':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
        {'base':'c', 'letras':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
        {'base':'d', 'letras':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
        {'base':'dz','letras':/[\u01F3\u01C6]/g},
        {'base':'e', 'letras':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
        {'base':'f', 'letras':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
        {'base':'g', 'letras':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
        {'base':'h', 'letras':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
        {'base':'hv','letras':/[\u0195]/g},
        {'base':'i', 'letras':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
        {'base':'j', 'letras':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
        {'base':'k', 'letras':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
        {'base':'l', 'letras':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
        {'base':'lj','letras':/[\u01C9]/g},
        {'base':'m', 'letras':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
        {'base':'n', 'letras':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
        {'base':'nj','letras':/[\u01CC]/g},
        {'base':'o', 'letras':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
        {'base':'oi','letras':/[\u01A3]/g},
        {'base':'ou','letras':/[\u0223]/g},
        {'base':'oo','letras':/[\uA74F]/g},
        {'base':'p','letras':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
        {'base':'q','letras':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
        {'base':'r','letras':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
        {'base':'s','letras':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
        {'base':'t','letras':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
        {'base':'tz','letras':/[\uA729]/g},
        {'base':'u','letras':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
        {'base':'v','letras':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
        {'base':'vy','letras':/[\uA761]/g},
        {'base':'w','letras':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
        {'base':'x','letras':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
        {'base':'y','letras':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
        {'base':'z','letras':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
    ];
    
    function classReg(className) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
      hasClass = function(elem, c) {
        return elem.classList.contains(c);
      };
      addClass = function(elem, c) {
        elem.classList.add(c);
      };
      removeClass = function(elem, c) {
        elem.classList.remove(c);
      };
    }
    else {
      hasClass = function(elem, c) {
        return classReg(c).test(elem.className);
      };
      addClass = function(elem, c) {
        if (!hasClass(elem, c)) {
          elem.className = elem.className + ' ' + c;
        }
      };
      removeClass = function(elem, c) {
        elem.className = elem.className.replace(classReg(c), ' ');
      };
    }

    function toggleClass(elem, c) {
      var fn = hasClass(elem, c) ? removeClass : addClass;
      fn(elem, c);
    }

    var classie = {
      // full names
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      // short names
      has: hasClass,
      add: addClass,
      remove: removeClass,
      toggle: toggleClass
    };

    if (typeof define === 'function' && define.amd) {
      define(classie);
    } else {
      window.classie = classie;
    }
	
	/**
	 * Define a heranca entre classe A e a classe B
	 * 
	 * @param {Object} a
	 * @param {Object} b
	 * @returns {Object}
	 */
	function extend(a, b) {
		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	/**
	 * Checa se o elemento tem um pai
	 * @param {Object} e
	 * @param {string} id
	 * @returns {Boolean}
	 */
	function temPai(e, id) {
		if (!e) return false;
		var el = e.target||e.srcElement||e||false;
		while (el && el.id != id) {
			el = el.parentNode||false;
		}
		return (el!==false);
	};
	
	/**
	 * Checa o nivel de profundidade ate o ponto de parada predefinido
	 * @param {Object} e
	 * @param {string} id
	 * @param {string} pontoDeParada
	 * @param {number} nivel
	 * @returns {Number}
	 */
	function nivelProfundidade(e, id, pontoDeParada, nivel) {
		nivel = nivel || 0;
		if (e.id.indexOf(id) >= 0) return nivel;
		if(classie.has(e, pontoDeParada)) {
			++nivel;
		}
		return e.parentNode && nivelProfundidade(e.parentNode, id, pontoDeParada, nivel);
	};
	
	/**
	 * Checa se a aplicacao esta sendo executada via mobile
	 * @returns {Boolean}
	 */
	function checarMobile() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s)|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp(i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac(|\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt(|\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg(g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v)|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|)|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
	
	/**
	 * Checa qual o elemento mais proximo com a classe especificada
	 * @param {Object} e
	 * @param {string} classname
	 * @returns {Boolean}
	 */
	function maisProximo(e, classname) {
		if(classie.has(e, classname)) {
			return e;
		}
		return e.parentNode && maisProximo(e.parentNode, classname);
	};

	/**
	 * Classe de atribuicao de eventos de navegacao do menu
	 * 
	 * @param {Object} $menu
	 * @param {Object} $botao
	 */
	function menuNavegacao($menu, $botao) {
		this.el = $menu;
		this.botao = $botao;
		this.opcoes = {
			tipoEfeito : 'cover',
			espacamento : 40,
			classeVoltar : 'btn-voltar'
		};

		this.suportaAnimacao = Modernizr.csstransforms3d;
		if(this.suportaAnimacao) {
			this._init();
		}
	};
	
	/**
	 * @override
	 */
	menuNavegacao.prototype = {
		/**
		 * @constructor
		 */
		_init : function() {
			var self = this;
			this.aberto = false;
			this.level = 0;
			this.wrapper = document.getElementsByClassName('content')[0];
			this.campoBusca = document.querySelector('.menu-busca input');
			this.menuItems = Array.prototype.slice.call(this.el.querySelectorAll('li'));
			this.nivelAnterior = Array.prototype.slice.call(this.el.querySelectorAll('.' + this.opcoes.classeVoltar));
			this.tipoEvento = checarMobile() ? 'touchstart' : 'click';
			this.niveis = Array.prototype.slice.call(this.el.querySelectorAll('div.nivel'));
			
			this.niveis.forEach(function(el, i) { 
				el.setAttribute('data-level', nivelProfundidade(el, self.el.id, 'nivel')); 
			});
			
			classie.add(this.el, this.opcoes.tipoEfeito);

			this.carregar();
		},
		
		/**
		 * Atribui os eventos ao clicar nos botoes abrir menu, voltar e itens de menu
		 */
		carregar : function() {
			var self = this;
			
			/**
			 * Fecha o menu ao clicar do lado de fora
			 * @param {Object} el 
			 */
			var recolheMenu = function(el) {
				self.fecharMenu();
				el.removeEventListener(self.tipoEvento, recolheMenu);
				self.campoBusca.value = '';
				document.querySelector('.menu-busca .resultado-busca > ul.lista').innerHTML = '';
			};

			// Alterna exibicao do menu
			if (this.botao != null ) {
				this.botao.addEventListener(this.tipoEvento, function(ev) {
					ev.stopPropagation();
					ev.preventDefault();
					
					if(self.aberto) {
						self.fecharMenu();
					} else {
						self.abrirMenu();
						//Coloca o campo de busca em foco
						self.campoBusca.focus();
						
						// Recolhe o menu ao clicar em qualquer outro lugar da tela
						document.addEventListener(self.tipoEvento, function(ev) {
							if(self.podeSerFechado(ev)) {
								recolheMenu(this);
							}
						});
					}
				});
			}
			
			/**
			 * Verifica se o menu pode ser fechado
			 * @param {event} ev
			 */
			this.podeSerFechado = function(ev){
				return self.aberto && !temPai(ev.target, self.el.id) && ev.target != self.campoBusca;
			};

			// abrindo um submenu
			this.menuItems.forEach(function(item, i) {
				// verifica se tem um submenu
				var subnivel = item.querySelector('div.nivel');
				if(subnivel){
					item.querySelector('a').addEventListener(self.tipoEvento, function(ev) {
						ev.preventDefault();
						var level = maisProximo(item, 'nivel').getAttribute('data-level');
						var menuRaiz = document.querySelector('.nivel[data-level="1"]');
						
						if(self.level <= level) {
							ev.stopPropagation();
							classie.add(maisProximo(item, 'nivel'), 'nivel-overlay');
							menuRaiz.scrollTop = 0;
							self.abrirMenu(subnivel);
						}
					});
				}
			});

			// fechando os subniveis:
			// checando a parte visivel
			this.niveis.forEach(function(el, i) {
				el.addEventListener(self.tipoEvento, function(ev) {
					ev.stopPropagation();
					var level = el.getAttribute('data-level');
					if(self.level > level) {
						self.level = level;
						self.fecharSubmenus();
					}
				});
			});

			// Ao clicar em um elemento especifico
			this.nivelAnterior.forEach(function(el, i) {
				el.addEventListener(self.tipoEvento, function(ev) {
					ev.preventDefault();
					var level = maisProximo(el, 'nivel').getAttribute('data-level');
					if(self.level <= level) {
						ev.stopPropagation();
						self.level = maisProximo(el, 'nivel').getAttribute('data-level') - 1;
						self.level === 0 ? self.fecharMenu(): self.fecharSubmenus();
					}
				});
			});
		},
		
		/**
		 * Abre o menu e|ou submenu
		 * @param {Object} subnivel
		 */
		abrirMenu : function(subnivel) {
			// Incrementa o nivel de profundidade
			++this.level;

			// Arrasta o box principal
			var recuo = (this.level - 1) * this.opcoes.espacamento;
			var	translateVal = this.opcoes.tipoEfeito === 'overlap' ? this.el.offsetWidth + recuo : this.el.offsetWidth;

			this.transformar('translate3d(' + translateVal + 'px,0,0)');

			if(subnivel) {
				// Reseta o subnivel
				this.transformar('', subnivel);

				for(var i = 0, len = this.niveis.length; i < len; ++i) {
					var nivel = this.niveis[i];
					if(nivel != subnivel && !classie.has(nivel, 'nivel-aberto')) {
						this.transformar('translate3d(-100%,0,0) translate3d(' + -1*recuo + 'px,0,0)', nivel);
					}
				}
			}

			// Adiciona classe empurrar ao abrir o primeiro nivel do menu
			if(this.level === 1) {
				classie.add(this.wrapper, 'empurrar');
				this.aberto = true;
			}
			// Aciciona a classe nivel-aberto ao abrir menu
			classie.add(subnivel || this.niveis[0], 'nivel-aberto');
			classie.add(this.botao, 'active');
		},
		
		/**
		 * Fecha o menu
		 */
		fecharMenu : function() {
			this.transformar('translate3d(0,0,0)');
			this.level = 0;
			classie.remove(this.wrapper, 'empurrar');
			classie.remove(this.botao, 'active');
			this.alternarNiveis();
			this.aberto = false;
		},
		
		/**
		 * Fecha submenus
		 */
		fecharSubmenus : function() {
			var translateVal = this.opcoes.tipoEfeito === 'overlap' ? this.el.offsetWidth + (this.level - 1) * this.opcoes.espacamento : this.el.offsetWidth;
			this.transformar('translate3d(' + translateVal + 'px,0,0)');
			this.alternarNiveis();
		},
		
		/**
		 * Aplica efeito CSS de arrastar menus
		 * @param {string} val
		 * @param {Object} el
		 */
		transformar : function(val, el) {
			el = el || this.wrapper;
			el.style.WebkitTransform = val;
			el.style.MozTransform = val;
			el.style.transform = val;
		},
		
		/**
		 *	Remove as classes de nivel-aberto de menus fechados 
		 */
		alternarNiveis : function() {
			for(var i = 0, len = this.niveis.length; i < len; ++i) {
				var nivel = this.niveis[i];
				if(nivel.getAttribute('data-level') >= this.level + 1) {
					classie.remove(nivel, 'nivel-aberto');
					classie.remove(nivel, 'nivel-overlay');
				}
				else if(Number(nivel.getAttribute('data-level')) == this.level) {
					classie.remove(nivel, 'nivel-overlay');
				}
			}
		}
	};

	var menus = window.menusJSON || {};
	var CIMA = 40;
    var BAIXO = 38;
    var DIREITA = 39;
    var ESQUERDA = 37;
    var TAB = 9;
    var ESC = 27;
    var SEPARADOR = ' &middot; ';
	
	/**
	 * Classe de pesquisa de menus
	 */
	function Pesquisa(menus){
	  var self = this;
	  var menus = menus || {};
	  var inputBusca = document.querySelector('.menu-busca input.form-control');
	  var autocomplete = document.querySelector('.menu-busca .resultado-busca > ul.lista');
	  var LIMITE_BUSCA = 3;
	  self.resultados = [];
	  
	  /**
	   * Dispara o evento de busca ao digitar mais de 3 caracteres
	   * @param {event} e
	   */
	  this.buscar = function(e){
	    var termo = inputBusca.value || '';

	    if(self.podeSerBuscado(termo, e)){
		    self.resultados = [];
		    termo = self.removerAcentos(termo.toLowerCase());
		    self.procurarTermo(menus, termo);
		    self.exibirResultados();
	    }else{
	    	self.selecionarResultado(e);
	    }
	    
	    document.addEventListener('keydown', self.fechar);
	  };
	  
	  /**
	   * Checa se o comprimento do termo esta de acordo com o LIMTE_BUSCA 
	   * e nenhuma tecla de selecao foi pressionada 
	   * @param {string} termo
	   * @param {event} e
	   * @returns {Boolean}
	   */
	  this.podeSerBuscado = function(termo, e){
		  var teclaSelecao = [CIMA, BAIXO, DIREITA, ESQUERDA, TAB];
		  
		  return termo.length >= LIMITE_BUSCA && teclaSelecao.indexOf(e.keyCode) == -1;
	  };
	  
	  /**
	   * Procura todos os itens de menu que contenham o termo procurado
	   * @param {Object[]} menusLista
	   * @param {string} termo
	   * @param {string} prefixo
	   */
	  this.procurarTermo = function(menusLista, termo, prefixo){
	    var prefixo = prefixo || '';
	    var prefixoAnterior = '';

	    menusLista.forEach(function(menu){
	      if(self.temFilhos(menu)){
	        prefixoAnterior = prefixo;
	        prefixo = prefixo + menu.nome + SEPARADOR;
	        self.procurarTermo(menu.itens, termo, prefixo);
	        prefixo = prefixoAnterior;
	      }

	      var titulo = self.removerAcentos(menu.nome.toLowerCase());
	      termo = self.removerAcentos(termo);
	      
	      if(titulo.search(termo) != -1){
	        self.adicionarMenuComLink(prefixo, menu);
	      }
	    });
	  };

	  /**
	   * Adiciona menus e submenus com link que contem o termo procurado
	   * @param {string} prefixo
	   * @param {Object} menu
	   */
	  this.adicionarMenuComLink = function(prefixo, menu){
	    if(menu.url != '#'){
	    	self.resultados.push({nome: prefixo + '<b>'+menu.nome+'</b>', url: menu.url});
	    }else{
	    	self.adicionarSubmenus(prefixo + '<b>'+menu.nome+'</b>', menu);
	    }
	  };
	  
	  /**
	   * Adiciona todos os submenus de um menu equivalente ao termo procurado
	   * @param {string} prefixo
	   * @param {Object} menu
	   */
	  this.adicionarSubmenus = function(prefixo, menu){
		var prefixoInterno = prefixo; 
		var prefixoAnterior = '';
		
	    if(self.temFilhos(menu)){
	    	menu.itens.forEach(function(menu){
	    		prefixoAnterior = prefixoInterno;
	    		prefixoInterno = prefixoInterno + SEPARADOR + menu.nome;
	    		self.adicionarSubmenus(prefixoInterno, menu);
	    		prefixoInterno = prefixoAnterior;
	    	});
	    }
	    
	    if(menu.url != '#'){
	    	self.resultados.push({nome: prefixoInterno, url: menu.url});
	    }
	  };
	  
	  /**
	   * Verifica se o item de menu tem submenus
	   * @param {Object[]} menu
	   * @returns {Boolean}
	   */
	  this.temFilhos = function(menu){
	    return (menu['itens'] && menu.itens.length > 0);
	  };
	  
	  /**
	   * Remove acentos de uma string
	   * @param {string} termo
	   */
	  this.removerAcentos = function(termo){
		  for(var i=0; i<mapaCaracteresAcentuados.length; i++) {
			  termo = termo.replace(mapaCaracteresAcentuados[i].letras, mapaCaracteresAcentuados[i].base);
		  }

          return termo;
	  };
	  
	  /**
	   * Limpa e exibe lisgatem de resultados encontrados
	   */
	  this.exibirResultados = function(){
	    autocomplete.innerHTML = self.criarLista();
	  };
	  
	  /**
	   * Gera o html da listagem de resultados
	   * @returns {string}
	   */
	  this.criarLista = function(){
	    var html = '';
	    self.resultados.forEach(function(menu){
	      html += '<li><a href="'+menu.url+'">'+menu.nome+'</a></li>';
	    });
	    return html;
	  };
	  
	  /**
	   * Fecha a tela de busca ao clicar em fechar ou pressionar a tecla ESC
	   * @param {event} e
	   */
	  this.fechar = function(e){
		  var fechado = (e.type == 'click' || e.keyCode == ESC);
		  if(fechado){
			  var botaoSidebar = document.getElementsByClassName('botao-menu')[0];
			  botaoSidebar.click();
			  inputBusca.value = '';
			  self.ocultarResultados();
			  document.removeEventListener('keydown', self.fechar);
		  };
	  };
	  
	  /**
	   * Limpa os resultados apresentados
	   */
	  this.ocultarResultados = function(){
	    autocomplete.innerHTML = '';
	  };
	  
	  /**
	   * Seleciona um resultado ao pressionar teclas (cima, baixo, esquerda, direita)
	   * @param {event} e
	   */
	  this.selecionarResultado = function(e){
		  if(!self.podeSerSelecionado()){
			  return false;
		  };
		  
		  var irProximo = [CIMA, DIREITA];
		  var irAnterior = [BAIXO, ESQUERDA];
		  var selecionado = document.querySelector('.menu-busca .resultado-busca > ul > li > a:focus') || autocomplete.lastChild.firstChild || undefined;
	
		  if(irProximo.indexOf(e.keyCode) != -1){
		        try{
		          selecionado = selecionado.parentElement.nextSibling.firstElementChild;
		        }catch(err){
		          selecionado = document.querySelector('.menu-busca .resultado-busca > ul li:first-child > a');
		        }
		        selecionado.focus();
		  }
	
		  if(irAnterior.indexOf(e.keyCode) != -1){
		        try{
		          selecionado = selecionado.parentElement.previousSibling.firstElementChild;
		        }catch(err){
		          selecionado = document.querySelector('.menu-busca .resultado-busca > ul li:last-child > a');
		        }
		        selecionado.focus();
		  }
	  };
	  
	  /**
	   * Checa se ha resultados para selecionar
	   * @return {Boolean}
	   */
	  this.podeSerSelecionado = function(){
		  return self.resultados.length > 0;
	  };
	  
	  /**
	   * Destaca o campo e o icone de busca ao entrar em foco
	   * @param {event} e
	   */
	  this.destacar = function(e){
		  var campoBusca = inputBusca.parentNode;

		  if(e.type == 'blur'){
			  campoBusca.classList.remove('ativo');
		  }else{
			  campoBusca.classList.add('ativo');
		  }
	  };
	  
	  /**
	   * @constructor
	   * Associa os eventos abrir e fechar tela de busca, buscar e selecionar resultado
	   */
	  this._init = function(){
	    inputBusca.addEventListener('keyup', self.buscar);
	    inputBusca.addEventListener('focus', self.destacar);
	    inputBusca.addEventListener('blur', self.destacar);
	    autocomplete.addEventListener('keyup', self.selecionarResultado);
	  };
	  
	  return self._init();
	};
	
	/**
	 * Classe de criacao de menu
	 * 
	 * @param {Object[]} nav
	 */
	function Menu(nav){
	  var self = this;
	  var pesquisa;
	  var submenus;
	  self.sidebar = document.querySelector('.nivel > ul');
	  self.botao = document.getElementsByClassName('botao-menu')[0];
	  self.menus = nav.Menu || {};
	  self.iconeVoltar = '';
	  
	  /**
	   * Cria menu e associa eventos de navegacao e busca
	   */
	  this.gerarMenu = function(){
		var menuHtml = self.gerarMenuItens(self.menus);
		if(self.sidebar){
			self.sidebar.insertAdjacentHTML('beforeend', menuHtml);
                        return {
                          menuNavegacao : new menuNavegacao(document.getElementById('menu'), self.botao),
                          Pesquisa : new Pesquisa(self.menus)
                        };
		}
	  };
	  
	  /**
	   * Verifica se existe JSON com menus disponiveis para criacao da navegacao
	   * @returns {boolean} 
	   */
	  this.checarMenusDisponiveis = function(){
		  if(JSON.stringify(self.menus) == '{}'){
			  self.removerBotaoMenu();
			  return false;
		  }
		  return true;
	  };
	  
	  /**
	   * Verifica se existe o botao do menu e remove
	   */
	  this.removerBotaoMenu = function(){
		  if(self.botao){
			  self.botao.remove();
		  }
	  };
	  
	  /**
	   * Gera recusivamente o html de listagem menus baseado em json de menus
	   * @param {Object[]} menusLista
	   * @param {string[]} iconeVoltar
	   * @returns {string} html
	   */
	  this.gerarMenuItens = function(menusLista){
	    var html = '';
	
	    menusLista.forEach(function(menu, i){
	      var temFilhos = self.possuiFilhos(menu);
	      var icone = self.gerarIcones(menu, temFilhos);
	
	      html += '<li><a href="'+menu.url+'">'+ icone.raiz +' '+ menu.nome +' '+icone.submenu+'</a>';
	      if(temFilhos){
	        html += self.criarSubmenu(menu.nome, menu.itens);
	      }
	      html += '</li>';
	    });
	    return html;
	  };
	
	  /**
	   * Gera painel de submenu com titulo e botao voltar
	   * @param {string} nome
	   * @param {Object[]} menuItens
	   * @return {string} submenu
	   */
	  this.criarSubmenu = function(nome, menuItens){
	    var submenu = '<div class="nivel">'
	                  +'<a class="btn-voltar" href="#"><i class="fa fa-caret-left"></i> '+self.iconeVoltar+' '+nome+'</a>'
	                  +'<ul>';
	    submenu += self.gerarMenuItens(menuItens);
	    submenu +='</ul></div>';
	    return submenu;
	  };
	  
	  /**
	   * Cria icones de menu e submenus
	   * @param {Object[]} menu
	   * @param {boolean} temFilhos
	   * @return {Object}
	   */
	  this.gerarIcones = function(menu, temFilhos){
		  var icone = {
			'raiz': (menu.icone)? '<i class="'+menu.icone+'"></i>': '',
			'submenu': temFilhos? '<i class="fa fa-angle-right"></i>': '',
		  };
	      self.iconeVoltar = (icone.raiz != '')? icone.raiz : self.iconeVoltar;
	      return icone;
	  };
	
	  /**
	   * Verifica se o menu possui submenus
	   * @param {Object[]} menu
	   * @returns {Boolean}
	   */
	  this.possuiFilhos = function(menu){
	    return (menu['itens'] && menu.itens.length > 0);
	  };
	  
	  /**
	   * Adiciona icones no menu raiz
	   */
	  this.adicionarIcones = function(){
		  var icone = {
				'painel': 'fa fa-desktop icone-nav',  
				'processo': 'fa fa-folder-open-o icone-nav',  
				'atividades': 'fa fa-pencil-square-o icone-nav',  
				'audi\u00EAnciasesess\u00F5es': 'far fa-calendar-alt icone-nav',  
				'configura\u00E7\u00E3o': 'fa fa-cog icone-nav',  
				'gest\u00E3o': 'fa fa-bar-chart icone-nav',
		  };
		  
		  self.menus.forEach(function(menu, i){
			  var titulo = menu.nome.replace(/\s/gi, '').toLowerCase();
			  self.menus[i]['icone'] = icone[titulo];
		  });
	  };
	
	  /**
	   * @constructor
	   * Dispara a construcao do menu;
	   */
	  this._init = function(){
		  if(self.checarMenusDisponiveis()){
			  self.adicionarIcones();
			  return self.gerarMenu();
		  };
	  };
	  
	  return self._init();
	};
	
	/**
	 * @builder
	 * Define Menu como global 
	 * @param {Object[]} menus
	 */
	window.Menu = Menu;
};

function UserException(message) {
   this.message = message;
   this.name = "UserException";
}



function j2EQueryTaarefas(numeroProcesso, competencia, etiquetas, successCallback){
  
  function _data(){
    return JSON.stringify({
      numeroProcesso : numeroProcesso || "",        
      competencia : competencia || "",        
      etiquetas : etiquetas || []      
    });
  }
  
  jQ3.ajax({
    url : "https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/tarefas",
    type : 'post',
    data : _data(),
    dataType: 'json',
    success : function(data, status, xhr){
      if(successCallback)
        successCallback(data, status, xhr);
    },
    headers : {
      "Content-Type": "application/json",
      "authorization": "Basic MDA2NDE4MDUzMDY6MTIzNDU=",
      "x-no-sso": "true",
      "x-pje-legacy-app": "pje-tjma-1g",
      "x-pje-cookies": document.cookie,
      xhrFields: {
        withCredentials: true
      }
    },
    beforeSend : function(xhr, set){
      delete set.accepts.xml;
      delete set.accepts.script;
      delete set.accepts.html;
    }
  });
}

function j2EQueryTarefaProcessoByNumUnico(numUnico, successCallback){
  if(!(numUnico)){
    throw new Error("Não existe número único para consultar"); 
    return;
  }
  
  j2EQueryTaarefas(numUnico, null, null, successCallback);
}

function j2EQueryDadosTarefaDoProcesso(queryTarefa, numProcesso, successCallback, queryCriteria){
  if(!(queryTarefa)){
    throw new Error("Não existem dados de consulta da tarefa"); 
    return;
  }
  
  function _data(){
    return JSON.stringify(jQ3.extend({
      "numeroProcesso": numProcesso,
      "classe":null,
      "tags":[],
      "tagsString":null,
      "poloAtivo":null,
      "poloPassivo":null,
      "orgao":null,
      "ordem":null,
      "page":0,
      "maxResults": 30,
      "idTaskInstance":null,
      "apelidoSessao":null,
      "idTipoSessao":null,
      "dataSessao":null,
      "somenteFavoritas":null,
      "objeto":null,
      "semEtiqueta":null,
      "assunto":null,
      "dataAutuacao":null,
      "nomeParte":null,
      "nomeFiltro":null,
      "numeroDocumento":null,
      "competencia":"",
      "relator":null,
      "orgaoJulgador":null,
      "somenteLembrete":null,
      "somenteSigiloso":null,
      "somenteLiminar":null,
      "eleicao":null,
      "estado":null,
      "municipio":null,
      "prioridadeProcesso":null,
      "cpfCnpj":null,
      "porEtiqueta":null,
      "conferidos":null
    }, queryCriteria || {} ));
  };
  
  var _url = "https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/recuperarProcessosTarefaPendenteComCriterios/$/false";
  _url = _url.replace('$', encodeURI(queryTarefa.nome));
  
  jQ3.ajax({
    url : _url,
    type : 'post',
    data : _data(),
    dataType: 'json',
    success : function(data, status, xhr){
      if(successCallback)
        successCallback(data, status, xhr);
    },
    headers : {
      "Content-Type": "application/json",
      "authorization": "Basic MDA2NDE4MDUzMDY6MTIzNDU=",
      "x-no-sso": "true",
      "x-pje-legacy-app": "pje-tjma-1g",
      "x-pje-cookies": document.cookie,
      xhrFields: {
        withCredentials: true
      }
    },
    beforeSend : function(xhr, set){
      delete set.accepts.xml;
      delete set.accepts.script;
      delete set.accepts.html;
    }
  });
}

function j2EQueryGetChaveAcesso(idProcesso, successCallback){
  if(!(idProcesso)){
    throw new Error("Não existe processo para consulta"); 
    return;
  }
    
  return jQ3.ajax({
    url : "https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/gerarChaveAcessoProcesso/" + idProcesso,
    type : 'get',
    dataType: 'text',
    success : function(data, status, xhr){
      if(successCallback)
        successCallback(data, status, xhr);
    },
    headers : {
      "Content-Type": "application/json",
      "authorization": "Basic MDA2NDE4MDUzMDY6MTIzNDU=",
      "x-no-sso": "true",
      "x-pje-legacy-app": "pje-tjma-1g",
      "x-pje-cookies": document.cookie,
      xhrFields: {
        withCredentials: true
      }
    },
    beforeSend : function(xhr, set){
      delete set.accepts.xml;
      delete set.accepts.script;
      delete set.accepts.html;
    }
  });
}

function j2EQueryGetProcessoId(numProcesso, successCallback, errorCallback){
  j2EQueryGetProcessoCredentials(numProcesso, successCallback, errorCallback, true);
}

function j2EQueryGetProcessoCredentials(numProcesso, successCallback, errorCallback, getOnlyId){
  function _alt(numProcesso, continueCallback){
    var thisW;
    //center : function(url, name, idProcesso, winSize, scrolled, callback, altTitle){
    /*thisW = j2EOpW.corner('https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/listView.seam', 'consultaProcesso' + guid(), null, null, null, function(){
      thisW.add
    });*/
    
    var numUnico = {
      numero  : numProcesso.substr(0, 7),
      digito  : numProcesso.substr(7, 2), 
      ano     : numProcesso.substr(9, 4),
      unidade : numProcesso.substr(16, 4)
    };
    
    function prepareObserve(__$){
      var targetNodes = __$("form#fPP");
      var MutationObserver = thisW.MutationObserver || thisW.WebKitMutationObserver;
      var myObserver = new MutationObserver(function(rec){
        if(rec[0].addedNodes){
          __$('table tbody#fPP\\:processosTable\\:tb tr td:first a', rec[0].addedNodes).each(function(){
            var _a = __$(this);
            var match = true;

            __$.each(numUnico, function(idx, key){
              match &= _a.text().includes(key);
            });

            if( !(match) )
              return;

            var _exp = _a.prop('outerHTML').match(/idProcessoSelecionado':[0-9]+/);
            if(!(_exp)){
              continueCallback(-1);
              return;
            }
            
            var _ = _exp.toString().split(':');
            continueCallback(_[1]);
            thisW.close();
          });
        }
      });

      //--- Add a target node to the observer. Can only add one node at a time.
      targetNodes.each(function() {
        myObserver.observe(this, {
          childList: true
        });
      });
    }
    
    //center : function(url, name, idProcesso, winSize, scrolled, callback, altTitle){
    thisW = j2EOpW.corner( 'https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/listView.seam', 'consultaProcesso-' + numProcesso + '-' + guid(), null, { width : 25, height: 25} );
    thisW.addEventListener("load", function(a, b, c, d){
      function _runAutoSearch(){
        var $ = thisW.jQuery_21 || thisW.jQuery;

        prepareObserve($);

        $('#fPP\\:numeroProcesso\\:numeroSequencial')       .val( numUnico.numero );
        $('#fPP\\:numeroProcesso\\:numeroDigitoVerificador').val( numUnico.digito );
        $('#fPP\\:numeroProcesso\\:Ano')                    .val( numUnico.ano );
        $('#fPP\\:numeroProcesso\\:NumeroOrgaoJustica')     .val( numUnico.unidade );

        $('#fPP\\:searchProcessos')[0].click();
      }
      
      function checkJQuery() { // tappac as new
        if (typeof thisW.jQuery_21 !== 'undefined' || typeof thisW.jQuery !== 'undefined') {
          _runAutoSearch();
        }else {
          defer( checkJQuery, 100 );
        }
      }
      checkJQuery();
    }); 
  }
  
  numProcesso = numProcesso.replaceAll('.', '').replaceAll('-', ''); 
  
  try{  
    j2EQueryTarefaProcessoByNumUnico(numProcesso, function(data, status, xhr){
      try{
        j2EQueryDadosTarefaDoProcesso(data[0], numProcesso, function(_data, _status, _xhr){
          try{
            if(!(getOnlyId))
              j2EQueryGetChaveAcesso(_data.entities[0].idProcesso, function(__data, __status, __xhr){
                successCallback(_data.entities[0].idProcesso, __data);
              });
            else
              successCallback(_data.entities[0].idProcesso, _data.entities[0]);
          }catch(e){
            alert('Erro ao abrir o processo');
          }
        });
      }catch(e){
        _alt(numProcesso, function(idProcesso){  
          if(idProcesso === -1){
            errorCallback && errorCallback();
          }
          
          if(!(getOnlyId)) 
            j2EQueryGetChaveAcesso(idProcesso, function(__data, __status, __xhr){
              successCallback(idProcesso, __data);
            });
          else
            successCallback(idProcesso);
        });
      }
    });
  }catch(e){
    alert('Erro ao abrir o processo');
  }
}

function loadPJeRestAndSeamInteraction(){
  window.j2EPJeRest =  {
    ajax : {
      get : function(url, sucCB, errCB, dataType){
        return jQ3.ajax({
          url : url,
          type : 'get',
          dataType: dataType || 'json',
          success : function(data, status, xhr){
            if(sucCB)
              sucCB(data, status, xhr);
          },
          error : function(a, b, c, d){
            if(errCB)
              errCB(a, b, c, d);
          },
          headers : {
            "Content-Type": "application/json",
            "authorization": "Basic MDA2NDE4MDUzMDY6MTIzNDU=",
            "x-no-sso": "true",
            "x-pje-legacy-app": "pje-tjma-1g",
            "x-pje-cookies": document.cookie,
            xhrFields: {
              withCredentials: true
            }
          },
          beforeSend : function(xhr, set){
            delete set.accepts.xml;
            delete set.accepts.script;
            delete set.accepts.html;
          }
        });
      },
      post : function(url, data, sucCB, errCB){
        return jQ3.ajax({
          url : url,
          type : 'post',
          data : data,
          dataType: 'json',
          success : function(data, status, xhr){
            if(sucCB)
              sucCB( data, status, xhr);
          },
          error : function(a, b, c, d){
            if(errCB)
              errCB(a, b, c, d);
          },
          headers : {
            "Content-Type": "application/json",
            "authorization": "Basic MDA2NDE4MDUzMDY6MTIzNDU=",
            "x-no-sso": "true",
            "x-pje-legacy-app": "pje-tjma-1g",
            "x-pje-cookies": document.cookie,
            xhrFields: {
              withCredentials: true
            }
          },
          beforeSend : function(xhr, set){
            delete set.accepts.xml;
            delete set.accepts.script;
            delete set.accepts.html;
          }
        });
      }
    },
    etiquetas : {
      listar : function(queryCriteria, sucCB, errCB){

        function _data(){
          return JSON.stringify(jQ3.extend({
            maxResults : 30,
            page :  0,
            tagsString : ""
          }, queryCriteria || {} ));
        };
        
        return j2EPJeRest.ajax.post("https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/etiquetas", 
                              _data(), sucCB, errCB);
      },
      processosDaEtiqueta : function(idEtiqueta, sucCB, errCB){
        if(!(idEtiqueta)){
          throw new Error("Não existe id da etiqueta definido para consulta"); 
          return;
        }
        return j2EPJeRest.ajax.get('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/etiquetas/$/processos'.replace('$', idEtiqueta), 
                              sucCB, errCB);
      },
      inserir : function(idProcesso, etiqueta, sucCB, errCB) {
        function _data(){
          return JSON.stringify({
            'idProcesso' : idProcesso,
            'tag' : etiqueta
          });
        }
        return j2EPJeRest.ajax.post("https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/processoTags/inserir", 
                              _data(), sucCB, errCB);
      },
      remover : function(idProcesso, etiqueta, sucCB, errCB) {
        function _data(){
          return JSON.stringify({
            'idProcesso' : idProcesso,
            'idTag' : etiqueta
          });
        }
        return j2EPJeRest.ajax.post("https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/processoTags/remover", 
                              _data(), sucCB, errCB);
      },
      //https://git.cnj.jus.br/socioeducativo/sedu-pje/pje/-/blob/develop/pje-web/src/main/java/br/jus/cnj/pje/webservice/controller/painelusuariointerno/PainelUsuarioInternoRestController.java
      doProcesso: (idProcesso, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/painelUsuario/processoTags/listar/${idProcesso}`, 
                            sucCB, errCB);
      }
      
    },
    tarefas : {
      _baseQuery : function(){
        return {
          "numeroProcesso": "", "classe": null,"tags": [],"tagsString": null,
          "poloAtivo": null,"poloPassivo": null,"orgao": null,"ordem": null,
          "page": 0,"maxResults": 30,"idTaskInstance": null,"apelidoSessao": null,
          "idTipoSessao": null,"dataSessao": null,"somenteFavoritas": null,
          "objeto": null,"semEtiqueta": null,"assunto": null,"dataAutuacao": null,
          "nomeParte": null,"nomeFiltro": null,"numeroDocumento": null,
          "competencia": "","relator": null,"orgaoJulgador": null,"somenteLembrete": null,
          "somenteSigiloso": null,"somenteLiminar": null,"eleicao": null,
          "estado": null,"municipio": null,"prioridadeProcesso": null,"cpfCnpj": null,
          "porEtiqueta": null,"conferidos": null
        };
      },
      listar : function(sucCB, errCB){
        return j2EPJeRest.ajax.get('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/tarefas', 
                            sucCB, errCB);
      },
      historico : function(idProcesso, sucCB, errCB){
        return j2EPJeRest.ajax.get('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/historicoTarefas/'+idProcesso, 
                            sucCB, errCB);
      },
      descricaoNoFluxo : function(idTarefa, idProcesso, sucCB, errCB){
        return j2EPJeRest.ajax.get('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/breadcrumb/$/$'.replaceOrd('$', idTarefa, idProcesso), 
                            sucCB, errCB);
      },
      recuperarEtiquetasQuantitativoProcessoTarefaPendente : function(tarefa, query, sucCB, errCB){
        var baseQuery = j2EPJeRest.tarefas._baseQuery();
        
        var nHref = 'https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/recuperarEtiquetasQuantitativoProcessoTarefaPendente/$/false';
        nHref = nHref.replaceOrd('$', encodeURI(tarefa));
        
        baseQuery = JSON.stringify(jQ3.extend(baseQuery, query));

        return j2EPJeRest.ajax.post(nHref, baseQuery, sucCB, errCB);
      },
      recuperarProcessosTarefaPendenteComCriterios : function(tarefa, query, sucCB, errCB){
        var baseQuery = j2EPJeRest.tarefas._baseQuery();    
        
        var nHref = 'https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/recuperarProcessosTarefaPendenteComCriterios/$/false';
        nHref = nHref.replaceOrd('$', encodeURI(tarefa));
        
        baseQuery = JSON.stringify(jQ3.extend(baseQuery, query));

        return j2EPJeRest.ajax.post(nHref, baseQuery, sucCB, errCB);
      },
      painelUsuario : function(query, sucCB, errCB){
        var baseQuery ={
            numeroProcesso: "",
            competencia: "",
            etiquetas: []
        };
        baseQuery = JSON.stringify( jQ3.extend(baseQuery, query) );
        
        return j2EPJeRest.ajax.post('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/tarefas', 
                            baseQuery, sucCB, errCB);
      },
      //https://git.cnj.jus.br/socioeducativo/sedu-pje/pje/-/blob/develop/pje-web/src/main/java/br/jus/cnj/pje/webservice/controller/ProcessoJudicialRestController.java
      doProcesso: (idProcesso, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/processos/${idProcesso}/tarefas`, 
                            sucCB, errCB);
      }
    },
    processo : {
      getCredentials : j2EQueryGetProcessoCredentials,
      getChaveAcesso : (idProcesso,sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/gerarChaveAcessoProcesso/${idProcesso}`, 
                            sucCB, errCB, 'text');
      },
      getAutosDigitais: (idProcesso, ca, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=${idProcesso}&ca=${ca}`, 
                            sucCB, errCB, 'html');
      },
      validarNumeroProcesso: (numeroProcesso, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/processos/numero-processo/${numeroProcesso}/validar`, 
                            sucCB, errCB, 'text');
      },
      obterIdProcesso: (numeroProcesso, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/processos/numero-processo/${numeroProcesso}/validar`, 
                            sucCB, errCB, 'text');
      },
      //https://git.cnj.jus.br/socioeducativo/sedu-pje/pje/-/blob/develop/pje-web/src/main/java/br/jus/cnj/pje/webservice/controller/ProcessoJudicialRestController.java
      obterTarefas: (idProcesso, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/processos/${idProcesso}/tarefas`, 
                            sucCB, errCB);
      },
      movimentacoes : {
        obterTodas: (idProcesso, sucCB, errCB) =>{
          return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/processos/${idProcesso}/movimentacoes`, 
                              sucCB, errCB);
        },
        obterUltima: (idProcesso, sucCB, errCB) =>{
          return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/processos/${idProcesso}/ultimoMovimento`, 
                              sucCB, errCB);
        },
        obterUltimaPeloNumeroUnico: (numProc, sucCB, errCB) =>{
          let def = jQ3.Deferred()

          j2EPJeRest.processo.obterIdProcesso(numProc)
          .pipe( idProcesso =>{
            return j2EPJeRest.processo.movimentacoes.obterUltima(idProcesso)
          }).
          done( ultimoMovimento =>{
            sucCB && sucCB(ultimoMovimento)
            def.resolve(ultimoMovimento)
          })
          .fail(err =>{
            errCB && errCB(err)
            def.reject(err)
          })

          return def.promise()
        },
      },
      /**
       * Vide https://git.cnj.jus.br/socioeducativo/sedu-pje/pje/-/blob/develop/pje-web/src/main/java/br/jus/pje/api/controllers/v1/ProcessoJudicialRestController.java
       * 
       * @param idProcessoOuNumeroUnicoFormatado O ID do processo ou o número único formatado. [tipo: string]
       * @param sucCB Callback para manipular a resposta bem-sucedida da solicitação. [tipo: função]
       * @param errCB Callback para manipular erros durante a solicitação. [tipo: função]
       * @returns Resultado da solicitação.
       */
      getDadosCompletos: (idProcessoOuNumeroUnicoFormatado, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${idProcessoOuNumeroUnicoFormatado}`, 
                            sucCB, errCB);
      },
      partes : {
        getTodas: (idProcessoOuNumeroUnicoFormatado, sucCB, errCB) =>{
          return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${idProcessoOuNumeroUnicoFormatado}/partes`, 
                              sucCB, errCB);
        },
        getPoloAtivo: (idProcessoOuNumeroUnicoFormatado, sucCB, errCB) =>{
          return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${idProcessoOuNumeroUnicoFormatado}/polos/ativos`, 
                              sucCB, errCB);
        },
        getPassivo: (idProcessoOuNumeroUnicoFormatado, sucCB, errCB) =>{
          return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${idProcessoOuNumeroUnicoFormatado}/polos/passivos`, 
                              sucCB, errCB);
        },
        getTerceiros: (idProcessoOuNumeroUnicoFormatado, sucCB, errCB) =>{
          return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${idProcessoOuNumeroUnicoFormatado}/polos/terceiros`, 
                              sucCB, errCB);
        },
        getTodosOsPolos: (idProcessoOuNumeroUnicoFormatado, sucCB, errCB) =>{
          return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${idProcessoOuNumeroUnicoFormatado}/polos`, 
                              sucCB, errCB);
        },
      },
      obterAssuntos: (idProcessoOuNumeroUnicoFormatado, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${idProcessoOuNumeroUnicoFormatado}/assuntos`, 
                            sucCB, errCB);
      },
      //https://git.cnj.jus.br/socioeducativo/sedu-pje/pje/-/blob/develop/pje-web/src/main/java/br/jus/cnj/pje/webservice/controller/painelusuariointerno/PainelUsuarioInternoRestController.java
      obterEtiquetas: (idProcesso, sucCB, errCB) =>{
        return j2EPJeRest.ajax.get(`/pje/seam/resource/rest/pje-legacy/painelUsuario/processoTags/listar/${idProcesso}`, 
                            sucCB, errCB);
      }
    },
    fluxo : {
      listarTransicoes : function(idTarefa, sucCB, errCB){
        return j2EPJeRest.ajax.get(`https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/transicoes/${idTarefa}`, 
                            sucCB, errCB);
      },
      movimentar : function(idTarefa, transicao, sucCB, errCB){
        transicao = encodeURI(transicao)
        return j2EPJeRest.ajax.get(`https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/movimentar/${idTarefa}/${transicao}`, 
                            sucCB, errCB);
      },
    }
  };

  if( typeof window.j2E === 'undefined')
    window.j2E = {}

  j2E.SeamIteraction = ( $ => { var _lockr  = new createLockr('j2E'); var _this = {
    session : [],
    util : {
      conformPayload : PAYLOAD =>{
        PAYLOAD=PAYLOAD.split('\n').map( function(_i ) { 
          _i = _i.replace(': ','=')
          return _i.trim()
        })
    
        PAYLOAD.shift()
        PAYLOAD.pop()
    
        return encodeURI(PAYLOAD.join('&') )
      },
      liberarViewsExpiradas: () =>{
        _this.session = _this.session.filter(ses => { 
          return ses.expiration >= new Date().getTime() 
        })
      },
      obterNovaExpiracao: ()=>{
        return new Date().getTime() + (3 * 60 * 1000)
      }
    },
    alertas : {
      requestsIteractionsGetter : () => { 
        const requestsIteractions = {
          baseURL : `https://pje.tjma.jus.br/pje/Alerta/listView.seam`,
          $elementoTRDoAlertaEncontrado: {},
          $xmlDoFormulario: {},
          session: null,
          liberarAView: ()=>{
            requestsIteractions.session.ocupado = false
            requestsIteractions.session.expiration = _this.util.obterNovaExpiracao()
            lockr.set('SeamIteraction.sessions', _this.session)
          },
          listView : () =>{
            const def = $.Deferred()

            _this.session = _lockr.get('SeamIteraction.sessions', [])
            _this.util.liberarViewsExpiradas()

            const alertasSessions = _this.session.filter(ses => { 
              return ses.pagina === 'alertas' && !ses.ocupado
            })

            if( ! alertasSessions.length ){
              $.get(requestsIteractions.baseURL)
              .done( (xml)=> { 
                var $html = $(xml)
                var viewId = $html.find('#javax\\.faces\\.ViewState').val()
                
                requestsIteractions.session = { 
                  viewId: viewId,
                  pagina: 'alertas',
                  expiration: _this.util.obterNovaExpiracao(),
                  ocupado: true
                }

                _this.session.push(requestsIteractions.session)

                lockr.set('SeamIteraction.sessions', _this.session)
    
                def.resolve( requestsIteractions ) 
              } )
              .fail( err => def.reject(err) )
            }else{
              requestsIteractions.session = alertasSessions[0]
              requestsIteractions.session.ocupado = true
              requestsIteractions.session.expiration = _this.util.obterNovaExpiracao()
              lockr.set('SeamIteraction.sessions', _this.session)

              requestsIteractions.tabPesquisaSelection()
              .done( () => { 
                def.resolve( requestsIteractions ) 
              } )
              .fail( err => def.reject(err) )
            }

            return def.promise()
          },
          tabPesquisaSelection : (recursive)=>{
            var def = $.Deferred()

            var PAYLOAD = `
              AJAXREQUEST: _viewRoot
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              search: search
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            const it = requestsIteractions

            $.post(it.baseURL, PAYLOAD)
            .done( (xml) => { 
              const $xml = jQ3(xml)
              const viewStillIsFrom = !! $xml.find('textarea')?.prop('id')?.match(/alertaForm/)
              
              if(viewStillIsFrom){
                debugger;
                if(recursive){
                  def.reject("Recursão para obter falhou")
                  return
                }
                it.tabPesquisaSelection(true)
                .done( () => def.resolve( it, xml ) )
                .fail( err => def.reject(err) )
              }else
                def.resolve( it, xml ) 
            } )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          clicarEditarAlertaNaLista : ()=>{
            var def = $.Deferred()
  
            var PAYLOAD = `
              alertaForm:alerta:j_id286:alerta: ${alerta}
              alertaForm:inCriticidade:inCriticidadeDecoration:inCriticidade: ${criticidade || 'I'}
              alertaForm:ativo:ativoDecoration:ativoSelectOneRadio: true
              alertaForm:saveH: Incluir
              alertaForm: alertaForm
              autoScroll: 
              javax.faces.ViewState: ${_this.session.viewId}
            `;
  
            PAYLOAD = _this.util.conformPayload(PAYLOAD)
  
            $.post(_this.alertas.requestsIteractions.baseURL, PAYLOAD)
            .done( () => def.resolve( _this.alertas.requestsIteractions ) )
            .fail( err => def.reject(err) )
  
            return def.promise();
          },
          tabFormSelection : ()=>{
            var def = $.Deferred()

            var PAYLOAD = `
              AJAXREQUEST: _viewRoot
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              form: form
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            $.post(requestsIteractions.baseURL, PAYLOAD)
            .done( () => { def.resolve( requestsIteractions ) } )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          addAlerta : (alerta, criticidade)=>{
            var def = $.Deferred()

            var PAYLOAD = `
              alertaForm:alerta:j_id286:alerta: ${alerta}
              alertaForm:inCriticidade:inCriticidadeDecoration:inCriticidade: ${criticidade || 'I'}
              alertaForm:ativo:ativoDecoration:ativoSelectOneRadio: true
              alertaForm:saveH: Incluir
              alertaForm: alertaForm
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
            `;

            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            $.post(requestsIteractions.baseURL, PAYLOAD)
            .done( () => def.resolve( requestsIteractions ) )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          alterarAlerta : (alerta, criticidade, ativo)=>{
            const def = $.Deferred()
            const $xmlDoFormulario =  requestsIteractions.$xmlDoFormulario
            const containerId = $xmlDoFormulario.find('#alertaForm\\:update').attr('onclick').toString()
                                .match(/'containerId':'[^']*'/)[0].match(/'[^']*'/g)[1].replaceAll("'", '')

            let PAYLOAD = `
              AJAXREQUEST: ${containerId}
              alertaForm:alerta:j_id286:alerta: ${alerta}
              alertaForm:inCriticidade:inCriticidadeDecoration:inCriticidade: ${criticidade || 'I'}
              alertaForm:ativo:ativoDecoration:ativoSelectOneRadio: ${ ativo || 'true'}
              alertaForm: alertaForm
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              alertaForm:update: alertaForm:update
              AJAX:EVENTS_COUNT: 1
            `;

            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            $.post(requestsIteractions.baseURL, PAYLOAD)
            .done( () => def.resolve( requestsIteractions ) )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          searchAlerta: (query, criticidade, ativo)=>{
            var def = $.Deferred()

            var PAYLOAD = `
              AJAXREQUEST: j_id137
              alertaGridSearchForm:page: 1
              alertaGridSearchForm:searching: true
              alertaGridSearchForm:j_id141:ativoDecoration:ativo: ${ativo || ''}
              alertaGridSearchForm:j_id152:inCriticidadeDecoration:inCriticidade: ${ criticidade || 'org.jboss.seam.ui.NoSelectionConverter.noSelectionValue'}
              alertaGridSearchForm:j_id162:j_id164:alerta: ${query}
              alertaGridSearchForm: alertaGridSearchForm
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              alertaGridSearchForm:search: alertaGridSearchForm:search
              AJAX:EVENTS_COUNT: 1
            `;

            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            $.post(requestsIteractions.baseURL, PAYLOAD)
            .done( xml => { 
              requestsIteractions.$elementoTRDoAlertaEncontrado = 
              jQ3(xml).find('#alertaGridList\\:tb tr:first')

              def.resolve( xml, requestsIteractions)  
            })
            .fail( err => def.reject(err) )

            return def.promise();
          },
          /**
           * Considera que houve uma consulta e existe um único registro a ser dada
           * a ação para editar o registro
           */
          editarOAlertaEncontrado: ()=>{
            const def = $.Deferred()
            const $elmentoTR = requestsIteractions.$elementoTRDoAlertaEncontrado
            const alertaGridListAlertaGridEdit = $elmentoTR.find('a:first').attr('id');
            const containerId = $elmentoTR.find('a:first').attr('onclick').toString()
                                .match(/'containerId':'[^']*'/)[0].match(/'[^']*'/g)[1].replaceAll("'", '')
            const formId = $elmentoTR.find('form').attr('id');
            const id = $elmentoTR.find('a:first').attr('onclick').toString().match(/'id':\d+/)[0].match(/\d+/)[0]

            var PAYLOAD = `
              AJAXREQUEST: ${containerId}
              ${formId}: ${formId}
              autoScroll: 
              ${alertaGridListAlertaGridEdit}: ${alertaGridListAlertaGridEdit}
              tab: form
              id: ${id}
              AJAX:EVENTS_COUNT: 1
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
            `;

            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            $.post(requestsIteractions.baseURL, PAYLOAD)
            .done( (xml) =>{
              requestsIteractions.$xmlDoFormulario = jQ3(xml)

              def.resolve( requestsIteractions ) 
            })
            .fail( err => def.reject(err) )

            return def.promise();
          }
        }
        return requestsIteractions
      },
      acoes : {
        adicionarUmAlertaSemAssociarProcesso : textoAlerta => {
          const def = $.Deferred()
          const requestsIteractions = _this.alertas.requestsIteractionsGetter()
          const defFail = (err)=>{
            requestsIteractions.liberarAView()
            def.reject(err)
          }

          requestsIteractions.listView()
          .done( 
            it => it.tabFormSelection()
            .done( 
              it => it.addAlerta( textoAlerta )
              .done( it => { 
                requestsIteractions.liberarAView()

                def.resolve() 
              })
              .fail( defFail )

            ).fail( defFail )
          )
          .fail( defFail )

          return def.promise()
        },
        pesquisarAlertaELiberarAViewEmCadeia: (()=>{
          const bufferChain = []
          function previousLink(){
            return bufferChain[bufferChain.length - 2] 
          }

          return (query, criticidade, ativo) => {            
            const def = jQ3.Deferred()

            bufferChain.push( { def } )

            if(bufferChain.length === 1)
              j2E.SeamIteraction.alertas.acoes.pesquisarAlertaELiberarAView( 
                query, criticidade, ativo 
              ).done( ( alerta, xml, acoes ) => { 
                bufferChain.shift()
                def.resolve( alerta, xml, acoes ) 
              })
              .done( err => def.reject(err) )
            else{
              previousLink().def.done(()=>{ 
                j2E.SeamIteraction.alertas.acoes.pesquisarAlertaELiberarAView( 
                  query, criticidade, ativo
                ).done( ( alerta, xml, acoes ) => { 
                  bufferChain.shift()
                  def.resolve( alerta, xml, acoes ) 
                })
                .done( err => def.reject(err) ) })
            }

            return def.promise()
          }
        })() ,
        pesquisarAlertaELiberarAView: (query, criticidade, ativo) => {
          const def = $.Deferred()

          _this.alertas.acoes.pesquisarAlerta(query, criticidade, ativo)
          .done( (alerta, xml, acoes, requestsIteractions) =>{
            requestsIteractions.liberarAView()

            def.resolve( alerta, xml, acoes )
          })
          .fail( err => def.reject(err) )

          return def.promise()
        },
        pesquisarAlerta : (query, criticidade, ativo) => {
          const def = $.Deferred()
          const acoes = _this.alertas.acoes
          const requestsIteractions = _this.alertas.requestsIteractionsGetter()
          const defFail = (err)=>{
            requestsIteractions.liberarAView()
            def.reject(err)
          }

          requestsIteractions.listView()
          .done( 
            it => it.searchAlerta(query, criticidade, ativo)
            .done( xml => { 
              var alerta = $(xml).find('#alertaGridList\\:tb').find('tr:first-child >td:nth-child(2)').text()
              def.resolve(alerta, xml, acoes, requestsIteractions ) 
            } )
            .fail( defFail )
          )
          .fail( defFail )

          return def.promise()
        },
        alterarAlertaEncontrado : (requestsIteractions, textoAlertaAlterado, criticidade, ativo) => {
          const def = $.Deferred()
          const acoes = _this.alertas.acoes
          const textoBuffer = requestsIteractions.$elementoTRDoAlertaEncontrado.find('td:nth-child(2)').text()

          if(textoAlertaAlterado === textoBuffer){
            requestsIteractions.liberarAView()
            
            return def.resolve(acoes).promise()
          }

          requestsIteractions.editarOAlertaEncontrado()
          .pipe( it => it.alterarAlerta( textoAlertaAlterado, criticidade, ativo ) )
          .done( () => def.resolve(acoes) )
          .fail( err => def.reject(err) )
          .always( ()=> requestsIteractions.liberarAView() )

          return def.promise()
        }
      }
    },
    audiencia : {
      requestsIteractionsGetter : () => { 
        const requestsIteractions = {
          baseURL : `/pje/ProcessoAudiencia/PautaAudiencia/listView.seam`,
          responseHistory: [],
          session: null,
          liberarAView: ()=>{
            requestsIteractions.session.ocupado = false
            requestsIteractions.session.expiration = _this.util.obterNovaExpiracao()
            lockr.set('SeamIteraction.sessions', _this.session)
          },
          listView : () =>{
            const def = $.Deferred()

            _this.session = _lockr.get('SeamIteraction.sessions', [])
            _this.util.liberarViewsExpiradas()

            const audienciaSessions = _this.session.filter(ses => { 
              return ses.pagina === 'audiencia' && !ses.ocupado
            })

            if( ! audienciaSessions.length ){
              $.get(requestsIteractions.baseURL)
              .done( (xml)=> { 
                var $html = $(xml)
                var viewId = $html.find('#javax\\.faces\\.ViewState').val()

                requestsIteractions.responseHistory.push({
                  iteraction: 'listView',
                  $xml: $html
                })
                
                const containerId = $html.find('#processoAudienciaSearchForm')
                    .prop('outerHTML').match(/'containerId':'processoAudienciaSearchForm:(j_id\d+)'/).at(1)
                const paramId = $html.find('input.btn-primary')
                    .prop('outerHTML').match(/'processoAudienciaSearchForm:(j_id\d+)':'1'/).at(1)
                const jurisdicao = $html.find('#processoAudienciaSearchForm\\:jurisdicaoDecoration\\:jurisdicao').val()
                const orgaoJulgador = $html.find('#processoAudienciaSearchForm\\:orgaoJulgadorDecoration\\:orgaoJulgador').val()

                const parametros = {
                  containerId,
                  paramId,
                  jurisdicao,
                  orgaoJulgador
                }             
                
                requestsIteractions.session = { 
                  viewId: viewId,
                  pagina: 'audiencia',
                  expiration: _this.util.obterNovaExpiracao(),
                  ocupado: true,
                  parametros
                }

                _this.session.push(requestsIteractions.session)

                lockr.set('SeamIteraction.sessions', _this.session)
    
                def.resolve( requestsIteractions ) 
              } )
              .fail( err => def.reject(err) )
            }else{
              requestsIteractions.session = audienciaSessions[0]
              requestsIteractions.session.ocupado = true
              requestsIteractions.session.expiration = _this.util.obterNovaExpiracao()
              lockr.set('SeamIteraction.sessions', _this.session)
              
              def.resolve( requestsIteractions ) 
            }

            return def.promise()
          },
          limpar: ()=>{

          },
          consultaPautaData : (dataIsoString)=>{
            var def = $.Deferred()

            const [ano, mes, dia] = dataIsoString.split('-')
            const parametros = requestsIteractions.session.parametros

            var PAYLOAD = `
              AJAXREQUEST: processoAudienciaSearchForm:${parametros.containerId}
              processoAudienciaSearchForm:jurisdicaoDecoration:jurisdicao: ${parametros.jurisdicao}
              processoAudienciaSearchForm:orgaoJulgadorDecoration:orgaoJulgador: ${parametros.orgaoJulgador}
              processoAudienciaSearchForm:magistradoDecoration:magistrado: 
              processoAudienciaSearchForm:conciliadorDecoration:conciliador: 
              processoAudienciaSearchForm:listaSituacoes: M
              processoAudienciaSearchForm:dtInicioDecoration:dtInicioFromFormInputDate: ${dia}/${mes}/${ano}
              processoAudienciaSearchForm:dtInicioDecoration:dtInicioFromFormInputCurrentDate: ${mes}/${ano}
              processoAudienciaSearchForm:dtInicioDecoration:dtInicioToFormInputDate: ${dia}/${mes}/${ano}
              processoAudienciaSearchForm:dtInicioDecoration:dtInicioToFormInputCurrentDate: ${mes}/${ano}
              processoAudienciaSearchForm:tipoAudienciaDecoration:tipoAudiencia: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              processoAudienciaSearchForm:salaAudienciaDecoration:salaAudiencia: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              processoAudienciaSearchForm:parteDecoration:parte: 
              processoAudienciaSearchForm:nomeAdvogadoDecoration:nomeAdvogado: 
              processoAudienciaSearchForm:processoAudienciaSearchFormclasseJudicialTreeDecoration:processoAudienciaSearchFormclasseJudicialPanel: 
              processoAudienciaSearchForm:processoAudienciaSearchFormclasseJudicialTreeDecoration:processoAudienciaSearchFormclasseJudicialTree:input: 
              processoAudienciaSearchForm:processoAudienciaSearchFormassuntoTrfTreeDecoration:processoAudienciaSearchFormassuntoTrfPanel: 
              processoAudienciaSearchForm:processoAudienciaSearchFormassuntoTrfTreeDecoration:processoAudienciaSearchFormassuntoTrfTree:input: 
              processoAudienciaSearchForm:idProcessoAudienciaDecoration:idProcessoAudienciaNumeroSequencial: 
              processoAudienciaSearchForm:idProcessoAudienciaDecoration:idProcessoAudienciaNumeroDigitoVerificador: 
              processoAudienciaSearchForm:idProcessoAudienciaDecoration:idProcessoAudienciaAno: 
              processoAudienciaSearchForm:idProcessoAudienciaDecoration:labelJusticaFederal: 
              processoAudienciaSearchForm:idProcessoAudienciaDecoration:labelTribunalRespectivo: 
              processoAudienciaSearchForm:idProcessoAudienciaDecoration:idProcessoAudienciaNumeroOrgaoJustica: 
              processoAudienciaSearchForm_link_hidden_: processoAudienciaSearchForm:clearButton
              processoAudienciaSearchForm: processoAudienciaSearchForm
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              processoAudienciaSearchForm:searchButton: processoAudienciaSearchForm:searchButton
              processoAudienciaSearchForm:${parametros.paramId}: 1
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            const it = requestsIteractions

            $.post(it.baseURL, PAYLOAD)
            .done( (xml) => { 
              const $xml = jQ3(xml)
              it.responseHistory.push({
                iteraction: `consultaPautaData - ${dataIsoString}`,
                $xml
              })

              it.$elementoTableAudiencias = jQ3($xml.find('#idProcessoAudiencia'))
              def.resolve( it, $xml ) 
            } )
            .fail( err => def.reject(err) )

            return def.promise();
          }
        }
        return requestsIteractions
      },
      acoes : {
        consultaPautaAudienciaData : (dataIsoString) => {
          const def = $.Deferred()
          const acoes = _this.audiencia.acoes
          const requestsIteractions = _this.audiencia.requestsIteractionsGetter()
          const util = _this.audiencia.util


          requestsIteractions.listView()
          .pipe(()=>{
            return requestsIteractions.consultaPautaData(dataIsoString)
          })
          .done( (it, $xml) =>{
            const jsonTable = util.tableToJson(it.$elementoTableAudiencias)
            def.resolve({ 
              jsonTable, 
              $elementoTableAudiencias: it.$elementoTableAudiencias, 
              $xml, 
              acoes 
            }) 
          })
          .fail( err => def.reject(err) )
          .always( ()=>{
            requestsIteractions.liberarAView()
          })

          return def.promise()
        }
      },
      util: {
        tableToJson: ($tableOrg)=>{
          const $table = $tableOrg.clone()
          $table.find('script, table').remove()


          const headers = $table.find('thead th').map(function() {
            return $(this).text().trim();
          }).get();
        
          const jsonData = $table.find('tbody#idProcessoAudiencia\\:tb > tr').map(function() {
            const rowData = {};
            $(this).find('td').each(function(index) {
              rowData[headers[index]] = $(this).text().trim();
            });
            return rowData;
          }).get();
        
          return jsonData;
        }
      }
    },
    autoTexto : {
      requestsIteractionsGetter : () => { 
        const requestsIteractions = {
          baseURL : `https://pje.tjma.jus.br/pje/Editor/AutoTexto/autoTexto.seam`,
          conteudoURL : `https://pje.tjma.jus.br/pje/Editor/AutoTexto/conteudo.seam`,
          $elementoTRDoAlertaEncontrado: {},
          $xmlDoFormulario: {},
          $textAreadConteudoEncontrado: {},
          responseHistory: [],
          session: null,
          liberarAView: ()=>{
            requestsIteractions.session.ocupado = false
            requestsIteractions.session.expiration = _this.util.obterNovaExpiracao()
            lockr.set('SeamIteraction.sessions', _this.session)
          },
          listView : () =>{
            const def = $.Deferred()

            _this.session = _lockr.get('SeamIteraction.sessions', [])
            _this.util.liberarViewsExpiradas()

            const alertasSessions = _this.session.filter(ses => { 
              return ses.pagina === 'autoTexto' && !ses.ocupado
            })

            if( ! alertasSessions.length ){
              $.get(requestsIteractions.baseURL)
              .done( (xml)=> { 
                var $html = $(xml)
                var viewId = $html.find('#javax\\.faces\\.ViewState').val()

                requestsIteractions.$xmlDoFormulario = $html
                requestsIteractions.responseHistory.push({
                  iteraction: 'listView',
                  $xml: $html
                })
                
                requestsIteractions.session = { 
                  viewId: viewId,
                  pagina: 'autoTexto',
                  expiration: _this.util.obterNovaExpiracao(),
                  ocupado: true
                }

                _this.session.push(requestsIteractions.session)

                lockr.set('SeamIteraction.sessions', _this.session)
    
                def.resolve( requestsIteractions ) 
              } )
              .fail( err => def.reject(err) )
            }else{
              requestsIteractions.session = alertasSessions[0]
              requestsIteractions.session.ocupado = true
              requestsIteractions.session.expiration = _this.util.obterNovaExpiracao()
              lockr.set('SeamIteraction.sessions', _this.session)

              requestsIteractions.tabPesquisaSelection()
              .done( () => { 
                def.resolve( requestsIteractions ) 
              } )
              .fail( err => def.reject(err) )
            }

            return def.promise()
          },
          definirAOrigem : (origem)=>{
            var def = $.Deferred()

            const containerId = Array.from(
              requestsIteractions.$xmlDoFormulario.docRoot.find('form#pesquisarAutoTextoForm script')
            ).filter(s => !!s.id  )[0].innerHTML.match(/'containerId':'pesquisarAutoTextoForm:j_id(\d+)'/).at(1)

            const origemAutoTextoDecoration = Array.from(
              requestsIteractions.$xmlDoFormulario.docRoot.querySelectorAll('input[name="pesquisarAutoTextoForm:origemAutoTextoDecoration:origemAutoTexto"]')
            )[0].outerHTML.match(/'pesquisarAutoTextoForm:origemAutoTextoDecoration:j_id(\d+)'/).at(1)

            var PAYLOAD = `
              AJAXREQUEST: pesquisarAutoTextoForm:j_id${containerId}
              pesquisarAutoTextoForm:descricaoDecoration:descricao: 
              pesquisarAutoTextoForm_link_hidden_: pesquisarAutoTextoForm:clearButton
              pesquisarAutoTextoForm: pesquisarAutoTextoForm
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              pesquisarAutoTextoForm:origemAutoTextoDecoration:origemAutoTexto: ${origem}
              pesquisarAutoTextoForm:origemAutoTextoDecoration:j_id${origemAutoTextoDecoration}: pesquisarAutoTextoForm:origemAutoTextoDecoration:j_id${origemAutoTextoDecoration}
              ajaxSingle: pesquisarAutoTextoForm:origemAutoTextoDecoration:origemAutoTexto
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            const it = requestsIteractions

            $.post(it.baseURL, PAYLOAD)
            .done( (xml) => { 
              const $xml = jQ3(xml)
              def.resolve( it, xml ) 
            } )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          pesquisar : (query, origem)=>{
            var def = $.Deferred()

            const containerId = Array.from(
              requestsIteractions.$xmlDoFormulario.find('form#pesquisarAutoTextoForm script')
            ).filter(s => !!s.id  )[0].innerHTML.match(/'containerId':'pesquisarAutoTextoForm:j_id(\d+)'/).at(1)

            const searchButtonId = Array.from(
              requestsIteractions.$xmlDoFormulario.find('#pesquisarAutoTextoForm\\:searchButton')
            )[0].outerHTML.match(/'pesquisarAutoTextoForm:searchButton','pesquisarAutoTextoForm:j_id(\d+)'/).at(1)

            var PAYLOAD = `
              AJAXREQUEST: pesquisarAutoTextoForm:j_id${containerId}
              pesquisarAutoTextoForm:origemAutoTextoDecoration:origemAutoTexto: ${origem}
              pesquisarAutoTextoForm:descricaoDecoration:descricao: ${query}
              pesquisarAutoTextoForm_link_hidden_: pesquisarAutoTextoForm:clearButton
              pesquisarAutoTextoForm: pesquisarAutoTextoForm
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              pesquisarAutoTextoForm:searchButton: pesquisarAutoTextoForm:searchButton
              pesquisarAutoTextoForm:j_id${searchButtonId}: 1
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            const it = requestsIteractions

            $.post(it.baseURL, PAYLOAD)
            .done( (xml) => { 
              const $xml = jQ3(xml)
              requestsIteractions.$elementoTRDoAlertaEncontrado = 
              $xml.find('#autoTextoList\\:tb tr:first')

              requestsIteractions.responseHistory.push({
                iteraction: 'pesquisar',
                $xml: $xml
              })

              def.resolve( $xml, requestsIteractions)  
            } )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          irParaFormularioDoAutoTexto : ($xml)=>{
            var def = $.Deferred()            

            const $tr = requestsIteractions.$elementoTRDoAlertaEncontrado

            const autoTextoId = $tr.html().match(/'id':(\d+)/)?.at(1)
            const containerId = Array.from($tr.find('a'))[0].outerHTML.match(/'containerId':'([^']+)'/).at(1)
            const autoTextoFormId = $tr.find('a').parent().attr('id')

            var PAYLOAD = `
              AJAXREQUEST: ${containerId}
              ${autoTextoFormId}: ${autoTextoFormId}
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              tab: form
              id: ${autoTextoId}
              ${autoTextoFormId}:autoTextoList: ${autoTextoFormId}:autoTextoList
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            const it = requestsIteractions

            $.post(it.baseURL, PAYLOAD)
            .done( (xml) => { 
              const $xml = jQ3(xml)

              requestsIteractions.responseHistory.push({
                iteraction: 'irParaFormularioDoAutoTexto',
                $xml: $xml
              })

              def.resolve( $xml, requestsIteractions)  
            } )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          obterConteudo : ($xml, cid)=>{
            var def = $.Deferred()

            if(!cid){
              cid = $xml.find('iframe#editorFrame').attr('src').match(/(\d+)/).at(1)
            }

            $.get(`${requestsIteractions.conteudoURL}?cid=${cid}`)
            .done( (xml) => { 
              const $xml = jQ3(xml)

              requestsIteractions.responseHistory.push({
                iteraction: 'obterConteudo',
                $xml: $xml
              })

              requestsIteractions.$textAreadConteudoEncontrado = $xml.find('#editorForm\\:conteudo')

              const conteudo = requestsIteractions.$textAreadConteudoEncontrado.val()

              def.resolve( conteudo, $xml, requestsIteractions ) 
            } )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          tabPesquisaSelection : ()=>{
            var def = $.Deferred()

            var PAYLOAD = `
              AJAXREQUEST: _viewRoot
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              search: search
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            const it = requestsIteractions

            $.post(it.baseURL, PAYLOAD)
            .done( (xml) => { 
              const $xml = jQ3(xml)
              const viewStillIsFrom = !! $xml.find('#pesquisarAutoTextoForm\\:descricaoDecoration\\:descricao')
              
              if(viewStillIsFrom){
                debugger;
                if($xml.find('meta[name="Location"]').attr('content').includes('error.seam')){
                  requestsIteractions.session.ocupado = false
                  requestsIteractions.session.expiration = (new Date().getTime()) + 999999
                  _this.util.liberarViewsExpiradas()

                  it.listView()
                  .done( (xml) => def.resolve( xml ) )
                  .fail( err => def.reject(err) )
                }else{
                  debugger;

                  def.reject("Erro ao acessar a página")
                }
              }else
                def.resolve( it, xml ) 
            } )
            .fail( err => def.reject(err) )

            return def.promise();
          },
          tabFormSelection : ()=>{
            var def = $.Deferred()

            var PAYLOAD = `
              AJAXREQUEST: _viewRoot
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              form: form
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)

            $.post(requestsIteractions.baseURL, PAYLOAD)
            .done( (xml) => { 
              const $xml = jQ3(xml)

              requestsIteractions.responseHistory.push({
                iteraction: 'tabFormSelection',
                $xml: $xml,
              })

              def.resolve( $xml ) 
            })
            .fail( err => def.reject(err) )

            return def.promise();
          },
          incluirAutoTexto: (descricao, conteudo, origem)=>{
            const def = $.Deferred()

            const $xmlConteudo = requestsIteractions.responseHistory.find(rh => rh.iteraction === 'obterConteudo')?.$xml
            const viewIdConteudo = $xmlConteudo.find('#javax\\.faces\\.ViewState').val()
            const editorFormScriptId = $xmlConteudo.find('script').attr('id')


            var PAYLOAD_AUTOTEXTO = `
              AJAXREQUEST: autoTextoFormRegion
              autoTextoForm:descricaoDecoration:descricao: ${descricao}
              autoTextoForm:origemAutoTextoDecoration:origemAutoTexto: ${origem}
              autoTextoForm:variavelDecoration:variavel: 4
              autoTextoForm: autoTextoForm
              autoScroll: 
              javax.faces.ViewState: ${requestsIteractions.session.viewId}
              autoTextoForm:persistButton: autoTextoForm:persistButton
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD_AUTOTEXTO = _this.util.conformPayload(PAYLOAD_AUTOTEXTO)

            var PAYLOAD_CONTEUDO = `
              AJAXREQUEST: _viewRoot
              editorForm:conteudo: ${conteudo}
              editorForm: editorForm
              autoScroll: 
              javax.faces.ViewState: ${viewIdConteudo}
              ${editorFormScriptId}: ${editorFormScriptId}
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD_CONTEUDO = _this.util.conformPayload(PAYLOAD_CONTEUDO)

            const promiseAutoTexto = $.post(requestsIteractions.baseURL, PAYLOAD_AUTOTEXTO)
            const promiseConteudo = $.post(requestsIteractions.conteudoURL, PAYLOAD_CONTEUDO)

            $.when(promiseAutoTexto, promiseConteudo)
            .done((xmlAutoTexto, xmlConteudo)=>{

              requestsIteractions.responseHistory.push({
                iteraction: 'obterConteudo',
                $xmlAutoTexto: $(xmlAutoTexto),
                $xmlConteudo: $(xmlConteudo)
              })
              
              def.resolve( requestsIteractions )
            })
            .fail( err => def.reject(err) )

            $.post(requestsIteractions.baseURL, PAYLOAD_AUTOTEXTO)
            .done( () => { def.resolve( requestsIteractions ) } )
            .fail( err => def.reject(err) )

            return def.promise();
          }
        }
        return requestsIteractions
      },
      acoes : {
        pesquisarAutoTextoEObterConteudo : (query, origem) => {
          const def = $.Deferred()
          const acoes = _this.autoTexto.acoes
          const requestsIteractions = _this.autoTexto.requestsIteractionsGetter()

          requestsIteractions.listView()
          .pipe(()=>{
            return requestsIteractions.pesquisar(query, origem)
          })
          .pipe( $xml=>{
            return requestsIteractions.irParaFormularioDoAutoTexto($xml)
          })
          .pipe( $xml=>{
            return requestsIteractions.obterConteudo($xml)
          })
          .done( (conteudo, $xml) =>{
            def.resolve( conteudo, $xml, acoes ) 
          })
          .fail( err => def.reject(err) )
          .always( ()=>{
            requestsIteractions.liberarAView()
          })

          return def.promise()
        },
        adicionarNovoAutoTexto : (descricao, conteudo, origem) => {
          const def = $.Deferred()
          const requestsIteractions = _this.autoTexto.requestsIteractionsGetter()
          const acoes = _this.autoTexto.acoes

          requestsIteractions.listView()
          .pipe(()=>{
            return requestsIteractions.tabFormSelection()
          })
          .pipe( $xml=>{
            return requestsIteractions.obterConteudo($xml)
          })
          .pipe( $xml=>{
            return requestsIteractions.incluirAutoTexto(descricao, conteudo, origem)
          })
          .done( () =>{
            def.resolve( acoes ) 
          })
          .fail( err => def.reject(err) )
          .always( ()=>{
            requestsIteractions.liberarAView()
          })

          return def.promise()
        },
      }
    },
    processo : {
      xmlHistory : [],
      requestsIteractions : {
        baseURL : 'https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam',
        listAutosDigitais : ()=>{
          var def = $.Deferred()
          var idProcesso = j2E.env.urlParms.idProcesso;
          var lockrKey = `SeamIteraction.processo-${idProcesso}.viewId`
          var viewIdStore = _lockr.get(lockrKey, { noData : true })

          if( viewIdStore.noData ){
            j2EQueryGetChaveAcesso(idProcesso)
            .done( (ca) => {
              const _baseURL = `${_this.processo.requestsIteractions.baseURL}?idProcesso=${idProcesso}&ca=${ca}`

              _this.processo.requestsIteractions.baseURLWithCAId = _baseURL

              $.get(_baseURL)
              .done( (xml)=> { 
                var $html = $(xml)
                var viewId = $html.find('#javax\\.faces\\.ViewState').val()
                
                _this.session.viewIdProc = viewId
                _this.session.processoXML = xml

                lockr.set(lockrKey, {
                  id : viewId,
                }, {
                  expiration : 5 * 60 * 1000
                })
                _this.processo.xmlHistory.push({
                  interaction : 'listAutosDigitais',
                  $xml : $html
                })

                /*var iframe = $('<iframe>', {
                  src: _baseURL,
                  style: 'display: none;'})
                  .on('load', function() {
                    console.log('Iframe carregado!');
                    var iframWin = iframe.prop('contentWindow')
                    iframWin.jQ3 = jQ3Factory(iframWin, true)
                    $$ = iframWin.jQ3

                    def.resolve( _this.processo.requestsIteractions, $html) 
                  }).appendTo('body')*/
                
                def.resolve( _this.processo.requestsIteractions, $html)
              } )
              .fail( err => def.reject(err) )
            })
            .fail( err => def.reject(err) )
          }else{
            _this.session.viewIdProc = viewIdStore.id

            def.resolve( _this.processo.requestsIteractions ) 
          }

          return def;
        },
        juntarDocumento : ()=>{
          var def = $.Deferred()

          function obterMesEAnoAtual() {
            const dataAtual = new Date();
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se for necessário
            const ano = dataAtual.getFullYear();
            const mesEAnoAtual = `${mes}/${ano}`;
          
            return mesEAnoAtual;
          }
          

          var PAYLOAD = `
            AJAXREQUEST: _viewRoot
            navbar:cbTipoDocumento: 0
            navbar:idDe: 
            navbar:idAte: 
            navbar:dtInicioInputDate: 
            navbar:dtInicioInputCurrentDate: ${obterMesEAnoAtual()}
            navbar:dtFimInputDate: 
            navbar:dtFimInputCurrentDate: ${obterMesEAnoAtual()}
            navbar:cbCronologia: DESC
            navbar: navbar
            autoScroll: 
            javax.faces.ViewState: ${_this.session.viewIdProc}
            navbar:linkAbaIncluirPeticoes1: navbar:linkAbaIncluirPeticoes1
            AJAX:EVENTS_COUNT: 1
          `
          PAYLOAD = _this.util.conformPayload(PAYLOAD)

          $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
          .done( (xml) => { 
            _this.processo.xmlHistory.push({
              interaction : 'juntarDocumento',
              $xml : jQ3(xml)
            })
            def.resolve( _this.processo.requestsIteractions, jQ3(xml) ) 
          } )
          .fail( err => def.reject(err) )

          return def.promise();
        },
        juntarDocumentoSelecionarTipoDocumento : ($xml, tipo)=>{
          function obterValorOpcao() {
            const textoDesejado = tipo.toLowerCase();
            const selectId = "cbTDDecoration\\:cbTD";
          
            const valorOpcao = $xml.find("#" + selectId + " option").filter(function() {
              return jQ3(this).text().trim().toLowerCase() === textoDesejado;
            }).val();
          
            return valorOpcao;
          }
          function obterSelecIdComplemento() {
            var selectElement = $xml.find('#cbTDDecoration\\:cbTD');
            var onchangeValue = selectElement.attr('onchange');
            var regex = /cbTDDecoration:j_id(\d+)/;
            var match = onchangeValue.match(regex);
            var [part] = match ;

            return part;
          }

          var def = $.Deferred()   
          var idTipo = obterValorOpcao()


          var PAYLOAD = `
            AJAXREQUEST: _viewRoot
            formularioUpload: formularioUpload
            ipDescDecoration:ipDesc: 
            ipNroDecoration:ipNro: 
            modTDDecoration:modTD: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
            javax.faces.ViewState: ${_this.session.viewIdProc}
            cbTDDecoration:cbTD: ${idTipo}
            ${obterSelecIdComplemento()}: ${obterSelecIdComplemento()}
            ajaxSingle: cbTDDecoration:cbTD
            AJAX:EVENTS_COUNT: 1
          `
          PAYLOAD = _this.util.conformPayload(PAYLOAD)

          $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
          .done( (xml) => { 
            _this.processo.xmlHistory.push({
              interaction : 'juntarDocumentoSelecionarTipoDocumento',
              $xml : jQ3(xml)
            })
            def.resolve( _this.processo.requestsIteractions, jQ3(xml), idTipo ) 
          } )
          .fail( err => def.reject(err) )

          return def.promise();
        },
        juntarDocumentoSelecionarEditorDeTexto : ($xml, idTipo)=>{
          function obterSimilarityGroupingId() {
            var selectElement = $xml.find('input[name="raTipoDocPrincipal"]');
            var onchangeValue = selectElement.attr('onchange');
            var regex = /'similarityGroupingId':'j_id(\d+)'/;
            var match = onchangeValue.match(regex);
            var [part] = match

            return part.split("':'")[1].replace("'", '')
          }

          var def = $.Deferred()   
          var similarityGroupingId = obterSimilarityGroupingId()

          var PAYLOAD = `
            AJAXREQUEST: _viewRoot
            formularioUpload: formularioUpload
            cbTDDecoration:cbTD: ${idTipo}
            ipDescDecoration:ipDesc: [TEMP]
            ipNroDecoration:ipNro: 
            modTDDecoration:modTD: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
            uploadDocumentoPrincipalDecoration:uploadDocumentoPrincipal:file: 
            javax.faces.ViewState: ${_this.session.viewIdProc}
            raTipoDocPrincipal: HTML
            ${similarityGroupingId}: ${similarityGroupingId}
            ajaxSingle: raTipoDocPrincipal
            AJAX:EVENTS_COUNT: 1
          `
          PAYLOAD = _this.util.conformPayload(PAYLOAD)

          $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
          .done( (xml) => { 
            _this.processo.xmlHistory.push({
              interaction : 'juntarDocumentoSelecionarEditorDeTexto',
              $xml : jQ3(xml)
            })
            def.resolve( _this.processo.requestsIteractions, jQ3(xml), idTipo ) 
          } )
          .fail( err => def.reject(err) )

          return def.promise();
        },
        juntarDocumentoEditarDocumentoHTML : ($xml, idTipo, textoHTML, descricao, numero)=>{
          var def = $.Deferred()
          var idButtonSalvar = $xml.find('#editorAnexar .btn-primary').attr('id')
          
          

          var PAYLOAD = `
            AJAXREQUEST: _viewRoot
            formularioUpload: formularioUpload
            cbTDDecoration:cbTD: ${idTipo}
            ipDescDecoration:ipDesc: ${descricao}
            ipNroDecoration:ipNro: ${numero || ''}
            modTDDecoration:modTD: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
            raTipoDocPrincipal: HTML
            docPrincipalEditorTextArea: textHTMLField
            javax.faces.ViewState: ${_this.session.viewIdProc}
            ${idButtonSalvar}: ${idButtonSalvar}
            AJAX:EVENTS_COUNT: 1
          `
          const PAYLOAD_NOT_CONFORMED = PAYLOAD
          PAYLOAD = _this.util.conformPayload(PAYLOAD)
          PAYLOAD = PAYLOAD.replace('textHTMLField', encodeURIComponent(textoHTML))

          setTimeout(function(){

          $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
          .done( (xml) => { 
            _this.processo.xmlHistory.push({
              interaction : 'juntarDocumentoEditarDocumentoHTML',
              $xml : jQ3(xml)
            })
            def.resolve( _this.processo.requestsIteractions, jQ3(xml) ) 
          } )
          .fail( err => def.reject(err) )

          }, 250);

          return def.promise();
        },
        juntarDocumentoAssinarHTML : ($xml, idTipo, textoHTML, descricao, numero, $xml_juntDoc)=>{
          function _passoSalvarEInformarAnexos (){
            var def = $.Deferred()
            var cid = $xml.find('input[name="cid"]').val()
            var jIdUnnkown = $xml.find('script').filter( function() { return this.innerHTML.indexOf('prepararParaAssinar=function()') !== -1 && this.id.length } ).attr('id')  
  
            var PAYLOAD = `
              AJAXREQUEST: _viewRoot
              formularioUpload: formularioUpload
              cbTDDecoration:cbTD: ${idTipo}
              ipDescDecoration:ipDesc: ${descricao}
              ipNroDecoration:ipNro: ${numero}
              modTDDecoration:modTD: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              raTipoDocPrincipal: HTML
              docPrincipalEditorTextArea: textHTMLField
              context: /pje
              cid: ${cid}
              mimes: mimesFieldValue
              mimesEhSizes: mimesEhSizesFieldValue
              tamanhomaximolote: 62MB
              tipoDocLoteSuperior: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              modalConfirmaLimparOpenedState: 
              modalDescricaoNaoPreenchidaParaLoteOpenedState: 
              modalTipoLoteNaoSelecionadoOpenedState: 
              modalErrosOpenedState: 
              quantidadeProcessoDocumento: 0
              javax.faces.ViewState: ${_this.session.viewIdProc}
              ${jIdUnnkown}: ${jIdUnnkown}
              AJAX:EVENTS_COUNT: 1
  
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)
            PAYLOAD = PAYLOAD.replace('mimesFieldValue', encodeURIComponent('.html,image/png,application/pdf,image/jpeg,audio/vorbis,application/vnd.google-earth.kml+xml,.kml,audio/mpeg,audio/ogg,application/pkcs7-signature,video/mpeg,text/html,video/ogg,video/mp4'))
            PAYLOAD = PAYLOAD.replace('mimesEhSizesFieldValue', encodeURIComponent('.html:1.5,image/png:10.0,application/pdf:10.0,image/jpeg:10.0,audio/vorbis:10.0,application/vnd.google-earth.kml+xml:5.0,.kml:5.0,audio/mpeg:10.0,audio/ogg:10.0,application/pkcs7-signature:10.0,video/mpeg:10.0,text/html:1.5,video/ogg:10.0,video/mp4:10.0'))
            PAYLOAD = PAYLOAD.replace('textHTMLField', encodeURIComponent(textoHTML))
            

            setTimeout(function(){

            $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
            .done( (xml) => { 
              _this.processo.xmlHistory.push({
                interaction : 'juntarDocumentoAssinarHTML:_passoPreEnviar',
                $xml : jQ3(xml)
              })
              def.resolve( _this.processo.requestsIteractions, jQ3(xml) ) 
            } )
            .fail( err => def.reject(err) )
  
            }, 250);
            
            return def.promise();
          }
          function _passoEnivarURLAssinaturasDoMobile (){
            var def = $.Deferred()
            var cid = $xml.find('input[name="cid"]').val()
            var jIdUnnkown = $xml.find('script').filter( function() { return this.innerHTML.indexOf('assinarDocumento') !== -1 && this.id.length } ).attr('id')
            var urlDocsField = $xml.find('script').filter( function() { return this.innerHTML.indexOf('function getUrlAssinaturas') !== -1 } ).text().split('"')[1]            
  
            var PAYLOAD = `
              AJAXREQUEST: signerRegion-assinador
              formularioUpload: formularioUpload
              cbTDDecoration:cbTD: ${idTipo}
              ipDescDecoration:ipDesc: ${descricao}
              ipNroDecoration:ipNro: ${numero}
              modTDDecoration:modTD: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              raTipoDocPrincipal: HTML
              docPrincipalEditorTextArea: textHTMLField
              context: /pje
              cid: ${cid}
              mimes: mimesFieldValue
              mimesEhSizes: mimesEhSizesFieldValue
              tamanhomaximolote: 62MB
              tipoDocLoteSuperior: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              modalConfirmaLimparOpenedState: 
              modalDescricaoNaoPreenchidaParaLoteOpenedState: 
              modalTipoLoteNaoSelecionadoOpenedState: 
              modalErrosOpenedState: 
              quantidadeProcessoDocumento: 0
              javax.faces.ViewState: ${_this.session.viewIdProc}
              ${jIdUnnkown}: ${jIdUnnkown}
              urlDocsField: urlDocsFieldValue
              action: consultaProcessoAction
              ajaxSingle: ${jIdUnnkown}
              AJAX:EVENTS_COUNT: 1
  
            `
            if(!(jIdUnnkown)){
              def.reject('Você está logado para assinar via mobile?')
              return def.promise();
            }

            PAYLOAD = _this.util.conformPayload(PAYLOAD)
            PAYLOAD = PAYLOAD.replace('urlDocsFieldValue', encodeURIComponent(urlDocsField))
            PAYLOAD = PAYLOAD.replace('mimesFieldValue', encodeURIComponent('.html,image/png,application/pdf,image/jpeg,audio/vorbis,application/vnd.google-earth.kml+xml,.kml,audio/mpeg,audio/ogg,application/pkcs7-signature,video/mpeg,text/html,video/ogg,video/mp4'))
            PAYLOAD = PAYLOAD.replace('mimesEhSizesFieldValue', encodeURIComponent('.html:1.5,image/png:10.0,application/pdf:10.0,image/jpeg:10.0,audio/vorbis:10.0,application/vnd.google-earth.kml+xml:5.0,.kml:5.0,audio/mpeg:10.0,audio/ogg:10.0,application/pkcs7-signature:10.0,video/mpeg:10.0,text/html:1.5,video/ogg:10.0,video/mp4:10.0'))
            PAYLOAD = PAYLOAD.replace('textHTMLField', encodeURIComponent(textoHTML))
            

            setTimeout(function(){


            /*$.ajax({
              url: _this.processo.requestsIteractions.baseURL,
              type: 'POST',
              xhrFields: {
                withCredentials: true
              },
              data: PAYLOAD,
              beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Kl-Ajax-Request', 'Ajax_Request');

                xhr.setRequestHeader('X-Requested-With', null);
              }
            })*/
            $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
            .done( (xml) => { 
              _this.processo.xmlHistory.push({
                interaction : 'juntarDocumentoAssinarHTML:_passoEnivarURLAssinaturas',
                $xml : jQ3(xml)
              })
              def.resolve( _this.processo.requestsIteractions, jQ3(xml) ) 
            } )
            .fail( err => def.reject(err) )

            }, 250);
  
            return def.promise();
          }
          function _passoInformarServidorAssinaturaMobile (){
            var def = $.Deferred()
            var cid = $xml.find('input[name="cid"]').val()
            
  
            
  
            function obtercontainerId() {
              var selectElement = $xml.find('input.btn-primary[value="OK"]:first');
              var onchangeValue = selectElement.attr('onclick');
              var regex = /'containerId':'j_id(\d+)'/;
              var match = onchangeValue.match(regex);
              var [part] = match
  
              return part.split("':'")[1].replace("'", '')
            }
            var containderId = obtercontainerId() 
            
  
            var PAYLOAD = `
              AJAXREQUEST: ${containderId}
              formularioUpload: formularioUpload
              cbTDDecoration:cbTD: ${idTipo}
              ipDescDecoration:ipDesc: ${descricao}
              ipNroDecoration:ipNro: ${numero}
              modTDDecoration:modTD: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              raTipoDocPrincipal: HTML
              docPrincipalEditorTextArea: textHTMLField
              context: /pje
              cid: ${cid}
              mimes: .html,image/png,application/pdf,image/jpeg,audio/vorbis,application/vnd.google-earth.kml+xml,.kml,audio/mpeg,audio/ogg,application/pkcs7-signature,video/mpeg,text/html,video/ogg,video/mp4
              mimesEhSizes: .html:1.5,image/png:10.0,application/pdf:10.0,image/jpeg:10.0,audio/vorbis:10.0,application/vnd.google-earth.kml+xml:5.0,.kml:5.0,audio/mpeg:10.0,audio/ogg:10.0,application/pkcs7-signature:10.0,video/mpeg:10.0,text/html:1.5,video/ogg:10.0,video/mp4:10.0
              tamanhomaximolote: 62MB
              tipoDocLoteSuperior: org.jboss.seam.ui.NoSelectionConverter.noSelectionValue
              modalConfirmaLimparOpenedState: 
              modalDescricaoNaoPreenchidaParaLoteOpenedState: 
              modalTipoLoteNaoSelecionadoOpenedState: 
              modalErrosOpenedState: 
              quantidadeProcessoDocumento: 0
              javax.faces.ViewState: ${_this.session.viewIdProc}
              btn-mobile-assinador: btn-mobile-assinador
              AJAX:EVENTS_COUNT: 1
  
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)
            PAYLOAD = PAYLOAD.replace('textHTMLField', encodeURIComponent(textoHTML))
            

            setTimeout(function(){


            $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
            .done( (xml) => { 
              _this.processo.xmlHistory.push({
                interaction : 'juntarDocumentoAssinarHTML:_passoEnivarEnvioMobileAssinador',
                $xml : jQ3(xml)
              })
              def.resolve( _this.processo.requestsIteractions, jQ3(xml) ) 
            } )
            .fail( err => def.reject(err) )

            }, 250);
  
            return def.promise();
          }
          function _passoConcluirInclusaoDocumento (){
            var def = $.Deferred()
            var j_id = $xml_juntDoc.find('form').filter( function() { return this.innerHTML.indexOf('concluirInclusaoPeticaoDocumento=function()') !== -1 && this.id.length } ).attr('id')
            var j_id2 = $xml_juntDoc.find('script').filter( function() { return this.innerHTML.indexOf('concluirInclusaoPeticaoDocumento=function()') !== -1 && this.id.length } ).attr('id')
  
            var PAYLOAD = `
              AJAXREQUEST: _viewRoot
              ${j_id}: ${j_id}
              autoScroll: 
              javax.faces.ViewState: ${_this.session.viewIdProc}
              ${j_id2}: ${j_id2}
              AJAX:EVENTS_COUNT: 1
            `
            PAYLOAD = _this.util.conformPayload(PAYLOAD)
  
            $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
            .done( (xml) => { 
              _this.processo.xmlHistory.push({
                interaction : 'juntarDocumentoAssinarHTML:_passoConcluirInclusao',
                $xml : jQ3(xml)
              })
              def.resolve( _this.processo.requestsIteractions, jQ3(xml) ) 
            } )
            .fail( err => def.reject(err) )
  
            return def.promise();
          }

          function _assinarViaPJeOffice($xml_b){
            function __obterRequisicao(){
              var cid = $xml.find('input[name="cid"]').val()
              var urlDocsField = $xml_b.find('script').filter( function() { return this.innerHTML.indexOf('function getUrlAssinaturas') !== -1 } ).text().split('"')[1] 
              var _arquivos = PJeOffice.parseToListaArquivos(urlDocsField)
              var _base =  {                                                               
                "aplicacao"      : "PJe",
                "servidor"       : window.origin + "/pje",
                "sessao"         : document.cookie,
                "codigoSeguranca": "VAjonOyQlrbUpVjrcyi7e7wXlEuf9u8W17SE/vNBlWBsuio16HVW9baXbOBF2RQrvTSFfwymXmjDfM/T0nWwLyv6zr5PZhxKbG9FNkgZLuhnyjx2wfUaYhGlV04VJ43yCV/1n+hLc1uq7Elr31+J9UpkKyK7x4PKkIH+MlJqDcWwHccWOPqXX1PjIFgfJmaUyE5DJBkZWY0/TP5mZnJo3Ch2VdSx1aRqSw88kmmMkuiT3m20OWXFr0KvIzyfLNyktdZP7Du3Fo56RjQySNfekrr9rlwJDhaz8CTsz9IselSvaMAY5DIFbXZH3OmXHQcMTF6evF7dQHZl2/6ti34hkQ==",
                "tarefaId"       : "cnj.assinadorHash",
                "tarefa"         : {
                  "algoritmoAssinatura": "ASN1MD5withRSA",
                  "modoTeste"          : "false",
                  "uploadUrl"          : `/arquivoAssinadoUpload.seam?action=consultaProcessoAction&cid=${cid}&mo=P`,
                  "arquivos"           : _arquivos
                }
              }

              return _base
            }


            var def = $.Deferred()
            var requisicao = __obterRequisicao()

            PJeOffice.executar(requisicao, 
              ()=>{
                def.resolve()
              },
              ()=>{
                def.reject()
              },
              ()=>{
                def.reject('O PJe Office não está disponível')
              }
            )
              
            return def.promise()
          }

          
          var def = $.Deferred()

          if( $xml.find('#btn-mobile-assinador').length ){
            _passoSalvarEInformarAnexos ()
            .pipe( (it, $xml) => {
              if(false){
                def.resolve($xml)
                return;
              }

              return _passoInformarServidorAssinaturaMobile()})
            .pipe( (it, $xml)=>{
              return _passoEnivarURLAssinaturasDoMobile()})
            .pipe( (it, $xml) => {
              if(false)
                return $.Deferred().reject('Erro ao realiar assinatura: assinatura automática foi desabilitada').promise()
              
              return _passoConcluirInclusaoDocumento()})
            .pipe( (it, $xml) => def.resolve($xml) )
            .fail( (err) => { 
              def.reject(err) 
            })
          }else{
            var $xml_urlAssinaturas
            _passoSalvarEInformarAnexos ()
            .pipe( (it, $xml) => {
              if(false){
                def.resolve($xml)
                return;
              }

              $xml_urlAssinaturas = $xml
              return _assinarViaPJeOffice($xml_urlAssinaturas)})
            .pipe( (it, $xml) => {
              if(false)
                return $.Deferred().reject('Erro ao realiar assinatura: assinatura automática foi desabilitada').promise()
              
              return _passoConcluirInclusaoDocumento()})
            .done( (it, $xml) => { 
              var resultado = $xml.find('#_ajax\\:data:first').text().trim()
              if(resultado === "'erro'")
                def.reject($xml.find('#anexarMsg').text())
              else
                def.resolve($xml) })
            .fail( (err) => { 
              def.reject(err) 
            })
          }
          

          return def.promise();
        },
        requisitarModeloVariaveisExtensao : ($xml, idTipo, nomeModelo)=>{          
          function _modTDDecoration_j_id_Get() {
            var selectElement = $xml.find('#modTDDecoration\\:modTD');
            var attrValue = selectElement.attr('onchange');
            var regex = /modTDDecoration:j_id(\d+)/;
            var match = attrValue.match(regex);
            var [part] = match

            return part.split(':')[1]
          }
          function _idModeloGet() {
            const textoDesejado = nomeModelo.toLowerCase();
            const selectId = "modTDDecoration\\:modTD";
          
            const valorOpcao = $xml.find("#" + selectId + " option").filter(function() {
              return jQ3(this).text().trim().toLowerCase() === textoDesejado;
            }).val();
          
            return valorOpcao;
          }

          var def = $.Deferred()          
          var idModelo = _idModeloGet()
          var modTDDecoration_j_id = _modTDDecoration_j_id_Get()

          var PAYLOAD = `
            AJAXREQUEST: _viewRoot
            formularioUpload: formularioUpload
            cbTDDecoration:cbTD: ${idTipo}
            ipDescDecoration:ipDesc: 
            ipNroDecoration:ipNro: 
            raTipoDocPrincipal: HTML
            docPrincipalEditorTextArea: 
            javax.faces.ViewState: ${_this.session.viewIdProc}
            modTDDecoration:modTD: ${idModelo}
            modTDDecoration:${modTDDecoration_j_id}: modTDDecoration:${modTDDecoration_j_id}
            ajaxSingle: modTDDecoration:modTD
            AJAX:EVENTS_COUNT: 1
          `
          PAYLOAD = _this.util.conformPayload(PAYLOAD)

          $.post(_this.processo.requestsIteractions.baseURL, PAYLOAD)
          .done( (xml) => { 
            _this.processo.xmlHistory.push({
              interaction : 'requisitarModeloVariaveisExtensao',
              $xml : jQ3(xml)
            })
            def.resolve( _this.processo.requestsIteractions, jQ3(xml) ) 
          } )
          .fail( err => def.reject(err) )

          return def.promise();
        },
      },
      acoes : {
        abrirProcesso : () =>{
          var def = $.Deferred()

          _this.processo.requestsIteractions.listAutosDigitais()
          .done( it => def.resolve( it ) )
          .fail( err => def.reject(err) )

          return def.promise()
        },
        acaoJuntarDocumento : (tipo, descricao, source, contentDocument, numero) =>{
          var def = $.Deferred()
          var idTipo
          var $xml_juntDoc

          _this.processo.requestsIteractions.juntarDocumento()
          .pipe( (it, _$xml_juntDoc) => { 
            $xml_juntDoc = _$xml_juntDoc
            return it.juntarDocumentoSelecionarTipoDocumento($xml_juntDoc, tipo)})
          .pipe( (it, $xml, _idTipo) => {
            if(!(_idTipo))
              return $.Deferred.reject( `#########ERROR: O id do tipo do documento "${tipo}" não foi encontrado para.` ).promise()

            idTipo = _idTipo
            if( source == 'text/html')
              return it.juntarDocumentoSelecionarEditorDeTexto($xml, idTipo)
            else
              return $.Deferred.reject( '#########ERROR: O tipo da fonte não é suportado' ).promise()
          })
          .pipe( (it, $xml, _idTipo) => {
            if( source == 'text/html')
              return it.juntarDocumentoEditarDocumentoHTML($xml, idTipo, contentDocument.html, descricao || tipo, numero)
            else
              return $.Deferred.reject( '#########ERROR: O tipo da fonte não é suportado' ).promise()
          })
          .pipe( (it, $xml) => {
            return it.juntarDocumentoAssinarHTML($xml, idTipo, contentDocument.html, descricao || tipo, numero, $xml_juntDoc)})
          .done( () => { 
            def.resolve() 
          })
          .fail( (err) => { 
            def.reject(err) 
          })


          return def.promise()
        },
        acaoObterVariaveisParaExtensao : () =>{
          var def = $.Deferred()
          var $xml_juntDoc
          var $xml_tipoDocumento

          var tipo = 'Relatório de diligências criminais'
          var nomeModeloVariaveisExtensao='[VARIAVEIS PARA EXTENSAO]'
          var idTipo

          _this.processo.requestsIteractions.juntarDocumento()
          .pipe( (it, _$xml_juntDoc) => { 
            $xml_juntDoc = _$xml_juntDoc
            return it.juntarDocumentoSelecionarTipoDocumento($xml_juntDoc, tipo)})
          .pipe( (it, $xml, idTipo) => {
            $xml_tipoDocumento = $xml
            return it.juntarDocumentoSelecionarEditorDeTexto($xml, idTipo, nomeModeloVariaveisExtensao)
          })
          .pipe( (it, $xml, idTipo) => {
              return it.requisitarModeloVariaveisExtensao($xml_tipoDocumento, idTipo, nomeModeloVariaveisExtensao, $xml)
          })
          .pipe( (it, $xml) => { 
            var modHtmlVars = $xml.find('#docPrincipalEditorTextArea').val()
            def.resolve( modHtmlVars ) 
          })
          .fail( err => def.reject(err) )


          return def.promise()
        }
      }
    }}
    return _this
  })(jQ3)
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
  
  var popUp = window.open(url, id, featurePopUp); popUp.moveTo(0, 0);
            
  return popUp
};

function PseudoTarefa(raw){
  jQ3.extend(this, raw);
};

PseudoTarefa.prototype.countTarefa = function(){
  return this.dados.length;
};

PseudoTarefa.prototype.tipo = function(){
  return this.tipo;
};

PseudoTarefa.prototype.possuiDadosTarefa = function(){
  return lockr.get("PseudoTarefa." + this.pseNome) ? true : false;
};

PseudoTarefa.prototype.transporDados = function(){
  var _newData = [];
  var _this = this;
  switch(this.dados.dataSet){
    case 'j2EPJeRest.etiquetas.processosDaEtiqueta':
      for(var i=0; i < this.dados.length; i++){
        _newData.push({
          'dataEntrada' :             this.dados[i].dataChegada,
          'idProcesso' :              this.dados[i].idProcesso,
          'num' :                     this.dados[i].numeroProcesso,
          'classeJudicial' :          this.dados[i].classeJudicial,
          'assuntoPrincipal' :        this.dados[i].assuntoPrincipal,
          'descricaoUltimoMovimento': this.dados[i].descricaoUltimoMovimento,
          'poloAtivo' :               this.dados[i].poloAtivo,
          'poloPassivo' :             this.dados[i].poloPassivo,
          'etiquetas':                this.dados[i].tagsProcessoList
        });
      }
      ['isTemporary', 'timestamp', 'dataSet'].forEach(function(prop){
        if( _this.dados[prop] ) 
          _newData[prop] = _this.dados[prop];
      });
      _newData.transposed = true;
      this.dados = _newData;
      break;
  }
};

class Servlet {
  static _lockr = new createLockr('j2E.STORAGE')
  static DEFAULT_EXPIRATION = 10 * 60 * 1000

  static getStore(key){
    const _lockrStore = this._lockr.get(key, { noData: true}, { flagMissingExpiration: true })

    if( _lockrStore.noData ){
      const def = jQ3.Deferred()

      if( j2E.SeamIteraction ){
        j2E.SeamIteraction.alertas.acoes.pesquisarAlertaELiberarAView(Key)
        .done(response => {
          this._lockr.set(key, response, { expiration: this.DEFAULT_EXPIRATION })
          def.resolve( response )
        })
        .fail( err =>{
          def.reject( err )
        })
      }else{
        window.j2E.mods.__sendMessageToPje({
          action : 'requisitarSeamIteraction',
          PJeRest : 'j2E.SeamIteraction.alertas.acoes.pesquisarAlertaELiberarAView',
          waitsResponse : true,
          arguments : [ key ]
        }, 
        "PARENT_TOP",
        (response, status, action)=>{
          this._lockr.set(key, response, { expiration: this.DEFAULT_EXPIRATION })
          def.resolve(response)
        })
      }

      if( _lockrStore.expired ){
        console.warn(`j2e.STORAGE: enviando expired data da key ${key}`)
        return jQ3.Deferred().resolve(_lockrStore.expiredData).promise() 
      }else 
        return def.promise()
    }else
      return jQ3.Deferred().resolve(_lockrStore).promise()
  }
}

class PseudoTarefaServlet extends Servlet{
  static STORE_INDEX = `STORE-#PSEUDOTAREFAS#`

  static get(request){
    const def = jQ3.Deferred()

    PseudoTarefaServlet.getStore(PseudoTarefaServlet.STORE_INDEX)
    .done( alertaAsResult => { 
      const result = JSON.parse(alertaAsResult.unePtBr())[PseudoTarefaServlet.STORE_INDEX]
      switch(request){
        case '/Pseudotarefa/listar':
          def.resolve(result, 'success')
          break

        default:
          def.reject('Requisição inválida', 'error')
          break;
      }
    })  
    .fail( err => def.reject(err) )

    return def.promise()
  }
}

class TarefasFavoritasServlet extends Servlet{
  static STORE_INDEX = `STORE-#TAREFAS_FAVORITAS#`

  static get(request){
    const def = jQ3.Deferred()

    TarefasFavoritasServlet.getStore(TarefasFavoritasServlet.STORE_INDEX)
    .done( alertaAsResult => { 
      const result = JSON.parse(alertaAsResult.unePtBr())[TarefasFavoritasServlet.STORE_INDEX]
      switch(request){
        case '/TarefasFavoritas/listar':
          def.resolve(result, 'success')
          break

        default:
          def.reject('Requisição inválida', 'error')
          break;
      }
    })  
    .fail( err => def.reject(err) )

    return def.promise()
  }
}


function PseudoTarefas(){
};

PseudoTarefas.prototype.baseURL = [  
  "https://jeitz2cvt1"
];

PseudoTarefas.prototype.listarTarefas = function(callback){
  /*jQ3.each(this.baseURL, function(){
    jQ3.get(this + '/Pseudotarefa/listar', function(data, suc, xhr){
      callback && callback(JSON.parse(data.unePtBr()), suc, xhr);
    }, 'text');
  });*/
  
  const URLPeseudoTarefas = chrome.runtime.getURL('JSON/Pseudtarefas.json')
  jQ3.get(URLPeseudoTarefas, function(data, suc, xhr){
    callback && callback(JSON.parse(data.unePtBr()), suc, xhr);
  }, 'text');
  /*
  PseudoTarefaServlet.get('/Pseudotarefa/listar')
  .done((result, status) => {
    callback && callback(result, status)
  })
  */
};



PseudoTarefas.prototype.criarTarefa = function(nome, tipo, callback, dados, criteria){  
  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  var _newTarf = {
    guid : guid(),
    nome : nome,
    tipo : tipo,
    dados : dados || [],
    criteria : criteria,
    dataCriacao : (new Date()).getTime()
  };   
  
  jQ3.each(this.baseURL, function(){
    jQ3.post(this + '/Pseudotarefa/criar', JSON.stringify( _newTarf ).escPtBr(), function(data, suc, xhr){
      callback && callback(JSON.parse(data.unePtBr()), suc, xhr);
    }, "text");
  });
  
};
PseudoTarefas.prototype.deletarTarefa = function( key, callback ){
  
  jQ3.each(this.baseURL, function(){
    jQ3.post(this + '/Pseudotarefa/deletar', JSON.stringify( key ).escPtBr(), function(data, suc, xhr){
      callback && callback(JSON.parse(data.unePtBr()), suc, xhr);
    }, "text");
  });
};


PseudoTarefas.prototype.atualizarTarefa = function(key, callback){  
  jQ3.each(this.baseURL, function(){
    jQ3.post(this + '/Pseudotarefa/atualizar', JSON.stringify( key ).escPtBr(), function(data, suc, xhr){
      callback && callback(JSON.parse(data.unePtBr()), suc, xhr);
    }, "text");
  });
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

function onceAndDelay(callback, delay){
  var hash = callback.toString().hashCode();
  var _this = onceAndDelay;
    
  if(!(_this[hash]))
    _this[hash] = {
      flg : true
    };
    
  _this[hash].flg && (function(thash){
    _this[hash].flg = false;  
      
    setTimeout(function(){ 
      thash.flg = true; 
    }, delay);
      
    callback();
  })(_this[hash]);
}


function DelayedCall(min, max, logIt){
  var _min = min, _max = max;
  
  var _setTimeout = function(h, d, a){
    logIt && ( console.log('delay is ', d) );
    setTimeout(h, d, a);
  };
  var _buffer = [];
  var _waiting = false;
  var _delay = function(){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min );
  };
  var check = function(){
    if(!(_buffer.length)){
      _waiting = false;   
      return;
    }else{
      _buffer[0][0].apply(null, _buffer[0][1]);
      _buffer.shift();
      _setTimeout(check, _delay());
    }
  };
  var _ins =  function (callback){
    var argsAr = Array.prototype.slice.call(arguments);
    argsAr.shift();
    
    if(!(_waiting)){
      callback.apply(null, argsAr);
      _waiting = true;

      _setTimeout(check, _delay());
    }else{
      _buffer.push([callback, argsAr]);
    }
  };
  
  Object.defineProperty(_ins, 'metrics', {
    value: {
      min : _min,
      max : _max
    },
    writable: false
  });
  
  return _ins;
}

window.EventBus = new window.j2.mod._._42;
window.evBus = window.EventBus.EventBus;

function dbgVerbose(initId){
  var _id = initId;
  console.warn('dbgVerbose initial id:', _id);
  
  return function(uId){
    console.warn('dbgVerbose id: ', _id, uId);
    _id++;
  };
}

function EIframe(){
  return window.frameElement !== null
}

window.sessionStorage.setItem('j2EExtensionURLPattern', chrome.runtime.getURL(''));
window.sessionStorage.setItem('j2EExtensionID', chrome.runtime.id);

j2ELibRun = true;

if(! (j2E.mods))
  j2E.mods = {};

j2E.mods.runTimeConnect = function(){
  window.j2E.conn = {};
  
  
  j2E.conn.reconnect = function(){
    j2E.conn.port = chrome.runtime.connect(sessionStorage.getItem('j2EExtensionID'), { 
      includeTlsChannelId : true, 
      name : JSON.stringify({
        nome: window.location.origin,
        emIframe: EIframe()
      }) 
    })

    j2E.conn.port.onDisconnect.addListener(function() {
      console.warn('Reconnecting port ', j2E.conn.port.name);
      console.warn('Runtime last error ', chrome.runtime.lastError);
      j2E.conn.reconnect();
    });;
    j2E.conn.port.postMessageJ2E = function(load, callback, timeout, timeoutCallback){
      if(callback)
        j2E.conn._responseBus.register(load, callback, timeout, timeoutCallback);

      console.log('Posting message: ', load);
      j2E.conn.port.postMessage(load);
    };
    
    j2E.conn.port.onMessage.addListener(j2E.conn.onMessage);
  };
  
  
  j2E.conn.onMessage = function(message, sender, sendRespose) {
    var lis = j2E.conn._listeners;

    if(!(lis.length)){
      console.warn('Requisição não tratada: ', message, sender);
      return;
    }

    for(var i = 0; i < lis.length; i++ )
      j2E.conn._defer( function(callback, _message, _sender, _sendRespose){
        callback.apply(null, [_message, _sender, _sendRespose]);
      }, lis[i], message, sender, sendRespose);

  };
  
  j2E.conn._defer = new DelayedCall(250, 300);
  j2E.conn._listeners = [];
  j2E.conn._responseBus = {
    tickets : {},
    register : function(load, callback, timeout, timeoutCallback){
      j2E.conn._responseBus.tickets[load.responseBusTicket] = {
          ticket : load.responseBusTicket,
          callback : load.callback || callback,
          timestamp : (new Date()).getTime()
      };
      if(timeout){
        setTimeout(function(){
          if(j2E.conn._responseBus.tickets[load.responseBusTicket]){
            delete j2E.conn._responseBus.tickets[load.responseBusTicket];
            load.timedout = true;
            timeoutCallback(load);
          }
        }, timeout);
      }
    },
    callTicket : function(load){ 
      var _tickets = j2E.conn._responseBus.tickets;
      var _ticket = load.orgRequest.responseBusTicket;
      
      if( _tickets[_ticket] && _tickets[_ticket].callback ){
        _tickets[_ticket].callback(load.data, load.status, load);
        j2E.conn._defer(function(){
          delete _tickets[_ticket];
        });
      }
    }
  };
  
  j2E.conn.sendPing = function (pongCallback, timeoutCallback, pingInterval, timeout){
    var callbacks = {
      pong : pongCallback,
      timeout : timeoutCallback
    } ;
            
    function __sendPing(){
      var j2Request = {
        j2 : true,
        action : 'ping',
        waitsResponse : true,
        origin : window.location.origin,
        runtimeRequest : true,
        respLoadFormat : 'pong'
      };

      var request = {
        j2 : true,
        responseBusTicket : guid(),  
        domain : { 
          to : 'https://pje.tjma.jus.br',
          from : window.location.origin
        },
        fowarded : true,
        j2Action : j2Request,
        comment : "Ping para PJe."
      };

      j2E.conn.port.postMessageJ2E(request, function(loadData, loadStatus, load){
        if ( callbacks.pong )
          callbacks.pong(loadData, loadStatus, load);
      }, timeout | 5000, function(load){
        if ( callbacks.timeout )
          callbacks.timeout(load);
      });
    }
    
    __sendPing();
    setInterval(__sendPing, pingInterval | 15000);
  };
  
  
  j2E.conn.reconnect();
};

j2E.mods.registerNumeroUnicoReplacer = function (){
  /*if( !(jQ3) || !(jQ3.initialize) || )
    return;*/
  
  function _initializeRegisterNumeroUnicoReplacer(){
    //window.defer = new createDefer();
    var _delayCall = new DelayedCall(200, 400);
    var _lockr  = new createLockr('j2E');

    function isExperied(cred){
      var __TIME__ = 1000 * 60 * 10; //10 min
      var now = (new Date()).getTime();

      return ( now - cred.timestamp ) > __TIME__;
    }
    
    (function _autoDeleteExpireds(){
      function __adexp(){
        var creds = _lockr.getAll(true, 'credentials');
        for (var i = 0; i < creds.length; i++) {          
          var key;
          for(var propIt in creds[i])
            if(creds[i].hasOwnProperty(propIt))
              key = propIt;
          
          if( isExperied( creds[i][key] ) )
          _lockr.rm(key); 
        }
      };
      setInterval(__adexp, 1000 * 60);
      __adexp();
    })();
    
    
    function _processNodes(nodes){
      
      
      //var nodes = window.document.querySelectorAll('*');
      var nodesFiltered = [];

      for (var i = 0; i < nodes.length; i++) {
        if ( jQ3(nodes[i]).is('[j2-numero-unico]') ) //este é o link gerado pela aplicação
          continue;
        if ( jQ3(nodes[i]).parents().is('[contenteditable]') ) //
          continue;
        
        for (var j = 0; j < nodes[i].childNodes.length; j++) {
          if( nodes[i].childNodes[j].nodeType === 3 && 
            nodes[i].childNodes[j].nodeValue.match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)){ 
            
            nodesFiltered.push([
              nodes[i],
              nodes[i].childNodes[j]
            ]);
          }
        }
      }

      for (var i = 0; i < nodesFiltered.length; i++) {
        
        var parent = jQ3(nodesFiltered[i][0]);
        var node = nodesFiltered[i][1];
        var toReplace = [];
        
        if(node.j2IsRequsting)
          continue;
        
       /* if( parent.is('j2-numUnico-link') ) 
          if ( ! ( parent.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}/) ) )
            continue; */
        
        var _txt = node.nodeValue;
        var numProc = _txt.match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
        _txt = _txt.split( numProc );

        var aTag = jQ3('<a>', {
          href : 'javascript:void(0);',
          'j2-numero-unico' : '',
          text : numProc
        });
                
       // parent.attr('j2-numUnico-link', 'processed');
        
        if(_txt[0].length)
          toReplace.push( document.createTextNode(_txt[0]) );
        toReplace.push(aTag[0]);
        if(_txt[1].length)
          toReplace.push( document.createTextNode(_txt[1]) );
        
        var credentials = _lockr.get('credentials.' + numProc, { noData : true });

        if(credentials.noData || isExperied(credentials) ){
          node.j2IsRequsting = true;
          
          _delayCall(function(numProc, aTag, node, toReplace){
            var j2Request = {
              j2 : true,
              action : 'requisitarJ2EPJeRest',
              PJeRest : 'j2EPJeRest.processo.getCredentials',
              waitsResponse : true,
              origin : window.location.origin,
              arguments :  [numProc],
              runtimeRequest : true,
              respLoadFormat : 'runtimeRequestArray'
            };

            var request = {
              j2 : true,
              responseBusTicket : guid(),  
              domain : { 
                to : 'https://pje.tjma.jus.br',
                from : window.location.origin
              },
              fowarded : true,
              j2Action : j2Request,
              comment : "Requisitar a extensão que envie a mensagem ao uma porta do pje.tjma.jus.br para realizar requisição das credenciais de acesso de um número de processo"
            };

            j2E.conn.port.postMessageJ2E(request, function(loadData, loadStatus, load){
              _lockr.set('credentials.' + numProc, { 
                id : loadData[0],
                ca : loadData[1],
                timestamp : (new Date()).getTime()
              });
                            
              
              var url = 'https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$'.replace("$", loadData[0]).replace("$", loadData[1]);
              aTag.attr('href', url);
              aTag.attr('target', '_blank');
              //parent.attr('j2-numUnico-link', 'success');

              switch(toReplace.length){
                case 1:
                  node.replaceWith(toReplace[0]);
                  break;
                case 2:
                  node.replaceWith(toReplace[0], toReplace[1]);
                  break;
                case 3:
                  node.replaceWith(toReplace[0], toReplace[1], toReplace[2]);
                  break;
              }
            });
          }, numProc, aTag, node, toReplace);
        }else{
          var url = 'https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$'.replace("$", credentials.id).replace("$", credentials.ca);
          aTag.attr('href', url);
          aTag.attr('target', '_blank');
          parent.attr('j2-numUnico-link', 'success');

          switch(toReplace.length){
            case 1:
              node.replaceWith(toReplace[0]);
              break;
            case 2:
              node.replaceWith(toReplace[0], toReplace[1]);
              break;
            case 3:
              node.replaceWith(toReplace[0], toReplace[1], toReplace[2]);
              break;
          }
        }
      }  
    }

    $('body').observe('childList subTree characterData', function(rec){
      if(!(rec.addedNodes.length) && !(rec.removedNodes.length))
        return;
      if( ! jQ3(rec.target).text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/) )
        return;
      if( rec.target.querySelectorAll ) 
        _processNodes( rec.target.querySelectorAll('*') );
    }); 
  }
  
  function checkObserver() { // tappac as new
    if (typeof jQ3 !== 'undefined' && typeof jQ3.Observe !== 'undefined') {
      _initializeRegisterNumeroUnicoReplacer();
    }else {
      setTimeout( checkObserver, 10 );
    }
  }
  checkObserver();
};

j2E.mods.remoteJ2DocCreatorInit = function(){
  window.addEventListener("message", function(event) {
    if (!(event.source === window && event.data.response && event.data.j2Action && event.data.pageXContent))
      return;

    evBus.fire(`on-j2Doc-response`, event.data)
  })

  j2E.mods.remoteJ2DocCreator = function (id, versao, PJeVarsHTML, robot){
    window.postMessage({
      j2Action: true, 
      pageXContent : true,
      message: "create-j2Doc",
      idModelo: id,
      versao: versao,
      robot : robot,
      PJeVarsHTML : PJeVarsHTML
    }, "*")
  
    return new Promise( (res, rej)=>{
      evBus.on('on-j2Doc-response', (ev, data)=>{
        if(data.action === 'j2Doc-successful-create'){
          res( data.j2ModeloExpBodyInnerHTML )
        }else
          rej(`Erro ao criar o documento, ${data.error}`)
      })
      setTimeout(()=>{
        if (!('resolve' in Promise.prototype))
          rej('j2Modelos demorou demais para construir o modelo.')
      }, 10 * 1000)
    })
  }
}



function __sendMessageToServiceWorder(load, responseCallback){
  if(!(load.j2)) 
    load.j2 = true;
  if(!(load.pathname)) 
    load.pathname = window.location.pathname;
  if(!(load.origin)) 
    load.origin = window.location.origin;

          
  lg(`${window.location.origin} sending message to Service Workder`, load );  

  // Envia uma mensagem para o Service Worker
  chrome.runtime.sendMessage( load, responseCallback || void 0 );
}

async function inicializarJurisconsult(){
  const frequenciaParaRealizarNovaConsultaAoJurisconsult = 60 * 60 * 1000
  const frequenciaEstaInstanciaDeveTentarFazerNovaConsulta = 5 * 60 * 1000  
  const frequenciaExecutarRotina = 1 * 60 * 1000  
  const _lockr = typeof lockr !== 'undefined' ? lockr : new createLockr('j2E')
  let KEYCLOAK_IDENTITY = null

  j2E.mods.SistemasTJMA = {
    api : {
      requestToken: ()=>{      
        const def = jQ3.Deferred()  
        __sendMessageToServiceWorder({
          j2Action: 'getSharedMessage',
          from: 'https://sistemas.tjma.jus.br',
          messageName : 'sentinelaToken'
        }, response => {
          if(response.j2Action === 'getSharedMessageResponse'){
            j2E.mods.SistemasTJMA.api.ajax.setToken(response.response.message)
            def.resolve(true);
          }
          def.resolve(false);
        })
        return def.promise()
      },
      ajax : {
        get : function(url, sucCB, errCB, dataType){
          return jQ3.ajax({
            url : url,
            type : 'get',
            dataType: dataType || 'json',
            success : function(data, status, xhr){
              if(sucCB)
                sucCB(data, status, xhr);
            },
            error : function(a, b, c, d){
              if(errCB)
                errCB(a, b, c, d);
            },
            headers : {
              xhrFields: {
                withCredentials: true
              }
            },
         /*   beforeSend : function(xhr, set){
              delete set.accepts.xml;
              delete set.accepts.script;
              delete set.accepts.html;
            }*/
          });
        },
        touch : (token, instancia, sucCB, errCB)=>{ // tjma sentinela/sistema.tjma.jus.br touch
          return jQ3.ajax({
            url : 'https://sistemas.tjma.jus.br/extensaopje-api/touch',
            type : 'get',
            dataType: 'json',
            success : function(data, status, xhr){
              if(sucCB)
                sucCB(data, status, xhr);
            },
            error : function(a, b, c, d){
              if(errCB)
                errCB(a, b, c, d);
            },
            headers : {
              "Token": token,
              "Instancia": instancia,
            },
          });
        },
        setToken : token => j2E.mods.SistemasTJMA.api.ajax.accessToken = token
      },
      autoLogarViaTouch: () =>{
        const instancia = !window.location.pathname.includes('pje2g') ? 'PG' : 'SG'
        return j2E.mods.SistemasTJMA.api.ajax.touch(KEYCLOAK_IDENTITY, instancia)
      },
      sentinelaHome: (sucCB, errCB)=>{
        return j2EPJeRest.ajax.get('https://sistemas.tjma.jus.br/sentinela/SistemaAction.welcome.mtw', 
                                    sucCB, errCB);
      },
      requisitarLoginManual: (UIRequisitor, UIRemover, customDeferred)=>{
        const def = customDeferred || jQ3.Deferred()

        const winSent = UIRequisitor()
        async function __tryRequestToken(){
          const gotToken = await j2E.mods.SistemasTJMA.api.requestToken()
          if( ! gotToken )
          def.state() === 'pending' && 
          setTimeout(__tryRequestToken, 1000)
          else{
            def.resolve()
            UIRemover()
          }
        }
        defer( __tryRequestToken )

        setTimeout(()=>{
          if( def.state() === 'pending' ){
            def.reject('Falha na requisição do login.')
            UIRemover()
          }
        }, 60 * 1000)

        return def.promise()
      }
    }
  }

  j2E.mods.Jurisconsult  = {
    api : {
      ajax : {
        get : function(url, sucCB, errCB, dataType){
          return jQ3.ajax({
            url : url,
            type : 'get',
            dataType: dataType || 'json',
            success : function(data, status, xhr){
              if(sucCB)
                sucCB(data, status, xhr);
            },
            error : function(a, b, c, d){
              if(errCB)
                errCB(a, b, c, d);
            },
            headers : {
              'Authorization': `Bearer ${j2E.mods.Jurisconsult.api.ajax.accessToken.token}`,
              /*'X-KL-Ajax-Request': 'Ajax_Request'*/
            },
          });
        },
        setToken : token => j2E.mods.Jurisconsult.api.ajax.accessToken = token
      },
      getAPIJurisToken: (token, sucCB, errCB) =>{
        function _data(){
          return JSON.stringify(token)
        };
        
        return j2EPJeRest.ajax.post("https://apijuris.tjma.jus.br/v1/usuario/authenticateToken", 
                              _data(), sucCB, errCB);
      }
    },
    consultar : {
      processoPendentes: {
        processoParado: (dataFim, dias, orgaoJulgador, sucCB, errCB)=>{
          orgaoJulgador = orgaoJulgador || 30 //j2
          dias = dias || 30
          dataFim = dataFim || new Date().toISOString().split('T').shift()

          return j2E.mods.Jurisconsult.api.ajax.get(`https://apijuris.tjma.jus.br/v1/pje1g/pendentes/processos?orgaoJulgador=${orgaoJulgador}&tipoPendencia=P&qtdDias=${dias}&dtaFim=${dataFim}&inicioPagina=1&fimPagina=10000`, 
            sucCB, errCB);
        }
      }
    },
    util : {
      getUnidadePJeId: ()=>{
        var def = $.Deferred()

        
        setTimeout(() => {
          console.error('#####TODO: lógica de obtenção id da unidade que trabalha necessita ser criada.')
          const idOrgaoJulgadorPJe = Math.abs('2º Juizado Especial Cível de Imperatriz'.hashCode());

          j2E.mods.Jurisconsult.env = {
            idOrgaoJulgadorJurisconsult: 30,
            idOrgaoJulgadorPJe
          }
          def.resolve(); // Chamando o resolve com o resultado
        }, 100);
        

        return def.promise()
      }
    }
  }

  function ____getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  async function __verificarUltimaAtualizacaoNoOrgaoJulgado(){
    return new Promise( (res, rej)=>{
      let idPersistencia = ''
      function __calcularSeNecessitaAtualizar(jurisconsultJSON){
        const agora = new Date().getTime()
        const ultima = jurisconsultJSON[idPersistencia].ultimaAtualizacao

        return agora > (ultima + frequenciaParaRealizarNovaConsultaAoJurisconsult)
      }

      function __iniciarPersistencia(){
        let jurisconsultJSON = {}
        jurisconsultJSON[idPersistencia] = {
          ultimaAtualizacao: new Date().getTime(),
          __previousValue: 0
        }

        j2E.SeamIteraction.alertas.acoes.adicionarUmAlertaSemAssociarProcesso(JSON.stringify(jurisconsultJSON))
        .then( ()=>res(true))
        .fail( ()=> res(false) )
      }

      j2E.mods.Jurisconsult.util.getUnidadePJeId()
      .then(()=>{
        idPersistencia = `Jurisconsult-#${j2E.mods.Jurisconsult.env.idOrgaoJulgadorPJe}#`

        j2E.SeamIteraction.alertas.acoes.pesquisarAlerta(idPersistencia)
        .then((jurisconsultJSON, xml, acoes) =>{         
          if(jurisconsultJSON.length){
            jurisconsultJSON = JSON.parse(jurisconsultJSON)

            if( __calcularSeNecessitaAtualizar(jurisconsultJSON) ){
              jurisconsultJSON[idPersistencia].__previousValue = 
              jurisconsultJSON[idPersistencia].ultimaAtualizacao
              jurisconsultJSON[idPersistencia].ultimaAtualizacao = new Date().getTime()

              acoes.alterarAlerta(JSON.stringify(jurisconsultJSON))
              .then( ()=>res(true))
              .fail( ()=> res(false) )
            }else
              res(false)
          }else
            __iniciarPersistencia()
        })
        .fail(err=> __iniciarPersistencia() )
      })
      .fail(err=>{
        $.Toast("Jurisconsult", `Erro ao oter ids do orgão julgado. (${err}).`, "error")
        res(false)
      })
    })
  }

  function __obterTokenPJe(){
    const keycloakIdentity = ____getCookie('KEYCLOAK_IDENTITY');
    KEYCLOAK_IDENTITY = keycloakIdentity
    return !!(keycloakIdentity)
  }

  function __verificarSeDecorreuLapsoParaInstanciaRealizarNovaConsulta(ultima){
    const agora = new Date().getTime()
    return agora > (ultima + frequenciaEstaInstanciaDeveTentarFazerNovaConsulta)
  }

  function __realizarConsultaEAtualizacaoDadosJurisconsulta(){
    var def = jQ3.Deferred()
    j2E.mods.Jurisconsult.dadosConsulta ??= {}
    j2E.mods.Jurisconsult.dadosConsulta.processoPendentes ??= {}
    j2E.mods.Jurisconsult.dadosConsulta.processoPendentes.processoParado ??= {}

    j2E.mods.Jurisconsult.consultar.processoPendentes.processoParado()
    .then( res =>{
      j2E.mods.Jurisconsult.dadosConsulta.processoPendentes.processoParado = res.response
      def.resolve(j2E.mods.Jurisconsult.dadosConsulta)
    })
    .fail( err => def.reject(err) )

    return def.promise()
  }

  function __autoLogarNoSentinela(){
    const def = jQ3.Deferred()
    const defferedPersonalizadoParaRequisitarLoginManual = jQ3.Deferred()

    const UIRequisitorReturnsIframe = ()=>{
      return j2EUi.createRichModalComIframePainelUsuario(
        'Por favor fazer login no Sentinela para realizar a extração de dados',
        'https://sistemas.tjma.jus.br/sentinela/?request-login-pje',
        ()=>{
          defferedPersonalizadoParaRequisitarLoginManual.reject('Canclado pelo usuário.')
        }
      ).iframe.prop('contentWindow')
    }

    const UIReomver = ()=>{
      j2EUi.removeModal()
    }

    j2E.mods.SistemasTJMA.api.requisitarLoginManual(
      UIRequisitorReturnsIframe, 
      UIReomver, 
      defferedPersonalizadoParaRequisitarLoginManual
    )
    .done(()=> def.resolve() )
    .fail(err => def.reject(err))

    return def.promise()
  }

  function __gerarTokenDeAcessoDoAPIJuris(){
    const def = jQ3.Deferred()
    const token = j2E.mods.SistemasTJMA.api.ajax.accessToken

    j2E.mods.Jurisconsult.api.getAPIJurisToken(token)
    .done( response=> { 
      j2E.mods.Jurisconsult.api.ajax.setToken(response)
      def.resolve()
     })
    .fail(err=> def.reject(err))

    return def.promise()
  }

  function __reverterAPersistenciaParaDesfazerUltimaAtualizacao(){

  }

  (async function __inicializar() { 
    const ultimaConsultaDestaInstancia = _lockr.get(`Jurisconsulta.UltimaTentativaConsultaDestaInstancia`, { noData : true })

    if( ultimaConsultaDestaInstancia.noData || 
      __verificarSeDecorreuLapsoParaInstanciaRealizarNovaConsulta(ultimaConsultaDestaInstancia)
    ){
      _lockr.set( `Jurisconsulta.UltimaTentativaConsultaDestaInstancia`, new Date().getTime() )
      const flag = await __verificarUltimaAtualizacaoNoOrgaoJulgado()

      if( flag ){
        if (__obterTokenPJe()) 
          __autoLogarNoSentinela()
          .pipe(()=>{
            return __gerarTokenDeAcessoDoAPIJuris()
          })
          .pipe(()=>{
            $.Toast("Jurisconsult", `Realizando consultas.`, "success")
            return __realizarConsultaEAtualizacaoDadosJurisconsulta()
          })
          .then(dadosJurisconsult =>{
            evBus.on('on-consulta-Jurisconsult-obter-dados', 10000, dadosJurisconsult)
            $.Toast("Jurisconsult", `Consultas realizadas com sucesso.`, "success")
          })
          .fail(err=> { 
            $.Toast("Jurisconsult", `Falha na consulta. (${err})`, "error")
            __reverterAPersistenciaParaDesfazerUltimaAtualizacao()
          })
          .always(()=> {
            setTimeout( __inicializar, frequenciaExecutarRotina );
          })
        else{ 
          setTimeout( __inicializar, frequenciaExecutarRotina );
          __reverterAPersistenciaParaDesfazerUltimaAtualizacao()
        }
      }else{ 
        __reverterAPersistenciaParaDesfazerUltimaAtualizacao()
        setTimeout( __inicializar, frequenciaExecutarRotina );
      }
    }else
      setTimeout( __inicializar, frequenciaExecutarRotina )
  })()

}

j2E.mods.shortcuts = function (){
  var _this = j2E.mods.shortcuts;
  var $keyboard;
  var _delayCall = new DelayedCall(25, 25);
  var _wTop = {
    isTop : false,
    globalEvents : []
  };
  
  
  function _initializeRegisterShortcuts(){
    _wTop.isTop = window.top === window.self;
    $keyboard = jQ3(window).initKeyboard();
    
    $.initialize('iframe', function(){
      if(!(_wTop.globalEvents.length))
        return;
      
      var $this = jQ3(this);
      
      function ___errorHandler(){
        _delayCall(function(_wTopGlobalEvents){
          $this.prop('contentWindow').postMessage({
            j2 : true,
            pathname : window.location.pathname,
            origin : window.location.origin,
            module : 'j2E.mods.shortcuts',
            action : 'sendGlobalEventsIframe',
            globalEvents : _wTopGlobalEvents
          }, '*');
        }, _wTop.globalEvents);
      }
      
      try{
        function ___iframeInit(){
          _wTop.globalEvents.forEach(function(_eveName){
            try{
              $this.prop('contentWindow').j2E.mods.shortcuts.on(_eveName.eventName);
            }catch(e){
              ___errorHandler();
            }
          });
        }
        if($this.prop('contentWindow').j2E)
          ___iframeInit();
        else
          $this.on('load', ___iframeInit);
      }catch(e){
        ___errorHandler();
      }
    });
    
    _this.on = function(eventName, callback, isLocal){
      if(!($keyboard)){
        console.log('j2E: shortcuts nao foi iniciado');
        return;
      }
      
      if( jQ3._data($keyboard.get(0), "events")[eventName] )
        return;

      _wTop.globalEvents.push({
        eventName : eventName,
        origin : window.location.origin,
        path : window.location.pathname
      });
      
      if(! (isLocal) ){
        if(_wTop.isTop){
          if (callback )
            $keyboard.on(eventName, callback);
          else
            $keyboard.on(eventName, function(event){
              window.j2E.mods.shortcuts.externalTrigger(event, true);
            });
          
          for(var i=0; i < window.frames.length; i++)
              try{
                window.frames[i].j2E && window.frames[i].j2E.mods.shortcuts.on(eventName);
              }catch(e){
                jQ3('iframe').each(function(){
                  _delayCall(function(_iframe, _eventName){
                    _iframe.prop('contentWindow').postMessage({
                      j2 : true,
                      pathname : window.location.pathname,
                      origin : window.location.origin,
                      module : 'j2E.mods.shortcuts',
                      action : 'sendOn',
                      event  : _eventName
                    }, '*');
                  }, jQ3(this), eventName);
                });
              }
            
        }
        else
          /* se uma frame vai definir um atalho o tornando disponível globalmente
           * esse frame se sujeita a haver um outro atalho global definido pelo
           * top que sobrecreva esse atalho.
           * 
           * Se não acontecer isso, o evento globalmente lançado por um frame
           * vai ser ativado com o prefixo 'globally' ao evento
           */
            
          $keyboard.on(eventName, function(event){
            try{
              window.top.j2E.mods.shortcuts.externalTrigger(event);
            }catch(e){
              delayCall(function(_eventName){
                window.parent.postMessage({
                  j2 : true,
                  pathname : window.location.pathname,
                  origin : window.location.origin,
                  module : 'j2E.mods.shortcuts',
                  action : 'sendExternalTrigger',
                  event  : _eventName,
                  isGlobally : false
                }, '*' ); 
              }, eventName);
            }
          });
          try{
            window.top.j2E.mods.shortcuts.on(eventName);
          }catch(e){
            delayCall(function(_eventName){
              window.parent.postMessage({
                j2 : true,
                pathname : window.location.pathname,
                origin : window.location.origin,
                module : 'j2E.mods.shortcuts',
                action : 'sendOn',
                event  : _eventName
              }, 
               '*');
            }, eventName);
          }
          
          callback && $keyboard.on('globally-'+eventName, callback);
      }else{
        $keyboard.on(eventName, callback);
      }

    };
    
    
    function __listenMessageHandler(event){    
      var _load = event.data;
      if(!(_load.j2))
        return;      
      
      console.log('shortcuts: message: ', _load.action, _load);
      switch(_load.action){
        case 'sendExternalTrigger':
          _this.externalTrigger(_load.event, _load.isGlobally);
          break;
        case 'sendOn':
          _this.on(_load.event);
          break;
        case 'sendGlobalEventsIframe':
          _load.globalEvents.forEach(function(_eve){
            _delayCall(function(eveName){
              _this.on(eveName);
            }, _eve.eventName);
          });
          break;
      }
    
    }
    window.addEventListener('message', __listenMessageHandler);

    _this.externalTrigger = function(event, isGlobally){
      var _eventType = ( isGlobally ? 'globally-' : '') + ( event.target ? event.type : event );
      
      if( jQ3._data($keyboard.get(0), "events")[_eventType] )
        $keyboard.trigger(_eventType);
      else
        for(var i=0; i < window.frames.length; i++)
          try{
            window.frames[i].j2E.mods.shortcuts.externalTrigger(event, true);
          }catch(e){
            jQ3('iframe').each(function(){
              _delayCall(function(_iframe, _eventName, _event){
                _iframe.prop('contentWindow').postMessage({
                  j2 : true,
                  pathname : window.location.pathname,
                  origin : window.location.origin,
                  module : 'j2E.mods.shortcuts',
                  action : 'sendExternalTrigger',
                  event  : _eventName,
                  isGlobally : true,
                  _event : _event
                }, '*' );
              }, jQ3(this),  ( event.target ? event.type : event ), _eventType);
            });
          }
    };
  }
  
  (function _checkDependency() { // tappac as new
    if (typeof jQ3                 !== 'undefined' 
     && typeof jQ3.fn.initKeyboard !== 'undefined' 
     && typeof jQ3.initialize      !== 'undefined') {
      _initializeRegisterShortcuts();
    }else {
      setTimeout( _checkDependency, 10 );
    }
  })();
  
};

(()=>{
  let _build = ()=>{
    jQ3.get(window.sessionStorage.getItem('j2EExtensionURLPattern')  + 'PJeModelos/res/XML/Calendario.xml', function(xmlDoc){
      var j2CalEv = jQ3('CalendarioEvento', xmlDoc);
      
      j2E.Calendario.__pseudoCal = {
        $active : {
          year : new Date().getFullYear(),
          month : new Date().getUTCMonth()
        },
        changeActive : newActive => j2E.Calendario.__pseudoCal.$ = newActive
      };
      j2E.Calendario.constructor_(j2CalEv, j2E.Calendario.__pseudoCal);  
    });
  }
  function checkJQueryBuildCalendar() { // tappac as new
    if (typeof jQ3 !== 'undefined') {
      _build();
    }else {
      defer( checkJQueryBuildCalendar, 100 );
    }
  }
  checkJQueryBuildCalendar();
})


/**
 *
 * @param numeroProcesso
 * @returns id do processo se número válido ou 0, se número inválido
 */
function validarNumeroProcesso(numeroProcesso) {
  const root = window.location.origin.includes('frontend')
    ? document.referrer.replace(/\/+$/, '')
    : window.location.origin
  const url = `${root}/pje/seam/resource/rest/pje-legacy/processos/numero-processo/${numeroProcesso}/validar`
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(response => response.text())
    .then(text => Number(text))
}


/**
 *
 * @param numeroProcesso
 * @returns id do processo se número válido ou 0, se número inválido
 */
const obterIdProcesso = validarNumeroProcesso

/**
 * Gera a chave de acesso do processo pelo seu identificador
 * @param idProcesso
 * @returns
 */
function gerarChaveAcessoProcesso(idProcesso) {
  const root = window.location.origin.includes('frontend')
    ? document.referrer.replace(/\/+$/, '')
    : window.location.origin
  const url = `${root}/pje/seam/resource/rest/pje-legacy/painelUsuario/gerarChaveAcessoProcesso/${idProcesso}`
  return fetch(url, {
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  }).then(response => response.text())
}


/**
 * 
 * @param {*} numProc número do processo
 * @returns 
 */
function _getAcessoAosAutosDigitais(numProc){
  return new Promise((resolve, reject) => {
    obterIdProcesso(numProc)
      .then(idProcesso => {
        gerarChaveAcessoProcesso(idProcesso)
          .then(ca => {
            resolve({
              ca: ca,
              idProcesso: idProcesso
            })
          })
          .catch(reason => {
            reject(reason)
          })
      })
      .catch(reason => {
        reject(reason)
      })
  })
}

/**
 *
 * @param numeroProcesso
 * @returns id do processo se número válido ou 0, se número inválido
 */
function obterCurrentUser() {
  const root = window.location.origin.includes('frontend')
    ? document.referrer.replace(/\/+$/, '')
    : window.location.origin
  const url = `${root}/pje/seam/resource/rest/pje-legacy/usuario/currentUser`
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(response => response.json())
}


/**
 * Download a blob response
 */
function downloadBlob(resBlob, fileName){
  const url = window.URL.createObjectURL(resBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || 'novo download';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove()
}