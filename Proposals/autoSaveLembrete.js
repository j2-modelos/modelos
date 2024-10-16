

(function saveALembrete($, idProcesso, mensagem){
	$.get(`https://pje.tjma.jus.br/pje/Processo/lembretes.seam?idProcessoTrf=${idProcesso}`, function(xml, b, c, d){
    //debugger;

    var $html = $(xml)
    var viewId = $html.find('#javax\\.faces\\.ViewState').val()
    
    var PAYLOAD_INCLUDE_SETOR = `
      AJAXREQUEST=formLembretes%3Aj_id107&
      formLembretes%3Adescricao=&
      formLembretes%3AdataVisivelAteInputDate=&
      formLembretes%3AdataVisivelAteInputCurrentDate=04%2F2023&
      formLembretes%3Aativo=true&
      formLembretes%3AorgaoJulgadorDecoration%3AorgaoJulgador=0&
      formLembretes%3Aj_id176%3Alocalizacao=2%C2%BA%20Juizado%20Especial%20C%C3%ADvel%20de%20Imperatriz&
      formLembretes%3Aj_id176%3Aj_id190_selection=&formLembretes%3Aj_id200%3Apapel=&
      formLembretes%3Aj_id200%3Aj_id214_selection=&
      formLembretes%3Aj_id224%3Ausuario=&formLembretes%3Aj_id224%3Aj_id238_selection=&
      formLembretes%3AmsgsOpenedState=&formLembretes=formLembretes&autoScroll=&
      javax.faces.ViewState=${viewId}&
      formLembretes%3Aj_id248=formLembretes%3Aj_id248&AJAX%3AEVENTS_COUNT=1&
      `
      PAYLOAD_INCLUDE_SETOR = PAYLOAD_INCLUDE_SETOR.split('\n').map( function(_i ) { return _i.trim()}).join('')

      $.post('https://pje.tjma.jus.br/pje/Processo/lembretes.seam', PAYLOAD_INCLUDE_SETOR, function(xml2){
        //debugger;
        var PAYLOAD_ADD_LEMBRETE = `
          AJAXREQUEST=formLembretes%3Aj_id107&
          formLembretes%3Adescricao=${encodeURIComponent(mensagem)}&
          formLembretes%3AdataVisivelAteInputDate=&formLembretes%3AdataVisivelAteInputCurrentDate=04%2F2023&
          formLembretes%3Aativo=true&formLembretes%3AorgaoJulgadorDecoration%3AorgaoJulgador=0&
          formLembretes%3Aj_id176%3Alocalizacao=2%C2%BA%20Juizado%20Especial%20C%C3%ADvel%20de%20Imperatriz&
          formLembretes%3Aj_id176%3Aj_id190_selection=&
          formLembretes%3Aj_id200%3Apapel=&
          formLembretes%3Aj_id200%3Aj_id214_selection=&
          formLembretes%3Aj_id224%3Ausuario=&
          formLembretes%3Aj_id224%3Aj_id238_selection=&
          formLembretes%3AmsgsOpenedState=&
          formLembretes=formLembretes&
          autoScroll=&
          javax.faces.ViewState=${viewId}&
          ajaxSingle=formLembretes%3Aj_id278&
          formLembretes%3Aj_id278=formLembretes%3Aj_id278&
          AJAX%3AEVENTS_COUNT=1&
        `;

        PAYLOAD_ADD_LEMBRETE = PAYLOAD_ADD_LEMBRETE.split('\n').map( function(_i ) { return _i.trim()}).join('')
        $.post('https://pje.tjma.jus.br/pje/Processo/lembretes.seam', PAYLOAD_ADD_LEMBRETE, function(xml2){
          //debugger;
        })  
      })
  })
})(jQuery_21, 2889476, 'PRIMEIRO-TESTE-REALIZANDO')