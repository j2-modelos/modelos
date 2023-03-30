/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log('vc em j2E');


function init(){
  
  j2E.mods.registerNumeroUnicoReplacer();
  (function runTimeConnect(){
  
    j2E.mods.runTimeConnect(); 

    j2E.conn._listeners.push(function(message, sender, sendRespose) {
      console.log('Receiving message: ', message);

      switch(message.action){
        case "requisitarJ2EPJeRestResponse":
        case "pong":
          j2E.conn._responseBus.callTicket(message);
          break;

        default:
          console.warn('Não há tratamento para a mensagem recebida: ', message);
          break;
      }
    });
  })();
  
  jQ3.initialize('#chat-toggle-button', function(){
    var $this = jQ3(this);
    var $button = jQ3('#chat-toggle-button').parents('[role=tabpanel]').prev();
    if($button.is('[j2-menu]'))
      return;
    if($button.length === 0)
      return;
        
    (function addIconPJeConversationConversaJ2(){
      if ($button.parent().children().is('[j2-pje]'))
        return;
      
      var $buttonC = $button.clone();
      $buttonC.empty();
      $buttonC.append('<div style=" background-color: #0078aa80; text-align: center; width: 100%;"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" id="Camada_1" x="0px" y="0px" viewBox="0 0 132.6 82.7" style="enable-background:new 0 0 132.6 82.7;vertical-align: middle;" xml:space="preserve"><style type="text/css">.st0{fill:#FEFFFF;}.st1{fill:#E9571E;}</style><path class="st0" d="M55.9,28.7c0,11-6.5,21.8-21.4,21.8H19v13.6c0,6-4.8,10.8-10.8,10.8h0H7V11.6C7,9,9.1,6.9,11.6,6.9c0,0,0,0,0,0 h22.9C49.5,6.9,55.9,17.9,55.9,28.7 M43.9,28.7c0-5.3-2.8-11-9.7-11H19v22h14.9C41,39.6,43.9,34.2,43.9,28.7"></path><path class="st0" d="M43.9,71L43.9,71c0.5-4.3,4.1-7.6,8.5-7.6l0,0c7,0,9.7-5,9.7-11V18.9c0-6.6,5.4-12,12-12v45.4 c0,12.1-5.8,22.6-21.7,22.6c-2.1-0.1-4.2-0.4-6.3-0.8C44.7,73.8,43.8,72.5,43.9,71"></path><path class="st1" d="M127.7,41.7H92.1c1.3,6.5,6.2,9.7,13,9.7c3.6,0.1,7.2-1.1,10.1-3.2c1.7-1.3,4-1.3,5.6,0c2.3,1.8,2.7,5,0.9,7.3 c-0.2,0.3-0.5,0.5-0.7,0.8c-4.7,3.6-10.5,5.6-16.4,5.5c-13.8,0-24.2-9.7-24.2-24.1c0-14.7,11-24,24.1-24S128,22.9,128,37.3 C128,38.8,127.9,40.3,127.7,41.7 M116.6,33.7c-0.7-6.3-5.5-10-11.9-10s-11.1,3-12.5,10H116.6z"></path></svg></div>');
      $buttonC.attr('j2-menu', 'default');
      $buttonC.attr('j2-pje', 'default');
      $buttonC.attr('title', 'Conexão estabelecida com o PJe');
      $buttonC.css({
        marginBottom : 'unset',
        marginTop : 'unset'
      });
      $buttonC.hide();
      
      $button.parents('[data-test]').prepend($buttonC);
      
      j2E.conn.sendPing(function(){
        $buttonC.show(500);
      }, function(){
        $buttonC.hide(500);
      });
      
    })();
    
    
  });
}
  
function checkJQuery() { // tappac as new 
  if (typeof jQ3 !== 'undefined' /*&& typeof j2ELibRun !== 'undefined'*/ ) {
    init();
  }else {
    setTimeout( checkJQuery, 100 );
  }
} 
checkJQuery();