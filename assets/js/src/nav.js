"use strict";
const $ = require('jquery');

module.exports = class Nav {
	constructor(){
		this.$body = $('body');
		this.$burger = $('#hamburger');
		this.$menu = $('.menu');
		this.$menuItems = this.$menu.children();

		this.$burger.on('click', () => this.standardMenu());

		$('#back-button').on('click', () => {
			if(document.referrer.indexOf('harrisonfm') !== -1){
				window.history.back();
			}
			else{
				document.location = '/write';
			}
		});
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