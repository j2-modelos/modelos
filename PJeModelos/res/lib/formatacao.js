/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('formatacao.js - módulo compilante');

try {
  (function () { /* inits autoexec */
    var w = window;
    var evBus = window.j2.mod.eventBus.EventBus;
    
    var pkg;
    if (w.j2.mod.clsCnstr)
      pkg = w.j2.mod.clsCnstr;
    else{
      w.j2.mod.clsCnstr = {};
      pkg = w.j2.mod.clsCnstr;
    }
    
        
    pkg.Formatacao = {
      formataCpfCnpj : function (campo,e){
        var tecla = e? e.keyCode: 0;
        var s = pkg.Formatacao.filtraCampo(campo.value);
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
        if (formata) campo.value = s;
        return valido;
      },
      retornaCpfCnpjFormatado : function (campo){
        var s = pkg.Formatacao.filtraCampo(campo.value);
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
      },
      formataCpfCnpjCompleto : function (campo,e){
        var tecla = e? e.keyCode: 0;
        var s = pkg.Formatacao.filtraCampo(campo.value);
        if (s.length>14) s=s.substr(0,14); //limita a 14 digitos
        var valido = false; //valida só o tamanho
        if (s.length==11) {
          s = s.substr(0, 3) + '.' + s.substr(3, 3) + '.' + s.substr(6, 3) + '-' + s.substr(9, 2);
          valido = true;
        } else if (s.length==14) {
          s = s.substr(0, 2) + '.' + s.substr(2, 3) + '.' + s.substr(5, 3) + '/' + s.substr(8, 4) + '-' + s.substr(12, 2);
          valido = true;
        }
        var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
        if (formata) campo.value = s;
        return valido;
      },
      formataCnpj : function (campo,e){
        var tecla = e? e.keyCode: 0;
        var s = pkg.Formatacao.filtraCampo(campo.value);
        if (s.length>14) s=s.substr(0,14); //limita a 14 digitos
        var valido = false; //valida só o tamanho
        if (s.length==14) {
          s = s.substr(0, 2) + '.' + s.substr(2, 3) + '.' + s.substr(5, 3) + '/' + s.substr(8, 4) + '-' + s.substr(12, 2);
          valido = true;
        }
        var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
        if (formata) campo.value = s;
        return valido;
      },
      formataCpf : function (campo,e){
        var tecla = e? e.keyCode: 0;
        var s = pkg.Formatacao.filtraCampo(campo.value);
        if (s.length>11) s=s.substr(0,11); //limita a 11 digitos
        var valido = false; //valida só o tamanho
        if (s.length==11) {
          s = s.substr(0, 3) + '.' + s.substr(3, 3) + '.' + s.substr(6, 3) + '-' + s.substr(9, 2);
          valido = true;
        }
        var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
        if (formata) campo.value = s;
        return valido;
      },
      formataData : function (campo,e){
        var tecla = e? e.keyCode: 0;
        var s = pkg.Formatacao.filtraCampo(campo.value);
        if (s.length>8) s=s.substr(0,8); //limita a 8 digitos
        var valido = false; //valida só o tamanho
        if (s.length > 2 && s.length <= 4) {
          s = s.substr(0, 2) + '/' + s.substr(2, 2);
        } else if (s.length > 4) {
          s = s.substr(0, 2) + '/' + s.substr(2, 2) + '/' + s.substr(4, 4);
        }
        var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
        if (formata) campo.value = s;
        return valido;
      },
      formataHora : function (campo,e){
        var tecla = e? e.keyCode: 0;
        var s = pkg.Formatacao.filtraCampo(campo.value);
        if (s.length>6) s=s.substr(0,6); //limita a 6 digitos
        var valido = false; //valida só o tamanho
        if (s.length >= 2 && s.length < 4) {
          s = s.substr(0, 2) + ':' + s.substr(2, 2);
        } else if (s.length >=4) {
          s = s.substr(0, 2) + ':' + s.substr(2, 2) + ':' + s.substr(4, 2);
        }
        var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
        if (formata) campo.value = s;
        return valido;
      },
      formataHoraSemSegundos : function (campo,e){
        var tecla = e? e.keyCode: 0;
        var s = pkg.Formatacao.filtraCampo(campo.value);
        if (s.length>4) s=s.substr(0,4); //limita a 4 digitos
        var valido = false; //valida só o tamanho
        if (s.length >= 2) {
          s = s.substr(0, 2) + ':' + s.substr(2, 2);
        } 

        var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
        if (formata) campo.value = s;
        return valido;
      },
      removeValorEsquerda : function (campo, valor){
        var s = campo;
        for (var i=0; i<s.length; i++) {  
          if (s.substring(0, 1) == valor) {
            s = s.substring(1);
          } else {
            return s;		    
          }
        }	
        return s; 
      },
      filtraNumeros : function(campo,tamMax,e){
        if (e.keyCode==0) {
          var tecla = e.which;
          if (pkg.Formatacao.filtraCampo(campo.value).length>=tamMax || (tecla < 48 || tecla > 57)) {
              e.preventDefault();
          }
        }    
      },
      filtraCampo : function(valor){
        var validos="0123456789";
        var s = "";
        for (var i=0; i<valor.length; i++) {  
          if (validos.indexOf(valor.substring(i,i + 1))>=0){
            s = s + valor.substring(i,i + 1);
          }
        }
        return s;          
      }
    };
    

    
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.lib.formatacao.lib;
  alert(t);
  console.error(t);

}
