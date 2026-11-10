var indexRoutes    = require('./index_mam');
var sitemapRoutes  = require('./_common/sitemap');
var signupRoutes   = require('./_common/signup');
var pagesRoutes    = require('./_common/pages');
var robotsRoutes   = require('./_common/robots');
var metaRoutes     = require('./_common/meta');
var editionsRoutes = require('./_common/editions');
var calendarRoutes = require('./_common/calendar');
var avnodeProxy    = require('./_common/avnode_proxy');
var helpers        = require('../helpers/helpers');
var fnz            = require('../helpers/functions');

module.exports = function(app) {
  avnodeProxy(app);
  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-home.xml', sitemapRoutes.get);
  app.get('/sitemap-pages.xml', sitemapRoutes.get);
  app.get('/sitemap-:edition.xml', sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);
  app.get('/it/:page/page/:paging',         pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/it/:page/:subpage',             pagesRoutes.get);
  app.get('/it/:page',                      pagesRoutes.get);
  app.post('/it/signup',                    signupRoutes.post);

  app.get('/calendar/',            calendarRoutes.get);
  app.get('/calendar/:calendar',   calendarRoutes.getDett);

  app.get('/editions/:edition',                                        editionsRoutes.get);
  app.get('/editions/:edition/artists/:artist',                        editionsRoutes.get);
  app.get('/editions/:edition/:subedition',                            editionsRoutes.get);
  app.get('/editions/:edition/program/detail/:performance',            editionsRoutes.get);
  app.get('/editions/:edition/:subedition/:subsubedition',             editionsRoutes.get);
  app.get('/editions/:edition/:subedition/:subsubedition/:artist',     editionsRoutes.get);

  app.get('/en/', indexRoutes.get);
  app.get('/en/calendar/',         calendarRoutes.get);
  app.get('/en/calendar/:calendar',calendarRoutes.getDett);
  app.get('/en/editions/:edition',                                     editionsRoutes.get);
  app.get('/en/editions/:edition/artists/:artist',                     editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition',                         editionsRoutes.get);
  app.get('/en/editions/:edition/program/detail/:performance',         editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition/:subsubedition',          editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition/:subsubedition/:artist',  editionsRoutes.get);
  app.get('/en/:page/page/:paging',         pagesRoutes.get);
  app.get('/en/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/en/:page/:subpage',             pagesRoutes.get);
  app.get('/en/:page',                      pagesRoutes.get);
  app.post('/en/signup',                    signupRoutes.post);

  app.get('/slideshow/', function(req, res) {
    helpers.setSessions(req, function() {
      var request = require('request');
      var page_data = fnz.setPageData(req, {'ID':'100'});
      var mediaUrl = config.data_domain + '/wp-json/wp/v2/media?parent=' + config.home_page_id + '&orderby=menu_order&order=asc&per_page=20';
      if (config.home_page_id) {
        request({ url: mediaUrl, json: true, timeout: 5000 }, function(err, r, media) {
          var carousel = (Array.isArray(media) ? media : []).map(function(m) {
            return {
              src:  m.source_url,
              alt:  m.alt_text || (m.title && m.title.rendered) || '',
              link: m.caption && m.caption.rendered ? m.caption.rendered.replace(/<[^>]+>/g,'').trim() : ''
            };
          });
          res.render('mam/slideshow', { page_data: page_data, sessions: req.session.sessions, no_loose_time: true, carousel: carousel });
        });
      } else {
        res.render('mam/slideshow', { page_data: page_data, sessions: req.session.sessions, no_loose_time: true, carousel: [] });
      }
    });
  });

  app.get('/gallery/:slug', function(req, res) {
    helpers.setSessions(req, function() {
      var request = require('request');
      request({ url: 'https://api.admin.avnode.net/galleries/' + req.params.slug, json: true }, function(error, response, body) {
        var page_data = fnz.setPageData(req, {'ID':'100'});
        if (error || !body || !body.medias) return pagesRoutes.get404(req, res);
        res.render('mam/gallery', { page_data: page_data, sessions: req.session.sessions, gallery: body });
      });
    });
  });

  app.get('/:page/page/:paging',        pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/:page/:subpage',            pagesRoutes.get);
  app.get('/:page',                     pagesRoutes.get);

  app.post('/signup', signupRoutes.post);
  app.get('*', pagesRoutes.get404);
};
