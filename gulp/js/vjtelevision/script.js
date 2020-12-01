var goto = 0;
var oldgoto = 0;
var dates = [];
var playlist = [];
var day = new Date();
$(document).ready(function(){
  if ($('#programming').length) {
    var offset = $(".embed-responsive").offset().top;
    $( window ).scroll(function() {
      if ($(document).scrollTop()>offset) {
        $(".embed-responsive").css({"top": ($(document).scrollTop()-offset)+"px"});
      } else {
        $(".embed-responsive").css({"top": "auto"});
      }
    });
    var player = videojs('my-video', options, function onPlayerReady() {
      videojs.log('Your player is ready!');
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
        if (goto+1 == playlist.length) {
          day.setDate(day.getDate()+1);
          loadDay();
        }
        videojs.log(goto);
        videojs.log(playlist.length);
      });
    });
    player.logo({
      image: 'https://vjtelevision.com/vjtelevision/images/VJTV_4x_white.svg',
      url: "https://vjtelevision.com",
      height: 50,
      offsetH: 20,
      offsetV: 20,
      position: 'top-left',
      width: 150
    });

    $("#programming #date").html(day.toDateString());

    $.ajax({
      url: "https://avnode.net/api/getprogramsdays",
      method: "get"
    })
    .done(function(dd) {
      dates = dd;
      console.log("stoca");
      loadDay();
    })
    .fail(function(data) {
      $('#programming .playlist').html("error");
    });


    $('#programming #datepicker').datepicker({
      dateFormat: 'yy-mm-dd',
      beforeShow: function (input, inst) {
        var rect = input.getBoundingClientRect();
        setTimeout(function () {
	        inst.dpDiv.css({ top: rect.top + 40 });
        }, 0);
      },
      //defaultDate: new Date('03/10/2017'), // this line is for testing
      beforeShowDay: highlightDays
    });
    $("#programming #datepicker").change(function(){
      day = new Date($('#programming #datepicker').datepicker("getDate"));
      loadDay();
    });

    $( "#programming #datepickerbutton" ).click(function( event ) {
      event.preventDefault();
      var visible = $("#programming #datepicker").datepicker("widget").is(":visible");
      $("#programming #datepicker").datepicker(visible ? "hide" : "show");
    });

    function highlightDays(date) {
      for (var i = 0; i < dates.length; i++) {
        if (new Date(dates[i].replace("-","/").replace("-","/")).toString() == date.toString()) {
            return [true, 'highlight'];
        }
      }
      return [true, ''];
    }
  
    function loadDay() {
      console.log("loadDay");
      var daystr = day.getFullYear()+"-"+(("0" + (day.getMonth()+1)).slice(-2))+"-"+(("0" + (day.getDate())).slice(-2));
      console.log(daystr);
      $("#programming #date").html(day.toDateString());
      if (dates.indexOf(daystr)===-1) {
        alert("No programming for this date!!!");
      } else {
        $('#programming .playlist').html("<div class=\"vjs-waiting\"><div class=\"vjs-loading-spinner\"></div></div>");
        $.ajax({
          url: "https://avnode.net/api/getprograms",
          method: "get",
          data: {day: daystr}
        })
        .done(function(data) {
          console.log("done");
          $('#loadingplay span').html("Building interface");
          var html = "<ul class=\"list-unstyled\">"
          playlist = [];
          for (var a=0;a<data.length;a++) {
            playlist.push({
              sources: [{
                src: "https://avnode.net"+data[a].video.media.file,
                type: 'video/mp4'
              }],
              poster: data[a].video.imageFormats.small,
              slug: data[a].video.slug
            })
            var id = new Date(data[a].programming).getTime();
            var date = new Date(data[a].programming);
            html+="<li class=\"playlist-item mb-3\" id=\"P"+a+"\">";
            html+="  <div class=\"bg-secondary text-white small pt-2 pb-2 pl-3 pr-3\" id=\""+id+"\">";
            html+="    <div class=\"row\" id=\""+id+"\">";
            html+="      <div class=\"col\" id=\""+data[a].programming+"\">"+date.getUTCFullYear()+"-"+(("0" + (date.getUTCMonth()+1)).slice(-2))+"-"+(("0" + (date.getUTCDate())).slice(-2))+ "<br />"+(("0" + (date.getUTCHours())).slice(-2))+":"+(("0" + (date.getUTCMinutes())).slice(-2))+":"+(("0" + (date.getUTCSeconds())).slice(-2))+"</div>";
            html+="      <div class=\"col\"><div class=\"text-right\">"+data[a].category.name+"<br />"+data[a].video.media.durationHR+"</div></div>";
            html+="    </div>";
            html+="  </div>";
            html+="  <div class=\"media\" id=\"P"+a+"\">";
            html+="    <img class=\"mr-3\" style=\"width:20%\" src=\""+data[a].video.imageFormats.small+"\">";
            html+="    <div class=\"media-body\">";
            html+="      <h5 class=\"mt-0 mb-1 mt-3\">"+data[a].video.title+"</h5>";
            html+="      <ul class=\"list-inline small\">"+data[a].video.users.map(user =>{return "<li>"+user.stagename+"</li>"})+"</ul>";
            html+="    </div>";
            html+="  </div>";
            html+="   <div class=\"more p-2\"><a href=\"https://avnode.net/videos/"+data[a].video.slug+"/\" class=\"badge badge-primary\">MORE</a></div>";
            html+="</li>";
          }
          html+="</ul>";
          $('#programming .playlist').html(html);
          player.playlist(JSON.parse(JSON.stringify(playlist)), goto);
          $( ".playlist-item" ).click(function( event ) {
            player.playlist.currentItem(parseInt($(this).attr("id").substring(1)));
            player.play();
          });
        })
        .fail(function(data) {
          $('#programming .playlist').html("error");
        });
      }
    }
  }
  if ($('#vjtv').length) {
    console.log("vjtv");
    $('#vjtv_modal').modal({
      backdrop: 'static',
      keyboard: false
    });
    var options = {
      controls: true
    };
    $( window ).resize(function() {
      $(".playlist").height($("#my-video video").height()-58);
    });
    var player = videojs('my-video', options, function onPlayerReady() {
      videojs.log('Your player is ready!');
      $(".playlist").height($("#my-video video").height()-58);
      $(".vjs-big-play-button").hide();
    
      // In this context, `this` is the player that was created by Video.js.
      //this.play();
    
      // How about an event listener?
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
        if (goto+1 == playlist.length) {
          day.setDate(day.getDate()+1);
          loadDay();
        }
        videojs.log(goto);
        videojs.log(playlist.length);
      });
    });
    /* $(".vjs-poster").on('click', function(ev) {
    }); */
    player.logo({
      image: 'https://vjtelevision.com/vjtelevision/images/VJTV_4x_white.svg',
      url: "https://vjtelevision.com",
      height: 50,
      offsetH: 20,
      offsetV: 20,
      position: 'top-left',
      width: 150
    });

    $("#vjtv #date").html(day.toDateString());

    $.ajax({
      url: "https://avnode.net/api/getprogramsdays",
      method: "get"
    })
    .done(function(dd) {
      dates = dd;
      loadDay();
    })
    .fail(function(data) {
      $('#vjtv .playlist').html("error");
    });


    $('#vjtv #datepicker').datepicker({
      dateFormat: 'yy-mm-dd',
      beforeShow: function (input, inst) {
        var rect = input.getBoundingClientRect();
        setTimeout(function () {
	        inst.dpDiv.css({ top: rect.top + 40 });
        }, 0);
      },
      //defaultDate: new Date('03/10/2017'), // this line is for testing
      beforeShowDay: highlightDays
    });
    $("#vjtv #datepicker").change(function(){
      day = new Date($('#vjtv #datepicker').datepicker("getDate"));
      loadDay();
    });

    $( "#vjtv #datepickerbutton" ).click(function( event ) {
      event.preventDefault();
      var visible = $("#vjtv #datepicker").datepicker("widget").is(":visible");
      $("#vjtv #datepicker").datepicker(visible ? "hide" : "show");
    });

    function highlightDays(date) {
      for (var i = 0; i < dates.length; i++) {
        if (new Date(dates[i].replace("-","/").replace("-","/")).toString() == date.toString()) {
            return [true, 'highlight'];
        }
      }
      return [true, ''];
    }
  
    function loadDay() {
      var daystr = day.getFullYear()+"-"+(("0" + (day.getMonth()+1)).slice(-2))+"-"+(("0" + (day.getDate())).slice(-2));
      $("#vjtv #date").html(day.toDateString());
      if (dates.indexOf(daystr)===-1) {
        alert("No programming for this date!!!");
      } else {
        $('#vjtv .playlist').html("<div class=\"vjs-waiting\"><div class=\"vjs-loading-spinner\"></div></div>");
        $.ajax({
          url: "https://avnode.net/api/getprograms",
          method: "get",
          data: {day: daystr}
        })
        .done(function(data) {
          $('#loadingplay span').html("Building interface");
          var timeA = data.map(item => {return new Date(item.programming).getTime()});
          var now = new Date();
          var goal = now.getTime()-(now.getTimezoneOffset()*60*1000);
          if (goal>=timeA[0] && goal<timeA[timeA.length-1]) {
            var closest = timeA.reduce(function(prev, curr) {
              return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
            });
            oldgoto = timeA.indexOf(closest);
            goto = timeA.indexOf(closest);
          } else {
            oldgoto = goto = 0;
          }
          var html = "<ul class=\"list-unstyled\">"
          playlist = [];
          for (var a=0;a<data.length;a++) {
            playlist.push({
              sources: [{
                src: "https://avnode.net"+data[a].video.media.file,
                type: 'video/mp4'
              }],
              poster: data[a].video.imageFormats.small,
              slug: data[a].video.slug
            })

            /* console.log(data[a].programming);
            console.log(new Date(data[a].programming).toISOString());
            console.log(new Date(data[a].programming)); */
            var id = new Date(data[a].programming).getTime();
            var date = new Date(data[a].programming);
            html+="<li class=\"playlist-item bg-dark mb-3\" id=\"P"+a+"\">";
            html+="  <div class=\"row text-monospace small playlist-header\" id=\""+id+"\">";
            html+="    <div class=\"col\" id=\""+data[a].programming+"\"><div class=\"pl-2\">"+date.getUTCFullYear()+"-"+(("0" + (date.getUTCMonth()+1)).slice(-2))+"-"+(("0" + (date.getUTCDate())).slice(-2))+ "<br />"+(("0" + (date.getUTCHours())).slice(-2))+":"+(("0" + (date.getUTCMinutes())).slice(-2))+":"+(("0" + (date.getUTCSeconds())).slice(-2))+"</div></div>";
            html+="    <div class=\"col\"><div class=\"pr-2 text-right\">"+data[a].category.name+"<br />"+data[a].video.media.durationHR+"</div></div>";
            html+="  </div>";
            html+="  <div class=\"media p-2\" id=\"P"+a+"\">";
            html+="    <img class=\"mr-3\" style=\"width:100px\" src=\""+data[a].video.imageFormats.small+"\">";
            html+="    <div class=\"media-body\">";
            html+="      <h5 class=\"mt-0 mb-1\">"+data[a].video.title+"</h5>";
            html+="      <ul class=\"list-inline small\">"+data[a].video.users.map(user =>{return "<li>"+user.stagename+"</li>"})+"</ul>";
            html+="    </div>";
            html+="  </div>";
            html+="   <div class=\"more p-2\"><a href=\"https://avnode.net/videos/"+data[a].video.slug+"/\" class=\"badge badge-primary\">MORE</a></div>";
            html+="</li>";
          }
          html+="</ul>";
          player.playlist(JSON.parse(JSON.stringify(playlist)), goto);
          player.on('playlistitem', (item) => {
            oldgoto = goto;
            var track = "/video/"+playlist[goto].slug;
            ga('send', 'pageview', track);
            goto = player.playlist.currentItem();
            setMarker();
          });
          player.playlist.autoadvance(0);
          //player.playlist.currentItem(goto);
          $('#loadingplay i').hide();
          $('#loadingplay span').html("SWITCH ON TV!!!");
          $('#loadingplay').removeClass("disabled");
          $('#loadingplay').on('click', function(ev) {
            player.play();
          });
      
          $("#vjtv .playlist").height($("#my-video video").height()-58);
          $('#vjtv .playlist').html(html);
          $(".vjs-big-play-button").show();
          var setMarker = () => {
            $('#P'+oldgoto).addClass("bg-dark");
            $('#P'+oldgoto).removeClass("bg-danger");
            $('#P'+goto).removeClass("bg-dark");
            $('#P'+goto).addClass("bg-danger");
            $('#vjtv .playlist').imagesLoaded(() => {
              $('#vjtv .playlist').animate({scrollTop: $("#P"+goto).position().top}, 2000);
            });
            oldgoto = goto;
          }
          $( ".playlist-item" ).click(function( event ) {
            //$('#P'+goto).addClass("bg-dark");
            //$('#P'+goto).removeClass("bg-danger");
            //goto = parseInt($(this).attr("id").substring(1));
            player.playlist.currentItem(parseInt($(this).attr("id").substring(1)));
            //$('#P'+goto).removeClass("bg-dark");
            //$('#P'+goto).addClass("bg-danger");
          });
        })
        .fail(function(data) {
          $('#vjtv .playlist').html("error");
        });
      }
    }
  }
});  


