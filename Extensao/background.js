/*chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
  chrome.action.setBadgeText({ text: badgeText });

  // Listener is registered asynchronously
  // This is NOT guaranteed to work in Manifest V3/service workers! Don't do this!
  chrome.action.onClicked.addListener(handleActionClick);
});

*/

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

chrome.runtime.onConnect.addListener(function(port) {
  console.log('runtime.onConnect.addListener port ', port);
  port.onMessage.addListener(function(request){
    if( j2E.ports.activeDomain[request.domain.to] ){
      console.log('Enviando solicitação para ', request.domain.to, request, j2E.ports.activeDomain[request.domain.to]);
      j2E.ports.activeDomain[request.domain.to].postMessage(request, port);    
    }else{
      port.postMessage({
        comment : "Falha ao enviar a solicitação para " + request.domain.to,
        request : request,
        reason : 'A porta para o domínio requisitado não existe.'
      });
      console.warn("Falha ao enviar a solicitação para " + request.domain.to, ' msg/request:', request);
    }
  });

  const connectInfoExtended = JSON.parse(port.name)
  port.name = connectInfoExtended.nome

  if(j2E.ports.activeDomain[port.name]){
    if(j2E.ports.activeDomain[port.name].isDisconnected === true){
      j2E.ports.activeDomain[port.name] = port;
    }
  }
  else
    j2E.ports.activeDomain[port.name] = port;

  j2E.ports.all.push(port);
  port.guid = guid();
  port.timeStamp = new Date().getTime()
  port.emIframe = connectInfoExtended.emIframe

  port.onDisconnect.addListener(function() {
    port.isDisconnected = true;
    port.discTimeStamp = new Date().getTime();
    
    if(port.guid === j2E.ports.activeDomain[port.name].guid)
      for(var i=0; i < j2E.ports.all.length; i++)
        if(j2E.ports.all[i].name === port.name)
          j2E.ports.activeDomain[port.name] = j2E.ports.all[i];
    
    j2E.ports.removeDisconnectedPorts();      
  });
  
});

/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
  debugger;
  console.log('chrome.runtime.onMessage.addListener request ', request);
  console.log('chrome.runtime.onMessage.addListener sender ', sender);
  console.log('chrome.runtime.onMessage.addListener sendResponse ', sendResponse);
  sendResponse('pong');
});
/*
console.log('background em j2');*/

/*
setInterval(function(){
  console.log('background em j2');
}, 1000);*/


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
  console.log('chrome.tabs.onUpdated', tabId, changeInfo, tab);
  /*if ( changeInfo.status === "complete") {
    console.log(tab.url);
    if (tab.url.indexOf("pje") !== -1) {
      sessionStorage.setItem('pjeTab:id', tabId);
      console.log("enable");
      //chrome.action.enable(tabId);
    }
    else {
      console.log("disable");
      //chrome.action.disable(tabId);
    }
  }*/
});

chrome.windows.onFocusChanged.addListener(function(winId, a, b, c, d) {
  chrome.windows.get(winId)
  .then(win=> { 
    if (win.type !== 'popup')
      return
    const [uniquePopupTabId] = j2E.ports.all.filter(
      p => p.sender.tab.windowId === winId 
    ).map(p=> p.sender.tab.id)

    const activeInfo = {
      windowId: winId,
      tabId: uniquePopupTabId
    }

    _tabsOnActivatedListener(activeInfo)
  })
  .catch(error=>{
    return
  })
})

function _tabsOnActivatedListener(activeInfo) {  
  //se houver mais de uma porta para a tab, apenas a que tiver no topo 
  const [tabPort] = j2E.ports.all.filter( 
    p => p.sender.tab.id === activeInfo.tabId 
      && p.emIframe === false
      && ( typeof p.isDisconnected !== "undefined" ? p.isDisconnected === false : true )
  )
  if(tabPort)
    j2E.ports.activeDomain[tabPort.name] = tabPort
      
}
chrome.tabs.onActivated.addListener(_tabsOnActivatedListener)


self.addEventListener("install", function(event) {
  console.log("j2 service worker installed!");
});

/*
self.addEventListener("fetch", function (event) {
  return;
});*/
/*
chrome.runtime.onMessage.addListener("message", function(a, b, c, d, e, f){
    debugger;
})

/*
importScripts('j2BaseLib.js')
importScripts('lib.js')
*/
/*
chrome.runtime.onInstalled.addListener(() => {
 /* chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });*/
