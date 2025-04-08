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
	
	if ( vwashcore_object.is_preview_mode ) {
		jQuery(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-progress-bar.default', progressbar );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-counter.default', counter );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-blog.default', swiper_slider );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-clients.default', swiper_slider );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-shows.default', swiper_slider );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-projects.default', projects_preview_js );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-services.default', services_preview_js );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-team.default', team_preview_js );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-testimonials.default', swiper_slider );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-tabs.default', custom_tab );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-products.default', swiper_slider );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-marquee.default', swiper_slider );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/tcr-before-after.default', before_after );
		});
	}

	$( window ).load(
		function( $ ) {

			progressbar();
			counter();
			swiper_slider();
			custom_tab();
			dynamiccursor_pointer();
			before_after();

			jQuery( window ).on( 'scroll', function(){
				progressbar();
				counter();
			});
			
			/*
			 * Magnific Popup
			 */

			jQuery( '.tcr-mfg-popup-image' ).magnificPopup({
				type: 'image'
			});

			/*
			 * Service list layout
			 */
			if ( jQuery( '.services-layout-cards' ).length ) {
				ScrollTrigger.matchMedia({
					"(min-width: 992px)" : function () {
						let panels = gsap.utils.toArray( '.services-layout-cards .tcr-service-wrapper' );
						const spacer = 0;
						let sheight = panels[0].offsetHeight + 120;
						panels.forEach((panel, i) => {
							ScrollTrigger.create({ trigger: panel, start: () => "top 150px", endTrigger: ".services-layout-cards", end: `bottom top+=${sheight + panels.length * spacer}`, pin: !0, pinSpacing: !1 });
						});
					},
					"(max-width:992px)": function () {
						ScrollTrigger.getAll().forEach( ( panels ) => panels.kill( !0 ) );
					},
				});
			}

			jQuery( '.tcr-swiper-slider' ).hover( function() {
				jQuery(this).toggleClass( 'tcr-swiper-slider-hovered' );
			});

			jQuery( '.services-layout-list .tcr-service-wrapper' ).hover( function() {
				var img_url = jQuery(this).attr( 'data-bg-img' );
				if ( jQuery(this).parents( '.services-layout-list' ).length > 0 ) {
					var img_url = jQuery(this).attr( 'data-bg-img' );
					jQuery(this).parents( '.services-layout-list' ).css({"background-image": "url(" + img_url + ")"});
					jQuery(this).parents( '.services-layout-list' ).find( '.tcr-service-wrapper' ).removeClass( 'active' );
					jQuery(this).addClass( 'active' );
				}
			});

			jQuery( '.projects-layout-list' ).each( function() {
				if ( jQuery(this).find( '.tcr-projects-wrapper:first' ).length > 0 ) {
					jQuery(this).find( '.tcr-projects-wrapper:first' ).addClass( 'active' );
				}
			});

			jQuery( '.projects-layout-list .tcr-projects-wrapper' ).hover( function() {
				var img_url = jQuery(this).attr( 'data-bg-img' );
				if ( jQuery(this).parents( '.projects-layout-list' ).length > 0 ) {
					jQuery(this).parents( '.projects-layout-list' ).find( '.tcr-projects-wrapper' ).removeClass( 'active' );
					jQuery(this).addClass( 'active' );
				}
			});
		}
	);

	function before_after(){
		if ( $( '.tcr-before-after-outer' ).length > 0 ) {
			$( '.tcr-before-after-outer' ).twentytwenty({ default_offset_pct: 0.7 });
		}
	}

	function projects_preview_js() {
		swiper_slider();
		dynamiccursor_pointer();
	}
	
	function services_preview_js() {
		swiper_slider();
	}
	
	function team_preview_js() {
		swiper_slider();
	}
	
	/*
	 * Run Progress Bar
	 */

	function progressbar() {
		var window_position = jQuery( window ).scrollTop();
		window_position     = window_position + jQuery( window ).height();
		
		jQuery( '.tcr-progress-bar-inner' ).each( function( index ) {
			var element_position  = jQuery( this ).offset().top;
			
			if ( element_position < window_position ) {
				if ( ! jQuery( this ).parent( '.tcr-progress-bar' ).hasClass( 'bar-is-animated' ) ) {
					jQuery( this ).parent( '.tcr-progress-bar' ).addClass( 'bar-is-animated' );
					var $this = this;
					var max_value = jQuery( this ).attr( 'data-bar-value' );
					var width = 1;
					var id = setInterval( frame, 14 );

					function frame() {
						if ( width >= 100 ) {
							clearInterval( id );
						} else {
							if ( max_value >= width ) {
								width++;
								jQuery( $this ).css( 'width', width + "%" );	
							}
						}
					}
				}
			}
		});
		
		jQuery( '.tcr-circle-progress-bar' ).each( function( index ) {
			var element_position  = jQuery( this ).offset().top;

			jQuery( this ).asPieProgress({
				speed: 50,
				easing: 'swing'
			});

			if ( element_position < window_position ) {
				jQuery( this ).asPieProgress( 'start' );
			}			
		});
	}

	/*
	 * Run Counter
	 */
	function counter() {
		var window_position = jQuery( window ).scrollTop();
		window_position     = window_position + jQuery( window ).height();
		
		jQuery( '.tcr-counter-wrapper .tcr-counter-number' ).each( function( index ) {
			var element_position  = jQuery( this ).offset().top;
			if ( element_position < window_position ) {
				if ( ! jQuery( this ).hasClass( 'counter-is-animated' ) ) {
					jQuery( this ).addClass( 'counter-is-animated' );
					var $this = this;
					var max_value = jQuery( this ).attr( 'data-counter-value' );

					var $this = jQuery(this);
					jQuery({ Count: 0 }).animate(
					{ 
						Count: $this.text() 
					},
					{
						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.text( Math.ceil( this.Count ) );
						}
					});
				}
			}
		});
	}
	
	/*
	 * Owl carousel
	 */
	function swiper_slider() {
		setTimeout( function(){ 
			jQuery( '.tcr-swiper-slider' ).each( function() {
				var $swiper_options = ( jQuery( this ).attr( 'data-swiper_options' ) ) ? jQuery( this ).attr( 'data-swiper_options' ) : {};

				if ( $swiper_options ) {
					const swiper = new Swiper( this, JSON.parse( $swiper_options ) );
				}
			});
			
		}, 500 );
	}
	
	/*
	* pointer
	*/
	function dynamiccursor_pointer() {
		
		const cursorSettings = {
			'class' : 'dynamicCursor',
			'size' : '15',
			'expandedSize' : '50',
			'expandSpeed' : 0.4,
			'background' : 'rgba(0, 0, 0, 0.5)',
			'color' : 'rgba(0, 0, 0, 0.5)',
			'opacity' : '1',
			'transitionTime' : '1.4s',
			'transitionEase' : 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
			'borderWidth' : '0',
			'borderColor' : 'black',
			'iconSize': '11px',
			'iconColor': 'white',
			'triggerElements': {
				'trigger1' : {
					'className' : 'tcr-title-tooltip',
					'icon' : '<i class="fa fa-arrows-h"></i>'
				},
				'trigger2' : {
					'className' : 'tcr-img-tooltip',
					'icon' : ''
				},
				'trigger3' : {
					'className' : 'tcr-team-img-tooltip',
					'icon' : ''
				},

			}
		}

		function dynamicCursor(options) {
			var hold;
			let cursor = document.createElement('div');
			let cursorIcon = document.createElement('div');

			cursorIcon.classList.add('cursorIcon');
			cursorIcon.style.position = 'absolute';
			cursorIcon.style.textTransform = 'uppercase';
			cursorIcon.style.fontWeight = '600';
			cursorIcon.style.textAlign = 'center'
			cursorIcon.style.top = '50%';
			cursorIcon.style.width = '100%';
			cursorIcon.style.transform = 'translateY(-50%)';
			cursorIcon.style.color = options.iconColor;
			cursorIcon.style.fontSize = options.iconSize;
			cursorIcon.style.opacity = 0;
			cursorIcon.style.transition = `opacity ${options.expandSpeed}s`;

			cursor.classList.add(options.class);
			cursor.style.boxSizing = 'border-box';
			cursor.style.width = `${options.size}px`;
			cursor.style.height = `${options.size}px`;
			cursor.style.borderRadius = `${options.expandedSize}px`;
			cursor.style.opacity = 0;

			cursor.style.pointerEvents = 'none';
			cursor.style.zIndex = 999;
			cursor.style.transition = `transform ${options.transitionTime} ${options.transitionEase}, width ${options.expandSpeed}s .2s, height ${options.expandSpeed}s .2s, opacity 1s .2s`;
			cursor.style.border = `${options.borderWidth}px solid ${options.borderColor}`;
			cursor.style.position = 'fixed';
			cursor.style.background = options.background;

			cursor.appendChild(cursorIcon);
			document.body.appendChild(cursor);

			setTimeout(function() {
				cursor.style.opacity = options.opacity;
			}, 500)

			var idle;

			const updateCoordinates = e => {
				var x = e.clientX;
				var y = e.clientY;

				cursor.style.opacity = options.opacity;
				clearInterval(idle)

				idle = setTimeout(function() {
					cursor.style.opacity = 0;
				}, 4000)

				cursor.style.top = '0';
				cursor.style.left = '0';
				cursor.style.transform = `translateX(calc(${x}px - 50%)) translateY(calc(${y}px - 50%))`;
			} 

			window.addEventListener('mousemove', updateCoordinates);


			for(var i in options.triggerElements) {

				let trigger = $(`.${options.triggerElements[i].className}`);


				let icon = options.triggerElements[i].icon;

				if(!trigger) {
					console.warn('You dont have any triggers');
				} else {
					trigger.each(function(el){

					
						trigger[el].style.cursor = 'default';
						trigger[el].addEventListener('mouseover', (e) => {
											
						
							cursor.style.width = '${options.expandedSize}px';
							cursor.style.height = '${options.expandedSize}px';
							
							if(this.classList.contains("tcr-img-tooltip")){ 
								const html = this.getAttribute('data-img');                      
								cursorIcon.innerHTML = html;	
								cursor.style.background = 'rgba(0, 0, 0, 0)';        
								cursorIcon.classList.add('tcr-projects-img-cursor');               
								cursor.style.width = '${options.expandedSize}px';
								cursor.style.height = '${options.expandedSize}px';
							} else if(this.classList.contains("tcr-team-img-tooltip")){ 
								const html = this.getAttribute('data-img');                      
								cursorIcon.innerHTML = html;	
								cursor.style.background = 'rgba(0, 0, 0, 0)';        
								cursorIcon.classList.add('tcr-team-img-cursor');               
								cursor.style.width = '${options.expandedSize}px';
								cursor.style.height = '${options.expandedSize}px';
							}  else if(this.classList.contains("tcr-title-tooltip")){                   
								const html = this.getAttribute('data-title');                      
								cursorIcon.innerHTML = html;	
								cursor.style.background = 'rgba(0, 0, 0, 0)';
								cursorIcon.classList.add('tcr-project-title-wrap');
							} else{
								cursorIcon.innerHTML = icon;
							}
											
							
							cursorIcon.style.opacity = 1; 

						})

						trigger[el].addEventListener('mouseout', () => {
							cursor.style.width = `${options.size}px`;
							cursor.style.height = `${options.size}px`;
							cursor.style.background = options.background;
							cursorIcon.innerHTML = "";
							cursorIcon.style.opacity = 0;
							cursorIcon.classList.remove('tcr-projects-img-cursor');
						})
					})

				}
			}
		}

		dynamicCursor(cursorSettings);
	
	}

	/*
	 * Custom Tab
	 */
	function custom_tab() {

		jQuery( '.tcr_tabs_wrapper' ).each( function( index ) {
			jQuery( this ).find( '.tcr-tab-list .tcr-list-tab' ).first().addClass( 'tcr-active-tab-link' );
			jQuery( this ).find( '.tcr-tab-content .tcr-tab-content-list' ).first().addClass( 'tcr-active-tab' );
		});

		jQuery( '.tcr-tab-list .tcr-list-tab' ).on( 'click', function( event ) {

			event.preventDefault();

			jQuery( this ).parents( '.tcr_tabs_wrapper' ).find( '.tcr-active-tab' ).removeClass( 'tcr-active-tab' );
			jQuery( this ).parents( '.tcr_tabs_wrapper' ).find( '.tcr-active-tab-link' ).removeClass( 'tcr-active-tab-link' );
			jQuery( this ).addClass( 'tcr-active-tab-link' );

			var tab_content_id = jQuery( this ).attr( 'data-tab-id' );
			jQuery( '#' + tab_content_id ).addClass( 'tcr-active-tab' );
		});
	}
})( jQuery );