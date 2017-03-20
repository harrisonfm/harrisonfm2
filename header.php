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
  <link rel="icon" href="<?= get_template_directory_uri() ?>/favicon.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<?php $bodyClasses = get_body_class();
switch($bodyClasses[0]){
	case 'home':
	case 'search':
	case 'archive':
		echo '<body class="write">';
		break;
	default:
		?> <body <?php body_class(); ?>>
	<?php 
}