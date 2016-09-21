"use strict";

var $ = require('jquery'),
_ = require('lodash'),
es6bindAll = require('es6bindall'),
Loader = require('./loader');

module.exports = class Photo {

	constructor(){
		es6bindAll.es6BindAll(this, ['cacheSelectors', 'handleThumbs', 'enlarge', 'shrink', 'prevSlide', 'nextSlide', 'toggleSlides', 'newSlide', 'updateTitle', 'handleKeypress', 'preloadSlides']);

		this.photoIndex = 0;
		this.cacheSelectors();

		this.loader = new Loader(this.$thumbnails, this.$imgs.length);
		$('#thumbnails img').filter(function() {
		    return this.complete;
		}).each(this.loader.increment).end().on('load', this.loader.increment);

		this.$thumbnails.on('click', 'figure', this.enlarge);
		this.$page.on('click', '.up', this.shrink);
		this.$page.on('click', '.prev', this.prevSlide);
		this.$page.on('click', '.next', this.nextSlide);
		this.$slideCtrl.on('click', this.toggleSlides);

		this.$galBtn.on('click', function(){
			this.$galList.toggleClass('on');
		}.bind(this));

		$(window).on('resize', _.debounce(this.handleThumbs, 300));

		$(document).on('keyup', _.debounce(this.handleKeypress, 50));

		this.$page.on('done-loading', this.preloadSlides);
	}

	cacheSelectors(){
		this.$page = $('.page');
		this.$thumbnails = $('#thumbnails');
		this.$slides = $('#slides');
		this.$imgs = this.$thumbnails.find('figure');
		this.$title = $('#title');
		this.$navFooter = $('nav footer');
		this.$galBtn = $('#galleries');
		this.$galList = $('nav ul');
		this.$slideCtrl = $('#slide-control');
	}

	handleThumbs(){
		if(window.innerWidth <= 768){
			this.shrink();
		}
	}

	enlarge(e){
		if(window.innerWidth <= 768){
			return;
		}
		var attributes = e.currentTarget.attributes;
		this.photoIndex = attributes['data-id'].value;
		this.$thumbnails.addClass('closed');
		this.loadSlide(attributes['data-url-large'].value, attributes['data-url-full'].value);
		this.updateTitle(e.currentTarget.id);
		
		if(!this.$slideCtrl.hasClass('off')){
			this.sliding = setInterval(this.nextSlide, 5000);
		}
	}

	loadSlide(large, full){
		this.$slides.html(this.getSlideHTML(large, full)).addClass('loading');
		this.$slides.find('img').on('load', function(e){
			e.currentTarget.offsetParent.className = 'loaded';
			this.$slides.removeClass('loading');
		}.bind(this));
	}

	shrink(){
		this.$slides.empty();
		this.$thumbnails.removeClass('closed');
		this.updateTitle(false);

		clearInterval(this.sliding);
	}

	updateTitle(text){
		if(text){
			this.$title.text(text);
			this.$navFooter.addClass('on');
		}
		else{
			this.$navFooter.removeClass('on');
		}
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
		clearInterval(this.sliding);
		this.newSlide();
	}

	nextSlide(e){
		if(e){
			clearInterval(this.sliding);
		}
		if(++this.photoIndex >= this.$imgs.length){
			this.photoIndex = 0;
		}
		this.newSlide();
	}

	newSlide(){
		var img = this.$imgs[this.photoIndex];
		this.updateTitle(img.id);
		this.loadSlide(img.getAttribute('data-url-large'), img.getAttribute('data-url-full'));
	}

	toggleSlides(){
		if(this.$slideCtrl.hasClass('off')){
			this.$slideCtrl.removeClass('off').text('On');
			this.sliding = setInterval(this.nextSlide, 5000);
		}
		else{
			this.$slideCtrl.addClass('off').text('Off');
			clearInterval(this.sliding);
		}
	}

	handleKeypress(e){
		if(this.$thumbnails.hasClass('closed')){
			if(e.keyCode === 27 || e.keyCode === 38){ //esc, up
				this.shrink();
			}
			else if(e.keyCode === 32){ //space
				this.toggleSlides();
			}
			else if(e.keyCode === 37 || e.keyCode === 39){ //left or right
				if(e.keyCode === 37){
					if(--this.photoIndex < 0){
						this.photoIndex = this.$imgs.length - 1;
					}
				}
				else{
					if(++this.photoIndex >= this.$imgs.length){
						this.photoIndex = 0;
					}
				}

				var img = this.$imgs[this.photoIndex];
				this.updateTitle(img.id);
				this.loadSlide(img.getAttribute('data-url-large'), img.getAttribute('data-url-full'));
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