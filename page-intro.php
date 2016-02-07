<?php
/*
Template Name: Intro
*/
get_header();
$bgid = get_post_thumbnail_id();
$bg = array(
	'large' => wp_get_attachment_image_src($bgid, 'large', true),
	'full' => wp_get_attachment_image_src($bgid, 'full', true)
);
?>
<div class="page" data-url-large="<?= $bg['large'][0] ?>" data-url-full="<?= $bg['full'][0] ?>">
	<?php get_template_part('loader') ?>
	<div class="logo">Harrison <span class="icon-bolt-before"></span>FM<span class="icon-bolt-after"></span></div>
	<?php get_template_part('nav') ?>
</div>
<?php get_footer() ?>