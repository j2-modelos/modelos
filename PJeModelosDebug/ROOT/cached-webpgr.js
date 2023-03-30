  window.j2.mod.com._.cacSrc = {
    '_cacheScript' : function (name, version, url) {
        var xmlhttp = new XMLHttpRequest(); 
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              localStorage.setItem(name, JSON.stringify({
                content: xmlhttp.responseText,
                version: version
              }));
            } else {
              console.warn('error loading '+url);
            }
          }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
      },
    '_loadScript': function (url, name, version, callback) {
      var s = document.createElement('script');

      if (s.readyState) { 
        s.onreadystatechange = function() {
          if (s.readyState == 'loaded' || s.readyState == 'complete') {
            s.onreadystatechange = null;
            _cacheScript(name, version, url);
            if (callback) callback();
          }
        };
      } else { 
        s.onload = function() {
          _cacheScript(name, version, url);
          if (callback) callback();
        };
      }

      s.setAttribute('src', url);
      document.getElementsByTagName('head')[0].appendChild(s)
    },

    '_injectScript' : function (content, url, name, version, callback) {
      var c = JSON.parse(content);
      /* cached version is not the request version, clear the cache, this will trigger a reload next time */
      if (c.version != version) {
        localStorage.removeItem(name);
        _loadScript(url, name, version, callback);
        return;
      }
      var s = document.createElement('script');
      s.type = 'text/javascript';
      var scriptContent = document.createTextNode(c.content);
      s.appendChild(scriptContent);
      document.getElementsByTagName('head')[0].appendChild(s);
      if (callback) callback();
    }, 

    'requireScript' : function requireScript(name, version, url, callback) {
      var c = localStorage.getItem(name);
      if (c == null) {
        _loadScript(url, name, version, callback);
      } else {
        _injectScript(c, url, name, version, callback);
      }
    }
  };