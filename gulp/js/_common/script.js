var $container;
var onclose_url;
var onclose_title;

function change(state) {
  if(state === null) { // initial page
    $('#cntModal').modal('hide');
  } else { // page added with pushState
    $("div").text(state.url);
  }
}

$(window).on("popstate", function(e) {
  change(e.originalEvent.state);
});

(function(original) { // overwrite history.pushState so that it also calls
                      // the change function when called
  history.pushState = function(state) {
    change(state);
    return original.apply(this, arguments);
  };
})(history.pushState);

$(".track").click(function(event) {
  var track = $(this).attr("download") ? "/"+$(this).attr("download") : $(this).attr("href").substring($(this).attr("href").lastIndexOf("/"))
  ga('send', 'pageview', track);
});

$("#subscribe .close").click(function(event) {
  $("#subscribe .input-group").removeClass("d-none");
  $('#subscribe .loading').addClass("d-none");
  $('#subscribe .alert').addClass("d-none");
  $("#subscribe .alert").removeClass("alert-danger");
  $("#subscribe .alert").removeClass("alert-success");
});
$("#subscribe").submit(function(event) {
  event.preventDefault();
  $("#subscribe .input-group").addClass("d-none");
  $('#subscribe .loading').removeClass("d-none");
  jQuery.ajax({
    method: "POST",
    url: "/signup",
    data: $("#subscribe").serialize()
  }).done(function (data) {
    if (data.type=="success") {
      $("#subscribe .alert").addClass("alert-success");
      $('#subscribe .alert .msg').html("<strong>Congratulations!</strong> "+data.message+"&nbsp;&nbsp;&nbsp;");
    } else {
      $("#subscribe .alert").addClass("alert-danger");
      $('#subscribe .alert .msg').html("<strong>Warning!</strong> "+data.message+"&nbsp;&nbsp;&nbsp;");
    }
    $('#subscribe .loading').addClass("d-none");
    $('#subscribe .alert').removeClass("d-none");

  });
  return false;
});

$("#result .read-more a").click(function() {
  infiniteScroll(this);
  return false;
});
function infiniteScroll(t) {
  var appendToId = $(t).parent().parent().find(".results").attr("id");
  var url = t.href;
  $(t).hide();
  $(t).parent().parent().find(".loading").show();
  $.ajax({
    method: "GET",
    url: url
  }).done(function (msg) {
    console.log(url);
    var $newItems  = $($(msg).find("#"+appendToId).children());
    var $newButtonHref = $($(msg).find("#"+appendToId)).parent().find(".read-more a").attr("href");
    //$("#"+appendToId).append($newItems);
    $(t).attr("href", $newButtonHref)
    $(t).parent().find(".loading").hide();
    $(t).show();
    $containerappend = $("#"+appendToId).append($newItems);
    //$(t).remove();
    if ($("#"+appendToId+".isotope").length) {
      $containerappend.imagesLoaded( function(){
        $containerappend.isotope("appended", $newItems );
      });  
    }
  });
}

