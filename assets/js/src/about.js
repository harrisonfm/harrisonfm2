"use strict";

const $ = require('jquery'),
Loader = require('./loader'),
_ = require('lodash');

module.exports = class About {
	constructor(){
		this.$figures = $('figure');
		this.$banner = $('.banner');
		this.$nav = $('nav');

		this.loader = new Loader($('main'), this.$figures.length + 1);
		this.$figures.find('img').filter((idx, el) => {
		    return el.complete;
		}).each(() => this.loader.increment()).end().on('load', () => this.loader.increment());

		const img = window.innerWidth <= 400 ? this.$banner.attr('data-url-wide') : this.$banner.attr('data-url-large');
		this.$banner.css('backgroundImage', "url('"+img+"')");
		$('<img/>').attr('src', img).on('load', () => this.loader.increment());

		$(window).on('resize', _.debounce(() => this.resizeBanner(), 300));
		$(window).on('scroll', _.debounce(() => this.showNav(), 300));
	}

	resizeBanner(){
		if((this.lastWindowWidth <= 400 && window.innerWidth > 400) || (this.lastWindowWidth > 400 && window.innerWidth <= 400)){
			const img = window.innerWidth <= 400 ? this.$banner.attr('data-url-wide') : this.$banner.attr('data-url-large');
			this.$banner.css('backgroundImage', "url('"+img+"')");
		}

		this.lastWindowWidth = window.innerWidth;
	}

	showNav(){
		const scroll = $(window).scrollTop();
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
};