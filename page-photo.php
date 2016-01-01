<?php
/*
Template Name: Photo
*/
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'photo') ?>
	<section>
		<div id="thumbnails">
			<?= get_post_gallery($post->ID) ?>
		</div>
		<div id="slides"></div>
	</section>
</div>
<?php get_footer() ?>