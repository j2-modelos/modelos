/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function pjeLoad(){    
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
        case 'ping':
          pong(_act, _load);
          break;
        case 'notifyPseudotarefaMovimentarLoaded':
          fowardNotifyPseudotarefaMovimentarLoaded(_act, _load);
          break;
      }
    
    }
    
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
           time : new Date().getTime(),
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
  function personalizarTarefa(_load){
      var _tarf = _load.at(-1);
      var _tarfProp = TarefasProps[_tarf];
      var _delayCall = new DelayedCall(10, 10);
      
      if(!(_tarfProp))
        return;
      if(!(_tarfProp.personalizacao))
        return;
      
      var body = jQ3('#taskInstanceForm div.rich-panel-body');
      var form = body;
      
      var iframe;
      
      var _showExpedients = function(){
        iframe.on('load', function(){
          if(! (this.contentWindow.jQ3) )
            return;
          
          this.contentWindow.jQ3('body').attr('j2E', 'mostrarSoExpedientes');
          
          this.contentWindow.jQ3('a#navbar\\:linkAbaExpedientes1')[0].click();
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

          iframe.attr('src', _url).css('width' , '100%').css('height', height || window.screen.height * 0.77);   
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
          var _url = '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$';
          _url = _url.replace('$', idProc).replace('$', ca);

          iframe.attr('src', _url).css('width' , '100%').css('height', window.screen.height * 0.77);   
          body.append(iframe);	
        })});
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
      var _criarPainel = function(){
        jQ3.each(_tarfProp.personalizacao.painel, function(key, painel){
          var _body = jQ3('<div>');
          jQ3.each(painel.body, function(key, el){
            switch(el.tipo){
              case 'table':
                _body.append( j2EUi.createTable(el.data) );
                break;
            }
          });
          
          var jP = j2EUi.createPanel(painel.header, _body);
          jQ3(painel.appendTo).append( jP );
        });
      };
           
      _tarfProp.personalizacao.removeDoCorpo                             && _removeDoCorpo();
      _tarfProp.personalizacao.limpaCorpoTarefa                          && _limparCorpo();
      _tarfProp.personalizacao.mostraAutosDigitais                       && _autosDigitais();
      _tarfProp.personalizacao.mostraExpedientes                         && _showExpedients();
      _tarfProp.personalizacao.mostraJuntarDocumento                     && _autosDigitaisJuntarDocumento();
      _tarfProp.personalizacao.transicaoRemover                          && _transicaoRemover();
      _tarfProp.personalizacao.transicaoManterApenasIgnorarESairTarefa   && _transicaoManterApenasIgnorarESairTarefa();
      _tarfProp.personalizacao.painel                                    && _criarPainel();
      
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
                
                var jGrpDiv = jQ3('<div>', {class : 'rich-panel-body panel j2eADMPanel', j2e : val.j2eG});
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
                    var idProc = (function(){
                      var b = window.location.search.match(/idProcesso=[0-9]+&/);
                      return b[0].split('=')[1].split('&')[0];
                    })();
                    
                    jQ3.get('/pje/seam/resource/rest/pje-legacy/painelUsuario/historicoTarefas/$'.replace('$', idProc), function(data, status){
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
                    });
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
          }
          
          _delayCall(function(){jQ3('#pageBody').css('filter', 'blur(5px)'); });
          _delayCall(ADMReorganizarTarefas, _tarfProp);
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
  
  function observeSelectTipoDocumento(){
    
    
    jQ3.initialize('select#cbTDDecoration\\:cbTD option', function(a, b, c){
      var jEl = jQ3(this);
      switch(jEl.text()){
        case 'Selecione':
        case 'Ato Ordinatório':
        case 'Certidão':
        case 'Mensagem(ns) de E-mail':
        case 'Petição':
        case 'Petição Inicial':
        case 'Protocolo':
        case 'Termo':
        case 'Termo de Juntada':
          return;         

        default:
          jEl.remove();

        
      } 
      
      
    });
    
    function isExperied(cred, cusTime){
      var __TIME__ = cusTime || 1000 * 60 * 10; //10 min
      var now = new Date().getTime();
      

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
            timestamp : new Date().getTime()
          })
        }
      }

      jEl.change(()=>{
        lockr.set('select#cbTDDecoration:cbTD', {
          text : jEl.find('option:selected').text(),
          //val : jEl.val(),
          timestamp : new Date().getTime()
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
      var _parentThisTable = jQ3(this);
      
      jQ3('#processoExpedienteTab table.rich-table.clearfix a[title="Visualizar ato"]', _parentThisTable).each(function(idx, el){

        var jEl = jQ3(el);
        var $tr = jEl.parents('tr');
        
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
        
        function _ajustarLayoutExibicaoDocumentoEmIframeDaExtensao(){
          if( ! jQ3('body').is('[j2E="mostrarSoExpedientes"]') )
            return;

          jQ3('body').prepend(jEl.parents('#processoExpedienteTab').find('table:first'));
          jQ3('body').find('div.navbar').hide();
          jQ3('body').css('overflow', 'overlay');
          jQ3('#pageBody').hide();
        }
        
        _adicionarComandoParaFecharOPrazo();
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
              $tr.find('td:nth-child(3)').append(_div);
              $tr.find('td:nth-child(1) > span > div > span').append(`<br>Disponibilizado em: ${items[i].datadisponibilizacao}`)
              
              const pubDataISO = j2E.mods.Calendario.contarPrazo(new Date(`${items[i].data_disponibilizacao}T00:00:00.000-03:00`), 1)
              const pubData = pubDataISO.split('-').reverse().join('/')
              $tr.find('td:nth-child(1) > span > div > span').append(`<br>Publicado em: ${pubData}`)



              if ( $tr.find('td:nth-child(2) > span > div:first').text().length && ( $tr.find('td:nth-child(1) > span > div:first').text().toLowerCase().includes('o sistema registrou ciência')  ) )
                return;

              let _parsePrazo = $tr.find('td:nth-child(1)').text().split('Prazo: ')[1].split(' dias')
              
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

              $tr.find('td:nth-child(2)').append(htmlTemplate);
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
        
        $this.find('a').click(function(){
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
          
        });
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
        var text = _this.text();
        var proc = jQ3('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
        var _atch = "window.j2Action = { j2 : true, action : 'abrirAutomaticoTarefa', processo : '$', tarefa : '$'};".replace('$', proc).replace('$', text);

        var aLeft = aOuterHTML.split('onclick="');
        var aRight = aLeft[1].split('"');
        var _onclick = aRight[0].toString().split("'");          
        _onclick[3] = 'https://pje.tjma.jus.br/pje/ng2/dev.seam#/painel-usuario-interno';
        _onclick = _onclick.join("'") +'';
        _onclick = _atch + _onclick;

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
    
    var _act;
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
      case 'abrirAutomaticoTarefa':
        var _load = {
          fowarded : true,
          task : 'fowardAction',
          j2 : true,
          j2pseudotarefaMovimentar : j2E.env.urlParms.j2pseudotarefaMovimentar,
          origin: window.location.origin,
          pathname: window.location.pathname,
          j2Action : _act
        };
        console.log('dispatching to https://frontend.prd.cnj.cloud');
        console.log(_load);
        jQ3('iframe#ngFrame').on("load", function(){
          jQ3('iframe#ngFrame').get(0).contentWindow.postMessage(_load, 'https://frontend.prd.cnj.cloud');
        });
        console.log('dispatched');
        break;
    }
  }
  
  function verificarSePaginaDeuErro(){
    var obs = jQ3.initialize('ul.alert.alert-danger', function(){
      lg('verificarSePaginaDeuErro', 'inialized :', new Date().getTime());
      
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
      lg('verificarSePaginaDeuErro', 'window load :', new Date().getTime() );     
      setTimeout(function(){obs.disconnect();}, 1000);
    });
  }
  
  function verificarSePaginaExpirou(){
    jQ3.initialize('dt.alert.alert-info', function(){
      lg('verificarSePaginaExpirou', 'inialized :', new Date().getTime());
      
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
  
  function requisitarDadosSeTarefaEPersonalisar(){	
    if(window.location.pathname !== "/pje/Processo/movimentar.seam")	
      return;	
    	
    var idProc = j2E.env.urlParms.idProcesso,	
        idTask = j2E.env.urlParms.newTaskId;	
    j2EPJeRest.tarefas.descricaoNoFluxo(idTask, idProc, function(data){	
      personalizarTarefa(data);	
    });	
  }
  
  function observeHistoricoTarefasEPrepararAtalhos(){
    var ___A_TEMPLATE___ = '<a href="#" j2e="menuNoHistoricoTarefas" onclick="window.j2Action = { j2 : true, action : \'abrirAutomaticoTarefa\', processo : \'$\', tarefa : \'$\'};openPopUp(\'popUpFluxo\', \'https://pje.tjma.jus.br/pje/ng2/dev.seam#/painel-usuario-interno\'); return false;" title="$">$<img class="historicoTarefaIconOpen" src="https://pje.tjma.jus.br/pje/img/view.gif"></a>';
    var ___A_NUM_TEMPLATE___ = '<a href="#" j2e="numeroProcessoHistoricoTarefas" title="Abrir processo $">$<img class="historicoTarefaIconOpen" src="https://pje.tjma.jus.br/pje/img/view.gif"></a>';
    

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
        jQ3.each([numProc, tarf, title, text], function(){
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
      
      var aNumHTML = ___A_NUM_TEMPLATE___.replaceAll('$', numProc);
      var jANum = jQ3(aNumHTML);
      jANum.click(function(event){
        var url = 'https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$';
        
        j2EQueryGetProcessoCredentials(numProc, function(idProcesso, ca){
          jQ3.each([idProcesso, ca], function(){
            url = url.replace('$', this);
          });
                    
          /*__sendMessageToFrotEnd({
            action : 'abrirAutosDigitais',
            idProcesso : idProcesso,
            ca : ca,
            url : url
          });*/
          if(event.ctrlKey)
            url += "#";
          
          openPopUp('popPupProcessoId' + idProcesso, url);
        });
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
  
  function registrarServiceWorker(){
    
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
  
  switch(window.location.pathname){
    
    case '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam':
    case '/pje/Processo/ConsultaProcesso/Detalhe/detalheProcessoVisualizacao.seam':
      observeSeEModeloJ2();
      observeProcessoFolhaExpedientes();
      observeFormDetalheProcessoTarefasDoProcesso();
      //encaminharAbrirTarefa();
      //setTimeout(encaminharAbrirTarefa, 5000);
      //verificarSePaginaDeuErro();
      //verificarSePaginaExpirou();
      observeSelectTipoDocumento();
      //observeTarefaComPAC();
      //requisitarDadosSeTarefaEPersonalisar();
      listenMessages();
      //personaliazarMenu();
      //registrarServiceWorker();
      break;
    case '/pje/ng2/dev.seam':
      if(!(j2E.env.urlParms.j2pseudotarefaMovimentar)){
        personaliazarMenu();
      }else
        fazerAjustesExibicaoPseudotarefaMovimentar();
      
      listenMessages();
      encaminharAbrirTarefa();
      break;
      
    case "/pje/Painel/painel_usuario/include/listTasksUsuarioPje2.seam":
      observeHistoricoTarefasEPrepararAtalhos();
      break;
    
    case '/pje/Processo/ConsultaProcesso/Detalhe/detalheParte.seam':
      personalizarTelefonesDasPartes();
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
      break;
    
    case '/pje/Processo/movimentar.seam':
      observeTarefaComPAC();
      //observeFormDetalheProcessoTarefasDoProcesso();
      observeProcessoFolhaExpedientes();
      requisitarDadosSeTarefaEPersonalisar();
      listenMessages();
      observeSeEModeloJ2();
      break;
    
    case '/pje/ConsultaPrazos/listView.seam':
    case '/pje/ConsultaPrazos/listView.seam#':
      preparComandoDeEtiquetagem();
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
};

