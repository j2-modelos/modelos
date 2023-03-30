/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('mandado.js - módulo compilante');

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
    
    pkg.Mandado = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.Mandado.setMonetaryListeners();
        pkg.Mandado.setEvents();
        
          
        pkg.SeletorOJ.isVisible = true;
        
        pkg.Mandado.containers.edt.meio().value = "meioComunicItCentralMandados";  
        //pkg.Mandado.containers.edt.meio().onchange(); /* necessário para reescrever o de ordem se houver presidente do ato */

        var _ = ['meioComunicItSistema', 'meioComunicItCorreios', 'meioComunicItDJe', 
          'meioComunicItPessoalmente', 'meioComunicItTelefone', 'meioComunicItWhatsApp'];
        var os = pkg.Mandado.containers.edt.meio().options;

        forEach(_, function(di){
            if(os[di])
              os[di].remove();
        });
        evBus.fire('Mandado.makeInitialChange');
      },
      setEvents : function(){
        var cb = function(event, closer){
           if(pkg.Mandado.containers.edt.itemsMonitor().childNodes.length===0){
             pkg.DocEditorCore.proceedFinish = false; 
             event.stopPropagation();
             pkg.ModalDialog.okCancel('Você não adicionou finalidades à citação. Fechar mesmo o editor?', 'Citação j2 - Atenção', 
             'Mandado.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('Mandado.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });
                
        evBus.on('Mandado.onSelectItemLinkedExecutionValue', function(event, value, obSelect){
            tools.show( pkg.Mandado.containers.exp.execSect() );
        });
                                
        /* trata antes de adicionar item */
        /* Mandado é monotipo de meio de comunicação, logo desnecessária a rotina análoga abaixo */
        /*evBus.on('beforeChange.'+pkg.Mandado.containers.edt.itemSelector().id, function(event, selectorObj, selI, toAppd){
          var arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : pkg.Mandado.containers.edt.meio().value } );
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
        
        evBus.on('afterChange.'+ pkg.Mandado.containers.edt.itemsMonitor().id, function(event, mnt, _){
          pkg.Mandado.updateTitle(mnt, _);
        });
        
        evBus.once('afterLoadItems.' + pkg.Mandado.containers.edt.meio().id, 100000, function(event){
          pkg.Mandado.containers.edt.meio().value = "meioComunicItCentralMandados";  
          //pkg.Mandado.containers.edt.meio().onchange(); /* necessário para reescrever o de ordem se houver presidente do ato */

          var _ = ['meioComunicItSistema', 'meioComunicItCorreios', 'meioComunicItDJe', 
            'meioComunicItPessoalmente', 'meioComunicItTelefone', 'meioComunicItWhatsApp'];
          var os = pkg.Mandado.containers.edt.meio().options;

          forEach(_, function(di){
              if(os[di])
                os[di].remove();
          });
          evBus.fire('Mandado.makeInitialChange');
        });
        
        evBus.on('Mandado.makeInitialChange', function(event){
          pkg.Mandado.containers.edt.meio().onchange();
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
          tx += (tx.length) ? ( (i===_a.length-1)? ' E ': ', ' ) + _a[i] : 'MANDADO DE ' + _a[i];
        
        if(tx.length)
          pkg.Titulo.change(tx, 'default');
        else
          pkg.Titulo.change('MANDADO', 'default');
      },
      containers : { 
        exp : {
          titulo : function (){ return mod.exp.gE('expTitle'); },
          destinatario : function (){return mod.exp.gE('singleBody.destinatarioExpediente'); },
          deOrdem : function (){ return mod.exp.gE('porOrdemExpediente'); },
          itemList : function (){ return mod.exp.gE('SDLinkedElementmandadoItens');},
          OJ : function (){ return mod.exp.gE('oficialJustica'); },
          execSect : function(){ return mod.exp.gE('secao.execucaoInfo');} 
        },
        edt : {
          meio : function (){ return mod.edt.gE('selectormandadoSelectMeio'); },
          deOrdem : function (){ return mod.edt.gE('selectorDeOrdemDoExpediente'); },
          itemSelector : function (){ return mod.edt.gE('selectormandadoItens'); },
          itemsMonitor : function (){ return mod.edt.gE('selectorMonitormandadoItens'); },
          signatario : function (){ return mod.edt.gE('selectorsignatario'); },
          seletorOJ : function (){ return mod.edt.gE('selectorOJsItems'); }
        }
      },
      bindMonetary : {
        items :[
          'intmItCitacaoExecucaoJec',
          'intmItPenhoraAvaliacaoBensDeterminados',
          'intmItPenhoraAvaliacao',
          'intmItPenhoraOnLine',
          'intmItPenhoraOnLineParcial',
          'intmItPenhoraAvaliacaoSaldo',
          'intmItPenhoraAvaliacaoBensDeterminadosSaldo'
        ],
        itemsCorpo : [
          'intmItCitacaoExecucaoJec',
          'intmItPenhoraAvaliacaoBensDeterminados',
          'intmItPenhoraAvaliacao',
          'intmItPenhoraAvaliacaoSaldo',
          'intmItPenhoraAvaliacaoBensDeterminadosSaldo',
          'intmItAvaliacao'
        ],
        itemsFinalidade : [
          'intmItPenhoraOnLine',
          'intmItPenhoraOnLineParcial',
          'intmItPenhoraAvaliacaoSaldo',
          'intmItPenhoraAvaliacaoBensDeterminadosSaldo'
        ],
        selector : 'selectormandadoItens',
        container : mod.edt.gE('modAddtCtrls')
      },
      setMonetaryListeners : function(){        
        forEach(pkg.Mandado.bindMonetary.itemsCorpo, function(i){
          evBus.on('onAdd.'+ pkg.Mandado.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.Mandado.resolveCtrlMonetarioCorpo(arg, i);
          });
          evBus.on('onDel.'+ pkg.Mandado.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.Mandado.resolveCtrlMonetarioCorpo(arg, i);
          });
        });
        
        forEach(pkg.Mandado.bindMonetary.itemsFinalidade, function(i){
          evBus.on('onAdd.'+ pkg.Mandado.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.Mandado.resolveCtrlMonetarioFinalidade(arg, i);
          });
          evBus.on('onDel.'+ pkg.Mandado.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.Mandado.resolveCtrlMonetarioFinalidade(arg, i);
          });
        });
      },
      resolveCtrlMonetarioCorpo : function(args, item){
        var flg = false;   
        if(args.monitr){
          var flgOnlyOne = 0;
          forEach(args.monitr.options, function(opt){
            forEach(pkg.Mandado.bindMonetary.itemsCorpo, function(bIt){
              if(opt.id.itemId() === bIt)
                flgOnlyOne++;
            });
          });
          
          if(flgOnlyOne>1)
            return;
          
          forEach(args.monitr.options, function(opt){
            /*forEach(pkg.Mandado.bindMonetary.items, function(bIt){*/
              if(opt.id.itemId() === item)
                if(mod.edt.gE('ctrlMonetarioC'+item)){
                  flg = true;
                  return;
                }
                else
                  /* create container */ /* existe um container padrão no documento modelo */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetarioC'+item, 'Execucao R$', pkg.Mandado.bindMonetary.container, mod.exp.gE('valorExecucao.intmItCitacaoExecucaoJec'), item, j2.env.PJeVars.processo.valorFloat.toFixed(2));
                    return;
                  }
          /*  });*/
          });
          /* then delete it */
          if(mod.edt.gE('ctrlMonetarioC'+item) && flg===false)
            mod.edt.gE('ctrlMonetarioC'+item).remove();
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
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.Mandado.bindMonetary.container, mod.exp.gE('valorBacenjud.'+item), item);
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
    
    evBus.once('loaded-'+ window.j2.res.mod.mandado.lib, function(){
      pkg.Mandado.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.mandado.lib;
  alert(t);
  console.error(t);

}