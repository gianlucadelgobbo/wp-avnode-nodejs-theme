var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez.prenatal;

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    //console.log("result._post_template");
    helpers.getExhibition(req, function( result ) {
      //console.log("result._post_template2");
      var page_data = fnz.setPageData(req, result);
      res.render(config.prefix+'/'+'exhibition', {sez:sez, result: result, page_data:page_data, sessions:req.session.sessions, include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
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

exports.getArtist = function getArtist(req, res) {
  helpers.setSessions(req, function() {
    helpers.getExhibitionArtist(req, function( result ) {
      var page_data = fnz.setPageData(req, result);
      res.render(config.prefix+'/'+'exhibition_artists', {result: result, req_params:req.params, page_data:page_data, sessions:req.session.sessions});
    });
  });
};
