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

function mapCalendar(body) {
  return (Array.isArray(body) ? body : []).map(function(i) {
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
}

// Slide del carosello = media allegati alla pagina home in WP.
// La didascalia e' il link; se punta a /calendar/<slug>/ di un evento
// gia' finito, la slide viene nascosta automaticamente.
function getCarousel(items, cb, retry) {
  if (!config.home_page_id) return cb([]);
  // orderby=menu_order richiede il filtro rest_media_collection_params in functions.php di admin.mam
  var mediaUrl = config.data_domain + '/wp-json/wp/v2/media?parent=' + config.home_page_id + '&orderby=' + (retry ? 'date' : 'menu_order') + '&order=asc&per_page=20';
  request({ url: mediaUrl, json: true, timeout: 5000 }, function(err, r, media) {
    if (!Array.isArray(media) && !retry) {
      // filtro non installato su WP: ripiega sull'ordine per data invece di un carosello vuoto
      return getCarousel(items, cb, true);
    }
    var now = Math.floor(Date.now() / 1000);
    var ended = {};
    items.forEach(function(i) {
      var end = i.enddate || i.startdate;
      if (end && end < now) ended[i.slug] = true;
    });
    var list = Array.isArray(media) ? media : [];
    // indicizzo le -v per filename (senza path) in modo che directory WP diverse non rompano il match
    var vMap = {};
    list.forEach(function(m) {
      var fname = m.source_url.split('/').pop();
      var vMatch = fname.match(/^(.*)-v(\.(jpe?g|png|webp))$/i);
      if (vMatch) vMap[vMatch[1] + vMatch[2]] = m.source_url;
    });
    var carousel = list.filter(function(m) {
      return !/-v\.(jpe?g|png|webp)$/i.test(m.source_url.split('/').pop());
    }).map(function(m) {
      var fname  = m.source_url.split('/').pop();
      var hMatch = fname.match(/^(.*)-h(\.(jpe?g|png|webp))$/i);
      var base   = hMatch ? (hMatch[1] + hMatch[2]) : null;
      return {
        src:   m.source_url,
        src_v: (base && vMap[base]) ? vMap[base] : '',
        alt:   m.alt_text || (m.title && m.title.rendered) || '',
        link:  m.caption && m.caption.rendered ? m.caption.rendered.replace(/<[^>]+>/g,'').trim() : ''
      };
    }).filter(function(slide) {
      var match = slide.link.match(/\/calendar\/([^\/?#]+)/);
      return !(match && ended[match[1]]);
    });
    cb(carousel);
  });
}

exports.getCarousel = function(cb) {
  var calUrl = config.data_domain + '/wp-json/wp/v2/calendar/' + config.prefix + '?per_page=100';
  request({ url: calUrl, json: true, timeout: 5000 }, function(err, response, body) {
    getCarousel(mapCalendar(body), cb);
  });
};

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

      var calUrl = config.data_domain + '/wp-json/wp/v2/calendar/' + config.prefix + '?per_page=100';

      request({ url: calUrl, json: true, timeout: 5000 }, function(err, response, body) {
        var items = mapCalendar(body);
        var groups = groupHomeEvents(items);
        obj.today    = groups.today;
        obj.upcoming = groups.upcoming;

        getCarousel(items, function(carousel) {
          obj.carousel = carousel;
          res.render(config.prefix+'/'+'index', obj);
        });
      });
    }
  });
};
