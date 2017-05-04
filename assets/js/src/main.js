"use strict";

const $ = require('jquery'),
About = require('./about'),
Write = require('./write'),
Photo = require('./photo'),
Web = require('./web'),
Post = require('./post'),
Nav = require('./nav');

$(() => {
	$('<img/>').attr('src', "/wp-content/themes/harrisonfm/images/loader.gif").on('load', () => { $(this).remove(); });

	const $body = $('body');
	if($body.hasClass('write')){
		const write = new Write();
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

	$('.top').on('click', () => {
		$('html, body').animate({scrollTop: 0}, "slow");
	});
});