/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('cartaPrecatoria.js - módulo compilante');

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
    var isArray = new window.j2.mod._._197;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var j2SON = window.j2.mod._._j2JSONparse;
    
    var tools = {
      styleSetter : function (element, classesAsString){
        forEach(classesAsString.split(' '), function(clss){
          forEach(j2.mod.builder.getStyleClass(clss).prop, function(prop){
            if(element.style[prop.name] !== 'undefinied')
              element.style[prop.name] = prop.value;
            else
              j2.log('A propriedade ' + x + ' não pode ser associada às definições de estilo. Classe: ' + clss);
          });
        });
      },
      hide : function(el){
        tools.styleSetter(el, 'Hidden');
      },
      show : function(el){
        tools.styleSetter(el, 'Visible');
      }      
  };
    
    pkg.CartaPrecatoria = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.CartaPrecatoria.setMonetaryListeners();
        pkg.CartaPrecatoria.setEvents();
        
          
        pkg.SeletorOJ.isVisible = true;
        
      },
      setEvents : function(){
        evBus.on('CheckBox.CartaPrecatoria.AJG.onCheck', function(evB, _, e){
          j2.mod._.styleSetter(mod.exp.gE('secao.cartaPrecatoria-isentoCustas-secao'), 'Hidden', _.input.checked);
        });
        
        evBus.on('CheckBox.CartaPrecatoria.expedirOficio.onCheck', function(evB, _, e){
          pkg.CartaPrecatoria.containers.edt.signatario().onchange();
          
          j2.mod._.styleSetter(mod.exp.gE('secao.cartaPrecatoria-oficio-secao'), 'Hidden', _.input.checked);
            
          /* controles do ofício */
          j2.mod._.styleSetter(mod.edt.gE('inuNum'), 'Hidden', _.input.checked);
            
          evBus.fire('Editor.onResize');
        });
        
        /* FROM THIS POINT BASED IN mandado.js*/
        
        var cb = function(event, closer){
          var pendFlag = false;
          var msg = '';
          /*se não tiver sido designado o juízo deprecado*/
          if(pkg.CartaPrecatoria.containers.edt.juizoDeprecado().value.length===0){
            pendFlag = true; 
            msg = 'Você não designou o juízo deprecado. Fechar mesmo o editor?';
          }
          
          /*se não houver destinatario */ 
          if(pkg.CartaPrecatoria.containers.edt.destinatarios().childNodes.length===0){
            pendFlag = true; 
            msg = 'Você não especificou as partes destinatárias da Carta Precatória. Fechar mesmo o editor?';
          }
          
          
          /*se não houver número de ofício */
          if( pkg.CartaPrecatoria.containers.edt.checkExpOficio().checked &&
              pkg.CartaPrecatoria.containers.edt.numeroOficio().value.length===0
             ){
            pendFlag = true; 
            msg = 'Você não especificou o número do ofício que encaminha a Carta Precatória. Fechar mesmo o editor?';
          }
          
          /*se não houver itens na carta precatória*/
          if(pkg.CartaPrecatoria.containers.edt.itemsMonitor().childNodes.length===0){
            pendFlag = true; 
            msg = 'Você não adicionou finalidades à Carata Precatória. Fechar mesmo o editor?';
          }
          
          if(pendFlag ){
            pkg.DocEditorCore.proceedFinish = false; 
            event.stopPropagation();
            pkg.ModalDialog.okCancel(msg, 'Carta Precatória j2 - Atenção', 
            'CartaPrecatoria.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
          }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('CartaPrecatoria.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });
                
        evBus.on('CartaPrecatoria.onSelectItemLinkedExecutionValue', function(event, value, obSelect){
            tools.show( pkg.CartaPrecatoria.containers.exp.execSect() );
        });
                                
        /* trata antes de adicionar item */
        /* Mandado é monotipo de meio de comunicação, logo desnecessária a rotina análoga abaixo */
        /*evBus.on('beforeChange.'+pkg.CartaPrecatoria.containers.edt.itemSelector().id, function(event, selectorObj, selI, toAppd){
          var arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : pkg.CartaPrecatoria.containers.edt.meio().value } );
          if(arElByMeio.length)
            toAppd.body = j2Conv(j2.mod.builder.parseVars(arElByMeio[0].data.text.trim().trimSpaces()));
          else{
            arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : 'general' } );
            if(arElByMeio.length)
              toAppd.body = j2Conv(j2.mod.builder.parseVars(arElByMeio[0].data.text.trim().trimSpaces()));
            else
              toAppd.body = '####ERROR#PRocessing';
          }
            
        });*/
        
        evBus.on('afterChange.'+ pkg.CartaPrecatoria.containers.edt.itemsMonitor().id, function(event, mnt, _){
          pkg.CartaPrecatoria.updateTitle(mnt, _);
        });
        
        
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
          tx += (tx.length) ? ( (i===_a.length-1)? ' E ': ', ' ) + _a[i] : 'CARTA PRECATÓRIA DE ' + _a[i];
        
        if(tx.length)
          pkg.Titulo.change(tx, 'default');
        else
          pkg.Titulo.change('CARTA PRECATÓRIA', 'default');
      },
      containers : { 
        exp : {
          titulo : function (){ return mod.exp.gE('expTitle'); },
          execSect : function(){ return mod.exp.gE('secao.execucaoInfo');} 
        },
        edt : {
          itemSelector : function (){ return mod.edt.gE('selectorcPrecItens'); },
          itemsMonitor : function (){ return mod.edt.gE('selectorMonitorcPrecItens'); },
          signatario : function (){ return mod.edt.gE('selectorsignatario'); },
          
          juizoDeprecado : function (){ return mod.edt.gE('CartaPrecatoriaJuizosDeprecanteDeprecado-juizoDeprecado'); },
          destinatarios  : function (){ return mod.edt.gE('selectorMonitorPessoa'); },
          numeroOficio  : function (){ return mod.edt.gE('inuNum'); },
          checkExpOficio  : function (){ return mod.edt.gE('CheckBox:Input:j2CartaPrecatoria-expedir-oficio-check'); }
        }
      },
      bindMonetary : {
        items :[
          'intmItCitacaoExecucaoJec',
          'intmItPenhoraAvaliacaoBensDeterminados',
          'intmItPenhoraAvaliacao',
          'intmItPenhoraOnLine',
          'intmItPenhoraOnLineParcial'
        ],
        itemsCorpo : [
          'intmItCitacaoJec',
          'intmItCitacaoExecucaoJec',
          'intmItPenhoraAvaliacaoBensDeterminados',
          'intmItPenhoraAvaliacao'
        ],
        itemsFinalidade : [
          'intmItPenhoraOnLine',
          'intmItPenhoraOnLineParcial'
        ],
        selector : 'selectorcPrecItens',
        container : mod.edt.gE('modAddtCtrls')
      },
      setMonetaryListeners : function(){        
        forEach(pkg.CartaPrecatoria.bindMonetary.itemsCorpo, function(i){
          evBus.on('onAdd.'+ pkg.CartaPrecatoria.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.CartaPrecatoria.resolveCtrlMonetarioCorpo(arg, i);
          });
          evBus.on('onDel.'+ pkg.CartaPrecatoria.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.CartaPrecatoria.resolveCtrlMonetarioCorpo(arg, i);
          });
        });
        
        forEach(pkg.CartaPrecatoria.bindMonetary.itemsFinalidade, function(i){
          evBus.on('onAdd.'+ pkg.CartaPrecatoria.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.CartaPrecatoria.resolveCtrlMonetarioFinalidade(arg, i);
          });
          evBus.on('onDel.'+ pkg.CartaPrecatoria.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.CartaPrecatoria.resolveCtrlMonetarioFinalidade(arg, i);
          });
        });
      },
      resolveCtrlMonetarioCorpo : function(args, item){
        var flg = false;   
        if(args.monitr){
          var flgOnlyOne = 0;
          forEach(args.monitr.options, function(opt){
            forEach(pkg.CartaPrecatoria.bindMonetary.itemsCorpo, function(bIt){
              if(opt.id.itemId() === bIt)
                flgOnlyOne++;
            });
          });
          
          if(flgOnlyOne>1)
            return;
          
          forEach(args.monitr.options, function(opt){
            /*forEach(pkg.Mandado.bindMonetary.items, function(bIt){*/
              if(opt.id.itemId() === item)
                if(mod.edt.gE('ctrlMonetario'+item)){
                  flg = true;
                  return;
                }
                else
                  /* create container */ /* existe um container padrão no documento modelo */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Causa/Execucao R$', pkg.CartaPrecatoria.bindMonetary.container, mod.exp.gE('valorExecucao.intmItCitacaoExecucaoJec'), item, j2.env.PJeVars.processo.valorFloat.toFixed(2));
                    return;
                  }
          /*  });*/
          });
          /* then delete it */
          if(mod.edt.gE('ctrlMonetario'+item) && flg===false)
            mod.edt.gE('ctrlMonetario'+item).remove();
        }
      },
      resolveCtrlMonetarioFinalidade : function(args, item){
        var flg = false;   
        if(args.monitr){
          forEach(args.monitr.options, function(opt){
            /*forEach(pkg.Mandado.bindMonetary.items, function(bIt){*/
              if(opt.id.itemId() === item)
                if(mod.edt.gE('ctrlMonetario'+item)){
                  flg = true;
                  return;
                }
                else
                  /* create container */ /* existe um container padrão no documento modelo */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.CartaPrecatoria.bindMonetary.container, mod.exp.gE('valorBacenjud.'+item), item);
                    return;
                  }
          /*  });*/
          });
          /* then delete it */
          if(mod.edt.gE('ctrlMonetario'+item) && flg===false)
            mod.edt.gE('ctrlMonetario'+item).remove();
        }
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.cartaPrecatoria.lib, function(){
      pkg.CartaPrecatoria.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.cartaPrecatoria.lib;
  alert(t);
  console.error(t);

}