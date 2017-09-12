"use strict";

const $ = require('jquery'),
_ = require('lodash'),
Loader = require('./loader'),
Masonry = require('masonry-layout'),
jQueryBridget = require('jquery-bridget'),
imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

module.exports = class Photo {
	constructor(){
		jQueryBridget('masonry', Masonry, $);

		this.photoIndex = 0;
		this.cacheSelectors();
		this.postID = this.$body.attr('class').substr(this.$body.attr('class').indexOf('postid') + 7);

		this.loader = new Loader(this.$thumbnails, this.$imgs.length);
		this.$thumbnails.imagesLoaded().progress(() => {
			this.loader.increment();
		});

		$(window).on('load', () => {
			this.$thumbnails.masonry({
				itemSelector: 'figure',
				gutter: 5,
				percentPosition: true
			});
			if(window.innerWidth <= 768){
				this.$thumbnails.height(this.$thumbnails.height() - 20);
			}
		});

		this.$thumbnails.on('click', 'figure', (e) => this.enlarge(e));
		this.$page.on('click', '.up', () => this.shrink());
		this.$page.on('click', '.prev', () => this.prevSlide());
		this.$page.on('click', '.next', (e) => this.nextSlide(e));
		this.$slideCtrl.on('click', () => this.toggleSlides());

		this.$galBtn.on('click', () => {
			this.$galList.toggleClass('on');
		});

		this.pag = {
			enabled: true
		};

		if(this.$imgs.length > 16){
			this.pag.enabled = false;
		}

		$(window).on('resize', _.debounce(() => this.handleResize(), 300));

		$(document).on('keyup', _.debounce((e) => this.handleKeypress(e), 50));

		$(window).on('scroll', _.debounce(() => {
			if($(window).scrollTop() + $(window).innerHeight() + 5 >= this.$thumbnails[0].scrollHeight - 125){
				this.getPhotos();
			}
		}, 300));

		this.$page.on('done-loading', () => this.preloadSlides());
	}

	cacheSelectors(){
		this.$body = $('body');
		this.$page = $('.page');
		this.$main = $('main');
		this.$thumbnails = $('#thumbnails');
		this.$end = this.$thumbnails.find('#end');
		this.$slides = $('#slides');
		this.$imgs = this.$thumbnails.find('figure');
		this.$title = $('#title');
		this.$nav = $('nav');
		this.$navFooter = $('nav footer');
		this.$galBtn = $('#galleries');
		this.$galList = $('nav ul');
		this.$slideCtrl = $('#slide-control');
	}

	handleResize(){
		if(window.innerWidth <= 768){
			this.shrink();
			setTimeout(() => {
				this.$thumbnails.height(this.$thumbnails.height() - 20);
			}, 500);
		}
		else{
			this.$main.css('paddingTop', 0);	
		}
	}

	enlarge(e){
		if(window.innerWidth <= 768){
			return;
		}
		this.photoIndex = $(e.currentTarget).data('index');
		this.$thumbnails.addClass('closed');
		this.loadSlide($(e.currentTarget).data('url-large'), $(e.currentTarget).data('url-full'));
		this.updateTitle($(e.currentTarget).find('figcaption').text());
		
		if(!this.$slideCtrl.hasClass('off')){
			this.sliding = setInterval(() => this.nextSlide(), 5000);
		}
	}

	loadSlide(large, full){
		this.$slides.html(this.getSlideHTML(large, full)).addClass('loading');
		this.$slides.find('img').on('load', (e) => {
			$(e.currentTarget).parents('figure').addClass('loaded');
			this.$slides.removeClass('loading');
		});
	}

	shrink(){
		this.$slides.empty();
		this.$thumbnails.removeClass('closed');
		this.updateTitle(false);
		window.scrollTo(0, this.$imgs.eq(this.photoIndex).offset().top);

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
		if(this.photoIndex >= this.$imgs.length - 1 && this.pag.enabled){
			this.getPhotos();
		}
		this.newSlide();
	}

	newSlide(){
		let $img = this.$imgs.eq(this.photoIndex);
		this.updateTitle($img.find('figcaption').text());
		this.loadSlide($img.data('url-large'), $img.data('url-full'));
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

	getPhotos(){
		if(!this.pag.enabled){
			return;
		}
		this.pag.enabled = false;
		$.post('/wp-admin/admin-ajax.php', {
			action: 'get_photos',
			lastPhoto: this.$imgs.last().data('id'),
			photoIndex: this.$imgs.last().data('index'),
			postID: this.postID
		}, (response) => {
			if(response.success){
				this.$end.before(response.photos);
				$(response.photos).imagesLoaded().progress((imgLoad, image) => {
					let $figure = this.$thumbnails.find("figure[data-index='" + $(image.img).parents('.added').data('index') + "']");
					$figure.addClass('loaded');
					this.$thumbnails.masonry('appended', $figure);
				}).always(() => {
					this.$imgs = this.$thumbnails.find('figure');
					this.pag.enabled = true;
					this.preloadSlides();
				});
			}
			else{
				if(window.innerWidth <= 768){
					this.$thumbnails.height(this.$thumbnails.height() - 45);
				}
			}
		}, 'json').fail((response) => {
			console.log(response);
		});
	}
};