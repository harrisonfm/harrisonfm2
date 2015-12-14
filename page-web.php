<?php
/*
Template Name: Web
*/
get_header();
?>
<div class="page">
	<?php get_template_part('nav') ?>
	<section>
		<?= get_post_gallery($post->ID); ?>
	</section>
</div>
<?php get_footer() ?>