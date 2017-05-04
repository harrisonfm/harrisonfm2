<main>
	<section id="thumbnails">
		<?php get_template_part('loader') ?>
		<?= get_post_gallery($post->ID) ?>
		<div id="end">
			<p>&copy; John Harrison, <?= date("Y") ?></p>
			<span id="social"><?php get_template_part('social') ?></span>
			<div id="end-items">
				<a href="/about"><p>About</p></a>
				<a href="/photo"><p>Photos</p></a>
				<p class="top link">Top</p>
			</div>
		</div>
	</section>
	<section id="slides"></section>
</main>