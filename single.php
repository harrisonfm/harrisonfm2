<?php
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<section>
		<?php 
		#get_template_part('loader');
		if (have_posts()) :
			while (have_posts()):the_post();
				$featImg = get_post_thumbnail_id($post->ID);
				$category = get_the_category();
				$category = $category[0];
				$wide = wp_get_attachment_image_src($featImg, 'wide')[0];
				$large = wp_get_attachment_image_src($featImg, 'large')[0];
				?>
				<header>
					<h1><?php the_title() ?></h1>
					<p><?php the_time('M jS, Y') ?>, <a href="<?= get_category_link($category->cat_ID) ?>"><?= $category->name ?></a></p>
				</header>
				<div id="banner" data-url-wide="<?= $wide ?>" data-url-large="<?= $large ?>"></div>
				<main>
				<? the_content();
			endwhile;
		endif; ?>
			</main>
	</section>
</div>
<?php get_footer();
