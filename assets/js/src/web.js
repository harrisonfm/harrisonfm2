"use strict";

const $ = require('jquery'),
Loader = require('./loader'),
_ = require('lodash');

module.exports = class Web {
	constructor(){
		this.$nav = $('nav');
		this.$jobs = $('#portfolio figure');
		this.loader = new Loader($('main'), this.$jobs.length );
		this.$jobs.each((idx, el) => {
			$('<img/>').attr('src', el.attributes['data-url'].value).on('load', () => this.loader.increment());
		});

		this.$jobs.on('click', (e) => {
			$(e.currentTarget).toggleClass('on');
		});

		$(window).on('scroll', _.debounce(() => this.showNav(), 300));
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