/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('termoAudiencia.js - módulo compilante');

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
    var filterU = new window.j2.mod._._filterUnique; // tappac
        
    pkg.TermoAudiencia = {
      contructor_ : function(){
        
        
        
        pkg.TermoAudiencia.setEvents();
        //pkg.TermoAudiencia.autoSave.initialize();
      },
      autoSave : {
        intervalId : null,
        storage : null,
        current : null,
        recovering : {
          processed : false,
          selectorItemsLinkedElementWasUpdatedAfterRecovering : false
        },
        save : function(){
          if(pkg.TermoAudiencia.containers.edt.itemsMonitor()){
            pkg.TermoAudiencia.autoSave.current.itemsMonitor = [];
            for(var i = 0; i < pkg.TermoAudiencia.containers.edt.itemsMonitor().options.length;i++)
              pkg.TermoAudiencia.autoSave.current.itemsMonitor.push( pkg.TermoAudiencia.containers.edt.itemsMonitor().options[i].value );
          }
          if(pkg.TermoAudiencia.containers.exp.termoPs()){
            pkg.TermoAudiencia.autoSave.current.coreP = pkg.TermoAudiencia.containers.exp.termoPs().innerHTML;
          }
          localStorage.setItem('pkg.TermoAudiencia.autoSave.storage', JSON.stringify( pkg.TermoAudiencia.autoSave.storage ));
        },
        initialize : function(){
          evBus.on('TermoAudiencia.autoSave.recover.no' ,pkg.TermoAudiencia.autoSave.new);
          evBus.on('TermoAudiencia.autoSave.recover.yes' ,pkg.TermoAudiencia.autoSave.recover);
          
          if(!(localStorage.getItem('pkg.TermoAudiencia.autoSave.storage')))
            localStorage.setItem('pkg.TermoAudiencia.autoSave.storage', JSON.stringify({}));

          pkg.TermoAudiencia.autoSave.storage = JSON.parse(localStorage.getItem('pkg.TermoAudiencia.autoSave.storage'));
          
          if( pkg.TermoAudiencia.autoSave.storage['idTask'+j2.env.PJeVars.processo.idTask] ){
            var msg = 'Deseja realizar a recuperação do Termo de Audiência? Ao cancelar você não será mais capaz de realizar a recuepração.';
            pkg.ModalDialog.okCancel(msg, 'Termo de Audiência j2 - Recuperação', 'TermoAudiencia.autoSave.recover.yes', 'TermoAudiencia.autoSave.recover.no');
          }
          else
            pkg.TermoAudiencia.autoSave.new();
            
          pkg.TermoAudiencia.autoSave.intervalId = setInterval(pkg.TermoAudiencia.autoSave.save, 15000);
        },
        new : function(){
          pkg.TermoAudiencia.autoSave.storage['idTask'+j2.env.PJeVars.processo.idTask] = {
            coreP : {},
            itemsMonitor : []
          };
          pkg.TermoAudiencia.autoSave.current = pkg.TermoAudiencia.autoSave.storage['idTask'+j2.env.PJeVars.processo.idTask];
        },
        recover : function(){
          pkg.TermoAudiencia.autoSave.current = pkg.TermoAudiencia.autoSave.storage['idTask'+j2.env.PJeVars.processo.idTask];
          
          var recvSet = {
            curr : pkg.TermoAudiencia.autoSave.current,
            selector : pkg.TermoAudiencia.containers.edt.itemSelector(),
            monitor : pkg.TermoAudiencia.containers.edt.itemsMonitor(),
            termoPs : pkg.TermoAudiencia.containers.exp.termoPs()
          };
          
          forEach(recvSet.curr.itemsMonitor, function(item){
            var i = recvSet.selector.options[item];
            if(i.length)
              i = i[0];
            var iC = i.cloneNode(true);
            iC.id = iC.id + '_';
            recvSet.monitor.appendChild(iC);
            i.disabled = true;
          });
          
          recvSet.termoPs.innerHTML = recvSet.curr.coreP;
          pkg.TermoAudiencia.autoSave.recovering.processed = true;
        }
      }, 
      containers : { 
        exp : {
          /*titulo : function (){ return mod.exp.gE('expTitle'); },
          destinatario : function (){return mod.exp.gE('singleBody.destinatarioExpediente'); },
          deOrdem : function (){ return mod.exp.gE('porOrdemExpediente'); },
          itemList : function (){ return mod.exp.gE('SDLinkedElementintimacaoItens');},*/
          termoPs : function (){ return mod.exp.gE('normalizeFormtas'); },     
          coreP : function (){ return mod.exp.gE('SDLinkedElementtermoAudienciaItens'); },
          divCoreP : function (){ return mod.exp.gE('normalizeFormtas'); }
        },
        edt : {
          /*meio : function (){ return mod.edt.gE('selectorintimacaoSelectMeio'); },
          deOrdem : function (){ return mod.edt.gE('selectorDeOrdemDoExpediente'); },*/
          itemSelector : function (){ return mod.edt.gE('selectortermoAudienciaItens'); },
          itemsMonitor : function (){ return mod.edt.gE('selectorMonitortermoAudienciaItens'); }
          /*signatario : function (){ return mod.edt.gE('selectorsignatario'); },
          seletorOJ : function (){ return mod.edt.gE('selectorOJsItems'); }*/
        }
      },
      setTooTip : function(){
        if(!(pkg.HtmlTools))
          return;
        
        pkg.HtmlTools.createToolTip({
          parent : mod.exp.gE('prepPassivoNome'),
          title : 'Prepostos',
          callback : function(){
            
          }
        });
      },
      setEvents : function(){
        var cb = function(event, closer){
          var _i = pkg.TermoAudiencia.containers.edt.itemsMonitor().childNodes;
          if(_i.length===0){
            pkg.DocEditorCore.proceedFinish = false; 
            event.stopPropagation();
            pkg.ModalDialog.okCancel('Você não adicionou itens à Ata de Audiência. Fechar mesmo o editor?', 'Termo de Audiência j2 - Atenção', 
            'TermoAudiencia.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
          }
          
          var _kI = ['trmAud.Julgamento.Contumacia', 'trmAud.Julgamento.Desistencia', 
                     'trmAud.Julgamento.Homologacao', 'trmAud.Julgamento.ColarSentenca'];
          var _iR = 'trmAud.Requerimentos.RenunciaPrazoRecursal';
          var f = {
            sent : false,
            ren : false
          };
          forEach(_i, function(i){
            forEach(_kI, function(k){
              if(i.value===k)
                f.sent = true;
            });
            if(i.value===_iR)
              f.ren = true;
          });
          
          if(f.sent && !f.ren){
            pkg.DocEditorCore.proceedFinish = false; 
            event.stopPropagation();
            pkg.ModalDialog.okCancel('Sentença proferida em audiência. As partes presentes podem renunciar de seu prazo caso queiram. Encerrar sem registrar renúnica de prazo recursal?', 'Termo de Audiência j2 - Atenção', 
            'TermoAudiencia.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
          }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('TermoAudiencia.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });
        
        
        evBus.on('TermoAudiencia.Assign.ToolTipPreposto', function(event){
          pkg.TermoAudiencia.setTooTip();
        });
        
        var pAffect = [
          { id : 'trmAud.Fase.Abertura'},
          { id : 'trmAud.Fase.Conciliacao'}, 
          { id : 'trmAud.Fase.ContestacaoOral'}, 
          { id : 'trmAud.Fase.Instrucao'},
          { id : 'trmAud.Fase.Julgamento'},
          { id : 'trmAud.Fase.RequerimentoDasPartes'},
          { id : 'trmAud.Fase.Deliberacoes'},
          { id : 'trmAud.Fase.VideoConferencia'},
          { id : 'trmAud.Fase.linkPJe'}
        ];
        
        /* trata antes de adicionar item */
        evBus.on('beforeChange.'+pkg.TermoAudiencia.containers.edt.itemSelector().id, function(event, selectorObj, selI, toAppd){
          if(pkg.TermoAudiencia.autoSave.recovering.processed)
            if(!pkg.TermoAudiencia.autoSave.recovering.selectorItemsLinkedElementWasUpdatedAfterRecovering){
              selectorObj.lnkEl = pkg.TermoAudiencia.containers.exp.termoPs().lastChild;
              pkg.TermoAudiencia.autoSave.recovering.selectorItemsLinkedElementWasUpdatedAfterRecovering = true;
            }
          
          var pA = filter(pAffect, {id : selI.id});
          if(!(pA.length))
            return;
          
          var ct = {
            p : pkg.TermoAudiencia.containers.exp.coreP().cloneNode(false),
            div : pkg.TermoAudiencia.containers.exp.divCoreP()
          };
          if(ct.div.firstChild.children.length === 0)
            return;
          
          ct.div.appendChild(ct.p);
          ct.p.id += '_' + selI.id;
          selectorObj.lnkEl = ct.p;            
        });
        
        evBus.on('onAdd.selectortermoAudienciaItens.trmAud.Julgamento.ServicoTerceiro', function(ev, arg){
          pkg.TermoAudiencia.prepararControlesSentencaServicoTerceiro();
        });
        evBus.on('onDel.selectortermoAudienciaItens.trmAud.Julgamento.ServicoTerceiro', function(ev, arg){
          if(!(pkg.AddtionalControls))
            return;
          
          if(!(pkg.SentencaServicoTerceiro))
            return;
          
          pkg.SentencaServicoTerceiro.remove();
        });
        
        evBus.on('CheckBox.TermoAudiencia.AudienciaVideoConf.onCheck', function(evB, _, e){
          if(pkg.SeletorPresidenteAudiencia)
            pkg.SeletorPresidenteAudiencia.alterarAmbiente( (_.input.checked) ? 'videoConferencia' : 'sala' );
        });
        
        evBus.on('afterChange.selectorPresidenteAudiencia', function(ev){
          if(!(pkg.CheckBox))
            return;
          var inp = {
            input: pkg.CheckBox.instances['j2TermoAudiencia-AudienciaVideoConf-check']
          };
          
          evBus.fire('CheckBox.TermoAudiencia.AudienciaVideoConf.onCheck', inp);
        });
        
        /******************* tappac *******************************/
        var self = pkg.TermoAudiencia;
        evBus.on('onAdd.selectortermoAudienciaItens.trmAud-Abertura-Presenca-editarFormulario', function(ev, _ins){ // tappac as new
          self.formularioPresencaAction();
          jQ3('#trmAud-Abertura-Presenca-editarFormulario_', _ins.monitr).dblclick(function(event){
            self.formularioPresencaAction();
          });
        });
      },
      formularioPresencaAction : function(_, version){ // tappac as new
        var idPF = j2.env.PJeVars.processo.numero;

        function subAction(){          
          function _appendRoutine(){
            $(mod.sup.FormularioPresenca.doc.body).empty();
            
            pkg.AddtionalControls.append({
              exp : $('<div>')[0],
              edt : mod.sup.FormularioPresenca.doc.body,
              j2Win : mod.sup.FormularioPresenca,
              edtCore : function(){
                 if(!( this._.core) )
                   this._.core  = mod.sup.FormularioPresenca.gE('DocEditorInnerCore'); 

                 return this._.core;
              }
            }, 
            'Formulario-Presenca', version || '1.0' ); // ndlg
          };
          
          if(pkg.AddtionalControls)
            _appendRoutine();
          else{
            j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
            evBus.once('AddtionalControls.onLoadPackages', function(){
              _appendRoutine();
            });
          }
          
          evBus.on('beforeFihishEdition', 9999, function(event, closer){          
            if(mod.sup.FormularioPresenca)
              mod.sup.FormularioPresenca.win.close();
          });
          
          /*evBus.on('afterChange.seletorPessoaWhatsapp', 10, function(event, closer){          
            evBus.fire('Editor.onResize', mod.sup.FerramentasProcessoWhatsappTool);
          });*/
        };
        
        mod.sup.open('FormularioPresenca', function(){
          var _ = {
            url : '',
            name : 'FormularioPresenca',
            winSize : {
              width : 335,
              height : 525
            },
            scrolled : false
          };
          return j2.mod._._opW.center( _.url, _.name, null, _.winSize, _.scroled, subAction );
        });
      },
      prepararControlesSentencaServicoTerceiro : function(){       
        if(!(pkg.AddtionalControls)){
          evBus.once('AddtionalControls.onLoadPackages', function(event){
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'Sentenca.ServicosTerceiros', '1.0' );
          });
                         
          evBus.once('loaded-'+ j2.res.lib.monetario.lib, function(){            
            j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
          });
          
          j2.mod.com.libLoader( j2.res.lib.monetario );
          
        }else{
          pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
          'Sentenca.ServicosTerceiros', '1.0' );
        }
      }        
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.termoAudiencia.lib, function(){
      pkg.TermoAudiencia.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.termoAudiencia.lib;
  alert(t);
  console.error(t);

}