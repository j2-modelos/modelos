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
  
  if(j2E.ports.activeDomain[port.name]){
    if(j2E.ports.activeDomain[port.name].isDisconnected === true){
      j2E.ports.activeDomain[port.name] = port;
    }
  }
  else
    j2E.ports.activeDomain[port.name] = port;
  j2E.ports.all.push(port);
  port.guid = guid();
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

