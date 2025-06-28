var indexRoutes = require('./index_gianlucadelgobbo');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');
var codingRoutes = require('./_common/coding');
var awardsRoutes = require('./_common/awards');

var checkinRoutes = require('./_common/checkin');
//var Recaptcha = require('express-recaptcha').RecaptchaV2
//var recaptcha = new Recaptcha(config.accounts.recaptcha.site_key, config.accounts.recaptcha.secret_key, { callback: 'cb' })

module.exports = function(app) {

  app.get('/', indexRoutes.get);

  app.get('/checkin', checkinRoutes.get);
  app.post('/checkin', checkinRoutes.post);
  app.get('/checkin/list', checkinRoutes.list);
  
  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  //app.get("/sitemap-:avnode.xml", sitemapRoutes.get);

  app.get('/it/coding/', codingRoutes.getAll);
  app.get('/it/coding/tags/', codingRoutes.getAllTags);
  app.get('/it/coding/:web',  codingRoutes.get);
  app.get('/it/coding/page/:page',  codingRoutes.getAll);
  app.get('/it/coding/tags/:tag',  codingRoutes.getTag);

  app.get('/it/awards-and-grants/', awardsRoutes.getAll);
  app.get('/it/awards-and-grants/:award',  awardsRoutes.get);
  app.get('/it/awards-and-grants/page/:page',  awardsRoutes.getAll);

  app.get('/it/', indexRoutes.get);
  app.get('/it/:page/page/:paging', pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage',  pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage/:subsubsubpage',  pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage/:subsubsubpage/img/:img', pagesRoutes.get);
  app.get('/it/:page/:subpage',  pagesRoutes.get);
  app.get('/it/:page',  pagesRoutes.get);
  
  app.get('/coding/', codingRoutes.getAll);
  app.get('/coding/tags/', codingRoutes.getAllTags);
  app.get('/coding/:web',  codingRoutes.get);
  app.get('/coding/page/:page',  codingRoutes.getAll);
  app.get('/coding/tags/:tag',  codingRoutes.getTag);

  app.get('/awards-and-grants/', awardsRoutes.getAll);
  app.get('/awards-and-grants/:award',  awardsRoutes.get);
  app.get('/awards-and-grants/page/:page',  awardsRoutes.getAll);

  app.get('/:page/page/:paging', pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage',  pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage/:subsubsubpage',  pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage/:subsubsubpage/img/:img', pagesRoutes.get);
  app.get('/:page/:subpage',  pagesRoutes.get);
  app.get('/:page',  pagesRoutes.get);
  //app.get('/:page',  recaptcha.middleware.render, pagesRoutes.get);
  
  //app.post('/:page',  recaptcha.middleware.verify, pagesRoutes.post);

  app.post('/signup', signupRoutes.post);

  app.get('*', pagesRoutes.get404);
};
