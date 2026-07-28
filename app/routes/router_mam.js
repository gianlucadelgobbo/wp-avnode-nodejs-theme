var indexRoutes = require('./index_mam');
var mamApiRoutes = require('./_common/mam_api');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');

module.exports = function(app) {
  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);

  // MAM API proxy
  app.get('/api/mam/events', mamApiRoutes.getEvents);
  app.get('/api/mam/calendar', mamApiRoutes.getCalendar);

  app.get('/it/', indexRoutes.get);

  app.get('/it/:page/page/:paging', pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/it/:page/:subpage', pagesRoutes.get);
  app.get('/it/:page', pagesRoutes.get);

  app.post('/it/signup', signupRoutes.post);

  app.get('/:page/page/:paging', pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/:page/:subpage', pagesRoutes.get);
  app.get('/:page', pagesRoutes.get);

  app.post('/signup', signupRoutes.post);

  app.get('*', pagesRoutes.get404);
};
