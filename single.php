<?php
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<section>
		<?php 
		get_template_part('loader');
		if (have_posts()) :
			while (have_posts()):the_post();
				$featImg = get_post_thumbnail_id($post->ID);
				$wide = wp_get_attachment_image_src($featImg, 'wide')[0];
				$large = wp_get_attachment_image_src($featImg, 'large')[0];
				the_content();
			endwhile;
		endif; ?>
	</section>
</div>
<?php get_footer();
