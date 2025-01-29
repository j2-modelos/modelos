;(() => {
  /***************************************/
  async function RUN(e) {
    /******** NECESSARY GLOBAL VAR ***********/
    var w = window
    w.sharedWindow = null
    w.myWindow = null

    function lg(m) {
      console.log(m)
    }
    function lgB(m) {
      console.log('j2 boot: ' + m)
    }
    function wrn(m) {
      console.warn(m)
    }

    function verificarJ2Mirror() {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://localhost:7722/j2-r/on', true)
        xhr.timeout = 500 // 3 segundos de timeout

        xhr.onload = function () {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText)
              if (response.ativo === true) {
                resolve(true) // Retorna true se o JSON for {ativo: true}
              } else {
                resolve(false) // Caso contrário, retorna false
              }
            } catch (e) {
              resolve(false) // Caso o JSON não seja válido
            }
          } else {
            resolve(false) // Caso o status da requisição não seja 200
          }
        }

        xhr.onerror = function () {
          resolve(false) // Caso haja algum erro na requisição
        }

        xhr.ontimeout = function () {
          resolve(false) // Caso ocorra um timeout
        }

        xhr.send()
      })
    }

    lgB(
      '-----------------------------------------------------------------------------------------'
    )
    lgB('Iniciando modelos j2.')

    lgB('Verificar se j2-mirror está ativo')
    const j2MirrorAtivo = await verificarJ2Mirror()
    lgB('j2-mirror está ativo: ', j2MirrorAtivo)

    lgB('definicoes globais;')

    if (!event) var event = e

    /* checking if user is requesting local storage cleaning */
    w.j2 = {
      res: {
        MAIN: {},
      },
      mod: {
        com: {
          _: {},
        },
      },
      env: {
        j2U: {},
        keys: {
          alt: event.altKey,
          ctrl: event.ctrlKey,
          shift: event.shiftKey,
        },
      },
      ut: {
        isHttps: () => {
          return window.location.protocol === 'https:'
        },
      },
    }

    if (!window.jQ)
      window.jQ = window.$ || window.parent.jQuery_21 || window.parent.jQuery

    window.j2.mod.com._.rootConversation = {
      msgBuilder: function (_tx, clear) {
        var _p = document.createElement('p')
        var _ldRunConv = document.getElementById('ldRunConv')
        if (!_ldRunConv) return
        _p.style.fontFamily =
          String.fromCharCode(34) +
          'Segoe UI' +
          String.fromCharCode(34) +
          ', Tahoma, Geneva, Verdana, sans-serif'
        _p.style.fontWeight = 'bold'
        _p.style.textAlign = 'center'
        _p.style.margin = '0 0 0 0'
        _p.innerHTML = _tx
        if (clear) while (_ldRunConv.firstChild) _ldRunConv.firstChild.remove()

        _ldRunConv.appendChild(_p)
      },
      proxyAlert: function () {
        window.j2.mod.com._.rootConversation.msgBuilder(
          ':( - Opa! Preciso da senha do Proxy!'
        )
      },
      notFoundAlert: function () {
        window.j2.mod.com._.rootConversation.msgBuilder(
          ':( - Opa! Inicilizado nao foi encontrado! Erro 404'
        )
      },
      somError: function () {
        window.j2.mod.com._.rootConversation.msgBuilder(
          ':( - Opa! Algum Erro Aconteceu! Vou fazer um teste.',
          true
        )
        window.j2.mod.com._.connTry.run()
      },
    }

    window.j2.mod.com._.connTry = {
      run: function () {
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = function () {
          lgB(
            'load run.js: readyState' +
              xmlhttp.readyState +
              ' | status: ' +
              xmlhttp.status
          )
          var _msg = window.j2.mod.com._.rootConversation.msgBuilder
          if (xmlhttp.readyState === 2) _msg(':) - Conectei!')

          if (xmlhttp.readyState === 3)
            _msg(':) - Recebendo dados do servidor!')

          if (xmlhttp.readyState === 4) {
            switch (xmlhttp.status) {
              case 200:
                _msg(':) - Conexao ao inicializador ok!')
                break
              case 404:
                _msg(
                  ':( - O inicializador nao foi encontrado. A conexao esta ok.'
                )
                break
              case 407:
                _msg(':( - Preciso da senha do proxy do tjma para continuar.')
                break
              case 408:
                _msg(
                  ':( - Minha requisicao foi enviada, mas passou o tempo limite para o servidor receber.'
                )
                break
              case 500:
                _msg(':( - A culpa nao a minha! É do servidor do Dropbox!')
                break
              case 503:
                _msg(
                  ':( - O servidor do Dropbox esta em manutencao ou sobrecarregado!'
                )
                break
              default:
                _msg(':( - Nao sei o que aconteceu. ' + xmlhttp.status + '?')
                break
            }
          }
        }
        xmlhttp.open(
          'GET',
          window.j2.mod.com.URLGetter(
            w.j2.res.MAIN.run.ref(),
            w.j2.res.MAIN.run.fileName
          ),
          true
        )
        xmlhttp.send()
      },
    }
    window.j2.mod.com._.cacSrc = {
      _cache: function () {},
      _load: function (url, name, version, callback, onload_, j2Def) {
        var s = document.createElement(j2Def.tag.load)

        if (s.readyState) {
          s.onreadystatechange = function () {
            if (s.readyState === 'loaded' || s.readyState === 'complete') {
              s.onreadystatechange = null
              window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def)
              if (callback) callback()
            }
          }
        } else {
          s.onload = function (a, b, c, d) {
            window.j2.mod.com._.cacSrc._cache(name, version, url, j2Def)
            if (onload_) onload_.loaded()
            if (callback) callback()
          }
          s.onerror = function () {
            window.j2.mod.com._.rootConversation.somError()
          }
        }

        s.setAttribute(j2Def.attr, url)
        if (j2Def.optAttr)
          s.setAttribute(j2Def.optAttr.name, j2Def.optAttr.value)
        j2Def.context.doc
          .getElementsByTagName(j2Def.context.loc)[0]
          .appendChild(s)
      },

      _inject: function (content, url, name, version, callback, onload, j2Def) {
        var c = JSON.parse(content)
        /* cached version is not the request version, clear the cache, this will trigger a reload next time */
        if (c.version !== version) {
          localStorage.removeItem(name)
          window.j2.mod.com._.cacSrc._load(
            url,
            name,
            version,
            callback,
            onload,
            j2Def
          )
          return
        }
        var s = document.createElement(j2Def.tag.inject)
        s.type = j2Def.reqType.inject
        s.id = name
        var scriptContent = document.createTextNode(c.content)
        s.appendChild(scriptContent)
        j2Def.context.doc
          .getElementsByTagName(j2Def.context.loc)[0]
          .appendChild(s)
        if (onload) onload.injected()
        if (callback) callback()
      },

      require: function (name, version, url, callback, onload, j2Def) {
        var c = localStorage.getItem(name)
        if (!c) {
          window.j2.mod.com._.cacSrc._load(
            url,
            name,
            version,
            callback,
            onload,
            j2Def
          )
        } else
          window.j2.mod.com._.cacSrc._inject(
            c,
            url,
            name,
            version,
            callback,
            onload,
            j2Def
          )
      },
    }

    lgB('carregamento do injector')

    lgB('definicao dos boot artifacts.')
    w.j2.res.MAIN.run = {
      /*'ref': function () { return (w.j2ModDebug)?(w.j2.ut.isHttps())? '57xizu6zo7nxeiv' : '/res/MAIN/run.js' : '6skh7nd3pjmpqut'; }, //original line*/
      ref: function () {
        return '/res/MAIN/run.js'
      },
      lib: 'ROOT/res/MAIN/run.js',
      type: 'j2/javascript',
      version: '1.2',
      fileName: 'run.js',
    }

    lgB('definicao do manual fire')
    /* manual fire min module */
    w.j2.mod.com._._manualFire = {
      handle: 0,
      data: '',
      trig: function () {
        var lib = window.j2.mod.com._._manualFire.data
        var h = window.j2.mod.com._._manualFire.handle

        if (
          window.j2 &&
          window.j2.mod &&
          window.j2.mod.eventBus &&
          window.j2.mod.eventBus.EventBus
        ) {
          if (document.getElementById(lib)) {
            lg('script ' + lib + ' is loaded.')
            clearInterval(h)
            lgB('fired: loaded-' + lib)
            window.j2.mod.eventBus.EventBus.fire('loaded-' + lib)
          }
        }
      },
    } /* general */

    lgB('definicao do srcp gen')
    w.j2.mod.com.scrpGen = function (data, lib) {
      var scrp = document.createElement('script')
      var manualFire = window.j2.mod.com._._manualFire
      scrp.type = 'text/javascript'
      scrp.charset = 'UFT-8'
      scrp.defer = true
      scrp.async = true

      if (lib) {
        scrp.id = lib
        scrp.text = data

        manualFire.data = lib
        manualFire.handle = setInterval(
          window.j2.mod.com._._manualFire.trig,
          100
        )

        lg('script ' + lib + ' is created.')
      } else {
        scrp.id = data.lib
        scrp.src = data.ref()
        scrp.onload = function () {
          lg('script ' + data.lib + ' is loaded.')
          if (window.j2.mod.eventBus.EventBus)
            window.j2.mod.eventBus.EventBus.fire('loaded-' + data.lib)
        }
        lg('script ' + data.lib + ' is created.')
      }
      return scrp
    }

    lgB('definicao do style gen')
    w.j2.mod.com.styleGen = function (data, lib) {
      var stl = document.createElement('style')
      var manualFire = window.j2.mod.com._._manualFire
      stl.type = 'text/css'
      stl.id = lib
      stl.innerHTML = data

      manualFire.data = lib
      manualFire.handle = setInterval(window.j2.mod.com._._manualFire.trig, 100)

      lg('style ' + lib + ' is created.')
      return stl
    }
    /*
     *
     * @param {type} id - dropbox id - uso do id está depreciado
     * @param string fn - file name
     * @returns {RUN.root_L205.getURL}
     */
    w.j2.mod.com.URLGetter = new (function (id, fn) {
      const URL_PATERN = `https://${j2MirrorAtivo ? 'localhost/j2' : 'j2.eomti.com.br'}/j2`

      function getURL(path, _fn) {
        return `${URL_PATERN}${path}`
      }

      return getURL
    })() /*********************************/

    lgB('definicao da libloader')
    w.j2.mod.com.libLoader = function (art, ctxt) {
      /* artfact */
      if (!ctxt)
        ctxt = {
          doc: document,
          loc: 'head',
        }

      if (ctxt.doc.getElementById(art.lib)) return

      lgB('to load ' + art.lib)

      var v = art.version ? art.version : '0.0'
      var u = window.j2.mod.com.URLGetter(art.ref(), art.fileName)

      if (art.type === 'j2/javascript') {
        /* document.head.appendChild(
          window.j2.mod.com.scrpGen(art)
        );*/

        var onload = {
          loaded: function () {
            lg('script ' + art.lib + ' is loaded.')
            if (window.j2.mod.eventBus.EventBus)
              window.j2.mod.eventBus.EventBus.fire('loaded-' + art.lib)
          },
          injected: function () {
            var manualFire = window.j2.mod.com._._manualFire
            manualFire.data = art.lib
            manualFire.handle = setInterval(
              window.j2.mod.com._._manualFire.trig,
              100
            )
            lg('script ' + art.lib + ' is created.')
          },
        }

        w.j2.mod.com._.cacSrc.require(art.lib, v, u, undefined, onload, {
          tag: {
            load: 'script',
            inject: 'script',
          },
          type: 'j2/javascript',
          reqType: {
            load: 'text/javascript',
            inject: 'text/javascript',
          },
          attr: 'src',
          context: ctxt,
        })
      }
      if (art.type === 'j2/xml') {
        var __load = function () {
          jQ.get(
            window.j2.mod.com.URLGetter(art.ref(), art.fileName),
            function (data, status, object) {
              if (status === 'success') {
                var ls = function () {
                  localStorage.setItem(
                    art.lib,
                    JSON.stringify({
                      content: new XMLSerializer().serializeToString(
                        data.documentElement
                      ),
                      version: art.version ? art.version : '0.0.0',
                      type: art.type,
                    })
                  )
                }

                if (art.hasOwnProperty('storable')) {
                  if (art.storable === true) ls()
                  else {
                    console.warn(art.lib + ' is not storable.')
                    console.warn(
                      new XMLSerializer().serializeToString(
                        data.documentElement
                      )
                    )
                  }
                } else ls()

                window.j2.mod.eventBus.EventBus.fire(
                  'loaded-' + art.lib,
                  new XMLSerializer().serializeToString(data.documentElement)
                )
              }
              if (status === 'error') {
                var e = 'Erro ao carregar ' + art.lib + '.'
                alert(e)
                console.error(e)
              }
            }
          )
        }
        var j2xml = localStorage.getItem(art.lib)

        if (j2xml) {
          var storedLib = JSON.parse(j2xml)
          var vs = storedLib.version ? storedLib.version : '0.0.0'

          if (storedLib.version !== vs) {
            localStorage.removeItem(storedLib.lib)
            __load()
          } else
            window.j2.mod.eventBus.EventBus.fire(
              'loaded-' + art.lib,
              storedLib.content
            )
        } else {
          __load()
        }
      }
      if (art.type === 'j2/styleSheet') {
        var onload_ = {
          loaded: function () {
            lg('styleSheet ' + art.lib + ' is loaded.')
            if (window.j2.mod.eventBus.EventBus)
              window.j2.mod.eventBus.EventBus.fire('loaded-' + art.lib)
          },
          injected: function () {
            var manualFire = window.j2.mod.com._._manualFire
            manualFire.data = art.lib
            manualFire.handle = setInterval(
              window.j2.mod.com._._manualFire.trig,
              100
            )
            lg('styleSheet ' + art.lib + ' is created.')
          },
        }

        w.j2.mod.com._.cacSrc.require(art.lib, v, u, undefined, onload_, {
          tag: {
            load: 'link',
            inject: 'style',
          },
          type: 'j2/styleSheet',
          reqType: {
            load: 'stylesheet',
            inject: 'text/css',
          },
          attr: 'href',
          optAttr: {
            name: 'rel',
            value: 'stylesheet',
          },
          context: ctxt,
        })
      }
      if (art.type === 'j2/text') {
        var __load = function () {
          jQ.get(
            window.j2.mod.com.URLGetter(art.ref(), art.fileName),
            function (data, status, object) {
              if (status === 'success') {
                localStorage.setItem(
                  art.lib,
                  JSON.stringify({
                    content: data,
                    version: art.version ? art.version : '0.0.0',
                    type: art.type,
                  })
                )

                window.j2.mod.eventBus.EventBus.fire('loaded-' + art.lib, data)
              }
              if (status === 'error') {
                var e = 'Erro ao carregar ' + art.lib + '.'
                alert(e)
                console.error(e)
              }
            }
          )
        }
        var j2xml = localStorage.getItem(art.lib)

        if (j2xml) {
          var storedLib = JSON.parse(j2xml)
          var vs = storedLib.version ? storedLib.version : '0.0.0'

          if (storedLib.version !== vs) {
            localStorage.removeItem(storedLib.lib)
            __load()
          } else
            window.j2.mod.eventBus.EventBus.fire(
              'loaded-' + art.lib,
              storedLib.content
            )
        } else {
          __load()
        }
      }
    }

    lgB('Carregamento principal')
    w.j2.mod.com.libLoader(w.j2.res.MAIN.run)
  }
  RUN(window.__event || { altKey: null, ctrlKey: null, shiftKey: null })
})()
