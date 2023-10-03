/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log('banco-do-brasil em j2E');


function init(){

  addScript('Extensao/j2-external.js')
  

  j2E.mods.registerNumeroUnicoReplacer();

  
  jQ3.initialize('#formularioRD02\\:cpfCgcAutor, #formularioRD02\\:cpfCgcReu, #formularioRD02\\:numeroDeposito', function(){
    var $this = jQ3(this);
   
    $this.on('paste', function(event){
      var e = event.originalEvent
      // Cancela o evento de colar padrão para evitar a inserção do valor completo
      e.preventDefault();

      // Obtém o texto colado
      var pastedText = (e.clipboardData || window.clipboardData).getData('text');

      // Remove todos os caracteres que não são dígitos numéricos
      var digitsOnly = pastedText.replace(/\D/g, '');

      // Define o valor do input com os dígitos numéricos
      $this.val( digitsOnly)
    })

    if(jQ3('#TESTADOR').length)
      return;

    var but = jQ3('<input>', { 
      value : '[EM ABIENTE DE TESTES]', 
      class : 'btn btn-azul',
      id : 'TESTADOR',
      onclick : 'j2.api.actions.visualizarTestador()'
     })
    but.insertAfter( '#formularioRD02' )
  });
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



function checkJQuery() { // tappac as new 
  if (typeof jQ3 !== 'undefined' && typeof window.j2E !== 'undefined' ) {
    init();
  }else {
    setTimeout( checkJQuery, 100 );
  }
} 
checkJQuery();