"use strict";
const $ = require('jquery'),
_ = require('lodash');

module.exports = class Nav {
	constructor(){
		this.$nav = $('nav');
		this.$menu = $('main').find('.menu');
		this.$body = $('body');

		if(!this.$menu.length){
			this.$menu = $('.menu');
		}
		this.$burger = this.$menu.find('#hamburger');
		this.$menuItems = this.$menu.children();

		this.$burger.on('click', () => {
			this.standardMenu();
		});

		$('#back-button').on('click', () => {
			if(document.referrer.indexOf('harrisonfm') !== -1){
				window.history.back();
			}
			else{
				document.location = '/';
			}
		});

		if(!this.$body.hasClass('page-template-page-photo') && !this.$body.hasClass('single-photo')) {
			$(window).on('scroll', _.debounce(() => this.showNav(), 300));
		}
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

	standardMenu(){
		this.$menu.toggleClass('on');

		if(this.$menu.hasClass('on')){
			this.$menuItems.each((index, el) => {
				let delay = 300 * index + 1;
				setTimeout((child) => {
					if($(child).parent().hasClass('on')){
						$(child).addClass('on');
					}
				}, delay, el);
			});
		}
		else{
			this.$menuItems.removeClass('on');
		}
	}
};