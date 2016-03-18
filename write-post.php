<?php
$featImg = get_post_thumbnail_id($post->ID);
$wide = wp_get_attachment_image_src($featImg, 'wide')[0];
$large = wp_get_attachment_image_src($featImg, 'large')[0];
?>
<a href="<?= get_permalink() ?>">
	<figure data-id="<?= $post->ID ?>" id="<?= $post->post_name ?>" data-url-wide="<?= $wide ?>" data-url-large="<?= $large ?>">
		<figcaption><?= get_the_title() ?></figcaption>
		<div class="overlay"></div>
	</figure>
</a>