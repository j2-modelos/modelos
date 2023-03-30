/* global helpers*/
var w = window;
function lg(m){console.log(m);};
function lgB(m){console.log('j2 boot: ' + m);};
function wrn(m){console.warn(m);};
function lgErr(m){console.error(m);};

/**************** Adapted from Modelos J2 root.js ***********************/
function RUN(e, manualBoot) { // pdc
  
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
    return window.location.protocol === 'https:';
  };
  w.j2.env.j2U = {};
  
  /*w.j2.env.keys = {
    'alt' : event.altKey,
    'ctrl' : event.ctrlKey,
    'shift' : event.shiftKey
  };*/
      
  if (!window.jQ)
    window.jQ = window.$ || window.parent.jQuery || window.jQuery_21;
  
    window.j2.mod.com._.rootConversation = {
    'msgBuilder' : function(_tx, clear){
      var _p = document.createElement('p');
      var _ldRunConv = document.getElementById('ldRunConv');
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
      window.j2.mod.com._.rootConversation.msgBuilder(':( - Opa! Preciso da senha do Proxy!');
    },
    'notFoundAlert' : function(){
      window.j2.mod.com._.rootConversation.msgBuilder(':( - Opa! Inicilizado nao foi encontrado! Erro 404');
    },
    'somError' : function(){
      window.j2.mod.com._.rootConversation.msgBuilder(':( - Opa! Algum Erro Aconteceu! Vou fazer um teste.', true);
	  window.j2.mod.com._.connTry.run();
    }
  };
  window.j2.mod.com._.connTry = {
    'run' : function () {
      var xmlhttp = new XMLHttpRequest(); 
      xmlhttp.onreadystatechange = function() {
        lgB('load run.js: readyState' + xmlhttp.readyState + ' | status: ' + xmlhttp.status);
        var _msg = window.j2.mod.com._.rootConversation.msgBuilder;
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
      xmlhttp.open('GET', window.j2.mod.com.URLGetter(w.j2.res.MAIN.run.ref(), w.j2.res.MAIN.run.fileName), true);
      xmlhttp.send();
    }
  };	  
  window.j2.mod.com._.cacSrc = {
    '_cache' : function (name, version, url, j2Def) {
     },
    '_load': function (url, name, version, callback, onload_, j2Def) {
      var s = document.createElement(j2Def.tag.load);

      if (s.readyState) { 
        s.onreadystatechange = function() {
          if (s.readyState === 'loaded' || s.readyState === 'complete') {
            s.onreadystatechange = null;
            window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def);
            if (callback) callback();
          }
        };
      } else { 
        s.onload = function(a, b, c, d) {
          window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def);
          if (onload_) onload_.loaded();
          if (callback) callback();
        };
		s.onerror = function() {
          window.j2.mod.com._.rootConversation.somError();
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
        window.j2.mod.com._.cacSrc._load(url, name, version, callback, onload, j2Def);
        return;
      }
      var s = document.createElement(j2Def.tag.inject);
      s.type = j2Def.reqType.inject;
      s.id = name;
      var scriptContent = document.createTextNode(c.content);
      s.appendChild(scriptContent);
      j2Def.context.doc.getElementsByTagName(j2Def.context.loc)[0].appendChild(s);
      if (onload) onload.injected();
      if (callback) callback();
    }, 

    'require' : function (name, version, url, callback, onload, j2Def) {
      var c = localStorage.getItem(name);
      if(!(c)) {
        window.j2.mod.com._.cacSrc._load(url, name, version, callback, onload, j2Def);

      } else
        window.j2.mod.com._.cacSrc._inject(c, url, name, version, callback, onload, j2Def);
    }
  };  
  
  

  j2.mod.com._.rootConversation.msgBuilder(':) - Tentando carregar.', true);

  lgB('carregamento do injector');

  
  lgB('definicao dos boot artifacts.');
  w.j2.res.MAIN.run = { 
    'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '57xizu6zo7nxeiv' : '/res/MAIN/run.js' : '4n0n9fhat6cyud2'; },
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
      var lib = window.j2.mod.com._._manualFire.data;
      var h   = window.j2.mod.com._._manualFire.handle;
      
      if (window.j2) if(window.j2.mod) if (window.j2.mod.eventBus) if (window.j2.mod.eventBus.EventBus){
        if (document.getElementById(lib)){
          lg('script ' + lib + ' is loaded.');
          clearInterval(h);
          lgB('fired: loaded-'+lib);
          window.j2.mod.eventBus.EventBus.fire('loaded-'+lib);
        }
      }
    }
  }; /* general */
  
  lgB('definicao do srcp gen');
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
      
      lg('script ' + lib + ' is created.');
    }
    else {
      scrp.id = data.lib;
      scrp.src = data.ref();
      scrp.onload = function () {
        lg('script ' + data.lib + ' is loaded.');
        if(window.j2.mod.eventBus.EventBus)
          window.j2.mod.eventBus.EventBus.fire('loaded-'+data.lib);
      };
      lg('script ' + data.lib + ' is created.');
    }
    return scrp;
  };
  
  lgB('definicao do style gen');
  w.j2.mod.com.styleGen = function (data, lib) {
    var stl = document.createElement('style');
    var manualFire = window.j2.mod.com._._manualFire;
    stl.type = 'text/css';
    stl.id = lib;
    stl.innerHTML = data;

    manualFire.data = lib;
    manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100);

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
    /*if (w.j2ModDebug)
      URL_PATERN = window.location.origin + '/';
    else
      URL_PATERN = 'https://pje.tjma.jus.br/pje/Painel/painel_usuario/documentoHTML.seam?idBin=';*/
    
    if (window.location.protocol === 'http:')
      URL_PATERN = window.location.origin;
    else
      URL_PATERN = window.location.protocol +  '//dl.dropboxusercontent.com/s/'; 
    
   /* lgErr('ASSERTION: code must be adjust in production. Remove <false> bellow.');*/
    /*if (window.location.protocol === 'http:')*/
   /* if (false)
      URL_PATERN = window.location.origin;
    else
      URL_PATERN = window.location.protocol +  '//mail.tjma.jus.br/home/juizciv2_itz@tjma.jus.br'; */
      
    
    
    function getURL(id, fn) {
      
      if (window.location.protocol === 'https:')
        return URL_PATERN + id + '/' + fn;
      else
        return URL_PATERN + id;
    };

    return getURL;
  };/*********************************/

  lgB('definicao da libloader');
  w.j2.mod.com.libLoader = function (art, ctxt, manualBootCallback) {  // pdc
    if(!(ctxt))
      ctxt = {
        doc : document, 
        loc : 'head'
      };
    
    if (ctxt.doc.getElementById(art.lib))
      return;
    
    lgB('to load '+art.lib);
    
      var v = (art.version)?art.version:'0.0';
      var u = window.j2.mod.com.URLGetter(art.ref(), art.fileName);
      
      if(art.type === 'j2/javascript'){
       /* document.head.appendChild(
          window.j2.mod.com.scrpGen(art)
        );*/
        
        var onload = {
          loaded : function(){
            lg('script ' + art.lib + ' is loaded.');
            if(window.j2.mod.eventBus && window.j2.mod.eventBus.EventBus) //pdc
              window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib);
            if(manualBootCallback){ // pdc
              manualBootCallback();
              manualBootCallback = null;
            }
          },
          injected : function(){
            var manualFire = window.j2.mod.com._._manualFire;
            manualFire.data = art.lib;
            manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100);
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
          jQ.get(window.j2.mod.com.URLGetter(art.ref(), art.fileName), function(data, status, object){
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
                

              window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, new XMLSerializer().serializeToString(data.documentElement) );
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
            window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, storedLib.content );
        }
        else {
          __load();
        }
      }      
      if(art.type === 'j2/styleSheet'){
        var onload_ = {
          loaded : function(){
            lg('styleSheet ' + art.lib + ' is loaded.');
            if(window.j2.mod.eventBus.EventBus)
               window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib);
          },
          injected : function(){
            var manualFire = window.j2.mod.com._._manualFire;
            manualFire.data = art.lib;
            manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100);
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
          jQ.get(window.j2.mod.com.URLGetter(art.ref(), art.fileName), function(data, status, object){
            if(status==='success'){
              localStorage.setItem(art.lib, JSON.stringify({
                'content': data,
                'version': (art.version)?art.version:'0.0.0',
                'type': art.type
              }));

              window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, data );
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
            window.j2.mod.eventBus.EventBus.fire('loaded-'+art.lib, storedLib.content );
        }
        else {
          __load();
        }
      }      
    
  };

  lgB('Cleaning the window Extenr'); // pl
  if(j2.api.winExt) // pl as new
    while(j2.api.winExt.document.body.firstChild) 
      j2.api.winExt.document.body.firstChild.remove();

  lgB('Carregamento principal');    
  if(!(manualBoot)) // pdc as new
    manualBoot = {
      res : w.j2.res.MAIN.run
    };
    
  w.j2.mod.com.libLoader( manualBoot.res, manualBoot.ctx, manualBoot.callback  ); //pdc


}

