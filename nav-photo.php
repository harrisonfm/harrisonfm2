<?php get_template_part('nav', 'core');
$excerpt = get_the_excerpt();
?>
<div id="galleries">Galleries</div>
</div>
<?php if($post->post_name === 'photo' || $post->post_type === 'photo'): ?> 
<ul>
	<?php if($post->post_name !== 'photo'){ ?>
		<li><a href="/photo">Highlights</a>
	<?php
	}
	$galleries = new WP_Query(array('post_type'=>'photo', 'post_not__in'=>$post->ID));
	if ($galleries->have_posts()){
		while($galleries->have_posts()){
			$galleries->the_post();
			echo '<li><a href=/photo/'.$post->post_name.'>'.$post->post_title.'</a>';
		}
	}
	?>
</ul>
<div id="description"><?= $excerpt ?></div>
<footer>
	<h4 id="title"></h4>
	<div id="controls">
		<span class="prev">Prev</span> / <span class="next">Next</span> / <span class="up">Return</span>
	</div>
</footer>
<?php 
wp_reset_postdata();
endif;
?>
</nav>