var request = require('request');
var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');

function groupEvents(items) {
  var now = Math.floor(Date.now() / 1000);
  var d = new Date();
  var day = d.getDay() || 7;
  var weekStart = new Date(d); weekStart.setHours(0,0,0,0); weekStart.setDate(d.getDate() - day + 1);
  var weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6); weekEnd.setHours(23,59,59,999);
  var tsWeekStart = Math.floor(weekStart.getTime() / 1000);
  var tsWeekEnd   = Math.floor(weekEnd.getTime()   / 1000);

  var today = [], thisWeek = [], upcoming = [], archive = [];
  items.forEach(function(item) {
    var end = item.enddate || item.startdate;
    if (end && end < now) {
      archive.push(item);
    } else if (item.startdate && item.startdate <= now && end >= now) {
      today.push(item);
    } else if (item.startdate && item.startdate <= tsWeekEnd && end >= tsWeekStart) {
      thisWeek.push(item);
    } else {
      upcoming.push(item);
    }
  });
  return { today: today, thisWeek: thisWeek, upcoming: upcoming, archive: archive };
}

exports.getDett = function(req, res) {
  helpers.setSessions(req, function() {
    var slug = req.params.calendar;
    var page_data = fnz.setPageData(req, {});
    var url = config.data_domain + '/wp-json/wp/v2/editions/' + config.prefix + '/' + slug;
    request({ url: url, json: true, timeout: 8000 }, function(err, response, body) {
      if (!body || !body.post_title) {
        return res.status(404).render(config.prefix + '/404', { page_data: page_data, sessions: req.session.sessions, itemtype: 'WebPage' });
      }
      var link = body['wpcf-link'] || null;
      if (!link) return res.redirect('/editions/' + slug + '/');
      var item = {
        slug:        slug,
        link:        link,
        title:       body.post_title,
        subtitle:    body['wpcf-sub-title'] || '',
        startdate:   parseInt(body['wpcf-startdate']) || 0,
        enddate:     parseInt(body['wpcf-enddate']) || 0,
        data_evento: body.data_evento || '',
        location:    body['wpcf-location'] || '',
        image:       (body.featured && body.featured.full) ? body.featured.full : '',
        content:     body.post_content || ''
      };
      res.render(config.prefix + '/page_calendar_dett', {
        page_data: page_data,
        sessions: req.session.sessions,
        item: item
      });
    });
  });
};

exports.get = function(req, res) {
  helpers.setSessions(req, function() {
    var page_data = fnz.setPageData(req, {});
    var url = config.data_domain + '/wp-json/wp/v2/calendar/' + config.prefix;
    request({ url: url, json: true, timeout: 8000 }, function(err, response, body) {
      var items = (Array.isArray(body) ? body : []).map(function(item) {
        return {
          slug:       item.slug,
          link:       item.link || null,
          title:      item.title || '',
          subtitle:   item.subtitle || '',
          startdate:  parseInt(item.startdate) || 0,
          enddate:    parseInt(item.enddate) || 0,
          data_evento: item.data_evento || '',
          location:   item.location || '',
          image:      item.image || ''
        };
      });
      var groups = groupEvents(items);
      res.render(config.prefix + '/page_calendar', {
        page_data: page_data,
        sessions: req.session.sessions,
        today:    groups.today,
        thisWeek: groups.thisWeek,
        upcoming: groups.upcoming,
        archive:  groups.archive,
        allItems: items
      });
    });
  });
};
