<?php get_template_part('nav', 'core');
$categories = get_categories(array(
	'orderby' => 'name',
	'order'   => 'ASC'
));
$catAppend = '';
foreach($categories as $cat){
	$catAppend .= '<a href="/category/'.$cat->slug.'">'.$cat->name.'</a>';
}
echo $catAppend ?>

</div>
<div id="categories"><?= $catAppend ?></div>
</nav>