"use strict";

var $ = require('jquery'),
_ = require('lodash'),
es6bindAll = require('es6bindall'),
Loader = require('./loader');

module.exports = class Photo {

	constructor(){
		es6bindAll.es6BindAll(this, ['cacheSelectors', 'handleThumbs', 'enlarge', 'shrink', 'newSlide', 'updateTitle', 'handleKeypress', 'preloadSlides']);

		this.photoIndex = 0;
		this.cacheSelectors();

		this.loader = new Loader(this.$thumbnails, this.$imgs.length);
		$('#thumbnails img').filter(function() {
		    return this.complete;
		}).each(this.loader.increment).end().on('load', this.loader.increment);

		this.$thumbnails.on('click', 'figure', this.enlarge);
		this.$page.on('click', '.up', this.shrink);
		this.$page.on('click', '.prev', this.newSlide);
		this.$page.on('click', '.next', this.newSlide);

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
		this.updateTitle(img.id);
		this.loadSlide(img.getAttribute('data-url-large'), img.getAttribute('data-url-full'));
	}

	handleKeypress(e){
		var validKey = false;
		if(this.$thumbnails.hasClass('closed')){
			if(e.keyCode === 27 || e.keyCode === 38){ //esc, up
				this.shrink();
				validKey = true;
			}
			else if(e.keyCode === 37){ //left
				if(--this.photoIndex < 0){
					this.photoIndex = this.$imgs.length - 1;
				}
				validKey = true;
			}
			else if(e.keyCode === 39){ //right
				if(++this.photoIndex >= this.$imgs.length){
					this.photoIndex = 0;
				}
				validKey = true;
			}

			if(validKey){
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