/*});*/


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    /*console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});*/
    if(!(request.j2Action))
      return;

    switch(request.j2Action){
      case 'emitir-evento-todos-frames':{
        const tabId = sender.tab.id; // Obtém o ID da aba de onde a mensagem foi enviada
        
        // Envia para o frame principal
        chrome.tabs.sendMessage(tabId, request, { frameId: 0 });

        // Envia para todos os frames, incluindo iframes
        chrome.webNavigation.getAllFrames({ tabId }, frames => {
            frames.forEach(frame => {
                chrome.tabs.sendMessage(tabId, request, { frameId: frame.frameId });
            });
        });
        break
      }
      case 'shareMessage':
        if(!(j2E.sharedMessages[sender.origin]))
          j2E.sharedMessages[sender.origin] = {}

        //if(!(j2E.sharedMessages[sender.origin][request.messageName]))
        j2E.sharedMessages[sender.origin][request.messageName] = { 
          message : request.message,
          validade : request.validade
        }
        break;
      case 'obter-credenciais-via-background':{
        const [numProc] = request.arguments
        async function fetchProcessoData(numeroProcesso) {
          const baseUrl = "https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy";
        
          try {
            // Primeira fetch: Valida o número do processo e retorna um número
            const validarResponse = await fetch(`${baseUrl}/processos/numero-processo/${numeroProcesso}/validar`);
            if (!validarResponse.ok) {
              throw new Error(`Erro ao validar o processo: ${validarResponse.status}`);
            }
            const idProcesso = await validarResponse.text();
            if (parseInt(idProcesso) === 0)
              return { idProcesso, ca: ''}
        
            // Segunda fetch: Gera a chave de acesso do processo usando o número retornado
            const chaveResponse = await fetch(`${baseUrl}/painelUsuario/gerarChaveAcessoProcesso/${idProcesso}`);
            if (!chaveResponse.ok) {
              throw new Error(`Erro ao gerar a chave de acesso: ${chaveResponse.status}`);
            }
            const ca = await chaveResponse.text();
        
            // Retorna os resultados em um objeto
            return { idProcesso, ca };
          } catch (error) {
            console.error("Erro na fetch:", error);
            throw error;
          }
        }

        fetchProcessoData(numProc)
        .then(credenciais => { 
          sendResponse({ credenciais}) 
        })
        .catch(error => {
          sendResponse({ erro: error.message });
          console.error('Erro ao processar o cálculo:', error);
        })
        return true
      }
      case 'main-whatsapp-obter-outros-anexos-comunicacao':{
        const [idPreparacaoComunicacaoProcessual] = request.arguments
        
        function obterAnexosPrepararComunicacao(idPreparacaoComunicacaoProcessual) {
          return new Promise((resolve, reject) => {
            // Consulta todas as abas abertas
            chrome.tabs.query({}, (tabs) => {
              if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
              }
        
              // Filtra as abas que possuem o parâmetro desejado
              const matchingTabs = tabs.filter((tab) => {
                if (tab.url) {
                  try {
                    const urlParams = new URLSearchParams(new URL(tab.url).search);
                    return urlParams.get('PJeModelos') === idPreparacaoComunicacaoProcessual;
                  } catch (e) {
                    console.warn(`URL inválida para a aba ${tab.id}: ${tab.url}`);
                    return false;
                  }
                }
                return false;
              });
        
              // Cria um array de promessas para enviar mensagens e aguardar respostas
              const promises = matchingTabs.map((tab) =>
                new Promise((resolve) => {
                  chrome.tabs.sendMessage(
                    tab.id,
                    { 
                      j2: true, 
                      action: 'obterAnexoParaEnvioWhatsApp',
                    },
                    (response) => {
                      if (chrome.runtime.lastError) {
                        console.warn(`Erro ao enviar mensagem para a aba ${tab.id}:`, chrome.runtime.lastError.message);
                        return resolve({ tabId: tab.id, response: null, error: chrome.runtime.lastError.message });
                      }
                      resolve({ tabId: tab.id, response });
                    }
                  );
                })
              );
        
              // Aguarda todas as promessas
              Promise.all(promises)
                .then((results) => resolve(results))
                .catch((error) => reject(error));
            });
          });
        }

        obterAnexosPrepararComunicacao(idPreparacaoComunicacaoProcessual)
        .then(resposta => { 
          sendResponse({ resposta }) 
        })
        .catch(error => {
          sendResponse({ erro: error.message });
          console.error('Erro ao obter anexos documento.', error);
        })
        return true
      }
      case 'getSharedMessage':
          if(!(j2E.sharedMessages[request.from])){
            sendResponse({
              j2Action: 'MessagemCompartilhadaInexistente',
              j2: true
            })
            break;
          }

          let smg = j2E.sharedMessages[request.from][request.messageName] || { noMessage: true }
  
          if(smg.noMessage){
            sendResponse({
              j2Action: 'MessagemCompartilhadaInexistente',
              j2: true
            })
            break;
          }

          sendResponse({
            j2Action: 'getSharedMessageResponse',
            j2: true,
            response : smg,
            callerAction: request
          })
          break;
      case 'load-artifact':{
        const tabId = sender.tab.id; // Obtém o ID da aba de onde a mensagem foi enviada
        const frameId = sender.frameId; // Obtém o ID da aba de onde a mensagem foi enviada
        const { srcIdPath, artType, artLib } = request

        switch(artType){
          case 'j2/xml':
            fetch(chrome.runtime.getURL(srcIdPath))
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro ao buscar o XML');
              }
              return response.text();
            })
            .then(xmlString => {
              chrome.scripting.executeScript({
                target: { tabId: tabId, frameIds: [frameId] }, // IDs da aba e do frame
                func: (xml, srcIdPath, artType, artLib) => { 
                  window.j2.mod.eventBus.EventBus.fire('loaded-'+artLib, xml );

                  console.log(`XML carregado via background: ${xml} ${srcIdPath} ${artType} ${artLib}`);
                },
                args: [xmlString, srcIdPath, artType, artLib], // Passa o script como argumento para a função
                world: 'MAIN' // Injeta no contexto principal da página
              }, () => {
                console.log('XML carregado para frame específico da aba.');
              });
            })
            .catch(error => {
              console.error('Erro:', error);
            });
            break
          case 'j2/javascript':
            chrome.scripting.executeScript({
              target: { tabId: tabId, frameIds: [frameId] }, // IDs da aba e do frame
              files: [srcIdPath], // O arquivo de script que será injetado,
              world: 'MAIN'
            }, () => {
              console.log('Script injetado no frame específico da aba.');
            });
  
            chrome.scripting.executeScript({
              target: { tabId: tabId, frameIds: [frameId] }, // IDs da aba e do frame
              func: (srcIdPath) => { 
                const scriptTag = document.createElement('pseudoscript');
                scriptTag.id = `${srcIdPath}`;
                document.head.appendChild(scriptTag); // Adiciona o script ao <head>
                console.log(`Script adicionado no head: ${srcIdPath}`);
              },
              args: [srcIdPath], // Passa o script como argumento para a função
              world: 'MAIN' // Injeta no contexto principal da página
            }, () => {
              console.log('Script injetado inline no frame específico da aba.');
            });
            break
        }
        break
      }
    }
  }
);

