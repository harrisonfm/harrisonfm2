<?php
namespace TenUp\harrisonfm\Photo;
/**
 * Set up Product post type
 *
 * @since 0.1.0
 *
 * @uses add_action()
 *
 * @return void.
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'create_post_type' ) );
}

/**
 * Creates custom post type for Photos
 *
 * @since 0.1.0
 *
 * @uses register_post_type()
 *
 * @return void.
 */
function create_post_type() {
    register_post_type( 'photo', array(
        'labels' => array(
            'name'               => __('Photos', 'harrisonfm'),
            'singular_name'      => __('Photo', 'harrisonfm'),
            'menu_name'          => __('Photos', 'harrisonfm'),
            'name_admin_bar'     => __('Photo', 'harrisonfm'),
            'all_items'          => __('Photos', 'harrisonfm'),
            'add_new'            => __('Add New', 'harrisonfm'),
            'add_new_item'       => __('Add New Photo', 'harrisonfm'),
            'edit_item'          => __('Edit Photo', 'harrisonfm'),
            'new_item'           => __('New Photo', 'harrisonfm'),
            'view_item'          => __('View Photo', 'harrisonfm'),
            'search_items'       => __('Search Photo', 'harrisonfm'),
            'not_found'          => __('No Photos found', 'harrisonfm'),
            'not_found_in_trash' => __('No Photos found in Trash', 'harrisonfm'),
        ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 4,
        'supports' => array(
            'title',
            'editor',
            'excerpt',
            'thumbnail',
        ),
        'has_archive' => false,
    ));
}