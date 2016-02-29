<?php
/*
Template Name: Write
*/
get_header();
$query = new WP_Query(array('post_type'=>'post'));
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<section>
		<?php 
		get_template_part('loader');
		if ($query->have_posts()):
			while ($query->have_posts()): $query->the_post();
			$featImg = get_post_thumbnail_id($post->ID);
			$wide = wp_get_attachment_image_src($featImg, 'wide')[0];
			$large = wp_get_attachment_image_src($featImg, 'large')[0];
			?>
			<a href="<?= get_permalink() ?>">
				<figure id="<?= $post->post_name ?>" data-url-wide="<?= $wide ?>" data-url-large="<?= $large ?>">
	    		<figcaption><?= get_the_title() ?></figcaption>
	    		<div class="overlay"></div>
	    	</figure>
	    </a>
			<?php endwhile;
		endif; ?>
	</section>
</div>
<?php get_footer();
