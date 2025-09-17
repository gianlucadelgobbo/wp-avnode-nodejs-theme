var indexRoutes = require('./index_avnode');

var sitemapRoutes = require('./_common/sitemap');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
//var Recaptcha = require('express-recaptcha').RecaptchaV2
//var recaptcha = new Recaptcha(config.accounts.recaptcha.site_key, config.accounts.recaptcha.secret_key, { callback: 'cb' })

module.exports = function(app) {
  app.get('/events*', function(req, res) {res.redirect(301, req.url.replace('/events','https://avnode.net/events'))});
  app.get('/news*', function(req, res) {res.redirect(301, req.url.replace('/events','https://avnode.net/news'))});
  app.get('/search*', function(req, res) {res.redirect(301, req.url.replace('/events','https://avnode.net/search'))});
  app.get('/roma*', function(req, res) {res.redirect(301, req.url.replace('/events','https://avnode.net/anvedi'))});

  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-:avnode.xml", sitemapRoutes.get);

  app.get('/:page/page/:paging', pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/:page/:subpage', pagesRoutes.get);
  app.get('/:page', pagesRoutes.get);
  //app.get('/:page', recaptcha.middleware.render, pagesRoutes.get);
  
  //app.post('/:page', recaptcha.middleware.verify, pagesRoutes.post);

  app.get('/', indexRoutes.get);

  app.get('*', pagesRoutes.get404);
};
