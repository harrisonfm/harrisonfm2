"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall'),
_ = require('lodash'),
Loader = require('./loader');

module.exports = class Write {
	constructor(){
		es6bindAll.es6BindAll(this, ['handleBGs']);
		this.$figures = $('figure');
		this.windowWidth = window.innerWidth;
		this.loader = new Loader($('section'), this.$figures.length);
		this.$figures.each(function(idx, el){
			var img = window.innerWidth <= 400 ? el.attributes['data-url-wide'].value : el.attributes['data-url-large'].value;
			el.style.backgroundImage = "url('"+img+"')";
			$('<img/>').attr('src', img).on('load', this.loader.increment);
		}.bind(this));
		$(window).on('resize', _.debounce(this.handleBGs, 300));
	}

	handleBGs(){
		if((this.windowWidth <= 400 && window.innerWidth > 400) || (this.windowWidth > 400 && window.innerWidth <= 400)){
			this.$figures.each(function(idx, el){
				var img = window.innerWidth <= 400 ? el.attributes['data-url-wide'].value : el.attributes['data-url-large'].value;
				el.style.backgroundImage = "url('"+img+"')";
			}.bind(this));
		}
		this.windowWidth = window.innerWidth;
	}
};