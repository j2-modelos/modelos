/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('decisao.js - módulo compilante');

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
        
    pkg.Decisao = {
      contructor_ : function(){
        
        pkg.Decisao.setEvents();
      },
      setEvents : function(){
        evBus.on('afterChange.selectordecisaoItens', function(ev, selVal, sel){
          /* al removal */
          if(pkg.AddtionalControls){        
            if(pkg.DecisaoServicoTerceiro)
              pkg.DecisaoServicoTerceiro.remove();
            if(pkg.DecisaoCNRCEMAR)
              pkg.DecisaoCNRCEMAR.remove();
            if(pkg.DecisaoTarifaServicosBancarios)
              pkg.DecisaoTarifaServicosBancarios.remove();
          }
          
          switch(selVal){
            case 'decItServicoTerceiro':
              pkg.Decisao.preparation.ControlesServicoTerceiro();
              break;
            case 'decItCNRCemar2':
              pkg.Decisao.preparation.ControlesCNRCEMAR();
              break;  
            case 'decItFatoNegativo':
              pkg.Decisao.preparation.ControlesFatoNegativo();
              break;  
            case 'decItJuizoAdmissibilidadeIterativa':
              pkg.Decisao.preparation.ControlesJuizoAdmissibilidadeIterativa();
              break;  
            case 'decItServicosBancarios':
            case 'decItServicosBancariosIndeferimento':
              pkg.Decisao.preparation.ControlesTarifaServicosBancarios();
              break;  
            default:
              break;
          }

        });
      },
      preparation : {
        ControlesServicoTerceiro : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Decisao.ServicosTerceiros', '1.0' );
        },
        ControlesFatoNegativo : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Decisao.FatoNegativo', '1.0' );
        },
        ControlesJuizoAdmissibilidadeIterativa : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Decisao.JuizoAdmissibilidade', '1.0' );
        },
        ControlesCNRCEMAR : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Decisao.CNRCEMAR', '1.0' );
        },
        ControlesTarifaServicosBancarios : function(){
          if(pkg.AddtionalControls)
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Decisao.TarifaServicosBancarios', '1.0' );
        }
      }
      
      
    };
    
    pkg.DecisaoCNRCEMAR = {
      constructor_ : function(){
        j2.env.PJeVars.decisao = {
          multaCominatoria : 200
        };
                
        var _ = {
          decisao : {
            CNR : {
              valor : els('decisao-CNR-valor'),
              competencia : els('decisao-CNR-competencia')
            },
            UC : els('decisao-UC')
          },
          fields : {
            CNR : {
              valor : mod.edt.gE('fields:CNR:valor'),
              competencia : mod.edt.gE('fields:CNR:competencia')
            },
            UC : mod.edt.gE('fields:UC')
          }
        };
                            
        
        _.fields.CNR.valor.onkeypress = function(event){
          pkg.monetario.formatation.filtraNumeros(_.fields.CNR.valor, 16, event);
        };
        _.fields.CNR.valor.onkeyup = function(event){
          pkg.monetario.formatation.formataValor(_.fields.CNR.valor, 16, event);          
          
          forEach(_.decisao.CNR.valor, function(e){
            pkg.monetario.writeExtense(e, _.fields.CNR.valor);
          });
        };     
        _.fields.CNR.valor.onchange = _.fields.CNR.valor.onkeyup;      
        
        
        _.fields.CNR.competencia.onchange = function(event){
          forEach(_.decisao.CNR.competencia, function(e){
            e.innerHTML = _.fields.CNR.competencia.value;
          });
        };
        
        _.fields.UC.onchange = function(event){
          forEach(_.decisao.UC, function(e){
            e.innerHTML = _.fields.UC.value;
          });
        };
        //Highlights
        var __ = [];
        
        forEach(_.decisao.CNR.competencia, function(e){
          __.push(e);
        });
        forEach(_.decisao.CNR.valor, function(e){
          __.push(e);
        });
        forEach(_.decisao.UC, function(e){
          __.push(e);
        });
        
        
        forEach(__, function(e){
          jQ3(e).addClass('HLField');
        });
        
        pkg.DecisaoCNRCEMAR.setEvents(__);
      },
      setEvents : function(__){
        evBus.on('beforeFihishEdition', function(){
          forEach(__, function(e){
            jQ3(e).removeClass('HLField');
          });
        }); 
      },
      remove : function(){
        var _ = mod.edt.gE('DecisaoCNRCEMAR.div');
        if(_)
          _.remove();
      }
    };
    
    pkg.DecisaoTarifaServicosBancarios = {
      constructor_ : function(){
        j2.env.PJeVars.decisao = {
          multaCominatoria : 200
        };
                
        var _ = {
          decisao : {
            servicos : els('decisao-servicos')
          },
          fields : {
            servicos : mod.edt.gE('fields:servicos')
          }
        };
                                    
        _.fields.servicos.onchange = function(event){
          forEach(_.decisao.servicos, function(e){
            e.innerHTML = _.fields.servicos.value;
          });
        };
        //Highlights
        var __ = [];
        forEach(_.decisao.servicos, function(e){
          __.push(e);
        });
        
        
        forEach(__, function(e){
          jQ3(e).addClass('HLField');
        });
        
        pkg.DecisaoCNRCEMAR.setEvents(__);
      },
      setEvents : function(__){
        evBus.on('beforeFihishEdition', function(){
          forEach(__, function(e){
            jQ3(e).removeClass('HLField');
          });
        }); 
      },
      remove : function(){
        var _ = mod.edt.gE('DecisaoTarifaServicosBancarios.div');
        if(_)
          _.remove();
      }
    };
    
    pkg.DecisaoFatoNegativo = {
      constructor_ : function(){
        j2.env.PJeVars.decisao = {
          multaCominatoria : 200
        };
                
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
       
       /*Initial values*/
        _.fields.multa.value = j2.env.PJeVars.decisao.multaCominatoria.toFixed(2);
        _.fields.multa.onchange();

        /*Highlights*/
        var __ = [];
        forEach(_.decisao, function(ar){
          forEach(ar, function(e){
            __.push(e);
          });
        });
        
        
        
        
        forEach(__, function(e){
          jQ3(e).addClass('HLField');
        });
        
        pkg.DecisaoFatoNegativo.setEvents(__);
      },
      setEvents : function(__){
        evBus.on('beforeFihishEdition', function(){
          forEach(__, function(e){
            jQ3(e).removeClass('HLField');
          });
        }); 
      },
      remove : function(){
        var _ = mod.edt.gE('DecisaoTarifaServicosBancarios.div');
        if(_)
          _.remove();
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.decisao.lib, function(){
      pkg.Decisao.contructor_();
      j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
      j2.mod.com.libLoader( j2.res.lib.monetario );
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.decisao.lib;
  alert(t);
  console.error(t);

}