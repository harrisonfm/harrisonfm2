"use strict";

var $ = require('jquery'),
About = require('./about'),
Intro = require('./intro'),
Photo = require('./photo'),
Web = require('./web'),
Write = require('./write'),
Post = require('./post'),
Nav = require('./nav');

$(function(){
	var $body = $('body');
	if($body.hasClass('home')){
		var intro = new Intro();
	}
	else if($body.hasClass('blog') || $body.hasClass('search-results') || $body.hasClass('archive')){
		var write = new Write();
	}
	else if($body.hasClass('single-post')){
		var post = new Post();
	}
	else if($body.hasClass('page-template-page-photo') || $body.hasClass('single-photo')){
		var photo = new Photo();
	}
	else if($body.hasClass('page-template-page-web')){
		var web = new Web();
	}
	else if($body.hasClass('page-template-page-about')){
		var about = new About();
	}
	var nav = new Nav();
});