var helpers = require('../../helpers/helpers');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var WPAPI = require( 'wpapi' );
    //console.log("getMeta");
    meta = {};
    conta = [];
    if (!req.query.generate){
      res.render("_partials/meta_test", {meta:config.meta.editions});
    } else {
      getMetaSingle(config.editions[conta.length],req);
      function getMetaSingle(val,req) {
        var locales = config.locales;
        var localeResults = {};
        var pending = locales.length;
        locales.forEach(function(locale) {
          var endpoint = config.data_domain+(locale!=config.default_lang ? '/'+locale : '')+'/wp-json';
          console.log("getMetaSingle ["+locale+"] "+endpoint+'/wp/v2/meta_data/editions/'+config.prefix+'/'+val);
          var wp = new WPAPI({ endpoint: endpoint });
          wp.myCustomResource = wp.registerRoute( 'wp/v2', '/meta_data/(?P<sez>)/(?P<edition>)' );
          wp.myCustomResource().edition(config.prefix+'/'+val).sez("editions").get(function( err, data ) {
            if (data && data.meta && data.meta.edition) localeResults[locale] = data.meta.edition;
            pending--;
            if (pending===0) {
              // base data from default lang
              var base = localeResults[config.default_lang] || localeResults[locales[0]];
              meta[val] = Object.assign({}, base);
              // override menu[locale] with per-locale fetch
              meta[val].menu = {};
              locales.forEach(function(loc) {
                var src = localeResults[loc] || base;
                meta[val].menu[loc] = src && src.menu && src.menu[loc] ? src.menu[loc] : (base && base.menu ? base.menu[loc] : []);
              });
              conta.push(val);
              if (conta.length==config.editions.length) {
                if (req.query.check){
                  res.render("_partials/meta_test", {meta:meta});
                } else {
                  require('jsonfile').writeFile(config.root+'/cache/'+config.prefix+'_editions.json', meta, function(err) {
                    config.meta.editions = meta;
                    res.render("_partials/meta_test", {meta:config.meta.editions});
                  });
                }
              } else {
                getMetaSingle(config.editions[conta.length],req);
              }
            }
          });
        });
      }
    }
  });
};
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
