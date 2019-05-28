var helpers = require('../../helpers/helpers');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var WPAPI = require( 'wpapi' );
    //console.log("getMeta");
    meta = {};
    conta = [];
    if (!req.query.generate){
      res.render("_common/meta_test", {meta:config.meta.editions});
    } else {
      getMetaSingle(config.editions[conta.length],req);
      function getMetaSingle(val,req) {
        //console.log("getMetaSingle 1 "+val);
        console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2/meta_data/editions/'+config.prefix+'/'+val);
        var wp = new WPAPI({ endpoint: config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json' });
        wp.myCustomResource = wp.registerRoute( 'wp/v2', '/meta_data/(?P<sez>)/(?P<edition>)' );
        wp.myCustomResource().edition(config.prefix+'/'+val).sez("editions").get(function( err, data ) {
          //console.log("getMetaSingle 2");
          //console.log(data);
          meta[val] = data.meta.edition;
          conta.push(val);
          //console.log('wp/v2/meta_data/editions/'+config.prefix+'/'+val);
          //console.log(conta.length +" - "+editions.length);
          //console.log(req.query.check);
          if (conta.length==config.editions.length) {
            if (req.query.check){
              res.render("_common/meta_test", {meta:meta});
            } else {
              require('jsonfile').writeFile(config.root+'/cache/'+config.prefix+'_editions.json', meta, function(err) {
                config.meta.editions = meta;
                res.render("_common/meta_test", {meta:config.meta.editions});
              });
            }
          } else {
            //console.log("getMetaSingle 3 "+editions[conta.length]);
            getMetaSingle(config.editions[conta.length],req);
          }
        });
      }
    }
  });
};
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
