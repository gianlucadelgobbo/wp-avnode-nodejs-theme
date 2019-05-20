var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');

var sez = config.sez.editions;

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    helpers.getEdition(req, function( result ) {
      var rientro = req.url.indexOf("/program/")>0;
      //console.log("rientro");
      let page_data = fnz.setPageData(req, result);
      //console.log("result");
      let include_gallery = false;
      if (result.post_title) {
        let template;
        if (req.params.performance) {
          template = config.prefix+'/'+'edition_performance';
        } else if (req.params.subedition == "artists") {
          template = config.prefix+'/'+'edition_artists';
        } else if (req.params.artist) {
          template = config.prefix+'/'+'edition_artist';
        } else if (req.params.subedition == "gallery") {
          include_gallery = true;
          template = config.prefix+'/'+'edition_medias';
        } else if (req.params.subedition == "videos") {
          include_gallery = true;
          template = config.prefix+'/'+'edition_medias';
        } else {
          template = config.prefix+'/'+'edition';
        }
        res.render(template, {result: result, req_params:req.params, page_data:page_data, sessions:req.session.sessions,rientro:rientro, include_gallery: include_gallery});
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