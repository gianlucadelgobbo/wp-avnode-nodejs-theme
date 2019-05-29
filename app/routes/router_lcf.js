var indexRoutes = require('./index_lcf');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var editionsRoutes = require('./_common/editions');
/* var eventsRoutes = require('./_common/events');
var usersRoutes = require('./_common/users');
var newsRoutes = require('./_common/news'); */
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');

module.exports = function(app) {
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/news/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/news/lpm-2018-rome-call-to-partecipate/','/news/lpm-2018-rome-call-to-participate/'))});
  app.get('/editions/2017-rome/artists/AshKoosha/performances/live-vr-show/', function(req, res) {res.redirect(301, '/editions/2017-rome/artists/AshKoosha/performances/live-av-show/')});
  app.get('/en/editions/2017-rome/artists/AshKoosha/performances/live-vr-show/', function(req, res) {res.redirect(301, '/en/editions/2017-rome/artists/AshKoosha/performances/live-av-show/')});
  app.get('/event/2014-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2014-rome/','/editions/2014-rome/'))});
  app.get('/event/2015-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2015-rome/','/editions/2015-rome/'))});
  app.get('/event/2016-rome/*', function(req, res) {res.redirect(301, req.url.replace('/event/2016-rome/','/editions/2016-rome/'))});

  app.get('/events/2014-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2014-rome/','/editions/2014-rome/'))});
  app.get('/events/2015-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2015-rome/','/editions/2015-rome/'))});
  app.get('/events/2016-rome/*', function(req, res) {res.redirect(301, req.url.replace('/events/2016-rome/','/editions/2016-rome/'))});

  app.get('/edition/*', function(req, res) {res.redirect(301, req.url.replace('/edition/','/editions/'))});

  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/events/'))});
  app.get('/it', function(req, res) {res.redirect(301, '/')});
  app.get('/it/*', function(req, res) {res.redirect(301, req.url.replace('/it',''))});

  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-editions.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-editions-(:edition).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/en/', indexRoutes.get);
/*   app.get('/en/events/', eventsRoutes.getAll);
  app.get('/en/events/page/(:page)', eventsRoutes.getAll);
  app.get('/en/events/(:event)', eventsRoutes.get);
  app.get('/en/news/', newsRoutes.getAll);
  app.get('/en/news/page/(:page)', newsRoutes.getAll);
  app.get('/en/news/(:new)', newsRoutes.get);
  app.get('/en/team', usersRoutes.getUsers);
  app.get('/en/team/(:user)', usersRoutes.get);
  app.get('/en/partners', usersRoutes.getUsers);
  app.get('/en/partners/(:user)', usersRoutes.get);
  app.get('/en/editions/(:edition)', editionsRoutes.get);
  //app.get('/en/editions/(:edition)/artists', editionsRoutes.getArtist);
  app.get('/en/editions/(:edition)/artists/(:artist)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/program/detail/(:performance)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/en/editions/(:edition)/(:subedition)/(:subsubedition)/(:image)', editionsRoutes.get);
  app.get('/en/signup', signupRoutes.get);
  app.get('/en/(:page)/page/:paging', pagesRoutes.get);
  app.get('/en/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/en/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/en/(:page)', pagesRoutes.get);

  app.post('/en/(:page)', pagesRoutes.post);
  app.post('/en/signup', signupRoutes.post);

 /*   app.get('/events/', eventsRoutes.getAll);
  app.get('/events/page/(:page)', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/page/(:page)', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/team', usersRoutes.getUsers);
  app.get('/team/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getUsers);
  app.get('/partners/(:user)', usersRoutes.get); */
  app.get('/editions/(:edition)', editionsRoutes.get);
  //app.get('/editions/(:edition)/artists', editionsRoutes.getArtist);
  app.get('/editions/(:edition)/artists/(:artist)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/program/detail/(:performance)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)', editionsRoutes.get);
  app.get('/editions/(:edition)/(:subedition)/(:subsubedition)/(:image)', editionsRoutes.get);

  app.get('/signup', signupRoutes.get);
  app.get('/(:page)/page/:paging', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/(:page)', pagesRoutes.get);
  
  app.post('/signup', signupRoutes.post);
  //app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);
};
