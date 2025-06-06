/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('citacao.js - módulo compilante')

try {
  ;(function () {
    /* inits autoexec */
    var w = window
    var evBus = window.j2.mod.eventBus.EventBus

    var pkg
    if (w.j2.mod.clsCnstr) pkg = w.j2.mod.clsCnstr
    else {
      w.j2.mod.clsCnstr = {}
      pkg = w.j2.mod.clsCnstr
    }

    var mod = w.j2.modelo

    //var isObject = new window.j2.mod._._201;
    var forEach = w.j2.mod.forEach
    var filter = new window.j2.mod._._90()
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus
    //var parseVar = window.j2.mod._._parseVar;
    var j2Conv = window.j2.mod._._j2TagsConverter
    //window.j2.mod.j2Moddle;

    var tools = {
      styleSetter: function (element, classesAsString) {
        forEach(classesAsString.split(' '), function (clss) {
          forEach(j2.mod.builder.getStyleClass(clss).prop, function (prop) {
            if (element.style[prop.name] !== 'undefinied')
              element.style[prop.name] = prop.value
            else
              j2.log(
                'A propriedade ' +
                  x +
                  ' não pode ser associada às definições de estilo. Classe: ' +
                  clss
              )
          })
        })
      },
      hide: function (el) {
        tools.styleSetter(el, 'Hidden')
      },
      show: function (el) {
        tools.styleSetter(el, 'Visible')
      },
    }

    pkg.Citacao = {
      contructor_: function () {
        /* creating event listener*/
        pkg.Citacao.setMonetaryListeners()
        pkg.Citacao.setEvents()

        /*if(pkg.Citacao.containers.exp.OJ()){
          tools.hide(pkg.Citacao.containers.exp.OJ());
          tools.hide(pkg.Citacao.containers.edt.seletorOJ());
        }*/
        var meio = pkg.Citacao.containers.edt.meio()
        function __updateSeletorMeioComunicacao() {
          meio.value = 'meioComunicItCentralMandados'
          pkg.SeletorOJ.isVisible = true

          var _ = [
            'meioComunicItPessoalmente',
            'meioComunicItTelefone',
            'meioComunicItWhatsApp',
          ]
          var os = meio.options

          forEach(_, function (di) {
            if (os[di]) os[di].remove()
          })
        }

        if (jQ3(meio).find('#meioComunicItCorreios').length)
          __updateSeletorMeioComunicacao()
        else
          evBus.on(
            'Selector.loadSelectSource.meiosComunicacao',
            __updateSeletorMeioComunicacao
          )
      },
      setEvents: function () {
        var cb = function (event, closer) {
          if (
            pkg.Citacao.containers.edt.itemsMonitor().childNodes.length === 0
          ) {
            pkg.DocEditorCore.proceedFinish = false
            event.stopPropagation()
            pkg.ModalDialog.okCancel(
              'Você não adicionou finalidades à citação. Fechar mesmo o editor?',
              'Citação j2 - Atenção',
              'Citacao.noEditionsConfirmed;beforeFinishEdition.postConfirmation',
              'docEditorCore.onCancelClose'
            )
          }
        }
        evBus.on('beforeFihishEdition', cb)
        evBus.once('Citacao.noEditionsConfirmed', function (event) {
          evBus.off('beforeFihishEdition', cb)
        })

        evBus.on(
          'onChange.' + pkg.Citacao.containers.edt.meio().id,
          function (event, value, obSelect) {
            pkg.Citacao.formatByExpMeio(value)
          }
        )

        evBus.on(
          'Citacao.onSelectItemLinkedExecutionValue',
          function (event, value, obSelect) {
            if (j2.env.modId.modAut.versao === '3.1') {
              tools.show(pkg.Citacao.containers.exp.valorExecucao.core())
              tools.show(pkg.Citacao.containers.exp.valorExecucao.br())
            } else if (j2.env.modId.modAut.versao.match(/3.2|3.3|3.4/)) {
              tools.show(mod.exp.gE('secao.execucaoInfo'))
              evBus.once(
                'onDel.' +
                  pkg.Citacao.containers.edt.itemSelector().id +
                  '.intmItCitacaoExecucaoJec',
                function () {
                  tools.hide(mod.exp.gE('secao.execucaoInfo'))
                }
              )
            }
          }
        )

        /* trata antes de adicionar item */
        evBus.on(
          'beforeChange.' + pkg.Citacao.containers.edt.itemSelector().id,
          function (event, selectorObj, selI, toAppd) {
            var arElByMeio = filter(selI.itemContent.selectorArray.arElement, {
              keyEl: pkg.Citacao.containers.edt.meio().value,
            })
            if (arElByMeio.length) {
              if (arElByMeio[0].data)
                toAppd.body = j2Conv(
                  j2.mod.builder.parseVars(
                    arElByMeio[0].data.text.trim().trimSpaces()
                  )
                )

              if (arElByMeio[0].simpleElementsDefs) {
                var cont = document.createElement('div')
                forEach(
                  arElByMeio[0].simpleElementsDefs.elemento,
                  function (ele) {
                    j2.mod.builder.j2ElementParse(ele, cont)
                  }
                )

                toAppd.body = cont
              }
            } else {
              arElByMeio = filter(selI.itemContent.selectorArray.arElement, {
                keyEl: 'general',
              })
              if (arElByMeio.length) {
                if (arElByMeio[0].data)
                  toAppd.body = j2Conv(
                    j2.mod.builder.parseVars(
                      arElByMeio[0].data.text.trim().trimSpaces()
                    )
                  )

                if (arElByMeio[0].simpleElementsDefs) {
                  var cont = document.createElement('div')
                  forEach(
                    arElByMeio[0].simpleElementsDefs.elemento,
                    function (ele) {
                      j2.mod.builder.j2ElementParse(ele, cont)
                    }
                  )

                  toAppd.body = cont
                }
              } else toAppd.body = '####ERROR#PRocessing'
            }
          }
        )
      },
      formatByExpMeio: async function (meio) {
        var makeARVisible = function (flg) {
          try {
            if (flg) pkg.AR.visibleOn()
            else pkg.AR.visibleOff()
          } catch (e) {}
        }
        var makeSelectorOJVisible = function (TF) {
          if (pkg.SeletorOJ) pkg.SeletorOJ.visible(TF)
        }
        var changeTitulo = function (text) {
          pkg.Titulo.change(text, 'default')
        }

        var makeDadoEPassadoVisible = function (TR) {
          var _ = mod.exp.gE('singleBody.dadoEPassado')
          if (_) j2.mod._.styleSetter(_, 'Hidden', TR)
        }

        var makeLocalEDataVisible = function (TR) {
          var _ = mod.exp.gE('LocalEData.default')
          if (_) j2.mod._.styleSetter(_, 'Hidden', TR)
        }

        var placeDestinatarioControl = function (position) {
          REMOVE_STYLE = true
          function moveChildren(from, to) {
            while (from.firstChild) to.appendChild(from.firstChild)
          }
          var sec = {
            inf: mod.exp.gE('secao.destinatarioInf'),
            sup: mod.exp.gE('secao.destinatarioSup'),
            supSpc: mod.exp.gE('space.destinatarioSup.spacing'),
            infFinalidade: mod.exp.gE('singleBody.finaliadeExpediente'),
          }

          switch (position) {
            case 'sup':
              j2.mod._.styleSetter(sec.supSpc, 'Hidden', REMOVE_STYLE)
              j2.mod._.styleSetter(sec.infFinalidade, 'Hidden')
              moveChildren(sec.inf, sec.sup)
              forEach(sec.sup.getElementsByTagName('*'), function (el) {
                if (!el) return

                switch (el.id) {
                  case 'singleBody.destinatarioExpediente':
                  case 'singleBody.citacao.valorExecucao':
                    j2.mod._.styleSetter(el, 'pAsListItem', REMOVE_STYLE)
                    break
                  case 'vocativo':
                    j2.env.modId.modAut.versao.match(/3.2/) &&
                      j2.mod._.styleSetter(el, 'b') // nct
                    break
                  case 'vocativoPreText':
                    el.innerHTML = j2.env.modId.modAut.versao.match(/3.3|3.4/)
                      ? j2Conv('#:B{#:U{DESTINATÁRIO}}')
                      : 'Destinatário' // nct
                    break
                }
              })
              break
            case 'inf':
              j2.mod._.styleSetter(sec.supSpc, 'Hidden')
              j2.mod._.styleSetter(sec.infFinalidade, 'Hidden', REMOVE_STYLE)
              moveChildren(sec.sup, sec.inf)
              forEach(sec.inf.getElementsByTagName('*'), function (el) {
                if (!el) return

                switch (el.id) {
                  case 'singleBody.destinatarioExpediente':
                  case 'singleBody.citacao.valorExecucao':
                    j2.mod._.styleSetter(el, 'pAsListItem')
                    break
                  case 'vocativo':
                    j2.env.modId.modAut.versao.match(/3.2/) &&
                      j2.mod._.styleSetter(el, 'b', REMOVE_STYLE) // nct
                    break
                  case 'vocativoPreText':
                    el.innerHTML = j2Conv(
                      '#:B{#:U{PARTE ENVOLVIDA - LOCAL DA DILGÊNCIA}}'
                    )
                    break
                }
              })
              break
          }
        }

        switch (meio) {
          case 'meioComunicItCorreios':
            changeTitulo('CARTA DE CITAÇÃO')
            makeSelectorOJVisible(false)
            if (j2.env.modId.modAut.versao.match(/3.2|3.3|3.4/)) {
              //nct
              placeDestinatarioControl('sup')
              makeDadoEPassadoVisible(false)
              makeLocalEDataVisible(true)
            }

            if (!pkg.AR) {
              j2.mod.com.libLoader(j2.res.mod.AR)
              evBus.once('AR.onLoadLibs', function (event) {
                pkg.AR.append(
                  null,
                  {
                    eventName: [
                      'onAdd.' + pkg.Citacao.containers.edt.itemSelector().id,
                      'onDel.' + pkg.Citacao.containers.edt.itemSelector().id,
                    ],
                    monitor: pkg.Citacao.containers.edt.itemsMonitor() /*,
                  prePattern : 'Citação'*/,
                  },
                  '7.0'
                )
              })
            } else {
              makeARVisible(true)
            }
            break
          case 'meioComunicItCentralMandados':
            changeTitulo('MANDADO DE CITAÇÃO')
            makeARVisible(false)
            makeSelectorOJVisible(true)
            if (j2.env.modId.modAut.versao.match(/3.2|3.3|3.4/)) {
              //nct
              placeDestinatarioControl('inf')
              makeDadoEPassadoVisible(true)
              makeLocalEDataVisible(false)
            }
            break

          case 'meioComunicItDJe':
            changeTitulo('CITAÇÃO')
            makeARVisible(false)
            makeSelectorOJVisible(false)
            if (j2.env.modId.modAut.versao.match(/3.2|3.3|3.4/)) {
              //nct
              placeDestinatarioControl('sup')
              makeDadoEPassadoVisible(false)
              makeLocalEDataVisible(true)
            }
            break

          case 'meioComunicItPessoalmente':
            changeTitulo('CERTIDÃO DE CITAÇÃO')
            makeARVisible(false)
            makeSelectorOJVisible(false)
            //placeDestinatarioControl('sup');
            //makeDadoEPassadoVisible(false);
            break

          case 'meioComunicItSistema':
          case 'meioComunicItDomJudE':
            changeTitulo('CITAÇÃO ELETRÔNICA')
            makeARVisible(false)
            makeSelectorOJVisible(false)
            if (j2.env.modId.modAut.versao.match(/3.2|3.3|3.4/)) {
              //nct
              placeDestinatarioControl('sup')
              makeDadoEPassadoVisible(false)
              makeLocalEDataVisible(true)
            }
            break

          /*case 'meioComunicItTelefone':
            pkg.Titulo.change('CERTIDÃO DE INTIMAÇÃO');
            makeARVisible(false);
            makeSelectorOJVisible(false);
            break;*/

          default:
            mod.edt.win.alert(meio)
        }

        pkg.Citacao.containers.edt.itemsMonitor().changeList()
      },
      containers: {
        exp: {
          titulo: function () {
            return mod.exp.gE('expTitle')
          },
          destinatario: function () {
            return mod.exp.gE('singleBody.destinatarioExpediente')
          },
          deOrdem: function () {
            return mod.exp.gE('porOrdemExpediente')
          },
          itemList: function () {
            return mod.exp.gE('SDLinkedElementcitacaoItens')
          },
          OJ: function () {
            return mod.exp.gE('oficialJustica')
          },
          valorExecucao: {
            core: function () {
              return mod.exp.gE('singleBody.citacao.valorExecucao')
            },
            br: function () {
              return mod.exp.gE('singleBody.citacao.valorExecucao_')
            },
          },
        },
        edt: {
          meio: function () {
            return mod.edt.gE('selectorcitacaoSelectMeio')
          },
          deOrdem: function () {
            return mod.edt.gE('selectorDeOrdemDoExpediente')
          },
          itemSelector: function () {
            return mod.edt.gE('selectorcitacaoItens')
          },
          itemsMonitor: function () {
            return mod.edt.gE('selectorMonitorcitacaoItens')
          },
          signatario: function () {
            return mod.edt.gE('selectorsignatario')
          },
          seletorOJ: function () {
            return mod.edt.gE('selectorOJsItems')
          },
        },
      },
      bindMonetary: {
        items: [
          'intmItCitacaoExecucaoJec',
          'intmItCitacaoExecucaoExTiExAudJec',
        ],
        selector: 'selectorcitacaoItens',
        container: mod.edt.gE('modAddtCtrls'),
      },
      setMonetaryListeners: function () {
        forEach(pkg.Citacao.bindMonetary.items, function (i) {
          evBus.on(
            'onAdd.' + pkg.Citacao.bindMonetary.selector + '.' + i,
            function (ev, arg) {
              pkg.Citacao.resolveCtrlMonetario(arg, 'intmItCitacaoExecucaoJec')
            }
          )
          evBus.on(
            'onDel.' + pkg.Citacao.bindMonetary.selector + '.' + i,
            function (ev, arg) {
              pkg.Citacao.resolveCtrlMonetario(arg, 'intmItCitacaoExecucaoJec')
            }
          )
        })

        evBus.on(
          'afterCreateMonetarioControls.intmItCitacaoExecucaoJec',
          function () {
            evBus.fire('Editor.onResize')
          }
        )
      },
      resolveCtrlMonetario: function (args, item) {
        var flg = false
        if (args.monitr) {
          forEach(args.monitr.options, function (opt) {
            //forEach(pkg.Certidao.bindMonetary.items, function(bIt){
            if (
              opt.id.itemId() === 'intmItCitacaoExecucaoJec' ||
              opt.id.itemId() === 'intmItCitacaoExecucaoExTiExAudJec'
            )
              if (mod.edt.gE('ctrlMonetario' + item)) {
                flg = true
                return
              } else if (pkg.monetario) {
                /* create container */
                pkg.monetario.createInputSetMonetario(
                  'ctrlMonetario' + item,
                  'Execucao R$',
                  pkg.Citacao.bindMonetary.container,
                  mod.exp.gE('valorExecucao.' + item),
                  item,
                  j2.env.PJeVars.processo.valorFloat.toFixed(2)
                )
                return
              }
            //});
          })
          /* then delete it */
          if (mod.edt.gE('ctrlMonetario' + item) && flg === false)
            mod.edt.gE('ctrlMonetario' + item).remove()
          evBus.fire('afterCreateMonetarioControls.' + item)
        }
      },
    }

    evBus.once('loaded-' + window.j2.res.mod.citacao.lib, function () {
      pkg.Citacao.contructor_()
    })
  })()
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.citacao.lib
  alert(t)
  console.error(t)
}
