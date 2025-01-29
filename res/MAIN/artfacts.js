/*
 * artifacts for data object javascript
 */

console.log('artfacts.js - módulo compilante')

try {
  ;(function () {
    /* inits autoexec */
    var evBus = window.j2.mod.eventBus.EventBus
    var w = window
    var isHttps = function () {
      return window.j2Extension ? false : window.location.protocol === 'https:'
    }

    /* w.j2.res.MAIN.run = {}; PREVIOUS DEFINIED*/
    /* w.j2.res.MAIN.artifacts = {}; PREVIOUS DEFINIED*/
    w.j2.res.MAIN.PJeVars = {
      ref: () => '/res/MAIN/PJeVars.js',
      lib: 'ROOT/res/MAIN/PJeVars.js',
      type: 'j2/javascript',
      version: '1.0',
      fileName: 'PJeVars.js',
    }
    w.j2.res.MAIN.baseClasses = {
      ref: () => '/res/MAIN/BaseClasses.js',
      lib: 'ROOT/res/MAIN/BaseClasses.js',
      type: 'j2/javascript',
      version: '0.1',
      fileName: 'BaseClasses.js',
    }
    w.j2.res.MAIN.xmlParser = {
      ref: () => '/res/MAIN/xmlParser.js',
      lib: 'ROOT/res/MAIN/xmlParser.js',
      type: 'j2/javascript',
      version: '1.5',
      fileName: 'xmlParser.js',
    }
    w.j2.res.MAIN.builder = {
      ref: () => '/res/MAIN/builder.js',
      lib: 'ROOT/res/MAIN/builder.js',
      type: 'j2/javascript',
      version: '0.1',
      fileName: 'builder.js',
    }
    w.j2.res.MAIN.addtionalControls = {
      ref: () => '/res/MAIN/addtionalControls.js',
      lib: 'ROOT/res/MAIN/addtionalControls.js',
      type: 'j2/javascript',
      version: '1.0',
      fileName: 'addtionalControls.js',
    }

    /* XML PACKAGE */
    w.j2.res.XML = {
      /*'baseClasses' : {
        'ref': () => '/res/XML/BaseClasses.xml', 
        'lib': 'ROOT/res/XML/BaseClassesXML.js',
        'type': 'j2/javascript',
        'version' : '0.1', 
        'fileName' : 'BaseClassesXML.js'
      },*/
      baseClasses: {
        ref: () => '/res/XML/BaseClasses.xml',
        lib: 'ROOT/res/XML/BaseClasses.xml',
        type: 'j2/xml',
        version: '0.1',
        fileName: 'BaseClassesXML.xml',
      },
      /*'modelos' : { 
        'ref': () => '/res/XML/Modelos.xml',
        'lib': 'ROOT/res/XML/Modelos.js',
        'type': 'j2/javascript',
        'version' : '0.1', 
        'fileName' : 'Modelos.js'
        
      },*/
      modelos: {
        ref: () => '/res/XML/Modelos.xml',
        lib: 'ROOT/res/XML/Modelos.xml',
        type: 'j2/xml',
        version: '0.1',
        fileName: 'Modelos.xml',
      },
      unidadesAutorizadas: {
        ref: () => '/res/XML/UnidadesAutorizadas.xml',
        lib: 'ROOT/res/XML/UnidadesAutorizadas.xml',
        type: 'j2/xml',
        version: '1.1',
        fileName: 'UnidadesAutorizadas.xml',
        //'storable' : true
      },
      /*'unidadesAutorizadas' : { 
        'ref': () => '/res/XML/UnidadesAutorizadas.xml',
        'lib': window.j2Extension ? 'ROOT/res/XML/UnidadesAutorizadas.xml' : 'ROOT/res/XML/UnidadesAutorizadas.js',
        'type': window.j2Extension ? 'j2/xml' : 'j2/javascript',
        'version' : '0.1', 
        'fileName' : window.j2Extension ? 'UnidadesAutorizadas.xml' : 'UnidadesAutorizadas.js',
        'storable' : true
      },*/
      /*'usuarios' : {
        'ref': () => '/res/XML/Usuarios.xml',        
        'lib': window.j2Extension ? 'ROOT/res/XML/Usuarios.xml' : 'ROOT/res/XML/Usuarios.js',
        'type': window.j2Extension ? 'j2/xml' : 'j2/javascript',
        'version' : '1.1', 
        'fileName' : window.j2Extension ? 'Usuarios.xml' : 'Usuarios.js',
        'storable' : true
      },*/

      usuarios: {
        ref: () => '/res/XML/Usuarios.xml',
        lib: 'ROOT/res/XML/Usuarios.xml',
        type: 'j2/xml',
        version: '1.1',
        fileName: 'Usuarios.xml',
        storable: true,
      },
      /* 'classStyles' : {
        'ref': () => '/res/XML/classStyles.xml',                
        'lib': 'ROOT/res/XML/classStyles.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'classStyles.js'
      },*/
      classStyles: {
        ref: () => '/res/XML/classStyles.xml',
        lib: 'ROOT/res/XML/classStyles.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'classStyles.xml',
      },
      update: {
        ref: () => '/res/XML/update.xml',
        lib: 'ROOT/res/XML/update.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'update.xml',
        storable: false,
      },
      /*'addtionalControls' : {
        'ref': () => '/res/XML/addtionalControls.xml',                
        'lib': 'ROOT/res/XML/addtionalControls.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'addtionalControls.js'
      },
      'addtionalControlsClsDef' : {
        'ref': () => '/res/XML/addtionalControlsClsDef.xml',                
        'lib': 'ROOT/res/XML/addtionalControlsDef.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'addtionalControlsClsDef.js'
      }*/
      addtionalControls: {
        ref: () => '/res/XML/addtionalControls.xml',
        lib: 'ROOT/res/XML/addtionalControls.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'addtionalControls.xml',
      },
      addtionalControlsClsDef: {
        ref: () => '/res/XML/addtionalControlsClsDef.xml',
        lib: 'ROOT/res/XML/addtionalControlsDef.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'addtionalControlsClsDef.xml',
      },
      calendario: {
        ref: () => '/res/XML/Calendario.xml',
        lib: 'ROOT/res/XML/Calendario.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'Calendario.xml',
      },
    }

    w.j2.res.CSS = {
      j2: {
        ref: () => '/res/css/j2.css',
        lib: 'ROOT/res/css/j2.css',
        type: 'j2/styleSheet',
        version: '1.0',
        fileName: 'j2.css',
        injectWins: ['exp', 'edt', 'par'],
      },
      bootstrap: {
        ref: () => '/res/css/bootstrap.css',
        lib: 'ROOT/res/css/bootstrap.css',
        type: 'j2/styleSheet',
        version: '4.3.1',
        fileName: 'bootstrap.css',
        injectWins: ['edt'],
      },
      jqueryUi: {
        ref: () => '/res/css/jquery-ui.css',
        lib: 'ROOT/res/css/jquery-ui.css',
        type: 'j2/styleSheet',
        version: '4.3.1',
        fileName: 'jquery-ui.css',
        injectWins: ['edt'],
      },
      jqueryTimePicker: {
        // ndlg2
        ref: () => '/res/css/jquery-timepicker.css',
        lib: 'ROOT/res/css/jquery-timepicker.css',
        type: 'j2/styleSheet',
        version: '4.3.1',
        fileName: 'jquery-timepicker.css',
        injectWins: ['edt'],
      },
      chosen: {
        // chosen
        ref: () => '/res/css/chosen.css',
        lib: 'ROOT/res/css/chosen.css',
        type: 'j2/styleSheet',
        version: '1.8.7',
        fileName: 'chosen.css',
      },
      chosenBS: {
        // chosen
        ref: () => '/res/css/chosen-bs.css',
        lib: 'ROOT/res/css/chosen-bs.css',
        type: 'j2/styleSheet',
        version: '1.8.7',
        fileName: 'chosen-bs.css',
      },
      jqueryContextMenu: {
        // chosen
        ref: () => '/res/css/jquery.contextMenu.css',
        lib: 'ROOT/res/css/jquery.contextMenu.css',
        type: 'j2/styleSheet',
        version: '2.9.2',
        fileName: 'jquery.contextMenu.css',
      },
    }

    //TODO: como resolver o acesso destes arquivos de calendário da extensão????????????

    w.j2.res.Extensao = {
      CSS: {
        evoCalendar: {
          // chosen
          ref: () => '../Extensao/evo-calendar/css/evo-calendar.css',
          lib: 'Extensao/evo-calendar/css/evo-calendar.css',
          type: 'j2/styleSheet',
          version: '1.1.3',
          fileName: 'evo-calendar.css',
        },
        evoCalendarRoyalNavy: {
          // chosen
          ref: () => '../Extensao/evo-calendar/css/evo-calendar.royal-navy.css',
          lib: 'Extensao/evo-calendar/css/evo-calendar.royal-navy.css',
          type: 'j2/styleSheet',
          version: '1.1.3',
          fileName: 'evo-calendar.royal-navy.css',
        },
      },
      mod: {
        evoCalendar: {
          // chosen
          ref: () => '../Extensao/evo-calendar/js/evo-calendar.js',
          lib: 'Extensao/evo-calendar/js/evo-calendar.js',
          type: 'j2/javascript',
          version: '1.1.3',
          fileName: 'evo-calendar.js',
        },
        evoCalendarBooter: {
          // chosen
          ref: () => '../Extensao/evo-calendar/booter.js',
          lib: 'Extensao/evo-calendar/booter.js',
          type: 'j2/javascript',
          version: '1.1.3',
          fileName: 'booter.js',
        },
      },
    }

    w.j2.res.selectSources = {
      meiosComunicacao: {
        ref: () => '/res/XML/selectSources/meiosComunicacao.xml',
        lib: 'ROOT/res/XML/selectSources/meiosComunicacao.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'meiosComunicacao.xml',
      },
      prioridadeExpedientesItem: {
        ref: () => '/res/XML/selectSources/prioridadeExpedientesItem.xml',
        lib: 'ROOT/res/XML/selectSources/prioridadeExpedientesItem.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'prioridadeExpedientesItem.xml',
      },
      advertencias: {
        ref: () => '/res/XML/selectSources/advertencias.xml',
        lib: 'ROOT/res/XML/selectSources/advertencias.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'advertencias.xml',
      },
      termoAudienciaTitulos: {
        ref: () => '/res/XML/selectSources/termoAudienciaTitulos.xml',
        lib: 'ROOT/res/XML/selectSources/termoAudienciaTitulos.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoAudienciaTitulos.xml',
      },
      termoReclamacaoTitulos: {
        ref: () => '/res/XML/selectSources/termoReclamacaoTitulos.xml',
        lib: 'ROOT/res/XML/selectSources/termoReclamacaoTitulos.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoReclamacaoTitulos.xml',
      },
      mandadoTitulos: {
        ref: () => '/res/XML/selectSources/mandadoTitulos.xml',
        lib: 'ROOT/res/XML/selectSources/mandadoTitulos.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'mandadoTitulos.xml',
      },
      destinatarios: {
        ref: () => '/res/XML/selectSources/destinatarios.xml',
        lib: 'ROOT/res/XML/selectSources/destinatarios.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'destinatarios.xml',
      },
      tiposDocumento: {
        ref: () => '/res/XML/selectSources/tiposDocumento.xml',
        lib: 'ROOT/res/XML/selectSources/tiposDocumento.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'tiposDocumento.xml',
      },
      meiosAtendimento: {
        ref: () => '/res/XML/selectSources/meiosAtendimento.xml',
        lib: 'ROOT/res/XML/selectSources/meiosAtendimento.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'meiosAtendimento.xml',
      },
      whatsAppDefaultMessages: {
        ref: () => '/res/XML/selectSources/whatsAppDefaultMessages.xml',
        lib: 'ROOT/res/XML/selectSources/whatsAppDefaultMessages.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'whatsAppDefaultMessages.xml',
      },
      whatsAppOjMessages: {
        // ndlg
        ref: () => '/res/XML/selectSources/whatsAppOjMessages.xml',
        lib: 'ROOT/res/XML/selectSources/whatsAppOjtMessages.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'whatsAppOjMessages.xml',
      },
      semExpedienteForenseSelSrc: {
        // ndlg
        ref: () => '/res/XML/selectSources/semExpedienteForenseSelSrc.xml',
        lib: 'ROOT/res/XML/selectSources/semExpedienteForenseSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'semExpedienteForenseSelSrc.xml',
      },
    }

    w.j2.res.mod = {
      certidao: {
        ref: () => '/res/mod/certidao.js',
        lib: 'ROOT/res/mod/certidao.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'certidao.js',
      },
      /*'certidaoSelSrc' : {
        'ref': () => '/res/mod/certidaoSelSrc.xml',                
        'lib': 'ROOT/res/mod/certidaoSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'certidaoSelSrc.js'        
      },*/
      certidaoSelSrc: {
        ref: () => '/res/mod/certidaoSelSrc.xml',
        lib: 'ROOT/res/mod/certidaoSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'certidaoSelSrc.xml',
      },
      citacao: {
        ref: () => '/res/mod/citacao.js',
        lib: 'ROOT/res/mod/citacao.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'citacao.js',
      },
      citacaoSelSrc: {
        ref: () => '/res/mod/citacaoSelSrc.xml',
        lib: 'ROOT/res/mod/citacaoSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'citacaoSelSrc.xml',
      },
      intimacao: {
        ref: () => '/res/mod/intimacao.js',
        lib: 'ROOT/res/mod/intimacao.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'intimacao.js',
      },
      /*'intimacaoSelSrc' : {
        'ref': () => '/res/mod/intimacaoSelSrc.xml',                
        'lib': 'ROOT/res/mod/intimacaoSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'intimacaoSelSrc.js'        
      },*/
      intimacaoSelSrc: {
        ref: () => '/res/mod/intimacaoSelSrc.xml',
        lib: 'ROOT/res/mod/intimacaoSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'intimacaoSelSrc.xml',
      },
      AR: {
        ref: () => '/res/mod/AR.js',
        lib: 'ROOT/res/mod/AR.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'AR.js',
      },
      /*'ARDef' : {
        'ref': () => '/res/mod/ARDef.xml',                
        'lib': 'ROOT/res/mod/ARDef.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'ARDef.js'        
      },*/
      ARDef: {
        ref: () => '/res/mod/ARDef.xml',
        lib: 'ROOT/res/mod/ARDef.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'ARDef.xml',
      },
      /*'AR_' : {
        'ref': () => '/res/mod/AR_.xml',                
        'lib': 'ROOT/res/mod/AR_.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'AR_.js'        
      },*/
      AR_: {
        ref: () => '/res/mod/AR_.xml',
        lib: 'ROOT/res/mod/AR_.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'AR_.xml',
      },
      postList: {
        ref: () => '/res/mod/postList.js',
        lib: 'ROOT/res/mod/postList.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'postList.js',
      },
      postListDef: {
        ref: () => '/res/mod/postListDef.xml',
        lib: 'ROOT/res/mod/postListDef.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'postListDef.js',
      },
      postList_: {
        ref: () => '/res/mod/postList_.xml',
        lib: 'ROOT/res/mod/postList.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'postList_.js',
      },
      decisao: {
        ref: () => '/res/mod/decisao.js',
        lib: 'ROOT/res/mod/decisao.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'decisao.js',
      },
      decisaoSelSrc: {
        ref: () => '/res/mod/decisaoSelSrc.xml',
        lib: 'ROOT/res/mod/decisaoSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'decisaoSelSrc.xml',
      },
      decisaoJuizAdmissSelSrc: {
        ref: () => '/res/mod/decisaoJuizAdmissSelSrc.xml',
        lib: 'ROOT/res/mod/decisaoJuizAdmissSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'decisaoJuizAdmissSelSrc.xml',
      },
      despacho: {
        ref: () => '/res/mod/despacho.js',
        lib: 'ROOT/res/mod/despacho.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'despacho.js',
      },
      despachoSelSrc: {
        ref: () => '/res/mod/despachoSelSrc.xml',
        lib: 'ROOT/res/mod/despachoSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'despachoSelSrc.xml',
      },
      despachoCumSenSelSrc: {
        ref: () => '/res/mod/despachoCumSenSelSrc.xml',
        lib: 'ROOT/res/mod/despachoCumSenSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'despachoCumSenSelSrc.xml',
      },
      sentenca: {
        ref: () => '/res/mod/sentenca.js',
        lib: 'ROOT/res/mod/sentenca.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'sentenca.js',
      },
      sentencaSelSrc: {
        ref: () => '/res/mod/sentencaSelSrc.xml',
        lib: 'ROOT/res/mod/sentencaSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'sentencaSelSrc.xml',
      },
      termoAudiencia: {
        ref: () => '/res/mod/termoAudiencia.js',
        lib: 'ROOT/res/mod/termoAudiencia.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'termoAudiencia.js',
      },
      /*'termoAudienciaSelSrc' : { // deprec
        'ref': () => '/res/mod/termoAudienciaSelSrc.xml',                
        'lib': 'ROOT/res/mod/termoAudienciaSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoAudienciaSelSrc.js'        
      },      */
      termoAudienciaSelSrc: {
        ref: () => '/res/mod/termoAudienciaSelSrc.xml',
        lib: 'ROOT/res/mod/termoAudienciaSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoAudienciaSelSrc.xml',
      },
      termoReclamacao: {
        ref: () => '/res/mod/termoReclamacao.js',
        lib: 'ROOT/res/mod/termoReclamacao.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'termoReclamacao.js',
      },
      termoReclamacaoFatosSelSrc: {
        ref: () => '/res/mod/termoReclamacaoFatosSelSrc.xml',
        lib: 'ROOT/res/mod/termoReclamacaoFatosSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoReclamacaoFatosSelSrc.xml',
      },
      termoReclamacaoPedidosSelSrc: {
        ref: () => '/res/mod/termoReclamacaoPedidosSelSrc.xml',
        lib: 'ROOT/res/mod/termoReclamacaoPedidosSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoReclamacaoPedidosSelSrc.xml',
      },
      termoReclamacaoPartesSelSrc: {
        ref: () => '/res/mod/termoReclamacaoPartesSelSrc.xml',
        lib: 'ROOT/res/mod/termoReclamacaoPartesSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoReclamacaoPartesSelSrc.xml',
      },
      termoReclamacaoDef: {
        ref: () => '/res/mod/termoReclamacaoDef.xml',
        lib: 'ROOT/res/mod/termoReclamacaoDef.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoReclamacaoDef.xml',
      },
      termoReclamacao_: {
        ref: () => '/res/mod/termoReclamacao.xml',
        lib: 'ROOT/res/mod/termoReclamacao.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoReclamacao.xml',
      },
      mandado: {
        ref: () => '/res/mod/mandado.js',
        lib: 'ROOT/res/mod/mandado.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'mandado.js',
      },
      mandadoSelSrc: {
        ref: () => '/res/mod/mandadoSelSrc.xml',
        lib: 'ROOT/res/mod/mandadoSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'mandadoSelSrc.xml',
      },
      termoPeticao: {
        ref: () => '/res/mod/termoPeticao.js',
        lib: 'ROOT/res/mod/termoPeticao.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'termoPeticao.js',
      },
      /*'termoPeticaoSelSrc' : {
        'ref': () => '/res/mod/termoPeticaoSelSrc.xml',                
        'lib': 'ROOT/res/mod/termoPeticaoSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'termoPeticaoSelSrc.js'        
      },     */
      termoPeticaoSelSrc: {
        ref: () => '/res/mod/termoPeticaoSelSrc.xml',
        lib: 'ROOT/res/mod/termoPeticaoSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoPeticaoSelSrc.xml',
      },
      termo: {
        ref: () => '/res/mod/termoZ.js',
        lib: 'ROOT/res/mod/termoZ.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'termoZ.js',
      },
      termoSelSrc: {
        ref: () => '/res/mod/termoZSelSrc.xml',
        lib: 'ROOT/res/mod/termoZSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'termoZSelSrc.xml',
      },
      atoOrdinatorio: {
        ref: () => '/res/mod/atoOrdinatorio.js',
        lib: 'ROOT/res/mod/atoOrdinatorio.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'atoOrdinatorio.js',
      },
      atoOrdinatorio: {
        ref: () => '/res/mod/atoOrdinatorio.js',
        lib: 'ROOT/res/mod/atoOrdinatorio.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'atoOrdinatorio.js',
      },
      /*'atoOrdinatorioSelSrc' : {
        'ref': () => '/res/mod/atoOrdinatorioSelSrc.xml',                
        'lib': 'ROOT/res/mod/atoOrdinatorioSelSrc.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'atoOrdinatorioSelSrc.js'        
      },  */
      atoOrdinatorioSelSrc: {
        ref: () => '/res/mod/atoOrdinatorioSelSrc.xml',
        lib: 'ROOT/res/mod/atoOrdinatorioSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'atoOrdinatorioSelSrc.xml',
      },
      oficio: {
        ref: () => '/res/mod/oficio.js',
        lib: 'ROOT/res/mod/oficio.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'oficio.js',
      },
      oficioSelSrc: {
        ref: () => '/res/mod/oficioSelSrc.xml',
        lib: 'ROOT/res/mod/oficioSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'oficioSelSrc.xml',
      },
      alvara: {
        ref: () => '/res/mod/alvara.js',
        lib: 'ROOT/res/mod/alvara.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'alvara.js',
      },
      cartaPrecatoria: {
        ref: () => '/res/mod/cartaPrecatoria.js',
        lib: 'ROOT/res/mod/cartaPrecatoria.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'cartaPrecatoria.js',
      },
      cartaPrecatoriaSelSrc: {
        ref: () => '/res/mod/cartaPrecatoriaSelSrc.xml',
        lib: 'ROOT/res/mod/cartaPrecatoriaSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'cartaPrecatoriaSelSrc.xml',
      },
      sentencaPretensaoResistidaSelSrc: {
        ref: () => '/res/mod/sentencaPretensaoResistidaSelSrc.xml',
        lib: 'ROOT/res/mod/sentencaPretensaoResistidaSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'sentencaPretensaoResistidaSelSrc.xml',
      },
      diligenciaSelSrc: {
        ref: () => '/res/mod/diligenciaSelSrc.xml',
        lib: 'ROOT/res/mod/diligenciaSelSrc.xml',
        type: 'j2/xml',
        version: '1.0',
        fileName: 'diligenciaSelSrc.xml',
      },
      diligencia: {
        ref: () => '/res/mod/diligencia.js',
        lib: 'ROOT/res/mod/diligencia.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'diligencia.js',
      },
    }

    w.j2.res.lib = {
      monetario: {
        ref: () => '/res/lib/monetario.js',
        lib: 'ROOT/lib/monetario.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'monetario.js',
      },
      menuContent: {
        ref: () => '/res/lib/menuContent.j2',
        lib: 'ROOT/lib/menuContent.j2',
        type: 'j2/text',
        version: '1.1.5',
        fileName: 'menuContent.j2',
      },
      menuContentScr: {
        ref: () => '/res/lib/menuContent.js',
        lib: 'ROOT/lib/menuContent.js',
        type: 'j2/text',
        version: '1.1.15',
        fileName: 'menuContent.js',
      },
      formatacao: {
        ref: () => '/res/lib/formatacao.js',
        lib: 'ROOT/lib/formatacao.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'formatacao.js',
      },
      htmlTools: {
        ref: () => '/res/lib/htmlTools.js',
        lib: 'ROOT/lib/htmlTools.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'htmlTools.js',
      },
      jquery3: {
        ref: () => '/res/lib/jquery3.js',
        lib: 'ROOT/lib/jquery3.js',
        type: 'j2/javascript',
        version: '3.1.1',
        fileName: 'jquery3.js',
        inject: [
          {
            win: 'edt',
            loc: 'body',
          },
        ],
        injectWins: ['edt', 'exp'], //chosen
      },
      bootstrap: {
        ref: () => '/res/lib/bootstrap.js',
        lib: 'ROOT/lib/bootstrap.js',
        type: 'j2/javascript',
        version: '4.3.1',
        fileName: 'bootstrap.js',
        inject: [
          {
            win: 'edt',
            loc: 'body',
          },
        ],
      },
      popper: {
        ref: () => '/res/lib/popper.js',
        lib: 'ROOT/lib/popper.js',
        type: 'j2/javascript',
        version: '1.14.7',
        fileName: 'popper.js',
        inject: [
          {
            win: 'edt',
            loc: 'body',
          },
        ],
      },
      inputmask: {
        ref: () => '/res/lib/inputmask.js',
        lib: 'ROOT/lib/inputmask.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'inputmask.js',
        inject: [
          {
            win: 'edt',
            loc: 'body',
          },
        ],
      },
      jqueryTimePicker: {
        // ndlg2
        ref: () => '/res/lib/jquery-timepicker.js',
        lib: 'ROOT/lib/jqueryTimePicker.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'jquery-timepicker.js',
        inject: [
          {
            win: 'edt',
            loc: 'body',
          },
        ],
      },
      jqueryUi: {
        ref: () => '/res/lib/jquery-ui.js',
        lib: 'ROOT/lib/jquery-ui.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'jquery-ui.js',
      },
      jqueryInitialize: {
        ref: () => '/res/lib/jquery.initialize.js',
        lib: 'ROOT/lib/jquery.initialize.js',
        type: 'j2/javascript',
        version: '0.0.0',
        fileName: 'jquery.initialize.js',
      },
      jqueryContextMenu: {
        ref: () => '/res/lib/jquery.contextMenu.js',
        lib: 'ROOT/lib/jquery.contextMenu.js',
        type: 'j2/javascript',
        version: '2.9.2',
        fileName: 'jquery.contextMenu.js',
      },
      html2pdf: {
        //pdf
        ref: () => '/res/lib/html2pdf.js',
        lib: 'ROOT/lib/html2pdf.js',
        type: 'j2/javascript',
        version: '1.0',
        fileName: 'jsPDF.js',
      },
      chosen: {
        //chosen
        ref: () => '/res/lib/chosen.jquery.js',
        lib: 'ROOT/lib/chosen.jquery.js',
        type: 'j2/javascript',
        version: '1.8.7',
        fileName: 'chosen.jquery.js',
      },
      fontawesome: {
        //chosen
        ref: () => '/res/lib/fontawesome.js',
        lib: 'ROOT/lib/fontawesome.js',
        type: 'j2/javascript',
        version: '6.3.0',
        fileName: 'fontawesome.js',
      },
      qrious: {
        // https://github.com/neocotic/qrious
        ref: () => '/res/lib/qrious.js',
        lib: 'ROOT/lib/qrious.js',
        type: 'j2/javascript',
        version: '4.0.2',
        fileName: 'qrious.js',
      },
      fragEndereco: {
        //
        ref: () => '/res/lib/fragEndereco.html',
        lib: 'ROOT/lib/fragEndereco.html',
        type: 'j2/text',
        version: '1.0.0',
        fileName: 'fragEndereco.html',
      },
    }

    /* w.j2.res.JSON = {
      'monetario' : {
        'ref': () => '../JSON/TarefasFavoritas.jsON',                
        'lib': 'ROOT/lib/monetario.js',
        'type': 'j2/javascript',
        'version' : '1.0', 
        'fileName' : 'TarefasFavoritas.json'        
      }
    };*/

    /*console.log('ASSERTION: há artefatos que não foram registrado ainda com seus ids do dropbox.');*/
  })()
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.artfacts.lib
  alert(t)
  console.error(t)
}
