/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('oficio.js - módulo compilante');

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
        
    pkg.Oficio = {
      contructor_ : function(){

        pkg.Oficio.setEvents();
        pkg.Oficio.setMonetaryListeners();
      },
      setEvents : function(){
       
      },
      bindMonetary : {
        items :[
          'ofcItEstornoValores'
        ],
        selector : 'selectorOficioCorpo-Corpo-controls-FinalidadesItens',
        container : mod.edt.gE('modAddtCtrls')
      },
      setMonetaryListeners : function(){        
        evBus.on('afterChange.'+ pkg.Oficio.bindMonetary.selector, function(ev, selVal, sel){
          switch(selVal){
            case 'ofcItEstornoValores':
              if(pkg.monetario)
                  pkg.monetario.createInputSetMonetario('ctrlMonetarioOficio', 
                                'Valor R$', pkg.Oficio.bindMonetary.container, j2.modelo.exp.gE('valor-Oficio'), 'Oficio');
              break;
            default:
              if(j2.modelo.edt.gE('ctrlMonetarioOficio'))
                j2.modelo.edt.gE('ctrlMonetarioOficio').remove();
              break;
          }
        });
          
        evBus.on('afterCreateMonetarioControls.ctrlMonetarioOficio', function(ev){
          evBus.fire('Editor.onResize');
        });
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.oficio.lib, function(){
      pkg.Oficio.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.oficio.lib;
  alert(t);
  console.error(t);

}