"use strict";

var $ = require('jquery'),
Loader = require('./loader');

class Intro {
	constructor(){
		this.$page = $('div.page');
		this.loader = new Loader(this.$page, 1);
		var bg = window.innerWidth <= 768 ? this.$page.attr('data-url-large') : this.$page.attr('data-url-full');
		$('<img/>').attr('src', bg).on('load', this.loader.increment);
	}
}
module.exports = new Intro();