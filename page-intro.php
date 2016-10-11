<?php
/*
Template Name: Intro
*/
get_header();
$bgid = get_post_thumbnail_id();
$bg = array(
	'large' => wp_get_attachment_image_src($bgid, 'large', true),
	'full' => wp_get_attachment_image_src($bgid, 'full', true)
);
?>
<div class="page" data-url-large="<?= $bg['large'][0] ?>" data-url-full="<?= $bg['full'][0] ?>">
	<?php get_template_part('loader') ?>
	<div class="logo">Harrison <span class="icon-bolt-before"></span>FM<span class="icon-bolt-after"></span></div>
	<?php get_template_part('nav');
	$args = array(
    'posts_per_page' => 3
	);
	$recents = new WP_Query($args);
	if($recents->have_posts()){
		?>
		<section class="recent">
		<h5>Latest Articles:</h5>
		<?php
		  while($recents->have_posts()){
		    $recents->the_post();
		    $featImg = get_post_thumbnail_id($post->ID);
		    $thumbnail = wp_get_attachment_image_src($featImg, 'thumbnail')[0];
		    echo '<a href="'.get_permalink().'">
		      <article>
		      	<img src="'.$thumbnail.'" />
		        <p>'.get_the_title().'</p>
		      </article>
		    </a>';
		  }
			?>		
		</section>
	<?php	}	?>
</div>
<?php get_footer() ?>