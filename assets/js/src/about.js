"use strict";

const $ = require('jquery'),
Loader = require('./loader'),
_ = require('lodash');

module.exports = class About {
	constructor(){
		this.$nav = $('nav');
		this.$figures = $('figure');

		this.loader = new Loader($('main'), this.$figures.length);
		this.$figures.find('img').filter((idx, el) => {
		    return el.complete;
		}).each(() => this.loader.increment()).end().on('load', () => this.loader.increment());

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