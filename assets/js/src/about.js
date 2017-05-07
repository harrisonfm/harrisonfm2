"use strict";

const $ = require('jquery'),
Loader = require('./loader'),
jQueryBridget = require('jquery-bridget'),
imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

module.exports = class About {
	constructor(){
		this.$main = $('main');
		this.loader = new Loader(this.$main, $('figure').length);
		this.$main.imagesLoaded().progress(() => {
			this.loader.increment();
		});
	}
};