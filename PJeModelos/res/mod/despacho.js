/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('despacho.js - módulo compilante');

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
    var els = function(id){
      var a = [];
      forEach(mod.exp.doc.getElementsByTagName('span'), function(e){
        if(e.id===id)
          a.push(e);
      });
      return a;
    };
        
    pkg.Despacho = {
      contructor_ : function(){

        pkg.Despacho.setEvents();
      },
      setEvents : function(){
        evBus.on('afterChange.selectordespachoItens', function(ev, selVal, sel){
          if(pkg.AddtionalControls){        
            if(pkg.DespachoCumprimentoSentencaAutomatizado)
              pkg.DespachoCumprimentoSentencaAutomatizado.remove();
          }
            
          switch(selVal){ 
            case 'despItCumprimentoSentencaIterativo':
              pkg.Despacho.preparation.DespachoCumprimentoSentencaAutomatizado();
              break;   
            case 'despItPretensaoResistida':
              pkg.Despacho.preparation.DespachoPretensaoResistida();
              break;   
              
            default:
              break;
          }

        });
      },
      preparation : {
        DespachoCumprimentoSentencaAutomatizado : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Despacho-CumprimentoSentenca', '1.0' );
        },
        DespachoPretensaoResistida : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Despacho-PretensaoResistida', '1.0' );
        }
      }
    };
    
        
    pkg.DespachoCumprimentoSentencaAutomatizado = {
      constructor_ : function(){
        
        
        j2.env.PJeVars.despacho = {
          multaCominatoria : 200
        };
        
        pkg.DespachoCumprimentoSentencaAutomatizado.setMonetaryListeners();
          /*      
        var _ = {
          decisao : {
            servicos : els('decisao-servicos'),
            cobrancaEm : els('decisao-cobrancaEm'),
            multa : els('decisao-multa')
          },
          fields : {
            servicos : mod.edt.gE('fields:servicos'),
            cobrancaEm : mod.edt.gE('fields:cobrancaEm'),
            multa : mod.edt.gE('fields:multa')
          }
        };
                                    
        _.fields.servicos.onchange = function(event){
          forEach(_.decisao.servicos, function(e){
            e.innerHTML = _.fields.servicos.value;
          });
        };
        
        _.fields.cobrancaEm.onchange = function(event){
          forEach(_.decisao.cobrancaEm, function(e){
            e.innerHTML = _.fields.cobrancaEm.value;
          });
        };
        
         _.fields.multa.onkeypress = function(event){
          pkg.monetario.formatation.filtraNumeros(_.fields.multa, 16, event);
        };
        _.fields.multa.onkeyup = function(event){
          pkg.monetario.formatation.formataValor(_.fields.multa, 16, event);          
          forEach(_.decisao.multa, function(e){
            e.innerHTML = _.fields.servicos.value;
            pkg.monetario.writeExtense(e, _.fields.multa);
          });
          
          
        };     
        _.fields.multa.onchange = _.fields.multa.onkeyup;
       
       /*Initial values*//*
        _.fields.multa.value = j2.env.PJeVars.decisao.multaCominatoria.toFixed(2);
        _.fields.multa.onchange();

        /*Highlights*//*
        var __ = [];
        forEach(_.decisao, function(ar){
          forEach(ar, function(e){
            __.push(e);
          });
        });
        
        
        
        
        forEach(__, function(e){
          jQ3(e).addClass('HLField');
        });
        
        pkg.DecisaoFatoNegativo.setEvents(__);*/
      },
      setEvents : function(__){
        evBus.on('beforeFihishEdition', function(){
         /* forEach(__, function(e){
            jQ3(e).removeClass('HLField');
          });*/
        }); 
      },
      remove : function(){
        if(!(mod.edt.gE('DespachoCumprimentoSentencaAutomatizado-div')))
          return;
        var _ = jQ(mod.edt.gE('DespachoCumprimentoSentencaAutomatizado-div'));
        if(_.length)
          _.hide("slow", function(){
            this.remove();
          });
      },
      bindMonetary : {
        items :[
          'despCumSenItObFazerDeterminaCumprimentoMultaFixa',
          'despCumSenItObFazerDeterminaCumprimentoMultaMajora',
          'despCumSenItObFazerDeterminaCumprimentoMultaFixaOcorrencia',
          'despCumSenItObFazerDeterminaCumprimentoMultaMajoraOcorrencia',
          'despCumSenItDecisaoConversaoPerdasEDanos'
        ],
        selector : 'selectorCumSenItens',
        container : mod.edt.gE('modAddtCtrls')
      },
      setMonetaryListeners : function(){        
        forEach(pkg.DespachoCumprimentoSentencaAutomatizado.bindMonetary.items, function(i){
          evBus.on('onAdd.'+ pkg.DespachoCumprimentoSentencaAutomatizado.bindMonetary.selector +'.'+ i, function(ev, arg){
            pkg.DespachoCumprimentoSentencaAutomatizado.resolveCtrlMonetario(arg, i);
          });
          evBus.on('onDel.'+ pkg.DespachoCumprimentoSentencaAutomatizado.bindMonetary.selector+'.'+ i, function(ev, arg){
            pkg.DespachoCumprimentoSentencaAutomatizado.resolveCtrlMonetario(arg, i);
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
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item, 'Valor R$', pkg.DespachoCumprimentoSentencaAutomatizado.bindMonetary.container, mod.exp.gE('despCumSent-Multa-'+item), item);
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
    
    pkg.DespachoPretensaoResistida = {
      constructor_ : function(){
        j2.env.PJeVars.decisao = {
          multaCominatoria : 200
        };
                
        var _ = {
          despacho : {
            canalAtendimento : els('despacho-canalAtendimento'),
          },
          fields : {
            canalAtendimento : mod.edt.gE('fields-canalAtendimento'),
          }
        };
                                    
        _.fields.canalAtendimento.onchange = function(event){
          
          _.despacho.canalAtendimento[0].innerHTML = _.fields.canalAtendimento.value;
          
        };
        //Highlights
        var __ = [];
        __.push(_.despacho.canalAtendimento)       
        
        forEach(__, function(e){
          jQ3(e).addClass('HLField');
        });
        
        pkg.DespachoPretensaoResistida.setEvents(__);
      },
      setEvents : function(__){
        evBus.on('beforeFihishEdition', function(){
          forEach(__, function(e){
            jQ3(e).removeClass('HLField');
          });
        }); 
      },
      remove : function(){
        var _ = mod.edt.gE('DespachoPretensaoResistida.div');
        if(_)
          _.remove();
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.despacho.lib, function(){
      pkg.Despacho.contructor_();
      j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
      j2.mod.com.libLoader( j2.res.lib.monetario );
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.despacho.lib;
  alert(t);
  console.error(t);

}