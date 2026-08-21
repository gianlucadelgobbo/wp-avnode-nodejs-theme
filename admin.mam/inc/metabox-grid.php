<?php
if (!defined('ABSPATH')) exit;

// ================================
// Editions Grid Builder (Toolset-like UI)
// - Meta boxes:
//   - Grid Settings
//   - Add grid
//   - Row X Column Y (with Title, Subtitle, HTML WYSIWYG)
// - Keeps legacy meta keys unchanged
// ================================

add_action('add_meta_boxes', function () {

  // 1) Grid Settings
  add_meta_box(
	'avnode_editions_grid_settings',
	'Grid Settings',
	'avnode_render_editions_grid_settings_metabox',
	'editions',
	'normal',
	'high'
  );

  // 2) Add grid
  add_meta_box(
	'avnode_editions_add_grid',
	'Add grid',
	'avnode_render_editions_add_grid_metabox',
	'editions',
	'normal',
	'high'
  );

  // 3) One meta box per cell (max 5x4)
  $max_rows = 5;
  $max_cols = 4;

  for ($r = 1; $r <= $max_rows; $r++) {
	for ($c = 1; $c <= $max_cols; $c++) {
	  $id = "avnode_editions_cell_r{$r}_c{$c}";
	  $title = "Row {$r} Column {$c}";
	  add_meta_box(
		$id,
		$title,
		function($post) use ($r, $c) { avnode_render_editions_cell_metabox($post, $r, $c); },
		'editions',
		'normal',
		'default'
	  );
	}
  }
});

// Ensure media + editor assets for metabox WYSIWYG
add_action('admin_enqueue_scripts', function($hook) {
  if ($hook !== 'post.php' && $hook !== 'post-new.php') return;

  $screen = function_exists('get_current_screen') ? get_current_screen() : null;
  if (!$screen || $screen->post_type !== 'editions') return;

  wp_enqueue_media();
});

// ---------- Meta box renderers ----------

function avnode_render_editions_grid_settings_metabox($post) {
  wp_nonce_field('avnode_save_editions_grid', 'avnode_editions_grid_nonce');

  $rows   = (int) get_post_meta($post->ID, 'wpcf-rows', true);
  $cols   = (int) get_post_meta($post->ID, 'wpcf-columns', true);
  $same_h = get_post_meta($post->ID, 'wpcf-same-rows-height', true);

  if ($rows <= 0) $rows = 2;
  if ($cols <= 0) $cols = 4;

  $max_rows = 5;
  $max_cols = 4;

  echo '<p style="margin-top:0;color:#666">Keeps legacy Toolset meta keys (wpcf-*) for NodeJS/API compatibility.</p>';

  echo '<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">';

  echo '<label style="display:flex;align-items:center;gap:8px;">';
  printf('<input type="checkbox" name="wpcf-same-rows-height" value="1" %s>', checked($same_h, '1', false));
  echo '<span>Use the same rows height</span>';
  echo '</label>';

  echo '<label style="display:flex;align-items:center;gap:8px;">';
  echo '<span>Number of columns</span>';
  echo '<select name="wpcf-columns">';
  for ($c=1;$c<=$max_cols;$c++) {
	printf('<option value="%d" %s>%d</option>', $c, selected($cols, $c, false), $c);
  }
  echo '</select>';
  echo '</label>';

  echo '<label style="display:flex;align-items:center;gap:8px;">';
  echo '<span>Number of rows</span>';
  echo '<select name="wpcf-rows">';
  for ($r=1;$r<=$max_rows;$r++) {
	printf('<option value="%d" %s>%d</option>', $r, selected($rows, $r, false), $r);
  }
  echo '</select>';
  echo '</label>';

  echo '</div>';

  ?>
  <script>
	(function(){
	  function toggleBoxes(){
		var rows = parseInt(document.querySelector('select[name="wpcf-rows"]').value || '2', 10);
		var cols = parseInt(document.querySelector('select[name="wpcf-columns"]').value || '4', 10);

		var boxes = document.querySelectorAll('[id^="avnode_editions_cell_r"][id*="_c"]');
		boxes.forEach(function(box){
		  var m = box.id.match(/_r(\d+)_c(\d+)/);
		  if (!m) return;
		  var r = parseInt(m[1], 10);
		  var c = parseInt(m[2], 10);
		  box.style.display = (r <= rows && c <= cols) ? '' : 'none';
		});
	  }
	  document.addEventListener('DOMContentLoaded', function(){
		var rSel = document.querySelector('select[name="wpcf-rows"]');
		var cSel = document.querySelector('select[name="wpcf-columns"]');
		if (rSel) rSel.addEventListener('change', toggleBoxes);
		if (cSel) cSel.addEventListener('change', toggleBoxes);
		toggleBoxes();
	  });
	})();
  </script>
  <?php
}

