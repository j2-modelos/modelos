/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log('AR.js - módulo compilante');

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
    
    var isObject = new window.j2.mod._._201; // pl
    var forEach = w.j2.mod.forEach;
    var filter = new window.j2.mod._._90; // pl
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    //var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var isString = new window.j2.mod._._203; //pl
    var last = new window.j2.mod._._87;
    
    //var cookies = new window.j2.mod._._cookies; // ard
    //var __COOKIES_EXPIRE_TIME___ = 3600 * 2/(60*60*24); // ard
    
    //for debbugging nly
    //localStorage.removeItem('pkg.AR.registeredPostList') ;
    
    var _unId = function(pfx){ // pl as new 
      var f = false;
      if(j2) if(j2.env) if(j2.env.modId) if (j2.env.modId.unidade) if(j2.env.modId.unidade.id) f = true;
      
      if(f)
        return ((pfx) ? 'un' : '') + Math.abs( j2.env.modId.unidade.id.hashCode() ); 
      else
        return 0;
    }; 
    var _usId = function(pfx){ return ((pfx) ? 'us' : '') + j2.env.PJeVars.usuario.CPF; }; //pl
    
    String.prototype.pad20 = function(){ // ard as new
      if(this.length <= 30)
        return this;
      
      return this.slice(0, 27).trim() + "...";
    };
    
    String.prototype.dateISOtoBR = function(){ // ard as new
      var a = this.toString().split('-');
              
      return [a[2],a[1],a[0]].join('/');
    };
    
    pkg.AR = {
      cookies : new window.j2.mod._.CookieJ2('pkg.AR.cookie'),
      vars : { //ard as new
        AR : "ZZ000000000ZZ",
        AR_AA : "ZZ000000000AA",
        PLP : function(){
          //var _ = cookies.get('pkg.AR.vars.PLP');
          var _ = pkg.AR.cookies.get('PLP');
          
          return _ ? _ : 0;
        },
        MP : {
          _ : false,
          cssRule : 'none'
        },
        destinatario : {
          nome : '[NOME DESTINATÁRIO]',
          logradouro : '[LOGRADOURO]',
          numero : (function(){
              var end = j2.env.PJeVars.expediente.destinatario;            
              var _ = end.match(/[0-9]{5}-[0-9]{3,}/);
              if(!(_))
                  return '00000';
              var _n = end.split('CEP')[0].split(',')[1].trim();
              if(isNaN(_n))
                return '00000';
              else
                return _n.padStart(5,"0");
          })(),
          complemento : '[COMPLEMENTO]',
          bairro : '[BAIRRO]',
          CEP : (function(){
            var _ = j2.env.PJeVars.expediente.destinatario.match(/[0-9]{5}-[0-9]{3,}/g);
            if(_)
              return last(_);
            else
              return "99999-999";
          })(),
          cidade : (function(){
              var end = j2.env.PJeVars.expediente.destinatario;            
              var _ = end.match(/[0-9]{5}-[0-9]{3,}/);
              if(!(_))
                  return "[NÃO FOI POSSÍVEL PROCESSAR cidade]";

              return end.split('CEP')[0].split(',').pop().split(' - ').slice(0, -2).join('-').trim().toUpperCase();
          })(),
          UF : (function(){
              var end = j2.env.PJeVars.expediente.destinatario;            
              var _ = end.match(/[0-9]{5}-[0-9]{3,}/);
              if(!(_))
                  return "ZZ";

              var it = end.split('CEP')[0].split(',').pop().match(/ [A-Z]{2} /g);
              if(it)
                  return last(it).trim();
          })(),
          endPJe : j2.env.PJeVars.expediente.destinatario || '[ENDEREÇO INVÁLIDO]',
          AREndElements : (function(){
              var end = j2.env.PJeVars.expediente.destinatario;            
              var _ = end.match(/[0-9]{5}-[0-9]{3,}/);
              if(!(_))
                  return "[NÃO FOI POSSÍVEL PROCESSAR AREndElements]";

              return end.split('CEP')[0].split(',').slice(0, -1).join(',');
          })()
        },
        dataPostagem : function(){
          //var _ = cookies.get('pkg.AR.vars.dataPostagem');
          var _ = pkg.AR.cookies.get('dataPostagem'); // newCook
          return _ ? _ : '2000-01-01';
        },
        dataMatrix : function(){
          var ARD_IDV = 17;
          var ARD_CEP_ORG = 65912355;
          var ARD_UNSET_CEP_COMPLEMENT = '00000';
          var ARD_SERV_ADD_SEM_MP = 2537000000;
          var ARD_SERV_ADD_COM_MP = 0225370000; // A CONFIRMAR
          var ARD_COD_SERV_PRINCIPAL = 10065; // A CONFIRMAR
          var ARD_UNSET_CIF = '0000000000000000000000000000000000';
          var ARD_CAMPO_RESERVA = '000000000000000';
          var ARD_CNAE = '008423000';
          
          
          function validCepDest(cep){
            var st = cep.toString().split('');
            for(var i = 0; i < 8; i++)
              st[i] = parseInt(st[i]);
            
            var sum = 0;
            for(var i = 0; i < 8; i++)
              sum += st[i];
            
            if(sum % 10 === 0)
              return 0;
            else
              return 10 - (sum % 10);
          };
                  
          
          var _1_cepDest = pkg.AR.vars.destinatario.CEP.match(/\d+/g).join('');
          var _2_cepDestCompl = pkg.AR.vars.destinatario.numero;
          var _5_cepDestValid = validCepDest(_1_cepDest);
          var _8_ServAdcion = pkg.AR.vars.MP._ ? ARD_SERV_ADD_COM_MP : ARD_SERV_ADD_SEM_MP;
          var _12_AR_Num = pkg.AR.vars.AR;
          
          
          var mtx = [];
          mtx = [
            _1_cepDest,                   // 01
            _2_cepDestCompl,              // 02
            ARD_CEP_ORG,                  // 03
            ARD_UNSET_CEP_COMPLEMENT,     // 04
            _5_cepDestValid,              // 05
            ARD_IDV,                      // 06
            ARD_UNSET_CIF,                // 07
            _8_ServAdcion,                // 08
            ARD_COD_SERV_PRINCIPAL,       // 09
            ARD_CAMPO_RESERVA,            // 10
            ARD_CNAE,                     // 11
            _12_AR_Num,                   // 12
            '|'                           // 13
          ];
          
          
          return mtx.join('');
        },
        descricaoConteudo : ' '
      },
      constructor_ : function(args, el){
        /* creating event listener*/
        pkg.AR.setEvents();
        
        mod.edt.gE('modAddtCtrls').appendChild(pkg.AR.ARElements.edtContr);
        
        j2.mod.com.libLoader(j2.res.mod.ARDef);
        
        pkg.AR.postList.procNum = j2.env.PJeVars.processo.numero;
                
        // developing insertioin
        if(mod.par.gE('j2Sigepper.cnt'))
          mod.par.gE('j2Sigepper.action').click();
        
        pkg.BotaoVizualizarImpressao.registerOtherCallbacks(pkg.AR.onPrintProcedure);
      },
      isVisible : false,
      visibleOn : function(trueOrFalse){
        j2.mod._.styleSetter(pkg.AR.ARElements.edtContr, 'Hidden', true);
        j2.mod._.styleSetter(mod.exp.gE('quebraPaginaAR'), 'Hidden', true);
        j2.mod._.styleSetter(mod.exp.gE('p2'), 'Hidden', true);
        
        pkg.AR.isVisible = true;
        
      },
      visibleOff : function(){
        j2.mod._.styleSetter(pkg.AR.ARElements.edtContr, 'Hidden');
        j2.mod._.styleSetter(mod.exp.gE('quebraPaginaAR'), 'Hidden');
        j2.mod._.styleSetter(mod.exp.gE('p2'), 'Hidden');
        
        pkg.AR.isVisible = false;
      },
      onPrintProcedure : function(event){
        if(event.shiftKey)
          window.alert('Print Post List');
      },
      modeloDef : {},
      getVersion : function(ver){
        var _ = null;
        forEach(pkg.AR.modeloDef.modelos[0].versao, function(v){
          if(v.id === ver)
            _ = v;
        });

        return _;
      },
      append : function(container, contentIterator, version){
        pkg.AR.version = version || '6.0';
        
        var ARVersion = pkg.AR.getVersion(version || '6.0');
        
        if(pkg.AR.modeloDef.modelos[0].classStyles)
          ARVersion.classStyles = pkg.AR.modeloDef.modelos[0].classStyles;
        
        j2.mod.builder.build(ARVersion, 'AR', container || { exp : mod.exp.gE('j2Exp'), edt : pkg.AR.ARElements.edtContr });
        
        pkg.AR.isVisible = true;
        
        if(contentIterator){
          forEach(contentIterator.eventName, function(ev){
            evBus.on(ev, function(event, a, b){
              pkg.AR.updateContent(contentIterator);
            });
          });
          pkg.AR.updateContent( contentIterator );
        }
      },
      updateContent : function(selc, ctxt){
        var tx = '';
        if(selc.monitor)
          forEach(selc.monitor.options, function(o){
            tx += (tx.length) ? ', ' + o.innerHTML : o.innerHTML;
          });
        if(selc.sub)
          tx = selc.sub();
        
        if(selc.prePattern)
          tx = (tx.length) ? selc.prePattern + ' (' + tx + ')' : selc.prePattern;
        
        var cnt = null; // ard
        if( (ctxt && $(ctxt.exp).find('#AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR'.jQId()).length) || mod.exp.gE('AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR') ){ // ard as new
          var cnt = {
            p :   (ctxt) ? $(ctxt.exp).find('#AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR'.jQId())[0]               : mod.exp.gE('AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR'),
            div : (ctxt) ? $(ctxt.exp).find('#AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR'.jQId())[0].parentElement : mod.exp.gE('AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR').parentElement
          };
        }
        
        if (cnt){ // ard as new
          cnt.p.innerHTML = tx;
          j2.mod._.styleSetter(cnt.p, 'AR.Body.Identifications.ConteudoDescricao#DescricaoConteudoAR');
          while(cnt.p.clientHeight > cnt.div.clientHeight)
            cnt.p.style.fontSize = (cnt.p.style.fontSize.replace('pt','')-1) + 'pt';
        }
        
        pkg.AR.postList.desc = tx;
        pkg.AR.vars.descricaoConteudo = tx; // ard
      },
      prepareAR : function(args, el){        
        /* creating event listener*/
        evBus.fire('AR.onLoadLibs');
      },      
      treatePosstList : function(){
        pkg.AR.registeredPostList[pkg.AR.registeredPostList.length] = pkg.AR.postList;
        localStorage.setItem('pkg.AR.registeredPostList', JSON.stringify(
          pkg.AR.registeredPostList
        ));       
      },
      printPostList : function(){
        j2.mod.com.libLoader(j2.res.mod.postList);
        evBus.once('postList.onLoadLibs', function(event){          
          mod.sup.open('printPostList', function(){
            var _ = {
              url : '',
              name : 'printPostList',
              winSize : {
                width : 1092,
                height : 630
              }
            };
            return j2.mod._._opW.center( _.url, _.name, null, _.winSize );
          });
          
          pkg.postList.initialFilter = { // pl as new
            usuarioId : _usId(),
            unidadeId : _unId()
          };
          
          mod.sup.printPostList.win.focus();       
          while(mod.sup.printPostList.doc.body.firstChild)
            mod.sup.printPostList.doc.body.firstChild.remove();
          pkg.postList.append({ exp : mod.sup.printPostList.doc.body });
        });
      },
      setEvents : function(args, el){        
        evBus.on('builder.afterBuildModSet.AR', function(event){ 
          evBus.fire('Editor.onResize');
        });   
        
        evBus.on('onFinishEdition', 10000, function(event){
          pkg.AR.treatePosstList();
        });
        evBus.on('beforeFihishEdition', 10000, function(event, closer){ 
          if(pkg.AR.version === '7.0'){
            if(pkg.AR.isVisible && (!(pkg.AREdtControles.checkARNum(pkg.AR.vars.AR)))){ // ard
              pkg.DocEditorCore.proceedFinish = false; 
              event.stopPropagation();
              pkg.ModalDialog.ok('Você deve registrar um número ao AR.', 'AR j2 - Atenção');
              return;
            }
            if(pkg.AR.isVisible && ( pkg.AR.vars.PLP === 0 )){ // ard as new
              pkg.DocEditorCore.proceedFinish = false; 
              event.stopPropagation();
              pkg.ModalDialog.ok('Você deve registrar o número da PLP.', 'AR j2 - Atenção');
              return;
            }
            if(pkg.AR.isVisible && ( pkg.AR.vars.dataPostagem === '2000-01-01' )){ // ard as new
              pkg.DocEditorCore.proceedFinish = false; 
              event.stopPropagation();
              pkg.ModalDialog.ok('Você deve registrar a data da postagem.', 'AR j2 - Atenção');
              return;
            }
          }else{
            if(pkg.AR.isVisible && (!(pkg.AREdtControles.checkARNum(mod.exp.gE('AR.Body.CodigoBarrasAR#PARNNumero').innerHTML)))){
              pkg.DocEditorCore.proceedFinish = false; 
              event.stopPropagation();
              pkg.ModalDialog.ok('Você deve registrar um número ao AR.', 'AR j2 - Atenção');
            }
          }
        });
        
        var cb = function(event, closer){
          if(pkg.AR.version === '7.0')
            return;
          if(pkg.AR.isVisible && j2.env.modId.unidade.config.listaPostagem.enabled){
            pkg.DocEditorCore.proceedFinish = false; 
            pkg.ModalDialog.okCancel('Você deseja imprimir a listagem de postagem a após fechar o editor?', 
              'AR j2 - Info', 
              'AR.onConfirmPrintPostList;beforeFinishEdition.postConfirmation', 'AR.onNotConfirmPrintPostList;beforeFinishEdition.postConfirmation');
          }
        };
        evBus.on('beforeFihishEdition', cb);
        evBus.once('AR.onConfirmPrintPostList', function(event){ 
          evBus.off('beforeFihishEdition',cb);
          evBus.once('DocEditorCore.afterCloseEditor', function(){
            pkg.AR.printPostList();
          });
        });    
        evBus.once('AR.onNotConfirmPrintPostList', function(event){ 
          evBus.off('beforeFihishEdition',cb);
        });   
                
        evBus.once('loaded-'+j2.res.mod.ARDef.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.mod.ARDef.lib);
          if(!(xml))
						xml = window.j2.mod._._xmlDecode( j2.res.mod.ARDef.xmlEncode.load );
					
					j2.env.xmls.AR = xml;
          console.log('parsing window.j2.env.xmls.ARDef');
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              j2.env.xmls.AR = definitions;

            if (err){
              j2.err('err get defintions from XML - AR Classes Definitions (ARDefs)');
              j2.err(err);
            }
            
            /* reload */
            j2.mod.builder.agregateClassDefs();
            j2.mod.com.libLoader(j2.res.mod.AR_);
          });
        });      

        evBus.once('loaded-'+j2.res.mod.AR_.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.mod.AR_.lib);         
					if(!(xml))
						xml = window.j2.mod._._xmlDecode( j2.res.mod.AR_.xmlEncode.load );					
					
          pkg.AR.modeloDef = xml; 
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              pkg.AR.modeloDef = definitions;

            if (err){
              j2.err('err get defintions from XML - AR Modelo');
              j2.err(err);
            }

            evBus.fire('AR.afterParseArDef');
          });
        });     
        
        evBus.once('AR.afterParseArDef', function(event){
          pkg.AR.prepareAR(args, el);
        });
      },
      ARElements : {
        edtContr : document.createElement('div')
      },
      postList : {
        ARNum : '',
        procNum : '',
        desc : '',
        serv : '',
        usuarioId : _usId(), // PL
        unidadeId : _unId() //pl
      },
      registeredPostList : (function(){
        var listStored = localStorage.getItem('pkg.AR.registeredPostList');
        if(listStored)
          return JSON.parse(listStored);
        
        //if not create right now        
        localStorage.setItem('pkg.AR.registeredPostList', JSON.stringify(
          []
        ));
        return JSON.parse(localStorage.getItem('pkg.AR.registeredPostList'));
      })(),
      verifyRegister : function(arNum){
        var f = false;
        forEach(pkg.AR.registeredPostList, function(pd){
          if(pd.ARNum === arNum)
            f = true;
        });
        
        return f;
      },
      removeARNum : function(arNum){ // pl as new        
        pkg.AR.registeredPostList = pkg.AR.registeredPostList.filter(function(value, index, arr){
          return value.ARNum !== arNum;
        });
      },
      renderAR7Body : function(el, elCtxt){ //ard as new
                
        var ARVersion = pkg.AR.getVersion('7.0-body');
        
        var _exp = $(elCtxt.exp).find('#ARDigitalBody-bodyDiv');
        _exp.empty();
        _exp = _exp[0];
            
        j2.mod.builder.build(ARVersion, 'AR', { exp : _exp, edt : document.createElement('div') } );
        
        
        /*if(contentIterator){
          forEach(contentIterator.eventName, function(ev){
            evBus.on(ev, function(event, a, b){
              pkg.AR.updateContent(contentIterator, container);
            });
          });
          pkg.AR.updateContent( contentIterator, container);
        }*/
        
        //sro query
        evBus.fire('AR.afterRenderAR7Body', _exp); //arq
      }
    };
    
    pkg.ARBodyIdentificationsProcessoQualificacao = {
      constructor_ : function(args, el){
        var img = mod.exp.gE('AR.Body.Identifications.ProcessoQualificacao#codPorcNumImg');
        if(img){
//          var src = 'https://www.barcodesinc.com/generator_files/image.php?code=' 
//                  + j2.env.PJeVars.processo.meanNum()
//                  + '&style=68&type=C128B&width=310&height=30&xres=1&font=3';
          var src = 'https://products.aspose.app/barcode/embed/image.Png?BarcodeType=Code128&Content=' 
                  + j2.env.PJeVars.processo.meanNum()
                  + '&Height=30&Width=265&TextLocation=none';
          img.setAttribute('src', src);
        }
      }
    };
    
    pkg.AREdtControles = {
      constructor_ : function(args, el){
        var _ = {
          uuid : window.j2.mod._._guid(),
          
          PLP : $(el.edt).find('#AR-EdtControles-PLP')[0], // ard,
          dataPostagem : $(el.edt).find('#AR-EdtControles-dataPostagem')[0], // ard,
          num : $(el.edt).find('#AR.EdtControles#Numero'.jQId())[0],
          tipo : $(el.edt).find('#AR.EdtControles#EtiquetaTipo'.jQId())[0],
          action : $(el.edt).find('#AR.EdtControles#Action'.jQId())[0],
          MP : { 
            divCont : $(el.edt).find('#AR-EdtControles-maoPropria')[0],
            cmd : $(el.edt).find('#AR-EdtControles-maoPropria-inputCheck')[0],
            expText : $(el.exp).find('#AR-Header-MP')[0]
          },
          etq : {
            p : $(el.exp).find('#AR.Body.CodigoBarrasAR#PARN'.jQId())[0],
            sedexLabel : $(el.exp).find('#AR.Body.CodigoBarrasAR#PARNSedex'.jQId())[0],
            numeroLabel : $(el.exp).find('#AR.Body.CodigoBarrasAR#PARNNumero'.jQId())[0],
            body : $(el.exp).find('#AR.Body.CodigoBarrasAR'.jQId())[0],
            barCode : $(el.exp).find('#AR.Body.CodigoBarrasAR#PARN.BarCode'.jQId())[0]
          },
          form : $(el.exp).find('#AR.Body.CodigoBarrasAR#QueryForm'.jQId())[0],
          TAObjetos : $(el.exp).find('#objetos')[0],
          chancela : $(el.exp).find('#AR.Hedaer@Chancela'.jQId())[0],
          numLabelFooter : $(el.exp).find('#ar.footer.arNumero'.jQId())[0],
          isSedex : function() {
            return this.tipo.value === 'AR.EdtControles#EtiquetaTipo.SEDEX';
          },
          arNum : function() {
            return this.num.value.toUpperCase();
          },
          manualEndereco : {
            divCont : $(el.edt).find('#AR-EdtControles-enderecoManual')[0],
            cmd : $(el.edt).find('#AR-EdtControles-enderecoManual-textarea')[0],
            textExp : $(el.exp).find('#AR.Body.DestRemPlus.Right#ParteVinculadaAoExpediente'.jQId())[0]
          }
        };
        
        _.num.onchange = function (event) {
          if(!(pkg.AREdtControles.checkARNum(_.num.value)))
            j2.mod._.styleSetter(_.num, 'fieldError');
          else
            j2.mod._.styleSetter(_.num, 'fieldError', true);
        };
        _.action.onclick = function (event) {
          if(pkg.AREdtControles.checkARNum(_.num.value))
            pkg.ModalDialog.okCancel('Confirmo ser válido o número de etiqueta de AR digitado referente ao serviço ' + ((_.isSedex()) ? 'SEDEX' : 'Carta') + ' dos correios',
                                     'Modelos j2 - Confrimação de Etiqueta de AR', 'AREdtControles.afterConfirmARNumber', 'AREdtControles.onNotConfirmARNumber');
        };
        _.MP.cmd.onchange = function(event){
          if(args.isAR7 && args.isAR7 === 'true'){ // ard as new
            pkg.AR.vars.MP = ( _.MP.cmd.value ) ? 'unset' : 'none';
            pkg.AR.renderAR7Body(_, el);
          }
          else
            j2.mod._.styleSetter(_.MP.expText, 'Hidden', _.MP.cmd.checked); // ard
        };
        /*
         * manualEndereço disponivel apenas versão 4.1
         */
        if(_.manualEndereco.cmd) 
          _.manualEndereco.cmd.onchange = function(event){
            if(args.isAR7 && args.isAR7 === 'true'){ //ard as new
              pkg.AR.vars.destinatario.endPJe = _.manualEndereco.cmd.value;
              pkg.AR.renderAR7Body(_, el);
            }
            else
              _.manualEndereco.textExp.innerHTML = _.manualEndereco.cmd.value; // ard
          };
        
        if(!(j2.env.modId.id.match(/j2Citatcao|j2Citacao/)))
          j2.mod._.styleSetter(_.MP.divCont, 'Hidden', false);
        
        /*** 7.0 controls ***/ // ard as new
        if(args.isAR7 && args.isAR7 === 'true') { // ard as new
          _.PLP.onchange = function(event){
              pkg.AR.vars.PLP  = _.PLP.value;
              pkg.AR.cookies.set('PLP', _.PLP.value.toString()) // newCook
              //cookies.set('pkg.AR.vars.PLP', _.PLP.value.toString(), {expires: __COOKIES_EXPIRE_TIME___ });
              pkg.AR.renderAR7Body(_, el);
          };
          
          _.dataPostagem.onchange = function(event){              
              pkg.AR.vars.dataPostagem  = _.dataPostagem.value;
              pkg.AR.cookies.set('dataPostagem', _.dataPostagem.value.toString())
              //cookies.set('pkg.AR.vars.dataPostagem', _.dataPostagem.value.toString(),  {expires: __COOKIES_EXPIRE_TIME___ });
              pkg.AR.renderAR7Body(_, el);
          };
          
          _.PLP.value = (function(){
              //var _ = cookies.get('pkg.AR.vars.PLP');
              var _ = pkg.AR.cookies.get('PLP');
              return _ ? _ : '';
          })();
            
          _.dataPostagem.value = (function(){
              //var _ = cookies.get('pkg.AR.vars.dataPostagem');
              var _ = pkg.AR.cookies.get('dataPostagem');
              return _ ? _ : null;
          })();  
        }
        
        pkg.AREdtControles.setEvents(args, _, el);
      },
      setEvents : function(args, el, elCtxt){
        evBus.on('AREdtControles.afterConfirmARNumber', function(event, sysEvent){ 
          if(args.isAR7 && args.isAR7 === 'true'){ // ard as new
            pkg.AREdtControles.stampARNum7(el, sysEvent, null, elCtxt);
          }
          else // ard
            pkg.AREdtControles.stampARNum(el, sysEvent, null, elCtxt);
        }); 
        
        evBus.on('AREdtControles.onNotConfirmARNumber', function(event, sysEvent){ 
          if(args.isAR7 && args.isAR7 === 'true')
            pkg.AR.renderAR7Body(el, elCtxt);
        }); 
        
        evBus.on('beforeFihishEdition', 10000, function(event, closer){     // ard as new     
           if(args.isAR7 && args.isAR7 === 'true')
            pkg.AR.renderAR7Body(el, elCtxt);
        });
        
        evBus.on('AR.afterRenderAR7Body', function(ev, _expBody){ //arq as new
          jQ3('img[j2e_sro_query]', _expBody).each(function(){
            var img = jQ3(this);
            img.attr('onclick', "(" + pkg.AREdtControles.sroQuery7 + ")('" + el.arNum() + "', event)");
          });
        }); 
      },
      stampARNum7 : function(arEls, ev, checkArNum, elCtxt){ // ard as new
        if(pkg.AR.verifyRegister(arEls.arNum()) && !(checkArNum)){
          if(ev.shiftKey){
            evBus.once('AREdtControles.repeatARNum.Cancel.' + arEls.uuid, function(event){ 
              arEls.num.value = '';
              evBus.off('AREdtControles.repeatARNum.Ok.' + arEls.uuid);
            });    
            
            evBus.once('AREdtControles.repeatARNum.Ok.' + arEls.uuid, function(event){ 
              evBus.off('AREdtControles.repeatARNum.Cancel.' + arEls.uuid);
              pkg.AR.removeARNum(arEls.arNum()); 
              pkg.AREdtControles.stampARNum7(arEls, event, true, elCtxt); 
            });     
            
            pkg.ModalDialog.okCancel('Esta etiqueta já foi utilizada. Repetir mesmo assim? (' + arEls.arNum() + ')',
                               'AR j2 - Aviso', 
                               'AREdtControles.repeatARNum.Ok.' + arEls.uuid, 'AREdtControles.repeatARNum.Cancel.' + arEls.uuid);
            
            return;
          }else{
            pkg.ModalDialog.ok('Você já registrou anteriormente para outro processo a etiqueta ' + arEls.arNum(),
                               'AR j2 - Aviso');
            arEls.num.value = '';
            return;
          }
        }
        
        pkg.AR.vars.AR = arEls.num.value.substr(0,11) + "BR";
        pkg.AR.vars.AR_AA = arEls.num.value.substr(0,11) + "AA"; 
        pkg.AR.postList.ARNum = arEls.num.value; 
        
        pkg.AR.renderAR7Body(arEls, elCtxt);
        
      },
      stampARNum : function(arEls, ev, checkArNum){
        if(pkg.AR.verifyRegister(arEls.arNum()) && !(checkArNum)){
          if(ev.shiftKey){
            evBus.once('AREdtControles.repeatARNum.Cancel', function(event){ 
              arEls.num.value = '';
              evBus.off('AREdtControles.repeatARNum.Ok');
            });    
            
            evBus.once('AREdtControles.repeatARNum.Ok', function(event){ 
              evBus.off('AREdtControles.repeatARNum.Cancel');
              pkg.AR.removeARNum(arEls.arNum()); // pl
              pkg.AREdtControles.stampARNum(arEls, event, true, elCtxt); // pl
            });     
            
            pkg.ModalDialog.okCancel('Esta etiqueta já foi utilizada. Repetir mesmo assim? (' + arEls.arNum() + ')',
                               'AR j2 - Aviso', 
                               'AREdtControles.repeatARNum.Ok', 'AREdtControles.repeatARNum.Cancel');
            
            return;
          }else{
            pkg.ModalDialog.ok('Você já registrou anteriormente para outro processo a etiqueta ' + arEls.arNum(),
                               'AR j2 - Aviso');
            arEls.num.value = '';
            return;
          }
        }
        
        if(arEls.isSedex()){
          j2.mod._.styleSetter(arEls.etq.sedexLabel, 'Hidden', true);
          j2.mod._.styleSetter(arEls.chancela, 'AR.Hedaer@Chancela-SEDEXAjustPos');
          j2.mod._.styleSetter(arEls.etq.p, 'AR.Body.CodigoBarrasAR#PARN-SedexPos');
          arEls.chancela.src = pkg.AREdtControles.chancelas.SEDEX;
        }else{
          j2.mod._.styleSetter(arEls.etq.sedexLabel, 'Hidden');
          j2.mod._.styleSetter(arEls.chancela, 'AR.Hedaer@Chancela-SEDEXAjustPos', true);
          j2.mod._.styleSetter(arEls.etq.p, 'AR.Body.CodigoBarrasAR#PARN-NonSedexPos');
          arEls.chancela.src = pkg.AREdtControles.chancelas.carta;
        }
        
        j2.mod._.styleSetter( mod.edt.gE('AR.EdtControles#Action-Stamp'), 'Hidden');
        j2.mod._.styleSetter( mod.edt.gE('AR.EdtControles#Action-Refresh'), 'Hidden', true);
                
        j2.mod._.styleSetter(arEls.etq.barCode, 'Hidden', true);
        arEls.etq.numeroLabel.innerHTML = arEls.arNum();
        arEls.numLabelFooter.innerHTML = arEls.arNum();
        
        //arEls.form.target = 'sroQuery' + arEls.arNum();
        arEls.form.target = '_self';
        arEls.TAObjetos.textContent = arEls.arNum();
        //arEls.etq.barCode.src = 'http://www.barcodesinc.com/generator/image.php?code='+ arEls.arNum() +'&style=68&type=C128A&width=414&height=70&xres=2&font=5';
        //arEls.etq.barCode.src = 'https://www.invertexto.com/image.php?scale=2&rotation=0&font=none&font_size=11&text='+ arEls.arNum() +'&thickness=25&code=code128';
        arEls.etq.barCode.src = 'https://products.aspose.app/barcode/embed/image.Png?BarcodeType=Code128&Content='+ arEls.arNum() +'&Height=65&Width=325&TextLocation=none';
        arEls.etq.p.setAttribute('onclick', "(" + pkg.AREdtControles.sroQuery + ")('" + arEls.arNum() + "')");
        
        pkg.AR.postList.ARNum = arEls.arNum();
        pkg.AR.postList.serv = (arEls.isSedex()) ? 'SEDEX' : 'CARTA';
      },
      checkARNum : function(NumE){
        
        var prefixo = NumE.substring(0, 2);
        var numero = NumE.substring(2, 10);
        var sufixo = NumE.substring(11);
        var chkdv = NumE.substring(10,11);
        var multiplicadores = [8, 6, 4, 2, 3, 5, 9, 7];
        var soma = 0;
        var iv = 0;
        var arRegExp = new RegExp("[a-zA-Z]{2}[0-9]{9}[a-zA-Z]{2}");
        var dv;

        if(!(arRegExp.test(NumE)))
        {
          return false;
        }

        var i=0;
        for(i=0; i<8; i++)
        {
           iv = parseInt(numero.substring(i, (i+1)));
           soma += iv * multiplicadores[i]; 
        }

        var resto = soma % 11;
        if(resto === 0){
          dv = '5';
        }else if(resto === 1){
           dv = '0';
        }else{
               var rst = 11 - resto;
               dv = rst.toString();
             }

        if( dv !== chkdv )
          return false;
        else
          return true;
      },
      chancelas : {
        carta : 'data:image/png;base64,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',
        SEDEX : 'data:image/png;base64,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'
      },
      sroQuery : function(numAr){
        var myWindow=window.open('', 'sroQuery' + numAr, 'width=550, height=630, scrollbars=1');
        myWindow.focus();
        var clnForm = document.getElementById('AR.Body.CodigoBarrasAR#QueryForm').cloneNode(true);
        myWindow.document.body.appendChild(clnForm );
        clnForm .submit();
      },
      sroQuery7 : function(numAr, event){ // arq as new
        
        var myWindow2=window.open('', 'sroQueryCorreios' + numAr, 'width=550, height=630, scrollbars=1');
        myWindow2.focus();
        var clnForm = document.getElementById('AR.Body.CodigoBarrasAR#QueryForm').cloneNode(true);
        myWindow2.document.body.appendChild(clnForm );
        clnForm .submit();
        
        var myWindow=window.open('https://www.17track.net/?nums=' + numAr + '&fc=2151', 'sroQueryTrack' + numAr, 'width=550, height=630, scrollbars=1');
        myWindow.focus();
      }
    };
    
    pkg.ARBodyDestRemPlusLeft = {
      constructor_ : function(args, el){
        if(!j2.env.modId.unidade.config.enderecoManual.edificacaoENominada)          
            mod.exp.gE('forumLB').remove();
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.AR.lib, function(ev, args, el){
      pkg.AR.constructor_(args, el);
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.AR.lib;
  alert(t);
  console.error(t);

}


