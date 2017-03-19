<?php get_header() ?>
<div class="page">
	<?php get_template_part('intro', 'header') ?>
	<main>
		<div id="articles">
			<h4><span id="back-button" class="icon-undo2 link" title="Back"></span> Category: <span><?= single_cat_title() ?></span></h4>
			<?php get_template_part('write', 'loop') ?>
		</div>
		<?php get_template_part('nav', 'write') ?>
	</main>
</div>
<?php get_footer();
