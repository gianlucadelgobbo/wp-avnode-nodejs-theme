var request = require('request');

exports.get = function(req, res){
  var print = {};
  request({
      method: 'GET',
      //url: config.accounts.newsletter.url+"/interest-categories/", // Groups
      url: config.accounts.newsletter.url+"/interest-categories/1c8fca4933/interests", // AVnode Topics
      //url: config.accounts.newsletter.url+"/interest-categories/94dbbdfc87/interests", // Topics
      //url: config.accounts.newsletter.url+"/interest-categories/e9d31d255c/interests", // Private site_from Flyer c25f85cc21, LPM 62930ecf78, VJTV eae93b0c70, AVnode 4742751cda, LCF 995b8b8a6d, Shockart 6be13adfd8
      headers: {
        Authorization: 'apikey '+config.accounts.newsletter.apikey,
        'Content-Type': 'application/json'
      }
    },
    function(error, response, body){
      if(error) {
        res.send(error);
      } else {
        var result = JSON.parse(body);
        print.avnodetopics = {};
        for (item in result.interests){
          print.avnodetopics[result.interests[item].id] = result.interests[item].name;
        }
        request({
            method: 'GET',
            //url: config.accounts.newsletter.url+"/interest-categories/", // Groups
            url: config.accounts.newsletter.url+"/interest-categories/94dbbdfc87/interests", // Topics
            //url: config.accounts.newsletter.url+"/interest-categories/e9d31d255c/interests", // Private site_from Flyer c25f85cc21, LPM 62930ecf78, VJTV eae93b0c70, AVnode 4742751cda, LCF 995b8b8a6d, Shockart 6be13adfd8
            headers: {
              Authorization: 'apikey '+config.accounts.newsletter.apikey,
              'Content-Type': 'application/json'
            }
          },
          function(error, response, body){
            if(error) {
              res.send(error);
            } else {
              var result = JSON.parse(body);
              print.topics = {};
              for (item in result.interests){
                print.topics[result.interests[item].id] = result.interests[item].name;
              }
              request({
                  method: 'GET',
                  //url: config.accounts.newsletter.url+"/interest-categories/", // Groups
                  url: config.accounts.newsletter.url+"/interest-categories/e9d31d255c/interests", // Private site_from Flyer c25f85cc21, LPM 62930ecf78, VJTV eae93b0c70, AVnode 4742751cda, LCF 995b8b8a6d, Shockart 6be13adfd8
                  headers: {
                    Authorization: 'apikey '+config.accounts.newsletter.apikey,
                    'Content-Type': 'application/json'
                  }
                },
                function(error, response, body){
                  if(error) {
                    res.send(error);
                  } else {
                    var result = JSON.parse(body);
                    print.site_from = {};
                    for (item in result.interests){
                      print.site_from[result.interests[item].id] = result.interests[item].name;
                    }
                    res.send(JSON.stringify(print, null, '\t'));
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.post = function(req, res){
  var interests = {};
  for (var item in config.accounts.newsletter.interests) interests[item] = true;
  interests[config.accounts.newsletter.site_from] = true;
  request({
      method: 'POST',
      url: config.accounts.newsletter.url+"/members",
      body: JSON.stringify({
        "email_address": req.body.email,
        "status": "subscribed",
        "double_optin": false,
        "interests" : interests
      }),
      headers: {
        Authorization: 'apikey '+config.accounts.newsletter.apikey,
        'Content-Type': 'application/json'
      }
    },
    function(error, response, body){
      if(error) {
        res.send(error);
      } else {
        var bodyObj = JSON.parse(body);
        res.send(bodyObj);
      }
    }
  );
};