chrome.runtime.onConnect.addListener(function(port) {
  console.log('runtime.onConnect.addListener port ', port);
  port.onMessage.addListener(function(msg){
    // Handle message however you want
    console.log('port.onMessage.addListener msg ', port);
    debugger;
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
  console.log('chrome.runtime.onMessage.addListener request ', request);
  console.log('chrome.runtime.onMessage.addListener sender ', sender);
  console.log('chrome.runtime.onMessage.addListener sendResponse ', sendResponse);
  sendResponse('pong');
});

console.log('background em j2');