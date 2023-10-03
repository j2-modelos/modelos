/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log('whatsapp em j2E');


function init(){

  /*jQ3.initialize('div.tj-toten', function(){
    var $this = jQ3(this);
    var $button = $this.find('[j2-pje]');
    if($button.length !== 0)
      return;
    

    (function addIconPJeConversationConversaJ2(){
      $button = $this.find('.tj-brand').clone();
      let svg = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" id="Camada_1" x="0px" y="0px" viewBox="0 0 132.6 82.7" style="enable-background:new 0 0 132.6 82.7;" xml:space="preserve"><style type="text/css">	.st0{fill:#FEFFFF;}	.st1{fill:#E9571E;}</style><path class="st0" d="M55.9,28.7c0,11-6.5,21.8-21.4,21.8H19v13.6c0,6-4.8,10.8-10.8,10.8h0H7V11.6C7,9,9.1,6.9,11.6,6.9c0,0,0,0,0,0  h22.9C49.5,6.9,55.9,17.9,55.9,28.7 M43.9,28.7c0-5.3-2.8-11-9.7-11H19v22h14.9C41,39.6,43.9,34.2,43.9,28.7"/><path class="st0" d="M43.9,71L43.9,71c0.5-4.3,4.1-7.6,8.5-7.6l0,0c7,0,9.7-5,9.7-11V18.9c0-6.6,5.4-12,12-12v45.4  c0,12.1-5.8,22.6-21.7,22.6c-2.1-0.1-4.2-0.4-6.3-0.8C44.7,73.8,43.8,72.5,43.9,71"/><path class="st1" d="M127.7,41.7H92.1c1.3,6.5,6.2,9.7,13,9.7c3.6,0.1,7.2-1.1,10.1-3.2c1.7-1.3,4-1.3,5.6,0c2.3,1.8,2.7,5,0.9,7.3  c-0.2,0.3-0.5,0.5-0.7,0.8c-4.7,3.6-10.5,5.6-16.4,5.5c-13.8,0-24.2-9.7-24.2-24.1c0-14.7,11-24,24.1-24S128,22.9,128,37.3  C128,38.8,127.9,40.3,127.7,41.7 M116.6,33.7c-0.7-6.3-5.5-10-11.9-10s-11.1,3-12.5,10H116.6z"/></svg>'
      
      $button.css('background-color', '#0078aa80');
      $button.css({
        backgroundImage : `url( 'data:image/svg+xml,${escape(svg)}' )`,
        borderRadius:'50%'
    })
      $button.attr('j2-menu', 'default');
      $button.attr('j2-pje', 'default');
      //$button.find('> div').attr('title', 'Conexão estabelecida com o PJe');
      $button.attr('title', 'Conexão estabelecida com o PJe');
      //$button.hide();
      $button.insertBefore( $this )
      
      //j2E.conn.sendPing(function(){
      //  $buttonC.show(500);
      //}, function(){
      //  $buttonC.hide(500);
      //});
      
    })();
    
    
  });*/

  function sendToken(){
    function _getToken(){
      let _uc = sessionStorage.getItem('_uc')

      if(_uc)
        return JSON.parse( _uc )

      setTimeout(sendToken, 1000)
      return { token: j2E.env.urlParms._atk }
    }

    chrome.runtime.sendMessage({
      j2Action : 'shareMessage',
      messageName : 'sentinelaToken',
      message : _getToken(),
      validade : new Date().getTime() + 180 * 1000 
    });
  }

  setInterval(sendToken, 30000)
  sendToken();

}

function checkJQuery() { // tappac as new 
  if (typeof jQ3 !== 'undefined' && typeof window.j2E !== 'undefined' ) {
    init();
  }else {
    setTimeout( checkJQuery, 100 );
  }
} 
checkJQuery();