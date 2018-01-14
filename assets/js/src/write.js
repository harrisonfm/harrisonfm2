"use strict";

const $ = require('jquery'),
_ = require('lodash'),
Loader = require('./loader'),
jQueryBridget = require('jquery-bridget'),
imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

module.exports = class Intro {
	constructor(){
		this.$page = $('.page');
		this.$intro = this.$page.find('#intro');
		this.$articles = this.$page.find('#articles');
		this.$figures = this.$articles.find('figure');
		this.windowWidth = window.innerWidth;
		this.blacklist = [];
		this.isDefault = false;

		this.introLoader = new Loader(this.$page, 1);
		this.handleIntroBG();

		this.$page.on('done-loading', () => {
			this.postsLoader = new Loader(this.$articles, this.$figures.length);
			this.$figures.each((idx, el) => {
				this.assignBGImage($(el), true);
				this.blacklist.push($(el).attr('data-id'));
			});
			this.$articles.imagesLoaded({background: 'figure'}).progress(() => {
				this.postsLoader.increment();
			});
			this.$articles.on('done-loading', () => {
				$(window).on('scroll', _.debounce(() => {
					if($(window).scrollTop() + $(window).innerHeight() + 5 >= this.$articles[0].scrollHeight - 5){
						this.getPosts();
					}
				}, 300));
			});
		});

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
		else{
			this.isDefault = true;
		}

		if(!this.isDefault){
			window.location.href = "#articles";
		}

		$(window).on('resize', _.debounce(() => this.handleIntroBG(), 300));
		$(window).on('resize', _.debounce(() => this.handleFigureBGs(), 300));
	}

	handleIntroBG(){
		this.bg = window.innerWidth <= 900 ? this.$intro.attr('data-url-large') : this.$intro.attr('data-url-full');
		this.$intro.css('backgroundImage', 'url('+this.bg+')');
		this.$page.imagesLoaded({background: '#intro'}).progress(() => {
			this.introLoader.increment();
		});
	}

	assignBGImage($figure){
		const img = window.innerWidth <= 400 ? $figure.attr('data-url-wide') : $figure.attr('data-url-large');
		$figure.css('backgroundImage', "url('"+img+"')");
	}

	handleFigureBGs(){
		if((this.windowWidth <= 400 && window.innerWidth > 400) || (this.windowWidth > 400 && window.innerWidth <= 400)){
			this.$figures.each((idx, el) => {
				const img = window.innerWidth <= 400 ? el.attributes['data-url-wide'].value : el.attributes['data-url-large'].value;
				el.style.backgroundImage = "url('"+img+"')";
			});
		}
		this.windowWidth = window.innerWidth;
	}

	getPosts(){
		if(!this.pag.enabled){
			return;
		}
		this.pag.enabled = false;
		this.$articles.append('<div id="post-loader"><img src="/wp-content/themes/harrisonfm/images/loader.gif" /></div>');
		let data = {
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
		$.post('/wp-admin/admin-ajax.php', data, (response) => {
			if(response.success){
				this.blacklist = response.blacklist;
				this.pag.enabled = true;
				this.$articles.append(response.articles);
				this.$figures = this.$articles.find('figure');

				this.$figures.each((idx, el) => {
					this.assignBGImage($(el));
				});
			}
		}, 'json').fail((response) => {
			console.log(response);
		}).done(() => {
			$('#post-loader').remove();
		});
	}
};