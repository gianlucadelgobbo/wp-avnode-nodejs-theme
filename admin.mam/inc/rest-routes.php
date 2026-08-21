<?php
if (!defined('ABSPATH')) exit;

function avnode_api_mypage_legacy(WP_REST_Request $request) {

  $site = sanitize_title($request->get_param('site'));
  $slug = sanitize_title($request->get_param('slug'));

  // 1) Detect language from URL prefix (legacy behavior)
  $lang = 'en';
  $uri = $_SERVER['REQUEST_URI'] ?? '';
  if (preg_match('#^/it/#', $uri)) $lang = 'it';

  // 2) Resolve page: {site}/{slug}
  $res = get_page_by_path($site . '/' . $slug, OBJECT, 'page');
  if (!$res) {
	return new WP_Error('not_found', 'Page not found', ['status' => 404]);
  }

  $p = get_post($res->ID);

  // 3) Content (NO shortcode execution)
  $title = html_entity_decode(apply_filters('the_title', $p->post_title));
  
  // IMPORTANT: keep shortcodes (do NOT strip [avnode...])
  $content = apply_filters('the_content', $p->post_content);
  $content = str_replace('<p></p>', '', $content);

  // 4) sources[] (legacy)
  $sources = function_exists('avnode_api_extract_sources_from_content')
	? avnode_api_extract_sources_from_content($content, $lang)
	: [];

  // 5) meta_description (legacy: strip tags, normalize spaces)
  $meta_description = trim(
	preg_replace(
	  '/\s+/',
	  ' ',
	  str_replace(chr(194).chr(160), ' ', strip_tags($content))
	)
  );

  // 6) Featured
  $featured = function_exists('avnode_api_get_image')
	? avnode_api_get_image(['id' => $p->ID])
	: ['thumbnail' => '', 'full' => ''];

  // 7) Attachments (WP Better Attachments)
  $attachments = function_exists('avnode_api_get_better_attachments')
	? avnode_api_get_better_attachments((int)$p->ID)
	: [];

  // 8) Flat legacy response
  $out = [
	'ID'                    => $p->ID,
	'post_name'             => $p->post_name,
	'date'                  => $p->post_date,
	'post_modified'         => $p->post_modified,
	'post_type'             => $p->post_type,
	'post_title'            => $title,
	'post_excerpt'          => $p->post_excerpt,
	'post_content'          => $content,
	'post_content_original' => $content,
	'meta_description'      => $meta_description,
	'featured'              => $featured,
	'attachments'           => $attachments,
	'sources'               => $sources,
  ];

  // 9) Add ALL meta (legacy: wpcf-* + others), excluding editor locks
  foreach (get_post_meta($p->ID) as $k => $vals) {
	if ($k === '_edit_lock' || $k === '_edit_last') continue;

	$v = get_post_meta($p->ID, $k, false);
	$out[$k] = count($v) <= 1 ? ($v[0] ?? '') : array_values($v);
  }

  return $out;
}





add_action('rest_api_init', function () {
  register_rest_route('wp/v2', '/mypages/(?P<site>[^/]+)/(?P<slug>[^/]+)/?', [
	'methods'  => 'GET',
	'callback' => 'avnode_api_mypage_legacy',
	'permission_callback' => '__return_true',
  ]);
});

/** meta_data */
function avnode_api_get_meta_data($request) {
  $metatags = get_option('flyer_opengraph_metatags_default');
  $data = ['meta' => $metatags ?: []];

  if (empty($data['meta']['name'])) $data['meta']['name'] = get_bloginfo('name');
  if (empty($data['meta']['description'])) $data['meta']['description'] = get_bloginfo('description');

  $data['meta']['logo_main']   = (get_option('opt_sam_logo') && get_option('opt_sam_use_logo')) ? get_option('opt_sam_logo') : get_bloginfo('name');
  $data['meta']['logo_bar']    = get_option('opt_sam_logo_bar') ?: ((get_option('opt_sam_logo') && get_option('opt_sam_use_logo')) ? get_option('opt_sam_logo') : get_bloginfo('name'));
  $data['meta']['logo_footer'] = (get_option('opt_sam_logo_footer') && get_option('opt_sam_use_logo_footer')) ? get_option('opt_sam_logo_footer') : get_bloginfo('name');

  return $data;
}

