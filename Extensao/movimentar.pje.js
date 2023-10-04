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
      conformarEnderecoARDigigal : function(enderecoString){
        if( typeof enderecoString === 'string' ){
          const hashCode = enderecoString.hashCode()
          enderecoString = j2E.ARDigital.util.parseEnderecosFrameComunicacao(enderecoString)
          enderecoString.hashCode = hashCode
        }

        return jQ3.extend({
          "indPrincipal": false,
          "indAtivo": true
        }, enderecoString )
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
}

function checkit___01() { // tappac as new 
  if (typeof jQ3 !== 'undefined' && typeof window.j2E !== 'undefined' ) {
    init();
  }else {
    setTimeout( checkit___01, 100 );
  }
} 
checkit___01();