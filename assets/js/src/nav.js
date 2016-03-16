"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall');

module.exports = class Nav {
	constructor(){
		es6bindAll.es6BindAll(this, ['standardMenu']);

		this.$body = $('body');
		this.$burger = $('#hamburger');
		this.$menu = $('.menu');
		this.$children = this.$menu.children();

		this.$burger.on('click', this.standardMenu);

		$('#back-button').on('click', function(){
			if(document.referrer.indexOf('harrisonfm') !== -1){
				window.history.back();
			}
			else{
				document.location = '/write';
			}
		});
	}

	standardMenu(){
		this.$menu.toggleClass('on');

		if(this.$menu.hasClass('on')){
			this.$children.each(function(index){
				var delay = 300 * index + 1;
				setTimeout(function(child){
					if(child.parent().hasClass('on')){
						child.addClass('on');
					}
				}, delay, $(this));
			});
		}
		else{
			this.$children.removeClass('on');
		}
	}
};