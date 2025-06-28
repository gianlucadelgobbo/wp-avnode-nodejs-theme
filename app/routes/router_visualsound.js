var indexRoutes = require('./index_visualsound');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var editionsRoutes = require('./_common/editions');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');
//var Recaptcha = require('express-recaptcha').RecaptchaV2
//var recaptcha = new Recaptcha(config.accounts.recaptcha.site_key, config.accounts.recaptcha.secret_key, { callback: 'cb' })


module.exports = function(app) {
  //app.get('/it', function(req, res) {res.redirect(301, '/')});
  //app.get('/en/*', function(req, res) {res.redirect(301, req.url.replace('/it',''))});

  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  //app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  //app.get("/sitemap-:avnode.xml", sitemapRoutes.get);

  app.get('/en/', indexRoutes.get);
  app.get('/en/editions/:edition', editionsRoutes.get);
  app.get('/en/editions/:edition/artists/:artist', editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition', editionsRoutes.get);
  app.get('/en/editions/:edition/program/detail/:performance', editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition/:subsubedition', editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition/:subsubedition/:image', editionsRoutes.get);
  
  app.get('/en/:page/page/:paging', pagesRoutes.get);
  app.get('/en/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/en/:page/:subpage', pagesRoutes.get);
  app.get('/en/:page', pagesRoutes.get);

  app.post('/en/signup', signupRoutes.post);
  //app.post('/en/:page', recaptcha.middleware.verify, pagesRoutes.post);

  app.get('/editions/:edition', editionsRoutes.get);
  app.get('/editions/:edition/artists/:artist', editionsRoutes.get);
  app.get('/editions/:edition/:subedition', editionsRoutes.get);
  app.get('/editions/:edition/program/detail/:performance', editionsRoutes.get);
  app.get('/editions/:edition/:subedition/:subsubedition', editionsRoutes.get);
  app.get('/editions/:edition/:subedition/:subsubedition/:image', editionsRoutes.get);

  app.get('/:page/page/:paging', pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/:page/:subpage', pagesRoutes.get);
  app.get('/:page', pagesRoutes.get);

  app.post('/signup', signupRoutes.post);
  //app.get('/:page', recaptcha.middleware.render, pagesRoutes.get);
  //app.post('/:page', recaptcha.middleware.verify, pagesRoutes.post); 

  app.use(pagesRoutes.get404);
};
