var indexRoutes = require('./linuxclub/index');
var networkRoutes = require('./linuxclub/network');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var usersRoutes = require('./_common/users');
var eventsRoutes = require('./_common/events');
var newsRoutes = require('./_common/news');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');

module.exports = function(app) {
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/events/'))});

  app.get('/', indexRoutes.get);

  app.get('/news/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/news/lpm-2018-rome-call-to-partecipate/','/news/lpm-2018-rome-call-to-participate/'))});
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-editions-(:edition).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/page/(:page)', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/network/', networkRoutes.getAll);
  app.get('/network/page/(:page)', networkRoutes.getAll);
  app.get('/network/(:network)', networkRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/page/(:page)', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/team', usersRoutes.getUsers);
  app.get('/team/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getUsers);
  app.get('/partners/(:user)', usersRoutes.get);
  app.get('/signup', signupRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/(:page)', pagesRoutes.get);
  app.post('/(:page)', pagesRoutes.post);
  app.post('/signup', signupRoutes.post);

  app.get('*', pagesRoutes.get404);
};
