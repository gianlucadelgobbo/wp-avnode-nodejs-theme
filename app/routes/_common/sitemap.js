var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');

//var sez = config.sez["awards-and-grants"];

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    //res.header('Content-Type', 'text/xml');
    var now = new Date();
    now.setHours(now.getHours() - 4);
    var isodate = fnz.ISODateString(now);
    if (req.url == "/sitemap.xml") {
      //console.log(req.url);
      res.header('Content-Type', 'text/xml').render(config.prefix+'/sitemap', {isodate:isodate});

    } else if (req.url == "/sitemap-home.xml") {
      //console.log(req.url);
      res.header('Content-Type', 'text/xml').render('_sitemaps/sitemap-home', {isodate:isodate});

    } else if (req.url == "/sitemap-pages.xml") {
      //console.log(req.url);
      res.header('Content-Type', 'text/xml').render('_sitemaps/sitemap-pages', {isodate:isodate});

    /* } else if (req.params.taxonomy) {
      //console.log(req.params.taxonomy);
      helpers.getPostType(req, req.params.taxonomy, function( results ) {
        if (results){
          res.header('Content-Type', 'text/xml').render('_common/sitemap-taxonomy', {results:results, isodate:isodate});
        } else {
          var page_data = fnz.setPageData(req, {});
          res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
        }
      }); */

    } else if (req.params.edition) {
        var result = config.meta.editions[req.params.edition];
        var now = new Date();
        var date = new Date(result["wpcf-startdate"]*1000);
        var timeDiff = (date.getTime() - now.getTime());
        var diffDays = (timeDiff / (1000 * 3600 * 24));
        var lastmod = diffDays < 0 ? fnz.ISODateString(date) : fnz.ISODateString(now);
        var changefreq = diffDays < 0 ? "yearly" : "daily";
        res.header('Content-Type', 'text/xml').render('_common/sitemap-edition', {result:result, lastmod:lastmod, changefreq:changefreq});

    } else if (req.params.avnode) {
      helpers.getXMLlist(req, function( results ) {
        res.header('Content-Type', 'text/xml').render('_sitemaps/sitemap-avnode', {results:results, isodate:isodate, sez:req.params.avnode});
      });
    }
  });
};

//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
