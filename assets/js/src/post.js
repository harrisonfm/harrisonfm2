"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall'),
_ = require('lodash'),
Loader = require('./loader');

module.exports = class Post {
	constructor(){
		es6bindAll.es6BindAll(this, ['handleThumbs', 'cacheSelectors', 'showNav', 'resizeBanner', 'resizeIframe', 'updateSlideText', 'enlarge', 'shrink', 'prevSlide', 'nextSlide', 'pauseSlides', 'toggleSlides', 'newSlide', 'handleKeypress', 'preloadSlides']);

		this.cacheSelectors();
		this.photoIndex = 0;

		var img = window.innerWidth <= 400 ? this.$banner.attr('data-url-wide') : this.$banner.attr('data-url-large');
		this.$banner.css('backgroundImage', "url('"+img+"')");

		this.loader = new Loader($('section'), this.$imgs.length + 1);
		$('<img/>').attr('src', img).on('load', this.loader.increment);
		if(this.$imgs.length){
			$('.gallery img').filter(function() {
			    return this.complete;
			}).each(this.loader.increment).end().on('load', this.loader.increment);

			this.$main.on('click', 'figure', this.enlarge);
			this.$body.on('click', '.up', this.shrink);
			this.$body.on('click', '.prev', this.prevSlide);
			this.$body.on('click', '.next', this.nextSlide);
			this.$slideCtrl.on('click', this.toggleSlides);

			$(window).on('resize', _.debounce(this.handleThumbs, 300));
		}

		this.lastScroll = 0;
		this.lastWindowWidth = window.innerWidth;

		$(window).on('resize', _.debounce(this.resizeBanner, 300));
		if(this.$iframe.length){
			this.resizeIframe();
			$(window).on('resize', _.debounce(this.resizeIframe, 300));
		}
		$(window).on('scroll', _.debounce(this.showNav, 300));

		$('.top').on('click', function(){
			$('html, body').animate({scrollTop: 0}, "slow");
		});

		$(document).on('keyup', _.debounce(this.handleKeypress, 50));

		this.$body.on('done-loading', this.preloadSlides);
	}

	cacheSelectors(){
		this.$banner = $('#banner');
		this.$nav = $('nav');
		this.$body = $('body');
		this.$main = $('main');
		this.$slides = $('#slides');
		this.$iframe = this.$main.find('iframe');
		this.$imgs = this.$main.find('.gallery figure');
		this.$title = this.$slides.find('#title');
		this.$caption = this.$slides.find('#caption');
		this.$slideCtrl = $('#slide-control');
	}

	resizeIframe(){
		this.$iframe.width(window.innerWidth - 20).height(this.$iframe.width() * 0.67);
	}

	resizeBanner(){
		if((this.lastWindowWidth <= 400 && window.innerWidth > 400) || (this.lastWindowWidth > 400 && window.innerWidth <= 400)){
			var img = window.innerWidth <= 400 ? this.$banner.attr('data-url-wide') : this.$banner.attr('data-url-large');
			this.$banner.css('backgroundImage', "url('"+img+"')");
		}

		this.lastWindowWidth = window.innerWidth;
	}

	showNav(e){
		var scroll = $(window).scrollTop();
		if(scroll >= 75){
			if(scroll >= this.lastScroll){
				this.$nav.addClass('hide');
			}
			else{
				this.$nav.addClass('fixed').removeClass('hide');
			}
		}
		else{
			this.$nav.removeClass('fixed hide');
		}
		this.lastScroll = scroll;
	}

	handleThumbs(){
		if(window.innerWidth <= 768){
			this.shrink();
		}
	}

	updateSlideText(title, caption){
		this.$title.text(title);
		this.$caption.text(caption);
	}

	enlarge(e){
		if(window.innerWidth <= 768){
			return;
		}
		this.$body.addClass('slide');
		this.$slides.addClass('on');
		var target = $(e.currentTarget);
		this.photoIndex = target.attr('data-id');
		this.$main.addClass('closed');
		this.loadSlide(target.attr('data-url-large'), target.attr('data-url-full'));
		this.updateSlideText(target.attr('id'), target.find('p').text());
		
		if(!this.$slideCtrl.hasClass('off')){
			this.sliding = setInterval(this.nextSlide, 5000);
		}
	}

	loadSlide(large, full){
		this.$slides.find('figure').remove();
		this.$slides.prepend(this.getSlideHTML(large, full)).addClass('loading');
		this.$slides.find('img').on('load', function(e){
			e.currentTarget.offsetParent.className = 'loaded';
			this.$slides.removeClass('loading');
		}.bind(this));
	}

	shrink(){
		this.$slides.removeClass('on').find('figure').remove();
		this.$body.removeClass('slide');

		clearInterval(this.sliding);
	}

	getSlideHTML(large, full){
		return `<figure>
			<picture>
				<source media="(max-width: 1024px)" srcset="${large}" />
				<img src="${full}" />
				<div class="overlay">
					<div class="prev"><i class="icon-left"></i></div>
					<div class="up"><i class="icon-up"></i></div>
					<div class="next"><i class="icon-right"></i></div>
				</div>
			</picture>
		</figure>`;
	}

	prevSlide(){
		if(--this.photoIndex < 0){
			this.photoIndex = this.$imgs.length - 1;
		}
		this.pauseSlides();
		this.newSlide();
	}

	nextSlide(e){
		if(e){ //slideshow passes in undefined and fails this
			this.pauseSlides();
		}
		if(++this.photoIndex >= this.$imgs.length){
			this.photoIndex = 0;
		}
		this.newSlide();
	}

	newSlide(){
		var img = this.$imgs[this.photoIndex];
		this.updateSlideText(img.id, $(img).find('p').text());
		this.loadSlide(img.getAttribute('data-url-large'), img.getAttribute('data-url-full'));
	}

	pauseSlides(){
		this.$slideCtrl.addClass('off').text('Off');
		clearInterval(this.sliding);
	}

	toggleSlides(){
		if(this.$slideCtrl.hasClass('off')){
			this.$slideCtrl.removeClass('off').text('On');
			this.sliding = setInterval(this.nextSlide, 5000);
		}
		else{
			this.pauseSlides();
		}
	}

	handleKeypress(e){
		if(this.$body.hasClass('slide')){
			switch(e.keyCode){
				case 27: //esc
				case 38: //up
					this.shrink();
					break;
				case 32: //space
					this.toggleSlides();
					break;
				case 37: //left
					this.prevSlide();
					break;
				case 39: //right
					this.nextSlide(true);
					break;
			}
		}
	}

	preloadSlides(){
		if(window.innerWidth > 1024){
			this.$imgs.each(function(idx, el){
				$('<img/>').attr('src', $(this).attr('data-url-full'));
			});
		}
	}
};