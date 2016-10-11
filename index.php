<?php
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<main>
		<?php get_template_part('loader'); ?>
		<?php get_template_part('write', 'loop'); ?>
	</main>
</div>
<?php get_footer();