<?php
/*
Template Name: Web
*/
get_header();

$banner = get_field('banner');
?>
<div class="page">
	<?php get_template_part('nav') ?>
	<main>
		<figure>
			<picture>
  			<source media="(max-width: 400px)" srcset="<?= $banner['sizes']['wide'] ?>" />
  			<source media="(min-width: 401px) and (max-width: 899px)" srcset="<?= $banner['sizes']['large'] ?>" />
  			<img id="banner" src="<?= $banner['url'] ?>" />
  		</picture>
  	</figure>
		<?php get_template_part('loader') ?>
		<p id="blurb"><?= get_field('blurb') ?></p>
		<div id="portfolio"><?= get_post_gallery($post->ID); ?></div>
	</main>
	<footer id="social"><?php get_template_part('social') ?></footer>
</div>
<?php get_footer() ?>