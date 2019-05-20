var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');
var fnz = require('../../functions');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/tmp/'+config.prefix+'/home_'+req.session.sessions.current_lang+'.json';
    var user_sez = "backstage";
    var userfile = config.root+'/config/'+config.prefix+'_users_'+user_sez+'.json';
    if (req.query.createcache==1 || !fs.existsSync(file)){
      helpers.getAll(req, config.sez.news, config.sez.home.news.limit, 1, function (result_news) {
        helpers.getAll(req, config.sez.events, config.sez.home.events.limit, 1, function (result_events) {
          helpers.getAll(req, config.sez.exhibitions, config.sez.home.exhibitions.limit, 1, function (result_exhibitions) {
            var page_data = fnz.setPageData(req, {'ID':'100'});
            var obj = {
              results: {news:result_news,events:result_events,exhibitions:result_exhibitions},
              page_data:page_data, sessions:req.session.sessions
            };
            jsonfile.writeFile(file, obj, function (err) {
              //console.log(err);
              res.render(config.prefix+'/'+'index',obj);
            });
          });
        });
      });
    } else if (req.query.createusers==1 || !fs.existsSync(userfile)){
      helpers.getAllUsers(req, user_sez, function( results ) {
        jsonfile.writeFile(userfile, results, function (err) {
          //if(err) console.log(err);
          var user_sez = "partners";
          helpers.getAllUsers(req, user_sez, function( results ) {
            var userfile = config.root+'/config/'+config.prefix+'_users_'+user_sez+'.json';
            jsonfile.writeFile(userfile, results, function (err) {
              var obj = jsonfile.readFileSync(file);
              //console.log(obj.results.web);
              res.render(config.prefix+'/'+'index',obj);
            });
          });
        });
      });
} else {
      var obj = jsonfile.readFileSync(file);
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","");
      for(item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