var glink = [];
var cntObj;
$(function() {
  if ($( ".videothumbnail" ).length) {
    glink = $( ".videothumbnail" ).map(function( item ) {
      var cnt = $( this ).attr("data-src");
      cntObj = JSON.parse($( this ).attr("data-src"));
      if (cntObj.media.file) cnt = cntObj;
      return (cnt);
    });
  }
  if ($( ".thumbnail" ).length && !$( ".videothumbnail" ).length) {
    glink = $( ".thumbnail" ).map(function( item ) {
      var cnt = $( this ).attr("data-src");
      return (cnt);
    });
  }
  //console.log(glink);
  /* if (window.location.hash=="#app") {
    var launchmyapp = {
      "livecinemafestival.com" : "lcf",
      "localhost:3002" : "lcf",
      "liveperformersmeeting.net" : "lpm"
    };
    var param = window.location.pathname.split("/");
    if (launchmyapp[window.location.host] && param[3]=="artists") {
      var loc = "";
      if (param[5]=="performances") {
        loc = "loadPerf#"+window.location.pathname;
      } else if (param[4]) {
        loc = "loadArtist#"+window.location.pathname;
      } else {
        loc = "loadArtistsList";
      }
      location.href = launchmyapp[window.location.host]+'://'+loc;
    }
  } */
  if ($('#contact-form').length) {
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        var url = $(this).action;
        var dat = $(this).serialize() + "&ajax=1";
        //dat.ajax = 1;
        console.log(dat);
        $.ajax({
          type: "POST",
          url: url,
          data: dat,
          success: function (data) {
            var messageAlert = 'alert-' + data.type;
            var messageText = data.message;

            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            if (messageAlert && messageText) {
              $('#contact-form').find('.messages').html(alertBox);
              if (data.type == "success") $('#contact-form')[0].reset();
            }
          }
        });
        return false;
      }
    });
  }
  if ($('#newsletter-form').length){
    $('#newsletter-form').validator();

    $('#newsletter-form').on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        var url = $(this).action;
        var dat = $(this).serialize()+"&ajax=1";
        //dat.ajax = 1;
        console.log(dat);
        $.ajax({
          type: "POST",
          url: url,
          data: dat,
          success: function (data) {
            console.log(data);
            var messageAlert = 'alert-' + data.type;
            var messageText = data.message;

            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            if (messageAlert && messageText) {
              $('#newsletter-form').find('.messages').html(alertBox);
              if (data.type=="success") $('#newsletter-form')[0].reset();
            }
          }
        });
        return false;
      }
    });
  }
  /* if ($('#join-form').length){
    $('#join-form').validator();

    $('#join-form').on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        var url = $(this).action;
        var dat = $(this).serialize()+"&ajax=1";
        //dat.ajax = 1;
        console.log(dat);
        $.ajax({
          type: "POST",
          url: url,
          data: dat,
          success: function (data)
          {
            var messageAlert = 'alert-' + data.type;
            var messageText = data.message;

            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            if (messageAlert && messageText) {
              $('#join-form').find('.messages').html(alertBox);
              if (data.type=="success") $('#join-form')[0].reset();
            }
          }
        });
        return false;
      }
    });
  } */
  if (typeof(cx) !== "undefined") {
    console.log("append gcse:searchresults-only")
    jQuery(".rientro.searchresults").append($("<gcse:searchresults-only></gcse:searchresults-only>"));
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }
  if ($( ".swiper-container" ).length) {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      direction: 'horizontal',
      grabCursor: false,
      spaceBetween: 30
      //   pagination: {
      //     el: '.swiper-pagination',
      //     clickable: true,
      //   }
    });
  }

  $(".tooltips").tooltip();

  $container = $('.isotope');
  $container.imagesLoaded( function(){
    $container.isotope({
      itemSelector: 'div.isotopeitem',
      masonry: {}
    });
  });

  $("#searchModalButton").click(function(event) {
    $('#searchModal').modal();
    event.preventDefault();
  });
  $(".ajaxloader").click(function() {
    var options = {};
    onclose_url = window.location.href;
    onclose_title = document.title;
    var url = this.href;
    var title = this.title;
    $('#cntModal').modal();
    history.pushState({}, title, url);
    $(document).prop('title', title);
    $( "#cntModal .modal-body .container" ).load( url+" #result" , function(response) {
      $( "#cntModal #cntModalLabel" ).html($(response).find(".type").html())
    });

    return false;
  });
  $('#cntModal').on('hidden.bs.modal', function (e) {
    $( "#cntModal .modal-body .container" ).html("<div class='loading'>Loading...</div>");
    $( "#cntModal #cntModalLabel" ).html("");
    history.pushState({}, onclose_title, onclose_url);
    $(document).prop('title',onclose_title);
  });
});

