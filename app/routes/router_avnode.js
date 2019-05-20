var indexRoutes = require('./avnode/index');
var activitiesRoutes = require('./avnode/activities');
var memberactivitiesRoutes = require('./avnode/memberactivities');

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
  app.get('/member/*', function(req, res) {res.redirect(301, req.url.replace('/member/','/members/'))});
  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/events/'))});
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-posttype-(:posttype).xml", sitemapRoutes.get);
  app.get("/sitemap-activities-(:activity).xml", sitemapRoutes.get);
  app.get("/sitemap-users-(:users).xml", sitemapRoutes.get);

  app.get('/', indexRoutes.get);
  app.get('/insta/', indexRoutes.getInsta);
  app.get('/team', usersRoutes.getUsers);
  app.get('/team/(:user)', usersRoutes.get);
  app.get('/members', usersRoutes.getUsers);
  app.get('/members/(:user)', usersRoutes.get);
  app.get('/partners', usersRoutes.getUsers);
  app.get('/partners/(:user)', usersRoutes.get);
  app.get('/events/', eventsRoutes.getAll);
  app.get('/events/(:event)', eventsRoutes.get);
  app.get('/events/page/(:page)', eventsRoutes.getAll);
  app.get('/events/tags/(:tag)', eventsRoutes.getTag);
  app.get('/news/', newsRoutes.getAll);
  app.get('/news/(:new)', newsRoutes.get);
  app.get('/news/page/(:page)', newsRoutes.getAll);
  app.get('/member-activities/', memberactivitiesRoutes.getAll);
  app.get('/member-activities/(:activity)', memberactivitiesRoutes.get);
  app.get('/member-activities/page/(:page)', memberactivitiesRoutes.getAll);
  app.get('/activities/', activitiesRoutes.getAll);
  app.get('/activities/(:activity)', activitiesRoutes.get);
  app.get('/activities/page/(:page)', activitiesRoutes.getAll);

  app.get('/(:page)', pagesRoutes.get);
  app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);
};
