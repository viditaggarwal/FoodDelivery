function goBack()	{
  window.history.back();
  }

$(document).ready(function() {		
	$('input[name=\'filter_name\']').bind('keyup', function(e) {
		if (e.keyCode == 13) {
			$('.button-search').trigger('click');
		}
	});
	
   $('.button-search').bind('click', function() {
		url = $('base').attr('href') + 'index.php?route=catalog/search';
		
		var filter_name = $('input[name=\'filter_name\']').val();
		
		if (filter_name) {
				url += '&filter_name=' + encodeURIComponent(filter_name);
			} else {
				url += '&filter_name=';
			}
			
			location = url;
	});
	
	/* Search */
	/*$('.button-search1').bind('click', function() {
		url = $('base').attr('href') + 'index.php?route=catalog/search';
				 
		var filter_name = $('input[name=\'filter_name\']').attr('value');
		
		if (filter_name) {
			url += '&filter_name=' + encodeURIComponent(filter_name);
			location = url;
		} else {
			$("#search-bar").toggle();
		}
		
		
	});
	
	$('input[name=\'filter_name\']').bind('keydown', function(e) {
		if (e.keyCode == 13) {
			url = $('base').attr('href') + 'index.php?route=catalog/search';
			 
			var filter_name = $('input[name=\'filter_name\']').attr('value');
			
			if (filter_name) {
				url += '&filter_name=' + encodeURIComponent(filter_name);
			} else {
				url += '&filter_name=';
			}
			
			location = url;
		}
	});
	*/
	/* Ajax Cart */
	$('#cart > .heading a').on('click', function() {
		$('#cart').addClass('active');
		
		$('#cart').load('index.php?route=module/cart #cart > *');
		
		$('#cart').live('mouseleave', function() {
			$(this).removeClass('active');
		});
	});
	
	/* Mega Menu */
	$('#menu ul > li > a + div').each(function(index, element) {
		// IE6 & IE7 Fixes
		if ($.browser.msie && ($.browser.version == 7 || $.browser.version == 6)) {
			var category = $(element).find('a');
			var columns = $(element).find('ul').length;
			
			$(element).css('width', (columns * 143) + 'px');
			$(element).find('ul').css('float', 'left');
		}		
		
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();
		
		i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
		
		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});

	// IE6 & IE7 Fixes
	/*if ($.browser.msie) {
		if ($.browser.version <= 6) {
			$('#column-left + #column-right + #content, #column-left + #content').css('margin-left', '195px');
			
			$('#column-right + #content').css('margin-right', '195px');
		
			$('.box-category ul li a.active + ul').css('display', 'block');	
		}
		
		if ($.browser.version <= 7) {
			$('#menu > ul > li').bind('mouseover', function() {
				$(this).addClass('active');
			});
				
			$('#menu > ul > li').bind('mouseout', function() {
				$(this).removeClass('active');
			});	
		}
	}*/
	
	$('.df-alert img').on('click', function() {
		$(this).parent().fadeOut('slow', function() {
			$(this).remove();
		});
	});	
	
	// hide #back-top first
	$("#back-to-top").hide();
	
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
	
	
});

function getURLVar(urlVarName) {
	var urlHalves = String(document.location).toLowerCase().split('?');
	var urlVarValue = '';
	
	if (urlHalves[1]) {
		var urlVars = urlHalves[1].split('&');

		for (var i = 0; i <= (urlVars.length); i++) {
			if (urlVars[i]) {
				var urlVarPair = urlVars[i].split('=');
				
				if (urlVarPair[0] && urlVarPair[0] == urlVarName.toLowerCase()) {
					urlVarValue = urlVarPair[1];
				}
			}
		}
	}
	
	return urlVarValue;
} 

