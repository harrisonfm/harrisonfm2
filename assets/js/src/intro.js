"use strict";

var $ = require('jquery'),
Loader = require('./loader');

module.exports = class Intro {
	constructor(){
		this.$page = $('div.page');
		this.loader = new Loader(this.$page, 1);
		var bg = window.innerWidth <= 768 ? this.$page.attr('data-url-large') : this.$page.attr('data-url-full');
		this.$page.css('backgroundImage', 'url('+bg+')');
		$('<img/>').attr('src', bg).on('load', this.loader.increment);
	}
};