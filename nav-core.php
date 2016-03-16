<nav>
<header><a href="/"><span class="icon-bolt-before"></span>HFM<span class="icon-bolt-after"></span></a></header>
<?php if($post->post_type === 'post'): ?>
<span class="icon-undo2 link" alt="Back"></span>
<?php endif; ?>
<div class="menu">
	<div id="hamburger">
		<div></div>
		<div></div>
		<div></div>
	</div>
	<?php if($post->post_name !== 'about'): ?>
	<a class="about" href="/about">About</a>
	<?php endif; if($post->post_name !== 'web'): ?>
	<a class="web" href="/web">Web</a>
	<?php endif; if($post->post_name !== 'photo' && $post->post_type !== 'photo'): ?>
	<a class="photo" href="/photo">Photo</a>
	<?php endif; if($post->post_name !== 'write' && $post->post_type !== 'post'): ?>
	<a class="write" href="/write">Write</a>
	<?php endif; ?>