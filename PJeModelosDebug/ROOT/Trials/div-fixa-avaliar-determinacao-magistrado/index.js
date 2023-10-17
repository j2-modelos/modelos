const TEMPLATE_CONTAINER = `<div id="j2-float-adm" class="div-fixa">
<div class="rich-panel col-sm-12 j2-faixa-etiquetas" j2-painel-basic-css="j2-painel-basic-css">
<div class="rich-panel-header">[SEM HEADER]</div><div class="rich-panel-body panel" j2-ui-content="j2"></div></div><div j2-faixa-etiquetas-spacer="">&nbsp;</div></div>`

const TEMPLATE_DIV = `<div id="j2-float-adm" class="div-fixa">
<div class="rich-panel col-sm-12">
  <div class="rich-panel-header j2eADMHeader">Certificar</div>
  <div class="rich-panel-body panel j2eADMPanel" j2e="certfc">
    <span
      id="taskInstanceForm:cumpridec_certificar_transito_julgado-10532671725"
    >
      <div class="propertyView col-sm-4 propertyViewJ2E">
        <div
          id="taskInstanceForm:cumpridec_certificar_transito_julgado-10532671725:cumpridec_certificar_transito_julgado-10532671725Decoration:fieldcumpridec_certificar_transito_julgado-10532671725Div"
          class="name"
        >
          <label
            for="taskInstanceForm:cumpridec_certificar_transito_julgado-10532671725:cumpridec_certificar_transito_julgado-10532671725Decoration:cumpridec_certificar_transito_julgado-10532671725"
            class=""
          >
            Certificar trânsito em julgado
            <small class="text-muted text-lowercase"></small
          ></label>
        </div>
        <div class="value col-sm-12">
          <input
            id="taskInstanceForm:cumpridec_certificar_transito_julgado-10532671725:cumpridec_certificar_transito_julgado-10532671725Decoration:cumpridec_certificar_transito_julgado-10532671725"
            type="checkbox"
            name="taskInstanceForm:cumpridec_certificar_transito_julgado-10532671725:cumpridec_certificar_transito_julgado-10532671725Decoration:cumpridec_certificar_transito_julgado-10532671725"
            class="checkbox"
            onclick=""
          />
        </div></div></span
    ><span
      id="taskInstanceForm:cumpridec_certificar_juizo_digital-10532671725"
    >
      <div class="propertyView col-sm-4 propertyViewJ2E">
        <div
          id="taskInstanceForm:cumpridec_certificar_juizo_digital-10532671725:cumpridec_certificar_juizo_digital-10532671725Decoration:fieldcumpridec_certificar_juizo_digital-10532671725Div"
          class="name"
        >
          <label
            for="taskInstanceForm:cumpridec_certificar_juizo_digital-10532671725:cumpridec_certificar_juizo_digital-10532671725Decoration:cumpridec_certificar_juizo_digital-10532671725"
            class=""
          >
            Cerificar juízo digital
            <small class="text-muted text-lowercase"></small
          ></label>
        </div>
        <div class="value col-sm-12">
          <input
            id="taskInstanceForm:cumpridec_certificar_juizo_digital-10532671725:cumpridec_certificar_juizo_digital-10532671725Decoration:cumpridec_certificar_juizo_digital-10532671725"
            type="checkbox"
            name="taskInstanceForm:cumpridec_certificar_juizo_digital-10532671725:cumpridec_certificar_juizo_digital-10532671725Decoration:cumpridec_certificar_juizo_digital-10532671725"
            class="checkbox"
            onclick=""
          />
        </div></div></span
    ><span
      id="taskInstanceForm:cumpridec_pericia-10532671725"
      j2e="altTarefa"
    >
      <div class="propertyView col-sm-4 propertyViewJ2E">
        <div
          id="taskInstanceForm:cumpridec_pericia-10532671725:cumpridec_pericia-10532671725Decoration:fieldcumpridec_pericia-10532671725Div-j2Alt-Certificar tempestividade de recurso"
          class="name"
        >
          <label
            for="taskInstanceForm:cumpridec_pericia-10532671725:cumpridec_pericia-10532671725Decoration:cumpridec_pericia-10532671725-j2Alt-Certificar tempestividade de recurso"
            class=""
            >Certificar tempestividade de recurso</label
          >
        </div>
        <div class="value col-sm-12">
          <input
            id="taskInstanceForm:cumpridec_pericia-10532671725:cumpridec_pericia-10532671725Decoration:cumpridec_pericia-10532671725-j2Alt-Certificar tempestividade de recurso"
            type="checkbox"
            class="checkbox"
            onclick=""
          />
        </div></div
    ></span>
  </div>
</div>
</div>
`

  const TEMPLATE_CSS = `<style>
  .div-fixa {
    position: fixed;
    top: -500px; /* Inicialmente, coloque a div acima do topo da janela de visualização */
    left: 0;
    width: calc(100% - 6px);
    /*background-color: #ccc;*/
    padding: 14px;
    transition: top 0.3s ease; /* Adicione uma transição suave para o efeito de deslizamento */
    z-index: 1000;
}
</style>`
const idTask = 10532671725
const jQ3 = jQuery_21
const $referenceObject = jQ3(`#taskInstanceForm\\:Processo_Fluxo_visualizarDecisao-${idTask}`).prev()
jQ3('#taskInstanceForm').before(TEMPLATE_CSS)
//const $container = jQ3(TEMPLATE_CONTAINER)
const $container = jQ3(TEMPLATE_DIV)
jQ3('#taskInstanceForm').before($container)
//$container.find('.rich-panel-body').append(TEMPLATE_DIV)


jQ3('#pageBody').on("scroll", function(event) {
  const divFixa = jQ3('#j2-float-adm')[0];
  const depoisDesseId = $referenceObject[0];
  const divRect = divFixa.getBoundingClientRect();
  const depoisRect = depoisDesseId.getBoundingClientRect();



  // Verifique se o elemento 'depoisDesseId' está fora da visualização
    console.log('depoisRect.top', depoisRect.top , 'divRect.height', divRect.height )
  if ( depoisRect.top < -divRect.height) {
      console.warn('condição is true')
      divFixa.style.top = "0"; // Mostra a div fixa definindo o topo como 0
  } else {
      divFixa.style.top = "-500px"; // Esconde a div fixa definindo o topo como -100px
  }
});