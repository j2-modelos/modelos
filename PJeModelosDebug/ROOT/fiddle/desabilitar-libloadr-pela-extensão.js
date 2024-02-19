window.j2ModDebug = false
window.j2Extension = false
  window.j2.mod.com.URLGetter = new function () {

    var URL_PATERN;
    /*if (w.j2ModDebug)
      URL_PATERN = window.location.origin + '/';
    else
      URL_PATERN = 'https://pje.tjma.jus.br/pje/Painel/painel_usuario/documentoHTML.seam?idBin=';*/
    
    if (window.location.protocol === 'http:')
      URL_PATERN = window.location.origin;
    else
      URL_PATERN = window.location.protocol +  '//dl.dropboxusercontent.com/s/'; 
    
    
    function getURL(idDropboxV1OuV2OuCaminhoLegado, nomeDoArquivo) {
      if (window.location.protocol === 'https:'){
        if(!idDropboxV1OuV2OuCaminhoLegado.includes(';'))
          return URL_PATERN + idDropboxV1OuV2OuCaminhoLegado + '/' + nomeDoArquivo;
        else
          return idDropboxV1OuV2OuCaminhoLegado.toURLDropboxV2(nomeDoArquivo)
      }
      else
        return URL_PATERN + idDropboxV1OuV2OuCaminhoLegado;
    };

    return getURL;
  };/*********************************/