var $container;
var mySvgPanZoom;
$(function() {
  $(".availablesoon").click(function(event) {
    alert("Available soon!!!");
    return false;
  });
  $("#subscribe .close").click(function(event) {
    $("#subscribe .input-group").removeClass("hide");
    $('#subscribe .loading').addClass("hide");
    $('#subscribe .alert').addClass("hide");
    $("#subscribe .alert").removeClass("alert-danger");
    $("#subscribe .alert").removeClass("alert-success");
  });
  $("#subscribe").submit(function(event) {
    event.preventDefault();
    $("#subscribe .input-group").addClass("hide");
    $('#subscribe .loading').removeClass("hide");
    jQuery.ajax({
      method: "POST",
      url: "/signup",
      data: $("#subscribe").serialize()
    }).done(function (data) {
      if (data.id) {
        $("#subscribe .alert").addClass("alert-success");
        $('#subscribe .alert .msg').html("<strong>Congratulations!</strong> Your subscription was successful&nbsp;&nbsp;&nbsp;");
      } else {
        $("#subscribe .alert").addClass("alert-danger");
        $('#subscribe .alert .msg').html("<strong>Warning!</strong> "+data.title+"&nbsp;&nbsp;&nbsp;");
      }
      $('#subscribe .loading').addClass("hide");
      $('#subscribe .alert').removeClass("hide");

    });
    return false;
  });
	/*jQuery("#loadmore").click(function() {
		jQuery.ajax({
			method: "POST",
			url: "/timeline/" + year + "/",
			data: {ajax: 1}
		}).done(function (msg) {
			$(".timeline").append(msg);
			year--;
			alert("Data Saved: " + msg);
		});
		return false;
	});*/
	jQuery(".tooltips").tooltip();
	$container = jQuery('.isotope');
	$container.imagesLoaded( function(){
		$container.isotope({
			itemSelector: 'div.isotopeitem',
			masonry: {}
		});
	});
	resetAffix();
	if (jQuery('.svg')) loadMap ();
	if (jQuery('#myAffix .navbar-brand.donttouch').length==0) {
		jQuery('#myAffix').on('affix.bs.affix', function () {
			//console.log('Fired!');
			jQuery(".navbar-brand").removeClass( 'visible-xs' );
		} );
		jQuery('#myAffix').on( 'affixed-top.bs.affix', function () {
			//console.log('unaff');
			jQuery(".navbar-brand").addClass( 'visible-xs' );
		} );
	}
	/*jQuery('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});*/
});
jQuery( window ).resize(function() {
	resetAffix();
});
function resetAffix(){
	jQuery('#myAffix').affix({
		offset: {
			top: jQuery('#myHeader').height()
		}
	}); 
}

function loadMap () {
	jQuery(".svg").html("<div class=\"content-padded\">Loading data...</div>");
	var embed = document.createElement('embed');
	embed.setAttribute('style', 'width: 100%; height: 100%;');
	embed.setAttribute('type', 'image/svg+xml');
	jQuery(".svg")
	embed.setAttribute('src', jQuery(".svg").attr('data-img'));
	jQuery(".svg").html("");
	jQuery(".svg").append(embed);

	var eventsHandler;
	
	eventsHandler = {
		haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
		init: function(options) {
			var instance = options.instance
				, initialScale = 1
				, pannedX = 0
				, pannedY = 0
	
			// Init Hammer
			// Listen only for pointer and touch events
			this.hammer = Hammer(options.svgElement, {
				inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
			})
	
			// Enable pinch
			this.hammer.get('pinch').set({enable: true})
	
			// Handle double tap
			this.hammer.on('doubletap', function(ev){
				instance.zoomIn()
			})
	
			// Handle pan
			this.hammer.on('panstart panmove', function(ev){
				// On pan start reset panned variables
				if (ev.type === 'panstart') {
					pannedX = 0
					pannedY = 0
				}
	
				// Pan only the difference
				instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
				pannedX = ev.deltaX
				pannedY = ev.deltaY
			})
	
			// Handle pinch
			this.hammer.on('pinchstart pinchmove', function(ev){
				// On pinch start remember initial zoom
				if (ev.type === 'pinchstart') {
					initialScale = instance.getZoom()
					instance.zoom(initialScale * ev.scale)
				}
	
				instance.zoom(initialScale * ev.scale)
	
			})
	
			// Prevent moving the page on some devices when panning over SVG
			options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
		},
		destroy: function(){
			this.hammer.destroy()
		}
	}
	
	lastEventListener = function(){
		var panZoom = window.panZoom = svgPanZoom(embed, {
			zoomEnabled: true,
			controlIconsEnabled: true,
			fit: 1,
			center: 1,
			customEventsHandler: eventsHandler
		});

		jQuery(window).resize(function(){
			panZoom.resize();
			panZoom.fit();
			panZoom.center();
		})
	};
	embed.addEventListener('load', lastEventListener);
}
