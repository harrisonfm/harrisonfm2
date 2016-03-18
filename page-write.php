<?php
/*
Template Name: Write
*/
get_header();
$query = new WP_Query(array(
	'post_type' => 'post',
	'posts_per_page' => 8
	)
);
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<section>
		<?php 
		get_template_part('loader');
		if ($query->have_posts()):
			while ($query->have_posts()): $query->the_post(); ?>
			<?php get_template_part('write', 'post') ?>
			<?php endwhile;
		endif; ?>
	</section>
</div>
<?php get_footer();