function avnode_api_get_meta_data_posttype($request) {
  $req = avnode_api_normalize_rest_params($request);

  $posttype = sanitize_key($req['posttype']);
  $basepath = sanitize_title($req['basepath']);
  $slug     = sanitize_title($req['slug']);

  $res = get_page_by_path($basepath.'/'.$slug, OBJECT, $posttype);
  if (!$res) return [];

  $father = get_post($res->ID);
  if (!$father) return [];

  $metatags = get_option('flyer_opengraph_metatags_default');

  $data = [
	'meta' => $metatags ?: [],
	'edition' => [
	  'ID'              => $father->ID,
	  'post_name'       => $father->post_name,
	  'post_title'      => $father->post_title,
	  'permalink'       => '/editions/'.$father->post_name.'/',
	  'wpcf-custom-css' => get_post_meta($father->ID, 'wpcf-custom-css'),
	  'data_evento'     => get_post_meta($father->ID, 'data_evento', true),
	  'wpcf-location'   => get_post_meta($father->ID, 'wpcf-location'),
	  'wpcf-startdate'  => get_post_meta($father->ID, 'wpcf-startdate', true),
	  'wpcf-enddate'    => get_post_meta($father->ID, 'wpcf-enddate', true),
	  'wpcf-link'       => get_post_meta($father->ID, 'wpcf-link', true),
	],
  ];

  $data['meta']['edition'] = [
	'title'                 => $father->post_title,
	'wpcf-sub-title'        => get_post_meta($father->ID, 'wpcf-sub-title', true),
	'wpcf-header-image'     => get_post_meta($father->ID, 'wpcf-header-image', true),
	'wpcf-sub-title-image'  => get_post_meta($father->ID, 'wpcf-sub-title-image', true),
	'wpcf-background-image' => get_post_meta($father->ID, 'wpcf-background-image', true),
	'data_evento'           => get_post_meta($father->ID, 'data_evento', true),
	'wpcf-startdate'        => get_post_meta($father->ID, 'wpcf-startdate', true),
	'wpcf-enddate'          => get_post_meta($father->ID, 'wpcf-enddate', true),
	'wpcf-link'             => get_post_meta($father->ID, 'wpcf-link', true),
	'wpcf-location'         => get_post_meta($father->ID, 'wpcf-location'),
	'menu' => [
   	  'en' => avnode_api_get_menu($res, $posttype, 'en'),
	  'it' => avnode_api_get_menu($res, $posttype, 'it'),
	],
  ];

  return $data;
}

