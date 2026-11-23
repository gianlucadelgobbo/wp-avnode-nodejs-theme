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

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/cache/'+config.prefix+'_home_'+req.session.sessions.current_lang+'.json';
    if (req.query.createcache==1 || !fs.existsSync(file)){
      //console.log("getAll profile");
      req.params.page = "profile";
      helpers.getPage(req, function(profile) {
        //console.log(profile);
        //console.log("getAll events");
        req.params.page = "extra";
        helpers.getPage(req, function(result_news) {
          req.params.page = "cultural-productions";
          helpers.getPage(req, function(result_events) {
            //console.log("getAll editions");
            //console.log(result_events.avnode);
            req.params.page = "partnerships-management";
            helpers.getPage(req, function(result_partnerships) {
              //console.log("getAll editions");
              req.params.page = "web-and-mobile";
              helpers.getAll(req, config.sez["web-and-apps"], config.sez.home.web.limit, 1, function (result_web) {
                helpers.getContainerPage(req, "web-and-mobile", function( posttype_web ) {
                  var page_data = fnz.setPageData(req, {'ID':'100'});
                  var obj = {
                    results: {profile: profile, posttype_web: posttype_web, web: result_web, news:result_news.post_content, events:result_events, partnerships:result_partnerships.post_content},
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
          });
        });
      });
    } else {
      var obj = jsonfile.readFileSync(file);
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","")
      for(item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      getCarousel(function(carousel) {
        obj.carousel = carousel;
        res.render(config.prefix+'/'+'index', obj);
      });
    }
  });
};