function addToCart(product_id, quantity) {
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;

	$.ajax({
		url: 'index.php?route=catalog/product/add',
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information, .error').remove();
			
			if (json['redirect']) {
				location = json['redirect'];
			}
			
			if (json['success']) {
				//$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				//$('.success').fadeIn('slow');
				
				$('.df-alert').slideDown();
				
				$('#cart-total').html(json['total']);
				
				$('#cart_mini').load('index.php?route=checkout/cart_sidebar #cart_sidebar > *');
				
				$('#cart_header').load('index.php?route=checkout/cart_header #cart_header > *');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				//$('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}

function addToWishList(product_id) {
	$.ajax({
		url: 'index.php?route=account/wishlist/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				//$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				$('#wishlist-total').html(json['total']);
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
				//$('html, body').animate({ scrollTop: 0 }, 'slow');
			}	
		}
	});
}

function vendorLike(vendor_id) {
	$.ajax({
		url: 'index.php?route=catalog/vendor/vendorLike',
		type: 'post',
		data: 'vendor_id=' + vendor_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			
			if(json['warning']) {
				$('#notification').html('<div class="df-alert df-alert-warning" style="display: none;">' + json['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
			} else if (json['success']) {
				
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				count = $('#like-vendor-count-'+vendor_id).text();
				count = parseInt(count);
				if ($('#like-vendor-'+vendor_id).hasClass('df-disable')) {
        			$('#like-vendor-'+vendor_id).removeClass('df-disable');
					count = count - 1;
				} else {
					$('#like-vendor-'+vendor_id).addClass('df-disable');
					count = count + 1;
				}
			
				$('#like-vendor-count-'+vendor_id).html(count);
												
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				}	
		}
	});
}


function vendorFavorite(vendor_id) {
	$.ajax({
		url: 'index.php?route=catalog/vendor/vendorFavorite',
		type: 'post',
		data: 'vendor_id=' + vendor_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			
			if(json['warning']) {
				$('#notification').html('<div class="df-alert df-alert-warning" style="display: none;">' + json['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
			} else if (json['success']) {
				
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				count = $('#favorite-vendor-count-'+vendor_id).text();
				count = parseInt(count);
				if ($('#favorite-vendor-'+vendor_id).hasClass('df-disable')) {
        			$('#favorite-vendor-'+vendor_id).removeClass('df-disable');
					count = count - 1;
				} else {
					$('#favorite-vendor-'+vendor_id).addClass('df-disable');
					count = count + 1;
				}
			
				$('#favorite-vendor-count-'+vendor_id).html(count);
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				}	
		}
	});
}

function vendorVisit(vendor_id) {
	$.ajax({
		url: 'index.php?route=catalog/vendor/vendorVisit',
		type: 'post',
		data: 'vendor_id=' + vendor_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			
			if(json['warning']) {
				$('#notification').html('<div class="df-alert df-alert-warning" style="display: none;">' + json['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
			} else if (json['success']) {
								
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				count = $('#visit-vendor-count-'+vendor_id).text();
				count = parseInt(count);
				if ($('#visit-vendor-'+vendor_id).hasClass('df-disable')) {
        			$('#visit-vendor-'+vendor_id).removeClass('df-disable');
					count = count - 1;
				} else {
					$('#visit-vendor-'+vendor_id).addClass('df-disable');
					count = count + 1;
				}
			
				$('#visit-vendor-count-'+vendor_id).html(count);
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
			
			}	
		}
	});
}


function vendorRate(vendor_id, rating) {
	$.ajax({
		url: 'index.php?route=catalog/vendor/vendorRate',
		type: 'post',
		data: 'vendor_id=' + vendor_id+ '&rating=' + rating,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			
			if(json['warning']) {
				$('#notification').html('<div class="df-alert df-alert-warning" style="display: none;">' + json['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
			} else if (json['success']) {
								
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				count = $('#visit-rate-count-'+vendor_id).text();
				count = parseInt(count);
				if ($('#visit-rate-'+vendor_id).hasClass('df-disable')) {
        			$('#visit-rate-'+vendor_id).removeClass('df-disable');
					count = count - 1;
				} else {
					$('#visit-rate-'+vendor_id).addClass('df-disable');
					count = count + 1;
				}
			
				$('#visit-vendor-count-'+vendor_id).html(count);
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
			
			}	
		}
	});
}


function productLike(product_id) {
	$.ajax({
		url: 'index.php?route=catalog/product/productLike',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			
			if(json['warning']) {
				$('#notification').html('<div class="df-alert df-alert-warning" style="display: none;">' + json['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
			} else if (json['success']) {
				
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				count = $('#like-product-count-'+product_id).text();
				count = parseInt(count);
				if ($('#like-product-'+product_id).hasClass('df-disable')) {
        			$('#like-product-'+product_id).removeClass('df-disable');
					count = count - 1;
				} else {
					$('#like-product-'+product_id).addClass('df-disable');
					count = count + 1;
				}
			
				$('#like-product-count-'+product_id).html(count);
												
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				}	
		}
	});
}


function productFavorite(product_id) {
	$.ajax({
		url: 'index.php?route=catalog/product/productFavorite',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			
			if(json['warning']) {
				$('#notification').html('<div class="df-alert df-alert-warning" style="display: none;">' + json['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
			} else if (json['success']) {
				
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				count = $('#favorite-product-count-'+product_id).text();
				count = parseInt(count);
				if ($('#favorite-product-'+product_id).hasClass('df-disable')) {
        			$('#favorite-product-'+product_id).removeClass('df-disable');
					count = count - 1;
				} else {
					$('#favorite-product-'+product_id).addClass('df-disable');
					count = count + 1;
				}
			
				$('#favorite-product-count-'+product_id).html(count);
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				}	
		}
	});
}



function addToCompare(product_id) { 
	$.ajax({
		url: 'index.php?route=product/compare/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
						
			if (json['success']) {
				//$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
				
				$('#notification').html('<div class="success alert alert-success unit-bg" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.success').fadeIn('slow');
				
				$('#compare-total').html(json['total']);
				
				$('html, body').animate({ scrollTop: 0 }, 'slow'); 
			}	
		}
	});
}

function orderFavorite(order_id) {
	$.ajax({
		url: 'index.php?route=account/order/orderFavorite',
		type: 'post',
		data: 'order_id=' + order_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();
			
			if(json['warning']) {
				$('#notification').html('<div class="df-alert df-alert-warning" style="display: none;">' + json['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
				
			} else if (json['success']) {
				
				$('#notification').html('<div class="df-alert df-alert-success" style="display: none;">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				
				$('.df-alert').fadeIn('slow');
				
				if ($('#favorite-order-'+order_id).hasClass('df-disable')) {
        			$('#favorite-order-'+order_id).removeClass('df-disable');
				} else {
					$('#favorite-order-'+order_id).addClass('df-disable');
				}
			
				setTimeout(function() { $(".df-alert").slideUp(); }, 5000);
		  }	
		}
	});
}

