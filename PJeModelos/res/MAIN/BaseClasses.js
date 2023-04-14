/*                               
 * ASS: Abatimento proporcional do preço
 * DOC: 5230292
 * MOD: BaeClasses.js
 * 
 * Módulo ds classes base
 * 
 * versão 2017.06.02.1
 */

/* global jQ3 */

console.log('BaseClasses.js - módulo compilante');

try {
  (function () { /* inits autoexec */
    var w = window;
    var evBus = window.j2.mod.eventBus.EventBus;
    w.j2.mod.clsCnstr = {};
    
    var pkg = w.j2.mod.clsCnstr = {};
    var mod = w.j2.modelo;
    
    var isString = new window.j2.mod._._203;
    var isObject = new window.j2.mod._._201;
    var isArray = new window.j2.mod._._197;
    var forEach = w.j2.mod.forEach;
    var filter = new window.j2.mod._._90;
    var assign = window.j2.mod._._206;
    var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    var parseVar = window.j2.mod._._parseVar;
    var j2Conv = window.j2.mod._._j2TagsConverter;
    /*window.j2.mod.j2Moddle;*/
    var builder = j2.mod.builder;
    var j2SON = window.j2.mod._._j2JSONparse;
    var capt =  window.j2.mod._._capitalizeFirstLetter;
    var last = new window.j2.mod._._87; // pmc
    var defer = new window.j2.mod._._101;
    var guid = window.j2.mod._._guid;
    var extend = window.j2.mod._._extend;
    
    function styleSetter(element, classesAsString){
      forEach(classesAsString.split(' '), function(clss){
        forEach(j2.mod.builder.getStyleClass(clss).prop, function(prop){
          if(element.style[prop.name] !== 'undefinied')
            element.style[prop.name] = prop.value;
          else
            j2.log('A propriedade ' + prop.value + ' não pode ser associada às definições de estilo. Classe: ' + clss);
        });
      });
    };

    pkg.AddtionalControls = {
      constructor_ : function(args){
        var _this = pkg.AddtionalControls;
        
        args.modelRegisteredVersions && forEach(args.modelRegisteredVersions, kp => {
          _this.modelRegisteredVersions[kp.key] = kp.value
        })
      },
      modelRegisteredVersions : {}
    }

    pkg.AlvaraControls = {
      constructor_ : function(args, el){            
        /* diferenças aqui ao redor */
        var _ = {
          deposito : {
            numero : mod.edt.gE('alvara-deposito-numero'),
            valor : mod.edt.gE('alvara-deposito-valor'),
            somatorioParcelas : mod.edt.gE('alvara-deposito-somatorioParcelas'),
            devedor : {
              form : mod.edt.gE('selector-form-PessoaDevedora'),
              selector : mod.edt.gE('selectorPessoaDevedora')
            },
            addAction : mod.edt.gE('selectorAddPessoaDevedora'),
            list : { 
              _ : mod.edt.gE('alvara-deposito-list'),
              tbody : mod.edt.gE('alvara-deposito-list-tbody')
            },
            removeAction : mod.edt.gE('alvara-deposito-removeAction'),
            form : mod.edt.gE('alvara-deposito-form')
            
          },
          sucumbencia : {
            group : mod.edt.gE('alvara-sucumbencia-group'),
            valor : mod.edt.gE('alvara-sucumbencia-valor')
          },
          __alvaraEdit : {
            disablingElements : [
              mod.edt.gE('selector-form-fieldset-Pessoa'),
              mod.edt.gE('selectorPessoa'),
              mod.edt.gE('selectorAddPessoa'),
              mod.edt.gE('alvara-edit-monitor-fieldset')
            ]
          },
         /* rateio : {
            verba : mod.edt.gE('alvara-rateio-verba'),
            parcela : mod.edt.gE('alvara-rateio-parcela'),
            list : mod.edt.gE('alvara-rateio-list'),
            removeAction : mod.edt.gE('alvara-rateio-removeAction')
          },
          selo : mod.edt.gE('alvara-seloJudicial'),
          guia : {
            inputGroup : mod.edt.gE('alvara-guia-inputGroup'),
            numero : mod.edt.gE('alvara-guiaNumero'),
            consultaAction : mod.edt.gE('alvara-guiaNumero-consultaAction')            
          },*/
          credores : {
            selector : mod.edt.gE('selectorPessoa'),
            table : mod.edt.gE('alvara-credores-list'),
            addAction :mod.edt.gE('selectorAddPessoa')
          }
        };
        
        _.deposito.addAction.onclick = function(event){
          pkg.Alvara.DepositoAdd(_, mod.edt.win.$, event);
        };
        
        /*_.deposito.removeAction.onclick = function(event){
          pkg.Alvara.DepositoDel(_, event);
        };
        _.rateio.removeAction.onclick = function(event){
          pkg.Alvara.RateioDel(_, event);
        };*/
       /* _.selo.onchange = function(event){
          pkg.Alvara.AlvaraEdit.changeSeloListener(this, _, mod.edt.win.$, event);
        };
        _.guia.consultaAction.onclick = function(event){
          pkg.Alvara.AlvaraEdit.GuiaConsultaAction(_, event);
        };*/
            
        _.credores.addAction.onclick = function(event){
          pkg.Alvara.AddCredor(_, mod.edt.win.$, event);
        };
        
        
        if(mod.edt.gE('SDDelPessoa'))
          j2.mod._.styleSetter(mod.edt.gE('SDDelPessoa'), 'Hidden', false);
        if(mod.edt.gE('SDDelPessoaDevedora'))
          j2.mod._.styleSetter(mod.edt.gE('SDDelPessoaDevedora'), 'Hidden', false);
        
        /*if(args){
          if(args.importLib){
            forEach(args.importLib, function(lib){
              var art = parseVar(lib.artifact);
              if(art)
                j2.mod.com.libLoader(art, {
                  doc : mod[lib.scope.toLowerCase()].doc,
                  loc : 'head'
                });
            });
          }
          if(args.bodyInject)
            forEach(args.bodyInject, function(bi){
              var art = parseVar(bi.artifact);
              if(art){ 
                j2.mod.com.libLoader(art, {
                  doc : mod[bi.scope.toLowerCase()].doc,
                  loc : 'body'
                });
              }
            });
        }*/
        pkg.Documento.setEvents(args);
        
        pkg.Documento.setEvents(args);
      },
      setEvents : function (args, _) {
        /*evBus.once('builder.afterBuildModSet.main', 10000, function(event, argss){

        });*/
        
        evBus.on('onFinishEdition', 900, function(event, args){
          j2.log('fired: onFinishEdition - Documento');
          /*
           * Elementos que não tiveram o nome definido como ndhe serão excluidos
           * ndhe - not deletable hidden elements.
           * 
           * @type Array
           */
          var EHT = ['spans', 'div', 'img', 'p']; /* Excludible hidden tags*/
          var _ = [];
          forEach(EHT, function(t){
            forEach(mod.exp.doc.getElementsByTagName(t), function(e){
              if(e){
                if( e.style.visibility==='hidden'){
                  if (e.getAttribute('name') ){
                    if (e.getAttribute('name') !== 'ndhe')
                      _[_.length] = e;
                  }
                  else
                    _[_.length] = e;
                }
              }else
                var i = 0;
            });
          });
          forEach(_, function(d){
            d.remove();
          });
        });
      }   
    };
    
    pkg.AutoSave = {
      intervalId : null,
      storage : null,
      current : null,
      recovering : {
        processed : false
      },      
      containers : {
        type : 'default', 
        edt : {},
        exp : {}
      },
      constructor_ : function(args, el){            
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.exp): mod.exp;
        var _ = pkg.AutoSave._ = {
          ctxt : el,
          autoSaveTime : mod.edt.gE('AutoSave-time') || null,
          autoSaveTimePar : $(el.par).find('#j2-AutoSave-time')[0],
          id : 'id-' + (j2.env.PJeVars.processo.idTask || j2.env.PJeVars.processo.idProcesso) + '-' + j2.env.modId.id + '-' + j2.env.PJeVars.usuario.login + (function(){ // as2, as2 as new, pc
            //it will check if it is in a PAC frame
            if(!(j2.modelo.par.win.jQuery))
              return '';
            
            var textNode = j2.modelo.par.win.jQuery('.rich-panel-header').contents().filter(function(a, b){
              return this.textContent.includes('Edição');
            });
            
            if(textNode.length === 0)
              return '';
            
            return '-exp-' + Math.abs( textNode[0].textContent.hashCode());
          })()// as2
        };
        
        pkg.AutoSave.containers.type = args.containersType || 'default';
        
        if(!(localStorage.getItem('pkg.AutoSave.storage')))
          localStorage.setItem('pkg.AutoSave.storage', JSON.stringify({}));

        pkg.AutoSave.storage = JSON.parse(localStorage.getItem('pkg.AutoSave.storage'));
        
        var weekElapse = 0.25 * 1000 * 60 * 60 * 24; //6h
        for(var r in pkg.AutoSave.storage)
          if(pkg.AutoSave.storage.hasOwnProperty(r))
            if( (new Date() - Date.parse(pkg.AutoSave.storage[r].date)) > weekElapse) /*one week */
              delete pkg.AutoSave.storage[r];
        
        pkg.AutoSave.setEvents(args);
        j2.log('pkg.AutoSave -> constructor_');
      },
      setEvents : function(args){  
        evBus.on('AutoSave.recover.no' ,pkg.AutoSave.new);
        evBus.on('AutoSave.recover.yes' ,function(){ // as
          pkg.AutoSave.recover(args); //as
        });
        
        evBus.once('AutoSave.recover.initialize', function(){
          j2.log('pkg.AutoSave -> fired once: AutoSave.recover.initialize');
          pkg.AutoSave.initialize(args);
        });
        
        evBus.on('onFinishEdition', function(event){ 
          if(args.containersType && args.containersType === 'fullFrameBody'){
            pkg.AutoSave.save();
            // pkg.AutoSave.intervalId = setInterval(pkg.AutoSave.save, args.saveTimeInterval || 15000);
          }
        });
        
        j2.log('pkg.AutoSave -> setEvents');
      },
      initialize : function(args, el){
        if(isObject(args)){
          if(args.containersType){
            pkg.AutoSave.containers.type = args.containersType;
          }
          
          if(args.containersExp){
            var _exp =  j2SON(args.containersExp);
            for(var prop in _exp)
              if(_exp.hasOwnProperty(prop))
                _exp[prop] = mod.exp.gE(_exp[prop]);
            pkg.AutoSave.containers.exp = _exp;
          }
          if(args.containersEdt){
            var _edt =  j2SON(args.containersEdt);
            for(var prop in _edt)
              if(_edt.hasOwnProperty(prop))
                _edt[prop] = mod.edt.gE(_edt[prop]);
            pkg.AutoSave.containers.edt = _edt;
          }
          
        }
              

        if( pkg.AutoSave.storage[ pkg.AutoSave._.id ] ){ 
          var msg = '';
          
          switch ( pkg.AutoSave.containers.type ){ 
            case 'fullFrameBody': 
              msg = 'Deseja carregar uma versão de recuperação de seu modelo j2?';
              msg+=  '<br><br> Ao cancelar você não será mais capaz de realizar a recuperação e os dados serão descartados.';
              msg+=  '<br><br>Também não será possivel utilizar as funcionalidades do editor dos modelos j2 para realizar alterações no documento salvo'; 
              break;
              
            case 'atoJudicial':                 
            default :             
              msg = 'Deseja carregar os dados de auto recuperação? Ao cancelar você não será mais capaz de realizar a recuperação e os dados serão descartados.'; 
              break;
          };
          
          setTimeout( ()=> pkg.ModalDialog.okCancel(msg, 'Recuperação modelo j2', 'AutoSave.recover.yes', 'AutoSave.recover.no'),
          1000);
        }
        else
          pkg.AutoSave.new();
        
        
        pkg.AutoSave.intervalId = setInterval(pkg.AutoSave.save, args.saveTimeInterval || 15000);
        
        j2.log('pkg.AutoSave -> initialized'); 
      },      
      new : function(){
        pkg.AutoSave.current = pkg.AutoSave.storage[ pkg.AutoSave._.id ] = {
          date : (new Date()).toString(),
          edt : {},
          exp : {}
        };
        
        switch ( pkg.AutoSave.containers.type ){ 
          case 'fullFrameBody':
            pkg.AutoSave.current.edt = null;
            pkg.AutoSave.current.exp = {
              doc : {
                body : {
                  innerHTML : ''
                }
              }
            };
            break;
            
          case 'atoJudicial':
            var rs = { /* recover SET */
              edt : pkg.AutoSave.containers.edt,
              exp : pkg.AutoSave.containers.exp
            };

            for(var prop in rs.edt)
              if(rs.edt.hasOwnProperty(prop))
                pkg.AutoSave.current.edt[prop] = {};
            for(var prop in rs.exp)
              if(rs.exp.hasOwnProperty(prop))
                pkg.AutoSave.current.exp[prop] = {};
            
            break;
            
          default :
            pkg.ModalDialog.ok('Erro no tipo de autorrecuperação.', 'BaseClasses j2 - ERRO');
            break;
        };
        
        j2.log('pkg.AutoSave -> new');
                
      },
      recover : function(args){
        pkg.AutoSave.current = pkg.AutoSave.storage[ pkg.AutoSave._.id ];

        switch ( pkg.AutoSave.containers.type ){ // as new
          case 'fullFrameBody':
            mod.exp.doc.body.innerHTML = pkg.AutoSave.current.exp.doc.body.innerHTML;
            //mod.edt.win.close(); // sah
            forEach(pkg.Selector.instances, function(selIns){ // sah as new
              selIns.autoHide();
            });
            forEach(pkg.CheckBox._, function(selIns){ // ndlg4 as new
              selIns.autoHide();
            });
            pkg.GeneralDatePicker && forEach(pkg.GeneralDatePicker._, function(selIns){ // ndlg4 as new
              selIns.autoHide();
            });
            pkg.GeneralTimePicker && forEach(pkg.GeneralTimePicker._, function(selIns){ // ndlg4 as new
              selIns.autoHide();
            });
            evBus.fire('Editor.onResize');
            evBus.fire('AutoSave.onRecover', pkg.AutoSave.containers.type, $(mod.exp.doc.body));
            break;
            
          case 'atoJudicial':
            var rs = { /* recover SET*/
              curr : pkg.AutoSave.current,
              edt : pkg.AutoSave.containers.edt,
              exp : pkg.AutoSave.containers.exp,
              type : pkg.AutoSave.containers.type
            };

            for(var prop in rs.curr.edt)
              if(rs.edt.hasOwnProperty(prop))
                switch(rs.type){
                  case 'atoJudicial':
                    rs.edt[prop].value = rs.curr.edt[prop].value;        
                }

            for(var prop in rs.curr.exp)
              if(rs.exp.hasOwnProperty(prop)){
                jQ(rs.exp[prop]).empty();
                jQ(rs.exp[prop]).append(jQ( rs.curr.exp[prop].innerHTML));        
              }
            
            break;
            
          default :
            pkg.ModalDialog.ok('Erro no tipo de autorrecuperação.', 'BaseClasses j2 - ERRO');
            break;
        };
        
        pkg.AutoSave.processed = true;
        
        pkg.AutoSave.intervalId = setInterval(pkg.AutoSave.save, args.saveTimeInterval || 15000);
        
        j2.log('pkg.AutoSave -> recovered');
      },
      save : function(){
        if(!(pkg.AutoSave.current))
          return;
        
        switch ( pkg.AutoSave.containers.type ){ // as new
          case 'fullFrameBody':
            pkg.AutoSave.current.exp.doc.body.innerHTML  = mod.exp.doc.body.innerHTML;
            break;
            
          case 'atoJudicial':
            var rs = { /* recover SET*/
              edt : pkg.AutoSave.containers.edt,
              exp : pkg.AutoSave.containers.exp
            };

            for(var prop in rs.edt)
              if(rs.edt.hasOwnProperty(prop))
                pkg.AutoSave.current.edt[prop].value = rs.edt[prop].value;

            for(var prop in rs.exp)
              if(rs.exp.hasOwnProperty(prop))
                pkg.AutoSave.current.exp[prop].innerHTML = rs.exp[prop].innerHTML;
            
            break;
            
          default :
            pkg.ModalDialog.ok('Erro no tipo de autorrecuperação.', 'BaseClasses j2 - ERRO');
            break;
        }
        
        localStorage.setItem('pkg.AutoSave.storage', JSON.stringify( pkg.AutoSave.storage ));
        
        var tx = new Date().toLocaleTimeString('pt-BR', {hour: 'numeric', minute : 'numeric', second : 'numeric'});
        
        if(pkg.AutoSave._.autoSaveTime) 
          pkg.AutoSave._.autoSaveTime.innerHTML = tx; 
        if(pkg.AutoSave._.autoSaveTimePar) //pc
          pkg.AutoSave._.autoSaveTimePar.innerHTML = tx; //pc
        
        j2.log('pkg.AutoSave -> saved -> time: ' + tx); 
      }    
    };
    
    pkg.BlocoAssinaturas = {
      constructor_ : function(args, el){
        /*
         * Prepara o xml
         * parse the xml
         * monta os valores
         * 
         * @type Boolean
         */
        var _ = {
          sel : mod.edt.gE('selectorsignatario'),
          p : mod.exp.gE('assinatura'),
          divFirmaPje : $(el.exp).find('#divFirmaPje')[0], // pl
          chancela : $(el.exp).find('#BlocoAssinaturas.chancela'.jQId())[0] // pl
        };
              
        pkg.BlocoAssinaturas.setEvents(_, args);
        
        if(isObject(args)){
          if(args.multiplePropgated)
            return;
                  
          if(args.proProvimento)
            if(args.proProvimento === 'sim'){
              var _ = pkg.BlocoAssinaturas.provimento;
              _.insert = true;
              
              forEach([
                'textoPrincipal',
                'referenciaArtigo',
                'cumuladoCom',
                'oculto'
              ], function(p){
                if(args[p])
                  _[p]=args[p];
              });
            }
            
          if(args.appendTo){ //pl as new
            var _ar = [
              _.chancela,
              _.p,
              _.divFirmaPje
            ];
            $(_ar).appendTo( $(el.exp).find('#' + args.appendTo) );
          }
          
          var iterator = pkg.BlocoAssinaturas.blocoAssinaturasSelectorDefXmlIterator();
          
          if(args.ordemApresentacao)
            args.ordemApresentacao = args.ordemApresentacao.split(';');
          else
            args.ordemApresentacao = ['magistrado', 'servidor', 'secretario', 'listar', 'listarSource']; // pl
          
          forEach(args.ordemApresentacao, function(ord){
            if(args[ord])
              if(args[ord]==='sim' || isArray(args[ord]) || isObject(parseVar(args[ord])) ) // pl
                switch(ord){
                  case 'magistrado': iterator.adicionarSignatario('mag'); break;
                  case 'secretario': iterator.adicionarSignatario('sec'); break;
                  case 'servidor': iterator.adicionarSignatario('serv'); break;
                  case 'listar': 
                    forEach(args.listar, function(liI){
                      iterator.adicionarSignatario('serv', liI.value);
                    });
                    break;
                  case 'listarSource':  // pl as new
                    var _ar = parseVar(args.listarSource);
                    
                    forEach(_ar, function(liI){
                      iterator.adicionarSignatario('serv', liI.value);
                    });
                    break;
                }
          });
          
          
          /* write line to exp */
          pkg.BlocoAssinaturas.xmlSelector = new XMLSerializer().serializeToString(iterator.XMLObject().documentElement);
          window.j2.mod.j2Moddle.fromXML(pkg.BlocoAssinaturas.xmlSelector, 'j2:Definitions', function(err, definitions, context){
            if(definitions)
              pkg.BlocoAssinaturas.selectorSource = definitions;
            
            evBus.fire('BlocoAssinaturas.afterParseSelectorXML', definitions);
          });
          
          evBus.once('BlocoAssinaturas.afterParseSelectorXML', function(event, definitions){
            /* atualizar a linha de assinatura do documento*/
            var d = definitions.selectorDef.items.item[0].itemContent.data.text;
            var a = mod.exp.gE('assinatura');
            while(a.firstChild)
              a.firstChild.remove();
            
            mod.exp.gE('assinatura').appendChild(domify(d));
            
            /*atualizar a lista de elemntos no editor.
             */
            pkg.Selector.loadItems(definitions, mod.edt.gE('selectorsignatario'));
          });
        }
      },
      provimento : {
        insert : false,
        oculto : false,
        textoPrincipal : 'Autorizado pelo Provimento 22/2018-CGJMA',
        referenciaArtigo : null,
        cumuladoCom : null,
        texto : function(){
          var _ = '';
          var prov = pkg.BlocoAssinaturas.provimento;
          forEach([
                'textoPrincipal',
                'referenciaArtigo',
                'cumuladoCom'
              ], function(p){
            _+= (prov[p]) ?  ((_.length) ? ', ' + prov[p] : prov[p]): '' ;
          });
          return '(' + _ + ')';
        },
        setVisible : function(flg){
          var _ = mod.exp.gE('BlocoAssinaturas.SpanPorProvimento');
          if(!(_))
            return;
          
          j2.mod._.styleSetter(_, 'Hidden', flg);
        }
      },
      changeMultiple : function(_){
        forEach(mod.exp.doc.querySelectorAll("p[j2='BlocoAssinaturas-assinatura']"), function(e){
          e.innerHTML = _.p.innerHTML;
        });
      },
      setEvents : function(_, args){
        /* quando da mudança do meio */
        evBus.on('afterChange.selectorsignatario', function(event, value, obj){           
          pkg.BlocoAssinaturas.createChancela(value);
          
          if(args && args.multiplo && (args.multiplo === 'sim' || args.multiplo === 'true'))
            pkg.BlocoAssinaturas.changeMultiple(_);
        });
        
        evBus.on('afterLoadItems.selectorsignatario', function(event, value, obj){           
          if(!(_.sel))
            return;
        
          pkg.BlocoAssinaturas.createChancela( _.sel.value );
          
          if(pkg.BlocoAssinaturas.processoEPresidido)
            pkg.BlocoAssinaturas.autoSelecionarPresidente(_, pkg.BlocoAssinaturas.processoEPresidido);
        });
        
      },
      processoEPresidido : false,
      autoSelecionarPresidente : function(_, id){
        if(!(_.sel.options[id]))
          return;
        
        _.sel.options[id].selected = true;
        var ev = new Event('change');
        _.sel.dispatchEvent(ev);
        
        /* delayed listeners */
        /*forEach([''
        ], function(ev){
          evBus.once(ev, function(event, value, obj){
            var ev = new Event('change');
            obj.dispatchEvent(ev);
          });
        });*/
      },
      createChancela : function(usrId, container){
        usrId = usrId.split('-')[0];
        var div = mod.exp.gE('BlocoAssinaturas.chancela') || container;
        if(!(div))
          return;
          
        while(div.firstChild)
          div.firstChild.remove();
          
        var isHttps = function(){
          return window.location.protocol === 'https:';
        };
        
        var usrDef = filter(j2.env.xmls.usuarios.usuarios[0].usuario, 
                            {id : usrId});
        if(!(usrDef.length))
          return;

        usrDef = usrDef[0];
        if(!(usrDef.chancela))
          return;
        
        if(!(j2.res.chancelas))
          j2.res.chancelas = {};
        if(!(j2.env.xmls.chancelas))
          j2.env.xmls.chancelas = {};
        
        if(!(j2.res.chancelas[usrId]))
          j2.res.chancelas[usrId] = {
            'ref': function () { return (w.j2ModDebug)?(isHttps())? '0' : '/res/XML/Chancelas/Usuarios/' + usrId + '.xml' : usrDef.chancela.idSource; }, 
            'lib': 'ROOT/res/XML/Chancelas/Usuarios/' + usrId + '.xml',
            'type': 'j2/xml',
            'version' : 'default', 
            'fileName' : usrId + '.xml'
          };
        
        
        evBus.once('afterParseChancela.'+usrId, function(event, definitions){
          
          var img = document.createElement('img');
          img.src = definitions.chancelaDataURI.text;
          
          div.appendChild(img);

          div.setAttribute('style', (usrDef.chancela.adjustStyle) ? usrDef.chancela.adjustStyle : '');
          img.setAttribute('style', (usrDef.chancela.adjustStyleImg) ? usrDef.chancela.adjustStyleImg : '');
        });
        
        if(j2.env.xmls.chancelas[usrId]){
          evBus.fire('afterParseChancela.'+usrId, j2.env.xmls.chancelas[usrId]);
        }else{
          evBus.once('loaded-'+j2.res.chancelas[usrId].lib, function(event, xml){
            console.log('fired once loaded-'+j2.res.chancelas[usrId].lib);

            j2.env.xmls.chancelas[usrId] = xml;
            console.log('parsing window.j2.res.chancelas.' + usrId);

            j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
              if(definitions)
                j2.env.xmls.chancelas[usrId] = definitions;

              if (err){
                j2.err('err get defintions from XML - chancela usuário ' + usrId);
                j2.err(err);
              }

              evBus.fire('afterParseChancela.'+usrId, definitions);

            });
          });       
          
          j2.mod.com.libLoader(j2.res.chancelas[usrId]);
        }
      },
      blocoAssinaturasSelectorDefXmlIterator : function(){
        var templateXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                          '<Definitions id="SeleectorsItemsDefinitions" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                          '  <selectorDef id="selectorBlocoAssinaturas" grouped="false">\n' +
                          '    <eventFire event="signatario.onChange"/>\n' +
                          '    <itemFormats>\n' +
                          /*'    <elemento tag="p" class="p FntMod">\n' +
                          '         #{textContent}\n' +
                          '      </elemento>\n' +*/
                          '    </itemFormats>\n' +
                          '    <groupsDefs>\n' +
                          /*'    <group label="Magistrados">' +
                          '        <gItem id="magJOSCELMO"/>' +
                          '        <gItem id="magGLADISTON"/>' +
                          '      </group>' +
                          '      <group label="Servidores">' +
                          '        <gItem id="00641805306"/>' +
                          '        <gItem id="01379812364"/>' +
                          '      </group>' +*/
                          '    </groupsDefs>\n' +
                          '    <items>\n' +
                          /*'    <item id="magJOSCELMO" label="Respondente" dataPlus="">' +
                          '        <eventFire event="signatario.respodenteSelected"/>' +
                          '        <itemContent type="HTML" addtClassStyles="someClass">' +
                          '          <data>' +			   
                          '            <![CDATA[' +
                          '              <B>JOSCELMO SOUSA GOMES</B><br />' +
                          '              Juiz de Direito Titular do 1º Juizado Especial Cível<br />' +
                          '              Respondendo pelo 2º Juizado Especial Cível de Imperatriz' +
                          '            ]]>' +
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +*/
                          '    </items>\n' +
                          '  </selectorDef>\n' +
                          '</Definitions>\n';

        var templateXmlDoc  = new DOMParser().parseFromString(templateXml, "application/xml");              
        var mags = j2.env.modId.unidade.config.magistrados;
        var secs = j2.env.modId.unidade.config.secretarios;
        var usrs = j2.env.xmls.usuarios.usuarios[0].usuario;
        var unit = j2.env.modId.unidade;

        var eventFiresGetter = function(){
          return '';
        };

        var getXML = function (){
          return templateXmlDoc;
        };

        var adicionarSignatario = function (tipo, liItVal) {
          switch(tipo){
            case 'mag':
              var eEx = mags.emExercicio;
              var ord = [];
              ord[0] = {
                nominacao : eEx,
                id : mags[eEx]
              };
              
              for(var prop in mags){
                if(((prop.startsWith('titular') )
                   || 
                   (prop.startsWith('respondente') )
                   || 
                   (prop.startsWith('substituto') )
                   || 
                   (prop.startsWith('presidente') ))
                   && 
                   (prop !== eEx)
                  ){
                  ord[ord.length] = {
                    nominacao : prop,
                    id : mags[prop]
                  };
                }
              }
              
              var usrDef;
              forEach(ord, function(magId){
                usrDef = filter(usrs, {id : magId.id});
                if(usrDef.length){
                  usrDef = usrDef[0];
                  
                  var nMagItem = templateXmlDoc.createElement('item');
                  var cont = templateXmlDoc.createElement('itemContent');
                  var d = templateXmlDoc.createElement('data');
                  var tx;
                  var isNotTitular = (magId.nominacao!=='titular');
                  
                  var attr = 'Juiz ' + magId.nominacao.capt();
                  if(isNotTitular) 
                    attr += ' (' + usrDef.nome.split(' ')[0].capt() + ')' ;
                  
                  
                  nMagItem.id=usrDef.id + (((isNotTitular) && !(magId.nominacao.startsWith('resp'))) ? 'Pres' : '');
                  nMagItem.setAttribute('label', attr);
                  nMagItem.setAttribute('dataPlus', 'mag');
                  
                  cont.setAttribute('type', 'HTML');
                  cont.setAttribute('addtClassStyles', '');
                  
                  if(!(usrDef.customSign)){
                    tx = '<strong>' + usrDef.nome + '</strong><br>\n';
                    tx += ((usrDef.genr==='M')? 'Juiz' : 'Juíza') + ' de Direito ' + usrDef.titularidade.nominacao.capt();
                    tx += (isNotTitular) ? ' ' + ((usrDef.titularidade.unidadeGenr==='M') ? 'do ' : 'da ') + usrDef.titularidade.unidade : '' ;
                    if(isNotTitular) {
                      tx += '\n<br>'; 
                      if(magId.nominacao.startsWith('resp')){
                        tx+='Respondendo ';
                        if(unit.genr==='M') 
                          tx += 'pelo ';
                        else
                          tx += 'pela ';
                        tx+= unit.id;
                      }
                      else{
                        tx += 'Presidindo os presentes autos';
                        if(usrDef.presidente)
                          forEach(usrDef.presidente.preside, function(pres){
                            if(pres.processo === j2.env.PJeVars.processo.numero){
                              tx += '\n<br>(Portaria ' + pres.portariaOrgao + ' nº ' + pres.portariaNumero + ')';
                              pkg.BlocoAssinaturas.processoEPresidido = nMagItem.id;
                            }
                          });
                      }
                    }
                  }
                  else{
                    var container = document.createElement('div');
                    
                    forEach(usrDef.customSign.simpleElementsDefs.elemento, function (ele){
                      j2.mod.builder.j2ElementParse(ele, container);
                    });
                    tx = container.innerHTML;
                  }
                  d.innerHTML = '<![CDATA[' + tx + ']]>';
                  
                  templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
                  nMagItem.appendChild(cont);
                  cont.appendChild(d);
                }
              });
              
              break;
            case 'sec' :
              var eEx = secs.emExercicio;
              var ord = [2];
              ord[0] = {
                nominacao : eEx,
                id : secs[eEx]
              };
              
              switch(eEx){
                case 'titular':
                  ord[1] = {
                    nominacao : 'substituto',
                    id : secs.substituto
                  };
                  break;
                case 'substituto':
                  ord[1] = {
                    nominacao : 'titular',
                    id : secs.titular
                  };                  
                  break;
              }
                            
              var usrDef;
              forEach(ord, function(secId){
                usrDef = filter(usrs, {id : secId.id});
                if(usrDef.length){
                  usrDef = usrDef[0];
                  
                  var nMagItem = templateXmlDoc.createElement('item');
                  var cont = templateXmlDoc.createElement('itemContent');
                  var d = templateXmlDoc.createElement('data');
                  var tx;

                  nMagItem.id=usrDef.id;
                  nMagItem.setAttribute('label', 'Secretário ' + secId.nominacao.capt());
                  nMagItem.setAttribute('dataPlus', 'sec');
                  
                  cont.setAttribute('type', 'HTML');
                  cont.setAttribute('addtClassStyles', '');
                  
                  tx = '<strong>' + usrDef.nome + '</strong><br>\n';
                  tx += ((usrDef.genr==='M')? 'Secretário' : 'Secretária') + ' Judicial' + ((secId.nominacao!=='titular') ? ' ' + ((usrDef.genr==='M')? 'Substituto' : 'Substituta') : '');
                  tx += '\n<br>Matrícula ' + usrDef.matricula;
                  
                  d.innerHTML = '<![CDATA[' + tx + ']]>';
                  
                  templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
                  nMagItem.appendChild(cont);
                  cont.appendChild(d);
                }
              });              
              break;
            case 'serv':
              var servId =  liItVal || j2.env.PJeVars.usuario.login;
              usrDef = filter(usrs, {id : servId});
              if(usrDef.length){
                usrDef = usrDef[0];
                
                var usrFuncs = [];
                usrFuncs.push(usrDef.cargo);
                if (usrDef.outrasFuncoes)
                  forEach(usrDef.outrasFuncoes, function(f){
                    usrFuncs.push(f.funcao);
                  });
                
                for(var ii = 0; ii < usrFuncs.length; ii++){
                  var nMagItem = templateXmlDoc.createElement('item');
                  var cont = templateXmlDoc.createElement('itemContent');
                  var d = templateXmlDoc.createElement('data');
                  var tx;

                  if (usrFuncs.length === 1){
                    nMagItem.id=usrDef.id;
                    nMagItem.setAttribute('label', (liItVal)? usrDef.nome : 'Servidor');
                  }else{
                    nMagItem.id=usrDef.id + '-' + ii;
                    nMagItem.setAttribute('label', (liItVal)? usrDef.nome + ' (' + usrFuncs[ii] + ')': 'Servidor (' + usrFuncs[ii] + ')'); // pl
                  }
                  nMagItem.setAttribute('dataPlus', 'serv');

                  cont.setAttribute('type', 'HTML');
                  cont.setAttribute('addtClassStyles', '');

                  tx = '<strong>' + usrDef.nome + '</strong><br>\n';
                  tx += usrFuncs[ii];
                  tx += '\n<br>Matrícula ' + usrDef.matricula;


                  if (pkg.BlocoAssinaturas.provimento.insert && j2.env.modId.unidade.config.expedientes.porProvimento){
                    var povSpan = document.createElement('span');
                    if( (pkg.BlocoAssinaturas.provimento.oculto ===true) || (pkg.BlocoAssinaturas.provimento.oculto ==='sim') )
                      j2.mod._.styleSetter(povSpan, 'Hidden');
                    povSpan.id = 'BlocoAssinaturas.SpanPorProvimento';
                    povSpan.innerHTML = '\n<br>' + pkg.BlocoAssinaturas.provimento.texto();

                    tx +=povSpan.outerHTML;
                  }

                  d.innerHTML = '<![CDATA[' + tx + ']]>';




                  templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
                  nMagItem.appendChild(cont);
                  cont.appendChild(d);
                }
              }
          }
        };

        var adicionarEventoFire = function (evNm) {
          var edNd = templateXmlDoc.createElement('eventFire').setAttribute('event', evNm);
          templateXmlDoc.getElementsByTagName('selectorDef')[0].appendChild( edNd );
        };
                
        
        return {
          'XMLObject' : getXML,
          'adicionarSignatario' : adicionarSignatario,
          'adicionarEventFire' : adicionarEventoFire
        };
      }           
    };
    
    pkg.BotaoVizualizarImpressao = {
      constructor_ : function(args, el){
        pkg.BotaoVizualizarImpressao.setEvents();
      },
      setEvents : function(){
        evBus.on('onFinishEdition', 10000, function(event){
          var _dbg = false;
          /* diferenças aqui */
          j2.log('fired: onFinishEdition - botaoVisualizarImpressao');
          if(!(mod.exp.gE('icFormatPrint')))
            return;
          
          if(!_dbg){
            var script = '('+pkg.BotaoVizualizarImpressao.printVisualization+')(event);';
            forEach(pkg.BotaoVizualizarImpressao.otherCallbacks, function(cb){
              script += '\n\n/**Aditional onPrint Callbacks**/\n (' + cb + ')(event);';
            });
            mod.exp.gE('icFormatPrint').setAttribute('onclick', script);
          }else{
            mod.exp.gE('icFormatPrint').onclick = pkg.BotaoVizualizarImpressao.printVisualization;
          }
        });
        
        evBus.on('AutoSave.onRecover', function(event, type, jQEl){ // as3 as new            
            var script = '('+pkg.BotaoVizualizarImpressao.printVisualization+')(event);';
            forEach(pkg.BotaoVizualizarImpressao.otherCallbacks, function(cb){
              script += '\n\n/**Aditional onPrint Callbacks**/\n (' + cb + ')(event);';
            });
            jQEl.find('#icFormatPrint').attr('onclick', script);
        });
      },
      otherCallbacks : [],
      registerOtherCallbacks : function(cb){
        pkg.BotaoVizualizarImpressao.otherCallbacks[pkg.BotaoVizualizarImpressao.otherCallbacks.length] = cb;
      },
      printVisualization : function(event){
        var DocCl;
        var arPaginas = []; var arPaginasIds = []; var pgn; var pgnSub; var idx; var i;
        var frmEdit;
        var currPagina; var currPaginaId;
        var pageSection;
        var divFirmPgn; var firCA; var firCB;
        var orgPg; var editPg; var tRm;
        var eDe;
        var num;
        
        /* go in stack overflow
         * 
         */
        function removeImageBlanks(imageObject) {
          var imgWidth = imageObject.width;
          var imgHeight = imageObject.height;
          var canvas = document.createElement('canvas');
          canvas.setAttribute('width', imgWidth);
          canvas.setAttribute('height', imgHeight);
          var context = canvas.getContext('2d');
          context.drawImage(imageObject, 0, 0);

          var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
              data = imageData.data,
              getRBG = function(x, y) {
                  var offset = imgWidth * y + x;
                  return {
                      red:     data[offset * 4],
                      green:   data[offset * 4 + 1],
                      blue:    data[offset * 4 + 2],
                      opacity: data[offset * 4 + 3]
                  };
              },
              isWhite = function (rgb) {
                  return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
              },
              scanY = function (fromTop) {
              var offset = fromTop ? 1 : -1;
              for(var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
                  for(var x = 0; x < imgWidth; x++) {
                      var rgb = getRBG(x, y);
                      if (!isWhite(rgb)) {
                          if (fromTop) {
                              return y;
                          } else {
                              return Math.min(y + 1, imgHeight - 1);
                          }
                      }
                    }
                }
                return null; 
              },
              scanX = function (fromLeft) {
              var offset = fromLeft? 1 : -1;

              for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

                  for(var y = 0; y < imgHeight; y++) {
                      var rgb = getRBG(x, y);
                      if (!isWhite(rgb)) {
                          if (fromLeft) {
                              return x;
                          } else {
                              return Math.min(x + 1, imgWidth - 1);
                          }
                      }      
                  }
              }
              return null; 
          };

          var cropTop = scanY(true),
              cropBottom = scanY(false),
              cropLeft = scanX(true),
              cropRight = scanX(false),
              cropWidth = cropRight - cropLeft,
              cropHeight = cropBottom - cropTop;

          canvas.setAttribute('width', cropWidth);
          canvas.setAttribute('height', cropHeight);
          canvas.getContext('2d').drawImage(imageObject,
              cropLeft, cropTop, cropWidth, cropHeight,
              0, 0, cropWidth, cropHeight);

          return canvas.toDataURL().replace(/(\r\n|\n|\r)/gm, '');
      };
        function _main(){  /*
          Complementos ou extensões de páginas sempre se iniciarão por 2, não por 0 ou 1.
          Logo c789123 -> c789123.2, c789123.3 etc
          */

          /*********************************/

          /* depende WODoc */
          DocCl = document.cloneNode(true);
          DocCl.body.innerHTML = '';

          idx = 0;
          num = 1; /* deve existir pelo menos uma página */

          do{
            pgn = document.getElementById('p'+num);
            if (pgn) {
              arPaginas[idx] = pgn;
              arPaginasIds[idx] = 'p'+num;
              idx++;   

              /* verificar sub páginas */
              for(i=2;true;i++){
                pgnSub = document.getElementById('p'+num + '.' + i );
                if( pgnSub === null)
                  break;

                arPaginas[idx] = pgnSub;
                arPaginasIds[idx] = 'p'+num + '.' + i;
                idx++;
              }            
            }
            num++;
          }while(document.getElementById('p'+num))

          /*********************************/

          var tbls = document.getElementsByTagName('table');
          if (tbls.length !== 0) 
          {
            var tbla = tbls[tbls.length - 1];
            var tbl = tbla.cloneNode(true);
            if (tbl === null)
            {
              alert('Node tbl é nulo');
              return;
            }

            var imgs = tbl.getElementsByTagName('img');
            if (imgs.length === 2) 
            {

              var tds = tbl.getElementsByTagName('td');
              var i;
              for (i = 0; i < tds.length; i++) 
              {
                tds[i].style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
                tds[i].style.fontSize = '8px';
              }
              var spn = tbl.getElementsByTagName('span');
              for (i = 0; i < spn.length; i++) 
              {
                spn[i].style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
                spn[i].style.fontSize = '8px';
              }

              tds[tds.length-2].appendChild(tds[tds.length-1].getElementsByTagName('span')[0]);
              tds[tds.length-2].style.textAlign = 'right';

              /*var img = imgs[0];
              img.style.width = '45px';
              img.src = 'https://pje.tjma.jus.br'+img.src;*/

              var img2 = imgs[1];
              img2.style.height = '40px';
              tds[tds.length-1].style.width='40px';
              /*img2.src = 'https://pje.tjma.jus.br'+img2.src;*/   

              if (tbl === null) {
                alert('tbl to insert linke assinatura firm is null.');
                return;
              }

              frmEdit = tbl;
              tbla.remove();
            }
          }

          /*********************************/

          /*depedende arPaginas*/
          for(idx=0; idx<arPaginas.length; idx++)
          {
            currPagina = arPaginas[idx];
            currPaginaId = arPaginasIds[idx];

          /*********************************/

          /* depende de  WODocCl e clPg */
          DocCl.body.appendChild( currPagina.cloneNode(true) );

          /* depende de currPagina */
          pageSection = DocCl.getElementById('PagesSections');

          if ( pageSection === null){
            alert('Pagesection de pagina ' + currPagina.id + 'não encontrada.(743)');
            return;
          }

          /*common*/
          pageSection.style.paddingBottom = '';
          pageSection.style.minHeight = '';
          pageSection.style.paddingLeft = '';
          pageSection.style.paddingRight = '';
          pageSection.style.paddingTop = '';
          pageSection.style.boxShadow = '';


          if (pageSection.style.maxWidth === '640px' ){
            pageSection.style.maxWidth = '';
          }
          else /* para certidão */
            pageSection.style.margin = 'auto';

          /*else{ certidao}*/

          if (frmEdit !== null){
            divFirmPgn = DocCl.getElementById('divFirmaPje');
            if(divFirmPgn){
              if (pageSection.style.maxWidth === '400px' ){
                firCA = frmEdit.cloneNode(true);
                firCB = frmEdit.cloneNode(true);

                firCA.rows[0].cells[firCA.rows[0].cells.length-1].innerHTML = '';
                firCA.rows[0].cells[firCA.rows[0].cells.length-2].innerHTML = '';
                firCB.rows[0].cells[0].innerHTML = '';
                firCB.rows[0].cells[1].innerHTML = '';

                divFirmPgn.appendChild( firCA );
                divFirmPgn.appendChild( firCB );
              }else{
                divFirmPgn.appendChild( frmEdit.cloneNode(true) );
              }
            }
          }

          /*********************************/

          orgPg = document.getElementById( currPaginaId );
          editPg= DocCl.getElementById( currPaginaId );
          if(idx!==0)/*if page is one, has menu*/
            orgPg.innerHTML = editPg.innerHTML;
          else{
            orgPg.innerHTML = DocCl.getElementById('textMargins').innerHTML;
            tRm = document.getElementById('ShortCutMenuContainer');
            if (tRm!==null)
              tRm.remove();  
          }

          DocCl.getElementById(currPaginaId).remove();

          }

          /*********************************/

          eDe = document.getElementById('BotaoVizualizarImpressao');
          if(eDe!==null)
            eDe.remove();

          var sI = setInterval(function(){runPrint();}, 1250);
          function runPrint(){
            try{
              clearInterval(sI);
              var bts = document.getElementsByTagName('button');
              bts[bts.length-1].click();
            }catch(e){}
          };
        };
        
        var mI = new Image();
        var qr = document.getElementById('imgCodBarras');
        
        mI.crossOrigin = 'Anonymous';
        mI.onload = function(){
          mI.imgCodBarras.setAttribute('src', removeImageBlanks(mI));
          _main();
        };
        mI.imgCodBarras = qr;
        if ( (qr.complete) && (qr.naturalHeight !== 0) )
          mI.src =   mI.imgCodBarras.src;
        else{
          var sp = document.getElementsByTagName('span');
          sp = sp[sp.length-1];
          mI.src = 'https://chart.googleapis.com/chart?chs=125x125&cht=qr&chl=https://pje.tjma.jus.br:443/pje/Processo/ConsultaDocumento/listView.seam?x=' + sp.textContent.trim();
        }
        
      }
    };
    
    pkg.Cabecalho = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.exp): mod.exp;
        
        pkg.Cabecalho._ ={
          cabecEnd : win.gE('CabecEnd'),
          firma : win.gE('firma'),
          imageP : win.gE('firma').previousSibling,
          th : win.gE('firma').nextSibling
        };
        
        if(!j2.env.modId.unidade.config.enderecoManual.edificacaoENominada)          
          win.gE('forum').remove();
        
        if(isObject(args))
          if(args.endereco)
            if(args.endereco==='nao')
              win.gE('CabecEnd').remove();
  
      },
      setCabecEndVisible : function(tf){
        j2.mod._.styleSetter(pkg.Cabecalho._.cabecEnd, 'Hidden', tf);        
      },
      setCabecalhoVisible : function(tf){
        forEach(pkg.Cabecalho._, function(e){
          j2.mod._.styleSetter(e, 'Hidden', tf);        
        });
      }      
    };       
    
    pkg.Calendario = {
      constructor_ : function(args, el, _, __, ___){
        
        if(isObject(args)){
          if(!(args.itemFormats) ){
            console.error('Obrigatóario definir args.itemFormats para pkg.Calendario');
            return;
          }
          var _hoje = new Date(new Date().setHours(0,0,0,0));
          var _ordemMeses = [];
          var _m = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
          var _feriadosReligiososPadroes;
          function setFeriadosReligiosos(ano){
            _feriadosReligiososPadroes = pkg.Calendario.util.padroesFeriadoReligiosos(ano);
          }
          setFeriadosReligiosos(_hoje.getFullYear());
          function monthFromIsoString(datePattern){
            var _dtPt = _feriadosReligiososPadroes[datePattern] ? _feriadosReligiososPadroes[datePattern] : datePattern;
            var _id = _dtPt.split('-')[1];
            
            return {
              jsId : _id - 1,
              calId : _id
            };
          }
          
          !(args.mesesPraFrenteEPraTras) && (args.mesesPraFrenteEPraTras = 6);
            
          var iterator = pkg.Calendario.XmlIterator();
          
          iterator.atualizarItemFormats({
            j2Fragmento : args.itemFormats,
            'class' : args.itemFormatsClass || ''
          }); 
          var _gen = iterator.adicionarCalendarioEventoGenerico();
          iterator.setItemsInitialSelected( _gen.id );
          
          j2.env.xmls.calendario && (function(){
            // meses atras
            
            var dataLimites = {
              inicio : pkg.Calendario.util.mesesPraTras(_hoje, args.mesesPraFrenteEPraTras),
              fim : pkg.Calendario.util.mesesPraFrente(_hoje, args.mesesPraFrenteEPraTras)
            };
            
            var _datePointer = dataLimites.inicio;
            do{
              var _label = _m[_datePointer.getMonth()].capt() + ' de ' + _datePointer.getFullYear()
                         + ( _datePointer.getMonth() === _hoje.getMonth() ? ' - atual' : '' );
              
              _ordemMeses.push({
                inicio : _datePointer,
                month : {
                  jsId : _datePointer.getMonth(),
                  calId : _datePointer.getMonth() + 1
                },
                fim : pkg.Calendario.util.paraOFimDoMes(_datePointer), 
                grupo : iterator.adicionarGrupo( _label )
              });
              _datePointer = pkg.Calendario.util.mesesPraFrente(_datePointer, 1);
            }while( _datePointer <= dataLimites.fim)
          })();  
           
          j2.env.xmls.calendario && (function(){
            forEach(_ordemMeses, function(mes){
              iterator.setEscopoTemporal( mes.inicio.getFullYear() );
              setFeriadosReligiosos(mes.inicio.getFullYear());
                            
              var _calEvenFilt = filter(j2.env.xmls.calendario.CalendarioEvento, function(it, idx, obj){
                var _itInitIds = monthFromIsoString(it.dataInicial);
                
                if(!(it.dataFinal)){
                  return _itInitIds.jsId === mes.month.jsId;
                }else{
                  var _itFinIds = monthFromIsoString(it.dataFinal);
                  
                  if(_itFinIds.jsId < _itInitIds.jsId){
                    return _itInitIds.jsId <= mes.month.jsId || _itFinIds.jsId >= mes.month.jsId;
                  }else{  
                    return _itInitIds.jsId <= mes.month.jsId && mes.month.jsId <= _itFinIds.jsId;
                  }
                }
              });
              
              if(_calEvenFilt.length)
                forEach(_calEvenFilt, function(calendarioEvento){
                  var xmlItem = iterator.adicionarCalendarioEvento(calendarioEvento, mes);
                  xmlItem && iterator.adicionarItemDeGrupo( xmlItem.id, mes.grupo );
                });
              else{
                if(args.mostrarVazio && (args.mostrarVazio === 'sim' || args.mostrarVazio === 'true') ){
                  var xmlItem = iterator.adicionarCalendarioEventoVazio();
                  iterator.adicionarItemDeGrupo( xmlItem.id, mes.grupo );
                }
              }
            });
            
          })();
          
          j2.env.xmls.calendario && forEach(_ordemMeses, function(mes){
            /* https://jsfiddle.net/jmarikle/vxju87nv/ */
            var items = mes.grupo.children;
            if( !(items.length > 1))
              return;
            
            items = Array.prototype.slice.call(items);
            
            items.sort(function(a, b){
              var iA = iterator.getItem(a.id).getAttribute('dataPattern');
              var iB = iterator.getItem(b.id).getAttribute('dataPattern');
              
              if(mes.month.jsId !== 0){  //não é janeiro, que tem transição de ano em 
                iA = iA.replace('AA', 'ZZ');
                iB = iB.replace('AA', 'ZZ');
              }
              
              return iA.localeCompare(iB);
            });
            
            for(var i = 0, len = items.length; i < len; i++) {
              var parent = items[i].parentNode;
              var detatchedItem = parent.removeChild(items[i]);
              parent.appendChild(detatchedItem);
            }            
          });
          
          j2.env.xmls.calendario && (function(){
            forEach(_ordemMeses, function(mes){
              iterator.setEscopoTemporal( mes.inicio.getFullYear() );
              
              if( mes.month.jsId === _hoje.getMonth() )
                iterator.adicionarItemDeGrupo( _gen.id, mes.grupo, true );
            });
            
          })();
          
          /* write line to exp */
          pkg.Calendario.xmlSelector = new XMLSerializer().serializeToString(iterator.XMLObject().documentElement);
          window.j2.mod.j2Moddle.fromXML(pkg.Calendario.xmlSelector, 'j2:Definitions', function(err, definitions, context){
            if(definitions){
              pkg.Calendario.selectorSource = definitions;
            
              evBus.fire('Calendario.afterParseSelectorXML', definitions);
              _afterParseSelectorXML(definitions);
            }
            else
              if(err)
                err();
          });
          
          function _afterParseSelectorXML( definitions){
           
          };
          
          pkg.Calendario.selectorSource = {
            XMLIsBeingParsed : true
          };
        }
      },  
      XmlIterator : function(itemFormat){  
        var templateXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                          '<Definitions xmlns="http://j2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="SeleectorsItemsDefinitions-Calendario" targetNamespace="http://j2" xsi:schemaLocation="http://j2 ../j2.xsd">\n' +
                          '  <selectorDef id="CalendarioSelectSource" grouped="false">\n' +
                          /*'    <eventFire event="signatario.onChange"/>\n' +*/
                          '    <itemFormats>\n' +
                          /*'    <elemento tag="p" class="p FntMod">\n' +
                          '         #{textContent}\n' +
                          '      </elemento>\n' +*/
                          '    </itemFormats>\n' +
                          '    <groupsDefs>\n' +
                          /*'    <group label="Magistrados">' +
                          '        <gItem id="magJOSCELMO"/>' +
                          '        <gItem id="magGLADISTON"/>' +
                          '      </group>' +
                          '      <group label="Servidores">' +
                          '        <gItem id="00641805306"/>' +
                          '        <gItem id="01379812364"/>' +
                          '      </group>' +*/
                          '    </groupsDefs>\n' +
                          '    <items>\n' +
                          /*'    <item id="magJOSCELMO" label="Respondente" dataPlus="">' +
                          '        <eventFire event="signatario.respodenteSelected"/>' +
                          '        <itemContent type="HTML" addtClassStyles="someClass">' +
                          '          <data>' +			   
                          '            <![CDATA[' +
                          '              <B>JOSCELMO SOUSA GOMES</B><br />' +
                          '              Juiz de Direito Titular do 1º Juizado Especial Cível<br />' +
                          '              Respondendo pelo 2º Juizado Especial Cível de Imperatriz' +
                          '            ]]>' +
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +*/
                          '    </items>\n' +
                          '  </selectorDef>\n' +
                          '</Definitions>\n';

        var templateXmlDoc  = new DOMParser().parseFromString(templateXml, "application/xml");              
        var _j2SON = new j2.mod._._j2JSON;
        var escopoTemporalAno = j2.env.PJeVars.data.ano;
        var _s = ['domingo', 'segunda-feira', 'terça-feira', 
                  'quarta-feira', 'quinta-feira', 'sexta-feira', 
                  'sábado'];
        var _feriadosReligiososPadroes;
        
        var _id = function(id){
          return id + '.'  + escopoTemporalAno; 
        };
   
        var eventFiresGetter = function(){ 
          return '';
        };
        
        var setEscopoTemporal = function( ano ){
          escopoTemporalAno = ano;
          
          _feriadosReligiososPadroes = pkg.Calendario.util.padroesFeriadoReligiosos(ano);
        };

        var getXML = function (){
          return templateXmlDoc;
        };
        
        

        var adicionarCalendarioEventoGenerico = function () {
          var nMagItem = templateXmlDoc.createElement('item');
          nMagItem.setAttribute('id', 'semExpGenerico');
          nMagItem.setAttribute('label', 'Genérico');
          
          var cont = templateXmlDoc.createElement('itemContent');
          cont.setAttribute('type', 'plainText');
          cont.setAttribute('addtClassStyles', '');
          
          var d = templateXmlDoc.createElement('data');
          d.innerHTML = '.';
          
          templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
          nMagItem.appendChild(cont);
          cont.appendChild(d);
          
          return nMagItem;
        };
        
        var adicionarCalendarioEventoVazio = function () {
          var nMagItem = templateXmlDoc.createElement('item');
          nMagItem.setAttribute('id',  _id(guid()) );
          nMagItem.setAttribute('label', '[sem eventos]');
          nMagItem.setAttribute('disabled', 'true');
          
          var cont = templateXmlDoc.createElement('itemContent');
          cont.setAttribute('type', 'plainText');
          cont.setAttribute('addtClassStyles', '');
          
          var d = templateXmlDoc.createElement('data');
          d.innerHTML = '.';
          
          templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
          nMagItem.appendChild(cont);
          cont.appendChild(d);
          
          return nMagItem;
        };
        
        var __verificarTransferenciaDeData = function(calendarioEvento){
          forEach(calendarioEvento.transferenciaEvento, function(transf){
            if(transf.anoVigencia.toString() === escopoTemporalAno.toString()){
              calendarioEvento.transferenciaEventoVigente = transf;
              calendarioEvento.dataInicial = transf.dataInicial;
              if(transf.dataFinal)
                calendarioEvento.dataFinal = transf.dataFinal;
            }
          });

          return calendarioEvento;
        };

        var __parseData = function(_data, mes, ev){
          var _data = _feriadosReligiososPadroes[_data] ? _feriadosReligiososPadroes[_data] : _data;
          var _thisScopeYYYY = escopoTemporalAno;
          var _thisScopeYYAA = escopoTemporalAno;
          
          if(mes.month.calId === 1){
            _thisScopeYYAA = escopoTemporalAno - 1;
            _thisScopeYYYY = escopoTemporalAno;
          }else if(mes.month.calId === 12){
            _thisScopeYYAA = escopoTemporalAno;
            _thisScopeYYYY = escopoTemporalAno + 1;
          }
          
          var rep = [
            { key : 'YYYY', value : _thisScopeYYYY },
            { key : 'YYAA', value : _thisScopeYYAA }
          ];
          
          forEach(rep, function(e){
            _data = _data.replaceAll( e.key, e.value );
          });
          
          return _data;
        };
        
        var __disposicaoParaArray = function(disposicaoLegal){
          var _data = [];
          
          forEach(disposicaoLegal, function(e){
            if( e.anoVigencia && (e.anoVigencia.toString() !== escopoTemporalAno.toString()) )
              return;
            
            var dispEl = {
              dataAto       : e.dataAto,
              disposicao    : e.disposicao,
              url           : e.url,
              idDropbox     : e.idDropbox,
              refArtParInc  : e.refArtParInc
            };

            _data.push( dispEl ); 
          });
          
          return _data;
        };
        
        var adicionarCalendarioEvento = function (calendarioEvento, mes) {
          var nds = filter(templateXmlDoc.getElementsByTagName('items')[0].children, { 'id' : _id(calendarioEvento.id) });
          if(nds.length){
            return nds[0];
          }

          calendarioEvento = __verificarTransferenciaDeData(calendarioEvento);
          
          var __dataIn = __parseData( calendarioEvento.dataInicial, mes, calendarioEvento );
          var __dataFin = calendarioEvento.dataFinal ? __parseData( calendarioEvento.dataFinal, mes, calendarioEvento ) : -1;
          
          function __descDatas(){
            var ini = __dataIn;
            var fin = __dataFin;
            
            ini = ini.split('-');
            ini = ini.reverse();
            ini.pop();
            ini = ini.join('/');
            
            if(fin !== -1){
              fin = fin.split('-');
              fin = fin.reverse();
              fin.pop();
              fin = fin.join('/');
            }
            
            return ini + (fin !== -1 ? '-' + fin : '');
          }
          
          var nMagItem = templateXmlDoc.createElement('item');
          nMagItem.setAttribute('id', _id(calendarioEvento.id));
          nMagItem.setAttribute('dataPattern', _feriadosReligiososPadroes[calendarioEvento.dataInicial] ? _feriadosReligiososPadroes[calendarioEvento.dataInicial] : calendarioEvento.dataInicial);
          
          var cont = templateXmlDoc.createElement('itemContent');
          cont.setAttribute('type', 'plainText');
          cont.setAttribute('addtClassStyles', '');
          
          
          var d = templateXmlDoc.createElement('data');
          d.innerHTML = '.';
          
          templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
          nMagItem.appendChild(cont);
          cont.appendChild(d);
          
          
          
          var _dataPlus = {
            isoDate : __dataIn,
            data : __dataIn.split('-').reverse().join('/'),
            data_ : calendarioEvento.descricao,
            atoRes : __disposicaoParaArray( calendarioEvento.disposicaoLegal ), 
            transf : calendarioEvento.transferenciaEventoVigente ? __disposicaoParaArray( calendarioEvento.transferenciaEventoVigente.disposicaoLegal ) : false,
            temporalidade : pkg.Calendario.util.temporalidadeData(__dataIn, (__dataFin !== -1 ) ? __dataFin : null),
            tipo : calendarioEvento.tipo,
            isoDateFin : (__dataFin !== -1 ) ? __dataFin : null,
            dataFin : (__dataFin !== -1 ) ? __dataFin.split('-').reverse().join('/') : null
          }; 
          
          function ___descEventoLabel(){
            return calendarioEvento.descricao + ( _dataPlus.transf ? ' (transferido)'  : '' );
          }
          nMagItem.setAttribute('label', __descDatas() + ' - ' + ___descEventoLabel());

          var _dayOfWeek = new Date(__dataIn + ' 00:00:00').getDay();
          switch( _dayOfWeek ){
            case 0: //dom
            case 6: //sab
              if( !(calendarioEvento.dataFinal) ){ 
                nMagItem.setAttribute('disabled', 'true');                
                nMagItem.setAttribute('label', '(' + _s[_dayOfWeek] + ') ' + __descDatas() + ' - ' + ___descEventoLabel());
              }
              break;
          }
          if(!_dataPlus.atoRes.length){
            nMagItem.setAttribute('disabled', 'true');                
            nMagItem.setAttribute('label', '(sem ato) ' + __descDatas() + ' - ' + ___descEventoLabel());
          }
          
          nMagItem.setAttribute('dataPlus', _j2SON.stringify(_dataPlus) );
          
          return nMagItem;
        };    

        var adicionarEventoFire = function (evNm) {
          var edNd = templateXmlDoc.createElement('eventFire').setAttribute('event', evNm);
          templateXmlDoc.getElementsByTagName('selectorDef')[0].appendChild( edNd );
        };
        
        var adicionarGrupo = function (evNm) {
          var edNd = templateXmlDoc.createElement('group');
          edNd.setAttribute('label', evNm);
          
          templateXmlDoc.getElementsByTagName('groupsDefs')[0].appendChild( edNd );
          
          return edNd;
        };
        
        var setItemsInitialSelected = function (id) {          
          templateXmlDoc.getElementsByTagName('items')[0].setAttribute('initialSelected', id);
        };
        
        var adicionarItemDeGrupo = function (id, grupo, prepend) {
          var gI = templateXmlDoc.createElement('gItem');
          gI.setAttribute('id', id);
          
          grupo[prepend ? 'prepend' : 'appendChild']( gI );
        };
        
        var atualizarItemFormats = function (itemFormat) {
          var _el = templateXmlDoc.createElement('elemento');
          _el.setAttribute('tag', itemFormat.tag || 'p');
          _el.setAttribute('scope', 'NONE');
          _el.setAttribute('class', itemFormat.class);
          _el.innerHTML = itemFormat.j2Fragmento;
          
          templateXmlDoc.getElementsByTagName('itemFormats')[0].appendChild( _el );
        };
        
        var getItem = function (id) {
          var nds = filter(templateXmlDoc.getElementsByTagName('items')[0].children, { 'id' : id });
          if(nds.length){
            return nds[0];
          }else
            return null;
        };
        
        return { 
          'XMLObject' : getXML, 
          'adicionarCalendarioEvento' : adicionarCalendarioEvento, 
          'adicionarEventFire' : adicionarEventoFire, 
          'atualizarItemFormats' : atualizarItemFormats, 
          'adicionarCalendarioEventoGenerico' : adicionarCalendarioEventoGenerico,
          'setEscopoTemporal' : setEscopoTemporal,
          'adicionarGrupo' : adicionarGrupo,
          'adicionarItemDeGrupo' : adicionarItemDeGrupo,
          'setItemsInitialSelected' : setItemsInitialSelected,
          'adicionarCalendarioEventoVazio' : adicionarCalendarioEventoVazio,
          'getItem' : getItem
        };
      },
      util : { 
        temporalidadeData : function(date, dateFim){ 
          isString(date) && ( date = new Date(date) );
          date = date.setHours(0,0,0,0);
          var today = new Date().setHours(0,0,0,0);
          
          var dFim;
          if(dateFim){
            isString(dateFim) && ( dFim = new Date(dateFim) );
            dFim = dFim.setHours(0,0,0,0);
            
            if (date <= today && today <= dFim)
              return 'EM CURSO';
            if(date > today) return 'FUTURO'; 
            if(dFim < today) return 'PASSADO'; 
          }else{
            if(today === date) return 'PRESENTE'; 
            if(date > today) return 'FUTURO'; 
            if(date < today) return 'PASSADO'; 
          }
        },
        mesesPraTras : function(date, meses){
          isString(date) && ( date = new Date( date ) );
          
          var initMonth = new Date(new Date( date.setDate(1)).setHours(0,0,0,0));

          do{
            var mon = initMonth.getMonth();
            if(mon > 0)
              initMonth = new Date( initMonth.setMonth(--mon) );
            else{
              initMonth = new Date( initMonth.setFullYear( initMonth.getFullYear() - 1 ) );
              initMonth = new Date( initMonth.setMonth( 11 ) );
            }
            meses--;
          }while(meses > 0)
            
          return initMonth;  
        },
        mesesPraFrente : function(date, meses){ 
          isString(date) && ( date = new Date( date ) );
          
          var initMonth = new Date(new Date( date.setDate(1)).setHours(0,0,0,0));

          do{
            var mon = initMonth.getMonth();
            if(mon < 11)
              initMonth = new Date( initMonth.setMonth(++mon) );
            else{
              initMonth = new Date( initMonth.setFullYear( initMonth.getFullYear() + 1 ) );
              initMonth = new Date( initMonth.setMonth( 0 ) );
            }
            meses--;
          }while(meses > 0)
            
          return pkg.Calendario.util.paraOFimDoMes( initMonth );
        },
        paraOFimDoMes : function(date){
          isString(date) && ( date = new Date( date ) );
          
          switch( date.getMonth() ){
            case  0: //janeiro
            case  2: //março
            case  4: //maio
            case  6: //julho
            case  7: //agosto
            case  9: //outubro
            case 11: //dezembro
              date.setDate( 31 );
              break;
              
            case  3: //abril
            case  5: //junho
            case  8: //setembro
            case 10: //novembro
              date.setDate( 30 );
              break;
              
            case 1: //fevereiro
              date.setDate( 28 );
              break;
          }  
            
          return new Date(date);
        },
        padroesFeriadoReligiosos : function (ano) {
          function subtrairDias(data, dias){
            return new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
          }
          function somarDias(data, dias){
            return new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
          }
          function toIso(data){
            data = new Date( data.setHours(0,0,0,0) );  
            var _isoStringAr = data.toISOString().split('T')[0].split('-');  
            return ['YYYY', _isoStringAr[1], _isoStringAr[2]].join('-');
          }  

            
          var X=24;
          var Y=5;
          var a=ano % 19;
          var b=ano % 4;
          var c=ano % 7;
          var d=(19* a + X) % 30;
          var e=(2*b + 4 * c + 6 * d + Y) % 7;
          var soma=d+e;

          if (soma > 9) {
            dia=(d+e-9);
            mes=03;
          }else {
            dia=(d+e+22);
            mes=02;
          }

          var _pascDate = new Date(ano,mes,dia);  
          var pascoa      = _pascDate;
          var pascoaSex   = subtrairDias(_pascDate, 2); 
          var pascoaQui   = subtrairDias(_pascDate, 3);  
          var pascoaQua   = subtrairDias(_pascDate, 4);    
          var corpusChr   = somarDias(_pascDate, 60);   
          var carnavalSeg = subtrairDias(_pascDate, 48); 
          var carnaval    = subtrairDias(_pascDate, 47); 
          var carnavalQua = subtrairDias(_pascDate, 46); 

          return {
            ano : ano,
            'YYYY-CARNAVAL' : toIso(carnaval),
            'YYYY-CARNAVAL-SEG' : toIso(carnavalSeg),
            'YYYY-CARNAVAL-TER' : toIso(carnaval),
            'YYYY-CARNAVAL-QUA' : toIso(carnavalQua),

            'YYYY-PASCOA' : toIso(pascoa),
            'YYYY-PASCOA-DOM' : toIso(pascoa),
            'YYYY-PASCOA-SEX' : toIso(pascoaSex),
            'YYYY-PASCOA-QUI' : toIso(pascoaQui),
            'YYYY-PASCOA-QUA' : toIso(pascoaQua),

            'YYYY-CORPUS'     : toIso(corpusChr)
          };  
        }
      },  
      /*
       * 
       * @param {type} dispLeg
       * @returns {w.j2.mod.clsCnstr.Calendario.criarLinkParaDisposicaoLegal.spn|_L16.Calendario.criarLinkParaDisposicaoLegal.spn|_L16.pkg.Calendario.criarLinkParaDisposicaoLegal.spn|Element}
       * 
       */
      criarLinkParaDisposicaoLegal : function(dispLeg){    
        var imgViewCln = jQ3('<img id="ReferenciaDocumento.View" src="https://pje.tjma.jus.br/pje/img/view.gif" style="vertical-align: bottom;">')[0]; 

        imgViewCln.style.height = '16px';
        imgViewCln.style.verticalAlign = 'text-bottom';

        var spn = document.createElement('span');
        var u = document.createElement('u');
        spn.style.cursor = 'pointer';
        spn.title = 'Visualizar ' + dispLeg.disposicao + ( dispLeg.dataAto ? ' de ' + dispLeg.dataAto : '' );
        spn.setAttribute('contenteditable', false);
        u.innerHTML = dispLeg.disposicao + ( dispLeg.refArtParInc ? ', ' + dispLeg.refArtParInc + ' ' : '' ); 
        
        
        
        var _url = dispLeg.url ? dispLeg.url : 
                   ( dispLeg.idDropbox ? 'https://www.dropbox.com/s/$/$.pdf?raw=1'.replace('$', dispLeg.idDropbox).replace('$', encodeURI(dispLeg.disposicao)) : '' );
        
        if( _url.length === 0 )
          return dispLeg.disposicao; 
        
        var oCSrc = "window.open( '$', '$', 'width=940, height=740, scrollbars=yes').focus();";
        oCSrc = oCSrc.replace('$', _url).replace('$', guid());
        
        
        spn.setAttribute('onclick', oCSrc);
        imgViewCln.setAttribute('onclick', oCSrc);

        spn.appendChild( u );
        u.appendChild( imgViewCln );

        return spn;
      }
    };
    
    pkg.CartaPrecatoriaJuizosDeprecanteDeprecado = {
      constructor_ : function(args, el){
        pkg.CartaPrecatoriaJuizosDeprecanteDeprecado._ = [];
        var _ = pkg.CartaPrecatoriaJuizosDeprecanteDeprecado._[pkg.CartaPrecatoriaJuizosDeprecanteDeprecado._.length] = {
          exp : { 
            juizoDeprecado : $(el.exp).find('#QualificacaoJuizosDeprecanteDeprecado-juizoDeprecado')[0],
            juizoDeprecadoOficio : function(){return $('#cartaPrecatoria-oficio-juizoDeprecado')[0];}
          },
          edt : {
            juizoDeprecado : $(el.edt).find('#CartaPrecatoriaJuizosDeprecanteDeprecado-juizoDeprecado')[0]
          }
        };
        
        _.edt.juizoDeprecado.onchange = function(){
          _.exp.juizoDeprecado.innerHTML = _.edt.juizoDeprecado.value;
          _.exp.juizoDeprecadoOficio().innerHTML = _.edt.juizoDeprecado.value;
        };
        
        pkg.CartaPrecatoriaJuizosDeprecanteDeprecado.setEvents(_);
      },
      setEvents : function(_){

      }
    };    

    pkg.ContatosPartes = {
      constructor_ : function(args, el){
    
        var _ = {
          tBody : $(el.exp).find('tbody'),
          org : {
            papelRow : $(el.exp).find('#row-papel').clone(),
            dadosParteRow : $(el.exp).find('#row-dadosParte').clone()
          }
        };
        
        pkg.ContatosPartes.setEvents();
        
        if(j2.env.PJeVars.partes.list && j2.env.PJeVars.partes.list.todasPartes)
          pkg.ContatosPartes.processarContatos(_, args);
        else
          evBus.on('afterProcess.PJeVars.Partes.List-infoPessoa-processedAll', function(event){ 
            pkg.ContatosPartes.processarContatos(_, args);
          });
      },
      setEvents : function(){
        evBus.once('onLoadModeloJ2', function(event, definitiions){
          j2.modelo.edt.win.close();
        });
      },
      processarContatos : function(_i, args){
        if(!(j2.env.PJeVars.partes.list && j2.env.PJeVars.partes.list.todasPartes))
         return;        
        
        var partesList = j2.env.PJeVars.partes.list;
        var groups = {};
        var oncePapel = false;
        var onceParte = false;
        
        forEach(partesList.todasPartes, function(parte, a){
          if(!(parte.papel))
            return;
          
          if(!(groups[parte.papel]))
            groups[parte.papel] = [];
          groups[parte.papel].push(parte);
          
        });
        
                
        forEach(groups, function(grp){
          if(!(oncePapel)){
            $(_i.tBody).find('#Contatos-Partes-papel').text(grp[0].papel);
            oncePapel = true;
          }else{
            var c = _i.org.papelRow.clone();
            c.find('#Contatos-Partes-papel').text( grp[0].papel );
            _i.tBody.append(c);
          }
            
            
          forEach(grp, function(pess){
            if(!(onceParte)){
              $(_i.tBody).find('#Contatos-Partes-nome').text(pess.nome);
              $(_i.tBody).find('#Contatos-Partes-telefone').text( pess.meiosContato.telefone ? pess.meiosContato.telefone.join('\n') : '' );
              $(_i.tBody).find('#Contatos-Partes-whatsApp').text( "" );
              forEach(pess.meiosContato.telefone, function(tel, cnt){
                if(cnt >= 1)
                  $(_i.tBody).find('#Contatos-Partes-whatsApp').append( $('<BR>') );
                $(_i.tBody).find('#Contatos-Partes-whatsApp').append( pkg.ContatosPartes.createLinkWhatsApp(tel) );
              });
              $(_i.tBody).find('#Contatos-Partes-exportarContato').empty();
              $(_i.tBody).find('#Contatos-Partes-exportarContato').append( pkg.ContatosPartes.createLinkCartaoVisita(pess) );
              
              onceParte = true;
            }else{
              var c = _i.org.dadosParteRow.clone();
              
              c.find('#Contatos-Partes-nome').text( pess.nome );
              c.find('#Contatos-Partes-telefone').text( pess.meiosContato.telefone ? pess.meiosContato.telefone.join('\n') : '' );
              c.find('#Contatos-Partes-whatsApp').text( "" );
              forEach(pess.meiosContato.telefone, function(tel, cnt){
                if(cnt >= 1)
                  c.find('#Contatos-Partes-whatsApp').append( $('<BR>') );
                c.find('#Contatos-Partes-whatsApp').append( pkg.ContatosPartes.createLinkWhatsApp(tel) );
              });
              c.find('#Contatos-Partes-exportarContato').empty();
              c.find('#Contatos-Partes-exportarContato').append( pkg.ContatosPartes.createLinkCartaoVisita(pess) );
              
              _i.tBody.append(c);
            }
            
          });
        });
      },
      createLinkWhatsApp : function(tel, preTx){ // lwapac
        var imgViewCln = mod.edt.gE('ReferenciaDocumento.View').cloneNode(true);
        
        imgViewCln.setAttribute('mce_style', '');
        imgViewCln.style.height = '12px';
        imgViewCln.style.verticalAlign = 'bottom';

        var spn = document.createElement('span');
        var u = document.createElement('u');
        spn.style.cursor = 'pointer';
        spn.title = 'abrir conversa whatsapp com telefone' + tel;
        spn.setAttribute('contenteditable', false);
        u.innerHTML = ((typeof preTx !== 'undefined') ? preTx : 'WhatsApp ') + tel; // lwapac


        var spnBs = document.createElement('span');
        spnBs.innerHTML = '&nbsp;';
        
        var telWA = tel.replace(/\D/g, "");
        
        //var telURL = 'https://web.whatsapp.com/send?phone=55' + telWA +'&text=' + x +'&app_absent=0'; // wa
        var telURL = 'https://web.whatsapp.com/send?phone=55' + telWA; // wa
        
        var oCSrc = "var _e = document.getElementById('SDLinkedElementwhatsAppMessages');\n"; //wa
        oCSrc +=    "var _b = '" + telURL + "';\n"; //wa
        oCSrc +=    "var __wT = (_e) ?  '&text=' + encodeURI(_e.innerText)  : '' ;\n"; //wa
        oCSrc +=    "var _url = _b + ( (__wT.length !== 0) ? __wT : '') ;\n";
        //oCSrc +=    "debugger;\n"; //wa
        oCSrc +=    "window.console.log('WA message enconded: ' + encodeURI(__wT) )\n"; //wa
        oCSrc +=    "window.open( _url, 'conversaWhatsAppPopUp', 'width=940, height=740, scrollbars=yes').focus();"; // wa

        spn.setAttribute('onclick', oCSrc);
        imgViewCln.setAttribute('onclick', oCSrc);

        spn.appendChild( u );
        u.appendChild( imgViewCln );
        
        return spn;
      },
      createLinkCartaoVisita : function(pess){

        var spn = document.createElement('span');
        var u = document.createElement('u');
        var a = document.createElement('a');
        
        spn.style.cursor = 'pointer';
        spn.title = 'Exportar cartão de visitas para realizar a importação no Google Contacts';
        spn.setAttribute('contenteditable', false);
        u.innerHTML = 'Exportar' ;
        a.setAttribute('download', pess.nome.split(' ')[0] + ' Contato PJe.csv');
        a.style.cursor = 'pointer';

        var csvText = "Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Language,Photo,Group Membership,Phone 1 - Type,Phone 1 - Value\n";
        csvText += ( (pess.CPFCNPJ) ? pess.CPFCNPJ : 'XXXXXXXXXXX' ) + " - "+ pess.nome + "," + ( (pess.CPFCNPJ) ? pess.CPFCNPJ : 'XXXXXXXXXXX' ) + " - "+ pess.nome + ",,,,,,,,,,,,,,,,,,,,,,,,,,,* myContacts,,";
        
        forEach(pess.meiosContato.telefone, function(tel, cnt){
          if(cnt >= 1)
            csvText += " ::: ";
          csvText += tel;
        });
        
        a.setAttribute('href', 'data:application/octet-stream,'+ encodeURIComponent(csvText));
        
        var spnBs = document.createElement('span');
        spnBs.innerHTML = '&nbsp;';

        spn.appendChild( a );
        a.appendChild( u );
        
        $(a).css('color', 'black');
        return spn;
      }
    };
    
    pkg.Corpo = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.exp): mod.exp;
        var _ = {
          body : win.gE('singleBody')
        };        
        
        if(isObject(args)){
          if(args.newId){
            if(_.body)
              _.body.id += '.'+args.newId;
            else{
              j2.err('A mudança de Id ara o novo elemnto seletor é obrigatória');
              return;
            }
          }
          if(args.textIndent)
            _.body.style.textIndent = args.textIndent;
          if(args.textContent){
            args.textContent = j2.mod.builder.parseVars(args.textContent);
            args.textContent = j2Conv(args.textContent);
            _.body.innerHTML = args.textContent;
          }
          
          if(args.styleClasses){
            styleSetter(_.body, args.styleClasses);
          }
        }
      }
    };
    
    pkg.CheckBox = {
      constructor_ : function(args, el, modElProt){
        modElProt.versao_ = parseFloat(modElProt.versao);

        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.edt): mod.edt;
        var _ = {
          div : win.gE( modElProt.versao_ >= 4.0 ? 'CheckBox-Div' : 'CheckBox:Div'),
          input : win.gE( modElProt.versao_ >= 4.0 ? 'CheckBox-Input' : 'CheckBox:Input'),
          labelP : win.gE( modElProt.versao_ >= 4.0 ? 'CheckBox-Label' : 'CheckBox:Label'),
          __modElProt__: modElProt
        };        
        
        if(isObject(args)){
          if(args.newId){
            var c = 0;
            forEach(_, function(e){
              e.id += ( modElProt.versao_ >= 4.0 ? '-' : ':') + args.newId;
              c++;
            });
            if(c===0){
              j2.err('A mudança de Ids para o nova classe é obrigatória');
              return;
            }
            if ( modElProt.versao_ >= 4.0 )
              _.labelP.setAttribute('for', _.labelP.getAttribute('for') + '-' + args.newId)
          }
          if(args.exporInstancia ==='true' || args.exporInstancia ==='sim'){
            if (!(pkg.CheckBox.instances))
              pkg.CheckBox.instances = {};
            
            pkg.CheckBox.instances[args.newId] = _.input;
          }
          
          if(args.label)
            _.labelP.innerHTML = args.label;          
          
          if(args.styleClasses)
            styleSetter(_.labelP, args.styleClasses);
          
          if(args.initChecked && (args.initChecked ==='true' || args.initChecked ==='sim'))
            _.input.checked = true;
          
          _.input.onchange = function(e){
            evBus.fire('CheckBox.' + ((args.evBusEvent) ? args.evBusEvent : 'Default') + '.onCheck', _, e);
          };          
          
          pkg.CheckBox.setEvents(_, args);
        }
      },
      setEvents : function(_, args){  
        /*evBus.on('beforeFinishEdition.postConfirmation', function(event){
          pkg.DocEditorCore.proceedFinish = true;
          evBus.fire('beforeFihishEdition');
        });*/         
      }
    };
    
    pkg.DestinatarioExpediente = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.edt): mod.edt;
        
        var _ = {
          ctxt : el,
        /*  div : win.gE('CheckBox:Div'),
          input : win.gE('CheckBox:Input'),
          labelP : win.gE('CheckBox:Label')*/
          __class__ : { // ndlga
            class : 'DestinatarioExpediente',
            super : el._.__class__.super.SeletorPessoa._this
          }
        };        
        
        el._.__class__ = { // ndlg4 as new
          super : {
            DestinatarioExpediente : {
              _this : _,
              super : el._.__class__.super
            }
          }
        };
        /*
        args = args || {};
        
        //default param
        args.bindSeletorPessoaElement = 'selectorPessoaTextSpan';
        
        */
        if(isObject(args)){
          args.bindSeletorPessoaFormats && 
          args.bindSeletorPessoaElement && 
          mod.exp.gE(args.bindSeletorPessoaElement) &&
          j2.mod._.styleSetter(mod.exp.gE(args.bindSeletorPessoaElement), args.bindSeletorPessoaFormats);
          
          pkg.DestinatarioExpediente.setEvents(_, args);
        }
      },
      setEvents : function(_, args){  
        args.padraoApresentacao && evBus.on('SeletorPessoa.beforeChange.selectorPessoa', function(event, pessoaSelected, _selObj){
          var pt = args.padraoApresentacao;
          pt += (args.separador || args.separadorPadrao) ? '#:span@sep{}' : ''; // ndlg
          
          var __ = j2Conv(j2.mod.builder.parseVars(pt));
          _selObj.toAppd.body = __;  
        });      
        
        args.padraoApresentacao && args.separador && evBus.on('SeletorPessoa.afterChange.selectorPessoa', function(event, pessoaSelected, _selObj){
          var __ = j2Conv(j2.mod.builder.parseVars(args.separador));
          
          var ar = _selObj._sel.lnkEl.querySelectorAll('#sep');
          for(var i = 0; i < ar.length -1; i++)
            ar[i].innerHTML = __;
        });      
        
        args.padraoApresentacao && args.separadorPadrao && evBus.on('SeletorPessoa.afterChange.selectorPessoa', function(event, pessoaSelected, _selObj){ // ndlg          
           var ar = _selObj._sel.lnkEl.querySelectorAll('#sep');
          if(ar.length === 1) // ndlg2
            return;
          else if(ar.length === 2)
            ar[0].innerHTML = ' e ';
          else 
            for(var i = 0; i < ar.length - 1; i++)
              ar[i].innerHTML = ( i===(ar.length-2) )   ? ' e ' : ', '; // ndlg

        }); 
      }
    };
    
    pkg.DestinatarioExpedienteFrameComunicacao = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.edt): mod.edt;
        
        
        var _ = {
          section : mod.exp.gE('singleBody.destinatarioExpediente').parentElement,
          
          pDest : mod.exp.gE('singleBody.destinatarioExpediente'),
          pDestTitle : mod.exp.gE('vocativoPreText'),
          pDestVocativo : mod.exp.gE('vocativo'),
          
          pAdvogado : mod.exp.gE('advogados'),
          initialLines : (function(){
            if (mod.exp.gE('vocativo').outerText )
              return mod.exp.gE('vocativo').outerText.split('\n');

            var ar = [];
            jQ3(mod.exp.gE('vocativo').childNodes).each(function(a, b){
              if(b.nodeName === '#text')
                ar.push(b.textContent);
            });
              return ar;
            })()
        };        
        
        /*
        args = args || {};
        
        //default param
        args.bindSeletorPessoaElement = 'selectorPessoaTextSpan';
        
        */
       /*
        if(isObject(args)){
          args.bindSeletorPessoaFormats && 
          args.bindSeletorPessoaElement && 
          mod.exp.gE(args.bindSeletorPessoaElement) &&
          j2.mod._.styleSetter(mod.exp.gE(args.bindSeletorPessoaElement), args.bindSeletorPessoaFormats);
          
          pkg.DestinatarioExpediente.setEvents(_, args);
        }
        */
       
        pkg.DestinatarioExpedienteFrameComunicacao.setEvents(_, args);
        
        if(j2.env.PJeVars.partes.list && j2.env.PJeVars.partes.list.todasPartes)
          pkg.DestinatarioExpedienteFrameComunicacao.processarNovosDestinatarios(_, args);
        else
          evBus.on('afterProcess.PJeVars.Partes.List-infoPessoa-processedAll', function(event){ 
              pkg.DestinatarioExpedienteFrameComunicacao.processarNovosDestinatarios(_, args);
            });
      },
      processedEnderecos : [],
      processarNovosDestinatarios : function(_, args, meioComnicacao){
        if(!(meioComnicacao))
          meioComnicacao = (args.initialMeioComnicacao) ? args.initialMeioComnicacao : 'meioComunicItSistema';  // nct
        
        if( !(j2.env.PJeVars.partes.list && j2.env.PJeVars.partes.list.todasPartes) )
          return;
        
        var selPessTodas = j2.env.PJeVars.partes.list.todasPartes;
        var lines = _.initialLines;
        var newDests = [];
        var idFrmComId = 1;
        let resolveMatch = (lns, pssNome) => {
          let _pssNome = pssNome;
          if ( _pssNome.includes('registrado civilmente como') )
            _pssNome = _pssNome.split(" registrado")[0]
          
          return lns.replace(/[(]|[)]/g, '').match( new RegExp(_pssNome.replace(/[(]|[)]/g, ''))) !== null;
        }

        var iteLastPess;
        var _it;
        forEach(selPessTodas, function(pss){
          _it  = {
            pss : false,
            end : false,
            break : false
          }
          forEach(lines, function(lns){
            if(_it.break)
              return;

            if(resolveMatch(lns, pss.nome)){
              newDests[newDests.length] = pss;
              pss.idFrmComId = 'idFrmComId' + idFrmComId;
              idFrmComId++;
              iteLastPess = pss;
              _it.pss = true;
              return;
            }

            if(_it.pss && resolveMatch(lns, 'CEP:')){
              pss.enderecoPAC = pkg.Utilidades.parseEnderecosFrameComunicacao(lns)
              pss.enderecoPAC.map( puEnd => pkg.DestinatarioExpedienteFrameComunicacao.processedEnderecos.push(puEnd) )
              pss.enderecoPAC._ = ()=>{
                var res = '';
                var _this = pss.enderecoPAC;

                _this.forEach( itEnd =>{
                  _this.iterator = itEnd;

                  var frag = domify( j2Conv(j2.mod.builder.parseVars( args.padraoEnderecoPAC )) )
                  frag.querySelector('#selPesEnd').setAttribute('j2-id', itEnd.uuid )

                  
                  var temp = document.createElement('div');
                  temp.appendChild(frag);

                  res += temp.innerHTML;
                } )

                return res;
              }

              _it.end = true;
            }

            if(_it.end && lns.length === 0)
              _it.break = true;
          });
        });
        
        if(!newDests.length)
          return;
        
        var prtP = args.padraoApresentacaoParteGeneral;
        var exbAdv = false;
        
        switch(meioComnicacao){
          case 'meioComunicItCorreios':        prtP = args.padraoApresentacaoParteEndereco; break;
          case 'meioComunicItCentralMandados': prtP = args.padraoApresentacaoParteEnderecoTelefone; break;
          case 'meioComunicItTelefone':        prtP = args.padraoApresentacaoParteTelefone; break;
          case 'meioComunicItWhatsApp':        prtP = args.padraoApresentacaoParteWhatsApp; break;  // lwapac
          case 'meioComunicItDJe':             exbAdv = true; break;
          case 'meioComunicItSistema':         exbAdv = true; break;
        }
        
        var rc = _.pDestVocativo.innerHTML;
        _.pDestVocativo.innerHTML = '';
        _.pAdvogado.remove();
        
        /* nomes das partes */
        var flgOnce = false;
        forEach(newDests, function(dest){
          
          var _p = filter(j2.env.PJeVars.partes.list.todasPartes, {idFrmComId : dest.idFrmComId});          
          pkg.SeletorPessoa.selected = (_p.length) ? _p[0] :  null ;
          
          var pt = prtP;
          if(dest.OAB)
            if(pt.indexOf('#:SPAN@oab{}') !== -1)
              pt = pt.replace('#:SPAN@oab{}', '#:SPAN@oab{ #:B{- OAB#{j2.mod.clsCnstr.SeletorPessoa.selected.OAB}}}')
            else
              pt += ' #:B{- OAB#{j2.mod.clsCnstr.SeletorPessoa.selected.OAB}}';
          pt += (args.separador) ? '#:span@sep{}' : '';
          
          if(flgOnce)
            _.pDestVocativo.innerHTML += j2Conv('#:BR{}');
            
          _.pDestVocativo.innerHTML += j2Conv(j2.mod.builder.parseVars(pt)); 

          if( meioComnicacao==='meioComunicItCentralMandados'){ 
            if( typeof QRious === 'undefined'){
              
              j2.mod.com.libLoader(j2.res.lib.jqueryUi);
              j2.mod.com.libLoader(j2.res.CSS.jqueryUi);
              evBus.on('loaded-'+ j2.res.lib.jqueryUi.lib, function(){
                j2.mod.com.libLoader(j2.res.lib.qrious);

                evBus.on('loaded-'+ j2.res.lib.qrious.lib, function(){
                  pkg.DestinatarioExpedienteFrameComunicacao.createCentralMandadoQRCode(_.pDestVocativo)
                });
              })
              
            }else{
              pkg.DestinatarioExpedienteFrameComunicacao.createCentralMandadoQRCode(_.pDestVocativo);
            }
          }
          
          forEach(_.pDestVocativo.querySelectorAll('#PJeVars-renderedWhatsApp'), function(e){ // lwapac
            jQ3(e).addClass('HLField');
          });
          
          flgOnce = true;
          
          if(!(exbAdv)) 
            return;
          if(!(dest.advogado))
            return;
          
          forEach(dest.advogado, function(adv){
            pkg.SeletorPessoa.selected = adv;
          
            pt = args.padraoApresentacaoAdvogado;
            pt += (args.separador) ? '#:span@sep{}' : '';

            _.pDestVocativo.innerHTML += j2Conv(j2.mod.builder.parseVars(pt));          
          });
          
          
        });
        
      },
      setEvents : function(_, args){  
        if(!(j2.env.PJeVars.partes.list && !(j2.env.PJeVars.partes.list.todasPartes)))
          evBus.on('afterProcess.PJeVars.Partes.List-infoPessoa-processedAll', function(event, definitions){
            pkg.DestinatarioExpedienteFrameComunicacao.processarNovosDestinatarios(_, args);
          });
        
        var itemsSelectorsMeioComunicacaoConhecidos = [
          'selectorintimacaoSelectMeio',
          'selectorcitacaoSelectMeio' // nct
        ];
        
        forEach(itemsSelectorsMeioComunicacaoConhecidos, function(id) {
          evBus.on('onChange.' + id, function(ev, selVal, sel, selI){
            pkg.DestinatarioExpedienteFrameComunicacao.processarNovosDestinatarios(_, args, selVal);
          });
        });
        
        var cb = function(event, closer){ // lwapac
           if(_.pDestVocativo.querySelectorAll('#PJeVars-renderedWhatsApp').length !== 0){
             pkg.DocEditorCore.proceedFinish = false; 
             pkg.ModalDialog.okCancel('Confirmo ser(em) #:B{válidos o(s) contato(s) de WhatsApp} gerados no expediente!', 'Modelo j2 - Atenção', 
             'DestinatarioExpedienteFrameComunicacao.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
           }
        };
        evBus.on('beforeFihishEdition', 10000, cb); // lwapac
        evBus.once('DestinatarioExpedienteFrameComunicacao.noEditionsConfirmed', function(event){ // lwapac
          forEach(_.pDestVocativo.querySelectorAll('#PJeVars-renderedWhatsApp'), function(e){ 
            jQ3(e).removeClass('HLField');
          });
          evBus.off('beforeFihishEdition',cb);
        }); 

        evBus.on('onFinishEdition', 900, function(){
          jQ3('.ui-helper-hidden-accessible').remove()
          jQ3('[j2-tooltiped]').removeAttr('title')
          mod.par.$('#Fragment-Loader-div').remove()
          jQ3('#vocativo .HLField').removeClass('HLField')
        })
      },
      treateEnderecoParaQRCodeURL: endereco =>{
        endereco = endereco.replaceAll(',', '')
        endereco = endereco.replaceAll('  ', ' ')
        /*if( endereco.indexOf("CEP") !== -1 ){
          const posicaoCep = endereco.indexOf("CEP");
          endereco = endereco.substring(0, posicaoCep).trim();
        }
        const uf = endereco.split('-').pop();
        const ufIndex = endereco.lastIndexOf(uf);
        const nomeEstado = j2.env.PJeVars.util.UFExtensoByUF(uf)
        endereco = `${endereco.substring(0, ufIndex-1)} ${nomeEstado}`;*/

        endereco = endereco.split(' ').map( ii=> encodeURIComponent(ii) )
        endereco = endereco.join('+')

        return endereco;
      },
      createCentralMandadoQRCode : frag =>{
        var $frag = jQ3(frag)
        if(!($frag.length))
          return;

        var treateEndereco = pkg.DestinatarioExpedienteFrameComunicacao.treateEnderecoParaQRCodeURL;
        
        function displayQRsAdjust($qrs){
          const sepBase = 8;
          let $codes = jQ3( $qrs.get(0).querySelectorAll('#qr-code') );
          let hg = {
            qrs : 0,
            pss : 0
          }
          
          switch($codes.length){
            case 1:
              return;
            
            case 2:
              $codes.find('span[div]').each( (i, d) => hg.qrs += jQ3(d).height() )
              hg.pss = $qrs.prev().find('> span').height() + sepBase
              
              let isBigger = hg.qrs > hg.pss;
              
              $qrs.css({
                display: isBigger ? 'inline-flex' : ''
              })
              
              $codes.each((idx, el) => {
                if (idx % 2 === 0)
                  jQ3(el).css({
                    marginRight: isBigger ? `${sepBase}px` : '' 
                  })
                else
                  jQ3(el).css({
                    marginTop: isBigger ? '' : `${sepBase}px`
                  })
              })
              return;
              
            default:
              if( $qrs.find('#col-A').length !== 0 )
                return;

              let colA = jQ3('<span>', {
                id : 'col-A',
                css: {
                  display: 'grid',
                  justifyItems: 'center'
                }
              })
              let colB = jQ3('<span>', {
                id : 'col-B',
                css: {
                  paddingLeft: `${sepBase}px`,
                  display: 'grid',
                  justifyItems: 'center'
                }
              })
              
              $qrs.append(colA);
              $qrs.append(colB);
              
              $qrs.css({
                display: 'inline-flex'
              })
                            
              $codes.each((idx, el) => {
                let $el = jQ3(el)
                if (idx % 2 === 0){
                  colA.append($el)
                  if( colA.children().length > 1) 
                    $el.css({ marginTop: `${sepBase}px`})
                }else{
                  colB.append($el)
                  if( colB.children().length > 1) 
                    $el.css({ marginTop: `${sepBase}px`})
                }
              })
              return;
          }  
        }
        
        var $qrs = jQ3( $frag.get(0).querySelectorAll('#qr-codes') );
        $qrs.each((ixd, el)=>{
          $sp = jQ3(el);
          var $qrT = $sp.find('#qr-code:first').detach()
          $sp.empty();

          var $enderecoPAC = $sp.parent().find('#enderecoPAC') 
          var $selPesEnd_ar = jQ3( $enderecoPAC.get(0).querySelectorAll('#selPesEnd') );

          function proceedEnd( $endereco /* as selPesEnd*/, $qr_ ){
            $endereco.on( 'DOMSubtreeModified',()=>{
              var $img = $endereco.$img
              var $end = $endereco.$end
              var $a   = $endereco.$a

              if( !($end.text().length) )
                return

              var endU = treateEndereco(pkg.Utilidades.parseEnderecosFrameComunicacaoToQRCodeGoogleMaps($end.text()));
              var url = `https://www.google.com/maps/search/${endU}`;

              var uqr = new QRious({
                value: url,
                padding: 0,
                level: 'H',
                size: 'auto'
              });

              $img.attr('src', uqr.toDataURL())
              $a.attr('onclick', `
                window.open( '${url}', 'consultaEnderecoGMaps-${$endereco.uuid}', 'width=1315, height=740, scrollbars=yes').focus();
              `);

              displayQRsAdjust($sp)
            })

            var endereco = treateEndereco(pkg.Utilidades.parseEnderecosFrameComunicacaoToQRCodeGoogleMaps($endereco.text()))
            var uuid = $endereco.attr('j2-id')

            
            var url = `https://www.google.com/maps/search/${endereco}`

            var qr = new QRious({
              value: url,
              padding: 0,
              level: 'H',
              size: 'auto'
            });

            var $img = jQ3('<img>', {
              src : qr.toDataURL(),
              "j2-id" : uuid
            });
            var $a = jQ3('<a>', {
              css : {
                cursor: 'pointer'
              },
              title: 'Clique para fazer consulta diretamente no GoogleMaps',
              href: 'javascript:void(0);',
              onclick : `
                window.open( '${url}', 'consultaEnderecoGMaps-${uuid}', 'width=1315, height=740, scrollbars=yes').focus();
              `
            });
            var $div = jQ3('<span>', {
              css : {
                "border-radius": "2px",
                "box-shadow": "rgb(0 0 0 / 50%) 0px 0px 2px 2px",
                padding: "3px"
              },
              div: ''
            });

            $endereco.$img = $img
            $endereco.$end = $endereco
            $endereco.$a = $a
            $endereco.uuid = uuid

            $div.append($a)
            $a.append($img)          
            $qr_.append($div)
            $sp.append($qr_)

            $qr_.attr("j2-id-qr", uuid)
          }

          $selPesEnd_ar.each((idx, el)=>{
            let $el = jQ3( el )

            $el.attr('title', `A edição direta deste endereço foi desabilitada 
              para preservar a integridade do(s) QRcode(s) ao lado. 
              Clique para editar este endereço no painel abaixo do editor.`);
            $el.attr('contenteditable','false')  
            $el.attr('j2-tooltiped','true')  
            
            
            !($el.attr('j2-dblclick')) && $el.click(function(event){
              var uuid_f = $el.attr('j2-id')

              evBus.once(`FragmentLoader.onloadFragment.uuid-${uuid_f}`, (ev, _FragIns) => {                
                j2.mod.clsCnstr.DestinatarioExpedienteFrameComunicacao.manipularPainelEdicaoEndereco(_FragIns, $el, uuid_f)
              })

              if(pkg.AddtionalControls)
                pkg.AddtionalControls.append(jQ3.extend({ uuid : uuid_f }, pkg.AddtionalControls.defaultContainer() ), 
                  'Editor-Endereco-PAC');
            });

            $el.attr('j2-dblclick', '_c')

            proceedEnd( $el, $qrT.clone().empty().css({
              marginRight: '',
              marginTop: '',
            })  )
          })
          
          displayQRsAdjust($sp)
        })
        
        jQ3('body').tooltip();
      },
      manipularPainelEdicaoEndereco : (_FragIns, $selEnd, _uuid) => {
        var pkgProcEnds = j2.mod.clsCnstr.DestinatarioExpedienteFrameComunicacao.processedEnderecos;
        var $frag = _FragIns.$fragRaw;

        var itEnd = filter(pkgProcEnds, {uuid : _uuid});
        itEnd = (itEnd.length) ? itEnd[0]: null;

        if(  ! (itEnd) ){
          j2.warn('Não foi localizado o endereço pré-processado.');
          return;
        }

        function updateQRCode(){
          if( !($selEnd.text().length) )
                return

          var endU = pkg.DestinatarioExpedienteFrameComunicacao.treateEnderecoParaQRCodeURL( 
            pkg.Utilidades.parseEnderecosFrameComunicacaoToQRCodeGoogleMaps($selEnd.text()) 
          );
          var url = `https://www.google.com/maps/search/${endU}`;

          var uqr = new QRious({
            value: url,
            padding: 0,
            level: 'H',
            size: 'auto'
          });

          $frag.find('#qr-code img').attr('src', uqr.toDataURL() )
          $frag.find('#qr-code a').attr('onclick', `
            window.open( '${url}', 'consultaEnderecoGMaps-${_uuid}', 'width=1315, height=740, scrollbars=yes').focus();
          `);

          $frag.find('#enderecoQRCode').val( pkg.Utilidades.parseEnderecosFrameComunicacaoToQRCodeGoogleMaps($selEnd.text()) )
        }

        forEach(itEnd, (val, prop) => {
          let $fld = $frag.find(`#${prop}`);
          $fld.val(val).change(()=>{
            itEnd[prop] = $fld.val()
            $selEnd.html(itEnd._())

            updateQRCode()
          })
        })

        updateQRCode()


        $selEnd.parents('#vocativo').find('.HLField').removeClass('HLField')
        var $qrc = $selEnd.parents('#vocativo').find(`[j2-id-qr='${_uuid}']`)

        $selEnd.addClass('HLField')
        $qrc.addClass('HLField')


        $frag.find('#bntEncerrarEdicao').click(()=>{
          $selEnd.removeClass('HLField')
          $qrc.removeClass('HLField')
          $frag.hide()
        })
      }
    };
    
    pkg.DJeControls = {
      activated : false,
      constructor_ : function(args, el){  
        var _ = {
          linkedElement : args.linkedElement ? args.linkedElement : null,
          exp : {
            assunto : $(el.exp).find('#oficio-assuntoExp')[0]
          },
          edt : {
            activatorButton : $(el.edt).find('#DJeControls-Activator')[0],
            container : $(el.edt).find('#DJeControls-Activated')[0]
          }
        };
        
        /* register actions */
        _.edt.activatorButton.onclick = function(){
          pkg.DJeControls.activateControls();
        };
        
        pkg.DJeControls._ = _;
      },
      setEvents : function(_, args){         
        evBus.on('DJeControls.onExternalActivation', function(ev, selVal, sel, selI){
          pkg.DJeControls.activateControls();
        });
      },
      hideControls : function(){
        var _g = pkg.DJeControls._;
        
        j2.mod._.styleSetter(_g.edt.container, 'Hidden', false);
        $(pkg.DJeControls._.edt.container).empty();
        
        $(_g.edt.activatorButton).show();
        
        pkg.DJeControls.activated = false;        
      },
      activateControls : function(){
        if(pkg.DJeControls.activated)
          return;
          
        var _g = pkg.DJeControls._;
        
        if(!(pkg.HtmlTools)){
          pkg.ModalDialog.ok('Erro ao realizar trasncirção. :(');
          return;
        }
          
        $(_g.edt.activatorButton).hide();
        
        var ipSC = {
          id : 'pasteSetDJeControls',
          label : 'Colar aqui teor da transcrição',
          container : _g.edt.container,
          gE : function(){
            //_.edt.container
          }
        }; 
        
        evBus.once('DJeControls.onBuildDJeControls', function(event, container){    
          j2.mod._.styleSetter(_g.edt.container, 'Hidden', true);
          
          evBus.fire('Editor.onResize');
          
          pkg.DJeControls.activated = true;          
          
         
          var _ = {
            iframe : $(container).find('#' + ipSC.id + '-textTrasncription'),
            addAction : $(container).find('#' + ipSC.id + '-addAction'),
            addActionDocRef : $(container).find('#' + ipSC.id + '-addActionFromReferencia')
          };

          _.addAction.click(function(){
            var text = _.iframe.contents().find('body').html();;
            text = pkg.DJeControls.editFunc.processText(text);
            pkg.DJeControls.editFunc.apensarTextoProcessado(text);
          });

          _.addActionDocRef.click(function(){
            if(!(pkg.ReferenciaDocumento)){
              pkg.ModalDialog.ok('Pacote da Referência de Documento não foi encontado.', 'DJeControls j2 - Erro');
              return;
            }

            var doc;
            try {
              pkg.ReferenciaDocumento.getByExtern(function(doc){
                $.get(doc.url, function(a,b,c){
                  var _j2Exp = $(a).find('#j2Exp');

                  if(_j2Exp.length === 0){
                    pkg.ModalDialog.ok('O documento escolhido não é um documento j2. Favor colar manualmente.', 'DJeControls j2 - Erro');
                    return;
                  }
                  var j2ElementsRemove = [
                    '#MenuDeAtalhos',
                    '#firma',
                    '#QlfcTable',
                    '#CabecEnd',
                    '#Reloader'
                  ];  
                  forEach(j2ElementsRemove, function(e){
                    if(_j2Exp.find(e).length !== 0)
                    _j2Exp.find(e).remove();
                  });
                  _j2Exp.find('*').each((idx, el)=>{
                    if ( el.style && el.style.display === 'none' )
                      jQ3(el).remove()
                  });


                  var text = _j2Exp.html();
                  _.iframe.contents().find('body').html(text);
                  text = pkg.DJeControls.editFunc.processText(text);
                  pkg.DJeControls.editFunc.apensarTextoProcessado(text);
                }).fail(function(){
                  pkg.ModalDialog.ok('Não foi possível inserir a transcrição.', 'DJeControls j2 - Erro');
                });
              });
            }catch(e){
              pkg.ModalDialog.ok('Você precisa iniciar o procedimento de Inserir Referência de Documento.', 'DJeControls j2 - Erro');
              return;
            }

            

          });
          
          
        });
        
        
        pkg.HtmlTools.createLinkPastingSet2(ipSC.id, ipSC.label, ipSC.container, 'DJeControls.onBuildDJeControls');
      },
      editFunc : {
        processText : function(txt){
          var re = new RegExp('>', 'g');
          txt = txt.replace(re, '>\n');

          var cnt = $(txt);
          re = new RegExp('\n', 'g');

          txt = '';
          forEach(cnt, function(p){
              if (p.innerText) 
                  txt += p.innerText + '\n';
          });

          txt = txt.replace(re, ' ');
          re = new RegExp('  ', 'g');
          while(txt.indexOf('  ') !== -1)
              txt = txt.replace(re, ' ');
          return txt;
        },
        apensarTextoProcessado :  function(txt){
          var _ = pkg.DJeControls._;
          
          var e = $(mod.exp.doc).find('#' + _.linkedElement + ' li:last #intimacao-dje-transcricao');

          if(e.length === 0){
            e = $(mod.exp.doc).find('#' + _.linkedElement + ' li:last p:last');
            if(e.length ===0){
              pkg.ModalDialog.ok('Você não adicionou finalidades à intimação. Não é pssível colar a transcrição.', 'Intmação j2 - Atenção');
              return;
            }

            var cE = e.clone();
            cE[0].id='intimacao-dje-transcricao';
            cE.css('margin-left', '1cm');
            cE.text(txt);
            $(mod.exp.doc).find('#' + _.linkedElement + ' li:last').append(cE);
          }else{
            e.text(txt);
          }
        }
      }
    };
    
    pkg.DocEditorCore = {
      constructor_ : function(args, el){   
        if(args)
          if((args.width) && (args.height))
            pkg.DocEditorCore.size = {
              width : args.width,
              height : args.height
            };
        
          
        pkg.DocEditorCore.setEvents();
      },
      setEvents : function(){
        evBus.on('onFinishEdition', 800, function(event){
          j2.log('fired: onFinishEdition - DocEditCore');
          mod.edt.win.close();
          evBus.fire('DocEditorCore.afterCloseEditor');
        });
        evBus.on('beforeFihishEdition', 10, function(event){
          /* if event reacheat here, then all listening not avoided proceeed
           * the finihing edit
           */
          if(pkg.DocEditorCore.proceedFinish)
            evBus.fire('onFinishEdition');
        });    
        evBus.on('beforeFinishEdition.postConfirmation', function(event){
          pkg.DocEditorCore.proceedFinish = true;
          evBus.fire('beforeFihishEdition');
        });        
        
        evBus.on('docEditorCore.closeConfirmation', function(event){
          pkg.DocEditorCore.proceedFinish = true;
          evBus.fire('beforeFihishEdition');
        });
        
        
        evBus.on('docEditorCore.onCancelClose', function(event){
          pkg.DocEditorCore.proceedFinish = false;
          /*evBus.off('beforeFihishEdition');
          evBus.off('onFinishEdition');
          evBus.off('beforeFinishEdition.postConfirmation');
          evBus.off('beforeFihishEdition');*/
        });
      },
      proceedFinish : false,
      close : function () {
        pkg.ModalDialog.okCancel('Fechar o editor?', 'Modelos j2 - Confrimação', 'docEditorCore.closeConfirmation', 'docEditorCore.onCancelClose');
      }
    };
    
    pkg.Documento = {
      constructor_ : function(args, el){            
        /* diferenças aqui ao redor */
        if(args){
          if(args.importLib){
            forEach(args.importLib, function(lib){
              var art;
              if(!(lib.artifact)){
                art = parseVar(lib);
              if(art)
                  j2.mod.com.libLoader(art);
              }else{
                art = parseVar(lib.artifact);
                if(art)
                j2.mod.com.libLoader(art, {
                  doc : mod[lib.scope.toLowerCase()].doc,
                  loc : 'head'
                });
              }
            });
          }
          
          if(args.bodyInject)
            forEach(args.bodyInject, function(bi){
              var art = parseVar(bi.artifact);
              if(art){ 
                j2.mod.com.libLoader(art, {
                  doc : mod[bi.scope.toLowerCase()].doc,
                  loc : 'body'
                });
              }
            });
          
          if((args.width) && (args.height) && pkg.DocEditorCore)
            pkg.DocEditorCore.size = {
              width : args.width,
              height : args.height
            };
        }
        pkg.Documento.setEvents(args);
        
        pkg.Documento.setEvents(args);
      },
      sysPJeAutoSave : function(timeInterval){
        /* AUTO SAVE DOC */
        var _ = {
          but : j2.modelo.par.doc.querySelector('input.btn.btn-primary[value="Salvar"]')
        };
        
        
        var _rt = function(){
          switch(j2.modelo.par.win.location.pathname){
            case '/pje/Processo/ConsultaProcesso/Detalhe/detalheProcessoVisualizacao.seam':
            case "/pje/Processo/ConsultaProcesso/Detalhe/listAutosDigitais.seam":
            case '/pje/Visita/listView.seam':
              j2.log('pkg.Documento -> auto save doc on editor' + ( (timeInterval) ? ' intevalo: ' + timeInterval + 'ms': ''));
              _.but.click();
              break;
          }          
        };
        
        if(timeInterval)
          setInterval(_rt, timeInterval);
        else
          _rt();
      },
      setEvents : function (args, _) {
        /*evBus.once('builder.afterBuildModSet.main', 10000, function(event, argss){

        });*/
        
        evBus.on('Documento.trigger.sysPJeAutoSave', function(event, argss){
          pkg.Documento.sysPJeAutoSave();
        });
        
        evBus.on('onFinishEdition', 900, function(event, args){
          j2.log('fired: onFinishEdition - Documento');
          /*
           * Elementos que não tiveram o nome definido como ndhe serão excluidos
           * ndhe - not deletable hidden elements.
           * 
           * @type Array
           */
          var EHT = ['spans', 'div', 'img', 'p']; /* Excludible hidden tags*/
          var _ = [];
          forEach(EHT, function(t){
            forEach(mod.exp.doc.getElementsByTagName(t), function(e){
              if(e){
                if( e.style.visibility==='hidden' || e.style.display ==='none'){
                  if (e.getAttribute('name') ){
                    if (e.getAttribute('name') !== 'ndhe')
                      _[_.length] = e;
                  }
                  else
                    _[_.length] = e;
                }
              }else
                var i = 0;
            });
          });
          forEach(_, function(d){
            d.remove();
          });
        });
        
        evBus.on('AutoSave.onRecover', function(event){ // as3 as new
          pkg.Documento.isRecovered = true;
        });
      },
      updateParentFields : function(mnt, _objSel){
        /* PJe Window content validation */
        if(!( mod.par))
          return;
        
        var _pF = {
          juntDoc : {
            desc : mod.par.gE('ipDescDecoration:ipDesc'),
            docTipo : mod.par.gE('cbTDDecoration:cbTD'),
            numero : mod.par.gE('ipNroDecoration:ipNro')
          }
        };
        
        if(_pF.juntDoc.desc && _pF.juntDoc.docTipo)
          pkg.Documento.updateDescription(mnt, _objSel, _pF.juntDoc);
        if(_pF.juntDoc.numero )
          pkg.Documento.updateNumero(mnt, _objSel, _pF.juntDoc);
      },
      updateDescription : function(mnt, _obj, _p){
        var itDef;
        var _;
        var _a = []; 
        var _this = pkg.Documento;
        var _hlutl = pkg.Utilidades.highLightingController;
        
        if(!(mod.edt._tempUD)){ // UD significa Usuário Descrição           
          mod.edt._tempUD = {
            isUD : _p.desc.value !== _p.docTipo.options[_p.docTipo.options.selectedIndex].textContent
          };
        }
        
        if(mod.edt._tempUD.isUD) // se o usuário realizou sua própria descrição, rotina não executa
          return;
        
        forEach(mnt.options, function(op){ 
          itDef = filter(_obj.src.selectorDef.items.item, {id : op.id.itemId()});
          itDef = (itDef.length) ? itDef[0]: null;
          if(!(itDef))
            return;
          
          if(!(itDef.dataPlus))
            return;
                
          _ = j2SON(itDef.dataPlus);
          
          if(!(_.descricaoAppend))
            return;
        
          _.descricaoAppend = j2.mod.builder.parseVars(_.descricaoAppend);
          
          if(isArray(_.descricaoAppend))
            forEach(_.descricaoAppend, function(e){
              if(_a.indexOf(e)===-1)
                _a.push(e);
            });
          else
            if(_a.indexOf(_.descricaoAppend)===-1)
              _a.push(_.descricaoAppend);
            
          
        });
        
        //(!(_.doNotSort)) && _a.sort();
        if( !(_a.length) && !(mnt._['____updateDescription']) ) 
          return;
        
        var tx = '';
        for(var i = 0; i < _a.length; i++)
          tx += (tx.length) ? ( (i===_a.length-1)? ' e ': ', ' ) + _a[i] : _a[i];
                
        _p.desc.value = (tx.length) ? tx : _p.docTipo.options[_p.docTipo.options.selectedIndex].textContent ;
        _p.desc.title = _p.desc.value;
        mnt._['____updateDescription'] = tx.length !== 0;
        
        //jQ3(_p.desc)[(tx.length) ? 'addClass' : 'removeClass']('HLField');
        _hlutl[(tx.length) ? 'addField' : 'delField']('par', _p.desc.id, function(el){
          el.prop('title', el.val());
        });
      },
      updateNumero : function(mnt, _obj, _p){
        var itDef;
        var _;
        var _a = []; 
        var _this = pkg.Documento;
        var _hlutl = pkg.Utilidades.highLightingController;
        
        if(!(mod.edt._tempUN)){ // UD significa Usuário Descrição           
          mod.edt._tempUN = {
            isUN : _p.numero.value.length !== 0
          };
        }
        
        if(mod.edt._tempUD.isUN) // se o usuário realizou sua própria descrição, rotina não executa
          return;
        
        forEach(mnt.options, function(op){ 
          itDef = filter(_obj.src.selectorDef.items.item, {id : op.id.itemId()});
          itDef = (itDef.length) ? itDef[0]: null;
          if(!(itDef))
            return;
          
          if(!(itDef.dataPlus))
            return;
                
          _ = j2SON(itDef.dataPlus);
          
          if(!(_.numeroAppend))
            return;
        
          _.numeroAppend = j2.mod.builder.parseVars(_.numeroAppend);
          
          if(isArray(_.numeroAppend))
            forEach(_.numeroAppend, function(e){
              if(_a.indexOf(e)===-1)
                _a.push(e);
            });
          else
            if(_a.indexOf(_.numeroAppend)===-1)
              _a.push(_.numeroAppend);
            
          
        });
        
        //(!(_.doNotSort)) && _a.sort();
        if( !(_a.length) && !(mnt._['____updateNumero']) ) 
          return;
        
        var tx = '';
        for(var i = 0; i < _a.length; i++)
          tx += (tx.length) ? ( (i===_a.length-1)? ' e ': ', ' ) + _a[i] : _a[i];
                
        _p.numero.value = (tx.length) ? tx : '' ;
        _p.numero.title = _p.numero.value;
        mnt._['____updateNumero'] = tx.length !== 0;
        
        //jQ3(_p.numero)[(tx.length) ? 'addClass' : 'removeClass']('HLField');
        _hlutl[(tx.length) ? 'addField' : 'delField']('par', _p.numero.id, function(el){
          el.prop('title', el.val());
        });
        
      },
      getTeorExpediente : function(){ // ndlg4 as new
        var _body = jQ3(mod.exp.doc.body).clone();
        var _body = _body.find('#j2Exp');
        _body.find('*').each((idx, el)=>{
          if ( el.style && el.style.display === 'none' )
            jQ3(el).remove()
        });
        
        forEach([
          'cabecalho-brasao',
          'firma',
          'SDLinkedElementprioridadeExpedientesItems',
          'CabecEnd'
        ], function(el){
          _body.find('#'+ el).remove();
        });
        
                        
        return window.j2.mod._._j2ExpHTMLToPlainText(_body, true);
      }
    };
    
    pkg.ExpedienteVinculado = { // ndlg as new
      constructor_ : function(args, el){     
        var _noPanelRt = function(){
          pkg.ModalDialog.ok('O painel do Oficial de Justiça não foi encontrado. Gentileza reinicie o procedimento de registro da dilivência.', 'Modelo j2 - Atenção', 'onFinishEdition');
          evBus.on('DocEditorCore.afterCloseEditor', function(){
            mod.par.win.close();
          });
        };
        
        if(!(j2.modelo.par.win.opener)){ // ndlg3
          _noPanelRt();
          return;
        }
        
        if(!(j2.modelo.par.win.opener)){
          pkg.ModalDialog.ok('O painel do Oficial de Justiça não foi encontrado. Gentileza reinicie o procedimento de registro da dilivência.', 'Modelo j2 - Atenção', 'onFinishEdition');
          return;
        }
        
        if(!(j2.modelo.opn)){
          j2.modelo.opn = {
            $ : jQ3Factory(j2.modelo.par.win.opener, true),
            doc : j2.modelo.par.win.opener.document,
            gE : function(id){
              return j2.modelo.opn.getElementById(id);
            },
            win : j2.modelo.par.opener
          };
        }
        
        var _ = { 
          ctxt : el,
          open : $(mod.edt.gE('ExpedienteVinculado-ExpedienteOpener')),
          openerLinkedActions : {
            editar : j2.modelo.opn.$('a[href="/pje/Visita/listView.seam' + j2.modelo.par.win.location.search + '"]'),
            openExpediente : j2.modelo.opn.$('a[href="/pje/Visita/listView.seam' + j2.modelo.par.win.location.search + '"]').prev(),
            openProcesso : j2.modelo.opn.$('a[href="/pje/Visita/listView.seam' + j2.modelo.par.win.location.search + '"]').next()
          }
        };        
        
        if(!(_.openerLinkedActions.editar.length)){ // ndlg3
          _noPanelRt();
          return;
        }

        
        pkg.ExpedienteVinculado.parseIds(_);
        
        jQ3.get(_.openerLinkedActions.openExpediente.attr('href'), function(data, textStatus, jqXHR){ // ndlg2 as new
          if(textStatus==='success'){
            _.expediente$ = jQ3(data);
            pkg.ExpedienteVinculado.expediente.$ = _.expediente$;
          }
          if(textStatus==='error'){
            var e = 'Erro ao carregar html do expediente vinculado.';
            console.error(e);
            //pkg.ModalDialog.ok(e, "Diligencia J2");
          }
        });       
        
        
        _.open.find('#ExpedienteVinculado-idDoc'        ).text(pkg.ExpedienteVinculado.expediente.ids.doc); // ndgl2
        _.open.find('#ExpedienteVinculado-idExpediente' ).text(pkg.ExpedienteVinculado.expediente.ids.exp); // ndgl2
        _.open.find('#ExpedienteVinculado-tipoDocumento').text(pkg.ExpedienteVinculado.expediente.tipoDocumento); // ndgl2
        
        _.open.click(function(){  // ndgl2
          mod.sup.open('ExpedienteVinculadoViewExpediente', function(){          
            var _w = {
              url : _.openerLinkedActions.openExpediente.attr('href'),
              name : 'wndExpedienteVinculadoViewExpediente',
              idProcesso : j2.env.PJeVars.processo.idProcesso,
              winSize : {
                width : screen.width * 0.35,
                height : screen.height * 0.6
              }
            };

            j2.mod._._opW.center( _w.url, _w.name, _w.idProcesso, _w.winSize );
          });
        });
        
        
        
        
      },
      parseIds : function(_){ // ndlg2
        var exp = pkg.ExpedienteVinculado.expediente;
        var a = _.openerLinkedActions.openExpediente.attr('href');
        var parWLS = j2.modelo.par.win.location.search;
        
        exp.ids = {
          doc : (function(){
            var b = a.match(/idProcessoDoc=[0-9]+&/);
            return b[0].split('=')[1].split('&')[0];
          })(),
          bin : (function(){
            var b = a.match(/idBin=[0-9]+&/);
            return b[0].split('=')[1].split('&')[0];
          })(),
          exp : (function(){
            var b = parWLS.match(/idProcessoParteExpedienteSelecionado=[0-9]+&/);
            return b[0].split('=')[1].split('&')[0];
          })()
        };
        
      },
      expediente : { // ndlg2 as new
        ids : {
          /*doc : null,
          bin : null,
          exp : null*/
        },
        getMandadoTipo : function(){
          //pkg.ExpedienteVinculado.expediente.tipoDocumento
          var _thisExp = pkg.ExpedienteVinculado.expediente.$;
          if(!(_thisExp))
            return 'Mandado';
          
          var _data = jQ( '#expTitle', _thisExp ).text().trim();
          if(_data.length)
            return _data.capt();
          else
            return 'Mandado';
        }, 
        getIdLinkHtml : function(){
          if(pkg.ExpedienteVinculado.expediente.ids.length === 0) // para uso no hint das finalidades
            return 'id 1122334455';
          
          var getTextNodesIn = function(el) {
            return $(el).find(":not(iframe)").addBack().contents().filter(function() {
              return this.nodeType === 3;
            });
          };
          
          var _ = {
            selectMethod : { 
              value : 'docAutos'
            }, 
            ids : pkg.ExpedienteVinculado.expediente.ids
          };
          var doc = {
            id : pkg.ExpedienteVinculado.expediente.ids.doc,
            url : null
          };
          
          pkg.ReferenciaDocumento.findURL(doc, _);
          doc.url = window.location.origin + doc.url;
          pkg.ReferenciaDocumento.prepareHTMLElements(doc);
          
          var txN = getTextNodesIn(doc.html.spn);
          txN[0].textContent += ' (Expediente ' + _.ids.exp + ')';         
         
          return doc.html.spn.outerHTML;
        },
        tipoDocumento : (function(){
          var _data = jQ( 'div.propertyView:contains("Expediente") div.value', j2.modelo.par.doc.body).text().trim();
          if(_data.length){
             return _data;
          }else
            return 'Mandado';
        })(),
        verbosCumprimento : function(){
          var _ = pkg.ExpedienteVinculado.expediente.$.find('#expTitle');
          var _v = {
            passado : 'diligenciei',
            infinitivo : 'diligenciar'
          };

          if(!(_))
            return _v;

          var _parse = {
            passado : [],
            infinitivo : []
          };
          
          var pM = [
            [/avaliação/i,    'avaliei',     'avaliar'    ],
            [/buca/i,         'busquei',     'buscar'     ],
            [/citação/i,      'citei',       'citar'      ],
            [/constatação/i,  'constatei',   'constatar'  ],
            [/diligência/i,   'diligenciei', 'diligenciar'],
            [/intimação/i,    'intimei',     'intimar'    ],
            [/penhora/i,      'penhorei',    'penhorar'   ],
            [/recolhimento/i, 'recolhi',     'recolher'   ]
          ];
          
          forEach(pM, function(st){
            if( _.text().match(st[0])){
              _parse.passado.push(st[1]);
              _parse.infinitivo.push(st[2]);
            }
          });
          
          _v.passado    = (_parse.passado.sort().length   ) ? _parse.passado.joinListE()    : 'diligenciei';
          _v.infinitivo = (_parse.infinitivo.sort().length) ? _parse.infinitivo.joinListE() : 'diligenciar';

          return _v;
        },
        destinatarios : (function(){ // ndlg5 as new
          var _ar = [];
          forEach(jQ( 'div.propertyView:contains("Destina") div.value li', j2.modelo.par.doc.body), function(li){
            _ar.push( jQ(li).text().trim().substr(2) );
          });
          
          return _ar;
        })(),
        dataHorario : (function(){ // ndlg6 as new
          var _i = jQ('#formDiligencia\\:dataPrazoDecoration\\:dataPrazoInputDate', mod.par.doc);
          return {
            _ : _i,
            data : (_i.length) ? _i.val().split(' ')[0] : null,
            hora : (_i.length) ? _i.val().split(' ')[1] : null
          };
        })()
      }
    };
        
    pkg.FerramentasProcesso = {
      constructor_ : function(args, el, modElProt){
        modElProt.versao_ = parseFloat(modElProt.versao);

        var idP = j2.env.PJeVars.processo.idProcesso;
        var org = mod.par.win.location.origin;
        
        var _ = {
          ctxt : el,
          alerta : $(mod.edt.gE('FerramentasProcesso.Alerta')),
          tarefa : $(mod.edt.gE('FerramentasProcesso.Tarefa')),
          retificar : $(mod.edt.gE('FerramentasProcesso.Retificar')),
          downloadPDF : $(mod.edt.gE('FerramentasProcesso-baixarPDF')),
          downloadPDFPar : $(el.par).find('#FerramentasProcesso-baixarPDF-par'),
          whatsapp : $(mod.edt.gE('FerramentasProcesso-whatsappTool')), // wa
          __modElProt__ : modElProt
        };        
        
        if(modElProt.versao_ < 4.0 && mod.par.win.location.href.indexOf('newTaskId')!==-1){
          _.tarefa[0] && j2.mod._.styleSetter(_.tarefa[0], 'Hidden');
          /*_.alerta[0] && j2.mod._.styleSetter(_.alerta, 'width50');
          _.retificar[0] && j2.mod._.styleSetter(_.retificar, 'width50');*/
        }
        
        _.alerta.click(function(){ //pdf changed
          var url = org + '/pje/Processo/ConsultaProcesso/listAlertas.seam?id=' + idP;
          var xmlHttp=new XMLHttpRequest();

          xmlHttp.onreadystatechange=function(){
            if (xmlHttp.readyState===4 && xmlHttp.status===200){
              var rt = xmlHttp.responseText;

              if ( rt.indexOf('Sem permiss') !==-1 )
                if ( rt.indexOf('o para acessar a p') !==-1 )
                  if ( rt.indexOf('gina.')!==-1 )
                    url = org + '/pje/Alerta/listView.seam';

              j2.mod._._opW.center(url, 'wndAlerta', idP);
            }

            if (xmlHttp.readyState===4 && xmlHttp.status===404)
              alert('###### ERRO NO PROCEDIMENTO');
          };
          xmlHttp.open('GET',url,true);
          xmlHttp.send();
        });
        
        _.tarefa.click(function(){ //pdf changed
          j2.mod._._opW.center(org + '/pje/Processo/movimentar.seam?idProcesso='+ idP, 'wndMovProc', idP);
        });
        
        _.retificar.click(function(){ //pdf changed
          j2.mod._._opW.center(org + '/pje/Processo/RetificacaoAutuacao/updateRetificacaoAutuacao.seam?idProcesso='+idP+'&tab=tabPartes', 'wndRetProc', idP);
        });
        
        _.downloadPDF.click(function(){ // pdf 2
          pkg.FerramentasProcesso.pdfDownloadAction(_);
        });
        
        _.downloadPDFPar.click(function(){ // pdf 2
          _.downloadPDF.trigger("click");
          
        });
        
        _.whatsapp.click(function(){ // wa as new
          if(_.whatsapp.attr('profile') === 'OJ'){ // ndlg as new
            pkg.SeletorPessoa.createPseudoPessoaDoJuizo();
            pkg.FerramentasProcesso.whatsappAction(_, '1.0-oj');
            return;
          }
          pkg.FerramentasProcesso.whatsappAction(_);
        });
      },
      whatsappAction : function(_, version){ // wa as new
        var idPF = j2.env.PJeVars.processo.numero;

        function subAction(){
          mod.sup.FerramentasProcessoWhatsappTool.doc.title = 'j2 ' + idPF + ' - WhatsApp Tool';
          
          function _appendRoutine(){
            $(mod.sup.FerramentasProcessoWhatsappTool.doc.body).empty();
            
            pkg.AddtionalControls.append({
              exp : $('<div>')[0],
              edt : mod.sup.FerramentasProcessoWhatsappTool.doc.body,
              j2Win : mod.sup.FerramentasProcessoWhatsappTool,
              edtCore : function(){
                 if(!( this._.core) )
                   this._.core  = mod.sup.FerramentasProcessoWhatsappTool.gE('DocEditorInnerCore'); 

                 return this._.core;
              }
            }, 
            'FerramentasProcessos.whatsappTools', version || '1.0' ); // ndlg
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
            if(mod.sup.FerramentasProcessoWhatsappTool)
              mod.sup.FerramentasProcessoWhatsappTool.win.close();
          });
          
          evBus.on('afterChange.seletorPessoaWhatsapp', 10, function(event, closer){          
            evBus.fire('Editor.onResize', mod.sup.FerramentasProcessoWhatsappTool);
          });
        };
        
        mod.sup.open('FerramentasProcessoWhatsappTool', function(){
          var _ = {
            url : '',
            name : 'FerramentasProcessoWhatsappTool',
            winSize : {
              width : 335,
              height : 525
            },
            scrolled : false
          };
          return j2.mod._._opW.center( _.url, _.name, null, _.winSize, _.scroled, subAction );
        });
      },
      pdfDownloadAction : function(_){ // pdf as new
        var idPF = j2.env.PJeVars.processo.numero;
        
        mod.sup.open('FerramentasProcessoBaixarPDF', function(){
          var _ = {
            url : '',
            name : 'FerramentasProcessoBaixarPDF',
            winSize : {
              width : 50,
              height : 30
            }
          };
          return j2.mod._._opW.corner( _.url, _.name, null, _.winSize );
        });

        var j2ExpC = $(mod.exp.doc.getElementById('j2Exp')).clone(true);
        //j2ExpC.find('#textMargins').css('box-shadow', '');
        j2ExpC.find('div').filter(function() {
            return $(this).css('box-shadow').length > 0;
          }
        ).css('box-shadow', '');
        j2ExpC.find('#normalizeFormtas').css('border', '');

        var _pdfWin = mod.sup.FerramentasProcessoBaixarPDF;
        var _wB = _pdfWin.$('body');
        _wB.empty();
        _wB.append(j2ExpC);

        evBus.once('loaded-'+window.j2.res.lib.html2pdf.lib, function(event){            

          var opt = { 
            margin:       [10, 0, 10, 0], 
            filename:     j2.env.modId.id + ' ' + idPF + '.pdf',
            image:        { type: 'jpeg', quality: 1.00 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };

          _pdfWin.win.html2pdf().set(opt).from(_pdfWin.$('#j2Exp')[0]).save(null, mod.exp.doc);
          setTimeout(function(){_pdfWin.win.close();},250);
        });
        
        setTimeout(function(){
          j2.mod.com.libLoader(j2.res.lib.html2pdf, {
            doc : _pdfWin.doc, 
            loc : 'head'
          });
        }, 100);
      }
    };    
    
    
    pkg.FieldSet = {
      constructor_ : function(args, el){        
        var _ = {
          divContainer : mod.edt.gE('setField-id'),
          labelP    : mod.edt.gE('setField-label-p'),
          labelSpan : mod.edt.gE('setField-label-span')
        };        
        
        if(isObject(args)){
          if(args.newId)
            for(var e in _)
              if(_[e])
                if(_[e].id)
                  _[e].id += '-' + args.newId;
              
          if(args.fieldLabel)
            _.labelSpan.innerHTML = args.fieldLabel;
          
          if(args.fieldTitle)
            _.labelP.setAttribute('title', args.fieldTitle)

        }
      }
    }
  
    
    
    pkg.InputMonetarioCtrl = {
      sources : {},
      constructor_ : function(args, el){
        var _ = {
          label : mod.edt.gE('inputMonetario.label'),
          input : mod.edt.gE('inputMonetario.input'),
          lnkEl : null
        };
        
        if(isObject(args)){
          if(args.newId)
            if(_.input){
              for(var e in _)
                if(_[e])
                  if(_[e].id)
                    _[e].id += args.newId;

          }else{
            j2.log('A mudança de Id para o novo elemnto seletor é obrigatória');
            return;
          }
            
            
            if(args.linkedElement)
              _.lnkEl = mod.exp.gE(args.linkedElement);
            
            if(args.label)
              _.label.innerHTML = args.label;
            
            var flgSetEvents = false;
            if(args.onEventsDefault){
              if(args.onEventsDefault === 'sim'){
                _.input.onkeyup = function(event){
                  pkg.InputMonetarioCtrl.keyUpAction(_,event);
                };
                _.input.onkeypress = function(event){
                  pkg.InputMonetarioCtrl.keyPressAction(_,event);
                };
                _.input.onchange = function(event){
                  pkg.InputMonetarioCtrl.changeAction(_,event);
                };
                
                flgSetEvents = true;
              }
            }
            
            if(!flgSetEvents){
              if(args.onChange)
                if(args.onChange.indexOf('default')!==-1)
                  _.input.onchange = function(event){
                    pkg.InputMonetarioCtrl.changeAction(_,event);
                  };
              if(args.onKeyPress)
                if(args.onKeyPress.indexOf('default')!==-1)
                  _.input.onkeypress = function(event){
                    pkg.InputMonetarioCtrl.keyPressAction(_,event);
                  };
              if(args.onKeyUp)
                if(args.onKeyUp.indexOf('default')!==-1)
                  _.input.onkeyup = function(event){
                    pkg.InputMonetarioCtrl.keyUpActionn(_,event);
                  };
            }
            
            if(args.initialValue)
              evBus.once('loaded-'+ j2.res.lib.monetario.lib, function(ev, args_, el){
                if(args.initialValue === 'default')
                  _.input.value = j2.env.PJeVars.salarioMinimo * 100; /* 100 is need to processing */
                else
                  _.input.value = args.initialValue;

                _.input.onchange();
              });            
            
            
        }
      },
      keyPressAction : function(_,event){
        if(pkg.monetario)
          pkg.monetario.formatation.filtraNumeros(_.input, 16, event);
      },
      changeAction : function(_,event){
        if(pkg.monetario){
          pkg.monetario.formatation.formataValor(_.input, 16, event);
          pkg.monetario.writeExtense(_.lnkEl, _.input);
        }
      },
      keyUpAction : function(_,event){
        if(pkg.monetario){
          pkg.monetario.formatation.formataValor(_.input, 16, event);
          pkg.monetario.writeExtense(_.lnkEl, _.input);   
        }
      }
    };   
    
    pkg.j2Data = {
      constructor_ : function(args, el){    
        var _ = j2.env.PJeVars.processo.idProcesso;
        mod.exp.gE('j2Data.idProcesso').setAttribute('value', ((_)? _ : 0));
      },
      idProcesso : function(){return mod.exp.gE('j2Data.idProcesso').value;}
    };
    
     pkg.LocalEData = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.exp): mod.exp;
        var _ ={
          ld : win.gE('LocalEData')
        }; 
        
        if(isObject(args)){
          if(args.newId){
            if(_.ld)
              _.ld.id += '.'+args.newId;
            else{
              j2.err('A mudança de Id ara o novo elemnto seletor é obrigatória');
              return;
            }
          }
          
          if(args.oculto)
            if(args.oculto === 'sim' || args.oculto === 'true')
              j2.mod._.styleSetter(_.ld, 'Hidden');
        }
        if( _.ld.id === 'space') /* se ainda for space*/
          _.ld.id += '.' + Math.random().toString();
      }
    }; 
  
  
    pkg.MandadoDeOrdemJuiz = {
      constructor_ : function(args, el){
        var _ ={
          div : (function(){
            if(args)
              if(args.j2Win)
                return args.j2Win.gE('deOrdemMandadoTradicional_div');
            
            return mod.exp.gE('deOrdemMandadoTradicional_div');
          })()
        };
        
        if(args.oculto)
            if(args.oculto === 'sim' || args.oculto === 'true')
              j2.mod._.styleSetter(_.div, 'Hidden');
          
        pkg.MandadoDeOrdemJuiz.setEvents(_);
      },
      setEvents : function(_){
        /* quando da mudança do meio */
        forEach(['selectorintimacaoSelectMeio', 
                 'selectorcitacaoSelectMeio'], function(e){
          evBus.on('afterChange.'+e, function(event, value, obj){           
            j2.mod._.styleSetter(_.div, 'Hidden', (value === 'meioComunicItCentralMandados'));
          });
        });
      }
      
    };
    
    pkg.MeiosDeEncaminhamento = {
      constructor_ : function(args, el){
        var VERSAO_DO_AR = '6.1';
        var _ = {
          sel : $(el.edt).find('#Oficio_Meio_Select')[0]
        };
        
        _.comCentralMandados = true;
        if(args.semCentralMandados && (args.semCentralMandados ==='true' || args.semCentralMandados ==='sim'))
            _.comCentralMandados = false;
        
        var _ar = {
          create : function(){
            if(!(pkg.AR)){
              j2.mod.com.libLoader(j2.res.mod.AR);
              evBus.once('AR.onLoadLibs', function(event){
                pkg.AR.append(null, {
                  eventName : [
                    args.conteudoArEventoAutalizante || 'onChange.inuNum'
                  ],
                  sub : function(){
                    if(args.conteudoARTituloDocumentoPadrao && (args.conteudoARTituloDocumentoPadrao === 'true' || args.conteudoARTituloDocumentoPadrao ==='sim') )
                      return mod.exp.gE('expTitle').textContent.capt();
                    else
                      return mod.exp.gE('singleBody.oficio_numero').textContent;
                  }
                }, VERSAO_DO_AR);
              });
            }else{
              pkg.AR.visibleOn();
            }
          },
          hide : function(){
            if(pkg.AR){
              pkg.AR.visibleOff();
            }          
          }
        };
        
        _.sel.onchange = function(ev){
          switch(_.sel.value){
            case 'Oficio.Meio.centralDeMandados':
              _.comCentralMandados && pkg.SeletorOJ.visible(true);
              _ar.hide();
              break;
            case 'Oficio.Meio.correios':
              _.comCentralMandados && pkg.SeletorOJ.visible(false);
              _ar.create();
              break;
            case 'Oficio.Meio.outro':
              _.comCentralMandados && pkg.SeletorOJ.visible(false);
              _ar.hide();
              break;
            default:
              break;
          };
        };
      }
    };
    
    
    pkg.MenuDeAtalhos = {
      depreciado : true,
      constructor_ : function(args, el){
        pkg.MenuDeAtalhos.setEvents();
      },
      setEvents : function(){
        evBus.on('onFinishEdition', function(event){
          pkg.MenuDeAtalhos.selfRemoveOldVersion();
          
          j2.log('fired: onFinishEdition - MenuDeAtalhos');
          j2.mod.com.libLoader(j2.res.lib.menuContent);
          j2.mod.com.libLoader(j2.res.lib.menuContentScr);
          var script = '('+pkg.MenuDeAtalhos.action+')(event);';
          mod.exp.gE('ShortCutMenu.Action').setAttribute('onclick', script);
        });
        
        evBus.on('AutoSave.onRecover', function(event, type, jQEl){ // as3 as new
            var script = '('+pkg.MenuDeAtalhos.action+')(event);';
            jQEl.find('#ShortCutMenu\\.Action').attr('onclick', script);;
        });
      },
      action : function(event){        
        var domify = new function(){       
          Array.prototype.fromASCII = function(){
            var _ = [];
            this.map(function(c){
              _.push(String.fromCharCode(c));
            });
            return _.join('');
          };
          
          var innerHTMLBug = false;
          var bugTestDiv;
          if (typeof document !== 'undefined') {
            bugTestDiv = document.createElement('div');
            bugTestDiv.innerHTML = [32,32,60,108,105,110,107,47,62,60,116,97,98,108,101,62,60,47,116,97,98,108,101,62,60,97,32,104,114,101,102,61,34,47,97,34,62,97,60,47,97,62,60,105,110,112,117,116,32,116,121,112,101,61,34,99,104,101,99,107,98,111,120,34,47,62].fromASCII();
            innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
            bugTestDiv = undefined;
          }
          var map = {
            legend: [1, [60,102,105,101,108,100,115,101,116,62].fromASCII(), [60,47,102,105,101,108,100,115,101,116,62].fromASCII()],
            tr: [2, [60,116,97,98,108,101,62,60,116,98,111,100,121,62].fromASCII(), [60,47,116,98,111,100,121,62,60,47,116,97,98,108,101,62].fromASCII()],
            col: [2, [60,116,97,98,108,101,62,60,116,98,111,100,121,62,60,47,116,98,111,100,121,62,60,99,111,108,103,114,111,117,112,62].fromASCII(), [60,47,99,111,108,103,114,111,117,112,62,60,47,116,97,98,108,101,62].fromASCII()],
            _default: innerHTMLBug ? [1, [88,60,100,105,118,62].fromASCII(), [60,47,100,105,118,62].fromASCII()] : [0, '', '']
          };
          map.td =
          map.th = [3, [60,116,97,98,108,101,62,60,116,98,111,100,121,62,60,116,114,62].fromASCII(), [60,47,116,114,62,60,47,116,98,111,100,121,62,60,47,116,97,98,108,101,62].fromASCII()];
          map.option =
          map.optgroup = [1, [60,115,101,108,101,99,116,32,109,117,108,116,105,112,108,101,61,34,109,117,108,116,105,112,108,101,34,62].fromASCII(), [60,47,115,101,108,101,99,116,62].fromASCII()];
          map.thead =
          map.tbody =
          map.colgroup =
          map.caption =
          map.tfoot = [1, [60,116,97,98,108,101,62].fromASCII(), [60,47,116,97,98,108,101,62].fromASCII()];
          map.polyline =
          map.ellipse =
          map.polygon =
          map.circle =
          map.text =
          map.line =
          map.path =
          map.rect =
          map.g = [1, [60,115,118,103,32,120,109,108,110,115,61,34,104,116,116,112,58,47,47,119,119,119,46,119,51,46,111,114,103,47,50,48,48,48,47,115,118,103,34,32,118,101,114,115,105,111,110,61,34,49,46,49,34,62].fromASCII(), [60,47,115,118,103,62].fromASCII()];
          function parse(html, doc) {
            if ('string' != typeof html) throw new TypeError('String expected');
            if (!doc) doc = document;
            var m = /<([\w:]+)/.exec(html);
            if (!m) return doc.createTextNode(html);
            html = html.replace(/^\s+|\s+$/g, '');
            var tag = m[1];
            if (tag == 'body'){
              var el = doc.createElement('html');
              el.innerHTML = html;
              return el.removeChild(el.lastChild);
            }
            var wrap = map[tag] || map._default;
            var depth = wrap[0];
            var prefix = wrap[1];
            var suffix = wrap[2];
            var el = doc.createElement('div');
            el.innerHTML = prefix + html + suffix;
            while (depth--) el = el.lastChild;
            if (el.firstChild == el.lastChild) {
              return el.removeChild(el.firstChild);
            }
            var fragment = doc.createDocumentFragment();
            while (el.firstChild) {
              fragment.appendChild(el.removeChild(el.firstChild));
            }
            return fragment;
          }      
          return parse;
        };
        
        var lg = function(m){console.log('pkg.MenuDeAtalhos: ' + m);};
        var gE = function(i){return d.getElementById(i);};
        var d=document;
        
        
        
        function createStyles(){
          var mnEst = '.menuItem{ line-height: 22px; padding-left: 5px; cursor: pointer;} .menuItem:hover { background-color: #C7E5F0; border-bottom: 1px solid #4DB9E7; border-top: 1px solid #4DB9E7; }';
          var dv; var stl;
          dv = gE('ShortCutMenu.styles');
          
          if(!(dv)){
            lg('Contéudo está ausente. Criando-os.');
            var __SHORT_CUT_MENU_INNER_CONTENT_CODED = "PGRpdiBpZD0iU2hvcnRDdXRNZW51LlBvcHVwIiBuZGhlPSJuZGhlIiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IGJvcmRlci13aWR0aDogMXB4OyBib3JkZXItc3R5bGU6IHNvbGlkOyBib3JkZXItY29sb3I6IHJnYigyMDUsIDIwNSwgMjA1KTsgcG9zaXRpb246IGFic29sdXRlOyB0ZXh0LWFsaWduLWxhc3Q6IGxlZnQ7IHBhZGRpbmc6IDRweDsgbGVmdDogNzQxcHg7IHotaW5kZXg6IDIwOyB0b3A6IDE1cHg7IGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTsgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjQ4KSAycHggMnB4IDNweDsgZGlzcGxheTogbm9uZTsgdmlzaWJpbGl0eTogaGlkZGVuOyI+PGRpdiBpZD0iU2hvcnRDdXRNZW51LnN0eWxlcyI+PGRpdj48c3BhbiBzdHlsZT0iZGlzcGxheTpub25lIj4uPC9zcGFuPjwvZGl2PjwvZGl2PjxkaXYgaWQ9IlNob3J0Q3V0TWVudS5JdGVtcyI+PHRhYmxlIHN0eWxlPSJXSURUSDogMTIwcHg7IEJPUkRFUi1DT0xMQVBTRTogY29sbGFwc2U7IE1BUkdJTjogMHB0OyBMSU5FLUhFSUdIVDogMSI+PHRib2R5IGlkPSJTaG9ydEN1dE1lbnUuSXRlbXMudGJvZHkiPjx0cj48dGQ+PGRpdj48c3BhbiBzdHlsZT0iZGlzcGxheTpub25lIj4uPC9zcGFuPjwvZGl2PjwvdGQ+PC90cj48L3Rib2R5PjwvdGFibGU+PC9kaXY+PC9kaXY+";
            var _e = gE('ShortCutMenu.Container');
            var _c = domify( decodeURIComponent(escape(atob( __SHORT_CUT_MENU_INNER_CONTENT_CODED ))) );
            if(_e && _c)
              _e.appendChild(_c);  
            dv = gE('ShortCutMenu.styles');
          }
          
          if(dv.getElementsByTagName('style').length===0){
            stl = d.createElement('style');
            stl.innerHTML = mnEst;
            dv.appendChild( stl );
          }
        };
        function showPopup(){
          var ob = gE('ShortCutMenu.Popup');
          /*calculates position*/
          ob.style.left = event.target.offsetLeft + event.target.width + 'px';
          if (ob)
          {
            ob.style.visibility = 'visible';
            ob.style.display = '';
            ob.setAttribute('mce_style', '');
          }     
        };
        
        function loadMenuContent(){
          hf = localStorage.getItem('ROOT/lib/menuContent.j2');
          if(!(hf))
            return;
          hf = JSON.parse(hf);
          var tb=gE('ShortCutMenu.Items.tbody');
          while(tb.firstChild)
            tb.firstChild.remove();
          
          var fg=domify(hf.content);
          if(tb && fg)
            tb.appendChild(fg);      
          
          lg('html apensado à tabela do menu');
          
          
          var hf = localStorage.getItem('ROOT/lib/menuContent.js');
          if(!(hf))
            return;
          hf = JSON.parse(hf);
          var tst=gE('ShortCutMenu.styles');
                 
          if(tst.getElementsByTagName('script').length===0){
            var s = d.createElement('script');
            s.appendChild(d.createTextNode(hf.content));
            tst.appendChild(s);
          }
          
          lg('javascript carregado');
        };

        createStyles();
        lg('estilos foram criados');
        showPopup();
        lg('Showing PopUp');
        loadMenuContent();
        lg('Carregar javascript e html da tablea do menu');
      },
      selfRemoveOldVersion : function(){
        var checkLib = function(art){
          var i = localStorage.getItem(art.lib);
          
          if(i){
            var storedLib = JSON.parse(i);
            var vs = (storedLib.version)?storedLib.version:'0.0.0';

            if(art.version !== vs){
              localStorage.removeItem(art.lib);
            }
          }
        };
        
        checkLib(j2.res.lib.menuContent);
        checkLib(j2.res.lib.menuContentScr);
      }
    };
    
    pkg.ModalDialog = {
      constructor_ : function(args, el){
        var j2Win = args.j2Win || mod.edt;
        
        pkg.ModalDialog.setEvents(j2Win);
        
        
        var _ = {
          ok : j2Win.gE('btnOk'),
          cancel : j2Win.gE('btnCancel'),
          close : j2Win.gE('btnDialogClose'),
          title : j2Win.gE('panelDialogModalHeader'),
          msg : j2Win.gE('panelDialogModalMessage')
        };
        
        if(args.msg)
          _.msg.innerHTML = j2Conv(args.msg);
        
        if(args.title)
          _.title.innerHTML = j2Conv(args.title);
        
        _.ok.onclick = function(event){
          evBus.fire('modalDialog.close');
          if(args.okFire)
            forEach(args.okFire.split(';'), function(fEv){
              evBus.fire(fEv, event);
            });
        };
                
        if(_.cancel)
          _.cancel.onclick = function(event){
            evBus.fire('modalDialog.close');
            if(args.cancelFire)
              forEach(args.cancelFire.split(';'), function(fEv){
                evBus.fire(fEv, event);
              });          
          };
        
        _.close.onclick = function(event){
          evBus.fire('modalDialog.close');
          if(args.cancelFire)
            forEach(args.cancelFire.split(';'), function(fEv){
              evBus.fire(fEv, event);
            });      
        };
        
        
        if(_.cancel)
          _.cancel.focus();
        else
          _.ok.focus();
      },
      bus : { // ndlg3 as new
        defer : [], 
        fireNext : function(){
          var _this = pkg.ModalDialog.bus;
          
          _this.defer = _this.defer.splice(1);
          if(!(_this.defer.length))
            return;
          
          var modal = _this.defer[0];
          pkg.ModalDialog.renderer(
                modal.args.msg, 
                modal.args.title, 
                modal.args.dialogAction, 
                modal.args.content, 
                modal.args.container
          );
        },
        render : function(modal){
          var _this = pkg.ModalDialog.bus;
          
          _this.defer.push(modal);
          
          if(_this.defer.length === 1)
            pkg.ModalDialog.renderer(
                  modal.args.msg, 
                  modal.args.title, 
                  modal.args.dialogAction, 
                  modal.args.content, 
                  modal.args.container
            );
        }
      },
      setEvents : function(j2Win){
        evBus.once('modalDialog.defaultOkFire', function(event){
           j2Win.win.alert('ModalDialog ok button fired!');
        });
        evBus.once('modalDialog.close', 100000, function(event){
          j2Win.gE('panelContainer').remove();
          evBus.off('modalDialog.defaultOkFire');
          pkg.ModalDialog.bus.fireNext(); //  ndlg3
        });
      },
      okCancel : function(msg, title, eventOk, eventCancel, content, container){
        var dialogAction = {
          id : 'ModalDialogOkCancel',
          version : '3.0',
          actions : [
            {
              name : 'okFire',
              eventFire : eventOk
            },
            {
              name : 'cancelFire',
              eventFire : eventCancel
            }
          ]
        };
        
        pkg.ModalDialog.bus.render( {type : 'okCancel',  args : { // ndlg3 as new
          msg : msg,
          title : title,
          dialogAction : dialogAction,
          content : content,
          container : container
        }});
      },
      ok : function(msg, title, event, content, container){
        var dialogAction = {
          id : 'ModalDialogOk',
          version : '3.0',
          actions : [
            {
              name : 'okFire',
              eventFire : event
            }
          ]
        };
        
        pkg.ModalDialog.bus.render( {type : 'ok',  args : { // ndlg3 as new
          msg : msg,
          title : title,
          dialogAction : dialogAction,
          content : content,
          container : container
        }});
      },
      renderer : function(msg, title, dialogActions, dialogContent, container){
        var xml = '<Definitions id="Api" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                  '  <modelo id="apiModal">\n' +
                  '    <versao id="3.0">\n' +
                  '      <classe id="ModalDialog" versao="3.0">\n' +
                  '        <constructs param="title" value="' + ((title)?title:'Modelos j2') + '" type="string"/>\n' +
                  '        <constructs param="msg" value="' + msg + '" type="string"/>\n';
        if(dialogActions)
          forEach(dialogActions.actions, function(action){
            xml +='        <constructs param="'+action.name+'" value="'+action.eventFire+'" type="string"/>\n'; 
          });
        else
          xml +=  '        <constructs param="okFire" value="modalDialog.defaultOkFire" type="string"/>\n';                  
          xml +=  '        <classe id="' + ((dialogContent)?dialogContent.id:'ModalDialogContent') + '" versao="' + ((dialogContent)?dialogContent.version:'3.0') +'">\n' +
                  '          <classe id="' + ((dialogActions)?dialogActions.id:'ModalDialogOk') + '" versao="' + ((dialogActions)?dialogActions.version:'3.0') + '">\n' +
                  '          </classe>\n' +
                  '        </classe>\n' +
                  '      </classe>\n' +
                  '    </versao>\n' +
                  '  </modelo>\n' +
                  '</Definitions>';
          
        window.j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', 10000, function(err, definitions, context){
          if(definitions)         
            evBus.fire('modalDialog.rendere.afterParseXml', definitions);
          else
            j2.err(err);
        });
        
        evBus.once('modalDialog.rendere.afterParseXml', function(event, definitions){
          var modSet = definitions.modelos[0].versao[0];
          j2.mod.builder.build(modSet, 'ModalDialog', container);
        });
        evBus.once('builder.afterBuildModSet.ModalDialog', function(event, definitions){
          var context = {
            edt : (container) ? container.edt : mod.edt.doc.body,
            j2Win : (container) ? container.j2Win : mod.edt
          };
          
          var dialog = context.j2Win.gE('panelCDiv');
          
          dialog.style.left = (context.edt.clientWidth /2) - (dialog.clientWidth /2);
          dialog.style.top = (context.edt.clientHeight /2) - (dialog.clientHeight /2);
          
        });
      }
    };
    
    pkg.monetario = {
      constructor_ : function(args){
        var _this = pkg.monetario;
        
        args.modelDefVersion && (_this.modelDefVersion = parseFloat(args.modelDefVersion))
      },
      modelDefVersion : 1.0
    }

    pkg.NormalizarFormatacao = {
      constructor_ : function(args, el){
        pkg.NormalizarFormatacao.setEvents();
        
        var _ = { 
            area :     mod.exp.gE('normalizeFormtas'),
            ctrls :     mod.edt.gE('normalizeFormatsCtrls'),
            command :     mod.edt.gE('normalizeFormatsButton'),
            classes : {},
            method : null
        };
        
        if(isObject(args)){
          if(!(args.method))
            return;
          
          _.classes.mainText =                (args.mainText)                ? args.mainText                : 'p FntModDefault Indnt3cm marginAtoJudicial lineHeightUnset';
          _.classes.referenceJurisprudencia = (args.referenceJurisprudencia) ? args.referenceJurisprudencia : 'p FntModDefault marginJurisprudencia i lineHeightUnset';
          _.classes.alignCenter = 'AlignCenter Indnt0cm';
          _.ops = args.method;
          
          j2.mod._.styleSetter(_.ctrls, 'Hidden', true);
          
          _.command.onclick = function(e){
            pkg.NormalizarFormatacao.normalize(_);
          };
        }
      },
      setEvents : function(){
        evBus.on('onFinishEdition', function(event){
            j2.log('fired: onFinishEdition - NormalizarFormatacao');
            mod.exp.gE('normalizeFormtas').style.border = '';
            mod.exp.gE('normalizeFormtas').removeAttribute("mce_style");
        });
        
        evBus.on('AutoSave.onRecover', function(event, type, jQEl){ // as3 as new
            j2.log('fired: AutoSave.onRecover - NormalizarFormatacao');
            forEach(jQEl.find('#normalizeFormtas'), function(expDiv){
              expDiv.style.border = '';
              expDiv.removeAttribute("mce_style");
            });
        });
      }, 
      normalize : function(_){
        function seemsJurspRef(p){
          /*converting pixel to cms*/
          var __ = p.css('margin-left').replace('px','')*0.026458
          /*parece jurisprudencia se indentação for maior que 4 cm*/
          return __ > 4.0;
        };
        
        function formatP(p, stl){
          j2.mod._.styleSetter(p, stl);
        };
        
        var _$ = window.jQ3 || $;
        
        _$('#atoJudicial').find('p').each(function(idx, el){
          var _el = _$(el);
          var _cf;
          
          /* remover parágrafos vazios*/
          if(! _el.text().length ){
            _el.remove();
            return;
          }
          
          /*sinalizar se está centralizado*/
          _cf = _el.css('text-align').match(/center/);
          
          _el.removeAttr('mce_style');
		  _el.removeClass('MsoNormal');
		  
          if(seemsJurspRef(_el))
            formatP(el, _.classes.referenceJurisprudencia);
          else
            formatP(el, _.classes.mainText);
          
          if(_cf){
            formatP(el, _.classes.alignCenter);
          }
          
          _el.find('span').each(function(idx, elS){
            elS = _$(elS);
            elS.removeAttr('mce_style');
            elS.removeAttr('style');
          });
        });
        
      }
    };
    pkg.OficioNumero = {
      constructor_ : function(args, el){
        var _ = {
          exp : $(el.exp).find('#oficio_numeroExp')[0],
          edt : $(el.edt).find('#inuNum')[0]
        };
        
        _.edt.onchange = function(e){
          _.exp.innerHTML = (_.edt.value) ? _.edt.value : 'XXXXNumeroXXXX';
          evBus.fire('onChange.' + _.edt.id, _);
        };
        
        pkg.OficioNumero._.push(_);
      },
      setEvents : function(_){
        
      },
      _ : []
    };
    pkg.OficioCorpo = {
      constructor_ : function(args, el){
        pkg.OficioCorpo._ = [];
        var _ = pkg.OficioCorpo._[pkg.OficioCorpo._.length] = {
          exp : {
            assunto : $(el.exp).find('#oficio-assuntoExp')[0],
            cumprimento : {
              _ : $(el.exp).find('#OficioCorpo-cumrimento')[0],
              tratamento : $(el.exp).find('#OficioCorpo-cumprimento-tratamento')[0],
              cargo : $(el.exp).find('#OficioCorpo-cumprimento-cargo')[0]
            },
            corpo : {
              _ : $(el.exp).find('#OficioCorpo-Corpo')[0],
              peloPresente : $(el.exp).find('#OficioCorpo-cumrimento-peloPresente')[0],
              peloPresente_ : $(el.exp).find('#OficioCorpo-Corpo-peloPresenteSpace')[0],
              deOrdemSpan : {
                _ : $(el.exp).find('#OficioCorpo-Corpo-deOrdemSpan')[0],
                dOrdem : $(el.exp).find('#OficioCorpo-Corpo-deOrdem')[0],
                dOrdem_ : $(el.exp).find('#OficioCorpo-Corpo-deOrdemSpace')[0]
              },
              solicitacaoOrdem : $(el.exp).find('#OficioCorpo-Corpo-solicitacaoOrdem')[0], 
              solicitacaoOrdem_ : $(el.exp).find('#OficioCorpo-Corpo-solicitacaoOrdemSpace')[0],
              pronomeTratamento : $(el.exp).find('#OficioCorpo-Corpo-pronomeTratamento')[0],
              que : $(el.exp).find('#OficioCorpo-Corpo-que')[0],
              finalidade : $(el.exp).find('#OficioCorpo-Corpo-finalidade')[0],
              sobPena : {
                _ : $(el.exp).find('#OficioCorpo-Corpo-sobPenaResp')[0],
                text : $(el.exp).find('#OficioCorpo-Corpo-sobPenaResp.text')[0],
                despAnexo : $(el.exp).find('#OficioCorpo-Corpo-sobPenaResp-despAnex')[0]
              },
              dot : $(el.exp).find('#OficioCorpo-Corpo-dot')[0]
            },
            reverencia : {
              _ : $(el.exp).find('#OficioCorpo-Corpo-reverencia')[0],
              text : $(el.exp).find('#OficioCorpo-Corpo-reverencia-atenciosamente')[0]
            },
            paragrafosAdicionais : $(el.exp).find('#OficioCorpo-Corpo-ParagrafosAdicionais')[0]
          },
          edt : {
            corpo : {
              _ : $(el.edt).find('#OficioCorpo-Corpo-controls')[0],
              solicitacaoOrdem : $(el.edt).find('#OficioCorpo-Corpo-controls-solicitacaoOrdem-select')[0],
              finalidade : $(el.edt).find('#selectorOficioCorpo-Corpo-controls-FinalidadesItens')[0],
              sobPena : {
                _ : $(el.edt).find('#OficioCorpo-Corpo-controls-sobPena')[0],
                check : $(el.edt).find('#OficioCorpo-Corpo-controls-sobPenRespCheck')[0],
                label : $(el.edt).find('#OficioCorpo-Corpo-controls-sobPenRespLabel')[0]
              }
            },
            reverencia : $(el.edt).find('#OficioCorpo-Corpo-controls-reverencia-select')[0]
          }
        };
        
        pkg.OficioCorpo.registerActions(_);
        pkg.OficioCorpo.setEvents(_);
      },
      registerActions : function(_){
        _.edt.corpo.sobPena.check.onchange = function(){
          j2.mod._.styleSetter(_.exp.corpo.sobPena._, 'Hidden', _.edt.corpo.sobPena.check.checked);
        };
        
        _.edt.corpo.solicitacaoOrdem.onchange = function(){
          $(_.exp.corpo.solicitacaoOrdem).find('b u')[0].innerHTML = $(_.edt.corpo.solicitacaoOrdem).find(':selected').attr('j2Text');          
          _.exp.corpo.que.innerHTML = ( $(_.edt.corpo.solicitacaoOrdem).find(':selected').attr('j2QueHide') === 'false' ) ? '<span>&nbsp;que&nbsp;</span>' : '<span>&nbsp;</span>';
        };
        
        _.edt.reverencia.onchange = function(){
          _.exp.reverencia.text.innerHTML = $(_.edt.reverencia).find(':selected').attr('j2Text');
        };
        
      },
      setEvents : function(_){
        evBus.on('afterChange.selectorOficioCorpo-Corpo-controls-FinalidadesItens', function(ev, value, select, selI){
          if(selI.itemContent.type !== 'simpleElementsDefs'){
            j2.mod._.styleSetter(_.exp.paragrafosAdicionais, 'Hidden', false);
            return;
          }
          
          _.exp.corpo.finalidade.innerHTML = j2Conv(j2.mod.builder.parseVars(selI.itemContent.simpleElementsDefs.elemento[0].text.trim().trimSpaces()));
          
          var ar = [];
          var first = true;
          forEach(selI.itemContent.simpleElementsDefs.elemento, function (ele){
            if(! first)
              ar.push(ele);
            else
              first = false;
          });
          
          while(_.exp.paragrafosAdicionais.firstChild)
            _.exp.paragrafosAdicionais.firstChild.remove();
          
          forEach(ar, function (ele){
            j2.mod.builder.j2ElementParse(ele, _.exp.paragrafosAdicionais);
          });
                    
          j2.mod._.styleSetter(_.exp.paragrafosAdicionais, 'Hidden', true);
        });
        
        evBus.on('onChange.selectorOficioCorpo-Corpo-controls-FinalidadesItens', function(ev, value, select, selI){
          var it = j2.mod._._j2JSONparse( selI.dataPlus );
          _.exp.assunto.innerHTML = it.assunto;
          
          if(typeof it.imperativo !== 'undefined' ){
            $(_.edt.corpo.solicitacaoOrdem).prop('disabled', !it.imperativo);
            
            if(it.imperativo){
              
            }else{
              $(_.edt.corpo.solicitacaoOrdem).val(it.slcOrdSelect);
              $(_.edt.corpo.solicitacaoOrdem).change();
            }
          }else
            $(_.edt.corpo.solicitacaoOrdem).prop('disabled', false);
          
          if(typeof it.queVirgula !== 'undefined' ){            
            if(it.queVirgula)
              _.exp.corpo.que.innerHTML = '<span>&nbsp;que,&nbsp;</span>';
            else
              _.exp.corpo.que.innerHTML = '<span>&nbsp;</span>';
          }
          else
            _.exp.corpo.que.innerHTML = ( $(_.edt.corpo.solicitacaoOrdem).find(':selected').attr('j2QueHide') === 'false' ) ? '<span>&nbsp;que&nbsp;</span>' : '<span>&nbsp;</span>';
          
        });
                
        evBus.on('onChange.selectorsignatario', function(ev, value, select, selI){
          j2.mod._.styleSetter(_.exp.corpo.deOrdemSpan._, 'Hidden', (selI.dataPlus !== 'mag'));
        });
        
        evBus.on('onChange.selectordestinatarioItens', function(event, value, obSelect, selI){
          var it = j2.mod._._j2JSONparse( selI.dataPlus );
          _.exp.cumprimento.cargo.innerHTML = it.cargo;
          _.exp.corpo.pronomeTratamento.innerHTML = it.tratamento;
        });
      }
    };
    
    pkg.PACController = {  // pmc as new
      PACId : 0,
      PACDestinatario : null,
      PACMeioComonicacao : null,
      PACUrgente : null,
      constructor_ : function(args, el){
        var _this = pkg.PACController;
        var _idTask = j2.env.PJeVars.processo.idTask;
        
        if(!isObject(args) || !(args.meioComunicacaoSelector) ){
          alert('pkg.PACController -> obrigatorio o parâmetro construtor "meioComunicacaoSelector"');
          return;
        }
        
        var _ = {
          destTxtNode : (function(args){
             //it will check if it is in a PAC frame
            if(!(mod.par.win.jQuery))
              return null;
            
            var textNode = j2.modelo.par.win.jQuery('.rich-panel-header').contents().filter(function(a, b){
              return this.textContent.includes('Edição');
            });
            
            return textNode.length === 0 ? null : jQ3(textNode);
          })(),
          destTable : j2.modelo.par.win.jQuery('#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-' + _idTask + '\\:tabelaDestinatarios'),
          meiosComunicacaoSelector : (function(){
            var _sl = filter(j2.mod.clsCnstr.Selector.instances, {id : args.meioComunicacaoSelector});
            return _sl.length ? _sl[0] : null;
          })(),
          itemsSelector : (function(){
            if( ! (args.itemsSelector) )
              return null;
            
            var _sl = filter(j2.mod.clsCnstr.Selector.instances, {id : args.itemsSelector});
            return _sl.length ? _sl[0] : null;
          })()
        };
        
        _this.PACDestinatario = last(_.destTxtNode.text().split(' - '));
        _this.PACId = parseInt(last(_.destTxtNode.text().split(' - ')[1].split(': ')));
        _this.PACMeioComonicacao = jQ3('tr td:nth-child(2):contains("' + _this.PACId + '") ', _.destTable).parent().find('td:nth-child(6)').text();
        _this.PACUrgente = jQ3('tr td:nth-child(2):contains("' + _this.PACId + '") ', _.destTable).parent().find('td:nth-child(7) input');
        
        
        
        
        pkg.PACController.setEvents(_, args);
      },
      setEvents : function(_, args){
        var _this = pkg.PACController;
        
        
        var cb2 = function(event, closer){       
          if(pkg.Documento.isRecovered)
            return;
          
          var _checkMeios = function(){
            switch(_this.PACMeioComonicacao){
              case 'Telefone':
                return $(_.meiosComunicacaoSelector.select).find('option:selected').text().match(/Telefone|WhatsApp/) !== null;
                break;
              default:
                return $(_.meiosComunicacaoSelector.select).find('option:selected').text() === _this.PACMeioComonicacao;
            }
          };
                    
          if(! (_checkMeios() ) ){
            pkg.DocEditorCore.proceedFinish = false; 
            
            var tx;
            tx  = 'Parece que você está cometendo um erro com os meios de comunicação.#:BR{}#:BR{}';
            tx += '#:B{' + $(_.meiosComunicacaoSelector.select).find('option:selected').text() + ' X ' + _this.PACMeioComonicacao + '}#:BR{}#:BR{}';
            tx += 'Confirma prosseguir #:B{MESMO COM OS MEIOS DE COMUICAÇÃO DIVERGENTES} entre o expediente gerado e o que você configurou na janela anterior deste PAC?!';
            
            pkg.ModalDialog.okCancel( tx, 'Modelo j2 - Atenção', 
            'PACController.noEditionsConfirmed2;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
          }
        };
        var cb = function(event, closer){      
          if(pkg.Documento.isRecovered)
            return;
          
          var _checkUrgencia = function(){
            if( _this.PACMeioComonicacao !== 'Central de Mandados' )
              return true;
            
            if( !(_.itemsSelector) || !(args.urgenciaItems) )
              return true;
            
            var _itemUrgenteFound = false;
            forEach(args.urgenciaItems.split(' '), function(urgItem){
              forEach(_.itemsSelector.monitr.options, function(addItem){
                if ( _itemUrgenteFound )
                  return;
                
                if( urgItem === addItem.value )
                  _itemUrgenteFound = true;
              });
            });
            
            if( ! (_itemUrgenteFound) )
              return true;
            
            return _this.PACUrgente[0].checked;
          };
          
          if( ! (_checkUrgencia() ) ){
            pkg.DocEditorCore.proceedFinish = false; 
          
            var tx;
            tx  = 'Parece que um dos itens da finalidade sugerem uma urgência. #:B{Continuar mesmo sem marcar como urgente}?';
                        
            pkg.ModalDialog.okCancel( tx, 'Modelo j2 - Atenção', 
            'PACController.noEditionsConfirmed;beforeFinishEdition.postConfirmation', 'docEditorCore.onCancelClose');
          }
        };
        
        
        evBus.on('beforeFihishEdition', cb2);
        evBus.once('PACController.noEditionsConfirmed2', function(event){ 
          evBus.off('beforeFihishEdition',cb2);
        });   
        
        evBus.on('beforeFihishEdition', cb);
        evBus.once('PACController.noEditionsConfirmed', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });   
      }
    };

    pkg.Pagina1 = {
      constructor_ : function(args, el){
        if(isObject(args))
          if(args.largura){
            var pg = mod.exp.gE('textMargins');
            var ps = mod.exp.gE('PagesSections');
            var classes = '';
            switch(args.largura){
              case 'A4':      
                styleSetter(pg, 'paperA4');
                styleSetter(ps, 'paperA4Content');
                break;
              case 'A5':
                styleSetter(pg, 'paperA5');                
                styleSetter(ps, 'maxWidth400');
                break;
            }
          }
          if(args.contentEditable)
            if(args.contentEditable==='true' || args.contentEditable==='sim')
              mod.exp.gE('PagesSections').setAttribute('contenteditable', 'true');
          
          if(args.contentEditableBody)
            if(args.contentEditableBody==='true' || args.contentEditableBody==='sim')
              mod.exp.doc.body.setAttribute('contenteditable', 'true');
          
          if(args.addtitonalStyle){
            styleSetter(mod.exp.gE('PagesSections'), args.addtitonalStyle);
          }
      },
      setA4 : function(){
        var pg = mod.exp.gE('textMargins');
        var ps = mod.exp.gE('PagesSections');
        
        styleSetter(pg, 'paperA4');
        styleSetter(ps, 'paperA4Content');
      },
      setA5 : function(){
        var pg = mod.exp.gE('textMargins');
        var ps = mod.exp.gE('PagesSections');
        
        styleSetter(pg, 'paperA5');                
        styleSetter(ps, 'maxWidth400');  
      }
    };
    
    pkg.Pagina2toN =  {
      count : 2, // initial state is 2, incremented in each construction
      countInc : function(){
        pkg.Pagina2toN.count++;
      },
      countDec : function(){
        pkg.Pagina2toN.count--;
      },
      constructor_ : function(args, el){
        if(isObject(args)){
          if(args.contentEditable)
            if(args.contentEditable==='true' || args.contentEditable==='sim')
              mod.exp.gE('PagesSections').setAttribute('contenteditable', 'true');
          
          if(args.contentEditableBody)
            if(args.contentEditableBody==='true' || args.contentEditableBody==='sim')
              mod.exp.doc.body.setAttribute('contenteditable', 'true');
      
          if(args.autoIncrement && (args.autoIncrement==='true' || args.autoIncrement==='sim'))
            pkg.Pagina2toN.count++;
        }
      }      
    };
    
    pkg.Popup = {
      constructor_ : function(args, el){
        var j2Win = args.j2Win || mod.exp;
 
        var _ = {};
        _.j2Win = j2Win;
        _.toolTipContainer = el;
        
        forEach(el.exp.getElementsByTagName('*'), function(e){
          switch(e.id){
            case 'btnOk':
              _.ok = e;
              break;
            case  'btnCancel':
              _.cancel = e;
              break;
            case('btnDialogClose'):
              _.close = e;
              break;
            case 'panelDialogModalHeader':
              _.title = e;
              break;
            case 'panelDialogModalMessage':
              _.msg = e;
              break;
          }
        });
        
        pkg.Popup.setEvents(j2Win, _);
                        
        if(args.title)
          _.title.innerHTML = j2Conv(args.title);
                
        _.close.onclick = function(event){
          evBus.fire('Popup.close.'+_.toolTipContainer.exp.id, _);
          if(args.cancelFire)
            forEach(args.cancelFire.split(';'), function(fEv){
              evBus.fire(fEv);
            });      
        };

      },
      setEvents : function(j2Win,_){
        evBus.once('Popup.close.'+_.toolTipContainer.exp.id, 100000, function(event, _){
          _.toolTipContainer.exp.remove();
          evBus.off('Popup.defaultOkFire');
        });
      },
      createPopup : function(title, event, content, container, callback){
        var popupAction = {
          id : 'ModalDialogOk',
          version : '3.0',
          actions : [
            {
              name : 'okFire',
              eventFire : event
            }
          ]
        };
        pkg.Popup.renderer(title, popupAction, content, container, callback);
      },
      renderer : function(title, popupAction, dialogContent, container, callback){
        var xml = '<Definitions id="Api" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                  '  <modelo id="apiModal">\n' +
                  '    <versao id="3.0">\n' +
                  '      <classe id="Popup" versao="1.0">\n' +
                  '        <constructs param="title" value="' + ((title)?title:'j2') + '" type="string"/>\n';
        if(popupAction)
          forEach(popupAction.actions, function(action){
            xml +='        <constructs param="'+action.name+'" value="'+action.eventFire+'" type="string"/>\n'; 
          });
        else
          xml +=  '        <constructs param="okFire" value="Popup.defaultOkFire" type="string"/>\n';                  
          xml +=  '        <classe id="' + ((dialogContent)?dialogContent.id:'PopupContent') + '" versao="' + ((dialogContent)?dialogContent.version:'3.0') +'">\n' +
                  /*'        <classe id="' + ((dialogActions)?dialogActions.id:'ModalDialogOk') + '" versao="' + ((dialogActions)?dialogActions.version:'3.0') + '">\n' +*/
                  /*//'          </classe>\n' +*/
                  '        </classe>\n' +
                  '      </classe>\n' +
                  '    </versao>\n' +
                  '  </modelo>\n' +
                  '</Definitions>';
          
        window.j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', 10000, function(err, definitions, context){
          if(definitions)         
            evBus.fire('Popup.rendere.afterParseXml', definitions);
          else
            j2.err(err);
        });
        
        evBus.once('Popup.rendere.afterParseXml', function(event, definitions){
          var modSet = definitions.modelos[0].versao[0];
          j2.mod.builder.build(modSet, 'Popup', container);
        });
        evBus.once('builder.afterBuildModSet.Popup', function(event, definitions){
          callback();
          evBus.fire('Popup.open.' + container.exp.id);
         /* var context = {
            edt : (container) ? container.edt : mod.edt.doc.body,
            j2Win : (container) ? container.j2Win : mod.edt
          };
          
          var dialog = context.j2Win.gE('panelCDiv');
          
          dialog.style.left = (context.edt.clientWidth /2) - (dialog.clientWidth /2);
          dialog.style.top = (context.edt.clientHeight /2) - (dialog.clientHeight /2);*/
          
        });
      }
    };
    
    pkg.QualificacaoTable = {
      constructor_ : function(args, el){
        var _ = {
          ctxt : el,
          table : $(el.exp).find('#QlfcTable'),
          linhas : {
            poloAtivo : $(el.exp).find('#QualificacaoTable-poloAtivo-Linha'),
            polboPassivo : $(el.exp).find('#QualificacaoTable-poloPassivo-Linha')
          },
          templateClone : $(el.exp).find('#classeCNJRow')
        }; 
        
        if(isObject(args)){
          if(args.advogados)
            if(args.advogados==='nao'){
              mod.exp.gE('advPoloAtivoRow').remove();
              mod.exp.gE('advPoloPassivoRow').remove();
            }
          if(args.idAudiencia)
            if(args.idAudiencia==='nao')
              mod.exp.gE('audienciaRow').remove();       
          
          if(args.assuntos)
            if(args.assuntos==='nao')
              mod.exp.gE('assuntosRow').remove();           
        }
        
        pkg.QualificacaoTable.setEvents(args, el, _);
      },
      setEvents : function(args, el, _){   
        evBus.on('afterProcess.PJeVars.Partes.List-infoPessoa-processedAll', function(event){ 
          if( args.buildByApi && (args.buildByApi === "sim" || args.buildByApi === "true" ) )
            pkg.QualificacaoTable.buildByApi(args, el, _);
        });
        evBus.once('pkg.QualificacaoTable.partesListProcessadas', function(event){ 
          if( args.buildByApi && (args.buildByApi === "sim" || args.buildByApi === "true" ) )
            pkg.QualificacaoTable.buildByApi(args, el, _);
        });
        
        if(j2.env.PJeVars.partes.list && j2.env.PJeVars.partes.list.todasPartes)
          evBus.fire('pkg.QualificacaoTable.partesListProcessadas');  
      },
      buildByApi : function(args, el, _){
        /* assegurar que vai executar apenas uma vez */
        if(pkg.QualificacaoTable.buildedByApi)
          return;
        pkg.QualificacaoTable.buildedByApi = true;
        
        forEach(_.linhas, function(el){
          el.remove();
        });
        
        var builLineFromPessoa = function(p, adv){
          var cln = _.templateClone.clone(true);
          var nEx; //name exibição
          if(adv)
            if(p.papel === 'PROCURADORIA')
              nEx = p.nome;
            else
              nEx = p.nome + ' - OAB' + p.OAB;
          else
            nEx = p.nome;
            
          cln.find('td:first p').text( p.polo.Capt );
          cln.find('td:last p').text( nEx );
          
          _.table.append(cln);
        };
        
        var lists = [];
        lists.push(j2.env.PJeVars.partes.list.poloAtivo);
        lists.push(j2.env.PJeVars.partes.list.poloPassivo);
        lists.push(j2.env.PJeVars.partes.list.outrosInteressados);

        forEach(lists, function(list){
          forEach(list, function(p){
            builLineFromPessoa(p);
            p.advogado && forEach(p.advogado, function(a){
              builLineFromPessoa(a, true);
            });
          });
        });     
      }
    };         

    pkg.QuebraDePagina = {
      constructor_ : function(args, el){
        if(isObject(args))
          if(args.newId)
            if(mod.exp.gE('quebraPagina'))
              mod.exp.gE('quebraPagina').id += args.newId;              
      }
    };
    
    pkg.Secao = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.exp): mod.exp;
        var _ ={
          sec : (function(){
            var _ = win.doc.getElementsByName('secao');
            if(_.length)
              for(var i = _.length-1; i >= 0; i--)
                if(_[i].id==='secao')
                  return _[i];
            
            return null;
          })()
        }; 
        
        if(isObject(args)){
          if(args.newId){
            if(_.sec)
              _.sec.id += '.'+args.newId;
            else{
              j2.err('A mudança de Id ara o novo elemnto seletor é obrigatória');
              return;
            }
          }
        if(args.oculto)
            if(args.oculto === 'sim' || args.oculto === 'true')
              j2.mod._.styleSetter(_.sec, 'Hidden');
        }
        if( _.sec.id === 'secao') /* se ainda for space*/
          _.sec.id += '.' + Math.random().toString();
      }
    };
    
    pkg.SeletorAdvertencias = {
      constructor_ : function(args, el){
        /* avaliar se a unidade tem ou não central de madados */
        

        pkg.SeletorAdvertencias.members.linked              = jQ(el.exp).find('#advertencias').get(0);
        pkg.SeletorAdvertencias.members.list                = jQ(el.exp).find('#listAdvertencia').get(0);
        pkg.SeletorAdvertencias.members.controls.selector   = jQ(el.edt).find('#selectoradvertenciasItens').get(0);
        pkg.SeletorAdvertencias.members.controls.addButton  = jQ(el.edt).find('#selectorAddadvertenciasItens').get(0);
        pkg.SeletorAdvertencias.members.controls.monitor    = jQ(el.edt).find('#selectorMonitoradvertenciasItens').get(0);
        pkg.SeletorAdvertencias.members.controls.delButton  = jQ(el.edt).find('#selectorDeladvertenciasItens').get(0);

        
        var _ = [ 
                  jQ(el.edt).find('#SDCtrladvertenciasItens').get(0),
                  jQ(el.edt).find('#SDAddadvertenciasItens').get(0),
                  jQ(el.edt).find('#SDDeladvertenciasItens').get(0),
                  pkg.SeletorAdvertencias.members.linked
                ];
                
                
        
                
        forEach(_, function(e){
          j2.mod._.styleSetter(e, 'Hidden');
        });        
        
        if(args){
          if(!(args.observar))
            j2.err('args.observar é argumento obrigatório');
          else{
            if(!(jQ(el.edt).find('#' + args.observar)))
              j2.err('args.observar é argumento obrigatório');
            else
              pkg.SeletorAdvertencias.observed = jQ(el.edt).find('#' + args.observar).get(0);
          }
          
          if(args.itemSourceDef)
            pkg.SeletorAdvertencias.members.itSrc = function(){
              return (args.itemSourceDef.indexOf('#{')!==-1) ? parseVar(args.itemSourceDef) : j2.mod.clsCnstr.Selector.sources[args.itemSourceDef] || {};
            };
          
        }
                
        pkg.SeletorAdvertencias.setEvents(args);
        
      },
      advModelEnabled : true,
      observed : {},
      isVisible : false,
      visible : function(TF){
        if(! pkg.SeletorAdvertencias.advModelEnabled )
          TF = false;
        
        if(TF===true){
            j2.mod._.styleSetter(pkg.SeletorAdvertencias.members.linked, 'Hidden', true );
            pkg.SeletorAdvertencias.isVisible = true;
        }
        else{
            j2.mod._.styleSetter(pkg.SeletorAdvertencias.members.linked, 'Hidden');
            pkg.SeletorAdvertencias.isVisible = false;
        }
      },
      members : {
        linked : function(){ return mod.exp.gE('advertencias');},
        list : function(){ return mod.exp.gE('listAdvertencia');},
        itSrc : {},
        advSrc : function(){ return j2.mod.clsCnstr.Selector.sources.advertenciasItens || {}; },
        controls : {
          selector : function(){ return mod.edt.gE('selectoradvertenciasItens');},
          addButton : function(){ return mod.edt.gE('selectorAddadvertenciasItens');},
          monitor : function(){ return mod.edt.gE('selectorMonitoradvertenciasItens');},
          delButton : function(){ return mod.edt.gE('selectorDeladvertenciasItens');}
        }
      },
      setEvents : function(args){        
        if(args.observar){
          evBus.on('afterChange.' + args.observar, function(event, monitor){          
            pkg.SeletorAdvertencias.updateAdvertencias(monitor);
          });
        }    
        
        if(args.exibirInicialmente)
          evBus.on('Selector.loadSelectSource.advertencias', function(event, monitor){          
            forEach(args.exibirInicialmente.split(' '), function(adv){
              pkg.SeletorAdvertencias.add( adv );
            });
          });
        
        evBus.on('Advertencias.onAddDocumentosProcesso', function(){
          pkg.Utilidades.documentosProcessoFormart(mod.exp.gE('advtItListaDocumentosB_li'), 'p FntModAdvertencias', 'lnHght1');
        });
      }, 
      updateAdvertencias : function(mnt){
        var ops = [];
        var itDef;
        var advIdAr = [];
        var _;
        pkg.SeletorAdvertencias.reset();
        
        /*listar todas as opções com seu id*/
        for(var i = 0; i < mnt.options.length; i++)
          ops[i] = mnt.options[i].id.replace('_', '');
        
        /*De cada opção, procurar sua definição*/
        /*Se hover definição de Advertência, vamos listá-las*/
        forEach(ops, function(op){ 
          itDef = filter(pkg.SeletorAdvertencias.members.itSrc().selectorDef.items.item, {id : op});
          if(itDef.length){
            itDef = itDef[0];
            if(itDef.advertencias)
              forEach(itDef.advertencias.advertencia, function (adv){
                advIdAr[advIdAr.length] = adv.id;
              });
          }
        });
        
        /* adicionar cada elemento que está fixo pro alguma forma*/
        forEach(pkg.SeletorAdvertencias.fixedAdv, function(e){
          advIdAr.push(e);
        });
        
        
        /*De cada advertência listada anteriormente*/
        /* adicionar a advertência oa monitorDeAdvertência e Documento*/
        forEach(advIdAr, function(adv){
          pkg.SeletorAdvertencias.add(adv);
        });        
      },
      add : function(adv, objSelector){
        if(! pkg.SeletorAdvertencias.advertenciaEstaDisponivel)
          return;
        
        if(! pkg.SeletorAdvertencias.isVisible)
          pkg.SeletorAdvertencias.visible(true);
                
        pkg.SeletorAdvertencias.members.controls.selector.value = adv;
        pkg.SeletorAdvertencias.members.controls.addButton.click();
        
      },
      fixedAdv : [],
      addFixed : function(arr){
        forEach(arr, function(e){ 
          pkg.SeletorAdvertencias.fixedAdv.push( e );  
          pkg.SeletorAdvertencias.add( e );
        });
      },
      delFixed : function(arr){
        forEach(arr, function(e){ 
          for(var i = 0; i < pkg.SeletorAdvertencias.fixedAdv.length; i++){
            if( pkg.SeletorAdvertencias.fixedAdv[i] !== e )
              continue;
            
            pkg.SeletorAdvertencias.fixedAdv.splice(i, 1);
            i--;
          }
          
        });
        
        if( pkg.SeletorAdvertencias.observed )
          pkg.SeletorAdvertencias.updateAdvertencias( pkg.SeletorAdvertencias.observed );
      },
      reset : function(objSelector){
        while (pkg.SeletorAdvertencias.members.list.firstChild)
          pkg.SeletorAdvertencias.members.list.firstChild.remove();
        while (pkg.SeletorAdvertencias.members.controls.monitor.firstChild)
          pkg.SeletorAdvertencias.members.controls.monitor.firstChild.remove();
        for(var i = 0; i < pkg.SeletorAdvertencias.members.controls.selector.options.length; i++)
          pkg.SeletorAdvertencias.members.controls.selector.options[i].disabled = false;
        
        pkg.SeletorAdvertencias.visible(false);
      },
      advertenciaEstaDisponivel : function(idAdv){
        for(var i = 0; i < pkg.SeletorAdvertencias.members.controls.selector.options.length; i++)
          if (pkg.SeletorAdvertencias.members.controls.selector.options[i].id === idAdv)
            return true;
        
        return false;
      }
    };    
    
    pkg.SeletorDeOrdem = {
      constructor_ : function(args, el){
        INITIAL_GENERAL = 0;
        INITIAL_MANDADO = 1;
        var _ = {
          lnkEl : mod.exp.gE('SDLinkedElementDeOrdemDoExpediente'),
          selectObj : mod.edt.gE('selectorDeOrdemDoExpediente')
        };
        
        var idxPreload = INITIAL_GENERAL; 
        
        if(isObject(args)){
          if(args.linkedElement){
            _.lnkEl.remove();
            _.lnkEl = mod.exp.gE(args.linkedElement);
          }
          
            
          
          if(args.initialBaseTextIsMandado)
            if(args.initialBaseTextIsMandado==="true")
              idxPreload = INITIAL_MANDADO;
          
          if(args.deOrdemEmMandadoTradicional)
            if(args.deOrdemEmMandadoTradicional === 'sim'){
              _.deOrdemEmMandadoTradicional = true;
              _.elementoTradicional = mod.exp.gE(args.elementoTradicional);
            }
        }
        pkg.SeletorDeOrdem.setEvents(_);
        pkg.SeletorDeOrdem.preLoad( idxPreload, _, args.complementoProceder );
      },
      preLoad : function(initialBaseText, _, complProced) {         
        MANDADO_TRADICIONAL = 2;
        
        pkg.SeletorDeOrdem.xmlSelector = new XMLSerializer().serializeToString(pkg.SeletorDeOrdem.XmlIterator(_, complProced).XMLObject().documentElement);
                      
        window.j2.mod.j2Moddle.fromXML(pkg.SeletorDeOrdem.xmlSelector, 'j2:Definitions', function(err, definitions, context){
          if(definitions)
            pkg.SeletorDeOrdem.selectorSource = definitions;

          evBus.fire('SeletorDeOrdem.afterParseSelectorXML', definitions);
        });

        evBus.once('SeletorDeOrdem.afterParseSelectorXML', function(event, definitions){
          /* atualizar a linha de assinatura do documento*/
          var d = definitions.selectorDef.items.item[0].itemContent.selectorArray.arElement[initialBaseText].data.text;
          var tx = mod.exp.gE('porOrdemExpediente');
          while(tx.firstChild)
            tx.firstChild.remove();

          tx.appendChild(domify(j2Conv(j2.mod.builder.parseVars(d)))); 
          
          
          if(_.deOrdemEmMandadoTradicional){
            while(_.elementoTradicional.firstChild)
              _.elementoTradicional.firstChild.remove();
            d = definitions.selectorDef.items.item[0].itemContent.selectorArray.arElement[MANDADO_TRADICIONAL].data.text;
            _.elementoTradicional.appendChild(domify(j2Conv(j2.mod.builder.parseVars(d))));
          }
          /*atualizar a lista de elemntos no editor.
           */
          pkg.Selector.loadItems(definitions, mod.edt.gE('selectorDeOrdemDoExpediente'));
        });        
        
      },
      setEvents : function(_){
        
        evBus.on('SeletorDeOrdem.onChangeMeioExpediente', function(event, newMeio){
          styleSetter(mod.exp.gE('SDLinkedElementprioridadeExpedientesItems'), 'Visible');
        });
        
        var m = ['selectorintimacaoSelectMeio', 'selectorcitacaoSelectMeio', 'selectormandadoSelectMeio'];
        /* quando da mudança do meio */
        forEach(m, function(e){
          evBus.on('afterChange.'+e, function(event, value, obj){
            var ev = new Event('change');
            _.selectObj.dispatchEvent(ev);
          });
        });
        
        evBus.on('afterChange.selectorsignatario', function(event, value, obj){
          if(_.selectObj.options['porOrd'+value]){
            _.selectObj.options['porOrd'+value].selected = true;
            var ev = new Event('change');
            _.selectObj.dispatchEvent(ev);
          }
        });
        
        /* quando da mudança de "por ordem de" */
        evBus.on('beforeChange.'+_.selectObj.id, function(event, selectorObj, selI, toAppd){
          if(pkg.SeletorDeOrdem.selectorSource){
            var meios;
            forEach(m, function(e){
              meios = meios || mod.edt.gE(e);
            });
            if(meios){
                var arElByMeio;
                if(meios.id !== 'selectormandadoSelectMeio')
                  arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : meios.value } );
                else{
                  var sig = mod.edt.gE('selectorsignatario');
                  var sigSelI = filter(pkg.BlocoAssinaturas.selectorSource.selectorDef.items.item, {id : sig.value } );
                  var keyElId = (sigSelI[0].dataPlus==='mag') ? 'meioComunicItCentralMandados_juiz' : 'meioComunicItCentralMandados';
                  arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : keyElId } );
                }
                if(arElByMeio.length)
                  toAppd.body = j2Conv(j2.mod.builder.parseVars(arElByMeio[0].data.text));
                else{
                  arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : 'general' } );
                  if(arElByMeio.length)
                    toAppd.body = j2Conv(j2.mod.builder.parseVars(arElByMeio[0].data.text));
                  else
                    toAppd.body = '####ERROR#PRocessing';
                }
            }
          }
          
          if(_.deOrdemEmMandadoTradicional)
            evBus.fire('SeletorDeOrdem.prepareChangeTraditional', selI);
        });
        
        evBus.on('SeletorDeOrdem.prepareChangeTraditional', function(event, selI){
          if(!(_.elementoTradicional))
            return;
          
          var sig = mod.edt.gE('selectorsignatario');
          var sigSelI = filter(pkg.BlocoAssinaturas.selectorSource.selectorDef.items.item, {id : sig.value } );
          var keyElId = (sigSelI[0].dataPlus==='mag') ? 'meioComunicItCentralMandados_tradicional_juiz' : 'meioComunicItCentralMandados_tradicional';
          
          var arElByMeio = filter(selI.itemContent.selectorArray.arElement, {keyEl : keyElId } );
          var toAppd;
          if(arElByMeio.length){
            toAppd = j2Conv(j2.mod.builder.parseVars(arElByMeio[0].data.text));
          }
          else{
            toAppd = '####ERROR#PRocessing';
          }
          
          while(_.elementoTradicional.firstChild)
            _.elementoTradicional.firstChild.remove();
          
          _.elementoTradicional.innerHTML = toAppd;
            
        });
        
      },
      XmlIterator : function(_, complProced){
        var templateXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                          '<Definitions id="SeleectorsItemsDefinitions" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                          '  <selectorDef id="selectorBlocoAssinaturas" grouped="false">\n' +
                          '    <eventFire event="signatario.onChange"/>\n' +
                          '    <itemFormats>\n' +
                          /*'    <elemento tag="p" class="p FntMod">\n' +
                          '         #{textContent}\n' +
                          '      </elemento>\n' +*/
                          '    </itemFormats>\n' +
                          '    <groupsDefs>\n' +
                          /*'    <group label="Magistrados">' +
                          '        <gItem id="magJOSCELMO"/>' +
                          '        <gItem id="magGLADISTON"/>' +
                          '      </group>' +
                          '      <group label="Servidores">' +
                          '        <gItem id="00641805306"/>' +
                          '        <gItem id="01379812364"/>' +
                          '      </group>' +*/
                          '    </groupsDefs>\n' +
                          '    <items>\n' +
                          /*'    <item id="magJOSCELMO" label="Respondente" dataPlus="">' +
                          '        <eventFire event="signatario.respodenteSelected"/>' +
                          '        <itemContent type="HTML" addtClassStyles="someClass">' +
                          '          <data>' +			   
                          '            <![CDATA[' +
                          '              <B>JOSCELMO SOUSA GOMES</B><br />' +
                          '              Juiz de Direito Titular do 1º Juizado Especial Cível<br />' +
                          '              Respondendo pelo 2º Juizado Especial Cível de Imperatriz' +
                          '            ]]>' +
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +*/
                          '    </items>\n' +
                          '  </selectorDef>\n' +
                          '</Definitions>\n';
                  
        var baseTexts = [
          {meio:'general', 
            text : 'De Ordem de Sua Excelência XXXDeOrdemXXX, fica Vossa Senhoria, empresa ou ente público através desta #:U{devidamente}:'
          },
          {meio:'meioComunicItCentralMandados', 
            text : ((_.deOrdemEmMandadoTradicional) ? 
                    '#:B{#:U{ENCAMINHO}} a(o) senhor(a) Oficial(a) de Justiça desta unidade jurisdicional o presente mandado extraídos destes autos de #{j2.env.PJeVars.processo.classe}, acima qualificados, para que de posse do mesmo #:B{PROCEDA À' + ((complProced)? ' '+complProced.toUpperCase() + '}:' : '}:')
                   :
                    'De Ordem de Sua Excelência XXXDeOrdemXXX, #:U{ENCAMINHO} a(o) senhor(a) Oficial(a) de Justiça desta unidade jurisdicional o presente mandado para que #:B{PROCEDA À}' + ((complProced)? ' '+complProced.toUpperCase() + '}:' : '}:'))
          },          
          {meio:'meioComunicItCentralMandados_tradicional', 
            text : 'DE ORDEM DE SUA EXCELÊNCIA XXXDeOrdemXXX, ESTADO DO MARANHÃO NA FORMA DA LEI, ETC. (ART. 250, VI, CPC):',
            opts : {
              ucased : true,
              styleFormatIndex : 1,
              usarPrepDe : true
            }
          },
          {meio:'meioComunicItCentralMandados_tradicional_juiz', 
            text : 'XXXDeOrdemXXX, ESTADO DO MARANHÃO NA FORMA DA LEI, ETC. (ART. 250, VI, CPC):',
            opts : {
              ucased : true,
              styleFormatIndex : 1,
              usarPrepDe : true
            },
            ops : {
              excelentissimo : true,
              portaria : false
            }
          },
          {meio:'meioComunicItCentralMandados_juiz', 
            text : '#:B{#:U{DETERMINO}} a(o) senhor(a) Oficial(a) de Justiça desta unidade jurisdicional o presente mandado extraídos destes autos de #{j2.env.PJeVars.processo.classe}, acima qualificados, para que de posse do mesmo #:B{PROCEDA À' + ((complProced)? ' '+complProced.toUpperCase() + '}:' : '}:')
          }
        ];

        var templateXmlDoc  = new DOMParser().parseFromString(templateXml, "application/xml");              
        var mags = j2.env.modId.unidade.config.magistrados;
        var usrs = j2.env.xmls.usuarios.usuarios[0].usuario;



        var processDeOrdens = function() {
          var eEx = mags.emExercicio;
          var ord = [];
          ord[0] = {
            nominacao : eEx,
            id : mags[eEx]
          };

          for(var prop in mags){
            if(((prop.startsWith('titular') )
               || 
               (prop.startsWith('respondente') )
               || 
               (prop.startsWith('substituto') )
               || 
               (prop.startsWith('presidente') ))
               && 
               (prop !== eEx)
              ){
              ord[ord.length] = {
                nominacao : prop,
                id : mags[prop]
              };
            }
          }

          var usrDef;
          forEach(ord, function(magId){
            usrDef = filter(usrs, {id : magId.id});
            if(usrDef.length){
              usrDef = usrDef[0];

              var nMagItem = templateXmlDoc.createElement('item');
              var cont = templateXmlDoc.createElement('itemContent');
              var selArray = templateXmlDoc.createElement('selectorArray');
              var tx;
              var isNotTitular = (magId.nominacao!=='titular');

              var attr = 'por ordem Juiz ' + magId.nominacao.capt();
              if(isNotTitular) 
                attr += ' (' + usrDef.nome.split(' ')[0].capt() + ')' ;


              
              nMagItem.id='porOrd'+usrDef.id + (((isNotTitular) && !(magId.nominacao.startsWith('resp'))) ? 'Pres' : '');
              nMagItem.setAttribute('label', attr);
              nMagItem.setAttribute('dataPlus', usrDef.id);

              cont.setAttribute('type', 'selectorArray');
              cont.setAttribute('addtClassStyles', '');

              forEach(baseTexts, function(el){
                var arElement = templateXmlDoc.createElement('arElement');
                var dat = templateXmlDoc.createElement('data');
                
                arElement.setAttribute('keyEl', el.meio);
                
                var txt;
                if(el.opts){
                  if(el.opts.usarPrepDe)
                    txt = el.text.replace('XXXDeOrdemXXX', j2.env.PJeVars.expediente.deOrdemByMagId(magId, 
                    ((el.opts.usarPrepDe) ? 'de' : null), el.ops ) );
                  else
                    txt = el.text.replace('XXXDeOrdemXXX', j2.env.PJeVars.expediente.deOrdemByMagId(magId, null, el.ops) );
                }else
                  txt = el.text.replace('XXXDeOrdemXXX', j2.env.PJeVars.expediente.deOrdemByMagId(magId, null, el.ops) );
                
                if(el.opts)
                  if(el.opts.ucased)
                    txt = txt.toUpperCase();
                
                dat.innerHTML = '<![CDATA[' + txt + ']]>'; 
                
                arElement.appendChild(dat);
                selArray.appendChild(arElement);
                cont.appendChild(selArray);
              });
              
              
              templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
              nMagItem.appendChild(cont);

            }
          });        
        };
        var getXML = function (){
          processDeOrdens();
          return templateXmlDoc;
        };

        var adicionarEventoFire = function (evNm) {
          var edNd = templateXmlDoc.createElement('eventFire').setAttribute('event', evNm);
          templateXmlDoc.getElementsByTagName('selectorDef')[0].appendChild( edNd );
        };
                
        
        return {
          'XMLObject' : getXML,
          'adicionarEventFire' : adicionarEventoFire
        };

      }
    };
    
    pkg.SeletorPresidenteAudiencia = {
      constructor_ : function(args, el){
        /*
         * Prepara o xml
         * parse the xml
         * monta os valores
         * 
         * @type Boolean
         */
        var _ = {
          selectObj : mod.edt.gE('selectorPresidenteAudiencia')
        };
        
        pkg.SeletorPresidenteAudiencia.setEvents(_);
        
        if(isObject(args)){

          var iterator = pkg.SeletorPresidenteAudiencia.XmlIterator();
          
          if(args.magistrado)
            if(args.magistrado==='sim'){
              iterator.adicionarSignatario('mag');
            }
          
          if(args.servidor)
            if(args.servidor==='sim'){
              iterator.adicionarSignatario('serv');
            }
          
          if(args.secretario)
            if(args.secretario==='sim'){
              iterator.adicionarSignatario('sec');
            }
          
          
          /* write line to exp */
          pkg.SeletorPresidenteAudiencia.xmlSelector = new XMLSerializer().serializeToString(iterator.XMLObject().documentElement);
          window.j2.mod.j2Moddle.fromXML(pkg.SeletorPresidenteAudiencia.xmlSelector, 'j2:Definitions', function(err, definitions, context){
            if(definitions)
              pkg.SeletorPresidenteAudiencia.selectorSource = definitions;
            
            evBus.fire('SeletorPresidenteAudiencia.afterParseSelectorXML', definitions);
          });
          
          evBus.once('SeletorPresidenteAudiencia.afterParseSelectorXML', function(event, definitions){
            /* atualizar a linha de assinatura do documento*/
            var d = definitions.selectorDef.items.item[0].itemContent.data.text;
            var a = mod.exp.gE('assinatura');
            while(a.firstChild)
              a.firstChild.remove();
            
            mod.exp.gE('presidenteAudiencia').appendChild(domify(j2Conv(j2.mod.builder.parseVars(d)))); 
            
            /*atualizar a lista de elemntos no editor.
             */
            pkg.Selector.loadItems(definitions, mod.edt.gE('selectorPresidenteAudiencia'));
          });
        }
      },
      setEvents : function(_){
        /* quando da mudança do meio */
        /*        
        evBus.on('afterLoadItems.selectorsignatario', function(event, value, obj){           
          pkg.BlocoAssinaturas.createChancela( j2.env.PJeVars.usuario.login );
        });*/
        evBus.on('afterChange.selectorsignatario', function(event, value, obj){
          if(_.selectObj.options['pelaPres'+value]){
            _.selectObj.options['pelaPres'+value].selected = true;
            var ev = new Event('change');
            _.selectObj.dispatchEvent(ev);
          }
        });
      },
      alterarAmbiente : function(ambiente){
        switch(ambiente){
          case 'videoConferencia':
            mod.exp.gE('ambiente-audiencia').innerHTML = '<b>pelo sistema de videoconferência do Tribunal de Justiça do Estado do Maranhão, na sala de audiências deste Juizado</b>';
            break;
          default:
            mod.exp.gE('ambiente-audiencia').innerHTML = 'na sala de audiências deste Juizado';
            break;
        };
      },
      XmlIterator : function(){
        var templateXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                          '<Definitions id="SeleectorsItemsDefinitions" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                          '  <selectorDef id="selectorBlocoAssinaturas" grouped="false">\n' +
                          '    <eventFire event="signatario.onChange"/>\n' +
                          '    <itemFormats>\n' +
                          /*'    <elemento tag="p" class="p FntMod">\n' +
                          '         #{textContent}\n' +
                          '      </elemento>\n' +*/
                          '    </itemFormats>\n' +
                          '    <groupsDefs>\n' +
                          /*'    <group label="Magistrados">' +
                          '        <gItem id="magJOSCELMO"/>' +
                          '        <gItem id="magGLADISTON"/>' +
                          '      </group>' +
                          '      <group label="Servidores">' +
                          '        <gItem id="00641805306"/>' +
                          '        <gItem id="01379812364"/>' +
                          '      </group>' +*/
                          '    </groupsDefs>\n' +
                          '    <items>\n' +
                          /*'    <item id="magJOSCELMO" label="Respondente" dataPlus="">' +
                          '        <eventFire event="signatario.respodenteSelected"/>' +
                          '        <itemContent type="HTML" addtClassStyles="someClass">' +
                          '          <data>' +			   
                          '            <![CDATA[' +
                          '              <B>JOSCELMO SOUSA GOMES</B><br />' +
                          '              Juiz de Direito Titular do 1º Juizado Especial Cível<br />' +
                          '              Respondendo pelo 2º Juizado Especial Cível de Imperatriz' +
                          '            ]]>' +
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +*/
                          '    </items>\n' +
                          '  </selectorDef>\n' +
                          '</Definitions>\n';
                  
         var baseTexts = {
          servidor : {
            text : 'Aos #{j2.env.PJeVars.data.dataEHoraAtualFormal}, #:span@ambiente-audiencia{na sala de audiências deste Juizado}, onde se achava presente Conciliador Judicial, para audiência de #{j2.env.PJeVars.audiencia.tipo}.'
          },            
          magistrado : {
            text : 'Aos #{j2.env.PJeVars.data.dataEHoraAtualFormal}, #:span@ambiente-audiencia{na sala de audiências deste Juizado}, onde se achava presente Sua Excelência XXXDeOrdemXXX, comigo, Conciliador Judicial, para audiência de #{j2.env.PJeVars.audiencia.tipo}.',
            opts : {
              ucased : false,
              styleFormatIndex : 1,
              usarPrepDe : false
            }
          }
         };          

        var templateXmlDoc  = new DOMParser().parseFromString(templateXml, "application/xml");              
        var mags = j2.env.modId.unidade.config.magistrados;
        var secs = j2.env.modId.unidade.config.secretarios;
        var usrs = j2.env.xmls.usuarios.usuarios[0].usuario;
        var unit = j2.env.modId.unidade;

        var eventFiresGetter = function(){
          return '';
        };

        var getXML = function (){
          return templateXmlDoc;
        };

        var adicionarSignatario = function (tipo) {
          switch(tipo){
            case 'mag':
              var eEx = mags.emExercicio;
              var ord = [];
              ord[0] = {
                nominacao : eEx,
                id : mags[eEx]
              };
              
              for(var prop in mags){
                if(((prop.startsWith('titular') )
                   || 
                   (prop.startsWith('respondente') )
                   || 
                   (prop.startsWith('substituto') )
                   || 
                   (prop.startsWith('presidente') ))
                   && 
                   (prop !== eEx)
                  ){
                  ord[ord.length] = {
                    nominacao : prop,
                    id : mags[prop]
                  };
                }
              }
              
              var usrDef;
              forEach(ord, function(magId){
                usrDef = filter(usrs, {id : magId.id});
                if(usrDef.length){
                usrDef = usrDef[0];

                var nMagItem = templateXmlDoc.createElement('item');
                var cont = templateXmlDoc.createElement('itemContent');
                var d = templateXmlDoc.createElement('data');
                var tx;
                var isNotTitular = (magId.nominacao!=='titular');

                var attr = 'presidido ' + ((usrDef.genr==='M')? 'pelo Juiz' : 'pela Juíza') + ' ' + magId.nominacao.capt();
                if(isNotTitular) 
                  attr += ' (' + usrDef.nome.split(' ')[0].capt() + ')' ;


                nMagItem.id='pelaPres' + usrDef.id+ (((isNotTitular) && !(magId.nominacao.startsWith('resp'))) ? 'Pres' : '');
                nMagItem.setAttribute('label', attr);
                nMagItem.setAttribute('dataPlus', '');

                cont.setAttribute('type', 'HTML');
                cont.setAttribute('addtClassStyles', '');

                forEach([baseTexts.magistrado], function(el){                
                  var txt;
                  if(el.opts){
                    if(el.opts.usarPrepDe)
                      txt = el.text.replace('XXXDeOrdemXXX', j2.env.PJeVars.expediente.deOrdemByMagId(magId, 
                      ((el.opts.usarPrepDe) ? 'de' : null) ) );
                    else
                      txt = el.text.replace('XXXDeOrdemXXX', j2.env.PJeVars.expediente.deOrdemByMagId(magId) );
                  }else
                    txt = el.text.replace('XXXDeOrdemXXX', j2.env.PJeVars.expediente.deOrdemByMagId(magId) );

                  if(el.opts)
                    if(el.opts.ucased)
                      txt = txt.toUpperCase();

                  d.innerHTML = '<![CDATA[' + j2Conv(j2.mod.builder.parseVars(txt)) + ']]>'; 

                  nMagItem.appendChild(cont);
                  cont.appendChild(d);
                });


                templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
                nMagItem.appendChild(cont);

              }
              });
              
              break;
            case 'sec' :
              var eEx = secs.emExercicio;
              var ord = [2];
              ord[0] = {
                nominacao : eEx,
                id : secs[eEx]
              };
              
              switch(eEx){
                case 'titular':
                  ord[1] = {
                    nominacao : 'substituto',
                    id : secs.substituto
                  };
                  break;
                case 'substituto':
                  ord[1] = {
                    nominacao : 'titular',
                    id : secs.titular
                  };                  
                  break;
              }
                            
              var usrDef;
              forEach(ord, function(secId){
                usrDef = filter(usrs, {id : secId.id});
                if(usrDef.length){
                  usrDef = usrDef[0];
                  
                  var nMagItem = templateXmlDoc.createElement('item');
                  var cont = templateXmlDoc.createElement('itemContent');
                  var d = templateXmlDoc.createElement('data');
                  var tx;

                  nMagItem.id=usrDef.id;
                  nMagItem.setAttribute('label', 'presidido pelo Secretário ' + secId.nominacao.capt());
                  nMagItem.setAttribute('dataPlus', '');
                  
                  cont.setAttribute('type', 'HTML');
                  cont.setAttribute('addtClassStyles', '');
                  
                  tx = baseTexts.servidor.text;
                  
                  /*tx = '<strong>' + usrDef.nome + '</strong><br>\n';
                  tx += ((usrDef.genr==='M')? 'Secretário' : 'Secretária') + ' Judicial' + ((secId.nominacao!=='titular') ? ' ' + ((usrDef.genr==='M')? 'Substituto' : 'Substituta') : '');
                  tx += '\n<br>Matrícula ' + usrDef.matricula;*/
                  
                  d.innerHTML = '<![CDATA[' + j2Conv(j2.mod.builder.parseVars(tx)) + ']]>';
                  
                  templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
                  nMagItem.appendChild(cont);
                  cont.appendChild(d);
                }
              });              
              break;
            case 'serv':
              var servId = j2.env.PJeVars.usuario.login;
              usrDef = filter(usrs, {id : servId});
              if(usrDef.length){
                usrDef = usrDef[0];

                var nMagItem = templateXmlDoc.createElement('item');
                var cont = templateXmlDoc.createElement('itemContent');
                var d = templateXmlDoc.createElement('data');
                var tx;

                nMagItem.id=usrDef.id;
                nMagItem.setAttribute('label', 'Servidor');
                nMagItem.setAttribute('dataPlus', '');

                cont.setAttribute('type', 'HTML');
                cont.setAttribute('addtClassStyles', '');
                
                tx = baseTexts.servidor.text;
                /*tx = '<strong>' + usrDef.nome + '</strong><br>\n';
                tx += usrDef.cargo;
                tx += '\n<br>Matrícula ' + usrDef.matricula;*/
                
                                
                d.innerHTML = '<![CDATA[' + j2Conv(j2.mod.builder.parseVars(tx)) + ']]>';
                
                
                               
                
                templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
                nMagItem.appendChild(cont);
                cont.appendChild(d);
              }
          }
        };

        var adicionarEventoFire = function (evNm) {
          var edNd = templateXmlDoc.createElement('eventFire').setAttribute('event', evNm);
          templateXmlDoc.getElementsByTagName('selectorDef')[0].appendChild( edNd );
        };
                
        
        return {
          'XMLObject' : getXML,
          'adicionarSignatario' : adicionarSignatario,
          'adicionarEventFire' : adicionarEventoFire
        };
      }  
    };

    pkg.SeletorOJ = {
      constructor_ : function(args, el){
        /* avaliar se a unidade tem ou não central de madados */
        if(j2.env.modId.unidade.config.OJs.centralMandados){
          pkg.SeletorOJ.members.selector().remove();
          pkg.SeletorOJ.members.linked().remove();
          return;
        }
        pkg.SeletorOJ.setEvents();
        
        pkg.SeletorOJ.xmlSelector = new XMLSerializer().serializeToString(pkg.SeletorOJ.XmlIterator().XMLObject().documentElement);
        window.j2.mod.j2Moddle.fromXML(pkg.SeletorOJ.xmlSelector, 'j2:Definitions', function(err, definitions, context){
          if(definitions)
            pkg.SeletorOJ.selectorSource = definitions;

          evBus.fire('SeletorOJ.afterParseSelectorXML', definitions);
        });

        evBus.once('SeletorOJ.afterParseSelectorXML', function(event, definitions){
          /* atualizar a linha de assinatura do documento*/
          var d = definitions.selectorDef.items.item[0].itemContent.data.text;
          var tx = mod.exp.gE('oficialJusticaText');
          while(tx.firstChild)
            tx.firstChild.remove();

          tx.appendChild(domify(d));

          /*atualizar a lista de elemntos no editor.
           */
          pkg.Selector.loadItems(definitions, mod.edt.gE('selectorOJsItems'));
        });        
        
      },
      isVisible : false,
      visible : function(TF){
        if(j2.env.modId.unidade.config.OJs.centralMandados)
            return;
        
        if(TF===true){
            j2.mod._.styleSetter(pkg.SeletorOJ.members.selector(), 'Hidden', true );
            j2.mod._.styleSetter(pkg.SeletorOJ.members.linked(), 'Hidden', true );
            pkg.SeletorOJ.isVisible = true;
        }
        else{
            j2.mod._.styleSetter(pkg.SeletorOJ.members.selector(), 'Hidden' );
            j2.mod._.styleSetter(pkg.SeletorOJ.members.linked(), 'Hidden');
            pkg.SeletorOJ.isVisible = false;
        }
      },
      members : {
        linked : function(){ return mod.exp.gE('oficialJustica');},
        selector : function(){ return mod.edt.gE('selectorOJsItems');}
      },
      setEvents : function(){        
        evBus.on('beforeFihishEdition', 10000, function(event, closer){          
          if(!j2.env.modId.unidade.config.OJs.centralMandados && pkg.SeletorOJ.isVisible && pkg.SeletorOJ.members.selector().value === 'ojNotDef'){
            pkg.DocEditorCore.proceedFinish = false; 
            event.stopPropagation();
            pkg.ModalDialog.ok('Você deve selecionar um Oficial de Justiça.', 'SeletorOj j2 - Atenção');
          }
        });
        
      },
      XmlIterator : function(){
        var templateXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                          '<Definitions id="SeleectorsItemsDefinitions" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                          '  <selectorDef id="selectorBlocoAssinaturas" grouped="false">\n' +
                          '    <eventFire event="signatario.onChange"/>\n' +
                          '    <itemFormats>\n' +
                          /*'    <elemento tag="p" class="p FntMod">\n' +
                          '         #{textContent}\n' +
                          '      </elemento>\n' +*/
                          '    </itemFormats>\n' +
                          '    <groupsDefs>\n' +
                          /*'    <group label="Magistrados">' +
                          '        <gItem id="magJOSCELMO"/>' +
                          '        <gItem id="magGLADISTON"/>' +
                          '      </group>' +
                          '      <group label="Servidores">' +
                          '        <gItem id="00641805306"/>' +
                          '        <gItem id="01379812364"/>' +
                          '      </group>' +*/
                          '    </groupsDefs>\n' +
                          '    <items>\n' +
                          '      <item id="ojNotDef" label="[oficial de justiça não definido]" dataPlus="">' +
                          /*'        <eventFire event="signatario.respodenteSelected"/>' +*/
                          '        <itemContent type="plainText">' +
                          '          <data>' +			   
                          '            [indefinido]'+
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +
                          /*'      <item id="ojCumpLiminar" label="Cumprimento de Urgência" dataPlus="">' +
                          /*'        <eventFire event="signatario.respodenteSelected"/>' +
                          '        <itemContent type="plainText">' +
                          '          <data>' +			   
                          '            Cumprimento de Urgência'+
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +*/
                          '    </items>\n' +                          
                          '  </selectorDef>\n' +
                          '</Definitions>\n';

        var templateXmlDoc  = new DOMParser().parseFromString(templateXml, "application/xml");              
        var usrs = j2.env.xmls.usuarios.usuarios[0].usuario;
        var unit = j2.env.modId.unidade;

        var getXML = function (){
          prepareOficialJustica();
          return templateXmlDoc;
        };

        function prepareOficialJustica() {
          var ojsUnit = unit.config.OJs.usuarioRef;
          
          var usrDef;
          forEach(ojsUnit, function(oj){
            usrDef = filter(usrs, {id : oj.id});
            if(usrDef.length){
              usrDef = usrDef[0];

              var nMagItem = templateXmlDoc.createElement('item');
              var cont = templateXmlDoc.createElement('itemContent');
              var d = templateXmlDoc.createElement('data');

              nMagItem.id=usrDef.id;
              //nMagItem.setAttribute('label', usrDef.nome.split(' ')[0].capt());
              nMagItem.setAttribute('label', usrDef.nome);
              nMagItem.setAttribute('dataPlus', '');

              cont.setAttribute('type', 'plainText');
              cont.setAttribute('addtClassStyles', '');

              d.innerHTML = usrDef.nome;
              
              templateXmlDoc.getElementsByTagName('items')[0].appendChild(nMagItem);
              nMagItem.appendChild(cont);
              cont.appendChild(d);
            }
          });              
        };

        var adicionarEventoFire = function (evNm) {
          var edNd = templateXmlDoc.createElement('eventFire').setAttribute('event', evNm);
          templateXmlDoc.getElementsByTagName('selectorDef')[0].appendChild( edNd );
        };
                
        
        return {
          'XMLObject' : getXML,
          'adicionarEventFire' : adicionarEventoFire
        };
      }     
    };
    
    pkg.SeletorPessoa = {
      createPseudoPessoaDoJuizo : function(){ //ndlg as new
        if(! (w.j2.env.PJeVars.partes.list))
          return;
        if(w.j2.env.PJeVars.partes.listautoridade)
          return;
        
        
        var lst = w.j2.env.PJeVars.partes.list;
        var und = w.j2.env.modId.unidade;
        var papPol = und.comarcaGenr === 'M' ? 'juizado' : 'vara';
        var d = und.comarcaGenr === 'M' ? 'do' : 'da';
        var end = und.config.enderecoManual;
        
        var parteJuizo = {
            "exibicao": und.nomeFormal.toUpperCase(),
            "a": {},
            "CPFCNPJ": "00.000.000/0000-00",
            "papel": papPol.toUpperCase(),
            "polo": {
                "UCase": papPol.toUpperCase(),
                "LCase": papPol.toLowerCase(),
                "Capt": papPol.capt(),
                "parte": {
                    "UCase": "AUTORIDADE " + d.toUpperCase(),
                    "LCase": "autoridade " + d,
                    "Capt": "Autoridade " + d
                }
            },
            "nome": und.nomeFormal.toUpperCase(),
            "idPess": "itPess9999",
            "meiosContato": {
                "telefone": (function(){
                  if(window.j2ModDebug)
                    return [
                        '(99)9119-8884'
                    ];

                  console.log('ASSERTION: necessita da rotina para recuperar os dados de telefone a serem implementados em undiades autorizadas.xml');
                  return [
                    '(99)3523-7592',
                    '(99)9989-6346'
                  ];
                })(),
                "email": [
                    end.eMail
                ]
            },
            "endereco": {
                "rua": end.rua,
                "numero": end.numero,
                "complemento": end.complemento,
                "bairro": end.bairro,
                "municipio": end.cidade,
                "cep": end.cep,
                "existe": true
            },
            "_infoProcessed": true
        };
        
        lst.autoridade = [ parteJuizo ];
        lst.todasPartes.push(parteJuizo);
        
        pkg.SeletorPessoa.xmlSelector = new XMLSerializer().serializeToString(pkg.SeletorPessoa.XmlIterator().XMLObject().documentElement);
        window.j2.mod.j2Moddle.fromXML(pkg.SeletorPessoa.xmlSelector, 'j2:Definitions', function(err, definitions, context){
          if(definitions)
            pkg.SeletorPessoa.selectorSource = definitions;

          evBus.fire('SeletorPessoa.afterParseSelectorXMLByReload', definitions);
        });
      },
      instances : [],
      selected : {},
      selUtil : {
        advogados : {
        nomes : function(_){
            if(!(pkg.SeletorPessoa.selected) && !(_))
              return '########ERRO_PARTE_NÃO_ESTÁ_SELECIONADA';
            
            _ = _ || pkg.SeletorPessoa.selected;
            
            if(!(_.advogado) )
              return 'nenhum advogado cadastrado';
            
            var tx = '';
            var _a = _.advogado.slice();
            var _tmp = [];
            _a.sort();
            
            for(var a in _a) if(_a.hasOwnProperty(a))
              if(_a[a].ativo) 
                _tmp.push(_a[a]);
            
            _a = _tmp;
            
            for(var i = 0; i < _a.length; i++)
              tx += (tx.length) ? ( (i===_a.length-1)? ' e ': ', ' ) + _a[i].nome : _a[i].nome;

            return tx;
          }
        },
        telefones : function(_, sep){
          if(!(pkg.SeletorPessoa.selected) && !(_))
            return '########ERRO_PARTE_NÃO_ESTÁ_SELECIONADA';
            
          _ = _ || pkg.SeletorPessoa.selected;
        
          if( _.meiosContato && _.meiosContato.telefone ){
            var tels = '';
            var lar = _.meiosContato.telefone;
            
            if(sep){ //wa as new
              return lar.join(sep);
            }
            
            for(var i=0; i < lar.length; i++){
              if(i===0)
                tels = lar[i];
              else if(i === lar.length - 1)
                tels += ' e ' + lar[i]; // wa
              else
                tels += ', ' + lar[i]; // wa
            }
            
            return tels;
          }
          
          return '[Sem telefones cadastrado]';
        }
      },
      constructor_ : function(args, el){
        if(args.forceChangedId && args.forceChangedId === 'true' || args.forceChangedId === 'sim'){ //wa as new
          var _s = $(el.edt).find("#selectorPessoa");
          _s[_s.length -1].id = args.changedId;
        }
        
        /* avaliar se a unidade tem ou não central de madados */
        var _ = {
          ctxt : el,
          uuid : window.j2.mod._._guid(), // wa
          lnkEl :   $(el.exp).find( '#' + (args.changedId || 'selectorPessoa') + 'TextP')[0] || $(el.exp).find( '#selectorPessoaTextP')[0],
          lnkElParent : $(el.exp).find( '#' + (args.changedId || 'selectorPessoa') + 'TextSpan')[0] || $(el.exp).find( '#selectorPessoaTextSpan')[0],
          selector : (args.j2Win) ? args.j2Win.gE(args.changedId || 'selectorPessoa') : mod.edt.gE(args.changedId || 'selectorPessoa'), // wa
          propagateChanges : args.propagateChanges || null,
          propagateContext : args.j2Win || mod.exp, //wa,
          __class__ : { // ndlga as new
            class : 'SeletorPessoa',
            super : el._.__class__.super.Selector._this
          }
        };
        
        el._.__class__ = { // ndlg4
          super : {
            SeletorPessoa : {
              _this : _,
              super : el._.__class__.super
            }
          }
        };
        
        if(isObject(args)){ //wa changed         s
          if(args.hideLinkedEleent)
            if(args.hideLinkedEleent==='sim' || args.hideLinkedEleent==='true')
              j2.mod._.styleSetter(_.lnkElParent, 'Hidden', false);
          
          if(isObject(args)) //wa as new         
            if(args.raiseChangeAfterLoad)
              _.raiseChangeAfterLoad = 
                  (args.raiseChangeAfterLoad==='sim' || args.raiseChangeAfterLoad==='true') ? true : false;

        }
            
            
        
        
        pkg.SeletorPessoa.setEvents(_, args); //wa
        
        pkg.SeletorPessoa.instances.push(_);
        
        var _selectoLoader = function(defs, inst){ //wa as new
          pkg.Selector.loadItems(defs, inst.selector /*mod.edt.gE('selectorPessoa')*/);
          inst.selector._.src = defs;
                    
          if(_.raiseChangeAfterLoad)          
            inst.selector.onchange();
        };
        
        if(pkg.SeletorPessoa.xmlSelector){ // wa changed
          _selectoLoader(pkg.SeletorPessoa.selectorSource, _); //wa
          return;
        }
        
        var afterProcessPessoasTodasRotina = function(event){
          pkg.SeletorPessoa.xmlSelector = new XMLSerializer().serializeToString(pkg.SeletorPessoa.XmlIterator().XMLObject().documentElement);
          window.j2.mod.j2Moddle.fromXML(pkg.SeletorPessoa.xmlSelector, 'j2:Definitions', function(err, definitions, context){
            if(definitions)
              pkg.SeletorPessoa.selectorSource = definitions;

            evBus.fire('SeletorPessoa.afterParseSelectorXML', definitions);
            j2.log('fired: SeletorPessoa.afterParseSelectorXML');
          });

          evBus.once('SeletorPessoa.afterParseSelectorXML', function(event, definitions){
            /* atualizar a linha de assinatura do documento*/
            if(args.initializeText){
              var d = definitions.selectorDef.items.item[0].itemContent.data.text;
              var tx = mod.exp.gE(args.initializeText);
              while(tx.firstChild)
                tx.firstChild.remove();

              tx.appendChild(domify(d));
            }

            /*atualizar a lista de elemntos no editor.
             */
            forEach(pkg.SeletorPessoa.instances, function(inst){
              _selectoLoader(definitions, inst);
            });


          });        
        };
        
        
        
        if(j2.env.PJeVars.partes.list && j2.env.PJeVars.partes.list.todasPartes)
          afterProcessPessoasTodasRotina();    
        else
          evBus.on('afterProcess.PJeVars.Partes.List-infoPessoa-processedAll', afterProcessPessoasTodasRotina);
      },
      setEvents : function(_, args){        
        evBus.on('beforeChange.'+_.selector.id, function(event, selectorObj, selI, toAppd){
          var _ = filter(j2.env.PJeVars.partes.list.todasPartes, {idPess : selI.id});          
          pkg.SeletorPessoa.selected = (_.length) ? _[0] :  null ;
          
          evBus.fire("SeletorPessoa.beforeChange." + selectorObj.select.id, _, {
            selectorObj : selectorObj,
            selI: selI,
            toAppd : toAppd
          });
        });
        _.propagateChanges && evBus.on('afterChange.'+_.selector.id, function(event, selectorValue, selectorObj, selI, appd, _sel){
          forEach(_.propagateChanges.split(';'), function(el){
            forEach(_.propagateContext.doc.querySelectorAll('#' + el), function (e){//wa
              e.innerHTML = _sel.lnkEl.innerHTML;
            });
          });
            
        });
        evBus.on('afterChange.'+_.selector.id, function(event, selectorValue, selectorObj, selI, appd, _sel){
          var _p = filter(j2.env.PJeVars.partes.list.todasPartes, {idPess : selI.id});          //wa
          var _p = (_p.length) ? _p[0] :  null ;  
          if(!(_p))
            return;
          
          evBus.fire("SeletorPessoa.afterChange." + selectorObj.id, _p, {
            selectorValue : selectorValue,
            selectorObj : selectorObj,
            selI: selI,
            appd : appd,
            _sel : _sel
          });
          
          var _sels = [
            { sel : '#pessoa-nome', val : _p.nome }, //wa
            { sel : '#pessoa-polo-parte-UCase', val : _p.polo.parte.UCase }, //wa
            { sel : '#pessoa-polo-parte-LCase', val : _p.polo.parte.LCase },
            { sel : '#pessoa-meiosContato-telefone', val : pkg.SeletorPessoa.selUtil.telefones(_p, '<br>') }, // wa
            { sel : '#pessoa-meiosContato-telefone-txt', val : pkg.SeletorPessoa.selUtil.telefones(_p) },
            { sel : '#pessoa-advogado-nomes', val : pkg.SeletorPessoa.selUtil.advogados.nomes(_p) },
            { sel : '#pessoa-cartaoVisita', val : pkg.ContatosPartes.createLinkCartaoVisita(_p).outerHTML },
            { sel : '#pessoa-meiosContato-telefone-whatsappConverted', val : (function(){ // wa as new
                var _ht = [];
                forEach(_p.meiosContato.telefone, function(t){
                  _ht.push( pkg.ContatosPartes.createLinkWhatsApp(t).outerHTML );
                });
                return _ht.join('<br>');
            })() }
          ];
            
          forEach(_sels, function(e){
            forEach(_.propagateContext.doc.querySelectorAll(e.sel), function (n){ //wa
              n.innerHTML = e.val;
            });
          });
          
        });
        
        evBus.on('onPostConstruct', function(event){ // wa as new
          if (args.raiseChangeOnPostConstruction && ( args.raiseChangeOnPostConstruction === 'true' || args.raiseChangeOnPostConstruction === 'sim' )){
            if( isObject(_.selector._.src) ) 
              _.selector.onchange();
            else
              evBus.fire('onPostConstruct.defered.seletorPessoa');
          }
        });
        evBus.on('onPostConstruct.defered.seletorPessoa', function(event){ // wa as new
          setTimeout(function(){
            if (args.raiseChangeOnPostConstruction && ( args.raiseChangeOnPostConstruction === 'true' || args.raiseChangeOnPostConstruction === 'sim' )){
              if( isObject(_.selector._.src) ) 
                _.selector.onchange();
              else
                evBus.fire('onPostConstruct.defered.seletorPessoa');
              
              j2.log('onPostConstruct.defered.seletorPessoa');
            }
          }, 50);  
        });
      },
      XmlIterator : function(){
        var templateXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                          '<Definitions id="SeleectorsItemsDefinitions" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                          '  <selectorDef id="selectorBlocoAssinaturas" grouped="false">\n' +
                          /*'    <eventFire event="signatario.onChange"/>\n' +*/
                          '    <itemFormats>\n' +
                          /*'    <elemento tag="p" class="p FntMod">\n' +
                          '         #{textContent}\n' +
                          '      </elemento>\n' +*/
                          '    </itemFormats>\n' +
                          '    <groupsDefs>\n' +
                          /*'    <group label="Magistrados">' +
                          '        <gItem id="magJOSCELMO"/>' +
                          '        <gItem id="magGLADISTON"/>' +
                          '      </group>' +
                          '      <group label="Servidores">' +
                          '        <gItem id="00641805306"/>' +
                          '        <gItem id="01379812364"/>' +
                          '      </group>' +*/
                          '    </groupsDefs>\n' +
                          '    <items>\n' +
                          '      <item id="ojNotDef" label="[oficial de justiça não definido]" dataPlus="">' +
                          /*'        <eventFire event="signatario.respodenteSelected"/>' +*/
                          '        <itemContent type="plainText">' +
                          '          <data>' +			   
                          '            [indefinido]'+
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +
                          /*'      <item id="ojCumpLiminar" label="Cumprimento de Urgência" dataPlus="">' +
                          /*'        <eventFire event="signatario.respodenteSelected"/>' +
                          '        <itemContent type="plainText">' +
                          '          <data>' +			   
                          '            Cumprimento de Urgência'+
                          '          </data>' +
                          '        </itemContent>' +
                          '      </item>' +*/
                          '    </items>\n' +                          
                          '  </selectorDef>\n' +
                          '</Definitions>\n';

        var templateXmlDoc  = new DOMParser().parseFromString(templateXml, "application/xml");              
        
        var partesList = j2.env.PJeVars.partes.list;

        var getXML = function (){
          preparePessoa();
          return templateXmlDoc;
        };

        function preparePessoa() {
          var idCount = 0;
          var groups = {};
          forEach(partesList.todasPartes, function(parte, a){
            if(!(parte.papel))
              return;
            if(!(groups[parte.papel])){
              groups[parte.papel] = templateXmlDoc.createElement('group');
              groups[parte.papel].setAttribute('label', capt(parte.papel));
              
              templateXmlDoc.getElementsByTagName('groupsDefs')[0].appendChild(groups[parte.papel]);
            }
          });
                  
          forEach(partesList.todasPartes, function(parte, a){
            if(!(parte.papel))
              return;
                        
            var nPessItem = templateXmlDoc.createElement('item');
            var cont = templateXmlDoc.createElement('itemContent');
            var d = templateXmlDoc.createElement('data');

            /*nPessItem.id='itPess'+idCount++; // ndlg changed
            if(!(parte.idPess))
              parte.idPess = nPessItem.id;
            */
            if(!(parte.idPess)){ // ndlg as new
              nPessItem.id='itPess'+idCount++;
              parte.idPess = nPessItem.id;
            }else
              nPessItem.id= parte.idPess;

            nPessItem.setAttribute('label', parte.nome);
            nPessItem.setAttribute('dataPlus', '');

            cont.setAttribute('type', 'plainText');
            cont.setAttribute('addtClassStyles', '');

            d.innerHTML = parte.nome + ( (parte.pael) ? '(' + parte.papel + ')': '') ;
            
            templateXmlDoc.getElementsByTagName('items')[0].appendChild(nPessItem);
            nPessItem.appendChild(cont);
            cont.appendChild(d);



            /*Group Item add*/
            var nGItem = templateXmlDoc.createElement('gItem');
            nGItem.setAttribute('id', nPessItem.id);

            groups[parte.papel].appendChild(nGItem);
              

            
          });              
        };

        var adicionarEventoFire = function (evNm) {
          var edNd = templateXmlDoc.createElement('eventFire').setAttribute('event', evNm);
          templateXmlDoc.getElementsByTagName('selectorDef')[0].appendChild( edNd );
        };
                
        
        return {
          'XMLObject' : getXML,
          'adicionarEventFire' : adicionarEventoFire
        };
      }     
    };  
      
    pkg.SeletorPrioridade = {
      constructor_ : function(args, el){
        pkg.SeletorPrioridade.setEvents();
      },
      setEvents : function(){
        evBus.on('SeletorPrioridade.onPrioridadeSimSelected', function(event){
          styleSetter(mod.exp.gE('SDLinkedElementprioridadeExpedientesItems'), 'Visible');
        });
        
        evBus.on('SeletorPrioridade.onPrioridadeNaoSelected', function(event){
          styleSetter(mod.exp.gE('SDLinkedElementprioridadeExpedientesItems'), 'Hidden');
        });        
      }
    };
    
    pkg.Selector = {
      cookies : new window.j2.mod._.CookieJ2('pkg.Selector.cookie'), // slck
      sources : {},
      instances : [], //wa
      constructor_ : function(args, el, modElProt){
        /**
         * modElProt = moddle Element Prototype
         */
        /*var _ = { //wa changes
          ctxt : el,
          select : mod.edt.gE('selector'),
          butAdd : mod.edt.gE('selectorAdd'),
          monitr : mod.edt.gE('selectorMonitor'),
          butDel : mod.edt.gE('selectorDel'),
          _SDAdd : mod.edt.gE('SDAdd'),
          _SDDel : mod.edt.gE('SDDel'),
          _SDCtrl: mod.edt.gE('SDCtrl'),
          //lnkEl : mod.exp.gE('SDLinkedElement'), wa
          lnkEl : (!(args.linkedElInEDT)) ?  // wa adapted
                  mod.exp.gE('SDLinkedElement') :  // wa
                  (  (args.linkedElInEDT === 'true' || args.linkedElInEDT === 'sim') ? mod.edt.gE('SDLinkedElement') :  mod.exp.gE('SDLinkedElement')  ), // wa
          src : {},
          mode : 'undefinied',
          // 4.0 implements 
          container : mod.edt.gE('selector-container-'),
          form : mod.edt.gE('selector-form-'), 
          fieldSet : mod.edt.gE('selector-form-fieldset-'),
          label : mod.edt.gE('seletor-label-text-'), 
          labelDiv : mod.edt.gE('seletor-label-div-')
        };*/
        
        var _ = {
          ctxt : el,
          uuid : window.j2.mod._._guid(), // waup
          select : $(el.edtCore()).find('#selector')[0],
          butAdd : $(el.edtCore()).find('#selectorAdd')[0],
          monitr : $(el.edtCore()).find('#selectorMonitor')[0],
          butDel : $(el.edtCore()).find('#selectorDel')[0],
          _SDAdd : $(el.edtCore()).find('#SDAdd')[0],
          _SDDel : $(el.edtCore()).find('#SDDel')[0],
          _SDCtrl: $(el.edtCore()).find('#SDCtrl')[0],
          lnkEl : (!(args.linkedElInEDT)) ?  // wa
                  $(el.exp).find('#SDLinkedElement')[0] :  // wa
                  (  (args.linkedElInEDT === 'true' || args.linkedElInEDT === 'sim') ? $(el.edtCore()).find('#SDLinkedElement')[0] :  $(el.exp).find('#SDLinkedElement')[0]  ), // wa
          src : {},
          mode : 'undefinied',
          /* 4.0 implements */
          container : $(el.edtCore()).find('#selector-container-')[0],
          form : $(el.edtCore()).find('#selector-form-')[0],
          fieldSet : $(el.edtCore()).find('#selector-form-fieldset-')[0],
          label : $(el.edtCore()).find('#seletor-label-text-')[0],
          labelDiv : $(el.edtCore()).find('#seletor-label-div-')[0],
          __class__ : { // dlg4 as new
            class : 'Selector'
          },
          autoHide : new window.j2.mod._._autoHide([ // ndlg5 as new
            '_SDDel', '_SDAdd', '_SDCtrl',
            'select', 'monitr', 'butAdd',
            'butDel', 'monitr'
          ], this),
          __modElProt__: modElProt 
        };
        
        el._.__class__ = { // ndgl4 as new
          super : {
            Selector : {
              _this : _
            }
          }
        };
        
        if(isObject(args)){
          if(args.autoNewId && (args.autoNewId==='true' || args.autoNewId==='sim'))
            args.newId = j2.mod._._guid;
                  
          if(args.newId){
            if($(el.edt).find('#selector')){ //wa
              for(var e in _)
                if(_[e] && _[e].id){
                  _[e].id += args.newId;
                  _[e]._ = _;
                }
            }
            if(args.initialDisabled && (args.initialDisabled==='true' || args.initialDisabled==='sim')){
              for(var e in _)
                if(_[e] && _[e].id)
                  _[e].setAttribute('disabled', '');
            }
            if(args.initialHidden && (args.initialHidden==='true' || args.initialHidden==='sim')){
              for(var e in _)
                if(_[e] && _[e].id)
                  j2.mod._.styleSetter(_[e], 'Hidden');
            }
            if(args.linkedElTag){
              var nlk = document.createElement(args.linkedElTag);
              nlk.id = _.lnkEl.id;
              _.lnkEl.parentElement.insertBefore(nlk, _.lnkEl);
              _.lnkEl.remove();
              _.lnkEl = nlk;
            }
            
            if(args.linkedElStyleClasses){
              styleSetter(_.lnkEl, args.linkedElStyleClasses);
            }
            
            if(args.label){
              _.label.innerHTML = args.label;
            }
            if(args.hideLabel && ( args.hideLabel === 'true' || args.hideLabel === 'true' ) ){
              _.labelDiv.remove();
            }
            
            if(args.multiple){
              if(args.multiple==='nao'){
                _._SDAdd.remove();
                _._SDDel.remove();
                _._SDCtrl && (_._SDCtrl.style.width = '100%');
                _.mode = 'unique';
              }
              else
                _.mode = 'multiple';
            }
            if(args.linkedElement){
              _.lnkEl.remove();
              _.lnkEl = $(el.exp).find('#' + args.linkedElement.jQId())[0];
            }
            
            if(args.manualSource){
              var __ = parseVar(args.manualSource);
              if(isObject(__))
                _.src = __;
              else
                _.src = args.manualSource;
            }
            
            if(args.onChange)
              if(args.onChange.indexOf('default')!==-1)
                _.select.onchange = function(){
                  pkg.Selector.changeAction(_);
                };
              else
                _.select.onchange = function(){
                  parseVar(args.onChange, [ _ ]);
                };

            if(args.source)
              pkg.Selector.loadSelectSource(args.source, _.select, _, args.newId, args.sourceLoadByExternalEvent || false);
            
            if(args.onAddAction)
              if(args.onAddAction.indexOf('default')!==-1)
                _.butAdd.onclick = function(){
                  pkg.Selector.addAction(_.select, _.monitr, _);
                };
              else
                _.butAdd.onclick = function(){
                  parseVar(args.onAddAction, [_.select, _.monitr, _]);
                };
              
            if(args.onDelAction)
              if(args.onDelAction.indexOf('default')!==-1)
                _.butDel.onclick = function(){
                  pkg.Selector.delAction(_.monitr, _.select, _);
                };
              else
                _.butDel.onclick = function(){
                  parseVar(args.onDelAction, [_.monitr, _.select, _] );
                };
              
            if(args.changeList)
              if(args.onDelAction.indexOf('default')!==-1)
                _.monitr.changeList = function(){
                  pkg.Selector.changeListAction(_.monitr, _);
                };
              else
                _.monitr.changeList = function(){
                  parseVar(pkg.Selector.changeListAction, [_.monitr, _]);
                };
          
            if(args.newSize)
              _.monitr.setAttribute('size', args.newSize);
              
            if(args.monitorCreateGroups)
              forEach(args.monitorCreateGroups, function(gp){
                var _o = document.createElement('optgroup');
                _o.id = gp.id;
                _o.label = gp.label;
                
                _.monitr.appendChild(_o);
              });
            
            _.id = args.newId; // wa
            
            if(args.salvarUltimaEscolha)
              _.salvarUltimaEscolha = args.salvarUltimaEscolha;
          }
          else{
            j2.log('A mudança de Id ara o novo elemnto seletor é obrigatória');
            return;
          }
        }
        pkg.Selector.setEvents(args, _);
        
        pkg.Selector.instances.push(_); // wa
        
        /*_.autoHide = function(tf){ // sah as new // ndlg5
          var _it = function(_el){
            if(!(tf))
              tf = true;
            
            if(tf)
              $(_el).hide();
            else
              $(_el).show();
          };
          
          _it( this._SDDel );
          _it( this._SDAdd );
          _it( this._SDCtrl );
          _it( this.select );
          _it( this.monitr );
          _it( this.butAdd );
          _it( this.butDel );
          _it( this.monitr );
          
        };*/
      },
      setEvents : function(args, _){
        args.filter && evBus.on('afterLoadItems.' + _.select.id, function(){ //chosen
          function bootstrapCssReady() {
            if( parseFloat(_.__modElProt__.versao) < 4.0 )
              return true;

            let folhasDeEstilo = mod.edt.doc.styleSheets;
            for (var i = 0; i < folhasDeEstilo.length; i++) 
              if (folhasDeEstilo[i].href && folhasDeEstilo[i].href.indexOf('bootstrap.css') > -1)
                return true;        
            return false;
          }

          var _$ = mod.edt.win.jQ3;
          var _convertChosen = function(){ //chosen
            if(_$('<select>').chosen && bootstrapCssReady() ){
              _.select.jQ3 = _$(_.select);
              _.select.jQ3.chosen({
                no_results_text : 'Nenhuma finalidade',
                search_contains : true,
                inherit_select_classes : true
              });
            }
            else
              setTimeout(_convertChosen, 50);
          };
          _convertChosen();
        });
        
        if(args.exibirInicialmente)
          if(args.source)
            evBus.on('Selector.loadSelectSource.' + args.source, function(event, monitor){          
              forEach(args.exibirInicialmente.split(' '), function(adv){
                pkg.SeletorAdvertencias.add( adv );
                _.select.value = adv;
                _.butAdd.click();
              });
            });
      },
      changeListAction : function(monitr, _){
        if(!(monitr.options.length))
          return;
        
        while (_.lnkEl.firstChild)
          _.lnkEl.firstChild.remove();

        var selI;
        var appd = {
          type : '[undef]',
          body : {}
        };
        var is;
        if(isObject(_.src))
          is =  _.src.selectorDef.items.item;
        else{
          _.src = parseVar(_.src);
          if(isObject(_.src))
            is =  _.src.selectorDef.items.item;
        }


        /*prepar template outter element to append text */
        /* everty thing wil be appended to 'exp' attribute */
        var container;       
        var val;
        for(var ii=0; ii < monitr.options.length; ii++){
          val = monitr.options[ii].id.replace('_','');
          for(var i in is)
            if(is[i].id === val){
              selI = is[i];
              break;
            }
          
          if(_.src.selectorDef.itemFormats)
             if(_.src.selectorDef.itemFormats.elemento)
               if(_.src.selectorDef.itemFormats.elemento.length){
                 container = document.createElement('div');
                 var baseForma = _.src.selectorDef.itemFormats.elemento[0];
                 baseForma.id = _.select.value + "_li";
                 j2.mod.builder.j2ElementParse(baseForma, container, (selI.itemContent.addtClassStyles && selI.itemContent.addtClassStyles.length) ? selI.itemContent.addtClassStyles : null); // ndlg);
               }            

          /* preparar elemento para ser apensado */
          appd.type = selI.itemContent.type;
          switch( appd.type ){
            case 'HTML':
              appd.body = domify(selI.itemContent.data.text.trim().trimSpaces());
              break;
            case 'plainText':
              appd.body = j2Conv(j2.mod.builder.parseVars(selI.itemContent.data.text.trim().trimSpaces()));
              break;
            case 'selectorArray':
              var arE = selI.itemContent.selectorArray.arElement[0];
              if(arE.data)
                appd.body = j2Conv(j2.mod.builder.parseVars(arE.data.text.trim().trimSpaces()));
              
              if(arE.simpleElementsDefs){
                var cont = document.createElement('div');
                forEach(arE.elemento, function (ele){
                  j2.mod.builder.j2ElementParse(ele, cont);
                });
                
                appd.body = cont;
              }
              
              
              break;
            case 'simpleElementsDefs':
              container = document.createElement('div');
              container.id = _.select.value + "_li";

              forEach(selI.itemContent.simpleElementsDefs.elemento, function (ele){
                j2.mod.builder.j2ElementParse(ele, container);
              });
              appd.body = container;
              container = null;
              break;              
            default:
              appd.body = '[O TIPO É DESCONHECIDO]';
              break;
          }


          evBus.fire("beforeChange." + _.select.id, _, selI, appd);
          evBus.once("onChangeList." + _.select.id + '.' + val, function(ev){
            /*if(_.mode === 'multiple'){
              var i = 0;
            }
            else*/ 
            if (_.mode === 'unique')
              while (_.lnkEl.firstChild)
                _.lnkEl.firstChild.remove();

            if(container){
              container.innerHTML = container.innerHTML.replace('#{textContent}', (appd.body.innerHTML)?appd.body.innerHTML:appd.body);
              appd.body = container.firstChild;
            }

            if(isObject(appd.body))
              _.lnkEl.appendChild(appd.body);
            else
              _.lnkEl.innerHTML =  appd.body;


            forEach(selI.eventFire, function(ev){
              evBus.fire(ev.event, _, selI);
            });
          });
          evBus.fire("onChangeList." + _.select.id + '.' + val, _.select.value, _.select);

        }
      },
      checkControlState : function(_){
        _.butDel.disabled = _.monitr.options.length === 0;
        
        for(var i = 0; i < _.select.options.length; i++)
          if(_.select.options[i].disabled===false){
            _.butAdd.disabled = false;
            return;
          }
        _.butAdd.disabled = true;  
         
      },
      changeAction : function(_){
        /* calcular o item def equivlaente do item alterado */
        var selI;
        var appd = {
          type : '[undef]',
          body : {}
        };
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
          
        // slck
        if(_.salvarUltimaEscolha)
          pkg.Selector.cookies.set('ultimaFinalidade-' + _.select.id, selI.id); // slck
        
        /*prepar template outter element to append text */
        /* everty thing wil be appended to 'exp' attribute */
        var container; 
        
        if(_.src.selectorDef.itemFormats)
          if(_.src.selectorDef.itemFormats.elemento)
            if(_.src.selectorDef.itemFormats.elemento.length){
              container = document.createElement('div');
              var baseForma = _.src.selectorDef.itemFormats.elemento[0];
              baseForma.id = _.select.value + "_li";
              j2.mod.builder.j2ElementParse(baseForma, container, (selI.itemContent.addtClassStyles && selI.itemContent.addtClassStyles.length) ? selI.itemContent.addtClassStyles : null); // ndlg
            }
        
        
        
        /* preparar elemento para ser apensado */
        appd.type = selI.itemContent.type;
        switch( appd.type ){
          case 'HTML':
            appd.body = domify(selI.itemContent.data.text.trim().trimSpaces());
            break;
          case 'plainText':
            appd.body = j2Conv(j2.mod.builder.parseVars(selI.itemContent.data.text.trim().trimSpaces()));
            break;
          case 'selectorArray':
            var arE = selI.itemContent.selectorArray.arElement[0];
            if(arE.data)
              appd.body = j2Conv(j2.mod.builder.parseVars(arE.data.text.trim().trimSpaces()));

            if(arE.simpleElementsDefs){
              var cont = document.createElement('span');
              forEach(arE.simpleElementsDefs.elemento, function (ele){
                j2.mod.builder.j2ElementParse(ele, cont);
              });

              appd.body = cont;
            }
              
            break;
          case 'simpleElementsDefs':
            container = document.createElement('div');
            container.id = _.select.value + "_li";
            
            forEach(selI.itemContent.simpleElementsDefs.elemento, function (ele){
              j2.mod.builder.j2ElementParse(ele, container);
            });
            appd.body = container;
            container = null;
            break;
          default:
            appd.body = '[O TIPO É DESCONHECIDO]';
            break;
        }
            
        
        evBus.fire("beforeChange." + _.select.id, _, selI, appd);
        evBus.once("onChange." + _.select.id, function(ev){
          /*if(_.mode === 'multiple'){
            var i = 0;
          }
          else*/ 
          if (_.mode === 'unique')
            while (_.lnkEl.firstChild)
              _.lnkEl.firstChild.remove();
            
          if(container){
            if(arE && arE.simpleElementsDefs){
              container.firstElementChild.innerHTML = appd.body.innerHTML;
              appd.body = container.firstChild;    
            }
            else{
              container.innerHTML = container.innerHTML.replace('#{textContent}', (appd.body.innerHTML)?appd.body.innerHTML:appd.body);
              appd.body = container.firstChild;
            }
          }
            
          if(isObject(appd.body))
            _.lnkEl.appendChild(appd.body);
          else if (_.mode === 'unique')
            _.lnkEl.innerHTML =  appd.body;
          else { /* is multiple */
            if(!(_.lnkEl.getAttribute('initialStateRemoved'))){
              _.lnkEl.innerHTML = '';
              _.lnkEl.setAttribute('initialStateRemoved', 'true');
            }
            var _sab = document.createElement('span');
            _sab.id = _.select.value + "_li";
            _sab.appendChild(domify(appd.body));
    
            _.lnkEl.appendChild(_sab);
          }
             
          
          forEach(selI.eventFire, function(ev){
            evBus.fire(ev.event, _, selI);
          });
          evBus.fire("afterChange." + _.select.id, _.select.value, _.select, selI, appd.body, _);
        });
        evBus.fire("onChange." + _.select.id, _.select.value, _.select, selI);
        
        pkg.Selector.checkControlState(_);
        
        _.select.jQ3 && defer(function(){_.select.jQ3.trigger('chosen:updated');}); // chosen
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
        
        pkg.Documento.updateParentFields(_.monitr, _);
        
        _.select.jQ3 && defer(function(){_.select.jQ3.trigger('chosen:updated');}); // chosen
      },
      addAction : function(select, monitor, _){
        if(select.options.length===0){
          j2.log('ASSERTION: rotina inesperada alcançada.');
          return;
        }
        
        if(select.options[select.selectedIndex].disabled)
          return;
        
        pkg.Selector.changeAction(_);
        
        var sDo = select.options[select.selectedIndex]; /* selected option */
        if(sDo.disabled)
          return;
        
        var eventPrcId = sDo.id;
        
        
        var nmo = sDo.cloneNode(true);/*new monitor option*/
        nmo.id += '_';

        
        monitor.appendChild(nmo);
        sDo.disabled=true;
        /*sDo.style.display = 'none';
        sDo.style.visibility = 'hidden';*/
        
        if(select.options[select.selectedIndex+1])
          select.options[select.selectedIndex+1].selected = true;
        else if(select.options[select.selectedIndex-1])
          select.options[select.selectedIndex-1].selected = true;  
                
        pkg.Selector.checkControlState(_);
        evBus.fire('onAdd.'+ _.select.id, _);
        evBus.fire('onAdd.'+ _.select.id+'.'+eventPrcId, _);
        evBus.fire("afterChange." + _.monitr.id, _.monitr, _);
        
        pkg.Documento.updateParentFields(_.monitr, _);
      },
      loadSelectSource : function(sourceSt, select, ob, id, byExternEvent){
        var art =  (sourceSt.indexOf('#{')!==-1) ? parseVar(sourceSt) : j2.res.selectSources[sourceSt];
        if(!art){
          j2.log('Erro ao carregar SelectSource ' + sourceSt);
          return;
        }
        
        
        function __parsedXMLHandler(err, definitions, context){
          if(definitions) {
            pkg.Selector.sources[id] = definitions;
            ob.src = definitions;
            pkg.Selector.loadItems(definitions, select);

            evBus.fire('Selector.loadSelectSource.' + sourceSt);
          }
          else
            if(err)
              err();
        }
        
        if(!(byExternEvent)){
          evBus.once('loaded-'+art.lib, function(event, xml){
            if(!(xml))
              xml = window.j2.mod._._xmlDecode( art.xmlEncode.load );

            window.j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', __parsedXMLHandler);
          });
          j2.mod.com.libLoader(art);
        }
        else{
          evBus.on(byExternEvent, function byExternEventHandler(event, definitions){
            evBus.off(byExternEventHandler);
            __parsedXMLHandler(null, definitions);
          });
        }
      },
      loadItems : function(selectorDefModdle, selct){
        var selectedId;
        var _selInst = selct._;
        
        function eCompetencia(i){
          if(!(i.competencias))
            return true;
          
          var _ = false;
          forEach(j2.env.modId.unidade.competencias.competencia, function(uC){
            forEach(i.competencias.competencia, function(iC){
              if(uC.id === iC.id)
                _ = true;
            });
          });
          
          return _;
        };
        
        function itemHint(selI){
          switch( selI.itemContent.type ){
            case 'HTML':
              return domify(selI.itemContent.data.text).textContent.trim().trimSpaces();
              break;
            case 'plainText':
              return domify(j2Conv(j2.mod.builder.parseVars(selI.itemContent.data.text))).textContent.trim().trimSpaces();
              break;
            case 'selectorArray':
              var arE = selI.itemContent.selectorArray.arElement[0];
              if(arE.data)
                return domify(j2Conv(j2.mod.builder.parseVars(arE.data.text.trim().trimSpaces())));

              if(arE.simpleElementsDefs){
                var cont = document.createElement('div');
                forEach(arE.elemento, function (ele){
                  j2.mod.builder.j2ElementParse(ele, cont);
                });

                return cont.textContent.trim().trimSpaces();
              }
              
              return domify(j2Conv(j2.mod.builder.parseVars(selI.itemContent.selectorArray.arElement[0].data.text))).textContent.trim().trimSpaces();
              break;
            case 'simpleElementsDefs':
              var container = document.createElement('div');

              forEach(selI.itemContent.simpleElementsDefs.elemento, function (ele){
                j2.mod.builder.j2ElementParse(ele, container);
              });
              return container.textContent.trim().trimSpaces();
              break;            
            default:
              return 'ERRO AO RECUPERA INFORMAÇÕES';
              break;
          }
        };
        
        function itemToOption(item){
          var o = document.createElement('option');
          o.id = item.id;
          if(selectedId === item.id)
            o.selected = true;
          o.value = item.id;
          o.innerHTML = j2.mod.builder.parseVars(item.label);
          o.title = itemHint(item);
          item.disabled && (o.disabled = item.disabled);
          return o;
        };
        function groupToOptionGroup(grp){
          var oG = document.createElement('optgroup');
          oG.label = j2.mod.builder.parseVars(grp.label);
          return oG;
        };  
        
        /* limpar qualquer elemento/item/option */
        while(selct.options.length){
          selct.options[0].remove();
        }
                

        function itrGroup(arGp, appd, arI){
          forEach(arGp, function(it){
            if (eCompetencia(it)){
              var g = groupToOptionGroup(it);
              appd.appendChild(g);
              forEach(it.gItem, function(it){
                forEach(arI, function(it_item){
                  if(it_item.id === it.id && eCompetencia(it_item))
                    g.appendChild( itemToOption(it_item)) ;
                });
              });
            }
          });
        };
        
        function itrItem(arIt, appd){
          forEach(arIt, function(it){
              appd.appendChild( itemToOption(it)) ;
          });
        };
        
        if(selectorDefModdle.selectorDef.items.initialSelected)
          selectedId = selectorDefModdle.selectorDef.items.initialSelected;
        
        if(selectorDefModdle.selectorDef.groupsDefs)
          if(selectorDefModdle.selectorDef.groupsDefs.group)
            if(selectorDefModdle.selectorDef.groupsDefs.group.length){
              itrGroup(selectorDefModdle.selectorDef.groupsDefs.group, selct, selectorDefModdle.selectorDef.items.item, selct);
              _selInst.__loadedItems = true;
              defer(function(){evBus.fire('afterLoadItems.' + selct.id);});
              // slck
              if(_selInst.salvarUltimaEscolha && pkg.Selector.cookies.get('ultimaFinalidade-' + selct.id))
                selct.value = pkg.Selector.cookies.get('ultimaFinalidade-' + selct.id);
              return;
            }
        
        if(selectorDefModdle.selectorDef.items)
          if(selectorDefModdle.selectorDef.items.item)
            itrItem (selectorDefModdle.selectorDef.items.item, selct);
        
        // slck
        if(_selInst.salvarUltimaEscolha && pkg.Selector.cookies.get('ultimaFinalidade-' + selct.id))
          selct.value = pkg.Selector.cookies.get('ultimaFinalidade-' + selct.id);
        
        _selInst.__loadedItems = true;
        defer(function(){evBus.fire('afterLoadItems.' + selct.id);});
      }
    };     
    
    pkg.ReferenciaDocumento = {
      constructor_ : function(args, el, modElProt){
        modElProt.versao_ = parseFloat(modElProt.versao);
        
        var _;
        if( modElProt.versao_ >= 4.0 ){
          _ = {
            activator : mod.edt.gE('ReferenciaDocumento.Activator'),
            div : {
              initial : mod.edt.gE('ReferenciaDocumento.Initial'),
              activated : mod.edt.gE('ReferenciaDocumento.Activated'),
            },
            windowListOpener : mod.edt.gE('ReferenciaDocumento.WindowListOpener'),
            selectMethod : mod.edt.gE('ReferenciaDocumento.SelectMethod'),
            addId : mod.edt.gE('ReferenciaDocumento.AddId'),
            addIdPreseted : mod.edt.gE('ReferenciaDocumento-AddId-Preseted'),
          };
        }else{
          _ = {
            activator : mod.edt.gE('ReferenciaDocumento.Activator'),
            div : {
              initial : mod.edt.gE('ReferenciaDocumento.Initial'),
              activated : mod.edt.gE('ReferenciaDocumento.Activated'),
              textIdDiv : mod.edt.gE('ReferenciaDocumento.TextIdDiv'),
              AddIdDiv : mod.edt.gE('ReferenciaDocumento.AddIdDiv')
            },
            windowListOpener : mod.edt.gE('ReferenciaDocumento.WindowListOpener'),
            selectMethod : mod.edt.gE('ReferenciaDocumento.SelectMethod'),
            textIdInput : mod.edt.gE('ReferenciaDocumento.TextIdInput'),
            addIdManual : mod.edt.gE('ReferenciaDocumento.AddIdManual'),
            addId : mod.edt.gE('ReferenciaDocumento.AddId'),
            checkAutoSearch : mod.edt.gE('ReferenciaDocumento-CheckBox-Input'), // rdp2
          };
        }
        _.__modElProt__ = modElProt;
        
        pkg.ReferenciaDocumento._ = _;
        
        _.activator.onclick = function(event){
          j2.mod._.styleSetter(_.activator, 'Hidden');
          j2.mod._.styleSetter(_.div.activated, 'Hidden', true);
          pkg.ReferenciaDocumento.openWindowList(_);
          
        };
        
        _.windowListOpener.onclick = function(event){
          pkg.ReferenciaDocumento.openWindowList(_);
        };
        
        _.addId.onclick = function(event){
          pkg.ReferenciaDocumento.insertId(_, event);
        };

        modElProt.versao_ >= 4.0 && ( _.addIdPreseted.onclick = function(){
          /*simula enviar o comando ctrl para o método*/
          pkg.ReferenciaDocumento.insertId(_, { shiftKey : true });
        } );

        modElProt.versao_ < 4.0 && ( _.addIdManual.onclick = _.addId.onclick );
        
        modElProt.versao_ < 4.0 && ( _.checkAutoSearch.onclick = function(event){ //rdp2 as new
          _.checkAutoSearch.setAttribute('disabled', true);
          pkg.ReferenciaDocumento.openWindowListAutoSearch(_);
        });
        
        modElProt.versao_ < 4.0 && (_.selectMethod.onchange = function(event){
          switch (_.selectMethod.value){
            case "idManual":
              j2.mod._.styleSetter(_.div.textIdDiv, 'Hidden', true);
              j2.mod._.styleSetter(_.div.AddIdDiv, 'Hidden');
              j2.mod._.styleSetter(_.selectMethod, 'ReferenciaDocumento.SelectMethodB');
              break;
            case 'docAutos':
              j2.mod._.styleSetter(_.div.textIdDiv, 'Hidden');
              j2.mod._.styleSetter(_.div.AddIdDiv, 'Hidden', true);
              j2.mod._.styleSetter(_.selectMethod, 'ReferenciaDocumento.SelectMethod');
              
              break;
            default:
              j2.mod._.styleSetter(_.div.textIdDiv, 'Hidden');
              j2.mod._.styleSetter(_.div.AddIdDiv, 'Hidden', true);
              j2.mod._.styleSetter(_.selectMethod, 'ReferenciaDocumento.SelectMethod');
              
              _.windowListOpener.click();
              break;
          }
        });
        
        pkg.ReferenciaDocumento.setEvents(_);
      },
      setEvents : function(_){        
        evBus.on('beforeFihishEdition', 9999, function(event, closer){          
          if(mod.sup.docList)
            mod.sup.docList.win.close();
          if(mod.sup.docListAutoSearch) // rdp
            mod.sup.docListAutoSearch.win.close(); // rdp
        });

        evBus.on('ReferenciaDocumento.externalActivation', function(event, closer){          
          j2.mod._.styleSetter(_.activator, 'Hidden');
          j2.mod._.styleSetter(_.div.activated, 'Hidden', true);
          pkg.ReferenciaDocumento.openWindowList(_);
          pkg.ReferenciaDocumento.openWindowListAutoSearch(_); // rdp
        });
      },
      externalActivation : function(){
        
      },
      openWindowListAutoSearch : function(_ctrls){  // rdp as new
        var url = window.location.origin + '/pje/Painel/painel_usuario/Paniel_Usuario_Oficial_Justica/list.seam?idProcessoTrf=' + j2.env.PJeVars.processo.idProcesso;

        var w;
        mod.sup.open('docListAutoSearch', function(){          
          var _ = {
            url : url,
            name : 'wndDocListAutoSearch',
            idProcesso : j2.env.PJeVars.processo.idProcesso,
            winSize : {
              width : 40,
              height : 10
            }
          };
          
          w = j2.mod._._opW.corner( _.url, _.name, _.idProcesso, _.winSize );
          return w;
        });
        
        _ctrls.winReferenceAutoSearch  = w;
        
        //if(_ctrls.selectMethod.value === 'docAutos'){
        var dlasJ2Win = j2.modelo.sup.docListAutoSearch;
          
          dlasJ2Win.win.addEventListener('load', function() {
            j2.modelo.sup.docListAutoSearch.$ = jQ3Factory(j2.modelo.sup.docListAutoSearch.win, true);
            dlasJ2Win.searchClone = {
              tbl : jQ3('<table>'),
              tBodyPrevHash : 0
            };
            setInterval(function(){ 
              var currHsh = dlasJ2Win.$('#processoDocumentoGridList\\:tb').text().hashCode();
              if(currHsh === dlasJ2Win.searchClone.tBodyPrevHash)
                return;
              
              dlasJ2Win.searchClone.tBodyPrevHash = currHsh;
              
              var cln = dlasJ2Win.$('#processoDocumentoGridList\\:tb').clone(true);
              
              cln.find('tr').each(function(a, b, c){
                b.id = jQ3(b).find('td:first').text().trim();
              });
              
              dlasJ2Win.searchClone.tbl.append(cln);
              
              var a =dlasJ2Win.$('.rich-inslider-inc-horizontal')[0]; 
              a.dispatchEvent(new Event('mousedown')); 
              a.dispatchEvent(new Event('mouseup'));
              
            }, 1000);
          });
        //}
        
      },
      openWindowListTry : function(_ctrls){
        var url = (_ctrls.selectMethod.value !== 'docAutos') ? 
                window.location.origin + '/pje/Painel/painel_usuario/Paniel_Usuario_Oficial_Justica/list.seam?idProcessoTrf=' + j2.env.PJeVars.processo.idProcesso
                :
                j2.env.PJeVars.j2Api.URLs.autosDigitaisURL;

        var w;
        mod.sup.open('docList', function(){          
          var _ = {
            url : url,
            name : 'wndDocList',
            idProcesso : j2.env.PJeVars.processo.idProcesso,
            winSize : {
              width : screen.width * 0.6,
              height : screen.height * 0.6
            }
          };
          
          w = j2.mod._._opW.center( _.url, _.name, _.idProcesso, _.winSize );
          return w;
        });
        
        _ctrls.winReference = w;
        
        if(_ctrls.selectMethod.value === 'docAutos'){
          j2.modelo.sup.docList.win.addEventListener('load', function() {
            setInterval(function(){ 
              while(w.document.querySelectorAll('ul.tree').length){
                jQ3.each(w.document.querySelectorAll('ul.tree'), function(i, e){
                  e.remove();
                });
              } 
            }, 1000);
            
            /*var scpt = j2.modelo.sup.docList.doc.createElement("script");                 
            scpt.id = "rIt";
            scpt.innerHTML = 'setInterval(function(){ while($("ul.tree")){$("ul.tree").remove()} }, 1000);';
            j2.modelo.sup.docList.doc.body.appendChild(scpt); */
          });
        }
        
      },
      openWindowList : function(_ctrls){
        
        //pkg.ReferenciaDocumento.openWindowListTry(_ctrls);
        //return;
        
        var url = (_ctrls.selectMethod.value !== 'docAutos') ? 
                window.location.origin + '/pje/Painel/painel_usuario/Paniel_Usuario_Oficial_Justica/list.seam?idProcessoTrf=' + j2.env.PJeVars.processo.idProcesso
                :
                j2.env.PJeVars.j2Api.URLs.autosDigitaisURL;

        var w;
        mod.sup.open('docList', function(){          
          var _ = {
            url : url,
            name : 'wndDocList',
            idProcesso : j2.env.PJeVars.processo.idProcesso,
            winSize : {
              width : screen.width * 0.6,
              height : screen.height * 0.6
            },
            altTitle : 'Inserir Referência de Documento'
          };
          
          w = j2.mod._._opW.center( _.url, _.name, _.idProcesso, _.winSize, null, null, _.altTitle );
          return w;
        });
        
        _ctrls.winReference = w;
        
        
        
        /* Depreciado com a atualizaão da versão do PJe
         * if(_ctrls.selectMethod.value === 'docAutos'){
          j2.modelo.sup.docList.win.addEventListener('load', function() {
            j2.modelo.sup.docList.$ = jQ3Factory(j2.modelo.sup.docList.win, true);
            setInterval(function(){ 
              j2.modelo.sup.docList.$('ul.tree').each(function(i, _dv){
                //jQ3(_dv).find('li').not('[j2ruled="true"]').each(function(i, e){ // rdp2
                jQ3(_dv).find('li').each(function(i, e){  
                  var eId = e.textContent.trim().split('-')[0].trim();
                  
                  if (!(j2.modelo.sup.docListAutoSearch)){
                    if(!(isNaN(eId)))
                      jQ3(e).css('display', 'none');
                    return;
                  }
                  var dlasJ2Win = j2.modelo.sup.docListAutoSearch; 
                  var cssRule = 'none';
                  
                  if(!(isNaN(eId))){
                    if (dlasJ2Win.searchClone && dlasJ2Win.searchClone.tbl.find('#' + eId).length){
                      cssRule = 'list-item';
                      jQ3(e).attr('j2Ruled', 'true');
                    }
                  }else
                    return;
                  
                  jQ3(e).css('display', cssRule);

                });
              });
            }, 1000);
          });
        }*/
        
      },
      getByExtern : function(callback){
        var _ = {
          selectMethod : mod.edt.gE('ReferenciaDocumento.SelectMethod'),
          textIdInput : mod.edt.gE('ReferenciaDocumento.TextIdInput')
        };
        /*
        var _r = {};
        
        var doc = {
          id : pkg.ReferenciaDocumento.getIdBasedOnMethod(_).replace(/\D+/g,''),
          url : null
        };
        
        if( doc.id=== 0)
          return;
        
        if(doc.id.length===0){
          pkg.ModalDialog.ok('O Id não foi não é válido ou não foi selecionado.', 'ReferenciaDocumento j2 - Atenção');
          return;
        }
                
        if(!pkg.ReferenciaDocumento.findURL(doc, _)){
          pkg.ModalDialog.ok('O Id não foi encontrado na lista de documentos.', 'ReferenciaDocumento j2 - Atenção');
          return;
        }
        
        doc.url = window.location.origin + doc.url;
        pkg.ReferenciaDocumento.prepareHTMLElements(doc);
        return doc;*/
        
        var _this = pkg.ReferenciaDocumento;
        evBus.once('ReferenciaDocumento-onFindKeys', function(ev, keys){
          _this.findURL(keys);          
          _this.prepareHTMLElements(keys);
          callback(keys);
        });
        
        pkg.ReferenciaDocumento.getIdBasedOnMethod(_);
      },
      insertId : function(_, event){
        var _this = pkg.ReferenciaDocumento;
        evBus.once('ReferenciaDocumento-onFindKeys', function(ev, keys){
          _this.findURL(keys);          
          _this.prepareHTMLElements(keys);
          _this.processInsertion(keys, event);
        });
        
        pkg.ReferenciaDocumento.getIdBasedOnMethod(_);
        
      },
      prepareHTMLElements : function(keys){
        var imgViewCln = mod.edt.gE('ReferenciaDocumento.View').cloneNode(true);
        j2.mod._.styleSetter(imgViewCln, 'Hidden', true);
        
        imgViewCln.setAttribute('mce_style', '');
        imgViewCln.style.height = '12px';
        imgViewCln.style.verticalAlign = 'bottom';

        var spn = document.createElement('span');
        var u = document.createElement('u');
        spn.style.cursor = 'pointer';
        spn.title = 'documento id ' + keys.doc;
        spn.setAttribute('contenteditable', false);
        u.innerHTML = 'id ' + keys.doc;


        var spnBs = document.createElement('span');
        spnBs.innerHTML = '&nbsp;';

        var oCSrc = 'window.open(\'' + keys.url + '\', ' + keys.id + ' + \'popUpDocumento\', \'width=780, height=740, scrollbars=yes\').focus();';

        spn.setAttribute('onclick', oCSrc);
        imgViewCln.setAttribute('onclick', oCSrc);

        spn.appendChild( u );
        u.appendChild( imgViewCln );
        keys.html = {
          spn : spn,
          spnBs : spnBs
        };
      },
      processInsertion : function(keys, event, defInsEl){ 
        /* defInsEl - default insetion element */

        if(!(defInsEl))
          defInsEl = {
            id : 'docId',
            idDefText : 'docIdDefaulttext'
          };

        if(event)
          if(event.shiftKey)
            if(mod.exp.gE( defInsEl.id )){
              var _ = mod.exp.gE( defInsEl.id );
              forEach(_.getElementsByTagName('span'), function(ch){
                  if(ch.id === defInsEl.idDefText)
                      ch.remove();
              });
              mod.exp.win.getSelection().collapse(mod.exp.gE( defInsEl.id ), 0);
            }
            else{
              pkg.ModalDialog.ok('Não há ponto de inserção pré definido no documento.', 'ReferenciaDocumento j2 - Informação');
              return;
            }

        var slc = mod.exp.win.getSelection();

        var rng;
        if(slc.rangeCount===0){
          pkg.ModalDialog.ok('A posição da inserção não está definida.', 'ReferenciaDocumento j2 - Atenção');
          return;
        }else if( slc.toString().length === 0){
          rng = slc.getRangeAt(0);
        }else{
          rng = document.createRange();
          rng.setStart( slc.anchorNode, slc.anchorOffset );
          rng.setEnd( slc.focusNode, slc.focusOffset );
          rng.deleteContents();
        }

        rng.insertNode( keys.html.spn );
        rng.setStartAfter( keys.html.spn );
        rng.insertNode( keys.html.spnBs );
        rng.setStartAfter( keys.html.spnBs );

        if(keys.html.spn.nextSibling === null){
          var tn = document.createTextNode('&nbsp;');
          rng.insertNode( tn );
          rng.setStartAfter( tn );
        }else{
          if ( keys.html.spn.nextSibling.nodeName === '#text' ){
             if(keys.html.spn.nextSibling.nodeValue.lentgh === 0){
               keys.html.spn.nextSibling.innerHTML = '&nbsp;';
             }
          }
          rng.setStartAfter( keys.html.spn.nextSibling );
        }
      },
      findURL : function(keys){        
        var ___HTML___PATTERN___ = '/pje/Painel/painel_usuario/popup/visualizarExpediente.seam?paramIdProcessoDocumento=#{idDoc}&paramIdProcessoDocumentoBin=#{idBin}&idProcessoDoc=#{idDoc}&idBin=#{idBin}&idProcesso=#{idProcesso}&actionMethod=Painel%2Fpainel_usuario%2FPaniel_Usuario_Oficial_Justica%2Flist.xhtml%3AprocessoDocumentoHome.setIdDocumentoDestacar%28linha.idProcessoDocumento%2Cfalse%29';
        var ___ATTACH___PATTERN___ = '/pje/Processo/ConsultaDocumento/listView.seam?idBin=#{idBin}&numeroDocumento=#{numDoc}&idProcessoDocumento=#{idDoc}&actionMethod=Processo%2FConsultaDocumento%2FlistView.xhtml%3AprocessoDocumentoBinHome.setDownloadInstance%28idBin%29'; 

        var urlPattern = (keys.isAttach | keys.isPDF )  ? ___ATTACH___PATTERN___ : ___HTML___PATTERN___;
        urlPattern = urlPattern.split('#{idDoc}'     ).join( keys.doc                                     );
        urlPattern = urlPattern.split('#{idBin}'     ).join( keys.bin                                     );
        urlPattern = urlPattern.split('#{numDoc}'     ).join( keys.numDoc                                 );
        urlPattern = urlPattern.split('#{idProcesso}').join( j2.env.PJeVars.processo.idProcesso.toString() );

        keys.url = window.location.origin + urlPattern;
        
        return true;
      },
      getIdBasedOnMethod : function (_){
        var win = _.winReference || j2.modelo.sup.docList;
        var winDoc = win.document || win.doc;
        var a = winDoc.querySelectorAll('h3.media-heading a');
        if(a.length === 0)
          a = pkg.ReferenciaDocumento._.winReference.document.querySelectorAll('h3.media-heading a');
        a = (a.item(0).onclick) ? a.item(0).onclick.toString() : $(a[0].outerHTML)[0].onclick.toString();
        if(a.match(/idProcessoDoc=[0-9]+&/)){
          _.ids = {
            doc : (function(){
              var b = a.match(/idProcessoDoc=[0-9]+&/);
              return b[0].split('=')[1].split('&')[0];
            })(),
            bin : (function(){
              var b = a.match(/idBin=[0-9]+&/);
              return b[0].split('=')[1].split('&')[0];
            })()
          };
          _.ids.id = _.ids.doc;
          evBus.fire('ReferenciaDocumento-onFindKeys', _.ids);
        }else{
          /*
           * método procurar pelo idBin na própria página, que não está esclusivamente no cabeçalho
           * principal do documento
           * @returns {undefined}
           */
          (function ___getByGetIdBinToModernaExibicaoExpedientes(){
            var _refWinDoc = pkg.ReferenciaDocumento._.winReference.document;
            
            var html = jQ3('a', _refWinDoc).filter(function(){
              var $a =  jQ3(this);
              var _html = $a.prop('outerHTML');
              return _html.match(/idBin/);
            }).prop('outerHTML');
            
            _.ids = {
              doc : (function(){
                var b = html.match(/idProcessoDoc=[0-9]+&/);
                return b[0].split('=')[1].split('&')[0];
              })(),
              bin : (function(){
                var b = html.match(/idBin=[0-9]+&/);
                return b[0].split('=')[1].split('&')[0];
              })()
            };
            _.ids.id = _.ids.doc;
            evBus.fire('ReferenciaDocumento-onFindKeys', _.ids);
          })();
          /*
           * Esse método usa a consulta pública do PJe para obter um hash nominado
           * numeroProcesso, que é chave para acessar sem o acesso direito do PJe.
           * 
           * mantido para eventuais futuros usos
           * @returns {unresolved}
           */
          function ___getByQueryingHashConsultaPublica(){
            var _refWinDoc = pkg.ReferenciaDocumento._.winReference.document;
            var _aIdDoc = _refWinDoc.querySelectorAll('h3.media-heading a')[0].textContent.trim().split('-')[0].trim();
            var _aIdBin = (function(){
              var html = jQ3('a', _refWinDoc).filter(function(){
                var $a =  jQ3(this);
                var _html = $a.prop('outerHTML');
                return _html.match(/idBin/);
              }).prop('outerHTML');

              var b = html.match(/idBin=[0-9]+&/);
              return b[0].split('=')[1].split('&')[0];
            })();

            _.ids = {
              /*isAttach : true,*/
              isPDF : true,
              doc : null,
              bin : null,
              hash : null,
              numDoc : null
            };

            if ( isNaN(_aIdBin) )
              return null;
            var _hash = jQ3(j2.env.PJeVars.processo.documentos).find('td:contains(' + _aIdBin + ')').text().trim();

            if(!_hash.length)
              return null;

            jQ3.get('https://pje.tjma.jus.br/pje/Processo/ConsultaDocumento/listView.seam?x='+_hash, function(resp){
              jQ3(resp).find('a').each(function(){
                var $a =  jQ3(this);
                var html = $a.prop('outerHTML');

                if(html.match(/numeroDocumento=/)){
                  _.ids.doc = (function(){
                    var b = html.match(/idProcessoDocumento=[0-9]+&/);
                    return b[0].split('=')[1].split('&')[0];
                  })();
                  _.ids.bin = (function(){
                    var b = html.match(/idBin=[0-9]+&/);
                    return b[0].split('=')[1].split('&')[0];
                  })();
                  _.ids.numDoc = (function(){
                    var b = html.match(/numeroDocumento=[a-zA-Z0-9]+&/);
                    return b[0].split('=')[1].split('&')[0];
                  })();
                  _.ids.id = _.ids.doc;
                }
              }); 
              if(_.ids.numDoc)
                evBus.fire('ReferenciaDocumento-onFindKeys', _.ids);
            });
          }
          
        }
      }
    }; 
    
    pkg.Space = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.exp): mod.exp;
        var _ ={
          spc : win.gE('space')
        }; 
        
        if(isObject(args)){
          if(args.newId){
            if(_.spc)
              _.spc.id += '.'+args.newId;
            else{
              j2.err('A mudança de Id ara o novo elemnto seletor é obrigatória');
              return;
            }
          }
          if(args.size){
            args.size  = parseInt(args.size);
            if(args.size > 0)
              for(var i = 1; i <= args.size-1; i++)
                _.spc.appendChild(_.spc.firstChild.cloneNode(true));
            
          }
          
          if(args.oculto)
            if(args.oculto === 'sim' || args.oculto === 'true')
              j2.mod._.styleSetter(_.spc, 'Hidden');
        }
        if( _.spc.id === 'space') /* se ainda for space*/
          _.spc.id += '.' + Math.random().toString();
      }
    };
    
    pkg.Titulo = {
      constructor_ : function(args, el){
        var win = (args) ? ((args.j2Win) ? args.j2Win : mod.exp): mod.exp;
        
        var _ = {
          //title : win.gE('expTitle')
          title : jQ(el.exp).find('#expTitle').get(0)
        };        
        
        if(isObject(args)){
          if(args.newId){
            if(_.title)
              _.title.id += '.'+args.newId;
            else{
              j2.err('A mudança de Id ara o novo elemnto seletor é obrigatória');
              return;
            }
          }
          
          if(args.styleClasses){
            styleSetter(_.title, args.styleClasses);
          }
          
          if(isObject(args))
            if(args.text)
              pkg.Titulo.change(args.text, null, _);
        }
      },
      change : function(text, el, _){
        if(el){
          if(el === 'default')
            el = mod.exp.gE('expTitle');
          
            el.innerHTML = text;
        }else{
          _.title.innerHTML = text;
          el = _.title;
        }
        
        evBus.fire('ClasseTitulo.change.'+ el.id, text);
      }
    };     
    
    pkg.Utilidades = {
      documentosProcessoFormart : function(tblCnt, pFormats, tdThLine){                    
        forEach(tblCnt.getElementsByTagName('p'), function(e){
          e && e.removeAttribute('mce_style');
        });
        
        forEach(tblCnt.getElementsByTagName('p'), function(e){
          e && (e.innerHTML.length < 1) && e.remove();
        });
        
        forEach(['th', 'td', 'p', 'table'], function(tag){
          forEach(tblCnt.getElementsByTagName(tag), function(e){
            switch(tag){
              case 'p':
                j2.mod._.styleSetter(e, pFormats);
                break;
              case 'table':
                e.setAttribute('width', '100%');
                break;
              default:
                var p = document.createElement('p');
                p.innerHTML = e.innerHTML;
                j2.mod._.styleSetter(p, pFormats + ((tdThLine) ? ' ' + tdThLine : ''));
                while(e.firstChild)
                  e.firstChild.remove();
                e.appendChild(p);
                
                break;
            }
          });
        });
      },
      highLightingController : {
        _ : [],
        __idTI : null,
        __isConstructed : false,
        __DEFAULT_TIME : 5000,
        constructor_ : function(){
          var _this = pkg.Utilidades.highLightingController;
          
          
          
          if(! _this.__idTI)
            _this.__idTI = setInterval(function(){
              forEach(_this._, function(el){
                var _el = jQ3(mod[el.ctx].gE(el.fld));
                _el.addClass('HLField');
                if(el.cb)
                  el.cb(_el);
              });
            }, _this.__DEFAULT_TIME);
          
          _this.__isConstructed = true;
        },
        addField : function(context, fieldId, callback){
          var _this = pkg.Utilidades.highLightingController;
          _this.constructor_();
          
          _this._.push( { ctx : context, fld : fieldId, cb : callback} );
          
          var _el = jQ3(mod[context].gE(fieldId));
          
          _el.addClass('HLField');
        },
        delField : function(context, fieldId){
          var _this = pkg.Utilidades.highLightingController;
          var idx;
          var fld;
          
          var _el = jQ3(mod[context].gE(fieldId));
          
          _el.removeClass('HLField');
          
          for (idx = _this._.length - 1; (fld = _this._[idx]) ; idx--) {
            if (fld.ctx === context && fld.fld === fieldId) {
              _this._.splice(idx, 1);
            }
          }
        }
      },
      parseEnderecosFrameComunicacaoToQRCodeGoogleMaps : end =>{
        var pEnd = {
          existe : true,
          uuid : guid()
        };
        var split1 = end.split(', ')
        var cidUfCepBlock = split1.pop();

        cidUfCepBlock = cidUfCepBlock.split(' - ')

        pEnd.CEP = cidUfCepBlock.pop().split(': ')[1]
        pEnd.UF = cidUfCepBlock.pop()
        pEnd.municipio = cidUfCepBlock.join(' - ')
        pEnd.numero = ''

        switch(split1.length){
          case 2:
            pEnd.logradouro = split1[0]
            pEnd.bairro = split1[1]
            break;
          case 3:
            pEnd.logradouro = split1[0]
            pEnd.numero = split1[1]
            pEnd.bairro = split1[2]
            break;
          
          default: // Rua Marechal, 1420, entre Pará e maranhão,  Beira Rio
            pEnd.bairro = split1.pop()
            pEnd.logradouro = split1.shift()
            pEnd.numero = split1.shift()
            break;
        }

        pEnd.UF = j2.env.PJeVars.util.UFExtensoByUF(pEnd.UF);

        var _this = pEnd;

        return  _this.logradouro + ((_this.logradouro.length === 0)         ? '': ', ') + 
                _this.numero      + ((_this.numero.length === 0)             ? '': ', ') + 
                _this.bairro      + ((_this.bairro.length === 0)             ? '': ', ') + 
                _this.municipio   + ((_this.municipio.length === 0)          ? '': ', ') + 
                _this.UF          

      },
      parseEnderecosFrameComunicacao : endStr =>{
        function splitEnds(str) {
          const partes = str.split(/(?<=CEP:.*);/);
          return partes.map((parte) => parte.trim());
        }

        const ends = splitEnds(endStr)

        ends.forEach( (end, idx, ends) => {
          var pEnd = {
            existe : true,
            uuid : guid()
          };
          var split1 = end.split(', ')
          var cidUfCepBlock = split1.pop();

          cidUfCepBlock = cidUfCepBlock.split(' - ')

          pEnd.CEP = cidUfCepBlock.pop().split(': ')[1]
          pEnd.UF = cidUfCepBlock.pop()
          pEnd.municipio = cidUfCepBlock.join(' - ')
          pEnd.complemento = ''
          pEnd.numero = ''

          switch(split1.length){
            case 2:
              pEnd.logradouro = split1[0]
              pEnd.bairro = split1[1]
              break;
            case 3:
              pEnd.logradouro = split1[0]
              pEnd.numero = split1[1]
              pEnd.bairro = split1[2]
              break;
            
            default: // Rua Marechal, 1420, entre Pará e maranhão,  Beira Rio
              pEnd.bairro = split1.pop()
              
              pEnd.logradouro = split1.shift()
              pEnd.numero = split1.shift()
              pEnd.complemento = split1.join(', ')
              
              break;
          }

          pEnd._ = ()=>{
            var _this = pEnd

            if(!_this.existe)
              return '(sem endereço cadastrado)';

            return _this.logradouro + ((_this.logradouro.length === 0)         ? '': ', ') + 
                  _this.numero      + ((_this.numero.length === 0)             ? '': ', ') + 
                  _this.complemento + ((_this.complemento.length === 0)        ? '': ', ') + 
                  _this.bairro      + ((_this.bairro.length === 0)             ? '': ', ') + 
                  _this.municipio   + ((_this.municipio.length === 0)          ? '': ' - ') + 
                  _this.UF          + ((_this.UF.length === 0)                 ? '': ' - CEP: ') + 
                  _this.CEP;
          }

          ends[idx] = pEnd;
        })

        return ends;
      }
    };
    
    pkg.VistosEmCorreicao = {
      constructor_ : function(args, el){
        var _ = j2.env.modId.unidade.config.correicao;
        _ = {
          inicio : new Date(Date.parse(_.inicio)),
          fim : new Date(Date.parse(_.fim)),
          hoje : new Date(),
          el : $(el.exp).find('#vistosEmCorreicao')[0]
        };
        
        if( !(_.inicio <=  _.hoje && _.hoje <= _.fim)  ){
          _.el.remove();
          return;
        }
        
        j2.mod._.styleSetter(_.el, 'Hidden', true);
      }
    };     
    
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.baseClasses.lib;
  alert(t);
  console.error(t);
}

