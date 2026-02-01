var helpers = require('../helpers/helpers');
var fnz = require('../helpers/functions');
var jsonfile = require('jsonfile');
var fs = require('fs');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/cache/'+config.prefix+'_home_'+req.session.sessions.current_lang+'.json';
    console.log("file:",file);
    if (req.query.createcache==1 || !fs.existsSync(file)){
      //console.log("getAll news");
      req.params.page = "news";
      helpers.getPage(req, function(result_news) {
        //console.log("getAll events");
        req.params.page = "partnerships";
        helpers.getPage(req, function(result_events) {
          //console.log("getAll editions");
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
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","")
      for(item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

