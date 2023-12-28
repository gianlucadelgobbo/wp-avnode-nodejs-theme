var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');

exports.get = function get(req, res) {
  console.log(req.params.subedition)
  helpers.setSessions(req, function() {
    helpers.getEdition(req, async function( result ) {
      var rientro = req.url.indexOf("/program/")>0;
      //console.log("rientro");
      let page_data = fnz.setPageData(req, result);
      //console.log("result.post_title");
      //console.log(result.avnode);
      let include_gallery = false;
      let include_paypal = false;
     if (result.post_title) {
        let template;
        if (req.params.performance) {
          if (result.avnode.performance && result.avnode.performance.title) {
            template = config.prefix+'/'+'edition_performance';
            include_gallery = true;
          }
        } else if (req.params.subedition == "artists") {
          if (result.avnode.advanced && result.avnode.advanced.performers) {
            template = config.prefix+'/'+'edition_artists';
          }
        } else if (req.params.artist) {
          if (result.avnode.performer && result.avnode.performer.stagename) {
            template = config.prefix+'/'+'edition_artist';
          }
        } else if (req.params.subedition == "gallery") {
          if (result.avnode.galleries || result.avnode.medias) {
            include_gallery = true;
            template = config.prefix+'/'+'edition_medias';
          }
        } else if (req.params.subedition == "videos") {
          if (result.avnode.videos || result.avnode.media) {
            include_gallery = true;
            template = config.prefix+'/'+'edition_medias';
          }
        } else if (req.params.subedition == "tickets") {
          include_paypal = true;
          template = config.prefix+'/'+'edition';
        } else {
          template = config.prefix+'/'+'edition';
        }
        if (template) {
          res.render(template, {result: result, req_params:req.params, page_data:page_data, sessions:req.session.sessions,rientro:rientro, include_gallery: include_gallery,include_paypal: include_paypal});
        } else {
          res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
        }
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};
