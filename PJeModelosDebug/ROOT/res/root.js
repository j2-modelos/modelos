/* global storeLib */

/******** NECESSARY GLOBAL VAR ***********/
var sharedWindow;
var myWindow;
/***************************************/
function RUN(e) {

  
  
  if(!(event))
    var event = e;
  
  /* checking if user is requesting local storage cleaning */
  var w = window;
  var db = new function(){
    var _ = event.ctrlKey;
    return function(t){
      if(_)
          console.log('DEPURAÇÃO: ' + t);
    };
  };
    
  w.j2 = {};
  w.j2.res = {};
  w.j2.res.MAIN = {};
  w.j2.mod = {};
  w.j2.mod.com = {}; /* general */
  w.j2.mod.com._ = {};
  w.j2.db = db;
  w.j2.env = {};
  w.j2.ut = {};
  w.j2.ut.isHttps = function(){
    return window.location.protocol === 'https:';
  };
  
  w.j2.env.keys = {
    'alt' : event.altKey,
    'ctrl' : event.ctrlKey,
    'shift' : event.shiftKey
  };
      
  if (!window.jQ)
    window.jQ = window.$ || window.parent.jQuery;

  if(event.shiftKey){
    var keys = [];
    var fg = false;
    var C_LIB_PREFIX = 'ROOT';
    console.log('Requested localStorage cleaning.');
    
    var i = 0;
    while(localStorage.key(i)){
      var it = localStorage.key(i);
      if(it.indexOf(C_LIB_PREFIX)===0){
        localStorage.removeItem(it);
        console.log('removido ' + it);        
      }
      else
        i++;
    };
  }

  window.j2.mod.com._.cacSrc = {
    '_cache' : function (name, version, url, j2Def) {
        var xmlhttp = new XMLHttpRequest(); 
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              localStorage.setItem(name, JSON.stringify({
                content: xmlhttp.responseText,
                version: version,
                type: j2Def.type
              }));
            } else {
              console.warn('error loading '+url);
            }
          }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
      },
    '_load': function (url, name, version, callback, onload_, j2Def) {
      var s = document.createElement(j2Def.tag);

      if (s.readyState) { 
        s.onreadystatechange = function() {
          if (s.readyState === 'loaded' || s.readyState === 'complete') {
            s.onreadystatechange = null;
            window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def);
            if (callback) callback();
          }
        };
      } else { 
        s.onload = function() {
          window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def);
          if (onload_) onload_.loaded();
          if (callback) callback();
        };
      }

      s.setAttribute(j2Def.attr, url);
      if(j2Def.optAttr)
        s.setAttribute(j2Def.optAttr.name, j2Def.optAttr.value);  
      document.getElementsByTagName('head')[0].appendChild(s);
    },

    '_inject' : function (content, url, name, version, callback, onload, j2Def) {
      var c = JSON.parse(content);
      /* cached version is not the request version, clear the cache, this will trigger a reload next time */
      if (c.version !== version) {
        localStorage.removeItem(name);
        window.j2.mod.com._.cacSrc._load(url, name, version, callback, onload, j2Def);
        return;
      }
      var s = document.createElement(j2Def.tag);
      s.type = j2Def.type.replace('j2', 'text');
      s.id = name;
      var scriptContent = document.createTextNode(c.content);
      s.appendChild(scriptContent);
      document.getElementsByTagName('head')[0].appendChild(s);
      if (onload) onload.injected();
      if (callback) callback();
    }, 

    'require' : function (name, version, url, callback, onload, j2Def) {
      var c = localStorage.getItem(name);
      if (c == null) {
        window.j2.mod.com._.cacSrc._load(url, name, version, callback, onload, j2Def);

      } else {
        window.j2.mod.com._.cacSrc._inject(c, url, name, version, callback, onload, j2Def);
      }
    }
  };  
  
  w.j2.res.MAIN.run = {
    //'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '57xizu6zo7nxeiv' : '/res/MAIN/run.js' : '6skh7nd3pjmpqut'; }, //original line
    'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '57xizu6zo7nxeiv' : '/res/MAIN/run2.js' : '6skh7nd3pjmpqut'; },                
    'lib': 'ROOT/res/MAIN/run.js',
    'type': 'j2/javascript',
    'version': '1.2',
    'fileName' : 'run.js'
  };

  /* manual fire min module */
  w.j2.mod.com._._manualFire = {
    'handle' : 0,
    'data' : '',
    'trig' : function(){
      var lib = window.j2.mod.com._._manualFire.data;
      var h   = window.j2.mod.com._._manualFire.handle;
      
      if (window.j2 && window.j2.mod && window.j2.mod.eventBus && window.j2.mod.eventBus.EventBus){
        if (document.getElementById(lib)){
          console.log('script ' + lib + ' is loaded.');
          clearInterval(h);
          db('fired: loaded-'+lib);
          window.j2.mod.eventBus.EventBus.fire('loaded-'+lib);
        }
      }
    }
  }; /* general */
  
  w.j2.mod.com.scrpGen = function (data, lib) {
    var scrp = document.createElement('script');
    var manualFire = window.j2.mod.com._._manualFire;
    scrp.type = 'text/javascript';
    scrp.charset = 'UFT-8';
    scrp.defer = true;
    scrp.async = true;

    if (lib) {
      scrp.id = lib;
      scrp.text = data;
      
      manualFire.data = lib;
      manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100);
      
      console.log('script ' + lib + ' is created.');
    }
    else {
      scrp.id = data.lib;
      scrp.src = data.ref();
      scrp.onload = function () {
        console.log('script ' + data.lib + ' is loaded.');
        if(window.j2.mod.eventBus.EventBus)
          window.j2.mod.eventBus.EventBus.fire('loaded-'+data.lib);
      };
      console.log('script ' + data.lib + ' is created.');
    }
    return scrp;
  };
  
  w.j2.mod.com.styleGen = function (data, lib) {
    var stl = document.createElement('style');
    var manualFire = window.j2.mod.com._._manualFire;
    stl.type = 'text/css';
    stl.id = lib;
    stl.innerHTML = data;

    manualFire.data = lib;
    manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100);

    console.log('style ' + lib + ' is created.');
    return stl;
  };
  /*
   * 
   * @param {type} id - dropbox id
   * @param string fn - file name
   * @returns {RUN.root_L205.getURL}
   */
  w.j2.mod.com.URLGetter = new function (id, fn) {

    var URL_PATERN;
    /*if (w.j2ModDebug)
      URL_PATERN = window.location.origin + '/';
    else
      URL_PATERN = 'https://pje.tjma.jus.br/pje/Painel/painel_usuario/documentoHTML.seam?idBin=';*/
    
    if (window.location.protocol === 'http:')
      URL_PATERN = window.location.origin;
    else
      URL_PATERN = window.location.protocol +  '//dl.dropboxusercontent.com/s/'; 
    
    
    function getURL(id, fn) {
      if (window.location.protocol === 'https:')
        return URL_PATERN + id + '/' + fn;
      else
        return URL_PATERN + id;
    };

    return getURL;
  };/*********************************/

  w.j2.mod.com.libLoader = function (art, seqLoadLib) { /* artfact */
    if (document.getElementById(art.lib))
      return;
    
    db('to load '+art.lib);
    
    if (!w.j2ModDebug) { 
      db('Não é modo de depuração');
      var _ = localStorage.getItem(art.lib);
        
      if(_){
        db('armazenada.');
        var storedLib = JSON.parse(_);
        db('interprestado');
        var vs = (storedLib.version)?storedLib.version:'0.0.0';
        
        db('versão: ' + vs);
        if(storedLib.version !== vs){
          db('versão diferente. Não armazenada');
          localStorage.removeItem(storedLib.lib);
          
          jQ.get(window.j2.mod.com.URLGetter(art.ref()), function(data, status, object){
            db('obtido');
            if(status==='success'){
              db('armazenar');
              localStorage.setItem(art.lib, JSON.stringify({
                'content': jQ(data).find('#content').text(),
                'version': (art.version)?art.version:'0.0.0',
                'type': art.type
              }));
              db('armazenado');
              if(art.type === 'j2/javascript'){
                db('é javaScript');
                document.head.appendChild(
                  window.j2.mod.com.scrpGen(jQ(data).find('#content').text(), art.lib)
                );
              }
              if(art.type === 'j2/xml'){
                db('é xml');
                window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, jQ(data).find('#content').text() );
              }
              if(art.type === 'j2/styleSheet'){
                db('é styleSheet');
                document.head.appendChild(
                  window.j2.mod.com.styleGen(jQ(data).find('#content').text(), art.lib)
                );
              }
            }
            if(status==='error'){
              var e = 'Erro ao carregar ' + art.lib + '.';
              alert(e);
              console.error(e);
            }
          });          
        }else{
          db('versão está armazenada');
          db('art.type='+art.type);
          db(storedLib.content);
          if(art.type === 'j2/javascript'){
            db('é javascript');
            document.head.appendChild(
              window.j2.mod.com.scrpGen(storedLib.content, art.lib)
            );
          }
          if(art.type === 'j2/xml'){
            db('é xml');
            db('fire evento');
              window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, storedLib.content );
          }
          if(art.type === 'j2/styleSheet'){
            db('é styleSheet');
            document.head.appendChild(
              window.j2.mod.com.styleGen(storedLib.content, art.lib)
            );
          }
        }
      }else{
        db('não armazenada');
        jQ.get(window.j2.mod.com.URLGetter(art.ref()), function(data, status, object){
          db( art.lib + ' objeto por ajax');
          if(status==='success'){
            db('armazenar');
            localStorage.setItem(art.lib, JSON.stringify({
              'content': jQ(data).find('#content').text(),
              'version': (art.version)?art.version:'0.0.0',
              'type': art.type
            }));
            db('armazenado');            
            db(jQ(data).find('#content').text());
            if(art.type === 'j2/javascript'){
              db('Tipo javascript');
              document.head.appendChild(
                window.j2.mod.com.scrpGen(jQ(data).find('#content').text(), art.lib)
              );
            }
            if(art.type === 'j2/xml'){
              db('Tipo xml');
              window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, jQ(data).find('#content').text() );
            }
            }
            if(status==='error'){
              var e = 'Erro ao carregar ' + art.lib + '.';
              alert(e);
              console.error(e);
            }
        });
      }
    } else {
      db('É versão de depuração.');
      var v = (art.version)?art.version:'0.0';
      var u = window.j2.mod.com.URLGetter(art.ref(), art.fileName);
      
      if(art.type === 'j2/javascript'){
       /* document.head.appendChild(
          window.j2.mod.com.scrpGen(art)
        );*/
        
        var onload = {
          loaded : function(){
            console.log('script ' + art.lib + ' is loaded.');
            if(window.j2.mod.eventBus.EventBus)
              window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib);
          },
          injected : function(){
            var manualFire = window.j2.mod.com._._manualFire;
            manualFire.data = art.lib;
            manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100);
            console.log('script ' + art.lib + ' is created.');
          }
        };
                
        w.j2.mod.com._.cacSrc.require(art.lib, v, u, undefined, onload, {tag: 'script', type:'j2/javascript', attr : 'src'});
      }
      if(art.type === 'j2/xml'){
        jQ.get(window.j2.mod.com.URLGetter(art.ref(), art.fileName), function(data, status, object){
          if(status==='success'){
            localStorage.setItem(art.lib, JSON.stringify({
              'content': new XMLSerializer().serializeToString(data.documentElement),
              'version': (art.version)?art.version:'0.0.0',
              'type': art.type
            }));
            
            window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, new XMLSerializer().serializeToString(data.documentElement) );
          }
          if(status==='error'){
            var e = 'Erro ao carregar ' + art.lib + '.';
            alert(e);
            console.error(e);
          }
        });
      }      
      if(art.type === 'j2/styleSheet'){
        var onload_ = {
          loaded : function(){
            console.log('styleSheet ' + art.lib + ' is loaded.');
            if(window.j2.mod.eventBus.EventBus)
               window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib);
          },
          injected : function(){
            var manualFire = window.j2.mod.com._._manualFire;
            manualFire.data = art.lib;
            manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100);
            console.log('styleSheet ' + art.lib + ' is created.');
          }
        };
                
        w.j2.mod.com._.cacSrc.require(art.lib, v, u, undefined, onload_, {
          tag: 'link', 
          type:'j2/styleSheet', 
          attr : 'href',
          optAttr : {
            name : 'rel',
            value : 'stylesheet'
          }
        });
      }
    
  };

  db('carregar MAIN');
  w.j2.mod.com.libLoader( w.j2.res.MAIN.run );


}
/**** ends functions advanced f730037 ****/


