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
		main.Common.primaryNav();
		main.Common.initMixItUp();
		main.Common.sidebarScroll();
		main.Common.formInteractions();
		main.Common.formSubmit();
	},

	// Full-screen Primary Nav overlay, inspired by Cody House (http://codyhouse.co)
	primaryNav: function () {

		jQuery(document).ready(function($){

			var MQL = 1170;

			//primary navigation slide-in effect
			if($(window).width() > MQL) {
				var headerHeight = $('.site-header').height();
				$(window).on('scroll',
				{
			        previousTop: 0
			    }, 
			    function () {
				    var currentTop = $(window).scrollTop();
				    //check if user is scrolling up
				    if (currentTop < this.previousTop ) {
				    	//if scrolling up...
				    	/*if (currentTop > 0 && $('.site-header').hasClass('is-fixed')) {
				    		$('.site-header').addClass('is-visible');
				    	} else {
				    		$('.site-header').removeClass('is-visible is-fixed');
				    	}*/
				    } else {
				    	//if scrolling down...
				    	/*$('.site-header').removeClass('is-visible');
				    	if( currentTop > headerHeight && !$('.site-header').hasClass('is-fixed')) $('.site-header').addClass('is-fixed');*/
				    }
				    this.previousTop = currentTop;
				});
			}

			//open/close primary navigation
			$('.primary-nav-trigger').on('click', function(){
				$('.menu-icon').toggleClass('is-clicked'); 
				$('.site-header').toggleClass('menu-is-open');
				
				//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
				if( $('.primary-nav').hasClass('is-visible') ) {
					$('.primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
						$('body').removeClass('overflow-hidden');
					});
				} else {
					$('.primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
						$('body').addClass('overflow-hidden');
					});	
				}
			});
		});

	},// primaryNav

	// Full-screen Primary Nav overlay, inspired by Cody House (http://codyhouse.co)
	initMixItUp: function () {

		if ( $('#grid-container').length ) {
			$(function(){
  				$('#grid-container').mixItUp();
			});
		}

	},// initMixItUp

	// Sidebar follows users down the page
	sidebarScroll: function() {

		if ( $('#sidebar.sticky-sidebar').length ) {
			
			var sidebar = $('.sidebar-inner');
			var top 	= sidebar.offset().top - parseFloat(sidebar.css('margin-top'));

			$(window).scroll(function (event) {
				var y = $(this).scrollTop();
				if (y >= top) {
					sidebar.addClass('fixed');
				} else {
					sidebar.removeClass('fixed');
				}
			});
			
		}

	},// sidebarScroll

	// Get labels out of the way once user inputs data
	formInteractions: function() {

		if ( $('#cf-form').length ) {

			if( $('.floating-labels').length > 0 ) floatLabels();

			function floatLabels() {
				var inputFields = $('.floating-labels .cf-label').next();
				inputFields.each(function(){
					var singleInput = $(this);
					//check if user is filling one of the form fields 
					checkVal(singleInput);
					singleInput.on('change keyup', function(){
						checkVal(singleInput);	
					});
				});
			}

			function checkVal(inputField) {
				( inputField.val() == '' ) ? inputField.prev('.cf-label').removeClass('float') : inputField.prev('.cf-label').addClass('float');
			}

		}
	
	},// formInteractions


	// Submit contact form w/ Ajax
	formSubmit: function() {

		var form = $('#cf-form');

		// Check if form exists
		if (form.length) {

			// Init jQuery Validate function
			$(form).validate();

			// Submit form
			$(form).submit(function(e) {

				if ( $(this).valid() ) { 

					// obfuscate email
					var string1 = "eclajambe",
						string2 = "@",
						string3 = "gmail.com",
						string4 = string1 + string2 + string3;

					// gather input data
					var name    = $('#cf-name'),
						email   = $('#cf-email'),
						message = $('#cf-message');

					if(name.val() == "" || email.val() == "" || message.val() == "") {
						//$('.error-message').fadeToggle(400);
						return false;
					} else {
						$.ajax({
							method: 'POST',
							url: '//formspree.io/' + string4,
							data: $(form).serialize(),
							datatype: 'json'
						});
						e.preventDefault();
						$(this).get(0).reset();
						$('.success-message').fadeToggle(400);
					}
			
				}// validation check

				return false;

			});// form.submit

		}// form.length

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
