const fetchMudancaDescricao = (body)=>{
    const url = 'https://pje.tjma.jus.br/pje/Processo/movimentar.seam';


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest', // Cabeçalho comumente usado para requisições AJAX
        // Outros cabeçalhos podem ser adicionados conforme necessário, como autenticação
        'Accept-Encoding':'gzip, deflate, br, zstd'
      },
      body: body.toString(),
      credentials: 'include', // Inclui cookies e credenciais de autenticação
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Ajuste o retorno conforme a resposta esperada (JSON, text, etc.)
      })
      .then(data => {
        console.log('Resposta:', data);
      })
      .catch(error => {
        console.error('Erro ao realizar o fetch:', error);
      });
  }

  const ATUAL_VIEW_STATE = 'j_id175'

  fetchMudancaDescricao(new URLSearchParams({
    'AJAXREQUEST': 'movimentarRegion',
    [`taskInstanceForm:minutaProsseguimento-${new URLSearchParams(window.location.search).get('newTaskId')}:descDocDecoration:descDoc`]: 'Levantamento de suspesnão',
    'taskInstanceForm': 'taskInstanceForm',
    'javax.faces.ViewState': ATUAL_VIEW_STATE,
    'AJAX:EVENTS_COUNT': '1'
  }))