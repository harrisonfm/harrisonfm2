"use strict";

var $ = require('jquery'),
Intro = require('./intro'),
Photo = require('./photo'),
Web = require('./web'),
About = require('./about');

$(function(){
	var $body = $('body');
	if($body.hasClass('home')){
		var intro = new Intro();
	}
	else if($body.hasClass('.page-template-page-photo') || $body.hasClass('.single-photo')){
		var photo = new Photo();
	}
	else if($body.hasClass('.page-template-page-web')){
		var web = new Web();
	}
	else if($body.hasClass('.page-template-page-about')){
		var about = new About();
	}
});