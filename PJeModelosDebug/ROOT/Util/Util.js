/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var globalListaInicial = [];
var globalListaDeProcura = [];

String.prototype.allMatches = function (re) {
  var _ = [];
  var _t;
  var m;

  _t = this;
  do {
    m = re.exec(_t);
    if (m) {
      _.push(m[0]);
      _t = _t.replace(re, "xxxxxxxxxxxxxxx");
    }
  } while (re.exec(_t));

  return _;
};

String.prototype.hashCode = function () {
  // as2
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function clearListaDeProcura() {
  globalListaDeProcura = [];
  $("#input").val("");
}

function listIt() {
  var _ = $("#input")
    .val()
    .allMatches(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/);
  var sep;
  switch ($("#sep").val()) {
    case "nl":
      sep = "\n";
      break;
    case "bnsp":
      sep = " ";
      break;
    case "dotCom":
      sep = ";";
      break;
    case "comSpace":
      sep = ", ";
      break;
  }

  if (_) {
    $("#output").val(_.join(sep));
  }
}

var _lastReadHash = 0;
function readIt() {
  var _ = $("#input")
    .val()
    .allMatches(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/);
  //var _ = $('#input').val().allMatches(/[0-9]{20}/);
  var sep;
  switch ($("#sep").val()) {
    case "nl":
      sep = "\n";
      break;
    case "bnsp":
      sep = " ";
      break;
    case "dotCom":
      sep = ";";
      break;
    case "comSpace":
      sep = ", ";
      break;
  }

  _thisReadHash = $("#input").val().toString().hashCode();

  if (_thisReadHash === _lastReadHash) {
    alert("Você já apresentou essa lista!");
    $("#input").val("");
    return;
  }

  _lastReadHash = _thisReadHash;

  if (_.length) {
    var _list = null;
    var _output = null;
    var _tot = null;

    switch ($("#lerPara").val()) {
      case "listaInicial":
        _list = globalListaInicial;
        _tot = "#listaInicialTotal";
        _output = "#output";
        break;
      case "listaProcura":
        _list = globalListaDeProcura;
        _tot = "#listaInicialProcura";
        _output = "#outputExpedientes";
        break;
      default:
        alert("####ERRO");
        return;
    }
    _.forEach(function (e) {
      _list.push(e);
    });
    $(_output).val(_list.join(sep));
    $("#input").val("");
    $(_tot).text(_list.length);
  }
}

function encodeIt() {
  try {
    $("#output").val(btoa(unescape(encodeURIComponent($("#input").val()))));
  } catch (e) {
    $("#output").val(e);
  }
}

function decodeIt() {
  try {
    $("#output").val(
      decodeURIComponent(escape(window.atob($("#input").val())))
    );
  } catch (e) {
    $("#output").val(e);
  }
}

function listDuplicadasIt() {
  var dup = [];
  var c = 0;
  var clone = [];

  globalListaInicial.forEach(function (e) {
    clone.push(e);
  });

  clone.forEach(function (e) {
    globalListaInicial.forEach(function (f) {
      if (e === f) c++;
    });
    if (c > 1) if (!dup.includes(e)) dup.push(e);

    c = 0;
  });

  if (dup.length > 0) $("#outputDuplicadas").val(dup.join("\n"));
  else $("#outputDuplicadas").val("SEM DUPLICATAS");
}

function listarExclusivos() {
  var _ = globalListaInicial;
  var isExclusivo = [];

  if (_) {
    _.forEach(function (e) {
      if (!globalListaDeProcura.includes(e))
        if (!isExclusivo.includes(e)) isExclusivo.push(e);
    });
  }

  if (isExclusivo.length > 0) $("#outputDuplicadas").val(isExclusivo.join("\n"));
  else
    $("#outputDuplicadas").val("NENHUM DOS PROCESSOS ESTÁ CONTIDO NA LISTAGEM");
}

function listContidosNosJaListados() {
  // similar ao readIt
  /*var _ = $('#input').val().allMatches(/[0-9]{7}\-[0-9]{2}\.[0-9]{4}\.[0-9]{1}\.[0-9]{2}\.[0-9]{4}/);
  var sep;
  switch($('#sep').val()){
    case 'nl':
      sep = '\n';
      break;
    case 'bnsp':
      sep = ' ';
      break;
    case 'dotCom':
      sep = ';';
      break;
    case 'comSpace':
      sep = ', ';
      break;
  }*/

  var _ = globalListaDeProcura;
  var isListed = [];

  if (_) {
    _.forEach(function (e) {
      if (globalListaInicial.includes(e))
        if (!isListed.includes(e)) isListed.push(e);
    });
  }

  if (isListed.length > 0) $("#outputDuplicadas").val(isListed.join("\n"));
  else
    $("#outputDuplicadas").val("NENHUM DOS PROCESSOS ESTÁ CONTIDO NA LISTAGEM");
}
