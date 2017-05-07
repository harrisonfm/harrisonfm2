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
    add_filter( 'excerpt_length', $n('reduceExcerptLength'), 999 );

    add_action('wp_ajax_paginate', $n('paginate'));
    add_action('wp_ajax_nopriv_paginate', $n('paginate'));

    add_action('wp_ajax_get_photos', $n('getPhotos'));
    add_action('wp_ajax_nopriv_get_photos', $n('getPhotos'));

    add_action( 'after_setup_theme', $n('custom_header') );

    add_filter('pre_get_posts', $n('search_filter'));
    
    add_theme_support( 'title-tag' );
}

function add_excerpt() {
     add_post_type_support( 'page', 'excerpt' );
}

function custom_header() {
    $args = array(
        'flex-width' => true,
        'flex-height' => true,
        'default-image' => get_template_directory_uri() . '/images/src/testbg.jpg',
    );
    add_theme_support( 'custom-header', $args );
}

function search_filter($query) {
    if ($query->is_search) {
        $query->set('post_type', 'post');
    }
    return $query;
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

function get_match( $regex, $content ) {
    preg_match($regex, $content, $matches);
    return $matches[1];
}

function customFormatGallery($string,$attr){
    global $post;

    // Extract the shortcode arguments from the $page or $post
    $shortcode_args = shortcode_parse_atts(get_match('/\[gallery\s(.*)\]/isU', $post->post_content));

    // get the ids specified in the shortcode call
    $ids = $shortcode_args["ids"];

    // get the attachments specified in the "ids" shortcode argument
    $imagePosts = get_posts(
        array(
            'include' => $ids,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => 'menu_order ID',
            'orderby' => 'post__in', //required to order results based on order specified the "include" param
        )
    );

    $output = '';

	if($post->post_name === 'web'){
        foreach($imagePosts as $imagePost){
        	$post = get_post($imagePost);
        	$img = wp_get_attachment_image_src($imagePost->ID, 'full')[0];
            $output .= <<<web
            <figure data-url="$img" style="background-image: url('$img')">
                <header>{$post->post_title}</header>
            </figure>
            <figcaption>
                <a href="{$post->post_content}" target="_blank">Link</a> &mdash; {$post->post_excerpt}
            </figcaption>
web;
        }
	}
	else if($post->post_name === 'photo' || $post->post_type === 'photo'){
        for($i = 0; $i < count($imagePosts); $i++){
        	$photo = get_post($imagePosts[$i]);
        	$full = wp_get_attachment_image_src($imagePosts[$i]->ID, 'full')[0];
        	$large = wp_get_attachment_image_src($imagePosts[$i]->ID, 'large')[0];
        	$wide = wp_get_attachment_image_src($imagePosts[$i]->ID, 'wide')[0];
        	$output .= <<<photo
        	<figure id="{$photo->post_name}" data-index="$i" data-id="{$photo->ID}" data-url-full="$full" data-url-large="$large">
        		<picture>
        			<source media="(max-width: 400px), (min-width: 769px) and (max-width: 1024px)" srcset="$wide" />
        			<img src="$large" />
        		</picture>
        		<figcaption>{$photo->post_title}</figcaption>
        	</figure>
photo;
            if($post->post_type === 'photo' && $i >= 15){ #on highlights, we get all.
                break;
            }
        }
	}
	else if($post->post_type === 'post'){
        $output .= '<div class="gallery">';
        for($i = 0; $i < count($imagePosts); $i++){
        	$photo = get_post($imagePosts[$i]);
        	$full = wp_get_attachment_image_src($imagePosts[$i]->ID, 'full')[0];
        	$large = wp_get_attachment_image_src($imagePosts[$i]->ID, 'large')[0];
        	$wide = wp_get_attachment_image_src($imagePosts[$i]->ID, 'wide')[0];
        	$post_thumb = wp_get_attachment_image_src($imagePosts[$i]->ID, 'post_thumb')[0];
        	$output .= <<<photo
        	<figure id="{$photo->post_title}" data-index="$i" data-url-full="$full" data-url-large="$large">
        		<picture>
        			<source media="(max-width: 400px)" srcset="$wide" />
        			<source media="(min-width: 401px) and (max-width: 768px)" srcset="$large" />
        			<img src="$post_thumb" />
        		</picture>
        		<div class="overlay"></div>
        		<figcaption><h4>{$photo->post_title}</h4><p>{$photo->post_excerpt}</p></figcaption>
        	</figure>
photo;
        }
        $output .= '</div>';
	}
	else{
		return;
	}
  return $output;
}

function reduceExcerptLength($length){
    return 25;
}

function paginate(){
    $blacklist = $_POST['blacklist'];
    $args = array(
        'posts_per_page' => 4,
        'post__not_in' => $blacklist,
        'post_type' => 'post',
        'post_status' => 'publish'
    );
    if(!empty($_POST['search'])){
        $args['s'] = $_POST['search'];
    }
    else if(!empty($_POST['cat'])){
        $args['category_name'] = $_POST['cat'];
    }
    else if(!empty($_POST['tag'])){
        $args['tag'] = $_POST['tag'];
    }
    $archives = new \WP_Query($args);
    $response = array(
        'success' => false,
        'articles' => ''
    );
    if($archives->have_posts()){
        while($archives->have_posts()){
            $archives->the_post();
            global $post;
            $blacklist[] = $post->ID;
            $featImg = get_post_thumbnail_id($post->ID);
            $wide = wp_get_attachment_image_src($featImg, 'wide')[0];
            $large = wp_get_attachment_image_src($featImg, 'large')[0];
            $url = $_POST['width'] > 400 ? $large : $full;
            $response['articles'] .= '<a href="'.get_permalink().'">
                <figure data-id="'.$post->ID.'" id="'.$post->post_name.'" data-url-wide="'.$wide.'" data-url-large="'.$large.'" style="background-image: url('.$url.')">
                    <figcaption>'.get_the_title().'</figcaption>
                    <div class="overlay"></div>
                </figure>
            </a>';
        }
        $response['blacklist'] = $blacklist;
        $response['success'] = true;
    }
    header('Content-type: application/json');
    die(json_encode($response));
}

function getPhotos(){
    $post = get_post($_POST['postID']);

    $shortcode_args = shortcode_parse_atts(get_match('/\[gallery\s(.*)\]/isU', $post->post_content));

    $ids = $shortcode_args["ids"];

    $lastID = $_POST['lastPhoto'].',';
    $photoIndex = $_POST['photoIndex'];

    $ids = strpos($ids, $lastID) ? substr($ids, strpos($ids, $lastID) + strlen($lastID)) : false;

    $response = array(
        'success' => false,
        'photos' => ''
    );

    if($ids){
        $posts = get_posts(
            array(
                'include' => $ids, 
                'post_status' => 'inherit', 
                'post_type' => 'attachment', 
                'post_mime_type' => 'image', 
                'order' => 'menu_order ID', 
                'orderby' => 'post__in',
            )
        );

        for($i = 0; $i < count($posts); $i++){
            $photoIndex++;
            $photo = get_post($posts[$i]);
            $full = wp_get_attachment_image_src($posts[$i]->ID, 'full')[0];
            $large = wp_get_attachment_image_src($posts[$i]->ID, 'large')[0];
            $wide = wp_get_attachment_image_src($posts[$i]->ID, 'wide')[0];
            $response['photos'] .= <<<photo
            <figure class="added" id="{$photo->post_name}" data-index="$photoIndex" data-id="{$photo->ID}" data-url-full="$full" data-url-large="$large">
                <picture>
                    <source media="(max-width: 400px), (min-width: 769px) and (max-width: 1024px)" srcset="$wide" />
                    <img src="$large" />
                </picture>
                <figcaption>{$photo->post_title}</figcaption>
            </figure>
photo;
            if($i >= 7){
                break;
            }
        }
        $response['success'] = true;
    }

    header('Content-type: application/json');
    die(json_encode($response));
}