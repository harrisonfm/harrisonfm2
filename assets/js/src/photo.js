"use strict";

var $ = require('jquery'),
_ = require('lodash'),
Loader = require('./loader');

module.exports = class Photo {

	constructor(){
		this.photoIndex = 0;
		this.cacheSelectors();

		this.loader = new Loader(this.$thumbnails, this.$imgs.length);
		$('#thumbnails img').filter((idx, el) => {
		    return el.complete;
		}).each(() => this.loader.increment()).end().on('load', () => this.loader.increment());

		this.$thumbnails.on('click', 'figure', (e) => this.enlarge(e));
		this.$page.on('click', '.up', () => this.shrink());
		this.$page.on('click', '.prev', () => this.prevSlide());
		this.$page.on('click', '.next', (e) => this.nextSlide(e));
		this.$slideCtrl.on('click', () => this.toggleSlides());

		this.$galBtn.on('click', () => {
			this.$galList.toggleClass('on');
		});

		$(window).on('resize', _.debounce(() => this.handleThumbs(), 300));

		$(document).on('keyup', _.debounce((e) => this.handleKeypress(e), 50));

		this.$page.on('done-loading', () => this.preloadSlides());
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
			this.sliding = setInterval(() => this.nextSlide(), 5000);
		}
	}

	loadSlide(large, full){
		this.$slides.html(this.getSlideHTML(large, full)).addClass('loading');
		this.$slides.find('img').on('load', (e) => {
			e.currentTarget.offsetParent.className = 'loaded';
			this.$slides.removeClass('loading');
		});
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
		this.updateTitle(img.id);
		this.loadSlide(img.getAttribute('data-url-large'), img.getAttribute('data-url-full'));
	}

	pauseSlides(){
		this.$slideCtrl.addClass('off').text('Off');
		clearInterval(this.sliding);
	}

	toggleSlides(){
		if(this.$slideCtrl.hasClass('off')){
			this.$slideCtrl.removeClass('off').text('On');
			this.sliding = setInterval(() => this.nextSlide(), 5000);
		}
		else{
			this.pauseSlides();
		}
	}

	handleKeypress(e){
		if(this.$thumbnails.hasClass('closed')){
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
			this.$imgs.each((idx, el) => {
				$('<img/>').attr('src', $(el).attr('data-url-full'));
			});
		}
	}
};