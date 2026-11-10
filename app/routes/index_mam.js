var helpers = require('../helpers/helpers');
var fnz = require('../helpers/functions');
var jsonfile = require('jsonfile');
var fs = require('fs');
var request = require('request');

function groupHomeEvents(items) {
  var now = Math.floor(Date.now() / 1000);
  var today = [], upcoming = [];
  items.forEach(function(item) {
    var end = item.enddate || item.startdate;
    if (!end || end < now) return;
    if (item.startdate && item.startdate <= now) {
      today.push(item);
    } else {
      upcoming.push(item);
    }
  });
  return { today: today, upcoming: upcoming };
}

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/cache/'+config.prefix+'_home_'+req.session.sessions.current_lang+'.json';
    if (req.query.createcache==1 || !fs.existsSync(file)){
      req.params.page = "news";
      helpers.getPage(req, function(result_news) {
        req.params.page = "events";
        helpers.getPage(req, function(result_events) {
          var page_data = fnz.setPageData(req, {'ID':'100'});
          var obj = {
            results: {news: result_news.post_content, events: result_events.post_content},
            page_data: page_data,
            sessions: req.session.sessions
          };
          jsonfile.writeFile(file, obj)
          .then(r => {
            res.json({"writeFileSuccess": file+" SUCCESS"});
          })
          .catch(error => res.json(error))
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","");
      for(var item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");

      var calUrl    = config.data_domain + '/wp-json/wp/v2/calendar/' + config.prefix + '?per_page=100';
      var mediaUrl  = config.data_domain + '/wp-json/wp/v2/media?parent=' + config.home_page_id + '&orderby=menu_order&order=asc&per_page=20';

      request({ url: calUrl, json: true, timeout: 5000 }, function(err, response, body) {
        var items = (Array.isArray(body) ? body : []).map(function(i) {
          return {
            slug:        i.slug,
            link:        i.link || null,
            title:       i.title || '',
            subtitle:    i.subtitle || '',
            startdate:   parseInt(i.startdate) || 0,
            enddate:     parseInt(i.enddate) || 0,
            data_evento: i.data_evento || '',
            location:    i.location || '',
            image:       i.image || ''
          };
        });
        var groups = groupHomeEvents(items);
        obj.today    = groups.today;
        obj.upcoming = groups.upcoming;

        if (config.home_page_id) {
          request({ url: mediaUrl, json: true, timeout: 5000 }, function(err2, res2, media) {
            obj.carousel = (Array.isArray(media) ? media : []).map(function(m) {
              return {
                src:   m.source_url,
                alt:   m.alt_text || (m.title && m.title.rendered) || '',
                link:  m.caption && m.caption.rendered ? m.caption.rendered.replace(/<[^>]+>/g,'').trim() : ''
              };
            });
            res.render(config.prefix+'/'+'index', obj);
          });
        } else {
          res.render(config.prefix+'/'+'index', obj);
        }
      });
    }
  });
};
