/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('monetario.js - módulo compilante');

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
    
    
    
    var mod = w.j2.modelo;
    //window.j2.mod.j2Moddle;
        
    //var isObject = new window.j2.mod._._201;
    var forEach = w.j2.mod.forEach;
    //var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    //var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    //var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var builder = j2.mod.builder;
    var this_ = pkg.monetario;
    var extend = window.j2.mod._._extend;
    
    pkg.monetario = extend(pkg.monetario || {}, {        

      imputSetMonetario : function(id, label){
        var _this = pkg.monetario;

        var _ver_1_0 = '<Definitions id="classeDefs" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                  '<simpleElementsDefs>\n'+
                    '<elemento tag="div" id="'+ id +'" class="dispTabl width100 edtCtrl" scope="NONE">\n' + 
                      '<elemento tag="div" class="dispTablCell width30" scope="NONE">\n' + 
                        '<elemento tag="p" class="p FntDocEditor AlignCenter" scope="NONE">' +
                          label +
                        '</elemento>\n' + 
                      '</elemento>\n' + 
                      '<elemento tag="div" class="dispTablCell width70 edtCtrl" scope="NONE">\n' + 
                        '<elemento tag="input" class="p AlignCenter BrdRad3px FntDocEdt width100" scope="NONE">\n' + 
                          '<HTMLAttribute name="type" value="text"/>\n' + 
                          '<HTMLAttribute name="placeHolder" value="12.354,75"/>\n' + 
                          '<HTMLAttribute name="size" value="14"/>\n' + 
                          //'<HTMLAttribute name="onkeypress" value="j2.mod.clsCnstr;.monetario.formatation.filtraNumeros(this, 16, event);"/>\n' + 
                        '</elemento>\n' + 
                        '</elemento>\n' + 
                      '</elemento>\n' +
                    '</simpleElementsDefs>\n'+
                  '</Definitions>';

        var _ver_4_0 = `
        <Definitions id="classeDefs" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <simpleElementsDefs>
              <elemento tag="div" classBS="container" id="${id}" scope="NONE">
                <elemento tag="form" classBS="needs-validation mb-1" scope="NONE">
                  <elemento tag="fieldset" scope="NONE">
                    <elemento tag="div" classBS="input-group mb-1" scope="NONE">
                      <!-- LABEL -->
                      <elemento tag="div" classBS="input-group-prepend" id="seletor-label-div-" scope="NONE">
                          <elemento tag="span" classBS="input-group-text" id="seletor-label-text-" scope="NONE">
                            ${label}
                          </elemento>
                      </elemento>
                      
                      <!-- INPUT -->
                      <elemento tag="input" scope="NONE" 
                        classBS="form-control" class="AlignCenter">
                        <HTMLAttribute name="type" value="text"/>
                        <HTMLAttribute name="placeholder" value="12.354,75"/>
                        <HTMLAttribute name="align" value="middle"/>
                        <HTMLAttribute name="aria-label" value="Definir um valor monetário"/>
                        <HTMLAttribute name="aria-describedby" value="Definir um valor monetário para a escrita por extenso"/>
                      </elemento>     
                    </elemento>
                  </elemento>
                </elemento>
              </elemento>
            </simpleElementsDefs>
          </Definitions>
        `;

        switch(_this.modelDefVersion){
          case 1.0:
            return _ver_1_0;
          case 4.0:
            return _ver_4_0;
          default:
            alert('lib monetário: a versão do modeldef é desconhecido. Carregada versão padrão')
            return _ver_1_0;
        }
      },
      inputMask : function(){
        
      },
      parseDoubleDinheiro : function(str){
        var num = str.replace(/\./g,"").replace(",",".");
        if (isNaN(num) || num<0)
          return null;
        return parseFloat(num);
      },
      writeExtense : function(field, sourceField){
        if(field){
          var num = sourceField.value.replace(/\./g,"").replace(",",".");
          //var num = document.getElementById(idOrigem).value;
          if (isNaN(num) || num<0)
            field.innerHTML = 'R$ #.###,## (valor incorreto)';
          else {
            var extenso = pkg.monetario.formatation.dinheiroExtenso(num);
            if (extenso !== null && extenso !== "")
              field.innerHTML = 'R$ '+sourceField.value + ' (' + extenso + ')';
            else
              var sHTML = 'R$ 0,00 (zero)';
          }
        }
      },
      createInputSetMonetario : function(id, label, container, fieldWriteExtenso, item, initialValue){
        window.j2.mod.j2Moddle.fromXML(pkg.monetario.imputSetMonetario(id, label), 'j2:Definitions', function(err, definitions, context){
          if(definitions){
            builder.j2ElementParse(definitions.simpleElementsDefs.elemento[0], container);
            /*forEach(container.childNodes, function(div){
              if(div.id === id){
                if(div.firstChild.nextSibling.firstChild){
                  var ip = div.firstChild.nextSibling.firstChild;
                  ip.onkeypress = function(event){
                    pkg.monetario.formatation.filtraNumeros(ip, 16, event);
                  };
                  ip.onkeyup = function(event){
                    pkg.monetario.formatation.formataValor(ip, 16, event);
                    pkg.monetario.writeExtense(fieldWriteExtenso, ip);
                  };        
                  ip.onchange = function(event){
                    pkg.monetario.formatation.formataValor(ip, 16, event);
                    pkg.monetario.writeExtense(fieldWriteExtenso, ip);                
                  };         
                  if(initialValue){
                    ip.value = initialValue;
                    ip.onchange();
                  }
                }
              }
            });*/
            var selQ = container.querySelectorAll(`#${id.jQId()}`);
            if(selQ.length){
              var div = selQ[0];

              var selQ = div.querySelectorAll('input');
              if(selQ.length){
                var ip = selQ[0];

                ip.onkeypress = function(event){
                  pkg.monetario.formatation.filtraNumeros(ip, 16, event);
                };
                ip.onkeyup = function(event){
                  pkg.monetario.formatation.formataValor(ip, 16, event);
                  pkg.monetario.writeExtense(fieldWriteExtenso, ip);
                };        
                ip.onchange = function(event){
                  pkg.monetario.formatation.formataValor(ip, 16, event);
                  pkg.monetario.writeExtense(fieldWriteExtenso, ip);                
                };         
                if(initialValue){
                  ip.value = initialValue;
                  ip.onchange();
                }  
              }
            }

            evBus.fire('afterCreateMonetarioControls.' + id);
          }
          else
            err();
        });
        
      },
      formatation : {
        /* retorna se o número é um extenso simples, sem concatenação com o e
         */
        eextensosimples : function(numero){
          if ((numero >=0 ) && (numero <=20)) {return true;}
          if ((numero%10==0) && (numero<=100)) {return true;}
          if ((numero%100==0) && (numero<=900)) {return true;}
          return false;
        },
        extensosimples : function(numero){
          var extensos = new Array("zero", "um", "dois", "tr&ecirc;s", "quatro", "cinco", "seis", "sete", "oito",  "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos");
          numero = numero%1000;
          if (numero <= 20) {return extensos[numero];} 
          else if (numero <= 100) {return extensos[parseInt(numero/10 + 18)];}
          else {return extensos[parseInt(numero/100 + 27)];}
        },
        trioextenso : function(numero){
          var ext = ""
          var lig = ""
          numero = Math.floor(numero%1000);
          if (numero >= 100)
          {
            if (numero==100) {return "cem";}
            ext = pkg.monetario.formatation.extensosimples(numero);
            numero = numero%100;
            if (numero==0) {return ext;}
            lig = " e "
          }
          if (numero <=20) {return ext + lig + pkg.monetario.formatation.extensosimples(numero);}
          ext += lig + pkg.monetario.formatation.extensosimples(numero);
          numero = numero%10;
          if (numero==0) {return ext;}
          return ext + " e " + pkg.monetario.formatation.extensosimples(numero);          
        },
        centavosextenso : function(numero){
          var num = 0;
          if (numero != null && numero.length >= 2) {
            num = Math.round(numero.substring(numero.length-2));
          }
          if (num==0) {return "";}
          if (num=="") {return "";}
          return pkg.monetario.formatation.trioextenso(num) + ((num != 1)?" centavos":" centavo") + ((numero < 1)?" de real":"");          
        },
        dinheiroExtenso : function(numero){
          var milhar = new Array("", "mil", "milhões", "bilhões", "trilhões", "quatrilhões");
          var ext = pkg.monetario.formatation.centavosextenso(numero);
          if (numero < 1) {return ext;}
          //var num = Math.floor(numero)
          var inteiro = numero;
          var num = numero;
          ext = ((num > 1.99999999999)?"reais":"real") + ((ext != "")?" e ":"") + ext;
          var trio = 0;
          var i = 0;
          var mi = "";
          do
          {
            if ((i != 0) && (trio != 0) && pkg.monetario.formatation.eextensosimples(trio)) { ext = "e " + ext;}
            trio = num%1000; numero = parseInt(numero/1000);
            num = pkg.monetario.formatation.movePontoEsquerda(num);
            if (trio != 0)
            {
            if (i != 0) {mi = (((trio != 1) || (i == 1))?milhar[i]+" ":milhar[i].substring(0,milhar[i].length-3) + "ão ");}
            ext = pkg.monetario.formatation.trioextenso(trio) + " " + mi + (((ext.substring(0,6)=="reais") && (i > 1))?"de ":"") + ext;
            }
            i++;
          } while (numero != 0)
          return ext;          
        },
        movePontoEsquerda : function(valor){
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
        },
        formataValor : function(campo, e){
          var tecla = e? e.keyCode: 0;
          var s = pkg.monetario.formatation.filtraCampo(campo.value);
          if (s.length>19) s=s.substr(0,19); //limita valor a 100 trilhões de reais menos 1 centavo
          //	s = "" + parseInt("0" + s,10); //elimina zeros à esquerda
          s = "" + pkg.monetario.formatation.removeValorEsquerda(s, 0);
          var formata = (tecla==0 || tecla==8 || tecla==13 || tecla==46 || (tecla>=48 && tecla<=57) || (tecla>=96 && tecla<=105));
          if (true) campo.value = pkg.monetario.formatation.formataValor2(s);
          return formata; //informa se fez formatação (usado, por exemplo, na rotina de número por extenso)          
        },
        filtraNumeros : function(campo,tamMax,e){
          if (e.keyCode==0) {
            var tecla = e.which;
            if (pkg.monetario.formatation.filtraCampo(campo.value).length>=tamMax || (tecla < 48 || tecla > 57)) {
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
        },
        formataValor2 : function(valor){
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
        },
        removeValorEsquerda : function(campo, valor){
          var s = campo;
          for (var i=0; i<s.length; i++) {  
            if (s.substring(0, 1) == valor)
              s = s.substring(1);
             else 
              return s;		    
          }	
          return s;           
        },
        filtraNumerosCampo : function(campo){
          var validos="0123456789";
          var s = "";
          var valor = campo.value;
          for (var i=0; i<valor.length; i++)
            if (validos.indexOf(valor.substring(i,i + 1))>=0)
                s = s + valor.substring(i,i + 1);
          campo.value = s;          
        }
      }
    });
    

    
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.lib.monetario.lib;
  alert(t);
  console.error(t);

}
