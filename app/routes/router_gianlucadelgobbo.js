var indexRoutes = require('./gianlucadelgobbo/index');
var exhibitionsRoutes = require('./gianlucadelgobbo/exhibitions');

var sitemapRoutes = require('./_common/sitemap');
var usersRoutes = require('./_common/users');
var eventsRoutes = require('./_common/events');
var newsRoutes = require('./_common/news');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');

module.exports = function(app) {
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/news/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/news/lpm-2018-rome-call-to-partecipate/','/news/lpm-2018-rome-call-to-participate/'))});
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);
  app.get('/it/team', usersRoutes.getUsers);
  app.get('/it/team/(:user)', usersRoutes.get);
  app.get('/it/partners', usersRoutes.getUsers);
  app.get('/it/partners/(:user)', usersRoutes.get);
  app.get('/it/events/', eventsRoutes.getAll);
  app.get('/it/events/(:event)', eventsRoutes.get);
  app.get('/it/events/page/(:page)', eventsRoutes.getAll);
  app.get('/it/news/', newsRoutes.getAll);
  app.get('/it/news/(:new)', newsRoutes.get);
  app.get('/it/news/page/(:page)', newsRoutes.getAll);
  app.get('/it/prenatal/', exhibitionsRoutes.getAll);
  app.get('/it/prenatal/page/(:page)', exhibitionsRoutes.getAll);
  app.get('/it/prenatal/(:exhibition)', exhibitionsRoutes.get);
  app.get('/it/prenatal/(:exhibition)/artists', exhibitionsRoutes.getArtist);
  app.get('/it/prenatal/(:exhibition)/artists/(:artist)/performances/(:performance)', exhibitionsRoutes.getArtist);
  app.get('/it/prenatal/(:exhibition)/artists/(:artist)', exhibitionsRoutes.getArtist);
  app.get('/it/(:page)/', pagesRoutes.get);
  app.post('/it/(:page)', pagesRoutes.post);

  app.get('/', indexRoutes.get);
  app.get('/team', usersRoutes.getUsers);
  app.get('/team/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getUsers);
  app.get('/partners/(:user)', usersRoutes.get);
  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/page/(:page)', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/page/(:page)', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/prenatal/', exhibitionsRoutes.getAll);
  app.get('/prenatal/page/(:page)', exhibitionsRoutes.getAll);
  app.get('/prenatal/(:exhibition)', exhibitionsRoutes.get);
  app.get('/prenatal/(:exhibition)/artists', exhibitionsRoutes.getArtist);
  app.get('/prenatal/(:exhibition)/artists/(:artist)/performances/(:performance)', exhibitionsRoutes.getArtist);
  app.get('/prenatal/(:exhibition)/artists/(:artist)', exhibitionsRoutes.getArtist);

  app.get('/(:page)/', pagesRoutes.get);
  app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);

};
