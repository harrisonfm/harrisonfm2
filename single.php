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
				$id = $post->ID;
				$featImg = get_post_thumbnail_id($id);
				$category = get_the_category();
				$category = $category[0];
				$wide = wp_get_attachment_image_src($featImg, 'wide')[0];
				$large = wp_get_attachment_image_src($featImg, 'large')[0];
				?>
				<div id="banner" data-url-wide="<?= $wide ?>" data-url-large="<?= $large ?>"></div>
				<header>
					<h1><?php the_title() ?></h1>
					<p><?php the_time('M jS, Y') ?> in <a href="<?= get_category_link($category->cat_ID) ?>"><?= $category->name ?></a></p>
					<?php #if($photoCredit = get_post_meta($post->ID, 'photo_credit', true)){ ?>
				</header>
				<main>
				<? the_content();
			endwhile;
		endif; ?>
			</main>
			<footer>
				<?php
				wp_reset_query();
				$tags = wp_get_post_tags($post->ID);
				if($tags){
					$tagLine = '<p class="tag-line"><span>Tagged:</span> ';
					foreach($tags as $tag){
						$tagLine .= '<a href="'.get_tag_link($tag->term_id).'">#'.$tag->name.'</a>, ';
					}
					echo substr($tagLine, 0, -2).'</p>';
				}
				$related = new WP_Query(
					array(
					'cat'=>$category->cat_ID,
					'posts_per_page' => 3,
					'post__not_in' => array($id)
				));
				if ($related->have_posts()) : ?>
						<h5>Other Reading</h5>
						<?php while ($related->have_posts()):
							$related->the_post();
						?>
						<a href="<?= the_permalink() ?>">
							<article>
								<div>
									<h5><?= the_title() ?></h5>
									<p><?= the_excerpt() ?></p>
								</div>
								<figure>
									<?= the_post_thumbnail('thumb') ?>
								</figure>
							</article>
						</a>
				<?php
				endwhile;
				endif;
				?>
				<div id="end">
					<p>&copy; John Harrison, <?= date("Y") ?></p>
					<a href="/about"><p>About</p></a>
					<a href="/write"><p>Writing</p></a>
					<p class="top link">Top</p>
				</div>
			</footer>
	</section>
	<div id="slides">
		<footer>
			<h4 id="title"></h4>
			<p id="caption"></p>
			<div id="controls">
				<span class="prev">Prev</span> / <span class="up">Return</span> / <span class="next">Next</span>
			</div>
		</footer>
	</div>
</div>
<?php get_footer();
