
 
function lg(t,d){
  if(d) 
    console.log(t, d);
  else
    console.log(t);
};

function somarDiasDeHoje(dias){
  var data = new Date();
  data = new Date( data.setHours(0,0,0,0) );  
  data = new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000))
  var _isoStringAr = data.toISOString().split('T')[0].split('-');  
  return [_isoStringAr[2], _isoStringAr[1], _isoStringAr[0]].join('/');
  
}


(function(){
  //addScript("jquery3.js");
  addStyleSheet("Extensao/main.css");
  addStyleSheet("Extensao/jquery-ui.css");
  //addScript("jquery.initialize.js");
  //addScript("jquery.observe.js");
  //addScript("main.js");
})();

class TarefaPersonalizadaAvancada{
  static suportaDocumentoTipoPDF = false;

  static obterTodasAsTarefas(){
    return Object.keys( TarefasProps )
  }

  static obterTarefasProExpressaoRegular(regex){
    const nomesDeTarefas = Object.keys( TarefasProps )
    return nomesDeTarefas.filter( nomeTarefa =>{
      return nomeTarefa.match(regex)
    })
  }

  static faixaDeEtiquetas(
    nomeTarefaOuTarefasOuRegExpTarefa, //'Processo com prazo em curso'
    classeDoConteinerDasEtiquetas
  ){
    var argumentosSemTarefa = [
      classeDoConteinerDasEtiquetas,
    ]
    if(Array.isArray(nomeTarefaOuTarefasOuRegExpTarefa) ){
      nomeTarefaOuTarefasOuRegExpTarefa.forEach( nomeTarefa =>{
        TarefaPersonalizadaAvancada.faixaDeEtiquetas(
          nomeTarefa, ...argumentosSemTarefa
        )
      })
      return;
    }

    if( nomeTarefaOuTarefasOuRegExpTarefa instanceof RegExp ){
      TarefaPersonalizadaAvancada.obterTarefasProExpressaoRegular(nomeTarefaOuTarefasOuRegExpTarefa)
      .forEach(nomeTarefaPelaRegExp =>{
        TarefaPersonalizadaAvancada.faixaDeEtiquetas(
          nomeTarefaPelaRegExp, ...argumentosSemTarefa
        )
      })
      return;
    }


    const tarefa = TarefasProps[nomeTarefaOuTarefasOuRegExpTarefa]

    tarefa.personalizacao ??= {}
    tarefa.personalizacao.painel ??= []

    tarefa.personalizacao.painel.push({
      appendTo : ()=>{
        jQ3('#taskInstanceForm').before('<div id="faixaDeEtiquetas">')
        return jQ3('#faixaDeEtiquetas')
      },
      header : '[SEM HEADER]',
      panelClass : `rich-panel col-sm-12 j2-faixa-etiquetas hidden`,
      j2Attr : 'j2-painel-basic-css',
      body : [
        {
          tipo : 'jQ3',
          data : [ 
          ]
        }
      ],
      events : [
      ($thisPanel)=>{
        var idProcesso =  j2E.env.urlParms.idProcesso
        var taskId =  j2E.env.urlParms.newTaskId
        var tarefasDoProcesso = []

        function __atualizarAsEstiquetasNaFaixaDeEtiquetas(){
          j2EPJeRest.processo.obterEtiquetas(idProcesso)
          .done(res => { 
            if(! res.length){
              $thisPanel.addClass('hidden')
              jQ3('#faixaDeEtiquetas').find('[j2-faixa-etiquetas-spacer]').remove()
              return;
            }

            tarefasDoProcesso = res.map(_tarefa =>{
              return _tarefa.nomeTagCompleto;
            })

            $thisPanel.find('[j2-ui-content]').empty()
            $thisPanel.find('[j2-ui-content]').append(
              j2EUi.TarefaNumClique.createTags(
                tarefasDoProcesso,
                classeDoConteinerDasEtiquetas
              ) 
            )

            $thisPanel.find('[j2-tags-rapidas]').mousedown((ev)=>{
              if(ev.which !== 1)
                return;
              
            /*  const $tag = jQ3(ev.target)
              if(! $tag.is('[j2-tag-a]') && ! $tag.is('[j2-tag-i]')  )
                return;
    
              var etiqueta =  $tag.is('[j2-tag-a]') ? $tag.text().trim() : $tag.parent().text().trim()
    
              j2EPJeRest.etiquetas.inserir(idProcesso, etiqueta)
              .then( (res)=>{
                if(typeof res === 'undefined'){
                  $.Toast("Etiqueta rápida", `"${etiqueta}" já está vinculada.`, "info")
                  return;
                }
    
                $.Toast("Etiqueta rápida", `"${etiqueta}" vinculada.`, "success")
    
                evBus.fire('on-adicionar-etiqueta-via-pje', {
                  tag : etiqueta,
                  idProcesso : idProcesso,
                  taskId : taskId,
                  idTag : res.id
                })
              })
              .fail((err)=>{
                $.Toast("Etiqueta rápida", `Erro ao vincular "${etiqueta}": ${err}.`, "error")
              })        
              
              opcoesAvancadas?.onTagClick()*/
            })

            $thisPanel.removeClass('hidden')
            if( ! jQ3('#faixaDeEtiquetas').find('[j2-faixa-etiquetas-spacer]').length )
              jQ3('#faixaDeEtiquetas').append('<div j2-faixa-etiquetas-spacer>&nbsp;</div>')
          })
          .fail( err=>{
            $.Toast("Faixa de etiquetas", `Erro ao obter etiquetas do processo: ${err}.`, "error")
          })
        }

        __atualizarAsEstiquetasNaFaixaDeEtiquetas()
        evBus.on('on-adicionar-etiqueta-via-pje', __atualizarAsEstiquetasNaFaixaDeEtiquetas)
        evBus.on(`on-remover-etiqueta-via-frontend-${taskId}`, __atualizarAsEstiquetasNaFaixaDeEtiquetas)
      },  
      ]
    })
  }

