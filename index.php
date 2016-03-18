<?php
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<section>
		<?php get_template_part('loader'); ?>
		<?php get_template_part('write', 'loop'); ?>
	</section>
</div>
<?php get_footer();