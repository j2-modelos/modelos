/* 
 * artifacts for data object javascript
 */

console.log('artfacts.js - módulo compilante');

try {
  (function () { /* inits autoexec */
    var evBus = window.j2.mod.eventBus.EventBus;
    var w = window;
    var isHttps = function(){
      
      return window.j2Extension ? false : window.location.protocol === 'https:';
    };
    
    /* w.j2.res.MAIN.run = {}; PREVIOUS DEFINIED*/
    /* w.j2.res.MAIN.artifacts = {}; PREVIOUS DEFINIED*/
    w.j2.res.MAIN.PJeVars = {
      'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '0' : '/res/MAIN/PJeVars.js' : 'h8dmrkxtv9pipuf'; 
      },
      'lib': 'ROOT/res/MAIN/PJeVars.js',
      'type': 'j2/javascript',
      'version' : '1.0', 
      'fileName' : 'PJeVars.js'
    }; 
    w.j2.res.MAIN.baseClasses = {
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/MAIN/BaseClasses.js' : 's0nz7dcqpilpuhn'; }, 
      'lib': 'ROOT/res/MAIN/BaseClasses.js',
      'type': 'j2/javascript',
      'version' : '0.1', 
      'fileName' : 'BaseClasses.js'
    };
    w.j2.res.MAIN.xmlParser = {
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/MAIN/xmlParser.js' : 'wkep5wiskzr3krv'; },
      'lib': 'ROOT/res/MAIN/xmlParser.js',
      'type': 'j2/javascript',
      'version' : '1.5', 
      'fileName' : 'xmlParser.js'
    };    
    w.j2.res.MAIN.builder = { 
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/MAIN/builder.js' : 'l0r6cp3yzlfcut8'; },
      'lib': 'ROOT/res/MAIN/builder.js',
      'type': 'j2/javascript',
      'version' : '0.1', 
      'fileName' : 'builder.js'
    };     
    w.j2.res.MAIN.addtionalControls = { 
      'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/MAIN/addtionalControls.js' : '5ltstveoxifmek9'; },
      'lib': 'ROOT/res/MAIN/addtionalControls.js',
      'type': 'j2/javascript',
      'version' : '1.0', 
      'fileName' : 'addtionalControls.js'
    };     

    /* XML PACKAGE */ 
    w.j2.res.XML = { 
      /*'baseClasses' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/BaseClasses.xml' : '2w91qqllobifwiu'; }, 
        'lib': 'ROOT/res/XML/BaseClassesXML.js',
        'type': 'j2/javascript',
        'version' : '0.1', 
        'fileName' : 'BaseClassesXML.js'
      },*/
      'baseClasses' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/BaseClasses.xml' : 'h1azyx060uzi1d5'; }, 
        'lib': 'ROOT/res/XML/BaseClasses.xml',
        'type': 'j2/xml',
        'version' : '0.1', 
        'fileName' : 'BaseClassesXML.xml'
      },
      /*'modelos' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/Modelos.xml' : 'acsvuziafk1w7jc'; },
        'lib': 'ROOT/res/XML/Modelos.js',
        'type': 'j2/javascript',
        'version' : '0.1', 
        'fileName' : 'Modelos.js'
        
      },*/
      'modelos' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/Modelos.xml' : 'c3ckprkx6d104vb'; },
        'lib': 'ROOT/res/XML/Modelos.xml',
        'type': 'j2/xml',
        'version' : '0.1', 
        'fileName' : 'Modelos.xml'
      },
      'unidadesAutorizadas' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/UnidadesAutorizadas.xml' : '8rdsdj8msocl88z'; },
        'lib': window.j2Extension ? 'ROOT/res/XML/UnidadesAutorizadas.xml' : 'ROOT/res/XML/UnidadesAutorizadas.js',
        'type': window.j2Extension ? 'j2/xml' : 'j2/javascript',
        'version' : '0.1', 
        'fileName' : window.j2Extension ? 'UnidadesAutorizadas.xml' : 'UnidadesAutorizadas.js',
        'storable' : true
      },
      /*'usuarios' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/Usuarios.xml' : 'bei36n9jprcmtvx'; },        
        'lib': window.j2Extension ? 'ROOT/res/XML/Usuarios.xml' : 'ROOT/res/XML/Usuarios.js',
        'type': window.j2Extension ? 'j2/xml' : 'j2/javascript',
        'version' : '1.1', 
        'fileName' : window.j2Extension ? 'Usuarios.xml' : 'Usuarios.js',
        'storable' : true
      },*/
      
      'usuarios' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/Usuarios.xml' : 'e2ga45j698tn88j'; },        
        'lib': 'ROOT/res/XML/Usuarios.xml',
        'type': 'j2/xml' ,
        'version' : '1.1', 
        'fileName' : 'Usuarios.xml' ,
        'storable' : true
      },
     /* 'classStyles' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/classStyles.xml' : 'x2zysocehurfyml'; },                
        'lib': 'ROOT/res/XML/classStyles.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'classStyles.js'
      },*/
      'classStyles' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/classStyles.xml' : 't026xoyo3akxwoz'; },                
        'lib': 'ROOT/res/XML/classStyles.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'classStyles.xml'
      },
      'update' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/update.xml' : 'uf79jpyt0oeszi1'; },                
        'lib': 'ROOT/res/XML/update.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'update.xml',
        'storable' : false
      },
      /*'addtionalControls' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/addtionalControls.xml' : 'p0i73cfvpgi1s17'; },                
        'lib': 'ROOT/res/XML/addtionalControls.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'addtionalControls.js'
      },
      'addtionalControlsClsDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/addtionalControlsClsDef.xml' : 'q456v2ci3wy8gad'; },                
        'lib': 'ROOT/res/XML/addtionalControlsDef.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'addtionalControlsClsDef.js'
      }*/
      'addtionalControls' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/addtionalControls.xml' : 'br3ncxj2orhgscd'; },                
        'lib': 'ROOT/res/XML/addtionalControls.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'addtionalControls.xml'
      },
      'addtionalControlsClsDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/addtionalControlsClsDef.xml' : '1p8h78rv6894kpg'; },                
        'lib': 'ROOT/res/XML/addtionalControlsDef.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'addtionalControlsClsDef.xml'
      },
      'calendario' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/Calendario.xml' : '9tje7k18yx9bx0f'; },                
        'lib': 'ROOT/res/XML/Calendario.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'Calendario.xml'
      }
    };
    
    w.j2.res.CSS = {
      'j2' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/css/j2.css' : 'vybjjxfohi298q0'; },                
        'lib': 'ROOT/res/css/j2.css',
        'type': 'j2/styleSheet',
        'version' : '1.0', 
        'fileName' : 'j2.css',
        injectWins : ['exp', 'edt', 'par']
      },
      'bootstrap' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/CSS/bootstrap.css' : 'lmpvyeabc7mjvq5'; },                
        'lib': 'ROOT/res/css/bootstrap.css',
        'type': 'j2/styleSheet',
        'version' : '4.3.1', 
        'fileName' : 'bootstrap.css',
        injectWins : ['edt']
      },
      'jqueryUi' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/css/jquery-ui.css' : 'l4arso69l8wc2ij'; },                
        'lib': 'ROOT/res/css/jquery-ui.css',
        'type': 'j2/styleSheet',
        'version' : '4.3.1', 
        'fileName' : 'jquery-ui.css',
        injectWins : ['edt']
      },
      'jqueryTimePicker' : {  // ndlg2
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/css/jquery-timepicker.css' : 'q7lucpm8md8kyvl'; },                
        'lib': 'ROOT/res/css/jquery-timepicker.css',
        'type': 'j2/styleSheet',
        'version' : '4.3.1', 
        'fileName' : 'jquery-timepicker.css',
        injectWins : ['edt']
      },
      'chosen' : {  // chosen
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/css/chosen.css' : 'cpfpd6618e72yxq'; },                
        'lib': 'ROOT/res/css/chosen.css',
        'type': 'j2/styleSheet',
        'version' : '1.8.7', 
        'fileName' : 'chosen.css'
      },
      'chosenBS' : {  // chosen
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/css/chosen-bs.css' : 'xpi3xc70wsxwjpn'; },                
        'lib': 'ROOT/res/css/chosen-bs.css',
        'type': 'j2/styleSheet',
        'version' : '1.8.7', 
        'fileName' : 'chosen-bs.css'
      }
    };
    

    w.j2.res.selectSources = {
      'meiosComunicacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/meiosComunicacao.xml' : 'znkphrqas23dqmo'; },                
        'lib': 'ROOT/res/XML/selectSources/meiosComunicacao.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'meiosComunicacao.xml'         
      },
      'prioridadeExpedientesItem' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/prioridadeExpedientesItem.xml' : 'dpc4a60ifsayvpx'; },                
        'lib': 'ROOT/res/XML/selectSources/prioridadeExpedientesItem.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'prioridadeExpedientesItem.xml'        
      },
      'advertencias' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/advertencias.xml' : 'o4xlahyrraz60se'; },                
        'lib': 'ROOT/res/XML/selectSources/advertencias.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'advertencias.xml'        
      },
      'termoAudienciaTitulos' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/termoAudienciaTitulos.xml' : '8jetxx33e91amka'; },                
        'lib': 'ROOT/res/XML/selectSources/termoAudienciaTitulos.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoAudienciaTitulos.xml'        
      },
      'termoReclamacaoTitulos' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/termoReclamacaoTitulos.xml' : 'hzcl29jq0iv1y4q'; },                
        'lib': 'ROOT/res/XML/selectSources/termoReclamacaoTitulos.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoTitulos.xml'        
      },
      'mandadoTitulos' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/mandadoTitulos.xml' : 'lcuxeih5sp3017g'; },                
        'lib': 'ROOT/res/XML/selectSources/mandadoTitulos.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'mandadoTitulos.xml'        
      },
      'destinatarios' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/destinatarios.xml' : '96bzzd2gbgdxku3'; },                
        'lib': 'ROOT/res/XML/selectSources/destinatarios.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'destinatarios.xml'        
      },
      'tiposDocumento' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/tiposDocumento.xml' : 'dftvwkmvnr3l32t'; },                
        'lib': 'ROOT/res/XML/selectSources/tiposDocumento.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'tiposDocumento.xml'        
      },
      'meiosAtendimento' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/meiosAtendimento.xml' : 'ytxhdc46r098g96'; },                
        'lib': 'ROOT/res/XML/selectSources/meiosAtendimento.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'meiosAtendimento.xml'        
      },
      'whatsAppDefaultMessages' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/whatsAppDefaultMessages.xml' : 'z2l1vypmnnimlz7'; },                
        'lib': 'ROOT/res/XML/selectSources/whatsAppDefaultMessages.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'whatsAppDefaultMessages.xml'        
      },
      'whatsAppOjMessages' : { // ndlg
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/whatsAppOjMessages.xml' : '5w9vs2a8855hhi3'; },                
        'lib': 'ROOT/res/XML/selectSources/whatsAppOjtMessages.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'whatsAppOjMessages.xml'        
      },
      'semExpedienteForenseSelSrc' : { // ndlg
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/selectSources/semExpedienteForenseSelSrc.xml' : '01grhu2rfj3tdy9'; },                
        'lib': 'ROOT/res/XML/selectSources/semExpedienteForenseSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'semExpedienteForenseSelSrc.xml'        
      }
    };    
    
    w.j2.res.mod = {
      'certidao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '' : '/res/mod/certidao.js' : 'v5bneqbsez8b3ar'; },                
        'lib': 'ROOT/res/mod/certidao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'certidao.js'        
      },
      /*'certidaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/certidaoSelSrc.xml' : 'eb6wv63k9f9t0hf'; },                
        'lib': 'ROOT/res/mod/certidaoSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'certidaoSelSrc.js'        
      },*/
      'certidaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/certidaoSelSrc.xml' : 'fakagfccq4k515p'; },                
        'lib': 'ROOT/res/mod/certidaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'certidaoSelSrc.xml'        
      },
      'citacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/citacao.js' : 'i9rabezbfml3pes'; },                
        'lib': 'ROOT/res/mod/citacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'citacao.js'        
      },
      'citacaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/citacaoSelSrc.xml' : 'yf8ehptms9ljjq3'; },                
        'lib': 'ROOT/res/mod/citacaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'citacaoSelSrc.xml'        
      },      
      'intimacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/intimacao.js' : 'jsbe468owa2cfqu'; },                
        'lib': 'ROOT/res/mod/intimacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'intimacao.js'        
      },
      /*'intimacaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/intimacaoSelSrc.xml' : 'g2el7vq1k141tc5'; },                
        'lib': 'ROOT/res/mod/intimacaoSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'intimacaoSelSrc.js'        
      },*/
      'intimacaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/intimacaoSelSrc.xml' : 'seaxjq22n1y5rt9'; },                
        'lib': 'ROOT/res/mod/intimacaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'intimacaoSelSrc.xml'        
      },
      'AR' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/AR.js' : 'ayscojqrsn88sf3'; },                
        'lib': 'ROOT/res/mod/AR.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'AR.js'        
      },
      /*'ARDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/ARDef.xml' : '03fp4zf95sglkbc'; },                
        'lib': 'ROOT/res/mod/ARDef.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'ARDef.js'        
      },*/
      'ARDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/ARDef.xml' : 'c1w1lw9pjjus50x'; },                
        'lib': 'ROOT/res/mod/ARDef.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'ARDef.xml'        
      },
      /*'AR_' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/AR_.xml' : 'spkgjcrg3lne9kt'; },                
        'lib': 'ROOT/res/mod/AR_.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'AR_.js'        
      },*/
      'AR_' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/AR_.xml' : 'og62kgvr2dit8hm'; },                
        'lib': 'ROOT/res/mod/AR_.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'AR_.xml'        
      },
      'postList' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/postList.js' : '18mg79j9e637e99'; },                
        'lib': 'ROOT/res/mod/postList.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'postList.js'        
      },
      'postListDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/postListDef.xml' : 'p0e8julf8tndaf0'; },                
        'lib': 'ROOT/res/mod/postListDef.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'postListDef.js'        
      },
      'postList_' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/postList_.xml' : 've5p2nwppnfr83n'; },                
        'lib': 'ROOT/res/mod/postList.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'postList_.js'        
      },      
      'decisao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/decisao.js' : '7fjakbqhla54nwo'; },                
        'lib': 'ROOT/res/mod/decisao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'decisao.js'        
      },
      'decisaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/decisaoSelSrc.xml' : 'q00577n4fdfi1g8'; },                
        'lib': 'ROOT/res/mod/decisaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'decisaoSelSrc.xml'        
      },      
      'decisaoJuizAdmissSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/decisaoJuizAdmissSelSrc.xml' : 'j8tcj69oc2sbc4m'; },                
        'lib': 'ROOT/res/mod/decisaoJuizAdmissSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'decisaoJuizAdmissSelSrc.xml'        
      },      
      'despacho' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/despacho.js' : 'noedk8qakdmc6g0'; },                
        'lib': 'ROOT/res/mod/despacho.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'despacho.js'        
      },
      'despachoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/despachoSelSrc.xml' : '2gybfk3c2d6d97a'; },                
        'lib': 'ROOT/res/mod/despachoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'despachoSelSrc.xml'        
      },           
      'despachoCumSenSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/despachoCumSenSelSrc.xml' : 'pvq3h4pupsd4cyu'; },                
        'lib': 'ROOT/res/mod/despachoCumSenSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'despachoCumSenSelSrc.xml'        
      },   
      'sentenca' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/sentenca.js' : 'p0q5n27owdvu57e'; },                
        'lib': 'ROOT/res/mod/sentenca.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'sentenca.js'        
      },
      'sentencaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/sentencaSelSrc.xml' : 'jfykvu87man2zry'; },                
        'lib': 'ROOT/res/mod/sentencaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'sentencaSelSrc.xml'        
      },      
      'termoAudiencia' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoAudiencia.js' : 'hdt2muhnvubnluz'; },                
        'lib': 'ROOT/res/mod/termoAudiencia.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoAudiencia.js'        
      },
      /*'termoAudienciaSelSrc' : { // deprec
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoAudienciaSelSrc.xml' : 'c41tmm1swbjorac'; },                
        'lib': 'ROOT/res/mod/termoAudienciaSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoAudienciaSelSrc.js'        
      },      */
      'termoAudienciaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoAudienciaSelSrc.xml' : 'h5imeglxdj2wpp1'; },                
        'lib': 'ROOT/res/mod/termoAudienciaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoAudienciaSelSrc.xml'        
      },      
      'termoReclamacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoReclamacao.js' : 'ivgv4txz297wigb'; },                
        'lib': 'ROOT/res/mod/termoReclamacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoReclamacao.js'        
      },
      'termoReclamacaoFatosSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoReclamacaoFatosSelSrc.xml' : 'e4a2s16ycnvdjlv'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoFatosSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoFatosSelSrc.xml'        
      },      
      'termoReclamacaoPedidosSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoReclamacaoPedidosSelSrc.xml' : '973lfgy6nl00utx'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoPedidosSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoPedidosSelSrc.xml'        
      },
      'termoReclamacaoPartesSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoReclamacaoPartesSelSrc.xml' : '67cmk259nk1x0za'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoPartesSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoPartesSelSrc.xml'        
      },
      'termoReclamacaoDef' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoReclamacaoDef.xml' : 'g4cxqsjyiljcydl'; },                
        'lib': 'ROOT/res/mod/termoReclamacaoDef.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacaoDef.xml'        
      },
      'termoReclamacao_' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoReclamacao.xml' : 'hs4mjgkz0rdx6sk'; },                
        'lib': 'ROOT/res/mod/termoReclamacao.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoReclamacao.xml'        
      },      
      'mandado' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/mandado.js' : 'okw491uqqfd7zk4'; },                
        'lib': 'ROOT/res/mod/mandado.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'mandado.js'        
      },
      'mandadoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/mandadoSelSrc.xml' : 'kpcbxktcxjtxcyt'; },                
        'lib': 'ROOT/res/mod/mandadoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'mandadoSelSrc.xml'        
      },      
      'termoPeticao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoPeticao.js' : 'kh3ztdjcwq3bian'; },                
        'lib': 'ROOT/res/mod/termoPeticao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoPeticao.js'        
      },
      /*'termoPeticaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoPeticaoSelSrc.xml' : 'y1vdo0upyuroizk'; },                
        'lib': 'ROOT/res/mod/termoPeticaoSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoPeticaoSelSrc.js'        
      },     */ 
      'termoPeticaoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoPeticaoSelSrc.xml' : 'o2eseps12fh85b4'; },                
        'lib': 'ROOT/res/mod/termoPeticaoSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoPeticaoSelSrc.xml'        
      },      
      'termo' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoZ.js' : 'odcoj02ks8zxr8i'; },                
        'lib': 'ROOT/res/mod/termoZ.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoZ.js'        
      },
      'termoSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/termoZSelSrc.xml' : 'uh7juow1un7w16f'; },
        'lib': 'ROOT/res/mod/termoZSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'termoZSelSrc.xml'        
      },      
      'atoOrdinatorio' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/atoOrdinatorio.js' : 'pc0kr0w1muad0s2'; },                
        'lib': 'ROOT/res/mod/atoOrdinatorio.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'atoOrdinatorio.js'        
      },
      'atoOrdinatorio' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/atoOrdinatorio.js' : 'pc0kr0w1muad0s2'; },                
        'lib': 'ROOT/res/mod/atoOrdinatorio.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'atoOrdinatorio.js'        
      },
      /*'atoOrdinatorioSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/atoOrdinatorioSelSrc.xml' : 'c8zbarwsdnfuq2b'; },                
        'lib': 'ROOT/res/mod/atoOrdinatorioSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'atoOrdinatorioSelSrc.js'        
      },  */    
      'atoOrdinatorioSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/atoOrdinatorioSelSrc.xml' : 'yb2isu4xz5oclwt'; },                
        'lib': 'ROOT/res/mod/atoOrdinatorioSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'atoOrdinatorioSelSrc.xml'        
      }, 
      'oficio' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/oficio.js' : 'qv9cm3r07aq8px0'; },                
        'lib': 'ROOT/res/mod/oficio.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'oficio.js'        
      },
      'oficioSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/oficioSelSrc.xml' : '5khpivytacjya3w'; },                
        'lib': 'ROOT/res/mod/oficioSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'oficioSelSrc.xml'        
      },
      'alvara' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/alvara.js' : 'atqn3c4oqfydof4'; },                
        'lib': 'ROOT/res/mod/alvara.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'alvara.js'        
      },
      'cartaPrecatoria' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/cartaPrecatoria.js' : 'uma68hes2a8gez8'; },                
        'lib': 'ROOT/res/mod/cartaPrecatoria.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'cartaPrecatoria.js'        
      },
      'cartaPrecatoriaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/cartaPrecatoriaSelSrc.xml' : 'qcm24c8az23rcl9'; },                
        'lib': 'ROOT/res/mod/cartaPrecatoriaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'cartaPrecatoriaSelSrc.xml'        
      },      
      'sentencaPretensaoResistidaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/sentencaPretensaoResistidaSelSrc.xml' : 'sx3xo5wdqh1ogng'; },                
        'lib': 'ROOT/res/mod/sentencaPretensaoResistidaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'sentencaPretensaoResistidaSelSrc.xml'        
      },      
      'diligenciaSelSrc' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/mod/diligenciaSelSrc.xml' : '55mr0gf5ifepn1u'; },                
        'lib': 'ROOT/res/mod/diligenciaSelSrc.xml',
        'type': 'j2/xml',
        'version' : '1.0', 
        'fileName' : 'diligenciaSelSrc.xml'        
      },
      'diligencia' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '' : '/res/mod/diligencia.js' : '2t79y5zbnmmkq55'; },                
        'lib': 'ROOT/res/mod/diligencia.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'diligencia.js'        
      }
    };     
    
    w.j2.res.lib = {
      'monetario' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/monetario.js' : '86ut7ypl9u1ys9o'; },                
        'lib': 'ROOT/lib/monetario.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'monetario.js'        
      },
      'menuContent' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/menuContent.j2' : 'rwuz5eyp1yoaqk2'; },                
        'lib': 'ROOT/lib/menuContent.j2',
        'type': 'j2/text',
        'version' : '1.1.5',
        'fileName' : 'menuContent.j2'        
      },
      'menuContentScr' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/menuContent.js' : 't1x2k8sabh4p3fr'; },                
        'lib': 'ROOT/lib/menuContent.js',
        'type': 'j2/text',
        'version' : '1.1.15', 
        'fileName' : 'menuContent.js'        
      },
      'formatacao' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/formatacao.js' : 'hx18wevqyfwgeli'; },                
        'lib': 'ROOT/lib/formatacao.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'formatacao.js'        
      },
      'htmlTools' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/htmlTools.js' : 'in1mu3l0i61xxmj'; },                
        'lib': 'ROOT/lib/htmlTools.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'htmlTools.js'        
      },
      'jquery3' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/jquery3.js' : 'mdqho6wb1q8vyl9'; },                
        'lib': 'ROOT/lib/jquery3.js',
        'type': 'j2/javascript',
        'version' : '3.1.1', 
        'fileName' : 'jquery3.js',
        inject : [
          {
            win : 'edt',
            loc : 'body'
          }  
        ],
        injectWins : ['edt', 'exp'] //chosen
      },
      'bootstrap' : { 
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/bootstrap.js' : 'gli268l1ytg6shg'; },                
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
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/popper.js' : '55cryy9172o68rf'; },                
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
      },
      'inputmask' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/inputmask.js' : '9w7apm5rrjp7n8o'; },                
        'lib': 'ROOT/lib/inputmask.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'inputmask.js',
        inject : [
          {
            win : 'edt',
            loc : 'body'
          }  
        ]        
      },
      'jqueryTimePicker' : { // ndlg2
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/jquery-timepicker.js' : '2fgsfcoj8r6pdlo'; },                
        'lib': 'ROOT/lib/jqueryTimePicker.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'jquery-timepicker.js',
        inject : [
          {
            win : 'edt',
            loc : 'body'
          }  
        ]        
      },
      'jqueryUi' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/jquery-ui.js' : '8klfp5x1wg2j2us'; },                
        'lib': 'ROOT/lib/jquery-ui.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'jquery-ui.js'
           
      },
      'html2pdf' : { //pdf
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/html2pdf.js' : 'aq779shy1o2b1kx'; },                
        'lib': 'ROOT/lib/html2pdf.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'jsPDF.js'
      },
      'chosen' : { //chosen
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/chosen.jquery.js' : 'a1rt5gya3vqpab6'; },                
        'lib': 'ROOT/lib/chosen.jquery.js',
        'type': 'j2/javascript',
        'version' : '1.8.7', 
        'fileName' : 'chosen.jquery.js'
      },
      'fontawesome' : { //chosen
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/lib/fontawesome.js' : 'krtlb3m9889f4ur'; },                
        'lib': 'ROOT/lib/fontawesome.js',
        'type': 'j2/javascript',
        'version' : '6.3.0', 
        'fileName' : 'fontawesome.js'
      }
    };      
    
   /* w.j2.res.JSON = {
      'monetario' : {
        'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '../JSON/TarefasFavoritas.jsON' : '86ut7ypl9u1ys9o'; },                
        'lib': 'ROOT/lib/monetario.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'TarefasFavoritas.json'        
      }
    };*/
    
    /*console.log('ASSERTION: há artefatos que não foram registrado ainda com seus ids do dropbox.');*/
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.artfacts.lib;
  alert(t);
  console.error(t);
}