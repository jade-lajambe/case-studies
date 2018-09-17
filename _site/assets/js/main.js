var main = {
	Common: null,
	Home: null,

	init: function () {
		// js based on URI segment
		var uri = document.location.pathname.split('/');

		if (uri[1] == '' || uri[1] == null) {
			// fire if homepage
			main.Home.init();
		}
		// global scripts
		main.Common.init();
	}

};

main.Common = {

	// instantiate scriptsenguniu
	init: function () {
		// only trigger if not mobile device
		if ( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ) {

		}
		main.Common.sectionKeyNav();
	},

	// Keyboard navigation between sections
	sectionKeyNav: function() {
		
		var sectionTops = [];
		
		$('.cd-section').each(function(i, el){
			sectionTops.push(this.offsetTop);
		});

		$(document).keydown(function(e) {
			
			var dir 	  = false,
				targetTop = -1;

			switch (e.keyCode) {
				case 38:
					dir = -1;
				break;                
				case 40:
					dir = 1;
				break;
			}

			if (dir) {
				e.preventDefault();
				winTop = window.scrollY;
				$.each(sectionTops, function(i, v){
					if ((dir == 1 && winTop < v && targetTop < 0) ||
						(dir == -1 && winTop > v)) {
						targetTop = v;
					}
				});

				if (targetTop >= 0) {
					$('html, body').animate({scrollTop: targetTop}, 500);
				}

			}

		});	
	}

};

// homepage scripts
main.Home = {

	// instantiate scripts
	init: function () {
		// only trigger if not mobile device
		if ( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ) {

		}
	}

};

// load js on document load
jQuery( document ).ready(function() {
	main.init();
});
