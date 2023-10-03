/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('termoReclamaco.js - módulo compilante');

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
    
    var isObject = new window.j2.mod._._201;
    var isArray = new window.j2.mod._._197;
    var forEach = w.j2.mod.forEach;
    var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var j2SON = window.j2.mod._._j2JSONparse;
    var isFunction = new window.j2.mod._._198;
        
    pkg.TermoReclamacao = {
      contructor_ : function(){
        pkg.TermoReclamacao.setMonetaryListeners();
        pkg.TermoReclamacao.setEvents();
        j2.mod.com.libLoader(j2.res.mod.termoReclamacaoDef);
      },
      containers : { 
        exp : {
          /*titulo : function (){ return mod.exp.gE('expTitle'); },
          destinatario : function (){return mod.exp.gE('singleBody.destinatarioExpediente'); },
          deOrdem : function (){ return mod.exp.gE('porOrdemExpediente'); },
          itemList : function (){ return mod.exp.gE('SDLinkedElementintimacaoItens');},
          OJ : function (){ return mod.exp.gE('oficialJustica'); }  */      
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
      setEvents : function(){
        /*var cb = function(event, closer){
           if(pkg.TermoReclamacao.containers.edt.itemsMonitor().childNodes.length===0){
             pkg.DocEditorCore.proceedFinish = false; 
             event.stopPropagation();
             pkg.ModalDialog.okCancel('Você não adicionou itens à Ata de Audiência. Fechar mesmo o editor?', 'Termo de Audiência j2 - Atenção', 
             'Intimacao.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('Intimacao.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });*/
        
        
        /*evBus.on('onChange.'+pkg.Intimacao.containers.edt.meio().id, function(event, value, obSelect){
          pkg.Intimacao.formatByExpMeio(value);
        });*/
        
        evBus.once('loaded-'+j2.res.mod.termoReclamacaoDef.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.mod.termoReclamacaoDef.lib);
          j2.env.xmls.termoReclamacao = xml;
          console.log('parsing window.j2.env.xmls.termoReclamacaoDef');
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              j2.env.xmls.termoReclamacao = definitions;

            if (err){
              j2.err('err get defintions from XML - TermoReclamacao Classes Definitions (termoReclamacaoDef)');
              j2.err(err);
            }
            
            /* reload */
            j2.mod.builder.agregateClassDefs();
            j2.mod.com.libLoader(j2.res.mod.termoReclamacao_);
          });
        });      

        evBus.once('loaded-'+j2.res.mod.termoReclamacao_.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.mod.termoReclamacao_.lib);          
          pkg.TermoReclamacao.modeloDef = xml; 
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              pkg.TermoReclamacao.modeloDef = definitions;

            if (err){
              j2.err('err get defintions from XML - TermoReclamacao Modelo');
              j2.err(err);
            }

            evBus.fire('TermoReclamacao.afterParseTermoReclamacaoDef');
          });
        });    
                
      },
      bindMonetary : {
        items :[
          { id : 'trmRcl.Comuns.DanosMorais', ipLabel : 'D. Moral' },
          { id : 'trmRcl.Comuns.DanosMateriais', ipLabel : 'D. Material' },
          { id : 'trmRcl.Comuns.Inexistencia', ipLabel : 'Débito' },
          { id : 'trmRcl-Comuns-Restituicao', ipLabel : 'Restituicao' },
          { id : 'trmRcl-ObgFaz-TransferenciaTitularidadeDebito', ipLabel : 'Débitos' },
          { id : 'trmRcl-Comuns-Restituicao-dobro', ipLabel : 'Rest. Dobro' },
          
        ],
        selector : 'selectortermoReclamacaoPedidosItens',
        container : mod.edt.gE('modAddtCtrls')
      },
      setMonetaryListeners : function(){        
        forEach(pkg.TermoReclamacao.bindMonetary.items, function(i){
          evBus.on('onAdd.'+ pkg.TermoReclamacao.bindMonetary.selector +'.'+ i.id, function(ev, arg){
            pkg.TermoReclamacao.resolveCtrlMonetario(arg, i);
          });
          evBus.on('onDel.'+ pkg.TermoReclamacao.bindMonetary.selector+'.'+ i.id, function(ev, arg){
            pkg.TermoReclamacao.resolveCtrlMonetario(arg, i);
          });
        });
      },
      resolveCtrlMonetario : function(args, item){
        var flg = false;
        if(args.monitr){
          forEach(args.monitr.options, function(opt){
            //forEach(pkg.Certidao.bindMonetary.items, function(bIt){
              if(opt.id.itemId() === item.id)
                if(mod.edt.gE('ctrlMonetario'+item.id)){
                  flg = true;
                  return;
                }
                else
                  /* create container */
                  if(pkg.monetario){
                    pkg.monetario.createInputSetMonetario('ctrlMonetario'+item.id, item.ipLabel + ' R$', pkg.TermoReclamacao.bindMonetary.container, mod.exp.gE('valor.'+item.id), item);
                    return;
                  }
            //});
          });
          /* then delete it */
          if(mod.edt.gE('ctrlMonetario'+item.id) && flg===false)
            mod.edt.gE('ctrlMonetario'+item.id).remove();
        }
      },
      createParte : function(nomeInicial){
        var _ = {
          nome : nomeInicial || 'NomeInicial',
          htmlContainer : {
            edt : document.createElement('div'),
            exp : document.createElement('div')
          },
          lnkOption : {},
          select : function(){
            pkg.TermoReclamacaoSeletorParte.partes.selected = this;
          },
          parseVar : function (var_) { 
            var v = var_.split('#{')[1];
            v = v.split('}')[0];
            v = v.split('.');
            var _='', r;
            /* index 0 must always be j2 */
            try{
              for(var i = 1; i < v.length; i++){
                _ = (_)?_[v[i]] : this[v[i]];
              }     
              r = _;
            }catch(e){
              r = 'ERRO AO PROCESSAR: ' + v.join('.');
            }
            return r;
          },
          CPFCNPJ : function(){
            var this_ = pkg.TermoReclamacaoSeletorParte.partes.selected;
            if(this_.binding)
              return this_.binding.ParteCPF.input.value || this_.binding.ParteCNPJ.input.value;
            return 'ERRO AO OBETER IDENTIFICAÇÃO';
          },
          WATels : function(){
            var this_ = pkg.TermoReclamacaoSeletorParte.partes.selected;
            if(this_.binding){
              var _ = this_.binding.ParteWA1.input.value;
              if(this_.binding.ParteWA2.input.value)
                _ += ', ' + this_.binding.ParteWA2.input.value;
              return _;
            }
            return 'ERRO AO OBETER IDENTIFICAÇÃO';
          }
          
        };
        return _;
      }
    };
    
    pkg.TermoReclamacaoSeletorParte = {
      constructor_ : function(){
        pkg.TermoReclamacaoSeletorParte.setEvents();
        
        pkg.TermoReclamacaoSeletorParte.partes.array[0] = pkg.TermoReclamacaoSeletorParte.partes.selected;
      },
      setEvents : function(){
        
      },
      getSelectedDefinitions : function(_){
        /* calcular o item def equivlaente do item alterado */
        var selI;
        var is;
        if(isObject(_.src))
          is =  _.src.selectorDef.items.item;
        else{
          _.src = parseVar(_.src);
          if(isObject(_.src))
            is =  _.src.selectorDef.items.item;
        }
          
        for(var i in is)
          if(is[i].id === _.select.value){
            selI = is[i];
            break;
          }
        
        return selI;            
      },
      delAction : function(monitor, select, _){
        if((monitor.options.length===0) || (monitor.selectedIndex ===-1)){
          return;
        }
        
        var toDel = mod.exp.gE( monitor.value + '_li');
        if(toDel)
          toDel.remove();
        else
          j2.err('ASSERTION: Running point unexpected');
        
        var sDo = monitor.options[monitor.selectedIndex];
        for(var i = 0; i <select.options.length; i++){
          if(select.options[i].id.indexOf( sDo.id.substring(0, sDo.id.length -1 ) ) !== -1){
            select.options[i].disabled = false;
            break;
          }
        }
        var eventPrcId = sDo.id.substring(0, sDo.id.length-1);    
        sDo.remove();
        
        pkg.Selector.checkControlState(_);
        evBus.fire('onDel.'+ _.select.id, _);
        evBus.fire('onDel.'+ _.select.id+'.'+eventPrcId, _);
        evBus.fire("afterChange." + _.monitr.id, _.monitr, _);
      },
      addAction : function(select, monitor, _){
                
        if(select.options.length===0){
          j2.log('ASSERTION: rotina inesperada alcançada.');
          return;
        }
        
        if(select.options[select.selectedIndex].disabled)
          return;
        
        
        
        var sDo = select.options[select.selectedIndex]; /* selected option */
        if(sDo.disabled)
          return;

        var eventPrcId = sDo.id;
        var nmo = sDo.cloneNode(true);/*new monitor option*/
        nmo.id += '_';
        
        
        var newParte = pkg.TermoReclamacao.createParte(sDo.innerHTML);
        newParte.lnkOption = nmo;
        nmo.ondblclick = function(){
          newParte.select();
          pkg.TermoReclamacaoSeletorParte.editarParte();
        };
        newParte.updateLabels = function(label){
          nmo.innerHTML = label.toUpperCase();
          newParte.nome = label.toUpperCase();
          mod.sup.parteEdit.gE('edittingPartTitle').innerHTML = label.toUpperCase();
        };
        var selI = pkg.TermoReclamacaoSeletorParte.getSelectedDefinitions(_);
        newParte.selIProp =  j2SON(selI.dataPlus);
        
        mod.edt.gE(newParte.selIProp.polo).appendChild(nmo);
        
        sDo.disabled=true;
        /*sDo.style.display = 'none';
        sDo.style.visibility = 'hidden';*/
        
        if(select.options[select.selectedIndex+1])
          select.options[select.selectedIndex+1].selected = true;
        else if(select.options[select.selectedIndex-1])
          select.options[select.selectedIndex-1].selected = true;  
                
        
        newParte.select();
        pkg.TermoReclamacaoSeletorParte.editarParte();
        
        pkg.Selector.checkControlState(_);
        evBus.fire('onAdd.'+ _.select.id, _);
        evBus.fire('onAdd.'+ _.select.id+'.'+eventPrcId, _);
        evBus.fire("afterChange." + _.monitr.id, _.monitr, _);
      },
      editarParte : function(){      
          mod.sup.open('parteEdit', function(){
            var _ = {
              url : '',
              name : 'parteEdit',
              winSize : {
                width : 335,
                height : 490
              },
              scrolled : false
            };
            return j2.mod._._opW.center( _.url, _.name, null, _.winSize );
          });
          
          
          mod.sup.parteEdit.win.focus();       
          while(mod.sup.parteEdit.doc.body.firstChild)
            mod.sup.parteEdit.doc.body.firstChild.remove();
          
          var _selParte = pkg.TermoReclamacaoSeletorParte.partes.selected;
          mod.sup.parteEdit.doc.body.appendChild( _selParte.htmlContainer.edt );

          
          if(!(_selParte.htmlContainer.edt.firstChild)){
            pkg.TermoReclamacaoSeletorParte.getBindAppendContext(_selParte.selIProp.polo).appendChild( 
                    _selParte.htmlContainer.exp );
                    pkg.TermoReclamacaoSeletorParte.build(
              {
                form : { edt : _selParte.htmlContainer.edt },
                bind : { exp : _selParte.htmlContainer.exp }
              }
            );
          }
          else{
            _selParte.setListeners();
          }
          var tpPesSelect = mod.sup.parteEdit.gE('ReferenciaDocumento.SelectMethod');
          tpPesSelect.onchange = function(event, _){
            pkg.TermoReclamacaoSeletorParte.changeParteTipo(event, tpPesSelect);
          };
          tpPesSelect.onchange(null, tpPesSelect);
          var closeAction = mod.sup.parteEdit.gE('ReferenciaDocumento.closeAction');
          closeAction.onclick = function(event){
            mod.sup.parteEdit.win.close();
          };          
          var declWA = mod.sup.parteEdit.gE('buttonGenDecWA');
          declWA && (declWA.onclick = function(event){
            pkg.TermoReclamacaoSeletorParte.gerarDeclaracaoWhatsApp();
          })
      
      },
      build : function(containers){
        var parteEditVersion;
        
        parteEditVersion = pkg.TermoReclamacao.modeloDef.modelos[0].versao[0];
        if(pkg.TermoReclamacao.modeloDef.modelos[0].classStyles)
          parteEditVersion.classStyles = pkg.TermoReclamacao.modeloDef.modelos[0].classStyles;
        j2.mod.builder.build(parteEditVersion, 'partEditorForm', containers.form );
        
        parteEditVersion = pkg.TermoReclamacao.modeloDef.modelos[1].versao[0];
        if(pkg.TermoReclamacao.modeloDef.modelos[1].classStyles)
          parteEditVersion.classStyles = pkg.TermoReclamacao.modeloDef.modelos[1].classStyles;
        j2.mod.builder.build(parteEditVersion, 'partEditorBind', containers.bind );        
      },
      partes : {
        selected : null,
        add : function(newParte){
          var ar = pkg.TermoReclamacaoSeletorParte.partes.array;
          ar[ar.length] = newParte;
          pkg.TermoReclamacaoSeletorParte.partes.selected = newParte;
        },
        array : []
      },
      getBindAppendContext : function(polo){
        var _td = mod.exp.gE('QualificacaoTablePeticaoInicial.' + polo );
                
        forEach(_td.children, function(ch){
          if(ch.id === 'TermoReclamacao.Qualificacao.PFTemplate' || ch.id === 'TermoReclamacao.Qualificacao.PJTemplate')
            ch.remove();
        });
         
         return _td;
      },
      changeParteTipo : function(event, select, changed){
        var parteSelecionada = pkg.TermoReclamacaoSeletorParte.partes.selected;
        
        var pAtiv = { prop : '#{parte.selIProp.polo}', value : 'partesPoloAtivo'};
        var pPassiv = { prop : '#{parte.selIProp.polo}', value : 'partesPoloPassivo'};
        var pBiVl = function(bind){ /* previsou binding is valuated */ 
          return [
            pAtiv,
            {
              prop : '#{parte.binding.' + bind + '.input.value}',
              value : function(prop){
                return prop.length > 0;
              }
            }
          ];
        };
        var pBiCkd = function(bind, _pPolo, valProp){ /* previsou binding is valuated */ 
          return [
            _pPolo || pAtiv,
            {
              prop : '#{parte.binding.' + bind + '.input.checked}',
              value : typeof valProp === 'boolean' ? valProp : ( valProp || true )
            }
          ];
        };       
        var pBiCkdBivl = function(bindCheck, bindValue){
          var _ = pBiVl(bindValue);
          _[_.length]=pBiCkd(bindCheck)[1];
          return _;
        };

        const pAtivoOuProcuradoriaFalsa = pBiCkd('checkBoxProcuradoria', pAtiv, false)
        pAtivoOuProcuradoriaFalsa.unshift({
          operador: 'OR'
        })
        
        /**
         * 0: identificação do controle
         * 1: visualizável para pessoa física
         * 2: visualizável para pessoa jurídica
         * 3: avaliar quando outro elemento for alterado
         * 4: qual elemento focar após a alteração
         */
        var definicoesDeExibicaoControle = [         /*  PF    PJ */
          ['ParteNome',        true,    true],
          ['ParteNomeRazao',   false,   true],
          ['ParteNacional',    true,    false],
          ['ParteEstadoCivil', pAtiv,   false],
          ['ParteProfissao',   pAtiv,   false],
          ['ParteEscolaridade',   pAtiv,   false],
          ['ParteCPFPre',      true,    false],
          ['ParteRepLegalPre', false,   pAtiv, 'ParteRepLegal'],
          ['ParteRepLegal',    false,   pAtiv],
          ['ParteCNPJPre',     false,   true],
          ['ParteCPF',         true,    false],
          ['ParteCNPJ',        false,   true],
          ['PartePFEndPre',    true,    false],
          ['PartePJProcuradoria',   false, pBiCkd('checkBoxProcuradoria', pPassiv), 'checkBoxProcuradoria'],
          ['checkBoxProcuradoria',  false, pPassiv, [], 'ParteNome'],   
          ['checkBoxProcuradoriaLabel',  false, pPassiv],   
          ['PartePJEndPre',    false,   pAtivoOuProcuradoriaFalsa, 'checkBoxProcuradoria'],
          ['ParteEndLograd',   true,    pAtivoOuProcuradoriaFalsa, 'checkBoxProcuradoria'],
          ['ParteEndNumero',   true,    pAtivoOuProcuradoriaFalsa, 'checkBoxProcuradoria'],
          ['ParteEndBairro',   true,    pAtivoOuProcuradoriaFalsa, 'checkBoxProcuradoria'],
          ['ParteEndCmpoRef',  true,    pAtivoOuProcuradoriaFalsa, 'checkBoxProcuradoria'],
          ['ParteEndCidade',   true,    pAtivoOuProcuradoriaFalsa, 'checkBoxProcuradoria'],
          ['ParteEndUF',       true,    pAtivoOuProcuradoriaFalsa, 'checkBoxProcuradoria'],
          ['ParteTelefonePre', true,    pAtiv],
          ['ParteTelefone1',   true,    pAtiv,  'ParteTelefonePre', 'ParteTelefone2'],
          ['ParteTelefone2',   pBiVl('ParteTelefone1'),  
                                      pBiVl('ParteTelefone1'), 
                                               'ParteTelefone1',  'ParteTelefone3'],
          
          ['ParteTelefone3',   pBiVl('ParteTelefone2'), 
                                      pBiVl('ParteTelefone2'), 
                                               'ParteTelefone2',  'ParteTelefone4'],
          
          ['ParteTelefone4',   pBiVl('ParteTelefone3'), 
                                      pBiVl('ParteTelefone3'), 
                                               'ParteTelefone3'],
          
          ['ParteEMailPre',    pBiVl('ParteEMail1'), 
                                      pBiVl('ParteEMail1'),
                                             'ParteEMail1'],
          
          ['ParteEMail1',      pAtiv, false, [], 'ParteEMail2'],
          ['ParteEMail2',      pBiVl('ParteEMail1'), 
                                      pBiVl('ParteEMail1'),
                                                 'ParteEMail1'],
          ['checkBoxWA',       pAtiv, pAtiv, [], 'ParteWA1'],  
          ['checkBoxWALabel',  pAtiv, pAtiv],  
          ['ParteWAPre',       pAtiv, 
                                      pAtiv, 
                                                 'ParteWA1'],                    
         /* ['ParteWA1',         pBiCkd('checkBoxWA'), 
                                      pBiCkd('checkBoxWA'), 
                                                  'checkBoxWA', 
                                                                'ParteWA2'], */         
          ['ParteWA1',         true, 
                                      pAtiv, 
                                                   
                                                                'ParteWA2'],          
        /*  ['ParteWA2',         pBiCkdBivl('checkBoxWA','ParteWA1'), 
                                      pBiCkdBivl('checkBoxWA','ParteWA1'), 
                                                  ['ParteWA1', 'checkBoxWA']],*/
          ['ParteWA2',         pBiVl('ParteWA1'), 
                                      pBiVl('ParteWA1'), 
                                                  ['ParteWA1', 'checkBoxWA']],
       /*   ['buttGenDecWASpan', pBiCkdBivl('checkBoxWA','ParteWA1'), 
                                      pBiCkdBivl('checkBoxWA','ParteWA1'), 
                                                  ['ParteWA1', 'checkBoxWA']]*/
        ];
        var bidingOuElArray = [
          'binding', 'oEl'
        ];
        
        let PF_PJ_E_IDX = -1;
        switch(select.value){
          case 'PF': PF_PJ_E_IDX = 1; break;
          case 'PJ': PF_PJ_E_IDX = 2; break;
          case 'E':  PF_PJ_E_IDX = 3; break;
        }
        
        var definicoesComAlteracoesComputadas;
        var changedDef;
        if(changed){
          definicoesComAlteracoesComputadas = [];
          forEach(definicoesDeExibicaoControle, function(definicaoIterando){
            if(definicaoIterando[0]===changed){
              definicoesComAlteracoesComputadas.push(definicaoIterando);
              changedDef = definicaoIterando;
            }
            if(definicaoIterando[3]){
              if(isArray(definicaoIterando[3]))
                forEach(definicaoIterando[3], function(ch){
                  if(ch===changed)
                    definicoesComAlteracoesComputadas.push( definicaoIterando )
                });
              if(definicaoIterando[3]===changed)
                definicoesComAlteracoesComputadas.push( definicaoIterando )
            }
          });
        }
        else
          definicoesComAlteracoesComputadas = definicoesDeExibicaoControle;
        
        if(!(definicoesComAlteracoesComputadas.length))
          return;
        
        function evalPrem(prem){
          var pr = parteSelecionada.parseVar(prem.prop);
          pr = (isFunction(pr)) ? pr() : pr;
          pr = (isFunction(prem.value)) ? prem.value(pr) : pr === prem.value;
          return pr;
        };
        
        const IDX_ID = 0
        forEach(bidingOuElArray, function(bindingOuOEl){
          forEach(definicoesComAlteracoesComputadas, function(definicaoIterando){
            if(parteSelecionada[bindingOuOEl])
              //se a parte tiver o biding para o elemento
              if(parteSelecionada[bindingOuOEl][definicaoIterando[IDX_ID]])
                // o elemento no indice do tipo da pessoa não é objeto e não é array
                if(!(isObject(definicaoIterando[PF_PJ_E_IDX])) && !(isArray(definicaoIterando[PF_PJ_E_IDX])))
                  parteSelecionada[bindingOuOEl][definicaoIterando[0]].visible( definicaoIterando[PF_PJ_E_IDX] );
                else if(isArray(definicaoIterando[PF_PJ_E_IDX])){
                  let evRs = true;
                  let operador = 'AND'
                  forEach(definicaoIterando[PF_PJ_E_IDX], function(prem){
                    if(prem.operador){
                      operador = prem.operador
                      evRs = false
                      return
                    }

                    switch(operador){
                      case 'AND':
                        evRs = evRs && evalPrem( prem );
                        break

                      case 'OR':
                        evRs = evRs || evalPrem( prem )
                        break
                    }
                  });
                  parteSelecionada[bindingOuOEl][definicaoIterando[0]].visible( evRs );
                }
                else if(isObject(definicaoIterando[PF_PJ_E_IDX])){ 
                  parteSelecionada[bindingOuOEl][definicaoIterando[0]].visible( evalPrem(definicaoIterando[PF_PJ_E_IDX]) );
                }
                 
          });
        });
        
        if(changedDef)
          if(parteSelecionada.binding[changedDef[0]])
              if(parteSelecionada.binding[changedDef[0]].input.value.length)
                if(parteSelecionada.binding[changedDef[4]])
                  if(parteSelecionada.binding[changedDef[4]].input.value.length === 0)
                    parteSelecionada.binding[changedDef[4]].input.focus();
        
      },
      gerarDeclaracaoWhatsApp : function(){      
        var selP = pkg.TermoReclamacaoSeletorParte.partes.selected;
        if(!(selP.binding)){
          pkg.ModalDialog.ok('Erro ao gerar declaração.', 'TermoDeReclmação j2 - Erro', null, null,
                { edt : mod.sup.parteEdit.doc.body, 
                  j2Win : mod.sup.parteEdit 
                });
          return;
        }
        
        var flg = 0;
        forEach(['ParteNome', 'ParteCPF', 'ParteCNPJ', 'ParteWA1', 'ParteWA2'], 
          function(e){
            if(!(selP.binding[e].input.value))
              flg++;
          }       
        );
        if(flg > 2){
          pkg.ModalDialog.ok('Informações mínimas para geração da declaração do WhatsApp pendentes de preenchimento. Fornecer: Nome da parte, CPF ou CNPJ, Telefones vinculados do WhatsApp.',
                  'TermoDeReclmação j2 - Atenção', null, null,
                  { edt : mod.sup.parteEdit.doc.body, 
                    j2Win : mod.sup.parteEdit 
                  });
          return;
        }
        
        
          mod.sup.open('declWA', function(){
            var _ = {
              url : '',
              name : 'declWA',
              winSize : {
                width : 640,
                height : screen.height * 0.8
              },
              scrolled : true
            };
            return j2.mod._._opW.center( _.url, _.name, null, _.winSize );
          });
          
          
          mod.sup.declWA.win.focus();       
          while(mod.sup.declWA.doc.body.firstChild)
            mod.sup.declWA.doc.body.firstChild.remove();
          
          var decVersion = pkg.TermoReclamacao.modeloDef.modelos[2].versao[0];
          if(pkg.TermoReclamacao.modeloDef.modelos[2].classStyles)
            decVersion.classStyles = pkg.TermoReclamacao.modeloDef.modelos[2].classStyles;
          j2.mod.builder.build(decVersion, 'declWA', 
          { exp : mod.sup.declWA.doc.body, 
            j2Win : mod.sup.declWA 
          } );    
          
          
      }
    };
    
    pkg.TermoReclamacaoFormularioPessoaComum = {
      constructor_ : function(){
        var parte = pkg.TermoReclamacaoSeletorParte.partes.selected;
        var selTpPss = mod.sup.parteEdit.gE('ReferenciaDocumento.SelectMethod');
        
        parte.binding = {};
        parte.oEl = {}; /*other elements*/
        

        forEach(parte.htmlContainer.edt.getElementsByTagName('input'), function(inp){
          parte.binding[inp.id] = { input : inp };
        });

        forEach(parte.htmlContainer.edt.getElementsByTagName('span'), function(spn){
            parte.oEl[spn.id] = spn;
        });

        forEach(parte.htmlContainer.exp.getElementsByTagName('span'), function(spn){
          if(parte.binding[spn.id])
            parte.binding[spn.id].span = spn;
          else
            parte.oEl[spn.id] = spn;
        });

        
         
        
        /* setting event listeners*/
        parte.setListeners = function(){
          forEach(parte.binding, function(prop){          
            prop.input.onchange = function(event){
              if(prop.input.getAttribute('notDotBefore'))
                prop.span.innerHTML = prop.input.value;
              else  
                if(prop.span)
                  prop.span.innerHTML = ', ' + prop.input.value;
              
              if(prop.input.id==='ParteNome')
                parte.updateLabels(prop.input.value);
              
              pkg.TermoReclamacaoSeletorParte.changeParteTipo(event, selTpPss, prop.input.id);
            };
          });
        
          /* other events */
          forEach(parte.binding, function(prop){          
            switch(prop.input.id){
              case 'ParteCPF': 
                prop.input.onkeypress = function(event){
                  pkg.Formatacao.filtraNumeros(prop.input, 16, event);
                };
                prop.input.onkeyup = function(event){
                  pkg.Formatacao.formataCpf(prop.input, event);
                }; 
                break;
              case 'ParteCNPJ':
                prop.input.onkeypress = function(event){
                  pkg.Formatacao.filtraNumeros(prop.input, 16, event);
                };
                prop.input.onkeyup = function(event){
                  pkg.Formatacao.formataCnpj(prop.input, event);
                }; 
                break;
                
              case 'checkBoxWA':
                if(prop.input.value)
                
                break;
            }
          });
        };
        
        parte.setListeners();
        
        /* setting api callbacks */
        forEach(parte.binding, function(bnd){          
          bnd.visible = function(vsb){
            j2.mod._.styleSetter(bnd.input, 'Hidden', vsb);
            if(bnd.span)
              if(bnd.input.getAttribute('spanOnlyFilled')){
                if(bnd.input.value.length)
                  j2.mod._.styleSetter(bnd.span, 'Hidden', vsb);
                else
                  j2.mod._.styleSetter(bnd.span, 'Hidden');
              }else
                j2.mod._.styleSetter(bnd.span, 'Hidden', vsb);
          };
        });
        
        forEach(parte.oEl, function(el){          
          el.visible = function(vsb){
            j2.mod._.styleSetter(el, 'Hidden', vsb);
          };
        });
        
        pkg.TermoReclamacaoSeletorParte.setEvents();
      },
      setEvents : function(){
        
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.termoReclamacao.lib, function(){
      pkg.TermoReclamacao.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.termoAudiencia.lib;
  alert(t);
  console.error(t);

}