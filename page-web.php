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
		<div id="portfolio">
			<figure data-url="http://localhost/wp-content/uploads/2015/11/WALTZ-9.jpg" style="background-image: url(http://localhost/wp-content/uploads/2015/11/WALTZ-9.jpg)">
				<header>Harrisonfm.com</header>
			</figure>
			<figcaption>As a web developer, I’ve worked with creative agencies and startups around New York since 2012 building cutting edge web experiences and advertisements.</figcaption>
		</div>
	</main>
	<?php get_template_part('social') ?>
</div>
<?php get_footer() ?>