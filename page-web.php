<?php
/*
Template Name: Web
*/
get_header();
?>
<div class="page">
	<?php get_template_part('nav') ?>
	<main>
		<?php get_template_part('loader') ?>
		<?= get_post_gallery($post->ID); ?>
	</main>
</div>
<?php get_footer() ?>