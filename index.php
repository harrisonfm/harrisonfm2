<?php get_header() ?>
<div class="page">
	<?php get_template_part('intro', 'header') ?>
	<main>
		<div id="articles">
			<?php get_template_part('write', 'loop'); ?>
		</div>
		<?php get_template_part('nav', 'write') ?>
	</main>
</div>
<?php get_footer();