(function initializeJ2Eiteration(){
  self.j2E = {
    ports : {
      activeDomain : {},
      all : [],
      removeDisconnectedPorts : function(){
        for(var i=0; i < j2E.ports.all.length; )
          if(j2E.ports.all[i].isDisconnected && ( (new Date().getTime() - j2E.ports.all[i].discTimeStamp) > (1000 * 60 * 3) ) )//3min
            delete j2E.ports.all.splice(i, 1);
          else
            i++;
      }
    },
    sharedMessages:{

    }
  };
  
  setInterval(j2E.ports.removeDisconnectedPorts, 60000);
  
})(); 

(function criarAutoEtiquetarDocumentosNaoLidos(){
  function fetchingAgrupadores(){
    
    const urlAgrupadores = 'https://pje.tjma.jus.br/pje/Painel/painel_usuario/include/agrupadorPje2.seam'
    let viewStateId = 0
  
    async function ___getUserSets(){
      return { 
        regex: /-0|-1|-2|-3|-4|-5|-6|-7|-8|-9/, 
        //regex: /-0|-1|-2/, 
        etiqueta: 'Documento não lido' 
      }
    }
  
    function ___removerDuplicados(array) {
      const uniqueIds = new Set();
      return array.filter(obj => {
        if (!uniqueIds.has(obj.idProcesso)) {
          uniqueIds.add(obj.idProcesso);
          return true;
        }
        return false;
      });
    }
    
    function __extrairTabelasTBody(html) {
      const tbodyRegex = /<tbody\b[^>]*>(.*?)<\/tbody>/gis;
      const tables = [];
      let match;
      
      while (match = tbodyRegex.exec(html)) {
          tables.push(match[0]);
      }
      
      return tables;
    }
    
    function __extrairMaximoPaginas(tbodyHTML){
      const tdRegex = /<td\b[^>]*>(.*?)<\/td>/gis;
      let tdContents = [];
      let match;
  
      while (match = tdRegex.exec(tbodyHTML)) {
          // Acessando o grupo de captura 1 para obter o conteúdo interno da tag <td>
          const tdContent = match[1];
          tdContents.push(tdContent);
      }
      
      tdContents = tdContents.filter(v=> !isNaN(v))
      
      return Math.max(...tdContents)
    }
    
    function __extrairRegistrosProcessoPaginaHTML(tbodyHTML){
      const trRegex = /<tr\b[^>]*>(.*?)<\/tr>/gis;
        let trs = [];
        let match;
    
        while (match = trRegex.exec(tbodyHTML)) {
            // Acessando o grupo de captura 1 para obter o conteúdo interno da tag <td>
            trs.push(match);
        }
          
      return trs
    }
    
    
    function _fetchAgrupadores(){
      return fetch(urlAgrupadores)
        .then(response => {
          // Verifica se a resposta foi bem-sucedida (código 200)
          if (response.ok) {
              if(response.redirected)
                throw new Error('Redirecionado. Usuário não está logado: url:' + response.url);
              // Extrai o texto da resposta
              return response.text();
          }
          // Se a resposta não foi bem-sucedida, lança um erro
          throw new Error('Erro ao obter a página: ' + response.status);
        })
    }
  
    function _fetchDocumentosNaoLidos(){
      const postData = new URLSearchParams();
      postData.append('AJAXREQUEST', 'j_id334');
      postData.append('javax.faces.ViewState', `${viewStateId}`);
      postData.append('j_id335', 'j_id335');
      postData.append('AJAX:EVENTS_COUNT', '1');
      
      // Configurações da solicitação
      const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postData,
      };
      
      
      // Faz a solicitação POST
      return fetch(urlAgrupadores, requestOptions)
      .then(response => {
        // Verifica se a resposta foi bem-sucedida (código 200)
        if (response.ok) {
          // Extrai o texto da resposta
          return response.text();
        }
        // Se a resposta não foi bem-sucedida, lança um erro
        throw new Error('Erro ao obter a página: ' + response.status);
      })
    }
  
    function _fetchDocumentosNaoLidosPagina(pagina){
      const postData = new URLSearchParams();
      postData.append('AJAXREQUEST', 'j_id334');
      postData.append('processoDocumentoNaoLidoForm', 'processoDocumentoNaoLidoForm');
      postData.append('autoScroll', '');
      postData.append('javax.faces.ViewState', `${viewStateId}`);
      postData.append('processoDocumentoNaoLidoForm:processoDocumentoNaoLidoDataTable:j_id388', pagina);
      postData.append('ajaxSingle', 'processoDocumentoNaoLidoForm:processoDocumentoNaoLidoDataTable:j_id388');
      postData.append('AJAX:EVENTS_COUNT', '1');
      
      // Configurações da solicitação
      const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postData,
      };
      
      
      // Faz a solicitação POST
      return fetch(urlAgrupadores, requestOptions)
      .then(response => {
        // Verifica se a resposta foi bem-sucedida (código 200)
        if (response.ok) {
          // Extrai o texto da resposta
          return response.text();
        }
        // Se a resposta não foi bem-sucedida, lança um erro
        throw new Error('Erro ao obter a página: ' + response.status);
      })
    }
  
    function _fetchInserirEtiqueta(processo, etiqueta){
      const data = {
          idProcesso: processo,
          tag: etiqueta
      };
      
      // Configurações da solicitação
      const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
      
      
      // Faz a solicitação POST
      return fetch('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/processoTags/inserir', 
       requestOptions)
      .then(response => {
        // Verifica se a resposta foi bem-sucedida (código 200)
        if (response.ok) {
          // Extrai o texto da resposta
          return response.json()
        }
        // Se a resposta não foi bem-sucedida, lança um erro
        throw new Error('Erro ao obter a página: ' + response.status);
      })
      .catch(error => {
        return ''
      })
    }

    function _fetchRemoverEtiqueta(processo, etiqueta){
      const data = {
          idProcesso: parseInt(processo),
          idTag: parseInt(etiqueta)
      };
      
      // Configurações da solicitação
      const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
      
      
      // Faz a solicitação POST
      return fetch('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/processoTags/remover', 
       requestOptions)
      .then(response => {
        // Verifica se a resposta foi bem-sucedida (código 200)
        if (response.ok) {
          // Extrai o texto da resposta
          return response.json()
        }
        // Se a resposta não foi bem-sucedida, lança um erro
        throw new Error('Erro ao obter a página: ' + response.status);
      })
      .catch(error => {
        return ''
      })
    }

    function _removerEtiquetasDeDispensados(rawData){
      function __obterDadosEtiquetaUsuario(userSets){
        return fetch('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/etiquetas', {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify({ // Converte o payload para uma string JSON
                page: 0,
                maxResults: 30,
                tagsString: userSets.etiqueta
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            return data.entities.at(0)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error); // Lida com os erros
        });
      }


      fetch('https://pje.tjma.jus.br/pje/seam/resource/rest/pje-legacy/painelUsuario/etiquetas/492777/processos')
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(async data => {
          debugger
          const processosComEtiqueta = data.map(proc => proc.idProcesso)
          const processosNosAgrupadores  = rawData.unicosProcessos.map(proc => parseInt(proc.idProcesso))
          const {  userSets } = rawData
          const processosParaRemoverEtiqueta = processosComEtiqueta.filter(processo => !processosNosAgrupadores.includes(processo))
          
          const dadosEtiqueta = await __obterDadosEtiquetaUsuario(userSets)

          for (let i = 0; i < processosParaRemoverEtiqueta.length; i++) {
            const idProc = processosParaRemoverEtiqueta[i];
            await _fetchRemoverEtiqueta(idProc, dadosEtiqueta.id )
          }

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    
    _fetchAgrupadores()
    .then(text => {
      // Processa o texto retornado conforme necessário
      // Por exemplo, você pode convertê-lo em um objeto Documento
      const regex = /<input.*?id="javax\.faces\.ViewState".*?value="(.*?)".*?>/;
      // Procura pela ocorrência da expressão regular no texto HTML
      const match = text.match(regex);
  
      viewStateId = match.at(1)
      
      return _fetchDocumentosNaoLidos()
    })
    .then(text => { return (async () =>{ 
      const tbodies = __extrairTabelasTBody(text)
      const maxPagina = __extrairMaximoPaginas(tbodies.at(0))
      let trProcessos = __extrairRegistrosProcessoPaginaHTML(tbodies.length > 1 ? tbodies.at(1) : tbodies.at(0))
  
      for(let pagina = 2; pagina <= maxPagina; pagina++)
        await _fetchDocumentosNaoLidosPagina(pagina)
        .then(textPag =>{
          const tbodiesPag = __extrairTabelasTBody(textPag)
          const trProcessosPag = __extrairRegistrosProcessoPaginaHTML(tbodiesPag.length > 1 ? tbodiesPag.at(1) : tbodiesPag.at(0))
          
          trProcessos = trProcessos.concat(trProcessosPag)
        })
  
      const trMapIdNum = trProcessos.map(tr => {
        return { 
          idProcesso: /detalheProcessoVisualizacao\.seam\?id=(\d+)/.exec(tr.at(0)).at(1), 
          num: /\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}/.exec(tr.at(0)).at(0) 
        }
      })
  
      // Processa o texto retornado conforme necessário
      console.log("Resposta do POST:", maxPagina, trMapIdNum);
  
      return trMapIdNum
    })()})
    .then(trMapIdNum => { return ( async ()=>{
      console.log('Processos com documentos não lidos: ', trMapIdNum)
      
      const unicosProcessos = ___removerDuplicados(trMapIdNum)
      const userSets = await ___getUserSets()
      const processosUsuarioFiltrado = unicosProcessos.filter(e=>e.num.match(userSets.regex))
      const etiquetasAdicionadas = []
  
      for (let index = 0; index < processosUsuarioFiltrado.length; index++) {
        const processo = processosUsuarioFiltrado[index]
        const respJsonOrText = await _fetchInserirEtiqueta(processo.idProcesso, userSets.etiqueta)
        
        if(typeof respJsonOrText === 'object'){
          etiquetasAdicionadas.push( { respJson: respJsonOrText, ...processo} )
          console.log('Etiqueta adicionada', processo, respJsonOrText)
        }
      }
  
      return { 
        trMapIdNum,
        userSets,
        unicosProcessos,
        processosUsuarioFiltrado,
        etiquetasAdicionadas
      }
    })()})
    .then( obj =>{
      console.log('Outras ações', obj)	
      _removerEtiquetasDeDispensados(obj)
    })
    .catch(error => {
      // Captura e manipula qualquer erro que ocorra durante o processo
      console.error('Erro durante a solicitação:', error);
    })
  }
  
  
  // Cria ou vatualiza o alarme para disparar a cada frequência definida
  chrome.alarms.create('fetchingAgrupadores', { periodInMinutes: 15 });
  
  // Adiciona um ouvinte para tratar o evento do alarme
  chrome.alarms.onAlarm.addListener(alarme => {
      if (alarme.name === 'fetchingAgrupadores') {
          console.log('Disparado alarme fetchingAgrupadores')
          fetchingAgrupadores()
          // Coloque aqui o código que deseja executar periodicamente
      }
  });

  self.debug__fetchingAgrupadores = function(){
    fetchingAgrupadores()
  }
  
})()

;(function (){
  function removerRegistrosExpirados() {
    const agora = Date.now();
  
    chrome.storage.local.get(null, function(items) {
      for (const chave in items) {
        if (items.hasOwnProperty(chave)) {
          const registro = items[chave];
          if (registro.expiration) {
            const expiracao = registro.timestamp + registro.expiration
            if (expiracao < agora) {
              chrome.storage.local.remove(chave);
            }
          }
        }
      }
    });
  }

  // Cria ou vatualiza o alarme para disparar a cada frequência definida
  chrome.alarms.create('removerRegistrosExpirados', { periodInMinutes: 20 });

  // Adiciona um ouvinte para tratar o evento do alarme
  chrome.alarms.onAlarm.addListener(alarme => {
      if (alarme.name === 'removerRegistrosExpirados') {
          console.log('Disparado alarme removerRegistrosExpirados')
          removerRegistrosExpirados()
          // Coloque aqui o código que deseja executar periodicamente
      }
  });
})()


;(function keepBackgroundAlive(){
  ;(function byBugExploit(){
    const keepAlive = () => setInterval(()=>{
      console.log('Keep alive: bug exploit method')
      return chrome.runtime.getPlatformInfo()
    }, 21e3);
    chrome.runtime.onStartup.addListener(keepAlive);
    keepAlive();
  })()

  ;(function byOffscree(){
    async function createOffscreen() {
      await chrome.offscreen.createDocument({
        url: 'Extensao/offscreen/offscreen.html',
        reasons: ['BLOBS'],
        justification: 'keep service worker running',
      })
      .then((a, b, c, d)=>{
        console.log(a, b, c, d)
      })
      .catch((err) => {
        console.log(err)
      });
    }
    chrome.runtime.onStartup.addListener(createOffscreen);
    self.onmessage = e => {}; // keepAlive
    createOffscreen();
  })()
})()



;(function conroladorDeInjecaoNoAboutBlank(){
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url === "about:blank#whatsApp" && changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [
          "Extensao/j2BaseLib.js",
          "Extensao/lib.js",
          "Extensao/jquery3.js",
          "Extensao/jquery.initialize.js",
          "Extensao/jquery.observe.js",
          "Extensao/main.about-blank.js"
        ]
      });
    }
  });
})()


/**
 * Ijetor do whatsappweb
 */
;(function injetorDoWhatsAppWeb(){
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Verifica se a URL foi completamente carregada e é do WhatsApp Web
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("web.whatsapp.com")) {
    console.log("Página do WhatsApp Web carregada:", tab);

    // Injetar o arquivo inject.whatsapp.com na página
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['Extensao/inject.whatsapp.js'],
      world: 'MAIN' 
    });
  }
});})()


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, type, key, value, options } = message;
  const storage = type === 'localStorage' ? chrome.storage.local : chrome.storage.session;

  if (action === 'get') {
      storage.get(key, (result) => {
          sendResponse(result[key] || null);
      });
      return true;
  } else if (action === 'set') {
      const toStore = { [key]: value };
      storage.set(toStore, () => {
          sendResponse({ success: true });
      });
      return true;
  } else if (action === 'remove') {
      storage.remove(key, () => {
          sendResponse({ success: true });
      });
      return true;
  } else if (action === 'clear') {
      storage.clear(() => {
          sendResponse({ success: true });
      });
      return true;
  } else if (action === 'keys') {
      storage.get(null, (items) => {
          const keys = Object.keys(items);
          sendResponse(keys);
      });
      return true;
  }
});

