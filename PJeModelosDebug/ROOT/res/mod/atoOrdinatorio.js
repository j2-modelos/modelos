/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('atoOrdinatorio.js - módulo compilante');

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
    
    pkg.AtoOrdinatorio = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.AtoOrdinatorio.setMonetaryListeners();
        pkg.AtoOrdinatorio.setEvents();
      },
      setEvents : function(){
        var cb = function(event, closer){
           if(pkg.AtoOrdinatorio.expItemContainer().childNodes.length===0){
             pkg.DocEditorCore.proceedFinish = false; 
             pkg.ModalDialog.okCancel('Você não adicionou itens á atoOrdinatorio. Fechar mesmo o editor?', 'Certidão j2 - Atenção', 
             'AtoOrdinatorio.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('AtoOrdinatorio.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });        
        
        evBus.on('CheckBox.AtoOrdinatorio.ComoCertidao.onCheck', function(ev, obj, domEv){ 
          pkg.AtoOrdinatorio.formatComoCertidao( obj.input.checked );
        });        

        evBus.on('afterChange.selectoratoOrdinatorioItens', function(event, a, b, c, appBody){           
          var _ = {
            fmtP : {
              ato : 'p FntMod Indnt1cm',
              cert : 'p FntMod Indnt0cm pAsListItemHalf'
            },
            bl : mod.edt.gE('CheckBox:Input:atoOrdinatorio:CertidaoCheck').checked
          };

          if(_.bl)
            switch(appBody.tagName.toLowerCase()){
              case 'div':
                forEach(appBody.childNodes, function(p){
                  j2.mod._.styleSetter(p, 'p FntMod Indnt0cm pAsListItemHalf');
                });
                break;
              case 'p':
                j2.mod._.styleSetter(appBody, 'p FntMod Indnt0cm pAsListItemHalf');
                break;
            }
        });
      },
      formatComoCertidao : function(bl){
        var _ = {
          title : {
            ato : 'ATO ORDINATÓRIO',
            cert : 'CERTIDÃO DE ATO ORDINATÓRIO'
          },
          autCompl : mod.exp.gE('autorizacaoSpanComplemento'),
          certBody : {
            up : mod.exp.gE('singleBody.atoOrdinatorio:CorpoCertidao'),
            down : mod.exp.gE('singleBody.atoOrdinatorio:CorpoCertidaoAbaixo')
          },
          itemsDiv : mod.exp.gE('SDLinkedElementatoOrdinatorioItens'),
          fmtP : {
            ato : 'p FntMod Indnt1cm',
            cert : 'p FntMod Indnt0cm pAsListItemHalf'
          }
        };
        
        
        pkg.Titulo.change( (bl) ? _.title.cert : _.title.ato , 'default');
        j2.mod._.styleSetter(_.autCompl, 'Hidden', !bl);
        j2.mod._.styleSetter(_.certBody.up, 'Hidden', bl);
        j2.mod._.styleSetter(_.certBody.down, 'Hidden', bl);
        forEach(_.itemsDiv.childNodes, function(e){
          switch(e.tagName.toLowerCase()){
              case 'div':
                forEach(e.childNodes, function(p){
                  j2.mod._.styleSetter(p, (bl) ? _.fmtP.cert : _.fmtP.ato);
                });
                break;
              case 'p':
                j2.mod._.styleSetter(e, (bl) ? _.fmtP.cert : _.fmtP.ato);
                break;
            }
          
        });
      },
      expItemContainer : function (){
        return mod.exp.gE('SDLinkedElementatoOrdinatorioItens');
      },
      bindMonetary : {
        items :[
          'certPenhoraEfetivadaIntegral',
          'certPenhoraEfetivadaParcial'
        ],
        selector : 'selectoratoOrdinatorioItens',
        container : mod.edt.gE('modAddtCtrls')
    },
      setMonetaryListeners : function(){        
        forEach(pkg.AtoOrdinatorio.bindMonetary.items, function(i){
          evBus.on('onAdd.'+ pkg.AtoOrdinatorio.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.AtoOrdinatorio.resolveCtrlMonetario(arg, i);
          });
          evBus.on('onDel.'+ pkg.AtoOrdinatorio.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.AtoOrdinatorio.resolveCtrlMonetario(arg, i);
          });
        });
      },
      resolveCtrlMonetario : function(args, item){
        var flg = false;
        if(args.monitr){
          forEach(args.monitr.options, function(opt){
            //forEach(pkg.AtoOrdinatorio.bindMonetary.items, function(bIt){
              if(opt.id.itemId() === item)
                if(mod.edt.gE('ctrlMonetario'+item)){
                  flg = true;
                  return;
                }
                else
                  /* create container */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.AtoOrdinatorio.bindMonetary.container, mod.exp.gE('valorBacenjud.'+item), item);
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
    
    evBus.once('loaded-'+ window.j2.res.mod.atoOrdinatorio.lib, function(){
      pkg.AtoOrdinatorio.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.atoOrdinatorio.lib;
  alert(t);
  console.error(t);

}