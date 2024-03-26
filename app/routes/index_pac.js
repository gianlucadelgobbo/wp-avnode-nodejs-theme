var helpers = require('../helpers/helpers');
var fnz = require('../helpers/functions');
var jsonfile = require('jsonfile');
var fs = require('fs');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/cache/'+config.prefix+'_home_'+req.session.sessions.current_lang+'.json';
    if (req.query.createcache==1 || !fs.existsSync(file)){
      //console.log("getAll news");
      req.params.page = "videos";
      helpers.getPage(req, function(result_videos) {
        req.params.page = "partnerships";
        helpers.getPage(req, function(result_partnerships) {
          req.params.page = "home";
          helpers.getPage(req, function(home) {
            var page_data = fnz.setPageData(req, {'ID':'100', post_title: "Home"});
            var obj = {
              results: {home:home.post_content,videos:result_videos.avnode.videos,partnerships_html:result_partnerships.post_content,partnerships:result_partnerships.avnode.partnerships},
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
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","")
      for(item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

