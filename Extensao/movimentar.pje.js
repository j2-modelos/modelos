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
              'X-KL-Ajax-Request': 'Ajax_Request'
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
              'X-KL-Ajax-Request': 'Ajax_Request'
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
              'X-KL-Ajax-Request': 'Ajax_Request'
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
      }
    },
    util : {
      conformarEnderecoARDigigal : function(enderecoString){
        return jQ3.extend({
          "indPrincipal": false,
          "indAtivo": true
        }, j2E.ARDigital.util.parseEnderecosFrameComunicacao(enderecoString))
      },
      validarEConformarDestinatarioCampos : destinatario =>{
        destinatario.nome.length > 50 && ( destinatario.nome = destinatario.nome.substr(0,49) )
        destinatario.enderecos.forEach((curr, idx) =>{
          curr.complemento && curr.complemento.length > 30 && ( curr.complemento = curr.complemento.substr(0,29) )  
        })

        return true;
      },
      parseEnderecosFrameComunicacao : endStr =>{
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
        return {
          "idUsuarioModificacao": 148007,
          "dthModificacao": new Date().toISOString(),
          "destinatario": destinatario,
          "servico": {
              "idUsuarioModificacao": 203109,
              "dthModificacao": "2023-03-16T11:32:12.000-0300",
              "indAtivo": true,
              "id": 10,
              "idCorreios": 109480,
              "codigo": "80888",
              "descricao": "CARTA A FATURAR CHANCELA",
              "label": "80888 - CARTA A FATURAR CHANCELA"
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
        return objA.destinatario.id === objB.destinatario.id
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