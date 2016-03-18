<?php
get_header();
?>
<div class="page">
	<?php get_template_part('nav', 'write') ?>
	<section>
		<?php get_template_part('loader'); ?>
		<h4><span id="back-button" class="icon-undo2 link" title="Back"></span> Tagged: #<span><?= single_tag_title() ?></span></h4>
		<?php get_template_part('write', 'loop'); ?>
	</section>
</div>
<?php get_footer();