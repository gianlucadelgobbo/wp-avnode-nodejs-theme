var WPAPI = require( 'wpapi' );
var request = require( 'request' );
var moment = require( 'moment' );
var fnz = require('./functions');
var Validators = require('./validators').Validators;

exports.validateFormEmail = function validateFormEmail(o,callback) {
  var e = [];
  if (!Validators.validateStringLength(o.name, 3, 100)){
    e.push({name:"name",m:__("Please enter a valid Name")});
  }
  if(!Validators.validateEmail(o.email)){
    e.push({name:"email",m:__("Email is not an email")});
  }
  if (!Validators.validateStringLength(o.message, 3, 100000)){
    e.push({name:"name",m:__("Please enter a valid Message")});
  }
  callback(e, o);
};

exports.validateFormNewsletter = function validateFormNewsletter(o,callback) {
  var e = [];
  if (!Validators.validateStringLength(o.name, 3, 100)){
    e.push({name:"name",m:__("Please enter a valid name")});
  }
  if (!Validators.validateStringLength(o.Surname, 3, 100)){
    e.push({name:"Surname",m:__("Please enter a valid surnameeee")});
  }
  if(!Validators.validateEmail(o.email)){
    e.push({name:"email",m:__("Email is not an email")});
  }
  if(!Validators.validateStringLength(o.Country, 2, 100)){
    e.push({name:"Country",m:__("Please select your country")});
  }
  if(!o.topics.length){
    e.push({name:"topics",m:__("Please select at least one topic")});
  }
  callback(e, o);
};

exports.validateFormJoin = function validateFormJoin(o,callback) {
  var e = [];
  if (!Validators.validateStringLength(o.organization_name, 3, 100)){
    e.push({name:"organization_name",m:__("Organization name is required")});
  }
  if(!Validators.validateStringLength(o.organization_country, 3, 100)){
    e.push({name:"organization_country",m:__("Please select your Organization country")});
  }
  if (!Validators.validateStringLength(o.name, 3, 100)){
    e.push({name:"name",m:__("Your name is required")});
  }
  if(!Validators.validateEmail(o.email)){
    e.push({name:"email",m:__("Email is not an email")});
  }
  if (!Validators.validateStringLength(o.activity_description, 3, 100000)){
    e.push({name:"activity_description",m:__("Organization activity description is required")});
  }
  if (!Validators.validateStringLength(o.activity_list, 3, 100000)){
    e.push({name:"activity_list",m:__("Activities name list is required")});
  }
  callback(e, o);
};

//////// NETWORK

exports.getNetwork = function getNetwork(req,callback) {
  //console.log("//// Eventoooo");
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/posts/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.network).get(function( err, data ) {
    //
    //console.log(data);
    if (data && data.ID) data = fnz.fixResult(data);
    //console.log("//// Event");
    callback(data);
  });
};

