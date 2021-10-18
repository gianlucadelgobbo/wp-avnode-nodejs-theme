var player

$(document).ready(function(){
  if ($('#my-video').length) {
    var options = {
      controls: true
    };
    /* $( window ).resize(function() {
      $(".playlist").height($("#my-video video").height()-58);
    }); */
    player = videojs('my-video', options, function onPlayerReady() {
      videojs.log('Your player is ready!');
      /* $(".playlist").height($("#my-video video").height()-58);
      $(".vjs-big-play-button").hide(); */
    
      // In this context, `this` is the player that was created by Video.js.
      //this.play();
    
      // How about an event listener?
      /* this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
        if (goto+1 == playlist.length) {
          day.setDate(day.getDate()+1);
          loadDay();
        }
        videojs.log(goto);
        videojs.log(playlist.length);
      }); */
    });
    /* $(".vjs-poster").on('click', function(ev) {
    }); */
    /* player.logo({
      image: 'https://pacnetwork.org/pac/images/LogoPAC-bar.svg',
      url: "https://pacnetwork.org",
      height: 50,
      offsetH: 20,
      offsetV: 20,
      position: 'top-left',
      width: 150
    }); */

    function loadVideo(video) {
      player.src({
        type: 'video/mp4',
        src: video
      });
    }
  }
});  


