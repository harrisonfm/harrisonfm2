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
			<div class="banner" data-url-wide="<?= $banner['sizes']['wide'] ?>" data-url-large="<?= $banner['sizes']['large'] ?>"></div>
			<?php get_template_part('loader') ?>
			<figure>
				<img src="<?= $me[0] ?>" />
			</figure>
			<?php while(have_posts()):
				the_post();
				the_content(); 
			endwhile; ?>
		</main>
	<?php endif; ?>
	<footer>
		<a href="mailto:john@harrisonfm.com"><i class="icon-mail"></i></a>
		<a href="http://github.com/harrisonfm" target="_blank"><i class="icon-github"></i></a>
		<a href="http://instagram.com/harrison_fm_" target="_blank"><i class="icon-insta"></i></a>
		<a href="http://twitter.com/harrison_fm" target="_blank"><i class="icon-twitter"></i></a>
		<a href="http://facebook.com/johnriharrison" target="_blank"><i class="icon-facebook"></i></a>
		<a href="http://steamcommunity.com/id/harrisonfm" target="_blank"><i class="icon-steam"></i></a>
	</footer>
</div>
<?php get_footer() ?>