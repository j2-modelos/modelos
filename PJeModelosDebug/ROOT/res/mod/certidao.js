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
    
    pkg.Certidao = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.Certidao.setMonetaryListeners();
        pkg.Certidao.setARListeners();
        pkg.Certidao.setHTMLToolsListeners();
        pkg.Certidao.setEvents();
        
        j2.mod._.styleSetter(mod.edt.gE('selectorPessoa'), 'Hidden', false);
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
          'certItTelefoneInclusao'
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
        
        evBus.on('onAdd.selectorcertidaoItens.certItPrazoSemCump', function(ev, arg){
          evBus.once("General.DatePicker.onCreate", function(ev, _dpObj){
            evBus.once('onDel.selectorcertidaoItens.certItPrazoSemCump', function(ev, arg){
                $(_dpObj.inputField).remove();
            });  
            
            _dpObj.inputField.change = function(){
              var expEl = mod.exp.gE('certItPrazoSemCump-prazoExtenso');
              if(expEl)
                expEl.innerHTML = "em " + _dpObj.inputField.value + ' às 23:59:59';
            };
          });  
          
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'General.DatePicker', '1.0' );
            
          
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