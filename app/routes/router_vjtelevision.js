var indexRoutes = require('./index_vjtelevision');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');
var facebook = require('./_common/facebook');
//var Recaptcha = require('express-recaptcha').RecaptchaV2
//var recaptcha = new Recaptcha(config.accounts.recaptcha.site_key, config.accounts.recaptcha.secret_key, { callback: 'cb' })

module.exports = function(app) {
  app.get('/', indexRoutes.get);

  app.get('/facebookSender', facebook.facebookSender);
  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  //app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-:avnode', xml", sitemapRoutes.get);

  app.get('/:page/page/:paging', pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage',  pagesRoutes.get);
  app.get('/:page/:subpage',  pagesRoutes.get);
  app.get('/facebook', pagesRoutes.facebook);
  app.post('/facebook', pagesRoutes.facebook);
  app.get('/:page',  pagesRoutes.get);
  //app.get('/:page',  recaptcha.middleware.render, pagesRoutes.get);
  
  //app.post('/:page',  recaptcha.middleware.verify, pagesRoutes.post);
  
  app.post('/signup', signupRoutes.post);

  app.get('*', pagesRoutes.get404);
};
