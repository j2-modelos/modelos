/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function lg(m){console.log(m);};




function RECOVERY() {   
  var keys = [];
  var fg = false;
  var C_BK_PREFIX = 'rmv_';
  lg('Recovery j2 modelos.');
  lg('Requested localStorage recovery.');


  var i = 0;
  while(localStorage.key(i)){
    var it = localStorage.key(i);
    var it_ = it.substring(4);
    
    if(it.indexOf(C_BK_PREFIX)===0){


      if(!(localStorage.getItem(it_))){
        localStorage.setItem(it_, localStorage.getItem(it));
        lg('recuperado: ' + it_);
      }
      else{
        lg('já armazenado: ' + it_);
      }
    }
    
    i++;
  };

  alert('Recuperaçao completa');
  
}