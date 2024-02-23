/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('intimacao.js - módulo compilante');

try {
  (function () { /* inits autoexec */
    var w = window;
    const evBus = window.j2.mod.eventBus.EventBus;
    
    var pkg;
    if (w.j2.mod.clsCnstr)
      pkg = w.j2.mod.clsCnstr;
    else{
      w.j2.mod.clsCnstr = {};
      pkg = w.j2.mod.clsCnstr;
    }
    
    const mod = w.j2.modelo;
    
    //var isObject = new window.j2.mod._._201;
    const forEach = w.j2.mod.forEach;
    const filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    //var parseVar = window.j2.mod._._parseVar;
    const j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    const defer = new window.j2.mod._._101; // tappac as new
    
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
    
    pkg.Intimacao = {
      contructor_ : function(){
        /* creating event listener*/
        pkg.Intimacao.setMonetaryListeners();
        pkg.Intimacao.setEvents();
        
        if(pkg.Intimacao.containers.exp.OJ()){
          tools.hide(pkg.Intimacao.containers.exp.OJ());
          tools.hide(pkg.Intimacao.containers.edt.seletorOJ());
        }
      },
      setEvents : function(){
        var cb = function(event, closer){
          //confirmar existência itens          
           if(pkg.Intimacao.containers.edt.itemsMonitor().childNodes.length===0){
             pkg.DocEditorCore.proceedFinish = false; 
             event.stopPropagation();
             pkg.ModalDialog.okCancel('Você não adicionou finalidades à intimação. Fechar mesmo o editor?', 'Intmação j2 - Atenção', 
             'Intimacao.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
           
          /* update para Diario da Justiça Eletronico Nacional 
           //format if diário
           if(pkg.Intimacao.containers.edt.meio().value !== 'meioComunicItDJe')
             return;
           var __$ = j2.mod.jQ3;
           
           forEach(__$(mod.exp.doc).find('p'), function(p){
             p = __$(p);
             p.css ('font-family', 'tahoma');
             p.css ('font-size', 'small');
           });    
          */
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('Intimacao.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });
        
        
        evBus.on('onChange.'+pkg.Intimacao.containers.edt.meio().id, function(event, value, obSelect){
          pkg.Intimacao.formatByExpMeio(value);
        });

        function __callbackAoCarregarItensDoMeioDeComunicacao(event, _selInst, selct){
          defer(()=> pkg.Intimacao.formatByExpMeio(selct.value));
        }
        const [selectorMeio] = filter(pkg.Selector.instances, {id: 'intimacaoSelectMeio'})
        if( !selectorMeio && !selectorMeio.__loadedItems) 
          evBus.on('afterLoadItems.'+pkg.Intimacao.containers.edt.meio().id, __callbackAoCarregarItensDoMeioDeComunicacao);
        else
          __callbackAoCarregarItensDoMeioDeComunicacao(undefined, undefined, selectorMeio.select)
                
        
        /* trata antes de adicionar item */
        evBus.on('beforeChange.'+pkg.Intimacao.containers.edt.itemSelector().id, function(event, selectorObj, selI, toAppd){
          var arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : pkg.Intimacao.containers.edt.meio().value } );
          if(arElByMeio.length){
            if(arElByMeio[0].data)
              toAppd.body = j2Conv(j2.mod.builder.parseVars(arElByMeio[0].data.text.trim().trimSpaces()));

            if(arElByMeio[0].simpleElementsDefs){
              var cont = document.createElement('div');
              forEach(arElByMeio[0].simpleElementsDefs.elemento, function (ele){
                j2.mod.builder.j2ElementParse(ele, cont);
              });

              toAppd.body = cont;
            }
          }
          else{
            arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : 'general' } );
            if(arElByMeio.length){
              if(arElByMeio[0].data)
                toAppd.body = j2Conv(j2.mod.builder.parseVars(arElByMeio[0].data.text.trim().trimSpaces()));
              
              if(arElByMeio[0].simpleElementsDefs){
                var cont = document.createElement('div');
                forEach(arElByMeio[0].simpleElementsDefs.elemento, function (ele){
                  j2.mod.builder.j2ElementParse(ele, cont);
                });
                
                toAppd.body = cont;
              }
            }
            else
              toAppd.body = '####ERROR#PRocessing';
          }
            
        });
        
        evBus.on('onAdd.selectorintimacaoItens.intmItComprovPgtoCustas', function(ev, arg){ // fdt
          evBus.once("General.DatePicker.onCreate", function(ev, _dpObj){
            evBus.once('onDel.selectorintimacaoItens.intmItComprovPgtoCustas', function(ev, arg){
                $(_dpObj.inputField).remove();
            });  
            
            /*_dpObj.inputField.change = function(){
              var expEl = mod.exp.gE('intmItComprovPgtoCustas-data');
              if(expEl && _dpObj.inputField.value)
                expEl.innerHTML = _dpObj.inputField.value + ' 23:59:59';
            };*/
            
            evBus.on("General.DatePicker.onChange", function(ev, _insObj){
              var expEl = mod.exp.gE('intmItComprovPgtoCustas-data');
              expEl.innerHTML = _insObj.inputField.val() + ' 23:59:59';
            });
          });  
          
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'General.DatePicker', '1.0-fut' );
        });
      },
      formatByExpMeio : function(meio){
        var makeARVisible = function(flg){
          try{
            if(flg)
              pkg.AR.visibleOn();
            else
              pkg.AR.visibleOff();
          }catch(e){}
        };
        var makeSelectorOJVisible = function(TF){
            if(pkg.SeletorOJ)
                pkg.SeletorOJ.visible(TF);
        };
        var makeAdvogadosVisible = function(TF){
            if(pkg.Intimacao.containers.exp.advogados())
              j2.mod._.styleSetter(pkg.Intimacao.containers.exp.advogados(), 'Hidden', TF );               
        };
        
        var changeTitulo = function(text){
          pkg.Titulo.change(text, 'default');
        };
        
        var makeDJeControlsVisbile = function(TF){
          if(!(pkg.DJeControls)){
            pkg.ModalDialog.ok('Pacote DJe Controls não foi encontado.', 'Intimacao j2 - Erro');
            return;
          }
        
          if(TF)
            pkg.DJeControls.activateControls();
          else
            pkg.DJeControls.hideControls();
        };
        
        var advertenciasWA = function(TF){
          if(!(pkg.SeletorAdvertencias))
            return;
          
          if(TF){         
            pkg.SeletorAdvertencias.addFixed(['advtItWAAcusarRecebimento', 
                                              'advtItWAIdentidade', 
                                              'advtItSuspensaoAtendimentoPresencialPortariaCOVID19', 
                                              'advtItAcusarNaoSerODestinatario']);
          }else{
            pkg.SeletorAdvertencias.delFixed(['advtItWAAcusarRecebimento', 
                                              'advtItWAIdentidade', 
                                              'advtItSuspensaoAtendimentoPresencialPortariaCOVID19', 
                                              'advtItAcusarNaoSerODestinatario']);
          }
          
        };
        
        var enableAdvertenciasModelo = function(TF){
          if(pkg.SeletorAdvertencias)
            pkg.SeletorAdvertencias.advModelEnabled = TF;
        };
        
        
        switch(meio){
          case 'meioComunicItTelefone':
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.telefone(), 'Hidden', true );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.pessoalmente(), 'Hidden', false );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.default_(), 'Hidden', false );

            j2.mod._.styleSetter(pkg.Intimacao.containers.edt.deOrdem(), 'Hidden', false );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.destinatarioLabel(), 'Hidden', false );
            
            if(pkg.BlocoAssinaturas)
              pkg.BlocoAssinaturas.provimento.setVisible(false);
            
            enableAdvertenciasModelo(false);
            break;
          case 'meioComunicItPessoalmente':
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.telefone(), 'Hidden', false );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.pessoalmente(), 'Hidden', true );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.default_(), 'Hidden', false );

            j2.mod._.styleSetter(pkg.Intimacao.containers.edt.deOrdem(), 'Hidden', false );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.destinatarioLabel(), 'Hidden', false );
            
            if(pkg.BlocoAssinaturas)
              pkg.BlocoAssinaturas.provimento.setVisible(false);
            
            enableAdvertenciasModelo(false);
            break;
          default:
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.telefone(), 'Hidden', false );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.pessoalmente(), 'Hidden', false );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.bodies.default_(), 'Hidden', true );

            j2.mod._.styleSetter(pkg.Intimacao.containers.edt.deOrdem(), 'Hidden', true );
            j2.mod._.styleSetter(pkg.Intimacao.containers.exp.destinatarioLabel(), 'Hidden', true );
            
            if(pkg.BlocoAssinaturas)
              pkg.BlocoAssinaturas.provimento.setVisible(true);
            
            enableAdvertenciasModelo(true);
            break;
        }
        
              
        switch(meio){
          case 'meioComunicItCorreios':
            changeTitulo('CARTA DE INTIMAÇÃO');
            makeSelectorOJVisible(false);
            makeAdvogadosVisible(false);
            makeDJeControlsVisbile(false);
            advertenciasWA(false);
            if(!(pkg.AR)){
              j2.mod.com.libLoader(j2.res.mod.AR);
              evBus.once('AR.onLoadLibs', function(event){
                pkg.AR.append(null, {
                  eventName : [
                    'onAdd.' + pkg.Intimacao.containers.edt.itemSelector().id,
                    'onDel.' + pkg.Intimacao.containers.edt.itemSelector().id
                  ],
                  monitor : pkg.Intimacao.containers.edt.itemsMonitor(),
                  prePattern : 'Intimação'},
                  '7.0'
                );
              });
            }else{
              makeARVisible(true);
            }
            break;
          case 'meioComunicItCentralMandados':
            changeTitulo('MANDADO DE INTIMAÇÃO');
            makeARVisible(false);
            makeSelectorOJVisible(true);
            makeAdvogadosVisible(false);
            makeDJeControlsVisbile(false);
            advertenciasWA(false);
            break;
            
          case 'meioComunicItDJe':
            changeTitulo('INTIMAÇÃO');
            makeARVisible(false);
            makeSelectorOJVisible(false);
            makeAdvogadosVisible(true);
            makeDJeControlsVisbile(true);
            advertenciasWA(false);
            break;
            
          case 'meioComunicItPessoalmente':
            changeTitulo('CERTIDÃO DE INTIMAÇÃO');
            makeARVisible(false);
            makeSelectorOJVisible(false);
            makeAdvogadosVisible(false);
            makeDJeControlsVisbile(false);
            advertenciasWA(false);
            break;
            
          case 'meioComunicItSistema':
            changeTitulo('INTIMAÇÃO ELETRÔNICA');
            makeARVisible(false);
            makeSelectorOJVisible(false);
            makeAdvogadosVisible(true);
            makeDJeControlsVisbile(false);
            advertenciasWA(false);
            break;
            
          case 'meioComunicItTelefone':
            changeTitulo('CERTIDÃO DE INTIMAÇÃO');
            makeARVisible(false);
            makeSelectorOJVisible(false);
            makeAdvogadosVisible(false);
            makeDJeControlsVisbile(false);
            advertenciasWA(false);
            break;
            
          case 'meioComunicItWhatsApp':
            changeTitulo('INTIMAÇÃO');
            makeARVisible(false);
            makeSelectorOJVisible(false);
            makeAdvogadosVisible(false);
            makeDJeControlsVisbile(false);   
            advertenciasWA(true);
            break;
            
          default:
            mod.edt.win.alert(meio);
        }
                
        pkg.Intimacao.containers.edt.itemsMonitor().changeList();
      },
      containers : { 
        exp : {
          titulo : function (){ return mod.exp.gE('expTitle'); },
          destinatario : function (){return mod.exp.gE('singleBody.destinatarioExpediente'); },
          destinatarioLabel : function (){return mod.exp.gE('vocativoPreText'); },
          deOrdem : function (){ return mod.exp.gE('porOrdemExpediente'); },
          itemList : function (){ return mod.exp.gE('SDLinkedElementintimacaoItens');},
          OJ : function (){ return mod.exp.gE('oficialJustica'); },
          advogados : function (){ return mod.exp.gE('advogados'); },
          bodies : {
            pessoalmente : function (){ return mod.exp.gE('singleBody.IntimacaoPessoal');},
            telefone : function (){ return mod.exp.gE('singleBody.IntimacaoTelefone');},
            default_ : function (){ return mod.exp.gE('porOrdemExpediente');}
          } 
        },
        edt : {
          meio : function (){ return mod.edt.gE('selectorintimacaoSelectMeio'); },
          deOrdem : function (){ return mod.edt.gE('selectorDeOrdemDoExpediente'); },
          itemSelector : function (){ return mod.edt.gE('selectorintimacaoItens'); },
          itemsMonitor : function (){ return mod.edt.gE('selectorMonitorintimacaoItens'); },
          signatario : function (){ return mod.edt.gE('selectorsignatario'); },
          seletorOJ : function (){ return mod.edt.gE('selectorOJsItems'); }
        }
      },
      bindMonetary : {
        items :[
          'intmItPenhoraOnLine',
          'intmItPenhoraOnLineParcial'
        ],
        selector : 'selectorintimacaoItens',
        container : mod.edt.gE('modAddtCtrls')
      },
      setMonetaryListeners : function(){        
        forEach(pkg.Intimacao.bindMonetary.items, function(i){
          evBus.on('onAdd.'+ pkg.Intimacao.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.Intimacao.resolveCtrlMonetario(arg, i);
          });
          evBus.on('onDel.'+ pkg.Intimacao.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.Intimacao.resolveCtrlMonetario(arg, i);
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
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.Intimacao.bindMonetary.container, mod.exp.gE('valorBacenjud.'+item), item);
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
    
    evBus.once('loaded-'+ window.j2.res.mod.intimacao.lib, function(){
      pkg.Intimacao.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.intimacao.lib;
  alert(t);
  console.error(t);

}