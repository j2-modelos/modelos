/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("powerbi em j2E");

const ICON_PERSON = /*html*/ `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="" height="24px" width="24px" version="1.1" id="Capa_1" viewBox="0 0 328.5 328.5">
<g>
	<g>
		<polygon points="96.333,150.918 96.333,135.918 55.667,135.918 55.667,95.251 40.667,95.251 40.667,135.918 0,135.918 0,150.918     40.667,150.918 40.667,191.583 55.667,191.583 55.667,150.918   " fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke-width="15" stroke="currentColor"></polygon>
		<path d="M259.383,185.941H145.858c-38.111,0-69.117,31.006-69.117,69.117v39.928H328.5v-39.928    C328.5,216.948,297.494,185.941,259.383,185.941z M313.5,279.987H91.741v-24.928c0-29.84,24.276-54.117,54.117-54.117h113.524    c29.84,0,54.117,24.277,54.117,54.117L313.5,279.987L313.5,279.987z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke-width="15" stroke="currentColor"></path>
		<path d="M202.621,178.84c40.066,0,72.662-32.597,72.662-72.663s-32.596-72.663-72.662-72.663s-72.663,32.596-72.663,72.663    S162.555,178.84,202.621,178.84z M202.621,48.515c31.795,0,57.662,25.867,57.662,57.663s-25.867,57.663-57.662,57.663    c-31.796,0-57.663-25.868-57.663-57.663S170.825,48.515,202.621,48.515z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke-width="15" stroke="currentColor"></path>
	</g>
</g>
</svg>`;

function init() {
  //addStyleSheet("Extensao/main.whatsapp.css", window.document);

  window.j2E.powerbi = {
  };



  j2E.mods.registerNumeroUnicoReplacer({storageWarper: true}/*{containerPai: '#main', limitarSubstituiacoNosSeletores: 'div[role="application"]'}*/);
  (function runTimeConnect() {
    j2E.mods.runTimeConnect();

    j2E.conn._listeners.push(function (message, sender, sendRespose) {
      console.log("Receiving message: ", message);

      switch (message.action) {
        case "requisitarJ2EPJeRestResponse":
        case "pong":
          j2E.conn._responseBus.callTicket(message);
          break;

        default:
          console.warn("Não há tratamento para a mensagem recebida: ", message);
          break;
      }
    });
  })();


  jQ3.initialize(`body`, function () {
    var $this = jQ3(this);
    var $j2PJeIcon = $this.find('[j2-pje]');
    if ($j2PJeIcon.length) return;
  

    (function addIconPJeConversationConversaJ2() {

      injetarEstilo('main.powerbi', /*css*/`
        [j2-numero-unico].j2-segredo-justica{
          color: red !important;
        }
        [j2-numero-unico].j2-visitado{
          color: green !important;
        }

        span[j2-pje] {
          position: absolute;
          top: 10px;
          left: 10px;
          /* padding: 10px 20px; */
          background-color: #0078aa80;
          /* color: white; */
          /* border: none; */
          border-radius: 50%;
          cursor: pointer;
          /* font-size: 16px; */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          height: 40px;
          width: 40px;
        }

        span[j2-pje] svg{
          padding: 8px;
        }
      `)
      
      var $spanIcon = jQ3('<span>');
      $spanIcon
        .append(
          '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" id="Camada_1" x="0px" y="0px" viewBox="0 0 132.6 82.7" style="enable-background:new 0 0 132.6 82.7;" xml:space="preserve"><style type="text/css">	.st0{fill:#FEFFFF;}	.st1{fill:#E9571E;}</style><path class="st0" d="M55.9,28.7c0,11-6.5,21.8-21.4,21.8H19v13.6c0,6-4.8,10.8-10.8,10.8h0H7V11.6C7,9,9.1,6.9,11.6,6.9c0,0,0,0,0,0  h22.9C49.5,6.9,55.9,17.9,55.9,28.7 M43.9,28.7c0-5.3-2.8-11-9.7-11H19v22h14.9C41,39.6,43.9,34.2,43.9,28.7"/><path class="st0" d="M43.9,71L43.9,71c0.5-4.3,4.1-7.6,8.5-7.6l0,0c7,0,9.7-5,9.7-11V18.9c0-6.6,5.4-12,12-12v45.4  c0,12.1-5.8,22.6-21.7,22.6c-2.1-0.1-4.2-0.4-6.3-0.8C44.7,73.8,43.8,72.5,43.9,71"/><path class="st1" d="M127.7,41.7H92.1c1.3,6.5,6.2,9.7,13,9.7c3.6,0.1,7.2-1.1,10.1-3.2c1.7-1.3,4-1.3,5.6,0c2.3,1.8,2.7,5,0.9,7.3  c-0.2,0.3-0.5,0.5-0.7,0.8c-4.7,3.6-10.5,5.6-16.4,5.5c-13.8,0-24.2-9.7-24.2-24.1c0-14.7,11-24,24.1-24S128,22.9,128,37.3  C128,38.8,127.9,40.3,127.7,41.7 M116.6,33.7c-0.7-6.3-5.5-10-11.9-10s-11.1,3-12.5,10H116.6z"/></svg>'
        );
      $spanIcon.attr("j2-menu", "default");
      $spanIcon.attr("j2-pje", "default");
      $spanIcon.attr("title", "Conexão estabelecida com o PJe");
      $spanIcon.hide();
      $this.prepend($spanIcon);

      j2E.conn.sendPing(
        function () {
          $spanIcon.show(500);
        },
        function () {
          $spanIcon.hide(500);
        }
      );
    })();
  });
}


function checkJQuery() {
  // tappac as new
  if (typeof jQ3 !== "undefined" && typeof window.j2E !== "undefined") {
    init();
  } else {
    setTimeout(checkJQuery, 100);
  }
}
checkJQuery();
