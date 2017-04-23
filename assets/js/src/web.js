"use strict";

const $ = require('jquery'),
Loader = require('./loader');

module.exports = class Web {
	constructor(){
		this.$jobs = $('#portfolio figure');
		this.loader = new Loader($('main'), this.$jobs.length + 1);

		$('#banner').filter((idx, el) => {
			    return el.complete;
			}).each(() => this.loader.increment()).end().on('load', () => this.loader.increment());
		
		this.$jobs.each((idx, el) => {
			$('<img/>').attr('src', el.attributes['data-url'].value).on('load', () => this.loader.increment());
		});

		this.$jobs.on('click', (e) => {
			$(e.currentTarget).toggleClass('on');
		});

	}
};