  static tarefaNumCliqueJuntadaDocumento(
    nomeTarefaOuTarefasOuRegExpTarefa, //'Processo com prazo em curso'
    widthColSM, // 'col-sm-x'
    acaoTexto, // "Certificar o decurso de prazo dos expedientes abaixo selecionados"
    botaoAcaoTexto, //"Juntar certidão de decurso de prazo"
    personalizacaoUsaIframeExpedientes,
    modeloJ2, /* {
      idModelo : 'j2Certidao',
      pjeTipoDocumento: 'certidao', //em lowercase
      versao: '3.0' //versao do modelo j2
      descricao: `Prazo decorrido (${j2E.Expedientes.util.enumerarParteEVencimentoDoExpedientes(dadosExpedientes)})` // descricao para eval()
      numeroDocumento: '',
      fontDocumento: 'text/html' //apenas
    }*/
    modeloJ2Robot, 
    avaliacaoDinamicaParaRobot
    ){

    var argumentosSemTarefa = [
      widthColSM, 
      acaoTexto, 
      botaoAcaoTexto, 
      personalizacaoUsaIframeExpedientes,
      modeloJ2,
      modeloJ2Robot, 
      avaliacaoDinamicaParaRobot
    ]

    if(Array.isArray(nomeTarefaOuTarefasOuRegExpTarefa) ){
      nomeTarefaOuTarefasOuRegExpTarefa.forEach( nomeTarefa =>{
        TarefaPersonalizadaAvancada.tarefaNumCliqueJuntadaDocumento(
          nomeTarefa, ...argumentosSemTarefa
        )
      })
      return;
    }

    if( nomeTarefaOuTarefasOuRegExpTarefa instanceof RegExp ){
      TarefaPersonalizadaAvancada.obterTarefasProExpressaoRegular(nomeTarefaOuTarefasOuRegExpTarefa)
      .forEach(nomeTarefaPelaRegExp =>{
        TarefaPersonalizadaAvancada.etiquetasRapidas(
          nomeTarefaPelaRegExp, ...argumentosSemTarefa
        )
      })
      return;
    }


    const tarefa = TarefasProps[nomeTarefaOuTarefasOuRegExpTarefa]

    tarefa.personalizacao ??= {}
    tarefa.personalizacao.prepararInteracoes ??= []

    const dependenciaIteracoes = [
      'seam-processo', 
      'remote-j2Doc-create' 
    ]
    dependenciaIteracoes.forEach( item =>{
      if( ! tarefa.personalizacao.prepararInteracoes.includes(item) )
        tarefa.personalizacao.prepararInteracoes.push(item)
    })

    tarefa.personalizacao.painel ??= []

    const __buttonId = guid ? guid() : `rand-${Math.random()}` //'j2-juntar-certidao-decurso-prazo'

    if(tarefa.personalizacao.painel.filter(item =>{
      return item.id === 'tarefa-num-clique'
    }).length === 0)
      tarefa.personalizacao.painel.push({
        id: 'tarefa-num-clique',
        appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
        header : 'Tarefa em um clique',
        panelClass : `rich-panel ${widthColSM}`,
        j2Attr : 'j2-painel-basic-css',
        body : [
          {
            tipo : 'table',
            data : [
              ["Ação", "Executar"],
            ]
          }
        ],
      /* collapsable : {
        initExpanded: false
        },*/
        events : [
        ]
      })
    
    tarefa.personalizacao.painel.filter(item =>{
      return item.id === 'tarefa-num-clique'
    })[0].body[0].data.push([
      acaoTexto, 
      j2EUi.createButton({
        textoButton : botaoAcaoTexto, 
        classButton : 'btn-primary', 
        //callback : () => { console.log('Callback da construção do botão: acioinado') }, 
        id : __buttonId,
        moreAttrs : {
          disabled : true
        }
      })
    ])

    tarefa.personalizacao.painel.filter(item =>{
      return item.id === 'tarefa-num-clique'
    })[0].events.push(
      ($thisPanel) => {
        var _deferToRoutine = jQ3.Deferred()
        const contextMap = new Map();

        function __routine($thisPanel, seamProcIteraction, expedientesIFrame){

          const ids = [
            `#${__buttonId}`
          ]
          $thisPanel.find(ids.join(', ')).removeAttr('disabled')

          var [$botaoDaAcaoEmUmClique] = ids

          $botaoDaAcaoEmUmClique = $thisPanel.find($botaoDaAcaoEmUmClique).click(async ($event)=>{
          if( ! $event.ctrlKey ){
            $.Toast("Confirme para juntar em um clique.", "Pressione ctrl e clique para gerar o documento.", "info")

            return;
          }

            var $this = $botaoDaAcaoEmUmClique
            $this.attr('disabled', 'true')
            j2EUi.createRichModal()
            $this.disabledDef = jQ3.Deferred()
            $this.disabledDef.done( ()=> setTimeout(()=>{
            $this.removeAttr('disabled')
            j2EUi.removeModal()
          }, 500 ))
            
            let dadosExpedientes
            let $inps
            if (personalizacaoUsaIframeExpedientes){
              function _obterCargaDaIframe(){
                var $jQ3i = expedientesIFrame.prop('contentWindow').jQ3
                if(!($jQ3i)){
                  $.Toast("Erro ao Juntar em um clique.", "Expedientes não estão prontos.", "error")
                  return false;
                }

                $inps = $jQ3i.find('input[j2-seletor-expediente]:checked')
                if(! $inps.length){
                  $.Toast("Erro ao Juntar em um clique.", "Nenhum expediente selecionado.", "error")
                  return false;
                }

                dadosExpedientes = j2E.Expedientes.util.parseLinhaDeExpedientesSelecionados($inps)
                contextMap.set('dadosExpedientes', dadosExpedientes)

                $inps = jQ3($inps)
        
                return true;
              }

              if(! _obterCargaDaIframe()){
              $this.disabledDef.resolve()
              return;
              }
            }


            
            const idModelo = modeloJ2.idModelo
            const pjeTipoDocumento = modeloJ2.pjeTipoDocumento
            const versao = modeloJ2.versao
            const fonteDocumento =  TarefaPersonalizadaAvancada.suportaDocumentoTipoPDF ? modeloJ2.fonteDocumento : 'text/html'
            const numeroDocumento = modeloJ2.numeroDocumento
            const robot = modeloJ2Robot
            contextMap.set('robot', robot)
            const descricao = (()=>{
              switch(typeof modeloJ2.descricao){
                case 'string':
                  return modeloJ2.descricao;
                case 'function':
                  return modeloJ2.descricao()
                case 'object':
                  const desc = modeloJ2.descricao
                  if(!(desc.toEval && desc.contexto)){
                    $.Toast("Juntar em um clique.", "Não foi possível gerar a descição para o documento", "info")
                    return ''
                  }

                  var _contexto = []
                  desc.contexto.forEach( localVar => {
                    _contexto.push(contextMap.get(localVar))
                  })
                  return desc.toEval(..._contexto)
              }
            })();
            
            ( avaliacaoDinamicaParaRobot || [] ).forEach(toEvalObj => {
              var _contexto = []
              toEvalObj.contexto.forEach( localVar => {
                _contexto.push(contextMap.get(localVar))
              })
              toEvalObj.toEval(..._contexto)
            });



            try{
              const PJeVarsHTML = await j2E.SeamIteraction.processo.acoes.acaoObterVariaveisParaExtensao()
              const html = await j2E.mods.remoteJ2DocCreator(idModelo, versao, PJeVarsHTML, robot)   
              
              j2E.SeamIteraction.processo.acoes.acaoJuntarDocumento(pjeTipoDocumento, descricao, fonteDocumento, {
                html : html
              }, numeroDocumento)
              .done( ()=>{
                $.Toast("Juntar num clique", "Juntado com sucesso.", "success")

                if(personalizacaoUsaIframeExpedientes){
                  $inps.each((idx, el)=>{
                  jQ3(el).parents('tr:first').addClass('success').removeClass('info') 
                  }) 
                  $inps.attr('disabled','')
                }
              } )
              .fail( (err)=>{
                $.Toast("Erro ao Juntar num clique", err, "error")
              } )
              .always(()=>{
                $this.disabledDef.resolve()
              })
            }catch(err){
              $.Toast("Erro ao Juntar num clique", err, "error")
              $this.disabledDef.resolve()
            }
          })

          $.Toast("Tarefa em um clique", "Pronto para executar.", "success")
        }

        if( j2E.env.tempData?.prepararSeamIteraction?.evBusTriggered )
          _deferToRoutine.resolve(j2E.env.tempData?.prepararSeamIteraction.interactionObject)
        else
          evBus.on('Tarefa.Personalizacao.prepararInteracoes.autosDigitaisCarregados', int => { 
            _deferToRoutine.resolve(int)
          }) 
        
        var _defTarf = j2E.env.deferring.personalizacaoTarefa
        const tarefaNumCliqueDeffs = [
          _deferToRoutine,
          _defTarf.prepararInteracoes.remoteJ2DocCreate
        ]
        if(personalizacaoUsaIframeExpedientes)
          tarefaNumCliqueDeffs.push(_defTarf.carregarExpedientes)

        jQ3.when(...tarefaNumCliqueDeffs)
        .done( (int, nothingExpected, expIFrame)=>{
          __routine($thisPanel, int, expIFrame) 
        })
      }
    )
  }

