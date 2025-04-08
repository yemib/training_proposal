/******************
	:: Indexes
*******************

Window -> Load
:: Progress Bar

*******************
	:: Indexes
*******************/

( function($){
	"use strict"
	
	$( document ).ready( function($) {
		$( '.search-popup-modal' ).magnificPopup({
			type: 'inline',
			preloader: false,
			modal: true
		});

		$(document).on('click', '.popup-modal-dismiss', function (e) {
			e.preventDefault();
			$.magnificPopup.close();
		});
		
		var doc_height      = $(document).height(); 
		var view_height     = $(window).height();
		var header_offset   = $( '.header-stickable' ).offset();
		var outerHeight     = $( '.header-stickable' ).outerHeight();
		var header_position = header_offset.top + outerHeight;
		var window_width    = $(window).width();

		if ( $( 'body' ).hasClass( 'admin-bar' ) && window_width >= 992 ) {
			$( '.site-header-container' ).addClass( 'admin-bar-enabled' );
		}

		$( window ).scroll( function(event) {
			if ( doc_height > ( ( outerHeight * 2 ) + view_height ) ) {
				var current_position = $( window ).scrollTop();
				var window_width2     = $(window).width();

				if ( current_position > header_position ) {
					$( '.header-stickable' ).addClass( 'tcr-sticky-header' );

					if ( ! $( '.tcr-page-title' ).length > 0 ) {
						$( '.site-main' ).css( 'padding-top', '250px' );
					}

					var offset_px = 0;
					if( $('#wpadminbar').length > 0 && (self===top) ){
						offset_px = jQuery('#wpadminbar').height();
					}
					if(window_width2 >= 1025){
						$('.header-stickable').css('top', offset_px + "px");
					}
				} else {
					$('.header-stickable' ).removeClass( 'tcr-sticky-header' );
					$('.header-stickable').removeAttr('style');
					$( '.site-main' ).css( 'padding-top', '150px' );
				}
			}
		});
		
		$('.popup-tcr a').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
		
		$( '#primary-menu' ).slicknav({
			'label' : ' ',
			'closedSymbol': '+', 
			'openedSymbol': '-', 
			appendTo : '#site-navigation-mobile'
		});

		$( document ).on( 'click', '#scroll-to-top', function ( e ) {
			e.preventDefault();
			$( 'html, body' ).animate({ scrollTop: 0 }, 900);
		});
		
		$('#scroll-to-top').removeClass('active');
		$( window ).scroll( function(){
			if ( $( window ).scrollTop() > 150 ) {
				$( '#scroll-to-top' ).addClass('active');
			} else {
				$( '#scroll-to-top' ).removeClass('active');
			}
		}); 

		$( document ).on( 'click', '.elementor-accordion .elementor-accordion-item', function ( $this) {			
			$( '.elementor-accordion').find( '.elementor-tab-content' ).removeAttr( "hidden" );
		});

		var top_margin = $( '.header-stickable' ).outerHeight() + 50;
		if( $('#wpadminbar').length > 0 && (self===top) ){
			top_margin = top_margin + jQuery('#wpadminbar').height();
		}

		$( '.tcr-sticky-container-wrapp' ).theiaStickySidebar({
			additionalMarginTop: top_margin
		});
		
		$( document ).on( 'click', '.tcr-sidemenu-toggle', function ( e ) {
			e.preventDefault();
			$( '.tcr-sidemenu-wrap' ).toggleClass( 'active' );
		});

		$( document ).on( 'click', '.tcr-sidemenu-closepanel', function ( e ) {
			e.preventDefault();
			$( '.tcr-sidemenu-wrap' ).removeClass( 'active' );
		});

		const pbmit_elm = gsap.utils.toArray( '.tcr-extend-animation' );
		if ( pbmit_elm.length == 0 ) return
		ScrollTrigger.matchMedia( {
			"(min-width: 1200px)": function() {
				pbmit_elm.forEach( section => {
					let tl = gsap.timeline({
						scrollTrigger: {
							trigger: section,
							start: "top 50%",
							end: "+=400px",
							scrub: 1
						},
						defaults: { ease: "none" }
					});
					tl.fromTo(section, { clipPath: 'inset(0% 5% 0% 5% round 30px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.5 })	
				});			 
			}
		});
	});

})( jQuery );