var indexRoutes    = require('./index_mam');
var sitemapRoutes  = require('./_common/sitemap');
var signupRoutes   = require('./_common/signup');
var pagesRoutes    = require('./_common/pages');
var robotsRoutes   = require('./_common/robots');
var metaRoutes     = require('./_common/meta');
var editionsRoutes = require('./_common/editions');
var calendarRoutes = require('./_common/calendar');

module.exports = function(app) {
  app.get('/', indexRoutes.get);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-home.xml', sitemapRoutes.get);
  app.get('/sitemap-pages.xml', sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);
  app.get('/it/:page/page/:paging',         pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/it/:page/:subpage',             pagesRoutes.get);
  app.get('/it/:page',                      pagesRoutes.get);
  app.post('/it/signup',                    signupRoutes.post);

  app.get('/calendar/',            calendarRoutes.get);
  app.get('/calendar/:calendar',   calendarRoutes.getDett);

  app.get('/editions/:edition',                                        editionsRoutes.get);
  app.get('/editions/:edition/artists/:artist',                        editionsRoutes.get);
  app.get('/editions/:edition/:subedition',                            editionsRoutes.get);
  app.get('/editions/:edition/program/detail/:performance',            editionsRoutes.get);
  app.get('/editions/:edition/:subedition/:subsubedition',             editionsRoutes.get);
  app.get('/editions/:edition/:subedition/:subsubedition/:artist',     editionsRoutes.get);

  app.get('/en/', indexRoutes.get);
  app.get('/en/calendar/',         calendarRoutes.get);
  app.get('/en/calendar/:calendar',calendarRoutes.getDett);
  app.get('/en/editions/:edition',                                     editionsRoutes.get);
  app.get('/en/editions/:edition/artists/:artist',                     editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition',                         editionsRoutes.get);
  app.get('/en/editions/:edition/program/detail/:performance',         editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition/:subsubedition',          editionsRoutes.get);
  app.get('/en/editions/:edition/:subedition/:subsubedition/:artist',  editionsRoutes.get);
  app.get('/en/:page/page/:paging',         pagesRoutes.get);
  app.get('/en/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/en/:page/:subpage',             pagesRoutes.get);
  app.get('/en/:page',                      pagesRoutes.get);
  app.post('/en/signup',                    signupRoutes.post);

  app.get('/:page/page/:paging',        pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/:page/:subpage',            pagesRoutes.get);
  app.get('/:page',                     pagesRoutes.get);

  app.post('/signup', signupRoutes.post);
  app.get('*', pagesRoutes.get404);
};
