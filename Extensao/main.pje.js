/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function pjeLoad(){    
  var _responseBus = {};
  const __codificarNomeTarefa = j2.mod._.codificarNomeTarefa;
  const __prepararLinkTarefa = j2.mod._.prepararLinkTarefa;

  (function _default(){
    j2E.mods.shortcuts();
    
    addScript('Extensao/util.pje.js');
    console.log('j2Extension: loading origin https://pje.tjma.jus.br');
  })();

  function listenMessages(){
    function __listenMessageHandler(event){
      switch(event.origin){
        case 'https://frontend.prd.cnj.cloud':
        case 'https://web.whatsapp.com':
        case 'https://pje.tjma.jus.br':
          break;
          
        default:
          if(!(event.origin.match(/https:\/\/vcs[0-9]+\.tjma\.jus\.br/)) )
            return;
      }
    
      var _load = event.data;
      if(!(_load.j2))
        return;

      console.log('message from origin' + event.origin + ' : ', _load);
      

      var _act = (_load.fowarded) ? _load.j2Action : _load;

      switch(_act.action){
        case 'respostaDadosTarefas':
          personalizarTarefa(_load);
          break;
        case 'requisitarIdProcesso':
          requisitarIdProcesso(_act, _load);
          break;
        case 'getHTMLAutosDigiais':
          getHTMLAutosDigiais(_act, _load);
          break;
        case 'abrirAutosDigiais':
          abrirAutosDigitais(_act, _load);
          break;
        case 'requisitarConsultaTarefas':
          requisitarConsultaTarefas(_act, _load);
          break;
        case 'requisitarDadosTarefaDoProcesso':
          requisitarDadosTarefaDoProcesso(_act, _load);
          break;
        case 'requisitarJ2EPJeRest':
          requisitarj2EPJeRest(_act, _load);
          break;
        case 'requisitarSeamIteraction':
          requisitarSeamIteraction(_act, _load);
          break;
        case 'ping':
          pong(_act, _load);
          break;
        case 'notifyPseudotarefaMovimentarLoaded':
          fowardNotifyPseudotarefaMovimentarLoaded(_act, _load);
          break;
        case 'triggerEventFromFrontend':
          triggerEventFromFrontend(_act, _load);
          break;
        case 'triggerEventToFrontend':
          triggerEventToFrontend(_act, _load);
          break;
        case 'abrirAutosDigitaisFixados':
          abrirAutosDigitaisFixados(_act, _load);
          break;
      }
    
    }

    const ID_JANELA_AUTOS_DIGITAIS_FIXADOS = guid()
    function abrirAutosDigitaisFixados(action, load){
      j2EOpW.center(load.url, 'autosDigSentinela', ID_JANELA_AUTOS_DIGITAIS_FIXADOS)
    }

    function triggerEventToFrontend(action, _load){
      var load = {
        action : 'triggerEventFromPJe',
        evento : action.evento,
        orgAction: action
      };
  
      __sendMessageToFrotEnd(load, '#ngFrame');
    }

    function triggerEventFromFrontend(action, load){
      evBus.fire(action.evento.tipo, action.evento.argumentos)
    }

    function __listenMessageHandlerFromServiceWorkder(_load){
      if(!(_load.j2))
        return;

      console.log('message from service worker : ', _load);
      

      var _act = (_load.fowarded) ? _load.j2Action : _load;

      switch(_act.action){
        case 'getSharedMessageResponse':
          getSharedMessageResponse(_act, _load);
          break;
      }
    
    }

    chrome.runtime.onMessage.addListener(__listenMessageHandlerFromServiceWorkder)
    
    //window messagin listening
    window.addEventListener('message', __listenMessageHandler);
      
    //extension messaging
    window.deferListening = new DelayedCall(250, 250);
    j2E.conn._listeners.push(function(message, sender, sendRespose) {
      deferListening(function(){__listenMessageHandler({
        origin : message.domain.from,
        data : message
      });});
   });
  }

  function getSharedMessageResponse(action){
    var _ticket = action.callerAction.responseBusTicket;
    if( _responseBus[_ticket].callback ){
      _responseBus[_ticket].callback(action);
      defer(function(){
        delete _responseBus[_ticket];
      });
    }
  }
  
  function fowardNotifyPseudotarefaMovimentarLoaded(action, _load){
    var load = {
      action : 'fowardNotifyPseudotarefaMovimentarLoaded',
      orgAction : action
    };

    __sendMessageToFrotEnd(load);
  }
  
  function pong(action, _load){    
    var load = {
      action : 'pong',
      data : 'pong',
      runtimeRequest : true,
      status : "success",
      callerAction : action,
      orgRequest : _load
    };

    __sendMessageToFrotEnd(load);
  }
  
  function requisitarj2EPJeRest(action, _load){
    var _rest, _args;
    var _resAr = action.PJeRest.split('.');
    
    for( var i = 0; i <= _resAr.length-1; i++ ){
      _rest = i===0 ?  window[_resAr[i]] : _rest[_resAr[i]];
    }
    
   /* switch(action.PJeRest){
      case 'j2EPJeRest.tarefas.listar':
        _rest = j2EPJeRest.tarefas.listar;
        break;
      case 'j2EPJeRest.etiquetas.listar':
        _rest = j2EPJeRest.tarefas.listar;
        break;
    }*/
    function defaultErroCallback(xhr, status){
      var load = {
        action : 'requisitarJ2EPJeRestResponse',
        data : null,
        status : 'error',
        isError : true,
        callerAction : action
      };      
      __sendMessageToFrotEnd(load, "#ngFrame");
      
    }
    
    function defatulCallback(dataOrParam1, statusOrParam2, xhrOrParam3, param4, param5){
      
      var load;
      switch(action.respLoadFormat){
        case 'runtimeRequestArray':
          load = {
            action : 'requisitarJ2EPJeRestResponse',
            data : [dataOrParam1, statusOrParam2, xhrOrParam3, param4, param5],
            callerAction : action,
            runtimeRequest : true,
            status : "success",
            orgRequest : _load
          };
          break;
        
        default:
          load = {
            action : 'requisitarJ2EPJeRestResponse',
            data : dataOrParam1,
            status : statusOrParam2,
            callerAction : action
          };
          break;
      }
      
      
      __sendMessageToFrotEnd(load, "#ngFrame");
    }
    
    _args = (action.arguments) ? action.arguments.slice() : [];
    _args.push(defatulCallback);
    _args.push(defaultErroCallback);
    
    defer(function(){
      _rest.apply(null, _args);
    });    
    
    //console.log('rest', _rest, _args);
  }
  function requisitarSeamIteraction(action, _load){
    var _rest, _args;
    var _resAr = action.PJeRest.split('.');
    
    for( var i = 0; i <= _resAr.length-1; i++ ){
      _rest = i===0 ?  window[_resAr[i]] : _rest[_resAr[i]];
    }
    
    _args = (action.arguments) ? action.arguments.slice() : [];
    
    defer(function(){
      _rest.apply(null, _args)
      .done(res => {
        const load = {
          action : 'requisitarSeamIteractionResponse',
          data : res,
          status : 'success',
          callerAction : action
        }; 
    
        __sendMessageToFrotEnd(load, "#ngFrame");
      })
      .fail(err => {
        const load = {
          action : 'requisitarSeamIteractionResponse',
          data : null,
          status : 'error',
          isError : true,
          error: err,
          callerAction : action
        };      
        __sendMessageToFrotEnd(load, "#ngFrame");
      });
    });    
    
    //console.log('rest', _rest, _args);
  }
  
  function getHTMLAutosDigiais(action, load){
    
    function _ajaxAutosDigitais(id, ca){
      
      evBus.on('_ajaxAutosDigitais.response.' + id, function(ev, _data, _id, _ca, _action){
        var load = {
           action : 'getHTMLAutosDigiaisResponse',
           htmlAutosDigitais : _data,
           idProcesso : _id,
           ca : _ca,
           callerAction : _action
         };
         
         evBus.off(this);
         
         __sendMessageToFrotEnd(load, "#ngFrame");
      });
            
      var _url = '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$';
      evBus._getListeners('_ajaxAutosDigitais.response.' + id).length === 1 && jQ3.get(_url.replace('$', id).replace('$', ca), function(data, suc, xhr){
         
         lockrSes.set('getHTMLAutosDigiais.' + id, { 
           htmlAutosDigitais : data,
           time : (new Date()).getTime(),
           id : id,
           ca : ca
         });
         
         lockrSes.set( action.numeroUnico, { 
           idProcesso : id
         });

         evBus.fire('_ajaxAutosDigitais.response.' + id, data, id, ca, action);
      });
    }
    
    function _sendStoredAutosDigitais(_stor){
      var load = {
         action : 'getHTMLAutosDigiaisResponse',
         htmlAutosDigitais : _stor.htmlAutosDigitais,
         idProcesso : _stor.id,
         ca : _stor.ca,
         callerAction : action
       };

       __sendMessageToFrotEnd(load, "#ngFrame");
    }
    
    function _checkIfStored(key, isNumUnico){
      if(isNumUnico){
        var _numUnico = lockrSes.get(key, false);
        if(!_numUnico)
          return false;
        
        key = _numUnico.idProcesso;
      }
      
      var _stor = lockrSes.get('getHTMLAutosDigiais.' + key, { time : 600000 });
      if(_stor && _stor.time.asDateMiliDiff() < 600000 ){
        _stor.dataStored = true;
        _sendStoredAutosDigitais(_stor);
        return true;
      } // 10 min
      
      return false;
    }

    if( action.idProcesso !== 0 ){ 
      if(_checkIfStored( action.idProcesso ))
        return;
    
      j2EQueryGetChaveAcesso(action.idProcesso, function(chave){
        _ajaxAutosDigitais( action.idProcesso, chave );
      });
    }
    else{
      if(_checkIfStored( action.numeroUnico, true ))
        return;
      
      j2EQueryGetProcessoCredentials( action.numeroUnico, function(id, chave){
        _ajaxAutosDigitais( id, chave );
      });
    }
  }
  
  function abrirAutosDigitais(action){
    
    function _openAutosDigitais(id, ca){
      var _url = '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$';
      window.open(_url.replace('$', id).replace('$', ca), '_blank'  );
    }

    if( action.idProcesso !== 0 ) 
      j2EQueryGetChaveAcesso(action.idProcesso, function(chave){
        _openAutosDigitais( action.idProcesso, chave );
      });
    else
      j2EQueryGetProcessoCredentials( action.numeroUnico, function(id, chave){
        _openAutosDigitais( id, chave );
      });
  }
  
  
  function requisitarDadosTarefaDoProcesso(action){
    j2EQueryDadosTarefaDoProcesso(action.queryTarefa, action.numeroProcesso, function(data, status, xhr){
            
      var load = {
        action : 'requisitarDadosTarefaDoProcessoResponse',
        data : data.count > 0 ? data.entities[0] : {},
        status : status,
        callerAction : action
      };
      
      __sendMessageToFrotEnd(load, "#ngFrame");
      
    });
  }
  
  function requisitarConsultaTarefas(action){
    j2EQueryTaarefas(action.numeroProcesso, action.competencia, action.etiquetas, function(data, status, xhr){
            
      var load = {
        action : 'requisitarConsultaTarefasResponse',
        data : data,
        status : status,
        callerAction : action
      };
      
      __sendMessageToFrotEnd(load, "#ngFrame");
      
    });
  }
  
  function requisitarIdProcesso(action){
    j2EQueryGetProcessoId(action.numUnico, function(idProcesso, tarefaEntidade){
            
      var load = {
        action : 'requisitarIdProcessoResponse',
        idProcesso : idProcesso,
        tarefaEntidade : tarefaEntidade,
        callerAction : action
      };
      
      __sendMessageToFrotEnd(load, "#ngFrame");
      
    });
  }
  
  var _preiousSource = '';
  if(!(j2E.env?.deferring))
    j2E.env.deferring= {}

  j2E.env.deferring.personalizacaoTarefa = {
    carregarAutosDigitais : jQ3.Deferred(),
    carregarExpedientes : jQ3.Deferred(),
    prepararInteracoes : {
      autosDigitaisCarregados : jQ3.Deferred(),
      remoteJ2DocCreate : jQ3.Deferred()
    }
  };

  function personalizarTarefa(_load){
      var _tarf = _load.at(-1);
      var _tarfProp = TarefasProps[_tarf];
      var _delayCall = new DelayedCall(10, 10);
      var _defTarf = j2E.env.deferring.personalizacaoTarefa
      const toaster = (a, msg, severity)=> { 
        jQ3.Toast ? jQ3.Toast(a, msg, severity) : alert(`${severity.toUpperCase()}: ${msg}`) 
      }
      
      if(!(_tarfProp))
        return;
      if(!(_tarfProp.personalizacao))
        return;

      j2E.env.tarefaAtual = _tarfProp
      
      var body = jQ3('#taskInstanceForm > div.rich-panel > div.rich-panel-body');
      var form = body;
      
      var iframe;
      
      var _showExpedients = function(){
        iframe.on('load', function(){
          if(! (this.contentWindow.jQ3) )
            return;
          
          this.contentWindow.jQ3('body').attr('j2E', 'mostrarSoExpedientes');
          
          this.contentWindow.jQ3('a#navbar\\:linkAbaExpedientes1')[0].click();

          defer(()=> _defTarf.carregarExpedientes.resolve(iframe))
        });
      };
      var _autosDigitaisJuntarDocumento = function(height){
        let iframe = jQ3('<iframe>');

        let idProc = window.location.search.match(/idProcesso=[0-9]+&/);
        if(!(idProc))
          return;

        idProc = idProc[0].split('=')[1].split('&')[0];

        defer(function(){j2EQueryGetChaveAcesso(idProc, function(ca){
          let _url = '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$';
          _url = _url.replace('$', idProc).replace('$', ca);

          iframe.attr('src', _url).attr('j2-autos-tarefa', '')
          body.append(iframe);	
        })});

        iframe.on('load', function(){
          if(! (this.contentWindow.jQ3) )
            return;
          
          this.contentWindow.jQ3('body').attr('j2E', 'mostrarSoExpedientes');
          
          this.contentWindow.jQ3('a#navbar\\:linkAbaIncluirPeticoes1')[0].click();
        });
      };
      var _autosDigitais = function(){
        iframe = jQ3('<iframe>');

        var idProc = window.location.search.match(/idProcesso=[0-9]+&/);
        if(!(idProc))
          return;

        idProc = idProc[0].split('=')[1].split('&')[0];

        defer(function(){j2EQueryGetChaveAcesso(idProc, function(ca){
          const getSearch = new URLSearchParams();
          getSearch.append('idProcesso', idProc);
          getSearch.append('ca', ca);
          getSearch.append('j2Expedientes', true);

          const _url = 
          `/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?${
            getSearch
          }#/${
            j2E.mods.urlHash.encode(_tarfProp)
          }`;

          iframe.attr('src', _url).attr('j2-autos-tarefa', '')
          body.append(iframe);	
        })});

        iframe.on('load', function(){
          defer(()=> _defTarf.carregarExpedientes.resolve(jQ3(this)))
        })
      };
      var _limparCorpo = function(){
        form.find('span').remove();          
      };
      var _transicaoManterApenasIgnorarESairTarefa = function(){
        __sendMessageToFrotEnd({
          action : 'transicaoManterApenasIgnorarESairTarefa'
        });
      };
      var _transicaoRemover = function(){
        __sendMessageToFrotEnd({
          action : 'transicaoRemover',
          transicoes : _tarfProp.personalizacao.transicaoRemover
        });
      };
      var _removeDoCorpo = function(){
        jQ3.each(_tarfProp.personalizacao.removeDoCorpo, function(key, val){
          jQ3(val).remove();
        });
      };
      var _criarPainel = function(subPanel, definicaoDeSubPanelEPainelAutonomoDeOutroSetorDePersonalizacao){
        var jPOut
        jQ3.each(subPanel?.painel || _tarfProp.personalizacao.painel, function(key, painel){
          var _body = jQ3('<div>');
          jQ3.each(painel.body, function(key, el){
            switch(el.tipo){
              case 'html':
              case 'jQ3':
                _body.append( el.data );
                break;
              case 'table':
                _body.append( j2EUi.createTable(el.data) );
                break;
              case 'button':
                _body.append( j2EUi.createButton(el.data) );
                break;
              case 'painel':
                var subPanel = _criarPainel(el)
                _body.append( subPanel );
                break;
            }
          });
          
          var jP = j2EUi.createPanel(painel.header, _body, painel.j2Attr, painel.collapsable, painel.panelClass);

          if(painel.events){
            jQ3.each(painel.events, function(key, eventCallback){
              eventCallback(jP)
            })
          }

          if( definicaoDeSubPanelEPainelAutonomoDeOutroSetorDePersonalizacao || ! (subPanel )){
            if( typeof painel.appendTo === 'function' )
              painel.appendTo().append( jP )
            else if( typeof painel.appendTo === 'string' )
              jQ3(painel.appendTo).append( jP );
          }
          else
            jPOut = jP
        });

        if( subPanel )
          return jPOut
      };
      var _prepararInteracoes = function(){
        jQ3.each(_tarfProp.personalizacao.prepararInteracoes, function(key, interaction){
          switch(interaction){
              case 'seam-processo':
                j2E.SeamIteraction.processo.acoes.abrirProcesso()
                .done( (int)=> { 
                  defer(()=>evBus.fire('Tarefa.Personalizacao.prepararInteracoes.autosDigitaisCarregados', int))
                  defer(()=>_defTarf.prepararInteracoes.autosDigitaisCarregados.resolve(int))
                  j2E.env.tempData.prepararInteracoes = { 
                    evBusTriggered : true,
                    interactionObject :  int
                  }
                })
                break;
              
              case 'remote-j2Doc-create':
                addScript('Extensao/j2-external.js')
                j2E.mods.remoteJ2DocCreatorInit()
                window.postMessage({
                   j2Action: true, 
                   pageXContent : true,
                   message: "initialize-remote-j2Doc-create" 
                }, "*")

                jQ3('#taskInstanceDiv').append(`
                  <iframe id="pseudoEdt" j2-pseudo-iframe>
                `)
                jQ3('#taskInstanceDiv').append(`
                  <iframe id="pseudoExp" j2-pseudo-iframe>
                `)

                setTimeout(()=>{ //preguiça, apenas isso
                  defer(()=>evBus.fire('Tarefa.Personalizacao.prepararInteracoes.remote-j2Doc-created'))
                  defer(()=>_defTarf.prepararInteracoes.remoteJ2DocCreate.resolve())
                }, 100);
                break;
            }
        })
      }

      const _criarTaskScroller = ()=>{
        j2EUi.createTaskScroller(_tarfProp.personalizacao.scroller)
      }

      const _criarCorpoParaPseudotarefaPura = ()=>{
        const __FORM__ = /*html*/`
          <form id="taskInstanceForm">
            <div class="rich-panel" id="taskInstanceForm:j_id83">
              <div class="rich-panel-body" id="taskInstanceForm:j_id83_body">
                <div id="dialogMessage" class="modal-popup">
                  <div id="title" class="modal-header">
                    Mensagem
                    <span class="btn-fechar" onclick="hideDialogMessage(this);"><i class="icon-fechar"></i></span>
                  </div>

                  <div class="modal-content text-center">
                    <dl id="taskInstanceForm:taskInstanceFormMessage" class="rich-messages" style="display: none;"><dt></dt></dl>
                  </div>
                </div>
                <div class="col-sm-12 clearfix">
                  <div id="taskInstanceForm:divTransicao"></div>
                </div>
              </div>
            </div>
          </form>          
        `
        const $taskInstanceDiv = jQ3('#taskInstanceDiv')
        $taskInstanceDiv.append(__FORM__)
        body = $taskInstanceDiv.find('div.rich-panel-body')
      }

      const _obterDosAutos = async ()=>{
        const propriedadesDeObterDosAutos = Object.keys(_tarfProp.personalizacao.obterDosAutos)
        if( !propriedadesDeObterDosAutos.length )
          return

        propriedadesDeObterDosAutos.forEach(propriedade => {
          switch (propriedade) {
            case 'mostrarPolosDoProcesso':
              _criarPainel({ painel: [{
                appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
                header : '[SEM HEADER]',
                panelClass : 'rich-panel col-sm-12',
                j2Attr : 'j2-mostrar-polos-do-processo',
                body : [
                  {
                    tipo : 'jQ3',
                    data : [ 
                      j2EUi.spinnerHTML()
                    ]
                  }
                ],
                // collapsable : {
                //  initExpanded: false
                // },
                events : [
                  ($thisPanel)=>{
                    evBus.on('ao-obter-autos-digitais-personalizarTarefa', function(ev, $autosXml, acoes){
                      $thisPanel.$body.empty()
                      $thisPanel.$body.append($autosXml.find('#poloAtivo').toggleClass('col-sm-4 col-sm-6'))
                      $thisPanel.$body.append($autosXml.find('#poloPassivo').toggleClass('col-sm-4 col-sm-6'))
                    })
                  }
                ]
              }]}, true)
              break;

            default:
              throw new Error(`Propriedade desconhecida: ${propriedade}`);
          }
        });

        j2E.SeamIteraction.processo.acoes.abrirProcesso()
        .done((it, acoes, $autosXml )=>{
          evBus.fire('ao-obter-autos-digitais-personalizarTarefa', $autosXml, acoes)
        })
        .fail((err)=>{
          toaster('Autos Digitais', `Erro ao obter os autos digitais.`, 'error')
        })
      }
      
      if(_tarfProp.personalizacao.ignorarPersonalizacaoDev)
        return; 
        
      _tarfProp.personalizacao.criarCorpoParaPseudotarefaPura            && _criarCorpoParaPseudotarefaPura();
      _tarfProp.personalizacao.prepararInteracoes                        && _prepararInteracoes();
      _tarfProp.personalizacao.removeDoCorpo                             && _removeDoCorpo();
      _tarfProp.personalizacao.limpaCorpoTarefa                          && _limparCorpo();
      _tarfProp.personalizacao.mostraAutosDigitais                       && _autosDigitais();
      _tarfProp.personalizacao.mostraExpedientes                         && _showExpedients();
      _tarfProp.personalizacao.mostraJuntarDocumento                     && _autosDigitaisJuntarDocumento();
      _tarfProp.personalizacao.transicaoRemover                          && _transicaoRemover();
      _tarfProp.personalizacao.transicaoManterApenasIgnorarESairTarefa   && _transicaoManterApenasIgnorarESairTarefa();
      _tarfProp.personalizacao.painel                                    && _criarPainel();
      _tarfProp.personalizacao.scroller                                  && _criarTaskScroller()
      _tarfProp.personalizacao.obterDosAutos                             && _obterDosAutos()
      
      if( !(_tarfProp.personalizacao.procedimentoEspecializado) )
        return;
      
      switch(_tarfProp.personalizacao.procedimentoEspecializado){
        case 'ADM-reorganizarTarefas':
          function ADMReorganizarTarefas(_tarfProp){
            
            var ADMGrupos = {};
            
            function _criarGruposTarefas(){
              var _gruposSet = {
                padrao : [
                  { text : 'Audiência', j2eG : 'aud'},
                  { text : 'Certificar', j2eG : 'certfc'},
                  { text : 'Consultas', j2eG : 'cnslts'},
                  { text : 'Expedientes', j2eG : 'exps'},
                  { text : 'Outras Ações', j2eG : 'outac'},
                  { text : 'Status Aguardando', j2eG : 'agdStt'},
                  { text : 'Demais Tarefas', j2eG : 'dmsTrf'}  
                ],
                A : [
                  { text : 'Status Aguardando', j2eG : 'agdStt'},
                  { text : 'Expedientes', j2eG : 'exps'},
                  { text : 'Demais Tarefas', j2eG : 'dmsTrf'}
                ]
              };
              
              var _grupos = _gruposSet[ _tarfProp.ADMGruposSet ? _tarfProp.ADMGruposSet : 'padrao' ];
              
              var _insBefThis  = jQ3('span div.propertyView:first').parent();
              
              jQ3.each(_grupos, function(key, val){
                if(_tarfProp.exibirADMGrupos && !(_tarfProp.exibirADMGrupos.includes(val.j2eG)))
                  return;
                
                var jGrpDiv = jQ3('<div>', {class : 'rich-panel-body panel j2eADMPanel', j2e : val.j2eG, id: `j2eADMPanel-${val.j2eG.toLowerCase()}`});
                jQ3('<div>', {class : 'rich-panel col-sm-12'}).append(
                  jQ3('<div>', {class : 'rich-panel-header j2eADMHeader', text : val.text})
                ).append(
                  jGrpDiv
                ).insertBefore(_insBefThis);
                
                ADMGrupos[val.j2eG] = {
                  push : function(el){
                    jGrpDiv.append(el);
                  }
                };
              });
            }
            
            function _posicionarTarefaDepoisDe(_this, altText){
              var _node = false;
              _this.parent().find('span div.propertyView  div.name label').each(function(){
                  var _cmp = jQ3(this).text().trim().localeCompare(altText);

                  if(_node === false && _cmp === 1 ){//&& _next === -1)
                      _node = jQ3(this);
                      return false;
                  }
              });

              if(_node === false)
                _node = _this.parent().find('span div.propertyView:last div.name label');

              return _node.parents('span');
            }
            
            _criarGruposTarefas();
           
            jQ3('span label', jQ3('#taskInstanceForm')).each(function(){
              _delayCall(function(ADMGrupos, jEl){
                var tarf = jEl.text().trim();
                var tarfProps = null;
                jQ3.each(TarefasProps, function(key, value){
                    if( ( key === tarf || (this.altNomeADM && this.altNomeADM === tarf ) ) //pelo lable se combina tarefa
                        && 
                        ( this.ADMGrupo || this.altNome || (this.personalizacao && this.personalizacao.ADM) ) ) // se tem alt nme ou personalização em Avaliar determinação do magistrado

                        tarfProps = this;
                });

                var jElSet = jEl.parents('span'); // tudo
                jElSet.find('div.propertyView').addClass('propertyViewJ2E');
                
                if(!(tarfProps))
                  return;

                if(tarfProps.ADMShortCut)  
                  j2E.mods.shortcuts.on('Shift+'+tarfProps.ADMShortCut, function(event, a, b, c){
                    var $inp = jEl.parent().parent().find('input');
                    var _chk = $inp.is(':checked');
                    $inp.attr('checked', !_chk);
                    $inp.prop('checked', !_chk);
                  });

                var jElSetC = null;
                function _incluirNomeAlternativo(){
                  jElSetC = jElSet.clone(true);

                  //with the clone
                  jElSetC.find('div div.name').each(function(){
                    this.id += '-j2Alt-' + tarfProps.altNome;
                  });
                  jElSetC.find('div div.name label').each(function(){
                    var _j = jQ3(this);
                    _j.attr('for', _j.attr('for') + '-j2Alt-' + tarfProps.altNome) ;
                    _j.text(tarfProps.altNome);
                    _j.replaceWith( _j.prop('outerHTML') );
                  });
                  jElSetC.find('div div.value input').each(function(){
                    var _j = jQ3(this);

                    this.id += '-j2Alt-' + tarfProps.altNome;
                    _j.removeAttr('name');
                    _j.click(function(){
                      var _ri = jElSet.find('div div.value input');
                      _ri.prop('checked', this.checked);
                      if(this.checked)
                        _ri.attr('disabled', 'disabled');
                      else
                        _ri.removeAttr('disabled', 'disabled');
                    });
                  });
                  jElSetC.attr('j2e', 'altTarefa');

                  //witsh the original
                  jElSet.addClass('tarfOrgOpacidade');
                  
                  //insert and move
                  jElSetC.insertBefore(_posicionarTarefaDepoisDe(jElSet, tarfProps.altNome));
                  /*jElSet.insertAfter( jElSet.parent().find('span div.propertyView:last').parent('span') );*/
                }
                
                function _personalizacaoADM(){
                  var _pADM = tarfProps.personalizacao.ADM;
                  
                  function __desabilitar(){
                    jElSet.addClass('tarfOrgOpacidade');
                    jElSet.find('div div.value input').each(function(){
                      var _j = jQ3(this);
                      _j.attr('disabled', 'disabled');
                    });
                  }
                  
                  function __orgNaoEsmaecido(){
                    jElSet.removeClass('tarfOrgOpacidade');
                  }
                  
                  function __estenderControlarTarefa(){
                    var _j = jElSet.clone(true);
                    var _div = _j.find('div.propertyView');
                    
                    _div.empty();
                    _div.removeClass('col-sm-4');
                    _div.addClass('col-sm-8');

                    _div.append( j2EUi.spinnerHTML() )
                    
                    _j.insertAfter(jElSet);


                    j2E.SeamIteraction.processo.acoes.abrirProcesso()
                    .pipe( (a, acoes) => acoes.obterAudiencasDoProcesso() )
                    .done((audiencias, $tabela) => { 
                      _div.empty()
                      const ___infoNenhumaAudiencia = ()=>{
                        _div.append(/*html*/`
                          <img src="/pje/img/al/secam.png">
                          <span class="j2eSpanAlert"><b>Nenhuma audiência designada.</b></span>
                        `);
                      }

                      if(!audiencias.length) {
                        ___infoNenhumaAudiencia()
                        return
                      }

                      if(!audiencias.filter(aud => aud.status_da_audiencia === 'designada').length) {
                        ___infoNenhumaAudiencia()
                        return
                      }

                      $tabela.find("tbody > tr").each(function () {
                          const linha = $(this);
                          const texto = linha.text().toLowerCase();

                          if (texto.includes('redesignada')) {
                            linha.remove();
                          }
                          else if (!texto.includes('designada')) {
                              linha.remove();
                          }
                      });
                      
                      _div.append( $tabela );
                    })
                    .fail(err=>{
                      _div.empty()
                      _div.append(/*html*/`
                          <span class="j2eSpanAlert"><b>###ERRO: Falha ao consultar audiências (${err}).</b>.</span>
                        `);
                    })
                    
                  /*  jQ3.get('/pje/seam/resource/rest/pje-legacy/painelUsuario/historicoTarefas/$'.replace('$', idProc), function(data, status){
                      if(status !== 'success')
                        return;
                      
                      data = data.tarefas.filter(function(el){
                        return el.nome.toLowerCase().includes('audiência');
                      });
                      
                      var _temAudiencia = false;
                      jQ3.each(data, function(key, val){
                        if(val.nome.toLowerCase().includes('designar'))
                          _temAudiencia = true;
                        if(val.nome.toLowerCase().includes('realizada') || val.nome.toLowerCase().includes('cancelar'))
                          _temAudiencia = false;
                      });
                      if( !(_temAudiencia))
                        return;
                                            
                      var _j = jElSet.clone(true);
                      var _div = _j.find('div.propertyView');
                      
                      _div.empty();
                      _div.removeClass('col-sm-4');
                      _div.addClass('col-sm-8');
                      
                      _j.insertAfter(jElSet);
                      
                      _j.find('div.propertyView').append('<img src="/pje/img/al/secam.png"><span class="j2eSpanAlert">O histórico de tarefas do processo sugere que <b>existe audiência desiganda</b>.</span>');
                    });*/
                  }
                  
                  function __alterarAltNomeLabel(){
                    jElSetC.find('div div.name label').text( _pADM.altNomeLabel );
                  }
                
                  _pADM.altNomeLabel && __alterarAltNomeLabel();
                  _pADM.desabilitar && __desabilitar();
                  _pADM.estenderControlarAudiencia && __estenderControlarTarefa();
                  _pADM.orgNaoEsmaecido && __orgNaoEsmaecido();
                }
                
                function _addScrollers(){
                  /*        <div _ngcontent-euy-c14="" class="col-md-5 btn-toolbar pb-5 toolbar-processo" style="
                      z-index: 10000;
                      position: fixed;
                      width: min-content;
                      right: 0;
                  "><button _ngcontent-euy-c14="" class="btn btn-sm btn-default pull-right" placement="bottom" tooltip="Expandir | Recolher" type="button"><!----><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 499.918 499.918" style="transform: rotate(180deg);enable-background:new 0 0 499.918 499.918;" xml:space="preserve">
                  <g>
                          <g>
                                  <path d="M450.823,277.205h-70.777V14.921C380.046,6.683,373.362,0,365.125,0H134.792c-8.238,0-14.921,6.677-14.921,14.921v262.284    H49.094c-20.594,0-25.49,11.806-10.924,26.371l185.417,185.418c14.565,14.565,38.183,14.565,52.743,0l185.411-185.418    C476.313,289.011,471.424,277.205,450.823,277.205z"></path>
                          </g>
                  </g>

                  </svg><!----></button><button _ngcontent-euy-c14="" class="btn btn-sm btn-default pull-right" data-target="#modal-historico-tarefas" data-toggle="modal" placement="bottom" tooltip="Histórico de tarefas" type="button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 499.918 499.918" style="enable-background:new 0 0 499.918 499.918;" xml:space="preserve">
                  <g>
                          <g>
                                  <path d="M450.823,277.205h-70.777V14.921C380.046,6.683,373.362,0,365.125,0H134.792c-8.238,0-14.921,6.677-14.921,14.921v262.284    H49.094c-20.594,0-25.49,11.806-10.924,26.371l185.417,185.418c14.565,14.565,38.183,14.565,52.743,0l185.411-185.418    C476.313,289.011,471.424,277.205,450.823,277.205z"></path>
                          </g>
                  </g>


                  </svg></button></div>*/
                }
                
                function _apensarAoGrupo(){
                  if(tarfProps.ADMGrupo.org){
                               ADMGrupos[tarfProps.ADMGrupo.org].push(jElSet);
                    jElSetC && ADMGrupos[tarfProps.ADMGrupo.alt].push(jElSetC);
                  }else
                    ADMGrupos[tarfProps.ADMGrupo].push(jElSet);
                }
                
                tarfProps.altNome && _incluirNomeAlternativo();
                tarfProps.ADMGrupo && _apensarAoGrupo();
                tarfProps.personalizacao && tarfProps.personalizacao.ADM && _personalizacaoADM();
              }, ADMGrupos, jQ3(this) );
            });
            _delayCall(function(){jQ3('#pageBody').css('filter', ''); });
            _delayCall(depoisDeADMReorganizarTarefas, _tarfProp)
          }

          async function ADMFaixaULtimasSelecoes(_tarfProp){
            function prepararUmaTraefa(cumprDecId, idTask, nomeTarefa){
              const TEMPLATE_TASK_SELECTOR = `
              <span
                id="taskInstanceForm:${cumprDecId}-${idTask}"
              >
                <div class="propertyView col-sm-4 propertyViewJ2E">
                  <div
                    id="taskInstanceForm:${cumprDecId}-${idTask}:${cumprDecId}-${idTask}Decoration:field${cumprDecId}-${idTask}Div"
                    class="name"
                  >
                    <label
                      for="taskInstanceForm:${cumprDecId}-${idTask}:${cumprDecId}-${idTask}Decoration:${cumprDecId}-${idTask}"
                      class=""
                    >
                      ${nomeTarefa}
                      <small class="text-muted text-lowercase"></small
                    ></label>
                  </div>
                  <div class="value col-sm-12">
                    <input
                      id="taskInstanceForm:${cumprDecId}-${idTask}:${cumprDecId}-${idTask}Decoration:${cumprDecId}-${idTask}"
                      type="checkbox"
                      name="taskInstanceForm:${cumprDecId}-${idTask}:${cumprDecId}-${idTask}Decoration:${cumprDecId}-${idTask}"
                      class="checkbox"
                      onclick=""
                    />
                  </div></div>
              </span>`

              return TEMPLATE_TASK_SELECTOR
            }
            
            const TEMPLATE_CONTAINER = `<div id="j2-float-adm" class="div-fixa">
            <div class="rich-panel col-sm-12">
              <div class="rich-panel-header j2eADMHeader">Últimas selecionadas</div>
              <div class="rich-panel-body panel j2eADMPanel" j2e="certfc">
                
              </div>
            </div>
            </div>
            `
            
            const idTask = j2E.env.urlParms.newTaskId
            const currentUser = await obterCurrentUser()
            const dataTarefasStored = lockrSes.get(
              `${currentUser.login}-ADMFaixaULtimasSelecoes`, { noData: true}
            )

            const $referenceObject = jQ3(`#taskInstanceForm\\:Processo_Fluxo_visualizarDecisao-${idTask}`).prev()
            const $container = jQ3(TEMPLATE_CONTAINER)

            if(typeof dataTarefasStored.noData === 'undefined' ){
              const $body = $container.find('.rich-panel-body')

              dataTarefasStored.sort((a, b)=> a.nome.localeCompare(b.nome))
              dataTarefasStored.forEach(trf=>{
                const $tarefa = jQ3(prepararUmaTraefa(trf.cumprDecId, idTask, trf.nome))
                const $relInput = jQ3('#taskInstanceForm').find(`[id='${trf.relId.replaceAll('$', idTask).replaceAll(':', '\\:')}']`)
                if($relInput.length === 0)
                  return

                trf.$relInput = $relInput
                $body.append($tarefa)
                $tarefa.data('j2E', trf )
                $relInput.click(function(){
                  if(this.checked){
                    $tarefa.find('input').attr('checked', 'checked')
                    $tarefa.find('input').prop('checked', true)
                  }else{
                    $tarefa.find('input').removeAttr('checked')
                    $tarefa.find('input').prop('checked', false)
                  }
                })
              })

              $body.find('input').click($ev =>{
                const $target = jQ3($ev.target)
                const j2EData = $target.parents('span').data('j2E')

                const $relInput = j2EData.$relInput
                if($target.is(':checked')){
                  $relInput.attr('checked', 'checked')
                  $relInput.prop('checked', true)
                }else{
                  $relInput.removeAttr('checked')
                  $relInput.prop('checked', false)
                }
                if( j2EData.relId.includes('j2Alt')) 
                  $relInput[0].dispatchEvent( new Event('click') )
              })
            }

            jQ3('#taskInstanceForm').before($container)

            jQ3('#pageBody').on("scroll", function(event) {
              if( dataTarefasStored.noData )
                return

              const divFixa = jQ3('#j2-float-adm')[0];
              const depoisDesseId = $referenceObject[0];
              const divRect = divFixa.getBoundingClientRect();
              const depoisRect = depoisDesseId.getBoundingClientRect();
            
            
            
              // Verifique se o elemento 'depoisDesseId' está fora da visualização
                console.log('depoisRect.top', depoisRect.top , 'divRect.height', divRect.height )
              if ( depoisRect.top < -divRect.height) {
                  //console.warn('condição is true')
                  divFixa.style.top = "0"; // Mostra a div fixa definindo o topo como 0
              } else {
                  divFixa.style.top = "-500px"; // Esconde a div fixa definindo o topo como -100px
              }
            });

            
            window.addEventListener("message", (event) => {
              if( ! ( event.origin === 'https://frontend.prd.cnj.cloud'
                  &&
                  !!event.data.transitarFrame
              )) return

              const selecaoAtualBuffer = []
              jQ3('#taskInstanceForm').find('input:enabled:checked').each((idx, el)=>{ 
                const $elInputTarf = jQ3(el)
                const targetRelNomeTarefa = $elInputTarf.parents('span').find('label').text().trim()

                selecaoAtualBuffer.push({ 
                  nome: targetRelNomeTarefa,
                  relId: $elInputTarf.attr('id').replace(/-\d+/g, '-$'),
                  cumprDecId: $elInputTarf.attr('id').split(':')[1].split('-')[0]
                })
              })
              if(selecaoAtualBuffer.length)
                lockrSes.set(`${currentUser.login}-ADMFaixaULtimasSelecoes`, selecaoAtualBuffer)

            });
          }
          
          _delayCall(function(){jQ3('#pageBody').css('filter', 'blur(5px)'); });
          _delayCall(ADMReorganizarTarefas, _tarfProp);

          function depoisDeADMReorganizarTarefas(_tarfProp){
            _delayCall(ADMFaixaULtimasSelecoes, _tarfProp)
          }
          break;
      }
  }

  function observarTarefa(){
    //minipac
    jQ3.initialize('', function(){
      
    });
  }
  
/*
  document.addEventListener ('DOMNodeInserted', function() {
    return;


    jQ3('select').each(function(idx, el){
      var jEl = jQ3(el);
      console.log('origin: pje.tjma.jus.br - DOMNodeInserted - select');

      if(jEl.find('option').length === 2 && jEl.parents('table').length && jEl.parents('table').prop('id') && jEl.parents('table').prop('id').contains('destinatariosTable') ){
        jEl.val( jEl.find('option:last').val() ).change();
        //setTimeout(function(){jEl[0].onchange();}, 1000);
      }
      if (jEl.find('option:selected').text() === 'Sistema')
        jEl.val( jEl.find('option:contains("Diário Eletrônico")').val() );
    });



   
  });*/
  
  function observeTarefaComPAC(){
    jQ3.initialize('table.rich-table', function(){
      if(! (this.id.includes('destinatariosTable')) && ! (this.id.includes('tableDestinatarios')) ) 
        return;
      jQ3.initialize('select', function(){
        var jEl = jQ3(this);
        
        if( jEl.find('option').length === 2)
          jEl.val( jEl.find('option:last').val() ).change();
        
        if (jEl.find('option:selected').text() === 'Sistema')
          jEl.val( jEl.find('option:contains("Diário Eletrônico")').val() );
        
        if (jEl.find('option:selected').text() === 'Selecione')
          if (jEl.find('option:contains("Telefone")').length)
            jEl.val( jEl.find('option:contains("Telefone")').val() );
          
      }, { target : this });
      
      
      jQ3.initialize('input', function(){
        if(! (this.id.includes('quantidadePrazoAto')) && ! (this.id.includes('prazoGeralInput')) )
          return;
        
        var __dataList__ = '<select id="$:list"><option value="2">2</option><option value="3">3</option><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="30">30</option></select>';
        
        var jEl = jQ3(this);
        
        if(jEl.parent().is('th')){
          jEl.parent().css('min-width', '90px');
          jEl.parent().contents().filter(function(){
            return this.nodeType === 3;
          }).remove();
        }
        
        jEl.val('10');
        jEl[0].dispatchEvent( new Event('change') );
          lockrSes.set(jEl.prop('id'), jEl.val() );
        
        var dl = __dataList__.replace('$', this.id);
                
        dl = jQ3(dl).insertAfter(jEl);
        //dl = dl.find('select');
        //jEl.attr('list', this.id + ':list');
        
        jEl.click(function(){
          //jEl.val('');
        });
        
        var $ = jQ3;
        $.widget( "custom.combobox", {
          _create: function() {
            
            this.__scope = $( "<j2ejqui>" )
              .insertAfter( this.element );
      
            this.wrapper = $( "<span>" )
              .addClass( "custom-combobox" )
              .appendTo( this.__scope );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
          },

          _createAutocomplete: function() {
            /*var selected = this.element.children( ":selected" ),
              value = selected.val() ? selected.text() : "";*/

            this.input = jEl//$( "<input>" )
              .appendTo( this.wrapper )
              .val( lockrSes.get(jEl.prop('id'), '10') )
              .attr( "title", "" )
              //.css('width','calc(100% - 41px);')
              //.addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
              .addClass( "ui-combobox-pjePrazoWidth" )
              .autocomplete({
                delay: 0,
                minLength: 0,
                source: this._source.bind( this ),
                appendTo : this.wrapper
              })
              .tooltip({
                classes: {
                  "ui-tooltip": "ui-state-highlight"
                }
              });

            this._on( this.input, {
              autocompleteselect: function( event, ui ) {
                ui.item.option.selected = true;
                this._trigger( "select", event, {
                  item: ui.item.option
                });
              },

              autocompletechange: "_removeIfInvalid"
            });
          },

          _createShowAllButton: function() {
            var input = this.input,
              wasOpen = false;

            $( "<a>" )
              .attr( "tabIndex", -1 )
              //.attr( "title", "Show All Items" )
              //.tooltip()
              .css('height','40px')
              .css('vertical-align','top')
              .appendTo( this.wrapper )
              .button({
                icons: {
                  primary: "ui-icon-triangle-1-s"
                },
                text: false
              })
              .removeClass( "ui-corner-all" )
              .addClass( "custom-combobox-toggle ui-corner-right" )
              .on( "mousedown", function() {
                wasOpen = input.autocomplete( "widget" ).is( ":visible" );
              })
              .on( "click", function() {
                input.trigger( "focus" );

                // Close if already visible
                if ( wasOpen ) {
                  return;
                }

                // Pass empty string as value to search for, displaying all results
                input.autocomplete( "search", "" );
              });
          },

          _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
              var text = $( this ).text();
              if ( this.value && ( !request.term || matcher.test(text) ) )
                return {
                  label: text,
                  value: text,
                  option: this
                };
            }) );
          },

          _removeIfInvalid: function( event, ui ) {
            jEl[0].dispatchEvent( new Event('change') );
            lockrSes.set(jEl.prop('id'), jEl.val() );
            return;/*
            // Selected an item, nothing to do
            if ( ui.item ) {
              return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
              valueLowerCase = value.toLowerCase(),
              valid = false;
            this.element.children( "option" ).each(function() {
              if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                this.selected = valid = true;
                return false;
              }
            });

            // Found a match, nothing to do
            if ( valid ) {
              return;
            }

            // Remove invalid value
            this.input
              .val( "" )
              .attr( "title", value + " didn't match any item" )
              .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
              this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";*/
          },

          _destroy: function() {
            this.wrapper.remove();
            this.element.show();
          }
        });
        
        dl.combobox();
          
      }, { target : this });
    });
  }

  function observarParaAcrescentarRecarregadorDeDocumento(){

    jQ3.initialize('select', function(){
      var matches = false
      var html_set = 1
      var jEl = jQ3(this);

      if(jEl.prop('id')==='modTDDecoration:modTD')
        matches = true
      if( jEl.prop('id').match(/^taskInstanceForm.*selectModeloDocumento$/) )
        matches = true
      if( jEl.prev().is('label') && jEl.prev().attr('for').match(/^taskInstanceForm.*modeloCombo$/) ){
        matches = true
        html_set = 2
      }
        

      if(!matches)
        return;
      
      var script = ' event.preventDefault()';
      switch(html_set){
        case 1:
          var $aRefsh = jQ3(`
            <div class="value col-sm-1">
              <a class="btn btn-primary j2-refresh-loader-autos" onclick="${script}"><i class="fa fa-refresh"></i></a>
            </div>
          `
          )
          jEl.parent().after($aRefsh)
          jEl.parent().removeClass('col-sm-12').addClass('col-sm-11')
          $aRefsh.click(()=>{
            jEl[0].dispatchEvent(new Event('change'))
          })
          break;

        case 2:
          var $aRefsh = jQ3(`
              <a class="btn btn-primary j2-refresh-loader-autos framePAC" onclick="${script}"><i class="fa fa-refresh"></i></a>
          `
          )
          jEl.after($aRefsh)
          jEl.css({
            width : 'calc(100% - 40px)'
          })
          //jEl.parent().removeClass('col-sm-12').addClass('col-sm-11')
          $aRefsh.click(()=>{
            debugger;
            jEl[0].dispatchEvent(new Event('change'))
          })
          break;
      }
    });
  }
  
  
  function observeQualificacaoPartes(){
    var sels = [
      'ul.dropdown-menu #poloAtivo a', 
      'ul.dropdown-menu #poloPassivo a', 
      'ul.dropdown-menu #outrosInteressados a',
      '#pessoaFisicaViewView label',
      '#pessoaJuridicaViewView label',
    ]

    function _copyToClipboard(text, $i) {
      navigator.clipboard.writeText(text)
        .then(function() {
          var $iVisto = jQ3('<i>', {
            class : 'fa fa-check text-success',
            css : {
              display : 'none',
              paddingLeft: '3px'
            }
          })

          $i.after($iVisto)
          $iVisto.show(250).promise().done(()=>{
            setTimeout(()=> $iVisto.hide('250').promise().done(()=>$iVisto.remove()), 3000)
          })
          
        })
        .catch(function(error) {
          console.error('Erro ao copiar texto para a área de transferência:', error);
        });
    }

    function _extrairDocumento(texto) {
      var padraoCpf = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
      var padraoCnpj = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;
      var cpf = texto.match(padraoCpf);
      var cnpj = texto.match(padraoCnpj);
    
      if (cpf) {
        return cpf[0];
      } else if (cnpj) {
        return cnpj[0];
      } else {
        return undefined;
      }
    }
    

    jQ3.initialize(sels.join(','), function(a, b, c){
      var $obj = jQ3(this)
      var $this
      var naoCopiarDocumento = true;
      var parent

      if($obj.parents('.dropdown-menu ').length){ 
        parent = 'dropdown-menu'
        $this = $obj
        naoCopiarDocumento = false
      }
      else if($obj.parents('#pessoaFisicaViewView').length){
        if(! ( $obj.is(':contains("CPF")') || $obj.is(':contains("Nome civil")') ) )
          return;
        
        parent = 'pessoaFisicaViewView'
        $this = $obj.parent().next()
        $this.text($this.text().replace('\n', ''))
      }
      else if($obj.parents('#pessoaJuridicaViewView').length){
        if(! ( $obj.is(':contains("CNPJ")') || $obj.is(':contains("Nome")')  ) )
          return;
        
        parent = 'pessoaJuridicaViewView'
        $this = $obj.parent().next()
        $this.text($this.text().replace('\n', ''))
        if( ! $this.text().trim().length )
          return;
      }
      else
        return

      var $i = jQ3('<i>', {
        class : 'fa fa-clipboard copiar-clipboard j2-qualificacao-icon',
        title : 'Copiar nome, cpf e participação para área de trnasferência',
        css : {
          paddingLeft: '2px'
        }
      })
      $i.click((ev)=>{
        _copyToClipboard($this.text().trim(), $i)
      })
      $this[(parent === 'dropdown-menu') ? 'after' : 'append']($i)

      if( naoCopiarDocumento || _extrairDocumento($this.text().trim()) === undefined)
        return
        
			var $i_cpf = jQ3('<i>', {
        class : 'fa fa-id-card-o copiar-clipboard j2-qualificacao-icon',
        title : 'Copiar cpf/cnpj para área de trnasferência',
        css : {
          paddingLeft: '4px'
        }
      })					
      $i_cpf.click((ev)=>{
        _copyToClipboard(_extrairDocumento($this.text().trim()), $i_cpf)
      })
      $i.after($i_cpf)
    })
  }

  function observeSelectTipoDocumento(){
    
    jQ3.initialize('select#cbTDDecoration\\:cbTD', function(a, b, c){
      const $sel = jQ3(this)

      jQ3.initialize('option', function(a, b, c){
        const jEl = jQ3(this)
        switch(jEl.text()){
          case 'Ato Ordinatório':
          case 'Certidão':
          case 'Mensagem(ns) de E-mail':
          case 'Ofício':
          case 'Petição':
          case 'Petição Inicial':
          case 'Protocolo':
          case 'Termo':
          case 'Termo de Juntada':
            return;         

          case 'Selecione':
            if(jQ3('body').is('[j2-selector-tipo-changed-once]'))
              jEl.remove()
            break;

          default:
            jEl.remove();

          
        } 
      }, {target: this})

      $sel.change(()=>{
        jQ3('body').attr('j2-selector-tipo-changed-once', '')
      })
    });
    
    function isExperied(cred, cusTime){
      var __TIME__ = cusTime || 1000 * 60 * 10; //10 min
      var now = (new Date()).getTime();
      

      return ( now - cred.timestamp ) > __TIME__;
    }
    jQ3.initialize('select#cbTDDecoration\\:cbTD', function(a, b, c){
      var jEl = jQ3(this);
      let autoReplaceTo = "Certidão"
      const __TIME__ = 2.5 * 60 * 1000 
      let lockItem = lockr.get('select#cbTDDecoration:cbTD', { timestamp : 0 });
      if(! isExperied(lockItem, __TIME__) )
        autoReplaceTo = lockItem.text
      
      if(jEl.find('option:selected').text().toLowerCase() === 'selecione'){
        if(jEl.find(`option:contains("${autoReplaceTo}")`).length){
          jEl.val( jEl.find(`option:contains("${autoReplaceTo}")`).val() );
          jEl[0].dispatchEvent(new Event('change'));
          
          lockr.set('select#cbTDDecoration:cbTD', {
            text : autoReplaceTo,
            //val : jEl.val(),
            timestamp : (new Date()).getTime()
          })
        }
      }

      jEl.change(()=>{
        lockr.set('select#cbTDDecoration:cbTD', {
          text : jEl.find('option:selected').text(),
          //val : jEl.val(),
          timestamp : (new Date()).getTime()
        })
      })
    });
    
    jQ3.initialize('select#modTDDecoration\\:modTD', function(){
      var proc = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
      
      var jEl = jQ3(this);
      var jTipo = jQ3('select#cbTDDecoration\\:cbTD');
      
      if( jEl.find('option').length > 1){
        if(lockrSes.get(proc + '.select#cbTDDecoration:cbTD.val') === jTipo.val() )
          return;
        
        jEl.val( jEl.find(':nth-child(2)').val() );
        jEl[0].dispatchEvent(new Event('change'));
        lockrSes.set(proc + '.select#cbTDDecoration:cbTD.val', jTipo.val() );
      }
    });

    jQ3.initialize('#ipDescDecoration\\:ipDesc', function(){
      var $jEl = jQ3(this);
      var $jType = jQ3('#cbTDDecoration\\:cbTD');
      if( $jType.find('option:selected').text() === "Termo de Juntada" ){
        $jEl.attr('list', 'j2-termo-juntada-datalist')
        $jEl.val('')

        setTimeout(()=>{
          let $inPdf = jQ3('input[value="PDF"]')
          $inPdf.prop( "checked", true );
          $inPdf[0].dispatchEvent(new Event('change'));
        }, 150);

        if( jQ3('body').find('#j2-termo-juntada-datalist').length === 0 ){
          jQ3('body').append(`
            <datalist id="j2-termo-juntada-datalist">
              <option value="Certidão de Publicação do DJEN">
              <option value="Alvará Judicial">
            </datalist>
          `)
        }

        
      }else
        $jEl.removeAttr('list')      
    })
    
    
    jQ3.initialize('input[value="HTML"]', function(){      
      var jEl = jQ3(this);
      var proc = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
      var jTipo = jQ3('select#cbTDDecoration\\:cbTD');
      var _sesId = proc + '.input[value="HTML"]:checked.select#cbTDDecoration\\:cbTD:' + jTipo.val();
      
      if( lockrSes.get(_sesId) === 'HTML:' + jTipo.val() )
        return;
      
      jEl.prop( "checked", true );
      jEl[0].dispatchEvent(new Event('change'));
      lockrSes.set(_sesId, 'HTML:' + jTipo.val() );
    });
    
    jQ3.initialize('input[value="PDF"]', function(){      
      var jEl = jQ3(this);
      jEl.click(function(){
        jEl.parents('#divDocumentoPrincipal').find('iframe').prop('contentDocument').body.innerHTML = '';
        jEl.parents('#divDocumentoPrincipal').find('input.btn.btn-primary').get(0).click(); 
      });
      
      
      
      /*var proc = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
      var jTipo = jQ3('select#cbTDDecoration\\:cbTD');
      var _sesId = proc + '.input[value="HTML"]:checked.select#cbTDDecoration\\:cbTD:' + jTipo.val();
      
      if( lockrSes.get(_sesId) === 'HTML:' + jTipo.val() )
        return;
      
      jEl.prop( "checked", true );
      jEl[0].dispatchEvent(new Event('change'));
      lockrSes.set(_sesId, 'HTML:' + jTipo.val() );*/
    }); 
  }

  function observeProcessoFolhaExpedientes(){
    function __pdfDownloadAction(){ 
      var idPF = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];    

      var j2ExpC = jQ3('#frameHtml').prop('contentWindow').jQ3('#j2Exp').clone();
      
      j2ExpC.find('div').filter(function() {
          return jQ3(this).css('box-shadow').length > 0;
        }
      ).css('box-shadow', '');
      j2ExpC.find('#normalizeFormtas').css('border', '');

      var _pdfWin = j2EOpW.corner( '', 'FerramentasProcessoBaixarPDF' + guid(), null, { width : 25, height: 25} );
      var _winDoc = jQ3('#frameHtml').prop('contentDocument');
      var _wB = jQ3('body', _pdfWin.document);
      _wB.empty();
      _wB.append(j2ExpC);

      var opt = {
        margin:       [0.393701, 0, 0.393701, 0],
        filename:     idPF + ' - id ' +  jQ3('div.titulo-documento span').text().trim() + '.pdf',
        image:        { type: 'jpeg', quality: 1.00 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      function ___makePdf(){
        if (typeof _pdfWin.html2pdf !== 'undefined' ) {
          _pdfWin.html2pdf().set(opt).from(_winDoc.getElementById('j2Exp')).save(null, _winDoc);
          setTimeout(function(){_pdfWin.close();},250);
        }else {
          setTimeout( ___makePdf, 50 );
        }
      }
      ___makePdf();      

    }
    
    jQ3.initialize('table#panelDetalhesProcesso', function(){
      jQ3.initialize('#processoExpedienteTab table.rich-table', function(){
        function _dispararEventoExpedientesExibidosFrontend(){
          const j2Action = {
            j2 : true,
            action : 'triggerEventFromPJe',
            evento : {
              tipo : 'on-exibir-expedientes-autos-digitais',
              argumentos : { 
              }
            }
          }
          defer(()=>__sendMessageToFrotEnd( j2Action))
        }
        
        _dispararEventoExpedientesExibidosFrontend()
      }, {target:this});

      var _parentThisTable = jQ3(this);
      var tdPosShift = 0 //usado para discriminar que houve a adicição ou não de coluna na tabela

      jQ3('#processoExpedienteTab table.rich-table.clearfix a[title="Visualizar ato"]', _parentThisTable).each(function(idx, el){

        var jEl = jQ3(el);
        var $tr = jEl.parents('tr:first');
        
        
        function _adicionarComandoParaFecharOPrazo(){
          if(jEl.parents('td').next().find('div[j2="editarExpediente"]').length !== 0 || jEl.parents('td').next().text().includes('SIM'))
            return;
          var _div = jQ3('<div>', {
            class : 'col-sm-12 text-center',
            style : 'margin-top: 5px;',
            j2 : 'editarExpediente'
          });

          var _idExp = (function(){
            var b = jEl.prop('href').match(/idProcessoParteExpediente=[0-9]+&/);
            return b[0].split('=')[1].split('&')[0];
          })();

          var _onclick =  "openPopUp('popUpDetalheExpediente" + _idExp + "',";
            _onclick += "'/pje/Expediente/popup/detalheExpediente.seam?idProcessoParteExpediente=" + _idExp + "',";
            _onclick += "780, 470)";

          var _a = jQ3('<a>', {
            class : 'btn btn-default btn-sm',
            title : 'Abrir expediente',
            onclick : _onclick
          });

          var _i = jQ3('<i>', {
            class : 'fa fa-pencil'
          });

          _div.append(_a);
          _a.append(_i);
          jEl.parents('td').next().find('span').append(_div);
        }

        function _destacarPrazoSeNaoVencidoEAdicionarSeletoresDeExpedienteJ2(){
          function _converterParaISO(dataHora) {
            const [dia, mes, ano, horas, minutos, segundos] = dataHora.split(/\/|:|\s/);
            //const dataISO = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}Z`;
            const dataISO = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
            return dataISO;
          }
          function _extrairDataHora(html) {
            const regex = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/g;
            let match;
            match = regex.exec(html)
            let [dataHora] = match;
            
            return dataHora;
          }

          var EstaVencido = false
          var $h6Data = $tr.find('td:nth-child(2) > span:first h6:first')
          if( $h6Data.text().length ){

          var data = _extrairDataHora($h6Data.text())
          var dataISO = _converterParaISO(data)
          var jsData = new Date(dataISO)
          var jsAgora = new Date()
          EstaVencido = jsAgora > jsData
          
          if(! EstaVencido)
            $tr.find('td:nth-child(2) > span:first h6').addClass('text-success')
          }

          //Seletor
          if(!(j2E?.env?.urlParms?.j2Expedientes))
            return;

          if( ! $tr.parents('table:first').find('> thead[j2]').length ){
            $tr.parents('table:first').find('> thead').attr('j2', '')
            .find('tr').prepend('<th j2-seletor-expediente></td>')

            $tr.parents('tbody:first').mouseup((ev)=>{
              var $el = jQ3(ev.target)
              if(!$el.is('input[j2-seletor-expediente]'))
                return

              $el.parents('tr:first')[$el.is(':checked') ? 'removeClass' : 'addClass']('info')
              .find('td')[$el.is(':checked') ? 'removeClass' : 'addClass']('info')
            })

            tdPosShift = 1
          }

          var $seletor = jQ3(`<td j2-seletor-expediente><input type="Checkbox" j2-seletor-expediente ${EstaVencido ? '' : 'disabled'}></td>`)
          $tr.prepend($seletor)

          //inserir o lápis
          if(! EstaVencido)
            return
          
          const $alvoEditorData = $tr.find('td h6:first-child:not(.alert-heading)')
          const dataText = $alvoEditorData.text()
          if(!dataText.length) 
            return

          $alvoEditorData.empty()
          
          const $span = jQ3(`<span>${dataText}</span>`)
          $alvoEditorData.append($span)

          const $i = jQ3(`<i j2e-data-i class="fa fa-pencil-alt" style="
              padding-left: 2px;
          "></i>`)

          $alvoEditorData.append($i)
          $i.click(()=>{
            const $input = jQ3(`<input  j2e-data-input class="fa fa-plus" value="${dataText}">`)
            const $plus = jQ3(`<i j2e-data-i j2e-data-i-cmd class="fa fa-plus" style="
              padding-left: 2px;
            "></i>`)
            const $minus = jQ3(`<i j2e-data-i j2e-data-i-cmd class="fa fa-minus" style="
                padding-left: 2px;
            "></i>`)
            const $check = jQ3(`<i j2e-data-i j2e-data-i-cmd class="fa fa-check j2e-i-mp" style="
                padding-left: 2px;
            "></i>`)
            const $times = jQ3(`<i j2e-data-i j2e-data-i-cmd class="fa fa-times" style="
                padding-left: 2px;
            "></i>`)
            
            
            $span.after($input)
            $input.after($plus)
            $plus.after($minus)
            $minus.after($check)
            $check.after($times)
            $span.hide()

            $plus.click(()=>{
               $input.val( _incrementarDecrementarData(true, $input.val()) )
            })
            $minus.click(()=>{
              $input.val( _incrementarDecrementarData(false, $input.val() ) )
            })

            $check.click(()=>{
              $span.text($input.val())

              $alvoEditorData.find('[j2e-data-i-cmd]').remove()
              $input.remove()
              $span.show()
              $i.show()
            })

            $times.click(()=>{
              $alvoEditorData.find('[j2e-data-i-cmd]').remove()
              $input.remove()
              $span.show()
              $i.show()
            })

            $i.hide()
          })

          function _incrementarDecrementarData(incrementaTrueDecrementaFalse, inputDate){
            const dataIsoAlterada = DataComFromatos.incrementarDecrementarDataString(incrementaTrueDecrementaFalse, inputDate)
            const dataPtBrAlterada = DataComFromatos.convertISOToBrazilianDateTime(dataIsoAlterada)

            return dataPtBrAlterada
          }

        }
        
        function _ajustarLayoutExibicaoDocumentoEmIframeDaExtensao(){
          if( ! jQ3('body').is('[j2E="mostrarSoExpedientes"]') )
            return;

          jQ3('body').prepend(jEl.parents('#processoExpedienteTab').find('table:first'));
          jQ3('body').find('div.navbar').hide();
          jQ3('body').css('overflow', 'overlay');
          jQ3('#pageBody').hide();
        }
        
        _adicionarComandoParaFecharOPrazo();
        _destacarPrazoSeNaoVencidoEAdicionarSeletoresDeExpedienteJ2()
        _ajustarLayoutExibicaoDocumentoEmIframeDaExtensao();
      });
      
      (function _adicionarComandoParaVisualizarACertidaoPublicacaoDJEN(_parentThisTable){

        function __iterateDjenItem(items, _parentThisTable){
          for (var i = 0; i < items.length; i++){
            //jQ3('#processoExpedienteTab tr', _parentThisTable).find('tr:contains(' + items[i].id + ')').each(function(idx, el){
            jQ3('td > span:contains(' + items[i].id + ')').each(function(idx, el){
              var $tr = jQ3(el).parents('tr:first');
              if($tr.find('[j2=visualizarCertidaoDJEN]').length)
                return;
              
              var $SpanIdMateria = $tr.find('td:first-child').find('span[title="Id da Matéria"]');


              var _div = jQ3('<div>', {
                class : 'col-sm-12 text-center',
                style : 'margin-top: 5px;',
                j2 : 'visualizarCertidaoDJEN'
              });

              var _onclick =  "openPopUp('visualizarCertidaoDJEN" + items[i].id + "',";
                _onclick += "'https://comunicaapi.pje.jus.br/api/v1/comunicacao/" + items[i].hash + "/certidao',";
                _onclick += "940, 740)";

              var _a = jQ3('<a>', {
                class : 'btn btn-default btn-sm',
                title : 'Abrir certidão DJEN',
                onclick : _onclick
              });

              var _i = jQ3('<i>', {
                class : 'fa fa-newspaper-o'
              });

              _div.append(_a);
              _a.append(_i);
              $tr.find(`td:nth-child(${3 + tdPosShift})`).append(_div);
              $tr.find(`td:nth-child(${1 + tdPosShift}) > span > div > span`).append(`<br>Disponibilizado em: ${items[i].datadisponibilizacao}`)
              
              const pubDataISO = j2E.mods.Calendario.contarPrazo(new Date(`${items[i].data_disponibilizacao}T00:00:00.000-03:00`), 1)
              const pubData = pubDataISO.split('-').reverse().join('/')
              $tr.find(`td:nth-child(${1 + tdPosShift}) > span > div > span`).append(`<br>Publicado em: ${pubData}`)



              if ( $tr.find(`td:nth-child(${2 + tdPosShift}) > span > div:first`).text().length && ( $tr.find(`td:nth-child(${1 + tdPosShift}) > span > div:first`).text().toLowerCase().includes('o sistema registrou ciência')  ) )
                return;

              let _parsePrazo = $tr.find(`td:nth-child(${1 + tdPosShift})`).text().split('Prazo: ')[1].split(' dias')
              
              if( isNaN(_parsePrazo[0] ) )
                return;
              
              let dias = _parsePrazo[0]
              const prazoVencimentoIso = j2E.mods.Calendario.contarPrazo(new Date(`${pubDataISO}T00:00:00.000-03:00`), dias)
              const prazoVencimento = prazoVencimentoIso.split('-').reverse().join('/')

              /*if( ! (new Date() > new Date(`${pubDataISO}T23:59:59.000-03:00`) ) )
                return;*/



              const htmlTemplate = `<span id="processoParteExpedienteMenuGridList:2:j_id883"><div id="processoParteExpedienteMenuGridList:2:j_id883:infoPPE"><span id="processoParteExpedienteMenuGridList:2:j_id883:j_id884"><div id="r" class="text-center" style="
              "><h6 style="
                  color: #a94442;
              ">${prazoVencimento} 23:59:59</h6><h6></h6><h6><span title="Data limite prevista para manifestação" style="
                  color: #a94442;
              ">(para manifestação)</span></h6></div></span></div></span>`;

              $tr.find(`td:nth-child(${2 + tdPosShift})`).append(htmlTemplate);
            });
          }
        }
        
        var proc = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
        proc = proc.replace('.', '');        
        
        var items = lockrSes.get('DJEN.' + proc, { noData : true });
        
        if (items.noData){
          var ____parentThisTable = _parentThisTable;
          jQ3.getJSON('https://comunicaapi.pje.jus.br/api/v1/comunicacao?numeroProcesso=' + proc, function(djenData){
            if ( ! (djenData.status === 'success' && djenData.status !== 0) )
              return;
            
            lockrSes.set('DJEN.' + proc, djenData.items);  
            __iterateDjenItem( djenData.items, ____parentThisTable );
          });
        }else
          __iterateDjenItem(items, _parentThisTable);
      })(_parentThisTable);
      
      jQ3.initialize('#processoExpedienteTab h5', function(){
        var $this = jQ3(this);
        var ___TEMPLATE___ = '<ul j2Calendar class="nav nav-pills btn-documento pull-right" style="margin-top:-10px"><li><a id="processoExpedienteTab:calendar" href="#" title="Abrir calendário j2" onclick=""><i class="fa fa-calendar-alt" aria-hidden="true" style="font-size:1.2em"></i><span class="sr-only">Ícone calendário</span></a></li></ul>';
        
        if($this.find('[j2Calendar]').length !== 0)
          return;
        
        $this.append(___TEMPLATE___);
        
        $this.find('a').click( __abrirCalendarioJ2 );
      });
      
      jQ3.initialize('div#detalheDocumento\\:toolbarDocumento > div:last-child', function(){
        var $this = jQ3(this);
        
        var $li = $this.find('li:not([role])').last();
        var $liC = $li.clone(false, false);
        
        $liC.find('a').attr('onclick', '');
        $liC = jQ3( $liC.prop('outerHTML') );
        
        $liC.find('script').remove();
        
        $liC.find('i').removeClass()
                      .addClass('fa fa-file-pdf')
                      .css('font-size', '1.2em');
        
        $liC.find('a').click(__pdfDownloadAction)
                      .attr('onclick', '')
                      .attr('title', 'Download PDF simples');
        
        $liC.find('span').text('Ícone de PDF');
                
        $li.parent().append( $liC );

      }, { target : this } );

    });
  };

  window.__abrirCalendarioJ2 = function(){
    //var j2EOpW = {
    //  center : function(url, name, idProcesso, winSize, scrolled, callback, altTitle){ // wa
    //function addScript(name, _doc){
    //function addStyleSheet(name, _doc){
    
    screen.width * 0.6;
    var h = screen.height * 0.6;
    
    j2EOpW.center('', 'j2Calendar' + guid(), null, { width : screen.width * 0.7, height : screen.height * 0.65}, null, function(win){
      win.document.body.innerHTML = '<div id="j2Calendar"></div>';
      
      addScript('Extensao/jquery3.js', win.document);
      addStyleSheet('Extensao/evo-calendar/css/evo-calendar.css', win.document);
      addStyleSheet('Extensao/evo-calendar/css/evo-calendar.royal-navy.css', win.document);
      addScript('Extensao/evo-calendar/js/evo-calendar.js', win.document);
      
      function ___check(){
        if(   win.document.readyState === 'complete' 
           && win.document.getElementById('Extensao/evo-calendar/js/evo-calendar.js') 
           && win.document.getElementById('Extensao/evo-calendar/js/evo-calendar.js').getAttribute('evo-calendar-ready')
          ){ 
          addScript('Extensao/evo-calendar/booter.js', win.document);
        }else
          setTimeout(___check, 10);
      };
      ___check();
      
    }, 'j2Calendário');
    
  }
/*    jQ3(document.body).observe('childlist', 'table', function(rec){
        debugger;
      });
  jQ3('form#formDetalheProcessoTarefasDoProcesso').observe('childlist', 'table', function(rec){
        debugger;
      });*/
  function observeFormDetalheProcessoTarefasDoProcesso(){
    jQ3.initialize('form#formDetalheProcessoTarefasDoProcesso', function(){
    /*  jQ3(this).observe('childlist', 'table', function(rec){
        debugger;
      });*/
      jQ3.initialize('tr', function(){
        var jTr = jQ3(this);
        
        var a = jTr.find('a');
        
        var tarf = a.text();
        var tarfProps = TarefasProps[tarf];
        if(!(tarfProps && tarfProps.altNome))
          return;
        
        var jTBodyC;
        var jTableParFirst = jTr.parents('table:first');
        if( jTableParFirst.find('tbody').length === 1 ){
          jTBodyC = jTr.parents('table:first').find('tbody').clone(true);
          jTBodyC.empty();
          jTBodyC.attr('j2e', 'altNomeTarefaTBody');
          jTBodyC.attr('id', 'j2AltNomeTBody');
          jTableParFirst.append(jTBodyC);
        }else
          jTBodyC = jTableParFirst.find('tbody:last');
        
        var jTrC = jTr.clone(true);
        jTBodyC.append( jTrC );
        jTrC.find('a').attr('j2E', 'altNomeTarefaA').addClass('tarfOrgOpacidade');
      
      },{ target: this });
      
      jQ3.initialize('a:not([j2-altered])', function(){
        var _this = jQ3(this);
        
        var aOuterHTML = this.outerHTML;
        var textNomeTarefa = _this.text();
        var proc = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
        var _atch = "window.j2Action = { j2 : true, action : 'abrirAutomaticoTarefa', processo : '$', tarefa : '$'};".replace('$', proc).replace('$', textNomeTarefa);

        const URL_DE_UMA_TAREFA_DO_PROCESSO_FRONTEND = __prepararLinkTarefa(textNomeTarefa, {
          competencia: "",
          etiquetas:[],
          numeroProcesso: proc.replace(/(-|\.)/g, '')
        })

        var aLeft = aOuterHTML.split('onclick="');
        var aRight = aLeft[1].split('"');
        var _onclick = aRight[0].toString().split("'");          
        _onclick[3] = URL_DE_UMA_TAREFA_DO_PROCESSO_FRONTEND;
        _onclick = _onclick.join("'") +'';
        //_onclick = _atch + _onclick;
        

        aRight[0] = _onclick;
        aLeft[1] = aRight.join('"');
        aOuterHTML = aLeft.join('onclick="');

        var _a = jQ3(aOuterHTML);
        _a.attr('j2-altered', 'true');
        _this.replaceWith(_a);      
        
        if(_this.is('[j2E]'))
          return;
        
        var tarf = _a.text();
        var tarfProps = TarefasProps[tarf];
        if(tarfProps && tarfProps.altNome)
          _a.text( tarfProps.altNome ) ;
          _a.attr( 'title', 'Tarefa alternativa para ' + tarf );
        
      },{ target: this });
    });
  };

  function encaminharAbrirTarefa(){
    //debugger;
    if(window.location.pathname !== '/pje/ng2/dev.seam')	
      return;
    if(!(window.location.search.length))
      return;     
    if(!(j2E.env.urlParms.j2pseudotarefaMovimentar))
      return;     
    
 /*   var _act;
    if( ! (j2E.env.urlParms.action) ){
      var _j2lockr = JSON.parse( lockr.get(window.location.search.substr(1) ) || '{"isNotValid":true}' );
      if(_j2lockr.isNotValid )
        return;

      lockr.rm(window.location.search.substr(1));
      _act = _j2lockr;
    }else{
      _act = JSON.parse(atob(j2E.env.urlParms.action ));
    }
      
    switch(_act.action){
      case 'abrirAutomaticoTarefa':*/
        var _load = {
          fowarded : true,
          task : 'fowardAction',
          j2 : true,
          j2pseudotarefaMovimentar : j2E.env.urlParms.j2pseudotarefaMovimentar,
          origin: window.location.origin,
          pathname: window.location.pathname,
          j2Action : {
            action: 'abrirAutomaticoTarefa',
            j2pseudotarefaMovimentar : j2E.env.urlParms.j2pseudotarefaMovimentar,
          }
        };
        console.log('dispatching to https://frontend.prd.cnj.cloud');
        console.log(_load);
        jQ3('iframe#ngFrame').on("load", function(){
          jQ3('iframe#ngFrame').get(0).contentWindow.postMessage(_load, 'https://frontend.prd.cnj.cloud');
        });
        console.log('dispatched');

      /*  break;
    }*/
  }
  
  function verificarSePaginaDeuErro(){
    var obs = jQ3.initialize('ul.alert.alert-danger', function(){
      lg('verificarSePaginaDeuErro', 'inialized :', (new Date()).getTime());
      
      if( jQ3(this).find('li:contains("Erro inesperado, por favor tente novamente")').length ){
        var j2Action = {
          origin: window.location.origin,
          pathname: window.location.pathname,
            j2 : true,
            action : 'recarregarFrameTrefa'
        };
        __sendMessageToFrotEnd( j2Action);
      }
    });
    
    window.addEventListener("load", function(a, b, c, d){
      lg('verificarSePaginaDeuErro', 'window load :', (new Date()).getTime() );     
      setTimeout(function(){obs.disconnect();}, 1000);
    });
  }
  
  function verificarSePaginaExpirou(){
    jQ3.initialize('dt.alert.alert-info', function(){
      lg('verificarSePaginaExpirou', 'inialized :', (new Date()).getTime());
      
      if( jQ3(this).find('span:contains("Sua página expirou, por favor tente novamente.")').length ){
        var _load = {
          fowarded : true,
          task : 'fowardAction',
          j2 : true,
          origin: window.location.origin,
          pathname: window.location.pathname,
          j2Action : {
            j2 : true,
            action : 'recarregarFrameTrefa'
          }
        };
        __sendMessageToFrotEnd( _load);
      }
    });
    /*
    window.addEventListener("load", function(a, b, c, d){
      lg('verificarSePaginaDeuErro', 'window load :', new Date().getTime() );     
      setTimeout(function(){obs.disconnect();}, 1000);
    });*/
  }

  function __sendMessageToOpener(load){
    if(!(load.j2)) 
      load.j2 = true;
    if(!(load.pathname)) 
      load.pathname = window.location.pathname;
    if(!(load.origin)) 
      load.origin = window.location.origin;

    const openerOrigin = window.opener?.location?.origin
            
    lg('https://pje.tjma.jus.br sending message to opener ' + window.opener?.location?.origin + ':', load );  

    window.opener.postMessage( load, openerOrigin );
  }

  function __sendMessageToFrotEnd(load, iframe){
    if(!(load.j2)) 
      load.j2 = true;
    if(!(load.pathname)) 
      load.pathname = window.location.pathname;
    if(!(load.origin)) 
      load.origin = window.location.origin;
            
    lg('https://pje.tjma.jus.br sending message to ' + ( load.runtimeRequest ? load.orgRequest.domain.from : 'https://frontend.prd.cnj.cloud') + ':', load );  
    
    if (load.runtimeRequest){
      load.domain = {
        to : load.orgRequest.domain.from,
        from : load.orgRequest.domain.to
      };
      
      j2E.conn.port.postMessage(load);
    }else if(!(iframe))
      window.parent.postMessage( load,'https://frontend.prd.cnj.cloud');
    else 
      jQ3(iframe).prop('contentWindow').postMessage(load, 'https://frontend.prd.cnj.cloud');
  }

  function __sendMessageToServiceWorder(load, responseCallback){
    if(!(load.j2)) 
      load.j2 = true;
    if(!(load.pathname)) 
      load.pathname = window.location.pathname;
    if(!(load.origin)) 
      load.origin = window.location.origin;

            
    lg('https://pje.tjma.jus.br sending message to Service Workder', load );  

    // Envia uma mensagem para o Service Worker
    chrome.runtime.sendMessage( load, responseCallback || void 0 );
  }

  
  function requisitarDadosSeTarefaEPersonalisar(){	
    if(! window.location.pathname.match(/error\.seam|movimentar\.seam/))	
      return;	
    
    const TAREFA_VAZIA = 0
    var idProc = j2E.env.urlParms.idProcesso,	
        idTask = j2E.env.urlParms.newTaskId;	

    if( typeof idTask !== 'undefined' && idTask != TAREFA_VAZIA )
      j2EPJeRest.tarefas.descricaoNoFluxo(idTask, idProc, function(data){	
        personalizarTarefa(data);	
      });	
    else{
      j2E.env.urlParms.idProcesso = j2E.env.cargaHash._tarfData.idProcesso
      j2E.env.urlParms.newTaskId = 0

      TarefasProps.getPseudotarefas(
        ()=> personalizarTarefa( [j2E.env.cargaHash.pseudoTarefaNome] )
      )
    }
  }
  

  function observeHistoricoTarefasEPrepararAtalhos(){
    var ___A_TEMPLATE___ = '<a href="#" j2-tarefa j2e="menuNoHistoricoTarefas" title="$">$<img class="historicoTarefaIconOpen" src="https://pje.tjma.jus.br/pje/img/view.gif"></a>';
    var ___A_NUM_TEMPLATE___ = '<a href="#" j2e="numeroProcessoHistoricoTarefas" title="Abrir processo $">$<img class="historicoTarefaIconOpen" src="https://pje.tjma.jus.br/pje/img/view.gif"></a>';
    
    function _prepararLinkTarefa(nomeTarefa, criterios) {
      const hashAngularTarefaComCriterios = `?j2-abrir-tarefa#/painel-usuario-interno/lista-processos-tarefa/${encodeURI(
        nomeTarefa
      )}/${encodeURIComponent(btoa(JSON.stringify(criterios)))}`
  
      return hashAngularTarefaComCriterios
    }

    function _guidGenerator(){
      return guid ? guid() : new Date().getTime()
    }

    function _openPopUp (id, url, width, height) {    
      if (!width) width = window.screen.availWidth * 0.9;
      if (!height) height = window.screen.availHeight * 0.9;
      var featurePopUp = "width="+width + ", height="+height+", resizable=YES, scrollbars=YES, status=NO, location=NO";
      
      var popUp = window.open(url, id, featurePopUp); popUp.moveTo(0, 0);
                
    };

    jQ3.initialize('form table tbody tr', function(){
      var _aHtml, numProc, title, tarf, text;
      
      var jTr = jQ3(this);
      var nTdTarf = jQ3('<td>', { class : 'rich-table-cell '});
      var nTdNum  = jQ3('<td>', { class : 'rich-table-cell '});
      
      numProc = jTr.find(':first').text().trim();
      
      var tarfs = jTr.find(':nth-child(2)').text().split(',');
      var tarfsA = [];
      var tarfsB = [];
      
      jQ3.each(tarfs, function(idx, tarf){
        var tarfProps = TarefasProps[tarf];
        if(tarfProps && tarfProps.altNome){
          tarfsA.push(tarfProps.altNome);
          tarfsB.push(tarf);
        }else
          tarfsA.push(tarf);
      });      
      
      function makeAltA(tarfName, isOrgAltered){
        var _this = tarfName.trim();
        tarf = _this;
        title = 'Abrir tarefa ' + _this;
        text = _this;
        
        _aHtml = ___A_TEMPLATE___;  
        jQ3.each([title, text], function(){
          _aHtml = _aHtml.replace('$', this);
        });
        
        var a = jQ3(_aHtml);
        nTdTarf.append( a );
        
        isOrgAltered && a.addClass('tarfOrgOpacidade');
      }
      
      jQ3.each(tarfsA, function(){
        makeAltA(this);
      });
      jQ3.each(tarfsB, function(){
        makeAltA(this, true);
      });
      
      nTdTarf.find('a:not(:last-child)').each(function(){
        jQ3('<br>').insertAfter(this);
      });

      nTdTarf.find('[j2-tarefa]').on('click', function (event) {
        let $target = $(event.target)
        if ($target.is('img')) $target = $target.parent()

        const nomeTarefa = $target.text().trim()
        const url =
          window.location.origin +
          '/pje/ng2/dev.seam' +
          _prepararLinkTarefa(nomeTarefa, {
            competencia: '',
            etiquetas: [],
            numeroProcesso: numProc.replace(/\D/g, '')
          })
        _openPopUp(`tarefa-fluxo-${nomeTarefa}-${_guidGenerator()}`, url)
      })
      
      var aNumHTML = ___A_NUM_TEMPLATE___.replaceAll('$', numProc);
      var jANum = jQ3(aNumHTML);
      jANum.click(function(event){
        let idProcesso = 0
        j2EPJeRest.processo.obterIdProcesso(numProc)
        .pipe( _idProcesso=>{
          idProcesso = _idProcesso
          return j2EPJeRest.processo.getChaveAcesso(idProcesso)
        })
        .done( ca=>{
          const url = `https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=${idProcesso}&ca=${ca}`

          if(event.ctrlKey)
            url += "#";
          
          _openPopUp('popPupProcessoId' + idProcesso, url);
        })
        .fail(err=>{
          alert('Erro ao abrir processo.')
        })
      });
      
      nTdNum.append( jANum );
      
      jTr.find(':first').replaceWith(nTdNum);
      jTr.find(':nth-child(2)').replaceWith(nTdTarf);
    });
  }
  
  function personaliazarMenu(){
    jQ3.initialize('nav#menu > div.nivel > ul > li:last-child a[href="/pje/CadastroPerito/listView.seam"]', function(){
      //jQ3(this)
      PJeMenuFactory(window, jQ3);
      
      var custMenu = window.Menu({
        "Menu": [
          {
            "popup": true,
            "itens": [
              {
                "popup": true,
                "itens": [],
                "nome": "Inserir",
                "url": "/pje/publico/usuario/token.seam"
              }
            ],
            "nome": "PJe Token",
            "url": "#"
          }/*,
          {
            "popup": true,
            "itens": [
              {
                "popup": true,
                "itens": [],
                "nome": "Gerenciar pseudo tarefas",
                "url": "javascript: ;"
              }
            ],
            "nome": "Tarefas",
            "url": "#"
          }*/
        ]
      });
      jQ3('nav#menu div.nivel  ul a:contains("Token"):not(".btn-voltar")').prepend('<i class="fa fa-address-card icone-nav"></i>');
      //jQ3('nav#menu div.nivel  ul a:contains("Tarefas"):not(".btn-voltar")').prepend('<i class="fa fa-check-square icone-nav"></i>');
      
      
      /*jQ3('nav#menu div.nivel  ul a:contains("Gerenciar pseudo tarefas"):not(".btn-voltar")').click(function(){
        __sendMessageToFrotEnd({
          action : 'abrirPainelPseudoTarefas'
        }, '#ngFrame'); 
        custMenu.menuNavegacao.fecharMenu();
      });*/
      
    });
  }
  
  function personalizarTelefonesDasPartes(){
    jQ3.initialize('div#meioContatoPessoaGridList', function(){
      debugger;
    });
    
    
    function createLinkWhatsApp(tel, preTx){ // lwapac
      var imgViewCln = jQ3('<img id="ReferenciaDocumento.View" src="https://pje.tjma.jus.br/pje/img/view.gif" style="vertical-align: bottom;">')[0];

      imgViewCln.setAttribute('mce_style', '');
      imgViewCln.style.height = '16px';
      imgViewCln.style.verticalAlign = 'text-bottom';

      var spn = document.createElement('span');
      var u = document.createElement('u');
      spn.style.cursor = 'pointer';
      spn.title = 'abrir conversa whatsapp com telefone' + tel;
      spn.setAttribute('contenteditable', false);
      u.innerHTML = ((typeof preTx !== 'undefinied') ? preTx : 'WhatsApp ') + tel; // lwapac


      var spnBs = document.createElement('span');
      spnBs.innerHTML = '&nbsp;';

      var telWA = tel.replace(/\D/g, "");

      //var telURL = 'https://web.whatsapp.com/send?phone=55' + telWA +'&text=' + x +'&app_absent=0'; // wa
      var telURL = 'https://web.whatsapp.com/send?phone=55' + telWA; // wa

      var oCSrc = "var _e = document.getElementById('SDLinkedElementwhatsAppMessages');\n"; //wa
      oCSrc +=    "var _b = '" + telURL + "';\n"; //wa
      oCSrc +=    "var __wT = (_e) ?  '&text=' + encodeURI(_e.innerText)  : '' ;\n"; //wa
      oCSrc +=    "var _url = _b + ( (__wT.length !== 0) ? __wT : '') ;\n";
      //oCSrc +=    "debugger;\n"; //wa
      oCSrc +=    "window.console.log('WA message enconded: ' + encodeURI(__wT) )\n"; //wa
      oCSrc +=    "window.open( _url, 'conversaWhatsAppPopUp', 'width=940, height=740, scrollbars=yes').focus();"; // wa

      spn.setAttribute('onclick', oCSrc);
      imgViewCln.setAttribute('onclick', oCSrc);

      spn.appendChild( u );
      u.appendChild( imgViewCln );

      return spn;
    }
    
    jQ3('table#meioContatoPessoaGridList span div.col-sm-12').filter(function(){
      return jQ3(this).text().match(/[(][0-9]{2}[)]([0-9]{4}|[0-9]{5})\-[0-9]{4}/) !== null;
    }).each(function(){
      var jT = jQ3(this);
        jT.append( ' | ' );
        jT.append( createLinkWhatsApp( jT.text() , 'WhatsApp ') );
    });
    
    jQ3('form#pessoaFisicaViewView div.propertyView:contains("celular") div.col-sm-12').filter(function(){
      return jQ3(this).text().match(/([0-9]{8}|[0-9]{9})/) !== null;
    }).each(function(){
      var jT = jQ3(this);
        jT.append( ' | ' );
        jT.append( createLinkWhatsApp( '(99)' + jT.text() , 'WhatsApp ') );
    });
  }
  
  function mostrarEtiquetasNosAutosDigitais(){
    jQ3.initialize('form#divTimeLine div.pesquisa.affix-top div.input-group', function(){
      var __ETQ_TEMPLATE__ = '<div _ngcontent-tnv-c13 class="label label-info label-etiqueta ng-star-inserted j2EtiquetaEstilo"><span _ngcontent-tnv-c13 >$</span></div>'
      var _divEtiq = jQ3('<div j2e-etiquetas-processo>'); 
      var _this = this;
      var proc = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
      
      /*var __query = {
        nome : (
          jQ3('#formDetalheProcessoTarefasDoProcesso a:first').text() 
          || 
          jQ3('#formDetalheProcessoTarefasDoProcesso div:first').text()
        ).trim() 
      };*/
      var __query = {
        nome : (function(){
          var _t = jQ3('#formDetalheProcessoTarefasDoProcesso #j2AltNomeTBody a:first').text();
          if(_t.length)
            return _t.trim();
          
          return (
            jQ3('#formDetalheProcessoTarefasDoProcesso a:first').text() 
            || 
            jQ3('#formDetalheProcessoTarefasDoProcesso div:first').text()
          ).trim(); 
        })() 
      };
      
      proc = proc.match(/\d+/g).toString();
      
      function __append(){
        _divEtiq.insertBefore(_this);
        jQ3('#divTimeLine\\:divEventosTimeLine').css('margin-top', jQ3(_this).parent().height() + 20 );
      }
      
      j2EQueryDadosTarefaDoProcesso(__query, proc, function(data){
        
        if( data.count === 0 ){
          _divEtiq.append('O processo está fora da visibilidade de seu perfil. Não é possível exibir suas etiquetas');
          __append();
          return;
        }
        
        if( ! (data.entities[0].tagsProcessoList) )
          return;
        
        jQ3.each( data.entities[0].tagsProcessoList, function(){
          _divEtiq.append(__ETQ_TEMPLATE__.replace('$', this.nomeTag));
        });
        
        __append();
      });
    });
  }
  
  function observeSeEModeloJ2(){
    jQ3.initialize('div#modeloBooterBody > button#booter', function(){
      addScript('PJeModelos/rootExtensao.js');
      
      var ___BUT_TEMPLATE___ = '<button id="booterAlt" onclick="RUN(event);" style="font-size: 15px; cursor: pointer; height: 50px; width: 300px; font-weight: bold; min-height: 50px;"> Carregar Modelo </button>';
      /*var $this = jQ3(this);
      $this.removeAttr('onclick');
      
      
            
      var $repBut = jQ3( $this.prop('outerHTML') );
      $repBut.attr('id', 'booterAlt');
      $repBut.attr('onclick', "alert('its done')");*/
      
      /*$repBut.click(function(ev){
        alert('its done');
        ev.preventDefault();
      });*/
      
      this.replaceWith(jQ3(___BUT_TEMPLATE___)[0]);
      
      
    });
  }
  
  function adHoc1(){
    jQ3.initialize('#consultaProcessoRetificacaoAutuacaoGridList\\:0\\:j_id217\\:j_id218\\:j_id220', function(){
      var a = jQ3(this);
      var sp = a.attr('href').split('=');

      sp[sp.length - 1] = 'assunto';
      a.attr('href', sp.join('=') );
    });
  }
  
  function inserirModeloTermoReclamacao(){
    jQ3.initialize('div.conteudo', function(){
      jQ3.initialize('#editorAnexar iframe', function(){
        var $iframe = jQ3(this);
        
        $iframe.on("load", function(){
          if( $iframe.contents().find('#j2Exp').length )
            return;
          
          jQ3.get(chrome.runtime.getURL("/Extensao/t/termoReclamacaoFrame.html"), function(data, status, xqhr){
            var $doc = jQ3('<div>').html(data);

            $iframe.contents().find('body').html( $doc.find('#modeloBooterBody') );
            
            $doc.find('script').each(function(idx, el){
              if(el.src)
                addScript( jQ3(el).attr('srcb'),  jQuery('iframe').contents()[0]);
              else
                $iframe.contents().find('head').append( el );
            });
            
            

          });
        });
        
        
        
        //jQ3(this).attr('src', chrome.runtime.getURL("") );
      /*  addScript('PJeModelos/rootExtensao.js');

        var ___BUT_TEMPLATE___ = '<button id="booterAlt" onclick="RUN(event);" style="font-size: 15px; cursor: pointer; height: 50px; width: 300px; font-weight: bold; min-height: 50px;"> Carregar Modelo </button>';

        this.replaceWith(jQ3(___BUT_TEMPLATE___)[0]);

        */
       console.error('.conteudo #editorAnexar');
      }, { target : this});
    });
  }

  function destacarNomeUnidade(){
    jQ3.initialize('li.menu-usuario small', function(){
      var $this = jQ3(this)
      var text = $this.text().split(' / ')[0]
      jQ3('.titulo').text( text )
    })
  }
  
  function personalizarUpdateRetificacaoAutuacao(){
    jQ3.initialize('[title="Paginador"]', function(){
      var a = jQ3(this);
      var sp = a.attr('onclick').split('/');
      var sp2 = sp[5].split('.');
      
      sp2[0] = 'listAutosDigitais';
      sp[5] = sp2.join('.');
      a.attr('onclick', sp.join('/') );
    });
  }



  
  function fazerAjustesExibicaoPseudotarefaMovimentar(){
    jQ3('nav#barraSuperiorPrincipal').hide();
    jQ3('div#pageBody').attr('style', "transform:unset");
    jQ3('iframe#ngFrame').attr('style', "top:unset;height:calc(100vh - 0px)");
    /*jQ3('iframe#ngFrame').css('top', '');
    jQ3('iframe#ngFrame').css('height', 'calc(100vh - -7px)');*/
  }

  function preparComandoDeEtiquetagem(){
    var delayCall = new DelayedCall(150, 250);
    jQ3.initialize('#consultaPrazosListDataTablePanel_header', function(){
      var $this = jQ3(this);
      var ___TEMPLATE___ = '<ul j2-expedientes class="nav nav-pills btn-documento pull-right" style="margin-top:-10px"><li><a id="processoExpedienteTab:etiquetar" href="#" title="Etiquetar processos" onclick=""><i class="fa fa-tag" aria-hidden="true" style="font-size:1.2em"></i><span class="sr-only">Ícone Etiqueta</span><span style="font-size: 9pt;"> Etiquetar "Expediente fechado"</span></a></li></ul>';
      
      if($this.find('[j2-expedientes]').length !== 0)
        return;
      
      $this.append(___TEMPLATE___);
      
      $this.find('a').click(function(){
        var $tbody = jQ3('#consultaPrazosListDataTable\\:tb');
        var _ = $tbody.text().allMatches(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/);
        if(!(_.length)){
          alert("Nenhum processo para etiquetar.");
          return;
        }

        jQ3('tr', $tbody).each(function(){
          var $tr = jQ3(this)

          var num =  $tr.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/);
          if(!(num))
            return;
          num = num[0];

          var $a = $tr.find('td:first-child a[title="Autos digitais"]')
          var onclickAttr = $a.attr('onclick');
          var b = onclickAttr.match(/id=[0-9]+&/);
          var idProcesso = b[0].split('=')[1].split('&')[0];

          delayCall(function(_num, _$tr, _idProcesso){
            console.log(_num, _$tr);

            let query = { numeroProcesso : num };
            let setIcon = ico => {
              _$tr.find('td:nth-child(2) div').append(`<i class="fa ${ico}" aria-hidden="true" style="font-size:1.2em"></i>`);
            }

            window.j2EPJeRest.tarefas.painelUsuario(query, data => {
              if(data.length === 0 )
                setIcon('fa-not-equal');
              else
                data.forEach(el => {
                  if ( el.nome.toLowerCase() === 'processo com prazo em curso')
                    window.j2EPJeRest.etiquetas.inserir(_idProcesso, 'Expediente fechado', function(){
                      setIcon('fa-tag');
                    })
                  else
                  setIcon('fa-not-equal');
                });
            }, () => { //sempre dará sucesso
              setIcon('fa-ban');
            })
            
          }, num, $tr, idProcesso);
          
        });
      })
    });
  }

  function destacarPrazoDeSistema(){
    jQ3.initialize('#consultaPrazosListDataTable\\:tb', function(){
      const $this = jQ3(this)

      $this.find('td:nth-child(5)').each(function(idx, td){
        const $td = jQ3(td)
        if($td.text().trim().toLowerCase().match(/sistema/))
          $td.parent().addClass('danger')
      })
    })
  }


  function personalizarAtalhosADireitaAutosDigitais(){
    jQ3.initialize('#navbar\\:ajaxPanelAlerts .icone-menu-abas', function(){
      var $liMenuTracinhos = jQ3(this)

      var $aExibirTarefasProcessoClone = $liMenuTracinhos.find('a#navbar\\:linkExibirTarefaAtualProcesso').clone()
      $aExibirTarefasProcessoClone.text('')
      $aExibirTarefasProcessoClone.attr('title', 'Exibir tarefa atual do processo')
      $aExibirTarefasProcessoClone.append('<i class="fa fa-project-diagram">')
      
      var $newLi = jQ3('<li>').append($aExibirTarefasProcessoClone)

      $liMenuTracinhos.parents('ul.navbar-right').find('li:first').after($newLi)
    })
  }

  function melhorarBotaoMarcarTodosComoLido(){
    jQ3.initialize('input[value="Marcar todos como lidos"]', function(){
      var $this = jQ3(this)
      const idProcesso = parseInt(j2E.env.urlParms.idProcesso)
      const toaster = (a, msg, severity)=> { 
        jQ3.Toast ? jQ3.Toast(a, msg, severity) : alert(`${severity.toUpperCase()}: ${msg}`) 
      }

      $this.click(()=>{
        j2EPJeRest.etiquetas.doProcesso(idProcesso)
        .done(res => {
          const [etiquetaDocNaoLido] = res.filter(t=> t.nomeTag.toLowerCase() === 'documento não lido')
          if(etiquetaDocNaoLido)
            j2EPJeRest.etiquetas.remover(idProcesso, etiquetaDocNaoLido.id)
            .done(()=>{
            toaster("Autos Digitais", `Etiqueta "Documento não lido" removida.`, "success") 
            
            if( j2E.env.urlParms.j2 !== 'fixarAutos' )
              return

            const j2Action = {
              action : 'triggerEventToFrontend',
              evento : {
                tipo : `on-remover-etiqueta-via-autos-digitais`,
                argumentos : { 
                  origem: 'autos digistais com sentinela',
                  idProcesso: idProcesso,
                  idTag: etiquetaDocNaoLido.id,
                  etiquetaInst: etiquetaDocNaoLido,
                  numeroUnico:  jQ3('a.titulo-topo.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)?.at(0),
                  idTask: j2E.env.urlParms?.idTaskInstance || 0,
                  tipo : 'informa a remoção de etiqueta pelo comando de marcar leitura'
                }
              }
            }
            __sendMessageToOpener(j2Action)  
          })
        })
      })
    })
  }

  function preparComandoDeEtiquetagemDeAnaliseJuntada(){
    var delayCall = new DelayedCall(150, 250);
    jQ3.initialize('#processoDocumentoNaoLidoDiv .rich-stglpanel-body table.rich-table', function(){
      var $this = jQ3(this);
      var $this = $this.parents('.rich-stglpanel-body');

      var ___TEMPLATE___ = `<ul j2-analise-juntada class="nav nav-pills btn-documento pull-right" style="margin-top:-10px">
        <li>
          <a style="display: flex;">
            <i class="fa fa-hashtag" aria-hidden="true" style="font-size:1.2em"></i>
            <input type="text" value="0, 1, 2" style="height: 1.2em;width: 73px;text-align: center;" id="j2-etiqueta-digito-filter">
          </a>
        </li>
        <li>
          <a id="j2-etiquetar" href="#" title="Etiquetar processos" onclick="">
            <i class="fa fa-tag" aria-hidden="true" style="font-size:1.2em"></i>
            <span class="sr-only">Ícone Etiqueta</span>
            <span style="font-size: 9pt;"> Etiquetar "Documento não lido"</span>
          </a>
        </li>
      </ul>`;
      
      if($this.find('[j2-analise-juntada]').length !== 0)
        return;
      
      $this.prepend(___TEMPLATE___);
      
      $this.find('a#j2-etiquetar').click(function(){
        
        var $tbody = $this.find('table.rich-table tbody') 
        var _ = $tbody.text().allMatches(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/);
        if(!(_.length)){
          alert("Nenhum processo para etiquetar.");
          return;
        }

        var digitos = $this.find('#j2-etiqueta-digito-filter').val().match(/\d/g);
        if(!(digitos.length)){
          alert("Nenhum dígito final foi informado.");
          return;
        }

        jQ3('tr', $tbody).each(function(){
          var $tr = jQ3(this)

          var num =  $tr.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/);
          if(!(num))
            return;
          num = num[0];

          if( ! digitos.includes( num.substring(8,9)) ) 
            return;

          var $a = $tr.find('a[title="Autos digitais"]')
          var attrWithIdProcesso = $a.attr('href');
          var b = attrWithIdProcesso.match(/id=[0-9]+&/);
          var idProcesso = b[0].split('=')[1].split('&')[0];

          delayCall(function(_num, _$tr, _idProcesso){
            console.log(_num, _$tr);

            window.j2EPJeRest.etiquetas.inserir(_idProcesso, 'Documento não lido', function(){
              _$tr.find('td:nth-child(3)').append(`<i class="fa fa-tag" aria-hidden="true" style="font-size: 13px;padding-left: 3px;"></i>`);
            })
            
          }, num, $tr, idProcesso);
          
        });
      })

      $this.find('#j2-etiqueta-digito-filter').change(function(){
        lockr.set('#j2-etiqueta-digito-filter.input.val', { 
          value : jQ3(this).val(),
          expiration : 10 * 1000
        });
      })

      var stVal = lockr.get('#j2-etiqueta-digito-filter.input.val', { noData : true })
      if( typeof stVal.noData === 'undefined') 
        $this.find('#j2-etiqueta-digito-filter').val(stVal.value)
    });

  }

  function autoSelecionarRecursoAutosDigitaisOuProcessarVizualizacaoParaTarefa(){
    if(j2E.env.urlParms.j2Expedientes){
      jQ3('body').addClass('j2-adjViewAutTarefa')
/*
      jQ3.initialize('#navbar', function(){
        jQ3('.navbar.navbar-default.navbar-fixed-top.nav-topo').hide()
      })
      jQ3.initialize('#pageBody', function(){
        jQ3('#pageBody').attr('j2-limitar-autos-digitais', '')
      })*/
    }

    switch(j2E.env.urlParms['j2-auto-selecionar']){
      case 'expedientes':
        jQ3.initialize('#navbar\\:linkAbaExpedientes1', function(){
          jQ3('.navbar.navbar-default.navbar-fixed-top.nav-topo').hide()
          jQ3('#pageBody').attr('j2-limitar-autos-digitais', '')
          //jQ3('body').attr('j2E', "mostrarSoExpedientes")

          !j2E.env.tempData?.autoSelecionadox?.expedientes && defer(()=>this.dispatchEvent(new Event('click')))
          j2E.env.tempData.autoSelecionadox ??={expedientes:true}
        })
        break;
      case 'expedientesModo2':
        jQ3.initialize('#navbar\\:linkAbaExpedientes1', function(){
          
          !j2E.env.tempData?.autoSelecionadox?.expedientes && defer(()=>this.dispatchEvent(new Event('click')))
          j2E.env.tempData.autoSelecionadox ??={expedientes:true}
        })
        break;
    }
  }

  function criarEditorEtiquetasPelosAutosDigitais(){
    function ___unaccent(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    function ___normalizeString(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, ""); // Remove caracteres não alfanuméricos
    }
    function ___idFrom$el($el){
      try {
        return $el.attr('id').match(/\d/g).join('')
      } catch (error) {
        return -1
      }            
    }
    const toaster = (title, msg, severity)=> { 
      jQ3.Toast ? jQ3.Toast(title, msg, severity) : alert(`${severity.toUpperCase()}: ${msg}`) 
    }
    const ___personalizar$Badge = $badge =>{
      $badge.j2E = {
        inc: ()=> {
          let val = parseInt($badge.text().trim())
          val++
          $badge.text(val)
        },
        dec: ()=> {
          let val = parseInt($badge.text().trim())
          val--
          $badge.text(val)
        },
        equals: (val)=>{
          return val === parseInt($badge.text().trim())
        }
      }
    }

    function ___enviarEventoDeRemocaoDeEtiquetaAoOpener({
      idProcesso, 
      idTag, 
      etiquetaInst, 
      idTaskInstance,
      numeroUnico
    }){
      if( j2E.env.urlParms.j2 !== 'fixarAutos' )
        return

      const j2Action = {
        action : 'triggerEventToFrontend',
        evento : {
          tipo : `on-remover-etiqueta-via-autos-digitais`,
          argumentos : { 
            origem: 'autos digistais com sentinela',
            idProcesso,
            idTag,
            etiquetaInst,
            numeroUnico,
            idTask: idTaskInstance || 0,
            tipo : 'informa a remoção de etiqueta pelo comando de marcar leitura'
          }
        }
      }
      __sendMessageToOpener(j2Action)  
    }

    const TEMPLATE_EMPTY = /*html*/`
      <li class="dropdown drop-menu menu-alertas">
          <a href="#" class="btn-alertas dropdown-toggle" title="Etiquetas do processo" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
              <i class="fa fa-tag"></i>
              <span class="sr-only">Ícone de etiquetas</span>
              <span class="badge">0</span>
          </a>
          <ul class="dropdown-menu">
              <li class="menu-titulo">Etiquetas</li>
              <li class="menu-conteudo">
                  <ul></ul>
              </li>
          </ul>
      </li>
    `

    const BTN_ADD_ETIQUETA = /*html*/`
      <a class="btn btn-default btn-sm j2-tbn-add-etiqueta" title="Inserir etiqueta">
        <i class="fa fa-tag mr-5"></i>
        <i class="fa fa-plus mr-5"></i>
      </a>
    `

    const TEMPLATE_DROP_DOWN_LI = /*html*/`
      <li class="menu-conteudo j2-add-etiqueta"></li>
    `
    const TEMPLATE_ETIQUETAS_CONTAINER = /*html*/`   
      <div class="value col-sm-12">
        <input id="j2-etq-pesquisar" type="text" class="" maxlength="255" placeholder="Pesquisar etiqueta">
      </div>
      <div class="j2-container-etiquetas">
        <table class="rich-table clearfix" border="0" cellpadding="0" cellspacing="0" style="overflow-y: auto;">
          <thead class="rich-table-thead">
            <tr class="rich-table-subheader"></tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
    
    `

    jQ3.initialize('#navbar\\:ajaxPanelAlerts ul.navbar-right', function(){
      const $thisNavBarRight = jQ3(this)
      jQ3.initialize('li.menu-alertas', function(){

        const $_thisMenuAlertas = jQ3(this)
        if(!$_thisMenuAlertas.find('.fa-tag').length) return
        
        const $containerEtiquetas = $_thisMenuAlertas.find('.menu-conteudo')
        const $badge = $_thisMenuAlertas.find('.badge')
        ___personalizar$Badge($badge)
        $containerEtiquetas.prepend(/*html*/`
          <span id="info-nenhuma-etiqueta" style="display:none;">Nenhuma etiqueta vinculada.</span>
        `)
        if($badge.j2E.equals(0))
          $containerEtiquetas.find('#info-nenhuma-etiqueta').show()        
        const idProcesso =  j2E.env.urlParms.idProcesso
        const numeroUnico = jQ3('a.titulo-topo.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)?.at(0)
        const idTaskInstance = j2E.env.urlParms.idTaskInstance

        jQ3.initialize('li.menu-conteudo div.media-body:not(.j2-tag-btn)', function(){
          const $__thisMediaBody = jQ3(this)
          $__thisMediaBody.addClass('btn btn-sm j2-tag-btn  j2-tag-no-pointer')
          $__thisMediaBody.append(/*html*/`
            <div>
              <div>${$__thisMediaBody.text()}</div>
            </div>
            <i class="fa fa-times" j2-tag-i></i>
          `)
          $__thisMediaBody.contents().filter(function() {
            return this.nodeType === 3; // 3 representa o tipo de nó de texto
          }).remove();
        },{ 
          target: $_thisMenuAlertas.get(0)
        })

        const $pai = $_thisMenuAlertas.find('ul.dropdown-menu')

        const $btnAddEtiqueta = jQ3(BTN_ADD_ETIQUETA).click(()=>{

          const $dropLi = jQ3(TEMPLATE_DROP_DOWN_LI).append(j2EUi.spinnerHTML())
          const $container = jQ3(TEMPLATE_ETIQUETAS_CONTAINER)
          const $tbody = $container.find('tbody')
          let etiqDataAr

          $container.find('#j2-etq-pesquisar').on('input', function(){
            const $this = jQ3(this)

            $this.removeClass('j2-danger')

            if($this.val().length < 3 && $this.val().length > 0)
              return

            if( $this.val().length === 0 ){
              ___buildEtiquetasTBody(etiqDataAr)
              return
            }

            const filtro = ___normalizeString($this.val().trim().toLowerCase()); 
            const etqsFiltradass = etiqDataAr.filter(etq => etq.tagNorm.includes(filtro))

            ___buildEtiquetasTBody( etqsFiltradass )
          })

          $container.find('#j2-etq-pesquisar').on('keydown', function($event){
            if ($event.which !== 13)
              return

            $event.preventDefault();

            const $this = jQ3(this)
            const textoEtiqueta = $this.val().trim()

            if(textoEtiqueta.length < 3){
              $this.addClass('j2-danger')
              toaster('Etiquetas', `A etiqueta deve possuir três ou mais caracteres.`, 'error')
              return
            }

            const filtro = ___normalizeString($this.val().trim().toLowerCase()); 
            const etqsFiltradass = etiqDataAr.filter(etq => etq.nomeTag === filtro)

            if(etqsFiltradass.length){
              $this.addClass('j2-danger')
              toaster('Etiquetas', `A etiqueta "${textoEtiqueta}" já existe em sua unidade.`, 'error')
              return
            }

            j2EPJeRest.etiquetas.inserir(idProcesso, textoEtiqueta)
            .done((newEtq)=>{
              $containerEtiquetas.find('ul').append(/*html*/`
                <li id="etiqueta${newEtq.id}">
                  <div class="media-body">
                    <i class="fa fa-tag mr-5" title="${textoEtiqueta}"></i>
                    ${textoEtiqueta}
                  </div>
                </li>
              `);

              newEtq.nomeTagCompleto = newEtq.nomeTag
              newEtq.tagNorm = ___normalizeString(newEtq.nomeTagCompleto.toLowerCase().trim())
              etiqDataAr.push(newEtq)
              etiqDataAr.sort((a, b) => a.tagNorm.localeCompare(b.tagNorm) )

              const htmlElemento = /*html*/`
                <tr class="rich-table-row rich-table-firstrow success">
                  <td class="rich-table-cell">
                    <span><center>
                      <input type="checkbox" id="etq-${newEtq.id}" j2 checked>
                    </center></span>
                  </td>
                  <td class="rich-table-cell">
                    <span>
                      <div class="col-sm-12" j2>${newEtq.nomeTagCompleto}</div>
                    </span>
                  </td>
                </tr>
              `
              $tbody.find('tr:first-child').removeClass('rich-table-firstrow')
              $tbody.prepend(htmlElemento)

              $badge.j2E.inc()
              $containerEtiquetas.find('#info-nenhuma-etiqueta').hide()
              toaster('Etiquetas', `Etiqueta "${textoEtiqueta}" vinculada.`, 'success')
            })
            .fail(err => {
              $input.prop('checked', false)
              toaster('Etiquetas', `Erro ao vincular etiqueta "${textoEtiqueta}".`, 'error')
            })
          })

          $pai.append($dropLi)
          $btnAddEtiqueta.hide(500)

          j2EPJeRest.etiquetas.listarTodas()
          .then(etqsArResp=>{
            etiqDataAr = etqsArResp.map(etq => {
              etq.tagNorm = ___normalizeString(etq.nomeTagCompleto.toLowerCase().trim())
              return etq
            }).sort((a, b) => a.tagNorm.localeCompare(b.tagNorm) )

            ___buildEtiquetasTBody(etiqDataAr)
            
            $dropLi.empty()
            $dropLi.append($container)
          })

          const ___buildEtiquetasTBody =(etqArray)=>{
            let htmlElementos = ''
            etqArray.forEach(etq => {
              htmlElementos += /*html*/`
                <tr class="rich-table-row">
                  <td class="rich-table-cell">
                    <span><center>
                      <input type="checkbox" id="etq-${etq.id}" j2>
                    </center></span>
                  </td>
                  <td class="rich-table-cell">
                    <span>
                      <div class="col-sm-12" j2>${etq.nomeTagCompleto}</div>
                    </span>
                  </td>
                </tr>
            `})

            $tbody.empty()
            $tbody.append(htmlElementos)
            $tbody.find('tr:first-child').addClass('rich-table-firstrow')
            
            const stSelector = $containerEtiquetas.find('li').toArray().map(el => {
              return `#etq-${___idFrom$el(jQ3(el))}`
            }).join(', ')
            $tbody.find(stSelector).each(function(){
              this.checked = true
            })
          }
        })

        $pai.click(($event)=>{
          const $target = jQ3($event.target)
          if((!$target.is( '[j2-tag-i]' )) && (!$target.is('[j2]')))
            return;

          //adição ou exclusão pela tabela de etiquetas
          if($target.is('[j2]')){
            let idEtiqueta = -1
            let textoEtiqueta = ''
            let $input = null
            let acaoAdd = false
            let acaoDel = false

            if($target.is('input')){
              $input = $target
              idEtiqueta = ___idFrom$el($target)
              textoEtiqueta = $target.parents('tr').find('div[j2]').text().trim()
              if($input.is(':checked'))
                acaoAdd = true
              else
                acaoDel = true
            }else if ($target.is('div')){
              $input = $target.parents('tr').find('input')
              idEtiqueta = ___idFrom$el($input)
              textoEtiqueta = $target.text().trim()
              if($input.is(':checked'))
                acaoDel = true
              else
                acaoAdd = true
            }

            if(idEtiqueta === -1)
              return

            //adicionar 
            acaoAdd && j2EPJeRest.etiquetas.inserir(idProcesso, textoEtiqueta)
            .done((newEtq)=>{
              if( newEtq === undefined ){
                toaster('Etiquetas', `A etiqueta "${textoEtiqueta}" já está vinculada.`, 'error')
                return
              }

              $containerEtiquetas.find('ul').append(/*html*/`
                <li id="etiqueta${newEtq.id}">
                  <div class="media-body">
                    <i class="fa fa-tag mr-5" title="${textoEtiqueta}"></i>
                    ${textoEtiqueta}
                  </div>
                </li>
              `)
              $input.prop('checked', true)
              $badge.j2E.inc()
              $containerEtiquetas.find('#info-nenhuma-etiqueta').hide()
              toaster('Etiquetas', `Etiqueta "${textoEtiqueta}" vinculada.`, 'success')
            })
            .fail(err => {
              $input.prop('checked', false)
              toaster('Etiquetas', `Erro ao vincular etiqueta "${textoEtiqueta}".`, 'error')
            })

            //remover
            acaoDel && j2EPJeRest.etiquetas.remover(idProcesso, idEtiqueta)
            .done(()=>{
              $containerEtiquetas.find(`#etiqueta${idEtiqueta}`).remove()
              $input.prop('checked', false)
              $badge.j2E.dec()
              if($badge.j2E.equals(0))
                $containerEtiquetas.find('#info-nenhuma-etiqueta').show()
              toaster('Etiquetas', `Etiqueta "${textoEtiqueta}" desvinculada.`, 'success')
            })
            .fail(err => {
              $input.prop('checked', true)
              toaster('Etiquetas', `Erro ao remover desvincular "${textoEtiqueta}".`, 'error')
            })
          }

          //remoção etiqueta
          if($target.is('[j2-tag-i]')){
            const $tbody = $containerEtiquetas.next().find('tbody')
            const idEtiqueta = ___idFrom$el($target.parents('li:first'))
            const textoEtiqueta = $target.parents('li:first').find('div > div > div').text().trim()
            const $input = $tbody.find(`#etq-${idEtiqueta}`)

            if(idEtiqueta === -1)
              return

            //remover
            j2EPJeRest.etiquetas.remover(idProcesso, idEtiqueta)
            .done(()=>{
              $containerEtiquetas.find(`#etiqueta${idEtiqueta}`).remove()
              $input.prop('checked', false)
              $badge.j2E.dec()
              if($badge.j2E.equals(0))
                $containerEtiquetas.find('#info-nenhuma-etiqueta').show()
              toaster('Etiquetas', `Etiqueta "${textoEtiqueta}" desvinculada.`, 'success')
              ___enviarEventoDeRemocaoDeEtiquetaAoOpener({
                idProcesso: idProcesso,
                idTag: idEtiqueta,
                etiquetaInst: {
                  id: idEtiqueta,
                  idProcesso: idProcesso,
                  tagNome: textoEtiqueta,
                },
                idTaskInstance: idTaskInstance,
                numeroUnico: numeroUnico
              })
            })
            .fail(err => {
              toaster('Etiquetas', `Erro ao remover desvincular "${textoEtiqueta}".`, 'error')
            })
          }
        })

        $containerEtiquetas.addClass('j2-menu-conteudo')
        $_thisMenuAlertas.find('.menu-titulo').prepend($btnAddEtiqueta)
      },{ 
        target: $thisNavBarRight.get(0)
      })

      if(! $thisNavBarRight.find('li.menu-alertas').length)
        $thisNavBarRight.find('li.icone-menu-abas').before(jQ3(TEMPLATE_EMPTY))
    })
  }

  function sinalizarProcessoJulgado(movimentosProcesso){

    const IDS_CLASSES = new Set([436])
    const IDS_MOVIMENTOS_MAGISTRADOS_JULGAMENTO = new Set([3,193,196,198,200,202,208,210,212,214,218,219,220,221,228,230,235,236,237,238,239,240,241,242,244,385,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,471,472,473,853,871,884,900,901,972,973,1042,1043,1044,1045,1046,1047,1048,1049,1050,10953,10961,10964,10965,11009,11373,11374,11375,11376,11377,11378,11379,11380,11381,11394,11396,11401,11402,11403,11404,11405,11406,11407,11408,11409,11411,11795,11796,11801,11876,11877,11878,11879,12028,12032,12033,12034,12041,12184,12187,12252,12253,12254,12256,12257,12258,12298,12319,12321,12322,12323,12324,12325,12326,12327,12328,12329,12330,12331,12433,12434,12435,12436,12437,12438,12439,12440,12441,12442,12443,12450,12451,12452,12453,12458,12459,12475,12615,12616,12617,12649,12650,12651,12652,12653,12654,12660,12661,12662,12663,12664,12665,12666,12667,12668,12669,12670,12672,12673,12674,12675,12676,12677,12678,12679,12680,12681,12682,12683,12684,12685,12686,12687,12688,12689,12690,12691,12692,12693,12694,12695,12696,12697,12698,12699,12700,12701,12702,12703,12704,12705,12706,12707,12708,12709,12710,12711,12712,12713,12714,12715,12716,12717,12718,12719,12720,12721,12722,12723,12724,12735,12738,12792,14092,14099,14210,14211,14213,14214,14215,14216,14217,14218,14219,14680,14777,14778,14848,14937,15022,15023,15024,15026,15027,15028,15029,15030,15165,15166,15185,15211,15212,15213,15214,15245,15249,15250,15251,15252,15253,15254,15255,15256,15257,15258,15259,15260,15261,15262,15263,15264,15265,15266])

    jQ3.initialize('#maisDetalhes > dl > dd:first-of-type', async function(){
      const $this = jQ3(this)
      const idClass = $this.text().match(/\((\d+)\)/)?.at(1)

      if(!IDS_CLASSES.has(parseInt(idClass)))
        return

      const temElementoEmComum = movimentosProcesso.some(codMov =>
        IDS_MOVIMENTOS_MAGISTRADOS_JULGAMENTO.has(parseInt(codMov.codEvento))
      )
      
      temElementoEmComum && jQ3('#navbar\\:ajaxPanelAlerts ul.navbar-left').append(/*html*/`
        <li>
          <div title="Processo de classe judicial com julgamento proferido" style="padding-top: 15px; padding-right: 15px;color:#fff;padding-left: 10px;">
            <i class="fa fa-gavel" ></i>
          </div>
        </li>
      `)
      
    })
  }

  function destacarOsAtosDoMagistrado(movimentosProcesso){
    const IDS_MOVIMENTOS_MAGISTRADOS_SET = new Set([
      3, 7, 11, 25, 56, 63, 83, 108, 113, 117, 122, 128, 133, 138, 146, 151, 157, 160, 163, 172, 175,
      190, 193, 196, 198, 200, 202, 206, 207, 208, 210, 212, 214, 218, 219, 220, 221, 228, 230, 235,
      236, 237, 238, 239, 240, 241, 242, 244, 263, 264, 265, 266, 268, 269, 270, 271, 272, 275, 276,
      277, 278, 279, 332, 334, 335, 339, 347, 348, 349, 352, 353, 354, 355, 357, 358, 371, 373, 374,
      377, 378, 381, 383, 385, 388, 389, 390, 391, 392, 393, 394, 399, 400, 402, 404, 429, 430, 431,
      432, 433, 434, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457,
      458, 459, 460, 461, 462, 463, 464, 465, 466, 471, 472, 473, 785, 787, 788, 792, 799, 803, 804,
      817, 818, 819, 821, 823, 824, 853, 871, 884, 888, 889, 892, 898, 900, 901, 905, 940, 941, 944,
      945, 947, 960, 961, 968, 971, 972, 973, 988, 990, 1002, 1003, 1004, 1008, 1009, 1010, 1011, 1013,
      1014, 1015, 1016, 1017, 1018, 1019, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1059,
      1060, 1063, 10953, 10961, 10962, 10963, 10964, 10965, 11002, 11009, 11010, 11011, 11012, 11013,
      11014, 11015, 11016, 11017, 11018, 11019, 11020, 11021, 11022, 11023, 11024, 11025, 11373, 11374,
      11375, 11376, 11377, 11378, 11379, 11380, 11381, 11382, 11393, 11394, 11395, 11396, 11401, 11402,
      11403, 11404, 11405, 11406, 11407, 11408, 11409, 11411, 11415, 11423, 11424, 11425, 11426, 11554,
      11792, 11795, 11796, 11801, 11876, 11877, 11878, 11879, 11975, 12028, 12032, 12033, 12034, 12035,
      12036, 12037, 12038, 12039, 12040, 12041, 12067, 12068, 12092, 12093, 12094, 12095, 12096, 12097,
      12098, 12099, 12100, 12140, 12141, 12144, 12145, 12146, 12147, 12148, 12149, 12150, 12151, 12163,
      12164, 12180, 12181, 12182, 12183, 12184, 12185, 12187, 12188, 12206, 12207, 12208, 12209, 12210,
      12211, 12213, 12252, 12253, 12254, 12255, 12256, 12257, 12258, 12259, 12261, 12262, 12298, 12299,
      12300, 12301, 12302, 12303, 12304, 12305, 12306, 12307, 12308, 12310, 12311, 12312, 12313, 12314,
      12318, 12319, 12320, 12321, 12322, 12323, 12324, 12325, 12326, 12327, 12328, 12329, 12330, 12331,
      12332, 12359, 12387, 12421, 12422, 12425, 12427, 12428, 12429, 12430, 12431, 12432, 12433, 12434,
      12435, 12436, 12437, 12438, 12439, 12440, 12441, 12442, 12443, 12444, 12445, 12446, 12447, 12448,
      12449, 12450, 12451, 12452, 12453, 12454, 12455, 12456, 12457, 12458, 12459, 12467, 12472, 12473,
      12474, 12475, 12476, 12477, 12478, 12479, 12548, 12615, 12616, 12617, 12646, 12647, 12648, 12649,
      12650, 12651, 12652, 12653, 12654, 12660, 12661, 12662, 12663, 12664, 12665, 12666, 12667, 12668,
      12669, 12670, 12671, 12672, 12673, 12674, 12675, 12676, 12677, 12678, 12679, 12680, 12681, 12682,
      12683, 12684, 12685, 12686, 12687, 12688, 12689, 12690, 12691, 12692, 12693, 12694, 12695, 12696,
      12697, 12698, 12699, 12700, 12701, 12702, 12703, 12704, 12705, 12706, 12707, 12708, 12709, 12710,
      12711, 12712, 12713, 12714, 12715, 12716, 12717, 12718, 12719, 12720, 12721, 12722, 12723, 12724,
      12733, 12734, 12735, 12736, 12737, 12738, 12765, 12766, 12767, 12768, 12769, 12792, 14092, 14093,
      14094, 14095, 14099, 14210, 14211, 14213, 14214, 14215, 14216, 14217, 14218, 14219, 14230, 14231,
      14232, 14233, 14234, 14235, 14680, 14681, 14682, 14683, 14702, 14730, 14733, 14776, 14777, 14778,
      14848, 14937, 14968, 14969, 14970, 14971, 14972, 14973, 15009, 15022, 15023, 15024, 15025, 15026,
      15027, 15028, 15029, 15030, 15032, 15057, 15058, 15059, 15060, 15061, 15062, 15063, 15064, 15065,
      15067, 15078, 15079, 15080, 15081, 15082, 15083, 15084, 15085, 15086, 15103, 15162, 15163, 15164,
      15165, 15166, 15183, 15185, 15200, 15201, 15202, 15203, 15204, 15205, 15206, 15207, 15208, 15209,
      15210, 15211, 15212, 15213, 15214, 15216, 15223, 15225, 15226, 15227, 15229, 15230, 15231, 15232,
      15233, 15234, 15235, 15238, 15244, 15245, 15247, 15248, 15249, 15250, 15251, 15252, 15253, 15254,
      15255, 15256, 15257, 15258, 15259, 15260, 15261, 15262, 15263, 15264, 15265, 15266
    ])

    const movimentosMagistraoProcesso = movimentosProcesso.filter(mov => IDS_MOVIMENTOS_MAGISTRADOS_SET.has(parseInt(mov.codEvento)))
                                        .map(mov => mov.textoFinalExterno.toLowerCase())
    const movimentosMagistradoProcessoSet = new Set(movimentosMagistraoProcesso)                                        
    
    jQ3.initialize('#divTimeLine\\:divEventosTimeLine .texto-movimento', function(){
      const $this = jQ3(this)
      const textoMovimento = $this.text().toLowerCase()
      if( !movimentosMagistradoProcessoSet.has( textoMovimento ) && !textoMovimento.includes('conduzida por juiz') )
        return

      const $container = $this.parents('.interno')
      $container.find('.media-body, .media-left').addClass('j2-autos-digitais-ato-magistrado')
      if( !$container.find('.anexos').children().length ){
        if($container.next().is('.tipo-D'))
          $container.next().find('.media-body, .media-left').addClass('j2-autos-digitais-ato-magistrado')
        if($container.prev().is('.tipo-D'))
          $container.prev().find('.media-body, .media-left').addClass('j2-autos-digitais-ato-magistrado')
      }
    })
  }

  function acoesBaseadasEmMovimentosDoProcesso(){
    const __toaster = (a, msg, severity)=> { 
      jQ3.Toast ? jQ3.Toast(a, msg, severity) : alert(`${severity.toUpperCase()}: ${msg}`) 
    }

    const idProc = j2E.env.urlParms.idProcesso || j2E.env.urlParms.id

    j2EPJeRest.processo.movimentacoes.obterTodas(idProc)
    .done(todosMovimentos => {
      todosMovimentos.sort((a, b) => b.dataAtualizacao - a.dataAtualizacao)

      sinalizarProcessoJulgado(todosMovimentos)
      destacarOsAtosDoMagistrado(todosMovimentos)
    })
    .fail(err => {
      __toaster("Autos Digitais", `Erro ao recuperar todos os movimentos do processo.`, "error") 
    })
    
  }

  function modificarLinkAssociadosParaAbrirAutosDigitais(){
    jQ3.initialize('#associadosTab a', function(){
      const $this = jQ3(this)
      const onclickAttr = $this.attr('onclick')
      $this.attr('onclick', onclickAttr.replace('/pje/detalheProcessoPrevento.seam?id', 
        '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso'))
    })
  }

  function incluirFerramentaZoomVisualizacaoDocAutosDigitais(){
    const TEMPLATE = /*html*/`
      <div class="rich-panel" id="j2-doc-html-tools">
          <ul class="nav nav-pills btn-documento pull-right" style="display: flex; flex-direction: column;">
              <li>
                  <a id="hidder" title="Esconder" j2-hidder="">
                      <i class="fa fa-arrow-right" aria-hidden="true" ></i>
                      <i class="fa fa-arrow-left" aria-hidden="true" ></i>
                      <span class="sr-only">Ícone de aumentar zoom</span>
                  </a>
              </li>
              <li>
                  <a id="zoom-in" title="Aumentar zoom">
                      <i class="fa fa-search-plus" aria-hidden="true"></i>
                      <span class="sr-only">Ícone de aumentar zoom</span>
                  </a>
              </li>
              <li>
                  <a id="zoom-out" title="Diminuir zoom">
                      <i class="fa fa-search-minus" aria-hidden="true"></i>
                      <span class="sr-only">Ícone de diminuir zoom</span>
                  </a>
              </li>
              <li>
                  <a id="rolar-topo" title="Rolar para o topo">
                      <i class="fa fa-arrow-up" aria-hidden="true"></i>
                      <span class="sr-only">Ícone de rolar para o topo</span>
                  </a>
              </li>
              <li>
                  <a id="rolar-fim" title="Rolar para o fim">
                      <i class="fa fa-arrow-down" aria-hidden="true"></i>
                      <span class="sr-only">Ícone de rolar para o fim</span>
                  </a>
              </li>
          </ul>
      </div>
    `

    function alterarZoom(valor){
      const $iframeBody = jQ3('#frameHtml').contents().find('body');
      const currentZoom = parseFloat($iframeBody.css('zoom')) || 1;
      const newZoom = currentZoom + valor;
      $iframeBody.css('zoom', newZoom);
    }

    function rolarFim(){
      const $iframeBody = jQ3('#frameHtml').contents().find('body');
      const iframeHeight = $iframeBody.height();
      const iframeInnerHeight = jQ3('#frameHtml').height();
    /*  if (iframeHeight > iframeInnerHeight) {
        const maxScroll = iframeHeight - iframeInnerHeight;
        const currentZoom = parseFloat($iframeBody.css('zoom')) || 1;
        $iframeBody.scrollTop(maxScroll * currentZoom * 1.1);
      }*/
      /*const maxScroll = $iframeBody.prop('scrollHeight') - $iframeBody.height();
        $iframeBody.scrollTop(maxScroll);*/

      $iframeBody.scrollTop($iframeBody.prop('scrollHeight'))
    }

    function rolarTopo(){
      const $iframeBody = jQ3('#frameHtml').contents().find('body');
      $iframeBody.scrollTop(0);
    }

    jQ3.initialize('#detalheDocumento\\:docHtml', function(){
      const $this = jQ3(this)

      const $too = jQ3(TEMPLATE)
      $this.append($too)

      $too.find('#zoom-in').on('click', function(e){   
        alterarZoom(0.1);
      });

      $too.find('#zoom-out').on('click', function(e){   
        alterarZoom(-0.1);
      });

      $too.find('#rolar-fim').on('click', function(e){
        rolarFim();
      });

      $too.find('#rolar-topo').on('click', function(e){
        rolarTopo();
      });

      $too.find('#hidder').on('click', function(e){
        if($too.is('[j2-hidden]'))
          $too.removeAttr('j2-hidden')
        else
          $too.attr('j2-hidden', '')
      });
    })
  }

  function observarPreparacaoParaPseudoTarefa(){
    const cargaHash = j2E.mods.urlHash.decodeWindowLocationHash()
    if(!cargaHash)
      return

    j2E.env.cargaHash = cargaHash

    if( window.location.pathname.match(/error\.seam/) ){
      const __BODY__ = /*html*/`
        <div id="popUp"></div>
        <span id="_viewRoot:status">
          <span id="_viewRoot:status.start" style="display: none;">
            <div class="ajax-loader">
              <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div"></div>
              <div class="rich-mpnl-panel">
                <div class="rich-mp-container">
                  <div class="rich-mpnl-content"></div>
                </div>
              </div>
            </div>
          </span>
          <span id="_viewRoot:status.stop"></span>
        </span>
        <div id="modalStatus" style="display: none;">
          <input autocomplete="off" id="modalStatusOpenedState" name="modalStatusOpenedState" type="hidden" />
          <div class="rich-modalpanel ajax-loader" id="modalStatusContainer" style="position: absolute; display: none; z-index: 100; background-color: inherit;">
            <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="modalStatusDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="modalStatusFirstHref"></button></div>
            <div class="rich-mpnl-panel">
              <div class="rich-mp-container" id="modalStatusCDiv" style="position: absolute; left: 0px; top: 0px; z-index: 9;">
                <div class="rich-mpnl-shadow" id="modalStatusShadowDiv" style="opacity: 0; filter: alpha(opacity=0);"></div>
                <div class="rich-mpnl-ovf-hd rich-mpnl-trim rich-mpnl-content" id="modalStatusContentDiv">
                  <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="modalStatusContentTable" style="height: 100%; width: 100%;">
                    <tbody>
                      <tr style="height: 99%;">
                        <td class="rich-mpnl-body" valign="top"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerN" style="width: 40px; height: 4px; cursor: n-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerE" style="height: 40px; width: 4px; cursor: e-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerS" style="width: 40px; height: 4px; cursor: s-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerW" style="height: 40px; width: 4px; cursor: w-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerNWU" style="width: 40px; height: 4px; cursor: nw-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerNEU" style="height: 40px; width: 4px; cursor: ne-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerNEL" style="width: 40px; height: 4px; cursor: ne-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerSEU" style="height: 40px; width: 4px; cursor: se-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerSEL" style="width: 40px; height: 4px; cursor: se-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerSWL" style="height: 40px; width: 4px; cursor: sw-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerSWU" style="width: 40px; height: 4px; cursor: sw-resize;"></div>
                <div class="rich-mpnl-resizer" id="modalStatusResizerNWL" style="height: 40px; width: 4px; cursor: nw-resize;"></div>
              </div>
            </div>
            <div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="modalStatusCursorDiv" style="z-index: -200;"><button class="rich-mpnl-button" id="modalStatusLastHref"></button></div>
          </div>
        </div>
        <form id="j_id51" name="j_id51" method="post" action="/pje/Processo/movimentar.seam" target="">
          <span style="display: none;" id="j_id51:j_id53"></span><span style="display: none;" id="j_id51:j_id54"></span><input type="hidden" autocomplete="off" name="j_id51" value="j_id51" />
          <input type="hidden" autocomplete="off" name="autoScroll" value="" /><input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="j_id5" autocomplete="off" />
        </form>

        <style>
          .index-topo {
            z-index: 2000 !important;
          }
        </style>
        <div id="mpPJeOfficeIndisponivel" style="display: none;">
          <input autocomplete="off" id="mpPJeOfficeIndisponivelOpenedState" name="mpPJeOfficeIndisponivelOpenedState" type="hidden" />
          <div class="rich-modalpanel index-topo" id="mpPJeOfficeIndisponivelContainer" style="position: absolute; display: none; z-index: 100; background-color: inherit;">
            <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="mpPJeOfficeIndisponivelDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="mpPJeOfficeIndisponivelFirstHref"></button></div>
            <div class="rich-mpnl-panel">
              <div class="rich-mp-container" id="mpPJeOfficeIndisponivelCDiv" style="position: absolute; left: 0px; top: 0px; z-index: 9;">
                <div class="rich-mpnl-shadow" id="mpPJeOfficeIndisponivelShadowDiv"></div>
                <div class="rich-mpnl-ovf-hd rich-mpnl-trim rich-mpnl-content" id="mpPJeOfficeIndisponivelContentDiv">
                  <div class="rich-mpnl-text rich-mpnl-controls">
                    <span class="btn-fechar" onclick="Richfaces.hideModalPanel('mpPJeOfficeIndisponivel')" title="Fechar"><i class="icon-fechar"></i></span>
                  </div>
                  <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="mpPJeOfficeIndisponivelContentTable" style="height: 100%; width: 100%;">
                    <tbody>
                      <tr style="height: 1%;">
                        <td class="rich-mpnl-header-cell"><div class="rich-mpnl-text rich-mpnl-header" id="mpPJeOfficeIndisponivelHeader" style="white-space: nowrap; cursor: move;">PJeOffice Indisponível</div></td>
                      </tr>
                      <tr style="height: 99%;">
                        <td class="rich-mpnl-body" valign="top">
                          <h3>O aplicativo PJeOffice não está disponível!</h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerN" style="width: 40px; height: 4px; cursor: n-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerE" style="height: 40px; width: 4px; cursor: e-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerS" style="width: 40px; height: 4px; cursor: s-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerW" style="height: 40px; width: 4px; cursor: w-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerNWU" style="width: 40px; height: 4px; cursor: nw-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerNEU" style="height: 40px; width: 4px; cursor: ne-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerNEL" style="width: 40px; height: 4px; cursor: ne-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerSEU" style="height: 40px; width: 4px; cursor: se-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerSEL" style="width: 40px; height: 4px; cursor: se-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerSWL" style="height: 40px; width: 4px; cursor: sw-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerSWU" style="width: 40px; height: 4px; cursor: sw-resize;"></div>
                <div class="rich-mpnl-resizer" id="mpPJeOfficeIndisponivelResizerNWL" style="height: 40px; width: 4px; cursor: nw-resize;"></div>
              </div>
            </div>
            <div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="mpPJeOfficeIndisponivelCursorDiv" style="z-index: -200;"><button class="rich-mpnl-button" id="mpPJeOfficeIndisponivelLastHref"></button></div>
          </div>
        </div>
        <div id="mpProgresso" style="display: none;">
          <input autocomplete="off" id="mpProgressoOpenedState" name="mpProgressoOpenedState" type="hidden" />
          <div class="rich-modalpanel modal-small" id="mpProgressoContainer" style="position: absolute; display: none; z-index: 100; background-color: inherit;">
            <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="mpProgressoDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="mpProgressoFirstHref"></button></div>
            <div class="rich-mpnl-panel">
              <div class="rich-mp-container" id="mpProgressoCDiv" style="position: absolute; left: 0px; top: 0px; z-index: 9;">
                <div class="rich-mpnl-shadow" id="mpProgressoShadowDiv"></div>
                <div class="rich-mpnl-ovf-hd rich-mpnl-trim rich-mpnl-content" id="mpProgressoContentDiv">
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
        </div>

        <div id="j_id67" class="content">
          <div id="pageBody" class="container-fluid scroll-y principal">
            <span id="movimentarRegion:status">
              <span id="movimentarRegion:status.start" style="display: none;">
                <div id="mpLoadingMovimentar" style="display: none;">
                  <input autocomplete="off" id="mpLoadingMovimentarOpenedState" name="mpLoadingMovimentarOpenedState" type="hidden" />
                  <div class="rich-modalpanel ajax-loader" id="mpLoadingMovimentarContainer" style="position: absolute; display: none; z-index: 100; background-color: inherit;">
                    <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="mpLoadingMovimentarDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="mpLoadingMovimentarFirstHref"></button></div>
                    <div class="rich-mpnl-panel">
                      <div class="rich-mp-container" id="mpLoadingMovimentarCDiv" style="position: absolute; left: 0px; top: 0px; z-index: 9;">
                        <div class="rich-mpnl-shadow" id="mpLoadingMovimentarShadowDiv"></div>
                        <div class="rich-mpnl-content" id="mpLoadingMovimentarContentDiv">
                          <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="mpLoadingMovimentarContentTable" style="width: 1px; height: 1px;">
                            <tbody>
                              <tr style="height: 99%;">
                                <td class="rich-mpnl-body" valign="top"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="mpLoadingMovimentarCursorDiv" style="z-index: -200;"><button class="rich-mpnl-button" id="mpLoadingMovimentarLastHref"></button></div>
                  </div>
                </div>
              </span>
              <span id="movimentarRegion:status.stop"></span>
            </span>
            <div id="script"></div>
            <form id="j_id70" name="j_id70" method="post" action="/pje/Processo/movimentar.seam" target="">
              <input type="hidden" autocomplete="off" name="j_id70" value="j_id70" /><input type="hidden" autocomplete="off" name="autoScroll" value="" />
              <input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="j_id5" autocomplete="off" />
            </form>
            <div id="idModalAguarde" style="display: none;">
              <input autocomplete="off" id="idModalAguardeOpenedState" name="idModalAguardeOpenedState" type="hidden" />
              <div class="rich-modalpanel" id="idModalAguardeContainer" style="position: absolute; display: none; z-index: 100; background-color: inherit;">
                <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div" id="idModalAguardeDiv" style="z-index: -1;"><button class="rich-mpnl-button" id="idModalAguardeFirstHref"></button></div>
                <div class="rich-mpnl-panel">
                  <div class="rich-mp-container" id="idModalAguardeCDiv" style="position: absolute; left: 0px; top: 0px; z-index: 9;">
                    <div class="rich-mpnl-shadow" id="idModalAguardeShadowDiv"></div>
                    <div class="rich-mpnl-ovf-hd rich-mpnl-trim rich-mpnl-content" id="idModalAguardeContentDiv">
                      <table border="0" cellpadding="0" cellspacing="0" class="rich-mp-content-table" id="idModalAguardeContentTable" style="height: 100%; width: 100%;">
                        <tbody>
                          <tr style="height: 99%;">
                            <td class="rich-mpnl-body" valign="top">
                              <div class="ajax-loader">
                                <div class="rich-mpnl-mask-div-opaque rich-mpnl-mask-div"></div>
                                <div class="rich-mpnl-panel">
                                  <div class="rich-mp-container">
                                    <div class="rich-mpnl-content"></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="rich-mpnl-mask-div rich-mpnl-mask-div-transparent" id="idModalAguardeCursorDiv" style="z-index: -200;"><button class="rich-mpnl-button" id="idModalAguardeLastHref"></button></div>
              </div>
            </div>
            <div id="taskInstanceDiv" class="divMovimentarProcesso">
              <div id="msgSaida">
                <dl id="j_id82" class="rich-messages" style="display: none;"><dt></dt></dl>
              </div>
            </div>
            <div id="divMovimentarPoll">
              <form id="j_id85" name="j_id85" method="post" action="/pje/Processo/movimentar.seam" target="">
                <span style="display: none;" id="j_id85:poll"></span><input type="hidden" autocomplete="off" name="j_id85" value="j_id85" /><input type="hidden" autocomplete="off" name="autoScroll" value="" />
                <input type="hidden" name="javax.faces.ViewState" id="javax.faces.ViewState" value="j_id5" autocomplete="off" />
              </form>
            </div>
          </div>
        </div>`
      
      jQ3('body').html(__BODY__)
    }

  }

  function observarParaCriarFerramentaWhatsApp(){
    const idTask = j2E.env.urlParms.newTaskId
    jQ3.initialize(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:documentoExistenteDiv > .rich-panel`, function(){
      function _obterDestinatarioAtual(){ 
        const text = jQ3(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:edicaoExpedientePanel_header`).text().split(' - ')
        text.shift()
        const textToId = text.shift()
        return { 
          nome: text.join(' - ').trim(),
          pacId: textToId.split(' ').pop()
        }
      }

      function _obterDestinatariosExpediente(){
        const $trDestinatarioAtual = jQ3(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:tabelaDestinatarios\\:tb td:contains('${destinatarioAtual.pacId}')`)
        return { $trDestinatarioAtual }
      }

      const destinatarioAtual = _obterDestinatarioAtual()
      const destinatariosExpediente = _obterDestinatariosExpediente()
      const $thisContainer = jQ3(this).parent()

      const $WAPanel = j2EUi.createPanel(
        'Enviar por WhatsApp', 
        j2EUi.spinnerHTML(), 
        'j2-enviar-whatsapp', 
        undefined, 
        'rich-panel j2-enviar-whatsapp'
      );

      evBus.on('ao-obter-autos-digitais-whatsapp', function(ev, $autosXml, acoes){
        $WAPanel.$body.empty()
        $WAPanel.$body.append($autosXml.find('#poloAtivo').toggleClass('col-sm-4 col-sm-6'))
        $WAPanel.$body.append($autosXml.find('#poloPassivo').toggleClass('col-sm-4 col-sm-6'))

        $WAPanel.$body.append( destinatariosExpediente )

        
      })

      j2E.SeamIteraction.processo.acoes.abrirProcesso()
      .done((it, acoes, $autosXml )=>{
        evBus.fire('ao-obter-autos-digitais-whatsapp', $autosXml, acoes)
      })
      .fail((err)=>{
        toaster('Autos Digitais', `Erro ao obter os autos digitais.`, 'error')
      })

      $thisContainer.after($WAPanel )
    })
  }
  
  switch(window.location.pathname){
    
    case '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam':
    case '/pje/Processo/ConsultaProcesso/Detalhe/listProcessoCompleto.seam':
    case '/pje/Processo/ConsultaProcesso/Detalhe/detalheProcessoVisualizacao.seam':
      autoSelecionarRecursoAutosDigitaisOuProcessarVizualizacaoParaTarefa()
      observeSeEModeloJ2();
      observeProcessoFolhaExpedientes();
      observeFormDetalheProcessoTarefasDoProcesso();
      //encaminharAbrirTarefa();
      //setTimeout(encaminharAbrirTarefa, 5000);
      //verificarSePaginaDeuErro();
      //verificarSePaginaExpirou();
      observeSelectTipoDocumento();
      observarParaAcrescentarRecarregadorDeDocumento()
      observeQualificacaoPartes();
      //observeTarefaComPAC();
      //requisitarDadosSeTarefaEPersonalisar();
      listenMessages();
      //personaliazarMenu();
      //registrarServiceWorker();
      personalizarAtalhosADireitaAutosDigitais()
      melhorarBotaoMarcarTodosComoLido()
      criarEditorEtiquetasPelosAutosDigitais()
      acoesBaseadasEmMovimentosDoProcesso()
      modificarLinkAssociadosParaAbrirAutosDigitais()
      incluirFerramentaZoomVisualizacaoDocAutosDigitais()
      break;
    case '/pje/ng2/dev.seam':
      destacarNomeUnidade()
      if(!(j2E.env.urlParms.j2pseudotarefaMovimentar)){
        personaliazarMenu();
      }else
        fazerAjustesExibicaoPseudotarefaMovimentar();
      
      listenMessages();
      encaminharAbrirTarefa();
      //inicializarJurisconsult()
      break;
      
    case "/pje/Painel/painel_usuario/include/listTasksUsuarioPje2.seam":
      observeHistoricoTarefasEPrepararAtalhos();
      break;
    
    case '/pje/Processo/ConsultaProcesso/Detalhe/detalheParte.seam':
      personalizarTelefonesDasPartes();
      observeQualificacaoPartes()
      break;
      
    case '/pje/Processo/update.seam':
    case '/pje/Processo/cadastrar.seam':
    case '/pje/Processo/CadastroProcessoIncidente/listView.seam':
      inserirModeloTermoReclamacao();
      break;
    
    case '/pje/Processo/RetificacaoAutuacao/listView.seam':
      adHoc1();  
      break;
      
    case '/pje/Processo/RetificacaoAutuacao/updateRetificacaoAutuacao.seam':
      personalizarUpdateRetificacaoAutuacao();  
      break;
    
    case '/pje/errorUnexpected.seam':
      verificarSePaginaDeuErro();
      verificarSePaginaExpirou();
      break;
    case '/pje/error.seam':
      verificarSePaginaDeuErro();
      verificarSePaginaExpirou();
      observarPreparacaoParaPseudoTarefa()
      requisitarDadosSeTarefaEPersonalisar()
      break;
    
    case '/pje/Processo/movimentar.seam':
      observarPreparacaoParaPseudoTarefa()
      observeTarefaComPAC();
      //observeFormDetalheProcessoTarefasDoProcesso();
      observeProcessoFolhaExpedientes();
      requisitarDadosSeTarefaEPersonalisar();
      listenMessages();
      observeSeEModeloJ2();
      observarParaAcrescentarRecarregadorDeDocumento()
      observarParaCriarFerramentaWhatsApp()
      break;
    
    case '/pje/ConsultaPrazos/listView.seam':
    case '/pje/ConsultaPrazos/listView.seam#':
      preparComandoDeEtiquetagem();
      destacarPrazoDeSistema()
      break;
    
    case '/pje/Painel/painel_usuario/include/agrupadorPje2.seam':
      preparComandoDeEtiquetagemDeAnaliseJuntada();
      break;
      
    default:
     /* observeSeEModeloJ2();
      observeProcessoFolhaExpedientes();
      observeFormDetalheProcessoTarefasDoProcesso();
      encaminharAbrirTarefa();
      //setTimeout(encaminharAbrirTarefa, 5000);
      verificarSePaginaDeuErro();
      verificarSePaginaExpirou();
      observeSelectTipoDocumento();
      //observeTarefaComPAC();
      requisitarDadosSeTarefaEPersonalisar();
      listenMessages();
      personaliazarMenu();
      registrarServiceWorker();
      //mostrarEtiquetasNosAutosDigitais();*/
      break;
  }

  evBus.on('on-adicionar-etiqueta-via-pje', function(ev, etiqueta) {
    const j2Action = {
      j2 : true,
      action : 'triggerEventFromPJe',
      evento : {
        tipo : 'on-adicionar-etiqueta-via-pje',
        argumentos : { 
          data : etiqueta,
          tipo : 'definição de etiqueta'
        }
      }
    }
    __sendMessageToFrotEnd( j2Action);
  })
};

// No content.js (content script)
window.addEventListener("message", function(event) {
  if (event.source === window && event.data.type === "MensagemDoContentScript") {
    // Tratar a mensagem recebida do código da página
    console.log("TESTAR: Mensagem recebida da página:", event.data.message);

    // Enviar uma resposta para o código da página
    event.source.postMessage({ type: "RespostaDoContentScript", message: "TESTAR: Resposta do content script" }, event.origin);
  }
});

// Enviar uma mensagem para o código da página
setTimeout(()=>{window.postMessage({ type: "MensagemParaAPagina", message: "TESTAR: Olá página!" }, "*");}, 3000)