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
      case 'shareMessage':
        if(!(j2E.sharedMessages[sender.origin]))
          j2E.sharedMessages[sender.origin] = {}

        //if(!(j2E.sharedMessages[sender.origin][request.messageName]))
        j2E.sharedMessages[sender.origin][request.messageName] = { 
          message : request.message,
          validade : request.validade
        }
        break;
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
        regex: /-0|-1|-2/, 
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
              // Extrai o texto da resposta
              return response.text();
          }
          // Se a resposta não foi bem-sucedida, lança um erro
          throw new Error('Erro ao obter a página: ' + response.status);
        })
    }
  
    function _fetchDocumentosNaoLidos(){
      const postData = new URLSearchParams();
      postData.append('AJAXREQUEST', 'j_id320');
      postData.append('javax.faces.ViewState', `${viewStateId}`);
      postData.append('j_id321', 'j_id321');
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
      postData.append('AJAXREQUEST', 'j_id320');
      postData.append('processoDocumentoNaoLidoForm', 'processoDocumentoNaoLidoForm');
      postData.append('autoScroll', '');
      postData.append('javax.faces.ViewState', `${viewStateId}`);
      postData.append('processoDocumentoNaoLidoForm:processoDocumentoNaoLidoDataTable:j_id374', pagina);
      postData.append('ajaxSingle', 'processoDocumentoNaoLidoForm:processoDocumentoNaoLidoDataTable:j_id374');
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
      let trProcessos = __extrairRegistrosProcessoPaginaHTML(tbodies.at(1))
  
      for(let pagina = 2; pagina <= maxPagina; pagina++)
        await _fetchDocumentosNaoLidosPagina(pagina)
        .then(textPag =>{
          const tbodiesPag = __extrairTabelasTBody(textPag)
          const trProcessosPag = __extrairRegistrosProcessoPaginaHTML(tbodiesPag.at(1))
          
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
