/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('alvara.js - módulo compilante');

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
    var arrayCopy = new window.j2.mod._._106;
    var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    var j2Conv = window.j2.mod._._j2TagsConverter;
    var guid = window.j2.mod._._guid;
    //window.j2.mod.j2Moddle;
    
    PARC_PRINCIPAL = 0;
    PARC_SUCUMBENCIAL = 1;
    PARC_PRINCIPAL_SUCUMBENCIAL = 2;
            
    pkg.Alvara = {
      contructor_ : function(){
        var _ = pkg.AlvaraControls._;
                
        pkg.Alvara.setEvents(_);
        
        
      },
      setEvents : function(_){          
        evBus.on('Alvara.Depositos.onChange', function(event, _, deps){
          pkg.Alvara.Sucumbencia.changeListener(_, mod.edt.win.$);
          pkg.Alvara.AlvaraEdit.changeDepositosListener(_, mod.edt.win.$);
        });
        
      },
      Sucumbencia : {
        changeListener : function(_, _$){
          var deps = pkg.Alvara.Depositos;
                    
          for(var i in deps)
            if(deps.hasOwnProperty(i))
              if( deps[i].sumParc === PARC_SUCUMBENCIAL || deps[i].sumParc === PARC_PRINCIPAL_SUCUMBENCIAL ){
                if(! _$(_.sucumbencia.group).is('.show')){
                  _$(_.sucumbencia.group).collapse('show');
                  return;
                }else
                  return;
              }
          
          _$(_.sucumbencia.group).collapse('hide');
        }
      },
      AlvaraEdit : {
        changeDepositosListener : function(_, _$){
          var els = _.__alvaraEdit.disablingElements;
          var count = pkg.Alvara.Depositos.length;
          var deps = pkg.Alvara.Depositos;
          
          /* alvara editable inputs */
          for(var i in els)
            if(els.hasOwnProperty(i))
              if (count > 0)
                _$(els[i]).removeAttr('disabled', '');
              else
                _$(els[i]).attr('disabled', '');
              

          
          /* reorder idx in deposito*/
          if(count < 1)
            return;
          
          for(var i in deps) if(deps.hasOwnProperty(i))
            deps[i].el.tr1.find('th').text( ( parseInt(i) + 1) );
          
              
          
        },
        changeSeloListener : function(selo, _, _$){
          _$(_.guia.inputGroup).collapse( (selo.value === 'G') ? 'hide' : 'show');
        },
        alvExpPage1 : {},
        currParsingCredor : {}
      },
      AddCredor : function(_, _$){
        if(!pkg.AddtionalControls){
          alert('Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
          return;
        }
          
        
        
        var _t = pkg.Alvara;
        var _it = pkg.AlvaraExpedienteIteration;
        var pess = _t.Utilities.getPessoaDef(_.credores.selector);
        var credTable = jQ(_.credores.table);
        var context = {};
        var expPagId = 'p' + (_t.Expedientes.length + 1);
        var alvExp;
        
        pkg.Alvara.AlvaraEdit.alvExpPage1 = jQ(mod.exp.gE('p1')).clone(true);
        
        _t.Utilities.extendPess(pess); //estender as possibiliddes do objeto pessoa como credor
        _t.AlvaraEdit.currParsingCredor = pess; // currparsin é como um bean para imprimir devidamente
        
        //criação da segunda página ou referenciamento para a já existente primeira página
        context = {
          edt : jQ('<div>', {id:'edt_'}).get(0),
          exp : (_t.Expedientes.length === 0) ? jQ('<div>').get(0): mod.exp.gE('j2Exp')
        };
        pkg.AddtionalControls.append(context, 'Alvara.AnotherPage', '1.0', {resizeOnFinish : false} );
        
        //objeto alvará expediente
        alvExp = {
          guid : guid(),
          $ : {
            exp : {
              p : jQ(mod.exp.gE(expPagId))
            },
            edt : {
              thead : jQ(context.edt).find('thead'),
              tbody : jQ(context.edt).find('tbody')
            }
          },
          credor : pess
        };
        
        //rotinas de automatização das opções de selo, número de guia e rateios para as configurações recém cr ias
        _it.AlvaraCredorListedSet(alvExp, _, _$);
        //apenas controles gerados á tabela de relaçao de credores do expediente
        jQ(context.edt).children().appendTo(credTable);
        
        //encaminha para rotina em que o corpo do alvará se atualizará conforme
        //as alterações realizaddas pelo usuário
        _it.AlvaraCorpoChangesListening(alvExp, _, _$);

        //se ainda não existe um clone para replicações dos expedientes do avlará
        // o criamos agora.
        _t.Expedientes.length && _t.Utilities.getClonedAlvara(alvExp.$.exp.p);
        // puxar para alvExp object para Expedientes
        _t.Expedientes.push(alvExp);
        
        evBus.fire('Alvara.Expedientes.onAdd', _, pkg.Alvara.Expedientes, alvExp);
        evBus.fire('Alvara.Expedientes.onChange', _, pkg.Alvara.Expedientes, alvExp);
      },
      Depositos : [],
      Expedientes : [],
      DepositoAdd : function(_, _$, event){
        if(!_.deposito.numero.value.length || !_.deposito.valor.value.length){
          $(_.deposito.form).addClass('was-validated');
          $(_.deposito.devedor.form).addClass('was-validated');
          return;
        }else{
          $(_.deposito.form).removeClass('was-validated');
          $(_.deposito.devedor.form).removeClass('was-validated');
        }
        
        var util = pkg.Alvara.Utilities;
        var devedor = util.getPessoaDef(_.deposito.devedor.selector);
        var dep = {};        
        dep = {
          conta : _.deposito.numero.value.trim(),
          valor : parseFloat(_.deposito.valor.value.replace(',','.')),
          sumParc : parseInt(_.deposito.somatorioParcelas.value),
          idx : pkg.Alvara.Depositos.length + 1,
          devedor : devedor
        };
        dep.pres = { //presentation
          conta : util.depTextFormat(dep.conta),
          valor : util.depValueFormat(dep.valor, true),
          sumParc : util.depSumParcFormat(dep.sumParc),
          devedor : devedor.nome
        };
           
        
        dep.el = {
          tr1 : _$('<tr>').append( 
              _$('<th>', {scope : 'row'}).text('#')
            ).append(
              _$('<td>').text( dep.pres.conta )
            ).append(
              _$('<td>').text( dep.pres.valor ) 
            ).append(
              _$('<td>').text( dep.pres.sumParc) 
            ).append(
              _$('<td>').append(
                _$('<img>', {
                  width:'14px',
                  src:'https://pje.tjma.jus.br/pje/img/remove.png',
                  css : {
                    cursor : 'pointer'
                  }
                })
                .click(function(event){
                    pkg.Alvara.DepositoDel(_, dep, this, _$, event);
                }))
            ).appendTo(_.deposito.list.tbody).collapse({toggle : false}),
          tr2 : _$('<tr>')
            .append(
              _$('<td>')
            ).append(
              _$('<td>', {colspan : 5}).text( dep.pres.devedor )
            ).appendTo(_.deposito.list.tbody).collapse({toggle : false})
        };
       

        pkg.Alvara.Depositos.push(dep);
        
        _.deposito.numero.value = '';
        _.deposito.valor.value = '';
        
        evBus.fire('Alvara.Deposito.onAdd', _, pkg.Alvara.Depositos, dep);
        evBus.fire('Alvara.Depositos.onChange', _, pkg.Alvara.Depositos);
      },
      DepositoDel : function(_, dep, _this, _$, event){
        $(_this).parent().parent().next().remove();
        $(_this).parent().parent().remove();
        /*var rEl = [
          _$(_$(_this).parent().parent().next()),
          _$(_$(_this).parent().parent())
        ];
        
        forEach(rEl, function(el){
          el.on('hidden.bs.collapse', function () {
            this.remove();
          });
          el.collapse('hide');
        });*/
                
        pkg.Alvara.Depositos = pkg.Alvara.Depositos.filter(function(item) { 
            return item !== dep;
        });
        
        evBus.fire('Alvara.Deposito.onRemove', _, pkg.Alvara.Depositos, dep);
        evBus.fire('Alvara.Depositos.onChange', _, pkg.Alvara.Depositos);
      },
      RateioDel : function(_, event){},
      GuiaConsultaAction : function(_, event){},
      Utilities : {
        depTextFormat : function(d){
          return d.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        },
        depValueFormat : function(d, s){
          var f = parseFloat(d);
          if(!(s))
            return f.toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.'); 
          else
            return 'R$ ' + f.toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.');
        },
        depSumParcFormat : function(d){
          switch(d){
            case PARC_PRINCIPAL:              return "P";
            case PARC_SUCUMBENCIAL:           return "S";
            case PARC_PRINCIPAL_SUCUMBENCIAL: return "P+S";
          }
        },
        extendPess : function(p){
          
        },
        getClonedAlvara : function(to) {
          return pkg.Alvara.AlvaraEdit.alvExpPage1.clone(true).find('#PagesSections')
                 .children().appendTo(to.find('#PagesSections'));
        },        
        getPessoaDef : function(_){
          var id = _.selectedOptions[0].id;
          var parte = filter(j2.env.PJeVars.partes.list.todasPartes, {idPess : id});
          if(parte.length){
            parte = parte[0];
            return parte;
          }
          return null;
        }
      }
    };
    
    pkg.AlvaraExpedienteIteration = {
      instances : [],
      AlvaraCredorListedSet : function(alvExp, _G, _$){
        var _alvExp = alvExp;
        var __$ = _$;
        
        
        var _ = {
          selo : _alvExp.$.edt.tbody.find('#alvara-seloJudicial'), 
          guia : {
            inputGroup : _alvExp.$.edt.tbody.find('#alvara-guia-inputGroup'),
            numero : _alvExp.$.edt.tbody.find('#alvara-guia-numero'),
            consultaAction : _alvExp.$.edt.tbody.find('#alvara-guiaNumero-consultaAction')            
          },
          rateio : {
            verba : _alvExp.$.edt.tbody.find('#alvara-rateio-verba'),
            parcela : _alvExp.$.edt.tbody.find('#alvara-rateio-parcela'),
            list : _alvExp.$.edt.tbody.find('#alvara-rateio-list'),
            removeAction : _alvExp.$.edt.tbody.find('#alvara-rateio-removeAction')
          }
        };

        _.guia.numero.change(function(event){          
          _alvExp.$.exp.p.find('#seloOnerosoGuia').text(_.guia.numero.val());
        });
        
        _.selo.change(function(event){
          __$(_.guia.inputGroup).collapse( (this.value === 'G') ? 'hide' : 'show');
          
          j2.mod._.styleSetter(_alvExp.$.exp.p.find('#seloOneroso-table').get(0), 'Hidden', (this.value === 'O') ? true : false);
          
          _alvExp.$.exp.p.find('#tipoSeloAtoJudicial').text((this.value === 'O') ? 'oneroso' : 'gratuito' ) ;
        });
        
        var _depChangeCallback =  function(event, _G, deps){
          var count = deps.length;
          var val = __$(_.rateio.verba).val();
          var flg = false;
          
          __$(_.rateio.verba).find("option[value!='NONE']").each(function() {
            j2.mod._.styleSetter(this, 'Hidden', false);
            for(var i in deps)
              if(deps.hasOwnProperty(i))
                if( deps[i].sumParc === parseInt(this.value) || deps[i].sumParc ===  PARC_PRINCIPAL_SUCUMBENCIAL){
                  !flg && (flg = this.value === val);
                  j2.mod._.styleSetter(this, 'Hidden', true);
                }
          });
          
          if(!flg)
            __$(_.rateio.verba).val('NONE');
        };
        _depChangeCallback({}, _, pkg.Alvara.Depositos);
        
        evBus.on('Alvara.Depositos.onChange', _depChangeCallback);
        
        pkg.AlvaraExpedienteIteration.instances.push(_);
      },
      AlvaraCorpoChangesListening : function(alvExp, _G, _$){
        var _alvExp = alvExp;
        var __$ = _$;
        var _pkg = pkg;
     
        
        var _ = {
          grouping : _alvExp.$.edt.thead.find('#alvara-agrupar-selector'),
          delAction : _alvExp.$.edt.thead.find('#alvara-delete-action')
        };
        
        _.grouping.change(function(event){
          var expRef = _.grouping.find(':selected').prop('expediente');

          if(_.grouping.val()==="NONE"){
            expRef = _alvExp.groupedWith; 
            _alvExp.groupedWith = 'NONE';
            
            if(expRef.grouping){              
              expRef.grouping = expRef.grouping.filter(function(item){
                return item.guid !== _alvExp.guid;
              });
              
              if(!expRef.grouping.length)
                expRef.$.edt.thead.find('fieldset').removeAttr('disabled');
            }
            
            _alvExp.$.exp.p.show("slow");
            _alvExp.$.exp.p.prev("[j2='QuebraDePagina']").show("slow");

            __$(_alvExp.$.edt.tbody).collapse('show');
            __$(_alvExp.$.edt.thead.find('#alvara-chain')).collapse('hide');
            
          }else{
            _alvExp.groupedWith = expRef;
            if(!(expRef.grouping))
              expRef.grouping = [];
            expRef.grouping.push(_alvExp);
            
            _alvExp.$.exp.p.hide("slow");
            _alvExp.$.exp.p.prev("[j2='QuebraDePagina']").hide("slow");
            
            __$(_alvExp.$.edt.tbody).collapse('hide');
            __$(_alvExp.$.edt.thead.find('#alvara-chain')).collapse('show');
            expRef.$.edt.thead.find('fieldset').attr('disabled','');
          }
          
          evBus.fire('Alvara.Expedientes.onChange', _G, _pkg.Alvara.Expedientes, _alvExp);
            
        });
        
        _.delAction.click(function(event){
          var msg = "Remover alvará judicial para " + _alvExp.credor.nome + "?";
          pkg.ModalDialog.okCancel(msg, 'Alvará j2', 'Alvara.Expedientes.Remove.yes.' + _alvExp.guid, 'Alvara.Expedientes.Remove.no.' + _alvExp.guid);
        });
        
        evBus.on('Alvara.Expedientes.Remove.yes.' + _alvExp.guid, function(){
          var expRef = _alvExp.groupedWith; 

          if(expRef && expRef.grouping){                        
            expRef.grouping = expRef.grouping.filter(function(item){
              return item.guid !== _alvExp.guid;
            });

            if(!expRef.grouping.length)
              expRef.$.edt.thead.find('fieldset').removeAttr('disabled');
          }
          
          var _rv = function(){
            _$(this).detach();
          };

          if(_pkg.Alvara.Expedientes.length > 1){
            _alvExp.$.exp.p.prev("[j2='QuebraDePagina']").hide("slow", _rv);
            _alvExp.$.exp.p.hide("slow", _rv);
          }
          
          _alvExp.$.edt.tbody.hide('slow', _rv);
          _alvExp.$.edt.thead.hide('slow', _rv);
          
          
          _pkg.Alvara.Expedientes = _pkg.Alvara.Expedientes.filter(function(item){
            return item.guid !== _alvExp.guid;
          });
          
          var __i = 1;
          forEach(_pkg.Alvara.Expedientes, function(_exp){
            _exp.$.exp.p.attr('id', 'p'+ __i);
            
            if(__i === 1) //for the new frist page, remove break before it
              _exp.$.exp.p.prev("[j2='QuebraDePagina']").remove();
            
            __i++;
          });
          
          _pkg.Pagina2toN.count = __i;
          
          evBus.fire('Alvara.Expedientes.onChange', _G, _pkg.Alvara.Expedientes, _alvExp);
        });
        
        function processAlvaraCorpoChange(){
          //criação da segunda página ou referenciamento para a já existente primeira página
          var context = {
            edt : jQ('<div>').get(0),
            exp : jQ('<div>').get(0)
          };
          var callback = function(modSetContext){
            true;
          };
          pkg.AddtionalControls.append(context, 'Alvara.ExpedienteIteration', '1.0', {resizeOnFinish : false, onFinishBuild : callback} );
        }
        
        function processAgruparAlvara(_G, _Exps, _CurrExp){          
          
          forEach(_Exps, function(_Exp){
            
            var _ExpsC = arrayCopy(_Exps);
            _ExpsC = _ExpsC.filter(function(item) { 
              return item !== _Exp;
            });
          
            var _sel = _Exp.$.edt.thead.find('#alvara-agrupar-selector');
            
            _sel.find("option[value!='NONE']").remove();
            
            forEach(_ExpsC, function(exp){
              if(exp.groupedWith && exp.groupedWith !== 'NONE' )
                return;
              
              var _o = jQ('<option>', {value : exp.guid}).text(exp.credor.nome);
              //_o.get(0).expediente = exp;
              _o.prop('expediente', exp);
              _sel.append(
                _o
              );
            });
            
            if(_sel.find("option[value!='NONE']").length)
              _sel.removeAttr('disabled');
            else
              _sel.attr('disabled', '');
            
            if(_Exp.groupedWith && _Exp.groupedWith !== 'NONE' )
              _sel.val(_Exp.groupedWith.guid);
          });
        }
        
        var _depositosChangeCallback =  function(event, _G, deps){
          processAlvaraCorpoChange();
        };
        var _expedientesChangeCallback =  function(event, _G, _Exps, _CurrExp){
          processAgruparAlvara(_G, _Exps, _CurrExp);
        };
        evBus.on('Alvara.Depositos.onChange', _depositosChangeCallback);
        evBus.on('Alvara.Expedientes.onChange', _expedientesChangeCallback);
        
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.alvara.lib, function(){
      pkg.Alvara.contructor_();
      j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.alvara.lib;
  alert(t);
  console.error(t);

}


