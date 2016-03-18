"use strict";

var $ = require('jquery'),
es6bindAll = require('es6bindall'),
_ = require('lodash'),
Loader = require('./loader');

module.exports = class Write {
	constructor(){
		es6bindAll.es6BindAll(this, ['handleBGs', 'assignBGImage', 'getPosts']);

		this.$section = $('section');
		this.$figures = this.$section.find('figure');
		this.blacklist = [];

		this.windowWidth = window.innerWidth;
		this.loader = new Loader(this.$section, this.$figures.length);
		this.$figures.each(function(idx, el){
			this.assignBGImage($(el));
			this.blacklist.push($(el).attr('data-id'));
		}.bind(this));
		$(window).on('resize', _.debounce(this.handleBGs, 300));

		this.pag = { 
			enabled: true
		};
		if(window.location.pathname.indexOf('/category/') !== -1){
			this.pag.type = 'category';
			this.pag.str = window.location.pathname.substr(window.location.pathname.indexOf('/category/') + 8);
			this.pag.str = this.pag.str.substr(this.pag.str, this.pag.str.length - 1);
		}
		else if(window.location.pathname.indexOf('/tag/') !== -1){
			this.pag.type = 'tag';
			this.pag.str = window.location.pathname.substr(window.location.pathname.indexOf('/tag/') + 5);
			this.pag.str = this.pag.str.substr(this.pag.str, this.pag.str.length - 1);
		}
		else if(window.location.search){
			this.pag.type = 'search';
			this.pag.str = window.location.search.replace( "?s=", "" );
		}

		this.$section.on('scroll', _.debounce(function(){
			if(this.$section.scrollTop() + this.$section.innerHeight() + 5 >= this.$section[0].scrollHeight - 5){
				this.getPosts();
			}
		}.bind(this), 300));
	}

	assignBGImage($el){
		var img = window.innerWidth <= 400 ? $el.attr('data-url-wide') : $el.attr('data-url-large');
		$el.css('backgroundImage', "url('"+img+"')");
		$('<img/>').attr('src', img).on('load', this.loader.increment);
	}

	handleBGs(){
		if((this.windowWidth <= 400 && window.innerWidth > 400) || (this.windowWidth > 400 && window.innerWidth <= 400)){
			this.$figures.each(function(idx, el){
				var img = window.innerWidth <= 400 ? el.attributes['data-url-wide'].value : el.attributes['data-url-large'].value;
				el.style.backgroundImage = "url('"+img+"')";
			}.bind(this));
		}
		this.windowWidth = window.innerWidth;
	}

	getPosts(){
		if(!this.pag.enabled){
			return;
		}
		this.pag.enabled = false;
		this.$section.append('<div id="post-loader"><img src="/wp-content/themes/harrisonfm/images/loader.gif" /></div>');
		var data = {
			action: 'paginate', 
			blacklist: this.blacklist,
			width: window.innerWidth
		};
		switch(this.pag.type){
			case('search'):
				data.search = this.pag.str;
				break;
			case('category'):
				data.cat = this.pag.str;
				break;
			case('tag'):
				data.tag = this.pag.str;
				break;
		}
		$.post('/wp-admin/admin-ajax.php', data, function(response){
			if(response.success){
				this.blacklist = response.blacklist;
				this.pag.enabled = true;
				this.$section.append(response.articles);
				this.$figures = this.$section.find('figure');
			}
		}.bind(this), 'json').fail(function(response){
			console.log(response);
		}).done(function(){
			$('#post-loader').remove();
		});
	}
};