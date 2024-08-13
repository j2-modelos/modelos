document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
  
    // Carrega o estado do switch do armazenamento
    chrome.storage.local.get('isPJeRActive', (data) => {
      toggleSwitch.checked = data.isPJeRActive || false;
    });
  
    // Escuta as mudanças no switch
    toggleSwitch.addEventListener('change', () => {
      const isChecked = toggleSwitch.checked;
      
      // Salva o novo estado
      chrome.storage.local.set({ isPJeRActive: isChecked });
  
    });
  });
  

  