/* POST TYPE */
exports.getPostType = function getPostType(req,posttype,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/post_type/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(posttype).get(function( err, data ) {
    //console.log("//// PostType "+posttype);
    //console.log(err || data);
    //if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getContainerPage = function getContainerPage(req,slug,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json' });
  //console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2/container_pages/'+config.prefix+'/'+ slug);
  wp.myCustomResource = wp.registerRoute('wp/v2', '/container_pages/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(config.prefix+'/'+ slug).get(function( err, data ) {
    if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    //console.log("//// ContainerPage "+slug);
    //console.log(err || data);
    //if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

 //////// getGitHub

 exports.getGitHub = function getGitHub(req, callback) {
  const url = config.github;
  request({
    url: url,
    headers: {
      'User-Agent': 'Awesome-Octocat-App'
    },
    json: true
  }, function(error, response, data) {
    //console.log(data)
    callback(data);
  });
};

 //////// PAGES

exports.getPage = function getPage(req,callback) {
  //console.log("avnodeurl");
  var A = ["performances","gallery","videos","news","extra","events","members","partnerships","partnerships-management","exhibitions","cultural-productions"];
  if (A.indexOf(req.params.page) === -1 && req.params.subpage) req.params.page = req.params.page+"/"+req.params.subpage;
  const url = config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/mypages/'+config.prefix+'/'+req.params.page;
  //console.log(url);
  request({
    url: url,
    json: true
  }, function(error, response, data) {
    //console.log("//// Page " + req.params.page);
    if (!error && data && data.ID) {
      var A = ["performances","gallery","galleries","videos","news","extra","events","members","partnerships","partnerships-management","exhibitions","cultural-productions"];
      if (data) data = fnz.fixResult(data);
      /* if (data.posts){
        data.posts = fnz.fixResults(data.posts);
      } */
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources'] && data['sources'][0]) {
        let avnodeurl = data['sources'][0];
        if (A.indexOf(req.params.page) !== -1 && A.indexOf(req.params.subsubpage) !== -1 && req.params.subsubsubpage) {
          avnodeurl = "https://"+avnodeurl.split("/")[2]+"/"+req.params.page+"/"+req.params.subpage+"/"+req.params.subsubpage+"/"+req.params.subsubsubpage+"/";
          if (req.params.img) avnodeurl+= "img/"+req.params.img;
        } else if (A.indexOf(req.params.page) !== -1 && req.params.subpage) {
          avnodeurl = "https://"+avnodeurl.split("/")[2]+"/"+(req.params.page == "members" ? req.params.subpage : (req.params.page == "partnerships" || req.params.page == "partnerships-management" || req.params.page == "cultural-productions" ? "events"+"/"+req.params.subpage : req.params.page == "extra" ? "news"+"/"+req.params.subpage : req.params.page+"/"+req.params.subpage));
        }
        if (req.params.paging) avnodeurl+= "page/"+req.params.paging;
        
        console.log(avnodeurl);
        
        request({
          url: avnodeurl,
          json: true
        }, function(error, response, body) {
          if (response.statusCode==200) {
            data.avnode = body;
            var basepath = req.params.page && config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].basepath ? config.sez.pages.conf[req.params.page].basepath : "";
            if (body.pages) {
              console.log(body.pages)
              for (var item in body.pages) {
                body.pages[item].link = body.pages[item].link.split("/");
                body.pages[item].link.splice(0, body.pages[item].link.indexOf("page")-1);
                body.pages[item].link.unshift(basepath);
                body.pages[item].link = body.pages[item].link.join("/");
              };
            }
            /* if (A.indexOf(req.params.page) !== -1 && A.indexOf(req.params.subsubpage) !== -1 && req.params.subsubsubpage) {
              if (req.params.subsubpage == "galleries") data.gallery = body;
              if (req.params.subsubpage == "videos") data.video = body;
              callback(data);
            } else  */
            if (A.indexOf(req.params.page) !== -1 && req.params.subpage) {
              //console.log("req.params.pagessssssssssss");
              //console.log(req.params.page);
              /* if (req.params.page == "events") data.event = body;
              if (req.params.page == "performances") data.performance = body;
              if (req.params.page == "news") data.news = body;
              if (req.params.page == "members") data.member = body;
              if (req.params.page == "partnerships") data.partnership = body; */
              callback(data);
            } else {
              if (body.data) body.events = body.data;
              //console.log("shortcodify");
              var lang_preurl = (req.session.sessions.current_lang == config.default_lang ? '' : '/'+req.session.sessions.current_lang);
              //console.log("shortcodify2"+basepath);
              fnz.shortcodify(config.prefix, lang_preurl, data, body, req.params, basepath, data => {
                callback(data);
              });
            }
          } else {
            callback({});
          }
        });
      } else {
        //console.log("stocazzo");
        callback(data);
      }
    } else {
      callback({});
    }
  });
};

exports.getXMLlist = function getXMLlist(req,callback) {
  const url = config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/mypages/'+config.prefix+'/'+req.params.avnode;
  console.log(url);
  request({
    url: url,
    json: true
  }, function(error, response, data) {
    //console.log("//// Page " + req.params.page);
    if (!error && data && data.ID) {
      var A = ["performances","gallery","galleries","videos","news","extra","events","members","partnerships","exhibitions"];
      if (data) data = fnz.fixResult(data);
      /* if (data.posts){
        data.posts = fnz.fixResults(data.posts);
      } */
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources'] && data['sources'][0]) {
        let avnodeurl = data['sources'][0];
        if (A.indexOf(req.params.avnode) !== -1 && A.indexOf(req.params.subsubpage) !== -1 && req.params.subsubsubpage) {
          //console.log(req.params);
          avnodeurl = "https://"+avnodeurl.split("/")[2]+"/"+req.params.avnode+"/"+req.params.subpage+"/"+req.params.subsubpage+"/"+req.params.subsubsubpage+"/";
          if (req.params.img) avnodeurl+= "img/"+req.params.img;
        } else if (A.indexOf(req.params.avnode) !== -1 && req.params.subpage) {
          avnodeurl = "https://"+avnodeurl.split("/")[2]+"/"+(req.params.avnode == "members" ? req.params.subpage : (req.params.avnode == "partnerships" ? "events"+"/"+req.params.subpage : req.params.avnode+"/"+req.params.subpage));
        }
        if (req.params.paging) avnodeurl+= "page/"+req.params.paging;
        //console.log(avnodeurl);
        request({
          url: avnodeurl,
          json: true
        }, function(error, response, body) {
          if (body.pages) {
            for (var item in body.pages) {
              body.pages[item].link = body.pages[item].link.split("/");
              body.pages[item].link.splice(0, 2);
              body.pages[item].link = "/"+body.pages[item].link.join("/");
            };
          }
          if (body[req.params.avnode]) {
            data.avnode = body;
          } else {
            data.avnode = {};
            data.avnode[req.params.avnode] = body.data;
          }
          callback(data);
        });
      } else {
        //console.log("stocazzo");
        callback(data);
      }
    } else {
      callback({});
    }
  });
};

exports.getAll = function getAll(req, sez, limit, page, callback) {
  this.getAllReturn(req, sez, limit, page, [], callback);
};

exports.getAllReturn = function getAllReturn(req, sez, limit, page, p, callback) {
  var trgt = this;
  var previousdata = p;
  console.log("getAll "+sez.post_type);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', sez.post_type == "editions" ? "/"+sez.post_type+'/'+config.prefix : '/'+sez.post_type );
  var mylimit =  limit>0 ? limit : 50;
  if (sez.site_tax && sez.post_type != "posts") {
    wp.myCustomResource().param('site', config.site_tax_id ).param( 'parent', 0 ).param( 'filter[order]', 'meta_value_num' ).param( 'filter[meta_key]', 'wpcf-startdate' ).perPage(mylimit).page(page).get(function( err, data ) {
      console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2' + '/'+sez.post_type+"?site="+config.site_tax_id);
      //console.log("//// AllFilterTax "+sez.post_type+" "+config.site_tax_id);
      //console.log(err || data);
      data = fnz.fixResults(data);
      if (limit == -1) {
        for(var d in data) if (data[d].id) previousdata.push(data[d]);
        if (data._paging.totalPages>page) {
          trgt.getAllReturn(req, sez, limit, page+1, previousdata, callback);
        } else {
          callback(previousdata);
        }
      } else {
        callback(data);
      }

    });
  } else {
    wp.myCustomResource().param( 'parent', 0 )/*.param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax_id )*/.perPage(mylimit).page(page).get(function( err, data ) {
      console.log("//// All "+config.data_domain);
      console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2' + '/'+sez.post_type);
      console.log("//// All "+sez.post_type);
      //console.log(err || data);
      data = fnz.fixResults(data);
      if (limit == -1) {
        for(var d in data) if (data[d].id) previousdata.push(data[d]);
        if (data._paging.totalPages>page) {
          trgt.getAllReturn(req, sez, limit, page+1, previousdata, callback);
        } else {
          callback(previousdata);
        }
      } else {
        callback(data);
      }
    });
  }
};

//////// WEB & MOBILE

exports.getWeb = function getWeb(req,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/web-and-mobile/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.web).get(function( err, data ) {
    //console.log("//// Web "+config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2/web-and-mobile/'+req.params.web);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getAllWebByTag = function getAllWebByTag(req, limit, page, callback) {
  //console.log("getAllWebByTag "+req.params.tag);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/post_tag/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.tag).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    //console.log("//// All Web By Tag");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};


//////// LEARNING

exports.getLearning = function getLearning(req,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/learning/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.learning).get(function( err, data ) {
    //console.log("//// Learning");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// VIDEOS

exports.getVideo = function getVideo(req,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/videos/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.video).get(function( err, data ) {
    //console.log("//// Video");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// AWARDS

exports.getAward = function getAward(req,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/awards-and-grants/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.award). get(function( err, data ) {
    //console.log("//// Award");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

//////// LAB

exports.getLab = function getLab(req,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/lab/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.lab).get(function( err, data ) {
    //console.log("//// Lab");
    //console.log(data);
    if (data && data.auth_contents) data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

exports.getEdition = function getEdition(req,callback) {
  let endpoint = config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/editions/'+config.prefix+'/'+req.params.edition+'/';
  if (req.params.performance)   endpoint+="program/";
  if (req.params.artist)        endpoint+="artists/";
  if (req.params.subedition)    endpoint+=req.params.subedition+'/';
  if (req.params.subsubedition) endpoint+=req.params.subsubedition+'/';
  //console.log("endpoint "+endpoint);
  request({
    url: endpoint,
    json: true
  }, function(error, response, data) {
    let avnodeurl;
    if (req.params.subsubedition) {
      var lang_predomain = 'https://'+(req.session.sessions.current_lang == "en" ? '' : req.session.sessions.current_lang+'.')+"api.avnode.net";
      if (req.params.image) {
        avnodeurl = lang_predomain+"/galleries/"+req.params.subsubedition+"/img/"+req.params.image;
      } else if (req.params.subedition == "gallery") {
        avnodeurl = lang_predomain+"/galleries/"+req.params.subsubedition;
      } else if (req.params.subedition == "videos") {
        avnodeurl = lang_predomain+"/videos/"+req.params.subsubedition;
      } else if (data["sources"] && data["sources"][0]) {
        avnodeurl = data["sources"][0];
      }
    } else if (req.params.performance) {
      avnodeurl = data["sources"][0]+req.params.performance+"/";
    } else if (req.params.artist) {
      avnodeurl = data['sources'][0]+(data['sources'][0].indexOf('performers/')!==-1 ? '' : 'performers/')+req.params.artist+'/'
    } else if (data["sources"] && data["sources"][0]) {
      avnodeurl = data["sources"][0];
      if (req.params.performance) avnodeurl+= req.params.performance+"/";
    }
    if (data && data.ID) data = fnz.fixResult(data);
    if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    if (avnodeurl) {
      console.log("avnodeurl "+avnodeurl);
      request({
        url: avnodeurl,
        json: true
      }, function(error, response, body) {
        if (response.statusCode==200) {
          data.avnode = body;
          if (req.params.performance || req.params.artist) {
            callback(data);
          } else {
            /* if (req.params.subsubedition && (req.params.subedition == "gallery" || req.params.subedition == "videos")) {
              data.avnode = body;
            } */
            var lang_preurl = (req.session.sessions.current_lang == config.default_lang ? '' : '/'+req.session.sessions.current_lang);
            var basepath = req.params.page && config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].basepath ? config.sez.pages.conf[req.params.page].basepath : "";
            //console.log("shortcodify"+basepath);
            fnz.shortcodify(config.prefix, lang_preurl, data, body, req.params, basepath, data => {
              callback(data);
            });
          }
        } else {
          callback({});
        }
      });
    } else {
      callback(data);
    }
  });
}

//////// GLOBAL

exports.setSessions = function setSessions(req,callback) {
  //if (!req.session.meta) req.session.meta = require('util')._extend({}, config.meta);
  if (!req.session.sessions) req.session.sessions = {};
  req.session.sessions = {};
  var urlA = req.url.split("/");
  var lang = urlA.length>1 && config.locales.indexOf(urlA[1])!=-1 ? urlA[1] : config.default_lang;
  if(req.session.sessions.current_lang != lang) {
    req.session.sessions.current_lang = lang;
    require('moment/locale/'+(lang=="en" ? "en-gb" : lang));
    global.setLocale(lang);
  }
  //console.log("sessions.current_lang: "+req.session.sessions.current_lang);
  //console.log(req.params.edition);
  if (config.last_edition) {
    req.session.sessions.current_edition = req.params.edition && config.meta.editions[req.params.edition] ? req.params.edition : config.last_edition;
    //console.log(req.session.sessions.current_edition);
    //console.log(config.meta.editions[req.session.sessions.current_edition]);
    if (config.meta.editions && config.meta.editions[req.session.sessions.current_edition] && !config.meta.editions[req.session.sessions.current_edition].startdateISO) config.meta.editions[req.session.sessions.current_edition] = fnz.fixResult(config.meta.editions[req.session.sessions.current_edition]);
  }
  callback();
};
