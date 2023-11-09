/* eslint-disable no-console */
/**
 * Checa se um elemento existe até que ele exista ou o timeout seja atingido
 * Recebe uma função que retorna um elemento a ser verificado
 * @param {any} getter
 * @param {number} timeout
 * @returns {Promise<any | null>}
 */
async function asyncGetter(getter, timeout = 10000) {
  return new Promise(resolve => {
    if (!(typeof getter === 'function')) {
      resolve(null)
      return
    }
    try {
      const _res = getter()
      if (_res) {
        resolve(_res)
        return
      }
    } catch (e) {
      //
    }
    const interval = setInterval(() => {
      try {
        const res = typeof getter === 'function' ? getter() : null
        if (res) {
          clearInterval(interval)
          resolve(res)
        }
      } catch (e) {
        //
      }
    }, 100)
    setTimeout(() => {
      try {
        clearInterval(interval)
        resolve(null)
      } catch (error) {
        resolve(null)
        console.error(error)
      }
    }, timeout)
    //
  })
}
;(function IIFE() {
  if (window['__pmr_run_once__']) return
  Object.defineProperty(window, '__pmr_run_once__', {
    value: Symbol('pmrOnce'),
    writable: false,
    enumerable: false
  })

  const refArray = []
  const componentes = {}
  const servicos = {}
  window.__refArray__ = refArray
  window.__componentes__ = componentes
  window.__servicos__ = servicos

  asyncGetter(() => {
    return !!window.sessionStorage && !!servicos.utilService?.config?.pjePayload?.CONSTANTES
  }).then(() => {
    try {
      if (sessionStorage) {
        const { currentUser: _currentUser, pjeLegacyUrl: _pjeLegacyUrl } = sessionStorage
        const {
          TIPO_JUSTICA,
          WEB_ROOT,
          PDPJ_MARKETPLACE,
          VERSAO_LEGACY,
          INSTANCIA,
          ID_USUARIO_LOCALIZACAO
        } = servicos.utilService.config.pjePayload.CONSTANTES

        const currentUser = JSON.parse(_currentUser)
        const pjeLegacyUrl = JSON.parse(_pjeLegacyUrl)
        enviarMensagemExtensao('infoGeral', 'infoInit', {
          currentUser,
          pjeLegacyUrl,
          constantes: {
            TIPO_JUSTICA,
            WEB_ROOT,
            PDPJ_MARKETPLACE,
            VERSAO_LEGACY,
            INSTANCIA,
            ID_USUARIO_LOCALIZACAO
          }
        })
      } else {
        // console.warn('[PJE+R] sessionStorage não encontrado')
      }
    } catch (error) {
      // console.warn('[PJE+R] Erro ao obter informações gerais', error)
    }
  })

  setSymbol(window)

  function setSymbol(obj) {
    Object.defineProperty(obj, window['__pmr_run_once__'], {
      value: true,
      writable: false,
      enumerable: false
    })
  }

  function organizarRefs(refArray) {
    Object.values(refArray).forEach(ref => {
      getObjects(ref)
    })
    refArray.providers?.forEach(provider => {
      getObjects(provider)
    })
  }

  function getObjects(ref) {
    if (ref?.obj?.component) {
      Object.keys(ref.obj.component).forEach(key => {
        const lowerCaseKey = key.toLocaleLowerCase()
        if (lowerCaseKey.includes('service')) {
          servicos[key] = ref.obj.component[key]
        } else if (lowerCaseKey.includes('component')) {
          componentes[key] = ref.obj.component[key]
          refArray[key] = ref.obj.component[key]
        }
      })
    }
  }

  // [extractor]
  function extractor(refArray) {
    refArray = refArray || {}
    refArray.providers = refArray.providers || []

    //Bind
    let bind = Function.prototype.apply.bind(Function.prototype.bind)
    Object.defineProperty(Function.prototype, 'bind', {
      value: function (obj) {
        let boundFunction = bind(this, arguments)
        if (!obj || obj.__proto__.constructor.name === 'u') return boundFunction
        if (!obj.__capt__) !refArray.includes(obj) && refArray.push(obj)
        boundFunction.boundObject = obj
        return boundFunction
      }
    })
    Object.freeze(Function.prototype.bind)

    //Assign
    let assign = Object.assign
    Object.assign = function (target, ...sources) {
      if (
        target &&
        Object.keys(target).join(', ').toLocaleLowerCase().includes('component') &&
        !target.__capt__
      ) {
        !refArray.includes(target) && refArray.push(target)
      }
      sources.forEach(source => {
        if (
          source &&
          Object.keys(source).join(', ').toLocaleLowerCase().includes('component') &&
          !source.__capt__
        ) {
          !refArray.includes(source) && refArray.push(source)
        }
      })
      return assign.apply(this, arguments)
    }
    Object.freeze(Object.assign)

    //Push
    const push = Function.prototype.apply.bind(Array.prototype.push)
    Object.defineProperty(Array.prototype, 'push', {
      value: function (obj) {
        if (obj && obj.component) {
          const comp = obj.component
          refArray[comp.constructor.name] = refArray[comp.constructor.name] || {
            const: comp.constructor,
            obj
          }
          getProviders(obj)
          if (Object.values(obj)) {
            Object.values(obj).forEach(_obj => {
              if (_obj && _obj.component) {
                const _comp = _obj.component
                refArray[_comp.constructor.name] = refArray[_comp.constructor.name] || {
                  const: _comp.constructor,
                  obj: _obj
                }
                getProviders(_obj)
              }
            })
          }
        }
        return push(this, arguments)
      }
    })
    Object.freeze(Array.prototype.push)

    // getProviders
    function getProviders(obj) {
      const providers = obj.root?.ngModule?._providers
      if (providers && Array.isArray(providers)) {
        providers.forEach(provider => {
          if (provider && !refArray.providers.includes(provider)) {
            refArray.providers.push(provider)
          }
        })
      }
      refArray.providers.forEach(provider => {
        if (provider.tick) {
          refArray.applicationRef = provider
        }
        if (refArray.applicationRef) {
          refArray.zone = refArray.applicationRef._zone
        }
      })
      Object.values(obj).forEach(objValue => {
        if (objValue && objValue.component?.cssClass == 'selecionar-etiquetas') {
          refArray.etiquetasComponent = objValue.component
          refArray.listaEtiquetas = objValue.component.listaEtiquetas.etiquetas
        }
        if (objValue && objValue.component?.tarefaSelecionada) {
          refArray._tarefasComponent = objValue.component
          refArray.processosTarefa = objValue.component.processosTarefa
          refArray.processosMarcados = objValue.component.processosMarcados
        }
      })
    }
  }
  // [/extractor]

  function criarListener() {
    const listener = e => {
      const data = e.data
      if (!data || !data.origem || !data.tipo || !data.mensagem || data.origem !== 'gestor') return
      organizarRefs(refArray, componentes, servicos)
      const { tipo, mensagem } = data

      if (data.logInfo) {
        console.log('Evento -> ', e)
        console.log('componentes', componentes)
        console.log('Ref Array -> ', refArray)
        console.log('Serviços -> ', servicos)
      }

      switch (tipo) {
        case 'etiqueta': {
          etiquetaHandler(mensagem)
          break
        }
        case 'tarefa': {
          tarefaHandler(mensagem)
          break
        }
        case 'processo': {
          processoHandler(mensagem)
          break
        }
        case 'notificacao': {
          notificacaoHandler(mensagem)
          break
        }
        default: {
          break
        }
      }
      e.stopPropagation()
    }
    window.addEventListener('message', listener, {
      capture: true
    })
    return listener
  }
  /**
   * {@link criarListener}
   */
  function etiquetaHandler(mensagem) {
    if (!mensagem || !mensagem.acao) {
      console.warn('[PJE+R] etiquetaHandler: Mensagem inválida')
      return
    }
    const etiquetaService = servicos.etiquetaService
    const { acao } = mensagem

    switch (acao) {
      case 'obterTodas': {
        const tags = refArray.listaEtiquetas
        if (tags && tags.length > 0) {
          enviarMensagemExtensao('etiquetasResposta', 'obterTodas', tags)
          break
        } else {
          isDisponivel(etiquetaService) &&
            etiquetaService.getTodasTags().subscribe(tags => {
              enviarMensagemExtensao('etiquetasResposta', 'obterTodas', tags)
            })
        }
        break
      }
      case 'criar': {
        break
      }
      case 'editar': {
        break
      }
      case 'excluir': {
        break
      }
      case 'listar': {
        break
      }
      case 'incluir': {
        const { nomeTagCompleto, idProcesso } = mensagem.conteudo
        isDisponivel(etiquetaService) &&
          etiquetaService
            .incluirProcessoTag({
              tag: nomeTagCompleto,
              idProcesso: '' + idProcesso
            })
            .subscribe(tag => {
              if (tag) {
                const zone = refArray.zone
                zone?.run(() => {
                  const tarefasComp = refArray._tarefasComponent
                  tarefasComp.processosTarefa.processos.forEach(processo => {
                    if (
                      (processo.idProcesso === idProcesso ||
                        idProcesso === '' + processo.idProcesso) &&
                      !processo.tagsProcessoList.includes(tag)
                    ) {
                      processo.tagsProcessoList.push(tag)
                    }
                  })
                })

                if (mensagem.conteudo.notificar) {
                  notificacaoHandler({
                    acao: 'sucesso',
                    conteudo: 'Etiqueta adicionada com sucesso'
                  })
                }
              } else if (mensagem.conteudo.notificar) {
                notificacaoHandler({
                  acao: 'alerta',
                  conteudo: `Não foi possível adicionar a etiqueta: ${nomeTagCompleto}`
                })
              }
            })
        break
      }
    }
  }

  /**
   * {@link criarListener}
   */
  function tarefaHandler(mensagem) {
    //
    if (!mensagem || !mensagem.acao) {
      console.warn('[PJE+R] tarefaHandler: Mensagem inválida')
      return
    }
    //const tarefaService = servicos.tarefaService
    const { acao } = mensagem
    switch (acao) {
      case 'obterAtuais': {
        const tarefaComponent = refArray._tarefasComponent
        if (tarefaComponent) {
          const tarefas = tarefaComponent.processosTarefa?.processos
          if (tarefas && tarefas.length > 0) {
            enviarMensagemExtensao('tarefasResposta', 'obterAtuais', tarefas)
          }
        }
        break
      }
      case 'obterTodas': {
        break
      }
      default: {
        break
      }
    }
  }
  /**
   * {@link criarListener}
   */
  function processoHandler(mensagem) {
    //
    mensagem
  }
  /**
   * {@link criarListener}
   */
  function notificacaoHandler(e) {
    const notificationMessageService = servicos.notificationMessageService
    if (!notificationMessageService) {
      console.warn('[PJE+R] notificacaoHandler: Elemento essencial não encontrado')
      return
    } else if (!e || !e.acao || !e.conteudo) {
      console.warn('[PJE+R] notificacaoHandler: Mensagem inválida')
      return
    }

    const { acao, conteudo } = e
    switch (acao) {
      case 'sucesso': {
        notificationMessageService.sendSuccess('PJE+R', conteudo)
        break
      }
      case 'erro': {
        notificationMessageService.sendError('PJE+R', conteudo)
        break
      }
      case 'alerta': {
        notificationMessageService.sendWarn('PJE+R', conteudo)
        break
      }
      case 'info': {
        notificationMessageService.sendInfo('PJE+R', conteudo)
        break
      }
      default: {
        break
      }
    }
  }

  //
  extractor(refArray)
  organizarRefs(refArray)
  //
  setInterval(() => {
    organizarRefs(refArray)
  }, 1000)
  criarListener()
  //
  function enviarMensagemExtensao(tipo, acao, conteudo) {
    window.dispatchEvent(
      new CustomEvent('pmr-message', {
        detail: {
          tipo,
          mensagem: {
            acao,
            conteudo
          }
        }
      })
    )
  }

  /**
   * Verifica se o elemento está disponível
   * @param {*} servico
   * @returns
   */
  function isDisponivel(servico) {
    if (!servico) {
      console.warn('[PJE+R] Elemento essencial não encontrado')
      return false
    }
    return true
  }
})()
