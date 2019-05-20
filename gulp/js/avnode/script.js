$(function() {
  if($.fn.validator) $.fn.validator.Constructor.FOCUS_OFFSET = 100;
});

jQuery( window ).resize(function() {
  resetAffix();
});
function resetAffix(){
  jQuery('#myAffix').affix({
    offset: {
      top: jQuery('#myHeader').height()
    }
  });
}
if (jQuery('#myAffix .navbar-brand.donttouch').length==0) {
  jQuery('#myAffix').on('affix.bs.affix', function () {
    console.log('Fired!');
    jQuery(".navbar-brand").removeClass( 'visible-xs' );
  } );
  jQuery('#myAffix').on( 'affixed-top.bs.affix', function () {
    console.log('unaff');
    jQuery(".navbar-brand").addClass( 'visible-xs' );
  } );
}
function openWindow(title,url,w,h){
  jQuery('#resizeModal').modal('show');
  jQuery('#resizeModal .modal-dialog').css({"width":(parseInt(w)+32)+"px"});
  jQuery('#resizeModal .modal-body').css({"height":""+(parseInt(h)+30)+"px"});
  var str = "<iframe src='"+url+"' width='"+w+"' height='"+h+"' frameborder='0'></iframe>";
  console.log(str);
  jQuery('#resizeModal .modal-title').html(title);
  jQuery('#resizeModal .modal-body').html(str);
  //jQuery('#resizeModal .modal-body').css({"padding":"0"});
  return false;
}

