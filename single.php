<?php
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<main>
		<?php 
		get_template_part('loader');
		if (have_posts()) :
			while (have_posts()):the_post();
				$id = $post->ID;
				$banner = get_post_thumbnail_id($id);
				$category = get_the_category();
				$category = $category[0];
				$isSquare = get_field('square_feature') ? 'class = "square"' : '';
				?>
				<figure id="banner" <?= $isSquare ?>>
					<picture>
		  			<source media="(max-width: 400px)" srcset="<?= wp_get_attachment_image_src($banner, 'wide')[0] ?>" />
		  			<source media="(min-width: 401px) and (max-width: 899px)" srcset="<?= wp_get_attachment_image_src($banner, 'large')[0] ?>" />
		  			<img src="<?= wp_get_attachment_image_src($banner, 'full')[0] ?>" />
		  		</picture>
		  		<?php if($bannerText = get_field('banner_text')): ?>
		  			<figcaption><?= $bannerText ?></figcaption>
		  		<?php endif; ?>
		  	</figure>
				<header>
					<h1><?php the_title() ?></h1>
					<p>
						<?php the_time('M jS, Y') ?> in <a href="<?= get_category_link($category->cat_ID) ?>"><?= $category->name ?></a>
						<?php if($credit = get_field('photo_credit')): ?>
							<span class="credit"><i class="icon icon-image"></i> via 
								<?php if($creditURL = get_field('photo_credit_url')): ?>
									<a href="<?= $creditURL ?>" target="_blank"><?= $credit ?></a>
								<?php else: 
									echo $credit;
								endif;
								?>
							</span>
						<?php endif; ?>
					</p>
				</header>
				<div id="content"><?php the_content(); ?></div>
				<?php
			endwhile;
		endif; 
		?>
		<footer>
			<?php
			wp_reset_query();
			$tags = wp_get_post_tags($post->ID);
			if($tags):
			?>
				<p class="tag-line">
					<span>Tagged:</span>
					<?php
					foreach($tags as $tag){
						echo '<a href="'.get_tag_link($tag->term_id).'">#'.$tag->name.'</a>';
					}
					?>
				</p>
			<?php
			endif;
			if($title = get_field('story_title')):
			?>
				<h5>This is part of the <?= $title ?> story:</h5>
				<div id="story-container" <?= get_field('story_previous') && get_field('story_next') ? 'class="two-stories"' : '' ?>>
					<?php
					if($post = get_field('story_previous')):
						setup_postdata($post);
						$bg = wp_get_attachment_image_src(get_post_thumbnail_id(), 'wide')[0];
					?>
						<div class="story-item">
							<h6>&lt;&lt;&lt; Previous</h6>
							<a href="<?= get_the_permalink() ?>">
								<figure style="background-image:url('<?= $bg ?>')">
									<figcaption><?= get_the_title() ?></figcaption>
									<div class="overlay"></div>
								</figure>
							</a>
						</div>
					<?php
						wp_reset_postdata();
					endif;
					if($post = get_field('story_next')):
						setup_postdata($post);
						$bg = wp_get_attachment_image_src(get_post_thumbnail_id(), 'wide')[0];
					?>
						<div class="story-item">
							<h6>Next &gt;&gt;&gt;</h6>
							<a href="<?= get_the_permalink() ?>">
								<figure style="background-image:url('<?= $bg ?>')">
									<figcaption><?= get_the_title() ?></figcaption>
									<div class="overlay"></div>
								</figure>
							</a>
						</div>
					<?php
						wp_reset_postdata();
					endif;
					?>
				</div>
			<?php
			else:
				$related = new WP_Query(
					array(
					'cat'=>$category->cat_ID,
					'posts_per_page' => 3,
					'post__not_in' => array($id)
				));
				if ($related->have_posts()) : ?>
					<h5>Other Reading:</h5>
					<?php while ($related->have_posts()):
						$related->the_post();
					?>
					<a href="<?= get_the_permalink() ?>">
						<article class="related">
							<div>
								<h5><?= get_the_title() ?></h5>
								<p><?= get_the_excerpt() ?></p>
							</div>
							<figure>
								<?= the_post_thumbnail('thumb') ?>
							</figure>
						</article>
					</a>
				<?php
					endwhile;
				endif;
			endif;
			?>
			<div id="end">
				<p>&copy; John Harrison, <?= date("Y") ?></p>
				<span id="social"><?php get_template_part('social') ?></span>
				<div id="end-items">
					<a href="/about"><p>About</p></a>
					<a href="/#articles"><p>Writing</p></a>
					<p class="top link">Top</p>
				</div>
			</div>
		</footer>
	</main>
	<div id="slides">
		<footer>
			<h4 id="title"></h4>
			<p id="caption"></p>
			<div id="controls">
				<span class="prev">Prev</span> / <span class="up">Return</span> / <span class="next">Next</span>
				<p>Slideshow: <span id="slide-control">On</span></p>
			</div>
		</footer>
	</div>
</div>
<?php get_footer();
