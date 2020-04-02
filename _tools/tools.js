var genUrl = [
  "https://avnode.org/?createcache=1",
  "https://flyer.it/?createcache=1","https://flyer.it/it/?createcache=1",
  "https://linux-club.org/?createcache=1",
        
  "https://livecinemafestival.com/?createcache=1","https://livecinemafestival.com/en/?createcache=1",
  
  "https://fotonicafestival.com/?createcache=1","https://fotonicafestival.com/en/?createcache=1",
  
  "https://liveperformersmeeting.net/?createcache=1",
  
  "https://shockart.net/?createcache=1","https://shockart.net/it/?createcache=1",
  "https://vjtelevision.com/?createcache=1",
  "https://wam.flyer.it/?createcache=1","https://wam.flyer.it/it/?createcache=1",
  "https://chromosphere.eu/?createcache=1","https://chromosphere.eu/it/?createcache=1",

];

var genUrllocal = [
  //"http://localhost:3000/en/?createcache=1", //flyer.it
  "http://localhost:3001/?createcache=1", //liveperformersmeeting.net
  "http://localhost:3002/?createcache=1", //livecinemafestival.com
  "http://localhost:3003/?createcache=1", //livecinemafestival.com
  "http://localhost:3004/?createcache=1", //livecinemafestival.com
  "http://localhost:3005/?createcache=1", //shockart.net
  "http://localhost:3006/?createcache=1", //livecinemafestival.com
  "http://localhost:3007/?createcache=1", //livecinemafestival.com
  "http://localhost:3008/?createcache=1", //livecinemafestival.com
  "http://localhost:3009/?createcache=1", //fotonicafestival.com
  "http://localhost:3010/?createcache=1", //livecinemafestival.com
  "http://localhost:3011/?createcache=1", //livecinemafestival.com

  //"http://localhost:3000/it/?createcache=1", //flyer.it
  "http://localhost:3001/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3002/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3003/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3004/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3005/it/?createcache=1", //shockart.net
  "http://localhost:3006/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3007/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3008/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3009/it/?createcache=1", //fotonicafestival.com
  "http://localhost:3010/it/?createcache=1", //livecinemafestival.com
  "http://localhost:3011/it/?createcache=1", //livecinemafestival.com

  "http://localhost:3002/meta/?generate=1", //livecinemafestival.com
  "http://localhost:3009/meta/?generate=1", //fotonicafestival.com
  "http://localhost:3001/meta/?generate=1", //fotonicafestival.com
  "http://localhost:3003/meta/?generate=1", //chromosphere.eu
  "http://localhost:3005/meta/?generate=1", //shockart.net
];

for (var a=0;a<genUrllocal.length;a++) {
  window.open(genUrllocal[a]);
}






function generateHomes(conta) {
  var genUrl = [
    "https://avnode.org/?createcache=1",
    "https://flyer.it/?createcache=1","https://flyer.it/it/?createcache=1",
    "https://linux-club.org/?createcache=1",
          
    "https://livecinemafestival.com/?createcache=1","https://livecinemafestival.com/en/?createcache=1",
    
    "https://fotonicafestival.com/?createcache=1","https://fotonicafestival.com/en/?createcache=1",
    
    "https://liveperformersmeeting.net/?createcache=1",
    
    "https://shockart.net/?createcache=1","https://shockart.net/it/?createcache=1",
    "https://vjtelevision.com/?createcache=1",
    "https://wam.flyer.it/?createcache=1","https://wam.flyer.it/it/?createcache=1",
    "https://chromosphere.eu/?createcache=1","https://chromosphere.eu/it/?createcache=1",

  ];
  if (conta==0) {
    $('#myModal .modal-body').html("");
    for (var a=0;a<genUrl.length;a++) {
      $('#myModal .modal-body').append("<div id=\"genUrl"+a+"\"><i class=\"glyphicon glyphicon-refresh\"></i> "+genUrl[a]+"</div>");
    }
    $('#myModal .modal-footer .btn-primary').addClass("disabled");
    $('#myModal').modal();
  }
  $.ajax({
    url: genUrl[conta],
    context: document.body
  }).fail(function() {
    error++;
    if (error>2) {
      error=0;
      generateHomes(conta+1);
    } else {
      generateHomes(conta);
    }
  }).done(function(doc) {
    $('#myModal .modal-body #genUrl'+conta+" .glyphicon").removeClass("glyphicon-refresh");
    $('#myModal .modal-body #genUrl'+conta+" .glyphicon").addClass("glyphicon-ok");
    if (conta+1 < genUrl.length) {
      generateHomes(conta+1);
    } else {
      $('#myModal .modal-body').append('<br/><div class="alert alert-success" role="alert">DONE</div>');
      $('#myModal .modal-footer .btn-primary').removeClass("disabled");
    }
  });
  
}
function generateLocals(conta) {
  if (conta==0) {
    $('#myModal .modal-body').html("");
    for (var a=0;a<genUrllocal.length;a++) {
      $('#myModal .modal-body').append("<div id=\"genUrl"+a+"\"><i class=\"glyphicon glyphicon-refresh\"></i> "+genUrllocal[a]+"</div>");
    }
    $('#myModal .modal-footer .btn-primary').addClass("disabled");
    $('#myModal').modal();
  }
  $.ajax({
    url: genUrllocal[conta],
    context: document.body
  }).fail(function() {
    error++;
    if (error>2) {
      error=0;
      generateLocals(conta+1);
    } else {
      generateLocals(conta);
    }
  }).done(function(doc) {
    $('#myModal .modal-body #genUrl'+conta+" .glyphicon").removeClass("glyphicon-refresh");
    $('#myModal .modal-body #genUrl'+conta+" .glyphicon").addClass("glyphicon-ok");
    if (conta+1 < genUrllocal.length) {
      generateLocals(conta+1);
    } else {
      $('#myModal .modal-body').append('<br/><div class="alert alert-success" role="alert">DONE</div>');
      $('#myModal .modal-footer .btn-primary').removeClass("disabled");
    }
  });
}
$(function() {
    $( "#generateHomes" ).click(function(event) {
    event.preventDefault();
    generateHomes(0);
  });
});
$(function() {
    $( "#generateLocals" ).click(function(event) {
    event.preventDefault();
    generateLocals(0);
  });
});
