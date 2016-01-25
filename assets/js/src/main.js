"use strict";

var $ = require('jquery');

$(function(){
	if($('.page-template-page-photo').length || $('.single-photo').length){
		var Photo = require('./photo');
	}
});