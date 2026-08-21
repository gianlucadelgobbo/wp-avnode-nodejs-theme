<?php
if (!defined('ABSPATH')) exit;

add_action('template_redirect', function () {
  $uri = $_SERVER['REQUEST_URI'] ?? '/';

  $is_rest =
	(strpos($uri, '/wp-json/') === 0) ||
	(strpos($uri, 'rest_route=') !== false);

  $is_admin =
	(strpos($uri, '/wp-admin') === 0) ||
	(strpos($uri, '/wp-login.php') === 0) ||
	(strpos($uri, '/wp-admin/admin-ajax.php') === 0) ||
	(strpos($uri, '/wp-cron.php') === 0);

  $is_acme = (strpos($uri, '/.well-known/acme-challenge/') === 0);

  if ($is_rest || $is_admin || $is_acme) return;

  wp_redirect('https://visualsoundacademy.com', 302);
  exit;
}, 0);
