function initToaster($){
  "use strict";
  $.Toast = function(title, message, type, options){
      var defaultOptions = {
          appendTo: "body",
          stack: true,
          position_class: "toast-bottom-right",
          fullscreen:false,
          width: 300,
          spacing:20,
          timeout: 5 * 1000,
          has_close_btn:false,
          has_icon:true,
          sticky:false,
          border_radius:0,
          has_progress:true,
          rtl:false,
          close_on_click_tost: true
      }

      var $element = null;

      var $options = $.extend(true, {}, defaultOptions, options);

      var spacing = $options.spacing;

      var css = {
          "position":($options.appendTo === "body") ? "fixed" : "absolute",
          "min-width":$options.width,
          "display":"none",
          "border-radius":$options.border_radius,
          "z-index":99999
      }

      $element = $('<div class="toast-item-wrapper ' + type + ' ' + $options.position_class + '"></div>');
      $('<p class="toast-title">' + title + '</p>').appendTo($element);
      $('<p class="toast-message">' + message + '</p>').appendTo($element);

      if($options.fullscreen){
          $element.addClass( "fullscreen" );
      }

      if($options.rtl){
          $element.addClass( "rtl" );
      }

      if($options.has_close_btn){
          $('<span class="toast-close">&times;</span>').appendTo($element);
          if( $options.rtl){
              css["padding-left"] = 20;
          } else {
              css["padding-right"] = 20;
          }
      }

      if($options.has_icon){
        var _faIcon = type
        switch(type){
          case 'success':
            _faIcon = 'check';
            break;
          case 'error':
            _faIcon = 'exclamation-circle';
            break;
          case 'warn':
            _faIcon = 'exclamation-triangle';
            break;
          case 'info':
            _faIcon = 'exclamation';
            break;
        }

        if($options.custom_icon)
          _faIcon = $options.custom_icon

          $('<i class="toast-icon fa fa-' + _faIcon + '"></i>').appendTo($element);
          if( $options.rtl){
              css["padding-right"] = 60;
          } else {
              css["padding-left"] = 60;
          }            
      }

      if($options.has_progress && $options.timeout > 0){
          $('<div class="toast-progress"></div>').appendTo($element);
      }

      if($options.sticky){
          $options.spacing = 0;
          spacing = 0;

          switch($options.position_class){
              case "toast-top-left" : {
                  css["top"] = 0;
                  css["left"] = 0;
                  break;
              }
              case "toast-top-right" : {
                  css["top"] = 0;
                  css["left"] = 0;                    
                  break;
              }
              case "toast-top-center" : {
                  css["top"] = 0;
                  css["left"] = css["right"] = 0;  
                  css["width"] = "100%";                  
                  break;
              }
              case "toast-bottom-left" : {
                  css["bottom"] = 0;
                  css["left"] = 0;                     
                  break;
              }
              case "toast-bottom-right" : {
                  css["bottom"] = 0;
                  css["right"] = 0;                     
                  break;
              }
              case "toast-bottom-center" : {
                  css["bottom"] = 0;
                  css["left"] = css["right"] = 0;  
                  css["width"] = "100%";                     
                  break;
              }
              default : {
                  break;
              }                                                                        
          }
      }

      if($options.stack){
          if($options.position_class.indexOf("toast-top") !== -1 ){
              $($options.appendTo).find('.toast-item-wrapper').each(function(){
                  css["top"] = parseInt($(this).css("top")) + this.offsetHeight + spacing;
              });
          } else if($options.position_class.indexOf("toast-bottom") !== -1 ){
              $($options.appendTo).find('.toast-item-wrapper').each(function(){
                  css["bottom"] = parseInt($(this).css("bottom")) + this.offsetHeight + spacing;
              });
          }
      }        

      $element.css(css);

      $element.appendTo($options.appendTo);

  if($element.fadeIn) {
          $element.fadeIn();
      }else {
          $alert.css({display: 'block', opacity: 1});
      }

  function removeToast(){          
    $.Toast.remove( $element );
  }

  if($options.timeout > 0){
    setTimeout(removeToast, $options.timeout);
          if($options.has_progress){
              $(".toast-progress", $element).animate({"width":"100%"}, $options.timeout);
          }
  }        

      $(".toast-close", $element).click(removeToast)
      if($options.close_on_click_tost)
        $element.click(removeToast)

      return $element;
  }

  $.Toast.remove = function( $element ){
      "use strict";        
  if($element.fadeOut)
  {
    $element.fadeOut(function(){
      return $element.remove();
    });
  }
  else{
    $element.remove();
  }        
  }

  addStyleSheet("Extensao/toaster.css");
};


function checkJQueryFoToasterJS() { // tappac as new
  if (typeof jQ3 !== 'undefined') {
    initToaster(jQ3);
  }else {
    defer( checkJQueryFoToasterJS );
  }
}
checkJQueryFoToasterJS();