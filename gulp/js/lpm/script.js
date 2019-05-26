$(function() {
  function bodyPadding() {
    $('.body-common').css("padding-top", $('#navbar-top').outerHeight()+"px");
  }
  function carouselFull() {
    if ($('#carousel')) {
      $('#carousel').height(window.innerHeight-($('#navbar-top').outerHeight()+$('#twCnt').outerHeight()));
      var ratio = $('#carousel').width()/$('#carousel').height();
      if (ratio>(16/9)) {
        var top = ($('#carousel').width()/16)*9;
        $('#carousel .carousel-item').css("margin-top", (($('#carousel').height() - top)/2)+"px");
        $('#carousel .carousel-item').css("width", "100%");
        $('#carousel .carousel-item').css("margin-left", "0");
      } else {
        var left = ($('#carousel').height()/9)*16;
        $('#carousel .carousel-item').css("margin-top", "0");
        $('#carousel .carousel-item').css("width", left+"px");
        $('#carousel .carousel-item').css("margin-left", (($('#carousel').width() - left)/2)+"px")
      }
    }
  }
  bodyPadding();
  carouselFull();
  $( window ).resize(function() {
    bodyPadding();
    carouselFull();
  });
});
