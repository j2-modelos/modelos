function jQueryLazyFactory(){
  (function($) {
    $.fn.lazyObserve = function(options, handler) {
      var _options = {
        root: null,
        rootMargin: '0px',
        threshold: 1
      };
      
      options.root && (options.root = options.root.get ? options.root.get(0) : options.root);
      
      $.extend(_options, options);
            
      return this.each(function() {
        var self = $(this);
        var observer = self.data('lazyObserve');

        if(!observer) {
          observer = new IntersectionObserver(function(entries, observer){
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                //observer.unobserve(entry.target);

                //if ( ! self.data('lazyObserve_intersected') ) {
                  (_options.load || handler)(self, entries, observer );
                  //self.data('lazyObserve_intersected', true);
                //}
              }
            });
          }, _options);
          
          self.data('lazyObserve', observer);
        }

        observer.observe(this);
      });
    };
  }(jQ3));
}
function checkJQueryForLazy() { // tappac as new
  if (typeof jQ3 !== 'undefined') {
    jQueryLazyFactory();
  }else {
    setTimeout( checkJQueryForLazy, 100 );
  }
}
checkJQueryForLazy();