  static etiquetasRapidas(
    nomeTarefaOuTarefasOuRegExpTarefa, //'Processo com prazo em curso'
    widthColSM, // 'col-sm-3'
    etiquetasArray, // ['fluir cert Trans']
    classeDoConteinerDasEtiquetas,
    opcoesAvancadas
  ){
    var argumentosSemTarefa = [
      widthColSM, // 'col-sm-3'
      etiquetasArray, // ['fluir cert Trans']
      classeDoConteinerDasEtiquetas,
      opcoesAvancadas
    ]
    if(Array.isArray(nomeTarefaOuTarefasOuRegExpTarefa) ){
      nomeTarefaOuTarefasOuRegExpTarefa.forEach( nomeTarefa =>{
        TarefaPersonalizadaAvancada.etiquetasRapidas(
          nomeTarefa, ...argumentosSemTarefa
        )
      })
      return;
    }

    if( nomeTarefaOuTarefasOuRegExpTarefa instanceof RegExp ){
      TarefaPersonalizadaAvancada.obterTarefasProExpressaoRegular(nomeTarefaOuTarefasOuRegExpTarefa)
      .forEach(nomeTarefaPelaRegExp =>{
        TarefaPersonalizadaAvancada.etiquetasRapidas(
          nomeTarefaPelaRegExp, ...argumentosSemTarefa
        )
      })
      return;
    }


    const tarefa = TarefasProps[nomeTarefaOuTarefasOuRegExpTarefa]

    tarefa.personalizacao ??= {}
    tarefa.personalizacao.painel ??= []

    tarefa.personalizacao.painel.push({
      appendTo : opcoesAvancadas?.panelAppendTo  || 'form#taskInstanceForm > div > div.rich-panel-body',
      header : 'Etiqueta rápida',
      panelClass : `rich-panel ${widthColSM || 'col-sm-3'} ${ opcoesAvancadas?.panelClass ? opcoesAvancadas?.panelClass : '' }`,
      j2Attr : 'j2-painel-basic-css',
      body : [
        {
          tipo : 'jQ3',
          data : [ 
            j2EUi.TarefaNumClique.createTags(
              etiquetasArray,
              classeDoConteinerDasEtiquetas
            ) 
          ]
        }
      ],
      events : [
      ($thisPanel)=>{
        $thisPanel.find('[j2-tags-rapidas]').mousedown((ev)=>{
          if(ev.which !== 1)
            return;

          const $tag = jQ3(ev.target)
          if(! $tag.is('[j2-tag-a]') && ! $tag.is('[j2-tag-i]')  )
            return;

          var idProcesso =  j2E.env.urlParms.idProcesso
          var taskId =  j2E.env.urlParms.newTaskId
          var etiqueta =  $tag.is('[j2-tag-a]') ? $tag.text().trim() : $tag.parent().text().trim()

          j2EPJeRest.etiquetas.inserir(idProcesso, etiqueta)
          .then( (res)=>{
            if(typeof res === 'undefined'){
              $.Toast("Etiqueta rápida", `"${etiqueta}" já está vinculada.`, "info")
              return;
            }

            $.Toast("Etiqueta rápida", `"${etiqueta}" vinculada.`, "success")

            evBus.fire('on-adicionar-etiqueta-via-pje', {
              tag : etiqueta,
              idProcesso : idProcesso,
              taskId : taskId,
              idTag : res.id
            })
          })
          .fail((err)=>{
            $.Toast("Etiqueta rápida", `Erro ao vincular "${etiqueta}": ${err}.`, "error")
          })        
          
          opcoesAvancadas?.onTagClick()
        })
      },  
      ]
    })
  }
}

