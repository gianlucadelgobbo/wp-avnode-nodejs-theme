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
  $('.filters .by-type a').on('click', function (event) {
    event.preventDefault();
    if ($(this).data("show")=="all") {
      $('.sameheight').removeClass( "d-none" );
      $('.itemListElement').removeClass( "d-none" );
    } else {
      $('.sameheight').removeClass( "d-none" );
      $('.itemListElement').addClass( "d-none" );
      $( "."+ $(this).data("show") ).removeClass("d-none");
    }
  })
  $('.filters .by-day a').on('click', function (event) {
    event.preventDefault();
    if ($(this).data("show")=="all") {
      $('.sameheight').removeClass( "d-none" );
      $('.itemListElement').removeClass( "d-none" );
    } else {
      $('.sameheight').addClass( "d-none" );
      $('.itemListElement').removeClass( "d-none" );
      $( "."+ $(this).data("show") ).removeClass("d-none");
    }
  })
  /*   function bodyPadding() {
    $('.body-common').css("padding-top", $('#navbar-top').outerHeight()+"px");
  }
  bodyPadding();
  $( window ).resize(function() {
    bodyPadding();
  });
 */});
