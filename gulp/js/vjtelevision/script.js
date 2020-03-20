$(function() {
  /* function bodyPadding() {
    $('.body-common').css("padding-top", $('#navbar-top').outerHeight()+"px");
  }
  bodyPadding();
  $( window ).resize(function() {
    bodyPadding();
  }); */
  if ($('#vjtv').length) {
    console.log("vjtv");
    var options = {
      controls: true,
      bigPlayButton: false
    };
    var player = videojs('my-video', options, function onPlayerReady() {
      videojs.log('Your player is ready!');
      $(".playlist").height($("#my-video video").height());

      $(".vjs-big-play-button").hide();
    
      // In this context, `this` is the player that was created by Video.js.
      //this.play();
    
      // How about an event listener?
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
      });
    });
    /* $(".vjs-poster").on('click', function(ev) {
      player.playlist([{
        sources: [{
          src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/sintel/poster.png'
      }, {
        sources: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://www.videojs.com/img/poster.jpg'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/bunny/poster.png'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/video/poster.png'
      }]);
      player.playlist.autoadvance(0);
      player.playlist.currentItem(2);
    }); */

    var now = new Date();

    $.ajax({
      url: "https://avnode.net/api/getprograms",
      method: "get"/* ,
      data: {month: now.getFullYear()+"-"+("0" + (now.getMonth() + 1)).slice(-2)} */
    })
    .done(function(data) {
      var timeA = data.map((item) => {return new Date(item.programming).getTime()});
      var goal = new Date().getTime();
      var closest = timeA.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
      });
      oldgoto = timeA.indexOf(closest);
      goto = timeA.indexOf(closest);
      console.log(goto);
      var html = "<ul class=\"list-unstyled\">"
      var playlist = [];
      for (var a=0;a<data.length;a++) {
        playlist.push({
          sources: [{
            src: "https://avnode.net"+data[a].video.media.file,
            type: 'video/mp4'
          }],
          poster: data[a].video.imageFormats.small
        })
        var id = new Date(data[a].programming).getTime();
        html+="<li class=\"playlist-item bg-dark mb-3\" id=\"P"+a+"\">";
        html+="  <div class=\"row text-monospace small playlist-header\">";
        html+="    <div class=\"col\"><div class=\"pl-2\">"+data[a].programming.split(".")[0].replace("T", " | ")+"</div></div>";
        html+="    <div class=\"col\"><div class=\"pr-2 text-right\">"+data[a].category.name+" | "+data[a].video.media.durationHR+"</div></div>";
        html+="  </div>";
        html+="  <div class=\"media p-2\" id=\"P"+a+"\">";
        html+="    <img class=\"mr-3\" style=\"width:100px\" src=\""+data[a].video.imageFormats.small+"\">";
        html+="    <div class=\"media-body\">";
        html+="      <h5 class=\"mt-0 mb-1\">"+data[a].video.title+"</h5>";
        html+="      <ul class=\"list-inline small\">"+data[a].video.users.map(user =>{return "<li>"+user.stagename+"</li>"})+"</ul>";
        html+="    </div>";
        html+="  </div>";
        html+="   <div class=\"more p-2\"><a href=\"/videos/"+data[a].video.slug+"/\" class=\"badge badge-primary\">MORE</a></div>";
        html+="</li>";
      }
      html+="</ul>";
      player.playlist(playlist, goto);
      player.on('playlistitem', (item) => {
        console.log("playlistitem");
        console.log(item);
        oldgoto = goto;
        goto = player.playlist.currentItem();
        setMarker();
      });
      player.playlist.autoadvance(0);
      //player.playlist.currentItem(goto);
      $('#vjtv .playlist').html(html);
      $(".vjs-big-play-button").show();
      var setMarker = () => {
        console.log("oldgoto");
        console.log(oldgoto);
        console.log("goto");
        console.log(goto);
        $('#P'+oldgoto).addClass("bg-dark");
        $('#P'+oldgoto).removeClass("bg-danger");
        $('#P'+goto).removeClass("bg-dark");
        $('#P'+goto).addClass("bg-danger");
        $('#vjtv .playlist').animate({
          scrollTop: $("#P"+goto).position().top
        }, 2000);
        oldgoto = goto;
        console.log("oldgoto");
        console.log(oldgoto);
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

    
    // Play through the playlist automatically.
  }

});
