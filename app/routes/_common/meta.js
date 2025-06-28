var helpers = require('../../helpers/helpers');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    //console.log("getMeta");
    meta = {};
    conta = [];
    if (!req.query.generate){
      res.render("_partials/meta_test", {meta:config.meta.editions});
    } else {
      getMetaSingle(config.editions[conta.length],req);
      function getMetaSingle(val,req) {
        //console.log("getMetaSingle 1 "+val);
        console.log(config.data_domain+(req.current_lang!=config.default_lang ? '/'+req.current_lang : '')+'/wp-json/wp/v2/meta_data/editions/'+config.prefix+'/'+val);
        const url = config.data_domain+(req.current_lang!=config.default_lang ? '/'+req.current_lang : '')+'/wp-json/wp/v2/meta_data/editions/'+config.prefix+'/'+val;
        const axios = require('axios');
        axios.get(url)
        .then(response => {
          var data = response.data;
          //console.log("getMetaSingle 2");
          //console.log(data);
          meta[val] = data.meta.edition;
          conta.push(val);
          //console.log('wp/v2/meta_data/editions/'+config.prefix+'/'+val);
          //console.log(conta.length +" - "+editions.length);
          //console.log(req.query.check);
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
            //console.log("getMetaSingle 3 "+editions[conta.length]);
            getMetaSingle(config.editions[conta.length],req);
          }
        })
        .catch(error => {
          console.error('Meta API error:', error);
          // Continue with next iteration even if one fails
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
        });
      }
    }
  });
};
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
