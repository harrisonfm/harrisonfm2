'use strict';
var $ = require('jquery'),
_ = require('lodash'),
$thumbnails = $('#thumbnails'),
$slides = $('#slides'),
$imgs = $thumbnails.find('figure'),
index = 0,

setThumbnailHeight = function(){
	$thumbnails.css({
		height: '',
		maxHeight: ''
	});
	if(window.innerWidth < 768){
		shrink();
		return;
	}

	var multiplier = window.innerWidth >= 1025 ? 0.4 : 0.6,
	furthest = 0;

	$thumbnails.height($thumbnails.height() * multiplier);
	$.each($imgs, function(index, element){
		var distance = $(this).offset().top + $(this).height();
		if(distance > furthest){
			furthest = distance;
		}
	});
	$thumbnails.css({
		height: _.ceil(furthest - 5),
		maxHeight: _.ceil(furthest - 5)
	});
},

enlarge = function(){
	index = $(this).attr('data-id');
	$thumbnails.addClass('closed');
	$slides.html(getSlideHTML($(this).attr('data-url-large'), $(this).attr('data-url-full')));
},

getSlideHTML = function(large, full){
	return '<figure>'+
		'<picture>'+
			'<source media="(max-width: 1024px)" srcset="'+large+'" />'+
			'<img src="'+full+'" />'+
			'<div class="overlay">'+
				'<div class="left"><i class="icon-left"></i></div>'+
				'<div class="up"><i class="icon-up"></i></div>'+
				'<div class="right"><i class="icon-right"></i></div>'+
			'</div>'+
		'</picture>'+
	'</figure>';
},

shrink = function(){
	$slides.empty();
	$thumbnails.removeClass('closed');
},

newSlide = function(){
	if($(this).hasClass('left')){
		if(--index < 0){
			index = $imgs.length - 1;
		}
	}	
	else if($(this).hasClass('right')){
		if(++index >= $imgs.length){
			index = 0;
		}
	}
	$slides.html(getSlideHTML($imgs[index].getAttribute('data-url-large'), $imgs[index].getAttribute('data-url-full')));
};

$thumbnails.on('click', 'figure', enlarge);
$slides.on('click', '.up', shrink);
$slides.on('click', '.left', newSlide);
$slides.on('click', '.right', newSlide);


$(window).on({
	load: setThumbnailHeight,
	resize: _.debounce(setThumbnailHeight, 300)
});