function init(){
  j2E.ARDigital = {
    api : {
      ajax : {
        get : function(url, sucCB, errCB, dataType){
          return jQ3.ajax({
            url : url,
            type : 'get',
            dataType: dataType || 'json',
            success : function(data, status, xhr){
              if(sucCB)
                sucCB(data, status, xhr);
            },
            error : function(a, b, c, d){
              if(errCB)
                errCB(a, b, c, d);
            },
            headers : {
              'sentinela-token': `${j2E.ARDigital.api.ajax.accessToken.token}`,
              /*'X-KL-Ajax-Request': 'Ajax_Request'*/
            },
            /*beforeSend : function(xhr, set){
              delete set.accepts.xml;
              delete set.accepts.script;
              delete set.accepts.html;
            }*/
          });
        },
        getBlob : function(url, sucCB, errCB){
          return jQ3.ajax({
            url : url,
            type : 'get',
            dataType: 'blob',
            success : function(data, status, xhr){
              if(sucCB)
                sucCB(data, status, xhr);
            },
            error : function(a, b, c, d){
              if(errCB)
                errCB(a, b, c, d);
            },
            headers : {
              'sentinela-token': `${j2E.ARDigital.api.ajax.accessToken.token}`,
              /*'X-KL-Ajax-Request': 'Ajax_Request'*/
            },
            /*beforeSend : function(xhr, set){
              delete set.accepts.xml;
              delete set.accepts.script;
              delete set.accepts.html;
            }*/
            xhrFields: {
              responseType: 'blob' // Definir o responseType como 'blob'
            },
            contents: {
              blob: /blob/
            },
            converters: {
              //"text blob": true,
              "* blob": function( result ) {
                return result;
              }
            }
          });
        },
        post : function(url, data, sucCB, errCB, dataType){
          return jQ3.ajax({
            url : url,
            type : 'post',
            data : data,
            dataType: dataType || 'json',
            success : function(data, status, xhr){
              if(sucCB)
                sucCB( data, status, xhr);
            },
            error : function(a, b, c, d){
              if(errCB)
                errCB(a, b, c, d);
            },
            headers : {
              'sentinela-token': `${j2E.ARDigital.api.ajax.accessToken.token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              /*'X-KL-Ajax-Request': 'Ajax_Request'*/
            },
            /*beforeSend : function(xhr, set){
              delete set.accepts.xml;
              delete set.accepts.script;
              delete set.accepts.html;
            }*/
          });
        },
        put : function(url, data, sucCB, errCB, dataType){
          return jQ3.ajax({
            url : url,
            type : 'put',
            data : data,
            dataType: dataType || 'json',
            success : function(data, status, xhr){
              if(sucCB)
                sucCB( data, status, xhr);
            },
            error : function(a, b, c, d){
              if(errCB)
                errCB(a, b, c, d);
            },
            headers : {
              'sentinela-token': `${j2E.ARDigital.api.ajax.accessToken.token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
             /* 'X-KL-Ajax-Request': 'Ajax_Request'*/
            },
            /*beforeSend : function(xhr, set){
              delete set.accepts.xml;
              delete set.accepts.script;
              delete set.accepts.html;
            }*/
          });
        },
        setToken : token => j2E.ARDigital.api.ajax.accessToken = token
      },
      destinatarios : {
        consultar : function(destinatario, sucCB, errCB) {
          destinatario = encodeURI(destinatario.substr(0,49))

          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/destinatarios?_limit=300&_offset=0&indAtivo=A&nome=${destinatario}&_download=false`, 
            sucCB, errCB);
        },
        getById : function(destId, sucCB, errCB) {
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/destinatarios/${destId}`, 
            sucCB, errCB);
        },
        criar : function(destData, sucCB, errCB){
          destData = jQ3.extend({indAtivo : true}, destData);
          if(!j2E.ARDigital.util.validarEConformarDestinatarioCampos(destData)){

            errCB && errCB('Um ou mais campos não seguem suas regras de validação.')
            return jQ3.Deferred().reject('Um ou mais campos não seguem suas regras de validação.');
          }
          
          destData = JSON.stringify(destData)
          return j2E.ARDigital.api.ajax.post('https://sistemas.tjma.jus.br/ardigital-api/rest/destinatarios', 
            destData, sucCB, errCB);
          
        },
        alterar: function(destinatario, sucCB, errCB){
          destinatario = jQ3.extend({indAtivo : true}, destinatario);
          if(!j2E.ARDigital.util.validarEConformarDestinatarioCampos(destinatario)){

            errCB && errCB('Um ou mais campos não seguem suas regras de validação.')
            return jQ3.Deferred().reject('Um ou mais campos não seguem suas regras de validação.');
          }
          const idDestinatario = destinatario.id
          destinatario = JSON.stringify(destinatario)
          return j2E.ARDigital.api.ajax.put(`https://sistemas.tjma.jus.br/ardigital-api/rest/destinatarios/${idDestinatario}`, 
            destinatario, sucCB, errCB);
          
        }
      },
      plp : {
        listar : function(sucCB, errCB) {
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/plps?_limit=100&_offset=0&_download=false`, 
            sucCB, errCB);
        },
        listarCompleta: ()=> {
          const def = jQ3.Deferred()

          j2E.ARDigital.api.plp.listar()
          .done( resList => {
            const listasDaRespListar = resList[0].result
            const novaListaPLPsCompletas = []
            const promisses = []

            listasDaRespListar.forEach(lista=>{
              const getListaFullByIdDef = jQ3.Deferred()

              j2E.ARDigital.api.plp.getById(lista.id)
              .done(res=>{
                const plpCompleta = res[0].result
                plpCompleta.__J2E__ = {
                  plpSimpes: lista
                }
                
                getListaFullByIdDef.resolve()
              })
              .fail(err=>getListaFullByIdDef.reject)

              promisses.push(getListaFullByIdDef)
            })

            jQ3.when(...promisses)
            .done( ()=> def.resolve( novaListaPLPsCompletas ) )
            .fail(err => def.reject(err))
          })
          .fail( err => def.reject(err) )

          return def.promise()
        },
        criar : function(dataPostagem, objetos, sucCB, errCB) {
          
          var payload = {};
          payload.cartaoPostagem = j2E.ARDigital.util.getCartaoPostagem()
          payload.dtaPostagem = dataPostagem.toISOString()
          payload.objetos = objetos
          payload.remetente = j2E.ARDigital.util.getRemetente()
          payload.status = 'ABERTA'
          payload = JSON.stringify(payload)

          return j2E.ARDigital.api.ajax.post(`https://sistemas.tjma.jus.br/ardigital-api/rest/plps`, 
            payload, sucCB, errCB);
        },
        getById : function(idPlp, sucCB, errCB){
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/plps/${idPlp}`, 
            sucCB, errCB);
        },
        atualizar : function(plp, sucCB, errCB){
          let plpId = plp.id
          var payload = JSON.stringify(plp)
          return j2E.ARDigital.api.ajax.put(`https://sistemas.tjma.jus.br/ardigital-api/rest/plps/${plpId}`, 
            payload, sucCB, errCB);
        },
        imprimir: (idPlp, sucCB, errCB)=>{
          return j2E.ARDigital.api.ajax.getBlob(`https://sistemas.tjma.jus.br/ardigital-api/rest/plps/${idPlp}/impressao-lista-postagem`, 
            sucCB, errCB, 'blob');
        }
      },
      servicos : {
        verificarDisponibilidade : (cepDes, cepOrg, servico, sucCB, errCB) => {
          /**
           * codigoServico: 80888 //serviço usado
              cepOrigem: 65912901
              cepDestino: 53140080
          */
          servico = servico || 80888
          cepOrg = cepOrg || 65912901
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/plps/verificar-disponibilidade-servico?codigoServico=${servico}&cepOrigem=${cepOrg}&cepDestino=${cepDes}`, 
              sucCB, errCB);
          /**
           * Deve retornar {"resultado":"true"}
           */
        },
        servicosEct : function(sucCB, errCB){
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/servicos-ect?_limit=0&_offset=0`, 
            sucCB, errCB);
        },
        embalagens : function(sucCB, errCB){
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/embalagens?_limit=0&_offset=0`, 
            sucCB, errCB);
        },
        cartaoAtivoUnidade : function(sucCB, errCB){
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/cartoes-postagem/cartao-ativo-unidade`, 
            sucCB, errCB);
        },
        remetentes : function(sucCB, errCB){
          return j2E.ARDigital.api.ajax.get(`https://sistemas.tjma.jus.br/ardigital-api/rest/remetentes?nome=&_limit=100`, 
            sucCB, errCB);
        },
      }
    },
    util : {
      conformarEnderecoARDigigal : function(enderecoStringOrObjEnderecoFormat){
        if( typeof enderecoStringOrObjEnderecoFormat === 'string' ){
          const hashCode = enderecoStringOrObjEnderecoFormat.hashCode()
          enderecoStringOrObjEnderecoFormat = j2E.ARDigital.util.parseEnderecosFrameComunicacao(enderecoStringOrObjEnderecoFormat)
          enderecoStringOrObjEnderecoFormat.hashCode = hashCode
        }

        return jQ3.extend({
          "indPrincipal": false,
          "indAtivo": true
        }, enderecoStringOrObjEnderecoFormat )
      },
      validarEConformarDestinatarioCampos: destinatario =>{
        destinatario.nome.length > 50 && ( destinatario.nome = destinatario.nome.substr(0,49) )
        destinatario.enderecos.forEach((curr, idx) =>{
          curr.complemento && curr.complemento.length > 30 && ( curr.complemento = curr.complemento.substr(0,29) )  
        })

        return true;
      },
      parseEnderecosFrameComunicacao: endStr =>{
        function splitEnds(str) {
          const partes = str.split(/(?<=CEP:.*);/);
          return partes.map((parte) => parte.trim());
        }

        const ends = splitEnds(endStr)

        ends.forEach( (end, idx, ends) => {
          var pEnd = {
            uuid : guid()
          };
          var split1 = end.split(', ')
          var cidUfCepBlock = split1.pop();

          cidUfCepBlock = cidUfCepBlock.split(' - ')

          pEnd.cep = cidUfCepBlock.pop().split(': ')[1].replace('-','')
          pEnd.uf = cidUfCepBlock.pop()
          pEnd.cidade = cidUfCepBlock.join(' - ')
          /*pEnd.complemento = null
          pEnd.numero = null*/

          switch(split1.length){
            case 2:
              pEnd.logradouro = split1[0]
              pEnd.bairro = split1[1]
              break;
            case 3:
              pEnd.logradouro = split1[0]
              pEnd.numero = split1[1]
              pEnd.bairro = split1[2]
              break;
            
            default: // Rua Marechal, 1420, entre Pará e maranhão,  Beira Rio
              pEnd.bairro = split1.pop()
              
              pEnd.logradouro = split1.shift()
              pEnd.numero = split1.shift()
              pEnd.complemento = split1.join(', ')
              
              break;
          }

          ends[idx] = pEnd;
        })

        return ends.length === 1 ? ends[0] : ends;
      },
      stringifyParaEnderecosFrameComunicacao: enderecoObj =>{
        const separadosVirgula = []

        separadosVirgula.push(enderecoObj.logradouro)
        separadosVirgula.push(enderecoObj.numero)
        if(enderecoObj.complemento) separadosVirgula.push(enderecoObj.complemento)
        separadosVirgula.push(enderecoObj.bairro)
        const cep = enderecoObj.cep.substring(0, 5) + "-" + enderecoObj.cep.substring(5);
        separadosVirgula.push(`${enderecoObj.cidade} - ${enderecoObj.uf} - CEP: ${cep}`)

        return separadosVirgula.join(', ')
      },
      hashCodeDoEndereco: endereco =>{
        const parser = j2E.ARDigital.util.parseEnderecosFrameComunicacao
        const stringify = j2E.ARDigital.util.stringifyParaEnderecosFrameComunicacao

        let _endereco = (typeof endereco === "string" ? parser(parser) : endereco)

        return stringify(_endereco).toLowerCase().hashCode()
      },
      getCartaoPostagem : ()=>{
        return {
          "idUsuarioModificacao": 137851,
          "dthModificacao": "2020-09-10T13:01:41.000-0300",
          "indAtivo": true,
          "id": 114,
          "numeroCartao": "0066187478",
          "contrato": "9912319221",
          "anoContrato": 2018,
          "validade": "2023-03-04",
          "idUnidadeTrabalho": 1671,
          "unidadeTrabalho": null,
          "servicosVinculados": [
            {
              "idUsuarioModificacao": 137851,
              "dthModificacao": "2020-09-10T13:01:41.000-0300",
              "id": 185,
              "servico": {
                "idUsuarioModificacao": 203109,
                "dthModificacao": "2023-03-16T11:32:12.000-0300",
                "indAtivo": true,
                "id": 10,
                "idCorreios": 109480,
                "codigo": "80888",
                "descricao": "CARTA A FATURAR CHANCELA",
                "label": "80888 - CARTA A FATURAR CHANCELA"
              }
            },
            {
              "idUsuarioModificacao": 137851,
              "dthModificacao": "2020-09-10T13:01:41.000-0300",
              "id": 186,
              "servico": {
                "idUsuarioModificacao": 203109,
                "dthModificacao": "2023-03-16T11:32:46.000-0300",
                "indAtivo": true,
                "id": 4,
                "idCorreios": 124884,
                "codigo": "03298",
                "descricao": "PAC CONTRATO AGENCIA",
                "label": "03298 - PAC CONTRATO AGENCIA"
              }
            }
          ],
          "possuiPlpAssociada": null
        }
      },
      getRemetente : ()=>{
        return {
          "idUsuarioModificacao": 148007,
          "dthModificacao": "2022-06-06T08:24:44.000-0300",
          "indAtivo": true,
          "id": 3208,
          "nome": "2º JUIZADO ESPECIAL CÍVEL DE IMPERATRIZ",
          "idUnidadeTrabalho": 1671,
          "enderecos": [
            {
              "idUsuarioModificacao": 148007,
              "dthModificacao": "2022-06-06T08:24:44.000-0300",
              "indAtivo": true,
              "logradouro": "Avenida Prudente de Moraes, s/n",
              "numero": "S/N",
              "complemento": "FACIMP | Wyden",
              "bairro": "Parque Santa Lúcia",
              "cidade": "Imperatriz",
              "uf": "MA",
              "cep": "65912901",
              "id": 1761,
              "_presente": true
            }
          ]
        }
      },
      getDefaultServico : (destinatario, observacao, maoPropria)=>{
        return destinatario?.__J2E__?.objetoCorreiosAssociado || {
          j2EUUID : guid ? guid() : Math.random(),
          "idUsuarioModificacao": 148007,
          "dthModificacao": new Date().toISOString(),
          "destinatario": destinatario,
          "servico": {
              "idUsuarioModificacao": 203109,
              "dthModificacao": "2023-04-28T08:14:12.000-0300",
              "indAtivo": true,
              "id": 11,
              "idCorreios": 1,
              "codigo": "80888",
              "descricao": "CARTA RG AR DIG PL3 CHANCELA",
              "label": "80888 - CARTA RG AR DIG PL3 CHANCELA"
          },
          "observacao": observacao || "(...)",
          "embalagem": {
              "idUsuarioModificacao": 137851,
              "dthModificacao": "2020-09-01T09:29:54.000-0300",
              "indAtivo": true,
              "id": 21,
              "descricao": "envelope",
              "tipo": "PACOTE_CAIXA",
              "peso": 1,
              "altura": 2,
              "largura": 11,
              "comprimento": 18,
              "diametro": null,
              "observacao": null
          },
          "registroNacional": true,
          "avisoRecebimento": true,
          "maoPropria": maoPropria || false,
          "etiqueta": null,
          "status": null,
          "disponibilidadeServico": null,
          "cartaComercialSimples": false,
          "idv": "51"
        }
      },
      conformObjtoToAddInPLP : (objeto)=>{
        ['idUsuarioModificacao',
         'dthModificacao', 
         'etiqueta', 
         'status', 
         'disponibilidadeServico', 
         'cartaComercialSimples', 
         'idv'
        ].forEach( _it => {
          objeto[_it] && ( delete objeto[_it] )
        })

        return objeto
      },
      compararObjetosCorreios : (objA, objB)=>{
        return objA.destinatario.id 
               === 
               objB.destinatario.id
               &&
               objA.destinatario.enderecos[0].id 
               === 
               objB.destinatario.enderecos[0].id
      },
      propriedadesAlteradas : (objA, objB)=>{
        const propriedadesEditaveis = ['maoPropria', 'observacao']
        const propriedadesAlteradas = []

        propriedadesEditaveis.forEach(propriedade=>{
          if( objA[propriedade] !== objB[propriedade])
            propriedadesAlteradas.push(propriedade)
        })

        return propriedadesAlteradas
      },
      storeServicosData : () =>{
        var __this = j2E.ARDigital.api.servicos
        var deferred = jQ3.Deferred()
        var servPromises = []

        j2E.env.ARDigitalData = {}

        
        servPromises.push( __this.cartaoAtivoUnidade()
          .done( result => j2E.env.ARDigitalData.cartaoAtivoUnidade = result )
        )
        servPromises.push( __this.remetentes()
          .done( result => j2E.env.ARDigitalData.remetentes = result )
        )
        servPromises.push( __this.embalagens()
          .done( result => j2E.env.ARDigitalData.embalagens = result )
        )
        

        jQ3.when(...servPromises)
        .done( ()=> deferred.resolve() )
        .fail( (prom, reas)=> deferred.reject(prom, reas) )

        return deferred.promise()
      },
      compararObjetosEnderecoFormat: (obj1, obj2) =>{
          if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return false;
          }
          
          const propriedades = ['bairro', 'cep', 'cidade', 'complemento', 'logradouro', 'numero', 'uf'];
          
          for (let propriedade of propriedades) {
              if (!!obj1[propriedade] && !!obj2[propriedade] && obj1[propriedade] !== obj2[propriedade]) {
                  return false;
              }
          }
          
          return true;
      }
    }
  }

  j2E.Expedientes = {
    util : {
      /**
       * Faz parse ds informações do expediente a partir
       * do input selecionado na tabela de expedientes do 
       * processo
       * @param {*} $input 
       */
      parseLinhaDeExpedientesSelecionados : ($inputs)=>{
        function _converterParaISO(dataHora) {
          const [dia, mes, ano, horas, minutos, segundos] = dataHora.split(/\/|:|\s/);
          const dataISO = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}Z`;
          return dataISO;
        }
        function _extrairUltimaDataHora(html) {
          const regex = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/g;
          let ultimaDataHora = null;
          let match;
          while ((match = regex.exec(html)) !== null) {
            [ultimaDataHora] = match;
          }
          return ultimaDataHora;
        }
        function _extrairPrazo(html) {
          let regex = /Prazo:\s*(\d+)\s*(\w+)/;
          let resultado = regex.exec(html);
        
          if (resultado !== null) {
            let valorNumerico = resultado[1];
            let palavraSeguinte = resultado[2];
        
            return { prazo: valorNumerico, computo: palavraSeguinte };
          } else {
            return null;
          }
        }
        function _extrairUltimoValorNumerico(linkParaAto) {
          let regex = /\d+(?![\d\s\S]*\d)/;
          let resultado = regex.exec(linkParaAto);

          
          let [ultimoValorNumerico] = resultado ? resultado : [undefined]
          return ultimoValorNumerico;
        }


        var dadosExpedientes = []
        $inputs.forEach((el)=>{
          var $el = jQ3(el)
          var $tr = $el.parents('tr:first')
          var exp = {}
          var html = $tr.html()

          exp.data    = _extrairUltimaDataHora(html)
          exp.dataEm  = `em ${exp.data}`
          exp.dataISO = _converterParaISO(exp.data)
          let prazo   = _extrairPrazo(html)
          if(prazo) { 
            exp.computo = prazo.computo;
            exp.prazo   = prazo.prazo;
          }else
            exp.prazo = 'não aplicado'
            
          exp.parte   = $tr.find('h6:first').text();
          [exp.idExpediente]   = $tr.find('h6').prev().text().trim().match(/(\d+)/);
          exp.linkParaAto = $tr.find('a[title="Visualizar ato"]').attr('href');
          exp.idDocumento = _extrairUltimoValorNumerico(exp.linkParaAto);
          exp.idDocumentoLink = j2E.Expedientes.util.criarViewLinkHTMLAPartirDoEnderecao(exp.linkParaAto, exp.idDocumento)

          dadosExpedientes.push(exp)
        })

        return dadosExpedientes
      },
      criarViewLinkHTMLAPartirDoEnderecao : (_linkAto, _idDocumento)=>{
        var imgViewCln = jQ3('<img src="https://pje.tjma.jus.br/pje/img/view.gif" style="vertical-align: bottom;">')[0];

        
        imgViewCln.style.height = '12px';
        imgViewCln.style.verticalAlign = 'bottom';

        var spn = document.createElement('span');
        var u = document.createElement('u');
        spn.style.cursor = 'pointer';
        spn.title = `Abrir documento id ${_idDocumento}` 
        spn.setAttribute('contenteditable', false);
        u.innerHTML = `id ${_idDocumento}`;


        var oCSrc = 'window.open(\'' + _linkAto + '\', ' + _idDocumento + ' + \'popUpDocumento\', \'width=780, height=740, scrollbars=yes\').focus();';

        spn.setAttribute('onclick', oCSrc);
        imgViewCln.setAttribute('onclick', oCSrc);

        spn.appendChild( u );
        u.appendChild( imgViewCln );

        return spn.outerHTML
      },
      enumerarParteEVencimentoDoExpediente: (exp)=>{
        return `${exp?.parte ? exp.parte : '[ERRO AO PROCESSAR PARTE]'} em ${exp?.data ? exp.data : '[ERRO AO PROCESSAR DATA]'}`
      },
      enumerarParteEVencimentoDoExpedientes: (exps)=>{
        var _enumerarParteEVencimentoDoExpediente = j2E.Expedientes.util.enumerarParteEVencimentoDoExpediente
        var _exps = []
        
        exps.forEach(exp=>{
          _exps.push(_enumerarParteEVencimentoDoExpediente(exp))
        })

        return _exps.joinListE()
      }
    }
  }

  async function observeParaARDigital(){
    const currentUser = await obterCurrentUser()
    j2E.env.currentUser = currentUser
    
    if(currentUser.login !== '00641805306')
      return

    var idProc = j2E.env.urlParms.idProcesso,	
        idTask = j2E.env.urlParms.newTaskId,	
        PACTarefas = [
          'Preparar intimação',
          'Preparar citação e(ou) intimação',
          'Preparar citação',
          'Imprimir Correspondência_'
        ],
        checkedEnderecos = 0,
        deferPLPQuery,
        numeroUnicoProcesso,
        objetoDescricaoPadrao = 'Intimação';
    
    const ___delayCall = new DelayedCall(150, 500);

    const toaster = (a, msg, severity)=> { 
      jQ3.Toast ? jQ3.Toast(a, msg, severity) : alert(`${severity.toUpperCase()}: ${msg}`) 
    }

    const armazenamento = j2E.mods.Armazenamento 

    function _obterDestinatarioAtual($trDoDestinatario){ 
      if( $trDoDestinatario )
        return {
          nome: $trDoDestinatario.find('td:nth-child(2)').text().trim().toUpperCase(),
          documento: $trDoDestinatario.find('td:nth-child(3)').text().trim()
        }


      let textNomeParte = jQ3(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:enderecosPanel_header`).text().split(' - ')
      textNomeParte.shift()
      textNomeParte = textNomeParte.join(' - ').trim()

      const textDocumentoParte = jQ3(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:tabelaDestinatariosEndereco\\:tb td:contains(${textNomeParte})`).next().text().trim()

      return {
        nome: textNomeParte,
        documento: textDocumentoParte
      }
    }

    function _resolverSeListaDeveSerExibidaNaView(plp, VIEW, matachedList){
      switch(VIEW){
        case 'DEFINICAO_ENDERECO':
          return plp.status === 'ABERTA' || matachedList?.id == plp.id

        case 'PREPARAR_ATO':
        case 'IMPRIMIR_CORRESPONDENCIA':
          return matachedList?.id == plp.id
      }
    }

    //obtem dados compleos do processo
    j2EPJeRest.processo.getDadosCompletos(idProc)
    .done( dados=>{
      numeroUnicoProcesso = dados.result.dadosBasicos.numero.value
      j2E.env.dadosCompletosProcesso = dados.result
    })  
    .fail(()=>{
      numeroUnicoProcesso = '0000000-00.0000.0.00.0000'
    })

    //obtem a descrição no fluxo para determinar a implantação
    j2EPJeRest.tarefas.descricaoNoFluxo(idTask, idProc, function(data){	
      if(!(data.length))
        return;
      
      if(PACTarefas.indexOf(data[data.length-1]) < 0)
        return;
      
      j2E.env.task = {
        tree : data,
        name : data[data.length-1],
        hash : data[data.length-1].toLowerCase().hashCode()
      }

      //Verifica a persistência para o processo e PLP associadas, quando houver
      deferPLPQuery = jQ3.Deferred()
      armazenamento.obter(`Processo:${idProc}`) // `p-#${idProc}#` antigo
      .then(dadosProcesso =>{

     /* })

      j2E.SeamIteraction.alertas.acoes.pesquisarAlertaELiberarAView(`p-#${idProc}#`)
      .done( dadosProcesso => { */

        if (! (dadosProcesso)){
          jQ3.extend(j2E.env,  { // antigo const emptyAlerta =  `{"p-#${idProc}#":{"id":"${idProc}","PLP":[]}}`
            [`Processo:${idProc}`]: {
              id: idProc,
              PLP: []
            }
          })
          j2E.env.PLP = []

          deferPLPQuery.resolve( j2E.env.PLP )
          return;
        }
        
        jQ3.extend(j2E.env,  { [`Processo:${idProc}`]:  dadosProcesso } ) 

        if ( ! (j2E.env[`Processo:${idProc}`].PLP ) ){
          j2E.env.PLP = []

          deferPLPQuery.resolve( j2E.env.PLP )
          return;
        }

        var promisses = []
        
        j2E.env[`Processo:${idProc}`].PLP.forEach( (idPlp, idx) => {
          let _prom = armazenamento.obter(`PLP:${idPlp}`)
          .then( plpJson =>{  /* }) 
          let _prom = j2E.SeamIteraction.alertas.acoes.pesquisarAlertaELiberarAViewEmCadeia(`plp*-#${plp}#`)
          .done( plpJson => {*/
            if (! plpJson)
              return;

            if( ! (j2E.env.PLP ))
              j2E.env.PLP = []

            //const plpParsed = /*JSON.parse(plpJson)*/ plpJson
            //if(plpParsed[`PLP:${idPlp}`]?.ECPJe)
            if(plpJson?.ECPJe)
              return;

            //j2E.env.PLP.push( plpParsed[`PLP:${idPlp}`] )   
            j2E.env.PLP.push( plpJson )   
          })
          promisses.push(_prom)
        })
        
        jQ3.when(...promisses).done( ress => deferPLPQuery.resolve( j2E.env.PLP ) )
        
      })  

      //Implantará quando visualizar os paineis na view
      //  painel de quando o usuário tem de selecionar o endereço da parte
      const initializeSelector = `${j2E.env.task.name !== 'Imprimir Correspondência_' ? '.rich-panel-header' : '.rich-panel-body'}:not([j2-inicializado])`
      jQ3.initialize(initializeSelector, function(){
        const $div = jQ3(this);
        let TAREFA_VIEW = ''
        const defMatchingListFound = jQ3.Deferred()

        if ($div.text().toLowerCase() === 'definição de endereços')
          TAREFA_VIEW = 'DEFINICAO_ENDERECO'
        else if ($div.text().toLowerCase() === 'ato de comunicação')
          TAREFA_VIEW = 'PREPARAR_ATO'
        else if (
          j2E.env.task.name === 'Imprimir Correspondência_'
          &&
          $div.find(`#taskInstanceForm\\:Processo_Fluxo_expedientes_correios-${idTask}\\:atividadeRegion\\:status`).length
        )
          TAREFA_VIEW = 'IMPRIMIR_CORRESPONDENCIA'
        else
          return;
        
        $div.attr('j2-inicializado', '')
        if (  TAREFA_VIEW === 'DEFINICAO_ENDERECO' ){
          if( ! ($div.parent().find('td:nth-child(4)').text().toLowerCase().includes('correios')) )
            return

          //prepara a observação de quando o  uusário irá ativar endereços adicionais            
          jQ3.initialize(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:tabelaEnderecosPessoa\\:tb`, function(){
            const $chk = jQ3(this)

            if ( $chk.data('onInitializeOnce') )
              return
            
            $chk.data('onInitializeOnce', true)


            checkedEnderecos = 0

            //const endsSelectedByUser = []
            const mapEnderecos = new Map()

            function trTimeToDateTimeLong(trTime){
              if(!trTime.length)
                return 0

              if(! trTime.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/))
                return -1

              const [dia, mes, anoA, anoB, hora, min, seg] = trTime.match(/\d{2}/g)
              const isoString = `${anoA}${anoB}-${mes}-${dia}T${hora}:${min}:${'00'}Z`
              return new Date(isoString).getTime()
            }

            function __triage($target, event){
              const $tr = $target.parents('tr')
              const enderecoAtual = $tr.find('td:nth-child(3)').text().trim()

              let elMappedCurrentEnderecoHash = mapEnderecos.get( enderecoAtual.hashCode() )
              if( ! elMappedCurrentEnderecoHash ){
                elMappedCurrentEnderecoHash = []
                mapEnderecos.set(enderecoAtual.hashCode(), elMappedCurrentEnderecoHash)
              }
              elMappedCurrentEnderecoHash.push({
                $tr, 
                tempo: trTimeToDateTimeLong($tr.find('td:nth-child(4)').text().trim())
              })

              if (!($target.is('input') && $target.is(":checked") && $target.prop('id').match(/taskInstanceForm:Processo_Fluxo_prepararExpediente-\d+:tabelaEnderecosPessoa:\d+:check/)))
                return;
              
              if(event)
                event.preventDefault()

              if( $tr.is("[j2-with-linked-tr]") )
                return;
              $tr.attr('j2-with-linked-tr', 'sim')

              const $tbody = $target.parents('tbody')
              $tbody.prepend($tr)

              var data = {
                destinatario : _obterDestinatarioAtual(),
                endereco : enderecoAtual
              }

              /*endsSelectedByUser.push({
                data : data,
                $tr: $tr,
                $target: $target
              })*/

            }
            
            $chk.find('input').each((idx, el)=>{
              __triage(jQ3(el))
            })

            mapEnderecos.forEach((elMappedArray, chave) => {
              // se houver elemento checado, trazer para o topo
              // se houver mais de un no mesmo set, o segundo em diante será 
              // removido posteriormente abaixo
              elMappedArray.filter(el => el.$tr.find('input').is(':checked') )
              .forEach(el => el.tempo = Number.MAX_VALUE)
              
              elMappedArray.sort((a, b)=> b.tempo - a.tempo)

              elMappedArray.shift()
              elMappedArray.forEach( el => el.$tr.remove() )
            });

            // se a lista de postagem que bate com o processo existir e estiver fechada, não necessita executar esse procedimento
            if( j2E.env?.obtidaMatachedList?.plp?.status === 'FECHADA' ){
              $chk.find('input').each((idx, el)=>{
                jQ3(el).attr('disabled', 'true')
              })

              if( ! jQ3('#warning-lista-enderecos').length ){
                const $parentsTable = $chk.parents('table')
                const $_div = jQ3('<div id="warning-lista-enderecos">')

                $parentsTable.parent().prepend($_div)
                $_div.append( j2EUi.createWarnElements(`
                    A lista de postagem associado ao processo já está fechada. 
                    Não é possível realizar alterações para preservar 
                    a integridade dos dados compartilhados entre os sistemas.
                  `)
                )
              }

              return
            }

            /*setTimeout(()=>{
              const arrayChecados = Array.from($chk.find('input:checked')).map(ip => ip.id.split(':').at(3))
              const viewIdProc = jQ3('#javax\\.faces\\.ViewState').val()
              j2E.SeamIteraction.processo.acoes.salvarAsSelecoesEnderecoPAC(viewIdProc, idTask, arrayChecados)
            }, 1000)*/
          })

          jQ3.initialize(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:tabelaDestinatariosEndereco\\:tb td:nth-child(6)`, function(){
            const $tdEnderecos = jQ3(this)
            if ( $tdEnderecos.data('onInitializeOnce') )
              return
            
            $tdEnderecos.data('onInitializeOnce', true)
            
            if( ! $tdEnderecos.prev().prev().text().toLowerCase().includes('correios') )
              return

            $tdEnderecos.prev().find('input').attr('disabled', '')
            const $trDoDestinatario = $tdEnderecos.parent()

            const _handleConstrucaoObjetosDoUsuario = ()=>{
              const __deffaultFail = (jqXHR, textStatus, errorThrown) => { 
                console.error("AR Digital", `Falha ao consultar o destinatário. (${ errorThrown || ''})`, "error")
                console.error(jqXHR, textStatus, errorThrown)

                j2EUi.richModal(false)
                toaster("AR Digital", `Falha ao consultar o destinatário. (${ errorThrown || ''})`, "error") 
              }

              $addButton.hide()
              endPanelsArray.forEach( endPanel => { 
                endPanel.$panel.find('[j2-nao-inc-plp]').remove() 

                const $containerObjetoPanel = jQ3('<div j2-container-objeto-panel >')
                $containerObjetoPanel.append( j2EUi.spinnerHTML() )
                endPanel.$panel.$body.append( $containerObjetoPanel )
              })
              
              j2EUi.richModal(true)
              j2E.ARDigital.api.destinatarios.consultar( _obterDestinatarioAtual($trDoDestinatario).nome )
              .done(resp => {
                endPanelsArray.destConsulta = resp
                
                const destDefs = resp.result.map(destId => {
                  return j2E.ARDigital.api.destinatarios.getById(destId.id)
                  .done(destCompleto =>{
                    destId.enderecos = destCompleto.enderecos
                  })
                })

                jQ3.when(...destDefs)
                .done(()=> {
                  _treatDestinatarioEEnderecoARDigital(endPanelsArray)
                })
                .fail(__deffaultFail)
              })
              .fail(__deffaultFail)
            }
            
            const endPanelsArray = []
            endPanelsArray.$trDoDestinatario = $trDoDestinatario
           


            const $tdEndClone = $tdEnderecos.clone(true)

            $tdEnderecos.empty()

            const $panelPai = j2EUi.createPanel('[SEM HEADER]', null, 'j2-ARDigital-destinatario-enderecos' )
            const $addButton = j2EUi.createButton({
              textoButton: 'Adicionar à PLP',
              classButton: 'btn-sm btn-primary',
              callback: ()=>{
                $addButton.hide()
                _handleConstrucaoObjetosDoUsuario()
              },
            })
            $tdEnderecos.append($panelPai)


            const $endsTexts = $tdEndClone.contents().filter(function() {
              return this.nodeType === Node.TEXT_NODE;
            }).each(function(){
              const $text = jQ3(this)

              const objEndForm = j2E.ARDigital.util.conformarEnderecoARDigigal($text.text())
              const objEndFormAlt = __verificarSeExistemAlteracoesNoEnederecoFeitoLocalmente( { ...objEndForm } )
              const dataSetObjectPje = {
                destinatario : _obterDestinatarioAtual($trDoDestinatario),
                endereco : $text.text(),
                objEnderecoFormat: objEndForm,
                objEnderecoFormatAlterado: objEndFormAlt,
                _altLocal: !!objEndFormAlt._altLocal
              }
              
              const $spanNaoAdd = jQ3('<span j2-nao-inc-plp >Não incluída à PLP</span>')
              const $panel = j2EUi.createPanel($text.text(), $spanNaoAdd, 'j2-ARDigital-destinatario-endereco-panel' )

              $panelPai.$body.append($panel)
              endPanelsArray.push({
                data: dataSetObjectPje,
                $panel: $panel,
                $text: $text,
                $tdEnderecos: $tdEnderecos,
                $trDoDestinatario: $trDoDestinatario
              })
            })

            $panelPai.$body.append($addButton)
            if($endsTexts.length === 0 )
              $addButton.attr('disabled', '')
            
            defMatchingListFound.done( _handleConstrucaoObjetosDoUsuario )

            evBus.on('on-select-a-plp', function(ev, data){
              if( data.EValida )
                $addButton.removeAttr('disabled')
              else
                $addButton.attr('disabled', '')
            })

            _avaliarSeEListaValida()
          })
        }

        if (  TAREFA_VIEW === 'PREPARAR_ATO' ){
          if( ! ($div.parent().find('td:nth-child(6)').text().toLowerCase().includes('correios')) )
            return

          //quando for encontada a matatched list do processo
          defMatchingListFound.done((obtidaMatachedList)=>{
            if(obtidaMatachedList?.plp?.status !== 'FECHADA')
              return

            function ____resolveDestinatarioDaTdDaView($tdDesinatario){
              const text = $tdDesinatario.text().trim()
              const nome = text
              const endereco = null
              const hash = text.hashCode()
              
              return {
                nome,
                endereco,
                hash
              }
            }

            jQ3.initialize(`#taskInstanceForm\\:Processo_Fluxo_prepararExpediente-${idTask}\\:tabelaDestinatarios`, function(){
              const $thisTable = jQ3(this)
              let algumaAlteracaoRealizada = false
              const objetosAssociadosAListaEProcessoETarefa = 
              obtidaMatachedList.plpCompleta.objetos.filter( 
                ob => obtidaMatachedList.store.objs.some(
                  obs=> obs.objetoIdNaPLP === ob.id 
                  && obs.idProcesso === parseInt(idProc) 
                  && obs.task.name === j2E.env.task.name ))
  
  
              $thisTable.find('tr').each((idx, el)=>{
                const $tr = jQ3(el)
                if( ! ($tr.find('td:nth-child(6)').text().toLowerCase().includes('correios')) )
                  return
                
                algumaAlteracaoRealizada = true
  
                const destinatario = ____resolveDestinatarioDaTdDaView($tr.find('td:nth-child(3)'))
                const objetosDesintario = objetosAssociadosAListaEProcessoETarefa.filter( 
                  ob => ob.destinatario.nome.trim().hashCode() === destinatario.hash )
  
                if( ! destinatario.endereco ){
                  const $lastTr = $tr.find('td:nth-child(6)')
                  const $lastTrCloned = $lastTr.clone(true)
                  const $_span = $lastTrCloned.find('span')
  
                  $_span.text( objetosDesintario[0]?.etiqueta?.etiqueta || '' )
                  $tr.attr('j2e-etiqueta-objeto-etiqueta', 
                    objetosDesintario[0]?.etiqueta.etiqueta )
                  $tr.attr('j2e-etiqueta-objeto-mao-propria', 
                    objetosDesintario[0]?.maoPropria )
  
  
                  $tr.find('td:nth-child(6)').after($lastTrCloned)
                }else{
                  return
                }

                $tr.find('td:first-child i.fa-pencil').parent().click(()=>{
                  lockrSes.set('ar-digital-integrecao-info-objeto', { 
                    etiqueta: objetosDesintario[0] 
                      ? objetosDesintario[0]?.etiqueta.etiqueta
                      : null,
                    maoPropria: objetosDesintario[0] 
                      ? objetosDesintario[0]?.maoPropria
                      : false
                  })
                })
              })
              
              if( algumaAlteracaoRealizada){
                //tratar cabeçalho
                const $trThead = $thisTable.find('thead tr')
                const $lastThThead = $trThead.find('th:last-child')
                const $thARCloned = $lastThThead.clone(true)
                const $_div = $thARCloned.find('div')
  
                $_div.text( 'Nº Etiqueta AR')
  
                $trThead.find('th:nth-child(6)').after($thARCloned)

                //tratar linhas que não sou correios
                $thisTable.find('tr').each((idx, el)=>{
                  const $tr = jQ3(el)
                  if( ($tr.find('td:nth-child(6)').text().toLowerCase().includes('correios')) )
                    return

                  const $lastTr = $tr.find('td:nth-child(6)')
                  const $lastTrCloned = $lastTr.clone(true)
                  const $_span = $lastTrCloned.find('span')
  
                  $_span.text( '' )
  
  
                  $tr.find('td:nth-child(6)').after($lastTrCloned)

                  $tr.find('td:first-child i.fa-pencil').parent().click(()=>{
                    lockrSes.set('ar-digital-integrecao-info-objeto', { 
                      etiqueta: null,
                      maoPropria: false
                    })
                  })
                })
              }
            }, {
              target: $div.parent().parent()[0]
            })

          })
        }

        //obter chave de acesso para prosseguir  
        __sendMessageToServiceWorder({
          j2Action: 'getSharedMessage',
          from: 'https://sistemas.tjma.jus.br',
          messageName : 'sentinelaToken'
        }, respBackground => {
          if (jQ3('[j2-ardigital-panel]').length){
            if(respBackground.j2Action === 'getSharedMessageResponse')
              j2E.ARDigital.api.ajax.setToken(respBackground.response.message)
            
            const avaliacaoListaValida = _avaliarSeEListaValida(undefined, false, true)
            if(avaliacaoListaValida.EValida){
              if(avaliacaoListaValida.$el.is('[disabled]'))
                defMatchingListFound.resolve()
            }

            return;
          }  
            
          //insere um separdor
          $div.parent().parent().prepend('<span style="font-size: 5px;">&nbsp;</span>');
          //Cria o painel do AR Digital na View
          const ARDigitalPanel = j2EUi.createPanel('AR Digital',(function(){
            //view se não existe token de acesso ao AR Digital
            if(respBackground.j2Action !== 'getSharedMessageResponse'){
              return j2EUi.createWarnElements(`
                Não localizado o token de acesso ao ARdigital. Acesse o sistema
                <a href="https://sistemas.tjma.jus.br" target="_blank">https://sistemas.tjma.jus.br</a>
                `)
            }
            
            //Guarda o token de acesso
            j2E.ARDigital.api.ajax.setToken(respBackground.response.message)
            j2E.env.extAccToken = respBackground.response.message
            
            j2EUi.richModal(true)
            return j2EUi.spinnerHTML()
          })(), 'j2-ARDigital-panel')
          $div.parent().parent().prepend( ARDigitalPanel )

          
          //Se não obteve resposta satisfativa do background, retorne
          if(respBackground.j2Action !== 'getSharedMessageResponse')
            return;

          ARDigitalPanel.$content = ARDigitalPanel.find('[j2-ui-content]')
          
          //Defers necessários
          var deferPLPListar = j2E.ARDigital.api.plp.listar()
          var promiseStoreServicos = j2E.ARDigital.util.storeServicosData()
          
          //quando consultar a persistencia, listar as PLP do AR digital e o armazenamento de serviços
          jQ3.when( deferPLPListar, deferPLPQuery, promiseStoreServicos)
          .done ((res, storedPLPs)=>{
            const resPlps = res[0].result

            //obter as listas que combinam com a persistencia
            let matachedList
            storedPLPs && resPlps.some(item =>  { 
              return j2E.env.PLP.filter(item2 => { 
                if( item2.id !== item.id )
                  return false;
                
                matachedList = {
                  id : item.id,
                  plp : item,
                  store : item2
                }
                j2E.env.obtidaMatachedList = matachedList
                
                return true
              }).length !== 0 } 
            ) 
            
            //criar a tabela pra o painel do AR Digital
            var tableSet = [
              [ '<img src="/pje/img/toolbox.png" title="Seleciontar lista de postagem ou criar nova">', 
                'Nº PLP', 'id', 'Usuario',  'Objetos', 'Data de postagem' ]
            ]

            const defConsultaListasPromisses = []
            resPlps.forEach( async plp =>{
              if ( _resolverSeListaDeveSerExibidaNaView(plp, TAREFA_VIEW, matachedList) ){
                const def = jQ3.Deferred()
                defConsultaListasPromisses.push(def)

                const inpChk = jQ3(`<input id="plp-${plp.id}" class="checkbox " type="radio" name="radio-plp" ${ matachedList ? 'disabled="disabled"' : ''}  ${ matachedList?.id == plp.id ? 'checked="checked"' : ''} />`)
                
                const plpCompleta = await j2E.ARDigital.api.plp.getById(plp.id)
                plp.__J2E__ = { plpCompleta }

                inpChk.data('j2E', {
                  plp : plp,
                  matachedList : matachedList?.id == plp.id ? matachedList : null,
                  plpCompleta
                })
                if( matachedList?.id == plp.id )
                  matachedList.plpCompleta = plpCompleta

                const dtaPostagem = plp.dtaPostagem.split('T')[0].split('-').reverse().join('/')
                tableSet.push([inpChk, plp.numeroPlp, plp.id, plpCompleta.matriculaCriador, plp.qtdeObjetos, dtaPostagem ])
                def.resolve()
              }
            })
           
            jQ3.when(...defConsultaListasPromisses)
            .done(()=>{
              //criar elementos para criar nova lista de postagem
              if(TAREFA_VIEW === 'DEFINICAO_ENDERECO' && !matachedList){
                let hoje = new Date().toISOString().split("T")[0]
                var inpChk = `<input id="plp-new" class="checkbox" type="radio" name="radio-plp" ${ matachedList ? 'disabled="disabled"' : ''} />`
                var inpDat = `<input id="plp-date" class="form-control" type="date" min="${hoje}" ${ matachedList ? 'disabled="disabled"' : ''} />`
                tableSet.push([inpChk, '', '', '', 'Criar uma nova lista de postagem', inpDat])
              }

              //finalizando o painel do AR Digital
              let uiTable = j2EUi.createTable(tableSet)
              ARDigitalPanel.$content.empty()
              ARDigitalPanel.$content.append( uiTable )
              uiTable.find('input:checked').parents('tr').find('td').addClass('success')

              let uiComplement
              if( TAREFA_VIEW === 'DEFINICAO_ENDERECO'){
                uiComplement = false
                if( matachedList?.plp.status === 'FECHADA' )
                  uiComplement = j2EUi.createWarnElements(`
                    A lista de postagem associada ao processo já está fechada.
                  `)
              }
              if( TAREFA_VIEW === 'PREPARAR_ATO'){
                if(! matachedList)
                  uiComplement = j2EUi.createWarnElements(`
                    Nenhuma lista de postagem associada ao processo. Retorne para DEFINIR ENDEREÇOS e crie a lista.
                  `)
                else if( matachedList.plp.status !== 'FECHADA' )
                  uiComplement = j2EUi.createWarnElements(`
                    A lista de postagem associada a este processo não foi fechada e enviada. Acesse o sistema para realizar o fechamento.
                    <a href="https://sistemas.tjma.jus.br" target="_blank">https://sistemas.tjma.jus.br</a>
                  `)
                else if( matachedList.plp.status === 'FECHADA' )
                  uiComplement = false
              }
              if( TAREFA_VIEW === 'IMPRIMIR_CORRESPONDENCIA'){
                if( matachedList ){
                  uiComplement = jQ3('<div>')
                  const $panel = j2EUi.createPanel('Ações para PLP')

                  uiComplement.append('<span style="font-size: 5px;">&nbsp;</span>');
                  uiComplement.append($panel);

                  $panel.$body.append(j2EUi.createButton({
                    classButton: 'btn-primary',
                    callback: ()=>{
                      j2E.ARDigital.api.plp.imprimir(matachedList.id)
                      .done( resBlob => { 
                        downloadBlob(resBlob, `j2e-plp-${matachedList.plp.numeroPlp}.pdf`)
                        toaster("AR Digital", `PLP baixada.`, "success") 
                      } )
                      .fail( err => { 
                        toaster("AR Digital", `Erro ao imprimir a lista de postagem. (${err.responseText})`, "error") 
                      } )
                    },
                    textoButton: 'Baixar PLP associado ao processo'
                  }))

                  $panel.$body.append(j2EUi.createButton({
                    classButton: 'btn-danger',
                    callback: async (ev)=>{
                      const confirm = (texto) => window.confirm(texto)

                      if(!confirm('Encerrar o controle da PLP? Esta ação não pode ser desfeita e eventualmente pode comprometer outros objetos/processos da sau lista de postagem'))
                        return;

                      j2EUi.richModal(true)

                      
                      try {
                        const alertaAsPLPJson = await armazenamento.obter(`PLP:${matachedList.id}`)
                        // flag para indicar ecerramento controle pje - ECPje
                        alertaAsPLPJson.ECPJe = true
                        await armazenamento.guardar(`PLP:${matachedList.id}`, alertaAsPLPJson)

                        toaster("AR Digital", `Controle de PLP via PJe encerrado`, "success")
                        jQ3(ev.target).attr('disabled', 'true')
                      } catch (error) {
                        toaster("AR Digital", `Falha encerrar a PLP. (${ err || ''})`, "error")
                      } finally {
                        j2EUi.richModal(false)
                      }
                      
                      
                      /*
                      j2E.SeamIteraction.alertas.acoes.pesquisarAlerta(`plp*-#${matachedList.id}#`)
                      .pipe((alertaAsPLPJson, _, acoes, requestsIteractions) =>{
                        const PLPParsed = JSON.parse(alertaAsPLPJson)
                        // flag para indicar ecerramento controle pje - ECPje
                        PLPParsed[`plp*-#${matachedList.id}#`].ECPJe = true 
                        const PLPAlteradoStringified = JSON.stringify(PLPParsed)
                        return acoes.alterarAlertaEncontrado(requestsIteractions,  PLPAlteradoStringified)
                      })
                      .done(res=>{
                        toaster("AR Digital", `Controle de PLP via PJe encerrado`, "success")
                        jQ3(ev.target).attr('disabled', 'true')
                      })
                      .fail(err =>{
                        toaster("AR Digital", `Falha encerrar a PLP. (${ err || ''})`, "error")
                      })
                      .always(()=>{
                        j2EUi.richModal(false)
                      })*/
                    },
                    textoButton: 'Encerrar controle da PLP via PJe'
                  }))
                }
              }
              uiComplement & ARDigitalPanel.$content.append( uiComplement )

              if ( matachedList ){
                defMatchingListFound.resolve( matachedList )
                lockrSes.set('ar-digital-integrecao-info-plp', { 
                  numeroPlp: matachedList.plp.numeroPlp,
                  dtaPostagem: matachedList.plp.dtaPostagem 
                })
              }else
                defMatchingListFound.reject()
            })
            //remover bloqueio
            .always(()=> j2EUi.richModal(false))
          })

          //painel em caso de falha
          deferPLPListar.fail(errRes=>{
            ARDigitalPanel.$content.empty()
            ARDigitalPanel.$content.append(j2EUi.createWarnElements(`
              Erro ao recuperar as PLP's no AR Digital. (${errRes})
            `));
          })

          //registrar ouvidor de eventos
          ARDigitalPanel.mouseup(event => {
            var $el = jQ3(event.target)
            if(!$el.is('input[type="radio"]'))
              return

            $el.parents('tbody').find('.success').removeClass('success')
            $el.parents('tr').find('td').addClass('success')
          })

          ARDigitalPanel.change(event => {
            var $el = jQ3(event.target)
            _avaliarSeEListaValida($el)
          })
        })


      });
    });	

    function __criarNovoEnderecoParaDestinatario(destinatario, enderecoJaConformado){
      const def = jQ3.Deferred();

      destinatario.enderecos.forEach(endereco=>{
        endereco.indAtivo = false
      })

      destinatario.enderecos.push(enderecoJaConformado)

      j2E.ARDigital.api.destinatarios.alterar(destinatario)
      .done(destinatarioAlterado =>{
        const [oEnderecoSalvo] = destinatarioAlterado.enderecos.filter(end=>{
          let esteEONovoId = true
          destinatario.enderecos.forEach(_end=>{
            if(_end.id === end.id)
              esteEONovoId = false
          })
          return esteEONovoId
        })
        if(oEnderecoSalvo)
          oEnderecoSalvo.hashCode = enderecoJaConformado.hashCode

        def.resolve(destinatarioAlterado)
      })
      .fail(err=>{
        destinatario.enderecoNaoPersistido = enderecoJaConformado
        def.reject(err, destinatario)
      })

      return def.promise();
    }

    function __alterarEnderecoAtivdoDoDestinatario(destinatario, indiceEnderecoAtivar){
      const def = jQ3.Deferred();
      let idDoEnderecoMarcadoComoAtivo = -1
      let hashCodeDoEnderecoMarcadoComoAtivo = undefined

      destinatario.enderecos.forEach((endereco, indice)=>{
        if(indice === indiceEnderecoAtivar){
          endereco.indAtivo = true
          idDoEnderecoMarcadoComoAtivo = endereco.id
          hashCodeDoEnderecoMarcadoComoAtivo = endereco.hashCode
        }else
          endereco.indAtivo = false

      })

      j2E.ARDigital.api.destinatarios.alterar(destinatario)
      .done(destinatarioAlterado =>{
        if(hashCodeDoEnderecoMarcadoComoAtivo){
          const [enderecoAlterado] = destinatarioAlterado.enderecos.filter(end=>{
            return end.id === idDoEnderecoMarcadoComoAtivo
          })
          if(enderecoAlterado)
            enderecoAlterado.hashCode = hashCodeDoEnderecoMarcadoComoAtivo
        }
        def.resolve(destinatarioAlterado)
      })
      .fail((err)=>{
        def.reject(err, destinatario)
      })

      return def.promise();
    }

    function __verificarSeExistemAlteracoesNoEnederecoFeitoLocalmente(parsedEnderecoComoObjeto){
      const hashCode = parsedEnderecoComoObjeto.hashCode
      if(!hashCode)
        return parsedEnderecoComoObjeto;
      
      const store = lockr.get(`ar-digital-endMaual-map-id-${idProc}-${hashCode}`, 
      { noData: true })
      if(store.noData)
        return parsedEnderecoComoObjeto;
      
      Object.keys(store).forEach(key=>{
        parsedEnderecoComoObjeto[key] = store[key]
      })

      parsedEnderecoComoObjeto._altLocal = true

      return parsedEnderecoComoObjeto
    }

    function __getDestinatarioEnderecoResolvido(destinatarioOuSeuId, dataSetObjectPJe){
      const deferred = jQ3.Deferred();
      const parsedEndereco = j2E.ARDigital.util.conformarEnderecoARDigigal(dataSetObjectPJe.endereco)

      __verificarSeExistemAlteracoesNoEnederecoFeitoLocalmente(parsedEndereco)

      function ___manipularDestinatario(destinatario){
        //Vai avaliar se 
        let destinatarioPossuiEsteEndereco = false
        let oEnderecoEstaMarcadoComoAtivoParaUsuario = true
        let indiceDoArrayDeEnderecosEIgual = -1
        destinatario.enderecos.forEach((umDosEnderecoDestinatario, indice)=>{
          let eIgual = true
          Object.keys(parsedEndereco).forEach(propName=>{
            switch(propName){
              case 'indPrincipal': case 'indAtivo': case 'hashCode': case 'uuid': case 'id':
              case '_altLocal':
                return;
              default:
                eIgual = eIgual && parsedEndereco[propName] === umDosEnderecoDestinatario[propName]
            }
          })
          if(!destinatarioPossuiEsteEndereco && eIgual){
            destinatarioPossuiEsteEndereco = true
            oEnderecoEstaMarcadoComoAtivoParaUsuario = umDosEnderecoDestinatario.indAtivo
            indiceDoArrayDeEnderecosEIgual = indice
          }
        })
        if(! destinatarioPossuiEsteEndereco)
          __criarNovoEnderecoParaDestinatario(destinatario, parsedEndereco)
          .done(destinatarioAlterado=>{
            deferred.resolve(destinatarioAlterado)
          })
          .fail((err, destinatario)=>{
            deferred.reject(err, destinatario)
          })
        else if( ! oEnderecoEstaMarcadoComoAtivoParaUsuario)
          __alterarEnderecoAtivdoDoDestinatario(destinatario, indiceDoArrayDeEnderecosEIgual)
          .done(destinatarioAlterado=>{
            deferred.resolve(destinatarioAlterado)
          })
          .fail((err, destinatario)=>{
            deferred.reject(err, destinatario)
          })
        else
          deferred.resolve(destinatario)
        
      }

      if (typeof destinatarioOuSeuId === 'object' && destinatarioOuSeuId !== null)
        ___manipularDestinatario(destinatarioOuSeuId)
      else 
        j2E.ARDigital.api.destinatarios.getById(destinatarioOuSeuId)
        .done(___manipularDestinatario)
        .fail((jqXHR, textStatus, errorThrown) =>{
          deferred.reject(errorThrown, destinatarioOuSeuId, jqXHR, textStatus)
        })
      
      return deferred.promise();
    }

    function __getDestinatarioForCheckedPosition(
      dataSetObjectPJe, checkedEnderecosOrder, currentWorkingPLP,
      destConsulta){
      var deferred = jQ3.Deferred();

      function ___destinatarioJaNalista(idDestinatario, destinatarioContainer){
        if(!(currentWorkingPLP))
          return false

        const objetoEncontradoNaPLPTrabalhando = currentWorkingPLP.objetos.filter( objeto => { 
          return objeto.destinatario.id === idDestinatario
        })

        let destinatarioEncontradoNaLista = false

        const [PLPEspelhoJ2E] = j2E.env.PLP.filter(_p => _p.id === currentWorkingPLP.id)
        if(objetoEncontradoNaPLPTrabalhando.length && PLPEspelhoJ2E){
          const hashCodeDoEndereco = j2E.ARDigital.util.hashCodeDoEndereco
          const parserEnderecoFormatoFrameComunicacao = j2E.ARDigital.util.parseEnderecosFrameComunicacao
          const comparardorEnderecoFormat = j2E.ARDigital.util.compararObjetosEnderecoFormat

          const [objetoEspelhoJ2E] = PLPEspelhoJ2E.objs.filter(objEspelho => {
            const hashNomeDestinaraioDoObjetoEncontradoDaWorkingList  = objetoEncontradoNaPLPTrabalhando[0].destinatario.nome.toLowerCase().hashCode()
            const hashEnderecoParsedDataEndereco = hashCodeDoEndereco(parserEnderecoFormatoFrameComunicacao(dataSetObjectPJe.endereco))
            const enderecoFormatARDigital = parserEnderecoFormatoFrameComunicacao(dataSetObjectPJe.endereco)
            const enderecoDoObjetoEncontradoDaWorkingList = objetoEncontradoNaPLPTrabalhando[0].destinatario.enderecos[0]

            return  objEspelho.objetoIdNaPLP === objetoEncontradoNaPLPTrabalhando[0].id
                    &&
                    objEspelho.idProcesso      === parseInt(idProc)
                    &&
                    objEspelho.task.name        === j2E.env.task.name
                    &&
                    objEspelho.destinatarioPJe.nome === objetoEncontradoNaPLPTrabalhando[0].destinatario.nome
                    &&
                    comparardorEnderecoFormat(objEspelho.endereco, dataSetObjectPJe.objEnderecoFormatAlterado)
                    &&
                    comparardorEnderecoFormat(objEspelho.endereco, enderecoDoObjetoEncontradoDaWorkingList)
          })

          if(!!(objetoEspelhoJ2E)){ 
            destinatarioContainer.destinatario = objetoEncontradoNaPLPTrabalhando[0].destinatario
            destinatarioContainer.destinatario.__J2E__ = {
              objetoCorreiosAssociado : objetoEncontradoNaPLPTrabalhando[0]
            }
            objetoEncontradoNaPLPTrabalhando[0].__J2E__ = {
              marcadoComoEncontradoDaWorkingList: true
            }
            destinatarioEncontradoNaLista = true
          }
        }

        return destinatarioEncontradoNaLista
      }

      if(destConsulta.totalCount == 0){
        __criarDestinatario(dataSetObjectPJe)
        .done( _res => {
          __getDestinatarioEnderecoResolvido(_res.id, dataSetObjectPJe)
          .done( res => deferred.resolve(res) )
          .fail( (error, destinatario) => deferred.reject(error, destinatario) )
        } )
        .fail( (err, endObj) => deferred.reject(err, endObj, dataSetObjectPJe) )
        // cópia desse blocl abaixo
      }else{
        const [destinatarioFiltradoENaLista] = destConsulta.result.filter(destIt => ! destIt.__J2E__)
        .filter(destIt =>{
          const container = {}
          const jaNaLista = ___destinatarioJaNalista(destIt.id, container) 
          if( container.destinatario )
            destIt.__J2E__ = {
              container
            }
          return jaNaLista
        })

        if ( destinatarioFiltradoENaLista?.__J2E__ )
          deferred.resolve(destinatarioFiltradoENaLista.__J2E__.container.destinatario)
        else{ 
          const destinatarioDisponivelComEnderecoCombinando = destConsulta.result.find(destIt => { 
            let matchedEndIdx
            let indAtivo
            const foundEnd = destIt.enderecos.find((end, idx) =>  { 
              if( j2E.ARDigital.util.compararObjetosEnderecoFormat(end, dataSetObjectPJe.objEnderecoFormatAlterado) ){
                matchedEndIdx = idx,
                indAtivo = end.indAtivo
                return true
              }
            })
            if( foundEnd && !destIt.__J2E__ ){
              destIt.__J2E__ = {
                iterandoDestinatarioComEnderecoJaExistente: true,
                matchedEndIdx,
                indAtivo
              }
              return true   
            }
          })

          const destinatarioDisponivel = destConsulta.result.find(destIt => !destIt.__J2E__)

          if (destinatarioDisponivelComEnderecoCombinando){
            if (destinatarioDisponivelComEnderecoCombinando.__J2E__.indAtivo )
              deferred.resolve(destinatarioDisponivelComEnderecoCombinando)
            else
              __getDestinatarioEnderecoResolvido(destinatarioDisponivelComEnderecoCombinando, dataSetObjectPJe)
              .done( res2 => deferred.resolve(res2) )
              .fail( (error, destinatario) => deferred.reject(error, destinatario) )
          } else if ( destinatarioDisponivel ){
            destinatarioDisponivel.__J2E__ = {
              iterandoNovoEnderecoParaDestinatario: true
            }

            __getDestinatarioEnderecoResolvido(destinatarioDisponivel, dataSetObjectPJe)
            .done( res2 => deferred.resolve(res2) )
            .fail( (error, destinatario) => deferred.reject(error, destinatario) )
          }else
            __criarDestinatario(dataSetObjectPJe)
            .done( oIdNovoDestinatarioCriado => {
              

              __getDestinatarioEnderecoResolvido(oIdNovoDestinatarioCriado.id, dataSetObjectPJe)
              .done( umNovoDestinatarioCriado => { 
                debugger
                umNovoDestinatarioCriado.__J2E__ = {
                  iterandoNovoEnderecoParaDestinatario: true
                }
                destConsulta.result.push(umNovoDestinatarioCriado)

                deferred.resolve(umNovoDestinatarioCriado) 
              })
              .fail( error => deferred.reject(error) )
            } )
            .fail( (err, endObj) => deferred.reject(err, endObj, dataSetObjectPJe) )
        }
      }

      /*true && j2E.ARDigital.api.destinatarios.consultar(dataSetObjectPJe.destinatario.nome, res =>{
        if(res.totalCount < checkedEnderecosOrder){

          __criarDestinatario(dataSetObjectPJe)
          .done( _res => {
            __getDestinatarioEnderecoResolvido(_res.id, dataSetObjectPJe)
            .done( res => deferred.resolve(res) )
            .fail( (error, destinatario) => deferred.reject(error, destinatario) )
          } )
          .fail( (err, endObj) => deferred.reject(err, endObj, dataSetObjectPJe) )
          // cópia desse blocl abaixo

        }else{
          var idx = checkedEnderecosOrder-1
          var idDestinatario = res.result[ idx ].id
          var destinatarioContainer = {}
          while ( ___destinatarioJaNalista(idDestinatario, destinatarioContainer)  ){
            idx++
            idDestinatario = idx < res.result.length ? res.result[ idx ].id : -1
          }

          if( destinatarioContainer.destinatario ){
            deferred.resolve(destinatarioContainer.destinatario)
          }else if( idDestinatario !== -1 )
            __getDestinatarioEnderecoResolvido(idDestinatario, dataSetObjectPJe)
            .done( res2 => deferred.resolve(res2) )
            .fail( (error, destinatario) => deferred.reject(error, destinatario) )
          else
            __criarDestinatario(dataSetObjectPJe)
            .done( _res => {
              __getDestinatarioEnderecoResolvido(_res.id, dataSetObjectPJe)
              .done( res => deferred.resolve(res) )
              .fail( error => deferred.reject(error) )
            } )
            .fail( (err, endObj) => deferred.reject(err, endObj, dataSetObjectPJe) )
            // cópia desse bloco acima
        }
      }, (error)=>{
        deferred.reject(error);
      })*/

      return deferred.promise();
    }

    function __criarDestinatario(dataSetObjectPJe, handledEndereco){
      var deferred = jQ3.Deferred();

      var objEnd = j2E.ARDigital.util.conformarEnderecoARDigigal(handledEndereco || dataSetObjectPJe.endereco)

      j2E.ARDigital.api.destinatarios.criar({
        enderecos : [
          objEnd
        ],
        nome : dataSetObjectPJe.destinatario.nome
      }, __res => deferred.resolve(__res),
        _err => deferred.reject(_err, objEnd)
      )

      return deferred.promise();
    }

    function __getDescricaoPadrao(){
      //Criar datalist para uso pelos campos de descricao no objeto
      if(! jQ3('#ar-digital-descricao-datalist').length ){
        const frag = `<datalist id="ar-digital-descricao-datalist">
          <option value="${numeroUnicoProcesso}">
          <option value="${numeroUnicoProcesso} - citação">
          <option value="${numeroUnicoProcesso} - citação e intimação">
          <option value="${numeroUnicoProcesso} - intimação">
        </datalist>`

        jQ3('body').append(frag)
      }
      
      return jQ3.Deferred().resolve(`${numeroUnicoProcesso}`)
    }

    function __adicionarObjetoServicoPadrao(destData){
      var deferred = jQ3.Deferred();

      function ____onDone(res){
        __getDescricaoPadrao()
        .always( observacaoTarefa => {
          var objeto = j2E.ARDigital.util.getDefaultServico(destData, observacaoTarefa)
          //se já existe objeto correios associado, não precisa verificar Disponibilidade
          //pois foi verificado anteriormente
          if(destData?.__J2E__?.objetoCorreiosAssociado){
            deferred.resolve(objeto) 
            return
          }

          var cepDest = destData.enderecos.filter( _it => { return _it.indAtivo })[0].cep
          j2E.ARDigital.api.servicos.verificarDisponibilidade(cepDest)
          .done( res11 => { 
            if ( ! Boolean(res11.resultado) ){
              deferred.reject(`Erro ao verificar disponibilidade de serviço: (${res11.resultado})`)
              return
            }
            if(Boolean(res11.resultado) === false){
              deferred.reject('Não há disponibilidade de serviço para o CEP destino')
              return
            }

            deferred.resolve(objeto) 
          } )
          .fail( err9 => deferred.reject( err9 ) )
        })
      }

      if(destData.enderecos){
        ____onDone(destData)
        return deferred.promise();  
      }else{
        j2E.ARDigital.api.destinatarios.getById(destData.id)
        .done( ____onDone )
        .fail(()=> deferred.reject('Destinatario nao encontrado') )
      }
      return deferred.promise();
    }

    function __replaceTRDaNovaCiracaoDeListaDePostagem(linkedPLP, plp){
      let frag = `<tr class="rich-table-row ${ linkedPLP.is(':first-child') ? 'rich-table-firstrow' : ''}">
          <td class="rich-table-cell text-break text-left success">
              <div class="col-sm-12">
                  <span class="text-left"><input id="plp-${plp.id}" class="checkbox" type="radio" name="radio-plp" checked disabled /></span>
              </div>
          </td>
          <td class="rich-table-cell text-break text-left success">
              <div class="col-sm-12"><span class="text-left"></span></div>
          </td>
          <td class="rich-table-cell text-break text-left success">
              <div class="col-sm-12"><span class="text-left">${plp.id}</span></div>
          </td>
          <td class="rich-table-cell text-break text-left success">
              <div class="col-sm-12"><span class="text-left">${plp.matriculaCriador}</span></div>
          </td>
          <td class="rich-table-cell text-break text-left success">
              <div class="col-sm-12"><span class="text-left">${plp.objetos.length}</span></div>
          </td>
          <td class="rich-table-cell text-break text-left success">
              <div class="col-sm-12"><span class="text-left">${plp.dtaPostagem.split('T')[0].split('-').reverse().join('/')}</span></div>
          </td>
        </tr>`;

      let newTR = jQ3(frag)
      let newInputLinkedPLP = newTR.find('input')

      //se sim, já existe uma lista de postagem criada e salva no AR Digital
      if( linkedPLP.data('j2E') ){

        linkedPLP.data('j2E') && (linkedPLP.data('j2E').plpFull = plp)
        j2E.env.tempData.plpFull = plp
        
        newInputLinkedPLP.data('j2E', linkedPLP.data('j2E') )
      }
      else{ //se não, lidando com uma nova lista de postagem recem criada
        newInputLinkedPLP.data('j2E', {
          plpfull: plp,
          matachedList: plp,
          plp
        })
      }


      linkedPLP.parents('tbody').find('input[type="radio"]').attr('disabled', '')

      if( linkedPLP.is('#plp-new') ){
        linkedPLP.parents('tr').replaceWith(newTR)
        return newInputLinkedPLP;
      }
      
      linkedPLP.parents('tr').find('td:nth-child(4)').text(plp.objetos.length)
      return linkedPLP
    }

    function __adicionarAPLPSelecionada(enderecosSelectedData){
      let deferred = jQ3.Deferred();

      const $trDoDestinatario = enderecosSelectedData.$trDoDestinatario

      let linkedPLP = jQ3('[j2-ardigital-panel]').find('input:checked')
      if(!(linkedPLP).length){
        deferred.reject('Nenhuma lista de postagem foi selecionada')
        return deferred.promise();
      }

      function ____defaultFail( response ){
        deferred.reject(`Erro ao criar/salvar a lista de postagem. (${response})`)
      }

      const objetosAndRawData = (()=>{
        let _ojbs = []
        enderecosSelectedData.forEach( dt => _ojbs.push({
          objetoCorreios : dt.objetoCorreios,
          data: dt
        }) )
        return _ojbs
      })()
      
      if( linkedPLP.prop('id') === 'plp-new' ){
        let dataPostagem = jQ3('#plp-date').val()
        dataPostagem = moment(dataPostagem, 'YYYY-MM-DD')
        if(!dataPostagem.isValid()){
          deferred.reject('A data de postagem deve ser definida para cirar uma nova lista de postagem.')
          return deferred.promise();
        }
        

        j2E.ARDigital.api.plp.criar(dataPostagem, objetosAndRawData.map(o => o.objetoCorreios))
        .done( res98 => j2E.ARDigital.api.plp.getById(res98.id)
          .done( newPlp => {
            //debugger;
            __replaceTRDaNovaCiracaoDeListaDePostagem(linkedPLP, newPlp)
            deferred.resolve(newPlp, $trDoDestinatario, enderecosSelectedData)
          })
          .fail( ____defaultFail ))
        .fail( ____defaultFail  )

      }
      else{
        const idPlp = linkedPLP.prop('id').split('-')[1]
        const plpCompleta = linkedPLP.data('j2E').plpCompleta

      if (plpCompleta && plpCompleta.status === 'FECHADA')
        deferred.resolve( {plpFechada: true} ) 
      else
        j2E.ARDigital.api.plp.getById(idPlp)
        .done( resPLP =>{
          const plpAntes = JSON.stringify(resPLP).hashCode()

          objetosAndRawData.map(o => o.objetoCorreios).forEach( _obj => {
            let objetoEncontrado = undefined
            function plpNaoPossuiObjeto () {
              const [_objEcontrado] = resPLP.objetos.filter(__obj => { 
                return j2E.ARDigital.util.compararObjetosCorreios(_obj, __obj)
              })
              objetoEncontrado = _objEcontrado
              return !(objetoEncontrado)
            }

            if( plpNaoPossuiObjeto() )
              resPLP.objetos.push(_obj)
            else if(objetoEncontrado){
              const propriedadesAlteradas = j2E.ARDigital.util.propriedadesAlteradas(_obj, objetoEncontrado) 
              propriedadesAlteradas.forEach(propriedade=>{
                objetoEncontrado[propriedade] = _obj[propriedade]
              })
            } 
          })

          /**
           * Verificar a deleção de ojbetos
           */
          // filtra as PLP do ambientes para a mesma que resPLP pelo id,
          // filtrando seus objs pelos critérios iguais:
          // numeroProcesso, hash da tarefa, nome da parte
          // e se o id de objeto correis não possui o id do objeto que está na
          // objeotos da resPLP
          const objetosPersistidoNaoIncluidoNaResPLP = 
          j2E.env.PLP.filter(p => p.id === resPLP.id )?.[0]?.objs.filter(o=> {
            const ojbetosMapped =  objetosAndRawData.map(ob=>
              { return { id: ob.objetoCorreios.id }}).filter(ob=> !!ob.id)

            return ojbetosMapped.length
                && ! ojbetosMapped.some(obM => obM.id == o.objetoIdNaPLP )
                && o.idProcesso == idProc 
                && o.task.name === j2E.env.task.name
                && o.destinatarioPJe.nome === _obterDestinatarioAtual($trDoDestinatario).nome
          })
          // altera o resPLP objeto, filtrando  removendo os ids de objetoCorreios
          // que não combinam com os objetos espelhos obtidos da persistencia 
          // objetosPersistidoNaoIncluidoNaResPLP
          if(objetosPersistidoNaoIncluidoNaResPLP?.length){
            resPLP.objetos = resPLP.objetos.filter(o => 
              !objetosPersistidoNaoIncluidoNaResPLP.map(p => p.objetoIdNaPLP).includes(o.id) )
          }


          const plpDepois = JSON.stringify(resPLP).hashCode()

          if(plpDepois !== plpAntes)
            j2E.ARDigital.api.plp.atualizar(resPLP)
            .pipe(response=>{
              return j2E.ARDigital.api.plp.getById(response.id)
            })
            .done( upPlp => {
              deferred.resolve(upPlp, $trDoDestinatario, enderecosSelectedData) 
            })
            .fail( ____defaultFail )
          else
            deferred.resolve(resPLP, $trDoDestinatario, enderecosSelectedData)
        })
        .fail( ____defaultFail )   

      }


      return deferred.promise();
    }

    function _treatDestinatarioEEnderecoARDigital(destinatarioSetComEnderecosUsados, currentWorkingPLP){
      
      let linkedInputPLP = jQ3('[j2-ardigital-panel]').find('input:checked')
      
      if( linkedInputPLP.length ){
        if( linkedInputPLP.prop('id') !== 'plp-new'  && (! (linkedInputPLP.data('j2E')?.plpFull ))) {
          j2E.ARDigital.api.plp.getById( linkedInputPLP.data('j2E').plp.id )
          .done( plp => {
            linkedInputPLP.data('j2E').plpFull = plp
            j2E.env.tempData.plpFull = plp
            _treatDestinatarioEEnderecoARDigital(destinatarioSetComEnderecosUsados, plp)
          })
          .fail((err) => {
            alert('Falha ao obter a lista de postagem')
          })
          //.always( ()=> defer(()=>j2EUi.richModal(false)) )

          return;
        }else if( linkedInputPLP.prop('id') !== 'plp-new' )
          currentWorkingPLP = linkedInputPLP.data('j2E')?.plpFull
      }


      let destinatarioResolvidoDefer = jQ3.Deferred()

      destinatarioSetComEnderecosUsados.forEach((endSel, idx) =>{ 
        let checkedEnderecos = idx + 1
        let dataSetObjectPJe = endSel.data
        let $panel = endSel.$panel
        let $target = endSel.$target
        
        function ____defaultFail(err, enderecoOuDestinatario, dataSetObjectPJe){
          destinatarioResolvidoDefer.reject()
          $containerObjetoPanel.empty()
          //Com erro
          ____obj = {
            maoPropria : true,
            descricao : `${numeroUnicoProcesso} - ${objetoDescricaoPadrao}`
          }

          function ___butSaveClickCallBack(dadosDoFormulario){
            if(enderecoOuDestinatario.enderecoNaoPersistido){
              const end = enderecoOuDestinatario.enderecoNaoPersistido
              const store = {}

              dadosDoFormulario.alteracoes.forEach(alteracao=>{
                store[alteracao] = dadosDoFormulario.objEnderecoAlterado[alteracao]
              })

              lockr.set(`ar-digital-endMaual-map-id-${idProc}-${end.hashCode}`, 
              store, { expiration: 3 * 24 * 60 * 60 * 1000 })
            }

            /*j2EUi.richModal(true)
            __criarDestinatario(data, newObjEnd)
            .done( _res => {
              __getDestinatarioEnderecoResolvido(_res.id, data)
              .done( res => _treatDestinatar        ioEEnderecoARDigital(enderecosSelected) )
              .fail( error => alert('#####Manga this error') )
            } )
            .fail( (_err, _endObj) => ____defaultFail(_err, _endObj, data) )
            .then( () => j2EUi.richModal(false) )*/

            _recarregarSelecoesDoUsuario(destinatarioSetComEnderecosUsados)
          }

          let $endEditorPanel = _ARDigitalObjFieldsWithError(
            enderecoOuDestinatario.enderecos ? 
            enderecoOuDestinatario.enderecoNaoPersistido :
            enderecoOuDestinatario, 
            ___butSaveClickCallBack
          )


          let errrorToUser = []
          let errorSourc = err?.responseJSON?.errors || [ {message: 'Erro não informado pelo servidor'} ]
          errrorToUser.push( '' )
          errorSourc.forEach( (_erIt) => { 
            errrorToUser.push(_erIt.message)

            var match = _erIt.message.match(/"([^"]+)"/)
            if( match.length )
              $endEditorPanel.find(`#${match[1]}`).addClass('is-invalid')
          })
          errrorToUser = errrorToUser.join('<br>')

          $containerObjetoPanel.append(j2EUi.createPanel('Corrigir Endereço para o AR Digital', 
            [
              $endEditorPanel,
              j2EUi.createWarnElements(`
                    Erro ao processar destinaráio. Erro de validação: ${err?.responseJSON?.userMessage || 'Erro sem mensagem'} ${errrorToUser}
              `)
            ]
          ))


        /*  $td.append(j2EUi.createWarnElements(`
                Erro ao processar destinaráio. (${err.responseText || err})
          `))*/
        }
        

        

        endSel.$containerObjetoPanel = $panel.$body.find('[j2-container-objeto-panel]') 
        endSel.procDef = jQ3.Deferred()
        endSel.procDef.enderecoSelecionado = endSel
        endSel.id = guid ? guid() : Math.random()



        ___delayCall((dataSetObjectPJe, $containerObjetoPanel, checkedEnderecos, endSel)=>{

          jQ3.when(__getDestinatarioForCheckedPosition(
            dataSetObjectPJe, checkedEnderecos, currentWorkingPLP, 
            destinatarioSetComEnderecosUsados.destConsulta))
          .then( destinatarioComEnderecoResolvido => {
            endSel.enderecoResolvido = destinatarioComEnderecoResolvido

            return __adicionarObjetoServicoPadrao(destinatarioComEnderecoResolvido)
          })
          .then(objDone => {
            //objDone = j2E.ARDigital.util.conformObjtoToAddInPLP(objDone)
            endSel.objetoCorreios = objDone

            $containerObjetoPanel.empty()
            ____obj = {
              maoPropria : objDone.maoPropria,
              objetoCorreios: objDone,
              descricao : objDone.observacao
            }
            $containerObjetoPanel.append(j2EUi.createPanel('Objeto', _ARDigitalObjFields(____obj,
              (objetoCorreiosAlterado)=>{
                j2EUi.richModal(true)
                __adicionarAPLPSelecionada(destinatarioSetComEnderecosUsados)
                .then( ___persistirPLPEAtualizarViewNoPainelDoARDigital )
                .fail(err => {
                  j2EUi.richModal(false)
                  toaster("AR Digital", `Erro ao atualizar objeto. (${err.responseText})`, "error")
                })
              }, destinatarioSetComEnderecosUsados.$trDoDestinatario)
            ))

            /*if( checkResolution() )
              destinatarioResolvidoDefer.resolve()*/
            endSel.procDef.resolve()  
          })
          .fail( ____defaultFail)


        }, dataSetObjectPJe, endSel.$containerObjetoPanel, checkedEnderecos, endSel)

      })

      const procDefSromises = destinatarioSetComEnderecosUsados.map((endereco) => endereco.procDef.promise());
      jQ3.when(...procDefSromises)
      .done(() => destinatarioResolvidoDefer.resolve() )
      .fail((failedPromise, reason) => {
        const __endSel = failedPromise.enderecoSelecionado
        console.log(__endSel)
      })

      jQ3.when(destinatarioResolvidoDefer)
      .then(() => {
        return __adicionarAPLPSelecionada(destinatarioSetComEnderecosUsados);
      })
      .then( (plpCompletaOrStatusFechada, $trDoDestinatario, enderecosSelectedData)=>{
        return !plpCompletaOrStatusFechada.plpFechada 
          ? ___persistirPLPEAtualizarViewNoPainelDoARDigital(plpCompletaOrStatusFechada, $trDoDestinatario, enderecosSelectedData) 
          : jQ3.Deferred().resolve(plpCompletaOrStatusFechada).promise()
      })
      .done( plpStatus => {
        if(plpStatus?.plpFechada){
          toaster("AR Digital", `Lista de postagem associada já está fechada`, "info")  
        }
        defer(()=>j2EUi.richModal(false))
      })
      .fail( (err) => {
        toaster("Jurisconsult", `Falha ao resolver o destinatário. (${ err || ''})`, "error")

        defer(()=>j2EUi.richModal(false))
      });

      function ___persistirPLPEAtualizarViewNoPainelDoARDigital(plp, $trDoDestinatario, enderecosSelectedData){
        const def = jQ3.Deferred()

        linkedInputPLP = __replaceTRDaNovaCiracaoDeListaDePostagem(linkedInputPLP, plp)


        plp.objetos.map(o => { return { idDestinatario: o.destinatario.id, selfObjecto: o }})
        .forEach(mpO => {
          const [endSel] = enderecosSelectedData.filter(endSel => endSel.objetoCorreios.destinatario.id === mpO.idDestinatario )
          if (endSel){
            !endSel?.objetoCorreios?.id && (endSel.objetoCorreios.id = mpO.selfObjecto.id)
            mpO.selfObjecto.__J2E__ = { endSel }
          }
        })

        _persistPLP(plp, enderecosSelectedData)
        .done( () => { 
          toaster("AR Digital", `PLP atualizada com sucesso`, "success")

          jQ3('[j2-ardigital-panel]').find('input').attr('disabled', 'disabled')
          defer(() => {
            j2EUi.richModal(false)
            _marcarAutomaticamenteUmEnderecoPorExpediente(destinatarioSetComEnderecosUsados)
          })

          def.resolve()
        })
        .fail(err=> def.reject(err))

        return def.promise()
      }
    }

    function _persistPLP(plp, enderecosSelectedData){
      var deffered = jQ3.Deferred()

      function __obterObjetoCorreiosEspelhoPersistido(objetoDePLP){
        debugger
        return {
          idProcesso: idProc,
          task: task,
          objetoIdNaPLP: objetoDePLP.id,
          destinatarioPJe: _obterDestinatarioAtual(
            objetoDePLP.__J2E__.endSel.$trDoDestinatario
          ),
          endereco: objetoDePLP.destinatario.enderecos[0],
          dataSetObjectPJe: objetoDePLP.__J2E__.endSel.data
        }
      }

      const idProc = parseFloat(j2E.env.urlParms.idProcesso),	
          idTask = j2E.env.urlParms.newTaskId,
          taskHash = j2E.env.task.hash,
          task = j2E.env.task,
          //destHash = _obterDestinatarioAtual().toLowerCase().hashCode(), 
          endHash = (obj) =>{
            return j2E.ARDigital.util
                  .hashCodeDoEndereco(obj.destinatario.enderecos[0])
          }
      /**
       * 
       */
            
      var defPLP = jQ3.Deferred()
      armazenamento.obter(`PLP:${plp.id}`)
      .then(plpArmz => {/*})

      j2E.SeamIteraction.alertas.acoes.pesquisarAlerta(`PLP:${plp.id}`)
      .done( (alerta, _, __, seamRequestIteractionPending) => { */
        if (! (plpArmz)){
          /*let _p_plp = {}*/
          const root = /*_p_plp[`plp*-#${plp.id}#`] =*/ {}

          root.id = plp.id      
          root.objs = []

          plp.objetos.forEach( objCoreiosPLP => root.objs.push( 
            /*[
              idProc,             // i ddo processo no PJe
              taskHash,           // hash code do nome da tarefa
              idObjPLP.id,        // o id do objeto na PLP do AR digital
              destHash,           // hashcode do nome da parte no sistema mais cpf cnpj se houver
              endHash(idObjPLP),  // hashcode do endereço no PJe como é apresentado
            ]*/
            __obterObjetoCorreiosEspelhoPersistido(objCoreiosPLP)
          ))

          /*seamRequestIteractionPending.liberarAView()

          _p_plp = JSON.stringify(_p_plp)*/

          armazenamento.guardar(`PLP:${plp.id}`, root)
          //j2E.SeamIteraction.alertas.acoes.adicionarUmAlertaSemAssociarProcesso( _p_plp )
          .then( ()=> defPLP.resolve( root.objs) ) // velho done
          .catch( ()=> defPLP.reject() ) //velho fail
        }else{
          /*let _p_plp = JSON.parse(plpArmz)*/
          const root = /*_p_plp[`plp*-#${plp.id}#`]*/ plpArmz

          root.id = plp.id      
          root.objs ??= []

          plp.objetos.forEach( objCoreiosPLP => {
            const [objetoEncontrado] = root.objs.filter(o=>o.objetoIdNaPLP === objCoreiosPLP.id)
            if(! (objetoEncontrado))
              root.objs.push(/*[
                idProc,             // id ddo processo no PJe
                taskHash,           // hash code do nome da tarefa
                idObjPLP.id,        // o id do objeto na PLP do AR digital
                destHash,           // hashcode do nome da parte no sistema mais cpf cnpj se houver
                endHash(idObjPLP),  // hashcode do endereço no PJe como é apresentado
              ]*/
                __obterObjetoCorreiosEspelhoPersistido(objCoreiosPLP)
              )
          })
          root.objs = root.objs.filter(_itObjeto=>{
            const [objetoEncontrado] = 
            plp.objetos.filter(__itObj=> 
              _itObjeto.objetoIdNaPLP === __itObj.id)
            return !!objetoEncontrado
          })

          /*_p_plp = JSON.stringify(_p_plp)*/
          armazenamento.guardar(`PLP:${plp.id}`, root)
          /*j2E.SeamIteraction.alertas.acoes.alterarAlertaEncontrado( seamRequestIteractionPending, _p_plp )*/
          .then( ()=> defPLP.resolve( root.objs) ) //velho done
          .catch( ()=> defPLP.reject() ) // old fail
        }
      })
      .catch( err => {
        console.log(`Erro de consulta de alerta: ${err}`) 
        defPLP.reject()
      })

      var defProc = jQ3.Deferred()
      jQ3.when(defPLP).done(()=>{
        armazenamento.obter(`Processo:${idProc}`)
        .then( processoData => { /*})
        j2E.SeamIteraction.alertas.acoes.pesquisarAlerta(`p-#${idProc}#`)
        .done( (alerta, _, __, seamRequestIteractionPending) => { */
          if (! (processoData)){
            /*var _p = {}*/
            const proot /*= /*_p[`p-#${idProc}#`]*/ = {}

            proot.id = idProc
            proot.PLP = [ plp.id ]

            /*seamRequestIteractionPending.liberarAView()

            _p = JSON.stringify(_p)*/
            armazenamento.guardar( `Processo:${idProc}`, proot)
            /*j2E.SeamIteraction.alertas.acoes.adicionarUmAlertaSemAssociarProcesso( _p )*/
            .then( ()=> defProc.resolve() ) //velo done
            .catch( ()=> defProc.reject() )
            return;
          }else{
            /*let _p = JSON.parse(processoData)*/
            const proot /*= _p[`p-#${idProc}#`]*/ = processoData

            proot.PLP ??=[]
            if( ! proot.PLP.includes( plp.id ))
              proot.PLP.push(plp.id)

              /*_p = JSON.stringify(_p)
              j2E.SeamIteraction.alertas.acoes.alterarAlertaEncontrado( seamRequestIteractionPending, _p )*/
              armazenamento.guardar( `Processo:${idProc}`, proot)
              .then( ()=> defProc.resolve() )
              .catch( ()=> defProc.reject() )
          }
        })
        .catch( err => {
          console.log(`Erro de consulta de alerta: ${err}`) 
          defProc.reject()
        })
      })

      jQ3.when(defProc)
      .done(()=>{
        const processoPLPs = j2E.env[`Processo:${idProc}`].PLP
        if(!processoPLPs.includes(plp.id))
          processoPLPs.push(plp.id)
      })

      jQ3.when(defPLP)
      .done((objetosPLPEspelho)=>{
        const [envPLPs] = j2E.env.PLP.filter(p => p.id === plp.id)
        if(envPLPs)
          envPLPs.objs = objetosPLPEspelho
        else 
          j2E.env.PLP.push({
            id: plp.id,
            objs: objetosPLPEspelho
          })
      })


      jQ3.when(defProc, defPLP)
      .done( ()=> deffered.resolve() )
      .fail( (prom, reas) => deffered.reject( prom, reas ))

      return deffered.promise()
    }

    function _ARDigitalObjFields(obj, changeCallback, $trDoDestinatario){
      let frag = `
      <div j2-propriedades id="objeto-fields">
        <div class="propertyView col-sm-3">
          <div class="name">
            <label for="objeto-mao-propria" class="">Mão Própria? <small class="text-muted text-lowercase"></small></label>
          </div>
          <div class="value col-sm-12">
            <input type="checkbox" id="objeto-mao-propria" ${obj.maoPropria ? 'checked' : ''}
            ${ 
              j2E.env?.obtidaMatachedList?.plp?.status === 'FECHADA' ? 'disabled' 
              : $trDoDestinatario?.find('td:nth-child(3)')
                .text().trim().match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/) 
              ? 'disabled title="Não há necessidade de uso de mão própria para pessoa jurídica" '  : ''
            }>
          </div>
        </div><div class="propertyView col-sm-9">
          <div class="name">
            <label for="objeto-descricao" class="">Descrição do Objeto <small class="text-muted text-lowercase"></small></label>
          </div>
          <div class="value col-sm-12">
            <input id="objeto-descricao" list="ar-digital-descricao-datalist" type="text" maxlength="80" value="${obj.descricao}" class="readonly inputText" style="/* width: 250px; */"
            ${ j2E.env?.obtidaMatachedList?.plp?.status === 'FECHADA' ? 'disabled="disabled"' : '' }>
          </div>
        </div>
        
      </div>
      `

      const $fragmento = jQ3(frag)
      $fragmento.find('input').change(function(){
        const $this = jQ3(this)
        switch($this.prop('id')){
          case 'objeto-mao-propria':
            obj.objetoCorreios.maoPropria = $this.is(':checked')
            break;
          case 'objeto-descricao':
            obj.objetoCorreios.observacao = $this.val()
            break;  
        }

        changeCallback(obj.objetoCorreios)
      })
      $fragmento.data('j2E', {
        objetoCorreios: obj.objetoCorreios
      })

      return $fragmento
    }

    function _ARDigitalObjFieldsWithError(obj, butSaveCallback){
      const frag = `
      <div class="rich-panel-body" id="painelNovoEndereco_body">
      <div xmlns="http://www.w3.org/1999/xhtml" id="divEnderecoNovo">
          

          <div j2-propriedades id="divEntradaEndereco" style="
    display: flex;
">
              <div id="endCols" class=""><div class="propertyView col-sm-4" id="">
                  <div class="name">
                      <label for="CEP" class="" id="">
                          CEP <small class="text-muted text-lowercase" id=""></small><span class="required">*</span>
                      </label>
                  </div>
                  <div class="value col-sm-12" id="">
                      <input id="cep" type="text" value="${obj?.cep}" class="readonly inputText" maxlength="8" style="
    width: 85%;
">
                  </div>
              </div><div class="propertyView col-sm-4" id="">
                  <div id="fieldProcesso_Fluxo_prepararExpediente-8843915720Div" class="name">
                      <label for="cidade" class="" id="">
                          Cidade <small class="text-muted text-lowercase" id=""></small><span id="j_id303" class="required">*</span>
                      </label>
                  </div>
                  <div class="value col-sm-12" id="">
                      <input id="cidade" type="text" value="${obj?.cidade}" class="readonly inputText" style="
    width: 85%;
">
                  </div>
              </div><div class="propertyView col-sm-4" id="">
                  <div id="fieldProcesso_Fluxo_prepararExpediente-8843915720Div" class="name">
                      <label for="uf" class="" id="">
                          Estado <small class="text-muted text-lowercase" id=""></small><span id="j_id303" class="required">*</span>
                      </label>
                  </div>
                  <div class="value col-sm-12" id="">
                      <select id="uf" class="" size="1" onclick="" tabindex="" style="
    width: 85%;
"><option value="AC" id="" ${obj?.uf === 'AC'? 'selected': ''} >Acre</option>
  <option value="AL" id="" ${obj?.uf === 'AL'? 'selected': ''} >Alagoas</option>
  <option value="AP" id="" ${obj?.uf === 'AP'? 'selected': ''} >Amapá</option>
  <option value="AM" id="" ${obj?.uf === 'AM'? 'selected': ''} >Amazonas</option>
  <option value="BA" id="" ${obj?.uf === 'BA'? 'selected': ''} >Bahia</option>
  <option value="CE" id="" ${obj?.uf === 'CE'? 'selected': ''} >Ceará</option>
  <option value="DF" id="" ${obj?.uf === 'DF'? 'selected': ''} >Distrito Federal</option>
  <option value="ES" id="" ${obj?.uf === 'ES'? 'selected': ''} >Espírito Santo</option>
  <option value="GO" id="" ${obj?.uf === 'GO'? 'selected': ''} >Goiás</option>
  <option value="MA" id="" ${obj?.uf === 'MA'? 'selected': ''} >Maranhão</option>
  <option value="MT" id="" ${obj?.uf === 'MT'? 'selected': ''} >Mato Grosso</option>
  <option value="MS" id="" ${obj?.uf === 'MS'? 'selected': ''} >Mato Grosso do Sul</option>
  <option value="MG" id="" ${obj?.uf === 'MG'? 'selected': ''} >Minas Gerais</option>
  <option value="PA" id="" ${obj?.uf === 'PA'? 'selected': ''} >Pará</option>
  <option value="PB" id="" ${obj?.uf === 'PB'? 'selected': ''} >Paraíba</option>
  <option value="PR" id="" ${obj?.uf === 'PR'? 'selected': ''} >Paraná</option>
  <option value="PE" id="" ${obj?.uf === 'PE'? 'selected': ''} >Pernambuco</option>
  <option value="PI" id="" ${obj?.uf === 'PI'? 'selected': ''} >Piauí</option>
  <option value="RJ" id="" ${obj?.uf === 'RJ'? 'selected': ''} >Rio de Janeiro</option>
  <option value="RN" id="" ${obj?.uf === 'RN'? 'selected': ''} >Rio Grande do Norte</option>
  <option value="RS" id="" ${obj?.uf === 'RS'? 'selected': ''} >Rio Grande do Sul</option>
  <option value="RO" id="" ${obj?.uf === 'RO'? 'selected': ''} >Rondônia</option>
  <option value="RR" id="" ${obj?.uf === 'RR'? 'selected': ''} >Roraima</option>
  <option value="SC" id="" ${obj?.uf === 'SC'? 'selected': ''} >Santa Catarina</option>
  <option value="SP" id="" ${obj?.uf === 'SP'? 'selected': ''} >São Paulo</option>
  <option value="SE" id="" ${obj?.uf === 'SE'? 'selected': ''} >Sergipe</option>
  <option value="TO" id="" ${obj?.uf === 'TO'? 'selected': ''} >Tocantins</option></select>
                  </div>
              </div><div class="propertyView col-sm-4" id="">
                  <div id="fieldProcesso_Fluxo_prepararExpediente-8843915720Div" class="name">
                      <label for="bairro" class="" id="">
                          Bairro <small class="text-muted text-lowercase" id=""></small><span id="j_id316" class="required">*</span>
                      </label>
                  </div>
                  <div class="value col-sm-12" id="">
                      <input id="bairro" type="text" value="${obj?.bairro}" class="readonly inputText" style="width: 85%;">
                  </div>
              </div><div class="propertyView col-sm-4" id="">
                  <div id="fieldProcesso_Fluxo_prepararExpediente-8843915720Div" class="name">
                      <label for="logradouro" class="" id="">
                          Logradouro <small class="text-muted text-lowercase" id=""></small><span id="j_id329" class="required">*</span>
                      </label>
                  </div>
                  <div class="value col-sm-12" id="">
                      <input id="logradouro" type="text" value="${obj?.logradouro}" class="readonly inputText" style="width: 85%;">
                  </div>
              </div><div class="propertyView col-sm-4" id="">
                  <div id="fieldProcesso_Fluxo_prepararExpediente-8843915720Div" class="name">
                      <label for="numero" class="" id="">Número <small class="text-muted text-lowercase" id=""></small></label>
                  </div>
                  <div class="value col-sm-12" id="">
                      <input id="numero" type="text" value="${obj?.numero ? obj.numero : ''}" class="readonly inputText" maxlength="5" style="width: 85%;">
                  </div>
              </div><div class="propertyView col-sm-8" id="">
                  <div id="fieldProcesso_Fluxo_prepararExpediente-8843915720Div" class="name">
                      <label for="taskInstanceForm:Processo_Fluxo_prepararExpediente-8843915720:inputComplemento:txtComplemento" class="" id="">Complemento <small class="text-muted text-lowercase" id=""></small></label>
                  </div>
                  <div class="value col-sm-12" id="">
                      <input id="complemento" type="text" value="${obj?.complemento ? obj?.complemento : ''}" class="readonly inputText" style="width: 92%;">
                  </div>
              </div><div class="propertyView col-sm-3" id="">
                  
                  
              </div></div>        
          </div>
      </div>
      <input class="btn btn-primary" id="bntSalvarEnderecoARDigital" value="Salvar Localmente" type="button">
  </div>
      `
      const $this = jQ3(frag);
      //var __thisDeffered = jQ3.Deferred()
      const dadosDoFormulario = {
        objEnderecoOriginal : obj,
        objEnderecoAlterado: {},
        alteracoes: []
      }

      $this.find('input, select').change(function(){
        dadosDoFormulario.alteracoes.push( this.id )
      })


      $this.find('#bntSalvarEnderecoARDigital').click( ()=>{
        dadosDoFormulario.objEnderecoAlterado = {
            "uuid": obj?.uuid,
            "cep": $this.find('#cep').val(),
            "uf": $this.find('#uf').val(),
            "cidade": $this.find('#cidade').val(),
            "logradouro": $this.find('#logradouro').val(),
            "numero": $this.find('#numero').val(),
            "bairro": $this.find('#bairro').val(),
            "complemento": $this.find('#complemento').val()
        }

        butSaveCallback(dadosDoFormulario)
      } )

      return jQ3($this)
    }

    function _ObterElementoTagTRDaParteAtual(enderecosSelected){
      const $elementoTagTbodyDaDefinicaoDeEnderecos = jQ3('tbody').filter(function(){
        return this.id && 
               this.id.match(/taskInstanceForm:Processo_Fluxo_prepararExpediente-\d+:tabelaDestinatariosEndereco:tb/)
      })

      const [elementoTagTRDaParteAtual] = $elementoTagTbodyDaDefinicaoDeEnderecos.find('tr').filter(function(){
        const $thisTagTR = jQ3(this)
        if(! $thisTagTR.find('td:nth-child(4)').text().toLowerCase().includes('correios') )
          return false;

        const nomeParteDividida = enderecosSelected[0].data.destinatario.nome.split(' ')
        const textoTaLinhaTabela = $thisTagTR.text()
        
        let constaTodosAsPartesDoNomeDestinatario = true
        nomeParteDividida.forEach(parte=>{
          constaTodosAsPartesDoNomeDestinatario = constaTodosAsPartesDoNomeDestinatario && textoTaLinhaTabela.includes(parte)
        })

        return constaTodosAsPartesDoNomeDestinatario;
      })

      return jQ3(elementoTagTRDaParteAtual)
    }

    function _marcarAutomaticamenteUmEnderecoPorExpediente(enderecosSelected){
      /*const $elementoTagTbodyDaDefinicaoDeEnderecos = _ObterElementoTagTRDaParteAtual(enderecosSelected)
      if(!$elementoTagTbodyDaDefinicaoDeEnderecos.length)
        return;*/

      const $elementoTagInputUmExpedientePorEndereco = 
      enderecosSelected.at(0).$tdEnderecos.prev().find('input')

      $elementoTagInputUmExpedientePorEndereco.prop('checked', (enderecosSelected.length > 1) ? true : false );
    }

    function _recarregarSelecoesDoUsuario(enderecosSelected){ 
      const $elementoTagTbodyDaDefinicaoDeEnderecos = _ObterElementoTagTRDaParteAtual(enderecosSelected)
      if(!$elementoTagTbodyDaDefinicaoDeEnderecos.length)
        return;
      
      let $elementosTagAPagina = $elementoTagTbodyDaDefinicaoDeEnderecos.find('a:first')
      $elementosTagAPagina[0].dispatchEvent( new Event('click') )
    }

    function _avaliarSeEListaValida($el, emitEvent, extendedReturn){
      $el = $el || jQ3('[j2-ardigital-panel] input:checked')
      let EValida = undefined

      if( $el.is('input[type="radio"]') ){
        if( $el.prop('id') !== 'plp-new' )
          EValida = true
        else{
          if( $el.parents('tr').find('input[type="date"]').val() )
            EValida = true
          else
            EValida = false
        }
      }else if( $el.is('input[type="date"]') ){
        const $inputChecked = $el.parents('tbody').find('input[type="radio"]:checked')
        if( $inputChecked.length === 0 )
          EValida = false
        else if ( $inputChecked.prop('id') !== 'plp-new' )
          EValida = true
        else{
          if($el.parents('tr').find('input[type="date"]').val())
            EValida = true
          else
            EValida = false
        }
      }else{
        EValida = false
      }

      if(typeof emitEvent === 'undefined' || emitEvent === true)
        evBus.fire('on-select-a-plp', { EValida })

      return extendedReturn ? { EValida, $el } : EValida
    }

    return
  }

  observeParaARDigital()
}

function checkit___01() { // tappac as new 
  if (typeof jQ3 !== 'undefined' && typeof window.j2E !== 'undefined' ) {
    init();
  }else {
    setTimeout( checkit___01, 100 );
  }
} 
checkit___01();