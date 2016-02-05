"use strict";

var $ = require('jquery'),
Loader = require('./loader');

class About {
	constructor(){
		this.$figures = $('figure');
		this.loader = new Loader($('section'), this.$figures.length);
		this.$figures.find('img').filter(function() {
		    return this.complete;
		}).each(this.loader.increment).end().on('load', this.loader.increment);
	}
}
module.exports = new About();