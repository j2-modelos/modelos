/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log('whatsapp em j2');

function personalizarTarefa(_load){
  alert('Sim');
}

function listenMessages(){
    window.addEventListener('message', function(event){
      if (!(event.origin.startsWith('https://frontend.prd.cnj.cloud'))) 
        return;
    
      var _load = event.data;
      if(!(_load.j2))
        return;

      console.log('message from origin https://frontend.prd.cnj.cloud : ', _load);
      

      var _act = (_load.fowarded) ? _load.j2Action : _load;

      switch(_act.action){
        case 'respostaDadosTarefas':
          personalizarTarefa(_load);
          break;
      }
    
    });
  }
  
  listenMessages();



  
