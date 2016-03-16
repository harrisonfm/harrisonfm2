<?php get_template_part('nav', 'core');
$excerpt = get_the_excerpt();
$galleries = new WP_Query(
	array(
		'post_type'=>'photo', 
		'post__not_in'=> array($post->ID)
	)
);
$menuAppend = '';
if($post->post_name !== 'photo'){
	$menuAppend .= '<a href="/photo">Highlights</a>';
}
if ($galleries->have_posts()){
	while($galleries->have_posts()){
		$galleries->the_post();
		$menuAppend .= '<a href=/photo/'.$post->post_name.'>'.$post->post_title.'</a>';
	}
}
echo $menuAppend; #adding galleries to main menu for mobile nav
?>
</div>
<div id="categories"><?= $menuAppend ?></div>
<div id="description"><?= $excerpt ?></div>
<footer>
	<h4 id="title"></h4>
	<div id="controls">
		<span class="prev">Prev</span> / <span class="next">Next</span> / <span class="up">Return</span>
	</div>
</footer>
<?php 
wp_reset_postdata();
?>
</nav>