"use strict";

var $ = require('jquery');

$(function(){
	if($('.page-template-page-photo').length || $('.single-photo').length){
		var Photo = require('./photo');
	}
	else if($('.page-template-page-web').length){
		var Web = require('./web');
	}
	else if($('.page-template-page-about').length){
		var About = require('./about');
	}
});