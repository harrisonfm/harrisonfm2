<?php
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<main>
		<?php get_template_part('loader'); ?>
		<h4><span id="back-button" class="icon-undo2 link" title="Back"></span> Results for: <span><?= the_search_query() ?></span></h4>
		<?php get_template_part('write', 'loop'); ?>
	</main>
</div>
<?php get_footer();
