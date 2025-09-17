var indexRoutes = require('./index_shockart');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var editionsRoutes = require('./_common/editions');
/* var eventsRoutes = require('./_common/events');
var usersRoutes = require('./_common/users');
var newsRoutes = require('./_common/news'); */
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');
//var Recaptcha = require('express-recaptcha').RecaptchaV2
//var recaptcha = new Recaptcha(config.accounts.recaptcha.site_key, config.accounts.recaptcha.secret_key, { callback: 'cb' })

module.exports = function(app) {
  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  //app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-:avnode.xml", sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);

  app.get('/it/exhibitions/:edition', editionsRoutes.get);
  app.get('/it/exhibitions/:edition/artists/:artist', editionsRoutes.get);
  app.get('/it/exhibitions/:edition/:subedition', editionsRoutes.get);
  app.get('/it/exhibitions/:edition/program/detail/:performance', editionsRoutes.get);
  app.get('/it/exhibitions/:edition/:subedition/:subsubedition', editionsRoutes.get);
  app.get('/it/exhibitions/:edition/:subedition/:subsubedition/:artist', editionsRoutes.get);
  app.get('/it/:page/page/:paging', pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/it/:page/:subpage', pagesRoutes.get);
  app.get('/it/:page', pagesRoutes.get);

  app.post('/it/signup', signupRoutes.post);

  app.get('/exhibitions/:edition', editionsRoutes.get);
  app.get('/exhibitions/:edition/artists/:artist', editionsRoutes.get);
  app.get('/exhibitions/:edition/:subedition', editionsRoutes.get);
  app.get('/exhibitions/:edition/program/detail/:performance', editionsRoutes.get);
  app.get('/exhibitions/:edition/:subedition/:subsubedition', editionsRoutes.get);
  app.get('/exhibitions/:edition/:subedition/:subsubedition/:artist', editionsRoutes.get);

  app.get('/:page/page/:paging', pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/:page/:subpage', pagesRoutes.get);
  app.get('/:page', pagesRoutes.get);
  //app.get('/:page', recaptcha.middleware.render, pagesRoutes.get);
  
  //app.post('/:page', recaptcha.middleware.verify, pagesRoutes.post);
 
  app.post('/signup', signupRoutes.post);

  app.get('*', pagesRoutes.get404);
};
