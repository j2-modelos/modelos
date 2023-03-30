/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
// Biblioteca que retorna o valor por extenso
// Pre-requisitos: Deve estar inserida juntamente com a biblioteca basico.js
// Autor: Guilherme Valenca 19/12/2001
// Ultima Atualização: 07/12/2004
//

function escreveValorExtenso(idOrigem) {

	var num = document.getElementById(idOrigem).value.replace(/\./g,"").replace(",",".");
	//var num = document.getElementById(idOrigem).value;
  	if (isNaN(num) || num<0) {
    	var sHTML="<font color='#0066FF'><b>(valor incorreto)</b></font>";
	} else {
		var extenso = Dinheiro_Extenso(num);
		if (extenso != null && extenso != "") { 
		    var sHTML = "<font color='#0066FF'><b>" + "(" + extenso + ")" + "</b></font>";
		} else {
			var sHTML = "&nbsp;";
		}
  	}	
	document.getElementById("div"+idOrigem).innerHTML = sHTML; 
	if ( eval(document.getElementById("hidden"+idOrigem)) ) {
		document.getElementById("hidden"+idOrigem).value = sHTML; 
	}
	return;
}

function valorExtenso(idOrigem) {
  var num = document.getElementById(idOrigem).value.replace(/\./g,"").replace(",",".");
  if (isNaN(num) || num<0) {
    var sHTML="(valor incorreto)";
  } else {
    var extenso = Dinheiro_Extenso(num);
    var sHTML = (extenso!="")? "(" + extenso + ")": "";
  }
  document.getElementById("extenso_"+idOrigem).innerHTML = sHTML; 
  return;
}









function eextensosimples(numero)
// retorna se o número é um extenso simples, sem concatenação com o e
{
if ((numero >=0 ) && (numero <=20)) {return true;}
if ((numero%10==0) && (numero<=100)) {return true;}
if ((numero%100==0) && (numero<=900)) {return true;}
return false;
}

