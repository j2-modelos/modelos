/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("whatsapp em j2E");

const WHATS_APP_ICON_SVG = /*html*/ `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height: 1em;" fill="#000000"  version="1.1" id="Layer_1" viewBox="0 0 308 308" xml:space="preserve">
<g id="XMLID_468_">
	<path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156   c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687   c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887   c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153   c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348   c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802   c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922   c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0   c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458   C233.168,179.508,230.845,178.393,227.904,176.981z"/>
	<path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716   c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396   c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z    M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188   l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677   c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867   C276.546,215.678,222.799,268.994,156.734,268.994z"/>
</g>
</svg>`;

function init() {
  const $op = (sel) => jQ3(sel, window.opener.document)
  const $opPar = (sel) => jQ3(sel, window.opener.parent.document)

  function ___ObterCloseDocumentoJ2(){
    debugger
    return $op('#j2Exp').clone();
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function __pdfDownloadActionAsync() {
    try {
      const j2ExpC = ___ObterCloseDocumentoJ2()
      let content;
  
      if (!j2ExpC.length) {
        const div = $this.find('.rich-panel-body').clone();
        const div2 = jQ3('<div>');
        div2.append(div.children());
        content = div2;
      } else {
        content = j2ExpC;
      }
  
      const idPF = content
        .text()
        .match(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/)?.[0] || 'Documento';
  
      content
        .find('div')
        .filter(function () {
          return jQ3(this).css('box-shadow').length > 0;
        })
        .css('box-shadow', '');
      content.find('#normalizeFormtas').css('border', '');
  
      /*const idDocumento = jQ3(
        `#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:docExistentesTable\\:tb td.success:nth-child(2)`
      )
        .text()
        .trim();*/

      const idDocumento = `${
        $opPar('[id$=edicaoExpedientePanel_header]')?.text()?.match(/\d+/g)?.at(0) || '000'
      }#${
        crypto.randomUUID().split('-').shift()
      }`

      const tipoDocumento = $op('#expTitle').text().captFirst()

      const nomeDoArquivo = `${idPF} - ${tipoDocumento} - id ${idDocumento}.pdf`
  
      const opt = {
        margin: [0.393701, 0, 0.393701, 0],
        filename: nomeDoArquivo,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };
  
      const pdfBlob = await new Promise((resolve, reject) => {
        const _pdfWin = j2EOpW.corner('', 'FerramentasProcessoBaixarPDF' + guid(), null, { width: 25, height: 25 });
        const _winDoc = _pdfWin.document;
        const _wB = jQ3('body', _winDoc);
        _wB.empty();
        _wB.append(content);
  
        const checkAndGeneratePdf = () => {
          if ((typeof _pdfWin.html2pdf !== 'undefined') && (_winDoc.getElementById('j2Exp'))) {
            _pdfWin
              .html2pdf()
              .set(opt)
              .from(_winDoc.getElementById('j2Exp'))
              .outputPdf('blob')
              .then(
                resolve
              )
              .catch(reject)
              .finally(() => _pdfWin.close());
          } else {
            setTimeout(checkAndGeneratePdf, 50);
          }
        };
  
        setTimeout(checkAndGeneratePdf, 250);
      });
  
      // Convert Blob to Base64 with MIME type
      const base64Pdf = await blobToBase64(pdfBlob);
  
      return {
        data: base64Pdf,
        name: nomeDoArquivo
      };
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw error;
    }
  }

  function __obterOutrosAnexosComunicacao() {
    const idPreparacaoComunicacaoProcessual = $opPar('[id$=edicaoExpedientePanel_header]')?.text()?.match(/\d+/g)?.at(0) || '000'
    const request = {
      j2 : true,
      domain : { 
        from : window.location.origin
      },
      arguments: [idPreparacaoComunicacaoProcessual],
      j2Action : 'main-whatsapp-obter-outros-anexos-comunicacao',
      comment : "Requisitar outros anexos em preparacao pelo whatsappp."
    };

    return new Promise((res, rej)=>{
      if(idPreparacaoComunicacaoProcessual === '000')
        rej({
          erro: 'O idPreparacaoComunicacaoProcessual é inválido',
          error: 'O idPreparacaoComunicacaoProcessual é inválido'
        })

      __sendMessageToServiceWorder(request, async function(resposta, loadStatus, load){
        const { resposta: _resp } = resposta
        if(!_resp)
          rej({
            erro: 'Resposta vazia',
            error: 'Resposta vazia'
          })
        else if(_resp.filter(r => !r.error && !r.response?.error && !r.response?.erro ).length === 0)
          rej({
            erro: 'Nenhma item bem sucedido',
            error: 'Nenhma item bem sucedido',
            resposta: _resp
          })
        else
          res(_resp.filter(r=>r.response).map(r=>r.response))
      })
    })
  }

  async function abrirConversa(telWA, mensagem){ 
    const base64DocPDF = await __pdfDownloadActionAsync()
    let base64DocPDFOutros = undefined
    try {
      base64DocPDFOutros = await __obterOutrosAnexosComunicacao()  
    } catch (error) {
      base64DocPDFOutros = []
    }
    
    const numero = (telWA.startsWith("55") ? telWA : "55" + telWA);
    const request = {
      j2 : true,
      domain : { 
        to : 'https://web.whatsapp.com',
        from : window.location.origin
      },
      fowarded : false,
      action : 'abrirContatoWhatsAppComMensageria',
      arguments :  [numero, mensagem, [base64DocPDF, ...base64DocPDFOutros]],
      comment : "Requisitar abertura de chat para o contato indicado"
    };

    j2E.conn.port.postMessageJ2E(request)
  }

  (function runTimeConnect() {
    j2E.mods.runTimeConnect();

    j2E.conn._listeners.push(function (message, sender, sendRespose) {
      console.log("Receiving message: ", message);

      switch (message.action) {
        case "requisitarJ2EPJeRestResponse":
        case "pong":
          j2E.conn._responseBus.callTicket(message);
          break;
        
        case 'abrirContatoWhatsApp':
          abrirConversa(message.arguments.at(0))
          break;

        default:
          console.warn("Não há tratamento para a mensagem recebida: ", message);
          break;
      }
    });
  })();

  //jQ3.initialize('span[data-testid=menu]', function(){
  jQ3.initialize(`#pessoa-meiosContato-telefone-whatsappConverted span`, function () {
    const $this = jQ3(this);
    const icon = jQ3(/*html*/`<i  style="cursor:pointer;"></i>`)
    icon.append(WHATS_APP_ICON_SVG)

    $this.append( ' | ' );
    $this.append( icon );

    icon.click(($ev)=>{
      const message = document.getElementById('SDLinkedElementwhatsAppMessages')
      abrirConversa($this.attr('j2-d'), message.innerText)
      $ev.stopPropagation()
    })

  });
}

function listenMessages() {
  window.addEventListener("message", function (event) {
    if (!event.origin.startsWith("https://frontend.prd.cnj.cloud")) return;

    var _load = event.data;
    if (!_load.j2) return;

    console.log("message from origin https://frontend.prd.cnj.cloud : ", _load);

    var _act = _load.fowarded ? _load.j2Action : _load;

    switch (_act.action) {
      case "respostaDadosTarefas":
        personalizarTarefa(_load);
        break;
    }
  });
}

listenMessages();

function checkJQuery() {
  // tappac as new
  if (typeof jQ3 !== "undefined" && typeof window.j2E !== "undefined") {
    init();
  } else {
    setTimeout(checkJQuery, 100);
  }
}
checkJQuery();
