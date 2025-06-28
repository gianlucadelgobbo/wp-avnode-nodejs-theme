/**
 * Modern Shortcode Parser
 * Replaces the old shortcode-parser package
 */

class ShortcodeParser {
  constructor() {
    this.shortcodes = new Map();
  }

  /**
   * Add a shortcode handler
   * @param {string} name - Shortcode name
   * @param {function} handler - Function to process the shortcode
   */
  add(name, handler) {
    this.shortcodes.set(name, handler);
  }

  /**
   * Parse shortcodes in text
   * @param {string} text - Text containing shortcodes
   * @returns {string} - Text with shortcodes replaced
   */
  parse(text) {
    if (!text || typeof text !== 'string') {
      return text;
    }

    // Regex to match shortcodes: [name attr='value' attr2='value2']
    const shortcodeRegex = /\[([a-zA-Z0-9_-]+)([^\]]*)\]/g;
    
    return text.replace(shortcodeRegex, (match, name, attributes) => {
      const handler = this.shortcodes.get(name);
      if (!handler) {
        return match; // Return original if no handler found
      }

      // Parse attributes
      const opts = this.parseAttributes(attributes);
      
      // Call the handler
      return handler('', opts) || '';
    });
  }

  /**
   * Parse shortcode attributes
   * @param {string} attributes - Attribute string
   * @returns {object} - Parsed attributes
   */
  parseAttributes(attributes) {
    const opts = {};
    if (!attributes) {
      return opts;
    }
    // Regex to match key='value', key="value", or key=value (unquoted)
    const attrRegex = /(\w+)=('([^']*)'|"([^"]*)"|([^\s]+))/g;
    let match;
    while ((match = attrRegex.exec(attributes)) !== null) {
      const key = match[1];
      const value = match[3] || match[4] || match[5] || '';
      opts[key] = value;
    }
    return opts;
  }
}

module.exports = ShortcodeParser; 