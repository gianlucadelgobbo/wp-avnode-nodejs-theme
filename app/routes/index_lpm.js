var helpers = require('../helpers/helpers');
var fnz = require('../helpers/functions');
var jsonfile = require('jsonfile');
var fs = require('fs');
var request = require('request');

function getCarousel(cb, retry) {
  if (!config.home_page_id) return cb([]);
  var mediaUrl = config.data_domain + '/wp-json/wp/v2/media?parent=' + config.home_page_id + '&orderby=' + (retry ? 'date' : 'menu_order') + '&order=asc&per_page=20';
  request({ url: mediaUrl, json: true, timeout: 5000 }, function(err, r, media) {
    if (!Array.isArray(media) && !retry) return getCarousel(cb, true);
    var list = Array.isArray(media) ? media : [];
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
    });
    cb(carousel);
  });
}

exports.getCarousel = function(cb) {
  getCarousel(cb);
};

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/cache/'+config.prefix+'_home_'+req.session.sessions.current_lang+'.json';
    if (req.query.createcache==1 || !fs.existsSync(file)){
      req.params.page = "news";
      helpers.getPage(req, function(result_news) {
        req.params.page = "partnerships";
        helpers.getPage(req, function(result_events) {
          req.params.page = "events";
          helpers.getPage(req, function(result_editions) {
            var page_data = fnz.setPageData(req, {'ID':'100'});
            var obj = {
              results: {news:result_news.post_content,events:result_events.post_content,editions:result_editions.post_content},
              page_data:page_data,
              sessions:req.session.sessions
            };
            jsonfile.writeFile(file, obj)
            .then(r => {
              res.json({"writeFileSuccess": file+" SUCCESS"});
            })
            .catch(error => res.json(error))
          });
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","");
      for(var item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      getCarousel(function(carousel) {
        obj.carousel = carousel;
        res.render(config.prefix+'/'+'index', obj);
      });
    }
  });
};

