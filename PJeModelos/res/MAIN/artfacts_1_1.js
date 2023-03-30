/* 
 * ASS: Promessa de Compra e Venda
 * DOC: 5397233
 * MOD: artfacts.js
 * 
 * Decritor de variáeis para PJe
 * 
 * versão 2017.06.05.1
 */

console.log('artfacts.js - módulo compilante');

try {
  (function () { /* inits autoexec */
    var evBus = window.j2.mod.eventBus.EventBus;
    var w = window;
    var isHttps = function(){
      return window.location.protocol === 'https:';
    };
    
    /* w.j2.res.MAIN.run = {}; PREVIOUS DEFINIED*/
    /* w.j2.res.MAIN.artifacts = {}; PREVIOUS DEFINIED*/
    w.j2.res.MAIN.PJeVars = {
      'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '/j2/res/MAIN/PJeVars.js' : '/j2/res/MAIN/PJeVars.js' : '/j2/res/MAIN/PJeVars.js'; 
      },
      'lib': 'ROOT/res/MAIN/PJeVars.js',
      'type': 'j2/javascript',
      'version' : '1.0', 
      'fileName' : 'PJeVars.js'
    }; 
    w.j2.res.MAIN.baseClasses = {
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/MAIN/BaseClasses.js' : '/j2/res/MAIN/BaseClasses.js' : '/j2/res/MAIN/BaseClasses.js'; }, 
      'lib': 'ROOT/res/MAIN/BaseClasses.js',
      'type': 'j2/javascript',
      'version' : '0.1', 
      'fileName' : 'BaseClasses.js'
    };
    w.j2.res.MAIN.xmlParser = {
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/MAIN/xmlParser.js' : '/j2/res/MAIN/xmlParser.js' : '/j2/res/MAIN/xmlParser.js'; },
      'lib': 'ROOT/res/MAIN/xmlParser.js',
      'type': 'j2/javascript',
      'version' : '1.5', 
      'fileName' : 'xmlParser.js'
    };    
    w.j2.res.MAIN.builder = { 
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/MAIN/builder.js' : '/j2/res/MAIN/builder.js' : '/j2/res/MAIN/builder.js'; },
      'lib': 'ROOT/res/MAIN/builder.js',
      'type': 'j2/javascript',
      'version' : '0.1', 
      'fileName' : 'builder.js'
    };     
    w.j2.res.MAIN.addtionalControls = { 
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/MAIN/addtionalControls.js' : '/j2/res/MAIN/addtionalControls.js' : '/j2/res/MAIN/addtionalControls.js'; },
      'lib': 'ROOT/res/MAIN/addtionalControls.js',
      'type': 'j2/javascript',
      'version' : '1.0', 
      'fileName' : 'addtionalControls.js'
    };     

    /* XML PACKAGE */
    w.j2.res.XML = { 
      'baseClasses' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/BaseClasses.xml' : '/j2/res/XML/BaseClasses.xml' : '/j2/res/XML/BaseClasses.xml'; }, 
        'lib': 'ROOT/res/XML/BaseClasses.xml',
        'type': 'j2/xml',
        'version' : '0.1', 
        'fileName' : 'BaseClasses.xml'
      },
      'modelos' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/Modelos.xml' : '/j2/res/XML/Modelos.xml' : '/j2/res/XML/Modelos.xml'; },
        'lib': 'ROOT/res/XML/Modelos.xml',
        'type': 'j2/xml',
        'version' : '0.1', 
        'fileName' : 'Modelos.xml'
        
      },
      'unidadesAutorizadas' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/UnidadesAutorizadas.xml' : '/j2/res/XML/UnidadesAutorizadas.xml' : '/j2/res/XML/UnidadesAutorizadas.xml'; },
        'lib': 'ROOT/res/XML/UnidadesAutorizadas.xml',
        'type': 'j2/xml',
        'version' : '0.1', 
        'fileName' : 'UnidadesAutorizadas.xml',
        'storable' : true
      },
      'usuarios' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/Usuarios.xml' : '/j2/res/XML/Usuarios.xml' : '/j2/res/XML/Usuarios.xml'; },        
        'lib': 'ROOT/res/XML/Usuarios.xml',
        'type': 'j2/xml',
        'version' : '1.1', 
        'fileName' : 'Usuarios.xml',
        'storable' : true
      },
      'classStyles' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/classStyles.xml' : '/j2/res/XML/classStyles.xml' : '/j2/res/XML/classStyles.xml'; },                
        'lib': 'ROOT/res/XML/classStyles.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'classStyles.xml'
      },
      'update' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/update.xml' : '/j2/res/XML/update.xml' : '/j2/res/XML/update.xml'; },                
        'lib': 'ROOT/res/XML/update.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'update.xml',
        'storable' : false
      },
      'addtionalControls' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/addtionalControls.xml' : '/j2/res/XML/addtionalControls.xml' : '/j2/res/XML/addtionalControls.xml'; },                
        'lib': 'ROOT/res/XML/addtionalControls.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'addtionalControls.xml'
      },
      'addtionalControlsClsDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/addtionalControlsClsDef.xml' : '/j2/res/XML/addtionalControlsClsDef.xml' : '/j2/res/XML/addtionalControlsClsDef.xml'; },                
        'lib': 'ROOT/res/XML/addtionalControlsDef.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'addtionalControlsClsDef.xml'
      }
    };
    
    w.j2.res.CSS = {
      'j2' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/css/j2.css' : '/j2/res/css/j2.css' : 'vybjjxfohi298q0'; },                
        'lib': 'ROOT/res/css/j2.css',
        'type': 'j2/styleSheet',
        'version' : '1.0', 
        'fileName' : 'j2.css',
        injectWins : ['exp', 'edt']
      },
      'bootstrap' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/CSS/bootstrap.css' : '/j2/res/CSS/bootstrap.css' : '/j2/res/CSS/bootstrap.css'; },                
        'lib': 'ROOT/res/css/bootstrap.css',
        'type': 'j2/styleSheet',
        'version' : '4.3.1', 
        'fileName' : 'bootstrap.css',
        injectWins : ['edt']
      }
    };
    

    w.j2.res.selectSources = {
      'meiosComunicacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/meiosComunicacao.xml' : '/j2/res/XML/selectSources/meiosComunicacao.xml' : '/j2/res/XML/selectSources/meiosComunicacao.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/meiosComunicacao.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'meiosComunicacao.xml'        
      },
      'prioridadeExpedientesItem' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/prioridadeExpedientesItem.xml' : '/j2/res/XML/selectSources/prioridadeExpedientesItem.xml' : '/j2/res/XML/selectSources/prioridadeExpedientesItem.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/prioridadeExpedientesItem.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'prioridadeExpedientesItem.xml'        
      },
      'advertencias' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/advertencias.xml' : '/j2/res/XML/selectSources/advertencias.xml' : '/j2/res/XML/selectSources/advertencias.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/advertencias.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'advertencias.xml'        
      },
      'termoAudienciaTitulos' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/termoAudienciaTitulos.xml' : '/j2/res/XML/selectSources/termoAudienciaTitulos.xml' : '/j2/res/XML/selectSources/termoAudienciaTitulos.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/termoAudienciaTitulos.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoAudienciaTitulos.xml'        
      },
      'termoReclamacaoTitulos' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/termoReclamacaoTitulos.xml' : '/j2/res/XML/selectSources/termoReclamacaoTitulos.xml' : '/j2/res/XML/selectSources/termoReclamacaoTitulos.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/termoReclamacaoTitulos.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoTitulos.xml'        
      },
      'mandadoTitulos' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/mandadoTitulos.xml' : '/j2/res/XML/selectSources/mandadoTitulos.xml' : '/j2/res/XML/selectSources/mandadoTitulos.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/mandadoTitulos.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'mandadoTitulos.xml'        
      },
      'destinatarios' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/destinatarios.xml' : '/j2/res/XML/selectSources/destinatarios.xml' : '/j2/res/XML/selectSources/destinatarios.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/destinatarios.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'destinatarios.xml'        
      },
      'tiposDocumento' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/tiposDocumento.xml' : '/j2/res/XML/selectSources/tiposDocumento.xml' : '/j2/res/XML/selectSources/tiposDocumento.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/tiposDocumento.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'tiposDocumento.xml'        
      },
      'meiosAtendimento' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/XML/selectSources/meiosAtendimento.xml' : '/j2/res/XML/selectSources/meiosAtendimento.xml' : '/j2/res/XML/selectSources/meiosAtendimento.xml'; },                
        'lib': 'ROOT/res/XML/selectSources/meiosAtendimento.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'meiosAtendimento.xml'        
      }
    };    
    
    w.j2.res.mod = {
      'certidao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/certidao.js' : '/j2/res/mod/certidao.js' : '/j2/res/mod/certidao.js'; },                
        'lib': 'ROOT/res/mod/certidao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'certidao.js'        
      },
      'certidaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/certidaoSelSrc.xml' : '/j2/res/mod/certidaoSelSrc.xml' : '/j2/res/mod/certidaoSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/certidaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'certidaoSelSrc.xml'        
      },
      'citacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/citacao.js' : '/j2/res/mod/citacao.js' : '/j2/res/mod/citacao.js'; },                
        'lib': 'ROOT/res/mod/citacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'citacao.js'        
      },
      'citacaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/citacaoSelSrc.xml' : '/j2/res/mod/citacaoSelSrc.xml' : '/j2/res/mod/citacaoSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/citacaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'citacaoSelSrc.xml'        
      },      
      'intimacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/intimacao.js' : '/j2/res/mod/intimacao.js' : '/j2/res/mod/intimacao.js'; },                
        'lib': 'ROOT/res/mod/intimacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'intimacao.js'        
      },
      'intimacaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/intimacaoSelSrc.xml' : '/j2/res/mod/intimacaoSelSrc.xml' : '/j2/res/mod/intimacaoSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/intimacaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'intimacaoSelSrc.xml'        
      },
      'AR' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/AR.js' : '/j2/res/mod/AR.js' : '/j2/res/mod/AR.js'; },                
        'lib': 'ROOT/res/mod/AR.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'AR.js'        
      },
      'ARDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/ARDef.xml' : '/j2/res/mod/ARDef.xml' : '/j2/res/mod/ARDef.xml'; },                
        'lib': 'ROOT/res/mod/ARDef.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'ARDef.xml'        
      },
      'AR_' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/AR.xml' : '/j2/res/mod/AR.xml' : '/j2/res/mod/AR.xml'; },                
        'lib': 'ROOT/res/mod/AR.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'AR.xml'        
      },
      'postList' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/postList.js' : '/j2/res/mod/postList.js' : '/j2/res/mod/postList.js'; },                
        'lib': 'ROOT/res/mod/postList.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'postList.js'        
      },
      'postListDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/postListDef.xml' : '/j2/res/mod/postListDef.xml' : '/j2/res/mod/postListDef.xml'; },                
        'lib': 'ROOT/res/mod/postListDef.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'postListDef.xml'        
      },
      'postList_' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/postList.xml' : '/j2/res/mod/postList.xml' : '/j2/res/mod/postList.xml'; },                
        'lib': 'ROOT/res/mod/postList.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'postList.xml'        
      },      
      'decisao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/decisao.js' : '/j2/res/mod/decisao.js' : '/j2/res/mod/decisao.js'; },                
        'lib': 'ROOT/res/mod/decisao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'decisao.js'        
      },
      'decisaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/decisaoSelSrc.xml' : '/j2/res/mod/decisaoSelSrc.xml' : '/j2/res/mod/decisaoSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/decisaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'decisaoSelSrc.xml'        
      },      
      'decisaoJuizAdmissSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/decisaoJuizAdmissSelSrc.xml' : '/j2/res/mod/decisaoJuizAdmissSelSrc.xml' : '/j2/res/mod/decisaoJuizAdmissSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/decisaoJuizAdmissSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'decisaoJuizAdmissSelSrc.xml'        
      },      
      'despacho' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/despacho.js' : '/j2/res/mod/despacho.js' : '/j2/res/mod/despacho.js'; },                
        'lib': 'ROOT/res/mod/despacho.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'despacho.js'        
      },
      'despachoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/despachoSelSrc.xml' : '/j2/res/mod/despachoSelSrc.xml' : '/j2/res/mod/despachoSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/despachoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'despachoSelSrc.xml'        
      },           
      'despachoCumSenSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/despachoCumSenSelSrc.xml' : '/j2/res/mod/despachoCumSenSelSrc.xml' : '/j2/res/mod/despachoCumSenSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/despachoCumSenSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'despachoCumSenSelSrc.xml'        
      },   
      'sentenca' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/sentenca.js' : '/j2/res/mod/sentenca.js' : '/j2/res/mod/sentenca.js'; },                
        'lib': 'ROOT/res/mod/sentenca.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'sentenca.js'        
      },
      'sentencaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/sentencaSelSrc.xml' : '/j2/res/mod/sentencaSelSrc.xml' : '/j2/res/mod/sentencaSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/sentencaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'sentencaSelSrc.xml'        
      },      
      'termoAudiencia' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoAudiencia.js' : '/j2/res/mod/termoAudiencia.js' : '/j2/res/mod/termoAudiencia.js'; },                
        'lib': 'ROOT/res/mod/termoAudiencia.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoAudiencia.js'        
      },
      'termoAudienciaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoAudienciaSelSrc.xml' : '/j2/res/mod/termoAudienciaSelSrc.xml' : '/j2/res/mod/termoAudienciaSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/termoAudienciaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoAudienciaSelSrc.xml'        
      },      
      'termoReclamacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoReclamacao.js' : '/j2/res/mod/termoReclamacao.js' : '/j2/res/mod/termoReclamacao.js'; },                
        'lib': 'ROOT/res/mod/termoReclamacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoReclamacao.js'        
      },
      'termoReclamacaoFatosSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoReclamacaoFatosSelSrc.xml' : '/j2/res/mod/termoReclamacaoFatosSelSrc.xml' : '/j2/res/mod/termoReclamacaoFatosSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoFatosSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoFatosSelSrc.xml'        
      },      
      'termoReclamacaoPedidosSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoReclamacaoPedidosSelSrc.xml' : '/j2/res/mod/termoReclamacaoPedidosSelSrc.xml' : '/j2/res/mod/termoReclamacaoPedidosSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoPedidosSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoPedidosSelSrc.xml'        
      },
      'termoReclamacaoPartesSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoReclamacaoPartesSelSrc.xml' : '/j2/res/mod/termoReclamacaoPartesSelSrc.xml' : '/j2/res/mod/termoReclamacaoPartesSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoPartesSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoPartesSelSrc.xml'        
      },
      'termoReclamacaoDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoReclamacaoDef.xml' : '/j2/res/mod/termoReclamacaoDef.xml' : '/j2/res/mod/termoReclamacaoDef.xml'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoDef.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoDef.xml'        
      },
      'termoReclamacao_' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoReclamacao.xml' : '/j2/res/mod/termoReclamacao.xml' : '/j2/res/mod/termoReclamacao.xml'; },                
        'lib': 'ROOT/res/mod/termoReclamacao.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacao.xml'        
      },      
      'mandado' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/mandado.js' : '/j2/res/mod/mandado.js' : '/j2/res/mod/mandado.js'; },                
        'lib': 'ROOT/res/mod/mandado.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'mandado.js'        
      },
      'mandadoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/mandadoSelSrc.xml' : '/j2/res/mod/mandadoSelSrc.xml' : '/j2/res/mod/mandadoSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/mandadoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'mandadoSelSrc.xml'        
      },      
      'termoPeticao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoPeticao.js' : '/j2/res/mod/termoPeticao.js' : '/j2/res/mod/termoPeticao.js'; },                
        'lib': 'ROOT/res/mod/termoPeticao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoPeticao.js'        
      },
      'termoPeticaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoPeticaoSelSrc.xml' : '/j2/res/mod/termoPeticaoSelSrc.xml' : '/j2/res/mod/termoPeticaoSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/termoPeticaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoPeticaoSelSrc.xml'        
      },      
      'termo' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoZ.js' : '/j2/res/mod/termoZ.js' : '/j2/res/mod/termoZ.js'; },                
        'lib': 'ROOT/res/mod/termoZ.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoZ.js'        
      },
      'termoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/termoZSelSrc.xml' : '/j2/res/mod/termoZSelSrc.xml' : '/j2/res/mod/termoZSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/termoZSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoZSelSrc.xml'        
      },      
      'atoOrdinatorio' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/atoOrdinatorio.js' : '/j2/res/mod/atoOrdinatorio.js' : '/j2/res/mod/atoOrdinatorio.js'; },                
        'lib': 'ROOT/res/mod/atoOrdinatorio.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'atoOrdinatorio.js'        
      },
      'atoOrdinatorioSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/atoOrdinatorioSelSrc.xml' : '/j2/res/mod/atoOrdinatorioSelSrc.xml' : '/j2/res/mod/atoOrdinatorioSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/atoOrdinatorioSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'atoOrdinatorioSelSrc.xml'        
      },      
      'oficio' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/oficio.js' : '/j2/res/mod/oficio.js' : '/j2/res/mod/oficio.js'; },                
        'lib': 'ROOT/res/mod/oficio.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'oficio.js'        
      },
      'oficioSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/oficioSelSrc.xml' : '/j2/res/mod/oficioSelSrc.xml' : '/j2/res/mod/oficioSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/oficioSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'oficioSelSrc.xml'        
      },
      'alvara' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/alvara.js' : '/j2/res/mod/alvara.js' : '/j2/res/mod/alvara.js'; },                
        'lib': 'ROOT/res/mod/alvara.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'alvara.js'        
      },
      'cartaPrecatoria' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/cartaPrecatoria.js' : '/j2/res/mod/cartaPrecatoria.js' : '/j2/res/mod/cartaPrecatoria.js'; },                
        'lib': 'ROOT/res/mod/cartaPrecatoria.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'cartaPrecatoria.js'        
      },
      'cartaPrecatoriaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/cartaPrecatoriaSelSrc.xml' : '/j2/res/mod/cartaPrecatoriaSelSrc.xml' : '/j2/res/mod/cartaPrecatoriaSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/cartaPrecatoriaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'cartaPrecatoriaSelSrc.xml'        
      },      
      'sentencaPretensaoResistidaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/mod/sentencaPretensaoResistidaSelSrc.xml' : '/j2/res/mod/sentencaPretensaoResistidaSelSrc.xml' : '/j2/res/mod/sentencaPretensaoResistidaSelSrc.xml'; },                
        'lib': 'ROOT/res/mod/sentencaPretensaoResistidaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'sentencaPretensaoResistidaSelSrc.xml'        
      }
    };     
    
    w.j2.res.lib = {
      'monetario' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/monetario.js' : '/j2/res/lib/monetario.js' : '/j2/res/lib/monetario.js'; },                
        'lib': 'ROOT/lib/monetario.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'monetario.js'        
      },
      'menuContent' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/menuContent.j2' : '/j2/res/lib/menuContent.j2' : '/j2/res/lib/menuContent.j2'; },                
        'lib': 'ROOT/lib/menuContent.j2',
        'type': 'j2/text',
        'version' : '1.0',
        'fileName' : 'menuContent.j2'        
      },
      'menuContentScr' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/menuContent.js' : '/j2/res/lib/menuContent.js' : '/j2/res/lib/menuContent.js'; },                
        'lib': 'ROOT/lib/menuContent.js',
        'type': 'j2/text',
        'version' : '1.0', 
        'fileName' : 'menuContent.js'        
      },
      'formatacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/formatacao.js' : '/j2/res/lib/formatacao.js' : '/j2/res/lib/formatacao.js'; },                
        'lib': 'ROOT/lib/formatacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'formatacao.js'        
      },
      'htmlTools' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/htmlTools.js' : '/j2/res/lib/htmlTools.js' : '/j2/res/lib/htmlTools.js'; },                
        'lib': 'ROOT/lib/htmlTools.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'htmlTools.js'        
      },
      'jquery3' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/jquery3.js' : '/j2/res/lib/jquery3.js' : '/j2/res/lib/jquery3.js'; },                
        'lib': 'ROOT/lib/jquery3.js',
        'type': 'j2/javascript',
        'version' : '3.1.1', 
        'fileName' : 'jquery3.js',
        inject : [
          {
            win : 'edt',
            loc : 'body'
          }  
        ]
      },
      'bootstrap' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/bootstrap.js' : '/j2/res/lib/bootstrap.js' : '/j2/res/lib/bootstrap.js'; },                
        'lib': 'ROOT/lib/bootstrap.js',
        'type': 'j2/javascript',
        'version' : '4.3.1', 
        'fileName' : 'bootstrap.js',
        inject : [
          {
            win : 'edt',
            loc : 'body'
          }  
        ]        
      },
      'popper' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '/j2/res/lib/popper.js' : '/j2/res/lib/popper.js' : '/j2/res/lib/popper.js'; },                
        'lib': 'ROOT/lib/popper.js',
        'type': 'j2/javascript',
        'version' : '1.14.7', 
        'fileName' : 'popper.js',
        inject : [
          {
            win : 'edt',
            loc : 'body'
          }  
        ]        
      }
    };            
    
    /*console.log('ASSERTION: há artefatos que não foram registrado ainda com seus ids do dropbox.');*/
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.artfacts.lib;
  alert(t);
  console.error(t);
}