/* menuContent main root activator */
(function(){
  window.j2 = {};
  
  j2.api = {
    gE : function(i){
      return document.getElementById(i);
    },
    idProcesso : function(){
      var _  = j2.api.gE('j2Data.idProcesso');
      return (_)?_.value:'0';
    },
    origin : window.location.origin,
    winExt : null,
    idModelo : null,
    idModeloVersao : null, //pl ?
    extDependency : [], // pl
    menuContent : { /* analogs ao de pkg.FerramentasProcesso */
      inserirAlertaAction : function(){
        var url = j2.api.origin + '/pje/Processo/ConsultaProcesso/listAlertas.seam?id=' + j2.api.idProcesso();
        var xmlHttp=new XMLHttpRequest();

        xmlHttp.onreadystatechange=function(){
          if (xmlHttp.readyState===4 && xmlHttp.status===200){
            var rt = xmlHttp.responseText;

            if ( rt.indexOf('Sem permiss') !==-1 )
              if ( rt.indexOf('o para acessar a p') !==-1 )
                if ( rt.indexOf('gina.')!==-1 )
                  url = j2.api.origin + '/pje/Alerta/listView.seam';

            j2.api.opW.center(url, 'wndAlerta', j2.api.idProcesso());
          }

          if (xmlHttp.readyState===4 && xmlHttp.status===404)
            alert('###### ERRO NO PROCEDIMENTO');
        };
        xmlHttp.open('GET',url,true);
        xmlHttp.send();
        j2.api.menuContent.hideMenu();
      },
      realizarTarefaAction : function(){
        j2.api.opW.center(j2.api.origin + '/pje/Processo/movimentar.seam?idProcesso='+ j2.api.idProcesso(), 'wndMovProc', j2.api.idProcesso());
        j2.api.menuContent.hideMenu();
      },
      retificarAutuacaoAction : function(){
        j2.api.opW.center(j2.api.origin + '/pje/Processo/RetificacaoAutuacao/updateRetificacaoAutuacao.seam?idProcesso='+j2.api.idProcesso()+'&tab=tabPartes', 'wndRetProc', j2.api.idProcesso());
        j2.api.menuContent.hideMenu();
      },
      visualizarContatos : function(){
        j2.api.winExt = j2.api.opW.center('', 'wndVisualizarContatos');
        j2.api.idModelo ='j2Protocolo';
        
        j2.api.menuContent.hideMenu();
        
        RUN();
      },
      visualizarListaPostagem : function(){ // pl as new
        j2.api.winExt = j2.api.opW.center('', 'wndVisualizarContatos', null, { width : 1080, height : 600});
        
        j2.api.extDependency = [
          //'j2..res.mod.postList', 
          {lib : 'j2.res.mod.postListDef'}, 
          {lib : 'j2.res.mod.postList_'},
          {lib : 'j2.res.mod.postList'}, 
          {lib : 'j2.res.mod.AR'},
          {lib : 'j2.res.MAIN.addtionalControls'},
          {lib : 'j2.res.XML.addtionalControlsClsDef'},
          {lib : 'j2.res.XML.addtionalControls'}
        ];
        
        j2.api.idModelo ='AR-PostList';
        j2.api.idModeloVersao = '3.0';
        j2.api.menuContent.hideMenu();
        
        RUN();
      },
      gerPDFFromDocumentoJ2 : function(){ // pdf 
        j2.api.menuContent.hideMenu();
        
        
        j2.api.winExt = j2.api.opW.center('', 'FerramentasProcessoBaixarPDF', null, { width : 50, height : 30});
        

        var j2ExpC = document.getElementById('j2Exp').cloneNode(true);
        
        
        /*j2ExpC.find('div').filter(function() {
            return $(this).css('box-shadow').length > 0;
          }
        ).css('box-shadow', '');
        j2ExpC.find('#normalizeFormtas').css('border', '');*/

        var _pdfWin = j2.api.winExt;
        var _wB = _pdfWin.document.body;
        
        var _html2pdf =  { //pdf
          'ref': function () { return (window.j2ModDebug)?( window.location.protocol === 'https:' )? '0' : '/res/lib/html2pdf.js' : '0'; },                
          'lib': 'ROOT/lib/html2pdf.js',
          'type': 'j2/javascript',
          'version' : '1.0', 
          'fileName' : 'jsPDF.js'
        };

        var _ctx =  {
          doc : _pdfWin.document, 
          loc : 'head'
        };
        
        var _rootCallback =  function(){       
          
          _wB.appendChild(j2ExpC);

          var opt = {
            margin:       0,
            filename:     'j2Documento.pdf',
            image:        { type: 'jpeg', quality: 1.00 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
          };
          
          setTimeout(function(){
            _pdfWin.html2pdf().set(opt).from(_pdfWin.document.getElementById('j2Exp')).save(null, document);
          setTimeout(function(){_pdfWin.close();},250);
          }, 250);
        };
        
        var manualBoot = {
          res : _html2pdf,
          callback : _rootCallback,
          ctx : _ctx
        };
        
        
        RUN(null, manualBoot);
      },
      hideMenu : function(){
        var _ = j2.api.gE('ShortCutMenu.Popup');
        if (_){
          _.style.visibility = 'hidden';
          _.style.display = 'none';
          _.setAttribute('mce_style', '');
        }
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
})();

lg('menContent.js - módulo compilante');