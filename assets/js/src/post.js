"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall'),
_ = require('lodash'),
Loader = require('./loader');

module.exports = class Post {
	constructor(){
		es6bindAll.es6BindAll(this, ['showNav']);
		this.$banner = $('#banner');
		var img = window.innerWidth <= 400 ? this.$banner.attr('data-url-wide') : this.$banner.attr('data-url-large');
		this.$banner.css('backgroundImage', "url('"+img+"')");
		this.loader = new Loader($('section'), 1);
		this.$nav = $('nav');
		$('<img/>').attr('src', img).on('load', this.loader.increment);
		/*this.$figures.each(function(idx, el){
			var img = window.innerWidth <= 400 ? el.attributes['data-url-wide'].value : el.attributes['data-url-large'].value;
			el.style.backgroundImage = "url('"+img+"')";
			$('<img/>').attr('src', img).on('load', this.loader.increment);
		}.bind(this));/*
		$(window).on('resize', _.debounce(this.handleBGs, 300));*/
		$(window).on('scroll', _.debounce(this.showNav, 300));
		this.lastScroll = 0;
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