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


function lg(m){console.log(m);};
function lgB(m){console.log('j2 boot: ' + m);};
function wrn(m){console.warn(m);};
function lgErr(m){console.error(m);};

/**************** Adapted from Modelos J2 root.js ***********************/
function RUN(e, manualBoot) { // PDC
  
  lgB('-----------------------------------------------------------------------------------------');
  lgB('Iniciando modelos j2.');
  lgB('Inciação especial escopo menuContext Modelos J2');
    
  
  lgB('definicoes globais;');
  
  if(!(event))
    var event = e;
  
  /* checking if user is requesting local storage cleaning */
        
  //w.j2 = {};
  w.j2.res = {};
  w.j2.res.MAIN = {};
  w.j2.mod = {};
  w.j2.mod.com = {}; /* general */
  w.j2.mod.com._ = {};
  w.j2.lgB = lgB;
  w.j2.env = {};
  w.j2.ut = {};
  w.j2.ut.isHttps = function(){
    /*
     * procedimento é utilizado para definir o escopo da chamada dos arquivos. Logo, ser falso, retoma um valor de caminho e não do dropbox.
     */
    return false; 
  };
  w.j2.env.j2U = {};
  
  /*w.j2.env.keys = {
    'alt' : event.altKey,
    'ctrl' : event.ctrlKey,
    'shift' : event.shiftKey
  };*/
      
  if (!_window.jQ)
  _window.jQ = window.jQuery_21 || window.jQuery
  
    try {
      let __ = _window.parent.location.href
    } catch (error) {
      _window.parent = null
      _window.parent = window
    }
  
    _window.j2.mod.com._.rootConversation = {
    'msgBuilder' : function(_tx, clear){
      var _p = _document.createElement('p');
      var _ldRunConv = _document.getElementById('ldRunConv');
      if(!(_ldRunConv))
        return;
      _p.style.fontFamily = String.fromCharCode(34) + 'Segoe UI' + String.fromCharCode(34) + ', Tahoma, Geneva, Verdana, sans-serif';
      _p.style.fontWeight = 'bold';
      _p.style.textAlign = 'center';
      _p.style.margin = '0 0 0 0';
      _p.innerHTML = _tx;
      if(clear)
	while(_ldRunConv.firstChild)
	  _ldRunConv.firstChild.remove();
		  
      _ldRunConv.appendChild(_p);
	  
    },
    'proxyAlert' : function(){
      _window.j2.mod.com._.rootConversation.msgBuilder(':( - Opa! Preciso da senha do Proxy!');
    },
    'notFoundAlert' : function(){
      _window.j2.mod.com._.rootConversation.msgBuilder(':( - Opa! Inicilizado nao foi encontrado! Erro 404');
    },
    'somError' : function(){
      _window.j2.mod.com._.rootConversation.msgBuilder(':( - Opa! Algum Erro Aconteceu! Vou fazer um teste.', true);
      _window.j2.mod.com._.connTry.run();
    }
  };
  _window.j2.mod.com._.connTry = {
    'run' : function () {
      var xmlhttp = new XMLHttpRequest(); 
      xmlhttp.onreadystatechange = function() {
        lgB('load run.js: readyState' + xmlhttp.readyState + ' | status: ' + xmlhttp.status);
        var _msg = _window.j2.mod.com._.rootConversation.msgBuilder;
        if (xmlhttp.readyState === 2)
          _msg(':) - Conectei!');

        if (xmlhttp.readyState === 3)
          _msg(':) - Recebendo dados do servidor!');

        if (xmlhttp.readyState === 4) {
          switch(xmlhttp.status){
            case 200:
              _msg(':) - Conexao ao inicializador ok!');
              break;
            case 404:
              _msg(':( - O inicializador nao foi encontrado. A conexao esta ok.');
              break;
            case 407:
              _msg(':( - Preciso da senha do proxy do tjma para continuar.');
              break;
            case 408:
              _msg(':( - Minha requisicao foi enviada, mas passou o tempo limite para o servidor receber.');
              break;
            case 500:
              _msg(':( - A culpa nao eh minha! eh do servidor do Dropbox!');
              break;
            case 503:
              _msg(':( - O servidor do Dropbox esta em manutencao ou sobrecarregado!');
              break;
            default:
              _msg(':( - Nao sei o que aconteceu. ' + xmlhttp.status + '?');
              break;
          }
        };
      };
      xmlhttp.open('GET', _window.j2.mod.com.URLGetter(w.j2.res.MAIN.run.ref(), w.j2.res.MAIN.run.fileName), true);
      xmlhttp.send();
    }
  };	  
  _window.j2.mod.com._.cacSrc = {
    '_cache' : function (name, version, url, j2Def) {
     },
    '_load': function (url, name, version, callback, onload_, j2Def) {
      var s = _document.createElement(j2Def.tag.load);

      if (s.readyState) { 
        s.onreadystatechange = function() {
          if (s.readyState === 'loaded' || s.readyState === 'complete') {
            s.onreadystatechange = null;
            _window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def);
            if (callback) callback();
          }
        };
      } else { 
        s.onload = function(a, b, c, d) {
          _window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def);
          if (onload_) onload_.loaded();
          if (callback) callback();
        };
		s.onerror = function() {
          _window.j2.mod.com._.rootConversation.somError();
        };
      }

      s.setAttribute(j2Def.attr, url);
      if(j2Def.optAttr)
        s.setAttribute(j2Def.optAttr.name, j2Def.optAttr.value);  
      j2Def.context.doc.getElementsByTagName(j2Def.context.loc)[0].appendChild(s);
    },

    '_inject' : function (content, url, name, version, callback, onload, j2Def) {
      var c = JSON.parse(content);
      /* cached version is not the request version, clear the cache, this will trigger a reload next time */
      if (c.version !== version) {
        localStorage.removeItem(name);
        _window.j2.mod.com._.cacSrc._load(url, name, version, callback, onload, j2Def);
        return;
      }
      var s = _document.createElement(j2Def.tag.inject);
      s.type = j2Def.reqType.inject;
      s.id = name;
      var scriptContent = _document.createTextNode(c.content);
      s.appendChild(scriptContent);
      j2Def.context.doc.getElementsByTagName(j2Def.context.loc)[0].appendChild(s);
      if (onload) onload.injected();
      if (callback) callback();
    }, 

    'require' : function (name, version, url, callback, onload, j2Def) {
      var c = localStorage.getItem(name);
      if(!(c)) {
        _window.j2.mod.com._.cacSrc._load(url, name, version, callback, onload, j2Def);

      } else
        _window.j2.mod.com._.cacSrc._inject(c, url, name, version, callback, onload, j2Def);
    }
  };  
  
  

  w.j2.mod.com._.rootConversation.msgBuilder(':) - Tentando carregar.', true);

  lgB('carregamento do injector');

  
  lgB('definicao dos boot artifacts.');
  w.j2.res.MAIN.run = { 
    'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '57xizu6zo7nxeiv' : '/res/MAIN/runForDataJS.js' : '4n0n9fhat6cyud2'; },
    /*'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '/j2/res/MAIN/run_1.js' : '/res/MAIN/run2.js' : '/j2/res/MAIN/run_1.js'; },   */             
    'lib': 'ROOT/res/MAIN/run.js',
    'type': 'j2/javascript',
    'version': '1.2',
    'fileName' : 'run.js'
  };

  lgB('definicao do manual fire');
  /* manual fire min module */
  w.j2.mod.com._._manualFire = {
    'handle' : 0,
    'data' : '',
    'trig' : function(){
      var lib = _window.j2.mod.com._._manualFire.data;
      var h   = _window.j2.mod.com._._manualFire.handle;
      
      if (_window.j2) if(_window.j2.mod) if (_window.j2.mod.eventBus) if (_window.j2.mod.eventBus.EventBus){
        if (_document.getElementById(lib)){
          lg('script ' + lib + ' is loaded.');
          clearInterval(h);
          lgB('fired: loaded-'+lib);
          _window.j2.mod.eventBus.EventBus.fire('loaded-'+lib);
        }
      }
    }
  }; /* general */
  
  lgB('definicao do srcp gen');
  w.j2.mod.com.scrpGen = function (data, lib) {
    var scrp = _document.createElement('script');
    var manualFire = _window.j2.mod.com._._manualFire;
    scrp.type = 'text/javascript';
    scrp.charset = 'UFT-8';
    scrp.defer = true;
    scrp.async = true;

    if (lib) {
      scrp.id = lib;
      scrp.text = data;
      
      manualFire.data = lib;
      manualFire.handle = setInterval(_window.j2.mod.com._._manualFire.trig, 100);
      
      lg('script ' + lib + ' is created.');
    }
    else {
      scrp.id = data.lib;
      scrp.src = data.ref();
      scrp.onload = function () {
        lg('script ' + data.lib + ' is loaded.');
        if(_window.j2.mod.eventBus.EventBus)
          _window.j2.mod.eventBus.EventBus.fire('loaded-'+data.lib);
      };
      lg('script ' + data.lib + ' is created.');
    }
    return scrp;
  };
  
  lgB('definicao do style gen');
  w.j2.mod.com.styleGen = function (data, lib) {
    var stl = _document.createElement('style');
    var manualFire = _window.j2.mod.com._._manualFire;
    stl.type = 'text/css';
    stl.id = lib;
    stl.innerHTML = data;

    manualFire.data = lib;
    manualFire.handle = setInterval(_window.j2.mod.com._._manualFire.trig, 100);

    lg('style ' + lib + ' is created.');
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
   
    //URL_PATERN = window.sessionStorage.getItem('j2EExtensionURLPattern');
    URL_PATERN = 'https://jeitz2cvt1/j2/'

    
    
    function getURL(id, fn) {
        return URL_PATERN + 'PJeModelos' + id;
    };

    return getURL;
  };/*********************************/

  lgB('definicao da libloader');
  w.j2.mod.com.libLoader = function (art, ctxt, manualBootCallback) {  // pdc
    if(!(ctxt))
      ctxt = {
        doc : _document, 
        loc : 'head'
      };
    
    if (ctxt.doc.getElementById(art.lib))
      return;
    
    lgB('to load '+art.lib);
    
      var v = (art.version)?art.version:'0.0';
      var u = _window.j2.mod.com.URLGetter(art.ref(), art.fileName);
      
      if(art.type === 'j2/javascript'){
       /* _document.head.appendChild(
          _window.j2.mod.com.scrpGen(art)
        );*/
        
        var onload = {
          loaded : function(){
            lg('script ' + art.lib + ' is loaded.');
            if(_window.j2.mod.eventBus && _window.j2.mod.eventBus.EventBus) //pdc
              _window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib);
            if(manualBootCallback){ // pdc
              manualBootCallback();
              manualBootCallback = null;
            }
          },
          injected : function(){
            var manualFire = _window.j2.mod.com._._manualFire;
            manualFire.data = art.lib;
            manualFire.handle = setInterval(_window.j2.mod.com._._manualFire.trig, 100);
            lg('script ' + art.lib + ' is created.');
          }
        };
                
        w.j2.mod.com._.cacSrc.require(art.lib, v, u, undefined, onload, {
          tag: {
            load : 'script',
            inject : 'script'
          }, 
          type:'j2/javascript', 
          reqType : {
            load : 'text/javascript',
            inject : 'text/javascript'
          },
          attr : 'src', 
          context : ctxt} );
      }
      if(art.type === 'j2/xml'){
        var __load = function(){
          w.jQ.get(_window.j2.mod.com.URLGetter(art.ref(), art.fileName), function(data, status, object){
            if(status==='success'){
              var ls = function (){/*localStorage.setItem(art.lib, JSON.stringify({
                  'content': new XMLSerializer().serializeToString(data.documentElement),
                  'version': (art.version)?art.version:'0.0.0',
                  'type': art.type
                }));*/};
                
              if(art.hasOwnProperty('storable')){
                if(art.storable===true)
                  ls();
                else{
                  console.warn(art.lib + ' is not storable.');
                  console.warn(new XMLSerializer().serializeToString(data.documentElement));
                }
              }
              else
                  ls();
                

              _window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, new XMLSerializer().serializeToString(data.documentElement) );
            }
            if(status==='error'){
              var e = 'Erro ao carregar ' + art.lib + '.';
              alert(e);
              console.error(e);
            }
          });
        };
        var j2xml = localStorage.getItem(art.lib);
        
        if(j2xml){
          var storedLib = JSON.parse(j2xml);
          var vs = (storedLib.version)?storedLib.version:'0.0.0';

          if(storedLib.version !== vs){
            localStorage.removeItem(storedLib.lib);
            __load();
          }
          else
            _window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, storedLib.content );
        }
        else {
          __load();
        }
      }      
      if(art.type === 'j2/styleSheet'){
        var onload_ = {
          loaded : function(){
            lg('styleSheet ' + art.lib + ' is loaded.');
            if(_window.j2.mod.eventBus.EventBus)
               _window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib);
          },
          injected : function(){
            var manualFire = _window.j2.mod.com._._manualFire;
            manualFire.data = art.lib;
            manualFire.handle = setInterval(_window.j2.mod.com._._manualFire.trig, 100);
            lg('styleSheet ' + art.lib + ' is created.');
          }
        };
                
        w.j2.mod.com._.cacSrc.require(art.lib, v, u, undefined, onload_, {
          tag: {
            load : 'link',
            inject : 'style'
          }, 
          type:'j2/styleSheet', 
          reqType : {
            load : 'stylesheet',
            inject : 'text/css'
          },
          attr : 'href',
          optAttr : {
            name : 'rel',
            value : 'stylesheet'
          },
          context : ctxt
        });
      }
      if(art.type === 'j2/text'){
        var __load = function(){
          w.jQ.get(_window.j2.mod.com.URLGetter(art.ref(), art.fileName), function(data, status, object){
            if(status==='success'){
              localStorage.setItem(art.lib, JSON.stringify({
                'content': data,
                'version': (art.version)?art.version:'0.0.0',
                'type': art.type
              }));

              _window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, data );
            }
            if(status==='error'){
              var e = 'Erro ao carregar ' + art.lib + '.';
              alert(e);
              console.error(e);
            }
          });
        };
        var j2xml = localStorage.getItem(art.lib);
        
        if(j2xml){
          var storedLib = JSON.parse(j2xml);
          var vs = (storedLib.version)?storedLib.version:'0.0.0';

          if(storedLib.version !== vs){
            localStorage.removeItem(storedLib.lib);
            __load();
          }
          else
            _window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, storedLib.content );
        }
        else {
          __load();
        }
      }      
    
  };
  
  lgB('Cleaning the _window Extenr'); // pl
  if(w.j2.api.winExt) // pl as new
    while(w.j2.api.winExt.document.body.firstChild) 
      w.j2.api.winExt.document.body.firstChild.remove();

  lgB('Carregamento principal');    
  if(!(manualBoot?.res)) // pdc as new
    if(!(manualBoot)) 
      manualBoot= {
        res : w.j2.res.MAIN.run
      };
    else
      manualBoot.res = w.j2.res.MAIN.run
  
  
  w.j2.mod.com.libLoader( manualBoot.res, manualBoot.ctx, manualBoot.callback  ); //pdc
  w.evBus = undefined

  return new Promise(res =>{
    function __check() { // tappac as new
      if (typeof w.evBus !== 'undefined') {
        //evBus.on(`builder.afterBuildModSet.${w.j2.api.idModelo}`, (ev, buildContext)=>{
        w.evBus.on(`builder.afterBuildModSet.externalApi.${w.j2.api.idModelo}`, (ev, buildContext)=>{
          res(buildContext)
        })
      }else {
        setTimeout( __check, 50 );
      }
    }
    __check();
  })
}

