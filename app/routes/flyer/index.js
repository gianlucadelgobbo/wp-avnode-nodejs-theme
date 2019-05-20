var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');
var fnz = require('../../functions');

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/tmp/'+config.prefix+'/home_'+req.session.sessions.current_lang+'.json';
    var user_sez = "people";
    var userfile = config.root+'/config/'+config.prefix+'_users_'+user_sez+'.json';
    //console.log(file);
    //console.log(req.session.sessions);
    if (req.query.createcache==1 || !fs.existsSync(file)){
      req.params = {"page":"profile"};
      helpers.getPage(req, function( profile ) {
        helpers.getContainerPage(req, "news", function( posttype_news ) {
          helpers.getContainerPage(req, "events", function( posttype_events ) {
            helpers.getContainerPage(req, "web-and-mobile", function( posttype_web ) {
              helpers.getContainerPage(req, "learning", function( posttype_learning ) {
                helpers.getContainerPage(req, "videos", function( posttype_video ) {
                  helpers.getContainerPage(req, "lab", function( posttype_lab ) {
                    helpers.getContainerPage(req, "awards-and-grants", function( posttype_awards ) {
                      helpers.getAll(req, config.sez["news"], config.sez.home.news.limit, 1, function (result_news) {
                        helpers.getAll(req, config.sez["events"], config.sez.home.events.limit, 1, function (result_events) {
                          helpers.getAll(req, config.sez["web-and-mobile"], config.sez.home.web.limit, 1, function (result_web) {
                            //console.log(config.sez.home.web.limit);
                            //console.log(result_web.length);
                            if (!result_web.length || result_web.length<config.sez.home.web.limit) this.get(req, res);
                            //res.redirect((req.session.sessions.current_lang=='it' ? '/it' : '')+'/?createcache=1');
                            helpers.getAll(req, config.sez["learning"], config.sez.home.learning.limit, 1, function (result_learning) {
                              helpers.getAll(req, config.sez["videos"], config.sez.home.videos.limit, 1, function (result_videos) {
                                helpers.getAll(req, config.sez["lab"], config.sez.home.lab.limit, 1, function (result_lab) {
                                  helpers.getAll(req, config.sez["awards-and-grants"], config.sez.home.award.limit, 1, function (result_award) {
                                    var page_data = fnz.setPageData(req, {'ID':'100'});
                                    var obj = {
                                      results: {news:result_news,events:result_events,web:result_web,learning:result_learning,videos:result_videos,lab:result_lab,awards:result_award},
                                      page_data:page_data, sessions:req.session.sessions,posttype_events:posttype_events,profile:profile,posttype_lab:posttype_lab,posttype_web:posttype_web,posttype_video:posttype_video,posttype_learning:posttype_learning,posttype_news:posttype_news,posttype_awards:posttype_awards
                                    };
                                    jsonfile.writeFile(file, obj, function (err) {
                                      //if(err) console.log(err);
                                      res.render(config.prefix+'/'+'index',obj);
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    } else if (req.query.createusers==1 || !fs.existsSync(userfile)){
      helpers.getAllUsers(req, user_sez, function( results ) {
        jsonfile.writeFile(userfile, results, function (err) {
          //if(err) console.log(err);
          var user_sez = "customers";
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

