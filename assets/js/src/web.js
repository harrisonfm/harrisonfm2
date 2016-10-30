"use strict";

var $ = require('jquery'),
Loader = require('./loader');

module.exports = class Web {
	constructor(){
		this.$jobs = $('figure');
		this.loader = new Loader($('main'), this.$jobs.length);
		this.$jobs.each((idx, el) => {
			$('<img/>').attr('src', el.attributes['data-url'].value).on('load', () => this.loader.increment());
		});
	}
};