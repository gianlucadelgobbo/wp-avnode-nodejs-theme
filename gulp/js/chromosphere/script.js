$(function() {
    function bodyPadding() {
      $('.body-common').css("padding-top", $('#navbar-top').outerHeight()+"px");
    }
    bodyPadding();
    $( window ).resize(function() {
      bodyPadding();
    });
  });
  