"use strict";

const $ = require('jquery'),
Loader = require('./loader'),
jQueryBridget = require('jquery-bridget'),
imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

module.exports = class Web {
	constructor(){
		this.$jobs = $('#portfolio figure');
		this.$main = $('main');
		this.loader = new Loader(this.$main, this.$jobs.length + 1);

		this.$main.imagesLoaded({background: 'figure'}).progress(() => {
			this.loader.increment();
		});

		this.$jobs.on('click', (e) => {
			$(e.currentTarget).toggleClass('on');
		});

	}
};