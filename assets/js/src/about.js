"use strict";

var $ = require('jquery'),
Loader = require('./loader');

module.exports = class About {
	constructor(){
		this.$figures = $('figure');
		this.loader = new Loader($('main'), this.$figures.length);
		this.$figures.find('img').filter((idx, el) => {
		    return el.complete;
		}).each(() => this.loader.increment()).end().on('load', () => this.loader.increment());
	}
};