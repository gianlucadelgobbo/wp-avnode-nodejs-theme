var indexRoutes = require('./index_flxer');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');
var codingRoutes = require('./_common/coding');

module.exports = function(app) {

  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-(:avnode).xml", sitemapRoutes.get);

  app.get('/it/coding/', codingRoutes.getAll);
  app.get('/it/coding/tags/', codingRoutes.getAllTags);
  app.get('/it/coding/(:web)', codingRoutes.get);
  app.get('/it/coding/page/(:page)', codingRoutes.getAll);
  app.get('/it/coding/tags/(:tag)', codingRoutes.getTag);

  app.get('/it/', indexRoutes.get);
  app.get('/it/(:page)/page/:paging', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)/img/:img', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/it/(:page)', pagesRoutes.get);
  
  app.post('/it/(:page)', pagesRoutes.post);

  app.get('/coding/', codingRoutes.getAll);
  app.get('/coding/tags/', codingRoutes.getAllTags);
  app.get('/coding/(:web)', codingRoutes.get);
  app.get('/coding/page/(:page)', codingRoutes.getAll);
  app.get('/coding/tags/(:tag)', codingRoutes.getTag);

  app.get('/(:page)/page/:paging', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)/img/:img', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/(:page)', pagesRoutes.get);
  
  app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);
};
