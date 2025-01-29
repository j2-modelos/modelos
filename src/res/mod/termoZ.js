/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('termo.js - módulo compilante');

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
    //var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var j2SON = window.j2.mod._._j2JSONparse;
    var isArray = new window.j2.mod._._197;
    
    pkg.Termo = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.Termo.setMonetaryListeners();
        pkg.Termo.setEvents();
      },
      setEvents : function(){
        var cb = function(event, closer){
           if(mod.exp.gE('SDLinkedElementtermoItens').childNodes.length===0){
             pkg.DocEditorCore.proceedFinish = false; 
             pkg.ModalDialog.okCancel('Você não adicionou itens á termo. Fechar mesmo o editor?', 'Termo j2 - Atenção', 
             'Termo.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('Termo.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });  
        
        evBus.on('afterChange.selectorMonitortermoItens', function(event, mnt, _){
          pkg.Termo.updateTitle(mnt, _);
        });
        evBus.on("afterChange.selectorMonitortermoItens", function(event, objMnt, selectorObj){
          var spns = mod.exp.gE('SDLinkedElementtermoItens').getElementsByTagName('span');
          var capts = [];
          var captTxt = {
            capt : 'Nesta data',
            mid : ', bem como',
            end : ' e finalmente'
          };
          var dots = [];
          forEach(spns, function(spn){
            if(spn.getAttribute('name')==='caput')
              capts.push(spn);
            if(spn.getAttribute('name')==='dot')
              dots.push(spn);
          });
          
          var i = 0;
          forEach(capts, function(capt){
            i++;
            if(i===1)
              capt.innerHTML = captTxt.capt;
            else if(i !== capts.length && i!== 1)
              capt.innerHTML = captTxt.mid;
            else {
              if(i===2)
                capt.innerHTML = captTxt.mid;
              else
                capt.innerHTML = captTxt.end;
            }
          });
          
          i = 0;
          forEach(dots, function(dot){
            i++;
            if(i === dots.length)
              dot.innerHTML = '. Do que para constar lavro o presente termo.';
            else
              dot.innerHTML = '';
          });
        });
        
        evBus.on('onAdd.selectortermoItens.termItJuntadaAR', function(ev, arg){
          pkg.Termo.prepararControlesAR();
        });
        evBus.on('onDel.selectortermoItens.termItJuntadaAR', function(ev, arg){
          if(!(pkg.AddtionalControls))
            return;
          
          if(!(pkg.ControlesJuntadaAR))
            return;
          
          pkg.ControlesJuntadaAR.remove();
        });
        
        forEach(['onAdd.selectortermoItens.termItAREntregue', 'onAdd.selectortermoItens.termItARDevolvido'], function(_){
          evBus.on(_, function(ev, arg){
            pkg.Termo.getDestinatarioAR();
          });
        });
      },
      getDestinatarioAR : function(mnt, _obj){
        var _ = {
          destParent : (function(){
            try{
              var _ = null;
              forEach(mod.par.doc.getElementsByClassName('name'), function(eNm){
                if(!(_))
                  if(eNm.innerText.trim() === 'Parte')
                    _ = eNm.nextSibling.nextSibling.innerHTML.trim();
              });
              return _;
            }catch(e){
              return null;
            }
            })(),
          destExp : mod.exp.gE('termoJuntadaAR.exp.Destinatario')
        };
        
        if(_.destParent)
          _.destExp.innerHTML = _.destParent;
      },
      updateTitle : function(mnt, _obj){
        var itDef;
        var _;
        var _a = []; 
        forEach(mnt.options, function(op){ 
          itDef = filter(_obj.src.selectorDef.items.item, {id : op.id.itemId()});
          itDef = (itDef.length) ? itDef[0]: null;
          if(!(itDef))
            return;
          
          if(!(itDef.dataPlus))
            return;
            
          _ = j2SON(itDef.dataPlus);
          
          if(_.titleAppend)
            if(isArray(_.titleAppend))
              forEach(_.titleAppend, function(e){
                if(_a.indexOf(e)===-1)
                  _a.push(e);
              });
            else
              if(_a.indexOf(_.titleAppend)===-1)
                _a.push(_.titleAppend);
            
          
        });
        
        var tx = '';
        _a.sort();
        for(var i = 0; i < _a.length; i++)
          tx += (tx.length) ? ( (i===_a.length-1)? ' E ': ', ' ) + _a[i] : 'TERMO DE ' + _a[i];
        
        if(tx.length)
          pkg.Titulo.change(tx, 'default');
        else
          pkg.Titulo.change('TERMO', 'default');
      },
      expItemContainer : function (){
        return mod.exp.gE('SDLinkedElementcertidaoItens');
      },
      bindMonetary : {
        items :[
          'certPenhoraEfetivadaIntegral',
          'certPenhoraEfetivadaParcial'
        ],
        selector : 'selectorcertidaoItens',
        container : mod.edt.gE('modAddtCtrls')
    },
      setMonetaryListeners : function(){        
        forEach(pkg.Termo.bindMonetary.items, function(i){
          evBus.on('onAdd.'+ pkg.Termo.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.Termo.resolveCtrlMonetario(arg, i);
          });
          evBus.on('onDel.'+ pkg.Termo.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.Termo.resolveCtrlMonetario(arg, i);
          });
        });
      },
      resolveCtrlMonetario : function(args, item){
        var flg = false;
        if(args.monitr){
          forEach(args.monitr.options, function(opt){
            //forEach(pkg.Termo.bindMonetary.items, function(bIt){
              if(opt.id.itemId() === item)
                if(mod.edt.gE('ctrlMonetario'+item)){
                  flg = true;
                  return;
                }
                else
                  /* create container */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.Termo.bindMonetary.container, mod.exp.gE('valorBacenjud.'+item), item);
                    return;
                  }
            //});
          });
          /* then delete it */
          if(mod.edt.gE('ctrlMonetario'+item) && flg===false)
            mod.edt.gE('ctrlMonetario'+item).remove();
        }
      },
      prepararControlesAR : function(){       
        if(!(pkg.AddtionalControls)){
          evBus.once('AddtionalControls.onLoadPackages', function(event){
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Termo.ControlesAR', '3.0' );
            evBus.fire('Editor.onResize');
          });
          
          j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
        }else{
          pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
          'Termo.ControlesAR', '3.0' );
          evBus.fire('Editor.onResize');
        }
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.termo.lib, function(){
      pkg.Termo.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.termo.lib;
  alert(t);
  console.error(t);

}