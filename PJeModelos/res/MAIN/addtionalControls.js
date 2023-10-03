/*
 * 
 * Elmo de Oliveira de Moraes
 */

/* global jQ3 */

console.log('additionalControls.js - módulo compilante');

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
    var forEach = w.j2.mod.forEach;
    var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    //var evBus = window.j2.mod.eventBus.EventBus;
    var parseVar = window.j2.mod._._parseVar;
    //var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var last = new window.j2.mod._._87; // ndlg2
    var defer = new window.j2.mod._._101; // tappac as new
    var inherits = window.j2.mod._._inherits; // tappac as new
    var isFunction = new window.j2.mod._._198; // tappac as new
    var j2Conv = window.j2.mod._._j2TagsConverter; // tappac as new
    var extend = window.j2.mod._._extend;
    
    pkg.AddtionalControls = extend(pkg.AddtionalControls || {}, {
      constructor_ : function(){
        var args = null; // ndlg
        var _ = filter(j2.mod.builder.deferConstructings, {classe : 'AddtionalControls'}); // ndlg
        if(_.length) // ndlg
          args = _[0].args; // ndlg
        
        pkg.AddtionalControls.setEvents(args); // ndlg
        j2.mod.com.libLoader(j2.res.XML.addtionalControls);
        //pkg.AddtionalControls.injectCSS();
      },
      injectCSS : function(){
        var css_ = function(){
          var cssSt = (localStorage.getItem(j2.res.CSS.j2.lib)) ? JSON.parse(localStorage.getItem(j2.res.CSS.j2.lib)).content : '/* lib not injected */';
          return '<style type="text/css">' + cssSt + '</style>';
        };
        
        forEach(j2.modelo, function(c){
          if(c.doc)
            jQ3(c.doc.head).append(css_());
        });
      },
      setEvents : function(args){
        evBus.once('loaded-'+j2.res.XML.addtionalControls.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.XML.addtionalControls.lib);
          if(!(xml))
						xml = window.j2.mod._._xmlDecode( j2.res.XML.addtionalControls.xmlEncode.load );
          
          j2.env.xmls.addtionalControls = xml;
          console.log('parsing window.j2.env.xmls.addtionalControls');
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions){
              j2.env.xmls.addtionalControls = definitions;
              pkg.AddtionalControls.modelDef = definitions;
            }
            if (err){
              j2.err('err get defintions from XML - addtionalControls Classes Definitions (addtionalControls)');
              j2.err(err);
            }
            
            j2.mod.com.libLoader(j2.res.XML.addtionalControlsClsDef);
          });
        });   
        
        evBus.once('loaded-'+j2.res.XML.addtionalControlsClsDef.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.XML.addtionalControlsClsDef.lib);
          if(!(xml))
						xml = window.j2.mod._._xmlDecode( j2.res.XML.addtionalControlsClsDef.xmlEncode.load );
          
          j2.env.xmls.addtionalControlsClsDef = xml;
          console.log('parsing window.j2.env.xmls.addtionalControlsClsDef');
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              j2.env.xmls.addtionalControlsClsDef = definitions;

            if (err){
              j2.err('err get defintions from XML - addtionalControlsClsDef Classes Definitions (addtionalControls)');
              j2.err(err);
            }
            
            /* reload */
            j2.mod.builder && j2.mod.builder.agregateClassDefs();
            pkg.AddtionalControls._isReady = true;
            evBus.fire('AddtionalControls.onLoadPackages');
          });
          
          
        });   
        
        evBus.once('AddtionalControls.onLoadPackages', function(event, xml){ // ndlg as new
          if(!(args && args.autoAddCtrl))
            return;
          
          var it = j2.mod._._j2JSONparse( args.autoAddCtrl );
          if(!(it.length))
            return;
          
          forEach(it, function(adC){
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            adC.modelo, adC.versao );
          });
        });  
      },
      controlsDefByName : function(id){
        var _ = null;
        forEach(pkg.AddtionalControls.modelDef.modelos, function(mD){
          if(mD.id === id)
            _ = mD;
        });
        
        return _;
      },
      getVersion : function(ctD, ver){
        var _ = null;
        forEach(ctD.versao, function(v){
          if(v.id === ver)
            _ = v;
        });
        
        return _;
      },
      append : function(container, controlsDefName, ver, ops){
        var _this = pkg.AddtionalControls;

        /**
         * A versão a ser usado terá precedência absoluta a definida no xml do modelo.
         */

        if(_this.modelRegisteredVersions[controlsDefName])
          ver = _this.modelRegisteredVersions[controlsDefName];

        if(!isObject(ops))
          ops = {
            resizeOnFinish : true
          };
        
        var ctD = pkg.AddtionalControls.controlsDefByName(controlsDefName);
        if(!(ctD)){
          if(pkg.ModalDialog){
            pkg.ModalDialog.ok('Erro ao carregar controles. A definição de modelos é inválida.', 'j2 - AdditionalControls');
          }
          return;
        }
           
        var ARVersion = pkg.AddtionalControls.getVersion(ctD, ver);
        if(!(ARVersion)){
          if(pkg.ModalDialog){
            pkg.ModalDialog.ok('Erro ao carregar controles. A versão não foi encontrada.', 'j2 - AdditionalControls');
          }
          return;
        }
        
        if(!(container)){
          if(pkg.ModalDialog){
            pkg.ModalDialog.ok('Erro ao carregar controles. O container é obrigatório..', 'j2 - AdditionalControls');
          }
          return;
        }
        
        
        if(ctD.classStyles)
          ARVersion.classStyles = ctD.classStyles;
        
        evBus.once('builder.afterBuildModSet.'+controlsDefName, function(event, buildContext){
          ops.resizeOnFinish && evBus.fire('Editor.onResize');
          ops.onFinishBuild && ops.onFinishBuild(buildContext);
          
          evBus.fire('addtionalControls.afterBuild.'+controlsDefName, buildContext); // ndlg2
        });
        
        if(ops.appendOnTop) // ndlg5 as new
          container = { edt : $('<div>', {name : controlsDefName + '-appendOnTop'}).prependTo( container.edt )[0] };
        
        j2.mod.builder.build(ARVersion, controlsDefName, container);
        
        
        /*if(contentIterator){
          forEach(contentIterator.eventName, function(ev){
            evBus.on(ev, function(event, a, b){
              pkg.AR.updateContent(contentIterator);
            });
          });
          pkg.AR.updateContent( contentIterator );
        }*/
      },
      defaultContainer : function(){
        return { edt : mod.edt.gE('modAddtCtrls') };
      }
    });
    
    pkg.WhatsAppInputs = {
      constructor_ : function(){
        var _  = {
          nome : mod.edt.gE('ParteNome'),
          CPF : mod.edt.gE('ParteCPF'),
          wa : mod.edt.gE('ParteWA1'),
          wa2 : mod.edt.gE('ParteWA2'),
          action : mod.edt.gE('buttonGenDecWA')
        };
        _.nome.onchange = function(){
          pkg.WhatsAppInputs.verifyMinimalInptus(_);
        };
        
        _.CPF.onchange = function(){
          pkg.WhatsAppInputs.verifyMinimalInptus(_);
        };
        
        _.wa.onchange = function(){          
          _.wa2.disabled = (_.wa.value) ? false : true;
          pkg.WhatsAppInputs.verifyMinimalInptus(_);
        };
        
        _.action.onclick = function(event){
          pkg.WhatsAppInputs.generateTermoAdesao(_);;
        };
      },
      verifyMinimalInptus : function(_){        
        _.action.disabled = ( (_.nome.value) && (_.CPF.value) && (_.wa.value) ) ? false : true;
      },
      generateTermoAdesao : function(_){
        /* Generic definition of traced classe
        * See termoReclamaco.js
        */
        pkg.TermoReclamacaoSeletorParte = {
          partes : {
            selected : {
              nome : _.nome.value,
              CPFCNPJ: _.CPF.value,
              WATels : function(){      
                var t = _.wa.value;
                t += (_.wa2.value) ? ' ' + _.wa2.value : '';
                return  t;
              }
            }
          }
        };
        
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

        var decVersion = pkg.TermoPeticao.Import.TermoReclamacao.modeloDef.modelos[2].versao[0];
        if(pkg.TermoPeticao.Import.TermoReclamacao.modeloDef.modelos[2].classStyles)
          decVersion.classStyles = pkg.TermoPeticao.Import.TermoReclamacao.modeloDef.modelos[2].classStyles;
        j2.mod.builder.build(decVersion, 'declWA', 
          { exp : mod.sup.declWA.doc.body, 
            j2Win : mod.sup.declWA  }
        );   
        
      }
    };
    
    
        
    pkg.ControlesJuntadaAR = {
      constructor_ : function(){
        var _ = {
          _body : mod.edt.gE('ControlesJuntadaAR.Div'),
          prepAction : mod.edt.gE('Termo.ControlesAR.PrepararButton'),
          pastArea : mod.edt.gE('ControlesJuntadaAR.Div.Edit'),
          extFormAction : mod.edt.gE('ControlesJuntadaAR.ExtrFormButton'),
          winReg : {
            cadDoc : {
              ar : {
                number : mod.par.gE('formRegistroIntimacao:itNumeroAR'),
                result : mod.par.gE('formRegistroIntimacao:sResultado'),
                date : mod.par.gE('formRegistroIntimacao:calRecebimentoInputDate')
              },
              doc : {
                type : mod.par.gE('cbTDDecoration:cbTD'),
                desc : mod.par.gE('ipDescDecoration:ipDesc'),
                numDoc : mod.par.gE('ipNroDecoration:ipNro')
              }
            },
            saveButton : mod.par.gE('j_id199')
          },
          winExp : {
            numeroAR : mod.exp.gE('termItJuntadaAR.ARNum'),
            ids : {
              expediente : mod.exp.gE('termItJuntadaAR.ExpedienteNum'),
              processoDoc : mod.exp.gE('termItJuntadaAR.processoDoc')
            },
            descricaoCarta : mod.exp.gE('termItJuntadaAR.DescConteudo'),
            destinatario : mod.exp.gE('termItJuntadaAR.Destinatario'),
            resultado: {
              frase : mod.exp.gE('termItJuntadaAR.Resultado'),
              complemento : mod.exp.gE('termItJuntadaAR.ResultadoComplemento')
            },
            rastSpan : mod.exp.gE('termItJuntadaAR.rastreamentoSpan')
          }
        };
        
        _.prepAction.onclick = function(event){
          pkg.ControlesJuntadaAR.prepareAction(event, _);
        };
        
        _.pastArea.ondblclick = function(event){
          pkg.ControlesJuntadaAR.cleanAction(event, _);
        };
        
        _.pastArea.onpaste = function(event){    
          setTimeout( function(){
            pkg.ControlesJuntadaAR.changeAction(event, _);
          }, 200);
        };
        
        _.pastArea.ondrop = _.pastArea.onpaste;
        
        _.extFormAction.onclick = function(event){
          pkg.ControlesJuntadaAR.extractAndFormatAction(event, _);
        };
        
        j2.mod.com.libLoader(j2.res.lib.htmlTools);
        
        pkg.ControlesJuntadaAR.setEvents();
        
        if(pkg.ReferenciaDocumento)
          evBus.fire('ReferenciaDocumento.externalActivation');
      },
      setEvents : function(){
        evBus.on('beforeFihishEdition', function(){
          if(mod.sup.regIntmExpediente)
            mod.sup.regIntmExpediente.win.close();
          if(mod.sup.regIntmSroAR)
            mod.sup.regIntmSroAR.win.close();
        }); 
      },
      prepareAction : function(event, _){
        /* inserir links para o documento */
        if(!(pkg.HtmlTools))
          return;
        
        var idInfo = pkg.ReferenciaDocumento.getByExtern();
        if(!(idInfo))
          return;
        
        idInfo.params = j2.mod._._urlParseParams(idInfo.url);
        idInfo.url = window.location.origin + '/pje/Painel/painel_usuario/documentoHTML.seam?idBin=' + idInfo.params.idBin + '&idProcessoDoc=' + idInfo.params.idProcessoDoc;
        mod.sup.open('regIntmExpediente', function(){
          var _ = {
            url : idInfo.url,
            name : 'regIntmExpediente',
            idProcesso : j2.env.PJeVars.processo.idProcesso,
            winSize : {
              width : screen.width * 0.3,
              height : screen.height * 0.5
            }
          };
          return j2.mod._._opW.center( _.url, _.name, _.idProcesso, _.winSize );
        });
        
        evBus.once('pkg.ControlesJuntadaAR.afterLoadAJaxExpediente', function(event, document, response, status, data, _idInfo){
          if(!(document.getElementById('j2Exp'))){
            pkg.ModalDialog.ok('O documento selecionado na lista não parece ser um documento/expediente j2! Impossível Prosseguir!', 'aditionalControls j2 - Erro');
            return;
          }
          
          if(mod.sup.sroAR)
            mod.sup.sroAR.win.close();
                   
          mod.sup.open('regIntmSroAR', function(){
            var _ = {
              url : '',
              name : 'regIntmSroAR' + _idInfo.id,
              idProcesso : j2.env.PJeVars.processo.idProcesso,
              winSize : {
                width : screen.width * 0.3,
                height : screen.height * 0.4
              }
            };
            return j2.mod._._opW.center( _.url, _.name, _.idProcesso, _.winSize );
          });
          
          var textHtml = document.getElementById('AR.Body.CodigoBarrasAR#QueryForm').outerHTML;
          textHtml += '<script>document.getElementById("AR.Body.CodigoBarrasAR#QueryForm").submit();</script>';
          
          mod.sup.regIntmSroAR.doc.write(textHtml);
          
          evBus.fire('ControlesJuntadaAR.onFinishPrepareAction', document, response, status, data, _idInfo);
        });
        
        evBus.once('ControlesJuntadaAR.onFinishPrepareAction', function(event, _document, response, status, data, _idInfo){
          _.pastArea.setAttribute('contenteditable', 'true');
          j2.mod._.styleSetter(_.pastArea, 'ControlesJuntadaAR.Inactive', true);
          
          while(_.pastArea.firstChild)
            _.pastArea.firstChild.remove();
          
          pkg.ControlesJuntadaAR.expediente = {
            doc : _document,
            gE : function(e){
              return _document.getElementById(e);
            },
            ajax : {
              response : response,
              status : status,
              data : data
            },
            idInfo : idInfo
          };
        });
        
        jQ3.get(window.location.origin + '/pje/Painel/painel_usuario/documentoHTML.seam?idBin=' + idInfo.params.idBin + '&idProcessoDoc=' + idInfo.params.idProcessoDoc,
          function(response, status, data){
            if(status !== 'success'){
              pkg.ModalDialog.ok('Erro ao executar o procedimento.', 'aditionalControls j2 - Erro');
              return;
            }
            
            evBus.fire('pkg.ControlesJuntadaAR.afterLoadAJaxExpediente', new DOMParser().parseFromString(response, 'text/html'), response, status, data, idInfo);
        });
        /* abrir consulta correios */
      },
      extractAndFormatAction : function(event, _){
        var metaExp = pkg.ControlesJuntadaAR.expediente;
        var docAR = new DOMParser().parseFromString(_.pastArea.innerHTML, 'text/html');
        var winEdt = mod.edt;
        var winRegInt = mod.par;
        var winTermo = mod.exp;
        var winExp = mod.sup.regIntmExpediente;    
        
        var _ut = {
          dtFromTd : function(td){
            var _ = td.textContent.trim().split(' ');
            if(!(_.length > 1))
                _ = td.textContent.trim().split(String.fromCharCode(160));
            _ = _[0].trim().split('/');
            return new Date(_[2].substr(0, 4), _[1]-1, _[0]);
          },
          trRES : function(e, txt){
            if(!(e))
              return (!(txt)) ? '0' : '############ MOTIVO NÃO INTERPRETADO';
            
            if (e.positive)
              return (!(txt)) ? 'R' : 'Recebido';
            
            
            if( _ut.strMat(e.text, 'carteiro não atendido') )
              return (!(txt)) ? 'A' : 'Ausente';
            
            if( _ut.strMat(e.text, 'desconhecido local') )
              return (!(txt)) ? 'D' : 'Desconhecido';
            
            if( _ut.strMat(e.text, 'endereço insuficiente') || _ut.strMat(e.text, 'endereço incorreto'))
              return (!(txt)) ? 'E' : 'Endereço Insuficiente';
            
            if( _ut.strMat(e.text, 'falecido') || _ut.strMat(e.text, 'faleceu') )
              return (!(txt)) ? 'F' : 'Falecido';
            
            if( _ut.strMat(e.text, 'mudou se') )
              return (!(txt)) ? 'M' : 'Mudou-se';
            
            if( _ut.strMat(e.text, 'numeração irregular') )
              return (!(txt)) ? 'N' : 'Não existe o número';
            
            if( _ut.strMat(e.text, 'retirou objeto não correios') )
              return (!(txt)) ? 'P' : 'Não procurado';
            
            if( _ut.strMat(e.text, 'outras') )
              return (!(txt)) ? 'O' : 'Outros';
            
            if( _ut.strMat(e.text, 'recusado') || _ut.strMat(e.text, 'recusou'))
              return (!(txt)) ? 'C' : 'Recusado';
            
            return (!(txt)) ? 'O' : '############ MOTIVO NÃO INTERPRETADO';
          },
          dtStr : function(e){
            var m = e.getMonth() + 1;
            m = (m.toString().length===1) ? '0' + m: m;
            return e.getDate() + '/' + m + '/' + e.getFullYear();
          },
          anxTypeArGet : function(sel){
            var rt = 0;
            for(var i = 0; i < sel.options.length; i++){
              var t = sel.options[i].textContent.toLowerCase();
              if(t.indexOf('aviso')!==-1 && t.indexOf('recebimento')!==-1){
                rt =  sel.options[i].value;
                break;
              }
            }
            return rt;
          },
          frmtTd : function(td,odd){
            td.removeAttribute('style');
            j2.mod._.styleSetter(td, 'lightBorderBlack' + ((odd) ? ' juntARRastTableCellOdd' : '') );
            var p = document.createElement('p');
            j2.mod._.styleSetter(p, 'p FntModLess Indnt0cm' );
            
            var tx = td.textContent.trim();
            td.innerHTML = '';
            if(odd){
              tx = tx.split('\n');
              if(!(tx.length > 1))
                tx = tx.toString().match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)[0] + ' ' + tx.toString().match(/[0-9]{2}[:][0-9]{2}/)[0];
            }
            p.innerHTML = tx;
            td.appendChild(p);
            
            td.removeAttribute('class');
            td.removeAttribute('valign');
          },
          evtDip : {
            change : function(e){
              if ("createEvent" in document){
                  var evt = document.createEvent("HTMLEvents");
                  evt.initEvent("change", false, true);
                  e.dispatchEvent(evt);
              }else
                  e.fireEvent("onchange");
            }
          },
          strMat : function(txt, stM){
            var mtc = true;
            forEach(stM.split(' '), function(s){
              if(txt.toLowerCase().indexOf(s.split('_').join(' ')) === -1)
                mtc = false;
            });
            return mtc;
          }
        };
        
        /* verificar se há numero de AR no expediente e no texto colado*/
        if(!(winExp.gE('AR.Body.CodigoBarrasAR#PARNNumero'))){
          pkg.ModalDialog.ok('Não exist número de AR no expediente indicado. Impossível continuar.', 'aditionalControls j2 - Erro');
          return;
        }
        
        metaExp.AR = {};
        metaExp.AR.Num = winExp.gE('AR.Body.CodigoBarrasAR#PARNNumero').innerHTML;
                
        if( docAR.body.textContent.length < 10){
          pkg.ModalDialog.ok('Você deve colocar todo o conteúdo do Rastreamento no local anteriormente indicado.!.', 'aditionalControls j2 - Erro');
          return;
        }
        
        if( docAR.body.textContent.indexOf(metaExp.AR.Num) === -1){
          pkg.ModalDialog.ok('O número de AR não foi localizado no texto que você colou! Impossível continuar.!.', 'aditionalControls j2 - Erro');
          return;
        }
        
        metaExp.rastreamento = docAR.getElementsByTagName('table');
        
        if( metaExp.rastreamento.length === 0){
          pkg.ModalDialog.ok('O conteúdo de rastreamento não pode ser lido.!.', 'aditionalControls j2 - Erro');
          return;
        }
        
        metaExp.rastreamento = metaExp.rastreamento[0].cloneNode('true');
                
        /*lendo rastreametno */
        var cnt = 0;
        var brk = false;
        forEach(metaExp.rastreamento.getElementsByTagName('tr'), function(e){
          if(brk)
            return;
        
          cnt++;
          var r = e.getElementsByTagName('td');
          
          switch(cnt){
            case 1:
              if (r[1].textContent.indexOf('entregue')!==-1)
                metaExp.AR.result = {
                  positive : true,
                  text : r[1].textContent,
                  date : _ut.dtFromTd(r[0])
                };
              if (r[1].textContent.indexOf('remetente')!==-1)
                if(metaExp.AR.result)
                  metaExp.AR.result.positive = false;
              
              if(!(metaExp.AR.result)){
                metaExp.AR.result = {
                  positive : false,
                  unreadable : true,
                  code : 'NOT DEV'
                };
                if(_ut.strMat(r[1].textContent, 'entrega não realizada' || 'entrega não_pode efetuada') || _ut.strMat(r[1].textContent, 'retirou objeto não')){
                  metaExp.AR.result.text = r[1].textContent;
                  metaExp.AR.result.date = _ut.dtFromTd(r[0]);            
                  brk = true;
                }
              }
              break;
            default:
              if(metaExp.AR.result)
                if(metaExp.AR.result.positive===false)
                  if(_ut.strMat(r[1].textContent, 'entrega não realizada' || 'entrega não_pode efetuada') || _ut.strMat(r[1].textContent, 'retirou objeto não')){
                    metaExp.AR.result.text = r[1].textContent;
                    metaExp.AR.result.date = _ut.dtFromTd(r[0]);
                    brk = true;
                  }
              break;
          }
         
        });
        
                
        evBus.on("ControlesJuntadaAR.continueProcess", function(){
          /* extração informações para termo de juntada */
          metaExp.desinatario = {};
          metaExp.desinatario.formPJe = (function(){
            try{
              var _ = null;
              forEach(winRegInt.doc.getElementsByClassName('name'), function(eNm){
                if(!(_))
                  if(eNm.textContent.trim() === 'Parte')
                    _ = eNm.nextSibling.nextSibling.innerHTML.trim();
              });
              return _;
            }catch(e){
              return null;
            }
          })();

          metaExp.regIntWinParams = j2.mod._._urlParseParams(winRegInt.win.location.href);
          metaExp.descCont = winExp.gE('AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR').textContent.trim();


          /* registrando informações obtidas */
          /* formularios PJe */
          _.winReg.cadDoc.ar.number.value = metaExp.AR.Num;
          _.winReg.cadDoc.ar.result.value = _ut.trRES(metaExp.AR.result);
          _.winReg.cadDoc.ar.date.value =  _ut.dtStr(metaExp.AR.result.date);
          _.winReg.cadDoc.doc.desc.value = 'Juntada AR ' + _ut.trRES(metaExp.AR.result, true);
          _.winReg.cadDoc.doc.numDoc.value = metaExp.AR.Num;

          /* termo de juntada */
          _.winExp.numeroAR.firstChild.innerHTML = metaExp.AR.Num; 
          _.winExp.ids.expediente.firstChild.innerHTML = metaExp.regIntWinParams.id;
          _.winExp.ids.processoDoc.firstChild.firstChild.innerHTML = '';
          _.winExp.ids.processoDoc.firstChild.firstChild.appendChild(metaExp.idInfo.html.spn);
          _.winExp.descricaoCarta.firstChild.innerHTML = metaExp.descCont;
          _.winExp.destinatario.firstChild.innerHTML = metaExp.desinatario.formPJe;

          _.winExp.resultado.frase.firstChild.firstChild.innerHTML = (metaExp.AR.result.positive) ? 'entregue em' : 'frustrada sob o motivo';
          _.winExp.resultado.complemento.firstChild.firstChild.innerHTML = (metaExp.AR.result.positive) ? _ut.dtStr(metaExp.AR.result.date) : _ut.trRES(metaExp.AR.result, true);

          /*table treatmente to insert*/
          while(_.winExp.rastSpan.firstChild)
            _.winExp.rastSpan.firstChild.remove();

          var _c = 0;
          forEach(metaExp.rastreamento.getElementsByTagName('td'), function(td){
            _ut.frmtTd(td, ((_c % 2)===0));
            _c++;
          });
          j2.mod._.styleSetter(metaExp.rastreamento, 'juntARRastTable');
          _.winExp.rastSpan.appendChild(metaExp.rastreamento);


          if(mod.par.win.opener){
            var tiId;
            evBus.once('beforeFihishEdition', function(){
              var scrp = document.createElement('script');
              scrp.type = 'text/javascript';
              scrp.charset = 'UFT-8';
              scrp.defer = true;
              scrp.async = true;
              var prm = '{ description : "' + metaExp.descCont + ' ' + metaExp.desinatario.formPJe + '",';
              prm += ' type : ' + _ut.anxTypeArGet + ',';
              prm += ' numDoc : "' + metaExp.AR.Num + '" }';

              scrp.text = '(' + pkg.ControlesJuntadaAR.openerScriptOnFinish + ')("' + metaExp.desinatario.formPJe + '", ' + prm + ')';
              mod.par.win.opener.document.body.appendChild(scrp);
            }); 
          }

          /* try set event -0*/
          evBus.once('beforeFihishEdition', 999, function(){
            _.winReg.saveButton.click();
          });

          pkg.ModalDialog.ok('Dados extraídos. Certifique-se que as inserções condizem com os dados reais antes de salvar e assinar.', 'aditionalControls j2 - Atenção', 'ControlesJuntadaAR.onFinishExtraction');

          evBus.once('ControlesJuntadaAR.onFinishExtraction', function(){
            if(!metaExp.AR.result.positive)
            pkg.ModalDialog.ok('ATENÇÃO!!! AR NEGATIVO!!!.', 'aditionalControls j2 - Atenção');
          });
        });
        
        if(metaExp.AR.result.unreadable){
          var _m;
          switch (metaExp.AR.result.code){
            case 'NOT DEV':
              _m = 'O rastreamento não parece indicar enrega ao destinatário ou devolução ao remetente!. Continuar mesmo assim como se AR tivesse sido devolvido à unidade? Caso não, favor informar dados manualmente.';
              pkg.ModalDialog.okCancel(_m, 'aditionalControls j2 - Atenção', 'ControlesJuntadaAR.continueProcess');
              return;
              break;
            default:
              _m = 'Erro de interpretação indefinido.';
              pkg.ModalDialog.ok(_m + ' Favor inserir dados manualmente.', 'aditionalControls j2 - Atenção');
              return;
              break;
          } 
        }
        evBus.fire('ControlesJuntadaAR.continueProcess');
      },
      openerScriptOnFinish : function(winName, v){
        window.j2 = {
          oprSup : {
            regInt : {
              win : (function(){
                return window.open('' , winName);
              })(),
              gE : function(e){
                return window.j2.oprSup.regInt.win.document.getElementById(e);
              }
            },
            sub : {
              tIId : null,
              once : false,
              routine : function(){
                var incAnx = {
                  description : window.j2.oprSup.regInt.gE('j_id214:0:descDoc'),
                  type : window.j2.oprSup.regInt.gE('j_id214:0:tipoDoc'),
                  numDoc : window.j2.oprSup.regInt.gE('j_id214:0:numeroDoc')
                };
                if(!(incAnx.description))
                  return;
                
                if(window.j2.oprSup.sub.once)
                  return;
                
                incAnx.description.value = v.description;
                incAnx.type.value = v.type(incAnx.type);
                incAnx.numDoc.value = v.numDoc;

                window.j2.oprSup.sub.chngDisp(incAnx.type);                
                window.j2.oprSup.sub.chngDisp(incAnx.description);
                window.j2.oprSup.sub.chngDisp(incAnx.numDoc);
                window.clearInterval(window.j2.oprSup.sub.tIId);
                
                window.j2.oprSup.sub.once = true;
              },
              run : function(){
                window.j2.oprSup.sub.tIId = window.setInterval(window.j2.oprSup.sub.routine, 200);
              },
              chngDisp : function(e){
                if ('createEvent' in document){
                    var evt = document.createEvent('HTMLEvents');
                    evt.initEvent('change', false, true);
                    e.dispatchEvent(evt);
                }else
                    e.fireEvent('onchange');
              }
            }
          }
        };
        
        /* run */
        window.j2.oprSup.sub.run();
        window.console.log('Sub rotina Opener runned');
      },
      cleanAction : function(event, _){
        while(_.pastArea.firstChild)
            _.pastArea.firstChild.remove();
      },
      changeAction : function(event, _){
        if(!(_.pastArea.textContent.length > 50)){
          _.extFormAction.setAttribute('disabled', 'true');
          pkg.ControlesJuntadaAR.cleanAction(event, _);
          pkg.ModalDialog.ok('O conteúdo colado não é muito curto para ser um rastreamento válido.', 'j2 - AdditionalControls');
          return;
        }
          
        if(_.pastArea.getElementsByTagName('table').length === 0){
          _.extFormAction.setAttribute('disabled', 'true');
          pkg.ControlesJuntadaAR.cleanAction(event, _);
          pkg.ModalDialog.ok('O conteúdo colado não é válido para processamento. Históricos de AR possuem ao menos uma tabela. Não foi encontrado nenhuma tabela.', 'j2 - AdditionalControls');
          return;
        }
        
        _.extFormAction.removeAttribute('disabled');
      },
      remove : function(){
        var _ = mod.edt.gE('ControlesJuntadaAR.Div');
        if(_)
          _.remove();
      }
    };
    
    
    pkg.SentencaServicoTerceiro = {
      constructor_ : function(){
        j2.env.PJeVars.julgamento = {
          multaCominatoria : 200,
          danoMoralPadrao : 1000
        };
        
        
        var _ = {
          sentenca : {
            danoMaterial : {
              fundamento : {
                simples : mod.exp.gE('danoMaterial-simples'),
                dobro : mod.exp.gE('danoMaterial-dobro')
              },
              dispositivo : mod.exp.gE('dispositivo-danoMaterial')
            },
            danoMoral : {
              fundamento : {
                fixacao : mod.exp.gE('danoMoral-fixacao')
              },
              dispositivo : mod.exp.gE('dispositivo-danoMoral')
            },
            confirmacaoLiminar : {
              dispositivo : {
                multa : mod.exp.gE('dispositivo-multaCominatoria')
              }
            }
          },
          fields : {
            danoMaterial : {
              simples : mod.edt.gE('SentencaServicoTerceiro:DanoMaterial:Simples'),
              dobro : mod.edt.gE('SentencaServicoTerceiro:DanoMaterial:Dobro')
            },
            danoMoral : mod.edt.gE('SentencaServicoTerceiro:DanoMoral'),
            multaCominatoria : mod.edt.gE('SentencaServicoTerceiro:MultaCominatoria')
          }
        };
               
        _.fields.danoMaterial.simples.onkeypress = function(event){
          pkg.monetario.formatation.filtraNumeros(_.fields.danoMaterial.simples, 16, event);
        };
        _.fields.danoMaterial.simples.onkeyup = function(event){
          pkg.monetario.formatation.formataValor(_.fields.danoMaterial.simples, 16, event);
          pkg.monetario.writeExtense(_.sentenca.danoMaterial.fundamento.simples, _.fields.danoMaterial.simples);
          
          var dobro = pkg.monetario.parseDoubleDinheiro(_.fields.danoMaterial.simples.value);
          if(!(dobro)){
            alert('bosta');
            return;
          }
          dobro = dobro*2;
          dobro = 
          _.fields.danoMaterial.dobro.value = dobro.toFixed(2);
          
          pkg.monetario.formatation.formataValor(_.fields.danoMaterial.dobro, 16, event);
          pkg.monetario.writeExtense(_.sentenca.danoMaterial.fundamento.dobro, _.fields.danoMaterial.dobro);
          pkg.monetario.writeExtense(_.sentenca.danoMaterial.dispositivo, _.fields.danoMaterial.dobro);
        };        
        
        _.fields.danoMoral.onkeypress = function(event){
          pkg.monetario.formatation.filtraNumeros(_.fields.danoMoral, 16, event);
        };
        _.fields.danoMoral.onkeyup = function(event){
          pkg.monetario.formatation.formataValor(_.fields.danoMoral, 16, event);          
          pkg.monetario.writeExtense(_.sentenca.danoMoral.dispositivo, _.fields.danoMoral);
          pkg.monetario.writeExtense(_.sentenca.danoMoral.fundamento.fixacao, _.fields.danoMoral);
        };     
        _.fields.danoMoral.onchange = _.fields.danoMoral.onkeyup;
             
        
        _.fields.multaCominatoria.onkeypress = function(event){
          pkg.monetario.formatation.filtraNumeros(_.fields.multaCominatoria, 16, event);
        };
        _.fields.multaCominatoria.onkeyup = function(event){
          pkg.monetario.formatation.formataValor(_.fields.multaCominatoria, 16, event);          
          pkg.monetario.writeExtense(_.sentenca.confirmacaoLiminar.dispositivo.multa, _.fields.multaCominatoria);
        };     
        _.fields.multaCominatoria.onchange = _.fields.multaCominatoria.onkeyup;
       
       //Initial values
        _.fields.multaCominatoria.value = j2.env.PJeVars.julgamento.multaCominatoria.toFixed(2);
        _.fields.multaCominatoria.onchange();
        _.fields.danoMoral.value = j2.env.PJeVars.julgamento.danoMoralPadrao.toFixed(2);
        _.fields.danoMoral.onchange();
        
        
        //Highlights
        var __ = [];
        
        __.push(_.sentenca.danoMaterial.fundamento.simples);
        __.push(_.sentenca.danoMaterial.fundamento.dobro);
        __.push(_.sentenca.danoMaterial.dispositivo);
        __.push(_.sentenca.danoMoral.fundamento.fixacao);
        __.push(_.sentenca.danoMoral.dispositivo);
        __.push(_.sentenca.confirmacaoLiminar.dispositivo.multa);
        
        
        forEach(__, function(e){
          jQ3(e).addClass('HLField');
        });
        
        pkg.SentencaServicoTerceiro.setEvents(__);
      },
      setEvents : function(__){
        evBus.on('beforeFihishEdition', function(){
          forEach(__, function(e){
            jQ3(e).removeClass('HLField');
          });
        }); 
      },
      remove : function(){
        var _ = mod.edt.gE('SentencaServicoTerceiro.div');
        if(_)
          _.remove();
      }
    };
    
    pkg.DecisaoServicoTerceiro = {
      constructor_ : function(){
        j2.env.PJeVars.julgamento = {
          multaCominatoria : 200,
          danoMoralPadrao : 1000
        };
        
        
        var _ = {
          decisao : {
            denominacao : (function(){
              var a = [];
              forEach(mod.exp.doc.getElementsByTagName('span'), function(e){
                if(e.id==='denominacaoServico')
                  a.push(e);
              });
              return a;
            })(),
            linhas : mod.exp.gE('telefonesServico')
          },
          fields : {
            denominacao : mod.edt.gE('DecisaoServicoTerceiro:Denominacao'),
            linhas : mod.edt.gE('DecisaoServicoTerceiro:Linhas')
          }
        };
               
        _.fields.denominacao.onchange = function(event){
          forEach(_.decisao.denominacao, function(e){
            e.innerHTML = _.fields.denominacao.value;
          });
        };
        _.fields.linhas.onchange = function(event){
          _.decisao.linhas.innerHTML = _.fields.linhas.value;
        };              
        
        //Highlights
        var __ = [];
        
        forEach(_.decisao.denominacao, function(e){
          __.push(e);
        });
        __.push(_.decisao.linhas);
        
        
        forEach(__, function(e){
          jQ3(e).addClass('HLField');
        });
        
        pkg.DecisaoServicoTerceiro.setEvents(__);
      },
      setEvents : function(__){
        evBus.on('beforeFihishEdition', function(){
          forEach(__, function(e){
            jQ3(e).removeClass('HLField');
          });
        }); 
      },
      remove : function(){
        var _ = mod.edt.gE('DecisaoServicoTerceiro.div');
        if(_)
          _.remove();
      }
    };
    
    pkg.InputTelefone = { // ndlg2
      _ : [],
      constructor_ : function(args, el){
        var _ = pkg.InputTelefone._[pkg.InputTelefone._.length] = {
          uuid : window.j2.mod._._guid(),
          inputField : $(el.edt).find('#telefoneParte-input'),
          div : $(el.edt).find('#InputTelefone-div'),
          button : $(el.edt).find('#inputAdd-button'),
          getTels : function(){
            if(!(this._c))
              return this.inputField.val();
            
            var _tels = [];
            _tels.push(this.inputField.val());
            this._c.forEach(function(e){
              _tels.push(e.val());
            });
            
            return _tels.joinListE();
          }
        };
        _.inputField[0].id += '-' +_.uuid;
        _.div[0].id += '-' +_.uuid;
        _.button[0].id += '-' +_.uuid;
        
                            
        _.button.click(function(){
          var _ldiv = _.div.clone(false);          
          _.div.parent().append(_ldiv);
         
          _ldiv.find('#div-add').remove();
          _ldiv.find('#div-Ctrl').css('width','100%');
          
          if(!(_._c))
            _._c = [];
          
          _._c.push( _ldiv.find('input') );
          var _i = last(_._c);
          _i[0].id += '--' + _._c.length;
          _i.val('');
                    
          _msk.mask( _i );
          
          evBus.fire('Editor.onResize');  
        });
        
        var _inputFieldChangeComplete = function(env){
          j2.mod._.styleSetter(env.currentTarget, 'fieldError', true);
          
          evBus.fire("InputTelefone.onChange", _);
          evBus.fire("InputTelefone.onChange."+_.uuid, _);
        };
        
        var _inputFieldChangeIncomplete = function(env){
          j2.mod._.styleSetter(env.currentTarget, 'fieldError');
        };
        
        /* contexto is mod.edt jqueries */
        var _msk = mod.edt.win.Inputmask('(99) 99999-9999', {
          'oncomplete': _inputFieldChangeComplete, 
          'onincomplete': _inputFieldChangeIncomplete 
        });
        _msk.mask( _.inputField );
        
        evBus.fire("InputTelefone.onCreate", _);
      }
    };
    
    pkg.GeneralDatePicker = {
      _ : [],
      constructor_ : function(args, el){
        var _ = pkg.GeneralDatePicker._[pkg.GeneralDatePicker._.length] = {
          uuid : window.j2.mod._._guid(),
          div : $(el.edt).find('#General-DatePicker-Div'), // ndlg6
          inputField : $(el.edt).find('#General-DatePicker-input'), // ndlg6
          autoHide : new window.j2.mod._._autoHide(['div']), // ndlg6
          _delete : new window.j2.mod._._del(pkg.GeneralDatePicker) // ndlg6
        };
        
        var _change = function(){ // ndlg6
          evBus.fire("General.DatePicker.onChange", _);
          evBus.fire("General.DatePicker.onChange."+_.uuid, _); // ndlg5
        };
        
        /* contexto is mod.edt jqueries */
        var _$ = mod.edt.win.jQ3;
        _$( _.inputField ).datepicker({
          numberOfMonths: 1,
          "z-index" : 9999,
          showButtonPanel: false,
          maxDate: args.maxDate || "+0D", // fdt
          minDate: args.minDate || null, // fdt
          dateFormat : "dd/mm/yy",
          onSelect : function(dateText, inst){ // ndlg6
            _change();
          }
        });
        
        evBus.fire("General.DatePicker.onCreate", _);
        
        _.inputField.change(_change); // ndlg6
      }
    };
    
    pkg.DiligenciaOficio = { // ndlg5 as new
      _ : [],
      constructor_ : function(args, el){
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : $(el.edt).find('#Diligencia-Oficio-mainDiv'),
          selPapel : $(el.edt).find('#Diligencia-Oficio-papel'),
          numero : $(el.edt).find('#Diligencia-Oficio-numero'),
          destinatario : $(el.edt).find('#Diligencia-Oficio-destinatario'),
          recebedor : $(el.edt).find('#Diligencia-Oficio-recebedor'),
          recebedorCargo : $(el.edt).find('#Diligencia-Oficio-recebedorCargo'),
          autoHide : new window.j2.mod._._autoHide(['div'], this),
          _delete : new window.j2.mod._._del(pkg.DiligenciaOficio) // ndlg6
        };
        pkg.DiligenciaOficio._.push(_);
        
        /* contexto is mod.edt jqueries */
        /*var _$ = mod.edt.win.jQ3;
        _$( _.inputField ).datepicker({
          numberOfMonths: 1,
          showButtonPanel: false,
          maxDate: "+0D",
          dateFormat : "dd/mm/yy"
        });*/
        
        
        evBus.fire("Diligencia-Oficio.onCreate", _);
        
        var _baseEvBusFire = function(ev){
          _.__jQEvent = ev;
          evBus.fire("Diligencia-Oficio.onChange", _);
          evBus.fire("Diligencia-Oficio.onChange."+_.uuid, _);
        };
        
        forEach(_, function(el){
          if(el.change && !( el.prop('id').match(/Diligencia-Oficio-mainDiv/) ) )
            el.change( function(ev){
              ev._triggerEl = el;
              _baseEvBusFire(ev);
            });
        });
        /*_.selPapel.change( function(ev){
          _baseEvBusFire(ev);
        });
        _.numero.change( function(ev){
          _baseEvBusFire(ev);
        });*/
        
      }
    };
    
    pkg.DiligenciaCNPJ = { // ndlg5 as new
      _ : [],
      constructor_ : function(args, el){
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : $(el.edt).find('#Diligencia-CNPJ-mainDiv'),
          selPapel : $(el.edt).find('#Diligencia-CNPJ-papel'),
          recebedor : $(el.edt).find('#Diligencia-CNPJ-recebedor'),
          recebedorCargo : $(el.edt).find('#Diligencia-CNPJ-recebedorCargo'),
          autoHide : new window.j2.mod._._autoHide(['div']),
          _delete : new window.j2.mod._._del(pkg.DiligenciaCNPJ) // ndlg6
        };
        pkg.DiligenciaCNPJ._.push(_);
              
        var _baseEvBusFire = function(ev){
          _.__jQEvent = ev;
          evBus.fire("Diligencia-CNPJ.onChange", _);
          evBus.fire("Diligencia-CNPJ.onChange."+_.uuid, _);
        };
        
        forEach(_, function(el){
          if(el.change && !( el.prop('id').match(/Diligencia-CNPJ-mainDiv/) ) )
            el.change( function(ev){
              ev._triggerEl = el;
              _baseEvBusFire(ev);
            });
        });
        
        evBus.fire("Diligencia-CNPJ.onCreate", _);
        
      }
    };
    
    pkg.GeneralTimePicker = {  // ndlg2
      _ : [],
      constructor_ : function(args, el){
        var _ = pkg.GeneralTimePicker._[pkg.GeneralTimePicker._.length] = {
          uuid : window.j2.mod._._guid(),
          div : $(el.edt).find('#General-TimePicker-Div'), // ndlg6
          inputFieldHour : $(el.edt).find('#General-TimePicker-input-hour'),
          inputFieldMinute : $(el.edt).find('#General-TimePicker-input-minute'),
          dotsSpan : $(el.edt).find('span'),
          getTime : function(reObj){
            if( !(this.inputFieldHour.val().length) || !(this.inputFieldMinute.val().length ) )
              return reObj ? { isValid : false, min : null, hr : null, str : '00:00'} :'00:00'  ;
            
            return reObj ? { 
              isValid : true, 
              min : this.inputFieldMinute.val(), 
              hr : this.inputFieldHour.val(),
              str : this.inputFieldHour.val() + ':' + this.inputFieldMinute.val()
            } : this.inputFieldHour.val() + ':' + this.inputFieldMinute.val();
          },
          autoHide : new window.j2.mod._._autoHide(['div']),
          _delete : new window.j2.mod._._del(pkg.GeneralTimePicker) // ndlg6
        };
        
        /* contexto is mod.edt jqueries */
        var _$ = mod.edt.win.jQ3;
        _$( _.inputFieldHour ).timepicker({
          timeFormat : 'H',
          step : 60
        });
        _$( _.inputFieldMinute ).timepicker({
          timeFormat : 'i',
          step : 1,
          maxTime: 3600
        });
        
        var _change = function(){
          evBus.fire("General-TimePicker.onChange", _);
          evBus.fire("General-TimePicker.onChange." + _.uuid, _); // ndlg6
        };
        
        evBus.fire("General-TimePicker.onCreate", _);
        
        _.inputFieldHour.change(_change);
        _.inputFieldMinute.change(_change);
        
      }
    };
    
    pkg.DocEditorCoreAddCtrls = { // wa as new
      constructor_ : function(args, el){   
        var win = (args) ? ((args.j2Win) ? args.j2Win : null): null;
        
        if(!(args.j2Win))
          j2.err('pkg.DocEditorCoreAddCtrls: a definição de args.win é obrigatória para essa classe');
        
        if(args){
          if((args.width) && (args.height))
            pkg.DocEditorCoreAddCtrls.size = {
              width : args.width,
              height : args.height
            };
          
          if(args.subTitle){
            $(el.edt).find('#DocEditorCoreAddCtrls-subTitle_').html(args.subTitle);
            $(el.edt).find('#DocEditorCoreAddCtrls-subTitle').css('display', '');
          }
          
          if(args.importLib){ // tappac as new
            forEach(args.importLib, function(lib){
              var art;
              if(lib.artifact){
                art = parseVar(lib.artifact);
                if(art)
                j2.mod.com.libLoader(art, {
                  doc : args.j2Win.doc,
                  loc : 'head'
                });
              }
            });
          }
        }  
                
        var _ = {
          closeButton : $(el.edt).find('#DocEditorCoreAddCtrls-closeButtonAction'),
          uuid : window.j2.mod._._guid()
        };
        
        
        _.closeButton.click(function(){
          pkg.ModalDialog.okCancel('Fechar' + ((args.subTitle) ? ' ' + args.subTitle + '?' : "?"), 'Modelos j2 - Confrimação', 'DocEditorCoreAddCtrls.closeConfirmation.' + _.uuid, 'docEditorCore.onCancelClose', null, {edt : win.doc.body, j2Win : win});
        });
        
        pkg.DocEditorCoreAddCtrls.setEvents(args, el, _, win);
      },
      setEvents : function(args, el, _, j2Win){   
        evBus.on('DocEditorCoreAddCtrls.closeConfirmation.' + _.uuid, function(event){
          j2Win.win.close();
        });
      }
    };
    
    pkg.ParteWhatsapp = { // wa as new
      constructor_ : function(args, el){                   
        pkg.ParteWhatsapp.setEvents();
      },
      setEvents : function(){   
        //evBus.fire("afterChange." + _.select.id, _.select.value, _.select, selI, appd.body, _);
        evBus.on('afterChange.seletorPessoaWhatsapp', function(event, id, value, select, selI, body){
          var _s = filter(j2.mod.clsCnstr.Selector.instances, {id : 'whatsAppMessages'}); 
          var _s = (_s.length) ? _s.slice(-1)[0] :  null ; 
          
          _s && _s.monitr.changeList && _s.monitr.changeList();
        });
      }
    };
    
    pkg.LoadingSpinner = {
      _ : [],
      constructor_ : function(args, el){
        console.warn('LoadingSpinner');
        return;
        
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : $(el.edt).find('#General-DatePicker-Div'), // ndlg6
          inputField : $(el.edt).find('#General-DatePicker-input'), // ndlg6
          autoHide : new window.j2.mod._._autoHide(['div']), // ndlg6
          _delete : new window.j2.mod._._del(pkg.GeneralDatePicker) // ndlg6
        };
        pkg.GeneralDatePicker._.push(_);
        
        
        var _change = function(){ // ndlg6
          evBus.fire("General.DatePicker.onChange", _);
          evBus.fire("General.DatePicker.onChange."+_.uuid, _); // ndlg5
        };
        
        /* contexto is mod.edt jqueries */
        var _$ = mod.edt.win.jQ3;
        _$( _.inputField ).datepicker({
          numberOfMonths: 1,
          showButtonPanel: false,
          maxDate: "+0D",
          dateFormat : "dd/mm/yy",
          onSelect : function(dateText, inst){ // ndlg6
            _change();
          }
        });
        
        evBus.fire("General.DatePicker.onCreate", _);
        
        _.inputField.change(_change); // ndlg6
        
        
      }
    }; // tappac
    
    pkg.FormularioPresenca = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle){
        ____POLOS_NOMES___ = {
          poloAtivo : 'polo ativo',
          poloPassivo : 'polo passivo',
          outrosInteressados : 'outros interessados'
        };
        
        if(!args.ExpLinkedEl){
          j2.err('Obrigatório a definição contructParam "ExpLinkedEl" para pkg.FormularioPresenca');
          alert('###ERRO: Obrigatório a definição contructParam "ExpLinkedEl" para pkg.FormularioPresenca');
          return;
        }
        
        var _ = {
          uuid : window.j2.mod._._guid(),
          linkedEl : jQ3('span#trmAud-Abertura-Presenca-editarFormulario_li span#'+args.ExpLinkedEl, mod.exp.doc.body)
        };
        pkg.FormularioPresenca._.push(_);
        
        if(_.linkedEl.length === 0){
          j2.err('"ExpLinkedEl" Não encontrado');
          alert('###ERRO: "ExpLinkedEl" Não encontrado');
          return;
        }
        
        _.linkedEl.empty();
        
        pkg.FormularioPresenca.buildChildren(args, el, classModdle, _);
      },
      buildChildren : function(args, el, classModdle, _){      
        
        evBus.on("FormularioPresenca-ProcessPolos", function(ev){
          if( !(el.j2Win.win.jQ3) || !(el.j2Win.win.jQ3.ui) || !(isFunction(el.j2Win.win.jQ3('<input>').datepicker)) /*&& window.coisa*/ ){
            setTimeout(function(){
              evBus.fire('FormularioPresenca-ProcessPolos');
            }, 100);
            return;
          }
          evBus.off("FormularioPresenca-ProcessPolos"); 
          
          forEach(j2.env.PJeVars.partes.list, function(pPolo, name, original){
            if( ( ! isObject(pPolo) ) || (name === 'todasPartes') || (pPolo.length === 0) )
              return;
            
            var _context = {
              load : {
                pPolo : pPolo,
                name  : name,
                original : original,
                poloNome : ____POLOS_NOMES___[name],
                formularioPresencaContext : el,
                formularioPresencaIns : _
              },
              uuid : window.j2.mod._._guid(),
              exp : jQ3('<div>')[0],
              edt : el.j2Win.win.jQ3('<div>')[0],
              j2Win : el.j2Win
            };
            
            defer(function(){
              pkg.AddtionalControls.append(_context, 'FP-Polo', '1.0', { resizeOnFinish : true } );
            });
          });
        });
        
        try{
          if(j2.env.PJeVars.partes.list._processedAll){
            evBus.fire('FormularioPresenca-ProcessPolos');
          }else{
            evBus.on("afterProcess.PJeVars.Partes.List-infoPessoa-processedAll", function(ev){
              evBus.fire('FormularioPresenca-ProcessPolos');
            });
          }
        }catch(e){
          
        }
        return;        
      }
    };
    
    pkg.FPPolo = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle){       
        var _ = {
          uuid : window.j2.mod._._guid(),
          bAddParte : jQ3(el.edt).find('button#FPPolo-addParteAction'),
          sPoloName : jQ3(el.edt).find('span#formularioPresenca-polo'),
          FPParte : []
        };
        pkg.FPPolo._.push();
        
        
        jQ3('span#formularioPresenca-polo', el.edt).text(el.load.poloNome.toUpperCase());
        
        _.bAddParte.click(function(){
          var idx = _.FPParte.length;  
          var partePJe = pkg.FPPolo.getPseudoParte(_);
          var versao = (_.FPParte.length) ? '1.1' : '1.0';
          
          pkg.FPPolo.buildChild(args, el, classModdle, _, el.load.pPolo, idx, partePJe, versao, true);  
          
        });
      
        pkg.FPPolo.buildChildren(args, el, classModdle, _);
      },
      buildChildren : function(args, el, classModdle, _){  
        var _FPPoloEls = [];
        
        jQ3(el.edt).children().each(function(a,b,c){
          $(el.load.formularioPresencaContext.edt).find('table#FormularioPresencaTable tbody#FPPolo-Childs').append(b);
          _FPPoloEls.push(b);
        });
        jQ3(el.exp).children().each(function(a,b,c){
          jQ3(el.load.formularioPresencaIns.linkedEl).append(b);
          _FPPoloEls.push(b);
          _._FPPoloEls__spanFPPolo = b;
        });
        
        _._FPPoloEls = _FPPoloEls;
        
        forEach(el.load.pPolo, function(partePJe, idx, pPolo){
          pkg.FPPolo.buildChild(args, el, classModdle, _, pPolo, idx, partePJe);
        });
      },
      buildChild : function(args, el, classModdle, _, pPolo, idx, partePJe, version, manualAction){  
        var _context = {
          load : {
            __super : el.load,
            pPolo : pPolo,
            idx  : idx,
            parte : partePJe,
            FPPoloContextEls : _._FPPoloEls, 
            formularioPresencaIns : el.load.formularioPresencaIns,
            manualAction : manualAction,
            FPPolo : _
          },
          uuid : window.j2.mod._._guid(),
          exp : jQ3('<div>')[0],
          //edt : jQ3('<div>')[0],
          edt : el.j2Win.win.jQ3('<div>')[0],
          j2Win : el.j2Win
        };

        defer(function(){
          pkg.AddtionalControls.append(_context, 'FP-Parte', version || '1.0', { resizeOnFinish : true } );
        });
      },
      getPseudoParte : function(polo){
        return {
          CPFCNPJ: "000.000.000-00",
          a: {},
          endereco: {},
          exibicao: "XXXXParteXXXX - CPF: 000.000.000-00 (DEMANDANTE)",
          meiosContato: {},
          nome: "XXXXParteXXXX",
          papel: "DEMANDANTE",
          polo: {
            UCase: 'DEMANDANTE', 
            LCase: 'demandante', 
            Capt: 'Demandante', 
            parte: {
              Capt: "Demandante",
              LCase: "demandante",
              UCase: "DEMANDANTE"
            }
          },
          representados: [
            polo
          ]
        };
      }
    };
    
    pkg.FPParte = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle){      
        var ___CNPJ_PARTE_LENGTH___ = 18;
        
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : jQ3(el.edt).find('div#FPParteOpsPresenca-mainDiv'),
          bAddAdv : jQ3(el.edt).find('button#FPParte-addAdvogadoAction'),
          span : jQ3(el.exp).find('span#FPParte'),
          autoHide : new window.j2.mod._._autoHide(['div','span', 'bAddAdv']),
          _delete : new window.j2.mod._._del(pkg.FPParte),
          exp : {
            presenca : jQ3('span#FPParte-presenca', el.exp),
            papel : jQ3('span#FPParte-papel', el.exp),
            nome : jQ3('span#FPParte-nome', el.exp),
            representante : jQ3('span#FPParte-representante', el.exp),
            representantePapel : jQ3('span#FPParte-representante-papel', el.exp),
            representanteNome : jQ3('span#FPParte-representante-nome', el.exp),
            acompanhamento : jQ3('span#FPParte-acompanhamento', el.exp),
            advogados : jQ3('span#FPParte-advogados', el.exp)
          },
          FPAdvogado : [],
          divTreeLine : jQ3(el.edt).find('div#FPParte-divLine'),
          trs : jQ3('tr', el.edt)
        };
        inherits(el, _, "FPParte", ["FPPartePresencaAusencia", "FPParteNameFieldAndDel", "FPParteOpsPresenca"]);
        pkg.FPParte._.push(_);
        el.load.parte.FPParte = _;
        el.load.FPPolo.FPParte.push(_);
        _.partePJe = el.load.parte;
        _.FPPolo = el.load.FPPolo;
                       
        forEach(_.exp, function(prop){
          prop.change(function(){
            var _this = jQ3(this);
            _this.addClass('HLField');
            setTimeout(function(){
              _this.removeClass('HLField');
            }, 6000);
          });
        });
        
        _.divTreeLine.attr('uuid', _.uuid);
        
        
        //papel
        _.exp.papel.text( el.load.parte.papel.toUpperCase() ).change();
        
        //nome
        _.$FPParteNameFieldAndDel.parteNome.val(el.load.parte.nome.toUpperCase());
        _.$FPParteNameFieldAndDel.spanNome.text(el.load.parte.nome.toUpperCase());
        _.exp.nome.text(_.$FPParteNameFieldAndDel.parteNome.val().toUpperCase() ).change();
        
        
        _.$FPParteNameFieldAndDel.parteNome.change(function(){
          _.exp.nome.text(_.$FPParteNameFieldAndDel.parteNome.val().toUpperCase() ).change();
        });
        
        //presença
        _.$FPPartePresencaAusencia.select.change(function(){
          var _selOp = _.$FPPartePresencaAusencia.select.find('option:selected');
          
          _.exp.presenca.text(_selOp.attr('j2Text').capt()).change();
          _.exp.representante[( _selOp.val().match(/ausente/) ? 'hide' : 'show' )]();                    
                    
          _.$FPParteOpsPresenca.autoHide( _selOp.val().match(/ausente/) ? true : false );
          _.$FPPartePresencaAusencia.selectAus[( _selOp.val().match(/ausente/) ? 'show' : 'hide' )]();
          if(_selOp.val().match(/ausente/)){
            _.$FPPartePresencaAusencia.selectAus.change();
          }
          
          forEach(_.FPAdvogado, function(adv){
            adv.$FPPartePresencaAusencia.select.change();
          });
        });
        //ausencia
        _.$FPPartePresencaAusencia.selectAus.change(function(){
          var _selOp = _.$FPPartePresencaAusencia.selectAus.find('option:selected');
          
          _.exp.acompanhamento.text( _selOp.attr('j2Text') ).change();
          /*_.$FPParteOpsPresenca.autoHide( _selOp.val().match(/ausente/) ? true : false );
          _.$FPPartePresencaAusencia.selectAus[( _selOp.val().match(/ausente/) ? 'show' : 'hide' )]();*/
        });
        
        //na pessoa do representante
        if(el.load.parte.CPFCNPJ.length === ___CNPJ_PARTE_LENGTH___)
          _.$FPParteOpsPresenca.slPapel.val('preposto');
        else
          _.$FPParteOpsPresenca.slPapel.val('pessoalmente');
        
        _.$FPParteOpsPresenca.slPapel.change(function(){
          if(!(_.$FPParteOpsPresenca.slPapel.val().match(/pessoalmente/))){
            _.exp.representantePapel.text( _.$FPParteOpsPresenca.slPapel.find('option:selected').attr('j2Text') ).change();
            _.exp.representante.show();
          }else{
            _.exp.representante.hide();
          }
        });
        _.$FPParteOpsPresenca.slPapel.change();

        
        //acompanhamento
        if(!(el.load.parte.advogado)){
          _.exp.acompanhamento.text('desacompanhado(a) de advogado').change();
          _.exp.advogados.hide();
        }else{
          _.exp.acompanhamento.text('acompanhado do(a)(s) advogado(a)(s) ').change();
          _.exp.advogados.show().change();
        }
        
        //nome representante
        _.$FPParteOpsPresenca.ipNomeRep.change(function(){
          var _v = _.$FPParteOpsPresenca.ipNomeRep.val();
          _.exp.representanteNome.text( ( _v.length === 0) ? 'XXXNomePrepostoXXX': _v.toUpperCase() ).change();
        });
        
        _.bAddAdv.click(function(){
          var adv = pkg.FPParte.getPseudoAdvogado(_.partePJe);
          var idx = _.FPAdvogado.length;  
          var parte = _.partePJe;
          var versao = (_.FPAdvogado.length) ? '1.1' : '1.0';
          
          pkg.FPParte.buildChild(args, el, classModdle, _, adv, idx, el.load.parte.advogado, parte, versao, true); 
        });
        
        if(el.load.manualAction){
          _.$FPParteNameFieldAndDel.butEdit.click();
          _.$FPParteNameFieldAndDel.parteNome.val('');
          _.$FPParteNameFieldAndDel.oabNum.val('');
        }
        
        pkg.FPParte.buildChildren(args, el, classModdle, _);
                
        pkg.FPParte.setEVents(_);
        
        evBus.fire('FormularioPresenca.onChangeActor');
      },
      setEVents : function(_){
        evBus.on('FormularioPresenca.onChangeActor', function(){
          pkg.FPParte.adjustdivTreeLine(_);
        });
        
        evBus.on('FPParteNameFieldAndDel.onDelete.' + _.$FPParteNameFieldAndDel.uuid, function(){
          forEach(_.exp, function(_elE){
            _elE.remove();
          });
          _.trs.remove();
                    
          forEach(_.FPPolo.FPParte, function(prt, idx){
            if(prt && prt.uuid === _.uuid)
              _.FPPolo.FPParte.splice(idx, 1);
          });
                               
          _.$FPPartePresencaAusencia.autoHide();
          _.$FPPartePresencaAusencia._delete();
          
          
          _.autoHide();
          _._delete();
        });
      },
      buildChildren : function(args, el, classModdle, _){  
        
        var _FPParteEls = [];
        jQ3(el.edt).children().each(function(a,b,c){
          jQ3(el.load.FPPoloContextEls).find('table#PartesDoPoloTable tbody#FPParte-Childs').append(b);
          _FPParteEls.push(b);
        });
        /*jQ3(el.exp).children().each(function(a,b,c){
          jQ3(el.load.formularioPresencaIns.linkedEl).append(b);
          _FPParteEls.push(b);
        });*/
        jQ3(el.exp).children().each(function(a,b,c){
          //jQ3('span#FPPolo', el.load.FPPoloContextEls).append(b);
          el.load.FPPolo._FPPoloEls__spanFPPolo.append(b);
          _FPParteEls.push(b);
        });
        
        _._FPParteEls = _FPParteEls;
        
        forEach(el.load.parte.advogado, function(adv, idx, parteAdvs){
          pkg.FPParte.buildChild(args, el, classModdle, _, adv, idx, parteAdvs, el.load.parte);
        });
        
      },
      buildChild : function(args, el, classModdle, _, adv, idx, parteAdvsPJe, partePje, version, manualAction){   
        var _context = {
          load : {
            __super : el.load,
            adv : adv,
            idx  : idx,
            parte : partePje,
            parteAdvs : parteAdvsPJe,
            FPParteContextEls : _._FPParteEls,
            FPParteInsObj : _,
            manualAction : manualAction
          },
          uuid : window.j2.mod._._guid(),
          exp : jQ3('<div>')[0],
          //exp : jQ3('span#FPParte-advogados', _._FPParteEls)[0],
          edt : el.j2Win.win.jQ3('<div>')[0],
          j2Win : el.j2Win
        };

        defer(function(){
          pkg.AddtionalControls.append(_context, 'FP-Advogado', version || '1.0', { resizeOnFinish : true } );
        });        
      },
      getPseudoAdvogado : function(parte){
        return {
          CPFCNPJ: "000.000.000-00",
          OAB: "--00000",
          a: {},
          endereco: {},
          exibicao: "XXXXAdvogadoXXXX - OAB --00000 - CPF: 000.000.000-00 (ADVOGADO)",
          meiosContato: {},
          nome: "XXXXAdvogadoXXXX",
          papel: "ADVOGADO",
          polo: {
            UCase: 'ADVOGADO', 
            LCase: 'advogado', 
            Capt: 'Advogado', 
            parte: {
              Capt: "Advogado(a)",
              LCase: "advogado(a)",
              UCase: "ADVOGADO(A)"
            }
          },
          representados: [
            parte
          ]
        };
      },
      adjustdivTreeLine : function(_){        
        
        var getElemDistance = function ( elem ) {
            var location = 0;
            if (elem.offsetParent) {
                do {
                    location += elem.offsetTop;
                    elem = elem.offsetParent;
                } while (elem);
            }
            return location >= 0 ? location : 0;
        };
        
        var _pr = _.FPPolo.sPoloName[0].getBoundingClientRect();
        var _divTree = _.divTreeLine[0].getBoundingClientRect();
        var _nameSpan = _.$FPParteNameFieldAndDel.spanNome[0].getBoundingClientRect();
        var _nameInput = _.$FPParteNameFieldAndDel.parteNome[0].getBoundingClientRect();
        
        /*
        _.divTreeLine.css('top',  _pr.top + _pr.height);
        _.divTreeLine.css('height',  _divTree.top - _pr.top + (_pr.height / 4));*/
        
        var _prTop = getElemDistance(_.FPPolo.sPoloName[0]);
        var _divTreeTop = getElemDistance(_.divTreeLine[0]);
        var _nameSpanTop = getElemDistance(_.$FPParteNameFieldAndDel.spanNome[0]);
        var _nameInputTop = getElemDistance(_.$FPParteNameFieldAndDel.parteNome[0]);
        
        var h = ( _nameSpanTop  || _nameInputTop) - (_prTop + _pr.height) + ((_nameSpan.height || _nameInput.height ) /2 );
        
        _.divTreeLine.css('top',  _prTop + _pr.height);
        _.divTreeLine.css('height',  h );
        
        return;
      }
    }; 
    
    pkg.FPAdvogado = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle){       
        
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : jQ3(el.edt).find('div#FPParteOpsPresenca-mainDiv'),
          //span : jQ3(el.exp).find('span#FPParte'),
          autoHide : new window.j2.mod._._autoHide(['div','span']),
          _delete : new window.j2.mod._._del(pkg.FPAdvogado),
          exp : {
            FPAdvogado : jQ3('span#FPAdvogado', el.exp),
            nome : jQ3('span#FPAdvogado-nome', el.exp),
            OAB : jQ3('span#FPAdvogado-OAB', el.exp),
            OABUF : jQ3('span#FPAdvogado-OAB span#UF', el.exp),
            OABNum : jQ3('span#FPAdvogado-OAB  span#Num', el.exp),
            presenca : jQ3('span#FPAdvogado-presenca', el.exp)
          },
          lockr : new window.j2.mod._._Lockr('pkg.FPAdvogado'),
          trs : jQ3('tr', el.edt),
          divTreeLine : jQ3(el.edt).find('div#FPParte-divLine')
        };
        inherits(el, _, "FPAdvogado", ["FPPartePresencaAusencia", "FPParteNameFieldAndDel"]);
        pkg.FPAdvogado._.push(_);
        el.load.FPParteInsObj.FPAdvogado.push(_);
        el.load.adv.FPAdvogado = _;
        _.advogadoPJE = el.load.adv;
        _.FPParte = el.load.FPParteInsObj;
        
        pkg.FPAdvogado.buildChildren(args, el, classModdle);
        
        pkg.FPAdvogado.formatarMultiplaListaAdvogadoEmExpediente(el);
                
        //higlight fields
        forEach(_.exp, function(prop){
          prop.change(function(){
            var _this = jQ3(this);
            _this.addClass('HLField');
            setTimeout(function(){
              _this.removeClass('HLField');
            }, 5000);
          });
        });
        
        //nome
        _.$FPParteNameFieldAndDel.parteNome.val(el.load.adv.nome.toUpperCase());
        _.$FPParteNameFieldAndDel.spanNome.text(el.load.adv.nome.toUpperCase());
        _.exp.nome.text(el.load.adv.nome.toUpperCase());
                
         _.$FPParteNameFieldAndDel.parteNome.change(function(){
          _.exp.nome.text(_.$FPParteNameFieldAndDel.parteNome.val().toUpperCase()).change();
        });
        
        _.$FPParteNameFieldAndDel.parteNome.autocomplete({
          source : _.lockr.get('$FPParteNameFieldAndDel.parteNome.autocomplete.source', [''] ) || [''],
          select: function( event, ui ) {
           _.$FPParteNameFieldAndDel.parteNome.val(ui.item.value).change();
           _.$FPParteNameFieldAndDel.oabNum.val(ui.item.oabNum).change();
           _.$FPParteNameFieldAndDel.oabUF.val(ui.item.oabUF).change();
          },
          delay: 200
          }).autocomplete('instance')._renderItem = function( ul, item ) {
            var _tx = item.label + '#:BR{}OAB #:B{' + item.oabUF + ' ' + item.oabNum + '}';
            var _tx = j2Conv(_tx);
            
            var div = el.j2Win.win.jQ3('<DIV>', {class : 'ui-menu-item-wrapper', html : _tx});
            
            var li = el.j2Win.win.jQ3( "<li>" , { class : 'ui-menu-item'} )
              .attr( "data-value", item.value )
              .attr( "aria-label", item.value )
              .append( div )
              .appendTo( ul );
      
            li[0]._j2__item = item;

            return li;
          };
          
          
        _.$FPParteNameFieldAndDel.butConfirm.click(function(ev){
          if( _.$FPParteNameFieldAndDel.parteNome.val().trim().split(' ').length < 2 )
            return;
          
          _.lockr.sadd('$FPParteNameFieldAndDel.parteNome.autocomplete.source', {
            label : _.$FPParteNameFieldAndDel.parteNome.val().toUpperCase(),
            value : _.$FPParteNameFieldAndDel.parteNome.val().toUpperCase(),
            oabNum : _.$FPParteNameFieldAndDel.oabNum.val(),
            oabUF : _.$FPParteNameFieldAndDel.oabUF.val()
          } );
        }); 
        _.$FPParteNameFieldAndDel.parteNome.focus(function(ev){
          _.$FPParteNameFieldAndDel.parteNome.autocomplete( "option", "source", _.lockr.get('$FPParteNameFieldAndDel.parteNome.autocomplete.source', ['']) );
        }); 
        
        //oabuf
        _.$FPParteNameFieldAndDel.oabUF.val(el.load.adv.OAB.substr(0,2).toUpperCase());
        _.$FPParteNameFieldAndDel.spanOABUF.text(el.load.adv.OAB.substr(0,2).toUpperCase());
        _.exp.OABUF.text(el.load.adv.OAB.substr(0,2).toUpperCase());
                
        _.$FPParteNameFieldAndDel.oabUF.change(function(){
          _.exp.OABUF.text(_.$FPParteNameFieldAndDel.oabUF.val().toUpperCase()).change();
        });
        
        //oabNum
        _.$FPParteNameFieldAndDel.oabNum.val(el.load.adv.OAB.substr(2).toUpperCase());
        _.$FPParteNameFieldAndDel.spanOABNum.text(el.load.adv.OAB.substr(2).toUpperCase());
        _.exp.OABNum.text(el.load.adv.OAB.substr(2).toUpperCase());
                
        _.$FPParteNameFieldAndDel.oabNum.change(function(){
          _.exp.OABNum.text(_.$FPParteNameFieldAndDel.oabNum.val().toUpperCase()).change();
        });
                
        //presença
        _.$FPPartePresencaAusencia.select.change(function(){
          if(el.load.FPParteInsObj.$FPPartePresencaAusencia.select.find('option:selected').val().match(/ausente/))
            return;
              
          switch(_.$FPPartePresencaAusencia.select.val()){
            case 'advCausaPropria':

              el.load.FPParteInsObj.exp.acompanhamento.text('advogando em causa própria').change();
              el.load.FPParteInsObj.exp.advogados.hide().change();
              break;
            case 'presente':
              el.load.FPParteInsObj.exp.acompanhamento.text('acompanhado do(a)(s) advogado(a)(s) ').change();
              el.load.FPParteInsObj.exp.advogados.show().change();
              break;
            case 'ausente':
              el.load.FPParteInsObj.exp.acompanhamento.text('desacompanhado(a) de advogado').change();
              el.load.FPParteInsObj.exp.advogados.hide().change();
              break;
          }
        });
        _.$FPPartePresencaAusencia.select.change(function(){
          if(el.load.FPParteInsObj.$FPPartePresencaAusencia.select.find('option:selected').val().match(/presente/))
            return;
                    
          switch(_.$FPPartePresencaAusencia.select.val()){
            case 'presente':
              var _selOp = _.$FPPartePresencaAusencia.select.find('option:selected');
              _.exp.presenca.text( _selOp.attr('j2Text-AltAusenciaParte') ).show().change();

              _.$FPPartePresencaAusencia.select.find('option#advCausaPropria').hide();
              el.load.FPParteInsObj.exp.advogados.show();
              break;
            case 'ausente':
              _.exp.presenca.hide();
              el.load.FPParteInsObj.exp.advogados.hide();
              _.$FPPartePresencaAusencia.select.find('option#advCausaPropria').show();
              break;
          }
        });
        _.$FPPartePresencaAusencia.select.change(function(ev){
          var _selVal = _.$FPPartePresencaAusencia.select.find('option:selected').val();
          
          evBus.fire('pkg.FPAdvogado.$FPPartePresencaAusencia.select.onChange', _selVal, _, el.load.parte, ev);
        });
        _.$FPPartePresencaAusencia.select.change();
        
        if(el.load.manualAction){
          _.$FPParteNameFieldAndDel.butEdit.click();
          _.$FPParteNameFieldAndDel.parteNome.val('');
          _.$FPParteNameFieldAndDel.oabNum.val('');
        }
        
        pkg.FPAdvogado.setEvents(_, el);
        
        evBus.fire('FormularioPresenca.onChangeActor');
      },
      setEvents : function(_, el){
        evBus.on('FormularioPresenca.onChangeActor', function(){
          pkg.FPAdvogado.adjustdivTreeLine(_);
        });
        
        evBus.on('pkg.FPAdvogado.$FPPartePresencaAusencia.select.onChange', function(ev, val, _otherAdvIns, _otherParteIns, jQEv){
          if(_.uuid === _otherAdvIns.uuid)
            return;
          if(el.load.parte.uuid !== _otherParteIns.uuid)
            return;
          
          _.$FPPartePresencaAusencia.select.val(val);
        });
        
        evBus.on('FPParteNameFieldAndDel.onDelete.' + _.$FPParteNameFieldAndDel.uuid, function(){
          forEach(_.exp, function(_elE){
            _elE.remove();
          });
          _.trs.remove();
          
          if(_.FPParte.FPAdvogado.length === 1){
            _.FPParte.exp.acompanhamento.text('desacompanhado(a) de advogado').change();
          }
          
          forEach(_.FPParte.FPAdvogado, function(adv, idx){
            if(adv && adv.uuid === el.load.adv.FPAdvogado.uuid)
              el.load.FPParteInsObj.FPAdvogado.splice(idx, 1);
          });
          
          if(_.FPParte.FPAdvogado.length){
            _.FPParte.FPAdvogado[0].$FPPartePresencaAusencia.select.removeAttr('disabled');
          }
                     
          _.$FPPartePresencaAusencia.autoHide();
          _.$FPPartePresencaAusencia._delete();
          
          pkg.FPAdvogado.formatarMultiplaListaAdvogadoEmExpediente(el);
          
          _.autoHide();
          _._delete();
        });
      },
      buildChildren : function(args, el, classModdle){
        jQ3(el.edt).children().each(function(a,b,c){
          jQ3(el.load.FPParteContextEls).find('table#AdvogadoDaParteTable tbody#FPAdvogado-Childs').append(b);
        });  
        jQ3(el.exp).children().each(function(a,b,c){
          jQ3('span#FPParte-advogados', el.load.FPParteInsObj._FPParteEls).append(b);
        });
        
        /* no children */
      },
      formatarMultiplaListaAdvogadoEmExpediente : function(elCtxtLoad){
        var ar = elCtxtLoad.load.FPParteInsObj.exp.advogados.find('span#FPAdvogado-separador');
        
        forEach(ar, function(arEl){
          arEl.innerHTML = '';
        });
        
        if(ar.length === 0) 
          return;
        else if(ar.length === 1) 
          return;
        else if(ar.length === 2)
          ar[0].innerHTML = ' e ';
        else{ 
          for(var i = 0; i < ar.length - 1; i++)
            ar[i].innerHTML = ( i===(ar.length-2) )   ? ' e ' : ', '; 
        }
      },
      adjustdivTreeLine : function(_){        
        
        var getElemDistance = function ( elem ) {
            var location = 0;
            if (elem.offsetParent) {
                do {
                    location += elem.offsetTop;
                    elem = elem.offsetParent;
                } while (elem);
            }
            return location >= 0 ? location : 0;
        };
        
        var _pr = _.FPParte.$FPParteNameFieldAndDel.spanNome[0].getBoundingClientRect();
        _pr = (_pr.height !== 0) ? _pr : _.FPParte.$FPParteNameFieldAndDel.parteNome[0].getBoundingClientRect();
        var _divTree = _.divTreeLine[0].getBoundingClientRect();
        var _nameSpan = _.$FPParteNameFieldAndDel.spanNome[0].getBoundingClientRect();
        var _nameInput = _.$FPParteNameFieldAndDel.parteNome[0].getBoundingClientRect();
        
        /*
        _.divTreeLine.css('top',  _pr.top + _pr.height);
        _.divTreeLine.css('height',  _divTree.top - _pr.top + (_pr.height / 4));*/
        
        var _prTop = getElemDistance(_.FPParte.$FPParteNameFieldAndDel.spanNome[0]) || getElemDistance(_.FPParte.$FPParteNameFieldAndDel.parteNome[0]);
        var _divTreeTop = getElemDistance(_.divTreeLine[0]);
        var _nameSpanTop = getElemDistance(_.$FPParteNameFieldAndDel.spanNome[0]);
        var _nameInputTop = getElemDistance(_.$FPParteNameFieldAndDel.parteNome[0]);
        
        var h = ( _nameSpanTop  || _nameInputTop) - (_prTop + _pr.height) + ((_nameSpan.height || _nameInput.height ) /2 );
        
        _.divTreeLine.css('top',  _prTop + _pr.height);
        _.divTreeLine.css('height',  h );
        
       /*_.divTreeLine.css('top',  _prTop + _pr.height);
        _.divTreeLine.css('height',  ( ( (_nameSpanTop !== 0) ? (_nameSpanTop - 4) : 0 ) || _nameInputTop) - _pr.height - _prTop + (_pr.height * 0.6666) );*/
        
        return;
      }
    }; 
    
    pkg.FPParteNameFieldAndDel = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle){       
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : jQ3('div#FPParteOpsPresenca-mainDiv', el.edt),
          p : jQ3('p#FPParteNameFieldAndDel-parteNome-p', el.edt),
          spanNome : jQ3('p#FPParteNameFieldAndDel-parteNome-p span#nome', el.edt),
          spanOABUF : jQ3('p#FPParteNameFieldAndDel-parteNome-p span#oabUF', el.edt),
          spanOABNum : jQ3('p#FPParteNameFieldAndDel-parteNome-p span#oabNum', el.edt),
          parteNome : el.j2Win.win.jQ3('textarea#FPParteNameFieldAndDel-parteNome', el.edt),
          butDel : jQ3('button#FPParteNameFieldAndDel-parteDel', el.edt),
          butEdit : jQ3(el.edt).find('button#FPParteNameFieldAndDel-parteEdit'),
          butConfirm : jQ3(el.edt).find('button#FPParteNameFieldAndDel-parteConfirm'),
          oabUF : jQ3(el.edt).find('select#FPParteNameFieldAndDel-oabUF'),
          oabNum : jQ3(el.edt).find('input#FPParteNameFieldAndDel-oabNum'),
          autoHide : new window.j2.mod._._autoHide(['div']),
          _delete : new window.j2.mod._._del(pkg.FPParteNameFieldAndDel)
        };
        pkg.FPParteNameFieldAndDel._.push(_);
        inherits(el, _, "FPParteNameFieldAndDel", "");
        
        var __BASE_HEIGHT__ = 23;
        
        _.parteNome.validate = function(){
          j2.mod._.styleSetter(_.parteNome[0], 'fieldError', _.parteNome.val().length !== 0);
          return _.parteNome.val().length !== 0;
        };
        _.oabNum.validate = function(){
          if (!(this.length))
            return true;  
          j2.mod._.styleSetter(_.oabNum[0], 'fieldError', _.oabNum.val().length !== 0);
          return _.oabNum.val().length !== 0;
        };
        _.oabUF.validate = function(){
          if (!(this.length))
            return true;
          j2.mod._.styleSetter(_.oabUF[0], 'fieldError', _.oabUF.val() !== '--');
          return _.oabUF.val() !== '--';
        };
        
        var _startEdit = function(){
          _.parteNome.show();
          _.oabUF.show();
          _.oabNum.show();
         //_.parteNome.css('height', 'auto');
          var _pNsH = parseFloat( _.parteNome.prop('scrollHeight') );
          _.parteNome.css('height', ( (_pNsH > __BASE_HEIGHT__) ? parseFloat(_.parteNome.prop('scrollHeight')) + 2 : __BASE_HEIGHT__ ) +'px');
          _.butConfirm.show();
          
          _.p.hide();
          _.butEdit.hide();
          _.butDel.attr('disabled', 'true');
          
          evBus.fire('FormularioPresenca.onChangeActor');
        };
        var _change = function(ev){
          var isValid = true;
          isValid &= _.parteNome.validate();
          isValid &= _.oabUF.validate();
          isValid &= _.oabNum.validate();
          
          if( !isValid ){
            //ev.stopPropagation();
            return;
          }
          
          _.p.show();
          _.butEdit.show();
          
          _.parteNome.hide();
          _.parteNome.css('height', __BASE_HEIGHT__ + 'px');
          _.butConfirm.hide();
          _.oabUF.hide();
          _.oabNum.hide();
          
          _.spanNome.text( _.parteNome.val().toUpperCase() );
          _.spanOABUF.text(  _.oabUF.length ? _.oabUF.val().toUpperCase() : '' );
          _.spanOABNum.text( _.oabNum.length ? _.oabNum.val().toUpperCase() : '' );
          _.butDel.removeAttr('disabled');
          
          evBus.fire('FormularioPresenca.onChangeActor');
        };
        
        //_.p.dblclick(_startEdit);
        _.butEdit.click(_startEdit);
        
        /*_.parteNome.change(function(){
          _change();
        });*/
        //_.parteNome.dblclick(_change);
        _.butConfirm.click(_change);
        
        
        _.butDel.click(function(){
          var _msg;
          
          if ( (el.load.FPPolo) && (el.load.FPPolo.FPParte.length === 1) && !(el.load.FPPolo.eDeletavel) ){
            _msg = 'Não é possível excluir #:B{$}. Deve haver ao menos uma parte neste polo.'.replace('$', _.parteNome.val().toUpperCase());
            
            pkg.ModalDialog.ok(_msg, 'Modelo j2 - Informação', 
             null, null, { 
               j2Win : el.j2Win,
               edt : el.j2Win.doc.body
             });
             
            return;
          }
          
          _msg = 'Confirma a exclusão de #:B{$}?'.replace('$', _.parteNome.val().toUpperCase());
          
          pkg.ModalDialog.okCancel(_msg, 'Modelo j2 - Confirmar Exclusão', 
             'FPParteNameFieldAndDel.onDelete.' + _.uuid + ';FormularioPresenca.onChangeActor', 'docEditorCore.onCancelClose', null, { 
               j2Win : el.j2Win,
               edt : el.j2Win.doc.body
             });
        });
        
        pkg.FPParteNameFieldAndDel.setEvents(args, el, _);
      },
      setEvents : function(args, el, _){
        evBus.once('FPParteNameFieldAndDel.onDelete.' + _.uuid, function(ev){
          _.autoHide();
          _._delete();
          evBus.fire('FPParteNameFieldAndDel.onDelete.' + _.uuid);
        });
      }
    }; 
    
    pkg.FPPartePresencaAusencia = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle){       
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : jQ3('div#FPPartePresencaAusencia-mainDiv', el.edt),
          select : jQ3('select#FPPartePresencaAusencia-select', el.edt),
          selectAus : jQ3('select#FPPartePresencaAusencia-selectAus', el.edt),
          autoHide : new window.j2.mod._._autoHide(['div']),
          _delete : new window.j2.mod._._del(pkg.FPPartePresencaAusencia)
        };
        pkg.FPPartePresencaAusencia._.push(_);
        inherits(el, _, "FPPartePresencaAusencia", "");
      }
    }; 
    
    pkg.FPParteOpsPresenca = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle){       
        var _ = {
          uuid : window.j2.mod._._guid(),
          div : jQ3('div#FPParteOpsPresenca-mainDiv', el.edt),
          slPapel : jQ3('select#FPParteOpsPresenca-papel', el.edt),
          //ipNomeRep : jQ3('input#FPParteOpsPresenca-nomeRepresentante', el.edt),
          ipNomeRep : el.j2Win.win.jQ3('input#FPParteOpsPresenca-nomeRepresentante', el.edt),
          autoHide : new window.j2.mod._._autoHide(['div']),
          _delete : new window.j2.mod._._del(pkg.FPParteOpsPresenca),
          lockr : new window.j2.mod._._Lockr('pkg.FPParteOpsPresenca')
        };
        pkg.FPParteOpsPresenca._.push(_);
        inherits(el, _, "FPParteOpsPresenca", "");
        
        _.ipNomeRep.prop('id', _.ipNomeRep.prop('id') + '-' + _.uuid); 
        
        j2.mod._.styleSetter(_.ipNomeRep[0], 'fieldError');
        
        _.slPapel.change(function(){
          if(_.slPapel.val().match(/pessoalmente/))
            _.ipNomeRep.hide();
          else
            _.ipNomeRep.show();
        });
        
        _.ipNomeRep.change(function(){          
          j2.mod._.styleSetter(_.ipNomeRep[0], 'fieldError', _.ipNomeRep.val().length !== 0);
        });
        

        _.ipNomeRep.autocomplete({
          source : _.lockr.get('ipNomeRep.autocomplete.source', ['']),
          select: function( event, ui ) {
            _.ipNomeRep.val(ui.item.value).change();
          },
          delay: 200          
        });
        _.ipNomeRep.change(function(ev){
          if( _.ipNomeRep.val().split(' ').length < 2 )
            return;
          _.lockr.sadd('ipNomeRep.autocomplete.source', _.ipNomeRep.val().toUpperCase() );
        }); 
        _.ipNomeRep.focus(function(a, b, c, d){
          _.ipNomeRep.autocomplete( "option", "source", _.lockr.get('ipNomeRep.autocomplete.source', ['']) );
        }); 
        
        
       
      }
    };     

    
    pkg.FragmentLoader = { // tappac as new
      _ : [],
      constructor_ : function(args, el, classModdle, ___){  
        if(!args.lib)
          console.error('#########Error: pkg.FragmentLoader - classe mal definida.')

        let lib = parseVar(args.lib);
        let $parBottom = jQ3(el.parBottom)
        

        j2.mod.com.libLoader(lib);
        evBus.once('loaded-'+ lib.lib, function(ev, fragRaw){
          let $contnr = $parBottom.find('div#Fragment-Loader-div');
          let $fragRaw = jQ3(fragRaw)
          $contnr .append($fragRaw)

          if(args.oneInstance && args.oneInstance === 'true'){
            $parBottom.find('div#Fragment-Loader-div[j2-inst]').remove()
          }
          $contnr.attr('j2-inst', '_o')

          evBus.fire(`FragmentLoader.onloadFragment.uuid-${el.uuid}`, {
            $fragRaw : $fragRaw,
            args : args,
            el: el,
            $contnr : $contnr
          })
        });
      }
    }
    
    evBus.once('loaded-'+ window.j2.res.MAIN.addtionalControls.lib, function(){
      //pkg.AddtionalControls.constructor_();
    });

  })();
  (function(){
    
    if(!(window.j2.mod.clsCnstr.AddtionalControls.modelDef)){
      window.j2.mod.clsCnstr.AddtionalControls.constructor_();
    }
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.addtionalControls.lib;
  alert(t);
  console.error(t);

}