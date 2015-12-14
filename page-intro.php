<?php
/*
Template Name: Intro
*/
get_header();
$bg = get_post_thumbnail_id();
$bg = array(
	'large' => wp_get_attachment_image_src($bg, 'large', true),
	'full' => wp_get_attachment_image_src($bg, 'full', true)
);
?>
<style>
	.page{
		background-image: url(<?= $bg['large'][0] ?>);
	}
	@media (min-width: 769px){
		.page{
			background-image: url(<?= $bg['full'][0] ?>);
		}
	}
</style>
<div class="page">
	<div class="logo">Harrison <span class="icon-bolt-before"></span>FM<span class="icon-bolt-after"></span></div>
	<?php get_template_part('nav') ?>
</div>
<?php get_footer() ?>