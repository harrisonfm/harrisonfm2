"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall'),
TweenMax = require('gsap');

module.exports = class Loader {
	constructor($parent, count){
		es6bindAll.es6BindAll(this, ['increment', 'doneLoading']);
		this.index = 0;
		this.animateDistance = 300 / count;

		this.$parent = $parent;
		this.$el = $parent.find('#loader');
		this.$bar = this.$el.find('.bar');
		setInterval(this.doneLoading, 100);
	}
	increment(){
		TweenMax.to(this.$bar, 0.4, {
        width: this.animateDistance * ++this.index
    });
	}
	doneLoading(){
		if(this.$bar.width() >= 300){
			this.$el.fadeOut().remove();
			this.$parent.addClass('loaded');
			window.clearInterval();
		}
	}
};