function avnode_render_editions_add_grid_metabox($post) {
  $add_grid = get_post_meta($post->ID, 'wpcf-add-grid-boxes', true);

  echo '<label style="display:flex;align-items:center;gap:8px;">';
  printf('<input type="checkbox" name="wpcf-add-grid-boxes" value="1" %s>', checked($add_grid, '1', false));
  echo '<span>Add grid boxes?</span>';
  echo '</label>';
}

function avnode_render_editions_cell_metabox($post, $r, $c) {
  $k_title = "wpcf-row-{$r}-col-{$c}-title";
  $k_sub   = "wpcf-row-{$r}-col-{$c}-subtitle";
  $k_html  = "wpcf-row-{$r}-col-{$c}-html-box";

  $v_title = get_post_meta($post->ID, $k_title, true);
  $v_sub   = get_post_meta($post->ID, $k_sub, true);
  $v_html  = get_post_meta($post->ID, $k_html, true);

  echo '<p style="margin-top:0;color:#666"><code>' . esc_html("{$k_title} / {$k_sub} / {$k_html}") . '</code></p>';

  echo '<p><label style="font-weight:600;display:block;margin-bottom:6px;">Title</label>';
  printf('<input type="text" name="%s" value="%s" class="regular-text" style="width:100%%;">', esc_attr($k_title), esc_attr($v_title));
  echo '</p>';

  echo '<p><label style="font-weight:600;display:block;margin-bottom:6px;">Subtitle</label>';
  printf('<input type="text" name="%s" value="%s" class="regular-text" style="width:100%%;">', esc_attr($k_sub), esc_attr($v_sub));
  echo '</p>';

  echo '<p><label style="font-weight:600;display:block;margin-bottom:6px;">Html box</label></p>';

  $editor_id = "avnode_cell_r{$r}_c{$c}_html";
  $settings = [
	'textarea_name' => $k_html,
	'textarea_rows' => 8,
	'media_buttons' => true,
	'teeny'         => false,
	'quicktags'     => true,
  ];

  wp_editor($v_html, $editor_id, $settings);

  echo '<p style="margin-top:8px;color:#666">Shortcodes like <code>[avnode ...]</code> are supported.</p>';
}

// ---------- Save handler ----------

add_action('save_post_editions', function ($post_id) {
  if (!isset($_POST['avnode_editions_grid_nonce']) || !wp_verify_nonce($_POST['avnode_editions_grid_nonce'], 'avnode_save_editions_grid')) return;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
  if (!current_user_can('edit_post', $post_id)) return;

  $max_rows = 5;
  $max_cols = 4;

  $add_grid = isset($_POST['wpcf-add-grid-boxes']) ? '1' : '0';
  $same_h   = isset($_POST['wpcf-same-rows-height']) ? '1' : '0';

  $rows = isset($_POST['wpcf-rows']) ? (int) $_POST['wpcf-rows'] : 2;
  $cols = isset($_POST['wpcf-columns']) ? (int) $_POST['wpcf-columns'] : 4;

  $rows = max(1, min($max_rows, $rows));
  $cols = max(1, min($max_cols, $cols));

  update_post_meta($post_id, 'wpcf-add-grid-boxes', $add_grid);
  update_post_meta($post_id, 'wpcf-same-rows-height', $same_h);
  update_post_meta($post_id, 'wpcf-rows', (string)$rows);
  update_post_meta($post_id, 'wpcf-columns', (string)$cols);

  for ($r = 1; $r <= $max_rows; $r++) {
	for ($c = 1; $c <= $max_cols; $c++) {
	  foreach (['title','subtitle','html-box'] as $suffix) {
		$key = "wpcf-row-{$r}-col-{$c}-{$suffix}";

		$val = isset($_POST[$key]) ? wp_unslash($_POST[$key]) : '';
		$val = is_string($val) ? trim($val) : '';

		if ($suffix === 'html-box') $val = wp_kses_post($val);
		else $val = sanitize_text_field($val);

		if ($val === '') delete_post_meta($post_id, $key);
		else update_post_meta($post_id, $key, $val);
	  }
	}
  }
});
