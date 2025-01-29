/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log('termoPeticao.js - módulo compilante');

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
    
    //var isObject = new window.j2.mod._._201;
    var forEach = w.j2.mod.forEach;
    var filter = new window.j2.mod._._90;
    //var assign = window.j2.mod._._206;
    //var domify = new window.j2.mod._._233;
    var evBus = window.j2.mod.eventBus.EventBus;
    //var parseVar = window.j2.mod._._parseVar;
    var j2Conv = window.j2.mod._._j2TagsConverter;
    //window.j2.mod.j2Moddle;
        
    pkg.TermoPeticao = {
      contructor_ : function(){
        _ = {
          mnt : mod.edt.gE('selectorMonitorpeticaoPedidosItems'),
          spnPed : mod.exp.gE('peticaoPedidos') 
        };
        
        pkg.TermoPeticao.Import = {};
        pkg.TermoPeticao.Import.TermoReclamacao = {};
        
        pkg.TermoPeticao.setEvents(_);
      }, 
      setEvents : function(_){
                
        evBus.on('onAdd.selectorpeticaoPedidosItems.petItWhatsAppAdesao', function(ev, arg){
          pkg.TermoPeticao.gerarDeclaracaoWhatsApp();
        });
        evBus.on('onDel.selectorpeticaoPedidosItems.petItWhatsAppAdesao', function(ev, arg){
          if( mod.edt.gE('WhatsAppInputs.Div') )
            mod.edt.gE('WhatsAppInputs.Div').remove();
        });
        
        evBus.on("afterChange." + _.mnt.id, function(event, objMnt, selectorObj){
          var spns = _.spnPed.getElementsByTagName('span');
          var seps = [];
          forEach(spns, function(spn){
            if(spn.getAttribute('name')==='sep')
              seps.push(spn);
          });
          
          var i = 1;
          forEach(seps, function(sep){
            if(i === seps.length)
              sep.innerHTML = '.';
            else
              sep.innerHTML = '; ';
            
            i++;
          });
        });
        
        
      },
      gerarDeclaracaoWhatsApp : function(){       
        if(!(pkg.AddtionalControls)){
          evBus.once('loaded-'+j2.res.mod.termoReclamacaoDef.lib, function(event, xml){
            console.log('fired once loaded-'+j2.res.mod.termoReclamacaoDef.lib);
            j2.env.xmls.termoReclamacao = xml;
            console.log('parsing window.j2.env.xmls.termoReclamacaoDef');

            j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
              if(definitions)
                j2.env.xmls.termoReclamacao = definitions;

              if (err){
                j2.err('err get defintions from XML - TermoReclamacao Classes Definitions (termoReclamacaoDef)');
                j2.err(err);
              }

              /* reload */
              j2.mod.builder.agregateClassDefs();
              j2.mod.com.libLoader(j2.res.mod.termoReclamacao_);
            });
          });


          evBus.once('loaded-'+j2.res.mod.termoReclamacao_.lib, function(event, xml){
            console.log('fired once loaded-'+j2.res.mod.termoReclamacao_.lib);          
            pkg.TermoPeticao.Import.TermoReclamacao.modeloDef = xml; 

            j2.mod.j2Moddle.fromXML(xml, 'j2:Definitions', function (err, definitions, context) {
              if(definitions)
                pkg.TermoPeticao.Import.TermoReclamacao.modeloDef = definitions;

              if (err){
                j2.err('err get defintions from XML - Import de TermoReclamacao Modelo');
                j2.err(err);
              }

              j2.mod.com.libLoader( j2.res.MAIN.addtionalControls );
            });
          });    

          evBus.once('TermoPeticao.afterParseTermoReclamacaoDef', function(event, xml){
              var decVersion = pkg.TermoPeticao.Import.TermoReclamacao.modeloDef.modelos[2].versao[0];
              if(pkg.TermoPeticao.Import.TermoReclamacao.modeloDef.modelos[2].classStyles)
                decVersion.classStyles = pkg.TermoPeticao.Import.TermoReclamacao.modeloDef.modelos[2].classStyles;
              j2.mod.builder.build(decVersion, 'declWA', 
              { exp : mod.sup.declWA.doc.body, 
                j2Win : mod.sup.declWA 
            } );    
          });

          evBus.once('TermoPeticao.afterParseTermoReclamacaoDef2', function(event, xml){
              /*var selP = pkg.TermoPeticao.parteInterface;
              if(!(selP.binding)){
                pkg.ModalDialog.ok('Erro ao gerar declaração.', 'TermoDeReclmação j2 - Erro', null, null,
                      { edt : mod.sup.parteEdit.doc.body, 
                        j2Win : mod.sup.parteEdit 
                      });
                return;
              }

              var flg = 0;
              forEach(['ParteNome', 'ParteCPF', 'ParteCNPJ', 'ParteWA1', 'ParteWA2'], 
                function(e){
                  // termo de reclamacao: if(!(selP.binding[e].input.value))  
                  if(!(selP.binding[e].input.value))
                    flg++;
                }       
              );
              if(flg > 2){
                pkg.ModalDialog.ok('Informações mínimas para geração da declaração do WhatsApp pendentes de preenchimento. Fornecer: Nome da parte, CPF ou CNPJ, Telefones vinculados do WhatsApp.',
                        'TermoDeReclmação j2 - Atenção', null, null,
                        { edt : mod.sup.parteEdit.doc.body, 
                          j2Win : mod.sup.parteEdit 
                        });
                return;
              }*/


               
          });

          evBus.once('AddtionalControls.onLoadPackages', function(event){
            pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
            'termoPeticaoWhatsAppControls', '1.0' );
            evBus.fire('Editor.onResize');
          });
          
          j2.mod.com.libLoader(j2.res.mod.termoReclamacaoDef);
        }else{
          pkg.AddtionalControls.append(pkg.AddtionalControls.defaultContainer(), 
          'termoPeticaoWhatsAppControls', '1.0' );
          evBus.fire('Editor.onResize');
        }
      }
    };
    
    evBus.once('loaded-'+ window.j2.res.mod.termoPeticao.lib, function(){
      pkg.TermoPeticao.contructor_();
    });

  })();
} catch (err) {
  var t = 'ERROR: ' + err.message + ' | ' + window.j2.res.mod.termoPeticao.lib;
  alert(t);
  console.error(t);

}