$(document).ready(function () {
	// Services carousel
	$('.services-carousel').carousel({
		itemsPerTransition: 1,
		loop: true,
		pagination: false,
		speed: 'fast',
		translate3d: false,
		continuous: true,
		touch: true,
		insertPrevAction: function () { return $('<div class="serv-ctrls serv-prev"><i class="fa fa-angle-left"></i></div>').appendTo('.services'); },
		insertNextAction: function () { return $('<div class="serv-ctrls serv-next"><i class="fa fa-angle-right"></i></div>').appendTo('.services'); }		
	});
	// Clients carousel
	var ctrlContainer = $('.clients .container');
	$('.clients-carousel').carousel({
		itemsPerTransition: 1,
		loop: true,
		pagination: false,
		speed: 'fast',
		translate3d: false,
		continuous: true,
		touch: true,
		insertPrevAction: function () { return $('<div class="client-ctrls client-prev"><i class="fa fa-angle-left"></i></div>').appendTo(ctrlContainer); },
		insertNextAction: function () { return $('<div class="client-ctrls client-next"><i class="fa fa-angle-right"></i></div>').appendTo(ctrlContainer); }		
	});
	// var parallaxElems = $('.today, .clients');
	// $(window).on('scroll resize', function(){
	// 	parallaxElems.each(function () {
	// 		var elem = $(this),
	// 			elemHeight = elem.height(),
	// 			windowHeight = $(window).height(),
	// 			docViewTop = $(window).scrollTop(),
	// 			docViewBottom = docViewTop + windowHeight,
	// 			elemTop = $(elem).offset().top,
	// 			elemBottom = elemTop + elemHeight,
	// 			k = (1000 - elemHeight) / windowHeight;
	// 		if ((windowHeight > 768) && (docViewBottom >= elemTop) && (elemBottom >= docViewTop)) {
	// 			var offset = (docViewTop - elemTop) * k;
	// 			elem.css({
	// 				backgroundPosition : 'center ' + offset + 'px'
	// 			});
	// 		} else {
	// 			elem.css({
	// 				backgroundPosition : ''
	// 			});
	// 		}
	// 	})			 
	// });
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	var elems = $('.filter-elem'),
		elemHeight = elems.eq(0).height(),
		controls = $('.filter'),
		contHeight = $('.filter-container');
	controls.on('click', function() {
		controls.removeClass('filter-active');
		$(this).addClass('filter-active');
		var filterName = $(this).data('filter');
		if (filterName === 'all') {
			if (!isMobile) {
				contHeight.animate({height: 486});	
			}				
			toggleElems (elems, 'show');												
		} else {
			var misMatch = elems.not('.' + filterName),
				match = elems.filter('.' + filterName);
			toggleElems (misMatch);	
			if (!isMobile) {		
				contHeight.animate({height: 283});
			}
			toggleElems (match, 'show');
		}
	});
	// $(window).on('resize', function() {		
	// 	// $('[data-filter="all"]').click();
	// 	$('.filter').eq(0).click();
	// });
	
	var mobileEvent = isMobile ? 'touchstart' : 'mouseenter'
	elems.each(function() {
		var _this = $(this);
		_this.on(mobileEvent, function() {
			var child = _this.children('.slide-overlay'),
				allChildren = $('.slide-overlay').not(child),
				allButtons = $('.view, .link'),
				theseButtons = _this.children('.view, .link');
			hoverAnim (allChildren);
			hoverAnim (child, 'show');
			toggleButtons (allButtons);
			toggleButtons (theseButtons, 'show');
			if (isMobile) {
				child.on('touchstart', function(event) {
					event.stopImmediatePropagation();
					hoverAnim (child);
					toggleButtons (allButtons);
				});
			}						
		});
		if (!isMobile) {
			_this.on('mouseleave', function() {
				var child = _this.children('.slide-overlay'),
					theseButtons = _this.children('.view, .link');
				hoverAnim (child);
				toggleButtons (theseButtons);
			});
		}
	});

	

	// $(window).on('resize', function(){
	// 	if ($('.filter-container').outerWidth(true) <= 750) {
	// 		$('.filter-elem').css({
	// 			width : '100%'
	// 		});;
	// 	} else {
	// 		$('.filter-elem').removeStyle('width');
	// 	}
	// });
	var hoverSpeed = 50;
	function hoverAnim (elements, mode) {		
		elements.animate({
			bottom : mode === 'show' ? '0' : '-100%'
		}, hoverSpeed);
	};
	function toggleButtons (buttons, mode) {
		buttons.each(function(){
			var className = $(this).attr('class');
			if (className === 'view') {
				$(this).animate({
					left : mode === 'show' ? 0 : '-61px'
				}, hoverSpeed);				
			} else if (className === 'link') {
				$(this).animate({
					right : mode === 'show' ? 0 : '-61px'
				}, hoverSpeed);					
			};
		});
	};
	function toggleElems (elements, mode) {
		var length = elements.length,
			contWidth = $('.filter-container').outerWidth(true);
		elements.each(function(i){
			$(this).animate({
				top : i <= 4 ? 0 : elemHeight + 'px',
				left : (length === 10 ? (i*20) : (i*(100 / length))) % 100 + '%',
				height : mode === 'show' ? elemHeight : 0,
				width : contWidth < 751 ? '100%' : length === 10 ? '20%': (100 / length) + '%'
			}, 300);
		});	
	}
});