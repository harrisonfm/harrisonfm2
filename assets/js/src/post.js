"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall'),
_ = require('lodash'),
Loader = require('./loader');

module.exports = class Post {
	constructor(){
		es6bindAll.es6BindAll(this, ['showNav', 'handleBG', 'resizeIframe']);

		this.$banner = $('#banner');
		this.$nav = $('nav');
		this.$iframe = $('main').find('iframe');

		var img = window.innerWidth <= 400 ? this.$banner.attr('data-url-wide') : this.$banner.attr('data-url-large');
		this.$banner.css('backgroundImage', "url('"+img+"')");
		this.loader = new Loader($('section'), 1);
		$('<img/>').attr('src', img).on('load', this.loader.increment);

		this.lastScroll = 0;
		this.lastWindowWidth = window.innerWidth;

		$(window).on('resize', _.debounce(this.handleBG, 300));
		if(this.$iframe.length){
			this.resizeIframe();
			$(window).on('resize', _.debounce(this.resizeIframe, 300));
		}
		$(window).on('scroll', _.debounce(this.showNav, 300));
	}

	resizeIframe(){
		this.$iframe.width(window.innerWidth - 20).height(this.$iframe.width() * 0.67);
	}

	handleBG(){
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
};