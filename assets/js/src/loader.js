"use strict";

const $ = require('jquery');

module.exports = class Loader {
	constructor($parent, count){
		this.index = 0;
		this.animateDistance = 300 / count;

		this.$parent = $parent;
		this.$el = $parent.find('#loader');
		this.$bar = this.$el.find('.bar');
		this.interval = setInterval(() => this.doneLoading(), 25);
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
			this.$parent.trigger('done-loading');
		}
	}
};