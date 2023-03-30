/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log('postList.js - módulo compilante');

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
    var filter = new window.j2.mod._._90; //pl
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    //var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    
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
    
    pkg.postList = {
      constructor_ : function(args, el){        
        pkg.postList.setEvents();
        j2.mod.com.libLoader(j2.res.mod.postListDef);
      },
      append : function(container){
        var postListVersion = pkg.postList.modeloDef.modelos[0].versao[0];
        if(pkg.postList.modeloDef.modelos[0].classStyles)
          postListVersion.classStyles = pkg.postList.modeloDef.modelos[0].classStyles;
        
        j2.mod.builder.build(postListVersion, 'postList', container );
      },
      preparePostList : function(args, el){        
        /* creating event listener*/
        evBus.fire('postList.onLoadLibs');
      },
      buildPostList : null,
      buildObjectsREgister : function(j2Win){ // pl
        if(!(pkg.AR.registeredPostList.length)){
          evBus.fire('postList.onAbortDueToEmptyList');
          return;
        }
        
        var refTr = (mod.sup.printPostList || j2Win).gE('postList#referenceLineBuild'); // pl
        var curTr; 
        var _ = false;
        var i = 1;
        var buildPostList = pkg.postList.buildPostList = pkg.AR.registeredPostList; // pl
        
        if(pkg.postList.initialFilter){ // pl as new
          var _a = filter(buildPostList, {usuarioId : pkg.postList.initialFilter.usuarioId, unidadeId : pkg.postList.initialFilter.unidadeId });          
          buildPostList = pkg.postList.buildPostList = (_a.length) ? _a :  buildPostList;
        }
        
        while($(refTr).next().length) //pl as new
          $(refTr).next().remove();
        
        forEach(buildPostList, function(obj){ // pl 
          if(!(obj.ARNum))
            return;
          
          if(_){            
            if (curTr.nextElementSibling)
              curTr = curTr.nextElementSibling;
            else{
              curTr = refTr.cloneNode(true);
              refTr.parentElement.appendChild(curTr);
            }
            curTr.id += ++i;
            
            pkg.postList.writeLine(curTr, obj, i, refTr);
          }
          else{
            pkg.postList.writeLine(refTr, obj, null, refTr);
            curTr = refTr.nextSibling;
            _ = true;
          }
        });
        
        evBus.fire('postList.afterPreparePostList');
      },
      writeLine : function(tr, obj, ord, ref){
        var tds = tr.getElementsByTagName('td');
        var reftds = ref.getElementsByTagName('td');
                
        if(ord)
          tds[0].innerHTML = ord;
        
        tds[1].innerHTML = obj.procNum;                    
        tds[2].innerHTML = obj.ARNum;                      
        tds[3].innerHTML = obj.desc; 
        tds[4].innerHTML = j2.env.PJeVars.data.abreviada;  
        tds[5].innerHTML = 'ENVIADA AOS CORREIOS';         
        //tds[5].setAttribute('colspan', '2'); //pl
        
        for(var i = 0; i<=5; i++){
          tds[i].className=reftds[i].className;  
          tds[i].style=reftds[i].style;
        }
        
        tds[3].style.overflow = 'hidden';  // pl
      },
      setEvents : function(args, el){
        evBus.once('loaded-'+j2.res.mod.postListDef.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.mod.postListDef.lib);
          j2.env.xmls.postListDef = xml;
          console.log('parsing window.j2.env.xmls.postListDef');
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              j2.env.xmls.postListDef = definitions;

            if (err){
              j2.err('err get defintions from XML - Post List Classes Definitions (ARDefs)');
              j2.err(err);
            }
            
            /* reload */
            j2.mod.builder.agregateClassDefs();
            j2.mod.com.libLoader(j2.res.mod.postList_);
          });
        });      

        evBus.once('loaded-'+j2.res.mod.postList_.lib, function(event, xml){
          console.log('fired once loaded-'+j2.res.mod.postList_.lib);          
          pkg.postList.modeloDef = xml; 
          
          j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
            if(definitions)
              pkg.postList.modeloDef = definitions;

            if (err){
              j2.err('err get defintions from XML - AR Modelo');
              j2.err(err);
            }

            evBus.fire('postList.afterParsePostListDef');
          });
        });     
        
        evBus.once('postList.afterParsePostListDef', function(event){
          pkg.postList.preparePostList(args, el);
        });
        
        evBus.once('builder.afterBuildModSet.postList', function(event){
          pkg.postList.buildObjectsREgister();
        });
        
        evBus.once('postList.afterPreparePostList', function(event){
          pkg.ModalDialog.okCancel('Você não poderá mais reimprimir o conteúdo desta lista de postagem. Continuar?', 'PostList j2 - Atenção', 
            'postList.onContinuePrintList', 
            'postList.onNotContinuePrintList',
            null,
            {edt : mod.sup.printPostList.doc.body, j2Win : mod.sup.printPostList});
        });
        
        evBus.once('postList.onContinuePrintList', function(event){          
          pkg.AR.registeredPostList = pkg.AR.registeredPostList.filter(function(val, idx, arr){ // pl as new
            var f = false;
            forEach(pkg.postList.buildPostList, function(ob){
              if(!f) 
                f = val.ARNum === ob.ARNum;
            });
            
            return !f;
          });
          localStorage.setItem('pkg.AR.registeredPostList', JSON.stringify(
            pkg.AR.registeredPostList
          ));      
          mod.sup.printPostList.win.print();
        });
        evBus.once('postList.onNotContinuePrintList', function(event){
            pkg.ModalDialog.ok('Você poderá solicitar novamente a impressão de nova lista de postagem após expedir uma nova carta.', 'PostList j2 - Informação', 
            'postList.onReadWarningAboutReprint', 
            null,
            {edt : mod.sup.printPostList.doc.body, j2Win : mod.sup.printPostList});
        });        
        evBus.once('postList.onReadWarningAboutReprint', function(event){
          mod.sup.printPostList.win.close();
        });       
        
        evBus.once('onLoadModeloJ2', function(event, definitiions){
          j2.modelo.edt.win.close();
        });
      },
      registeredPostListListedUsers : function(){ // pl as new
        if( !(pkg.AR) || !(pkg.AR.registeredPostList) )
          return [
            { value : 'empty'},
            { value : '00641805306'}
          ];
        
        var _ar = [{ value : 'empty'}];
        forEach(pkg.AR.registeredPostList, function(obj){
          if( _ar.filter(function(e) { return e.value === obj.usuarioId; }).length === 0 )
            _ar.push({value : obj.usuarioId});
        });
        return _ar;
      }
    };
    
    
    pkg.postListSource = { // pl as new
      constructor_ : function(args, el){
        
        pkg.postListSource.setEvents(args, el);
      },
      setEvents : function(args, el){
        //evBus.fire("afterChange." + _.select.id, _.select.value, _.select, selI, appd.body, _);
        args.externalIterationEvents && ( (args.externalIterationEvents === 'sim') || (args.externalIterationEvents === 'true') ) && 
        evBus.on("afterChange.selectorsignatario", function(event, value, select, selI, appd, _sel){
          pkg.postList.initialFilter = { // pl as new
            usuarioId : value.split('-')[0],
            unidadeId : _unId()
          };
          
          pkg.postList.buildObjectsREgister(mod.exp);
          
          j2.env.PJeVars._.setUsuarioFromUserId( value.split('-')[0] );
          
          
          
          var _modSet = filter(j2.env.modelos, {id : 'postListTableInfoCore'});
          _modSet = (_modSet.length) ? _modSet[0] : null;
          if(!(_modSet)){
            j2.err('postListTableInfoCore modelo set não foi encontrado.');
            return;
          }
          
          var _modSet = filter(_modSet.versao, {id : '3.0'});
          _modSet = (_modSet.length) ? _modSet[0] : null;
          if(!(_modSet)){
            j2.err('postListTableInfoCore modelo set não foi encontrado.');
            return;
          }
          
          var _exp = $(el.exp).find('#postList-mainTableInfo');
          _exp.empty();
          
          j2.mod.builder.build(_modSet, null, { exp : _exp[0] });
        });
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.postList.lib, function(ev, args, el){
      pkg.postList.constructor_(args, el);
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.AR.lib;
  alert(t);
  console.error(t);

}


