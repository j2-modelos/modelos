/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global jQ3 */

function pjeLoad(){    
  (function _default(){
    addScript('pjeUtil.js');
    console.log('j2Extension: loading origin https://pje.tjma.jus.br');
  })();

  function listenMessages(){
    window.addEventListener('message', function(event){
      if (!(event.origin.startsWith('https://frontend.prd.cnj.cloud'))) 
        return;
    
      var _load = event.data;
      if(!(_load.j2))
        return;

      console.log('message from origin https://frontend.prd.cnj.cloud : ', _load);
      

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
      }
    
    });
  }
  
  
  
  function getHTMLAutosDigiais(action, load){
    
    function _ajaxAutosDigitais(id, ca){
      var _url = '/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=$&ca=$';
      jQ3.get(_url.replace('$', id).replace('$', ca), function(data, suc, xhr){
        var load = {
           action : 'getHTMLAutosDigiaisResponse',
           htmlAutosDigitais : data,
           idProcesso : id,
           ca : ca,
           callerAction : action
         };

         __sendMessageToFrotEnd(load, "#ngFrame");
      });
    }

    if( action.idProcesso !== 0 ) 
      j2EQueryGetChaveAcesso(action.idProcesso, function(chave){
        _ajaxAutosDigitais( action.idProcesso, chave );
      });
    else
      j2EQueryGetProcessoCredentials( action.numeroUnico, function(id, chave){
        _ajaxAutosDigitais( id, chave );
      });
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
  
  function personalizarTarefa(_load){
      var _tarf = jQ3(_load.a.outerHTML).text().tarfNameFromTarefaTitle();
      var _tarfProp = TarefasProps[_tarf];
      
      if(!(_tarfProp))
        return;
      if(!(_tarfProp.personalizacao))
        return;
      
      var body = jQ3('#taskInstanceForm\\:taskButtonsDiv_body');
      var form = jQ3('#taskInstanceForm\\:taskButtonsDiv_body').parents('form');
      var iframe;
      
      var _showExpedients = function(){
        iframe.on('load', function(){
          this.contentWindow.jQ3('body').attr('j2E', 'mostrarSoExpedientes');
          
          this.contentWindow.jQ3('a#navbar\\:linkAbaExpedientes1')[0].click();
        });
      };
      var _autosDigitais = function(){
        iframe = jQ3('<iframe>').attr('src', _load.a.href).css('width' , '100%').css('height', window.screen.height * 0.77);   
        body.append(iframe);
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
      _tarfProp.personalizacao.transicaoRemover                          && _transicaoRemover();
      _tarfProp.personalizacao.transicaoManterApenasIgnorarESairTarefa   && _transicaoManterApenasIgnorarESairTarefa();
      _tarfProp.personalizacao.painel                                    && _criarPainel();
      
      if( !(_tarfProp.personalizacao.procedimentoEspecializado) )
        return;
      
      switch(_tarfProp.personalizacao.procedimentoEspecializado){
        case 'ADM-reorganizarTarefas':
          function ADMReorganizarTarefas(){
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
                var jEl = jQ3(this);
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
            });
          }
          ADMReorganizarTarefas();
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
      if(! (this.id.includes('destinatariosTable')))
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
        if(! (this.id.includes('quantidadePrazoAto')))
          return;
        
        var __dataList__ = '<select id="$:list"><option value="3">3</option><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="30">30</option></select>';
        
        var jEl = jQ3(this);
        
        jEl.val('10');
        
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
              .val( "10" )
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
          return;

        default:
          jEl.remove();
      } 
      
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
  }

  function observeProcessoFolhaExpedientes(){
    jQ3.initialize('table#panelDetalhesProcesso', function(){
      var _parentThisTable = jQ3(this);
      
      jQ3('#processoExpedienteTab table.rich-table.clearfix a[title="Visualizar ato"]').each(function(idx, el){

        var jEl = jQ3(el);
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
        
        if( ! jQ3('body').is('[j2E="mostrarSoExpedientes"]') )
          return;
        
        jQ3('body').prepend(jEl.parents('#processoExpedienteTab').find('table:first'));
        jQ3('body').find('div.navbar').hide();
        jQ3('body').css('overflow', 'overlay');
        jQ3('#pageBody').hide();
        

      });

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
      
      jQ3.initialize('a', function(){
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

    var _j2lockr = JSON.parse( lockr.get(window.location.search.substr(1) ) || '{"isNotValid":true}' );
    if(_j2lockr.isNotValid )
      return;

    lockr.rm(window.location.search.substr(1));
    var _act = _j2lockr;

    switch(_act.action){
      case 'abrirAutomaticoTarefa':
        var _load = {
          fowarded : true,
          task : 'fowardAction',
          j2 : true,
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
            
    lg('https://pje.tjma.jus.br sending message to https://frontend.prd.cnj.cloud', load );  
    
    if(!(iframe))
      window.parent.postMessage( load,'https://frontend.prd.cnj.cloud');
    else
      jQ3(iframe).prop('contentWindow').postMessage(load, 'https://frontend.prd.cnj.cloud');
  }
  
  function requisitarDadosSeTarefa(){
    if(window.location.pathname !== "/pje/Processo/movimentar.seam")
      return;
    
            
    window.addEventListener("load", function(){
      var _load = {
        'pathname' : window.location.pathname,
        'origin' : window.location.origin,
        'j2' : true,
        action : 'obterDadosTarefa'
      };
      __sendMessageToFrotEnd(_load);
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
  }
  
  function mostrarEtiquetasNosAutosDigitais(){
    jQ3.initialize('form#divTimeLine div.pesquisa.affix-top div.input-group', function(){
      var __ETQ_TEMPLATE__ = '<div _ngcontent-tnv-c13 class="label label-info label-etiqueta ng-star-inserted j2EtiquetaEstilo"><span _ngcontent-tnv-c13 >$</span></div>';
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
        
        if( data.count == 0 ){
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
  
 
  switch(window.location.pathname){
    case "/pje/Painel/painel_usuario/include/listTasksUsuarioPje2.seam":
      observeHistoricoTarefasEPrepararAtalhos();
      break;
    
    case '/pje/Processo/ConsultaProcesso/Detalhe/detalheParte.seam':
      personalizarTelefonesDasPartes();
      break;
      
    default:
      observeProcessoFolhaExpedientes();
      observeFormDetalheProcessoTarefasDoProcesso();
      encaminharAbrirTarefa();
      //setTimeout(encaminharAbrirTarefa, 5000);
      verificarSePaginaDeuErro();
      verificarSePaginaExpirou();
      observeSelectTipoDocumento();
      observeTarefaComPAC();
      requisitarDadosSeTarefa();
      listenMessages();
      personaliazarMenu();
      mostrarEtiquetasNosAutosDigitais();
      break;
  }
};

