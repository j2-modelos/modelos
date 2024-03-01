/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function fronendLoad(){    
  const __codificarNomeTarefa = j2.mod._.codificarNomeTarefa;
  const __prepararLinkTarefa = j2.mod._.prepararLinkTarefa;

  (function _default(){
    j2E.mods.shortcuts();
    /*addScript('Extensao/jquery.initialize.js');
    addScript('Extensao/jquery.lazy.js');*/
    addScript('Extensao/pjecomm.js')
                    
    console.log('j2Extension: loading origin https://pje.tjma.jus.br');
  })();
  
  var _responseBus = {};
  
  function __sendMessageToPje(load, iframeSelector, responseCallback){
    function guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
    
    if(!(load.j2)) 
      load.j2 = true;
    if(!(load.pathname)) 
      load.pathname = window.location.pathname;
    if(!(load.origin)) 
      load.origin = window.location.origin;
    
    lg('https://frontend.prd.cnj.cloud sending message to https://pje.tjma.jus.br', load );  
    
    if(responseCallback){
      load.responseBusTicket = guid();
      _responseBus[load.responseBusTicket] = {
          ticket : load.responseBusTicket,
          callback : responseCallback
      };
    }
        
    if(!(iframeSelector)){
      iframeSelector = 'iframe#frame-tarefa';
      
      if( ! jQ3(iframeSelector).length )
        return
      jQ3(iframeSelector).prop('contentWindow').postMessage(load, 'https://pje.tjma.jus.br');
      //document.body.querySelector('iframe#frame-tarefa').contentWindow.postMessage(_load, 'https://pje.tjma.jus.br');
    }
    else{
      switch(iframeSelector){
        case 'PARENT_TOP':
          window.parent.postMessage( load,'https://pje.tjma.jus.br');
          break;
        default:
          jQ3(iframeSelector).prop('contentWindow').postMessage(load, 'https://pje.tjma.jus.br');
          break;
      }
    }
  }
  window.j2E.mods.__sendMessageToPje = __sendMessageToPje

  function abrirAutomaticoTarefa(action){     
    function __fazerAjustesExibicaoPseudotarefaMovimentar(){
      jQ3.initialize('div#divSideBar', function(){
        jQ3(this).hide();
      })
      

      jQ3.initialize('div#divRightPanel', function(){
        jQ3(this).css({
          //filter : 'blur(5px)',
          width : '100%'
        }).attr('j2-view-pseudo-tarefa', 'true');
        
        jQ3.initialize('div#divProcessosTarefa', function(){
          jQ3(this).hide();
        }, { target : this });
        jQ3.initialize('div#divMainPanel', function(){
          jQ3(this).css({
            width : '100%'
          });
        }, { target : this });
      });
    }
    
    function __notifyFinished(){
      __sendMessageToPje({
        action : 'notifyPseudotarefaMovimentarLoaded', 
        orgAction : action
      }, 'PARENT_TOP');
    }
    
    console.log('running abrirAutomaticoTarefa');
    console.log(action);
    /*lg('div.overflowTarefas:last', jQ3('div.overflowTarefas:last'));
    lg('input', jQ3('form:last').find('input#itNrProcesso'));
    lg('button', jQ3('form:last').find('button.btn.btn-primary'));
    lg('observe', jQ3('div.overflowTarefas:last').observe);*/

    if( action.j2pseudotarefaMovimentar )
      __fazerAjustesExibicaoPseudotarefaMovimentar();

    var initPar, iniChild;
    initPar = jQ3.initialize('ul.ui-datalist-data', function(){
      var didOnce = false;
      iniChild = jQ3.initialize('li.ng-star-inserted', function(){          
        if(didOnce)
          return;

        didOnce = true;
        initPar.disconnect();
        iniChild.disconnect();

        if( action.j2pseudotarefaMovimentar )
          __notifyFinished();
      },
      {target : this});
    });

    /*function __hd(){
    //jQ3.initialize('div.overflowTarefas:last', function(){
      jQ3('div.overflowTarefas:last').observe('childlist', function(record){
          lg('observe div.overflowTarefas:last', record);
          if(record.addedNodes.length)
            defer(function(){
             console.log('defered')
              
              var rec = jQ3(record.addedNodes[0]);
              console.log(
                      'rec.$.text() === action.tarefa :', 
                      ( rec.find('span.nome span:first').text() || rec.find('span.nome').text() ) === action.tarefa, ' | ',
                      rec.find('span.nome span:first').text() || rec.find('span.nome').text(), ' # ', 
                      action.tarefa        
                         );
              if(( rec.find('span.nome span:first').text() || rec.find('span.nome').text() ) === action.tarefa)
                rec.find('a')[0].click();
            });
      });  
    //});
    
      // observar para selecionar o primeiro e unico processo da lista
     var initPar, iniChild;
     initPar = jQ3.initialize('ul.ui-datalist-data', function(){
       var didOnce = false;
       iniChild = jQ3.initialize('li.ng-star-inserted', function(){          
         if(didOnce)
           return;

         didOnce = true;
         initPar.disconnect();
         iniChild.disconnect();

         jQ3(this).find('a.selecionarProcesso')[0].click();
         if( action.j2pseudotarefaMovimentar )
           __notifyFinished();
       },
       {target : this});
     });
    
      jQ3('form:last').find('input#itNrProcesso').val(action.processo)[0].dispatchEvent(new Event('input'));;
      jQ3('form:last').find('button.btn.btn-primary')[0].click();
    }*/
  /*  function check__hd() { // tappac as new
      if (jQ3('form:last').find('input#itNrProcesso')[0] && jQ3('form:last').find('input#itNrProcesso')[0].dispatchEvent) {
        __hd();
      }
      else {
        window.setTimeout( check__hd, 10 );
      }
    }
    check__hd();*/

  };
  
  function recarregarFrameTrefa(action){
    console.log('running recarregarFrameTrefa');
    console.log(action);
    
    var frm = jQ3('iframe#frame-tarefa');
    frm.attr("src", frm.attr("src"));
  }
  
  function obterDadosTarefa(action){
    var _load = {
      a : {
        href : document.body.querySelector('div.no-padding.col-md-11 a').getAttribute('href'),
        outerHTML : document.body.querySelector('div.no-padding.col-md-11 a').outerHTML
      },
      action : 'respostaDadosTarefas',
      pathname : window.location.pathname,
      origin : window.location.origin,
      j2 : true,
      actionAnterior : action
    };
      
    __sendMessageToPje(_load);
    
  }
  
  function transicaoManterApenasIgnorarESairTarefa(){
    jQ3('div.dropdown.pull-right.ml-5 ul li').each(function(){
      var jEl = jQ3(this);
      var text = jEl.text().toLowerCase();
      if(!(text.match(/ignorar/) && text.match(/sair/) && text.match(/tarefa/)))
          jEl.hide();
    });
  }
  function transicaoRemover(action){
    var trnc = action.transicoes;
    
    jQ3('div.dropdown.pull-right.ml-5 ul li').each(function(){
      var jEl = jQ3(this);
      var text = jEl.text();
      
      if( trnc.includes(text) )
          jEl.hide();
    });
  }
  
  /*function abrirAutosDigitais(action, load){
    var _load = {
      action : 'abrirAutosDigitais',
      fowarded : true,
      j2Action : load
    };
      
    __sendMessageToPje(_load, 'PARENT_TOP');
  }*/
      
      
  function abrirPainelPseudoTarefas(action, load){
    var pseudoTarefas = new PseudoTarefas();
    
    var __PANEL_TEMPLATE__ = '<pseudo-tarefas _nghost-mqv-c9=""><div _ngcontent-mqv-c9="" class="rightPanel" id="divEtiquetas"><div _ngcontent-mqv-c9="" class="painel-listagem painel-etiquetas col-md-12"><div _ngcontent-mqv-c9="" class="pt-5 pb-5"><span _ngcontent-mqv-c9="" class="uppercase text-truncate">PSEUDOTAREFAS</span></div></div><div _ngcontent-mqv-c9="" class="pesquisa-etiquetas" id="pesquisa-etiquetas"><div _ngcontent-mqv-c9="" class="input-group col-md-12"><input _ngcontent-mqv-c9="" class="form-control ng-untouched ng-pristine ng-valid" id="itPesquisarEtiquetas" name="itPesquisarEtiquetas" placeholder="Pesquisar" type="text"><span _ngcontent-mqv-c9="" class="input-group-btn"><button _ngcontent-mqv-c9="" class="btn btn-default btn-pesquisa" title="Pesquisar"><i _ngcontent-mqv-c9="" class="fa fa-search"></i></button><button _ngcontent-mqv-c9="" class="btn btn-primary btn-pesquisa" title="Nova etiqueta"><i _ngcontent-mqv-c9="" class="fa fa-plus"></i></button></span></div><div _ngcontent-mqv-c9="" class="row botoes-acao-lote"><div _ngcontent-mqv-c9="" class="col-md-12 pl-0 pr-0 pt-5"><input _ngcontent-mqv-c9="" type="checkbox" class="ng-valid ng-dirty ng-touched"><button _ngcontent-mqv-c9="" class="btn btn-sm btn-default" data-target="#excluirModal" data-toggle="modal" title="Excluir selecionados"><i _ngcontent-mqv-c9="" aria-hidden="true" class="fa fa-trash"></i></button><!----></div></div></div><ul _ngcontent-mqv-c9="" class="list-group lista-etiquetas"><p-datalist _ngcontent-mqv-c9="" emptymessage="Nenhuma etiqueta encontrada"><div class="ui-datalist ui-widget"><!----><!----><div class="ui-datalist-content ui-widget-content"><!----><ul class="ui-datalist-data"><!----><li><!----><div _ngcontent-mqv-c9="" class="marcado">Nenhuma pseudo tarefa criada</div></li></ul></div><p-paginator styleclass="ui-paginator-bottom"><!----></p-paginator></div></p-datalist></ul></div><!----><!----><div _ngcontent-mqv-c9="" class="mainPanel"><!----><!----><!----></div><div _ngcontent-mqv-c9="" aria-labelledby="myModalLabel" class="modal fade container-fluid" id="excluirModal" role="dialog" tabindex="-1" wfd-invisible="true" style="display: none;"><div _ngcontent-mqv-c9="" class="modal-dialog" role="document"><div _ngcontent-mqv-c9="" class="modal-content"><div _ngcontent-mqv-c9="" class="modal-header"><button _ngcontent-mqv-c9="" aria-label="Close" class="close" data-dismiss="modal" type="button"><span _ngcontent-mqv-c9="" aria-hidden="true">×</span></button><b _ngcontent-mqv-c9=""><span _ngcontent-mqv-c9="" class="modal-title" id="myModalLabel" style="color: #0078AA">Confirmar exclusão?</span></b></div><div _ngcontent-mqv-c9="" class="modal-body"><p _ngcontent-mqv-c9="">A etiqueta pode estar vinculada a processos.</p><p _ngcontent-mqv-c9="">Ao confirmar a exclusão, toda a vinculação será perdida.</p></div><div _ngcontent-mqv-c9="" class="modal-footer"><button _ngcontent-mqv-c9="" class="btn btn-danger" data-dismiss="modal" id="btnExcluirModal" type="button">Excluir</button><button _ngcontent-mqv-c9="" class="btn btn-default" data-dismiss="modal" id="btnFecharModal" type="button">Cancelar</button></div></div></div></div></pseudo-tarefas>';
    var __FORM_TEMPLATE___ = '<div _ngcontent-mqv-c9="" class="formulario" novo style="display: inline-block;height: 100%;"><etiqueta-form _ngcontent-mqv-c9="" _nghost-lsh-c10=""><fieldset _ngcontent-vaj-c10=""><h1 _ngcontent-vaj-c10="" id="tituloEtiquetaForm"><span _ngcontent-vaj-c10="">Criar pseudotarefa</span></h1><div _ngcontent-vaj-c10="" class="input-group col-md-12"><label _ngcontent-vaj-c10="" for="nomeTag">Nome *</label><input _ngcontent-vaj-c10="" alt="Título" autofocus="" class="form-control ng-pristine ng-invalid ng-touched" id="nomeTag" name="nomeTag" placeholder="Titulo" required="" type="text"><div _ngcontent-vaj-c10="" class="input-group-btn"><button _ngcontent-vaj-c10="" class="btn btn-primary" type="submit">Salvar</button><button _ngcontent-vaj-c10="" class="btn btn-default ml-5" type="button">Cancelar</button></div></div></fieldset></etiqueta-form></div>';  
    var __LI_TEMPLATE__ = '<li _ngcontent-mqv-c9="" class="nivel-1 col-sm-12 etiqueta"><div _ngcontent-mqv-c9="" class="col-sm-1 no-padding vcenter pt-9 pl-5"><input _ngcontent-mqv-c9="" type="checkbox" class="ng-untouched ng-pristine ng-valid"></div><div _ngcontent-mqv-c9="" class="col-sm-8 no-padding"><span _ngcontent-mqv-c9="" class="vcenter"><i _ngcontent-mqv-c9="" class="fas fa-list">&nbsp;&nbsp;</i><span _ngcontent-mqv-c9="" class="nome-etiqueta" title="Ver lista de processos vinculados a esta etiqueta">$</span></span></div><div _ngcontent-mqv-c9="" class="col-sm-3 no-padding pl-0 pr-5"><div _ngcontent-mqv-c9="" class="acoes-etiqueta"><!----><!----><button _ngcontent-mqv-c9="" class="dropdown-toggle btn btn-default" data-toggle="dropdown" type="button"><i _ngcontent-mqv-c9="" class="fa fa-wrench text-info"></i></button><ul _ngcontent-mqv-c9="" class="dropdown-menu dropdown-menu-right" wfd-invisible="true"><li _ngcontent-mqv-c9=""><a _ngcontent-mqv-c9=""><i _ngcontent-mqv-c9="" class="fa fa-pencil-alt"></i> Editar</a></li><!----><li _ngcontent-mqv-c9=""><a _ngcontent-mqv-c9=""><i _ngcontent-mqv-c9="" class="fa fa-trash"></i> Excluir</a></li></ul></div></div></li>';
    var __FORM_EDIT_TEMPLATE___ = '<div _ngcontent-mqv-c9="" class="formulario" editar style="display: inline-block;height: 100%;"><etiqueta-form _ngcontent-mqv-c9="" _nghost-lsh-c10=""><fieldset _ngcontent-vaj-c10=""><h1 _ngcontent-vaj-c10="" id="tituloEtiquetaForm"><span _ngcontent-vaj-c10="">Editar pseudotarefa</span></h1><div _ngcontent-vaj-c10="" class="input-group col-md-12"><label _ngcontent-vaj-c10="" for="nomeTag">Nome *</label><input _ngcontent-vaj-c10="" alt="Título" autofocus="" class="form-control ng-pristine ng-invalid ng-touched" id="nomeTag" name="nomeTag" placeholder="Titulo" required="" type="text"><div _ngcontent-vaj-c10="" class="input-group-btn"><button _ngcontent-vaj-c10="" class="btn btn-primary" type="submit">Salvar</button><button _ngcontent-vaj-c10="" class="btn btn-default ml-5" type="button">Cancelar</button></div></div></fieldset></etiqueta-form></div>';  
        
    var ngPanel = jQ3('#rightPanel');
    var ngPanelPseudTarfs = jQ3(__PANEL_TEMPLATE__);
    
    var _obsv = [
      'etiquetas:nth-of-type(1)', 
      'div.painel-usuario-interno-dashboard.row:nth-of-type(1)', 
      'agrupadores:nth-of-type(1)', 
      'expedientes:nth-of-type(1)', 
      'ultimas-tarefas:nth-of-type(1)', 
      'consulta-processual:nth-of-type(1)',
      'pdpj-marketplace:nth-of-type(1)',
      'pseudo-tarefas:nth-of-type(1)'
    ];
    
    ngPanel.observe('childlist', _obsv.join(', '), function(rec){
      if(!(rec.addedNodes.length))
        return;
      
      if(jQ3(rec.addedNodes[0]).is('pseudo-tarefas')){
        jQ3(rec.addedNodes[0]).parent().children('*:not("pseudo-tarefas")').hide();
        jQ3(rec.addedNodes[0]).parent().children('etiquetas').find('#excluirModal').prop('id', 'excluirModal_hide');
      }
      else{
        jQ3(rec.addedNodes[0]).parent().children('*:not("pseudo-tarefas")').show();
        jQ3(rec.addedNodes[0]).parent().children('etiquetas').find('#excluirModal_hide').prop('id', 'excluirModal');
        jQ3(rec.addedNodes[0]).parent().children('pseudo-tarefas').remove();
      }
    });

    ngPanel.append( ngPanelPseudTarfs );
    
    function ____alert(msg){
      alert(msg);
    }
    
    /*
     * ROTINA - CALCULA OS CRITÉRIOS EXISTENTES NUMA TABELA DE FILSTROS/REGRAS DE CRITÉRIOS
     * 
     * @param {type} $inpuTipoTarefa
     * @returns {undefined|fronendLoad.abrirPainelPseudoTarefas._compilarOsCriteriosRegrasDaPseudoTarefa.caculatedCriteria|Array}
     */
    function _compilarOsCriteriosRegrasDaPseudoTarefa($inpuTipoTarefa){
      var $tblFiltros;
      switch($inpuTipoTarefa.val()){
        case 'TAREFA-ETIQUETA-VARIAS':
          $tblFiltros = jQ3('#pseudo-tipo-tarefa-etiqueta #tbFiltros');
          break;
        case 'ETIQUETA-VARIAS':
          $tblFiltros = jQ3('#pseudo-tipo-etiqueta #tbFiltros');
          break;
        default:
          return;
      }

      var caculatedCriteria = [];
      $tblFiltros.find('tr').each(function(){
        var eCri = [];
        jQ3(this).find(':nth-child(2)').find('span.criterio').each(function(){
          var j2Eprop = jQ3(this).prop('j2E');
          eCri.push(j2Eprop);
        });
        caculatedCriteria.push(eCri);
      });

      return caculatedCriteria;
    };
    
    /* 
     * PAINEL DA PSEUDOTAREFA, CRIA A ESTRURA DE EDIÇÃO DE PSEUDO TAREFA
     * 
     * O uso do parêmetro keyTipo sinaliza que a estrutura para edição da tarefa estará
     * sendo cmpilada
     * 
     * O param _li, indica o list item de um item de pseudotarefa selecionado no painel da esquerda
     * para edição, visualizaçao das definções da pseudotarefa
     * 
     * panel pseudotarefas lista */
    function criarPseudotarefaPainelListaProcessos(ngPanelPseudTarfs, _li){
           
      
      jQ3.get(chrome.runtime.getURL("Extensao/t/pseudotarefaLista.html"), function(data, status, xqhr){
        var _psdTarfList = jQ3(data);
        _psdTarfList.insertAfter( ngPanelPseudTarfs.find('div.mainPanel div.formulario etiqueta-form') );
        
        /*
         * ACTION - SELETOR TIPO TAREFA - CHANGE
         * LISTENER - REGISTRAR - AO ALTERAR O TIPO DA TAREFA
         * @type @exp;_psdTarfList@call;find@call;change
         */
        var $selTipPsTrf = _psdTarfList.find('#itSelectTipoPseudotarefa').change(function(){
           switch($selTipPsTrf.val()){
             case 'LISTA':
               _psdTarfList.find('#pseudo-tipo-lista-1, #pseudo-tipo-lista-2').show();
               _psdTarfList.find('#pseudo-tipo-tarefa-etiqueta, #pseudo-tipo-etiqueta').hide();
               break;
             case 'TAREFA-ETIQUETA-VARIAS':
               _psdTarfList.find('#pseudo-tipo-tarefa-etiqueta').show();
               _psdTarfList.find('#pseudo-tipo-lista-1, #pseudo-tipo-lista-2, #pseudo-tipo-etiqueta').hide();
               break;
             case 'ETIQUETA-VARIAS':
               _psdTarfList.find('#pseudo-tipo-etiqueta ').show();
               _psdTarfList.find('#pseudo-tipo-lista-1, #pseudo-tipo-lista-2, #pseudo-tipo-tarefa-etiqueta').hide();
               break;
           }
        });
        
        /*
         * ITERAÇÃO - DESABILITAR A ALTERAÇÃO DO TIPO DA TAREFA JÁ SALVA
         * 
         * O uso do parâmetro indica a edição de uma tarefa
         */
        
        if(_li && _li.prop('j2E')){
          $selTipPsTrf.val(_li.prop('j2E').tipo);
          $selTipPsTrf.attr('disabled', '');
          $selTipPsTrf.change();
        }
        
        /*
         * ITERAÇÃO - REGISTRAR LISTENERS PARA TABS DO TIPO DE CRITÉRIO
         * 
         * Para os tipos de não lista estrita de tarefa.
         */
        // mudança da tab active 
        jQ3(document.querySelectorAll('#divOpcoesTipoCriterio')).each(function(){
          var $divCr = jQ3(this);
          
          $divCr.find('div').click(function(){
            $divCr.find('div').removeClass('selecionado');
            var $this = jQ3(this);
            $this.addClass('selecionado');
            
            if($this.parents('#pseudo-tipo-tarefa-etiqueta')){
              var __sel = '';
              if( $this.is('[j2-op-tarefas]') )
                __sel = '[j2-selector-tarefas]';
              if( $this.is('[j2-op-etiquetas]') )
                __sel = '[j2-selector-etiquetas]';
              
              var $table = $this.parents('#pseudo-tipo-tarefa-etiqueta').find('#tbFiltroForm');
              $table.find('tr:not([j2-tr-criteria],[j2-tr-button])').hide();
              $table.find('tr' + __sel).show();
            }
          });
          
        });
        
        
        /*
         * ITERAÇÃO - REGISTRAR LISTENERS E ACTIONS PARA OS COMPONENTES DOS TIPOS DE TAREFAS QUE EXIGEM CRITÉRIO
         * 
         * Para os tipos de não lista estrita de tarefa.
         */
        jQ3('#pseudo-tipo-tarefa-etiqueta [j2-divSelector], #pseudo-tipo-etiqueta [j2-divSelector]').each(function(){
          var __TEMPLATE_CRITERIA_TR__ = '<tr _ngcontent-gss-c16="" class="ng-star-inserted"> <td _ngcontent-gss-c16="" align="right" valign="top" width="40"> <span _ngcontent-gss-c16="" class="criterioEOU ng-star-inserted">E</span> </td><td _ngcontent-gss-c16="" align="left"> <span _ngcontent-gss-c16="" class="parentesesCriterio">(</span> <span j2-criteria=""></span> <span _ngcontent-gss-c16="" class="parentesesCriterio">)</span> </td><td _ngcontent-gss-c16=""> <div _ngcontent-gss-c16="" class="col-md-12"> <span _ngcontent-gss-c16="" class="botao-acao ng-star-inserted"><i _ngcontent-gss-c16="" class="fa fa-trash" title="Excluir filtro"></i></span> </div></td></tr>';
          var __TEMPLATE_CRITERIA_PANEL_TABLE = '<div _ngcontent-gss-c16="" class="panel-body" wfd-invisible="true"><table _ngcontent-gss-c16="" id="tbFiltros" class="ng-star-inserted"><tbody _ngcontent-gss-c16=""></tbody></table></div>';
          
          var $this = jQ3(this);
          var $FerConsTarf = $this.find('[j2-FerramentaConsultaDeTarefa]');
          
          /*
           * exibir e oculstar a lista de processos ou de tarefas
           */
          $this.find('span.pi-chevron-down, div.ui-multiselect-label-container').click(function(){
            $FerConsTarf[ $FerConsTarf.is(':visible') ? 'hide' : 'show' ](500);            
          });
          $FerConsTarf.find('a').click(function(){
            $FerConsTarf.hide(500);            
          });
          
          /*
           * 
           * ITERAÇÃO - ADICIONAR CRITÉRIOS A LISTA QUE FICAM ABAIXO DAS SELEÇÕES
           * 
           * ação referente à adição de critérios OU que ficam abaixo
           */
          $this.parents('.tab-content').find('button:not(.ng-star-inserted,[j2-click-once])').click(function(){
            var __TEMPLATE__ = '<span _ngcontent-gss-c16="" class="criterio ng-star-inserted"><label _ngcontent-gss-c16="" title="Remover criério"><i _ngcontent-gss-c16="" class="fa fa-trash"></i></label> <span _ngcontent-gss-c16="" class="italico">$criterio</span> igual a <span _ngcontent-gss-c16="" class="textoCriterio">$criterioValor</span></span>';
            var $thisBut = jQ3(this);
            var propJ2E = $thisBut.parents('tr').find('p-multiselect').prop('j2E');
            if(!(propJ2E)){
              window.alert('O valor não é válido');
              console.error('####ERRO: o valor não é válido', propJ2E);
              return;
            }  
            var $cell = $thisBut.parents('tbody').find('> tr[j2-tr-criteria]').find('td:last');
            var alreadyExists = false;
            $cell.children().each(function(){
              var $c = jQ3(this);
              if( $c.prop('j2E').id === propJ2E.id ){
                alreadyExists = true;
              }
            });
            if(alreadyExists){
              window.alert('Este critério já foi adicionado.');
              console.error('####ERRO: Este critério já foi adicionado.', propJ2E);
              return;
            }
            
            var criterio = $thisBut.parents('tr').is('[j2-selector-tarefas]') ? 'Tarefa' : ($thisBut.parents('tr').is('[j2-selector-etiquetas]') ? 'Etiquetas' : '#ERRO');
            var criterioValor = propJ2E.nome;
            
            
            var html = __TEMPLATE__.replace('$criterio', criterio).replace('$criterioValor', criterioValor);
            var $criteria = jQ3(html);
            $criteria.prop('j2E', propJ2E);
            
            $cell.append( $criteria );
            $criteria.prev().append('<span _ngcontent-gss-c16="" class="criterioEOU ng-star-inserted">OU</span>');
            $thisBut.parents('tbody').find('> tr[j2-tr-button]').find('button').show();
            
            //para excluir
            $criteria.find('label').click(function(){
              if( $criteria.is(':last-child') ){
                $criteria.prev().find('.criterioEOU').remove();
              }
              $criteria.remove();                
              if($cell.children().length === 0)
                $thisBut.parents('tbody').find('> tr[j2-tr-button]').find('button').hide();
            });
            
            $thisBut.parent().prev().find('[j2-FerramentaConsultaDeTarefa]').hide(400);
            
          }).attr('j2-click-once', 'default');
          
          /*
           * ITERAÇÃO - AÇÕES REFERENTES A ADIÇÃO DE ITEM A TABELA DE CRITÉRIO À PARTE SUPERIOR
           */
          $this.parents('.tab-content').find('button.ng-star-inserted:not([j2-click-once])').click(function(){
            var $thisBut = jQ3(this);
            var $parentForm = $this.parents('div.form-fields');
            
            if( !( $parentForm.prop('j2E') ) ){
              var $panel = $parentForm.find('> div.panel.panel-default');
              $panel.append(__TEMPLATE_CRITERIA_PANEL_TABLE);
              
              var $tableBody = $panel.find('tbody');
              $parentForm.prop('j2E', {
                panel : $panel,
                tableBody : $tableBody
              });
              
              $tableBody.click(function(event){
                var $target = jQ3(event.target);
                if ( ! $target.is('i.fa.fa-trash') )
                  return;
                
                var $remTr = $target.parents('tr');
                if( $remTr.is(':first-child') )
                  $remTr.next().find('span.criterioEOU').remove();
                $remTr.remove();
              }); 
            }
            
            var $newTr = jQ3(__TEMPLATE_CRITERIA_TR__);
            var $regras = $thisBut.parents('tr').prev().find('td:last-child').children();
            
            $newTr.find('[j2-criteria]').replaceWith( $regras );
            $regras.find('.criterioEOU').append('<br _ngcontent-gss-c16>');
            $regras.find('label').replaceWith('<span class="criterioEOU" _ngcontent-gss-c16 >&nbsp;</span>');
            $regras.find('span.criterioEOU').get( 0 ).remove();

            
            $parentForm.prop('j2E').tableBody.append( $newTr );
            if( $newTr.is(':first-child') ) 
              $newTr.find('td:first-child').empty();
            
          }).attr('j2-click-once', 'default');
                   
          
          /*
           * ROTINA - SE EDIÇÃO, EXIBIR OS CRITÉRIO QUE ESTÃO SALVOS NA TABELA
           * @type @call;jQ3
           */
          (function _carregarOsCriteriosSalvosSeHouverATablea () {
            if( _li && _li.prop('j2E') && _li.prop('j2E').criteria && _li.prop('j2E').criteria.length &&
               ( 
                 ( $this.parents().is('#pseudo-tipo-tarefa-etiqueta') && (_li.prop('j2E').tipo === 'TAREFA-ETIQUETA-VARIAS') ) 
                 ||
                 ( $this.parents().is('#pseudo-tipo-etiqueta')  && ( _li.prop('j2E').tipo === 'ETIQUETA-VARIAS' ) )
               )     
              ){
              var $parentForm = $this.parents('div.form-fields');
              if( !($parentForm.prop('j2E') ) ){
                var $panel = $parentForm.find('> div.panel.panel-default');
                $panel.append(__TEMPLATE_CRITERIA_PANEL_TABLE);

                var $tableBody = $panel.find('tbody');
                $parentForm.prop('j2E', {
                  panel : $panel,
                  tableBody : $tableBody
                });

                $tableBody.click(function(event){
                  var $target = jQ3(event.target);
                  if ( ! $target.is('i.fa.fa-trash') )
                    return;

                  var $remTr = $target.parents('tr');
                  if( $remTr.is(':first-child') )
                    $remTr.next().find('span.criterioEOU').remove();
                  $remTr.remove();
                }); 
            
                var criteria = _li.prop('j2E').criteria;
                var __TEMPLATE_CRITERIA_SUP__ = '<span _ngcontent-gss-c16="" class="criterio ng-star-inserted"><span class="criterioEOU" _ngcontent-gss-c16="">&nbsp;</span> <span _ngcontent-gss-c16="" class="italico">$</span> igual a <span _ngcontent-gss-c16="" class="textoCriterio">$</span></span>';
                var __TEMPLATE_OR_BR__ = '<span _ngcontent-gss-c16="" class="criterioEOU ng-star-inserted">OU<br _ngcontent-gss-c16=""></span>';
                for(var i=0; i < criteria.length; i++){
                  var $par = jQ3('<div>');
                  for(var j=0; j < criteria[i].length; j++){
                    var _iJ2E = criteria[i][j];
                    var _label = '[INDEFINIDO]';
                    switch(_iJ2E.entity){
                      case 'etiqueta': _label = 'Etiquetas'; break;
                      case 'tarefa':     _label = 'Tarefas';   break;
                      case 'automacao':     _label = 'Automação';   break;
                    }
                    var _iHtml = __TEMPLATE_CRITERIA_SUP__.replaceOrd('$', _label, _iJ2E.nome);
                    var $jCri = jQ3(_iHtml);
                    $jCri.prop('j2E', _iJ2E);
                    $par.append($jCri);
                    if ( $jCri.is(':first-child') )
                      $jCri.find('.criterioEOU').remove();
                    $jCri.prev().append(__TEMPLATE_OR_BR__);
                  }
                  var $regras = $par.children();
                  var $newTr = jQ3(__TEMPLATE_CRITERIA_TR__);
                  $newTr.find('[j2-criteria]').replaceWith( $regras );
                  $parentForm.prop('j2E').tableBody.append( $newTr );
                  if( $newTr.is(':first-child') ) 
                    $newTr.find('td:first-child').empty();

                }
              }
            }
          })();
          
          /*
           * //Processar as listas de tarefas e etiquetas, requistar do servidor se necessário
           * @param {type} data
           * @returns {undefined}
           */
          (function _processarAsListasDeTarefasEEtiquetasDosFormularios(){
            function __processarDados(data){             
              var idKey = 'idTask';
              var nomeKey = 'nome';
              var entity = 'tarefa';

              if($this.is('[j2-sel-etiqueta]')){
                data = data.entities;
                idKey = 'id';
                nomeKey = 'nomeTag';
                entity = 'etiqueta';
              }

              var $ul = $FerConsTarf.find('ul');
              var $template = $ul.find('p-multiselectitem').detach();

              jQ3.each(data, function(idx, el){
                defer(function(){
                  var $tarf = $template.clone();

                  //$tarf.attr('id', el.idTask);
                  $tarf.prop('j2E', {
                    id : el[idKey],
                    nome : el[nomeKey],
                    entity : entity
                  });
                  $tarf.find('li').attr('aria-label', el[nomeKey]);
                  $tarf.find('span:last').text( el[nomeKey]);

                  $ul.append($tarf);
                });
              });
            }

            var listData = { noData : true };

            if($this.is('[j2-sel-tarefa]')){
              var curUserPje = JSON.parse( sessionStorage.getItem('currentUser') );
              listData = lockrSes.get( 'j2EPJeRest.tarefas.listar.data@idPapel=' + curUserPje.idPapel, listData);
            }
            else if($this.is('[j2-sel-etiqueta]'))
              listData = lockrSes.get( 'j2EPJeRest.etiquetas.listar.data' , listData);

            if ( listData.noData ){
              __sendMessageToPje({
                action : 'requisitarJ2EPJeRest',
                //PJeRest : 'j2EPJeRest.tarefas.listar',
                PJeRest : (function(){
                  if($this.is('[j2-sel-tarefa]'))
                    return 'j2EPJeRest.tarefas.listar';
                  if($this.is('[j2-sel-etiqueta]'))
                    return 'j2EPJeRest.etiquetas.listar';
                })(),
                waitsResponse : true,
                arguments : $this.is('[j2-sel-etiqueta]') ? [{ maxResults : 10000 }] : null
              }, 
              "PARENT_TOP",
              function(data){
                if($this.is('[j2-sel-tarefa]')){
                  var curUserPje = JSON.parse( sessionStorage.getItem('currentUser') );
                  lockrSes.set( 'j2EPJeRest.tarefas.listar.data@idPapel=' + curUserPje.idPapel, data);
                }
                else if($this.is('[j2-sel-etiqueta]'))
                  lockrSes.set( 'j2EPJeRest.etiquetas.listar.data' , data);

                __processarDados(data);
              });
            }else{
              __processarDados( listData );
            }

          })();
          
          /*
           * REGISTRAR LISTENER - TOGGLE PARA CONSULTA NO SELETOR
           */
          $FerConsTarf.find('input.ui-inputtext').keyup(function(){
            var v = jQ3(this).val().toLowerCase();
             $FerConsTarf.find('ul p-multiselectitem').filter(function() {
               var $_t = jQ3(this);
               $_t.toggle( $_t.text().toLowerCase().includes(v) );
             });
          });
          
          /*
           * REGISTRAR LISTENER - MOSTRAR APENAS UMA SELECIONADO
           * alternar selecção no dropdown de lestas
           * @type @exp;$FerConsTarf@call;find@call;click
           */
          var $ul = $FerConsTarf.find('ul').click(function(event){
            var $li_ = jQ3(event.target).parents('p-multiselectitem');
            var _tarf = $li_.prop('j2E');
            $this.find('p-multiselect').prop('j2E', _tarf);
            $this.find('span:first').text(' ' + _tarf.nome + ' ');
            
            $ul.find('li').removeClass('ui-state-highlight');
            $ul.find('span.ui-chkbox-icon').removeClass('pi pi-check');
            $ul.find('div.ui-chkbox-box').removeClass('ui-state-active');
            
            $li_.find('li').addClass('ui-state-highlight');
            $li_.find('span.ui-chkbox-icon').addClass('pi pi-check');
            $li_.find('div.ui-chkbox-box').addClass('ui-state-active');
          });
          
        });
        
        /*
         * ITERAÇÃO - CRIAR TABS JQUERY UI PARA O TIPO DE TAREFA DE LISTA ESTRITA DE PROCESSO
         * 
         * Para os tipos de não lista estrita de tarefa.
         */
        _psdTarfList.find('j2EjQUI #pseudoTarfOptions').addClass('pseudotarefasLoteOptions').tabs({
          create: function( event, ui ) {
            jQ3( 'ul a', event.target).addClass('btn');
            jQ3( 'div[role="tabpanel"]', event.target).css('height','100%');
          }
        });
        
        /*
         * LISTENER - REGISTRAR ACTION LIMPAR LISTA DE PROCESSOS A SEREM IMPORTADOS
         * ACTION - LIMPAR O PAINEL QUE POSSUI A LISTAGEM DE PROCESSOS A SEREM IMPORTADOS
         */
        _psdTarfList.find('button[j2e-lista-limpar-action]').click(function(){
          jQ3(_psdTarfList.find('#areaPasteProcessoLista').prop('contentDocument')).find('body').text('');
        });
        
        var _addedHashes = [];
        /*
         * CALLBACK DE LISTENER - ADICIONAR NUMERO DE PROCESSO A LISTA DE PROCESSOS REGISTRADOS NA PSEUDO TAREFA
         * @param {type} num
         * @param {type} supress
         * @param {type} processo
         * @returns {undefined}
         */
        function _adicionarProcessoAPseudotarefa(num, supress, processo){
          var _ul = _psdTarfList.find('ul.ui-datalist-data');
          
          if(_ul.text().allMatches(new RegExp(num)).length){
            (!(supress)) && ____alert("Esse processo já foi adicionado.");
            (!(supress)) && _inpProc.val('');
            return;
          }
          
          var _liT = _psdTarfList.find('ul.ui-datalist-data li[j2e-template]');
          var _liC = _liT.clone();
          
          _ul.find('li div.marcado').hide();
          
          _liC.find('span.nome-etiqueta').text(num);
          _liC.removeAttr('j2e-template');
          _liC.show();
          /*_liC.find('.processo-progress-bar').progressbar({
            value: false
          });*/
          
          (!(processo)) && delayCall( function() {
            __sendMessageToPje({
              action : 'requisitarIdProcesso',
              numUnico : num,
              waitsResponse : true
            }, 
            "PARENT_TOP",
            function(data){
              _liC.prop('j2e').idProcesso = data.idProcesso;
              _liC.prop('j2e').entidadeTarefa = data.tarefaEntidade;
            });
          });
          (!(processo)) && _liC.prop('j2e', (!(processo)) ? {
            num : num,
            dataEntrada : new Date().getTime()
          } : processo);
                    
          _ul.append(_liC);
        }
        
        /*
         * ITERAÇÃO - EM MODO DE EDIÇÃO - CARREGA OS PROCESSOS ASSOCIADOS A 
         * PSEUDOTAREFA NO PAINEL INTERNO DE PROCESSOS DO SUBPAINEL DE PESEUDO TAREFAS
         * 
         * Executa quando o tipo da tarefa for de lista estrita de processos
         */
        _li && _li.prop('j2E') && $.each(_li.prop('j2E').dados, function(idx, processo) {
          if(!(processo))
            return;
          
          _adicionarProcessoAPseudotarefa(processo.num, true, processo);
        });
        
        /*
         * LISTENER - REGISTRAR - AO CLICKAR NO BOTÃO DE ADICONAR TAREFA
         * ACTION - ADICIONA ÚNICO PROCESSO À LISTA INTERNA NO SUB PAINEL
         * 
         * COMPONENTE: Botão adicionar no painel interno de lista de processos
         * @type @exp;_psdTarfList@call;find
         */
        var _inpProc = _psdTarfList.find('#itAdicionarPesquisarProcesso');
        _psdTarfList.find('button[j2e-action-adicionar-processo]').click(function(){
          var _ = _inpProc.val().allMatches(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/);
          if(!(_.length)){
            ____alert("O número do processo não é válido.");
            return;
          }
          
          _adicionarProcessoAPseudotarefa( _[0] );
          _inpProc.val('');
        });
        
        _psdTarfList.find('button[j2e-lista-adicionar-lote-action]').click(function(){
          var _lotField = jQ3(_psdTarfList.find('#areaPasteProcessoLista').prop('contentDocument')).find('body');
          var _val = _lotField.text();
          var _thisHash = _val.hashCode();
                    
          if(_addedHashes.indexOf(_thisHash) !== -1){
            ____alert("Este conjunto de dados já foi tratado.");
            return;
          }else
            _addedHashes.push(_thisHash);
          
          var _ = _val.allMatches(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/);
          if(!(_.length)){
            ____alert("Nenhum processo foi encontrado neste conjunto de dados.");
            return;
          }
          
          jQ3.each(_, function(){
            var _this = this;
            defer(function(){
              _adicionarProcessoAPseudotarefa(_this, true);
            }, 333);
          });
          
          _lotField.text('');
                    
        });
        
        /*
         * ROTINA - TORNAR EDITÁVEL A IFRAME CRIADA
         * @param {type} json
         * @returns {undefined}
         */
        jQ3(_psdTarfList.find('#areaPasteProcessoLista').prop('contentDocument')).find('body').attr('contenteditable', 'true');
      });
    }
    
    /* 
     * ATUALIZA O PAINEL LATERAL COM A LISTA DAS PESEUDOTAREFAS
     * listar as tarefas */
    function updateListaTarefas(json){
      var _tarfs = json.data;
      var _ul = ngPanelPseudTarfs.find('ul.ui-datalist-data:first');
      
      _ul.find('li:not(":first")').remove();
      
      if(_tarfs.length){
        _tarfs.sort(function(a, b){
            return  a.nome.localeCompare(b.nome);
        });
        
        _ul.find('li div.marcado').hide();
        
        jQ3.each(_tarfs, function(idx, key){
          var _li = jQ3(__LI_TEMPLATE__.replace('$', key.nome ));
          _li.prop('j2E', key);
          _ul.append(_li);
                    
          defer(function(){
            /*
             * CALLBACK DE ACTION - ITEM NA LISTA DE PSEUDO TAREFAS - EDITAR
             * @returns {undefined}
             */
            function processEditClick(){
              ngPanelPseudTarfs.find('div.mainPanel div.formulario').remove();

              var jForm = jQ3(__FORM_EDIT_TEMPLATE___);

              ngPanelPseudTarfs.find('div.mainPanel').append(jForm);
              criarPseudotarefaPainelListaProcessos(ngPanelPseudTarfs, _li);
              
              var _inp = ngPanelPseudTarfs.find('div.mainPanel div.formulario #nomeTag');
              _inp.val( key.nome );
              
              /*
               * ACTION - PAINEL EDIÇÃO PSEUDO TAREFA - SALVAR
               */
              jForm.find('button.btn.btn-primary').click(function(){
                
                if(_inp.val().length < 3){
                  alert('Digite um nome válido para pseudotarefa');
                  return;
                }
                
                /*pseudoTarefas.atualizarTarefa(key.nome, _inp.val() );
                updateListaTarefas();*/
                var _inpTipoTarefa = ngPanelPseudTarfs.find('#itSelectTipoPseudotarefa');
                
                var dadosProcessos = [];
                ngPanelPseudTarfs.find('pseudotarefas-lista ul[j2E-pseudotarefa-processos-lista]').children('li:not(:first)').each(function(){
                    jQ3(this).prop('j2e') && dadosProcessos.push(jQ3(this).prop('j2e'));
                });
                
                
                key.nome =  _inp.val() ;
                key.dados = dadosProcessos || [];
                key.criteria = _compilarOsCriteriosRegrasDaPseudoTarefa(_inpTipoTarefa);
                pseudoTarefas.atualizarTarefa( key, updateListaTarefas );
              });
              
              /*
               * LISTENER - REGISTRAR - EVENTO: EDITAR PESEUDOTAREFA
               * ACTION - PAINEL EDIÇÃO PSEUDO TAREFA - CANCELAR
               */
              jForm.find('button.btn.btn-default.ml-5').click(function(){
                jForm.remove();
              });
            }
            function processDeleteClick(){
              if( window.confirm("Remover tarefa " + key.nome +  "?") === true)
                pseudoTarefas.deletarTarefa(key, updateListaTarefas);
            }
            
            /*
             * LISTENER - REGISTRAR - EVENTO: EDITAR PESEUDOTAREFA
             * 
             * Mesma ação da versão anterior do PJe. Atualmente, uma lista das
             * tarefas aparece
             */
            _li.find('span.nome-etiqueta').click( processEditClick );
            
            /*
             * LISTENER - REGISTRAR - EVENTO: EDITAR PESEUDOTAREFA
             */
            _li.find('ul.dropdown-menu.dropdown-menu-right li:first').click( processEditClick );
            
            /*
             * LISTENER - REGISTRAR - EVENTO: DELETAR PESEUDOTAREFA
             */
            _li.find('ul.dropdown-menu.dropdown-menu-right li:last').click( processDeleteClick );
          });
          
        });
      }else
        _ul.find('li div.marcado').show();
    }
    pseudoTarefas.listarTarefas(updateListaTarefas);
    
    /* 
     * PAINEL LATERAL - PARTE SUPERIOR - ACTION - CRIAR NOVA TAREFA
     * 
     */
    ngPanelPseudTarfs.find('button.btn.btn-primary.btn-pesquisa:not([j2-click-once])').click(function(){
      if(ngPanelPseudTarfs.find('div.mainPanel div.formulario[novo]').length !== 0)
        return;
      ngPanelPseudTarfs.find('div.mainPanel div.formulario[editar]').remove();
      
      var jForm = jQ3(__FORM_TEMPLATE___);
     
      ngPanelPseudTarfs.find('div.mainPanel').append(jForm);
      
      /*
       * PAINEL PSEUDO PSEUDOTAREFA - CRIAR NOVA TAREFA - SALVAR ACTION
       */
      jForm.find('button.btn.btn-primary').click(function(){
        var _inp = ngPanelPseudTarfs.find('div.mainPanel div.formulario #nomeTag');
        var _inpTipoTarefa = ngPanelPseudTarfs.find('#itSelectTipoPseudotarefa');
        
        if(_inp.val().length < 3){
          alert('Digite um nome válido para pseudotarefa');
          return;
        }
        
        var dadosProcessos = [];
        ngPanelPseudTarfs.find('pseudotarefas-lista ul[j2E-pseudotarefa-processos-lista]').children('li:not(:first)').each(function(){
          var jT = jQ3(this);
          jT.prop('j2e') && dadosProcessos.push(jT.prop('j2e'));
        });
        
        var criteria = _compilarOsCriteriosRegrasDaPseudoTarefa(_inpTipoTarefa);
        
        /*
         * MÉTODO: uitiliza método de objeto pseudoTarefas para criar uma nova 
         * pseudotarefa
         */          
        pseudoTarefas.criarTarefa( _inp.val(), _inpTipoTarefa.val(), function(data){
          updateListaTarefas(data);
          ngPanelPseudTarfs.find('div.mainPanel div.formulario').remove();
        }, dadosProcessos, criteria);

      });
      /*
       * PAINEL PSEUDO PSEUDOTAREFA - CRIAR NOVA TAREFA - CANCELAR ACTION
       */
      jForm.find('button.btn.btn-default.ml-5').click(function(){
        jForm.remove();
      });
      
      /*
       * Cria toda a estrutura para edição das peseudo tarefas
       * @returns {undefined}
       */
      criarPseudotarefaPainelListaProcessos(ngPanelPseudTarfs);
      
    }).attr('j2-click-once', 'default');;
    
  }

  function listenMessages(){
    window.addEventListener('message', function(event){
      if (event.origin.startsWith('https://pje.tjma.jus.br')) {
        var _load = event.data;
        if(!(_load.j2))
          return;

        console.log('message from origin https://pje.tjma.jus.br :', _load);
        
        var _act = (_load.fowarded) ? _load.j2Action : _load;

        switch(_act.action){
          case 'abrirAutomaticoTarefa':
            abrirAutomaticoTarefa(_act);
            break;
          case 'recarregarFrameTrefa':
            recarregarFrameTrefa(_act);
            break;
          case 'obterDadosTarefa':
            obterDadosTarefa(_act);
            break;
          case 'transicaoManterApenasIgnorarESairTarefa':
            transicaoManterApenasIgnorarESairTarefa(_act);
            break;
          case 'transicaoRemover':
            transicaoRemover(_act);
            break;
          case 'abrirPainelPseudoyarefas':
            abrirPainelPseudotarefas(_act, _load);
            break;
          case 'requisitarIdProcessoResponse':
            requisitarIdProcessoResponse(_act);
            break;
          case 'requisitarConsultaTarefasResponse':
            requisitarConsultaTarefasResponse(_act);
            break;
          case 'requisitarDadosTarefaDoProcessoResponse':
            requisitarDadosTarefaDoProcessoResponse(_act);
            break;
          case 'getHTMLAutosDigiaisResponse':
            getHTMLAutosDigiaisResponse(_act);
            break;
          case 'requisitarJ2EPJeRestResponse':
          case 'requisitarSeamIteractionResponse':
            getJ2EPJeRestResponseResponse(_act);
            break;
          case 'fowardNotifyPseudotarefaMovimentarLoaded':
            fowardNotifyPseudotarefaMovimentarLoaded(_act);
            break;
          case 'triggerEventFromPJe':
            triggerEventFromPJe(_act);
            break;
          
        }
      }
    });
  }

  function triggerEventFromPJe(action){
    evBus.fire(action.evento.tipo, action.evento.argumentos)
  }
  
  function fowardNotifyPseudotarefaMovimentarLoaded(action){
    evBus.fire('fowardedNotifyPseudotarefaMovimentarLoaded', action);
  }
  
  function getHTMLAutosDigiaisResponse(action){
    var _ticket = action.callerAction.responseBusTicket;
    if( _responseBus[_ticket].callback ){
      _responseBus[_ticket].callback(action, action);
      defer(function(){
        delete _responseBus[_ticket];
      });
    }
  }
  
  function getJ2EPJeRestResponseResponse(action){
    var _ticket = action.callerAction.responseBusTicket;
    if( _responseBus[_ticket].callback ){
      _responseBus[_ticket].callback(action.data, action.status, action);
      defer(function(){
        delete _responseBus[_ticket];
      });
    }
  }
  
  function requisitarDadosTarefaDoProcessoResponse(action){
    var _ticket = action.callerAction.responseBusTicket;
    if( _responseBus[_ticket].callback ){
      _responseBus[_ticket].callback(action.data, action);
      defer(function(){
        delete _responseBus[_ticket];
      });
    }
  }
  
  function requisitarConsultaTarefasResponse(action){
    var _ticket = action.callerAction.responseBusTicket;
    if( _responseBus[_ticket].callback ){
      _responseBus[_ticket].callback(action.data, action);
      defer(function(){
        delete _responseBus[_ticket];
      });
    }
  }
  
  function requisitarIdProcessoResponse(action){
    var _ticket = action.callerAction.responseBusTicket;
    if( _responseBus[_ticket].callback ){
      _responseBus[_ticket].callback({
        idProcesso : action.idProcesso,
        tarefaEntidade : action.tarefaEntidade
      });
      defer(function(){
        delete _responseBus[_ticket];
      });
    }
  }

  function observeListaDeProcessosTarefaAtiva(){
    function formatarStickerAnotacao(_this){
      //formatar a notinha
      jQ3('i.fas.fa-sticky-note.fa-lg.text-info', _this).addClass('j2ColorIsOrange');
    }
    function formatarEtiqueta(_this){
      //formatar a etiqueta
      jQ3('div.label.label-info.label-etiqueta.ng-star-inserted', _this).addClass('j2EtiquetaEstilo');
    }
    function inserirFolder(_this){
      const __lockr = new createLockr('j2E')
      var ___TEMPLATE___ = '<div j2e-folder class="col-sm-12 no-padding"><span j2e-folder class="ui-multiselect-trigger-icon ui-clickable pi pi-chevron-up" style="float: right;cursor: pointer;"></span></div>';
      var $div = jQ3(___TEMPLATE___);
      var $span = $div.find('span');
      var $this = jQ3('processo-datalist-card > div', _this);
      
      
      $div.appendTo($this);
      
      function __foldIn(noAnimation){
        $this.attr('j2-initial-height', $this.css('height') );

        if(noAnimation){
          var cl = $this.find('> div:not("[j2e-folder]"):last').clone();
          $this.css({ height : '45px' }).find(' > div:not("[j2e-folder]")').hide();
            
          cl.find('> span, > div').remove();
          cl.appendTo($this);
          cl.css({opacity : 0, display : '', marginTop : '-16px'});
          cl.css({opacity : 1, paddingLeft : '25px'});
          $span.animateRotate(0, 180, 500);
            
        }else{
          var cl = $this.find('> div:not("[j2e-folder]"):last').clone();
          $this.animate({ height : '45px' }, 500).find(' > div:not("[j2e-folder]")').hide(500);
            setTimeout(function(){
              cl.find('> span, > div').remove();
              cl.appendTo($this);
              cl.css({opacity : 0, display : '', marginTop : '-16px'});
              cl.animate({opacity : 1, paddingLeft : '25px'}, 500);
              setTimeout(function(){ $span.animateRotate(0, 180, 500); }, 500 );
            }, 500);
        }
        $span.attr('j2e-is-folded', true);
        
      }
      
      $span.click(function(){
        var _fg = $span.attr('j2e-is-folded');
        if(!(_fg)){
          __foldIn();
          
          __lockr.set('.j2e-is-folded:' + $this.find('[id]').prop('id'), true );
        }else{
          var cl = $this.find('> div:not("[j2e-folder]"):last');
          cl.animate({opacity : 0, paddingLeft : '0px'}, 500);
          setTimeout(function(){ 
            cl.remove(); 

            $this.find('> div:not("[j2e-folder]")').css({opacity : 0, display : ''});
            $this.animate({ height : $this.attr('j2-initial-height') }, 500).find(' > div:not("[j2e-folder]")').animate({opacity : 1}, 600);
            setTimeout(function(){ $span.animateRotate(180, 0); }, 1150 );
          }, 525);
          $span.removeAttr('j2e-is-folded');
          
          __lockr.set('.j2e-is-folded:' + $this.find('[id]').prop('id'), false );
        }
      });
      
      if( __lockr.get('.j2e-is-folded:' + $this.find('[id]').prop('id'), false) === true ){
        __foldIn(true);
      }
    }
    function formatarPrioridade(_this){
      //formatar a prioridade
      jQ3('div.col-sm-6.vcenter.pull-left', _this).each(function(idx, el){
        var jEl = jQ3(el);
        if(jEl.find('i').length){
        jEl.parent().addClass('ePrioridade');
        jEl.find('i').addClass('prioridadeCor');
        }
      });
    }
    function formatarEDestacarPrazo(_this){
      var _ngStar = _this;
      
      //Destacar o prazo
      var _resolvePrazo = function(jEl, _days){
        if( isNaN(_days))
          return false;

        //if(_days >= 15)
        const _txt = jEl.find('[txt]')
        if(! _txt.length)
          jEl.text( jEl.text() + '  (' + _days + ')' );
        else
          _txt.text( _txt.text() + '  (' + _days + ')' );

        if(_days < 15)
          return true;
        else if(15 <= _days && _days <25)
          jEl.addClass('dias15a25 dataPadding');
        else if(25 <= _days && _days <30)
          jEl.addClass('dias25a30 dataPadding');
        else
          jEl.addClass('dias30mais dataPadding');



        return true;
      };
      
      if( jQ3(_this).is('span[j2e-processo-data-movimento]') ){
        const jEl = jQ3(_this);
        let [_d] = jEl.text().match(/[0-9]{2}-[0-9]{2}-[0-9]{2}/)
        _d = _d.split('-').reverse();
        const _days = Math.trunc(moment.duration(moment().diff(moment(_d, 'YY-MM-DD'))).asDays());
        jEl.attr('j2eorgtext', jEl.text());
        
        _resolvePrazo(jEl, _days);
        return;
      }
      
      jQ3('div.date.col-sm-6.text-right.text-muted.no-padding', _this ).find('span').each(function(idx, el){

        var jEl = jQ3(el);
        var jElRelContentEtiqueta = jEl.parents('processo-datalist-card').find('div.col-sm-11.no-padding.pt-5');
        var jElc = jEl.clone(true);
        var _this = this;
        if(!(jEl.text().length) || jEl.attr('j2HighlighPrazo') === 'sim')
          return;

        var _d = jEl.text().split('-').reverse();
        var _days = Math.trunc(moment.duration(moment().diff(moment(_d, 'YY-MM-DD'))).asDays());
        jEl.attr('j2eorgtext', jEl.text());
        _resolvePrazo(jEl, _days);

        jEl.attr('j2HighlighPrazo', 'sim');
        const $jElC = jEl.clone(true)
        const _text = $jElC.text()
        $jElC.empty()
        $jElC.append('<i class="fas fa-check-square" j2e-proc-data-task>')  
        $jElC.append( `<span>${_text}</span>`)
        jEl.replaceWith( jQ3('<div>', {class: 'datasProcesso'}).append( $jElC ) );

        //etiqueta como prazo
        function treateEtiquetaSeComoData(elpz){
          var jElpz = jQ3(elpz);
          var _d2 = jElpz.text().match(/[0-9]{4}\.[0-9]{2}\.[0-9]{2}/);
          if(!(_d2))
            return;

          _d2 = _d2.toString();

          var _d2 = _d2.split('.');
          var _pzDays = Math.trunc(moment.duration(moment().diff(moment(_d2, 'YYYY-MM-DD'))).asDays());

          var jElcPz = jElc.clone(true);
          jElcPz.text( jElpz.text() );
          jElcPz.addClass('j2EtiquetaEstilo dataPadding isBold');
          if(!(_resolvePrazo(jElcPz, _pzDays)))
            return;

          jQ3('div.datasProcesso', _ngStar).append(jElcPz);
          jElRelContentEtiqueta.observe('childList', 'div.label.label-info.label-etiqueta.ng-star-inserted', function(rec){
            if(rec.removedNodes.length && jElcPz.text().match( new RegExp(jQ3(rec.removedNodes).text()) ) !== null)
              jElcPz.remove();
          });
        };
        jQ3('div.label.label-info.label-etiqueta.ng-star-inserted', _ngStar).each(function(idx, elpz){
          treateEtiquetaSeComoData(elpz);
        });

        jElRelContentEtiqueta.observe('childList', 'div.label.label-info.label-etiqueta.ng-star-inserted', function(rec){
          if(rec.addedNodes.length)
            treateEtiquetaSeComoData(rec.addedNodes[0]);
        });

      });
    }
    //observar filtro da Tarefa
    function prepararPseudotarefaAtiva(_this){
      var ___TEMPLATE_CARD_TAREFA__ = `<li class="ng-star-inserted" data-loader="getInfosPJe" je2-pseudotarefa><processo-datalist-card _ngcontent-orb-c10="" _nghost-orb-c14="" class="ng-star-inserted"><div _ngcontent-orb-c14="" class="datalist-content"><div _ngcontent-orb-c14="" class="row icones"><div _ngcontent-orb-c14="" class="col-sm-6 vcenter pull-left"><span _ngcontent-orb-c14="" class="sr-only">Tarefa bloqueada por </span> &nbsp; <span _ngcontent-orb-c14="" class="sr-only">Processo sigiloso - vermelho</span> &nbsp; <span _ngcontent-orb-c14="" class="sr-only">Processo pedido de liminar - vermelho</span> &nbsp; <span _ngcontent-orb-c14="" class="sr-only">Processo prioritário - azul</span> &nbsp; <span _ngcontent-orb-c14="" class="sr-only">Processo conferido - azul</span></div><div _ngcontent-orb-c14="" class="date col-sm-6 text-right text-muted no-padding"><pje-lembretes _ngcontent-orb-c14="" _nghost-orb-c28=""><button _ngcontent-orb-c28="" class="btn btn-default icon ng-star-inserted" title="Criar lembrete" type="button"><i _ngcontent-orb-c28="" aria-hidden="true" class="fas fa-thumbtack fa-lg text-info"></i></button></pje-lembretes><pje-link-autos-digitais _ngcontent-orb-c14="" _nghost-orb-c29=""><button _ngcontent-orb-c29="" class="btn btn-default" title="Abrir autos" type="button"><i _ngcontent-orb-c29="" aria-hidden="true" class="fa fa-book fa-lg text-info"></i></button></pje-link-autos-digitais> / <span _ngcontent-orb-c14="">$dataEntreadaTarefa</span></div></div><div _ngcontent-orb-c14="" class="selecionarProcesso pull-left pr-10 pt-5"><button _ngcontent-orb-c14="" class="botao-selecionar ng-star-inserted" type="button"><i _ngcontent-orb-c14="" class="far marcar-todos fa-square"></i></button></div><div _ngcontent-orb-c14="" class="col-sm-11 no-padding pt-5"><a _ngcontent-orb-c14="" class="selecionarProcesso" href="javascript:;"><div _ngcontent-orb-c14=""><span _ngcontent-orb-c14="" class="checked"></span><span _ngcontent-orb-c14="" class="tarefa-numero-processo process"><span _ngcontent-orb-c14="" class="hidden" id="$idProcesso"></span> $siglaClass $numeroProcesso </span></div><span _ngcontent-orb-c14="" class="tarefa-numero-processo process"> $assuntoCNJ </span></a><span _ngcontent-orb-c14="" class="orgao col-sm-12 no-padding"> / 2º Juizado Especial Cível de Imperatriz / Juiz de Direito Titular </span><span _ngcontent-orb-c14="" class="local col-sm-12 no-padding"><span _ngcontent-orb-c14="" class="dtPoloAtivo">$poloAtivo X </span><span _ngcontent-orb-c14="" class="dtPoloPassivo">$poloPassivo</span></span><span _ngcontent-orb-c14="" class="local col-sm-12 no-padding ng-star-inserted"><span _ngcontent-orb-c14="" class="tituloNegrito">Última movimentação: </span><span _ngcontent-orb-c14="" class="dtPoloPassivo">$ultimoMovimento.</span></span></div></div></processo-datalist-card></li>`
      var ___LAZY_DATA___ = '<span j2e-lazy-load id="tarfData-$">[carregando...]</span>';
      var jElOrg = jQ3(_this);
      var $this = jQ3(_this);
      var pjeQuery = JSON.parse(atob(decodeURIComponent(window.location.hash.split('/').pop())));
      var initNome = pjeQuery['j2-pseudotarefa'] ? pjeQuery['j2-pseudotarefa'].nome : jElOrg.text().trim();
      var tarf = TarefasProps[initNome];
      var delayCall = new DelayedCall(750, 1500);
      

      if(!(tarf && tarf.EPseudo ))
        return;
      
      var $rootProcTarf = jQ3(_this).parents('processos-tarefa');
      var $procsUl = $rootProcTarf.find('p-datalist ul.ui-datalist-data');
      
      $rootProcTarf.prop('j2E', {
        PseudoTarefa : tarf
      }).attr('j2e-e-pseudotarefa', 'true');
      
      
      if(tarf.tipo==='TAREFA-ETIQUETA-VARIAS')
        return;
      
      if(!(tarf.possuiDadosTarefa())){
        //alert('sem dados');
      }
      
      tarf.transporDados();
      
      jQ3.each(tarf.dados, function(idx, tarfData){
        var _keys;
        if( tarf.dados.transposed ){
          _keys = [
            { $ : 'idProcesso',         val : tarfData.idProcesso || 0 },
            { $ : 'numeroProcesso',     val : tarfData.num },
            { $ : 'dataEntreadaTarefa', val : tarfData.dataEntrada              ? moment(tarfData.dataEntrada).format('DD-MM-YY') : moment().format('DD-MM-YY')                     },
            { $ : 'siglaClass',         val : tarfData.classeJudicial           ? tarfData.classeJudicial                         : ___LAZY_DATA___.replace('$', 'siglaClass')      },
            { $ : 'assuntoCNJ',         val : tarfData.assuntoPrincipal         ? tarfData.assuntoPrincipal                       : ___LAZY_DATA___.replace('$', 'assuntoCNJ')      },
            { $ : 'ultimoMovimento',    val : tarfData.descricaoUltimoMovimento ? tarfData.descricaoUltimoMovimento               : ___LAZY_DATA___.replace('$', 'ultimoMovimento') },
            { $ : 'poloAtivo',          val : tarfData.poloAtivo                ? tarfData.poloAtivo                              : ___LAZY_DATA___.replace('$', 'poloAtivo')       },
            { $ : 'poloPassivo',        val : tarfData.poloPassivo              ? tarfData.poloPassivo                            : ___LAZY_DATA___.replace('$', 'poloPassivo')     }
          ];
        }else{
          _keys = [
            { $ : 'dataEntreadaTarefa', val : tarfData.dataEntrada ? moment(tarfData.dataEntrada).format('DD-MM-YY') : moment().format('DD-MM-YY') },
            { $ : 'idProcesso', val : tarfData.idProcesso || 0 },
            { $ : 'numeroProcesso', val : tarfData.num },
            { $ : 'siglaClass', val : tarfData.entidadeTarefa ? tarfData.entidadeTarefa.classeJudicial : ___LAZY_DATA___.replace('$', 'siglaClass') },
            { $ : 'assuntoCNJ', val : tarfData.entidadeTarefa ? tarfData.entidadeTarefa.assuntoPrincipal : ___LAZY_DATA___.replace('$', 'assuntoCNJ') },
            { $ : 'ultimoMovimento', val : ___LAZY_DATA___.replace('$', 'ultimoMovimento') },
            { $ : 'poloAtivo', val : tarfData.entidadeTarefa ? tarfData.entidadeTarefa.poloAtivo : ___LAZY_DATA___.replace('$', 'poloAtivo') },
            { $ : 'poloPassivo', val : tarfData.entidadeTarefa ? tarfData.entidadeTarefa.poloPassivo : ___LAZY_DATA___.replace('$', 'poloPassivo') }
          ];
        }
        var ins = ___TEMPLATE_CARD_TAREFA__;
        
        jQ3.each(_keys, function(idx, key){
          ins = ins.replace('$' + key.$, key.val);
        });
        
        var $liTarfCard = jQ3(ins);
        
        $liTarfCard.prop('j2E', {
          tarfData : tarfData
        }).attr('j2e-e-pseudotarefa', 'true');
        
        $procsUl.append( $liTarfCard );
        $procsUl.prev().hide();

        tarfData?.etiquetas?.forEach(etq=>{
          const $fragTagTemplate = jQ3(`
            <div _ngcontent-orb-c14="" class="label label-info label-etiqueta ng-star-inserted j2EtiquetaEstilo">
              <span _ngcontent-orb-c14="">${etq.nomeTag}</span>
              <span _ngcontent-orb-c14="" class="icon-desvincular-tag pl-5" title="Remover etiqueta '${etq.nomeTag}'">
                <i _ngcontent-orb-c14="" class="fa fa-times "></i>
              </span>
            </div>`)

          $fragTagTemplate.find('i').click((evJq)=>{
            __sendMessageToPje({
              action : 'requisitarJ2EPJeRest',
              PJeRest : 'j2EPJeRest.etiquetas.remover',
              waitsResponse : true,
              arguments : [etq.idProcesso, etq.id]
            }, 
            "PARENT_TOP", 
            res=> $fragTagTemplate.remove())
          })
          
          $liTarfCard.find('a.selecionarProcesso').parent().append( $fragTagTemplate )          
        })
        
        //$liTarfCard.Lazy({
        /*$liTarfCard.find('div.datalist-content').lazyObserve({
          root : $liTarfCard.parents('#processosTarefa'),
          load: function($li) {
            delayCall(function(){
              if(tarfData.htmlAutosDigitais){
                ;
                //var _diff = Math.trunc(moment.duration(moment().diff(moment(tarfData.htmlAutosDigitais.dadoAcesso, 'YYYY-MM-DD'))).asDays());
              }

              function __altGetData() {  
                delayCall(function(){
                  __sendMessageToPje({
                    action : 'getHTMLAutosDigiais', 
                    idProcesso : tarfData.idProcesso,
                    numeroUnico : tarfData.num
                  }, 'PARENT_TOP', function(response, action){
                    tarfData.idProcesso === 0 && ( tarfData.idProcesso = response.idProcesso );
                    tarfData.htmlAutosDigitais = {
                      dadoAcesso : new Date().getTime(),
                      html : response.htmlAutosDigitais
                    };
                    
                    var $AutDig = jQ3(response.htmlAutosDigitais);

                    function __getDataMovimentoPRocesso(){
                      var ___SPAN_DATA___ = '<span j2e-processo-data-movimento _ngcontent-orb-c14="">Mov $</span>';
                      var $firstMovData = $AutDig.find('#divTimeLine\\:eventosTimeLineElement .text-muted.data-interna:first');
                      var _date = moment($firstMovData.text().PJeDataStringParaLocaleEn());
                      var _html = ___SPAN_DATA___.replace('$', _date.format('DD-MM-YY'));

                      $liTarfCard.find('.datasProcesso span:first').after(_html);
                    }
                    
                    $li.find('span[j2e-lazy-load]').each(function(){
                      var $splz = jQ3(this);

                      switch($splz.prop('id')){
                        case 'tarfData-siglaClass':
                          $splz.text( $AutDig.find('a.titulo-topo.dropdown-toggle.titulo-topo-desktop').text().split(' ')[0] || '[ERRO]' );
                          $splz.removeAttr('j2e-lazy-load');
                          break;

                        case 'tarfData-assuntoCNJ':
                          $splz.text( $AutDig.find('#maisDetalhes dt:contains("Assunto")').next().find('li:first-child').text() );
                          $splz.removeAttr('j2e-lazy-load');
                          break;

                        case 'tarfData-poloAtivo':
                          $splz.text( $AutDig.find('#poloAtivo tbody tr:first td:first a:first').text().replace(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}/g, '').replace(/[(]\w*\s\w*[)]|[(]\w*[)]|[(][a-zA-Z0-9À-ž]+[)]/, '').replace(/ - (CPF|CNPJ)\W/, '').replace(/ - OAB [A-Z]{2}\d+/ ,'').trim() );
                          $splz.removeAttr('j2e-lazy-load');
                          break;

                        case 'tarfData-poloPassivo':
                          $splz.text( $AutDig.find('#poloPassivo tbody tr:first td:first a:first').text().replace(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}|[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}/g, '').replace(/[(]\w*\s\w*[)]|[(]\w*[)]|[(][a-zA-Z0-9À-ž]+[)]/, '').replace(/ - (CPF|CNPJ)\W/, '').replace(/ - OAB [A-Z]{2}\d+/ ,'').trim() );
                          $splz.removeAttr('j2e-lazy-load');
                          break;

                         case 'tarfData-ultimoMovimento':
                          $splz.text(  $AutDig.find('#divTimeLine\\:eventosTimeLineElement div.media.interno:first div.media-body.box div:first').text().trim() );
                          $splz.removeAttr('j2e-lazy-load');
                          break;

                      }
                    });
                    
                    
                    __getDataMovimentoPRocesso();
                  });
                });
              }
              
              __sendMessageToPje({
                action : 'requisitarConsultaTarefas', 
                numeroProcesso : tarfData.num
              }, 'PARENT_TOP', function(response, action){
                if(!(response.length)){
                  __altGetData();
                  return;
                }
                
                __sendMessageToPje({
                  action : 'requisitarDadosTarefaDoProcesso', 
                  numeroProcesso : tarfData.num,
                  queryTarefa : response[0]
                }, 'PARENT_TOP', function(_response, _action){
                  _response.j2EAtualizadoEm = new Date().getTime();
                  tarfData.entidadeTarefa = _response;

                  $li.find('span[j2e-lazy-load]').each(function(){
                  var $splz = jQ3(this);
                  switch($splz.prop('id')){
                    case 'tarfData-siglaClass':
                      $splz.text(_response.classeJudicial);
                      $splz.removeAttr('j2e-lazy-load');
                      break;

                    case 'tarfData-assuntoCNJ':
                      $splz.text(_response.assuntoPrincipal);
                      $splz.removeAttr('j2e-lazy-load');
                      break;

                    case 'tarfData-poloAtivo':
                      $splz.text(_response.poloAtivo);
                      $splz.removeAttr('j2e-lazy-load');
                      break;

                    case 'tarfData-poloPassivo':
                      $splz.text(_response.poloPassivo);
                      $splz.removeAttr('j2e-lazy-load');
                      break;

                    case 'tarfData-ultimoMovimento':
                      $splz.text(_response.descricaoUltimoMovimento);
                      $splz.removeAttr('j2e-lazy-load');
                      break;

                  }

                });

                  __altGetData();
                  return;
                });
                
                
              });
              
              
            });
          }
        });*/
      });
      
      $procsUl.lastIdProcesso = 0;
      $procsUl.click(function(_ev){
        var $rootLi = jQ3(_ev.target).parents('li');
        var _tarfData = $rootLi.prop('j2E').tarfData;
        
        function getIdProcesso(){
          return $rootLi.find('span.hidden').attr('id');
        }
        
        var $target = jQ3(_ev.target);
        
        if( $target.is('span.tarefa-numero-processo.process') ){
          if( $procsUl.lastIdProcesso === getIdProcesso() )
            return;
          
          $procsUl.lastIdProcesso = getIdProcesso();
          
          function __buildPseudotarefa(_qData){
            var ___TEMPLATE__CONTEUDO___TAREFA___  = '<div _ngcontent-bdb-c14="" id="conteudoTarefa" class="col-md-12 conteudoTarefa ng-star-inserted"><spinner _ngcontent-bdb-c14="" _nghost-bdb-c10=""><!----></spinner><!----><div _ngcontent-bdb-c23="" class="row"><div _ngcontent-bdb-c23="" class="col-md-12 no-padding"><!----><!----><iframe _ngcontent-bdb-c23="" class="editorFrame ng-star-inserted" id="frame-tarefa" name="frame-tarefa" src="$"></iframe></div></div></div>';
            var ___TEMPLATE__URL___ = 'https://pje.tjma.jus.br/pje/ng2/dev.seam?$&$#/painel-usuario-interno';
            var ___TEMPLATE__SPINNER___ = '<div _ngcontent-bsf-c10="" class="loaderWrapper ng-star-inserted"><mat-progress-spinner _ngcontent-bsf-c10="" class="position mat-progress-spinner mat-primary mat-progress-spinner-indeterminate-animation" mode="indeterminate" role="progressbar" aria-valuenow="0" style="width: 100px; height: 100px;"><svg focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" style="width: 100px; height: 100px;"><!----><circle cx="50%" cy="50%" r="45" class="ng-star-inserted" style="animation-name: mat-progress-spinner-stroke-rotate-100; stroke-dasharray: 282.743px; stroke-width: 10%;"></circle><!----></svg></mat-progress-spinner></div>';
            
            const nomeTarefa = _qData[0].nome
            const URL_DE_UMA_TAREFA_DO_PROCESSO_FRONTEND = __prepararLinkTarefa(nomeTarefa, {
              competencia: "",
              etiquetas:[],
              numeroProcesso: _tarfData.num
            }, 'j2pseudotarefaMovimentar=true')

            /*var _action = encodeURIComponent( btoa( JSON.stringify( {
                j2: true,
                action: "abrirAutomaticoTarefa",
                processo: _tarfData.num,
                tarefa: _qData[0].nome,
                j2pseudotarefaMovimentar : true
            }) ) );
            var _url = ___TEMPLATE__URL___.replaceOrd('$', 'j2pseudotarefaMovimentar=true', 'action=' + _action);*/
            
            var $conteudoTarefa = $this.parents('processos-tarefa').find('> #divMainPanel > conteudo-tarefa');
            if(! $conteudoTarefa.find('#conteudoTarefa').length ){            
              var $html = jQ3( ___TEMPLATE__CONTEUDO___TAREFA___.replaceOrd('$', URL_DE_UMA_TAREFA_DO_PROCESSO_FRONTEND) );
              $conteudoTarefa.prepend($html);            
            }else{
              const $iframe = $conteudoTarefa.find('iframe')
              const $iframeC = $iframe.clone(false)

              $iframeC.attr('src', URL_DE_UMA_TAREFA_DO_PROCESSO_FRONTEND);
              $iframe.replaceWith($iframeC)
            }
              
            
            $conteudoTarefa.find('div.row').css({
              filter : 'blur(8px)'
            });
            $conteudoTarefa.find('spinner').append(___TEMPLATE__SPINNER___);
            $conteudoTarefa.find('.nenhum-processo-selecionado').remove();
            evBus.once('fowardedNotifyPseudotarefaMovimentarLoaded', function(ev, j2Action){
              setTimeout(function(){
                $conteudoTarefa.find('div.row').css({
                  filter : ''
                });
                $conteudoTarefa.find('spinner').empty();
              }, 500)
              
            });
          }
          
          __sendMessageToPje({
            action : 'requisitarJ2EPJeRest',
            PJeRest : 'j2EPJeRest.tarefas.painelUsuario',
            waitsResponse : true,
            arguments : [{ numeroProcesso: _tarfData.num }]
          }, 
          "PARENT_TOP", 
          __buildPseudotarefa);
          
          $procsUl.find('.selecionado').removeClass('selecionado')
          $target.parents('.datalist-content').addClass('selecionado')
          return;
        }
        
        if( $target.is('button, i') && $target.parents().is('pje-link-autos-digitais') ){         
                  
          __sendMessageToPje({
            action : 'abrirAutosDigiais', 
            idProcesso : getIdProcesso(),
            numeroUnico : $rootLi.prop('j2E').tarfData.num
          }, 'PARENT_TOP');
          
          return;
        }
      });
    };
    
    function formatarNomeAlternativoListaTrefaAtiva(_this){
      var jElOrg = jQ3(_this);
      var jEl = jElOrg.clone(true);
      var jEl2 = null;

      jEl2 = jQ3('<span>', { text : '[INDEFINIDO]'}).addClass('uppercase altNomeListaTarefaAtiva').hide();
        
      jEl.insertAfter(jElOrg);
      jEl2.insertAfter(jEl);
      jElOrg.hide();
      
      
      
      function observeChange(rec){
        //var orgNome = jElOrg.text().trim();
        var orgNome = decodeURIComponent(window.location.hash.split('/')[3]).trim();
        var tarf = TarefasProps[orgNome];
        var tarfP = {};
        var pjeQuery = JSON.parse(atob(decodeURIComponent(window.location.hash.split('/').pop())));
        if( pjeQuery['j2-pseudotarefa']){ 
          tarfP.pseNome = pjeQuery['j2-pseudotarefa'].nome;
          if( ! ( tarfP.orgNome ) ) 
            tarfP.orgNome = 'Pseudotarefa';
        }else{
          tarfP = {};
        }
          
        //defer(function(){
          if(tarf && (tarf.altNome || tarf.pseNome || tarfP.pseNome)){
            jEl2.show();
            
            jEl.attr('title', (tarfP.pseNome || tarf.altNome || tarf.pseNome ) + ' (' + orgNome + ')');
            jEl.text((tarfP.pseNome || tarf.altNome || tarf.pseNome ));
            jEl2.text(tarfP.orgNome || tarf.orgNome );
          }else{
            jEl2.hide();
            
            jEl.attr('title', orgNome );
            jEl.text(orgNome);
          }
        //},1000);
      };
      
      jElOrg.observe('attributes', observeChange);
      observeChange();
    };

    function formatarExibicaoTarefaFavorita(_this){
      var $this = jQ3(_this);
      var $span = jQ3('<span>', {'class' : 'far fa-star estrela btn text-info fa-2x tarfFavStarSapn', 'j2e-tarf-stared' : false});
      var $newEls = jQ3('<div>',  {'class': 'col-sm-2', style : 'padding: 0;overflow: hidden;height: 5%;border-bottom: 1px solid #ddd;'})
                .append($span);
      $this.find('#myTabs').addClass('col-md-10').after($newEls);
      
      var _postParams = {
        usuario : (function(){
          var _ = sessionStorage.getItem('currentUser');
          if(!(_)){
            console.error('currentUser session Storage não encontrado');
            return '#######ERROR';
          }else{
            _ = JSON.parse(_);
            return _.login;
          }
        })(),
        stared : null,
        nome : (function(){
          var _tarfNome = ( ! ( $this.parents('processos-tarefa').is('[j2e-e-pseudotarefa]') )
                        ? window.location.hash.split('/')[3]
                        : __codificarNomeTarefa(jQ3(_this).parents('processos-tarefa').prop('j2E').PseudoTarefa.nome) );
          if(!(_tarfNome)){
            console.error('nome tarefa não encontrado');
            return '#######ERROR';
          }
          return _tarfNome;
        })(),
        guid : 0,
        ePseudo: false,
        update : function(){
          if(jQ3(_this).parents('processos-tarefa').is('[j2e-e-pseudotarefa]')){
            var j2E = jQ3(_this).parents('processos-tarefa').prop('j2E');
          
            this.guid = j2E.PseudoTarefa.guid;
            this.ePseudo = j2E.PseudoTarefa.EPseudo;
          }
          
          this.stared = $span.is('[j2e-tarf-stared=true]');
        }
      };
      
      
      $span.click(function(){
        _postParams.update();
        
        jQ3.ajax({
          url : 'https://jeitz2cvt1/TarefasFavoritas/favoritar',
          type : 'post',
          dataType: 'json',
          success : function(data){
            console.log(data);
            $span.attr('j2e-tarf-stared', data.stared ? 'true' : 'false');
            $span[data.stared ? 'addClass' : 'removeClass']('tarfFavStarSapn-stared');
            _postParams = data.stared;
          },
          data : _postParams
        });
      });
      
      _postParams.update();
      jQ3.ajax({
        url : 'https://jeitz2cvt1/TarefasFavoritas/get',
        type : 'post',
        dataType: 'json',
        success : function(data){
          $span.attr('j2e-tarf-stared', data.stared ? 'true' : 'false');
          $span[data.stared ? 'addClass' : 'removeClass']('tarfFavStarSapn-stared');
        },
        data : _postParams
      });
    }

    function ouvirClicksDeRemocaoDeEtiqueta($this){
      $this.click((ev)=>{
        if(ev.which !== 1) //botão esquerdo do mouse
          return;

        var $target = jQ3(ev.target);
        if ( ! (
          $target.is('span.icon-desvincular-tag') 
          || ( $target.is('i.fa-times') &&  $target.parent().is('span.icon-desvincular-tag')  )
        ) )
          return;
        
        const $parentProcessoDatalistCard = $target.parents('processo-datalist-card')
        const idTarefa = $parentProcessoDatalistCard.find('span.hidden').attr('id')
        const [numProc] = $parentProcessoDatalistCard.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/)

        const j2Action = {
          j2 : true,
          action : 'triggerEventFromFrontend',
          evento : {
            tipo : `on-remover-etiqueta-via-frontend-${idTarefa}`,
            argumentos : { 
              data : {
                idTarefa,
                numProc
              },
              tipo : 'definição de id de tarefa e numero único processo'
            }
          }
        }

        setTimeout(()=> __sendMessageToPje(j2Action), 500 )

      }).attr('j2-ouvir-remocoes-etiquetas', '')
    }

    function adicionarComandoAbrirExpedientesDoProcesso(_this, _parentUl){
      if(_parentUl){
        var $ul = jQ3(_parentUl)

        if($ul.is('[j2-viz-exp]'))
          return;

        $ul.click((ev)=>{
          if(ev.which !== 1) //botão esquerdo do mouse
            return;

          var $target = jQ3(ev.target);
          if ( ! $target.is('[j2-viz-exp]') )
            return;
          
          const $parentProcessoDatalistCard = $target.parents('processo-datalist-card')
          const siglaENumeroProcesso = $parentProcessoDatalistCard.find('span.tarefa-numero-processo:first').text().trim()
          const idTarefa = $parentProcessoDatalistCard.find('span.hidden').attr('id')
          const [numProc] = $parentProcessoDatalistCard.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/)

          const $modal = jQ3('#j2-modal-expedientes-processo')
          $modal.find('.modal-title').text(`Expedientes ${siglaENumeroProcesso}`)
          $modal.find('.modal-body').empty().append(j2EUi.spinnerHTML())
          jQ3('[j2-rest-win]').addClass('hidden')

          var $iframe

          __sendMessageToPje({
            action : 'requisitarJ2EPJeRest',
            PJeRest : 'j2EPJeRest.processo.obterIdProcesso',
            waitsResponse : true,
            arguments : [ numProc ] 
          }, 
          "PARENT_TOP",
          function(idProcesso){  
            $iframe = jQ3('<iframe>', { 
              class: 'j2-modal-expedientes-processo-iframe iframe-no-height',
              src: `https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=${idProcesso}&idTaskInstance=${idTarefa}&j2-auto-selecionar=expedientes`,
              //sandbox: ''
            } ).on("load", function(a, b, c, d){
             /* !$iframe?.isShown && setTimeout( () => $iframe.toggleClass('iframe-no-height'), 500)
              $iframe.isShown = true*/
            })

            $modal.find('.modal-body').append($iframe)
          });

          evBus.on('on-exibir-expedientes-autos-digitais', function ____oeead(){
            $modal.find("#uS1").remove()
            $modal.find(".divCont").remove()

            !($iframe?.isShown) && $iframe.toggleClass('iframe-no-height')
            $iframe.isShown = true

            evBus.off('on-exibir-expedientes-autos-digitais', ____oeead)
          })

        }).attr('j2-viz-exp', '')

        //criar modal
        const _modal_template = `
          <div _ngcontent-ono-c14="" class="modal fade" id="j2-modal-expedientes-processo">
            <div _ngcontent-ono-c14="" class="modal-dialog modal-lg j2-modal-dialog-frontend">
              <div _ngcontent-ono-c14="" class="modal-content">
                <div _ngcontent-ono-c14="" class="modal-header">
                  <button  _ngcontent-ono-c14="" aria-hidden="true" class="close" data-dismiss="modal" type="button">
                    <i class="fa fa-window-close"></i>
                  </button>
                  <button j2-rest-win _ngcontent-ono-c14="" aria-hidden="true" class="close" type="button" style="margin-right: 8px;">
                    <i class="fa fa-window-restore">
                  </i></button><span _ngcontent-ono-c14="" class="modal-title">Expedientes PJEC 0800970-64.2023.8.10.0047</span>
                </div>
                <div _ngcontent-ono-c14="" class="modal-body">
                <!---->
                </div>
              </div>
            </div>
          </div>`
        const $modalTemplate = jQ3(_modal_template)
        $ul.parents('body').append($modalTemplate)
        $modalTemplate.find('[j2-rest-win]').click(()=>{
          let iframeSource = jQ3('#j2-modal-expedientes-processo').find('iframe').attr('src')
          iframeSource = iframeSource.split('=')
          iframeSource.pop()
          iframeSource.push('expedientesModo2')
          iframeSource = iframeSource.join('=')

          const url = iframeSource
          openPopUp(`popPupExpedientesProcesso-${guid ? guid() : ''}`, url);
        })

        evBus.on('on-exibir-expedientes-autos-digitais', function (){
          jQ3('[j2-rest-win]').removeClass('hidden')
        })

        return;
      }
      

      jQ3.initialize('.row.icones .text-right', function(){
        var $divIconsRight = jQ3(this)
        //fa fa-envelope-o
        var _buttonTemplate = `<button j2-viz-exp _ngcontent-lwd-c30="" class="btn btn-default icon ng-star-inserted" 
                                  title="Criar lembrete" type="button"
                                  data-target="#j2-modal-expedientes-processo" data-toggle="modal" placement="bottom" >
                                 <i j2-viz-exp _ngcontent-lwd-c30="" aria-hidden="true" class="fas fa-envelope fa-lg text-info">
                                 </i>
                               </button>`
        $divIconsRight.prepend(_buttonTemplate)
      }, {target: _this})
    }
    

    function destacarUltimoMovimentoDoProcesso($thisTagLi, ultimoMovimento){           
      /*if($this.is('[je2-pseudotarefa]') )
        return;*/

      const data = new DataComFromatos(ultimoMovimento.dataAtualizacao)
      //<i class="fa fa-bookmark" j2e-proc-data-mov></i>
      const ___SPAN_DATA___ = `
      <span j2e-processo-data-movimento _ngcontent-orb-c14="" title="Data do último movimento do processo">
        <i class="fa fa-bookmark" j2e-proc-data-mov></i>
        <span txt>${data.PJeFrontEndTarefaCardData()}</span>
      </span>`;
      $thisTagLi.find('.datasProcesso span[j2highlighprazo]').after(___SPAN_DATA___);

      const $cardUltimoMovText = $thisTagLi.find('.tituloNegrito').next()
      const movText = $cardUltimoMovText.text()
      $cardUltimoMovText.text( `${movText} (${data.PJeFrontEndTarefaCardDataNaDescricaoDoMovimento()})` )

    }

    function autoSelecionarAPrimeiraTarefaDaLista($this){
      if(!$this.parent().length)
        return;
      if($this.parent().is('[j2-auto-selected]'))
        return;

      $this.parent().attr('j2-auto-selected', '')
      $this.find('a.selecionarProcesso')[0].click();
    }

    function _acoesBaseadasEmMovimentosDoProcesso($thisTagLi, idProcesso){
      __sendMessageToPje({
        action : 'requisitarJ2EPJeRest',
        PJeRest : 'j2EPJeRest.processo.movimentacoes.obterTodas',
        waitsResponse : true,
        arguments : [ idProcesso ] 
      }, 
      "PARENT_TOP",
      function(todosMovimentos){
        todosMovimentos.sort((a, b) => b.dataAtualizacao - a.dataAtualizacao)

        destacarUltimoMovimentoDoProcesso($thisTagLi, todosMovimentos.at(0))
        _sinalizarProcessoJulgado($thisTagLi, todosMovimentos)
      })
    }

    function _definirIndicadorDeComposicaoPolosDemanda($thisTagLi, idProcesso){
      
      if(!decodeURI(window.location.hash.split('/')[3]).match(/intimação/))
            return

      __sendMessageToPje({
        action : 'requisitarJ2EPJeRest',
        PJeRest : 'j2EPJeRest.processo.getDadosCompletos',
        waitsResponse : true,
        arguments : [ idProcesso ] 
      }, 
      "PARENT_TOP",
      function(response){
        const partesPoloAtivo  = response.result.polo[0].parte.filter(p=>p.any[0].tipoParte.tipoParte!=='ADVOGADO')
        const partesPoloPassivo  = response.result.polo[1].parte.filter(p=>p.any[0].tipoParte.tipoParte!=='ADVOGADO')

        $thisTagLi.find('a.selecionarProcesso').after(`<div style="position: absolute; right:0; color: rgb(51 51 51);">
          ${partesPoloAtivo.length > 1 ? `<span style="vertical-align: sub;font-size: 75%;">${partesPoloAtivo.length}</span>` : ''}
          <i class="fa ${partesPoloAtivo?.some(p=>p.advogado) ? 'fa-user-friends' : 'fa-user'} mr-5" title="Representante"></i>
          X
          <i class="fa ${partesPoloPassivo?.some(p=>p.advogado) ? 'fa-user-friends' : 'fa-user'} ml-5" title="Representante"></i>
          ${partesPoloPassivo.length > 1 ? `<span style="vertical-align: sub;font-size: 75%;">${partesPoloPassivo.length}</span>` : ''}
        </div>`)
          
      })
    }

    function _criarIndicacoDeTempoEfetivoNaTarefa($thisTagLi, idProcesso, nomeTarefa){

      [/processo com prazo em curso/i].some(tarfRegExp =>{
        if( ! tarfRegExp.test(nomeTarefa) )
          return false

        __sendMessageToPje({
          action : 'requisitarJ2EPJeRest',
          PJeRest : 'j2EPJeRest.tarefas.historico',
          waitsResponse : true,
          arguments : [ idProcesso ] 
        }, 
        "PARENT_TOP",
        function(tarefaResposta){
          const tarefas = tarefaResposta.tarefas.filter(t=> !t.aberta)
  
          tarefas.sort((a, b) => b.inicio - a.inicio)

          let tarefaInicial = 0
          tarefas.every((histTarf, idx)=> {
            tarefaInicial = histTarf
            //não deve iterar  proximo
            return tarfRegExp.test(tarefas[idx + 1]?.nome.toLowerCase().trim())
          })

          const data = new DataComFromatos(tarefaInicial.inicio)
          //<i class="fa fa-bookmark" j2e-proc-data-mov></i>
          const ___SPAN_DATA___ = `
          <span j2e-processo-data-movimento _ngcontent-orb-c14="" title="Data efetiva de entrada na tarefa">
            <i class="fa fa-hourglass" j2e-proc-data-mov></i>
            <span txt>${data.PJeFrontEndTarefaCardData()}</span>
          </span>`;
          $thisTagLi.find('.datasProcesso').prepend(___SPAN_DATA___);

          

        })

      })
      
      
    }

    function registrarAcoesLazied($thisTagLi, nomeTarefa, $_processos_tarefa){
      $thisTagLi.find('div.row.icones').lazyObserve({
        root: $thisTagLi.parents('#processosTarefa'),
        load: function($li, ent, obs){
          if( $thisTagLi.data('lazyload-triggered') )
            return
          $thisTagLi.data('lazyload-triggered', true);

          const $parentProcessoDatalistCard = $thisTagLi.find('processo-datalist-card')
          const [numProc] = $parentProcessoDatalistCard.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/)

          __sendMessageToPje({
            action : 'requisitarJ2EPJeRest',
            PJeRest : 'j2EPJeRest.processo.obterIdProcesso',
            waitsResponse : true,
            arguments : [ numProc ] 
          }, 
          "PARENT_TOP",
          function(idProcesso){
            $thisTagLi.attr('j2-idProcesso', idProcesso)

            _acoesBaseadasEmMovimentosDoProcesso($thisTagLi, idProcesso)
            _definirIndicadorDeComposicaoPolosDemanda($thisTagLi, idProcesso)
            _criarIndicacoDeTempoEfetivoNaTarefa($thisTagLi, idProcesso, nomeTarefa)

          })
        }
      })
    }
    
    function personalizarCardDaTarefa(nomeTarefa, $_processos_tarefa){  
      jQ3.initialize('ul.ui-datalist-data', function(){
        jQ3.initialize('li.ng-star-inserted', function(){       
          const $this = jQ3(this)   

          formatarStickerAnotacao(this);
          //formatarEtiqueta(this);
          formatarPrioridade(this);
          formatarEDestacarPrazo(this);
          inserirFolder(this);
          aplicarFiltrosJ2(this);
          criarCmdCopiarNumeroProcesso(this);
          //destacarUltimoMovimentoDoProcesso(this);
          adicionarComandoAbrirExpedientesDoProcesso(this)

          jQ3.initialize('div.label.label-info.label-etiqueta.ng-star-inserted', function(){
            jQ3(this).addClass('j2EtiquetaEstilo');
          }, {target : this});
          
          jQ3.initialize('span[j2e-processo-data-movimento]', function(){
            formatarEDestacarPrazo(this);
          }, {target : this});

          autoSelecionarAPrimeiraTarefaDaLista($this)

          registrarAcoesLazied($this, nomeTarefa, $_processos_tarefa)
        },
        {target : this});
        const $this = jQ3(this)

        criarCmdCopiarNumeroProcesso(null, this)
        adicionarComandoAbrirExpedientesDoProcesso(null, this)
        ouvirClicksDeRemocaoDeEtiqueta($this)
      }, {target: $_processos_tarefa[0]});
    }

    function _sinalizarProcessoJulgado($thisTagLi, movimentosProcesso){  
      const IDS_CLASSES_SIGLAS = new Set(['PJEC'])
      const IDS_MOVIMENTOS_MAGISTRADOS_JULGAMENTO = new Set([3,193,196,198,200,202,208,210,212,214,218,219,220,221,228,230,235,236,237,238,239,240,241,242,244,385,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,471,472,473,853,871,884,900,901,972,973,1042,1043,1044,1045,1046,1047,1048,1049,1050,10953,10961,10964,10965,11009,11373,11374,11375,11376,11377,11378,11379,11380,11381,11394,11396,11401,11402,11403,11404,11405,11406,11407,11408,11409,11411,11795,11796,11801,11876,11877,11878,11879,12028,12032,12033,12034,12041,12184,12187,12252,12253,12254,12256,12257,12258,12298,12319,12321,12322,12323,12324,12325,12326,12327,12328,12329,12330,12331,12433,12434,12435,12436,12437,12438,12439,12440,12441,12442,12443,12450,12451,12452,12453,12458,12459,12475,12615,12616,12617,12649,12650,12651,12652,12653,12654,12660,12661,12662,12663,12664,12665,12666,12667,12668,12669,12670,12672,12673,12674,12675,12676,12677,12678,12679,12680,12681,12682,12683,12684,12685,12686,12687,12688,12689,12690,12691,12692,12693,12694,12695,12696,12697,12698,12699,12700,12701,12702,12703,12704,12705,12706,12707,12708,12709,12710,12711,12712,12713,12714,12715,12716,12717,12718,12719,12720,12721,12722,12723,12724,12735,12738,12792,14092,14099,14210,14211,14213,14214,14215,14216,14217,14218,14219,14680,14777,14778,14848,14937,15022,15023,15024,15026,15027,15028,15029,15030,15165,15166,15185,15211,15212,15213,15214,15245,15249,15250,15251,15252,15253,15254,15255,15256,15257,15258,15259,15260,15261,15262,15263,15264,15265,15266])

      const idClass = $thisTagLi.find('.selecionarProcesso').text().trim().split(' ').at(0)

      if(!IDS_CLASSES_SIGLAS.has(idClass))
        return

      const temElementoEmComum = movimentosProcesso.some(codMov =>
        IDS_MOVIMENTOS_MAGISTRADOS_JULGAMENTO.has(parseInt(codMov.codEvento))
      )
      
      temElementoEmComum && $thisTagLi.find('div.row.icones > div:first').append(/*html*/`
        <i aria-hidden="true" 
          class="fa fa-gavel text-info pull-left pt-10 pb-5 ng-star-inserted " 
          title="Classe Judicial com julgamento proferido" 
        ></i>
      `)
    }

    function criarAtalhosTeclado(){
      var _delayCall = new DelayedCall(10, 10);
      function ___triggerHandler(event, key, idx){
        var $parent = jQ3('#btnTransicoesTarefa').parent();
        console.log(event, key);

        $parent.find('ul:first').find('li:nth-child(' + (idx + 1) + ') a')[0].click();
        $parent.find('[j2-temp-menu]').remove();
      }
      
      j2E.mods.shortcuts.on('Shift+P', function(event){

      });

      j2E.mods.shortcuts.on('Enter+Shift', function(event){
        var $but = jQ3('#btnTransicoesTarefa');
        var $ulC = $but.next('ul').clone();
        var $parent = $but.parent();

        if($parent.children().is('[j2-temp-menu]')){
          $parent.children('[j2-temp-menu]').remove();
          return;
        }
        $parent.append($ulC);
        $ulC.show();
        $ulC.attr('j2-temp-menu', '');

        $ulC.click(function(event){
          var text = jQ3(event.target).text();
          try{
            $parent.find('ul:first').find('li:contains("' + text + '") a')[0].click();
          }catch(e){}
          $ulC.remove();
        });
      });

      [1,2,3,4,5,6,7,8,9].forEach(function(_this, _idx){
        _delayCall(function(__this, __idx){
          j2E.mods.shortcuts.on("Shift+"+__this, function(event){
            ___triggerHandler(event, __this, __idx);
          });  
        }, _this, _idx);
      });
    }
    
    function registrarListeners(_this){
      var $this = jQ3(_this)//.find('> ul');
      $this.click(function(event){
        var $trg = jQ3(event.target).parents('a.selecionarProcesso');
        
        if(!($trg.length))
          return;
                
        j2E.env.tempData.processoDaTarefaAtivaSelecionado = $trg.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
      });
    }

    function aplicarFiltrosJ2(_this){
      const $li = jQ3(_this)

          
      let num = $li.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/);
      num = num ? num[0] : { semNumero : true }

      if( num.semNumero ){
        return;
      }

      let toRemove = false
      switch( jQ3('select#expressaoNumero').val() ){
        case 'digito-impar':
          toRemove = (num.substring(8,10) % 2) == 0
          break;
        case 'digito-par':
          toRemove = (num.substring(8,10) % 2) == 1
          break;
      }

      const $ultimoMovimento = jQ3('input#ultimoMovimento')
      if( !toRemove && $ultimoMovimento.val()){
        const textoMovimentoCartao = $li.find('.tituloNegrito').next().text()
        const regExpCalc = new RegExp(`${$ultimoMovimento.val().trim()}`, 'i')
        toRemove = !regExpCalc.test(textoMovimentoCartao)
      }

      if(toRemove)
        $li.remove();
    }

    function _copyToClipboard(text, $i) {
      function __then() {
        var $iVisto = jQ3('<i>', {
          class : 'fa fa-check text-success',
          css : {
            display : 'none',
            paddingLeft: '3px'
          },
          'j2-np-copiar' : 's'
        })

        $i.after($iVisto)
        $iVisto.show(250).promise().done(()=>{
          setTimeout(()=> $iVisto.hide('250').promise().done(()=>$iVisto.remove()), 3000)
        })
        
      }

      function __oldMethod(){
        var tempField = jQ3('<input />');
        jQ3('body').append(tempField);
        tempField.val(text).select();
        document.execCommand('copy');
        tempField.remove();  
      }

      $i.focus()
      window.navigator.clipboard.writeText(text)
        .then(__then)
        .catch(function(error) {
          console.error('Erro ao copiar texto para a área de transferência:', error);
          __oldMethod()
          __then()
        });

    }

    function criarCmdCopiarNumeroProcesso(_this, _parentUl){
      if(_parentUl){
        var $ul = jQ3(_parentUl)

        if($ul.is('[j2-np-copiar]'))
          return;

        $ul.mousedown((ev)=>{
          if(ev.which !== 1) //botão esquerdo do mouse
            return;

          var $target = jQ3(ev.target);
          if ( ! $target.is('[j2-np-copiar]') )
            return;
          

          const [numProc] = $target.parent().text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/)

          _copyToClipboard(numProc, $target)
          

        }).attr('j2-np-copiar', '')
        return;
      }

      var $li = jQ3(_this)

      $li.find('.tarefa-numero-processo:first').append(jQ3('<i>', {
        class: 'fa fa-clipboard', 
        onclick: 'event.stopPropagation()',
        'j2-np-copiar': 's'
      }))
    }

    function personalisarFiltroTarefas(_this){
      var $filtro = jQ3(_this).parents('#filtro-tarefas')

      ;(function _adicionarSelectExpressaoDoNumero(){
        var $recolherPorParidadeDigito = $filtro.find('#cargoJudicial').parents('.col-md-4.form-group').clone()

        $recolherPorParidadeDigito.find('label').text('Expressão do número')
        var $option = $recolherPorParidadeDigito.find('option:first').detach()
        $recolherPorParidadeDigito.find('option').remove()
        $recolherPorParidadeDigito.find('select').attr('id', 'expressaoNumero')
        $recolherPorParidadeDigito.find('select').attr('name', 'expressaoNumero')
        $recolherPorParidadeDigito.find('select')
        .append($option)
        .append($option.clone().attr('value', 'digito-impar').text('Dígito ímpar'))
        .append($option.clone().attr('value', 'digito-par').text('Dígito par'))
        
        $recolherPorParidadeDigito.insertBefore($filtro.find('fieldset > div:last-child'))
      })()

      ;(function _adicionarTextoUltimoMovimento(){
        const $ultimoMovimento = $filtro.find('#objeto').parents('.col-md-4.form-group').clone()

        $ultimoMovimento.find('label').text('Ultimo Movimento')
        $ultimoMovimento.find('input').attr('id', 'ultimoMovimento')
        $ultimoMovimento.find('input').attr('name', 'ultimoMovimento')
        
        $ultimoMovimento.insertBefore($filtro.find('fieldset > div:last-child'))
      })()

      /*$recolherPorParidadeDigito.find('select').change(()=>{
        $filtro.parents('processos-tarefa').find('p-datalist ul.ui-datalist-data li').filter(function() {

        });
      })*/
    }

    function registrarEventosListaTarefas(_processos_tarefa){
      evBus.on('on-remover-etiqueta-via-autos-digitais', function(evento, argumentos){
        console.log('argumentos: ', argumentos)
        const $processosTarefa = jQ3(_processos_tarefa)
        const $tagLiEventIdTask = $processosTarefa.find(`[id="${argumentos.idTask}"]`).parents('li')
        const nomeTarefa = decodeURIComponent(window.location.hash.split('/').at(3))

        switch(nomeTarefa){
          case 'Documentos não lidos':
            $tagLiEventIdTask.hide(750, "swing", function(){
              this.remove()
            })
            return
        }

        //remover etiqueta do cartão
        $tagLiEventIdTask.find(`.label-etiqueta:contains("${argumentos.etiquetaInst.tagNome}")`).remove()
      })
    }
    
    function ajustarBarraSelecacoProcessosEAplicarPersonalizacoes(_this){
      function _guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };

      jQ3.initialize('#acoes-processos-selecionados', function(){       
        
        const $this = jQ3( this )
        $this.removeClass('col-md-12')
        $this.addClass('col-md-6')


        const $divbspC = $this.clone(true)
        $divbspC.attr('id', 'acoes-processos-selecionados-j2', '')

        $this.after($divbspC)

        //persolanizações
        const TEMPLATE_BUTTON_SEM_TOGGLER = `
          <button _ngcontent-pdi-c12 class="btn btn-sm btn-default ng-star-inserted" title="Fixar janela dos autos digitais">
            <i _ngcontent-pdi-c12 aria-hidden="true" class="fa fa-lock-open" j2-i-lock></i>
            <i _ngcontent-pdi-c12 aria-hidden="true" class="fa fa-book"></i>
          </button>`

        const $butSentinela = jQ3(TEMPLATE_BUTTON_SEM_TOGGLER)

        const $j2Container = $divbspC.find(' > div > div')
        $j2Container.empty()
        $j2Container.removeClass('pull-left')
        $j2Container.addClass('pull-right')
        $j2Container.addClass('j2-alinhar-direita-items')
        
        $j2Container.append($butSentinela)

        $butSentinela.click(()=>{
          $butSentinela.toggleClass('btn-default').toggleClass('btn-primary')
          $butSentinela.find('[j2-i-lock]').toggleClass('fa-lock-open').toggleClass('fa-lock')
          if( ! $butSentinela.is('.btn-primary') )
            return;

          const $eventTargetLi = $uiDadosDaList.find('.selecionado').parents('li')
          __openAutosDigitaisFixados($eventTargetLi)
        })

        const $uiDadosDaList = $this.parents('processos-tarefa').find('ul.ui-datalist-data')
        $uiDadosDaList.lasNumProc = '0'
        $uiDadosDaList.click((_ev)=>{
          if( ! jQ3(_ev.target).is('.tarefa-numero-processo') )
            return

          const $eventTargetLi = jQ3(_ev.target).parents('li');
          console.log('TESTANDO: click')
          __openAutosDigitaisFixados($eventTargetLi)
        })

        const idJanel = _guid()

        function __openAutosDigitaisFixados($eventTargetLi){
          if( ! $butSentinela.is('.btn-primary') )
            return;

          const [numProc] = $eventTargetLi.find('.tarefa-numero-processo').text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/)
          const idTaskInstance = $eventTargetLi.find('.tarefa-numero-processo [id]').attr('id')

          if($uiDadosDaList.lasNumProc === numProc)
            return;

          $uiDadosDaList.lasNumProc = numProc

          _getAcessoAosAutosDigitais(numProc).then(acessoAutosDigitais=>{
            const url = `https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam?idProcesso=${acessoAutosDigitais.idProcesso}&ca=${acessoAutosDigitais.ca}&idTaskInstance=${idTaskInstance}&j2=fixarAutos`

            __sendMessageToPje({
              action : 'abrirAutosDigitaisFixados',
              url
            }, 
            "PARENT_TOP");
          })
        }

        /*jQ3.initialize('processos-tarefa conteudo-tarefa .row a:first-child', function(){
          const $aLinkAutos = jQ3(this) 

          $aLinkAutos.observe('attributes', (rec)=>{
            if( ! $butSentinela.is('.btn-primary') )
              return;
      
            if( rec.attributeName !== 'href' )
              return;

            const [numProc] = jQ3(rec.target).text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}|[0-9]{20}/)
            if(numProc === $uiDadosDaList.lasNumProc)
              return;

            console.log('TESTANDO: record mutatioin')
            
            const $numProcLi = $uiDadosDaList.find(`li:contains('${numProc}')`)
      
            __openSentinela($numProcLi)
          })
        })*/

      },
      {target : _this});
    }
    
    /**
     * As inicializações abaixos são badeadas na visualização de uma tarefa,
     * á esquerda, a lista de tarefas pendentes, á direita, uma tarefa sendo executadao
     * 
     * barra-selecao-processos
     */
    function inicializacaoDiversasDeTarefaAtivaComListaDePendencias(){
      jQ3.initialize('processos-tarefa', function(){
        var _processos_tarefa = this
        const $_processos_tarefa = jQ3(this)
        const nomeTarefa = $_processos_tarefa.find('filtro-tarefas .nome-tarefa:first-child').text().trim()
        
        jQ3.initialize('filtro-tarefas span.text-truncate.uppercase.nome-tarefa:first-child', function(){          
          formatarNomeAlternativoListaTrefaAtiva(this);
          prepararPseudotarefaAtiva(this);
          criarAtalhosTeclado(this);
          
        },
        {target : this});
        
        jQ3.initialize('div.row.lista-processos', function(){          
          formatarExibicaoTarefaFavorita(this);
          registrarListeners(this);
          ajustarBarraSelecacoProcessosEAplicarPersonalizacoes(this)

          //jQ3.initialize('span.badge.pull-right', function(){          
          jQ3.initialize('ul.ui-datalist-data', function(){          
            var $ul = jQ3( this )
            var $badge = jQ3( 'span.badge.pull-right', _processos_tarefa )
            $ul.observe('childlist', ()=> { 
              $badge.text( $ul.find('> li').length )
            })
          },
          {target : this});

        },
        {target : this});

        jQ3.initialize('#filtro-tarefas #cargoJudicial', function(){          
          personalisarFiltroTarefas( this )
        },
        {target : this});

        registrarEventosListaTarefas(_processos_tarefa)

        personalizarCardDaTarefa(nomeTarefa, $_processos_tarefa);
      });
    }

       
    inicializacaoDiversasDeTarefaAtivaComListaDePendencias();
  };

  function observeListasDeTarefas(){


    function _posicionarTarefaDepoisDe(_this, altText){
      var _node = false;
      jQ3(_this).parent().find('span.nome').each(function(){
          var _this = jQ3(this).text().localeCompare(altText);
          //var _next = jQ3(this).next().text().localeCompare(altText);

          //console.log('this: ', _this, ' next: ',  _next);
          if(_node === false && _this === 1 )//&& _next === -1)
              _node = jQ3(this);

      });

      if(_node === false)
        _node = jQ3(_this).parent().find('span.nome:last');

      return _node.parents('div.menuItem');
    }

    function modificarNomeAlternativoTarefa(_this){
      //lg('modificarNomeAlternativoTarefa: ', _this);

      var jEl = jQ3(_this);
      var tarf = TarefasProps[jEl.find('span.nome').text()];
      if(tarf && tarf.altNome){
        var orgText = jEl.find('span.nome').text();
        var jElC = jEl.clone();

        jElC.find('span.nome').text('').append( 
          jQ3('<span>', { text : tarf.altNome})
        ).append('<br>').append(
          jQ3('<span>', { text : orgText}).addClass('tarefaTituloPequeno')
        );
        jElC.find('a').attr('href','').click(function(event){
          event.preventDefault();
          jEl.find('a')[0].click();
        });

        jEl.find('span.nome').text('').append( 
          jQ3('<span>', { text : orgText})
        ).append('<br>').append(
          jQ3('<span>', { text : tarf.altNome}).addClass('tarefaTituloPequeno')
        );

        jElC.insertBefore(_posicionarTarefaDepoisDe(_this, tarf.altNome));
        jElC.attr('j2e', 'altTarefa');
        (!(tarf.hibrida)) && jEl.addClass('tarfOrgOpacidade');
        (!(tarf.hibrida)) && jEl.parent().append(jEl);
      }

    }

    function initializeControlsToRemoveCustomJ2E(_this){
      var _thisOverflowTarefas = _this;
      var _thisPreivousElement = jQ3(_this).parent().find('filtro-tarefas-pendentes');
      jQ3.initialize('button.btn.btn-primary', function(){    
        jQ3(this).click(function(){
          jQ3('div[j2e="altTarefa"]', _thisOverflowTarefas).each(function(){
            jQ3(this).remove();
          });
        });
      },
      {target : _thisPreivousElement[0]});

      jQ3.initialize('input#itNrProcesso', function(){    
        jQ3(this).keypress(function(e){
          (e.which === 13) && jQ3('div[j2e="altTarefa"]', _thisOverflowTarefas).each(function(){
            jQ3(this).remove();
          });
        });
      },
      {target : _thisPreivousElement[0]});
    }
    
    function createPseudoTarefas(_this){ // this is a div.overflowTarefas
      var _pseudos = [];
      var $this = jQ3(_this);
      
      if($this.is('[j2e-overflowtarefas-sem-pseudotarefa]'))
        return;
      
      var __ = $this.parents('div.col-md-4').find('i.fa-star, i.fa-check-square');
      if(__.length === 1 && jQ3(__).is('i.fa-star') )
        return;
      
      TarefasProps.getPseudotarefas(function(pseudotarefas){
        jQ3.each(pseudotarefas, function(idx, key){
          if(!this.EPseudo)
            return;

          _pseudos.push({ name : this.nome, PseudoTarefa : key});
        });

        if(!(_pseudos.length))
          return;

        //jQ3.initialize('div.menuItem.tarfOrgOpacidade', function(){          
        jQ3.initialize('div.menuItem:last-child', function(){          
          
          var jEl = jQ3(this);
          if(!(jEl.parent().children(':last').is(jEl)))
            return;

          jQ3.each(_pseudos, function(){
            if( $this.is('[j2e-overflowtarefas-minhas-tarefas-favoritas]') ){
              if($this.prop('j2e') && $this.prop('j2e').TarefaFavoritaData){
                var _tFav = $this.prop('j2e').TarefaFavoritaData;
                var i = _tFav.findIndex(function(el, idx){
                  return el.ePseudo && el.guid === this.PseudoTarefa.guid && el.stared;
                }, this);
                if(i === -1)
                  return;
              }
            }
            
            var jDivMenuItem = jQ3(_this).find('div.menuItem:not(.tarfOrgOpacidade):first');
            var jDivMenuItemClone = jDivMenuItem.clone();
            
            /* 
             * rotina comum 
             * */
            jDivMenuItemClone.addClass('j2EPseudoTarefa');
            jDivMenuItemClone.find('span.nome').text(this.name);
            jDivMenuItemClone.find('a').attr('title', this.name);
            jDivMenuItemClone.find('a').click(function(){
              console.log('clicked ', this);
            });
              
            if(this.PseudoTarefa.tipo === 'LISTA'){
              if( this.PseudoTarefa.countTarefa() === 0 )
                return;

              var nHref = 'https://frontend.prd.cnj.cloud/#/painel-usuario-interno/lista-processos-tarefa/$/eyJudW1lcm9Qcm9jZXNzbyI6IiIsImNvbXBldGVuY2lhIjoiIiwiZXRpcXVldGFzIjpbXX0';
              nHref = nHref.replace('$', __codificarNomeTarefa(this.name));

              jDivMenuItemClone.find('span.quantidadeTarefa').text(this.PseudoTarefa.countTarefa());
              jDivMenuItemClone.find('a').attr('href', nHref);

              jDivMenuItemClone.insertBefore(_posicionarTarefaDepoisDe(jDivMenuItem, this.name));
            }
            else if(this.PseudoTarefa.tipo === 'TAREFA-ETIQUETA-VARIAS'){
              var criteria = this.PseudoTarefa.criteria;
              var cri = {
                tarefa : '',
                pjeQuery : {
                  "numeroProcesso": "",
                  "competencia": "",
                  "etiquetas": [],
                  "j2-pseudotarefa" : {
                    "guid" : this.PseudoTarefa.guid,
                    "nome" : this.name
                  }
                }
              };
              for(var i=0; i < criteria.length; i++){
                for(var j=0; j < criteria[i].length; j++){
                  var _reg = criteria[i][j];
                  if(_reg.entity === 'tarefa')
                    cri.tarefa = _reg.nome;
                  if(_reg.entity === 'etiqueta')
                    cri.pjeQuery.etiquetas.push (_reg.nome);
                  if(_reg.entity === 'automacao'){
                    function __subtrairDias(data, dias){
                      data = new Date( data.setHours(0,0,0,0) );  
                      data = new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
                      return data;
                    }
                    function toIso(data){
                      return data.toISOString().split('T')[0].toString().replaceAll('-', '.');
                    }
                    
                    var _curDay = new Date();
                    var _limit = _reg.limit;
                    var _etqTemplate = 'PZ $';
                    do{
                      _curDay = __subtrairDias(_curDay, 1);
                      cri.pjeQuery.etiquetas.push ( _etqTemplate.replace('$', toIso(_curDay) ) );
                      _limit--;
                    }while(_limit > 0)
                    
                  }
                }
              }
              
              var nHref = 'https://frontend.prd.cnj.cloud/#/painel-usuario-interno/lista-processos-tarefa/$/$';
              nHref = nHref.replaceOrd('$', __codificarNomeTarefa(cri.tarefa), encodeURIComponent( btoa(JSON.stringify(cri.pjeQuery)) ) );


              jDivMenuItemClone.find('span.quantidadeTarefa').text("...");
              jDivMenuItemClone.find('a').attr('href', nHref);
              
              __sendMessageToPje({
                action : 'requisitarJ2EPJeRest',
                PJeRest : 'j2EPJeRest.tarefas.recuperarProcessosTarefaPendenteComCriterios',
                waitsResponse : true,
                arguments : [ cri.tarefa, {tags : cri.pjeQuery.etiquetas} ] 
              }, 
              "PARENT_TOP",
              function(data){
                if(data && data.count)
                  jDivMenuItemClone.find('span.quantidadeTarefa').text(data.count);
                else
                  jDivMenuItemClone.remove();
              });

              jDivMenuItemClone.insertBefore(_posicionarTarefaDepoisDe(jDivMenuItem, this.name));
            }
            else if(this.PseudoTarefa.tipo === 'ETIQUETA-VARIAS'){
              var __this = this;
              var criteria = this.PseudoTarefa.criteria;
              var etiquetas = [];
              var  pjeQuery = {
                "numeroProcesso": "",
                "competencia": "",
                "etiquetas": []
                /*"j2-pseudotarefa" : {
                  "guid" : this.PseudoTarefa.guid,
                  "name" : this.name
                }*/
              };
              
              for(var i=0; i < criteria.length; i++){
                for(var j=0; j < criteria[i].length; j++){
                  var _reg = criteria[i][j];
                  if(_reg.entity === 'etiqueta')
                    etiquetas.push (_reg);
                }
              }
              
              var nHref = 'https://frontend.prd.cnj.cloud/#/painel-usuario-interno/lista-processos-tarefa/$/$';
              nHref = nHref.replaceOrd('$', __codificarNomeTarefa(this.name), encodeURIComponent( btoa(JSON.stringify(pjeQuery)) )  );

              jDivMenuItemClone.find('span.quantidadeTarefa').text("...");
              jDivMenuItemClone.find('a').attr('href', nHref);

              
              etiquetas.left = etiquetas.length;
              etiquetas.buffer = [];
              var _delayCall = new DelayedCall(10, 15);
              for(var i=0; i < etiquetas.length; i++){
                _delayCall(function(_etiqueta, _jDivMenuItemClone, ___this){
                  __sendMessageToPje({
                    action : 'requisitarJ2EPJeRest',
                    PJeRest : 'j2EPJeRest.etiquetas.processosDaEtiqueta',
                    waitsResponse : true,
                    arguments : [ _etiqueta.id ] 
                  }, 
                  "PARENT_TOP",
                  function(data){
                    //etiquetas.buffer.push(data);
                    etiquetas.buffer.push.apply(etiquetas.buffer, data);
                    etiquetas.left--;
                    if(etiquetas.left === 0){
                      if(etiquetas.buffer.length){
                        var _tarfProps = TarefasProps[___this.name];
                        _tarfProps.dados = etiquetas.buffer;
                        _tarfProps.dados.isTemporary = true;
                        _tarfProps.dados.timestamp = new Date().getTime();
                        _tarfProps.dados.dataSet = 'j2EPJeRest.etiquetas.processosDaEtiqueta';
                        
                        _jDivMenuItemClone.find('span.quantidadeTarefa').text(etiquetas.buffer.length);
                      }
                      else 
                        _jDivMenuItemClone.remove();
                    }
                  }); 
                }, etiquetas[i], jDivMenuItemClone, __this);
              }

              jDivMenuItemClone.insertBefore(_posicionarTarefaDepoisDe(jDivMenuItem, this.name));
            }
          });

        },
        {target : _this});
        
      });
    }

    jQ3.initialize('div.overflowTarefas', function(){
      jQ3.initialize('div.menuItem', function(){          
        modificarNomeAlternativoTarefa(this);
      },
      {target : this});

      /*jQ3(this).observe('childlist', function(record){
        debugger;
      });*/

      initializeControlsToRemoveCustomJ2E(this);
      createPseudoTarefas(this);
    });
  }

  function criarControlesFiltroListasDeTarefas(){
    jQ3.initialize('filtro-tarefas-pendentes', function(){
      var fdSet = jQ3('fieldset', this);
      //lg('fdSet *:', fdSet.find('*'));

      var lb = jQ3('<div _ngcontent-oyf-c7="" class="filtros vcenter pa-5"><span _ngcontent-oyf-c7="" style="color: rgb(51,51,51);">Filtrar Tarefas</span></div>');
      var nFld = jQ3('<div _ngcontent-cqe-c8="" class="col-sm-12 pb-5 pr-5 pl-5"><input _ngcontent-cqe-c8="" class="form-control ng-untouched ng-pristine ng-valid" id="j2FilterTarefa" placeholder="Filtrar Tarefas" type="text"></div>');

      //lg('nFld *:', nFld.find('*'));

      fdSet.append(lb);
      fdSet.append(nFld);
      //debugger;

      nFld.find('input').keyup(function(){
        var v = jQ3(this).val().toLowerCase();
         fdSet.parents('#divTarefasPendentes').find('div.overflowTarefas div.menuItem').filter(function() {
          jQ3(this).toggle(jQ3('span.nome', this).text().toLowerCase().includes(v) );
        });
      });
    });
  }
  
  function observeConteudoTarefas(){
    
    jQ3.initialize('conteudo-tarefa', function(){
      jQ3.initialize('div#frameTarefas', function(){
        var jAOrg = jQ3(this).find('a:first');
        var jA = jAOrg.clone(true).hide();
        jA.insertAfter(jAOrg);
        
        
        var aTextAr = jAOrg.text().split(' - ');
        var tarf = aTextAr.slice(1).join(' - ').trim();
        var tarfInitial = tarf;
        var propTarf = TarefasProps[tarf];
        var tarfP = {};
        var proc;
        var pjeQuery = JSON.parse(atob(decodeURIComponent(window.location.hash.split('/').pop())));
        if( pjeQuery['j2-pseudotarefa']){ 
          tarfP.pseNome = pjeQuery['j2-pseudotarefa'].nome;
          if( ! ( tarfP.orgNome ) ) 
            tarfP.orgNome = 'Pseudotarefa';
        }else{
          tarfP = {};
        }

        jAOrg.hide();
        jA.show();

        /*jA.empty().append( 
          jQ3('<span>', { text : aTextAr.join(' - ')})
        ).append('<br>').append(
          jQ3('<span>', { text : propTarf.orgNome}).addClass('tarefaTituloPequeno')
        );*/
        jA.empty().append( 
          jQ3('<span>', { text : '[INDEFINIDO]'})
        ).append('<br>').append(
          jQ3('<span>', { text : '[INDEFINIDO]'}).addClass('tarefaTituloPequeno')
        );
  
        function observeChange(rec){
          aTextAr = jAOrg.text().split(' - ');
          proc = jAOrg.text().match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)[0];
          tarf = aTextAr.slice(1).join(' - ').trim();
          propTarf = TarefasProps[tarf];

          if(propTarf && ( propTarf.altNome || (tarfInitial === tarf && tarfP.pseNome && proc === j2E.env.tempData.processoDaTarefaAtivaSelecionado) ) ){
            jA.show();
            jAOrg.hide();
            jA.attr('href', jAOrg.attr('href'));
            jA.find('span:first').text(jAOrg.text().split(' - ' )[0] + ' - ' + (tarfP.pseNome || propTarf.altNome ) );
            jA.find('span.tarefaTituloPequeno').text(tarfP.orgNome || propTarf.orgName || jAOrg.text().tarfNameFromTarefaTitle());
          }else{
            jA.hide();
            jAOrg.show();
            
          }
        }
        
        jAOrg.observe('attributes', observeChange);
        observeChange();
        /*
        if(propTarf && propTarf.altNome){
          jAOrg.hide();
          jA.show();
          
          aTextAr[1] = propTarf.altNome;
          //jA[0].innerHTML = aTextAr.join(' - ');

          jA.empty().append( 
            jQ3('<span>', { text : aTextAr.join(' - ')})
          ).append('<br>').append(
            jQ3('<span>', { text : propTarf.orgNome}).addClass('tarefaTituloPequeno')
          );
        
        
          jAOrg.observe('attributes', function(rec){
            aTextAr = jAOrg.text().split(' - ');
            tarf = aTextAr.slice(1).join(' - ').trim();
            propTarf = TarefasProps[tarf];
        
            if(propTarf && propTarf.altNome){
              jA.show();
              jAOrg.hide();
              jA.attr('href', jAOrg.attr('href'));
              jA.find('span:first').text(jAOrg.text().split(' - ' )[0] + ' - ' + propTarf.altNome);
            }else{
              jA.hide();
              jAOrg.show();
            }
          });
        }*/
      }, 
      {target : this});
      
      /*jQ3(this).observe('childlist', function(record){
        
      });*/
      
    });
  }
  
  function personaliazarMenuNavegacao(){
    jQ3.initialize('side-bar nav ul', function(){
      var jEl = jQ3(this);
      var jLiC = jEl.find('li:last').prev().clone();
            
      jLiC[0].id = 'liJ2EPseudoTarefa';
      jLiC.find('a').attr('title', 'Gerenciar pseudo tarefas');
      jLiC.find('i').attr('class', 'fas fa-list fa-2x');
      jLiC.click(function(){
        jLiC.prev().prev().prev().prev()[0].click();
        
        abrirPainelPseudoTarefas();
        jLiC.find('a').addClass('selectedMenu');
        jEl.children(':not(":last")').children('a').each(function(){
          jQ3(this).removeClass('selectedMenu');
        });
      });
      
      jEl.find('li').click(function(){
        jLiC.find('a').removeClass('selectedMenu');
      });
      
      jEl.append( jLiC );
    });
  }
  
  function personaliazarPainelUsuarioECabecalhoTarefa(){
    jQ3.initialize('right-panel', function(){
      //Observar painel do usário principal
      jQ3.initialize('div.rightPanel.container-fluid', function(){
        jQ3.initialize('div.painel-usuario-interno-dashboard', function(){
          var verb = dbgVerbose(0);
          
          
          
          var colMinhasTarefas = jQ3('div.col-md-4 i.fa-star', this).parents('div.col-md-4');
          var colAssinaturas   = jQ3('div.col-md-4 i.fa-pencil-alt', this).parents('div.col-md-4');
          var colTarefas = jQ3('div.col-md-4 i.fa-check-square', this).parents('div.col-md-4');
          var colTarefasFavoritas = colTarefas.clone(true, true);
          var newChildren = colTarefasFavoritas.children();
          var newHeader = newChildren.filter('div.dashboard-item-header');
          var nodTarefas = newChildren.filter('tarefas');

          nodTarefas.find('div.overflowTarefas').empty();
          nodTarefas.find('div.overflowTarefas').attr('j2e-overflowtarefas-minhas-tarefas-favoritas', '');
          nodTarefas.find('filtro-tarefas-pendentes fieldset').empty();
          
          nodTarefas.find('div#divTarefasPendentes div.collapse').attr('j2EMinhasTarefasFavoritas', '');
          var wrpFilter = nodTarefas.find('div.wrapper-filtro-tarefas-pendentes div');
          wrpFilter.attr('data-target', '[j2EMinhasTarefasFavoritas]');
          var _dtVal = colTarefas.find('div[data-target]').attr('data-target');
          colTarefas.find('div[data-target]').attr('data-target', (_dtVal + ':not([j2EMinhasTarefasFavoritas])') );
          jQ3('side-bar li#liTarefas div[data-target]').attr('data-target', (_dtVal + ':not([j2EMinhasTarefasFavoritas])') );
          //wrpFilter.attr('data-target', wrpFilter.attr('data-target') + '.tarfFavor');
          //jQ3('div.col-md-4 i.fa-check-square', this).parents('div.col-md-4')
          //nodTarefas.find('div.group-filtro-tarefas-pendentes').addClass('tarfFavor');
          

          newHeader.attr('title', 'Tarefas que foram favoritadas pelo usuário');
          var _c = newHeader.find('i:first').clone(true);
          _c.attr('class', 'fas fa-star');
          _c.insertAfter( newHeader.find('i:first') );

          newHeader.contents().filter(function(){
            return this.nodeType === 3;
          }).replaceWith(' Minhas tarefas favoritas ');
          
          colMinhasTarefas.find('div.overflowTarefas').attr('j2e-overflowtarefas-sem-pseudotarefa', '');
          colAssinaturas.append(colMinhasTarefas.children());
          colMinhasTarefas.append( newChildren );
          
          
          function _handleTarefasFavoritasJsonData(data, status, xhr){
            
            
            
            var __TEMP_SEM_RESULTADO___ = '<div _ngcontent-css-c7="" class="nenhum-resultado vcenter ng-star-inserted"><a _ngcontent-css-c7=""><span _ngcontent-css-c7="" class="nome">Nenhum resultado</span></a></div>';
            var _divPar = nodTarefas.find('#divTarefasPendentes');
            var _ = sessionStorage.getItem('currentUser');
            if(!(_)){
              setTimeout(function(){
                _handleTarefasFavoritasJsonData(data, status, xhr);
              },250);
              return;
            }

            _ = JSON.parse(_);
            
            var tarfsFavUsuario = data[_.login] || JSON.parse(data)[_.login];
            if(!(tarfsFavUsuario)){
              // usuario não tem tarefas
              jQ3(__TEMP_SEM_RESULTADO___).appendTo(_divPar);
              _divPar.find('p-progressbar').hide();
              return;
            }
            
            
            var prop = nodTarefas.find('div.overflowTarefas').prop('j2e');
            if(prop)
              prop.tarefaFavoritaData = tarfsFavUsuario;
            else
              nodTarefas.find('div.overflowTarefas').prop('j2e', {TarefaFavoritaData : tarfsFavUsuario } );
            
            __sendMessageToPje({
              action : 'requisitarConsultaTarefas', 
              query : {
                numeroProcesso : "",        
                competencia : "",        
                etiquetas : []   
              }
            }, 'PARENT_TOP', 
            function(data, action){

              var __TARF_TEMPLATE__ = '<div _ngcontent-css-c7="" class="menuItem"><!----><div _ngcontent-css-c7=""><a _ngcontent-css-c7="" title="Aguardando apreciação da Turma Recursal" href="#/painel-usuario-interno/lista-processos-tarefa/Aguardando%20aprecia%C3%A7%C3%A3o%20da%20Turma%20Recursal/eyJudW1lcm9Qcm9jZXNzbyI6IiIsImNvbXBldGVuY2lhIjoiIiwiZXRpcXVldGFzIjpbXX0%3D"><div _ngcontent-css-c7="" class="detalheTarefasQuantidade"><span _ngcontent-css-c7="" class="nome">Aguardando apreciação da Turma Recursal</span><span _ngcontent-css-c7="" class="quantidadeTarefa">207</span></div></a></div><!----></div>';
              var jDivMenuItem = jQ3(__TARF_TEMPLATE__);
              var _divTarefas = nodTarefas.find('div.overflowTarefas');
              var _flgSomeFound = false;
              
              jQ3.each(data, function(idx, key){
                var i = tarfsFavUsuario.findIndex(function(el, idx){
                  return el.nome.dURI() === key.nome && el.stared === true;
                });
                if(i === -1)
                  return;
                
                _flgSomeFound  = true;
                var jDivMenuItemClone = jDivMenuItem.clone();

                var nHref = 'https://frontend.prd.cnj.cloud/#/painel-usuario-interno/lista-processos-tarefa/$/eyJudW1lcm9Qcm9jZXNzbyI6IiIsImNvbXBldGVuY2lhIjoiIiwiZXRpcXVldGFzIjpbXX0';
                nHref = nHref.replace('$', __codificarNomeTarefa(key.nome)).replace(/\(/g, '%28').replace(/\)/g, '%29');

                jDivMenuItemClone.addClass('j2ETarefaFavorita');
                jDivMenuItemClone.find('span.nome').text(key.nome);
                jDivMenuItemClone.find('span.quantidadeTarefa').text(key.quantidadePendente);
                jDivMenuItemClone.find('a').attr('href', nHref);
                jDivMenuItemClone.find('a').click(function(){
                  console.log('clicked');
                });

                _divTarefas.append( jDivMenuItemClone );
                
                _divPar.find('p-progressbar').hide();
              });
              
              if(!(_flgSomeFound)){
                jQ3(__TEMP_SEM_RESULTADO___).appendTo(_divPar);
                _divPar.find('p-progressbar').hide();
              }
            });

            
          }
          
          function _handleError(a, b, c){
            aler('error');
          }

          jQ3.ajax({
            url : 'https://jeitz2cvt1/TarefasFavoritas/listar',
            success : _handleTarefasFavoritasJsonData,
            error : function(){
              jQ3.ajax({
                url : 'https://dl.dropboxusercontent.com/s/czlwwyrweqgxkmk/TarefasFavoritas.json',
                success : _handleTarefasFavoritasJsonData,
                error : _handleError
              });
            }
          });
          
          
          /*jQ3('div.overflowTarefas:last').observe('childlist', function(record){
            //lg('observe div.overflowTarefas:last', record);
                            
          }, this); */
          
        }, {target : this});
      }, {target : this});

      //Observar cabeçalho do conteúdo da tarefa
      jQ3.initialize('processos-tarefa conteudo-tarefa .row', function(){
        const _thisHeader = this
        
  
        jQ3.initialize('.toolbar-processo', function(){
          function _guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          };
  
          
          var $tooB = jQ3(this)
          var $head = jQ3(_thisHeader)
          var $butExpand = $tooB.find(' > :first-child')
          const $aLinkAutos = $head.find('a:first-child')
          
          /*var $butSentinela = jQ3(`

          <button class="btn btn-sm btn-default pull-right" placement="bottom" title="Fixar autos digitais à tarefa" 
                  type="button">
                  <i aria-hidden="true" class="fa fa-lock-open" j2-i-lock ></i>
                  <i aria-hidden="true" class="fa fa-book ng-star-inserted" j2-i-book ></i>
          </button>

          `)
          
          var id = _guid()
          var prevIdProcesso = ''
      
          function __openSentinela(){
            var url = $aLinkAutos.attr('href')
            var name = 'autosDigSentinela'
            var [_prevIdProcesso] = url.match(/idProcesso=[0-9]+/)
            prevIdProcesso = _prevIdProcesso
            
            j2EOpW.center(url, name, id)
          }
      
          $butSentinela.click(()=>{
            $butSentinela.toggleClass('btn-default').toggleClass('btn-primary')
            $butSentinela.find('[j2-i-lock]').toggleClass('fa-lock-open').toggleClass('fa-lock')
            if( ! $butSentinela.is('.btn-primary') )
              return;
            __openSentinela()
          })
      
          $tooB.prepend($butSentinela)*/


          /* preparar o menu de data do processo */
          jQ3.initialize('#btn-gerenciar-etiquetas', function(){
            const $buttonTarget = jQ3(this)
            const $containerPai = $buttonTarget.parent()
            if($containerPai.is('[j2e-etq-calendario]'))
              return
            $containerPai.attr('j2e-etq-calendario')

            const calComponente = {
              $containerPai: $containerPai,
              datasEtiquetasAdicionas: []
            }

            ;(function _prepararLinhaDeComandos(){
              const $linhaComandos = $containerPai.clone(true)
              $linhaComandos.empty()
              $linhaComandos.addClass('pb-5 pt-10')
              
              calComponente.$linhaComandos = $linhaComandos
              $containerPai.find('ul:first-of-type .selecionar-etiquetas').append($linhaComandos)
            })();
            

            (function _prepararBotaoComandoAbrirCalendario(){
              const $newButton = $buttonTarget.clone(true)
              const $i = $newButton.find('i')
              const $iC = $i.clone(true)

              $newButton.attr('id', 'j2-btn-abrir-calendario')
              $iC.switchClass('fa-tag', 'fa-calendar-alt')
              $i.after($iC)
              $newButton.find('.numero-etiquetas-atribuidas').remove()
              $newButton.removeClass('etiqueta-ativa')
              

              const __callback = ($ev)=>{
                $ev.preventDefault()
                $ev.stopPropagation()

                calComponente.datasEtiquetasAdicionas = Array.from(jQ3('pje-selecionar-etiquetas .label-etiqueta'))
                .map(e => e.textContent || e.innerText)
                .filter(e => e.match(/\d{4}\.\d{2}\.\d{2}/))
                .map(e => e.match(/\d{4}\.\d{2}\.\d{2}/).at(0))
                .map(e => e.replaceAll('.', '-'))

                calComponente.$jQDatePicker.datepicker( "refresh" )
                calComponente.$ferramentas.$etiqueta.addClass('hidden')
                calComponente.$dropCalendario.addClass('open')
                calComponente.$dropCalendario.attr('j2-afc', '')
                setTimeout(()=> calComponente.$dropCalendario.removeAttr('j2-afc'), 250)
              }

              $newButton.click(__callback)
              $newButton.mousedown(__callback)
              $newButton.mouseup(__callback)

              calComponente.$btnAbrirCalendario = $newButton
              calComponente.$linhaComandos.append($newButton)
            })();

            
            (function _preparDropDownCalendario(){
              const $newUlContCal = $containerPai.find('ul').clone(true)
              $newUlContCal.find('li').empty()
              $newUlContCal.find('li').append(/*html*/`
                  <div id="date-picker"></div>
                  <div class="col-md-12">
                    <div class="pull-left  pb-5" id="ferr">
                      <a class="btn btn-sm j2-tag-btn hidden" title="Fluir para Certificar Trânsito" j2-tag-a="">
                        <i class="fa fa-tag" j2-tag-i></i>
                        <span>YYYY.MM.DD</span>
                      </a>
                    </div>
                    <div class="pull-right  pb-5" id="ferr">
                      <button type="button" class="btn btn-primary">Hoje</button>
                    </div>
                  </div>
              `)

              $newUlContCal.addClass('j2-container-datas')

              calComponente.$dropCalendario = $newUlContCal
              calComponente.$jQDatePicker = $newUlContCal.find('#date-picker')
              calComponente.$ferramentas = { 
                $hoje: $newUlContCal.find('#ferr button'),
                $etiqueta: $newUlContCal.find('#ferr a') 
              }
              $containerPai.append($newUlContCal)
            })();

            ;(function _construirDatePicker(){
              jQ3.initialize('.ui-icon-circle-triangle-w, .ui-icon-circle-triangle-e, .ui-datepicker-buttonpane button', function(){
                const $this = jQ3(this)
                $this.is('.ui-icon-circle-triangle-w') && $this.addClass('pi pi-chevron-left')
                $this.is('.ui-icon-circle-triangle-e') && $this.addClass('pi pi-chevron-right')
                $this.is('button') && $this.attr('class', 'btn btn-primary')

              }, {
                target: calComponente.$jQDatePicker.get(0)
              })

              calComponente.$jQDatePicker.datepicker({
                showButtonPanel: false,
                showAnim: "fold",
                showOtherMonths: true,
                currentText: "Hoje",
                prevText: "",
                nextText: "",
                dayNamesMin: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab" ],
                monthNames: [
                  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                ],
                beforeShowDay: function(input, inst){
                  /*[0]: true/false indicating whether or not this date is selectable
                  [1]: a CSS class name to add to the date's cell or "" for the default presentation
                  [2]: an optional popup tooltip for this date**/
                  
                  const inputIsoString = input.toISOString().split('T').at(0)

                  let selecionavel = true
                  let cssClasses = `d${inputIsoString}`
                  let tooltip = ''

                  if(calComponente.datasEtiquetasAdicionas.includes(inputIsoString))
                    cssClasses = 'j2-data-tagged'

                  return [selecionavel, cssClasses, tooltip]
                },
                onSelect: function(dateText, instDatpicker){
                  const [mes, dia, ano] = dateText.split('/')
                  const dataTexxIsoString = `${ano}-${mes}-${dia}`
                  const $etiqueta = calComponente.$ferramentas.$etiqueta

                  $etiqueta.find('span').text(`PZ ${ano}.${mes}.${dia}`)
                  $etiqueta.removeClass('hidden')

                  if(calComponente.datasEtiquetasAdicionas.includes(dataTexxIsoString))
                    $etiqueta.addClass('disabled')
                  else
                    $etiqueta.removeClass('disabled')
                },
                onChangeMonthYear: function(year, month, inst){
                  calComponente.$ferramentas.$etiqueta.addClass('hidden')
                }
              })
              
              //j2E.mods.Calendario.contarPrazo(new Date(`${items[i].data_disponibilizacao}T00:00:00.000-03:00`), 1)

              jQ3(document).on('click', function(event) {
                const $elVisivel = calComponente.$dropCalendario
                const $target = jQ3(event.target)

                if( $target.parents('.ui-datepicker-header').length )
                  return
                if (
                  !$elVisivel.is(event.target) && 
                  $elVisivel.has(event.target).length === 0 &&
                  !$elVisivel.is('[j2-afc]')
                  ) {
                  $elVisivel.removeClass('open')
                }
              });

              calComponente.$ferramentas.$hoje.click(()=>{
                calComponente.$jQDatePicker.datepicker( "setDate", 0 )
              })

              calComponente.$ferramentas.$etiqueta.click(()=>{
                const $_this = calComponente.$ferramentas.$etiqueta
                const idProcesso = $aLinkAutos.attr('href').match(/idProcesso=[0-9]+/)?.at(0).match(/(\d+)/g)?.at(0)
                const textoEtiqueta = $_this.text().trim()
                const textoEtiquetaISO = textoEtiqueta.match(/\d{4}\.\d{2}\.\d{2}/).at(0).replaceAll('.', '-')
              
                __sendMessageToPje({
                  action : 'requisitarJ2EPJeRest',
                  PJeRest : 'j2EPJeRest.etiquetas.inserir',
                  waitsResponse : true,
                  arguments : [idProcesso, textoEtiqueta]
                }, 
                "PARENT_TOP", 
                etiquetaNova => { 
                  if(!etiquetaNova){
                    jQ3.Toast("Etiqueta de data", `Etiqueta "${textoEtiqueta}" já está vinculada ao processo.`, "info")
                    return
                  }
                  const taskId = $aLinkAutos.attr('href').match(/idTaskInstance=[0-9]+/)?.at(0).match(/(\d+)/g)?.at(0)

                  const eventData = {
                    data: {
                      taskId: taskId,
                      tag: etiquetaNova.nomeTag,
                      idTag: etiquetaNova.id,
                      idProcesso: idProcesso
                    }
                  }

                  evBus.fire('on-adicionar-etiqueta-via-pje', eventData, 'Etiqueta de data')

                  jQ3.Toast('Etiqueta de data', `"${textoEtiqueta}" vinculada ao processo.`, "success")

                  calComponente.datasEtiquetasAdicionas.push(`${textoEtiquetaISO}`)
                  $_this.addClass('hidden')
                  jQ3(`.j2-container-datas .d${textoEtiquetaISO}`).addClass('j2-data-tagged')
                })

              })
            })()

          }, {target : this})
          
          return 
          $aLinkAutos.observe('attributes', (rec)=>{
            if( ! $butSentinela.is('.btn-primary') )
              return;
      
            if( rec.attributeName !== 'href' )
              return;
            
            const [idProcesso] = jQ3(rec.target).attr('href').match(/idProcesso=[0-9]+/)
            if(idProcesso === prevIdProcesso)
              return;
      
            prevIdProcesso = idProcesso
            __openSentinela()
          });
          
          
  
        }, {target : this})

        

      }, {target : this})
    });
    
  }
    
  personaliazarPainelUsuarioECabecalhoTarefa();
  
  
  observeListaDeProcessosTarefaAtiva();  
  criarControlesFiltroListasDeTarefas();  
  observeListasDeTarefas();
  observeConteudoTarefas();
  
  personaliazarMenuNavegacao();
  
  
  listenMessages();


  evBus.on('on-adicionar-etiqueta-via-pje', function(ev, args, toasterTitulo) {
    const etiqueta = args.data
    toasterTitulo = toasterTitulo ? toasterTitulo : "Etiqueta rápida"

    const $card = jQ3(`#${etiqueta.taskId}`).parents('processo-datalist-card')
    //const $selEtiqContainer = jQ3('pje-selecionar-etiquetas .labels-etiquetas')
    //const $botaoGerenciarEtiqueta = jQ3('#btn-gerenciar-etiquetas')
    //const $qtdEtiquetas = $botaoGerenciarEtiqueta.find('.numero-etiquetas-atribuidas')
    

    const $novaEtiqueta = jQ3(/*html*/`
      <div _ngcontent-nam-c13 class="label label-info label-etiqueta ng-star-inserted j2EtiquetaEstilo">
        <span _ngcontent-nam-c13 >${etiqueta.tag}</span>
        <span _ngcontent-nam-c13 class="icon-desvincular-tag pl-5" title="Excluir etiqueta ${etiqueta.tag}">
          <i _ngcontent-nam-c13 class="fa fa-times "></i>
        </span>
      </div>
    `)
    //const $novaEtiqueta2 = $novaEtiqueta.clone(true)

    $card.find(' > div > div:nth-child(3)').append($novaEtiqueta)
    //$selEtiqContainer.append($novaEtiqueta2)
    

    //$botaoGerenciarEtiqueta.addClass('etiqueta-ativa')
    //$qtdEtiquetas.text(parseInt($qtdEtiquetas.text()) + 1)

    const ____clickCallback = ()=>{
      __sendMessageToPje({
        action : 'requisitarJ2EPJeRest',
        PJeRest : 'j2EPJeRest.etiquetas.remover',
        waitsResponse : true,
        arguments : [ parseFloat(etiqueta.idProcesso), etiqueta.idTag ]
      }, 
      "PARENT_TOP",
      function(data){
        if(data === etiqueta.idTag){
          $novaEtiqueta.remove()
          //$novaEtiqueta2.remove()

          //$qtdEtiquetas.text(parseInt($qtdEtiquetas.text()) - 1)
          //if($qtdEtiquetas.text() === 0 )
            //$botaoGerenciarEtiqueta.removeClass('etiqueta-ativa')

          jQ3.Toast("Etiqueta rápida", `"${etiqueta.tag}" desvinculada.`, "success")
        }else
          jQ3.Toast("Etiqueta rápida", `Erro ao desvincular "${etiqueta.tag}": ${data}.`, "error")
      })
    }

    $novaEtiqueta.find('i').click(____clickCallback)
    //$novaEtiqueta2.find('i').click(____clickCallback)
  })
};
