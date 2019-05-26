var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez.exhibitions;

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    //console.log("result._post_template");
    helpers.getExhibition(req, function( result ) {
      var rientro = req.url.indexOf("/program/")>0;
      //console.log("rientro");
      var page_data = fnz.setPageData(req, result);
      //console.log("result");
      //console.log(req.params);
      //console.log(result);
      let include_gallery = false;
      if (result.post_title) {
        let template;
        if (req.params.performance) {
          template = config.prefix+'/'+'exhibition_detail';
        } else if (req.params.subexhibition == "gallery") {
          include_gallery = true;
          template = config.prefix+'/'+'exhibition_free';
        } else if (req.params.subexhibition == "videos") {
          include_gallery = true;
          template = config.prefix+'/'+'exhibition_free';
        } else {
          template = config.prefix+'/'+'exhibition';
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
    helpers.getExhibitionArtist(req, function( result ) {
      //console.log(result);
      var page_data = fnz.setPageData(req, result);
      if (result.post_content.indexOf(">ERROR<")===-1) {
        res.render(config.prefix+'/'+'exhibition_artists', {result: result, req_params:req.params, page_data:page_data, sessions:req.session.sessions});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};


exports.getAll = function getAll(req, res) {
  helpers.setSessions(req, function() {
    helpers.getContainerPage(req, sez.post_type, function( posttype ) {
      var page = req.params.page ? req.params.page : 1;
      helpers.getAll(req, sez, sez.limit, page, function( results ) {
        var page_data = fnz.setPageData(req, posttype);
        res.render(config.prefix+'/'+sez.puglist, {results: results, page_data:page_data, sessions:req.session.sessions, baseurl:sez.baseurl, posttype:posttype});
      });
    });
  });
};
