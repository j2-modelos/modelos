Date.prototype.newIsoAdjust = function(iso){
    return new Date(iso + 'T00:00:00'); 
};
function _buildClass() {
    if (!(window.j2E))
        window.j2E = {};
    if (!(window.j2E.mods))
        window.j2E.mods = {};

    j2E.mods.Calendario = {
        constructor_: function ($calEvs, evoCal) {
            var _hoje = new Date(new Date().setHours(0, 0, 0, 0));
            var self = j2E.mods.Calendario;
            self.setFeriadosReligiosos(_hoje.getFullYear());
            self.$CalendarioEventos = $calEvs;
            self.evoCalendar = evoCal;
        },
        addEventsFromCurrMonth: function (currDate) {
            var self = j2E.mods.Calendario;
            var u = self.util;

            function __resolveTypeEvent($el) {
                return 'event';
            }
            function __resolveDateEvent($el) {
                if (!($el.attr('dataFinal')))
                    return u.parseData(currDate, $el.attr('dataInicial'));

                var ini = new Date().newIsoAdjust(u.parseData(currDate, $el.attr('dataInicial')));
                var fin = new Date().newIsoAdjust(u.parseData(currDate, $el.attr('dataFinal'), $el.attr('dataInicial').indexOf('YYAA') === 0));
                var curs = ini;
                var dates = [];
                do {
                    dates.push(u.toIso2(curs));
                    curs = u.somarDias(curs, 1);
                } while (curs <= fin);

                return dates;
            }


            var $evsFilt = self.matchMonthCalendarioEventos(currDate);
            var evCalEvsFormat = [];

            $evsFilt.forEach(function (el) {
                var $el = jQ3(el);
                var year = currDate ? currDate.getFullYear() : self.evoCalendar.$active.year;

                evCalEvsFormat.push({
                    id: $el.attr('id') + '-' + year,
                    name: $el.attr('descricao'),
                    date: __resolveDateEvent($el),
                    type: __resolveTypeEvent($el),
                    description: ($el.attr('transferenciaEventoVigente') ? '(transferido)' : null)
                    //everyYear: true // optional
                });
            });

            return { evCalEvsFormat: evCalEvsFormat, $evsFilt: $evsFilt };
        },
        $CalendarioEventos: jQ3([]),
        evoCalendar: null,
        feriadosReligiososPadroesCalculados: null,
        setFeriadosReligiosos: function (ano) {
            var self = j2E.mods.Calendario;

            if (!self.feriadosReligiososPadroesCalculados || self.feriadosReligiososPadroesCalculados.ano !== ano)
                self.feriadosReligiososPadroesCalculados = self.padroesFeriadoReligiosos(ano);
        },
        monthFromIsoString: function (datePattern) {
            var _feriadosReligiososPadroes = j2E.mods.Calendario.feriadosReligiososPadroesCalculados;
            var _dtPt = _feriadosReligiososPadroes[datePattern] ? _feriadosReligiososPadroes[datePattern] : datePattern;
            var _id = _dtPt.split('-')[1];

            return {
                jsId: _id - 1,
                calId: _id
            };
        },
        matchMonthCalendarioEventos: function (currMonth) {
            var self = j2E.mods.Calendario;

            if (!(currMonth)) {
                var _a = self.evoCalendar.$active;
                currMonth = new Date([_a.year, _a.month + 1, 1]);
            }
            currMonth.month = {
                jsId: currMonth.getMonth()
            };

            //var $arJoin = jQ3('a_____________________________b');
            var $arEvs = [];
            if (currMonth.month.jsId === 0) {
                var __mesAnterior = new Date([currMonth.getFullYear() - 1, 12, 1]);
                var _$ = self.matchMonthCalendarioEventos(__mesAnterior);
                _$.forEach(function (el) {
                    var $el = jQ3(el).clone();

                    if ($el.attr('dataInicial').includes("YYAA")) {
                        $el.attr('dataInicial', $el.attr('dataInicial').replace("YYAA", "YYPP"));
                    }
                    else {
                        $el.attr('dataInicial', $el.attr('dataInicial').replace("YYYY", "YYPP"));
                    }

                    $arEvs.push($el);
                });
            }


            self.setFeriadosReligiosos(currMonth.getFullYear());

            var $flt = self.$CalendarioEventos.filter(function (idx, el) {
                var $el = jQ3(el);

                var _itInitIds = self.monthFromIsoString($el.attr('dataInicial'));

                if (!($el.attr('dataFinal'))) {
                    return _itInitIds.jsId === currMonth.month.jsId;
                } else {
                    var _itFinIds = self.monthFromIsoString($el.attr('dataFinal'));

                    if (_itFinIds.jsId < _itInitIds.jsId) {
                        return _itInitIds.jsId <= currMonth.month.jsId || _itFinIds.jsId >= currMonth.month.jsId;
                    } else {
                        return _itInitIds.jsId <= currMonth.month.jsId && currMonth.month.jsId <= _itFinIds.jsId;
                    }
                }

            });

            var __verificarTransferenciaDeData = function (calendarioEvento) {
                var $calEv = jQ3(calendarioEvento);

                jQ3($calEv).children('transferenciaEvento').each(function (idx, transf) {
                    var $transf = jQ3(transf);
                    if ($transf.attr('anoVigencia').toString() === currMonth.getFullYear().toString()) {
                        $calEv.attr('transferenciaEventoVigente', $transf[0]);
                        $calEv.attr('dataInicial', $transf.attr('dataInicial'));
                        if ($transf.attr('dataFinal'))
                            $calEv.attr('dataFinal', $transf.attr('dataFinal'));
                    }
                });

                return $calEv[0];
            };

            $flt.each(function (idx, $el) {
                $el = __verificarTransferenciaDeData($el);
                $arEvs.push($el);
            });

            return $arEvs;
        },
        padroesFeriadoReligiosos: function (ano) {
            function subtrairDias(data, dias) {
                return new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
            }
            function somarDias(data, dias) {
                return new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
            }
            function toIso(data) {
                data = new Date(data.setHours(0, 0, 0, 0));
                var _isoStringAr = data.toISOString().split('T')[0].split('-');
                return ['YYYY', _isoStringAr[1], _isoStringAr[2]].join('-');
            }


            var X = 24;
            var Y = 5;
            var a = ano % 19;
            var b = ano % 4;
            var c = ano % 7;
            var d = (19 * a + X) % 30;
            var e = (2 * b + 4 * c + 6 * d + Y) % 7;
            var soma = d + e;

            if (soma > 9) {
                dia = (d + e - 9);
                mes = 03;
            } else {
                dia = (d + e + 22);
                mes = 02;
            }

            var _pascDate = new Date(ano, mes, dia);
            var pascoa = _pascDate;
            var pascoaSex = subtrairDias(_pascDate, 2);
            var pascoaQui = subtrairDias(_pascDate, 3);
            var pascoaQua = subtrairDias(_pascDate, 4);
            var corpusChr = somarDias(_pascDate, 60);
            var carnavalSeg = subtrairDias(_pascDate, 48);
            var carnaval = subtrairDias(_pascDate, 47);
            var carnavalQua = subtrairDias(_pascDate, 46);

            return {
                ano: ano,
                'YYYY-CARNAVAL': toIso(carnaval),
                'YYYY-CARNAVAL-SEG': toIso(carnavalSeg),
                'YYYY-CARNAVAL-TER': toIso(carnaval),
                'YYYY-CARNAVAL-QUA': toIso(carnavalQua),

                'YYYY-PASCOA': toIso(pascoa),
                'YYYY-PASCOA-DOM': toIso(pascoa),
                'YYYY-PASCOA-SEX': toIso(pascoaSex),
                'YYYY-PASCOA-QUI': toIso(pascoaQui),
                'YYYY-PASCOA-QUA': toIso(pascoaQua),

                'YYYY-CORPUS': toIso(corpusChr)
            };
        },
        criarLinkParaDisposicaoLegal: function (dispLeg) {
            var imgViewCln = jQ3('<img id="ReferenciaDocumento.View" src="https://pje.tjma.jus.br/pje/img/view.gif" style="vertical-align: bottom;">')[0];

            imgViewCln.style.height = '16px';
            imgViewCln.style.verticalAlign = 'text-bottom';

            var spn = document.createElement('span');
            var u = document.createElement('u');
            spn.style.cursor = 'pointer';
            spn.title = 'Visualizar ' + dispLeg.disposicao + (dispLeg.dataAto ? ' de ' + dispLeg.dataAto : '');
            spn.setAttribute('contenteditable', false);
            u.innerHTML = dispLeg.disposicao + (dispLeg.refArtParInc ? ', ' + dispLeg.refArtParInc + ' ' : '');



            var _url = dispLeg.url ? dispLeg.url :
                (dispLeg.idDropbox ? 'https://www.dropbox.com/s/$/$.pdf?raw=1'.replace('$', dispLeg.idDropbox).replace('$', encodeURI(dispLeg.disposicao)) : '');

            if (_url.length === 0)
                return dispLeg.disposicao;

            var oCSrc = "window.open( '$', '$', 'width=940, height=740, scrollbars=yes').focus();";
            oCSrc = oCSrc.replace('$', _url).replace('$', guid());


            spn.setAttribute('onclick', oCSrc);
            imgViewCln.setAttribute('onclick', oCSrc);

            spn.appendChild(u);
            u.appendChild(imgViewCln);

            return spn;
        },
        contarPrazo: function (dataInicial, prazo) {
            var self = j2E.mods.Calendario;
            var u = self.util;

            dataInicial = new Date().newIsoAdjust(u.toIso2(dataInicial));

            do {
                dataInicial = u.somarDias(dataInicial, 1);
                self.setFeriadosReligiosos(dataInicial.getFullYear());

                while (!u.EValidaPraContagemDeData(dataInicial)) {
                    dataInicial = u.somarDias(dataInicial, 1);
                }
                prazo--;
            } while (prazo > 0);

            return u.toIso2(dataInicial);
        },
        util: {
            subtrairDias: function (data, dias) {
                return new Date(data.getTime() - (dias * 24 * 60 * 60 * 1000));
            },
            somarDias: function (data, dias) {
                return new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
            },
            toIso: function (data) {
                data = new Date(data.setHours(0, 0, 0, 0));
                var _isoStringAr = data.toISOString().split('T')[0].split('-');
                return ['YYYY', _isoStringAr[1], _isoStringAr[2]].join('-');
            },
            toIso2: function (data) {
                data = new Date(data.setHours(0, 0, 0, 0));
                return data.toISOString().split('T')[0];
            },
            parseData: function (contextData, _data, incrementarAnoFinal) {
                var self = j2E.mods.Calendario;
                var _data = self.feriadosReligiososPadroesCalculados[_data] ? self.feriadosReligiososPadroesCalculados[_data] : _data;
                var year = contextData ? contextData.getFullYear() : self.evoCalendar.$active.year;


                var rep = [
                    { key: 'YYYY', value: year + (incrementarAnoFinal ? 1 : 0) },
                    { key: 'YYAA', value: year },
                    { key: 'YYPP', value: year - 1 }
                ];

                jQ3.each(rep, function (prop, value) {
                    _data = _data.replaceAll(value.key, value.value);
                });

                return _data;
            },
            EValidaPraContagemDeData: function (data) {
                var self = j2E.mods.Calendario;
                var u = self.util;
                var _this = u.EValidaPraContagemDeData;
                var __SAB = 6, __DOM = 0;

                if (data.getDay() === __SAB || data.getDay() === __DOM)
                    return false;

                !_this.monthDates && (_this.monthDates = {});

                var _monthRef = data.getFullYear() + '.' + (data.getMonth() + 1).toString().padStart(2, "0");
                if (!_this.monthDates[_monthRef]) {
                    var _ar = self.addEventsFromCurrMonth(data).evCalEvsFormat;
                    _this.monthDates[_monthRef] = [];

                    _ar.forEach(function (el) {
                        if (Object.prototype.toString.call(el.date) === '[object Array]')
                            el.date.forEach(function (ell) {
                                _this.monthDates[_monthRef].push(ell);
                            });

                        else
                            _this.monthDates[_monthRef].push(el.date);
                    });
                }
                return _this.monthDates[_monthRef].filter(function (el) {
                    return u.toIso2(data) === el;
                }).length === 0;
            }
        }
    };
}

(()=>{
    let _build = ()=>{
        _buildClass()
      jQ3.get(window.sessionStorage.getItem('j2EExtensionURLPattern')  + 'PJeModelos/res/XML/Calendario.xml', function(xmlDoc){
        var j2CalEv = jQ3('CalendarioEvento', xmlDoc);
        
        j2E.mods.Calendario.__pseudoCal = {
          $active : {
            year : new Date().getFullYear(),
            month : new Date().getUTCMonth()
          },
          changeActive : newActive => j2E.mods.Calendario.__pseudoCal.$ = newActive
        };
        j2E.mods.Calendario.constructor_(j2CalEv, j2E.mods.Calendario.__pseudoCal);  
      });
    }
    function checkJQueryBuildCalendar() { // tappac as new
      if (typeof jQ3 !== 'undefined') {
        _build();
      }else {
        defer( checkJQueryBuildCalendar, 100 );
      }
    }
    checkJQueryBuildCalendar();
  })()