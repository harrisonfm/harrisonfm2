"use strict";

const $ = require('jquery'),
About = require('./about'),
Intro = require('./intro'),
Photo = require('./photo'),
Web = require('./web'),
Post = require('./post'),
Nav = require('./nav');

$(() => {
	$('<img/>').attr('src', "/wp-content/themes/harrisonfm/images/loader.gif").on('load', () => { $(this).remove(); });

	const $body = $('body');
	if($body.hasClass('home')|| $body.hasClass('search-results') || $body.hasClass('archive')){
		const intro = new Intro();
	}
	else if($body.hasClass('single-post')){
		const post = new Post();
	}
	else if($body.hasClass('page-template-page-photo') || $body.hasClass('single-photo')){
		const photo = new Photo();
	}
	else if($body.hasClass('page-template-page-web')){
		const web = new Web();
	}
	else if($body.hasClass('page-template-page-about')){
		const about = new About();
	}
	const nav = new Nav();
});