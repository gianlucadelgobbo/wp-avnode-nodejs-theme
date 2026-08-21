<?php
if (!defined('ABSPATH')) exit;

add_action('init', function () {
  register_post_type('editions', [
	'labels' => [
	  'name' => 'Editions',
	  'singular_name' => 'Edition',
	],
	'public' => true,
	'hierarchical' => true,
	'show_in_rest' => true,
	'menu_icon' => 'dashicons-calendar-alt',
	'supports' => ['title', 'editor', 'thumbnail', 'page-attributes'],
	'rewrite' => ['slug' => 'editions', 'with_front' => false],
  ]);
});
