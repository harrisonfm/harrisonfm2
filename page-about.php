<?php
/*
Template Name: About
*/
get_header();
$me = get_post_thumbnail_id();
$me = wp_get_attachment_image_src($me, 'full', true);
?>
<div class="page">
	<?php get_template_part('nav') ?>
	<?php if(have_posts()): ?>
		<section>
			<?php get_template_part('loader') ?>
			<figure>
				<img src="<?= $me[0] ?>" />
			</figure>
			<?php while(have_posts()):
				the_post();
				the_content(); 
			endwhile; ?>
		</section>
	<?php endif; ?>
	<footer>
		<a href="mailto:john@harrisonfm.com"><i class="icon-mail"></i></a>
		<a href="http://instagram.com/harrison_fm_" target="_blank"><i class="icon-insta"></i></a>
		<a href="http://github.com/harrisonfm" target="_blank"><i class="icon-github"></i></a>
		<a href="http://twitter.com/harrison_fm" target="_blank"><i class="icon-twitter"></i></a>
		<a href="http://facebook.com/johnriharrison" target="_blank"><i class="icon-facebook"></i></a>
		<a href="http://steamcommunity.com/id/harrisonfm" target="_blank"><i class="icon-steam"></i></a>
	</footer>
</div>
<?php get_footer() ?>