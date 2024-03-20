/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('certidão.js - módulo compilante');

try {
  (function () { /* inits autoexec */
    var w = window;
    var evBus = window.j2.mod.eventBus.EventBus;
    
    var pkg;
    if (w.j2.mod.clsCnstr)
      pkg = w.j2.mod.clsCnstr;
    else{
      w.j2.mod.clsCnstr = {};
      pkg = w.j2.mod.clsCnstr;
    }
    
    var mod = w.j2.modelo;
    
    //var isObject = new window.j2.mod._._201;
    var forEach = w.j2.mod.forEach;
    //var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    //var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    const sequencAr = {
      inicial: 'nesta data',
      intermediarios: [
        'ainda',
        'também',
        'inclusive',
        'ademais',
        'outrossim'
      ],
      final: 'por fim',
      tamanho: 7
    }
    
    pkg.Certidao = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.Certidao.setMonetaryListeners();
        pkg.Certidao.setARListeners();
        pkg.Certidao.setHTMLToolsListeners();
        pkg.Certidao.setEvents();
        
        j2.mod._.styleSetter(mod.edt.gE('selectorPessoa'), 'Hidden', false);
      },
      sequencializarFinalidades(){
        jQ3('#normalizeFormtas')
        .find('[name="j2-cert-sequencializador"]')
        .toArray()
        .forEach((el, idx, arJ2Els)=>{
          const $el = jQ3(el)

          if(idx === 0)
            $el.text(`${sequencAr.inicial},`)
          else if(arJ2Els.length <= sequencAr.tamanho && idx === (sequencAr.tamanho -1) ){
            $el.text(`${sequencAr.final},`)
          }
          else if(arJ2Els.length <= sequencAr.tamanho ){
            const interIdx = (idx - 1) % (sequencAr.tamanho-1)
            $el.text(`${sequencAr.intermediarios.at(interIdx)},`)
          }
          else if(arJ2Els.length > sequencAr.tamanho){
            if(idx === arJ2Els.length -1)
              $el.text(`${sequencAr.final},`)
            else{
              const interIdx = (idx - 1) % (sequencAr.tamanho-2)
              $el.text(`${sequencAr.intermediarios.at(interIdx)},`)
            }

          }
        })
      },
      setEvents : function(){
        var cb = function(event, closer){
           if(pkg.Certidao.expItemContainer().childNodes.length===0){
             pkg.DocEditorCore.proceedFinish = false; 
             pkg.ModalDialog.okCancel('Você não adicionou itens á certidão. Fechar mesmo o editor?', 'Certidão j2 - Atenção', 
             'Certidao.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('Certidao.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });      
        
        /* mudar tamanho ao alterar */
        evBus.on('onAdd.selectorcertidaoItens.certItDocAusenciaCumSen', function(ev, arg){
          if(pkg.Pagina1)
            pkg.Pagina1.setA4();
                  
          j2.mod._.styleSetter(mod.exp.gE('singleBody.oReferidoEVerdade'), 'Indnt3cm');
        });
        evBus.on('onDel.selectorcertidaoItens.certItDocAusenciaCumSen', function(ev, arg){
          if(pkg.Pagina1)
            pkg.Pagina1.setA5();
        
          j2.mod._.styleSetter(mod.exp.gE('singleBody.oReferidoEVerdade'), 'Indnt1cm');
        });
        
        //eleemntos que interfirirão na exibiação da parte
        forEach([
          'certItHabilitacaoAutomatica', 
          'certItHabilitacaoManual',
          'certItHabilitacaoPedidoExclusividade',
          'certItTempestividadeEmbargos',
          'certItTempestividadeEmbargosIntempest',
          'certItTempestividadeRecurso',
          'certItTempestividadeRecursoIntepest',
          'certItPrazoSemCump',
          'certItWhatsAppLeitura',
          'certItWhatsAppLeituraNao',
          'certItWhatsAppLeituraArt6',
          'certItWhatsAppLeituraArt6ccPC142020',
          'certItIntimacaoTelefoneInfrutifera',
          'certItPrazoAbandono',
          'certItTelefoneInclusao',
          'certItRemessaDocsAudiencia',
          'certItIntimacaoRealizadaTelefone',
        ], function(it){
          evBus.on('onAdd.selectorcertidaoItens.' + it, function(ev, arg){

            j2.mod._.styleSetter(mod.edt.gE('selectorPessoa'), 'Hidden', true);
          });
          evBus.on('onDel.selectorcertidaoItens.' + it, function(ev, arg){

            j2.mod._.styleSetter(mod.edt.gE('selectorPessoa'), 'Hidden', false);
          });
        });
        
        evBus.on('onAdd.selectorcertidaoItens.certItTransito1', function(ev, arg){
          var tsk = j2.env.PJeVars.processo.idTask;
          var _ = {
            par : mod.par.gE('taskInstanceForm:datatransitoemjulgado-'+tsk+':datatransitoemjulgado-'+tsk+'Decoration:datatransitoemjulgado-'+tsk+'InputDate'),
            exp : mod.exp.gE('certDataTransito')
          };
        
          if(_.par)
            if(_.par.value)
              _.exp.innerHTML = _.par.value + ' às 23:59:59';
        });
        
        forEach([
          'certItPrazoSemCump',
          'certItWhatsAppLeitura',
          'certItWhatsAppLeituraArt6',
          'certItWhatsAppLeituraArt6ccPC142020',
          'certItDecursoCumprimentoVoluntario',
        ], function(it){
          evBus.on('onAdd.selectorcertidaoItens.' + it, function(ev, arg){
            evBus.once("General.DatePicker.onCreate", function(ev, _dpObj){
              evBus.once('onDel.selectorcertidaoItens.' + it, function(ev, arg){
                  _dpObj.div.remove();
                  _dpObj._delete();
              });  
              
              /*_dpObj.inputField.change = function(){
                var expEl = mod.exp.gE(it + '-prazoExtenso');
                if(!(expEl))
                  return;
                
                var tx = '';
                if(it === 'certItPrazoSemCump')
                  tx += 'em ';
                
                tx += _dpObj.inputField.value;
                
                if(it === 'certItPrazoSemCump')
                  tx += ' às 23:59:59';
                
                expEl.innerHTML = tx;
              };*/
              
              evBus.on("General.DatePicker.onChange."+_dpObj.uuid, function(ev, _dpObj){
                var tx = '';
                if(it === 'certItPrazoSemCump')
                  tx += 'em ';
                
                tx += _dpObj.inputField.val();
                
                if(it === 'certItPrazoSemCump')
                  tx += ' às 23:59:59';
                
                jQ3('#' + it + '-prazoExtenso',arg.lnkEl).text(tx);
              });
            });  
            
            if(pkg.AddtionalControls)
              pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
              'General.DatePicker', '1.0' );
              
            
          });
        });
        
        forEach([
          'certItPrazoSemExpedienteForense'
        ], function(it){
          evBus.on('onAdd.selectorcertidaoItens.' + it, function(ev, arg){
            
            evBus.on('addtionalControls.afterBuild.Prazo-Sem-Expediente-Forense', function(ev, buildContext){
              var _j2Parser = j2.mod._._j2JSONparse;
              
              //evBus.fire("afterChange." + _.select.id, _.select.value, _.select, selI, appd.body, _);
              function __treateBeforeChange(event, _selectValue, _select, selI, appdBody, _){
                if(!(selI.dataPlus) ||  !(selI.dataPlus.length))
                  return;
                
                var _dataPlus = _j2Parser(selI.dataPlus);
                
                jQ3(appdBody).find('span').each(function(){
                  var $this = jQ3(this);
                  
                  switch($this.prop('id')){
                    
                    case 'certItPrazoSemExpedienteForense-textoNegacaoDeMarcao':
                      if(!_dataPlus.negacaoDeMarco)
                        break
                      let tempoVerbal = ''
                      switch(_dataPlus.temporalidade){
                        case 'PRESENTE':
                        case 'EM CURSO':
                          $this.text(`razão pela qual os prazos processuais que iniciam 
                            ou finalizam nesta data serão protraídos para o próximo 
                            dia útil`)
                          break;
                        case 'FUTURO':
                          $this.text(`razão pela qual os prazos processuais que iniciarão
                            ou finalizarão nesta data serão protraídos para o próximo 
                            dia útil`)
                          break;
                        case 'PASSADO':
                          $this.text(`razão pela qual os prazos processuais iniciados 
                            ou finalizados nesta data foram protraídos para o próximo 
                            dia útil`)
                          break;
                      }
                      $this.prev().append(',')
                      break
                    case 'certItPrazoSemExpedienteForense-adverbial':
                      if(_dataPlus.negacaoDeMarco)
                        $this.remove()
                      break
                    case 'certItPrazoSemExpedienteForense-tipo-abrangencia':
                      //tios em XML/j2.xsd
                      switch(_dataPlus.abrangencia){
                        case 'nacional':
                        case 'estadual':
                        case 'estadual-forense':
                          $this.text( 'no TJMA' )
                          break;
                        
                        case 'comarca':
                        case 'forum':
                        case 'municipal':
                          $this.text( `na Comarca de ${j2.env.modId.unidade.comarca}` )
                          break;

                        case 'unidade':
                        case 'termo': 
                            $this.text( `${j2.env.modId.unidade.genr === 'M' ? 'neste' : 'nesta'} ${j2.env.modId.unidade.nomeFormal}` )
                            break;
                      }
                      break;
                    case 'certItPrazoSemExpedienteForense-tipo':
                      if(  _dataPlus.tipo === 'suspensao-prazo')
                        $this.text( 'decurso de prazo processual' )
                      else if(_dataPlus.negacaoDeMarco)
                        $this.find('#certItPrazoSemExpedienteForense-tipo-subtipo')
                        .text('expediente forense excepcional')
                      break;
                    case 'certItPrazoSemExpedienteForense-data':
                      $this.text( _dataPlus.data + (_dataPlus.dataFin ? ' a ' +  _dataPlus.dataFin : '') );
                      break;
                    case 'certItPrazoSemExpedienteForense-data_':
                      $this.text( _dataPlus.data_ );
                      break;
                    case 'certItPrazoSemExpedienteForense-atoRes': //cumulado com transferncia
                      $this.text( '' );
                      forEach( _dataPlus.transf || _dataPlus.atoRes, function(disLeg){
                        if ( $this.text().length  )
                          $this.append(' c/c ');
                        
                        $this.append( pkg.Calendario.criarLinkParaDisposicaoLegal(disLeg) );
                      });
                      if(!(_dataPlus.transf))
                        $this.parent().find('#certItPrazoSemExpedienteForense-transf').remove();
                      else
                      $this.parent().find('#certItPrazoSemExpedienteForense-transf').html('<b>data excepecionalmente transferida</b>,');
                      break;
                    case 'certItPrazoSemExpedienteForense-verHaver':
                      switch(_dataPlus.temporalidade){
                        case 'PRESENTE':
                          $this.text( 'há' );
                          break;
                        case 'FUTURO':
                          $this.text( 'haverá' );
                          break;
                        case 'PASSADO':
                          $this.text( 'houve' );
                          break;
                        case 'EM CURSO':
                          $this.parents('#certItPrazoSemExpedienteForense-emCurso').text( 'que  os prazos processuais estão suspensos de ' + _dataPlus.data + ' a ' +  _dataPlus.dataFin + ',' ); 
                          break;
                      }
                      break;
                  }
                });
              }  
            
              evBus.once('onDel.selectorcertidaoItens.' + it, function(ev, arg){ 
                evBus.off(__treateBeforeChange);
                
                jQ3(buildContext.edt).find('#SDDelprazoSemExpedienteItens').parent().remove();
              });
              
              evBus.on('afterChange.selectorprazoSemExpedienteItens', __treateBeforeChange);
            });
            
            
            function ____loadAddtionalControl(){
              if(pkg.AddtionalControls)
                pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
                'Prazo-Sem-Expediente-Forense', '1.0' );
              else
                alert('pkg.AddtionalControls is not loaded');
            }
            
            if(! (j2.env.xmls.calendario) ){
              evBus.once('loaded-'+j2.res.XML.calendario.lib, function(event, xml){
                console.log('fired once loaded-'+j2.res.XML.calendario.lib);
                if(!(xml))
                  xml = window.j2.mod._._xmlDecode( j2.res.XML.addtionalControls.xmlEncode.load );

                j2.env.xmls.calendario = xml;
                console.log('parsing window.j2.env.xmls.calendario');

                j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
                  if(definitions){
                    j2.env.xmls.calendario = definitions;
                    ____loadAddtionalControl();
                  }
                  if (err){
                    j2.err('err get defintions from XML - calendario Classes Definitions (calendario)');
                    j2.err(err);
                  }
                });
              });   
              
              j2.mod.com.libLoader(j2.res.XML.calendario);
            }
            else
              ____loadAddtionalControl();
            
          });
        });
        
        
        evBus.on('afterChange.selectorprazoSemExpedienteItens', pkg.Certidao.sequencializarFinalidades);
        evBus.on('afterChange.selectorcertidaoItens', pkg.Certidao.sequencializarFinalidades);
      },
      setHTMLToolsListeners : function(){        
        var bindInfo = {
            itemPublicacao : 'certItPublicacaoDJe',
            selector : 'selectorcertidaoItens'
        };
                
        evBus.on('onAdd.'+ bindInfo.selector +'.'+ bindInfo.itemPublicacao, function(ev, arg){
          if(!(pkg.HtmlTools))
            return;
          
          var ipSC = {
            id : 'LinkInsertionSetGeneral.'+bindInfo.itemPublicacao,
            label : 'Inserir Link para Publicação',
            container : mod.edt.gE('modAddtCtrls'),
            gE : function(){
              mod.edt.gE('modAddtCtrls');
            }
          };
          
          pkg.HtmlTools.createLinkInsertionSet(ipSC.id, ipSC.label, ipSC.container);
          evBus.once('onDel.'+ bindInfo.selector +'.'+ bindInfo.item, function(ev, arg){
            if(mod.edt.gE('modAddtCtrls'))
              mod.edt.gE('modAddtCtrls').remove();
          });        
        });
        
      },      
      setARListeners : function(){        
        var bindInfo = {
            item : 'certItRemessaPorAR',
            selector : 'selectorcertidaoItens'
        };
                
        evBus.on('onAdd.'+ bindInfo.selector +'.'+ bindInfo.item, function(ev, arg){
          if(!(pkg.AR)){
            j2.mod.com.libLoader(j2.res.mod.AR);
            evBus.once('AR.onLoadLibs', function(event){
              pkg.AR.append(null, null, '7.0');
            });
          }else{
            pkg.AR.visibleOn();
          }
        });
        evBus.on('onDel.'+ bindInfo.selector +'.'+ bindInfo.item, function(ev, arg){
          if(pkg.AR){
            pkg.AR.visibleOff();
          }
        });
        
      },      
      expItemContainer : function (){
        return mod.exp.gE('SDLinkedElementcertidaoItens');
      },
      bindMonetary : {
        items :[
          'certPenhoraEfetivadaIntegral',
          'certPenhoraEfetivadaIntegralDesbloqExcedente',
          'certPenhoraEfetivadaParcial',
          'certBACENTransf',
          'certBACENDesbloq',
          'certBACENTransfParcialDesbloq'
        ],
        selector : 'selectorcertidaoItens',
        container : mod.edt.gE('modAddtCtrls')
    },
      setMonetaryListeners : function(){        
        forEach(pkg.Certidao.bindMonetary.items, function(i){
          evBus.on('onAdd.'+ pkg.Certidao.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.Certidao.resolveCtrlMonetario(arg, i);
          });
          evBus.on('onDel.'+ pkg.Certidao.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.Certidao.resolveCtrlMonetario(arg, i);
          });
        });
      },
      resolveCtrlMonetario : function(args, item){
        var flg = false;
        if(args.monitr){
          forEach(args.monitr.options, function(opt){
            //forEach(pkg.Certidao.bindMonetary.items, function(bIt){
              if(opt.id.itemId() === item)
                if(mod.edt.gE('ctrlMonetario'+item)){
                  flg = true;
                  return;
                }
                else
                  /* create container */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.Certidao.bindMonetary.container, mod.exp.gE('valorBacenjud.'+item), item);
                    return;
                  }
            //});
          });
          /* then delete it */
          if(mod.edt.gE('ctrlMonetario'+item) && flg===false)
            mod.edt.gE('ctrlMonetario'+item).remove();
        }
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.certidao.lib, function(){
      pkg.Certidao.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.certidao.lib;
  alert(t);
  console.error(t);

}