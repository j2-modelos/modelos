
if( typeof window.j2E === 'undefined')
  window.j2E = {}

j2E.SeamIteraction = ( $ => { var _this = {
  session : {},
  util : {
    conformPayload : PAYLOAD =>{
      PAYLOAD=PAYLOAD.split('\n').map( function(_i ) { 
        _i = _i.replace(': ','=')
        return _i.trim()
      })
  
      PAYLOAD.shift()
      PAYLOAD.pop()
  
      return encodeURI(PAYLOAD.join('&') )
    }
  },
  alertas : {
    requestsIteractions : {
      baseURL : `https://pje.tjma.jus.br/pje/Alerta/listView.seam`,
      listView : () =>{
        var def = $.Deferred()

        $.get(_this.alertas.requestsIteractions.baseURL)
        .done( (xml)=> { 
          var $html = $(xml)
          var viewId = $html.find('#javax\\.faces\\.ViewState').val()
          _this.session.viewId = viewId

          def.resolve( _this.alertas.requestsIteractions ) 
        } )
        .fail( err => def.reject(err) )

        return def.promise();
      },
      tabFormSelection : ()=>{
        var def = $.Deferred()

        var PAYLOAD = `
          AJAXREQUEST: _viewRoot
          javax.faces.ViewState: ${_this.session.viewId}
          form: form
          AJAX:EVENTS_COUNT: 1
        `
        PAYLOAD = _this.util.conformPayload(PAYLOAD)

        $.post(_this.alertas.requestsIteractions.baseURL, PAYLOAD)
        .done( () => { def.resolve( _this.alertas.requestsIteractions ) } )
        .fail( err => def.reject(err) )

        return def.promise();
      },
      addAlerta : (alerta, criticidade)=>{
        var def = $.Deferred()

        var PAYLOAD = `
          alertaForm:alerta:j_id286:alerta: ${alerta}
          alertaForm:inCriticidade:inCriticidadeDecoration:inCriticidade: ${criticidade || 'I'}
          alertaForm:ativo:ativoDecoration:ativoSelectOneRadio: true
          alertaForm:saveH: Incluir
          alertaForm: alertaForm
          autoScroll: 
          javax.faces.ViewState: ${_this.session.viewId}
        `;

        PAYLOAD = _this.util.conformPayload(PAYLOAD)

        $.post(_this.alertas.requestsIteractions.baseURL, PAYLOAD)
        .done( () => def.resolve( _this.alertas.requestsIteractions ) )
        .fail( err => def.reject(err) )

        return def.promise();
      },
      searchAlerta : (query, criticidade, ativo)=>{
        var def = $.Deferred()

        var PAYLOAD = `
          AJAXREQUEST: j_id137
          alertaGridSearchForm:page: 1
          alertaGridSearchForm:searching: true
          alertaGridSearchForm:j_id141:ativoDecoration:ativo: ${ativo || ''}
          alertaGridSearchForm:j_id152:inCriticidadeDecoration:inCriticidade: ${ criticidade || 'org.jboss.seam.ui.NoSelectionConverter.noSelectionValue'}
          alertaGridSearchForm:j_id162:j_id164:alerta: ${query}
          alertaGridSearchForm: alertaGridSearchForm
          autoScroll: 
          javax.faces.ViewState: ${_this.session.viewId}
          alertaGridSearchForm:search: alertaGridSearchForm:search
          AJAX:EVENTS_COUNT: 1
        `;

        PAYLOAD = _this.util.conformPayload(PAYLOAD)

        $.post(_this.alertas.requestsIteractions.baseURL, PAYLOAD)
        .done( xml => def.resolve( xml, _this.alertas.requestsIteractions)  )
        .fail( err => def.reject(err) )

        return def.promise();
      }
    },
    acoes : {
      adicionarUmAlertaSemAssociarProcesso : textoAlerta => {
        var def = $.Deferred()

        _this.alertas.requestsIteractions.listView()
        .done( 
          it => it.tabFormSelection()
          .done( 
            it => it.addAlerta( textoAlerta )
            .done( it => def.resolve() )
            .fail( err => def.reject(err) )

          ).fail( err => def.reject(err) )
        )
        .fail( err => def.reject(err) )

        return def.promise()
      },
      pesquisarAlerta : (query, criticidade, ativo) => {
        var def = $.Deferred()
        var acoes = _this.alertas.acoes

        _this.alertas.requestsIteractions.listView()
        .done( 
          it => it.searchAlerta(query, criticidade, ativo)
          .done( xml => def.resolve(xml, acoes ) )
          .fail( err => def.reject(err) )
        )
        .fail( err => def.reject(err) )

        return def.promise()
      }
    }
  }}
  return _this
})(jQuery_21)

/**
 * EXEMPLO
 */

j2E.SeamIteraction.alertas.acoes.pesquisarAlerta( 'TEST XYZ' )
.done( (xml, ac) => { 
  var json = jQuery_21(xml).find('#alertaGridList\\:tb').find('tr:first-child >td:nth-child(2)').text()

  if(json.length === 0)
    ac.adicionarUmAlertaSemAssociarProcesso( 'TEST XYZ' ).done( () => console.log( 'TEST XYZ criado' ) )
  else
    console.log(json)
})
