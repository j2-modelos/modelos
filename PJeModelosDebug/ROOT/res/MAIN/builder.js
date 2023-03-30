/* 
 * ASS: Anônima
 * DOC: 6162486
 * MOD: builder.js
 * 
 * Módulo ds construção de html para modelos
 * 
 * versão 2017.06.02.2
 */

console.log('builder.js - módulo compilante');

try {
  (function () { /* inits autoexec */
    console.log('builder.js - rev 01');
        
          
    var w = window;
    var evBus = window.j2.mod.eventBus.EventBus;
    var forEach = window.j2.mod.forEach;
    var style = null; // boot as new
    var getStyle = function(){ // boot as changed
      return { 
        global : {},
        env    : (window.j2.env.xmls.classStyles.classStyles.style) ? window.j2.env.xmls.classStyles.classStyles.style : {},
        /*env : window.document.styleSheets,*/
        mod    : []
      };
    };
    var pickByArray = new j2.mod._._186;
    var find = new j2.mod._._91;
    var filter = new j2.mod._._90;
    var assign = new j2.mod._._206;
    var isObject = new j2.mod._._201;
    var domify = new j2.mod._._233;
    var j2Conv = window.j2.mod._._j2TagsConverter;
    
    var mod = null; // boot as new
    var getMod = function(){ // boot as changed
      return {
        new : function (e) { return window.document.createElement(e); },
        edt : {
          d : j2.modelo.edt.doc,
          gE : j2.modelo.edt.gE
        },
        exp : { 
          d : j2.modelo.exp.doc,
          gE : j2.modelo.exp.gE
        }
      };
    };
    
    j2.mod.builder = {
      deferConstructings : [], // ndlg
      incIds : {},
      setUnidade : function(){
        style = getStyle(); // boot as new
        mod = getMod(); // boot as new
        
        forEach((j2.env.xmls.unidadesAutoriadas || j2.env.xmls.unidadesAutorizadas).unidades, function(u){ // boot
          if(u.id === j2.env.PJeVars.unidade.id){
            j2.env.modId.unidade = u;
            if(u.config.globalStyle && u.config.globalStyle.style)
              style.global = u.config.globalStyle.style;
          }
        });
        evBus.fire('afterSetUnidade', j2.env.modId.unidade);
      },
      eModAut : function(){
        j2.env.modId.aut = false;
        
        if(!(j2.env.modId.unidade))
          return false;

        forEach(j2.env.modId.unidade.modelosAut.modeloAut, function(modAut){
          if(modAut.id === j2.env.modId.id ){
            j2.env.modId.aut = true;
            j2.env.modId.modAut = modAut;
          }
        });
        
        return (j2.env.modId.modAut)?true:false;
      },
      setContext : function(orgContext, e, scope){
        switch(scope){
          case 'EXP':
            return {
              uuid : orgContext.uuid, // tappac
              load : orgContext.load, // tappac
              exp : orgContext.exp.appendChild(e),
              edt : orgContext.edt,
              edtCore : orgContext.edtCore,
              edtBottom : orgContext.edtBottom,
              j2Win : orgContext.j2Win,
              _ : orgContext._,
              thisContext : orgContext.thisContext,
              par : orgContext.par // pc
            };
            break;
          case 'EDT':
            return {
              uuid : orgContext.uuid, // tappac
              load : orgContext.load, // tappac
              exp : orgContext.exp,
              edt : orgContext.edt.appendChild(e),
              edtCore : orgContext.edtCore,
              edtBottom : orgContext.edtBottom,
              j2Win : orgContext.j2Win,
              _ : orgContext._,
              thisContext : orgContext.thisContext,
              par : orgContext.par // pc
            };            
            break;
          case 'EDT_CORE':
            return {
              uuid : orgContext.uuid, // tappac
              load : orgContext.load, // tappac
              exp : orgContext.exp,
              edt : orgContext.edtCore().appendChild(e),
              edtCore : orgContext.edtCore,
              edtBottom : orgContext.edtBottom,
              j2Win : orgContext.j2Win,
              _ : orgContext._,
              thisContext : orgContext.thisContext,
              par : orgContext.par  // pc
            };       
            break; //pc
          case 'EDT_BOTTOM':
            return {
              uuid : orgContext.uuid, // tappac
              load : orgContext.load, // tappac
              exp : orgContext.exp,
              edt : orgContext.edtBottom().insertBefore(e, orgContext.edtBottom().firstChild),
              edtCore : orgContext.edtCore,
              edtBottom : orgContext.edtBottom,
              j2Win : orgContext.j2Win,
              _ : orgContext._,
              thisContext : orgContext.thisContext,
              par : orgContext.par // pc
            };                 
            break;   
          case 'PAR': // PC AS NEW
            return {
              uuid : orgContext.uuid, // tappac
              load : orgContext.load, // tappac
              exp : orgContext.exp,
              edt : orgContext.edt,
              edtCore : orgContext.edtCore,
              edtBottom : orgContext.edtBottom,
              j2Win : orgContext.j2Win,
              _ : orgContext._,
              thisContext : orgContext.thisContext,
              par : orgContext.par.appendChild(e) 
            };     
          case 'NONE':
            return orgContext = orgContext.appendChild(e);      
        };        
      },
      j2textHTMLParse : function(j2El, ddEl) {
        var ne = domify(j2.mod.builder.parseVars(j2El.data.text));
 
        var partDdEl = j2.mod.builder.setContext(ddEl, ne, j2El.scope );
                
        j2.mod.builder.iterate(j2El.configPart, partDdEl);
      },      
      j2ElementParse : function(j2El, ddEl, addClsStyle) { // ndlg
        var ne = mod.new(j2El.tag);
        var partDdEl;
        
        if(j2El.autoIncrementId){
          if(!(j2.mod.builder.incIds[j2El.autoIncrementId]))
            j2.mod.builder.incIds[j2El.autoIncrementId] = 0;
          
          j2.mod.builder.incIds[j2El.autoIncrementId]++;
        }

        if(j2El.id)   
          ne.setAttribute('id', j2.mod.builder.parseVars(j2El.id));
        
        if(j2El.text){
          var d = domify(j2Conv(j2.mod.builder.parseVars(j2El.text.trim().trimSpaces())));
          if(d)
            ne.appendChild(d);
          else
            ne.textContent = j2.mod.builder.parseVars(j2El.data.text.trim().trimSpaces());
        }
        
        if(j2El.data)
          ne.appendChild(domify(j2Conv(j2.mod.builder.parseVars(j2El.data.text.trim().trimSpaces()))));
        
        if(j2El.class || addClsStyle){ // ndlg
          var _comCls = (j2El.class) ? ( (addClsStyle) ? j2El.class + ' ' + addClsStyle: j2El.class) : addClsStyle; // ndlg
          forEach(_comCls.trim().split(' '), function(clss){ // ndlg
              forEach(j2.mod.builder.getStyleClass(clss).prop, function(prop){
                if(ne.style[prop.name] !== 'undefinied')
                  ne.style[prop.name] = prop.value;
                else
                  j2.log('A propriedade ' + x + ' não pode ser associada às definições de estilo. Classe: ' + clss);
              });
          });
        }
        
        if(j2El.classBS)
          ne.setAttribute('class', j2El.classBS);
        
        if(j2El.onclick)
          ne.setAttribute('onclick', j2El.onclick);
 
        if(j2El.value)
          ne.setAttribute('value', j2El.value);
        
        forEach(j2El.HTMLAttribute, function(attr){
            ne.setAttribute(attr.name, (attr.value) ? j2.mod.builder.parseVars(attr.value) : '');
        });
        /*console.log('ASSERTION: needs build for attributes for j2 class, *');*/
        var partDdEl = j2.mod.builder.setContext(ddEl, ne, j2El.scope );
        
        j2.mod.builder.iterate(j2El.configPart, partDdEl);
      },
      getStyleClass : function(cls){
        /* precedence order 
         * global -> modelo -> elemento
         */
        var _ = [style.global, style.env, style.mod ];
        var s = [];
        var __;
        forEach(_, function(e){
          __ = filter(e, 'id', cls);
          if(__.length)
            s = __;
        });    
        
        return (s.length) ? s[0] : s;
      },
      getModVersaoDefinitions : function(){
        if(!(j2.env.modId.modAut))
          return false;
        
        //forEach(j2.env.xmls.modelos.modelos, function(mod){ //pl
        forEach(j2.env.modelos, function(mod){ // pl
          if(mod.id === j2.env.modId.modAut.id){
            if(mod.classStyles)
              j2.env.modId.modAut.classStyles = mod.classStyles;
            forEach(mod.versao, function(ver){
              if(ver.id === j2.env.modId.modAut.versao)
                j2.env.modId.modAut.configPart = ver.configPart;
            });
          }
        });
        
        return (j2.env.modId.modAut.configPart)?true:false;
      },
      getClassDefs : function(clsImp){
        var cd = filter(j2.env.clsDefs, 'id', clsImp.id);
        if(cd.length){
          cd = cd[0];
          cd = filter(cd.versao, 'id', clsImp.versao)[0] || filter(cd.versao, 'id', 'default')[0];
          if(cd)
            return cd;
          else
            return {};
        }
        else
          return {};
      },
      agregateClassDefs : function(){
        j2.env.clsDefs = [];
        
        forEach( filter(j2.env.xmls,  'id',  'classeDefs'), function(nd){
          forEach(nd.classeDefs, function(def){
            j2.env.clsDefs[j2.env.clsDefs.length] = def;
          });
        });
        
        return true; 
      },
      agregateModelos : function(){ // pl
        j2.env.modelos = [];
        
        forEach( filter(j2.env.xmls,  'id',  'modelos'), function(nd){
          forEach(nd.modelos, function(mod){
            j2.env.modelos[j2.env.modelos.length] = mod;
          });
        });
        
        return true; 
      },
      parseVars : function(text){
        var isString = new window.j2.mod._._203;
        var isFunction = new window.j2.mod._._198;
        var isObject = new window.j2.mod._._201;
        var isNumber = new window.j2.mod._._200;
        var j2SON    = new window.j2.mod._._j2JSON; // ndlg2
        
        while(text.indexOf('#{')!==-1){
          var v = text.split('#{')[1];
          v = v.split('}')[0];
          var vn = v;
          v = v.split('.');
          var _='', r;
          /* index 0 must always be j2 */
          try{
            for(var i = 1; i < v.length; i++){
              _ = (_)? ( (isString(_)) ? _[v[i]]() : _[v[i]] ): j2[v[i]]; //wmg
              _ = isFunction(_) ? _() : _; //wmg
            }     
            r = _;
          }catch(e){
            r = 'ERRO AO PROCESSAR: ' + v.join('.');
          }
          
          r = (isFunction(r)) ? r() : r;
          r = (isNumber(r)) ? r.toString() : r;
          r = (typeof r === 'boolean') ? r.toString() : r;
          r = (isObject(r)) ?  j2SON.stringify(r) : r; // ndlg2
          r = (isString(r)) ? r : 'ERRO AO PROCESSAR: ' + v.join('.') + '(undefinied, empty, null)';
          
          vn = '#{' + vn + '}';
          text = text.replace(vn, (r.length)?r:vn.replace('#', '@'));
        }
        return text.replace('@{', '#{');
      },
      parserClass : function(currPart, ddEl){
        
        var def = j2.mod.builder.getClassDefs(currPart);
        
        if(! def.hasOwnProperty('id') ){
          j2.log('classeDef nao encontrada para para currPart id ' + currPart.id + ' versao ' + currPart.versao);
          return;
        }
        
        if(currPart.$type === 'j2:classe')
          assign(def, {innerContent : currPart.configPart} );
        
        var partDdEl;        
        var part;
        if( currPart.hasOwnProperty('scope') ){
          part = mod.new('div');
          part.id = currPart.id;
        
          partDdEl = j2.mod.builder.setContext(ddEl, part, currPart.scope );
        }else
          partDdEl = ddEl;
        
        /* treate constructor*/
        
        
        j2.mod.builder.iterate(def.configPart, partDdEl);
        
        j2.mod.builder.parseClassConstruction(currPart, partDdEl);
      },
      parseClassConstruction : function(currPart, clsElement){
        var args = {};        
        if(currPart.constructs){
          forEach(currPart.constructs, function(c){
            switch(c.type){
              case 'j2Json':
                args[c.param] = JSON.parse(c.value.split("'").join('"'));
                break;
              default:
                args[c.param] = c.value || c.valueAr;
                break;
            }
            
          });
        }
        if(currPart.bodyInject){
          args.bodyInject = [];
          forEach(currPart.bodyInject, function(c){
            args.bodyInject.push({
              name : c.name,
              artifact : c.artifact,
              scope : c.scope
            });
          });
        }        
        if(currPart.importLib){          
          args.importLib = [];
          forEach(currPart.importLib, function(c){
            args.importLib.push({
              name : c.name,
              artifact : c.artifact,
              scope : c.scope || 'EXP'
            });
          });
        }        
        if(clsElement.j2Win){
          args.j2Win = clsElement.j2Win;
        }
        
        var clssNm = currPart.id.split('.').join('').replace('-','');
        if(w.j2.mod.clsCnstr[clssNm])
          w.j2.mod.clsCnstr[clssNm].constructor_(args, clsElement, currPart); // tappac
        else{ // ndlg as new
          j2.mod.builder.deferConstructings.push({classe: clssNm, args : args, clsElement : clsElement});
        }
      },
      getInnerContent : function(part){
        var p = part; 
        do{
          p = p.$parent;
          if(p.innerContent)
            return p.innerContent;
        }while(p.$parent);
        return [];
      },
      iterate : function(_, ddEl){
        forEach(_, function(part){ /*ddEl doubld elements parent */          
          switch(part.$type){
            case 'j2:classeImp':
            case 'j2:classe':
              if(part.id)
                j2.log('Parsing classe ' + part.id);
              
              if( typeof part.rendered !== 'undefined' ){
                if(j2.mod.builder.parseVars(part.rendered) === 'true')
                  j2.mod.builder.parserClass(part, ddEl);
              }else
                j2.mod.builder.parserClass(part, ddEl);
              
              break;
            case 'j2:elemento':
              if( typeof part.rendered !== 'undefined' ){
                if(j2.mod.builder.parseVars(part.rendered) === 'true')
                  j2.mod.builder.j2ElementParse(part, ddEl);
              }else
                j2.mod.builder.j2ElementParse(part, ddEl);
              
              break;
            case 'j2:textHTML':
              j2.mod.builder.j2textHTMLParse(part, ddEl);
              break;              
            case 'j2:innerContent':
              j2.mod.builder.iterate(j2.mod.builder.getInnerContent(part), ddEl);
              break;
            case 'j2:textHTML':
              break;
            default:
              console.log('config parte de classe def desconhecido: ' + part.$type);
          }
          
         /* if(part.configPart)
            j2.mod.builder.iterate(part.configPart, ddEl);*/
        });
      },
      build : function(modSet, id, context){
        /* copy the classes from modAut */
        if(modSet.classStyles){
          if(!(style.mod))
            style.mod = [];
            
          forEach(modSet.classStyles.style, function(st){
            if(filter(style.mod, {id : st.id}).length === 0)
              style.mod[style.mod.length] = st;
          });
        }
        //style.mod = modSet.classStyles.style;
      
        if(!(context))
          context = {};
        
        var buildContext = {
          uuid : context.uuid || 0, //tappac
          load : context.load || {}, //tappac
          exp : context.exp || mod.exp.d.body,
          edt : context.edt || mod.edt.d.body,
          edtCore : context.edtCore || function(){
            if(!( this._.core) )
              this._.core  = mod.edt.gE('DocEditorInnerCore'); 
            
            return this._.core;
          },
          edtBottom : context.edtBottom || function(){
            if(! (this._.bottom) )
              this._.bottom  = mod.edt.gE('DocEditorInnerBottom'); 
            
            return this._.bottom;
          },
          j2Win : context.j2Win, 
          _ : {
            core : null,
            bottom : null
          },
          par : context.par || (function(){ // pc as new
            if(!(j2.modelo.par.win.jQuery))
              return $('<div>', { id : 'j2ParRow'})[0];
            
            if(j2.modelo.par.win.jQuery('#j2ParRow').length)
              return j2.modelo.par.win.jQuery('#j2ParRow');
            
            var table = j2.modelo.par.win.jQuery('.mceLayout'); 
            var j2ParRow = $('<tr>', { id : 'j2ParRow'});
            var j2Td = $('<td>');
            //table.find('td.mceLast').insertBefore(j2ParRow);
            j2ParRow.insertBefore(table.find('tr.mceLast'));
            j2ParRow.append(j2Td);
            return j2Td[0];
          })()
        };
        
        buildContext.thisContext = buildContext;
        
        j2.mod.builder.iterate( modSet.configPart, buildContext);
        
        if(id)
          evBus.fire('builder.afterBuildModSet.'+id, buildContext);
        
        evBus.fire('onPostConstruct');  
      },
      buildMain : function(){
        j2.mod.builder.build(j2.env.modId.modAut, 'main');
      }
    };
    
    j2.mod._.styleSetter = function (element, classesAsString, trueForRemove){
      forEach(classesAsString.split(' '), function(clss){
        forEach(j2.mod.builder.getStyleClass(clss).prop, function(prop){
          if(element.style[prop.name] !== 'undefinied')            
            element.style[prop.name] = (trueForRemove)? '' : prop.value;
          else
            j2.log('A propriedade ' + x + ' não pode ser associada às definições de estilo. Classe: ' + clss);
        });
      });
    };
    
    var build = j2.mod.builder;
    
    //evBus.once('loaded-'+window.j2.res.MAIN.builder.lib, function(){
    evBus.once('after-load-modeloJ2-app', function(){  // boot
      j2.log('Construcao do modelo iniciada.');
      
      build.setUnidade();
      
      if(!build.eModAut()){
        j2.err('Nao e modelo autorizado para a unidade');
        evBus.fire('onTryLoadModelo');
        return;
      }
      
      /* agregando todas os modelos*/
      if(! build.agregateModelos()){ // pl
        j2.err('Erro na agregação das definições para cada modelo do sistema.');
        evBus.fire('onTryLoadModelo');
      }
      
      if( ! build.getModVersaoDefinitions() ){
        j2.err('A versao requisitada nao existe.');
        evBus.fire('onTryLoadModelo');
        return;        
      }
      
      /* agregando todas as definições de classes em um só lugar*/
      if(! build.agregateClassDefs()){
        j2.err('Erro na agregação das classes.');
        evBus.fire('onTryLoadModelo');
      }
      
      
      
      /* to load aditional libs */
      if(window.j2.env.modId.unidade.config.globalStyle.style)
        style.global = window.j2.env.modId.unidade.config.globalStyle.style;
      
      
      
      evBus.fire('aditionalLibsLoades');
    });     
    
    evBus.once("aditionalLibsLoades", function(){
      build.buildMain();
      j2.log('DEVELOPMENT TO DO');
    });
    
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.MAIN.builder.lib;
  alert(t);
  console.error(t);
}