var helpers = require('../helpers/helpers');
var fnz = require('../helpers/functions');
var jsonfile = require('jsonfile');
var fs = require('fs');

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
                  jsonfile.writeFile(file, obj, function (err) {
                    //if(err) console.log(err);
                    res.json(err || {"writeFileSuccess": file+" SUCCESS"});
                  });
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
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

