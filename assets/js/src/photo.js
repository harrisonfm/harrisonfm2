"use strict";

var $ = require('jquery'),
_ = require('lodash'),
es6bindAll = require('es6bindall'),
jQBridget = require('jquery-bridget'),
Masonry = require('masonry-layout'),
imagesLoaded = require('imagesloaded');

$.bridget( 'masonry', Masonry );
imagesLoaded.makeJQueryPlugin( $ );

class Photo {

	constructor(){
		es6bindAll.es6BindAll(this, ['cacheSelectors', 'revealImage', 'setThumbnails', 'enlarge', 
			'shrink', 'newSlide', 'updateTitle']);

		this.photoIndex = 0;
		this.cacheSelectors();

		this.$thumbnails.imagesLoaded().progress(this.revealImage);

		this.$thumbnails.on('click', 'figure', this.enlarge);
		this.$slides.on('click', '.up', this.shrink);
		this.$slides.on('click', '.prev', this.newSlide);
		this.$slides.on('click', '.next', this.newSlide);
		this.$navFooter.on('click', '.up', this.shrink);
		this.$navFooter.on('click', '.prev', this.newSlide);
		this.$navFooter.on('click', '.next', this.newSlide);

		this.$thumbnails.imagesLoaded().done(this.setThumbnails);

		$(window).on({
			load: this.setThumbnails,
			resize: _.debounce(this.setThumbnails, 300)
		});
	}

	cacheSelectors(){
		this.$thumbnails = $('#thumbnails');
		this.$slides = $('#slides');
		this.$imgs = this.$thumbnails.find('figure');
		this.$title = $('#title');
		this.$navFooter = $('nav footer');
	}

	revealImage(inst, img){
		inst.elements[0].className = 'loaded';
		img.img.offsetParent.className = '';
	}

	setThumbnails(){
		if(window.innerWidth < 768){
			this.shrink();
			return;
		}
		else{
			this.$thumbnails.masonry();
		}
	}

	enlarge(e){
		var attributes = e.currentTarget.attributes;
		this.photoIndex = attributes['data-id'].value;
		this.$thumbnails.addClass('closed');
		this.$slides.html(this.getSlideHTML(attributes['data-url-large'].value, attributes['data-url-full'].value));
		this.$slides.imagesLoaded().progress(this.revealImage);
		this.updateTitle(e.currentTarget.id);
	}

	shrink(){
		this.$slides.removeClass('loaded').empty();
		this.$thumbnails.removeClass('closed');
		this.updateTitle(false);
	}

	updateTitle(text){
		this.$title.text(text);
		if(text){
			this.$navFooter.show();
		}
		else{
			this.$navFooter.hide();	
		}
	}

	getSlideHTML(large, full){
		return `<figure class="loading">
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
		this.$slides.removeClass('loaded').html(this.getSlideHTML(img.getAttribute('data-url-large'), img.getAttribute('data-url-full')));
		this.$slides.imagesLoaded().progress(this.revealImage);
	}
}

module.exports = new Photo();