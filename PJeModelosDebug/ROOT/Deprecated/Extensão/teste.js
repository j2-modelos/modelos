/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function createDefer(){
  function createBaseDelay(){
    var FUNC_ERROR_TEXT = 'Expected a function';

    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function () { func.apply(undefined, args); }, wait);
    };

    return baseDelay;
  };
  function createRestParam(){
    var FUNC_ERROR_TEXT = 'Expected a function';
    var nativeMax = Math.max;

    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
      return function () {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);

        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, args[0], rest);
          case 2: return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    };

    return restParam;
  };
      var baseDelay = new createBaseDelay,
          restParam = new createRestParam;

      var defer = restParam(function (func, args) {
        return baseDelay(func, 1, args);
      });

      return defer;
};
 
var defer = new createDefer();


/*** mains starts here **/
  
jQuery('div.overflowTarefas:last').observe('childlist', function(record){
    console.log('changed');
    if(record.addedNodes.length)
      defer(function(){
        jQuery(record.addedNodes[0]).find('a')[0].click();
      });
});  

jQuery('form:last').find('input#itNrProcesso').val('0801363-91.2020.8.10.0047')[0].dispatchEvent(new Event('input'));;
jQuery('form:last').find('button.btn.btn-primary').click();





      false && once && false && jQ3.post('/pje/seam/resource/rest/pje-legacy/painelUsuario/tarefas', {
        numeroProcesso : "0800898-14.2022.8.10.0047",
        competencia : "",
        etiquetas : []
      }, function(data, status, xhr){
        console.log(result);
      }, "application/json");
      
      false && (function(){
        var url = "https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/tarefas";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        
        var cookies = '';
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Accept", "text/plain");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("authorization", "Basic MDA2NDE4MDUzMDY6MTIzNDU=");
        xhr.setRequestHeader("x-no-sso", "true");
        xhr.setRequestHeader("x-pje-legacy-app", "pje-tjma-1g");
        xhr.setRequestHeader("x-pje-cookies", document.cookie);
        
        xhr.withCredentials = true;

        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
              console.log(xhr.status);
              console.log(xhr.responseText);
           }};

        var data = JSON.stringify({        numeroProcesso : "0800898-14.2022.8.10.0047",        competencia : "",        etiquetas : []      });

        xhr.send(data);
      })();
      
      once && j2EQueryProcessoByNumUnico("0800898-14.2022.8.10.0047", function(data, status, xhr){
        debugger;
      });
      
      once = false;