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
  if (!Validators.validateStringLength(o.surname, 3, 100)){
    e.push({name:"surname",m:__("Please enter a valid surname")});
  }
  if(!Validators.validateEmail(o.email)){
    e.push({name:"email",m:__("Email is not an email")});
  }
  if(!Validators.validateStringLength(o.country, 3, 100)){
    e.push({name:"country",m:__("Please select your country")});
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
    //console.log("//// ContainerPage "+slug);
    //console.log(err || data);
    //if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
};

/* USERS */
/* 
exports.getUser = function getUser(req, user_sez, callback) {
  //console.log("getUser"+config.data_domain);
  var wpflyer = new WPAPI({ endpoint: config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json' });
  wpflyer.myCustomResource = wpflyer.registerRoute('wp/v2', '/author/(?P<siteee>)/(?P<sluggg>)' );
  wpflyer.myCustomResource().sluggg(req.params.user).siteee(config.prefix).get(function( err, data ) {
    //console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2/author/'+config.prefix+'/'+req.params.user+'/');
    //
    if (err) {
      callback({});
    } else {
      //console.log("//// User "+req.params.user+" "+config.site_tax);
      for(auth_content in data.auth_contents) {
        data.auth_contents[auth_content] = fnz.fixResults(data.auth_contents[auth_content]);
      }
      //console.log(err || data);
      //data = fnz.fixResults(data);
      if (!data.img || data.img=="") data.img = config.domain + config.sez.users[user_sez].default_img;
      callback(data);
    }
  });
};

exports.getAllUsersStatic = function getAllUsersStatic(req, user_sez, callback) {
  var file = config.root+'/config/'+config.prefix+'_users_'+user_sez+'.json';
  var jsonfile = require('jsonfile');
  var fileContents;
  try {
    var data = jsonfile.readFileSync(file);
  } catch (err) {
    //console.log(err);
    // Here you get the error when the file was not found,
    // but you also get any other error
  }

  callback(data);
};
exports.getAllUsers = function getAllUsers(req, user_sez, callback) {
  //console.log("getAllUsers "+user_sez);
  //console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2/authors/'+config.prefix+'/'+config.site_tax+'/'+user_sez+'/');
  var wpflyer = new WPAPI({ endpoint: config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json' });
  wpflyer.myCustomResource = wpflyer.registerRoute('wp/v2', '/authors/(?P<site>)/(?P<sitetax>)/(?P<usersez>)' );
  //console.log("stoqui "+user_sez);
  wpflyer.myCustomResource().site(config.prefix).sitetax(config.site_tax).usersez(user_sez).get(function( err, data ) {
    //console.log(err || data);
    for (var user in data) if (!data[user].img || data[user].img=="") data[user].img = config.domain + config.sez.users[user_sez].default_img;
    //console.log(err || data);
    //data = fnz.fixResults(data);
    callback(data);
  });
};
 */

 //////// PAGES

