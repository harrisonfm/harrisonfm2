<?php
/**
 * The template for displaying the header.
 *
 * @package harrisonfm
 * @since 0.1.0
 */
 ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
    <meta property="og:type" content="website">
    <meta property="og:title" content="harrisonfm.com">
    <meta property="og:description" content="Portfolio of John Harrison, Brooklyn based web developer, photographer, artist.">
    <meta property="og:image" content="http://harrisonfm.com/images/harrisonfm.png">
    <link rel="icon" href="<?= get_template_directory_uri() ?>/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>