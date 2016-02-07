"use strict";

var $ = require('jquery'),
Loader = require('./loader');

module.exports = class Web {
	constructor(){
		this.$jobs = $('figure');
		this.loader = new Loader($('section'), this.$jobs.length);
		this.$jobs.each(function(idx, el){
			$('<img/>').attr('src', el.attributes['data-url'].value).on('load', this.loader.increment);
		}.bind(this));
	}
};