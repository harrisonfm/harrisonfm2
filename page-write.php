<?php
/*
Template Name: Write
*/
get_header();
$query = new WP_Query('post_type=post');?>
<?php if ( $query->have_posts() ) : ?>
	<?php while ( $query->have_posts() ): $query->the_post(); ?>
		<h2><?php the_title(); ?></h2>
		<?php the_content(); ?>
	<?php endwhile; ?>
<?php endif; ?>

<?php get_footer();
