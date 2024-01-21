/*!
 * https://github.com/adampietrasiak/jquery.initialize
 *
 * Copyright (c) 2015-2016 Adam Pietrasiak
 * Released under the MIT license
 * https://github.com/timpler/jquery.initialize/blob/master/LICENSE
 *
 * This is based on MutationObserver
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
;(function ($) {

    "use strict";

    var combinators = [' ', '>', '+', '~']; // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#Combinators
    var fraternisers = ['+', '~']; // These combinators involve siblings.
    var complexTypes = ['ATTR', 'PSEUDO', 'ID', 'CLASS']; // These selectors are based upon attributes.
    
    //Check if browser supports "matches" function
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }

    // Understand what kind of selector the initializer is based upon.
    function grok(msobserver) {
        if (!$.find.tokenize) {
            // This is an old version of jQuery, so cannot parse the selector.
            // Therefore we must assume the worst case scenario. That is, that
            // this is a complicated selector. This feature was available in:
            // https://github.com/jquery/sizzle/issues/242
            msobserver.isCombinatorial = true;
            msobserver.isFraternal = true;
            msobserver.isComplex = true;
            return;
        }

        // Parse the selector.
        msobserver.isCombinatorial = false;
        msobserver.isFraternal = false;
        msobserver.isComplex = false;
        var token = $.find.tokenize(msobserver.selector);
        for (var i = 0; i < token.length; i++) {
            for (var j = 0; j < token[i].length; j++) {
                if (combinators.indexOf(token[i][j].type) !== -1)
                    msobserver.isCombinatorial = true; // This selector uses combinators.

                if (fraternisers.indexOf(token[i][j].type) !== -1)
                    msobserver.isFraternal = true; // This selector uses sibling combinators.

                if (complexTypes.indexOf(token[i][j].type) !== -1)
                    msobserver.isComplex = true; // This selector is based on attributes.
            }
        }
    }

    // MutationSelectorObserver represents a selector and it's associated initialization callback.
    var MutationSelectorObserver = function (selector, callback, options) {
        this.selCallPair = [];
        this.selCallPair.push({
          selector : selector.trim(),
          callback : callback
        });
        
        this.options = options;
        this.target = options.target;
        
        this.pushSelector = function (_selector, _callback){
          this.selCallPair.push({
            selector : _selector.trim(),
            callback : _callback
          });
        };
        this.getObserver = function (){
          return this.observer;
        };
        this.setObserver = function (_observer){
          this.observer = _observer;
        };
        
        var _lastPair;
        this.getCallback = function(_selector){
          if(_lastPair.selector  === _selector)
            return _lastPair.callback; 
          
          for( var i=0; i < this.selCallPair.length; i++ ){
            if(this.selCallPair[i].selector === _selector){
              _lastPair = this.selCallPair[i];
              return _lastPair;
            }
          }
        };
        
        grok(this);
    };

    // List of MutationSelectorObservers.
    var msobservers = [];
    // verifica se o target já está sendo observado
    msobservers.observedTarget = function (target){
      for(var i=0; i < this.length; i++)
        if( msobservers[i].target === target )
          return msobservers[i];
      return null;
    };
    //inicializar
    msobservers.initialize = function (selector, callback, options) {

        // Wrap the callback so that we can ensure that it is only
        // called once per element.
        var seen = [];
        var callbackOnce = function () {
            if (seen.indexOf(this) === -1) {
                seen.push(this);
                $(this).each(callback);
            }
        };

        // See if the selector matches any elements already on the page.
        $(options.target).find(selector).each(callbackOnce);
        
        var msobserver = this.observedTarget(options.target);
        if(! ( msobserver ) ){
            // Then, add it to the list of selector observers.
            msobserver = new MutationSelectorObserver(selector, callbackOnce, options);
            this.push(msobserver);

            // The MutationObserver watches for when new elements are added to the DOM.
            var observer = new MutationObserver(function (mutations) {
                var matches = [];

                // For each mutation.
                //console.log(  'mutations a calcular ', mutations.length);

                for (var m = 0; m < mutations.length; m++) {
                    if( msobserver.options.overProcessingControl 
                     && mutations.length > msobserver.options.overProcessingControl.mutationsLimit )
                      if(msobserver.options.overProcessingControl.targetEvaluate.apply(mutations[m].target))
                        continue;
                    // If this is an attributes mutation, then the target is the node upon which the mutation occurred.
                    /*if (mutations[m].type === 'attributes') {
                        // Check if the mutated node matchs.
                        if (mutations[m].target.matches(msobserver.selector))
                            matches.push(mutations[m].target);

                        // If the selector is fraternal, query siblings of the mutated node for matches.
                        if (msobserver.isFraternal)
                            matches.push.apply(matches, mutations[m].target.parentElement.querySelectorAll(msobserver.selector));
                        else
                            matches.push.apply(matches, mutations[m].target.querySelectorAll(msobserver.selector));
                    }*/

                    // If this is an childList mutation, then inspect added nodes.
                    if (mutations[m].type === 'childList') {
                        // Search added nodes for matching selectors.
                        for (var n = 0; n < mutations[m].addedNodes.length; n++) {
                            if (!(mutations[m].addedNodes[n] instanceof Element)) continue;
                            
                            for(var i=0; i < msobserver.selCallPair.length; i++){

                                // Check if the added node matches the selector
                                if (mutations[m].addedNodes[n].matches(msobserver.selCallPair[i].selector))
                                    matches.push({
                                      nodes : [mutations[m].addedNodes[n]],
                                      callback : msobserver.selCallPair[i].callback
                                    });

                                // If the selector is fraternal, query siblings for matches.
                                var _matches = [];
                                if (msobserver.isFraternal)
                                    _matches.push.apply(_matches, mutations[m].addedNodes[n].parentElement.querySelectorAll(msobserver.selCallPair[i].selector));
                                else
                                    _matches.push.apply(_matches, mutations[m].addedNodes[n].querySelectorAll(msobserver.selCallPair[i].selector));
                                
                                if(_matches.length)
                                    matches.push({
                                      nodes : _matches,
                                      callback : msobserver.selCallPair[i].callback
                                    });
                            }
                        }
                    }
                }

                // For each match, call the callback using jQuery.each() to initialize the element (once only.)
                for (var i = 0; i < matches.length; i++){
                    $(matches[i].nodes).each(matches[i].callback);
                }
            });

            // Observe the target element.
            //var defaultObeserverOpts = { childList: true, subtree: true, attributes: msobserver.isComplex };
            var defaultObeserverOpts = { childList: true, subtree: true, attributes: false };
            observer.observe(options.target, options.observer || defaultObeserverOpts );
            msobserver.setObserver(observer);
            return observer;
        }else{
          msobserver.pushSelector(selector, callbackOnce);
          return msobserver.getObserver();
        }
    };

    // Deprecated API (does not work with jQuery >= 3.1.1):
    /*$.fn.initialize = function (callback, options) {
        return msobservers.initialize(this.selector, callback, $.extend({}, $.initialize.defaults, options));
    };*/

    // Supported API
    $.initialize = function (selector, callback, options) {
      for (let i = msobservers.length - 1; i >= 0; i--) {
          if (! msobservers[i].target.isConnected ) {
              const delMOs = msobservers.splice(i, 1)[0];
              delMOs.observer.disconnect()
          }
      }

        return msobservers.initialize(selector, callback, $.extend({}, $.initialize.defaults, options));
    };

    // Options
    $.initialize.defaults = {
        target: document.documentElement, // Defaults to observe the entire document.
        observer: null, // MutationObserverInit: Defaults to internal configuration if not provided.
        overProcessingControl : {
            mutationsLimit : 500,
            targetEvaluate : function(){
              if(!(this.parentElement))
                return false;
              
              return this.parentElement.matches('.table-etiquetas')
                 || this.parentElement.parentElement.parentElement.matches('.table-etiquetas');
            }
        } 
    };
    
    console.log('jquery.initialize is initialized');

})(window.jQuery || window.jQ3);