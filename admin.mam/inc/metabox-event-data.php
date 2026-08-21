<?php
if (!defined('ABSPATH')) exit;

/**
 * Event data meta box for post_type = editions
 * - Theme-only replacement of Toolset UI
 * - Keeps legacy meta keys (wpcf-*) unchanged for NodeJS/API compatibility
 *
 * Keys handled:
 * - wpcf-sources (single string)  [textarea]
 * - wpcf-location (repeatable)    [textarea lines: venue;city;country;lat;lng]
 * - data_evento (text)
 * - wpcf-startdate (unix timestamp) + hour/minute
 * - wpcf-enddate (unix timestamp)   + hour/minute
 * - wpcf-header-image (url)
 * - wpcf-custom-css (url)
 * - wpcf-background-image (url)
 * - wpcf-sub-title (text)
 * - wpcf-sub-title-image (url)
 */

add_action('add_meta_boxes', function () {
  add_meta_box(
	'avnode_editions_event_data',
	'Event data',
	'avnode_render_editions_event_data_metabox',
	'editions',
	'normal',
	'high'
  );
});

add_action('admin_enqueue_scripts', function ($hook) {
  if ($hook !== 'post.php' && $hook !== 'post-new.php') return;

  $screen = function_exists('get_current_screen') ? get_current_screen() : null;
  if (!$screen || $screen->post_type !== 'editions') return;

  // Needed for media buttons
  wp_enqueue_media();
});

