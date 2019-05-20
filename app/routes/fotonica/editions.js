var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez.editions;

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    //console.log("result._post_template");
    helpers.getEdition(req, function( result ) {
      var rientro = req.url.indexOf("/program/")>0;
      //console.log("rientro");
      var page_data = fnz.setPageData(req, result);
      //console.log(result);
      let include_gallery = false;
      if (result.post_title) {
        let template;
        if (req.params.performance) {
          template = config.prefix+'/'+'edition_detail';
        } else if (req.params.subedition == "gallery") {
          include_gallery = true;
          template = config.prefix+'/'+'edition_free';
        } else if (req.params.subedition == "videos") {
          include_gallery = true;
          template = config.prefix+'/'+'edition_free';
        } else {
          template = config.prefix+'/'+'edition';
        }
        res.render(template, {result: result, page_data:page_data, sessions:req.session.sessions,rientro:rientro, include_gallery: include_gallery});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};

exports.getArtist = function getArtist(req, res) {
  helpers.setSessions(req, function() {
    helpers.getEditionArtist(req, function( result ) {
      var page_data = fnz.setPageData(req, result);
      if (result.post_content.indexOf(">ERROR<")===-1) {
        res.render(config.prefix+'/'+'edition_artists', {result: result, req_params:req.params, page_data:page_data, sessions:req.session.sessions});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};

exports.getAll = function getAll(req, res) {
  helpers.setSessions(req, function() {
    helpers.getContainerPage(req, sez.post_type, function( posttype ) {
      helpers.getAllEditionsByYear(req, null, config.sez.editions.limit, 1, function( results ) {
        var page_data = fnz.setPageData(req, posttype);
        res.render(config.prefix+'/'+'editions', {results: results, page_data:page_data, sessions:req.session.sessions, posttype:posttype});
      });
    });
  });
};
exports.getMeta = function getMeta(req, res) {
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
        //console.log('wp/v2/meta_data/editions/'+config.prefix+'/'+val);
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
              require('jsonfile').writeFile(config.root+'/config/'+config.prefix+'_editions.json', meta, function(err) {
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
