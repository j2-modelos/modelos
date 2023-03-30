/******** NECESSARY GLOBAL VAR ***********/
var sharedWindow;
var myWindow;
/***************************************/
/*** coide generated with Microsoft Access ***/
/**** starts functions advanced f724473 ****/
function f724473()
{
var w; var h;
var lf; var tp; var prm; var myWindow;
var ta; var hd; var ph; var scrp;

w  = 335;
h  = 490;

/* depende de w e h */
lf = (screen.width / 2) - (w /2);
tp = (screen.height / 2) - (h / 2);
prm = 'width=' + w + ', height=' + h + ', top=' + tp + ', left='+lf;
myWindow=window.open('', 'wndEditarExpediente#{processoTrfHome.instance.numeroProcesso}', prm);
myWindow.focus();/* depende de myWindow */
ta=document.getElementById('WS');
if(ta==null)
{
  alert('Codigo para editor de documento não foi localizado');
  return;
}

hd = myWindow.document.head;
if(ta==null)
{
  alert('Head element não foi encontrado');
  return;
}

myWindow.document.body.innerHTML = ta.innerHTML;

hd.innerHTML = '<title>Editar Documento</title>';
if(true)
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
var docClone = document.cloneNode(false);
        var newHtml = docClone.createElement('html');
        newHtml.innerHTML = this.responseText;

        docClone.appendChild(newHtml);

        var scriptText = docClone.getElementById('sourceCode').textContent;

        scrp = myWindow.document.createElement('script');
        scrp.type = 'text/javascript';
        scrp.charset = 'UFT-8';
        scrp.id = '8888888';
        scrp.defer = true;
        scrp.async = true;
        scrp.onload = function () {
          console.log('The script is loaded');
        };

        scrp.text = scriptText;

        hd.appendChild(scrp);
      
    }
  };
  xhttp.open('GET', '/javascriptSourceCodeTemplate.html', true);
  xhttp.send();


}myWindow.setTimeout(function () {
    var heightOffset = myWindow.outerHeight - myWindow.innerHeight;
    var widthOffset = myWindow.outerWidth - myWindow.innerWidth;
    var height = myWindow.document.getElementById('EditTools').clientHeight + heightOffset;
    var width = myWindow.document.getElementById('EditTools').clientWidth + widthOffset;
    /*var height = myWindow.document.body.clientHeight + heightOffset;
    var width = myWindow.document.body.clientWidth + widthOffset;*/
    height += 15;
    width += 18;
    myWindow.resizeTo(width, height);
    /*myWindow.focus();*/
}, 500);

/*********************************/

document.getElementById('WS').remove();
document.getElementById('DocEdiLauncher').remove();

/*********************************/

if(true){
  this.myWindow = myWindow;
}/*********************************/


}
/**** ends functions advanced f724473 ****/


/**** starts functions advanced f723455 ****/
function f723455()
{

/*************** CONSTRUCTOR MAIN ******************/

f724473(); /* ClassModel Id=376 ModeloBase=379 */
f727960(); /* ClassModel Id=488 ModeloBase=379 */
f727975(); /* ClassModel Id=480 ModeloBase=379 */


/*********************************/


}
/**** ends functions advanced f723455 ****/


/**** starts functions advanced f727736 ****/
function f727736()
{

/*********************************/


var mnEsl;
var DefDoc;
var dv; var stl;
var ob;

mnEst = '.menuItem { line-height: 22px; padding-left: 5px; cursor: pointer;} .menuItem:hover { background-color: #C7E5F0; border-bottom: 1px solid #4DB9E7; border-top: 1px solid #4DB9E7; }';

DefDoc = document;

/*********************************/

/* dp DefDoc */
dv = DefDoc.getElementById('c727684');
stl = DefDoc.createElement('style');
stl.innerHTML = mnEst;
dv.appendChild( stl );/*********************************/

ob = DefDoc.getElementById('c'+727822);
if (ob != null)
{
  ob.style.visibility = 'visible';
  ob.style.display = '';
  ob.setAttribute('mce_style', '');
  bo = null;
}ob = DefDoc.getElementById('c'+727855);
if (ob != null)
{
  ob.style.visibility = 'visible';
  ob.style.display = '';
  ob.setAttribute('mce_style', '');
  bo = null;
}
}
/**** ends functions advanced f727736 ****/


/**** starts functions advanced f727960 ****/
function f727960()
{
var ndhe; /* non deleteble hidden element */

/*************** CONSTRUCTOR ******************/

ndhe = document.getElementById('c727822');
if(ndhe==null)
{
  alert('Elemento não deletável c727822 não foi encontrado pra registrar.');
  return;
}

ndhe.setAttribute('name', 'ndhe');
}
/**** ends functions advanced f727960 ****/


/**** starts functions advanced f727975 ****/
function f727975()
{
var ndhe; /* non deleteble hidden element */

/*************** CONSTRUCTOR ******************/

ndhe = document.getElementById('c727684');
if(ndhe==null)
{
  alert('Elemento não deletável c727684 não foi encontrado pra registrar.');
  return;
}

ndhe.setAttribute('name', 'ndhe');ndhe = document.getElementById('c727966');
if(ndhe==null)
{
  alert('Elemento não deletável c727966 não foi encontrado pra registrar.');
  return;
}

ndhe.setAttribute('name', 'ndhe');
}
/**** ends functions advanced f727975 ****/


