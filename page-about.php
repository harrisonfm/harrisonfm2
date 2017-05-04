<?php
/*
Template Name: About
*/
get_header();

$banner = get_field('banner');
$me = wp_get_attachment_image_src(get_post_thumbnail_id(), 'full', true);
?>
<div class="page">
	<?php get_template_part('nav') ?>
	<?php if(have_posts()): ?>
		<main>
			<figure>
				<picture>
	  			<source media="(max-width: 400px)" srcset="<?= $banner['sizes']['wide'] ?>" />
	  			<source media="(min-width: 401px) and (max-width: 899px)" srcset="<?= $banner['sizes']['large'] ?>" />
	  			<img id="banner" src="<?= $banner['url'] ?>" />
	  		</picture>
	  	</figure>
			<?php get_template_part('loader') ?>
			<figure id="me">
				<img src="<?= $me[0] ?>" />
			</figure>
			<?php while(have_posts()):
				the_post();
				the_content(); 
			endwhile; ?>
		</main>
	<?php endif; ?>
	<footer id="social"><?php get_template_part('social') ?></footer>
</div>
<?php get_footer() ?>