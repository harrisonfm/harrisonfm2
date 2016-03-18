<?php

/**
 * harrisonfm functions and definitions
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development and
 * http://codex.wordpress.org/Child_Themes), you can override certain functions
 * (those wrapped in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before the parent
 * theme's file, so the child theme functions would be used.
 *
 * @package harrisonfm
 * @since 0.1.0
 */

// Useful global constants
define( 'HFM_VERSION',      '0.1.0' );
define( 'HFM_URL',          get_stylesheet_directory_uri() );
define( 'HFM_TEMPLATE_URL', get_template_directory_uri() );
define( 'HFM_PATH',         get_template_directory() . '/' );
define( 'HFM_INC',          HFM_PATH . 'includes/' );

// Include compartmentalized functions
require_once HFM_INC . 'functions/core.php';
require_once HFM_INC . 'functions/photo.php';

// Include lib classes

// Run the setup functions
TenUp\harrisonfm\Core\setup();
TenUp\harrisonfm\Photo\setup();

add_action('wp_ajax_paginate', 'paginate');
add_action('wp_ajax_nopriv_paginate', 'paginate');

function paginate(){
    error_log(admin_url('admin-ajax.php'));
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
    $archives = new WP_Query($args);
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