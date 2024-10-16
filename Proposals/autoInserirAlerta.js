

(function saveALembrete($, numeroProcesso, alerta, criticidade, callback){
  var baseUrl = `https://pje.tjma.jus.br/pje/Alerta/listView.seam`;

  function conformPayload(PAYLOAD){
    PAYLOAD=PAYLOAD.split('\n').map( function(_i ) { 
      _i = _i.replace(': ','=')
      return _i.trim()
    })

    PAYLOAD.shift()
    PAYLOAD.pop()

    return encodeURI(PAYLOAD.join('&') )
    
  }


	$.get(baseUrl, function(xml, b, c, d){
    //debugger;

    var $html = $(xml)
    var viewId = $html.find('#javax\\.faces\\.ViewState').val()
    
    var PAYLOAD_SELECT_FORM = `
        AJAXREQUEST: _viewRoot
        javax.faces.ViewState: ${viewId}
        form: form
        AJAX:EVENTS_COUNT: 1
      `
      PAYLOAD_SELECT_FORM = conformPayload(PAYLOAD_SELECT_FORM)

      $.post(baseUrl, PAYLOAD_SELECT_FORM, function(xml2){
        //debugger;
        var PAYLOAD_ADD_ALERTA = `
          alertaForm:alerta:j_id286:alerta: ${alerta}
          alertaForm:inCriticidade:inCriticidadeDecoration:inCriticidade: ${criticidade || 'I'}
          alertaForm:ativo:ativoDecoration:ativoSelectOneRadio: true
          alertaForm:saveH: Incluir
          alertaForm: alertaForm
          autoScroll: 
          javax.faces.ViewState: ${viewId}
        `;

        PAYLOAD_ADD_ALERTA = conformPayload(PAYLOAD_ADD_ALERTA)
        $.post(baseUrl, PAYLOAD_ADD_ALERTA, function(xml2){
          //debugger;

          var PAYLOAD_SELECT_PROCESSO_VINCULADO_AO_ALERTA = `
            AJAXREQUEST: _viewRoot
            javax.faces.ViewState: ${viewId}
            processoAlertaRichTab: processoAlertaRichTab
            AJAX:EVENTS_COUNT: 1
          `
          PAYLOAD_SELECT_PROCESSO_VINCULADO_AO_ALERTA = conformPayload(PAYLOAD_SELECT_PROCESSO_VINCULADO_AO_ALERTA)

          $.post(baseUrl, PAYLOAD_SELECT_PROCESSO_VINCULADO_AO_ALERTA, function(xml2){

            var PAYLOAD_PESQUISA_PROCESSO = `
              AJAXREQUEST: processoAlertaFormRegion
              processoAlertaForm:j_id351:processoTrfSuggest: ${numeroProcesso}
              processoAlertaForm:j_id351:j_id368_selection: 
              processoAlertaForm:processoAlertaAtivoDecoration:processoAlertaAtivoSelectOneRadio: true
              processoAlertaForm: processoAlertaForm
              autoScroll: 
              javax.faces.ViewState: ${viewId}
              processoAlertaForm:j_id351:j_id368: processoAlertaForm:j_id351:j_id368
              ajaxSingle: processoAlertaForm:j_id351:j_id368
              inputvalue: ${numeroProcesso}
              AJAX:EVENTS_COUNT: 1
            `;

            PAYLOAD_PESQUISA_PROCESSO = conformPayload(PAYLOAD_PESQUISA_PROCESSO)
            $.post(baseUrl, PAYLOAD_PESQUISA_PROCESSO, function(xml2){

              var PAYLOAD_SELECIONA_PROCESSO = `
                AJAXREQUEST: processoAlertaFormRegion
                processoAlertaForm:j_id351:processoTrfSuggest: ${numeroProcesso}
                processoAlertaForm:j_id351:j_id368_selection: 0
                processoAlertaForm:processoAlertaAtivoDecoration:processoAlertaAtivoSelectOneRadio: true
                processoAlertaForm: processoAlertaForm
                autoScroll: 
                javax.faces.ViewState: ${viewId}
                processoAlertaForm:j_id351:j_id368:j_id371: processoAlertaForm:j_id351:j_id368:j_id371
                ajaxSingle: processoAlertaForm:j_id351:j_id368
                AJAX:EVENTS_COUNT: 1
              `;

              PAYLOAD_SELECIONA_PROCESSO = conformPayload(PAYLOAD_SELECIONA_PROCESSO)
              $.post(baseUrl, PAYLOAD_SELECIONA_PROCESSO, function(xml2){
                var PAYLOAD_SALVA_PROCESSO = `
                  AJAXREQUEST: processoAlertaFormRegion
                  processoAlertaForm:j_id351:processoTrfSuggest: ${numeroProcesso}
                  processoAlertaForm:j_id351:j_id368_selection: 
                  processoAlertaForm:processoAlertaAtivoDecoration:processoAlertaAtivoSelectOneRadio: true
                  processoAlertaForm: processoAlertaForm
                  autoScroll: 
                  javax.faces.ViewState: ${viewId}
                  processoAlertaForm:persistButton: processoAlertaForm:persistButton
                  AJAX:EVENTS_COUNT: 1
                `;

                PAYLOAD_SALVA_PROCESSO = conformPayload(PAYLOAD_SALVA_PROCESSO)
                $.post(baseUrl, PAYLOAD_SALVA_PROCESSO, function(xml2){

                  //debugger;

                  callback && callback(xml)

                })
              })
            })
          })
        })  
      })
  })
})(jQuery_21, '0801143-25.2022.8.10.0047', JSON.stringify({
  geo: {
    '00641805306':'-5.5065375,-47.4540781'
  }
}), "I", function(){
  alert('ESTÁ CONSUMADO')
})