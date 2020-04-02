var indexRoutes = require('./index_flyer');

var sitemapRoutes = require('./_common/sitemap');
var signupRoutes = require('./_common/signup');
var pagesRoutes = require('./_common/pages');
var robotsRoutes = require('./_common/robots');
var metaRoutes = require('./_common/meta');
var codingRoutes = require('./_common/coding');
var webRoutes = require('./_common/web');
/* var videosRoutes = require('./_common/videos');
//var eventsRoutes = require('./_common/events');
var learningRoutes = require('./_common/learning');
var labRoutes = require('./_common/lab');
//var newsRoutes = require('./_common/news');
var awardsRoutes = require('./_common/awards');
var usersRoutes = require('./_common/users');
var pagesRoutes = require('./_common/pages'); */
/*
 var searchRoutes = require('./routes/search');
 */

module.exports = function(app) {
  app.get('/*.php', pagesRoutes.get404);
  app.post('/*.php', pagesRoutes.get404);

  app.get('/en/*', function(req, res) {res.redirect(301, req.url.replace('/en/','/'))});
  app.get('/extra/lpm-2018-rome-call-to-partecipate/', function(req, res) {res.redirect(301, req.url.replace('/extra/lpm-2018-rome-call-to-partecipate/','/extra/lpm-2018-rome-call-to-participate/'))});
  app.get('/web-and-apps/*', function(req, res) {res.redirect(301, req.url.replace('/web-and-apps/','/portfolio/web-and-apps/'))});
  app.get('/web-portfolio/*', function(req, res) {res.redirect(301, req.url.replace('/web-portfolio/','/portfolio/web-and-apps/'))});
  app.get('/live-visuals-portfolio/*', function(req, res) {res.redirect(301, req.url.replace('/live-visuals-portfolio/','/portfolio/live-visuals/'))});
  app.get('/events/2005-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2005-rome/','/portfolio/live-visuals/lpm-2005-rome/'))});
  app.get('/events/2006-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2006-rome/','/portfolio/live-visuals/lpm-2006-rome/'))});
  app.get('/events/2007-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2007-rome/','/portfolio/live-visuals/lpm-2007-rome/'))});
  app.get('/events/2008-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2008-rome/','/portfolio/live-visuals/lpm-2008-rome/'))});
  app.get('/events/2008-mex/', function(req, res) {res.redirect(301, req.url.replace('/events/2008-mex/','/portfolio/live-visuals/lpm-2008-mex/'))});
  app.get('/events/2009-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2009-rome/','/portfolio/live-visuals/lpm-2009-v/'))});
  app.get('/events/2010-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2010-rome/','/portfolio/live-visuals/lpm-2010-rome/'))});
  app.get('/events/2011-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2011-rome/','/portfolio/live-visuals/lpm-2011-rome/'))});
  app.get('/events/2011-minsk/', function(req, res) {res.redirect(301, req.url.replace('/events/2011-minsk/','/portfolio/live-visuals/lpm-2011-minsk/'))});
  app.get('/events/2012-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2012-rome/','/portfolio/live-visuals/lpm-2012-rome/'))});
  app.get('/events/2013-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2013-rome/','/portfolio/live-visuals/lpm-2013-rome/'))});
  app.get('/events/2013-cape-town/', function(req, res) {res.redirect(301, req.url.replace('/events/2013-cape-town/','/portfolio/live-visuals/lpm-2013-cape-town/'))});
  app.get('/events/2013-mex/', function(req, res) {res.redirect(301, req.url.replace('/events/2013-mex/','/portfolio/live-visuals/lpm-2013-mex/'))});
  app.get('/events/2014-eindhoven/', function(req, res) {res.redirect(301, req.url.replace('/events/2014-eindhoven/','/portfolio/live-visuals/lpm-2014-eindhoven/'))});
  app.get('/events/2015-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2015-rome/','/portfolio/live-visuals/lpm-2015-rome/'))});
  //app.get('/events/*', function(req, res) {res.redirect(301, req.url.replace('/events/','/portfolio/live-visuals/'))});
  app.get('/portfolio/events/*', function(req, res) {res.redirect(301, req.url.replace('/portfolio/events/','/portfolio/live-visuals/'))});
  app.get('/event/2008-mex/', function(req, res) {res.redirect(301, req.url.replace('/event/2008-mex/','/portfolio/live-visuals/lpm-2008-mexico/'))});
  app.get('/event/2009-rome/', function(req, res) {res.redirect(301, req.url.replace('/event/2009-rome/','/portfolio/live-visuals/lpm-2009-rome/'))});
  app.get('/event/2011-rome/', function(req, res) {res.redirect(301, req.url.replace('/event/2011-rome/','/portfolio/live-visuals/lpm-2011-rome/'))});
  app.get('/event/2013-rome/', function(req, res) {res.redirect(301, req.url.replace('/event/2013-rome/','/portfolio/live-visuals/lpm-2013-rome/'))});
  app.get('/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/portfolio/live-visuals/'))});
  app.get('/lab/*', function(req, res) {res.redirect(301, req.url.replace('/lab/','/portfolio/lab/'))});
  app.get('/videos/*', function(req, res) {res.redirect(301, req.url.replace('/videos/','/portfolio/videos/'))});
  app.get('/tag/*', function(req, res) {res.redirect(301, req.url.replace('/tag/','/portfolio/web-and-apps/tags/'))});
  app.get('/event-tag/*', function(req, res) {res.redirect(301, req.url.replace('/event-tag/','/portfolio/live-visuals/tags/'))});
  app.get('/web-projects-categories/*', function(req, res) {res.redirect(301, req.url.replace('/web-projects-categories/','/portfolio/live-visuals/tags/'))});
  //app.get('/news/*', function(req, res) {res.redirect(301, req.url.replace('/news/','/extra/'))});
  app.get('/download*', function(req, res) {res.redirect(301, "https://flyer.dev.flyer.it"+req.url.replace('/download/?filename=',''))});
  app.get('/awards-and-grants/*', function(req, res) {res.redirect(301, req.url.replace('/awards-and-grants/','/portfolio/awards-and-grants/'))});
  app.get('/all-news/', function(req, res) {res.redirect(301, '/extra/')});

  app.get('/it/web-and-apps/*', function(req, res) {res.redirect(301, req.url.replace('/web-and-apps/','/portfolio/web-and-apps/'))});
  app.get('/it/web-portfolio/*', function(req, res) {res.redirect(301, req.url.replace('/web-portfolio/','/portfolio/web-and-apps/'))});
  app.get('/it/live-visuals-portfolio/*', function(req, res) {res.redirect(301, req.url.replace('/live-visuals-portfolio/','/portfolio/live-visuals/'))});
  app.get('/it/events/2005-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2005-rome/','/portfolio/live-visuals/lpm-2005-rome/'))});
  app.get('/it/events/2006-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2006-rome/','/portfolio/live-visuals/lpm-2006-rome/'))});
  app.get('/it/events/2007-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2007-rome/','/portfolio/live-visuals/lpm-2007-rome/'))});
  app.get('/it/events/2008-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2008-rome/','/portfolio/live-visuals/lpm-2008-rome/'))});
  app.get('/it/events/2008-mex/', function(req, res) {res.redirect(301, req.url.replace('/events/2008-mex/','/portfolio/live-visuals/lpm-2008-mex/'))});
  app.get('/it/events/2009-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2009-rome/','/portfolio/live-visuals/lpm-2009-v/'))});
  app.get('/it/events/2010-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2010-rome/','/portfolio/live-visuals/lpm-2010-rome/'))});
  app.get('/it/events/2011-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2011-rome/','/portfolio/live-visuals/lpm-2011-rome/'))});
  app.get('/it/events/2011-minsk/', function(req, res) {res.redirect(301, req.url.replace('/events/2011-minsk/','/portfolio/live-visuals/lpm-2011-minsk/'))});
  app.get('/it/events/2012-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2012-rome/','/portfolio/live-visuals/lpm-2012-rome/'))});
  app.get('/it/events/2013-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2013-rome/','/portfolio/live-visuals/lpm-2013-rome/'))});
  app.get('/it/events/2013-cape-town/', function(req, res) {res.redirect(301, req.url.replace('/events/2013-cape-town/','/portfolio/live-visuals/lpm-2013-cape-town/'))});
  app.get('/it/events/2013-mex/', function(req, res) {res.redirect(301, req.url.replace('/events/2013-mex/','/portfolio/live-visuals/lpm-2013-mex/'))});
  app.get('/it/events/2014-eindhoven/', function(req, res) {res.redirect(301, req.url.replace('/events/2014-eindhoven/','/portfolio/live-visuals/lpm-2014-eindhoven/'))});
  app.get('/it/events/2015-rome/', function(req, res) {res.redirect(301, req.url.replace('/events/2015-rome/','/portfolio/live-visuals/lpm-2015-rome/'))});
  app.get('/it/portfolio/events/*', function(req, res) {res.redirect(301, req.url.replace('/portfolio/events/','/portfolio/live-visuals/'))});
  app.get('/it/events/*', function(req, res) {res.redirect(301, req.url.replace('/events/','/portfolio/live-visuals/'))});
  app.get('/it/event/2008-mex/', function(req, res) {res.redirect(301, req.url.replace('/event/2008-mex/','/portfolio/live-visuals/lpm-2008-mexico/'))});
  app.get('/it/event/2009-rome/', function(req, res) {res.redirect(301, req.url.replace('/event/2009-rome/','/portfolio/live-visuals/lpm-2009-rome/'))});
  app.get('/it/event/2011-rome/', function(req, res) {res.redirect(301, req.url.replace('/event/2011-rome/','/portfolio/live-visuals/lpm-2011-rome/'))});
  app.get('/it/event/2011-minsk/', function(req, res) {res.redirect(301, req.url.replace('/event/2011-minsk/','/portfolio/live-visuals/lpm-2011-minsk/'))});
  app.get('/it/event/2013-rome/', function(req, res) {res.redirect(301, req.url.replace('/event/2013-rome/','/portfolio/live-visuals/lpm-2013-rome/'))});
  app.get('/it/event/*', function(req, res) {res.redirect(301, req.url.replace('/event/','/portfolio/live-visuals/'))});
  app.get('/it/lab/*', function(req, res) {res.redirect(301, req.url.replace('/lab/','/portfolio/lab/'))});
  app.get('/it/videos/*', function(req, res) {res.redirect(301, req.url.replace('/videos/','/portfolio/videos/'))});
  app.get('/it/tag/*', function(req, res) {res.redirect(301, req.url.replace('/tag/','/portfolio/web-and-apps/tags/'))});
  app.get('/it/event-tag/*', function(req, res) {res.redirect(301, req.url.replace('/event-tag/','/portfolio/live-visuals/tags/'))});
  app.get('/it/web-projects-categories/*', function(req, res) {res.redirect(301, req.url.replace('/web-projects-categories/','/portfolio/live-visuals/tags/'))});
  //app.get('/it/news/*', function(req, res) {res.redirect(301, req.url.replace('/news/','/extra/'))});
  app.get('/it/download*', function(req, res) {res.redirect(301, "https://flyer.dev.flyer.it"+req.url.replace('/download/?filename=',''))});
  app.get('/it/awards-and-grants/*', function(req, res) {res.redirect(301, req.url.replace('/awards-and-grants/','/portfolio/awards-and-grants/'))});
  app.get('/it/all-news/', function(req, res) {res.redirect(301, '/extra/')});

  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get("/sitemap-home.xml", sitemapRoutes.get);
  app.get("/sitemap-pages.xml", sitemapRoutes.get);
  app.get("/sitemap-(:avnode).xml", sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);

  app.get('/it/portfolio/web-and-apps/', webRoutes.getAll);
  app.get('/it/portfolio/web-and-apps/tags/', webRoutes.getAllTags);
  app.get('/it/portfolio/web-and-apps/(:web)', webRoutes.get);
  app.get('/it/portfolio/web-and-apps/page/(:page)', webRoutes.getAll);
  app.get('/it/portfolio/web-and-apps/tags/(:tag)', webRoutes.getTag);

  /* app.get('/it/portfolio/videos/', videosRoutes.getAll);
  app.get('/it/portfolio/videos/(:video)', videosRoutes.get);
  app.get('/it/portfolio/videos/page/(:page)', videosRoutes.getAll);

  app.get('/it/portfolio/live-visuals/', eventsRoutes.getAll);
  app.get('/it/portfolio/live-visuals/tags/', eventsRoutes.getAllTags);
  app.get('/it/portfolio/live-visuals/(:event)', eventsRoutes.get);
  app.get('/it/portfolio/live-visuals/page/(:page)', eventsRoutes.getAll);
  app.get('/it/portfolio/live-visuals/tags/(:tag)', eventsRoutes.getAllTags);

  app.get('/it/portfolio/learning/', learningRoutes.getAll);
  app.get('/it/portfolio/learning/(:learning)', learningRoutes.get);
  app.get('/it/portfolio/learning/page/(:page)', learningRoutes.getAll);

  app.get('/it/portfolio/lab/', labRoutes.getAll);
  app.get('/it/portfolio/lab/(:lab)', labRoutes.get);
  app.get('/it/portfolio/lab/page/(:page)', labRoutes.getAll);
 */
  /* app.get('/it/extra/', newsRoutes.getAll);
  app.get('/it/extra/(:new)', newsRoutes.get);
  app.get('/it/extra/page/(:page)', newsRoutes.getAll);
 */
 /*  app.get('/it/portfolio/awards-and-grants/', awardsRoutes.getAll);
  app.get('/it/portfolio/awards-and-grants/(:award)', awardsRoutes.get);
  app.get('/it/portfolio/awards-and-grants/page/(:page)', awardsRoutes.getAll);

  app.get('/it/people', usersRoutes.getUsers);
  app.get('/it/people/(:user)', usersRoutes.get);
  app.get('/it/customers', usersRoutes.getUsers);
  app.get('/it/customers/(:user)', usersRoutes.get); */

  app.get('/it/', indexRoutes.get);
  app.get('/it/(:page)/page/:paging', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)/img/:img', pagesRoutes.get);
  app.get('/it/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/it/(:page)', pagesRoutes.get);
  
  app.post('/it/(:page)', pagesRoutes.post);

  app.get('/portfolio/web-and-apps/', webRoutes.getAll);
  app.get('/portfolio/web-and-apps/tags/', webRoutes.getAllTags);
  app.get('/portfolio/web-and-apps/(:web)', webRoutes.get);
  app.get('/portfolio/web-and-apps/page/(:page)', webRoutes.getAll);
  app.get('/portfolio/web-and-apps/tags/(:tag)', webRoutes.getTag);

  /* app.get('/portfolio/videos/', videosRoutes.getAll);
  app.get('/portfolio/videos/(:video)', videosRoutes.get);
  app.get('/portfolio/videos/page/(:page)', videosRoutes.getAll); */

  /* app.get('/portfolio/live-visuals/', eventsRoutes.getAll);
  app.get('/portfolio/live-visuals/tags/', eventsRoutes.getAllTags);
  app.get('/portfolio/live-visuals/(:event)', eventsRoutes.get);
  app.get('/portfolio/live-visuals/page/(:page)', eventsRoutes.getAll);
  app.get('/portfolio/live-visuals/tags/(:tag)', eventsRoutes.getTag); */

  /* app.get('/portfolio/learning/', learningRoutes.getAll);
  app.get('/portfolio/learning/(:learning)', learningRoutes.get);
  app.get('/portfolio/learning/page/(:page)', learningRoutes.getAll);

  app.get('/portfolio/lab/', labRoutes.getAll);
  app.get('/portfolio/lab/(:lab)', labRoutes.get);
  app.get('/portfolio/lab/page/(:page)', labRoutes.getAll); */

  /* app.get('/extra/', newsRoutes.getAll);
  app.get('/extra/(:new)', newsRoutes.get);
  app.get('/extra/page/(:page)', newsRoutes.getAll); */

  /* app.get('/portfolio/awards-and-grants/', awardsRoutes.getAll);
  app.get('/portfolio/awards-and-grants/(:award)', awardsRoutes.get);
  app.get('/portfolio/awards-and-grants/page/(:page)', awardsRoutes.getAll);

  app.get('/people', usersRoutes.getUsers);
  app.get('/people/(:user)', usersRoutes.get);
  app.get('/customers', usersRoutes.getUsers);
  app.get('/customers/(:user)', usersRoutes.get); */

  app.get('/(:page)/page/:paging', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)', pagesRoutes.get);
  app.get('/(:page)/(:subpage)/(:subsubpage)/(:subsubsubpage)/img/:img', pagesRoutes.get);
  app.get('/(:page)/(:subpage)', pagesRoutes.get);
  app.get('/tools', pagesRoutes.getTools);
  app.get('/(:page)', pagesRoutes.get);
  
  app.post('/(:page)', pagesRoutes.post);

  app.get('*', pagesRoutes.get404);

  //app.get('/users/(:user)', usersRoutes.getUser);
  /*
   app.use('/controlpanel', controlpanelRoutes);
   app.use('/api', apiRoutes);

   app.get('/performers/(:filter)/(:sorting)/(:page)', performersRoutes.get);
   app.get('/performers(*)', performersRoutes.get);

   app.get('/live-visuals/(:filter)/(:sorting)/(:page)', eventsRoutes.get);
   app.get('/events(*)', eventsRoutes.get);

   app.get('/performances/(:filter)/(:sorting)/(:page)', performancesRoutes.get);
   app.get('/performances(*)', performancesRoutes.get);

   app.get('/tvshows/(:filter)/(:sorting)/(:page)', tvshowsRoutes.get);
   app.get('/tvshows(*)', tvshowsRoutes.get);

   app.get('/footage/(:filter)/(:sorting)/(:page)', footagesRoutes.get);
   app.get('/footage(*)', footagesRoutes.get);

   app.get('/playlists/(:filter)/(:sorting)/(:page)', playlistsRoutes.get);
   app.get('/playlists(*)', playlistsRoutes.get);

   app.get('/galleries/(:filter)/(:sorting)/(:page)', galleriesRoutes.get);
   app.get('/galleries(*)', galleriesRoutes.get);

   app.get('/search', searchRoutes.get);

   app.get('/swfdata/(:user)/footage/(:footage)', swfdataRoutes.get);
   app.get('/embed/(:user)/footage/(:footage)', swfdataRoutes.get);
   app.get('/download/(:user)/footage/(:footage)', swfdataRoutes.get);
   app.get('/endpage/(:user)/footage/(:footage)', swfdataRoutes.get);

   app.get('/image', imageRoutes.get);

   app.get('/(:user)/live-visuals/(:event)/participate', userRoutes.participateAtUserEvent);
   app.get('/(:user)/live-visuals/(:event)', userRoutes.getUserEvent);
   app.get('/(:user)/performances/(:performance)', userRoutes.getUserPerformance);
   app.get('/(:user)/tvshows/(:tvshow)', userRoutes.getUserTvshow);

   app.get('/(:user)/playlists/(:playlist)', userRoutes.getUserPlaylist);
   app.get('/(:user)/footage/(:footage)', userRoutes.getUserFootage);
   app.get('/(:user)/galleries/(:gallery)', userRoutes.getUserGallery);
   //app.get('/(:user)/crews/(:crew)', userRoutes.getUserCrew);

   app.get('/(:user)/events', userRoutes.getUserEvents);
   app.get('/(:user)/performances', userRoutes.getUserPerformances);
   app.get('/(:user)/tvshows',  userRoutes.getUserTvshows);
   app.get('/(:user)/playlists', userRoutes.getUserPlaylists);
   app.get('/(:user)/footage', userRoutes.getUserFootages);
   app.get('/(:user)/galleries', userRoutes.getUserGalleries);
   app.get('/(:user)/crews', userRoutes.getUserCrews);

   app.get('/(:user)', userRoutes.getUser);
   */
};
