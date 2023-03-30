            function FazIssoPraMim(){
                var txt = document.getElementById('t').value;
                
                txt = txt.split('\n');
                
                var n = [];
                
                for(var i =0; i < txt.length; i++){
                  try{
                    n[i] = '<elemento tag="option" value="' + txt[i].split("'")[1] + '" scope="EDT" />';
                  }finally{}
                
              }
                document.getElementById('t').value = n.join('\n');
            }
            
function FazIssoPraMim2(){
    var txt = document.getElementById('t').value;

    switch(document.getElementById('sel').value){
      case 'toArray':
        txt = txt.split('').map(function(c){
          return c.charCodeAt(0);
        });
        break;
        
      case 'toString':
        txt = txt.split(','); //make array
        var s = [];
        txt.map(function(c){
          s.push(String.fromCharCode(parseInt(c)));
        });
        txt = s.join('');
     
    }
    

  
    document.getElementById('t').value = txt;
}