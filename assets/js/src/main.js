"use strict";

var $ = require('jquery');

$(function(){
	var $body = $('body');
	if($body.hasClass('home')){
		var Intro = require('./intro');
	}
	else if($body.hasClass('.page-template-page-photo') || $body.hasClass('.single-photo')){
		var Photo = require('./photo');
	}
	else if($body.hasClass('.page-template-page-web')){
		var Web = require('./web');
	}
	else if($body.hasClass('.page-template-page-about')){
		var About = require('./about');
	}
});