var _window
var _document 
var w
/* menuContent main root activator */
function initJ2External(){
  /* global helpers*/
  _window = document.getElementById('pseudoExp').contentWindow
  _document = document.getElementById('pseudoExp').contentDocument
  w = _window;
  w.j2ModDebug = true; //para carregamento de recursos acessívei sda extensão
  w.j2Extension = true;
  var j2 = _window.j2 = {}

  lg('menContent.js - anônima: autoexecução');
  j2.api = {
    gE : function(i){
      return _document.getElementById(i);
    },
    idProcesso : function(){
      var _  = j2.api.gE('j2Data.idProcesso');
      return (_)?_.value:'0';
    },
    origin : window.location.origin,
    winExt : null,
    idModelo : null,
    idModeloVersao : null, // pl?
    extDependency : [], // pl
    actions : { /* analogs ao de pkg.FerramentasProcesso */
      carregarModeloJ2 : async function(idModelo, versao, PJeVarsHTML){
        j2.api.winExt = _window
        j2.api.winEdt = document.getElementById('pseudoEdt').contentWindow

        j2.api.idModelo = idModelo || 'j2Termo';
        j2.api.idModeloVersao = versao || '3.0';
        j2.api.PJeVarsHTML = PJeVarsHTML
        
        return await RUN();
      },
      executarRobot : async (robot) =>{
        var _evBus = _window.evBus
        var filter = new _window.j2.mod._._90;
        var mod = _window.j2.modelo
        var forEach = _window.j2.mod.forEach;
        var _obterPoloParte = j2.api.util.obterPoloParte

        function _executarPassosDoRobot(_res){
          //na lógica dos modelos j2, o evento abaixo deve ser o ultimo dispardo
          // na interação do usuário
          _evBus.on('DocEditorCore.afterCloseEditor', 1, ()=>{
            _res()
          })

          robot.passos.forEach( (passo)=>{
            switch(passo.tipo){
              case 'avaliacaoDeString':
                try{
                  var codeByRobotFunction = eval(passo.string);
                  if (typeof codeByRobotFunction === 'function') 
                    codeByRobotFunction();
                }catch(e){
                  console.error('####Erro ao avaliar o string do passo', e)
                }
                break;
              case 'iterarSelector':
                var [selToIterate] = filter(j2.mod.clsCnstr.Selector.instances, {id: passo.instanceId})
                if(!(selToIterate)){
                  console.error('####Essa instância de seletor não existe: ${tipo.instanceId}', robot)
                  return;
                }

                passo.items.forEach((item)=>{
                  selToIterate.select.value = item
                  selToIterate.butAdd.click() 
                })
                break;
              case 'copiarElmento':
                var $el = mod.exp.jQ3(passo.elemento)
                for(var i=0; i < passo.copias; i++){
                  var $elC = $el.clone()
                  $el.after($elC)
                  $elC.attr('id', `${passo.elemento.substr(1)}_${i+2}`)
                  $el = $elC
                }
                  
                break;
              case 'iterarCopias':
                passo.fonte.forEach((it, idx)=>{
                  var id = `${passo.elemento}${(idx>0)? '_'+(idx+1) : ''}`
                  var $el = mod.exp.jQ3(id)
                  forEach(passo.mapaSubstituicao, (value, propName)=>{
                    try{
                      $el.find(propName).html( eval(value) )
                    }catch(e){
                      throw new Error(`Erro ao avaliar a propriedade: '${propName}' : '${value}'`)
                    }
                  })
                })
                break;
            }
          })
        }

        return new Promise(res =>{
          if(!(robot)){
            res();
            return;
          }

          if(robot?.executarNoEvento)
            _evBus.on(robot.executarNoEvento.evento, 10, ()=>{
              setTimeout(()=>_executarPassosDoRobot(res), robot.executarNoEvento.atrasar || 1)
            })
          else
            setTimeout( ()=>{
              _executarPassosDoRobot(res)
            }, 1000 );
        })
      },
    },
    util : {
      obterPoloParte: (nomeParte) => {
        var filter = new _window.j2.mod._._90;
        var poloVazio = {
          "UCase": "",
          "LCase": "",
          "Capt": "",
          "parte": {
            "UCase": "",
            "LCase": "",
            "Capt": ""
          }
        } 

        if(!(window?.j2?.env?.PJeVars?.partes?.list?.todasPartes))
          return poloVazio
        
        var [parte] = filter(window?.j2?.env?.PJeVars?.partes?.list?.todasPartes, {
          nome : nomeParte
        })

        if(!(parte))
          return poloVazio

        return (parte?.polo) ? parte.polo : poloVazio
      }
    },
    opW : { 
      /* copy j2.mod._._opW -> run.js 2228*/
      center : function(url, name, idProcesso, winSize, scrolled){
        if(name)
          if(idProcesso)
            name+=idProcesso;
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
        return win;
      },
      corner : function(url, name, idProcesso, winSize, scrolled, callback){ // pdc
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
        return win;
      }
    }
  }; 
}

window.addEventListener("message", async function(event) {
  if (!(event.source === window && event.data.j2Action && event.data.pageXContent))
    return;

  switch(event.data.message){
    case "create-j2Doc":
      initJ2External()

      var _dt = event.data

      const j2Modelo = await _window.j2.api.actions.carregarModeloJ2(
        _dt.idModelo, _dt.versao, _dt.PJeVarsHTML
      )

      await _window.j2.api.actions.executarRobot(_dt.robot)
      
      event.source.postMessage({ 
        j2Action: true, 
        action: 'j2Doc-successful-create',
        pageXContent : true,
        j2ModeloExpBodyInnerHTML: j2Modelo.exp.innerHTML,
        response: true
      },  event.origin);

      break;
  }

});

lg('menContent.js - módulo compilante');