exports.getPage = function getPage(req,callback) {
    console.log(req.params);

  var A = ["performances","gallery","videos","news","events","members","partnerships",""];
  if (A.indexOf(req.params.page) === -1 && req.params.subpage) req.params.page = req.params.page+"/"+req.params.subpage;
  const url = config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/mypages/'+config.prefix+'/'+req.params.page;
  request({
    url: url,
    json: true
  }, function(error, response, data) {
    //console.log("//// Page " + req.params.page);
    if (!error && data && data.ID) {
      var A = ["performances","gallery","videos","news","events","members","partnerships",""];
      if (data) data = fnz.fixResult(data);
      /* if (data.posts){
        data.posts = fnz.fixResults(data.posts);
      } */
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources'] && data['sources'][0]) {
        let avnodeurl = data['sources'][0];
        if (A.indexOf(req.params.page) !== -1 && req.params.subpage) avnodeurl = "https://api.avnode.net/"+(req.params.page == "members" ? req.params.subpage : (req.params.page == "partnerships" ? "events"+"/"+req.params.subpage : req.params.page+"/"+req.params.subpage));
        if (req.params.paging) avnodeurl+= "page/"+req.params.paging;
        console.log(avnodeurl);
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
          console.log(body.pages);
          if (A.indexOf(req.params.page) !== -1 && req.params.subpage) {
            if (req.params.page == "events") data.event = body;
            if (req.params.page == "performances") data.performance = body;
            if (req.params.page == "news") data.news = body;
            if (req.params.page == "members") data.member = body;
            if (req.params.page == "partnerships") data.partnership = body;
            callback(data);
          } else {
            fnz.shortcodify(config.prefix, data, body, req.params, data => {
              callback(data);
            });
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

exports.getAll = function getAll(req, sez, limit, page, callback) {
  this.getAllReturn(req, sez, limit, page, [], callback);
};

exports.getAllReturn = function getAllReturn(req, sez, limit, page, p, callback) {
  var trgt = this;
  var previousdata = p;
  //console.log("getAll "+sez.post_type);
  //console.log("page "+page);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', sez.post_type == "editions" ? "/"+sez.post_type+'/'+config.prefix : '/'+sez.post_type );
  var mylimit =  limit>0 ? limit : 50;

  if (sez.site_tax && sez.post_type != "posts") {
    wp.myCustomResource().param('site', config.site_tax_id ).param( 'parent', 0 ).param( 'filter[order]', 'meta_value_num' ).param( 'filter[meta_key]', 'wpcf-startdate' ).perPage(mylimit).page(page).get(function( err, data ) {
      //console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2' + '/'+sez.post_type+"?site="+config.site_tax_id);
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
      //console.log("//// All "+config.data_domain);
      //console.log(config.data_domain+(req.session.sessions.current_lang!=config.default_lang ? '/'+req.session.sessions.current_lang : '')+'/wp-json/wp/v2' + '/'+sez.post_type);
      //console.log("//// All "+sez.post_type);
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




//////// NETWORK

/* exports.getNetwork = function getNetwork(req,callback) {
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
}; */

//////// EVENTS

/* exports.getEvent = function getEvent(req,callback) {
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.event).get(function( err, data ) {
    //console.log("//// Eventoooo");
    //console.log(data);
    if (data && data.ID) data = fnz.fixResult(data);
    //console.log("//// Event");
    callback(data);
  });
}; */

/*
exports.getAllEvents = function getAllEvents(req, limit, page, callback) {
  //console.log("getAllEvents");
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events', {params: [ 'before', 'after', 'author', 'parent' ]});
  wp.myCustomResource().param('site', config.site_tax ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    //console.log("//// All Events "+config.site_tax);
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
*/

/* exports.getAllEventsByYear = function getAllEventsByYear(req, years, callback) {
  //console.log("getAllEventsByYear");
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (years) {
    //console.log('/all-events/'+config.site_tax_id+"/"+years);
    wp.myCustomResource = wp.registerRoute('wp/v2', '/all-events/(?P<site>)/(?P<years>)');
    wp.myCustomResource().site(config.site_tax_id).years(years).get(function( err, data ) {
      //console.log("//// All Events by year "+years);
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  } else {
    wp.myCustomResource = wp.registerRoute('wp/v2', '/all-events/(?P<siteee>)', {params: [ 'before', 'after', 'author', 'parent', 'post' ]});
    wp.myCustomResource().siteee(config.site_tax_id).get(function( err, data ) {
      //console.log("//// All Events ALL");
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  }
};

exports.getAllEventsByTag = function getAllEventsByTag(req, limit, page, callback) {
  //console.log("getAllEventsByTag "+req.params.tag);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events_tag/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.tag).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    //console.log("//// All Events By Tag "+req.params.tag);
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
}; */


/*
exports.getAllEventsByYear = function getAllEventsByYear(req, year, limit, page, callback) {
  //console.log("getAllEventsByYear");
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/events' );
  //console.log(wp.myCustomResource);
  //console.log(wp.event());
  //wp.myCustomResource().param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax ).param('after', ((year-1)+'-12-31T00:00:00.000Z')).param('before', ((year+1)+'-01-01T00:00:00.000Z') ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
  wp.myCustomResource().param( 'filter[taxonomy]', 'site' ).param( 'filter[term]', config.site_tax ).param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    //console.log("//// EventsByYear");
    //console.log(new Date( (year-1)+'-12-31' ));
    //console.log(new Date( (year+1)+'-01-01' ));
    //console.log(data.length);
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
*/

//////// NEWS

/* exports.getNew = function getNew(req,callback) {
  //console.log("getNew"+req.params.new);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  //console.log(config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/news/'+req.params.new);
  wp.myCustomResource = wp.registerRoute('wp/v2', '/news/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.new).get(function( err, data ) {
    //console.log("//// New");
    if (data && data.ID) if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
}; */

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

//////// ACTIVITY

/* exports.getActivity = function getActivity(req,callback) {
  //console.log("//// getActivity");
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/activities/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.activity).get(function( err, data ) {
    //console.log("//// Activities");
    //data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
}; */

//////// MEMBER ACTIVITY

/* exports.getMemberActivity = function getMemberActivity(req,callback) {
  //console.log("//// getMemberActivity");
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  wp.myCustomResource = wp.registerRoute('wp/v2', '/member-activities/(?P<sluggg>)' );
  wp.myCustomResource().sluggg(req.params.activity).get(function( err, data ) {
    //console.log("//// Activities");
    //console.log(config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/member-activities/'+req.params.activity);
    //data.auth_contents["events"].posts = fnz.fixResults(data.auth_contents["events"].posts);
    if (data && data.ID) data = fnz.fixResult(data);
    callback(data);
  });
}; */


//////// EXHIBITIONS

/* exports.getExhibition = function getExhibition(req,callback) {
  //console.log("stocazzo");
  //console.log(config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/exhibitions/'+req.params.exhibition+"/"+req.params.subexhibition+"/"+req.params.subsubexhibition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  if (req.params.image) {
    //console.log("req.params.subsubexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)/(?P<subsubexhibition>)' );
    wp.myCustomResource().exhibition(eq.params.exhibition).subexhibition(req.params.subexhibition).subsubexhibition(req.params.subsubexhibition).get(function( err, data ) {
      //console.log("//// Image");
      //console.log("https://api.avnode.net/galleries/"+req.params.subsubexhibition+"/img/"+req.params.image);
      data['sources'] = ["https://api.avnode.net/galleries/"+req.params.subsubexhibition+"/img/"+req.params.image];
      //console.log(data['sources'][0]);
      //console.log(err || data);
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        callback(data);
      }
    });
  } else if (req.params.subsubexhibition) {
    //console.log("req.params.subsubexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)/(?P<subsubexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition(req.params.subexhibition).subsubexhibition(req.params.subsubexhibition).get(function( err, data ) {
      //console.log("//// SubSubExhibition");
      if (req.params.subexhibition == "gallery") data['sources'] = ["https://api.avnode.net/galleries/"+req.params.subsubexhibition];
      if (req.params.subexhibition == "videos") data['sources'] = ["https://api.avnode.net/videos/"+req.params.subsubexhibition];
      //console.log(data['sources']);
      //console.log(err || data);
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      //console.log("stocazzo");
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        //console.log("stocazzo");
        callback(data);
      }
    });
  } else if (req.params.subexhibition) {
    //console.log("req.params.subexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition(req.params.subexhibition).get(function( err, data ) {
      //console.log("//// SubExhibition ");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        callback(data);
      }
    });
  } else if (req.params.performance) {
    //console.log("req.params.performance");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition("program").get(function( err, data ) {
      //console.log("//// Performance ");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0]+req.params.performance+'/',
          json: true
        }, function(error, response, body) {
          if (body && body.performance) {
            data.avnode = body;
            callback(data);
          } else {
            callback({});
          }
        });
      } else {
        callback({});
      }
    });
  } else {
    //console.log("req.params.exhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).get(function( err, data ) {
      //console.log("//// Exhibition ");
      //console.log(data);
      if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  }
};

exports.getExhibitionArtist = function getExhibitionArtist(req,callback) {
  //console.log(req.params.exhibition);
  //console.log(req.params.subexhibition);
  //console.log(req.params.subsubexhibition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  if (req.params.artist && req.params.performance) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibition_artists/(?P<exhibition>)/(?P<subexhibition>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      //console.log("//// Artist Performance");
      //console.log(data || err);
      callback(data);
    });
  } else if (req.params.artist) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibition_artists/(?P<exhibition>)/(?P<subexhibition>)/(?P<artist>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition("artists").artist(req.params.artist).get(function( err, data ) {
      //console.log("//// Artist");
      //console.log(data);
      request({
        url: data['sources'][0]+req.params.artist+'/',
        json: true
      }, function(error, response, body) {
        data.avnode = body;
        callback(data);
      });
    });
  } else {
    //console.log("req.params.subexhibition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions/(?P<exhibition>)/(?P<subexhibition>)' );
    wp.myCustomResource().exhibition(req.params.exhibition).subexhibition("artists").get(function( err, data ) {
      //console.log("//// SubExhibition Artists");
      //console.log(data['sources']);
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          //console.log(body);
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        callback(data);
      }
    });
  }
};
 */
/*
exports.getAllExhibitions = function getAllExhibitions(req, limit, page, callback) {
  //console.log("getAllExhibitions");
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/exhibitions' );
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    //console.log("//// All Exhibitions");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
*/

//////// DEVS
/*
exports.getAllDevs = function getAllDevs(req, limit, page, callback) {
  //console.log("getAllDevs");
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/devs' );
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    //console.log("//// All Devs");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
exports.getAllDevsByYear = function getAllDevsByYear(req, years, limit, page, callback) {
  //console.log("getAllDevsByYear");
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  if (years){
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/all-devs/(?P<site>)/(?P<yearsss>)' );
    wp.myCustomResource().site(config.prefix).yearsss(years).get(function( err, data ) {
      //console.log("//// All DevsByYear "+years);
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  } else {
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/all-devs/(?P<site>)' );
    //console.log(wp.myCustomResource);
    //console.log(wp.new());
    wp.myCustomResource().site(config.prefix).get(function( err, data ) {
      //console.log("//// All DevsByYear");
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  }
};

exports.getDev = function getDev(req,callback) {
  //console.log("stocazzo");
  //console.log(config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json');
  //console.log(req.params.subsubdev);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (req.params.subsubdev) {
    //console.log("req.params.subsubdev");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/devs/(?P<dev>)/(?P<subdev>)/(?P<subsubdev>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev(req.params.subdev).subsubdev(req.params.subsubdev).get(function( err, data ) {
      //console.log("//// SubSubDev");
      //console.log(err || data);
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      //console.log("rientroaa");
      callback(data);
    });
  } else if (req.params.subdev) {
    //console.log("req.params.subdev");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/devs/(?P<dev>)/(?P<subdev>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev(req.params.subdev).get(function( err, data ) {
      //console.log("//// SubDev");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  } else {
    //console.log("req.params.dev");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/devs/(?P<dev>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).get(function( err, data ) {
      //console.log("//// Dev");
      if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  }
};

exports.getDevArtist = function getDevArtist(req,callback) {
  //console.log(config.prefix+'/'+req.params.dev);
  //console.log(req.params.subdev);
  //console.log(req.params.subsubdev);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (req.params.artist && req.params.performance) {
    //console.log("req.params.artist");
    //console.log(config.data_domain+'/wp-json/wp/v2/artists/'+config.prefix+'/'+req.params.dev+"/artists/"+req.params.artist+"/performances/"+req.params.performance);
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/artists/(?P<dev>)/(?P<subdev>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      //console.log("//// Artist Performance");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist) {
    //console.log("req.params.artist");
    //console.log(config.data_domain+'/wp-json/wp/v2/artists/'+config.prefix+'/'+req.params.dev+"/artists/"+req.params.artist);
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/artists/(?P<dev>)/(?P<subdev>)/(?P<artist>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev("artists").artist(req.params.artist).get(function( err, data ) {
      //console.log("//// Artist");
      //console.log(wp.myCustomResource);
      callback(data);
    });
  } else {
    //console.log("req.params.subdev");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/devs/(?P<dev>)/(?P<subdev>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev("artists").get(function( err, data ) {
      //console.log("//// SubDev Artists");
      callback(data);
    });
  }
};

exports.getDevArtistGallery = function getDevArtistGallery(req,callback) {
  //console.log(config.prefix+'/'+req.params.dev);
  //console.log(req.params.subdev);
  //console.log(req.params.subsubdev);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (req.params.artist && req.params.gallery && req.params.galleryitem) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallery/(?P<dev>)/(?P<subdev>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)/(?P<galleryitem>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).galleryitem(req.params.galleryitem).get(function( err, data ) {
      //console.log("//// Artist gallery item");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist && req.params.gallery) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallery/(?P<dev>)/(?P<subdev>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).get(function( err, data ) {
      //console.log("//// Artist gallery");
      //console.log(data);
      callback(data);
    });
  } else {
    //console.log("req.params.subdev");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/devs/(?P<dev>)/(?P<subdev>)' );
    wp.myCustomResource().dev(config.prefix+'/'+req.params.dev).subdev("gallery").get(function( err, data ) {
      //console.log("//// SubDev gallery");
      callback(data);
    });
  }
};


exports.getAllEditionsEvents = function getAllEditionsEvents(req, years, callback) {
  var trgt = this;
  var data = [];
  trgt.getAllEventsByYear(req, years, function (data_events) {
    //for (var item in data_events) //console.log(data_events[item]['wpcf-startdate']);
    for (var item in data_events) if (data_events[item]['wpcf-startdate']) data.push(data_events[item]);
    trgt.getAllEditionsByYear(req, years, 100, 1, function (data_editions) {
      //console.log(data_editions);
      for (var item in data_editions) if (data_editions[item]['wpcf-startdate']) data.push(data_editions[item]);
      //for (var item in data_editions) //console.log("data: "+data_editions[item]['wpcf-startdate']);
      data.sort(fnz.sortByStartDate);
      //for (var item in data) //console.log(moment(data[item]['wpcf-startdate']*1000).utc().format("YYYY-MM-DD, h:mm a"));
      callback(data);
    });
  });
};
*/

//////// EDITIONS
/*
exports.getAllEditions = function getAllEditions(req, limit, page, callback) {
  //console.log("getAllEditions");
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions' );
  wp.myCustomResource().param( 'parent', 0 ).perPage(limit).page(page).get(function( err, data ) {
    //console.log("//// All Editions");
    //console.log(err || data);
    data = fnz.fixResults(data);
    callback(data);
  });
};
exports.getAllEditionsByYear = function getAllEditionsByYear(req, years, limit, page, callback) {
  //console.log("getAllEditionsByYear");
  var wp = new WPAPI({ endpoint: config.data_domain+'/wp-json' });
  if (years){
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/all-editions/(?P<site>)/(?P<yearsss>)' );
    wp.myCustomResource().site(config.prefix).yearsss(years).get(function( err, data ) {
      //console.log("//// All EditionsByYear "+years);
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  } else {
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/all-editions/(?P<site>)' );
    //console.log(wp.myCustomResource);
    //console.log(wp.new());
    wp.myCustomResource().site(config.prefix).get(function( err, data ) {
      //console.log("//// All EditionsByYear");
      //console.log(err || data);
      data = fnz.fixResults(data);
      callback(data);
    });
  }
};
*/

exports.getEdition = function getEdition(req,callback) {
  let endpoint = config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/editions/'+config.prefix+'/'+req.params.edition+'/';
  if (req.params.performance)   endpoint+="program/";
  if (req.params.artist)        endpoint+="artists/";
  if (req.params.subedition)    endpoint+=req.params.subedition+'/';
  if (req.params.subsubedition) endpoint+=req.params.subsubedition+'/';
  request({
    url: endpoint,
    json: true
  }, function(error, response, data) {
    let avnodeurl;
    if (req.params.subsubedition) {
      if (req.params.image) {
        avnodeurl = "https://api.avnode.net/galleries/"+req.params.subsubedition+"/img/"+req.params.image;
      } else if (req.params.subedition == "gallery") {
        avnodeurl = "https://api.avnode.net/galleries/"+req.params.subsubedition;
      } else if (req.params.subedition == "videos") {
        avnodeurl = "https://api.avnode.net/videos/"+req.params.subsubedition;
      } else if (data["sources"] && data["sources"][0]) {
        avnodeurl = data["sources"][0];
      }
    } else if (req.params.performance) {
      avnodeurl = data["sources"][0]+req.params.performance+"/";
    } else if (req.params.artist) {
      avnodeurl = data['sources'][0]+'performers/'+req.params.artist+'/'
    } else if (data["sources"] && data["sources"][0]) {
      avnodeurl = data["sources"][0];
      if (req.params.performance) avnodeurl+= req.params.performance+"/";
    }
    if (data && data.ID) data = fnz.fixResult(data);
    if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
    if (avnodeurl) {
      request({
        url: avnodeurl,
        json: true
      }, function(error, response, body) {
        data.avnode = body;
        if (req.params.performance || req.params.artist) {
          callback(data);
        } else {
          /* if (req.params.subsubedition && (req.params.subedition == "gallery" || req.params.subedition == "videos")) {
            data.avnode = body;
          } */
          fnz.shortcodify(config.prefix, data, body, req.params, data => {
            callback(data);
          });
        }
      });
    } else {
      callback(data);
    }
  });
}

/* exports.getEdition_old = function getEdition_old(req,callback) {
  //console.log("stocazzo");
  //console.log(config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json/wp/v2/editions/'+config.prefix+'/'+req.params.edition+"/"+req.params.subedition+"/"+req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (req.params.image) {
    //console.log("req.params.subsubedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<subsubedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition(req.params.subedition).subsubedition(req.params.subsubedition).get(function( err, data ) {
      //console.log("//// Image");
      //console.log("https://api.avnode.net/galleries/"+req.params.subsubedition+"/img/"+req.params.image);
      data['sources'] = ["https://api.avnode.net/galleries/"+req.params.subsubedition+"/img/"+req.params.image];
      //console.log(data['sources'][0]);
      //console.log(err || data);
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        callback(data);
      }
    });
  } else if (req.params.subsubedition) {
    //console.log("req.params.subsubedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)/(?P<subsubedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition(req.params.subedition).subsubedition(req.params.subsubedition).get(function( err, data ) {
      //console.log("//// SubSubEdition");
      if (req.params.subedition == "gallery") data['sources'] = ["https://api.avnode.net/galleries/"+req.params.subsubedition];
      if (req.params.subedition == "videos") data['sources'] = ["https://api.avnode.net/videos/"+req.params.subsubedition];
      //console.log(data['sources']);
      //console.log(err || data);
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      //console.log("stocazzo");
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        //console.log("stocazzo");
        callback(data);
      }
    });
  } else if (req.params.subedition) {
    //console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition(req.params.subedition).get(function( err, data ) {
      //console.log("//// SubEditionnnnnn");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        callback(data);
      }
    });
  } else if (req.params.performance) {
    //console.log("req.params.performance");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("program").get(function( err, data ) {
      //console.log("//// Performance ");
      //if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0]+req.params.performance+'/',
          json: true
        }, function(error, response, body) {
          if (body.performance) {
            data.avnode = body;
            callback(data);
          } else {
            callback({});
          }
        });
      } else {
        callback({});
      }
    });
  } else {
    //console.log("req.params.edition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).get(function( err, data ) {
      //console.log("//// Edition");
      if (data && data.ID) data = fnz.fixResult(data);
      if (data['wpcf-rows'] && data['wpcf-columns']) data.grid = fnz.getGrid(data);
      callback(data);
    });
  }
};

exports.getEditionArtist = function getEditionArtist(req,callback) {
  //console.log(config.prefix+'/'+req.params.edition);
  //console.log(req.params.subedition);
  //console.log(req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (req.params.artist && req.params.performance) {
    //console.log("req.params.artist");
    //console.log(config.data_domain+'/wp-json/wp/v2/artists/'+config.prefix+'/'+req.params.edition+"/artists/"+req.params.artist+"/performances/"+req.params.performance);
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/artists/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<performances>)/(?P<performance>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("artists").artist(req.params.artist).performances("performances").performance(req.params.performance).get(function( err, data ) {
      //console.log("//// Artist Performance");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist) {
    console.log("req.params.artist");
    //console.log(config.data_domain+'/wp-json/wp/v2/editions/'+config.prefix+'/'+req.params.edition+"/artists/");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("artists").get(function( err, data ) {
      console.log("//// Artist");
      console.log(req.params.edition+'/artists/');
      console.log(data['sources'][0]+'performers/'+req.params.artist+'/');
      request({
        url: data['sources'][0]+'performers/'+req.params.artist+'/',
        json: true
      }, function(error, response, body) {
        console.log(body);
        data.avnode = body;
        callback(data);
      });
    });
  } else {
    //console.log("req.params.subeditionAAAA");
    //console.log('https://flyer.dev.flyer.it/wp-json/wp/v2/editions/'+config.prefix+'/'+req.params.edition+'/artists');
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("artists").get(function( err, data ) {
      if (data['sources']) {
        //console.log(data['sources'][0]);
        request({
          url: data['sources'][0],
          json: true
        }, function(error, response, body) {
          //console.log(body);
          fnz.shortcodify(config.prefix, data, body, req.params, data =>{
            callback(data);
          });
        });
      } else {
        callback(data);
      }
    });
  }
};

exports.getEditionArtistGallery = function getEditionArtistGallery(req,callback) {
  //console.log(config.prefix+'/'+req.params.edition);
  //console.log(req.params.subedition);
  //console.log(req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (req.params.artist && req.params.gallery && req.params.galleryitem) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallery/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)/(?P<galleryitem>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).galleryitem(req.params.galleryitem).get(function( err, data ) {
      //console.log("//// Artist gallery item");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist && req.params.gallery) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallery/(?P<edition>)/(?P<subedition>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).get(function( err, data ) {
      //console.log("//// Artist gallery");
      //console.log(data);
      callback(data);
    });
  } else {
    //console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("gallery").get(function( err, data ) {
      //console.log("//// SubEdition gallery");
      callback(data);
    });
  }
};


exports.getAllEditionsEvents = function getAllEditionsEvents(req, years, callback) {
  var trgt = this;
  var data = [];
  trgt.getAllEventsByYear(req, years, function (data_events) {
    //for (var item in data_events) //console.log(data_events[item]['wpcf-startdate']);
    for (var item in data_events) if (data_events[item]['wpcf-startdate']) data.push(data_events[item]);
    trgt.getAllEditionsByYear(req, years, 100, 1, function (data_editions) {
      //console.log(data_editions);
      for (var item in data_editions) if (data_editions[item]['wpcf-startdate']) data.push(data_editions[item]);
      //for (var item in data_editions) //console.log("data: "+data_editions[item]['wpcf-startdate']);
      data.sort(fnz.sortByStartDate);
      //for (var item in data) //console.log(moment(data[item]['wpcf-startdate']*1000).utc().format("YYYY-MM-DD, h:mm a"));
      callback(data);
    });
  });
};

exports.getArtistGallery = function getArtistGallery(req,callback) {
  //console.log(config.prefix+'/'+req.params.edition);
  //console.log(req.params.subedition);
  //console.log(req.params.subsubedition);
  var wp = new WPAPI({ endpoint: config.data_domain+'/'+req.session.sessions.current_lang+'/wp-json' });
  if (req.params.artist && req.params.gallery && req.params.galleryitem) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallerypage/(?P<sluggg>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)/(?P<galleryitem>)' );
    wp.myCustomResource().sluggg(req.params.page).artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).galleryitem(req.params.galleryitem).get(function( err, data ) {
      //console.log("//// Artist page gallery item");
      //console.log(data);
      callback(data);
    });
  } else if (req.params.artist && req.params.gallery) {
    //console.log("req.params.artist");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/gallerypage/(?P<sluggg>)/(?P<artist>)/(?P<galleries>)/(?P<gallery>)' );
    wp.myCustomResource().sluggg("gallery").artist(req.params.artist).galleries("gallery").gallery(req.params.gallery).get(function( err, data ) {
      //console.log("//// Artist page gallery");
      //console.log(data);
      callback(data);
    });
  } else {
    //console.log("req.params.subedition");
    wp.myCustomResource = wp.registerRoute( 'wp/v2', '/editions/(?P<edition>)/(?P<subedition>)' );
    wp.myCustomResource().edition(config.prefix+'/'+req.params.edition).subedition("gallery").get(function( err, data ) {
      //console.log("//// SubEdition gallery");
      callback(data);
    });
  }
}; */


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
