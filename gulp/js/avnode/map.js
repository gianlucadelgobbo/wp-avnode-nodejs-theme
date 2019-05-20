var infowindow = null;

function AutoCenter() {
  //  Create a new viewpoint bound
  var bounds = new google.maps.LatLngBounds();
  //  Go through each...
  $.each(markers, function (index, marker) {
    bounds.extend(marker.position);
  });
  //  Fit these bounds to the map
  map.fitBounds(bounds);
}

function initialize() {
  var styles = [
    {
      stylers: [
        { hue: "#d9eef3" },
        { saturation: -30 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    },{
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
  var mapOptions = {
    center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
    zoom: 5,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var infoWindow = new google.maps.InfoWindow({
    content: "",
    maxWidth: 230,
    maxHeight: 300,
  });

  var latlngbounds = new google.maps.LatLngBounds();
  for (i = 0; i < markers.length; i++) {
    if (markers[i].type == "member") {
      var data = markers[i];
      var myLatlng = new google.maps.LatLng(data.lat, data.lng);
      latlngbounds.extend(myLatlng);
      var pinColor = "006DD9";
      var pinImage = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34)
      );
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: pinImage,
        animation: google.maps.Animation.DROP,
        title: data.display_name,
      });

      (function (marker, data) {
        google.maps.event.addListener(marker, "click", function (e) {
          //infoWindow.close();
          var contentString =
            '<div class="popup">'+
            '<h4><a href="'+data.slug+'">'+data.display_name+'</a></h4>'+
            '<small><b>'+
            data.date+'</b><br />'+
            data.destination+
            '</small>'+
            '</div>';
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });

      })(marker, data);
    }
  }
  /*for (i = 0; i < markers.length; i++) {
    if (markers[i].type == "editions") {
      var data = markers[i];
      var myLatlng = new google.maps.LatLng(data.lat, data.lng);
      latlngbounds.extend(myLatlng);
      var pinColor = "FE7569";
      var pinImage = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: pinImage,
        animation: google.maps.Animation.DROP,
        title: data.display_name
      });
      marker.setZIndex(1000);
      (function (marker, data) {
        google.maps.event.addListener(marker, "click", function (e) {
          //infoWindow.close();
          var contentString =
            '<div class="popup">'+
            '<h4><a href="'+data.slug+'">'+data.display_name+'</a></h4>'+
            '<small><b>'+
            data.date+'</b><br />'+
            data.destination+
            '</small>'+
            '</div>';
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });

      })(marker, data);
    }
  }*/
  map.fitBounds(latlngbounds);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=' + 'AIzaSyBJ_PEUV1D4Uw6TktDxQp-ErObMyRQuvm4' + '&callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript();