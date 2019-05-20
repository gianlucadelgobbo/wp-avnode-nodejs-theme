var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');

exports.get = function get(req, res) {
  var user_sez = req.url.indexOf('/it/')===0 ? req.url.split("/")[2] : req.url.split("/")[1];
  //console.log("user_sez "+user_sez);
  helpers.setSessions(req, function() {
      helpers.getUser(req, user_sez, function( result ) {
        //console.log(result);
        result.post_title = result.display_name;
        if (result.img) result.featured = {full:result.img};
        result.meta_description = result.description ? result.description : __("Here you can find all the projects made with")+" "+ result.display_name;
        var page_data = fnz.setPageData(req, result);
        if (result && result.display_name) {
          var pugPage = config.prefix+'/'+'user_'+user_sez;
          res.render(pugPage, {result: result, page_data:page_data, sessions:req.session.sessions, itemprop:config.sez.users[user_sez].itemprop});
        } else {
          res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
        }
      });
  });
};
exports.getUsers = function getUsers(req, res) {
  var user_sez = req.url.indexOf('/it/')===0 ? req.url.split("/")[2] : req.url.split("/")[1];
  //console.log("user_sez "+user_sez);
  helpers.setSessions(req, function() {
    helpers.getContainerPage(req, user_sez, function( posttype ) {
      //console.log(posttype);
      if (posttype.ID) {
        helpers.getAllUsersStatic(req, user_sez, function( results ) {
          //console.log(results);
          var markers = [];
          for (var item=0;item<results.length;item++) {
            //console.log("bella");
            //console.log(results[item]);
            var latlang = [];
            if (results[item].geolocation) latlang = results[item].geolocation.split(";");
            //console.log(results[item]);
            //console.log(latlang);
            if (latlang.length) {
              var marker = {
                lat:latlang[0],
                lng:latlang[1],
                type:results[item].role,
                slug:'/'+config.users_by_id[results[item].ID][config.prefix+"-sez"]+'/'+results[item].user_login+'/',
                display_name:results[item].display_name,
                date:results[item].role,
                destination:results[item].city+", "+results[item].country
              };
              //console.log(marker);
              markers.push(marker);
            }
          }
          if (results[0].data && results[0].data.geolocation) {
          }
          //console.log("bingo");
          //console.log(posttype);
          var page_data = fnz.setPageData(req, posttype);
          //meta_data.title = __(config.sez.users[user_sez].title) + " | " + (req.session.sessions.current_lang == config.default_lang ? "" : req.session.sessions.current_lang.toUpperCase()+" | ")+ config.project_name;
          //if (posttype.post_content) meta_data.description[req.session.sessions.current_lang] = fnz.makeExcerpt(posttype.post_content, 160);
          res.render(config.prefix+'/'+'users_'+user_sez, {results: results, markers:markers, page_data:page_data, sessions:req.session.sessions, posttype:posttype, sez:config.sez.users, title: __(config.sez.users[user_sez].title)/*, itemprop:"sponsor"*/});
        });
      } else {
        var page_data = fnz.setPageData(req, {});
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }

    });
  });
};


