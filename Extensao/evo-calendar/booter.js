Date.prototype.newIsoAdjust = function(iso){
  return new Date(iso + 'T00:00:00'); 
};
String.prototype.toURLDropboxV2 = function(nomeArquivoComExtensao) {
  const _guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const resolveDomain = ()=>{
    let extensao = !nomeArquivoComExtensao ? 'pdf' : (()=>{
      const splited = nomeArquivoComExtensao.split('.')
      if(this.length > 1)
        return splited.pop()
      else
        return '[desconhecido]'
    })()
    
    switch(extensao){
      case 'pdf':
        return 'https://www.dropbox.com/scl/fi'

      default:
        return 'https://dl.dropboxusercontent.com/s'
    }
  } 

  const [idD, rlkey] = this.split(';')
  if(typeof idD !== 'undefined' && typeof rlkey !== 'undefined'){
    return `${resolveDomain()}/${
      idD}/${
        encodeURI(nomeArquivoComExtensao || _guid())
      }${nomeArquivoComExtensao ? '' : '.pdf'}?rlkey=${
        rlkey
      }&raw=1`
  }else
    return 'https://www.tjma.jus.br'
};
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

window.j2E = {};
j2E.Calendario = {
  constructor_ : function($calEvs, evoCal){
    var _hoje = new Date(new Date().setHours(0,0,0,0));
    j2E.Calendario.setFeriadosReligiosos(_hoje.getFullYear());
    j2E.Calendario.$CalendarioEventos =  $calEvs;
    j2E.Calendario.evoCalendar = evoCal;
  },  
  addEventsFromCurrMonth : function(currDate){
    var self = j2E.Calendario;
    var u = self.util;
    
    function __resolveTypeEvent($el){
      if($el.attr('negacaoDeMarco'))
        return 'holiday'
      return 'event';
    }
    function __resolveDateEvent($el){
      if(!($el.attr('dataFinal')))
        return u.parseData(currDate, $el.attr('dataInicial') );
      
      var ini = new Date().newIsoAdjust( u.parseData(currDate, $el.attr('dataInicial') ) );
      var fin = new Date().newIsoAdjust( u.parseData(currDate, $el.attr('dataFinal'), $el.attr('dataInicial').indexOf('YYAA') === 0 ) );
      var curs = ini;
      var dates = [];
      do{
        dates.push( u.toIso2( curs ) );
        curs = u.somarDias(curs, 1);
      }while( curs <= fin );
      
      return dates;
    }

    function __resolveBadge($el){
      const badgeText = []
      if( $el.attr('transferenciaEventoVigente') )
        badgeText.push('Transferido')

      if( $el.attr('negacaoDeMarco') )
        badgeText.push('Art. 224, § 1º')
      
      return badgeText.length ? badgeText.join(' | ') : null
    }

    function __resolveDescription($el){
      let dispLegsAr = []

      dispLegsAr = dispLegsAr.concat(
        $el.find('DisposicaoLegal')
        .toArray()
        .filter(disp => typeof jQ3(disp).attr('anoVigencia') === 'undefined' || jQ3(disp).attr('anoVigencia') == ( currDate ? currDate.getFullYear() : self.evoCalendar.$active.year ) )
        .map( disp => self.criarLinkParaDisposicaoLegal( jQ3(disp) )) 
      )

      return { jQ: dispLegsAr}
    }
      
    
    var $evsFilt = self.matchMonthCalendarioEventos(currDate);
    var evCalEvsFormat = [];
    
    $evsFilt.forEach(function(el){
      var $el = jQ3(el);
      var year = currDate ? currDate.getFullYear() : self.evoCalendar.$active.year;
      var month = currDate ? currDate.getMonth() : self.evoCalendar.$active.month;
      
      evCalEvsFormat.push({
        id: `${$el.attr('id')}-${month == 0 && $el.attr('dataInicial').startsWith('YYPP')
         ? year-1
         : year}`,
        name: $el.attr('descricao'),
        date: __resolveDateEvent($el),
        type: __resolveTypeEvent($el),
        badge: __resolveBadge($el),
        //everyYear: true // optional
        description: /*'vamos ver o css' ||*/ __resolveDescription($el),
        $CalendarioEvento: $el
      });
    });
    
    return { evCalEvsFormat : evCalEvsFormat, $evsFilt : $evsFilt };
  },
  $CalendarioEventos : jQ3([]),
  evoCalendar : null,
  feriadosReligiososPadroesCalculados : null,
  setFeriadosReligiosos : function (ano){
    var self = j2E.Calendario;
    
    if( ! self.feriadosReligiososPadroesCalculados || self.feriadosReligiososPadroesCalculados.ano !== ano )
      self.feriadosReligiososPadroesCalculados = self.padroesFeriadoReligiosos(ano);
  },
  monthFromIsoString : function (datePattern){
    var _feriadosReligiososPadroes = j2E.Calendario.feriadosReligiososPadroesCalculados;
    var _dtPt = _feriadosReligiososPadroes[datePattern] ? _feriadosReligiososPadroes[datePattern] : datePattern;
    var _id = _dtPt.split('-')[1];

    return {
      jsId : _id - 1,
      calId : _id
    };
  },
  matchMonthCalendarioEventos : function(currMonth){
    var self = j2E.Calendario;
    
    if(!(currMonth)){ 
      var _a = self.evoCalendar.$active;
      currMonth = new Date([_a.year, _a.month + 1, 1]);
    }
    currMonth.month = {
      jsId : currMonth.getMonth()
    };
    
    //var $arJoin = jQ3('a_____________________________b');
    var $arEvs  = [];
    if(currMonth.month.jsId === 0){
      var __mesAnterior = new Date( [ currMonth.getFullYear() -1, 12, 1 ]);
      var _$ = self.matchMonthCalendarioEventos(__mesAnterior) ;
      _$.forEach(function(el){
        var $el = jQ3(el).clone();
        
        if( $el.attr('dataInicial').includes("YYAA") ){
          $el.attr('dataInicial', $el.attr('dataInicial').replace("YYAA", "YYPP") );
        }
        else{
          $el.attr('dataInicial', $el.attr('dataInicial').replace("YYYY", "YYPP") );
        }
        
        $arEvs.push($el);
      });
    }
       
    
    self.setFeriadosReligiosos(currMonth.getFullYear());
    
    var $flt = self.$CalendarioEventos.filter(function(idx, el){
      var $el = jQ3(el);
      
      var _itInitIds = self.monthFromIsoString($el.attr('dataInicial'));

      if ($el.find('CancelamentoVigencia').length && $el.find('CancelamentoVigencia')?.toArray().some(cv=> { 
        return jQ3(cv).attr('anoVigencia') == currMonth.getFullYear() 
      })) return false

      if ($el.attr('explicitarVigencia') === 'true' && !$el.find('VigenciaExplicita')?.toArray().some(cv=> { 
        return jQ3(cv).attr('anoVigencia') == currMonth.getFullYear()
      })) return false

      if(!($el.attr('dataFinal'))){
        return _itInitIds.jsId === currMonth.month.jsId;
      }else{
        var _itFinIds = self.monthFromIsoString($el.attr('dataFinal'));

        if(_itFinIds.jsId < _itInitIds.jsId){
          return _itInitIds.jsId <= currMonth.month.jsId || _itFinIds.jsId >= currMonth.month.jsId;
        }else{  
          return _itInitIds.jsId <= currMonth.month.jsId && currMonth.month.jsId <= _itFinIds.jsId;
        }
      }
      
    });

    var __verificarTransferenciaDeData = function(calendarioEvento){
      var $calEv = jQ3 (calendarioEvento);

      jQ3($calEv).children('transferenciaEvento').each(function(idx, transf){
        var $transf = jQ3(transf);
        if($transf.attr('anoVigencia').toString() === currMonth.getFullYear().toString() ){
          $calEv.attr('transferenciaEventoVigente', $transf[0]);
          $calEv.attr('dataInicial', $transf.attr('dataInicial') );
          if( $transf.attr('dataFinal') )
            $calEv.attr('dataFinal', $transf.attr('dataFinal') );
        }
      });

      return $calEv[0];
    };
    
    $flt.each(function(idx, $el){
      $el = __verificarTransferenciaDeData($el);
      $arEvs.push($el);
    });
    
    return $arEvs;
  },
  padroesFeriadoReligiosos : function (ano) {
    function subtrairDias(data, dias){
      return new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
    }
    function somarDias(data, dias){
      return new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    }
    function toIso(data){
      data = new Date( data.setHours(0,0,0,0) );  
      var _isoStringAr = data.toISOString().split('T')[0].split('-');  
      return ['YYYY', _isoStringAr[1], _isoStringAr[2]].join('-');
    }  


    var X=24;
    var Y=5;
    var a=ano % 19;
    var b=ano % 4;
    var c=ano % 7;
    var d=(19* a + X) % 30;
    var e=(2*b + 4 * c + 6 * d + Y) % 7;
    var soma=d+e;

    if (soma > 9) {
      dia=(d+e-9);
      mes=03;
    }else {
      dia=(d+e+22);
      mes=02;
    }

    var _pascDate = new Date(ano,mes,dia);  
    var pascoa      = _pascDate;
    var pascoaSex   = subtrairDias(_pascDate, 2); 
    var pascoaQui   = subtrairDias(_pascDate, 3);  
    var pascoaQua   = subtrairDias(_pascDate, 4);    
    var corpusChr   = somarDias(_pascDate, 60);   
    var carnavalSeg = subtrairDias(_pascDate, 48); 
    var carnaval    = subtrairDias(_pascDate, 47); 
    var carnavalQua = subtrairDias(_pascDate, 46); 

    return {
      ano : ano,
      'YYYY-CARNAVAL' : toIso(carnaval),
      'YYYY-CARNAVAL-SEG' : toIso(carnavalSeg),
      'YYYY-CARNAVAL-TER' : toIso(carnaval),
      'YYYY-CARNAVAL-QUA' : toIso(carnavalQua),

      'YYYY-PASCOA' : toIso(pascoa),
      'YYYY-PASCOA-DOM' : toIso(pascoa),
      'YYYY-PASCOA-SEX' : toIso(pascoaSex),
      'YYYY-PASCOA-QUI' : toIso(pascoaQui),
      'YYYY-PASCOA-QUA' : toIso(pascoaQua),

      'YYYY-CORPUS'     : toIso(corpusChr)
    };  
  },
  criarLinkParaDisposicaoLegal : function($dispLeg){    
    var imgViewCln = jQ3('<img id="ReferenciaDocumento.View" src="https://pje.tjma.jus.br/pje/img/view.gif" style="vertical-align: bottom;">')[0]; 

    imgViewCln.style.height = '16px';
    imgViewCln.style.verticalAlign = 'text-bottom';

    var spn = document.createElement('span');
    var u = document.createElement('u');
    spn.style.cursor = 'pointer';
    spn.title = 'Visualizar ' + $dispLeg.attr('disposicao') + ( $dispLeg.attr('dataAto') ? ' de ' + $dispLeg.attr('dataAto') : '' );
    spn.setAttribute('contenteditable', false);
    u.innerHTML = $dispLeg.attr('disposicao') + ( $dispLeg.attr('refArtParInc') ? ', ' + $dispLeg.attr('refArtParInc') + ' ' : '' ); 



    var _url = $dispLeg.attr('url') ? $dispLeg.attr('url') : 
    ( $dispLeg.attr('idDropbox')
      ? 'https://www.dropbox.com/s/$/$.pdf?raw=1'.replace('$', $dispLeg.attr('idDropbox')).replace('$', encodeURI($dispLeg.attr('disposicao'))) 
      : ($dispLeg.attr('idDropboxV2')
         ? $dispLeg.attr('idDropboxV2').toURLDropboxV2(encodeURI(`${$dispLeg.attr('disposicao')}.pdf`).replaceAll('/', '-'))
         : '') );

    if( _url.length === 0 )
      return $dispLeg.attr('disposicao'); 

    var oCSrc = "window.open( '$', '$', 'width=940, height=740, scrollbars=yes').focus();";
    oCSrc = oCSrc.replace('$', _url).replace('$', guid());


    spn.setAttribute('onclick', oCSrc);
    imgViewCln.setAttribute('onclick', oCSrc);

    spn.appendChild( u );
    u.appendChild( imgViewCln );

    return spn;
  },
  contarPrazo : function(dataInicial, prazoAssinalado){
    const RESTRINGIR_A_NEGACAO_MARCO = true
    var self = j2E.Calendario;
    var u = self.util;
    
    let iteracaoPrazo = prazoAssinalado
    let comecoExcluido = false
    
    dataInicial = new Date().newIsoAdjust(u.toIso2(dataInicial)); 
     
    do{
      //art 224, § 1º, protraíndo pro próximo dia útil
      if(! comecoExcluido)
        while( ! u.EValidaPraContagemDeData(dataInicial, true, RESTRINGIR_A_NEGACAO_MARCO))
          dataInicial = u.somarDias(dataInicial, 1);
      
      dataInicial = u.somarDias(dataInicial, 1);
      comecoExcluido = true

      self.setFeriadosReligiosos(dataInicial.getFullYear());
      
      while( ! u.EValidaPraContagemDeData(dataInicial, (iteracaoPrazo == 1)) ){
        dataInicial = u.somarDias(dataInicial, 1);
      }

      iteracaoPrazo --;
    }while(iteracaoPrazo > 0);
    
    return u.toIso2(dataInicial);
  },
  util : {
    subtrairDias : function(data, dias){
      return new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
    },
    somarDias : function (data, dias){
      return new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    },
    toIso : function (data){
      data = new Date( data.setHours(0,0,0,0) );  
      var _isoStringAr = data.toISOString().split('T')[0].split('-');  
      return ['YYYY', _isoStringAr[1], _isoStringAr[2]].join('-');
    },
    toIso2 : function (data){
      data = new Date( data.setHours(0,0,0,0) );  
      return data.toISOString().split('T')[0];  
    },
    parseData : function(contextData, _data, incrementarAnoFinal){
      var self = j2E.Calendario;
      var _data = self.feriadosReligiososPadroesCalculados[_data] ? self.feriadosReligiososPadroesCalculados[_data] : _data;
      var year = contextData ? contextData.getFullYear() : self.evoCalendar.$active.year;
      
      
      var rep = [
        { key : 'YYYY', value : year + ( incrementarAnoFinal ? 1 : 0 ) },
        { key : 'YYAA', value : year },
        { key : 'YYPP', value : year - 1 }
      ];

      jQ3.each(rep, function(prop, value){
        _data = _data.replaceAll( value.key, value.value );
      });

      return _data;
    },
    EValidaPraContagemDeData : function(data, comecoOuFimDoPrazo, restritoANegacaoDeMarco){
      var self = j2E.Calendario;
      var u = self.util;
      var _this = u.EValidaPraContagemDeData;
      const __SAB = 6, __DOM = 0;
      
      if(data.getDay() === __SAB || data.getDay() === __DOM)
        return restritoANegacaoDeMarco ? true : false
      
      !_this.monthDates && ( _this.monthDates = {} )
      
      var _monthRef = data.getFullYear() + '.' + ( data.getMonth() + 1 ).toString().padStart(2, "0");
      if( ! _this.monthDates[ _monthRef ] ){
        var _ar = self.addEventsFromCurrMonth(data).evCalEvsFormat;
        _this.monthDates[_monthRef] = [];
        
        _ar.forEach(function(el){
          if( Object.prototype.toString.call(el.date) === '[object Array]' )
            el.date.forEach(function(ell){
              _this.monthDates[_monthRef].push({
                dt: ell,
                $cev: el.$CalendarioEvento
              });
            });
          else
            _this.monthDates[_monthRef].push({
              dt: el.date,
              $cev: el.$CalendarioEvento
            });
        });
      }
      return _this.monthDates[_monthRef].filter(function(it){
        if(u.toIso2(data) === it.dt){
          if(typeof it.$cev.attr('negacaoDeMarco') !== 'undefined')
            return comecoOuFimDoPrazo ? true : false
          else if(restritoANegacaoDeMarco)
            return false
          else
            return true
        }else
          return false
      }).length === 0;
    }
  }
};
        
