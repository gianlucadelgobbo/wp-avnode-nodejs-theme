<?php
if (!defined('ABSPATH')) exit;

// inc/helpers.php

/**
 * Detect legacy lang from URL prefix (/it/ ...). Default en.
 */
function avnode_api_detect_lang(): string {
  $uri = $_SERVER['REQUEST_URI'] ?? '';
  return (preg_match('#^/it/#', $uri)) ? 'it' : 'en';
}

/**
 * Legacy: convert [avnode source=... view=...] into the same "advanced" URLs
 * the old theme expected (program/, performers/, partners/, videos/, galleries/).
 *
 * Returns:
 *  [
 *    'advanced' => [
 *      'performers'   => 'https://it.api.avnode.net/.../performers/',
 *      'performances' => 'https://it.api.avnode.net/.../program/',
 *      'partners'     => ...
 *      'videos'       => ...
 *      'galleries'    => ...
 *    ]
 *  ]
 */
function avnode_api_extract_avnode_advanced_from_content(string $content, string $lang = 'en'): array {
  $advanced = [];

  if (!preg_match_all('/\[avnode\s+([^\]]+)\]/i', $content, $matches)) {
	return ['advanced' => (object)[]];
  }

  foreach ($matches[1] as $raw) {
	$atts = shortcode_parse_atts($raw);
	if (empty($atts['source'])) continue;

	$src  = str_replace(']', '', (string)$atts['source']);
	$view = strtolower(trim((string)($atts['view'] ?? '')));

	// legacy "add" mapping (copied from old functions_rest_api.php logic)
	$add = '';
	if ($view === 'performances') $add = 'program/';
	if ($view === 'performers')   $add = 'performers/';
	if ($view === 'partners')     $add = 'partners/';
	if ($view === 'videos' || $view === 'videos</p>' || $view === 'videos]') $add = 'videos/';
	if ($view === 'gallery' || $view === 'gallery</p>' || $view === 'gallery]') $add = 'galleries/';

	// handle legacy flxer.net/api → api.avnode.net rebuild (old code did this)
	if (strpos($src, 'flxer.net') !== false) {
	  $src = str_replace('flxer.net/api', 'api.avnode.net', $src);
	  $parts = explode('/', $src);
	  // old: https://{host}/{site}/{edition}/{add}
	  // parts example: [0]=https:, [2]=api.avnode.net, [3]=..., [4]=site, [5]=edition
	  if (!empty($parts[2]) && !empty($parts[4]) && !empty($parts[5])) {
		$src = 'https://' . $parts[2] . '/' . $parts[4] . '/' . $parts[5] . '/' . $add;
	  }
	}

	// force it/en on *.api.avnode.net like legacy endpoints
	if (strpos($src, 'api.avnode.net') !== false) {
	  $src = preg_replace(
		'#https://(en|it)\.api\.avnode\.net/#',
		'https://' . $lang . '.api.avnode.net/',
		$src
	  );
	}

	// if "source" is already a final endpoint, still append $add if needed
	if ($add && substr($src, -strlen($add)) !== $add) {
	  // ensure trailing slash
	  if (substr($src, -1) !== '/') $src .= '/';
	  $src .= $add;
	}

	// map to keys Node expects
	if ($view === 'performers')   $advanced['performers']   = $src;
	if ($view === 'performances') $advanced['performances'] = $src;
	if ($view === 'partners')     $advanced['partners']     = $src;
	if (strpos($view, 'videos') === 0)   $advanced['videos']    = $src;
	if (strpos($view, 'gallery') === 0)  $advanced['galleries'] = $src;
  }

  // IMPORTANT: even if empty, return an object-ish to avoid JS undefined
  return [
	'advanced' => $advanced ? $advanced : (object)[],
  ];
}

function avnode_api_strip_avnode_shortcodes(string $html): string {
  // remove [avnode ...]
  $html = preg_replace('/\[avnode\s+[^\]]*\]/i', '', $html);

  // cleanup empty <p> created by removing shortcodes
  $html = preg_replace('#<p>\s*</p>#i', '', $html);

  return $html;
}

