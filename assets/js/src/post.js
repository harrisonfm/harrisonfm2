"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall'),
_ = require('lodash'),
Loader = require('./loader');


//slide functionality : load images
module.exports = class Post {
	constructor(){
		es6bindAll.es6BindAll(this, ['handleThumbs', 'cacheSelectors', 'showNav', 'resizeBanner', 'resizeIframe', 'updateSlideText', 'enlarge', 'shrink', 'newSlide']);

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
			this.$body.on('click', '.prev', this.newSlide);
			this.$body.on('click', '.next', this.newSlide);
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

	newSlide(e){
		if(e.currentTarget.className === 'prev'){
			if(--this.photoIndex < 0){
				this.photoIndex = this.$imgs.length - 1;
			}
		}	
		else if(e.currentTarget.className === 'next'){
			if(++this.photoIndex >= this.$imgs.length){
				this.photoIndex = 0;
			}
		}
		var img = this.$imgs[this.photoIndex];
		this.updateSlideText(img.id, $(img).find('p').text());
		this.loadSlide(img.getAttribute('data-url-large'), img.getAttribute('data-url-full'));
	}
};