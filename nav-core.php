<nav>
	<div class="floating-content">
		<header><a href="/"><span class="icon-bolt-after"></span>HFM<span class="icon-bolt-before"></span></a></header>
		<?php if($post->post_type === 'post' && !is_search() && !is_archive() && !is_home()): ?>
		<span id="back-button" class="icon-undo2 link" title="Back"></span>
		<?php endif; ?>
		<div class="menu">
			<div id="hamburger">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<?php if($post->post_type !== 'post'): ?>
			<a class="write" href="/#articles">Write</a>
			<?php endif; if($post->post_name !== 'photo' && $post->post_type !== 'photo'): ?>
			<a class="photo" href="/photo">Photo</a>
			<?php endif; if($post->post_name !== 'web'): ?>
			<a class="web" href="/web">Web</a>
			<?php endif; if($post->post_name !== 'about'): ?>
			<a class="about" href="/about">About</a>
			<?php endif;
			if($post->post_type === 'post'){
				get_search_form();
			}