/** editions endpoint */
function edition_by_slug($request) {
  $req = avnode_api_normalize_rest_params($request);
  $posttype = 'editions';

  // -----------------------------
  // 1) Build hierarchical path
  // -----------------------------
  $segments = array_values(array_filter([
	sanitize_title($req['site'] ?? ''),
	sanitize_title($req['edition'] ?? ''),
	sanitize_title($req['subedition'] ?? ''),
	sanitize_title($req['subsubedition'] ?? ''),
  ], fn($v) => $v !== ''));

  if (count($segments) < 2) {
	return new WP_Error('bad_request', 'Missing site/edition', ['status' => 400]);
  }

  $path = implode('/', $segments);

  // -----------------------------
  // 2) Resolve post by path (+ "detail" fallback)
  // -----------------------------
  $res = get_page_by_path($path, OBJECT, $posttype);

  // legacy: ignore trailing "detail"/"details"
  if (!$res && count($segments) >= 3) {
	$last = end($segments);
	if (in_array($last, ['detail','details'], true)) {
	  array_pop($segments);
	  $path = implode('/', $segments);
	  $res = get_page_by_path($path, OBJECT, $posttype);
	}
  }

  if (!$res) {
	return new WP_Error('not_found', 'Invalid edition path', ['status' => 404]);
  }

  $p = get_post($res->ID);
  $lang = function_exists('avnode_api_detect_lang') ? avnode_api_detect_lang() : 'en';

  // -----------------------------
  // 3) Title / Content (qTranslate + legacy formatting)
  // -----------------------------
  $title = html_entity_decode(apply_filters('the_title', $p->post_title));

  // IMPORTANT: keep shortcodes (do NOT strip [avnode...])
  $content = apply_filters('the_content', $p->post_content);
  $content = str_replace('<p></p>', '', $content);

  // -----------------------------
  // 4) Featured image (always an object like legacy)
  // -----------------------------
  $featured = function_exists('avnode_api_get_image')
	? (avnode_api_get_image(['id' => $p->ID]) ?: ['thumbnail' => '', 'full' => ''])
	: ['thumbnail' => '', 'full' => ''];

  // -----------------------------
  // 5) meta_description (legacy style)
  // -----------------------------
  $meta_description = trim(
	preg_replace('/\s+/', ' ',
	  str_replace(chr(194).chr(160), ' ', strip_tags($content))
	)
  );

  // -----------------------------
  // 6) Base output (legacy keys)
  // -----------------------------
  $out = [
	'ID'                    => $p->ID,
	'post_name'             => $p->post_name,
	'post_title'            => $title,
	'post_content_original' => $content,
	'post_content'          => $content,
	'featured'              => $featured,
	'meta_description'      => $meta_description,
  ];

  // -----------------------------
  // 7) Add ALL meta flat (keep wpcf-* identical)
  // -----------------------------
  foreach (get_post_meta($p->ID) as $k => $vals) {
	if ($k === '_edit_lock' || $k === '_edit_last') continue;
	$v = get_post_meta($p->ID, $k, false);
	$out[$k] = count($v) <= 1 ? ($v[0] ?? '') : array_values($v);
  }

  // -----------------------------
  // 8) Toolset grid: add -original fields (legacy behavior)
  //    If WP stored html-box with wpautop already, keep it.
  // -----------------------------
  foreach ($out as $k => $v) {
	if (!is_string($v) || $v === '') continue;

	// Only for Toolset boxes
	if (preg_match('/^(wpcf-row-\d+-col-\d+-html-box)$/', $k, $m)) {
	  $raw = trim($v);

	  // If it looks like WP wrapped it in <p>...</p>, recover a "raw" version
	  // (legacy expects "-original" to be the shortcode line without <p>)
	  $raw_unwrapped = preg_replace('#^\s*<p>\s*#i', '', $raw);
	  $raw_unwrapped = preg_replace('#\s*</p>\s*$#i', '', $raw_unwrapped);

	  $out[$k . '-original'] = $raw_unwrapped;

	  // Ensure the rendered version matches legacy style (wpautop around shortcode line)
	  // but do not execute shortcode.
	  $out[$k] = wpautop($raw_unwrapped);
	}
  }

  // -----------------------------
  // 9) Attachments (WP Better Attachments)
  // -----------------------------
  $out['attachments'] = function_exists('avnode_api_get_better_attachments')
	? avnode_api_get_better_attachments($p->ID)
	: [];

// -----------------------------
	// 10) sources (legacy logic)
	//     priority:
	//     1) explicit meta field if exists
	//     2) post_content
	//     3) Toolset grid boxes
	// -----------------------------
	
	$sources = [];
	$lang = function_exists('avnode_api_detect_lang') ? avnode_api_detect_lang() : 'en';
	
	/**
	 * 1) Explicit sources field (legacy)
	 * could be:
	 * - sources
	 * - wpcf-sources
	 */
	if (!empty($out['sources']) && is_string($out['sources'])) {
	  $sources = array_merge(
		$sources,
		avnode_api_extract_sources_from_content($out['sources'], $lang)
	  );
	}
	
	if (!empty($out['wpcf-sources']) && is_string($out['wpcf-sources'])) {
	  $sources = array_merge(
		$sources,
		avnode_api_extract_sources_from_content($out['wpcf-sources'], $lang)
	  );
	}
	
	/**
	 * 2) From main content
	 */
	if (!empty($out['post_content_original'])) {
	  $sources = array_merge(
		$sources,
		avnode_api_extract_sources_from_content($out['post_content_original'], $lang)
	  );
	} elseif (!empty($out['post_content'])) {
	  $sources = array_merge(
		$sources,
		avnode_api_extract_sources_from_content($out['post_content'], $lang)
	  );
	}
	
	/**
	 * 3) From Toolset grid boxes
	 */
	foreach ($out as $k => $v) {
	  if (!is_string($v) || $v === '') continue;
	
	  if (preg_match('/^wpcf-row-\d+-col-\d+-html-box(-original)?$/', $k)) {
		$sources = array_merge(
		  $sources,
		  avnode_api_extract_sources_from_content($v, $lang)
		);
	  }
	}
	
	// normalize
	$sources = array_values(array_unique(array_filter($sources)));
	
	// legacy output: string OR array (keep array, Node can handle it)
	$out['sources'] = $sources ?: '';
	
    return $out;
}

add_action('rest_api_init', function () {

  register_rest_route('wp/v2', '/meta_data/(?P<posttype>[a-zA-Z0-9-_]+)/(?P<basepath>[a-zA-Z0-9-_]+)/(?P<slug>[a-zA-Z0-9-_]+)', [
	'methods'  => 'GET',
	'callback' => 'avnode_api_get_meta_data_posttype',
	'permission_callback' => '__return_true',
  ]);

  register_rest_route('wp/v2', '/meta_data/', [
	'methods'  => 'GET',
	'callback' => 'avnode_api_get_meta_data',
	'permission_callback' => '__return_true',
  ]);

  register_rest_route('wp/v2', '/editions/(?P<site>[a-zA-Z0-9-_]+)/(?P<edition>[a-zA-Z0-9-_]+)', [
	'methods' => 'GET',
	'callback' => 'edition_by_slug',
	'permission_callback' => '__return_true',
  ]);

  register_rest_route('wp/v2', '/editions/(?P<site>[a-zA-Z0-9-_]+)/(?P<edition>[a-zA-Z0-9-_]+)/(?P<subedition>[a-zA-Z0-9-_]+)', [
	'methods' => 'GET',
	'callback' => 'edition_by_slug',
	'permission_callback' => '__return_true',
  ]);

  register_rest_route('wp/v2', '/editions/(?P<site>[a-zA-Z0-9-_]+)/(?P<edition>[a-zA-Z0-9-_]+)/(?P<subedition>[a-zA-Z0-9-_]+)/(?P<subsubedition>[a-zA-Z0-9-_]+)', [
	'methods' => 'GET',
	'callback' => 'edition_by_slug',
	'permission_callback' => '__return_true',
  ]);

});
