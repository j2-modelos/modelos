/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log('htmlTools.js - módulo compilante');

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
        
    var isObject = new window.j2.mod._._201;
    var forEach = w.j2.mod.forEach;
    //var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    //var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
    var builder = j2.mod.builder;
    var this_ = pkg.monetario;
        
    pkg.HtmlTools = {
      elements : {
        core : function(inner){
          return  '<Definitions id="classeDefs" targetNamespace="http://j2" xmlns="http://j2" xsi:schemaLocation="http://j2 ../XML/j2.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
                    '<simpleElementsDefs>\n'+
                      inner + 
                    '</simpleElementsDefs>\n'+
                  '</Definitions>';
        },
        mainDiv : function(id, label, inner){
          return  '<elemento tag="div" id="'+ id +'" class="lightBorder" scope="NONE">\n' + 
                    '<elemento tag="div" class="width100" scope="NONE">\n' + 
                      '<elemento tag="p" class="p FntDocEditor AlignLeft" scope="NONE">' +
                        label +
                      '</elemento>\n' + 
                    '</elemento>\n' + 
                    '<elemento tag="div" class="width100 dispILFlex" scope="NONE">\n' + 
                      '<elemento tag="div" scope="NONE">\n' + 
                        '<HTMLAttribute name="style" value="width:5%;"/>\n' +
                        '<elemento tag="p" scope="NONE" class="p FntModDefault">\n' + 
                            '<textHTML scope="NONE">\n' + 
                                '<data>\n' + 
                                    '<![CDATA[<span>&nbsp;</span>]]>\n' + 
                                '</data>\n' + 
                            '</textHTML>\n' + 
                        '</elemento>\n' + 
                      '</elemento>\n' + 
                      '<elemento tag="div" class="width95" scope="NONE">\n' + 
                         inner +
                      '</elemento>\n' +                       
                    '</elemento>\n' + 
                  '</elemento>\n';
        }
      },        
      insertLinkSet : function(id, label, textLinkText, urlText){            
        var texts =
                '<elemento tag="div" class="width100 dispILFlex" scope="NONE">\n' + 
                  '<elemento tag="div" class="width30" scope="NONE">\n' + 
                    '<elemento tag="p" id="' + id + '.textLinkTextLabel" class="p FntDocEditor AlignCenter" scope="NONE">' +
                      textLinkText +
                    '</elemento>\n' + 
                  '</elemento>\n' + 
                  '<elemento tag="div" class="width70 edtCtrl" scope="NONE">\n' + 
                    '<elemento tag="input" id="' + id + '.textLinkText" class="p AlignCenter BrdRad3px FntDocEdt width100" scope="NONE">\n' + 
                      '<HTMLAttribute name="type" value="text"/>\n' + 
                      '<HTMLAttribute name="title" value="Deixar em branco para inserir apenas ícone padrão de vizualização do PJe."/>\n' + 
                    '</elemento>\n' + 
                  '</elemento>\n' +
                '</elemento>\n' +
                
                '<elemento tag="div" class="width100 dispILFlex" scope="NONE">\n' + 
                  '<elemento tag="div" class="width30" scope="NONE">\n' + 
                    '<elemento tag="p" id="' + id + '.urlTextLabel" class="p FntDocEditor AlignCenter" scope="NONE">' +
                      urlText +
                    '</elemento>\n' + 
                  '</elemento>\n' + 
                  '<elemento tag="div" class="dispTablCell width70 edtCtrl" scope="NONE">\n' + 
                    '<elemento tag="input" id="' + id + '.urlText" class="p AlignCenter BrdRad3px FntDocEdt width100" scope="NONE">\n' + 
                      '<HTMLAttribute name="type" value="text"/>\n' + 
                      '<HTMLAttribute name="placeHolder" value="http://tjma.jus.br"/>\n' + 
                      //'<HTMLAttribute name="size" value="14"/>\n' + 
                      //'<HTMLAttribute name="onkeypress" value="j2.mod.clsCnstr;.monetario.formatation.filtraNumeros(this, 16, event);"/>\n' + 
                    '</elemento>\n' + 
                  '</elemento>\n' +
                '</elemento>\n';
        
        var action = '<elemento tag="button" id="' + id + '.addAction" scope="NONE" class="p FntModeEditor width100 edtCtrl AlignCenter">\n' +
                          '<elemento tag="img" id="' + id + '.addActionImg" scope="NONE" >\n' +
                              '<HTMLAttribute name="src" value="https://pje.tjma.jus.br/pje/img/add.gif"/>\n' +
                          '</elemento>\n' +
                      '</elemento>\n';
        
        //var th ='<elemento tag="div" id="'+ id +'" class="width100 edtCtrl" scope="NONE">\n' + 
        var th ='<elemento tag="div" class="width100 dispILFlex" scope="NONE">\n' + 
                  '<elemento tag="div" scope="NONE">\n' + 
                    '<HTMLAttribute name="style" value="width:85%;float:left"/>\n' +
                    texts +
                  '</elemento>\n' + 
                  '<elemento tag="div" scope="NONE">\n' + 
                    '<HTMLAttribute name="style" value="width:15%;float:right;"/>\n' +
                    action +               
                  '</elemento>\n' + 
                '</elemento>\n';
        
        return pkg.HtmlTools.elements.core( 
                 pkg.HtmlTools.elements.mainDiv( id, label,
                   th
                 )
               );
      },
      insertPasteSet : function(id, label, textPasteText, urlText){            
        var texts = 
                  '<elemento tag="div" class="" scope="NONE">\n' + 
                    '<HTMLAttribute name="style" value="padding-right: 10px;width: 100%;max-width: 100%;margin: 0;"/>\n' + 
                    '<elemento tag="iframe" id="' + id + '-textTrasncription" class="" scope="NONE">\n' + 
                      '<HTMLAttribute name="title" value="' + textPasteText + '"/>\n' + 
                      '<HTMLAttribute name="contenteditable" value="true"/>\n' + 
                      '<HTMLAttribute name="style" value="min-height: 114px;height: 114px;border: 1px solid #55a171;padding: 5px;border-radius: 2px;overflow-y: scroll;overflow-x: hidden;text-overflow: clip;width: 95%; min-width: 95%; margin: auto;"/>\n' + 
                      '<HTMLAttribute name="srcdoc" value=""/>\n' + 
                    '</elemento>\n' + 
                  '</elemento>\n';
                  
        
        var action = '<elemento tag="button" id="' + id + '-addAction" scope="NONE" class="p FntModeEditor width100 edtCtrl AlignCenter">\n' +
                          '<HTMLAttribute name="title" value="Inserir transcrição do texto colado no quadro ao lado."/>\n' +
                          '<elemento tag="img" id="' + id + '-addActionImg" scope="NONE" >\n' +
                              '<HTMLAttribute name="src" value="https://pje.tjma.jus.br/pje/img/add.gif"/>\n' +
                          '</elemento>\n' +
                      '</elemento>\n';
              
        var action2 = '<elemento tag="button" id="' + id + '-addActionFromReferencia" scope="NONE" class="p FntModeEditor width100 edtCtrl AlignCenter">\n' +
                          '<HTMLAttribute name="title" value="Inserir transcrição da referência de documento."/>\n' +
                          '<elemento tag="img" id="' + id + '-addActionImgFromReferencia" scope="NONE" >\n' +
                              '<HTMLAttribute name="src" value="https://pje.tjma.jus.br/pje/img/view.gif"/>\n' +
                          '</elemento>\n' +
                      '</elemento>\n';              
        
        //var th ='<elemento tag="div" id="'+ id +'" class="width100 edtCtrl" scope="NONE">\n' + 
        var th ='<elemento tag="div" class="width100 dispILFlex" scope="NONE">\n' + 
                  '<elemento tag="div" scope="NONE">\n' + 
                    '<HTMLAttribute name="style" value="width:85%;"/>\n' +
                    texts +
                  '</elemento>\n' + 
                  '<elemento tag="div" scope="NONE">\n' + 
                    '<HTMLAttribute name="style" value="width:15%;"/>\n' +
                    action + action2 +             
                  '</elemento>\n' + 
                '</elemento>\n';
        
        return pkg.HtmlTools.elements.core( 
                 pkg.HtmlTools.elements.mainDiv( id, label,
                   th
                 )
               );
      },
      contructor_ : function(args){
        
      },
      createLinkInsertionSet : function(id, label, container){
        window.j2.mod.j2Moddle.fromXML(pkg.HtmlTools.insertLinkSet(id, label, 'Texto', 'Link'), 'j2:Definitions', function(err, definitions, context){
          if(definitions){
            builder.j2ElementParse(definitions.simpleElementsDefs.elemento[0], container);            
            
            var _ = {};
            forEach(container.getElementsByTagName('*'), function(el){
              switch(el.id){
                case id + '.addAction':
                  _.addAction = el;
                  _.addAction.onclick = function(event){ 
                    pkg.HtmlTools.insertLink(event, _);
                  }; 
                  break;
                case id + '.addActionImg':
                  _.addActionImg = el;
                  break;
                  
                case id + '.urlText':
                  _.urlText = el;
                  break;
                case id + '.urlTextLabel':
                  _.urlTextLabel = el;
                  break;
                  
                case id + '.textLinkText':
                  _.textLinkText = el;
                  break;
                case id + '.textLinkTextLabel':
                  _.textLinkTextLabel = el;
                  break;
                  
                case id:
                  _.core = el;
                  break;
              }
            });
            
            return _;
          }
          else
            err();
        });
        
      },
      insertLink : function(event, _){
        if(!(_.urlText.value.length)){
          pkg.ModalDialog.ok('O endereço para o link não é válido', 'HTML Tools j2 - Atenção');
          return;
        }
        var doc = {
          url :  _.urlText.value
        };
               
                
        /* prepare HTML element */
        var img = document.createElement('img');
        img.src = 'https://pje.tjma.jus.br/pje/img/view.gif';
        img.style.height = '12px';
        img.style.verticalAlign = 'bottom';
        
        var spn = document.createElement('span');
        var u = document.createElement('u');
        spn.style.cursor = 'pointer';
        spn.setAttribute('contenteditable', false);
        if(_.textLinkText.value.length)
          u.innerHTML = _.textLinkText.value;


        var spnBs = document.createElement('span');
        spnBs.innerHTML = '&nbsp;';

        var oCSrc = 'window.open(\'' + doc.url + '\', \'popUpLink' + Math.random().toString() + '\', \'width=780, height=740, scrollbars=1\').focus();';

        spn.setAttribute('onclick', oCSrc);
        img.setAttribute('onclick', oCSrc);

        spn.appendChild( u );
        u.appendChild( img );
        doc.html = {
          spn : spn,
          spnBs : spnBs
        };
        
        if(!(pkg.ReferenciaDocumento)){
          pkg.ModalDialog.ok('ERRO: html tools depende de referência de documeto', 'HTML Tools j2 - Atenção');
          return;
        }
        pkg.ReferenciaDocumento.processInsertion(doc, event, {id : 'linkSet', idDefText : 'linkSetDefaultText'});
      },
      createToolTip : function(prm){
        var toolTip;
                                        
        jQ(prm.parent).hover(
          function() {
            jQ(prm.parent).css({
              background: 'url("https://pje.tjma.jus.br/pje/a4j/g/3_3_3.Finalorg.richfaces.renderkit.html.GradientA/DATB/eAH7!!3Tj2v7mAAZZAV3.seam")',
              transition: 'background-color 7.0s linear'//,
              //backgroundColor : 'white'
            });
          }, function() {
            jQ(prm.parent).css({
              background: '',
              transition: ''
            });
          }
        );

                
        jQ(prm.parent).dblclick(function(e){
          if(mod.exp.gE(prm.parent.id + '.ToolTip'))
            return;
          
          evBus.once('Popup.close.' + prm.parent.id + '.ToolTip', 110000, function(){
            jQ(prm.parent).css('user-select', '');
            jQ(toolTip).fadeOut(300, function(){ toolTip.remove(); });
          });
          evBus.once('Popup.open.' + prm.parent.id + '.ToolTip', function(){
            jQ(prm.parent).css('user-select', 'none');
          });
                    
          toolTip = document.createElement('div');
          toolTip.id = prm.parent.id + '.ToolTip';
          j2.mod._.styleSetter(toolTip, 'popupDiv');
          pkg.Popup.createPopup(
            (prm.title) ? prm.title : 'Popup j2',
            (prm.event) ? prm.event : null,
            (prm.content) ? prm.content : null,
            { exp: toolTip, parent : prm.parent }, 
            function(){
              jQ(toolTip)
                .css('top', e.pageY + prm.parent.clientHeight + 10)
                .css('left', e.pageX - 100)
                .appendTo(mod.exp.doc.body).hide().fadeIn(300, function(){
                  jQ(toolTip).focus();
              });
              if(prm.callback)
                prm.callback(toolTip);
            }
          );
        });
      },
      /* pasting tool */
      createLinkPastingSet : function(id, label, container, eventFire){
        window.j2.mod.j2Moddle.fromXML(pkg.HtmlTools.insertPasteSet(id, label, 'Texto', 'Link'), 'j2:Definitions', function(err, definitions, context){
          if(definitions){
            builder.j2ElementParse(definitions.simpleElementsDefs.elemento[0], container);            
            
            var _ = {};
            /*forEach(container.getElementsByTagName('*'), function(el){
              switch(el.id){
                case id + '.addAction':
                  _.addAction = el;
                  _.addAction.onclick = function(event){ 
                    pkg.HtmlTools.insertLink(event, _);
                  }; 
                  break;
                case id + '.addActionImg':
                  _.addActionImg = el;
                  break;
                  
                case id + '.urlText':
                  _.urlText = el;
                  break;
                case id + '.urlTextLabel':
                  _.urlTextLabel = el;
                  break;
                  
                case id + '.textLinkText':
                  _.textLinkText = el;
                  break;
                case id + '.textLinkTextLabel':
                  _.textLinkTextLabel = el;
                  break;
                  
                case id:
                  _.core = el;
                  break;
              }
            });*/
            
            pkg.HtmlTools.prepareEditableIfreme();
            evBus.fire(eventFire, container);
            return _;
          }
          else
            err();
        });
        
      },
      createLinkPastingSet2 : function(id, label, container, eventFire){
        window.j2.mod.j2Moddle.fromXML(pkg.HtmlTools.insertPasteSet(id, label, 'Texto', 'Link'), 'j2:Definitions', function(err, definitions, context){
          if(definitions){
            builder.j2ElementParse(definitions.simpleElementsDefs.elemento[0], container);            
            
            var _ = {};
            
            var _f = $(container).find('#' + id + '-textTrasncription');
            if(_f)
              _f[0].srcdoc = '<html><body contenteditable style="margin: 0pt; font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; font-size: 9pt; text-align: justify;"></body></html>';
            
            evBus.fire(eventFire, container);
            return _;
          }
          else
            err();
        });
        
      },
      prepareEditableIfreme : function(){
        var _ = mod.edt.gE('pasteSetIntimacaoDJe-textTrasncription');
        if(!(_))
          return;
        
        _.srcdoc = '<html><body contenteditable style="margin: 0pt; font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; font-size: 9pt; text-align: justify;"></body></html>';
      },
      insertPaste : function(event, _){
        if(!(_.urlText.value.length)){
          pkg.ModalDialog.ok('O endereço para o link não é válido', 'HTML Tools j2 - Atenção');
          return;
        }
        var doc = {
          url :  _.urlText.value
        };
               
                
        /* prepare HTML element */
        var img = document.createElement('img');
        img.src = 'https://pje.tjma.jus.br/pje/img/view.gif';
        img.style.height = '12px';
        img.style.verticalAlign = 'bottom';
        
        var spn = document.createElement('span');
        var u = document.createElement('u');
        spn.style.cursor = 'pointer';
        spn.setAttribute('contenteditable', false);
        if(_.textLinkText.value.length)
          u.innerHTML = _.textLinkText.value;


        var spnBs = document.createElement('span');
        spnBs.innerHTML = '&nbsp;';

        var oCSrc = 'window.open(\'' + doc.url + '\', \'popUpLink' + Math.random().toString() + '\', \'width=780, height=740, scrollbars=1\').focus();';

        spn.setAttribute('onclick', oCSrc);
        img.setAttribute('onclick', oCSrc);

        spn.appendChild( u );
        u.appendChild( img );
        doc.html = {
          spn : spn,
          spnBs : spnBs
        };
        
        if(!(pkg.ReferenciaDocumento)){
          pkg.ModalDialog.ok('ERRO: html tools depende de referência de documeto', 'HTML Tools j2 - Atenção');
          return;
        }
        pkg.ReferenciaDocumento.processInsertion(doc, event, {id : 'linkSet', idDefText : 'linkSetDefaultText'});
      }
    };
   
    evBus.once('loaded-'+ window.j2.res.lib.htmlTools.lib, function(){
      pkg.HtmlTools.contructor_();
    }); 
   
  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.lib.htmlTools.lib;
  alert(t);
  console.error(t);

}
