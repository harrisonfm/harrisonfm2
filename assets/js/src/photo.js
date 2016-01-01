"use strict";

var $ = require('jquery'),
_ = require('lodash'),
es6bindAll = require('es6bindall');

class Photo {

	constructor(){
		es6bindAll.es6BindAll(this, ['cacheSelectors', 'setThumbnailHeight', 'enlarge', 'shrink', 'newSlide', 'updateTitle']);

		this.photoIndex = 0;
		this.cacheSelectors();

		this.$thumbnails.on('click', 'figure', this.enlarge);
		this.$slides.on('click', '.up', this.shrink);
		this.$slides.on('click', '.prev', this.newSlide);
		this.$slides.on('click', '.next', this.newSlide);
		this.$navFooter.on('click', '.prev', this.newSlide);
		this.$navFooter.on('click', '.next', this.newSlide);

		$(window).on({
			load: this.setThumbnailHeight,
			resize: _.debounce(this.setThumbnailHeight, 300)
		});
	}

	cacheSelectors(){
		this.$thumbnails = $('#thumbnails');
		this.$slides = $('#slides');
		this.$imgs = this.$thumbnails.find('figure');
		this.$title = $('#title');
		this.$navFooter = $('nav footer');
	}

	setThumbnailHeight(){
		this.$thumbnails.css({
			height: '',
			maxHeight: ''
		});
		if(window.innerWidth < 768){
			this.shrink();
			return;
		}

		var multiplier = window.innerWidth >= 1025 ? 0.4 : 0.6,
		furthest = 0;

		this.$thumbnails.height(this.$thumbnails.height() * multiplier);
		$.each(this.$imgs, function(photoIndex, element){
			var distance = $(this).offset().top + $(this).height();
			if(distance > furthest){
				furthest = distance;
			}
		});
		this.$thumbnails.css({
			height: _.ceil(furthest - 5),
			maxHeight: _.ceil(furthest - 5)
		});
	}

	enlarge(e){
		var attributes = e.currentTarget.attributes;
		this.photoIndex = attributes['data-id'].value;
		this.$thumbnails.addClass('closed');
		this.$slides.html(this.getSlideHTML(attributes['data-url-large'].value, attributes['data-url-full'].value));
		this.updateTitle(e.currentTarget.id);
	}

	updateTitle(text){
		console.log(text);
		this.$title.text(text);
		if(text){
			this.$navFooter.show();
		}
		else{
			this.$navFooter.hide();	
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

	shrink(){
		this.$slides.empty();
		this.$thumbnails.removeClass('closed');
		this.updateTitle(false);
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
		this.$slides.html(this.getSlideHTML(img.getAttribute('data-url-large'), img.getAttribute('data-url-full')));
	}
}

module.exports = new Photo();