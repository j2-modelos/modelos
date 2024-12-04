document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const naoGerenciarModelos = document.getElementById('naoGerenciarModelos');
  
    // Carrega o estado do switch do armazenamento
    chrome.storage.local.get(null, (data) => {
      toggleSwitch.checked = data.isPJeRActive || false;
      naoGerenciarModelos.checked = data.naoGerenciarModelos || false;
    });
  
    // Escuta as mudanças no switch
    toggleSwitch.addEventListener('change', () => {
      const isChecked = toggleSwitch.checked;
      
      // Salva o novo estado
      chrome.storage.local.set({ isPJeRActive: isChecked });
  
    });
    naoGerenciarModelos.addEventListener('change', () => {
      const isChecked = naoGerenciarModelos.checked;
      
      // Salva o novo estado
      chrome.storage.local.set({ naoGerenciarModelos: isChecked });
  
    });
  });
  

  