/**** starts functions advanced f727715 ****/
function f727715()
{
var c; var c_val;
var lf; var tp; var prm; var winList; var w; var h; var url;
var xmlHttp;
var g_continue;

c = document.getElementById('c724890');
if (c==null)
{
  alert('Controle c724890 não encontrado. (575)');
  return;
}

c_val = c.innerHTML;/* depende de w e h */
w = screen.width * 0.6;
h = screen.height * 0.6; 
lf = (screen.width / 2) - (w /2);
tp = (screen.height / 2) - (h / 2);
prm = 'width=' + w + ', height=' + h + ', top=' + tp + ', left='+lf;

url = 'https://pje.tjma.jus.br/pje/Processo/ConsultaProcesso/listAlertas.seam?id=' + c_val;

/*********************************/

xmlHttp=new XMLHttpRequest();

xmlHttp.onreadystatechange=function()
{

if (xmlHttp.readyState==4 && xmlHttp.status==200)
{

c_val = xmlHttp.responseText;

/*********************************/

g_continue = false;

if ( c_val.indexOf('Sem permiss') !=-1 ){
  if ( c_val.indexOf('o para acessar a p') !=-1 ){
    if ( c_val.indexOf('gina.')!=-1 ){
      g_continue = true;
    }
  }
}

if (g_continue) {

url = 'https://pje.tjma.jus.br/pje/Alerta/listView.seam';

window.open(url, 'wndAlerta', prm);

}

else
{

c = document.getElementById('c724890');
if (c==null)
{
  alert('Controle c724890 não encontrado. (575)');
  return;
}

c_val = c.innerHTML;window.open(url, 'wndAlerta' + c_val, prm);

}

}

if (xmlHttp.readyState==4 && xmlHttp.status==404)
{

alert('###### ERRO NO PROCEDIMENTO');

}

};

/* depende de stLinkProc */
xmlHttp.open('GET',url,true);
xmlHttp.send();


var DefDoc;
var ob;

DefDoc = document;

ob = DefDoc.getElementById('c'+727822);
if (ob != null)
{
  ob.style.visibility = 'hidden';
  ob.style.display = 'none';
  ob.setAttribute('mce_style', '');
  bo = null;
}ob = DefDoc.getElementById('c'+727855);
if (ob != null)
{
  ob.style.visibility = 'hidden';
  ob.style.display = 'none';
  ob.setAttribute('mce_style', '');
  bo = null;
}
}
/**** ends functions advanced f727715 ****/


/**** starts functions advanced f727786 ****/
function f727786()
{
var c; var c_val;
var lf; var tp; var prm; var winList; var w; var h; var url;

c = document.getElementById('c724890');
if (c==null)
{
  alert('Controle c724890 não encontrado. (575)');
  return;
}

c_val = c.innerHTML;/* depende de w e h */
w = screen.width * 0.8;
h = screen.height * 0.6; 
lf = (screen.width / 2) - (w /2);
tp = (screen.height / 2) - (h / 2);
prm = 'width=' + w + ', height=' + h + ', top=' + tp + ', left='+lf;

url = 'https://pje.tjma.jus.br/pje/Processo/movimentar.seam?idProcesso=' + c_val;

window.open(url, 'wndMovProc' + c_val, prm);


var DefDoc;
var ob;

DefDoc = document;

ob = DefDoc.getElementById('c'+727822);
if (ob != null)
{
  ob.style.visibility = 'hidden';
  ob.style.display = 'none';
  ob.setAttribute('mce_style', '');
  bo = null;
}ob = DefDoc.getElementById('c'+727855);
if (ob != null)
{
  ob.style.visibility = 'hidden';
  ob.style.display = 'none';
  ob.setAttribute('mce_style', '');
  bo = null;
}
}
/**** ends functions advanced f727786 ****/


/**** starts functions advanced f727763 ****/
function f727763()
{
var c; var c_val;
var lf; var tp; var prm; var winList; var w; var h; var url;

c = document.getElementById('c724890');
if (c==null)
{
  alert('Controle c724890 não encontrado. (575)');
  return;
}

c_val = c.innerHTML;/* depende de w e h */
w = screen.width * 0.8;
h = screen.height * 0.6; 
lf = (screen.width / 2) - (w /2);
tp = (screen.height / 2) - (h / 2);
prm = 'width=' + w + ', height=' + h + ', top=' + tp + ', left='+lf;

url = 'https://pje.tjma.jus.br/pje/Processo/RetificacaoAutuacao/updateRetificacaoAutuacao.seam?idProcesso=' + c_val+'&tab=tabPartes';

window.open(url, 'wndRetProc' + c_val, prm);


var DefDoc;
var ob;

DefDoc = document;

ob = DefDoc.getElementById('c'+727855);
if (ob != null)
{
  ob.style.visibility = 'hidden';
  ob.style.display = 'none';
  ob.setAttribute('mce_style', '');
  bo = null;
}ob = DefDoc.getElementById('c'+727822);
if (ob != null)
{
  ob.style.visibility = 'hidden';
  ob.style.display = 'none';
  ob.setAttribute('mce_style', '');
  bo = null;
}
}
/**** ends functions advanced f727763 ****/


