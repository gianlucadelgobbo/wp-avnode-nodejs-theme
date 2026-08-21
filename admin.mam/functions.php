<?php
if (!defined('ABSPATH')) exit;

define('AVNODE_API_THEME_DIR', __DIR__);
define('AVNODE_API_INC_DIR', __DIR__ . '/inc');

add_action('after_setup_theme', function () {
  add_theme_support('post-thumbnails');
});


require_once AVNODE_API_INC_DIR . '/cpt-editions.php';
require_once AVNODE_API_INC_DIR . '/helpers.php';
require_once AVNODE_API_INC_DIR . '/rest-routes.php';
require_once AVNODE_API_INC_DIR . '/redirect.php';
require_once AVNODE_API_INC_DIR . '/metabox-event-data.php';
require_once AVNODE_API_INC_DIR . '/metabox-grid.php';

// 1. Aggiungi iframe ai tag permessi globalmente
add_filter('wp_kses_allowed_html', function($tags, $context) {
    if ($context === 'post') {
        $tags['iframe'] = array(
            'src'             => true,
            'width'           => true,
            'height'          => true,
            'frameborder'     => true,
            'allowfullscreen' => true,
            'allow'           => true,
            'title'           => true,
            'class'           => true,
            'style'           => true,
        );
    }
    return $tags;
}, 10, 2);

// 2. Risalva tutti i campi Toolset senza sanitizzazione aggressiva
add_action('save_post', function($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (!isset($_POST['wpcf'])) return;

    foreach ($_POST['wpcf'] as $key => $value) {
        if (is_array($value)) continue;
        update_post_meta($post_id, 'wpcf-' . $key, wp_unslash($value));
    }
}, 99);

// 3. Descrizione nativa WP
add_filter('content_save_pre', function($value) {
    return wp_unslash(wp_kses_post($value));
});
