<?php
$bg = get_custom_header();
$bg = array(
	'large' => wp_get_attachment_image_src($bg->attachment_id, 'large', true),
	'full' => wp_get_attachment_image_src($bg->attachment_id, 'full', true)
);
get_template_part('loader')
?>
<div id="intro" data-url-large="<?= $bg['large'][0] ?>" data-url-full="<?= $bg['full'][0] ?>">
	<div class="logo">Harrison <span class="icon-bolt-after"></span>FM<span class="icon-bolt-before"></span></div>
	<?php get_template_part('nav'); ?>
</div>