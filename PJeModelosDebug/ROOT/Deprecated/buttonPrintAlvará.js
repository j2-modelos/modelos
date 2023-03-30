/* 
 * printer alvará pje 2.0
 */
function removeImageBlanks(imageObject) {
  var imgWidth = imageObject.width;
  var imgHeight = imageObject.height;
  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', imgWidth);
  canvas.setAttribute('height', imgHeight);
  var context = canvas.getContext('2d');
  context.drawImage(imageObject, 0, 0);

  var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
      data = imageData.data,
      getRBG = function(x, y) {
          var offset = imgWidth * y + x;
          return {
              red:     data[offset * 4],
              green:   data[offset * 4 + 1],
              blue:    data[offset * 4 + 2],
              opacity: data[offset * 4 + 3]
          };
      },
      isWhite = function (rgb) {
          return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
      },
      scanY = function (fromTop) {
      var offset = fromTop ? 1 : -1;
      for(var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
          for(var x = 0; x < imgWidth; x++) {
              var rgb = getRBG(x, y);
              if (!isWhite(rgb)) {
                  if (fromTop) {
                      return y;
                  } else {
                      return Math.min(y + 1, imgHeight - 1);
                  }
              }
            }
        }
        return null; 
      },
      scanX = function (fromLeft) {
      var offset = fromLeft? 1 : -1;

      for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

          for(var y = 0; y < imgHeight; y++) {
              var rgb = getRBG(x, y);
              if (!isWhite(rgb)) {
                  if (fromLeft) {
                      return x;
                  } else {
                      return Math.min(x + 1, imgWidth - 1);
                  }
              }      
          }
      }
      return null; 
  };

  var cropTop = scanY(true),
      cropBottom = scanY(false),
      cropLeft = scanX(true),
      cropRight = scanX(false),
      cropWidth = cropRight - cropLeft,
      cropHeight = cropBottom - cropTop;

  canvas.setAttribute('width', cropWidth);
  canvas.setAttribute('height', cropHeight);
  canvas.getContext('2d').drawImage(imageObject,
      cropLeft, cropTop, cropWidth, cropHeight,
      0, 0, cropWidth, cropHeight);

  /*return canvas.toDataURL().replace(/(\r\n|\n|\r)/gm, '');*/
  return canvas.toDataURL().replace(/(\\r\\n|\\n|\\r)/gm, '');
};

function _main(){
  var i;
  var Pg;
  var PgTot;
  var tbls;
  var tbla;
  var tbl;
  var imgs;
  var tds;
  var i;
  var spn;
  var img;
  var img2;
  var blFlSetFirmsPje;
  var PjeFirmDiv;
  var i;
  var tblCln;
  var CurPg;
  var CurPgSct;
  var CurPgBrk;
  var Exp2jec;
  var CntDiv;
  String.prototype.depId=function(Pg, Dp){ var stP='';
    var stD='';
    var iP=parseInt(Pg);
    var iD=parseInt(Dp);
    if(Pg !==0) stP='.' + (iP+1);
    if(Dp !==0) stD='-' + (iD+1);
    return (this + stP + stD);
  };
  /*********************************/ PgTot=0;
  for(i=1;;i++) { 
    Pg=document.getElementById( 'ExpPage' + i );
    if (Pg===null) break;
  } 

  if(i===0) { 
    alert('Erro ao preparar Alvará para impress&atildeo.Páginas n&atildeo foram encontradas.');
    return;
  }

  PgTot=i - 1;
  blFlSetFirmsPje=false;
  tbls=document.getElementsByTagName('table');

  if (tbls.length !==0) { 
    tbla=tbls[tbls.length - 1];
    tbl=tbla.cloneNode(true);

    if (tbl===null) { alert('Node tbl é nulo');
      return;
    } 
    imgs=tbl.getElementsByTagName('img');

    if (imgs.length===2){
      tds=tbl.getElementsByTagName('td');
      for (i=0;i < tds.length;i++){
        tds[i].style.fontFamily='Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        tds[i].style.fontSize='8px';
      } 

      spn=tbl.getElementsByTagName('span');

      for (i=0; i < spn.length;i++) { 
        spn[i].style.fontFamily='Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        spn[i].style.fontSize='8px';
      } 
      
      tds[tds.length-2].appendChild(tds[tds.length-1].getElementsByTagName('span')[0]);
      tds[tds.length-2].style.textAlign = 'right';

      /*img=imgs[0];
      img.style.width='45px';
      /*img.src='https://pje.tjma.jus.br'+img.src;
      */ 
      
      img2=imgs[1];
      img2.style.height='40px';
      tds[tds.length-1].style.width='40px';
      /*img2.src='https://pje.tjma.jus.br'+img2.src;
      */

      if (tbl===null) { 
        alert('tbl to insert linke assinatura firm is null.');
        return;
      } 

      blFlSetFirmsPje=true;
    } 
    if ( tbla !==null) 
      tbla.remove();
  } 
  /* depende de blFlSetFirmsPje e */ 
  if (blFlSetFirmsPje) { 
    for (i=0; i<PgTot; i++) { 
      PjeFirmDiv=document.getElementById('ExpFirmaEletronicaPJE'.depId(i,0));

      if(PjeFirmDiv===null) { 
        alert('Erro ao localizar elmento ExpFirmaEletronicaPJE'.depId(i,0) );
        continue;
      } 
      if(i===0) 
        PjeFirmDiv.appendChild(tbl);
      else { 
        tblCln=tbl.cloneNode(true);
        if(tblCln===null) { 
          alert('Erro ao clona PJEFIRMEl');
          continue;
        } 
        PjeFirmDiv.appendChild(tblCln);
      } 
    } 
  } 
  /*********************************/ 
  Exp2jec=document.getElementById('2jecivelExpediente');
  if(Exp2jec===null) { 
    alert('Erro ao localizar elemnto #2jecivelExpediente#.' );
    return;
  } 
  CntDiv=document.getElementById('CeteringDiv');

  if(CntDiv===null) { alert('Erro ao localizar elemnto #CeteringDiv#.' );
    return;
  } 
  for (i=1;i<=PgTot;i++){ 
    CurPg=document.getElementById('ExpPage'+i);
    if(CurPg===null) { 
      alert('Erro ao processar página ExpPage' + i + '.' );
      continue;
    } 
    Exp2jec.appendChild(CurPg);
    if(i < (PgTot) ) { 
      CurPgBrk=document.getElementById('Brk'+(i+1));
      if(CurPgBrk===null) { 
        alert('Erro ao processar page break Brk'+(i+1) + '.' );
        continue;
      } 
      Exp2jec.appendChild(CurPgBrk);
    } 
  } 
  CntDiv.remove();
  /*********************************/ 
  document.getElementById('ExpPrint').remove();
};

var mI = new Image();
mI.crossOrigin = 'Anonymous';
mI.onload = function(){
  mI.imgCodBarras.setAttribute('src', removeImageBlanks(mI));
  _main();
};
mI.imgCodBarras = document.getElementById('imgCodBarras');
mI.src = mI.imgCodBarras.src;