function avnode_api_collect_avnode_shortcode_hosts(int $post_id, string $content): array {
  $chunks = [$content];

  // Scan Toolset grid boxes too: wpcf-row-*-html-box + originals
  foreach (get_post_meta($post_id) as $k => $vals) {
	if (strpos($k, 'wpcf-row-') !== 0) continue;
	if (strpos($k, '-html-box') === false) continue;

	foreach ((array)$vals as $v) {
	  if (!is_string($v) || $v === '') continue;
	  $chunks[] = $v;
	}
  }

  return $chunks;
}

/**
 * Extract legacy [avnode source=...] URLs from post content.
 * Keeps language prefix consistent (it/en) like the old site.
 */
function avnode_api_extract_sources_from_content(string $content, string $lang = 'en'): array {
  $sources = [];

  if (preg_match_all('/\[avnode\s+([^\]]+)\]/i', $content, $matches)) {
	foreach ($matches[1] as $raw) {
	  $atts = shortcode_parse_atts($raw);
	  if (empty($atts['source'])) continue;

	  $src = str_replace(']', '', (string)$atts['source']);

	  // force legacy language in api.avnode.net URLs
	  if (strpos($src, 'api.avnode.net') !== false) {
		$src = preg_replace(
		  '#https://(en|it)\.api\.avnode\.net/#',
		  'https://' . $lang . '.api.avnode.net/',
		  $src
		);
	  }

	  if (!in_array($src, $sources, true)) {
		$sources[] = $src;
	  }
	}
  }

  return $sources;
}

/**
 * Legacy attachments: provided by WP Better Attachments when installed.
 * Returns an array of flat objects (ID, url, title, type).
 */
function avnode_api_get_better_attachments($post_id) {
   $post_id = (int) $post_id;
   if ($post_id <= 0) return [];
 
   if (!function_exists('wpba_get_attachments')) {
	 return [];
   }
 
   // WP Better Attachments API
   $items = wpba_get_attachments([
	 'post_id' => $post_id,
   ]);
 
   if (empty($items)) return [];
 
   // Normalize output to legacy-friendly array of objects
   $out = [];
 
   // Some versions may return objects/arrays/IDs. Normalize hard.
   if (is_object($items) && $items instanceof Traversable) {
	 $items = iterator_to_array($items);
   }
 
   foreach ((array)$items as $it) {
	 $aid = 0;
   
	 if (is_numeric($it)) {
	   $aid = (int)$it;
	 } elseif (is_object($it) && !empty($it->ID)) {
	   $aid = (int)$it->ID;
	 } elseif (is_array($it) && !empty($it['ID'])) {
	   $aid = (int)$it['ID'];
	 }
   
	 if ($aid <= 0) continue;
   
	 $url = wp_get_attachment_url($aid);
	 if (!$url) continue;
   
	 $out[] = [
	   'file'  => $url,                // 🔴 QUESTO È IL CAMPO CHIAVE
	   'title' => get_the_title($aid), // legacy-compatible
	 ];
   }
 
   return $out;
 }


function avnode_api_normalize_rest_params($data, $defaults = []) {
  if ($data instanceof WP_REST_Request) {
	$data = $data->get_params();
  }
  $base = [
	'site' => '',
	'edition' => '',
	'subedition' => '',
	'subsubedition' => '',
	'artist' => '',
	'gallery' => '',
	'galleryitem' => '',
	'performance' => '',
	'posttype' => '',
	'basepath' => '',
	'slug' => '',
  ];
  return wp_parse_args($data, array_merge($base, $defaults));
}

function avnode_api_get_image($post) {
  if (has_post_thumbnail($post['id'])) {
	$thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post['id']), 'thumbnail');
	$full  = wp_get_attachment_image_src(get_post_thumbnail_id($post['id']), 'full');
	return [
	  'thumbnail' => $thumb[0] ?? null,
	  'full'      => $full[0] ?? null,
	];
  }
  return ['thumbnail' => '', 'full' => ''];
}

