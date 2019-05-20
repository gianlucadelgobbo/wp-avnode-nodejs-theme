var lastScrollTop = 0;

$(function() {
  $('#carousel').carousel({
    pause: "false"
  });
  $( window ).scroll(function() {
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
      if ($('#top-menu').hasClass("navbar-fixed-top") && !$('#mainmenu').hasClass("in")) {
        $('body').removeClass("fixed-top");
        $('#top-menu').removeClass("navbar-fixed-top");
        if (st > 200 && !$('#top-menu').hasClass("navbar-hidden-top")) {
          $('#top-menu').addClass("navbar-hidden-top");
        }
      }
    } else {
      if (!$('#top-menu').hasClass("navbar-fixed-top")) {
        $('body').addClass("fixed-top");
        $('#top-menu').addClass("navbar-fixed-top");
        $('#top-menu').removeClass("navbar-hidden-top");
      }
    }
    if (st>$(window).height() && !$('#top-menu').hasClass("navbar-fixed-top") && $('body').hasClass("expanding")) {
      $('#top-menu').addClass("navbar-fixed-top");
      $('body').removeClass("flyer-header-expanding");
    }
    if (st<$(window).height() && $('#top-menu').hasClass("navbar-fixed-top") && $('body').hasClass("expanding")) {
      $('#top-menu').removeClass("navbar-fixed-top");
      $('body').addClass("flyer-header-expanding");
    }
    lastScrollTop = st;
  });
  $(".flyer-menu-appear").click(function() {
    if ($('#top-menu').hasClass("flyer-opened")){
      $('#top-menu').removeClass("flyer-opened");
    } else {
      $('#top-menu').addClass("flyer-opened");
    }
    return false;
  });
  $(".flyer-search-opener").click(function() {
    $('.flyer-search-cover').addClass("flyer-search-cover-opened");
    return false;
  });
  $(".flyer-search-close").click(function() {
    $('.flyer-search-cover').removeClass("flyer-search-cover-opened");
    return false;
  });
});