/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('sentenca.js - módulo compilante');

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
        
    pkg.Sentenca = {
      contructor_ : function(){
        pkg.Sentenca.setMonetaryListeners();
        pkg.Sentenca.setEvents();
      },   
      bindMonetary : {
        items :[
          'sentItExtincaoExecucaoBACENJUD'
        ],
        selector : 'selectorsentencaItens',
        container : mod.edt.gE('modAddtCtrls')
    },
      setMonetaryListeners : function(){        
          evBus.on('afterChange.'+ pkg.Sentenca.bindMonetary.selector, function(ev, selVal, sel){
            switch(selVal){
              case 'sentItExtincaoExecucaoBACENJUD':
                if(pkg.monetario)
                    pkg.monetario.createInputSetMonetario('ctrlMonetarioSentenca', 
                                  'Valor R$', pkg.Sentenca.bindMonetary.container, j2.modelo.exp.gE('valorBacenjud.Sentenca'), 'Sentenca');
                break;
              default:
                if(j2.modelo.edt.gE('ctrlMonetarioSentenca'))
                  j2.modelo.edt.gE('ctrlMonetarioSentenca').remove();
                break;
            }
            
          });
      },
      setEvents : function(){
        evBus.on('afterChange.selectorsentencaItens', function(ev, selVal, sel){
          /* al removal */
          if(pkg.AddtionalControls){        
            if(pkg.SentencaPretensaoResistida)
              pkg.SentencaPretensaoResistida.remove();
          }
          
          switch(selVal){
            case 'sentItPretensaoResistida':
              pkg.Sentenca.preparation.SentencaPretensaoResistida();
              break;
            default:
              break;
          }

        });
      },
      preparation : {
        SentencaPretensaoResistida : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Sentenca.PretensaoResistida', '1.0' );
        }
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.sentenca.lib, function(){
      pkg.Sentenca.contructor_();
      j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
    });
    
    pkg.SentencaPretensaoResistida = {
      constructor_ : function(){
        //mod.exp.gE('sentItPretensaoResistida-span').scrollIntoView();
//        j2.env.PJeVars.decisao = {
//          multaCominatoria : 200
//        };
//                
//        var _ = {
//          decisao : {
//            CNR : {
//              valor : els('decisao-CNR-valor'),
//              competencia : els('decisao-CNR-competencia')
//            },
//            UC : els('decisao-UC')
//          },
//          fields : {
//            CNR : {
//              valor : mod.edt.gE('fields:CNR:valor'),
//              competencia : mod.edt.gE('fields:CNR:competencia')
//            },
//            UC : mod.edt.gE('fields:UC')
//          }
//        };
//                            
//        
//        _.fields.CNR.valor.onkeypress = function(event){
//          pkg.monetario.formatation.filtraNumeros(_.fields.CNR.valor, 16, event);
//        };
//        _.fields.CNR.valor.onkeyup = function(event){
//          pkg.monetario.formatation.formataValor(_.fields.CNR.valor, 16, event);          
//          
//          forEach(_.decisao.CNR.valor, function(e){
//            pkg.monetario.writeExtense(e, _.fields.CNR.valor);
//          });
//        };     
//        _.fields.CNR.valor.onchange = _.fields.CNR.valor.onkeyup;      
//        
//        
//        _.fields.CNR.competencia.onchange = function(event){
//          forEach(_.decisao.CNR.competencia, function(e){
//            e.innerHTML = _.fields.CNR.competencia.value;
//          });
//        };
//        
//        _.fields.UC.onchange = function(event){
//          forEach(_.decisao.UC, function(e){
//            e.innerHTML = _.fields.UC.value;
//          });
//        };
//        //Highlights
//        var __ = [];
//        
//        forEach(_.decisao.CNR.competencia, function(e){
//          __.push(e);
//        });
//        forEach(_.decisao.CNR.valor, function(e){
//          __.push(e);
//        });
//        forEach(_.decisao.UC, function(e){
//          __.push(e);
//        });
//        
//        
//        forEach(__, function(e){
//          jQ3(e).addClass('HLField');
//        });
//        
//        pkg.DecisaoCNRCEMAR.setEvents(__);
      },
      setEvents : function(__){
//        evBus.on('beforeFihishEdition', function(){
//          forEach(__, function(e){
//            jQ3(e).removeClass('HLField');
//          });
//        }); 
      },
      remove : function(){
        var _ = mod.edt.gE('SentencaPretensaoResistida-div');
        if(_)
          _.remove();
      }
    };    

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.sentenca.lib;
  alert(t);
  console.error(t);

}