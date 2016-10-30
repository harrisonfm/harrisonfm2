"use strict";

var $ = require('jquery'),
_ = require('lodash'),
Loader = require('./loader');

module.exports = class Intro {
	constructor(){
		this.$page = $('div.page');
		this.loader = new Loader(this.$page, 1);
		this.handleBG();
		$('<img/>').attr('src', this.bg).on('load', () => this.loader.increment());
		$(window).on('resize', _.debounce(() => this.handleBG(), 300));
	}

	handleBG(){
		this.bg = window.innerWidth <= 900 ? this.$page.attr('data-url-large') : this.$page.attr('data-url-full');
		this.$page.css('backgroundImage', 'url('+this.bg+')');
	}
};