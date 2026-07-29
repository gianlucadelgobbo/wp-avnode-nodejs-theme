var indexRoutes   = require('./index_mam');
var avnodeMam     = require('./_common/avnode_mam');
var sitemapRoutes = require('./_common/sitemap');
var signupRoutes  = require('./_common/signup');
var pagesRoutes   = require('./_common/pages');
var robotsRoutes  = require('./_common/robots');
var metaRoutes    = require('./_common/meta');
var helpers       = require('../../app/helpers/helpers');
var fnz           = require('../../app/helpers/functions');

// Only proceed if the page slug is an avnode section (calendar, artists, …)
function ifAvnodeSection(req, res, next) {
  var sections = config.avnode_sections || [];
  if (sections.indexOf(req.params.page) === -1) return next('route');
  next();
}

function send404(req, res) {
  helpers.setSessions(req, function() {
    res.status(404).render('mam/404', { sessions: req.session.sessions, page_data: fnz.setPageData(req, {}) });
  });
}

// ── avnode sub-route handlers ─────────────────────────────────────────────────

function handlePerfSlug(req, res) {
  helpers.setSessions(req, function() {
    avnodeMam.getPerformance(req.params.perfSlug, function(err, perf) {
      if (err || !perf) return send404(req, res);
      avnodeMam.getEvent(req.params.eventSlug, function(err2, event) {
        res.render('mam/event_performance', {
          sessions:  req.session.sessions,
          page_data: fnz.setPageData(req, { title: perf.title }),
          event:     event || {},
          perf:      perf,
          basepage:  req.params.page,
          basepath:  '/' + req.params.page + '/' + req.params.eventSlug + '/program/' + req.params.perfSlug
        });
      });
    });
  });
}

function handleArtistSlug(req, res) {
  helpers.setSessions(req, function() {
    avnodeMam.getArtist(req.params.artistSlug, function(err, artist) {
      if (err || !artist) return send404(req, res);
      avnodeMam.getEvent(req.params.eventSlug, function(err2, event) {
        res.render('mam/event_artist', {
          sessions:  req.session.sessions,
          page_data: fnz.setPageData(req, { title: artist.stagename }),
          event:     event || {},
          artist:    artist,
          basepage:  req.params.page,
          basepath:  '/' + req.params.page + '/' + req.params.eventSlug + '/artists/' + req.params.artistSlug
        });
      });
    });
  });
}

function handleProgram(req, res) {
  helpers.setSessions(req, function() {
    avnodeMam.getEventProgram(req.params.eventSlug, function(err, data) {
      if (err || !data) return send404(req, res);
      res.render('mam/event_program', {
        sessions:  req.session.sessions,
        page_data: fnz.setPageData(req, { title: data.title }),
        event:     data,
        basepage:  req.params.page,
        basepath:  '/' + req.params.page + '/' + req.params.eventSlug + '/program'
      });
    });
  });
}

function handleArtists(req, res) {
  helpers.setSessions(req, function() {
    avnodeMam.getEvent(req.params.eventSlug, function(err, event) {
      if (err || !event) return send404(req, res);
      res.render('mam/event_artists', {
        sessions:  req.session.sessions,
        page_data: fnz.setPageData(req, { title: event.title }),
        event:     event,
        artists:   event.users || [],
        basepage:  req.params.page,
        basepath:  '/' + req.params.page + '/' + req.params.eventSlug + '/artists'
      });
    });
  });
}

function handleEvent(req, res) {
  helpers.setSessions(req, function() {
    avnodeMam.getEvent(req.params.eventSlug, function(err, event) {
      if (err || !event) return send404(req, res);
      res.render('mam/event', {
        sessions:  req.session.sessions,
        page_data: fnz.setPageData(req, { title: event.title }),
        event:     event,
        basepage:  req.params.page,
        basepath:  '/' + req.params.page + '/' + req.params.eventSlug
      });
    });
  });
}

// ── API handlers ──────────────────────────────────────────────────────────────

function mamOrgUrl(lang) {
  return lang && lang !== 'en'
    ? 'https://' + lang + '.api.admin.avnode.net/mam-media-art-museum/'
    : 'https://api.admin.avnode.net/mam-media-art-museum/';
}

function handleApiCalendar(req, res) {
  var lang = req.query.lang || 'en';
  avnodeMam.getMamOrg(mamOrgUrl(lang), function(err, org) {
    if (err) return res.status(502).json({ error: err.message });
    var events = (org && (org.events || org.data)) || [];
    res.json(events.map(function(e) {
      return { date: e.boxDate || '', title: e.title || '', location: e.boxVenue || '', slug: e.slug, url: '/calendar/' + e.slug };
    }));
  });
}

function handleApiEvents(req, res) {
  var lang = req.query.lang || 'en';
  avnodeMam.getMamOrg(mamOrgUrl(lang), function(err, org) {
    if (err) return res.status(502).json({ error: err.message });
    var events = (org && (org.events || org.data)) || [];
    res.json(events.map(function(e) {
      return {
        image: e.imageFormats && e.imageFormats.large ? e.imageFormats.large : '',
        title: e.title || '',
        date: e.boxDate || '',
        description: e.description || '',
        url: '/calendar/' + e.slug
      };
    }));
  });
}

// ── router ────────────────────────────────────────────────────────────────────

module.exports = function(app) {
  app.get('/', indexRoutes.get);

  app.get('/api/mam/calendar', handleApiCalendar);
  app.get('/api/mam/events',   handleApiEvents);

  app.get('/meta/', metaRoutes.get);
  app.get('/robots.txt', robotsRoutes.get);
  app.get('/sitemap.xml', sitemapRoutes.get);
  app.get('/sitemap-home.xml', sitemapRoutes.get);
  app.get('/sitemap-pages.xml', sitemapRoutes.get);

  app.get('/it/', indexRoutes.get);
  app.get('/it/:page/page/:paging',        pagesRoutes.get);
  app.get('/it/:page/:subpage/:subsubpage', pagesRoutes.get);
  app.get('/it/:page/:subpage',            pagesRoutes.get);
  app.get('/it/:page',                     pagesRoutes.get);
  app.post('/it/signup', signupRoutes.post);

  // avnode sub-routes — checked BEFORE generic WP page routes
  app.get('/:page/:eventSlug/program/:perfSlug',    ifAvnodeSection, handlePerfSlug);
  app.get('/:page/:eventSlug/artists/:artistSlug',  ifAvnodeSection, handleArtistSlug);
  app.get('/:page/:eventSlug/program',              ifAvnodeSection, handleProgram);
  app.get('/:page/:eventSlug/artists',              ifAvnodeSection, handleArtists);
  app.get('/:page/:eventSlug',                      ifAvnodeSection, handleEvent);

  // generic WP pages
  app.get('/:page/page/:paging',                   pagesRoutes.get);
  app.get('/:page/:subpage/:subsubpage',            pagesRoutes.get);
  app.get('/:page/:subpage',                        pagesRoutes.get);
  app.get('/:page',                                 pagesRoutes.get);

  app.post('/signup', signupRoutes.post);
  app.get('*', pagesRoutes.get404);
};