function avnode_api_get_menu($res, $posttype, $lang = null) {
  $father = get_post($res->ID);
  if (!$father) return [];

  // LEGACY: base path is always /editions/{edition}/ (NOT /editions/{site}/{edition}/ and NOT /editions/{id}/)
  $basepath = '/editions/' . $father->post_name . '/';

  $title = $father->post_title;
  if ($lang) {
	if (function_exists('qtranxf_useLanguage')) {
	  $title = qtranxf_useLanguage($lang, $title, false);
	} elseif (function_exists('qtrans_use')) {
	  $title = qtrans_use($lang, $title);
	}
  }

  // FLAT menu (legacy): root first, then each child as a sibling; childs ALWAYS []
  $menu = [[
	'ID'          => $father->ID,
	'post_name'   => $father->post_name,
	'post_title'  => $title,
	'post_status' => $father->post_status,
	'permalink'   => $basepath,
	'img'         => avnode_api_get_image(['id' => $father->ID]),
	'childs'      => [],
  ]];

  $children = get_children([
	'post_parent' => $father->ID,
	'post_type'   => $posttype,
	'numberposts' => -1,
	'post_status' => ['publish','draft'],
	'orderby'     => 'menu_order',
	'order'       => 'ASC',
  ]);

  foreach ($children as $item) {
	$item_title = $item->post_title;
	if ($lang) {
	  if (function_exists('qtranxf_useLanguage')) {
		$item_title = qtranxf_useLanguage($lang, $item_title, false);
	  } elseif (function_exists('qtrans_use')) {
		$item_title = qtrans_use($lang, $item_title);
	  }
	}

	$menu[] = [
	  'ID'          => $item->ID,
	  'post_name'   => $item->post_name,
	  'post_title'  => $item_title,
	  'post_status' => $item->post_status,
	  'permalink'   => $basepath . $item->post_name . '/',
	  'childs'      => [], // IMPORTANT: never nest
	  'img'         => avnode_api_get_image(['id' => $item->ID]),
	];
  }

  return $menu;
}


/* ===== Meta helpers used by metaboxes ===== */

function avnode_parse_timestamp($ts) {
  $ts = is_numeric($ts) ? (int)$ts : 0;
  if ($ts <= 0) return ['date' => '', 'hour' => '00', 'minute' => '00'];

  $dt = new DateTime('@' . $ts);
  $dt->setTimezone(wp_timezone());
  return [
	'date' => $dt->format('Y-m-d'),
	'hour' => $dt->format('H'),
	'minute' => $dt->format('i'),
  ];
}

function avnode_update_or_delete_meta($post_id, $meta_key, $value) {
  $value = is_string($value) ? trim(wp_unslash($value)) : $value;

  if ($value === '' || $value === null) delete_post_meta($post_id, $meta_key);
  else update_post_meta($post_id, $meta_key, $value);
}

function avnode_replace_repeatable_meta_from_lines($post_id, $meta_key, $lines_text) {
  delete_post_meta($post_id, $meta_key);

  $lines_text = is_string($lines_text) ? $lines_text : '';
  $lines = preg_split("/\r\n|\n|\r/", $lines_text);
  $lines = array_values(array_filter(array_map('trim', $lines), fn($v) => $v !== ''));

  foreach ($lines as $line) add_post_meta($post_id, $meta_key, $line, false);
}

function avnode_build_timestamp_from_post($base_key) {
  $date = isset($_POST["{$base_key}__date"]) ? trim(wp_unslash($_POST["{$base_key}__date"])) : '';
  $hour = isset($_POST["{$base_key}__hour"]) ? trim(wp_unslash($_POST["{$base_key}__hour"])) : '00';
  $min  = isset($_POST["{$base_key}__minute"]) ? trim(wp_unslash($_POST["{$base_key}__minute"])) : '00';

  if ($date === '') return '';
  $dt = DateTime::createFromFormat('Y-m-d H:i', "{$date} {$hour}:{$min}", wp_timezone());
  if (!$dt) return '';

  return (string)$dt->getTimestamp();
}
