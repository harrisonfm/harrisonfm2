<?php
/*
Template Name: Web
*/
get_header();
?>
<div class="page">
	<?php get_template_part('nav') ?>
	<section>
		<?php get_template_part('loader') ?>
		<?= get_post_gallery($post->ID); ?>
	</section>
</div>
<?php get_footer() ?>