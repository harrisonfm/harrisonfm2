<?php
namespace TenUp\harrisonfm\Core;

/**
 * Set up theme defaults and register supported WordPress features.
 *
 * @since 0.1.0
 *
 * @uses add_action()
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'after_setup_theme',  $n( 'i18n' )        );
	add_action( 'wp_head',            $n( 'header_meta' ) );
	add_action( 'wp_enqueue_scripts', $n( 'scripts' )     );
	add_action( 'wp_enqueue_scripts', $n( 'styles' )      );
	add_theme_support( 'post-thumbnails' ); 
	add_filter('show_admin_bar', '__return_false');

	add_image_size('wide', 600, 900);
	add_image_size('post_thumb', 580, 580, true);
	add_filter('post_gallery',$n('customFormatGallery'),10,2);

	add_action( 'init', $n('add_excerpt') );
}

function add_excerpt() {
     add_post_type_support( 'page', 'excerpt' );
}

/**
 * Makes WP Theme available for translation.
 *
 * Translations can be added to the /lang directory.
 * If you're building a theme based on WP Theme, use a find and replace
 * to change 'wptheme' to the name of your theme in all template files.
 *
 * @uses load_theme_textdomain() For translation/localization support.
 *
 * @since 0.1.0
 *
 * @return void
 */
function i18n() {
	load_theme_textdomain( 'hfm', HFM_PATH . '/languages' );
 }

/**
 * Enqueue scripts for front-end.
 *
 * @uses wp_enqueue_script() to load front end scripts.
 *
 * @since 0.1.0
 *
 * @param bool $debug Whether to enable loading uncompressed/debugging assets. Default false.
 * @return void
 */
function scripts( $debug = false ) {
	$min = ( $debug || defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_script(
		'hfm',
		HFM_TEMPLATE_URL . "/assets/js/main.js",
		array(),
		HFM_VERSION,
		true
	);
}

/**
 * Enqueue styles for front-end.
 *
 * @uses wp_enqueue_style() to load front end styles.
 *
 * @since 0.1.0
 *
 * @param bool $debug Whether to enable loading uncompressed/debugging assets. Default false.
 * @return void
 */
function styles( $debug = false ) {
	$min = ( $debug || defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_style(
		'hfm',
		HFM_URL . "/assets/css/harrisonfm{$min}.css",
		array(),
		HFM_VERSION
	);
}

/**
 * Add humans.txt to the <head> element.
 *
 * @uses apply_filters()
 *
 * @since 0.1.0
 *
 * @return void
 */
function header_meta() {
	$humans = '<link type="text/plain" rel="author" href="' . HFM_TEMPLATE_URL . '/humans.txt" />';

	echo apply_filters( 'hfm_humans', $humans );
}

function customFormatGallery($string,$attr){
	global $post;
  $output = '';
	if($post->post_name === 'web'){
    $posts = get_posts(array('include' => $attr['ids'],'post_type' => 'attachment'));
    foreach($posts as $imagePost){
    	$post = get_post($imagePost);
    	$img = wp_get_attachment_image_src($imagePost->ID, 'full')[0];
    	$output .= '<a href="'.$post->post_content.'" target="_blank"><figure data-url="'.$img.'" style="background-image: url('.$img.')"><header>'.$post->post_title.'</header><figcaption>'.$post->post_excerpt.'</figcaption></figure></a>';
    }
	}
	else if($post->post_name === 'photo' || $post->post_type === 'photo'){
    $posts = get_posts(array('include' => $attr['ids'],'post_type' => 'attachment'));
    for($i = 0; $i < count($posts); $i++){
    	$post = get_post($posts[$i]);
    	$full = wp_get_attachment_image_src($posts[$i]->ID, 'full')[0];
    	$large = wp_get_attachment_image_src($posts[$i]->ID, 'large')[0];
    	$wide = wp_get_attachment_image_src($posts[$i]->ID, 'wide')[0];
    	$output .= '
    	<figure id="'.$post->post_title.'" data-id="'.$i.'" data-url-full="'.$full.'" data-url-large="'.$large.'">
    		<picture>
    			<source media="(max-width: 400px), (min-width: 769px) and (max-width: 1024px)" srcset="'.$wide.'" />
    			<img src="'.$large.'" />
    		</picture>
    		<figcaption>'.$post->post_title.'</figcaption>
    	</figure>';
    }
	}
	else if($post->post_type === 'post'){
    $posts = get_posts(array('include' => $attr['ids'],'post_type' => 'attachment'));
    $output .= '<div class="gallery">';
    for($i = 0; $i < count($posts); $i++){
    	$post = get_post($posts[$i]);
    	$full = wp_get_attachment_image_src($posts[$i]->ID, 'full')[0];
    	$large = wp_get_attachment_image_src($posts[$i]->ID, 'large')[0];
    	$wide = wp_get_attachment_image_src($posts[$i]->ID, 'wide')[0];
    	$post_thumb = wp_get_attachment_image_src($posts[$i]->ID, 'post_thumb')[0];
    	$output .= '
    	<figure id="'.$post->post_title.'" data-id="'.$i.'" data-url-full="'.$full.'" data-url-large="'.$large.'">
    		<picture>
    			<source media="(max-width: 400px)" srcset="'.$wide.'" />
    			<source media="(min-width: 401px) and (max-width: 768px)" srcset="'.$large.'" />
    			<img src="'.$post_thumb.'" />
    		</picture>
    		<figcaption>'.$post->post_title.'</figcaption>
    	</figure>';
    }
    $output .= '</div>';
	}
	else{
		return;
	}
  return $output;
}