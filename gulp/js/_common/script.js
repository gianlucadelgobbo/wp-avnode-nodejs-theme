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

$("#container > .read-more a").click(function() {
  infiniteScroll(this);
  return false;
});
function infiniteScroll(t) {
  var url = t.href;
  $('#container > .read-more a').hide();
  $('#container > .read-more .loading').show();
  $.ajax({
    method: "GET",
    url: url
  }).done(function (msg) {
    console.log(url);
    $("#container > .read-more").html($(msg).find("#container > .read-more").html());
    $("#container .read-more a").click(function() {
      infiniteScroll(this);
      return false;
    });
    $('#container > .read-more .loading').hide();
    var $newItems = $($(msg).find("#container .results").html());
    $containerappend = $("#container .results").append($newItems);
    $containerappend.imagesLoaded( function(){
      if ($("#container .results.isotope").length) $containerappend.isotope("appended", $newItems );
    });
  });
}


$(function() {
  if (window.location.hash=="#app") {
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
  }
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
          success: function (data)
          {
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
  if ($('#join-form').length){
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
  }
  $(function() {

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
    $(document).prop('title',title);
    $( "#cntModal .modal-body" ).load( url+" #result" , function(response) {
      $( "#cntModal .modal-title" ).html($(response).find(".type").html())
    });

    return false;
  });
  $('#cntModal').on('hidden.bs.modal', function (e) {
    $( "#cntModal .modal-body" ).html("<div class='loading'>Loading...</div>");
    $( "#cntModal .modal-title" ).html("");
    history.pushState({}, onclose_title, onclose_url);
    $(document).prop('title',onclose_title);
  });
  });

});

