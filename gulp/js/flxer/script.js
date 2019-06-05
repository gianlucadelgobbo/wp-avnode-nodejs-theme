function openWindow(title,url,w,h){
  jQuery('#resizeModal').modal('show');
  jQuery('#resizeModal .modal-dialog').css({"width":(parseInt(w)+32)+"px"});
  jQuery('#resizeModal .modal-body').css({"height":""+(parseInt(h)+30)+"px"});
  var str = "<iframe src='"+url+"' width='"+w+"' height='"+h+"' frameborder='0'></iframe>";
  jQuery('#resizeModal .modal-title').html(title);
  jQuery('#resizeModal .modal-body').html(str);
  //jQuery('#resizeModal .modal-body').css({"padding":"0"});
  return false;
}

