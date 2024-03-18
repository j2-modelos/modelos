setInterval(async () => {
  (await navigator.serviceWorker.ready).active.postMessage('keepAlive');
  console.log('Keep alive: offscreen method')
}, 22e3);