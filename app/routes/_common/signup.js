var request = require('request');

/* exports.get = function(req, res){
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
}; */
exports.post = function(req, res){
  let formData = req.body;
  formData.list = 'AXRGq2Ftn2Fiab3skb5E892g';
  formData.SiteFrom = config.prefix;
  formData.boolean = true;

  var querystring = require('querystring');
  
  // form data
  var postData = querystring.stringify(formData);
  
  request({
    method: 'POST',
    url: config.accounts.newsletter.url+"/subscribe",
    body: postData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  },
  function(error, response, body){
    if(error) {
      res.status(200).send({type:"danger", message: __("Subscription failed")});
    } else {
      if (body === "1") {
        res.status(200).send({type:"success", message: __("Your subscription was successful")});
      } else {
        res.status(200).send({type:"danger", message: body});
      }
    }
  });
}