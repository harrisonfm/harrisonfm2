"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall');

module.exports = class Loader {
	constructor($parent, count){
		es6bindAll.es6BindAll(this, ['increment', 'doneLoading']);
		this.index = 0;
		this.animateDistance = 300 / count;

		this.$parent = $parent;
		this.$el = $parent.find('#loader');
		this.$bar = this.$el.find('.bar');
		this.interval = setInterval(this.doneLoading, 50);
	}
	increment(){
		this.$bar.animate({
			width: this.animateDistance * ++this.index
		}, 50, 'linear');
	}
	doneLoading(){
		if(this.$bar.width() >= 300){
			this.$el.fadeOut().remove();
			this.$parent.addClass('loaded');
			window.clearInterval(this.interval);
		}
	}
};