function extensosimples(numero)
{
var extensos = new Array("zero", "um", "dois", "tr&ecirc;s", "quatro", "cinco", "seis", "sete", "oito",  "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte", "trinta", "quarenta", "cinqüenta", "sessenta", "setenta", "oitenta", "noventa", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos")
numero = numero%1000;
if (numero <= 20) {return extensos[numero];} 
else if (numero <= 100) {return extensos[parseInt(numero/10 + 18)];}
else {return extensos[parseInt(numero/100 + 27)];}
}

function trioextenso(numero)
// a funcao usa os 3 ultimos numerais do numero e ignora o restante
{
var ext = ""
var lig = ""
numero = Math.floor(numero%1000);
if (numero >= 100)
{
	if (numero==100) {return "cem";}
	ext = extensosimples(numero);
	numero = numero%100;
	if (numero==0) {return ext;}
	lig = " e "
}
if (numero <=20) {return ext + lig + extensosimples(numero);}
ext += lig + extensosimples(numero);
numero = numero%10;
if (numero==0) {return ext;}
return ext + " e " + extensosimples(numero);
}

function centavosextenso(numero)
{
//var num = Math.round(numero*100)%100
var num = 0;
if (numero != null && numero.length >= 2) {
    num = Math.round(numero.substring(numero.length-2));
}
if (num==0) {return "";}
if (num=="") {return "";}
return trioextenso(num) + ((num != 1)?" centavos":" centavo") + ((numero < 1)?" de real":"");
}

function Dinheiro_Extenso(numero)
{
var milhar = new Array("", "mil", "milh&otilde;es", "bilh&otilde;es", "trilh&otilde;es", "quatrilh&otilde;es");
var ext = centavosextenso(numero)
if (numero < 1) {return ext;}
//var num = Math.floor(numero)
var inteiro = numero;
var num = numero;
ext = ((num > 1)?"reais":"real") + ((ext != "")?" e ":"") + ext;
var trio = 0
var i = 0
var mi = ""
do
{
if ((i != 0) && (trio != 0) && eextensosimples(trio)) { ext = "e " + ext;}
trio = num%1000; numero = parseInt(numero/1000);
num = movePontoEsquerda(num);
if (trio != 0)
{
if (i != 0) {mi = (((trio != 1) || (i == 1))?milhar[i]+" ":milhar[i].substring(0,milhar[i].length-3) + "ão ");}
ext = trioextenso(trio) + " " + mi + (((ext.substring(0,6)=="reais") && (i > 1))?"de ":"") + ext;
}
i++;
} while (numero != 0)
return ext;
}
function movePontoEsquerda(valor) {
    var num = valor + "";
    var retorno = "";
    if (valor != null) {
        if (num.length >= 3) {
            var ponto = num.substring(num.length-3, num.length-2);
            var sb1 = num;
            var sb2 = "";
            if (ponto == ".") {
                sb1 = num.substring(0, num.length-3);
                sb2 = num.substring(num.length-2);
            }
            if (sb1.length == 3) {
                //retorno =  "0." + sb1 + sb2;
                retorno = "0";
            } else if (sb1.length > 3) {
//                retorno = sb1.substring(0,sb1.length-3) + "." + sb1.substring(sb1.length-3) + sb2;
                retorno = sb1.substring(0,sb1.length-3);
            } else if (sb1.length == 1) {
                //retorno = "0.00" + sb1 + sb2;
                retorno = "0";
            } else if (sb1.length == 2) {
                //retorno = "0.0" + sb1 + sb2;
                retorno = "0";
            }
        } else if (num.length == 2) {
            //retorno = "0.0" + num;
            retorno = 0;
        } else if (num.length == 1) {
            //retorno = "0.00" + num;
            retono = 0;
        }

    }
    return retorno;
}





//Uso: <input type="text" ...
//            onkeypress="filtraNumeros(this,16,event);"
//            onkeyup="FormataValor(this,event);"
//            onchange="FormataValor(this,event);"/>

if (typeof(isIE)=="undefined") isIE = document.all? true: false;


function FormataValor(campo,e) {
	var tecla = e? e.keyCode: 0;
	var s = FiltraCampo(campo.value);
	if (s.length>19) s=s.substr(0,19); //limita valor a 100 trilhões de reais menos 1 centavo
//	s = "" + parseInt("0" + s,10); //elimina zeros à esquerda
	s = "" + removeValorEsquerda(s, 0);
	var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
	if (true) campo.value = FormataValor2(s);
	return formata; //informa se fez formatação (usado, por exemplo, na rotina de número por extenso)
}

function filtraNumeros(campo,tamMax,e) {
  if (isIE) {
    var tecla = e.keyCode;
    if (FiltraCampo(campo.value).length>=tamMax || (tecla < 48 || tecla > 57)) window.event.keyCode=0;
  } else {
    if (e.keyCode==0) {
      var tecla = e.which;
      if (FiltraCampo(campo.value).length>=tamMax || (tecla < 48 || tecla > 57)) {
	  e.preventDefault();
      }
    }
  }
}

function FiltraCampo(valor) {//elimina todo caractere não numérico
	var validos="0123456789";
	var s = "";
	for (var i=0; i<valor.length; i++) {  
		if (validos.indexOf(valor.substring(i,i + 1))>=0){
		 	s = s + valor.substring(i,i + 1);
		}
	}
	return s;
}




function FormataValor2(valor) {
	var val = "";
	var tam = valor.length;
	if (valor == "0") {val = ""; tam = 0;}
	if ( tam == 1 ) {val = '0,0' + valor ;}
	if ( tam == 2 ) {val = '0,' + valor ;}
	if ( (tam > 2) && (tam <= 5) ) {val = valor.substr( 0, tam - 2 ) + ',' + valor.substr( tam - 2, tam );}
	if ( (tam >= 6) && (tam <= 8) ) {val = valor.substr( 0, tam - 5 ) + '.' + valor.substr( tam - 5, 3 ) + ',' + valor.substr( tam - 2, tam );}
	if ( (tam >= 9) && (tam <= 11) ) {val = valor.substr( 0, tam - 8 ) + '.' + valor.substr( tam - 8, 3 ) + '.' + valor.substr( tam - 5, 3 ) + ',' + valor.substr( tam - 2, tam );}
	if ( (tam >= 12) && (tam <= 14) ) {val = valor.substr( 0, tam - 11 ) + '.' + valor.substr( tam - 11, 3 ) + '.' + valor.substr( tam - 8, 3 ) + '.' + valor.substr( tam - 5, 3 ) + ',' + valor.substr( tam - 2, tam );}
	if ( (tam >= 15) && (tam <= 17) ) {val = valor.substr( 0, tam - 14 ) + '.' + valor.substr( tam - 14, 3 ) + '.' + valor.substr( tam - 11, 3 ) + '.' + valor.substr( tam - 8, 3 ) + '.' + valor.substr( tam - 5, 3 ) + ',' + valor.substr( tam - 2, tam );}
	if ( (tam >= 18) && (tam <= 20) ) {val = valor.substr( 0, tam - 17 ) + '.' + valor.substr( tam - 17, 3 ) + '.' + valor.substr( tam - 14, 3 ) + '.' + valor.substr( tam - 11, 3 ) + '.' + valor.substr( tam - 8, 3 ) + '.' + valor.substr( tam - 5, 3 ) + ',' + valor.substr( tam - 2, tam );}
	return(val);
}



function RetornaCpfCnpjFormatado(campo) {
	var s = FiltraCampo(campo.value);
	if (s.length>14) s=s.substr(0,14); //limita a 14 digitos
	var valido = false; //valida só o tamanho
	if (s.length==8) {
		s = s.substr(0, 2) + '.' + s.substr(2, 3) + '.' + s.substr(5, 3);
		valido = true;
	} else if (s.length==11) {
	    s = s.substr(0, 3) + '.' + s.substr(3, 3) + '.' + s.substr(6, 3) + '-' + s.substr(9, 2);
		valido = true;
	} else if (s.length==14) {
	    s = s.substr(0, 2) + '.' + s.substr(2, 3) + '.' + s.substr(5, 3) + '/' + s.substr(8, 4) + '-' + s.substr(12, 2);
		valido = true;
	}
	var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
	return s;
}









function removeValorEsquerda(campo, valor) {
	var s = campo;
	for (var i=0; i<s.length; i++) {  
		if (s.substring(0, 1) == valor) {
		 	s = s.substring(1);
		} else {
            return s;		    
		}
	}	
	return s; 
}

function filtraNumerosCampo(campo) {//elimina todo caractere não numérico
	var validos="0123456789";
	var s = "";
	var valor = campo.value;
	for (var i=0; i<valor.length; i++) {  
		if (validos.indexOf(valor.substring(i,i + 1))>=0){
		 	s = s + valor.substring(i,i + 1);
		}
	}
	
	campo.value = s;
	
}
