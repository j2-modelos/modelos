/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function lg(m){console.log(m);};


function CLEANING() {   
  lg('Rontina de atualizacao de arquivos armazenados no armazenamento local obsoletos.');
  
  var keys = [];
  var fg = false;
  var C_LIB_PREFIX = 'ROOT';
  
  lg('Requested localStorage cleaning.');
  
  
  var i = 0;
  while(localStorage.key(i)){
    var it = localStorage.key(i);
    if(it.indexOf(C_LIB_PREFIX)===0){
      localStorage.setItem('rmv_'+ it, localStorage.getItem(it));
      
      localStorage.removeItem(it);
      lg('obsoleto: removido ' + it);        
    }
    else
      i++;
  };

  alert('Limpeza completa');
  
}