var TarefasProps = {
  'Apensar processos' : {
    ADMGrupo : 'outac'
  },
  'Análise de perícia' : {
    altNomeADM : 'Controlar perícia',
    orgNome : 'Análise de perícia',
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'certfc'
    },
    altNome : 'Certificar tempestividade de recurso',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Certificar tempestividade de recurso'
      },
      transicaoManterApenasIgnorarESairTarefa : true,
      mostraAutosDigitais : true
    }
  },
  'Arquivo definitivo' : {
    personalizacao : { // Personalização de teste baeada em Expedir Alvará
      ignorarPersonalizacaoDev : true,
      prepararInteracoes : [
        'seam-processo',
        'remote-j2Doc-create'
      ],
      /*ADM : {
        estenderControlarAudiencia : true
      },*/
       painel : [
         {
           appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
           header : '[UNIDADE DE TESTE]',
           body : [
            {
              tipo : 'table',
              data : [
                ["Ação", "Executar"],
                [
                  "[TESTE DE AUTO CRIAÃO DE DOCUMENTO]", 
                  j2EUi.createButton({
                    textoButton : "Executar ação", 
                    classButton : 'btn-primary', 
                    callback : () => { console.log('Callback da construção do botão: acioinado') }, 
                    id : 'j2-teste-auto-criacao',
                    moreAttrs : {
                      disabled : true
                    }
                  })
                ],
                ['[TESTE DE ETIQUETAS RÁPIDAS]', 
                  j2EUi.TarefaNumClique.createTags([
                    'Fluir CertTrans',
                    'Análise Detida',
                    '[TJMA] revisar assunto: 3ª revisão'
                  ]) ],
                
              ]
            }
          ],
          events : [
            ($thisPanel)=>{
              $thisPanel.find('.j2-tags-tarefa-num-clique').mousedown((ev)=>{
                if(ev.which !== 1)
                  return;

                const $tag = jQ3(ev.target)
                if(! $tag.is('[j2-tag-a]') && ! $tag.is('[j2-tag-i]')  )
                  return;

                var idProcesso =  j2E.env.urlParms.idProcesso
                var taskId =  j2E.env.urlParms.newTaskId
                var etiqueta =  $tag.is('[j2-tag-a]') ? $tag.text().trim() : $tag.parent().text().trim()

                j2EPJeRest.etiquetas.inserir(idProcesso, etiqueta)
                .then( (res)=>{
                  if(typeof res === 'undefined'){
                    $.Toast("Etiqueta rápida", `"${etiqueta}" já está vinculada.`, "info")
                    return;
                  }

                  $.Toast("Etiqueta rápida", `"${etiqueta}" vinculada.`, "success")

                  evBus.fire('on-adicionar-etiqueta-via-pje', {
                    tag : etiqueta,
                    idProcesso : idProcesso,
                    taskId : taskId,
                    idTag : res.id
                  })
                })
                .fail((err)=>{
                  $.Toast("Etiqueta rápida", `Erro ao vincular "${etiqueta}": ${err}.`, "error")
                })                
              })
            },  
            ($thisPanel, seamProcIteraction) => {
              function __routine($thisPanel){

                const ids = [
                  '#j2-teste-auto-criacao'
                ]
                $thisPanel.find(ids.join(', ')).removeAttr('disabled')

                const [testeAutoCriacao] = ids

                $thisPanel.find(testeAutoCriacao).click(async ()=>{
                  try{
                    const idModelo = 'j2Certidao'
                    const pjeTipoDocumento = 'certidão'
                    const versao = '3.0'
                    const descricao = '[Teste]'
                    const fonteDocumento = 'text/html'
                    const numeroDocumento = 1
                    const robot = { 
                      executarNoEvento : {
                        evento : 'afterLoadItems.selectorPessoa',
                        atrasar : 250
                      },
                      passos : [
                        {
                          tipo : 'iterarSelector',
                          instanceId: 'certidaoItens',
                          items: [
                            'certItPrazoSemCump'
                          ]
                        },                        
                        //todo robô deve ter como ultimo passo o fechamento do edt
                        {
                          tipo : 'avaliacaoDeString',
                          string: 'j2.mod.clsCnstr.DocEditorCore.closeByRobot'
                        }
                      ]
                    }

                    /*const PJeVarsHTML = await j2E.SeamIteraction.processo.acoes.acaoObterVariaveisParaExtensao()
                    const html = await j2E.mods.remoteJ2DocCreator(idModelo, versao, PJeVarsHTML, robot)   */
                    const html = '<P>TESTE</P>'
                    j2E.SeamIteraction.processo.acoes.acaoJuntarDocumento(pjeTipoDocumento, descricao, fonteDocumento, {
                      html : html
                    }, numeroDocumento)
                    .done( ()=>{
                      $.Toast("Juntar num clique", "Juntado com sucesso.", "success")
                    } )
                    .fail( (err)=>{
                      $.Toast("Erro ao Juntar num clique", err, "error")
                    } )
                  }catch(err){
                    $.Toast("Erro ao Juntar num clique", err, "error")
                  }
                })

                $.Toast("Juntar num clique", "Pronto para juntar.", "success")
              }

              if( j2E.env.tempData?.prepararSeamIteraction?.evBusTriggered )
                __routine($thisPanel, j2E.env.tempData?.prepararSeamIteraction.interactionObject)
              else
                evBus.on('Tarefa.Personalizacao.prepararInteracoes.autosDigitaisCarregados', int => { 
                  __routine($thisPanel, int)
                }) 
            }
          ]
         }
       ],
       /*removeDoCorpo : [
         "form#taskInstanceForm table tr:first td:first div:first"
       ],*/
       limpaCorpoTarefa : true,
    }
  },
  'Avaliar determinações do magistrado' :{
    personalizacao : {
      procedimentoEspecializado : 'ADM-reorganizarTarefas'
    }
  },
  'Avaliar Expediente Fechado' : {
    /*altNomeADM : 'Verificar decurso de prazo',
    ADMGrupo : 'agdStt',*/
    personalizacao : {
      'mostraAutosDigitais' : false,
      'mostraExpedientes' : true,
      mostraJuntarDocumento : true,
      'limpaCorpoTarefa' : true
    }
  },
  'Audiência realizada pelo magistrado' : {
    personalizacao : {
      mostraAutosDigitais : true
    }
  },
  'Cerificar juízo digital' : {
    ADMGrupo : 'certfc'
  },
  'Certificar trânsito em julgado' : {
    ADMGrupo : 'certfc'
  },
  'Certificar consulta INFOJUD' : {
    altNomeADM : 'Consultar INFOJUD',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta INFOSEG' : {
    altNomeADM : 'Consultar INFOSEG',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta SERASAJUD' : {
    altNomeADM : 'Consultar SERASAJUD',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta SIAFERJ' : {
    altNomeADM : 'Consultar SIAFERJ',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta SIEL' : {
    altNomeADM : 'Consultar SIEL',
    ADMGrupo : 'cnslts'
  },
  'Designar leilão' : {
    altNomeADM : 'Controlar leilão',
    ADMGrupo : 'outac'
  },
  'Designar audiência' : {
    ADMGrupo : 'aud',
    altNomeADM : 'Controlar audiência',
    ADMShortCut : 'A',
    personalizacao : {
       ADM : {
         estenderControlarAudiencia : true
       },
       painel : [
         {
           appendTo : 'form#taskInstanceForm table tr:first td:first',
           header : 'Orientações para designação de audiência',
           body : [
             {
               tipo : 'table',
               data : [
                 ["Caraterísticas", "Prazo designação", ""],
                 ["Pessoa jurídica recorrente na cidade", "30 dias", somarDiasDeHoje(30)],
                 ["Pessoa jurídica com procuradoria", "30 dias", somarDiasDeHoje(30)],
                 ["Pessoa jurídica fora da cidade", "40 dias", somarDiasDeHoje(40)],
                 ["Pessoa física fora da comarca", "50 dias", somarDiasDeHoje(50)],
                 ["Pessoa física dentro da comarca", "40 dias", somarDiasDeHoje(40)]
               ]
             }
           ]
         }
       ],
       removeDoCorpo : [
         "form#taskInstanceForm table tr:first td:first div:first"
       ]
     }
  },
  'Encaminhar para instância superior' : {
    personalizacao : {
      transicaoRemover : [
        'Encaminhar para TJMA',
        'Remetidos ao STJ',
        'Remetidos ao STF',
        'Remetidos ao TRF1'
      ]
    }
  },
  'Expedir alvará' : {
    ADMGrupo : 'exps',
    personalizacao : {
      ignorarPersonalizacaoDev : true,
      prepararSeamIteraction : [
        'processo'
      ],
      /*ADM : {
        estenderControlarAudiencia : true
      },*/
       painel : [
         {
           appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
           header : 'Ações da tarefa Expedir Alvará',
           body : [
            {
              tipo : 'table',
              data : [
                ["Ação", "Executar"],
                [
                  "Criar certidão de encaminhamento para expedição de alvará", 
                  j2EUi.createButton({
                    textoButton : "Executar ação", 
                    classButton : 'btn-primary', 
                    callback : () => { alert('TESTE BEM SUCEDIDO') }, 
                    id : 'j2-acoes-expedir-certidao-encaminhamento',
                    moreAttrs : {
                      disabled : true
                    }
                  })
                ],
                [
                  "Criar certidão de alvará expedido encaminha para assinatura", 
                  j2EUi.createButton({
                    textoButton : "Executar ação", 
                    classButton : 'btn-primary', 
                    callback : () => { alert('TESTE BEM SUCEDIDO 2') }, 
                    id : 'j2-acoes-expedir-certidao-para-assinatura',
                    disabled : true,
                    moreAttrs : {
                      disabled : true
                    }
                  })
                ]
              ]
            }
          ],
          events : [
            ($thisPanel) => {
              function __routine($thisPanel){
                const ids = [
                  '#j2-acoes-expedir-certidao-encaminhamento',
                  '#j2-acoes-expedir-certidao-para-assinatura'
                ]
                $thisPanel.find(ids.join(', ')).removeAttr('disabled')

                const [encaminhamento, paraAssinatura] = ids

                $thisPanel.find(encaminhamento).click(()=>{
                  alert('alteracaoCallbackSuccess encaminhamento') 
                })
                $thisPanel.find(paraAssinatura).click(()=>{
                  alert('alteracaoCallbackSuccess paraAssinatura') 
                })
              }

              const _tarfProp = TarefasProps['Expedir alvará']

              if( _tarfProp.personalizacao?.prepararSeamIteraction?.evBusTriggered )
                __routine($thisPanel, _tarfProp.personalizacao.prepararSeamIteraction.___int)
              else
                evBus.on('Tarefa.Personalizacao.prepararInteracoes.autosDigitaisCarregados', int => { 
                  __routine($thisPanel, int)
                }) 
            }
          ]
         },
         {
          appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
          header : 'Atalhos',
          body : [
            {
              tipo : 'button',
              data : {
                classButton : 'btn-primary',
                onclickAttr : "window.open('https://siscondj.tjma.jus.br/portalsiscondj/login.jsp')",
                id : 'j2-abrir-siscondej',
                tag : 'a',
                textoButton : 'Abrir SISCONDJ'
              }
            },
            {
              tipo : 'button',
              data : {
                classButton : 'btn-primary',
                onclickAttr : "window.open('https://www63.bb.com.br/portalbb/djo/login.bbx')",
                id : 'j2-abrir-siscondej',
                tag : 'a',
                textoButton : 'Abrir Depósitos Judicais Banco do Brasil'
              }
            }
          ]
        }
       ],
       /*removeDoCorpo : [
         "form#taskInstanceForm table tr:first td:first div:first"
       ],*/
       limpaCorpoTarefa : true,
    }
  },
  'Expedir alvará 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir alvará 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir alvará 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir ato ordinatório' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir Carta ou mandado 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir Carta ou mandado 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir Carta ou mandado 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir certidão' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta ou mandado' : {
    altNomeADM : 'Expedir mandado',
    ADMGrupo : 'exps'
  },
  'Preparar citação' : {
    altNomeADM : 'Expedir citação',
    ADMGrupo : 'exps',
    ADMShortCut : 'C'
  },
  'Preparar citação e(ou) intimação' : {
    altNomeADM : 'Expedir citação e(ou) intimação',
    ADMGrupo : 'exps',
    ADMShortCut : 'N'
  },
  'Expedir edital' : {
    ADMGrupo : 'exps'
  },
  'Preparar intimação' : {
    altNomeADM : 'Expedir intimação',
    ADMGrupo : 'exps',
    ADMShortCut : 'I'
  },
  'Expedir outros documentos' : {
    ADMGrupo : 'exps'
  },
  'Expedir múltiplos documentos' : {
    altNomeADM : 'Expedir vários documentos',
    altNome : 'Prosseguir outros status aguardando ',
    orgNome : 'Expedir múltiplos documentos',
    ADMGrupo : {
      org : 'exps',
      alt : 'agdStt'
    },
    personalizacao : {
      procedimentoEspecializado : 'ADM-reorganizarTarefas',
      ADM : {
        orgNaoEsmaecido : true
      }
    },
    orgName : 'Expedir múltiplos documentos',
    ADMGruposSet : 'A',
    hibrida : true
  },
  'Expedir notificação' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir precatório' : {
    altNome : 'Processo com prazo manual em curso',
    orgNome : 'Expedir precatório',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar decurso de prazo manual'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true,
      mostraAutosDigitais : true,
      painel : [
        {
          appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
          header : 'Calendário',
          panelClass : `rich-panel col-sm-`,
          body : [
           {
             tipo : 'jQ3',
             data : jQ3( j2EUi.createButton({
               classButton: '',
               callback: ()=>{
                __abrirCalendarioJ2()
               },
               textoButton: 'Calendário j2'
             })).append( jQ3('<i>', {
              class: 'fa fa-calendar-alt',
              "aria-hidden": 'true',
              css: {
                fontSize: '1.2em',
                paddingLeft: '5px'
              }
             }))
           }
         ],
         events : [
         ]
        }
      ],
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Expedir precatório 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir precatório2' : {
    altNome : 'Aguardando retorno de AR',
    altNomeADM : 'Expedir precatório 2',
    orgNome : 'Expedir precatório2',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar retorno de AR'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Expedir precatório 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir requisção de pequeno valor 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir requisção de pequeno valor 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir RPV' : {
    altNome : 'Aguardando cumprimendo de mandado',
    orgNome : 'Expedir RPV',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar cumprimento de mandado'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Expedir RPV2' : {
    altNome : 'Aguardando cumprimendo de citação/intimação',
    orgNome : 'Expedir RPV2',
    altNomeADM : 'Expedir requisção de pequeno valor 2',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar cumprimento de citação/intimação'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Processo com prazo decorrido' : {
    personalizacao : {
      'mostraAutosDigitais' : true,
      'mostraExpedientes' : true,
      'limpaCorpoTarefa' : true
    }
    //Personalização extendida de Processo com prazo em curso
    //após definição de TarefasProps
  },
  'Processo com prazo em curso' : {
    altNomeADM : 'Verificar decurso de prazo',
    ADMGrupo : 'agdStt',
    personalizacao : {
      'mostraAutosDigitais' : true,
      'mostraExpedientes' : true,
      'limpaCorpoTarefa' : true,

      //personalização avançada 2023.06
   /*   prepararInteracoes : [
        'seam-processo',
        'remote-j2Doc-create'
      ],
      painel : [
        {
          appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
          header : 'Tarefa em um clique',
          panelClass : 'rich-panel col-sm-9',
          j2Attr : 'j2-painel-basic-css',
          body : [
           {
             tipo : 'table',
             data : [
               ["Ação", "Executar"],
               [
                 "Certificar o decurso de prazo dos expedientes abaixo selecionados", 
                 j2EUi.createButton({
                   textoButton : "Juntar certidão de decurso de prazo", 
                   classButton : 'btn-primary', 
                   callback : () => { console.log('Callback da construção do botão: acioinado') }, 
                   id : 'j2-juntar-certidao-decurso-prazo',
                   moreAttrs : {
                     disabled : true
                   }
                 })
               ],
             ]
           }
         ],
        // collapsable : {
        //  initExpanded: false
        // },
         events : [
           ($thisPanel) => {
              var _deferToRoutine = jQ3.Deferred()

             function __routine($thisPanel, seamProcIteraction, expedientesIFrame){

               const ids = [
                 '#j2-juntar-certidao-decurso-prazo'
               ]
               $thisPanel.find(ids.join(', ')).removeAttr('disabled')

               var [$JuntCertDecPrazo] = ids

               $JuntCertDecPrazo = $thisPanel.find($JuntCertDecPrazo).click(async ($event)=>{
                if( ! $event.ctrlKey ){
                  $.Toast("Confirme para juntar em um clique.", "Pressione ctrl e clique para gerar o documento.", "info")

                  return;
                }

                 var $this = $JuntCertDecPrazo
                 $this.attr('disabled', 'true')
                 j2EUi.createRichModal()
                 $this.disabledDef = jQ3.Deferred()
                 $this.disabledDef.done( ()=> setTimeout(()=>{
                  $this.removeAttr('disabled')
                  j2EUi.removeModal()
                }, 500 ))
                 
                 var dadosExpedientes
                 var $inps
                 function _obterCargaDaIframe(){
                    var $jQ3i = expedientesIFrame.prop('contentWindow').jQ3
                    if(!($jQ3i)){
                      $.Toast("Erro ao Juntar em um clique.", "Expedientes não estão prontos.", "error")
                      return false;
                    }

                    $inps = $jQ3i.find('input[j2-seletor-expediente]:checked')
                    if(! $inps.length){
                      $.Toast("Erro ao Juntar em um clique.", "Nenhum expediente selecionado.", "error")
                      return false;
                    }

                    dadosExpedientes = j2E.Expedientes.util.parseLinhaDeExpedientesSelecionados($inps)

                    $inps = jQ3($inps)
            
                    return true;
                 }

                 if(! _obterCargaDaIframe()){
                  $this.disabledDef.resolve()
                  return;
                 }


                 
                  const idModelo = 'j2Certidao'
                  const pjeTipoDocumento = 'certidão'
                  const versao = '3.0'
                  const descricao = `Prazo decorrido (${j2E.Expedientes.util.enumerarParteEVencimentoDoExpedientes(dadosExpedientes)})`
                  const fonteDocumento = 'text/html'
                  const numeroDocumento = ''
                  const robot = { 
                    executarNoEvento : {
                      evento : 'afterLoadItems.selectorPessoa',
                      atrasar : 250
                    },
                    passos : [
                      {
                        tipo : 'iterarSelector',
                        instanceId: 'certidaoItens',
                        items: [
                          'certItPrazoSemCump'
                        ]
                      },             
                      {
                        tipo: 'copiarElmento',
                        elemento: '#certItPrazoSemCump_li',
                        copias: dadosExpedientes.length - 1
                      }, 
                      {
                        tipo: 'iterarCopias',
                        elemento: '#certItPrazoSemCump_li',
                        mapaSubstituicao : {
                            '#certItPrazoSemCump-prazoExtenso': 'it.dataEm',
                            '#pessoa-polo-parte-LCase': '_obterPoloParte(it.parte).parte.LCase',
                            '#selParte': 'it.parte',
                            '#docId': 'it.idDocumentoLink'
                        },
                        fonte : dadosExpedientes
                      },         
                      //todo robô deve ter como ultimo passo o fechamento do edt
                      {
                        tipo : 'avaliacaoDeString',
                        string: 'j2.mod.clsCnstr.DocEditorCore.closeByRobot'
                      }
                    ]
                  }

                  try{
                   const PJeVarsHTML = await j2E.SeamIteraction.processo.acoes.acaoObterVariaveisParaExtensao()
                   const html = await j2E.mods.remoteJ2DocCreator(idModelo, versao, PJeVarsHTML, robot)   
                   
                   j2E.SeamIteraction.processo.acoes.acaoJuntarDocumento(pjeTipoDocumento, descricao, fonteDocumento, {
                     html : html
                   }, numeroDocumento)
                   .done( ()=>{
                     $.Toast("Juntar num clique", "Juntado com sucesso.", "success")

                     $inps.each((idx, el)=>{
                      jQ3(el).parents('tr:first').addClass('success').removeClass('info') 
                     }) 
                     $inps.attr('disabled','')
                   } )
                   .fail( (err)=>{
                     $.Toast("Erro ao Juntar num clique", err, "error")
                   } )
                   .always(()=>{
                      $this.disabledDef.resolve()
                   })
                 }catch(err){
                   $.Toast("Erro ao Juntar num clique", err, "error")
                   $this.disabledDef.resolve()
                 }
               })

               $.Toast("Tarefa em um clique", "Pronto para executar.", "success")
             }

             if( j2E.env.tempData?.prepararSeamIteraction?.evBusTriggered )
               _deferToRoutine.resolve(j2E.env.tempData?.prepararSeamIteraction.interactionObject)
             else
               evBus.on('Tarefa.Personalizacao.prepararInteracoes.autosDigitaisCarregados', int => { 
                 _deferToRoutine.resolve(int)
               }) 
             
             var _defTarf = j2E.env.deferring.personalizacaoTarefa
             jQ3.when(_deferToRoutine, 
                      _defTarf.carregarExpedientes, 
                      _defTarf.prepararInteracoes.remoteJ2DocCreate
                      )
             .done( (int, expIFrame)=>{
                __routine($thisPanel, int, expIFrame) 
             })
           }
         ]
        },
        {
          appendTo : 'form#taskInstanceForm > div > div.rich-panel-body',
          header : 'Etiqueta rápida',
          panelClass : 'rich-panel col-sm-3',
          j2Attr : 'j2-painel-basic-css',
          body : [
           {
             tipo : 'jQ3',
             data : [ 
                j2EUi.TarefaNumClique.createTags([
                  'Fluir CertTrans',
                ]) 
             ]
           }
         ],
         events : [
          ($thisPanel)=>{
            $thisPanel.find('.j2-tags-tarefa-num-clique').mousedown((ev)=>{
              if(ev.which !== 1)
                return;

              const $tag = jQ3(ev.target)
              if(! $tag.is('[j2-tag-a]') && ! $tag.is('[j2-tag-i]')  )
                return;

              var idProcesso =  j2E.env.urlParms.idProcesso
              var taskId =  j2E.env.urlParms.newTaskId
              var etiqueta =  $tag.is('[j2-tag-a]') ? $tag.text().trim() : $tag.parent().text().trim()

              j2EPJeRest.etiquetas.inserir(idProcesso, etiqueta)
              .then( (res)=>{
                if(typeof res === 'undefined'){
                  $.Toast("Etiqueta rápida", `"${etiqueta}" já está vinculada.`, "info")
                  return;
                }

                $.Toast("Etiqueta rápida", `"${etiqueta}" vinculada.`, "success")

                evBus.fire('on-adicionar-etiqueta-via-pje', {
                  tag : etiqueta,
                  idProcesso : idProcesso,
                  taskId : taskId,
                  idTag : res.id
                })
              })
              .fail((err)=>{
                $.Toast("Etiqueta rápida", `Erro ao vincular "${etiqueta}": ${err}.`, "error")
              })                
            })
          },  
         ]
        }
      ],*/
    }
  },
  'Publicar ato do magistrado - DJE' : {
    altNome : 'Aguardando resposta de ofício',
    altNomeADM : 'Publicar ato do magistrado',
    orgNome : 'Publicar ato do magistrado - DJE',
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    },
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar resposta de ofício'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    }
  },
  'Operações de perícia' : {
    altNome : 'Aguardando perícia do IML',
    orgNome : 'Operações de perícia',
    personalizacao : {
      limpaCorpoTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Reclassificar documento' : {
    orgNome : 'Reclassificar documento',
    ADMGrupo : 'outac'
    /*personalizacao : {
      limpaCorpoTarefa : true
    },*/
  },
  'Retificar dados do processo' : {
    orgNome : 'Retificar processo',
    ADMGrupo : 'outac',
    altNomeADM : 'Retificar processo'
    /*personalizacao : {
      limpaCorpoTarefa : true
    },*/
  },
  getPseudotarefas : function(callback){
    var pseudoTarefas = new PseudoTarefas();
    var _ = [];
    
    /*onceAndDelay(function(){ */ pseudoTarefas.listarTarefas(function(data, status){
      if(status === "success"){
        $.each(data.data, function(idx, item){
          var _new = {};
          _new[item.nome] = {
            EPseudo : true,
            orgNome : 'Pseudotarefa',
            pseNome : item.nome
          };
          
          $.extend(_new[item.nome], item);
          
          TarefasProps[item.nome] = new PseudoTarefa( _new[item.nome] ) ;
          
          _.push(TarefasProps[item.nome]);
        });
        
        callback && callback(_);
      }
    }); /*}); */
  },
  'Preparar intimação de suspensão de processo' : {
    ADMGrupo : 'outac',
    altNomeADM : 'Suspender tramitação do processo'
  },
  'Selecionar tipo de penhora' : {
    ADMGrupo : 'outac',
    altNomeADM : 'SISBAJUD / RENAJUD'
  },
  'Triagem':{
    personalizacao : {
      'mostraAutosDigitais' : true
    }
  },
  'Verificar providência a adotar' : {
    personalizacao : {
      'mostraAutosDigitais' : true,
      transicaoRemover : [
        'Alterar fluxo de tramitação do processo',
        '(SEJUD) Triagem de conclusão',
        'Enviar para psicossocial',
        'Enviar para partidoria',
        'Enviar para avaliação de bens'
      ]
    }
  },
  '(CEJUSC) Triagem de audiência' : {
     altNomeADM : 'Encaminhar para CEJUSC',
     personalizacao : {
       ADM : {
         desabilitar : true
       }
     },
     ADMGrupo : 'dmsTrf'
  }
};

const estaTarefaRequerOIframeComExpedientes = true;
const estaTarefaNaoRequerOIframeComExpedientes = false;
TarefaPersonalizadaAvancada.tarefaNumCliqueJuntadaDocumento(
  [
    'Processo com prazo em curso', 
    'Processo com prazo decorrido'
  ],
  'col-sm-9',
  'Certificar o decurso de prazo dos expedientes abaixo selecionados',
  'Juntar certidão de decurso de prazo',
  estaTarefaRequerOIframeComExpedientes,
  {
    idModelo: 'j2Certidao',
    pjeTipoDocumento: 'certidão', //em lowercase
    versao: '3.0', //versao do modelo j2
    descricao: {
      toEval: (dados) => { 
        return `Prazo decorrido (${j2E.Expedientes.util.enumerarParteEVencimentoDoExpedientes(dados)})` 
      }, 
      contexto: [
        'dadosExpedientes'
      ]
    },
    numeroDocumento: '',
    fonteDocumento: 'text/html' //apenas
  }, 
  { 
    executarNoEvento : {
      evento : 'afterLoadItems.selectorPessoa',
      atrasar : 250
    },
    passos : [
      {
        tipo : 'iterarSelector',
        instanceId: 'certidaoItens',
        items: [
          'certItPrazoSemCump'
        ]
      },             
      {
        tipo: 'copiarElmento',
        elemento: '#certItPrazoSemCump_li',
        copias: 0 // vai avaliar dadosExpedientes.length - 1
      }, 
      {
        tipo: 'iterarCopias',
        elemento: '#certItPrazoSemCump_li',
        mapaSubstituicao : {
            '#certItPrazoSemCump-prazoExtenso': 'it.dataEm',
            '#pessoa-polo-parte-LCase': '_obterPoloParte(it.parte).parte.LCase',
            '#selParte': 'it.parte',
            '#docId': 'it.idDocumentoLink'
        },
        fonte : {} // vai avaliar dadosExpedientes
      },         
      //todo robô deve ter como ultimo passo o fechamento do edt
      {
        tipo : 'avaliacaoDeString',
        string: 'j2.mod.clsCnstr.DocEditorCore.closeByRobot'
      }
    ],
  }, 
  [
    {
      toEval : (robot, dadosExpedientes)=> {
        robot.passos[1].copias = dadosExpedientes.length - 1
        robot.passos[2].fonte = dadosExpedientes
      },
      contexto : [
        'robot',
        'dadosExpedientes'
      ]
    }
  ]
)

TarefaPersonalizadaAvancada.tarefaNumCliqueJuntadaDocumento(
  [
    'Processo com prazo em curso', 
    'Processo com prazo decorrido',
    'Expedir precatório'
  ],
  'col-sm-9',
  'Certificar a regularidade do prazo em curso',
  'Juntar certidão de regularidade de prazo',
  estaTarefaNaoRequerOIframeComExpedientes,
  {
    idModelo: 'j2Certidao',
    pjeTipoDocumento: 'certidão', //em lowercase
    versao: '3.0', //versao do modelo j2
    descricao: 'decurso de prazo regular',
    numeroDocumento: '',
    fonteDocumento: 'text/html' //apenas
  }, 
  { 
    executarNoEvento : {
      evento : 'afterLoadItems.selectorPessoa',
      atrasar : 250
    },
    passos : [
      {
        tipo : 'iterarSelector',
        instanceId: 'certidaoItens',
        items: [
          'certItPrazoRegular'
        ]
      },                    
      //todo robô deve ter como ultimo passo o fechamento do edt
      {
        tipo : 'avaliacaoDeString',
        string: 'j2.mod.clsCnstr.DocEditorCore.closeByRobot'
      }
    ],
  }, 
  [
  ]
)

/*TarefaPersonalizadaAvancada.tarefaNumCliqueJuntadaDocumento(
  [
    'Expedir precatório'
  ],
  'col-sm-9',
  'Certificar abandono dos autos pela polo ativo',
  'Juntar certidão de regularidade de prazo',
  estaTarefaNaoRequerOIframeComExpedientes,
  {
    idModelo: 'j2Certidao',
    pjeTipoDocumento: 'certidão', //em lowercase
    versao: '3.0', //versao do modelo j2
    descricao: 'decurso de prazo regular',
    numeroDocumento: '',
    fonteDocumento: 'text/html' //apenas
  }, 
  { 
    executarNoEvento : {
      evento : 'afterLoadItems.selectorPessoa',
      atrasar : 250
    },
    passos : [
      {
        tipo : 'iterarSelector',
        instanceId: 'certidaoItens',
        items: [
          'certItPrazoRegular'
        ]
      },                    
      //todo robô deve ter como ultimo passo o fechamento do edt
      {
        tipo : 'avaliacaoDeString',
        string: 'j2.mod.clsCnstr.DocEditorCore.closeByRobot'
      }
    ],
  }, 
  [
  ]
)*/

TarefaPersonalizadaAvancada.etiquetasRapidas(
  'Expedir precatório',
  'col-sm-12',
  [
    'Aguardando Prazo de Abandono'
  ]
)

TarefaPersonalizadaAvancada.etiquetasRapidas(
  'Processo com prazo em curso',
  'col-sm-3',
  [
    'Certificar Publicação DJEN'
  ]
)
TarefaPersonalizadaAvancada.etiquetasRapidas(
  'Processo com prazo decorrido',
  'col-sm-3',
  [
    'Fluir para Certificar Trânsito'
  ]
)

TarefaPersonalizadaAvancada.faixaDeEtiquetas(
  TarefaPersonalizadaAvancada.obterTodasAsTarefas(),
  'col-sm-12',
  [
    'Certificar Publicação DJEN'
  ]
)

TarefaPersonalizadaAvancada.etiquetasRapidas(
  [
   /* 'Preparar intimação',
    'Preparar intimação de suspensão de processo',*/
    /^Preparar intimação.*/
  ],
  'col-sm-12',
  [
    'Via WhatsApp',
    'Via Central de Manadados',
    'Analise Detida',
    'Via Correios',
  ],
  'container-sem-classe'
)

TarefaPersonalizadaAvancada.etiquetasRapidas(
  [
    'Preparar citação e(ou) intimação',
    'Preparar citação'
  ],
  'col-sm-12',
  [
    'Aguardando PLP'
  ],
  'container-sem-classe'
)


TarefaPersonalizadaAvancada.etiquetasRapidas(
  [
    'Avaliar determinações do magistrado'
  ],
  'col-sm-11',
  [
    'CERTIFICAR DARLAN',
    'CERTIDÃO DE DÍVIDA - EXPEDIR',
    'SISBAJUD - Ag. Bloqueio',
    'SISBAJUD - Ag. Desbloqueio',
    'SISBAJUD - Ag. Transferência'
  ],
  'container-sem-classe',
  {
    panelAppendTo: () => { return jQ3('label:contains("Expedir certidão")').parents('.propertyView').find(' > div:nth-child(2)') },
    panelClass: 'j2-mini-etiqueta-rapida',
    onTagClick: () => {
      const $input = jQ3('label:contains("Expedir certidão")').parents('.propertyView').find('input')
      if( ! $input.is(':checked') )
        $input.prop("checked", true);
    }
  }
)

function init(){
  window.lockr  = new createLockr('j2E');
  window.lockrSes  = new createLockr('j2E', 'sessionStorage');
  window.defer = new createDefer();
  window.delayCall = new DelayedCall(250, 1000);
  
  function defaultExibicao(){
    var div = document.createElement('div');
      div.innerHTML = 'j2';
      div.className = 'divTest';
      document.body.appendChild(div);
  };
  	
  function loadOrigin(){
    switch(window.location.origin){
      case 'https://frontend.prd.cnj.cloud':
        fronendLoad();
        break;
      case 'https://pje.tjma.jus.br':
        loadPJeRestAndSeamInteraction()
        pjeLoad();
        break;
    }  	
  }
  
  function runTimeConnect(){
   /* window.j2E.conn = {};
    
    j2E.conn.reconnect = function(){
      j2E.conn.port = chrome.runtime.connect(sessionStorage.getItem('j2EExtensionID'), { 
        includeTlsChannelId : true, 
        name : window.location.origin 
      })
      j2E.conn.port.onDisconnect.addListener(function() {
        console.warn('Reconnecting port ', j2E.conn.port.name);
        console.warn('Runtime last error ', chrome.runtime.lastError);
        j2E.conn.reconnect();
      });;*/
      /*j2E.conn.port.postMessageJ2E = function(load, callback, timeout, timeoutCallback){
        if(callback)
          j2E.conn._responseBus.register(load, callback, timeout, timeoutCallback);

        console.log('Posting message: ', load);
        j2E.conn.port.postMessage(load);
      };*/
   /* };*/
    /*j2E.conn.reconnect();
    
    j2E.conn._listeners = [];
    j2E.conn.onMessage = function(message, sender, sendRespose) {      
      var lis = j2E.conn.listeners;
      
      if(!(lis.length)){
        console.warn('Requisição não tratada: ', message, sender);
        return;
      }
      
      for(var i = 0; i < lis.length; i++ )
        lis[i].apply(null, [message, sender, sendRespose]);
    };


    j2E.conn.port.onMessage.addListener(j2E.conn.onMessage);*/
      
    j2E.mods.runTimeConnect(); 
  };
  
  runTimeConnect();
  defaultExibicao();
  loadOrigin();
};



function checkJQuery() { // tappac as new
  if (typeof jQ3 !== 'undefined' && typeof j2ELibRun !== 'undefined') {
    init();
  }else {
    defer( checkJQuery, 100 );
  }
}
checkJQuery();



       