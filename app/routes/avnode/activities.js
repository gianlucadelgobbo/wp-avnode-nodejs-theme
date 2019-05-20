var helpers = require('../../helpers');
var fnz = require('../../functions');

var sez = config.sez.activities;

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    helpers.getActivity(req, function( result ) {
      //console.log(result);
      var page_data = fnz.setPageData(req, result);
      //console.log(result);

      if(result && result['ID']) {
        res.render(config.prefix+'/'+sez.pugdett, {result: result, page_data:page_data, sessions:req.session.sessions, baseurl:sez.baseurl,include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, baseurl:sez.baseurl, itemtype:"WebPage"});
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
