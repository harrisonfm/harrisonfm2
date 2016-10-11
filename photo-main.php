<main>
	<section id="thumbnails">
		<?php get_template_part('loader') ?>
		<?= get_post_gallery($post->ID) ?>
	</section>
	<section id="slides"></section>
</main>