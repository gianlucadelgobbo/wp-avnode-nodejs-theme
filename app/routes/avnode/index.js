var helpers = require('../../helpers');
var jsonfile = require('jsonfile');
var fs = require('fs');
var fnz = require('../../functions');

exports.getInsta = function getInsta(req, res) {
  var redirect_uri = config.domain+"/insta/";
  //var redirect_uri = "http://localhost:3007/insta/";

  if (req.query.code) {
    var ig = require('instagram-node').instagram();
    ig.use({ client_id: config.accounts.instagram.client_id, client_secret: config.accounts.instagram.client_secret });
    ig.authorize_user(req.query.code, redirect_uri, function(err, result) {
      if (err) {
        //console.log(err);
        //console.log("Didn't work"+req.query.code);
        //console.log(redirect_uri);
      } else {
        //console.log('Yay! Access token is ' + result.access_token);
        ig.use({ access_token: result.access_token });

        ig.user_self_media_recent({count:6},function(err, medias, pagination, remaining, limit) {
          //ig.use({ access_token: '818216a3ba354059b19c8464d87ca865' });
          var insta = [];
          //console.log("instagram-node");
          for(var item in medias) {
            insta.push({
              img:medias[item].images.low_resolution,
              likes:medias[item].likes.count,
              comments:medias[item].comments.count,
              link:medias[item].link
            });
            //console.log(medias[item].images.thumbnail);
            //console.log(medias[item].images.standard_resolution);
            //console.log(medias[item].images.low_resolution);
            //console.log(medias[item].likes.count);
            //console.log(medias[item].comments.count);
            //console.log(medias[item].link);
          }
          //console.log(err);
          //console.log(medias);
          //console.log(pagination);
          //console.log(remaining);
          //console.log(limit);
          jsonfile.writeFile(config.root+'/tmp/'+config.prefix+'/insta.json', insta, function (err) {
            res.send(err || insta);
          });

        });

      }
    });
  } else {
    var url = 'https://api.instagram.com/oauth/authorize/?client_id='+config.accounts.instagram.client_id+'&redirect_uri='+redirect_uri+'&response_type=code'
    res.redirect(url);
    //res.redirect(ig.get_authorization_url(redirect_uri, { scope: ['likes']}));
  }
  //res.render(config.prefix+'/'+'index', {data: {news:result_news,events:result_events,activities:result_activities}, page_data:page_data, sessions:req.session.sessions});
};

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    var file = config.root+'/tmp/'+config.prefix+'/home_'+req.session.sessions.current_lang+'.json';
    var user_sez = "team";
    var userfile = config.root+'/config/'+config.prefix+'_users_'+user_sez+'.json';
   if (req.query.createcache==1 || !fs.existsSync(file)){
      helpers.getAll(req, config.sez.news, config.sez.home.news.limit, 1, function (result_news) {
        helpers.getAll(req, config.sez.events, config.sez.home.events.limit, 1, function (result_events) {
          helpers.getAll(req, config.sez.activities, config.sez.home.activities.limit, 1, function (result_activities) {
            var page_data = fnz.setPageData(req, {'ID':'100'});
            var obj = {
              results: {news:result_news,events:result_events,activities:result_activities/**/},
              page_data:page_data, sessions:req.session.sessions
            };
            obj.insta = jsonfile.readFileSync(config.root+'/tmp/'+config.prefix+'/insta.json');
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
              //console.log(obj.results.web);
              var user_sez = "members";
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
        });
      });
} else {
      var obj = jsonfile.readFileSync(file);
      //obj.insta = jsonfile.readFileSync(config.root+'/tmp/'+config.prefix+'/insta.json');
      //jsonfile.writeFile(config.root+'/tmp/'+config.prefix+'/insta.json', obj.insta, function (err) {
        //console.log(err);
      //});
      obj.page_data.url = obj.page_data.url.replace("?createcache=1","")
      for(item in obj.page_data.langSwitcher) obj.page_data.langSwitcher[item] = obj.page_data.langSwitcher[item].replace("?createcache=1","");
      res.render(config.prefix+'/'+'index',obj);
    }
  });
};

