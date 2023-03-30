/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var g_continue;
        var lkTarf; var c_val;
        var c;
        var lkTarf; var c_val; var params; var i;
        var DefDoc;
        var ob;
        g_continue = true;
        /*********************************/

        if (isDebug)
{

c_val = 72855;
        /* depende da var c_val  */

        c = myWindow.document.getElementById('c*##ControleId##*');
        if (c == null)
{
alert('Controle id c*##ControleId##* não foi encontrado');
        return;
}

c.innerHTML = c_val;
}

else
{

lkTarf = window.parent.location.href;
        lkTarf = lkTarf.split('?')[1];
        params = lkTarf.split('&');
        c_val = 0;
        if (params.length != 0){
for (i = 0; i < params.length; i++){
if (params[i].split('=')[0] == 'idProcesso')
        c_val = params[i].split('=')[1];
}
}

/*d-c_val*/
if (c_val == 0)
{

DefDoc = document;
        c_val = '';
        /* depende da var c_val e DefDoc */

        c = DefDoc.getElementById('c*##ControleId2##*');
        if (c != null)
{
c.innerHTML = c_val;
}

/*********************************/

DefDoc = myWindow.document;
        ob = DefDoc.getElementById('c' + * ##Visibility## * );
        if (ob != null)
{
ob.style.visibility = 'hidden';
        ob.style.display = 'none';
        ob.setAttribute('mce_style', '');
        bo = null;
}

g_continue = false;
}

else
{

/* depende da var c_val  */

c = myWindow.document.getElementById('c*##ControleId##*');
        if (c == null)
{
alert('Controle id c*##ControleId##* não foi encontrado');
        return;
}

c.innerHTML = c_val;
}

/*********************************/

}


/*********************************/

if (g_continue) {

var DefDoc;
        var ndhe; /* non deleteble hidden element */

        /*********************************/

        DefDoc = myWindow.document;
        ndhe = DefDoc.getElementById('c*##NonDltHiddenElement##*');
        if (ndhe == null)
{
alert('Elemento não deletável c*##NonDltHiddenElement##* não foi encontrado pra registrar. (883)');
        return;
}

ndhe.setAttribute('name', 'ndhe');
        var ifC;
        var DefDoc;
        var c; var cln;
        var ap;
        ifC = document.getElementById('c*##IfExistControl##*');
        if (ifC != null){

DefDoc = myWindow.document;
        c = DefDoc.getElementById('c*##CloneNode##*');
        if (c == null)
{
alert('Não encontrado elemento c*##CloneNode##*. (880)');
        return;
}

cln = c.cloneNode(true);
        /*********************************/

        DefDoc = document;
        /*dp cln*/
        ap = DefDoc.getElementById('c*##ToAppendNode##*');
        if (ap == null)
{
alert('Não encontrado elemento c*##ToAppendNode##*. (881)');
        return;
}

ap.appendChild(cln);
}



}

