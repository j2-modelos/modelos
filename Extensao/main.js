
 
function lg(t,d){
  if(d) 
    console.log(t, d);
  else
    console.log(t);
};

function somarDiasDeHoje(dias){
  var data = new Date();
  data = new Date( data.setHours(0,0,0,0) );  
  data = new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000))
  var _isoStringAr = data.toISOString().split('T')[0].split('-');  
  return [_isoStringAr[2], _isoStringAr[1], _isoStringAr[0]].join('/');
  
}


(function(){
  //addScript("jquery3.js");
  addStyleSheet("Extensao/main.css");
  addStyleSheet("Extensao/jquery-ui.css");
  //addScript("jquery.initialize.js");
  //addScript("jquery.observe.js");
  //addScript("main.js");
})();

var TarefasProps = {
  'Apensar processos' : {
    ADMGrupo : 'outac'
  },
  'Análise de perícia' : {
    altNomeADM : 'Controlar perícia',
    orgNome : 'Análise de perícia',
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    },
    altNome : 'Aguardando perícia do IML',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar perícia do IML'
      },
      transicaoManterApenasIgnorarESairTarefa : true,
      mostraAutosDigitais : true
    }
  },
  'Avaliar determinações do magistrado' :{
    personalizacao : {
      procedimentoEspecializado : 'ADM-reorganizarTarefas'
    }
  },
  'Avaliar Expediente Fechado' : {
    /*altNomeADM : 'Verificar decurso de prazo',
    ADMGrupo : 'agdStt',*/
    personalizacao : {
      'mostraAutosDigitais' : false,
      'mostraExpedientes' : true,
      mostraJuntarDocumento : true,
      'limpaCorpoTarefa' : true
    }
  },
  'Audiência realizada pelo magistrado' : {
    personalizacao : {
      mostraAutosDigitais : true
    }
  },
  'Certificar trânsito em julgado' : {
    ADMGrupo : 'exps'
  },
  'Certificar consulta INFOJUD' : {
    altNomeADM : 'Consultar INFOJUD',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta INFOSEG' : {
    altNomeADM : 'Consultar INFOSEG',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta SERASAJUD' : {
    altNomeADM : 'Consultar SERASAJUD',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta SIAFERJ' : {
    altNomeADM : 'Consultar SIAFERJ',
    ADMGrupo : 'cnslts'
  },
  'Certificar consulta SIEL' : {
    altNomeADM : 'Consultar SIEL',
    ADMGrupo : 'cnslts'
  },
  'Designar leilão' : {
    altNomeADM : 'Controlar leilão',
    ADMGrupo : 'outac'
  },
  'Designar audiência' : {
    ADMGrupo : 'aud',
    altNomeADM : 'Controlar audiência',
    ADMShortCut : 'A',
    personalizacao : {
       ADM : {
         estenderControlarAudiencia : true
       },
       painel : [
         {
           appendTo : 'form#taskInstanceForm table tr:first td:first',
           header : 'Orientações para designação de audiência',
           body : [
             {
               tipo : 'table',
               data : [
                 ["Caraterísticas", "Prazo designação", ""],
                 ["Pessoa jurídica recorrente na cidade", "30 dias", somarDiasDeHoje(30)],
                 ["Pessoa jurídica com procuradoria", "30 dias", somarDiasDeHoje(30)],
                 ["Pessoa jurídica fora da cidade", "40 dias", somarDiasDeHoje(40)],
                 ["Pessoa física fora da comarca", "50 dias", somarDiasDeHoje(50)],
                 ["Pessoa física dentro da comarca", "40 dias", somarDiasDeHoje(40)]
               ]
             }
           ]
         }
       ],
       removeDoCorpo : [
         "form#taskInstanceForm table tr:first td:first div:first"
       ]
     }
  },
  'Encaminhar para instância superior' : {
    personalizacao : {
      transicaoRemover : [
        'Encaminhar para TJMA',
        'Remetidos ao STJ',
        'Remetidos ao STF',
        'Remetidos ao TRF1'
      ]
    }
  },
  'Expedir alvará' : {
    ADMGrupo : 'exps'
  },
  'Expedir alvará 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir alvará 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir alvará 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir ato ordinatório' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta precatória 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir Carta ou mandado 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir Carta ou mandado 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir Carta ou mandado 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir certidão' : {
    ADMGrupo : 'exps'
  },
  'Expedir carta ou mandado' : {
    altNomeADM : 'Expedir mandado',
    ADMGrupo : 'exps'
  },
  'Preparar citação' : {
    altNomeADM : 'Expedir citação',
    ADMGrupo : 'exps',
    ADMShortCut : 'C'
  },
  'Preparar citação e(ou) intimação' : {
    altNomeADM : 'Expedir citação e(ou) intimação',
    ADMGrupo : 'exps',
    ADMShortCut : 'N'
  },
  'Expedir edital' : {
    ADMGrupo : 'exps'
  },
  'Preparar intimação' : {
    altNomeADM : 'Expedir intimação',
    ADMGrupo : 'exps',
    ADMShortCut : 'I'
  },
  'Expedir outros documentos' : {
    ADMGrupo : 'exps'
  },
  'Expedir múltiplos documentos' : {
    altNomeADM : 'Expedir vários documentos',
    altNome : 'Prosseguir outros status aguardando ',
    orgNome : 'Expedir múltiplos documentos',
    ADMGrupo : {
      org : 'exps',
      alt : 'agdStt'
    },
    personalizacao : {
      procedimentoEspecializado : 'ADM-reorganizarTarefas',
      ADM : {
        orgNaoEsmaecido : true
      }
    },
    orgName : 'Expedir múltiplos documentos',
    ADMGruposSet : 'A',
    hibrida : true
  },
  'Expedir notificação' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício 2' : {
    ADMGrupo : 'exps'
  },
  'Expedir ofício 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir precatório' : {
    altNome : 'Processo com prazo manual em curso',
    orgNome : 'Expedir precatório',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar decurso de prazo manual'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true,
      mostraAutosDigitais : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Expedir precatório 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir precatório2' : {
    altNome : 'Aguardando retorno de AR',
    altNomeADM : 'Expedir precatório 2',
    orgNome : 'Expedir precatório2',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar retorno de AR'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Expedir precatório 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir requisção de pequeno valor 1' : {
    ADMGrupo : 'exps'
  },
  'Expedir requisção de pequeno valor 3' : {
    ADMGrupo : 'exps'
  },
  'Expedir RPV' : {
    altNome : 'Aguardando cumprimendo de mandado',
    orgNome : 'Expedir RPV',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar cumprimento de mandado'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Expedir RPV2' : {
    altNome : 'Aguardando cumprimendo de citação/intimação',
    orgNome : 'Expedir RPV2',
    altNomeADM : 'Expedir requisção de pequeno valor 2',
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar cumprimento de citação/intimação'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Processo com prazo decorrido' : {
    personalizacao : {
      'mostraAutosDigitais' : true,
      'mostraExpedientes' : true,
      'limpaCorpoTarefa' : true
    }
  },
  'Processo com prazo em curso' : {
    altNomeADM : 'Verificar decurso de prazo',
    ADMGrupo : 'agdStt',
    personalizacao : {
      'mostraAutosDigitais' : true,
      'mostraExpedientes' : true,
      'limpaCorpoTarefa' : true
    }
  },
  'Publicar ato do magistrado - DJE' : {
    altNome : 'Aguardando resposta de ofício',
    altNomeADM : 'Publicar ato do magistrado',
    orgNome : 'Publicar ato do magistrado - DJE',
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    },
    personalizacao : {
      ADM : {
        altNomeLabel : 'Aguardar resposta de ofício'
      },
      limpaCorpoTarefa : true,
      transicaoManterApenasIgnorarESairTarefa : true
    }
  },
  'Operações de perícia' : {
    altNome : 'Aguardando perícia do IML',
    orgNome : 'Operações de perícia',
    personalizacao : {
      limpaCorpoTarefa : true
    },
    ADMGrupo : {
      org : 'dmsTrf',
      alt : 'agdStt'
    }
  },
  'Reclassificar documento' : {
    orgNome : 'Reclassificar documento',
    ADMGrupo : 'outac'
    /*personalizacao : {
      limpaCorpoTarefa : true
    },*/
  },
  'Retificar dados do processo' : {
    orgNome : 'Retificar processo',
    ADMGrupo : 'outac',
    altNomeADM : 'Retificar processo'
    /*personalizacao : {
      limpaCorpoTarefa : true
    },*/
  },
  getPseudotarefas : function(callback){
    var pseudoTarefas = new PseudoTarefas();
    var _ = [];
    
    /*onceAndDelay(function(){ */ pseudoTarefas.listarTarefas(function(data, status){
      if(status === "success"){
        $.each(data.data, function(idx, item){
          var _new = {};
          _new[item.nome] = {
            EPseudo : true,
            orgNome : 'Pseudotarefa',
            pseNome : item.nome
          };
          
          $.extend(_new[item.nome], item);
          
          TarefasProps[item.nome] = new PseudoTarefa( _new[item.nome] ) ;
          
          _.push(TarefasProps[item.nome]);
        });
        
        callback && callback(_);
      }
    }); /*}); */
  },
  'Preparar intimação de suspensão de processo' : {
    ADMGrupo : 'outac',
    altNomeADM : 'Suspender tramitação do processo'
  },
  'Selecionar tipo de penhora' : {
    ADMGrupo : 'outac',
    altNomeADM : 'SISBAJUD / RENAJUD'
  },
  'Triagem':{
    personalizacao : {
      'mostraAutosDigitais' : true
    }
  },
  'Verificar providência a adotar' : {
    personalizacao : {
      'mostraAutosDigitais' : true,
      transicaoRemover : [
        'Alterar fluxo de tramitação do processo',
        '(SEJUD) Triagem de conclusão',
        'Enviar para psicossocial',
        'Enviar para partidoria',
        'Enviar para avaliação de bens'
      ]
    }
  },
  '(CEJUSC) Triagem de audiência' : {
     altNomeADM : 'Encaminhar para CEJUSC',
     personalizacao : {
       ADM : {
         desabilitar : true
       }
     },
     ADMGrupo : 'dmsTrf'
  }
};



function init(){
  window.lockr  = new createLockr('j2E');
  window.lockrSes  = new createLockr('j2E', 'sessionStorage');
  window.defer = new createDefer();
  window.delayCall = new DelayedCall(250, 1000);
  
  function defaultExibicao(){
    var div = document.createElement('div');
      div.innerHTML = 'j2';
      div.className = 'divTest';
      document.body.appendChild(div);
  };
  	
  function loadOrigin(){
    switch(window.location.origin){
      case 'https://frontend.prd.cnj.cloud':
        fronendLoad();
        break;
      case 'https://pje.tjma.jus.br':
        pjeLoad();
        break;
    }  	
  }
  
  function runTimeConnect(){
   /* window.j2E.conn = {};
    
    j2E.conn.reconnect = function(){
      j2E.conn.port = chrome.runtime.connect(sessionStorage.getItem('j2EExtensionID'), { 
        includeTlsChannelId : true, 
        name : window.location.origin 
      })
      j2E.conn.port.onDisconnect.addListener(function() {
        console.warn('Reconnecting port ', j2E.conn.port.name);
        console.warn('Runtime last error ', chrome.runtime.lastError);
        j2E.conn.reconnect();
      });;*/
      /*j2E.conn.port.postMessageJ2E = function(load, callback, timeout, timeoutCallback){
        if(callback)
          j2E.conn._responseBus.register(load, callback, timeout, timeoutCallback);

        console.log('Posting message: ', load);
        j2E.conn.port.postMessage(load);
      };*/
   /* };*/
    /*j2E.conn.reconnect();
    
    j2E.conn._listeners = [];
    j2E.conn.onMessage = function(message, sender, sendRespose) {      
      var lis = j2E.conn.listeners;
      
      if(!(lis.length)){
        console.warn('Requisição não tratada: ', message, sender);
        return;
      }
      
      for(var i = 0; i < lis.length; i++ )
        lis[i].apply(null, [message, sender, sendRespose]);
    };


    j2E.conn.port.onMessage.addListener(j2E.conn.onMessage);*/
      
    j2E.mods.runTimeConnect(); 
  };
  
  runTimeConnect();
  defaultExibicao();
  loadOrigin();
};



function checkJQuery() { // tappac as new
  if (typeof jQ3 !== 'undefined' && typeof j2ELibRun !== 'undefined') {
    init();
  }else {
    defer( checkJQuery, 100 );
  }
}
checkJQuery();



       