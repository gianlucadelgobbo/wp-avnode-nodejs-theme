var indexRoutes = require('./index_lcf');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var editionsRoutes = require('./_common/editions');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');
//var Recaptcha = require('express-recaptcha').RecaptchaV2
//var recaptcha = new Recaptcha(config.accounts.recaptcha.site_key, config.accounts.recaptcha.secret_key, { callback: 'cb' })

module.exports = function(app) {
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/ar', pagesRoutes.getAR);
  app.get('/tickets', function(req, res) {res.redirect(301, '/editions/'+config.last_edition+'/tickets/')});
  app.get('/en/tickets', function(req, res) {res.redirect(301, '/en/editions/'+config.last_edition+'/tickets/')});

  app.get('/news/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/news/lpm-2018-rome-call-to-partecipate/','/news/lpm-2018-rome-call-to-participate/'))});
  app.get('/editions/2017-rome/artists/AshKoosha/performances/live-vr-show/', function(req, res) {res.redirect(301, '/editions/2017-rome/artists/AshKoosha/performances/live-av-show/')});
  app.get('/en/editions/2017-rome/artists/AshKoosha/performances/live-vr-show/', function(req, res) {res.redirect(301, '/en/editions/2017-rome/artists/AshKoosha/performances/live-av-show/')});
  app.get('/event/2014-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2014-rome/','/editions/2014-rome/'))});
  app.get('/event/2015-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2015-rome/','/editions/2015-rome/'))});
  app.get('/event/2016-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2016-rome/','/editions/2016-rome/'))});

  app.get('/events/2014-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2014-rome/','/editions/2014-rome/'))});
  app.get('/events/2015-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2015-rome/','/editions/2015-rome/'))});
  app.get('/events/2016-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2016-rome/','/editions/2016-rome/'))});

  app.get('/edition/*', function(req, res) {res.redirect(301, req.url.replace('/edition/','/editions/'))});

  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/events/'))});
  app.get('/it', function(req, res) {res.redirect(301, '/')});
  app.get('/it/*', function(req, res) {res.redirect(301, req.url.replace('/it',''))});

  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/qrcode-app-2019', function(req, res) {
    //console.log(req.headers["user-agent"]);
    if (req.headers["user-agent"].indexOf("Android")>=0) {
      res.redirect(301, "https://play.google.com/store/apps/details?id=com.Ielardiartwork.LiveCinema1")
    } else {
      res.redirect(301, "https://apps.apple.com/us/app/lcf/id1258182985?ls=1")
    }
    //res.send(req.headers["user-agent"]);
  });
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  //app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-(:avnode).xml", sitemapRoutes.get);

  app.get('/en/', indexRoutes.get);
  app.get('/en/editions/(:edition)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/artists/(:artist)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/program/detail/(:performance)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/(:subedition)/(:subsubedition)/(:image)', editionsRoutes.get);
  app.get('/en/(:page)/page/:paging', pagesRoutes.get);
  app.get('/en/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/en/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/en/(:page)', pagesRoutes.get);

  app.post('/en/signup', signupRoutes.post);

  app.get('/editions/(:edition)', editionsRoutes.get);
  app.get('/editions/(:edition)/artists/(:artist)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/program/detail/(:performance)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)/(:image)', editionsRoutes.get);

  app.get('/(:page)/page/:paging', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/(:page)', pagesRoutes.get);
  //app.get('/(:page)', recaptcha.middleware.render, pagesRoutes.get);
  
  //app.post('/(:page)', recaptcha.middleware.verify, pagesRoutes.post);
  
  app.post('/signup', signupRoutes.post);

  app.get('*', pagesRoutes.get404);
};