function initEvoCalendar(){
  var j2Cal = j2E.Calendario;
  
  
  function _updateMonth(event, active, idx){
    j2Cal.evoCalendar.addCalendarEvent( j2Cal.addEventsFromCurrMonth().evCalEvsFormat );
  }
  
  jQ3('#j2Calendar:not([inicializado])').on('evoCalendarInit', function(event, evCal) {
    this.setAttribute('inicializado', 'sim')

    function __handlerXmlDoc(xmlDoc){
      var j2CalEv = jQ3('CalendarioEvento', xmlDoc);
      
      j2Cal.constructor_(j2CalEv, evCal);
      
      evCal.j2E = {};
      evCal.j2E.j2Calendario = j2Cal;
      
      evCal.addCalendarEvent( j2Cal.addEventsFromCurrMonth().evCalEvsFormat );
      
    }

    if(window.opener.sessionStorage.getItem('j2EExtensionURLPattern'))
      jQ3.get(window.opener.sessionStorage.getItem('j2EExtensionURLPattern')  + 'PJeModelos/res/XML/Calendario.xml', __handlerXmlDoc);
    else
    __handlerXmlDoc(j2.env.xmls.calendario)

  }).evoCalendar({
    theme : 'Royal Navy',
    language : 'pt',
    format : 'dd/mm/yyyy',
    titleFormat : 'MM yyyy',
    eventHeaderFormat : 'dd MM yyyy',
    todayHighlight : true,
    sidebarToggler : false,
    eventListToggler : false
  })
  .on('selectMonth', _updateMonth)
  .on('selectYear', _updateMonth)
  .on('selectDate', function(event, newDate, oldDate){
    /*if( ! j2Cal.util.EValidaPraContagemDeData(j2Cal.evoCalendar.$active.jsDate) )
      return;*/
    
    var __TEMPLATE__ = '<input type="number" value="0" style="text-align: center; width: 35px; background: transparent; color: white; border: none; margin: 0; -webkit-appearance: none;">';
    
    var dafultsDates = [];
    [5, 10, 15, 30].forEach(function(ds){
      dafultsDates.push({
        id:  'd-' + newDate + '-' + ds,
        description: ds + ' Dias',
        date: j2Cal.evoCalendar.$active.jsDate, 
        type: 'contagemPrazo',
        name: { text : j2Cal.contarPrazo( j2Cal.evoCalendar.$active.jsDate, ds ), formatDate : true },
        badge : ds
      });
    });
    
    var $calcInp = jQ3(__TEMPLATE__);    
    dafultsDates.push({
      id:  'd-Calculado-' + newDate,
      description: '------',
      date: j2Cal.evoCalendar.$active.jsDate, 
      type: 'contagemPrazo',
      name: 'Calcular',
      badge : { jQ : $calcInp },
      callback : function(markups, evoFormat){
        $calcInp.keyup(function(ev){
          if( markups.eventInfoDescription )
            markups.eventInfoDescription.text('Caculado: $ dias'.replace('$', $calcInp.val() ) );
          
          markups.eventInfoText.find('p-text').text( evoFormat( j2Cal.contarPrazo( j2Cal.evoCalendar.$active.jsDate, $calcInp.val() ) ) );
        });
      }
    });
    
    j2E.Calendario.evoCalendar.addCalendarEvent( dafultsDates );
  });
          
}

(function checkEvoCalendarReady() { // tappac as new
  if (typeof jQ3?.fn?.evoCalendar !== 'undefined') {
    setTimeout(initEvoCalendar, 1);
  }else {
    setTimeout( checkEvoCalendarReady, 10 );
  }
})()