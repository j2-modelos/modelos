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
    var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var defer = new window.j2.mod._._101;
    var last = new window.j2.mod._._87; // ndlg5
    
    var j2SON = window.j2.mod._._j2JSONparse;
    
    var isObject = new window.j2.mod._._201;
    
    pkg.Diligencia = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.Diligencia.setMonetaryListeners();
        pkg.Diligencia.setARListeners();
        pkg.Diligencia.setHTMLToolsListeners();
        pkg.Diligencia.setEvents();
        
        //j2.mod._.styleSetter(mod.edt.gE('selectorPessoa'), 'Hidden', false);
        pkg.Documento.sysPJeAutoSave(30000);
      },
      _autoSetPartesDiligencia : function(){ // ndlg4 as new
        var _spsel = j2.mod.clsCnstr.SeletorPessoa.instances[0];
        /* autoSelect partes da diligência */
        forEach(jQ( 'div.propertyView:contains("Destina") div.value li', j2.modelo.par.doc.body), function(li){
          var _txt = jQ3(li).text().trim().substr(2);
          forEach(j2.env.PJeVars.partes.list.todasPartes, function(prt){
             if(prt.nome.match( new RegExp(_txt) ) !== null ){
               jQ3(_spsel.selector).val( prt.idPess );
               jQ3(_spsel.__class__.super.butAdd).click();
             }
          });         
        });  
      },
      setEvents : function(){
        var _pkgExpVincExp = pkg.ExpedienteVinculado.expediente; // ndlg5
        var _selPessSuper = pkg.SeletorPessoa.instances[0].__class__.super; // ndlg5
        var _selPess = pkg.SeletorPessoa.instances[0]; // ndlg5
        var _selItems = filter(pkg.Selector.instances, {id : 'diligenciaItens'})[0]; // ndlg7
        
        //if( !(j2.env.PJeVars.partes.list) && !(j2.env.PJeVars.partes.list.todasPartes) ) // ndlg4 as new
        j2.log('ASSYNCROMOUS: ------------------------------------');
        j2.log(_selPessSuper.__loadedItems);
          if(_selPessSuper.__loadedItems)
            defer(pkg.Diligencia._autoSetPartesDiligencia);
          else
            evBus.on('afterLoadItems.selectorPessoa', function(event, definitions){
              defer(pkg.Diligencia._autoSetPartesDiligencia);
            });
        //else
          //pkg.Diligencia._autoSetPartesDiligencia();
        
        
        var cb = function(event, closer){
           if(pkg.Diligencia.expItemContainer().childNodes.length===0){
             pkg.DocEditorCore.proceedFinish = false; 
             pkg.ModalDialog.okCancel('Você não adicionou itens à certidão de diligência. Fechar mesmo assim o editor?', 'Diligência j2 - Atenção', 
             'Diligencia.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('Diligencia.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });      
        
        /* Checkbox Outrso Destinatários */
        evBus.on('Diligencia.onCheck.OutrosDestinatários', function(ev, arg){

        });

        /* auto set the value of date */
        /*evBus.on('General.DatePicker.onCreate', function(ev, arg){ // ndlg6 off
          var _ = jQ3('#formDiligencia\\:dataPrazoDecoration\\:dataPrazoInputDate', mod.par.doc);
          jQ3(arg.inputField).val( (_.length) ? _.val().split(' ')[0] : '');
        });*/
        
        /* Controlar a definição do nome quado o usuário primeiro seleciona os destinatários */
        //evBus.fire("afterChange." + _.select.id, _.select.value, _.select, selI, appd.body, _);
        evBus.on('afterChange.selectordiligenciaItens', function(event, selVal, selDom, selIModdle, toAppdBody, _fullSelector){
          switch(selIModdle.id){
            case 'diligItFinalidadeAtingida':
            case 'diligItFinalidadeNaoAtingida':
            case 'diligItOutCumpTelefoneParte':
            case 'diligItExecIntimacaoPenhora':
              var _p = jQ3(j2.mod.clsCnstr.SeletorPessoa.instances[0].lnkEl).clone();
              _p.find('#selectorPessoaTextSpan').css('display', '');
              _p.find('#selectorPessoaTextSpan').css('visibility', '');
              jQ3('#selParte', toAppdBody).html( _p.html() );
          }
        });
                
        evBus.on('onAdd.selectordiligenciaItens.diligItOutCumpTelefoneParte', function(ev, arg){
          evBus.once('InputTelefone.onCreate', function(ev, _){
            evBus.once('onDel.selectordiligenciaItens.diligItOutCumpTelefoneParte', function(ev, __){
              _.div.remove();
            });
            
            evBus.on("InputTelefone.onChange."+_.uuid, function(ev, _input){
              jQ3('#diligItOutCumpTelefoneParte-telefone' ,arg.lnkEl).text(_input.getTels());
            });
          });

          pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 'General-InputTelefone', '1.0' );
        });
        
                evBus.on('onAdd.selectordiligenciaItens.diligItContraFeOficio', function(ev, arg){ // ndlg5 as news
          var _diligOficio =  pkg.DiligenciaOficio._[0];
          
          defer(function(){ 
            _diligOficio.recebedor.change();
            _diligOficio.recebedorCargo.change();
          });
          
        });
        
        evBus.on('onAdd.selectordiligenciaItens.diligItOficio', function(ev, arg){ // ndlg5 as news
          
          evBus.once('Diligencia-Oficio.onCreate', function(ev, _){
            evBus.once('onDel.selectordiligenciaItens.diligItOficio', function(ev, __){
              _.div.remove();
              _selPessSuper.autoHide(false);
              _._delete();
            });
            
            _selPessSuper.autoHide();
            
            _.destinatario.val( _pkgExpVincExp.destinatarios.joinListE() );
            defer(function(){_.destinatario.change();});
            
            var _pOfNum = jQ3('#singleBody\\.oficio_numero', _pkgExpVincExp.$);
            if(_pOfNum ){
              try{
                var _o = {
                  spNum : _pOfNum.find('#oficio_numeroExp'),
                  ndText : last(_pOfNum.prop('childNodes'))
                };
                if(_o.spNum && _o.ndText && (_o.ndText.nodeType === 3) ){
                  var __tx = _o.spNum.text() + _o.ndText.textContent;
                  __tx = __tx.replaceAll(/\.| /g, '');
                  
                  _.numero.val( __tx );
                  defer(function(){_.numero.change();});
                }
              }catch(e){
                j2.log('Falha ao recuperar o número do ofício automaticamente');
              }
            }
            
            evBus.on("Diligencia-Oficio.onChange."+_.uuid, function(ev, _input){              
              var _chgEl = _input.__jQEvent._triggerEl;
              
              switch(_chgEl.prop('id')){
                case 'Diligencia-Oficio-numero':
                  jQ3('#diligencia-oficioNumero', arg.lnkEl).text( _chgEl.val() );
                  break;
                case 'Diligencia-Oficio-destinatario':
                  var _tx = 'a(o)(s) #:B{#:U{' +_chgEl.val().toUpperCase() + '}}';
                  _tx = j2Conv(_tx);
                  jQ3( mod.exp.doc.querySelectorAll('#selParte'), arg.lnkEl ).html( _tx );
                  jQ3( pkg.SeletorPessoa.instances[0].lnkElParent, mod.exp.doc.body ).html( _tx );
                  break;
                case 'Diligencia-Oficio-papel':
                  jQ3('#diligencia-oficioPapel', arg.lnkEl).text( _chgEl.find(':selected').text() );
                  break;
                case 'Diligencia-Oficio-recebedor':
                  var _tx = _chgEl.val().length ? _chgEl.val().toUpperCase() : 'XXXXRecebedorXXXX';
                  jQ3('#diligencia-oficioRecebedor', arg.lnkEl).text( _tx );
                  break;
                case 'Diligencia-Oficio-recebedorCargo':
                  var _tx = _chgEl.val().length ? ' ' + _chgEl.val() + ', ' : '';
                  jQ3('#diligencia-oficioRecebedorCargo', arg.lnkEl).text( _tx );
                  break;
              };
            });
          });

          pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 'Diligencia-Oficio', '1.0', { appendOnTop : true, resizeOnFinish : true } );
        });
        
        evBus.on('onAdd.selectordiligenciaItens.diligItFinalidadeAtingida', function(ev, arg){ // ndlg6

          evBus.once('General-TimePicker.onCreate', function(ev, _){
            evBus.on('onDel.selectordiligenciaItens.diligItFinalidadeAtingida', function(ev, __){
              _.div.remove();
              _._delete();
              evBus.off("General-TimePicker.onChange."+_.uuid);
            });
            
            evBus.on("General-TimePicker.onChange."+_.uuid, function(ev, _input){
              var _t = _input.getTime(true);
              if(!(_t.isValid))
                jQ3('#diligencia-hora-cumprimento' ,arg.lnkEl).text('');
              else{
                var _tx = ' às ' + _t.str;
                jQ3('#diligencia-hora-cumprimento' ,arg.lnkEl).text(_tx);
              }
            });
          });
                  
            j2.log('#ASSERTION: initial state make it')      ;
          pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 'General-TimePicker', '1.0' );
        });
        

        evBus.on('onAdd.selectordiligenciaItens.diligItFinalidadeAtingida', 10000, function(ev, arg){ // ndlg6

          evBus.once('General.DatePicker.onCreate', function(ev, _){
            evBus.on('onDel.selectordiligenciaItens.diligItFinalidadeAtingida', function(ev, __){
              _.div.remove();
              _._delete();
              evBus.off("General.DatePicker.onChange."+_.uuid);
            });
            
            evBus.on("General.DatePicker.onChange."+_.uuid, function(ev, _input){
              jQ3('#diligencia-data-cumprimento' ,arg.lnkEl).text(_input.inputField.val());
            });
            
            var _i = _pkgExpVincExp.dataHorario.data;  
            jQ3(_.inputField).val( (_i.length) ? _i : '');
          });
          
          pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 'General.DatePicker', '1.0' );
        });
        
        
        //evBus.fire("afterChange." + _.select.id, _.select.value, _.select, selI, appd.body, _);
        evBus.on('afterChange.selectordiligenciaItens', function(ev, _selVal, _select, selI, appdBody){
          var _MandTipo = pkg.ExpedienteVinculado.expediente.getMandadoTipo();
         
        });
        
        evBus.on('beforeChange.selectordiligenciaItens', function(event, selectorObj, selI, toAppd){
          switch(selI.id){
            case 'diligItFinalidadeAtingida':
            case 'diligItFinalidadeNaoAtingida':
              var _srcI = selectorObj.src.selectorDef.items.item;
              var _addedMonitor = jQ3('#diligItAutomatico_, #diligItCitacao_, #diligItIntimacao_, #diligItOficio_', selectorObj.monitr);
              
              if(!(_addedMonitor.length))
                return;
              
              var _lSelI = filter(_srcI, { id : _addedMonitor.get(0).id.slice(0,-1) });
              _lSelI = _lSelI.length ? _lSelI[0] : undefined;
              
              if(!(_lSelI))
                return;
              
              var dataPlus = j2SON( j2Conv(j2.mod.builder.parseVars(_lSelI.dataPlus)) );
              
              var _prop = null;
              switch(selI.id){
                case 'diligItFinalidadeAtingida':
                  _prop = 'passado';
                  break;
                case 'diligItFinalidadeNaoAtingida':
                  _prop = 'infinitivo';
                  break;
              };
              
              if(!(dataPlus.verboCumprimento[_prop]))
                return;
              
              if(isObject(toAppd.body))
                jQ3('#diligencia-verbo-cumprimento', toAppd.body).text( dataPlus.verboCumprimento[_prop].toUpperCase() );
              else{
                var __ = jQ3(toAppd.body);
                jQ3('#diligencia-verbo-cumprimento', __ ).text( dataPlus.verboCumprimento[_prop].toUpperCase() );
                var _t = '';
                forEach(__, function(e){
                    _t += e.nodeType !== 3 ? jQ3(e).prop('outerHTML') : e.nodeValue;
                });
                toAppd.body = _t;
              }
                
             
              break;
            /*case 'diligItFinalidadeNaoAtingida':
              debugger;
              break;*/
            case 'diligItEntregaOficio':
              break;
          }

        });
        
        
        /*evBus.once("General.DatePicker.onChange", function(ev, _dpObj){ // ndlg6 off
          var expEl = mod.exp.gE('diligencia-data-cumprimento');
          if(expEl)
            expEl.innerHTML = _dpObj.inputField.value;
        });   */           
        
        evBus.on('afterChange.selectorMonitorPessoa', function(event, _monitr, _selectorObjInst){ //ndlg7 as new
          ____REMOVE_STYLE____ = true;
          
          if( !(pkg.AddtionalControls) || !(pkg.AddtionalControls._isReady) ){
            evBus.once('AddtionalControls.onLoadPackages', 10, function(event, xml){
              evBus.fire('afterChange.selectorMonitorPessoa', _monitr, _selectorObjInst);
            });
            return;
          }
          
          var _createCNPJDiligencia = function(){
            //Aceita apenas uma
            if(pkg.DiligenciaCNPJ._.length !== 0)
              return;
            
            evBus.once('Diligencia-CNPJ.onCreate', function(ev, _){
              evBus.once('Diligencia-CNPJ.onDelete', function(ev){
                _.selPapel.val( 'Diligencia-CNPJ-papel-pessoalmente' ); //set default
                defer(function(){_.selPapel.change();});
                defer(function(){_.div.remove();
                  _selPessSuper.autoHide(false);
                  _._delete();
                });
              });

              defer(function(){_.selPapel.change();});
              
              evBus.on("Diligencia-CNPJ.onChange."+_.uuid, function(ev, _input){              
                var _chgEl = _input.__jQEvent._triggerEl;

                switch(_chgEl.prop('id')){
                  case 'Diligencia-CNPJ-papel':
                    var _sl = _chgEl.find(':selected');
                    
                    jQ3('#diligencia-CNPJPapel', _selItems.lnkEl).text( _sl.attr('j2Text') );
                    
                    if(_sl.attr('reqNome') !== 'sim'){
                      jQ3('#diligencia-CNPJRecebedor', _selItems.lnkEl).text( '' );
                      j2.mod._.styleSetter(_.recebedor[0], 'fieldError', ____REMOVE_STYLE____);
                    }else
                      defer(function(){_.recebedor.change();});
                    break;
                  case 'Diligencia-CNPJ-recebedor':
                    var _tx = '';
                    if(_chgEl.val().length){
                      _tx = _chgEl.val().toUpperCase();
                      j2.mod._.styleSetter(_chgEl[0], 'fieldError', ____REMOVE_STYLE____);
                    }
                    else{
                      _tx = 'XXXXRecebedorXXXX';
                      j2.mod._.styleSetter(_chgEl[0], 'fieldError');
                    }
                    _tx += ', ';
                    
                    jQ3('#diligencia-CNPJRecebedor', _selItems.lnkEl).text( _tx );
                    break;
                  case 'Diligencia-CNPJ-recebedorCargo':
                    var _tx = _chgEl.val().length ? ' ' + _chgEl.val() + ', ' : '';
                    jQ3('#diligencia-CNPJRecebedorCargo', _selItems.lnkEl).text( _tx );
                    break;
                };
              });
            });
            
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 'Diligencia-CNPJ', '1.0', { appendOnTop : true, resizeOnFinish : true } ); // ndlg7
          };

          if(filter(_selItems.monitr.options, { id : 'diligItFinalidadeAtingida_'}).length === 0){
            evBus.fire('Diligencia-CNPJ.onDelete');
            return;
          }
          
          var _matchedCNPJ = false;
          forEach(_monitr.options, function(op){
            var _ = filter(j2.env.PJeVars.partes.list.todasPartes, {idPess : op.id.slice(0, -1)});          
            _ = (_.length) ? _[0] :  null ;
            if((_) && (_.CPFCNPJ) && (_.CPFCNPJ.length === 18) ){
              _createCNPJDiligencia();
              _matchedCNPJ = true;
            }
          });
          
          if(!_matchedCNPJ)
            evBus.fire('Diligencia-CNPJ.onDelete');
          
          evBus.on('onDel.selectordiligenciaItens.diligItFinalidadeAtingida', function(ev, arg){
            evBus.fire('Diligencia-CNPJ.onDelete');
          });
          
        });                
        
        forEach([ // ndlg7
          'diligItContraFeCienteRecebida',
          'diligItContraFeNaoCienteRecebida',
          'diligItContraFeNaoCienteNaoRecebida'
        ], function(selItemOpt){
          evBus.on('onAdd.selectordiligenciaItens.'+ selItemOpt, function(ev, arg){ 
            if(pkg.DiligenciaCNPJ._.length){
              defer(function(){pkg.DiligenciaCNPJ._[0].selPapel.change();});
              defer(function(){pkg.DiligenciaCNPJ._[0].recebedorCargo.change();});
            }
          });
        });
        
        evBus.on('onAdd.selectordiligenciaItens.diligItFinalidadeAtingida', 1, function(ev, arg){
          evBus.fire('afterChange.selectorMonitorPessoa', _selPessSuper.monitr, _selPessSuper);
        });
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
              pkg.AR.append(null, null);
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
        return mod.exp.gE('SDLinkedElementdiligenciaItens');
      },
      bindMonetary : {
        items :[
          'diligItExecValorPenhora'
        ],
        selector : 'selectordiligenciaItens',
        container : mod.edt.gE('modAddtCtrls')
    },
      setMonetaryListeners : function(){        
        forEach(pkg.Diligencia.bindMonetary.items, function(i){
          evBus.on('onAdd.'+ pkg.Diligencia.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.Diligencia.resolveCtrlMonetario(arg, i);
          });
          evBus.on('onDel.'+ pkg.Diligencia.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.Diligencia.resolveCtrlMonetario(arg, i);
          });
        });
      },
      resolveCtrlMonetario : function(args, item){
        var flg = false;
        if(args.monitr){
          forEach(args.monitr.options, function(opt){
            //forEach(pkg.Diligencia.bindMonetary.items, function(bIt){
              if(opt.id.itemId() === item)
                if(mod.edt.gE('ctrlMonetario'+item)){
                  flg = true;
                  return;
                }
                else
                  /* create container */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.Diligencia.bindMonetary.container, mod.exp.gE('valorPenhora-'+item), item);
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
    
    evBus.once('loaded-'+ window.j2.res.mod.diligencia.lib, function(){
      pkg.Diligencia.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.diligencia.lib;
  alert(t);
  console.error(t);

}