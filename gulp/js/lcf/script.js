$(function() {
  $('#menu-main').on('hidden.bs.collapse', function () {
      $( "#navbar-top-cnt" ).addClass( "position-fixed" );
      $( "#navbar-top-cnt" ).removeClass( "position-absolute" );
      console.log("hidden")
    })
  $('#menu-main').on('show.bs.collapse', function () {
    $( "#navbar-top-cnt" ).addClass( "position-absolute" );
    $( "#navbar-top-cnt" ).removeClass( "position-fixed" );
    $(window).scrollTop(0);
  })
/*   function bodyPadding() {
    $('.body-common').css("padding-top", $('#navbar-top').outerHeight()+"px");
  }
  bodyPadding();
  $( window ).resize(function() {
    bodyPadding();
  });
 */});
