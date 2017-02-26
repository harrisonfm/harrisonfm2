<?php
if (have_posts()):
	while (have_posts()): the_post();
		$featImg = get_post_thumbnail_id();
		$wide = wp_get_attachment_image_src($featImg, 'wide')[0];
		$large = wp_get_attachment_image_src($featImg, 'large')[0];
		?>
		<a href="<?= get_permalink() ?>">
			<figure data-id="<?= $post->ID ?>" id="<?= $post->post_name ?>" data-url-wide="<?= $wide ?>" data-url-large="<?= $large ?>">
				<figcaption><?= get_the_title() ?></figcaption>
				<div class="overlay"></div>
			</figure>
		</a>
		<?php
	endwhile;
endif;