var indexRoutes = require('./index_flxer');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');

module.exports = function(app) {
  app.get('/performers', function(req, res) {console.log(req.url);res.redirect(301, 'https://avnode.net/performers/')});

  app.get('/:performer/performances/:performance/', function(req, res) {res.redirect(301, 'https://avnode.net/performances/'+req.params.performance)});
  app.get('/:performer/events/:event/', function(req, res) {res.redirect(301, 'https://avnode.net/events/'+req.params.event)});
  app.get('/:performer/tvshows/:tvshow/', function(req, res) {res.redirect(301, 'https://avnode.net/videos/'+req.params.tvshow)});
  app.get('/:performer/footage/:footage/', function(req, res) {res.redirect(301, 'https://avnode.net/footage/'+req.params.footage)});
  app.get('/:performer/playlists/:playlist/', function(req, res) {res.redirect(301, 'https://avnode.net/playlists/'+req.params.playlist)});
  app.get('/:performer/performances/:performance/', function(req, res) {res.redirect(301, 'https://avnode.net/performances/'+req.params.performance)});
  app.get('/performers/*', function(req, res) {console.log(req.url);res.redirect(301, req.url.replace('/performers/','https://avnode.net/'))});
  app.get('/tvshows', function(req, res) {res.redirect(301, 'https://avnode.net/videos/')});
  app.get('/footage', function(req, res) {res.redirect(301, 'https://avnode.net/footage/')});
  app.get('/playlists', function(req, res) {res.redirect(301, 'https://avnode.net/playlists/')});

  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-(:avnode).xml", sitemapRoutes.get);

  app.get('/(:page)/page/:paging', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)/img/:img', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/(:page)', pagesRoutes.get);
  
  app.post('/(:page)/(:subpage)', pagesRoutes.post);
  app.post('/signup', signupRoutes.post);


  app.get('*', pagesRoutes.get404);
};
