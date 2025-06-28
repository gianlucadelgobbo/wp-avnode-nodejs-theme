var axios = require( 'axios' );
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
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/posts/'+req.params.network;
  axios.get(url)
  .then(response => {
    var data = response.data;
    if (data && data.ID) data = fnz.fixResult(data);
    //console.log("//// Event");
    callback(data);
  })
  .catch(error => {
    console.error('Network API error:', error);
    callback(null);
  });
};

/* POST TYPE */
exports.getPostType = function getPostType(req,posttype,callback) {
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/post_type/'+posttype;
  axios.get(url)
  .then(response => {
    var data = response.data;
    //console.log("//// PostType "+posttype);
    //console.log(err || data);
    //if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  })
  .catch(error => {
    console.error('PostType API error:', error);
    callback(null);
  });
};

exports.getContainerPage = function getContainerPage(req,slug,callback) {
  const url = config.data_domain+(req.current_lang!=config.default_lang ? '/'+req.current_lang : '')+'/wp-json/wp/v2/container_pages/'+config.prefix+'/'+ slug;
  //console.log(config.data_domain+(req.current_lang!=config.default_lang ? '/'+req.current_lang : '')+'/wp-json/wp/v2/container_pages/'+config.prefix+'/'+ slug);
  axios.get(url)
  .then(response => {
    var data = response.data;
    if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    //console.log("//// ContainerPage "+slug);
    //console.log(err || data);
    //if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  })
  .catch(error => {
    console.error('ContainerPage API error:', error);
    callback(null);
  });
};

 //////// getGitHub

 exports.getGitHub = function getGitHub(req, callback) {
  const url = config.github;
  axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  })
  .then(response => {
    callback(response.data);
  })
  .catch(error => {
    console.error('GitHub API error:', error);
    callback(null);
  });
};

 //////// PAGES

exports.getPage = function getPage(req,callback) {
  //console.log("avnodeurl");
  var A = ["performances","workshops","installations","lectures","gallery","videos","news","extra","events","members","partnerships","partnerships-management","exhibitions","cultural-productions"];
  if (A.indexOf(req.params.page) === -1 && req.params.subpage) req.params.page = req.params.page+"/"+req.params.subpage;
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/mypages/'+config.prefix+'/'+req.params.page;
  //console.log(url);
  axios.get(url)
  .then(response => {
    var data = response.data;
    if (data && data.ID) data = fnz.fixResult(data);
    if (data && data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    var basepath = req.params.page && config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].basepath ? config.sez.pages.conf[req.params.page].basepath : "";
    if (data && data["sources"] && data["sources"][0]) {
      var avnodeurl = data["sources"][0];
      if (req.params.paging) avnodeurl+= "page/"+req.params.paging;
      //console.log("avnodeurl "+avnodeurl);
      
      axios.get(avnodeurl)
      .then(avnodeResponse => {
        var body = avnodeResponse.data;
        if (body.data) body.events = body.data;
        //console.log("shortcodify");
        var lang_preurl = (req.current_lang == config.default_lang ? '' : '/'+req.current_lang);
        //console.log("shortcodify2"+config.prefix);
        fnz.shortcodify(config.prefix, lang_preurl, data, body, req.params, basepath, data => {
          callback(data);
        });
      })
      .catch(error => {
        console.error('Avnode API error:', error);
        callback(data);
      });
    } else {
      callback(data);
    }
  })
  .catch(error => {
    console.error('Page API error:', error);
    callback(null);
  });
};

exports.getXMLlist = function getXMLlist(req,callback) {
  if (config.prefix=="flyer" && req.params.avnode=="news") req.params.avnode="extra";
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/mypages/'+config.prefix+'/'+req.params.avnode;
  //console.log(url);
  axios.get(url)
  .then(response => {
    var data = response.data;
    if (data && data.ID) data = fnz.fixResult(data);
    if (data && data["sources"] && data["sources"][0]) {
      var avnodeurl = data["sources"][0];
      if (req.params.paging) avnodeurl+= "page/"+req.params.paging;
      //console.log("avnodeurl "+avnodeurl);
      axios.get(avnodeurl)
      .then(avnodeResponse => {
        var body = avnodeResponse.data;
        if (body.data) body.events = body.data;
        var lang_preurl = (req.current_lang == config.default_lang ? '' : '/'+req.current_lang);
        fnz.shortcodify(config.prefix, lang_preurl, data, body, req.params, "", data => {
          callback(data);
        });
      })
      .catch(error => {
        console.error('Avnode XML API error:', error);
        callback(data);
      });
    } else {
      callback(data);
    }
  })
  .catch(error => {
    console.error('XML list API error:', error);
    callback(null);
  });
};

exports.getAll = function getAll(req, sez, limit, page, callback) {
  this.getAllReturn(req, sez, limit, page, [], callback);
};

exports.getAllReturn = function getAllReturn(req, sez, limit, page, p, callback) {
  var trgt = this;
  var previousdata = p;
  //console.log("getAll "+sez.post_type);
  
  var baseUrl = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2';
  var endpoint = sez.post_type == "editions" ? "/"+sez.post_type+'/'+config.prefix : '/'+sez.post_type;
  var url = baseUrl + endpoint;
  
  var params = {
    parent: 0,
    per_page: limit > 0 ? limit : 50,
    page: page
  };
  
  if (sez.site_tax && sez.post_type != "posts") {
    params.site = config.site_tax_id;
    params.filter = {
      order: 'meta_value_num',
      meta_key: 'wpcf-startdate'
    };
  }
  
  axios.get(url, { params: params })
  .then(response => {
    var data = response.data;
    //console.log("//// AllFilterTax "+sez.post_type+" "+config.site_tax_id);
    //console.log(err || data);
    data = fnz.fixResults(data);
    
    // Add pagination info from headers
    if (response.headers['x-wp-totalpages']) {
      data._paging = {
        totalPages: parseInt(response.headers['x-wp-totalpages'])
      };
    }
    
    if (limit == -1) {
      for(var d in data) if (data[d].id) previousdata.push(data[d]);
      if (data._paging && data._paging.totalPages > page) {
        trgt.getAllReturn(req, sez, limit, page+1, previousdata, callback);
      } else {
        callback(previousdata);
      }
    } else {
      callback(data);
    }
  })
  .catch(error => {
    console.error('GetAll API error:', error);
    callback([]);
  });
};

//////// WEB & MOBILE

exports.getWeb = function getWeb(req,callback) {
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/web-and-mobile/'+req.params.web;
  axios.get(url)
  .then(response => {
    var data = response.data;
    //console.log("//// Web "+config.data_domain+(req.current_lang!=config.default_lang ? '/'+req.current_lang : '')+'/wp-json/wp/v2/web-and-mobile/'+req.params.web);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  })
  .catch(error => {
    console.error('Web API error:', error);
    callback(null);
  });
};

exports.getAllWebByTag = function getAllWebByTag(req, limit, page, callback) {
  //console.log("getAllWebByTag "+req.params.tag);
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/post_tag/'+req.params.tag;
  const params = {
    parent: 0,
    per_page: limit,
    page: page
  };
  axios.get(url, { params: params })
  .then(response => {
    var data = response.data;
    //console.log("//// All Web By Tag");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  })
  .catch(error => {
    console.error('GetAllWebByTag API error:', error);
    callback([]);
  });
};


//////// LEARNING

exports.getLearning = function getLearning(req,callback) {
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/learning/'+req.params.learning;
  axios.get(url)
  .then(response => {
    var data = response.data;
    //console.log("//// Learning");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  })
  .catch(error => {
    console.error('Learning API error:', error);
    callback(null);
  });
};

//////// VIDEOS

exports.getVideo = function getVideo(req,callback) {
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/videos/'+req.params.video;
  axios.get(url)
  .then(response => {
    var data = response.data;
    //console.log("//// Video");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  })
  .catch(error => {
    console.error('Video API error:', error);
    callback(null);
  });
};

//////// AWARDS

exports.getAward = function getAward(req,callback) {
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/awards-and-grants/'+req.params.award;
  axios.get(url)
  .then(response => {
    var data = response.data;
    //console.log("//// Award");
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  })
  .catch(error => {
    console.error('Award API error:', error);
    callback(null);
  });
};

//////// LAB

exports.getLab = function getLab(req,callback) {
  const url = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/lab/'+req.params.lab;
  axios.get(url)
  .then(response => {
    var data = response.data;
    //console.log("//// Lab");
    //console.log(data);
    if (data && data.auth_contents) data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  })
  .catch(error => {
    console.error('Lab API error:', error);
    callback(null);
  });
};

exports.getEdition = function getEdition(req,callback) {
  let endpoint = config.data_domain+'/'+req.current_lang+'/wp-json/wp/v2/editions/'+config.prefix+'/'+req.params.edition+'/';
  if (req.params.performance)   endpoint+="program/";
  if (req.params.artist)        endpoint+="artists/";
  if (req.params.subedition)    endpoint+=req.params.subedition+'/';
  if (req.params.subsubedition) endpoint+=req.params.subsubedition+'/';
  //console.log("endpoint "+endpoint);
  axios.get(endpoint)
  .then(response => {
    var data = response.data;
    //console.log("data ");
    //console.log(data);
    let avnodeurl;
    if (req.params.subsubedition) {
      var lang_predomain = 'https://'+(req.current_lang == "en" ? '' : req.current_lang+'.')+"api.avnode.net";
      if (req.params.image) {
        avnodeurl = lang_predomain+"/galleries/"+req.params.subsubedition+"/img/"+req.params.image;
      } else if (req.params.subedition == "gallery") {
        avnodeurl = lang_predomain+"/galleries/"+req.params.subsubedition;
      } else if (req.params.subedition == "videos") {
        avnodeurl = lang_predomain+"/videos/"+req.params.subsubedition;
      } else if (data && data["sources"] && data["sources"][0]) {
        avnodeurl = data["sources"][0];
      }
    } else if (req.params.performance && data && data["sources"] && data["sources"][0]) {
      avnodeurl = data["sources"][0]+req.params.performance+"/";
    } else if (req.params.artist && data && data["sources"] && data["sources"][0]) {
      avnodeurl = data['sources'][0]+(data['sources'][0].indexOf('performers/')!==-1 ? '' : 'performers/')+req.params.artist+'/'
    } else if (data && data["sources"] && data["sources"][0]) {
      avnodeurl = data["sources"][0];
      if (req.params.performance) avnodeurl+= req.params.performance+"/";
    }
    if (data && data.ID) data = fnz.fixResult(data);
    if (data && data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    if (avnodeurl) {
      console.log("avnodeurl "+avnodeurl);
      axios.get(avnodeurl)
      .then(avnodeResponse => {
        var body = avnodeResponse.data;
        if (body) {
          data.avnode = body;
          if (req.params.performance || req.params.artist) {
            callback(data);
          } else {
            /* if (req.params.subsubedition && (req.params.subedition == "gallery" || req.params.subedition == "videos")) {
              data.avnode = body;
            } */
            var lang_preurl = (req.current_lang == config.default_lang ? '' : '/'+req.current_lang);
            var basepath = req.params.page && config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].basepath ? config.sez.pages.conf[req.params.page].basepath : "";
            //console.log("shortcodify"+basepath);
            fnz.shortcodify(config.prefix, lang_preurl, data, body, req.params, basepath, data => {
              callback(data);
            });
          }
        } else {
          callback({});
        }
      })
      .catch(error => {
        console.error('Avnode edition API error:', error);
        callback({});
      });
    } else {
      callback(data);
    }
  })
  .catch(error => {
    console.error('Edition API error:', error);
    callback(null);
  });
}

//////// GLOBAL

// Alternative: In-memory storage (no cookies, but data persists in server memory)
// var userData = new Map(); // Store user data by IP or user agent

exports.checkUserLogin = function checkUserLogin(req, callback) {
  // Call avnode.net API to check if user is logged in
  const loginCheckUrl = 'https://admin.avnode.net/api/session'; // Adjust URL as needed
  
  axios.get(loginCheckUrl, {
    timeout: 5000, // 5 second timeout
    headers: {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
      'Cookie': req.headers.cookie || '' // Forward cookies if needed
    }
  })
  .then(response => {
    const userData = response.data;
    req.current_user = userData.loggedIn ? userData.user : null;
    callback();
  })
  .catch(error => {
    console.error('User login check error:', error.message);
    req.current_user = null; // Default to not logged in on error
    callback();
  });
};

exports.setSessions = function setSessions(req,callback) {
  // Parse language from URL or use default
  var urlA = req.url.split("/");
  var lang = urlA.length>1 && config.locales.indexOf(urlA[1])!=-1 ? urlA[1] : config.default_lang;
  
  // Set language globally
  require('moment/locale/'+(lang=="en" ? "en-gb" : lang));
  global.setLocale(lang);
  
  // Set current edition from URL params or use default
  if (config.last_edition) {
    var current_edition = req.params.edition && config.meta.editions[req.params.edition] ? req.params.edition : config.last_edition;
    
    // Fix edition data if needed
    if (config.meta.editions && config.meta.editions[current_edition] && !config.meta.editions[current_edition].startdateISO) {
      config.meta.editions[current_edition] = fnz.fixResult(config.meta.editions[current_edition]);
    }
    
    // Store in request object
    req.current_lang = lang;
    req.current_edition = current_edition;
  }
  
  // Check user login status from avnode.net
  this.checkUserLogin(req, callback);
};