function avnode_render_editions_event_data_metabox($post) {
  wp_nonce_field('avnode_save_editions_event_data', 'avnode_editions_event_data_nonce');

  // Sources: SINGLE value
  $source = get_post_meta($post->ID, 'wpcf-sources', true);

  // Location: repeatable rows
  $location = get_post_meta($post->ID, 'wpcf-location', false);

  $data_evento      = get_post_meta($post->ID, 'data_evento', true);
  $start_ts         = get_post_meta($post->ID, 'wpcf-startdate', true);
  $end_ts           = get_post_meta($post->ID, 'wpcf-enddate', true);

  $header_image     = get_post_meta($post->ID, 'wpcf-header-image', true);
  $custom_css       = get_post_meta($post->ID, 'wpcf-custom-css', true);
  $background_image = get_post_meta($post->ID, 'wpcf-background-image', true);
  $sub_title        = get_post_meta($post->ID, 'wpcf-sub-title', true);
  $sub_title_image  = get_post_meta($post->ID, 'wpcf-sub-title-image', true);
  $link             = get_post_meta($post->ID, 'wpcf-link', true);

  $location_text = implode("\n", array_filter(array_map('trim', (array)$location)));

  $start = function_exists('avnode_parse_timestamp') ? avnode_parse_timestamp($start_ts) : ['date'=>'','hour'=>'00','minute'=>'00'];
  $end   = function_exists('avnode_parse_timestamp') ? avnode_parse_timestamp($end_ts) : ['date'=>'','hour'=>'00','minute'=>'00'];
  ?>
  <style>
	.avnode-row { margin: 10px 0 16px; }
	.avnode-label { display:block; font-weight:600; margin-bottom:6px; }
	.avnode-help { color:#666; font-size:12px; margin-top:6px; }
	.avnode-inline { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
	.avnode-inline input[type="text"] { min-width: 280px; }
	.avnode-url { width: 70%; min-width: 320px; }
	.avnode-btn { margin-left: 6px; }
	.avnode-sep { height:1px; background:#e5e5e5; margin: 16px 0; }
  </style>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-sources">Sources</label>
	<textarea id="wpcf-sources" name="wpcf-sources" rows="1" style="width:100%; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;"><?php
	  echo esc_textarea(is_string($source) ? $source : '');
	?></textarea>
	<div class="avnode-help">Single value stored in <code>wpcf-sources</code>.</div>
  </div>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-location">Location</label>
	<textarea id="wpcf-location" name="wpcf-location__lines" rows="3" style="width:100%; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;"><?php
	  echo esc_textarea($location_text);
	?></textarea>
	<div class="avnode-help">Format per line: <code>venue;city;country;latitude;longitude</code>. Stored as repeatable <code>wpcf-location</code> rows.</div>
  </div>

  <div class="avnode-row">
	<label class="avnode-label" for="data_evento">Event date</label>
	<input type="text" id="data_evento" name="data_evento" value="<?php echo esc_attr($data_evento); ?>" style="width:100%;" placeholder="Free text, e.g. 4 > 19 OTTOBRE 2025">
  </div>

  <div class="avnode-sep"></div>

  <div class="avnode-row">
	<label class="avnode-label">Start Date</label>
	<?php avnode_render_date_time_controls('wpcf-startdate', $start); ?>
  </div>

  <div class="avnode-row">
	<label class="avnode-label">End Date</label>
	<?php avnode_render_date_time_controls('wpcf-enddate', $end); ?>
  </div>

  <div class="avnode-sep"></div>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-header-image">Header image</label>
	<?php avnode_render_media_url_field('wpcf-header-image', $header_image, true); ?>
  </div>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-custom-css">Custom CSS</label>
	<?php avnode_render_media_url_field('wpcf-custom-css', $custom_css, false); ?>
	<div class="avnode-help">Typically a URL to a CSS file.</div>
  </div>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-background-image">Background image</label>
	<?php avnode_render_media_url_field('wpcf-background-image', $background_image, true); ?>
  </div>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-sub-title">Sub-Title</label>
	<input type="text" id="wpcf-sub-title" name="wpcf-sub-title" value="<?php echo esc_attr($sub_title); ?>" style="width:100%;">
  </div>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-sub-title-image">Sub-Title Image</label>
	<?php avnode_render_media_url_field('wpcf-sub-title-image', $sub_title_image, true); ?>
  </div>

  <div class="avnode-sep"></div>

  <div class="avnode-row">
	<label class="avnode-label" for="wpcf-link">Link</label>
	<input type="text" id="wpcf-link" name="wpcf-link" value="<?php echo esc_attr(is_string($link) ? $link : ''); ?>" style="width:100%;" placeholder="https://... or /internal/path/">
	<div class="avnode-help">URL esterno o path interno per questa edizione (restituito come <code>wpcf-link</code> via REST API).</div>
  </div>

  <script>
	(function($){
	  function bindMediaButton(btn){
		btn.on('click', function(e){
		  e.preventDefault();
		  var target = $(this).data('target');
		  var isImage = $(this).data('image') === 1;

		  if (typeof wp === 'undefined' || !wp.media) {
			alert('WordPress media library not available.');
			return;
		  }

		  var frame = wp.media({
			title: isImage ? 'Select image' : 'Select file',
			button: { text: 'Use this' },
			multiple: false,
			library: isImage ? { type: 'image' } : {}
		  });

		  frame.on('select', function(){
			var att = frame.state().get('selection').first().toJSON();
			$('#' + target).val(att.url).trigger('change');
		  });

		  frame.open();
		});
	  }

	  $(function(){
		bindMediaButton($('.avnode-media-btn'));
		$('.avnode-clear-btn').on('click', function(e){
		  e.preventDefault();
		  var target = $(this).data('target');
		  $('#' + target).val('').trigger('change');
		});
	  });
	})(jQuery);
  </script>
  <?php
}

/**
 * UI helpers (kept here to make this file standalone)
 */
function avnode_render_date_time_controls($base_key, $parsed) {
  $date = $parsed['date'] ?? '';
  $hour = $parsed['hour'] ?? '00';
  $min  = $parsed['minute'] ?? '00';

  echo '<div class="avnode-inline">';
  printf('<input type="date" name="%s__date" value="%s">', esc_attr($base_key), esc_attr($date));

  echo '<span>Hour</span>';
  printf('<select name="%s__hour">', esc_attr($base_key));
  for ($h=0; $h<=23; $h++) {
	$hh = str_pad((string)$h, 2, '0', STR_PAD_LEFT);
	printf('<option value="%s" %s>%s</option>', esc_attr($hh), selected($hour, $hh, false), esc_html($hh));
  }
  echo '</select>';

  echo '<span>Minute</span>';
  printf('<select name="%s__minute">', esc_attr($base_key));
  for ($m=0; $m<=59; $m++) {
	$mm = str_pad((string)$m, 2, '0', STR_PAD_LEFT);
	printf('<option value="%s" %s>%s</option>', esc_attr($mm), selected($min, $mm, false), esc_html($mm));
  }
  echo '</select>';

  echo '<a href="#" class="button" onclick="event.preventDefault(); this.closest(\'.avnode-inline\').querySelector(\'input[type=date]\').value=\'\'; return false;">Clear</a>';
  echo '</div>';
}

function avnode_render_media_url_field($key, $value, $is_image) {
  $is_image_flag = $is_image ? 1 : 0;

  echo '<div class="avnode-inline">';
  printf(
	'<input type="text" id="%s" name="%s" class="avnode-url" value="%s" placeholder="https://...">',
	esc_attr($key),
	esc_attr($key),
	esc_attr(is_string($value) ? $value : '')
  );

  printf(
	'<button class="button avnode-media-btn avnode-btn" data-target="%s" data-image="%d">%s</button>',
	esc_attr($key),
	(int)$is_image_flag,
	esc_html($is_image ? 'Select image' : 'Select file')
  );

  printf(
	'<button class="button avnode-clear-btn avnode-btn" data-target="%s">Clear</button>',
	esc_attr($key)
  );
  echo '</div>';
}

/**
 * Save handler
 */
add_action('save_post_editions', function ($post_id) {
  if (!isset($_POST['avnode_editions_event_data_nonce']) || !wp_verify_nonce($_POST['avnode_editions_event_data_nonce'], 'avnode_save_editions_event_data')) return;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
  if (!current_user_can('edit_post', $post_id)) return;

  // Sources: single string
  if (function_exists('avnode_update_or_delete_meta')) {
	avnode_update_or_delete_meta($post_id, 'wpcf-sources', $_POST['wpcf-sources'] ?? '');
  } else {
	update_post_meta($post_id, 'wpcf-sources', sanitize_textarea_field(wp_unslash($_POST['wpcf-sources'] ?? '')));
  }

  // Location: repeatable lines -> multiple meta rows
  if (function_exists('avnode_replace_repeatable_meta_from_lines')) {
	avnode_replace_repeatable_meta_from_lines($post_id, 'wpcf-location', $_POST['wpcf-location__lines'] ?? '');
  } else {
	delete_post_meta($post_id, 'wpcf-location');
	$lines = preg_split("/\r\n|\n|\r/", (string)($_POST['wpcf-location__lines'] ?? ''));
	foreach ($lines as $line) {
	  $line = trim(wp_unslash($line));
	  if ($line !== '') add_post_meta($post_id, 'wpcf-location', $line, false);
	}
  }

  // Simple text
  if (function_exists('avnode_update_or_delete_meta')) {
	avnode_update_or_delete_meta($post_id, 'data_evento', $_POST['data_evento'] ?? '');
  } else {
	update_post_meta($post_id, 'data_evento', sanitize_text_field(wp_unslash($_POST['data_evento'] ?? '')));
  }

  // Timestamps from date+hour+minute
  $start_ts = function_exists('avnode_build_timestamp_from_post') ? avnode_build_timestamp_from_post('wpcf-startdate') : '';
  $end_ts   = function_exists('avnode_build_timestamp_from_post') ? avnode_build_timestamp_from_post('wpcf-enddate') : '';

  if (function_exists('avnode_update_or_delete_meta')) {
	avnode_update_or_delete_meta($post_id, 'wpcf-startdate', $start_ts);
	avnode_update_or_delete_meta($post_id, 'wpcf-enddate', $end_ts);
  } else {
	if ($start_ts === '') delete_post_meta($post_id, 'wpcf-startdate'); else update_post_meta($post_id, 'wpcf-startdate', $start_ts);
	if ($end_ts === '') delete_post_meta($post_id, 'wpcf-enddate'); else update_post_meta($post_id, 'wpcf-enddate', $end_ts);
  }

  // URLs + text
  $url_keys = [
	'wpcf-header-image',
	'wpcf-custom-css',
	'wpcf-background-image',
	'wpcf-sub-title-image',
  ];

  foreach ($url_keys as $k) {
	$v = isset($_POST[$k]) ? trim(wp_unslash($_POST[$k])) : '';
	if ($v === '') delete_post_meta($post_id, $k);
	else update_post_meta($post_id, $k, esc_url_raw($v));
  }

  $sub_title = isset($_POST['wpcf-sub-title']) ? trim(wp_unslash($_POST['wpcf-sub-title'])) : '';
  if ($sub_title === '') delete_post_meta($post_id, 'wpcf-sub-title');
  else update_post_meta($post_id, 'wpcf-sub-title', sanitize_text_field($sub_title));

  $link = isset($_POST['wpcf-link']) ? trim(wp_unslash($_POST['wpcf-link'])) : '';
  if ($link === '') delete_post_meta($post_id, 'wpcf-link');
  else update_post_meta($post_id, 'wpcf-link', sanitize_text_field($link));
});
