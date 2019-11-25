var moment = require( 'moment' );

exports.sortByStartDate = function sortByStartDate(a,b) {
  if (a['wpcf-startdate'] < b['wpcf-startdate'])
    return 1;
  if (a['wpcf-startdate'] > b['wpcf-startdate'])
    return -1;
  return 0;
};

exports.setPageData = function setPageData(req, result) {
  if (!result) result = {};
  var dett=result.post_type && result.post_type!="page";
  var baseurl = req.url;
  for (var lang in config.locales) {
    baseurl = baseurl.replace("/"+config.locales[lang]+"/", "/");
  }
  var page_data = {
    url:req.url
  };
  if (config.locales.length>1) {
    page_data.langSwitcher = {
      "it": (config.default_lang!="it" ? '/it' + baseurl : baseurl),
      "en": (config.default_lang!="en" ? '/en' + baseurl : baseurl)//,"en": (req.url.indexOf('/it/') === 0 ? req.url.substring(3) : req.url)
    }
  }
  if (req.params.edition) page_data.edition = req.params.edition;
  if (req.params.exhibition) page_data.exhibition = req.params.exhibition;
  console.log(req.params)
  if(result && result['ID']) {
    page_data.title = (result.post_title ? result.post_title : "");
    page_data.image_src = result.featured && result.featured.full ? result.featured.full : result.featured ? result.featured : config.domain + config.meta.image_src;
    page_data.description = result.post_content ? this.makeExcerpt(result.post_content, 160) : config.meta.description[req.session.sessions.current_lang];
    if (result.avnode) {
      if(result.avnode.performer && result.avnode.performer.stagename) {
        page_data.title+= ": "+result.avnode.performer.stagename;
        page_data.image_src = result.avnode.performer.imageFormats.large;
        page_data.description = result.avnode.performer.description;
      } else if (result.avnode.performance && result.avnode.performance.title) {
        page_data.title+= ": "+result.avnode.performance.title;
        page_data.image_src = result.avnode.performance.imageFormats.large;
        page_data.description = result.avnode.performance.description;
      } else if (req.params.subsubedition && result.avnode.title && (req.params.subedition=="gallery" || req.params.subedition=="videos" || req.params.subedition=="videos")) {
        page_data.title+= ": "+result.avnode.title;
        if (req.params.image) page_data.title+=" | #"+(result.avnode.medias.map(item => {return item.slug;}).indexOf(req.params.image)+1)
  
        page_data.image_src = result.avnode.imageFormats.large;
        page_data.description = result.avnode.description ? result.avnode.description : page_data.title;
      }
    } 
    if (result.avnode && req.params.page) {
      if (req.params.subsubsubpage && result.avnode.title && (req.params.subsubpage=="galleries" || req.params.subsubpage=="videos")) {
        page_data.title+= ": "+result.avnode.title;
        if (req.params.subsubpage=="galleries") page_data.title+=" | Gallery: "+result.avnode.galleries[0].title
        if (req.params.img) page_data.title+=" | #"+(result.avnode.galleries[0].medias.map(item => {return item.slug;}).indexOf(req.params.img)+1)
  
        page_data.image_src = result.avnode.imageFormats.large;
        page_data.description = result.avnode.galleries[0].description ? result.avnode.galleries[0].description : page_data.title;
      } else if (result.avnode.title) {
        page_data.title+= ": "+result.avnode.title+" | #";
        page_data.image_src = result.avnode.imageFormats.large;
        page_data.description = result.avnode.description;
      }
    } 
    page_data.headtitle = page_data.title;
    if (page_data.headtitle && req.session.sessions.current_lang != config.default_lang) page_data.headtitle+=" | "+req.session.sessions.current_lang.toUpperCase();
    /* if (result.avnode && result.avnode.title) {
      page_data.headtitle+= " | "+result.avnode.title;
    } */
    page_data.headtitle+= page_data.headtitle ? " | "+config.project_name : config.project_name;
    if (page_data.headtitle==config.project_name && config.meta.headline) page_data.headtitle+=(config.meta.headline ? " | "+config.meta.headline[req.session.sessions.current_lang] : "");
  } else {
    page_data.title = "404 "+__("Content NOT found");
    page_data.headtitle = page_data.title;
    page_data.headtitle+=" | "+config.project_name;
    page_data.image_src = config.meta.image_src;
    page_data.description = this.makeExcerpt(__("The content you requested was not found on our server, please try to search for it"), 160);
  }
  return page_data;
};

/*exports.getCurrentLang = function getCurrentLang(req) {
  var urlA = req.url.split("/");
  var lang = urlA.length>1 && config.locales.indexOf(urlA[1])!=-1 ? urlA[1] : config.default_lang;
  if(req.session.sessions.current_lang != lang) {
    req.session.sessions.current_lang = lang;
    require('moment/locale/'+(lang=="en" ? "en-gb" : lang));
    global.setLocale(lang);
  }
};
*/
exports.formatLocation = function formatLocation(l) {
  var loc = {};
  for (var item in l){
    var locA = l[item].split(";");
    if (!loc[locA[2]]) loc[locA[2]] = {};
    if (!loc[locA[2]][locA[1]]) loc[locA[2]][locA[1]] = {};
    if (!loc[locA[2]][locA[1]][locA[0]]) loc[locA[2]][locA[1]][locA[0]] = {lng:locA[3],lat:locA[4]};
  }
  return loc;
};

exports.shortcodify = function shortcodify(prefix, lang_preurl, data, body, req_params, cb) {
  var shortcode = require('shortcode-parser');
  var jade = require("pug");
  shortcode.add('avnode', function(buf, opts) {
    console.log(opts);
    if (opts.view === "performances") {
      /* if (strpos($shortcode_atts['source'], "flxer.net")>0) {
        $sourceA = explode("/",str_replace(array("flxer.net/api"), array("api.avnode.net"), $shortcode_atts['source']));
        $shortcode_atts['source'] = "https://".$sourceA[2]."/".$sourceA[4]."/".$sourceA[5]."/";
        if (!in_array($shortcode_atts['source'], $sources)) $sources[] = $shortcode_atts['source'];
      } */
      if (opts.days) {
        opts.days = opts.days.split(",");
      }
      if (opts.params) {
        let paramsA = opts.params.split(",").map(function(item) {
          return item.trim();
        });
        let paramsAA = [];
        for (var item in paramsA) {
          if (paramsA[item]=="VJ SET") paramsAA.push("VJ Set")
          else if (paramsA[item]=="DJ SET") paramsAA.push("DJ Set")
          else if (paramsA[item]=="Video Installation") paramsAA.push("AV Installation")
          else paramsAA.push(paramsA[item]);
        }
        opts.params = paramsAA;
      }
      if (opts.room) {
        opts.rooms = opts.room.split(",").map(function(item) {
          return item.trim();
        });
        opts.room = undefined;
      }
      if (opts.day) {
        opts.days = opts.day.split(",").map(function(item) {
          return item.trim();
        });
        opts.day = undefined;
      }
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body.advanced.programmebydayvenue});      
    }
    if (opts.view === "performers") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body.advanced.performers});      
    }
    if (opts.view === "partners") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    if (opts.view === "gallery") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    if (opts.view === "videos") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    // Users
    if (opts.view === "performances_by_user") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    if (opts.view === "events") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    if (opts.view === "partnerships") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    if (opts.view === "news") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    if (opts.view === "members") {
      var html = jade.renderFile(__dirname+'/../views/_partials/shortcodify/'+opts.view+'.pug', {prefix: prefix, lang_preurl: lang_preurl, opts: opts, req_params:req_params, result:data, body:body});      
    }
    return html;
  });
  /* var str = "aaa [avnode source='https://flxer.net/api/lpm-team/events/lpm-2018-rome/' view=performances filter=keyword params='Workshop' room='Classroom 1' days=2018-06-08] aaa [avnode source='https://flxer.net/api/lpm-team/events/lpm-2018-rome/' view=performances filter=keyword params='Workshop' room='Classroom 2' days=2018-06-08] bbb";
  var out = shortcode.parse(str);
  //console.log(out); */
  if (data.post_content_original) {
    data.post_content = shortcode.parse(data.post_content_original.replace("<p>[","[").replace("]</p>","]").replace(new RegExp("source=", 'g'),"source='").replace(new RegExp(" view=", 'g'),"' view=").replace(new RegExp(" params=", 'g'),"' params='"));
  }
  for (item in data.grid) {
    for (item2 in data.grid[item]) {
      if (data.grid[item][item2].boxoriginal) {
        let str = data.grid[item][item2].boxoriginal.replace("<p>[","[").replace("]</p>","]").replace(new RegExp("source=", 'g'),"source='").replace(new RegExp(" view=", 'g'),"' view=").replace("avnode", "avnode cols='"+data.grid[item].length+"'");
        data.grid[item][item2].box = shortcode.parse(str);
      }
    }  
  }

  cb(data);
};

exports.getGrid = function getGrid(data) {
  var row=0;
  var col=0;
  var grid = [];
  var rowsN = parseInt(data['wpcf-rows']);
  var columnsN = parseInt(data['wpcf-columns']);
  //if (rowsN>0 && columnsN>0) {
  //}
  if (data['wpcf-same-rows-height']==1) {
    while (row<rowsN) {
      grid[row] = [];
      while (col<columnsN) {
        //console.log("stocazzo"+data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title']+"stocazzo");
        //console.log("stocazzo "+row + "-"+col+" stocazzo");
        if (data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title']) {
          grid[row][col] = {};
          grid[row][col].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
          grid[row][col].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
          grid[row][col].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
          grid[row][col].boxoriginal = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box-original'];
        }
        col++;
      }
      col=0;
      row++;
    }
  } else {
    while (col<columnsN) {
      grid[col] = [];
      while (row<rowsN) {
        if (data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title']) {

          grid[col][row] = {};
          grid[col][row].tit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-title'];
          grid[col][row].stit = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-subtitle'];
          grid[col][row].box = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box'];
          grid[col][row].boxoriginal = data['wpcf-row-'+(row+1)+'-col-'+(col+1)+'-html-box-original'];
        }
        row++;
      }
      row=0;
      col++;
    }
  }
  return grid;
};
exports.get_video = function get_video( url ) {
  var v = {};
  var yts;
  if (url.indexOf("vimeo.com/")>0) {
    yts = url.substring(url.indexOf("video/")+6);
    v.embed = "//player.vimeo.com/video/"+yts;
    v.thumb = "http://vimeo.com/api/v2/video/"+yts+".json";
  } else if (url.indexOf("youtube.com/")>0) {
    //var yts = url.substring(url.indexOf("watch?v=")+8);
    yts = url.substring(url.indexOf("embed/")+6);
    v.embed = "//www.youtube.com/embed/"+yts;
    v.thumb = "//img.youtube.com/vi/"+yts+"/maxresdefault.jpg";
  }
  return v;
};

exports.makeExcerpt = function makeExcerpt(descr,length) {
  var descr2 = descr.replace(/<[^>]+>/ig," ");
  var descr2 = descr2.replace(/\n/ig," ");
  var descr2 = descr2.replace(/  /ig," ");
  var descr2 = descr2.replace(/  /ig," ");
  var descr2 = descr2.replace(/  /ig," ");
  var descr2 = descr2.replace(/  /ig," ");
  var descrA = descr2.split(" ");
  var d = "";
  for (var item in descrA) {
    if (d.length<length){
      d+=descrA[item]+" "
    }
  }
  return d.trim();
};

exports.fixResults = function fixResults(data) {
  for (var item in data){
    if (data[item] && (data[item].title || data[item].post_title)) data[item] = this.fixResult(data[item]);
  }
  //data.sort("this.sortByStartDate");

  return data;
};
exports.ISODateString = function ISODateString(d) {
  function pad(n) {return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'+ pad(d.getUTCMonth() + 1)+'-'+ pad(d.getUTCDate())+'T'+ pad(d.getUTCHours())+':'+ pad(d.getUTCMinutes())+':'+ pad(d.getUTCSeconds())+'+01:00'
}

exports.fixResult = function fixResult(data) {
  /*if (typeof(data.video_thumbnail) == "string" && data.video_thumbnail.length>0) {
    data.video = this.get_video(data.video_thumbnail);
  }
  if (data.featured) {
    data.featured.thumbnail = data.featured.thumbnail.replace(/http(.+)files/g, config.domain+"/files");
    data.featured.full = data.featured.full.replace(/http(.+)files/g, config.domain+"/files");
  }
  if (data.capauthors) {
    for(var auth in data.capauthors) {
      data.capauthors[auth].img = data.capauthors[auth].img.replace(/http(.+)files/g, config.domain+"/files");
    }
  }
   */
  //console.log(moment.locale());
  if (data.date) {
    data.date = moment(data.date).utc().format();
    data.datetimeHR = moment(data.date).utc().format("MMMM, Do YYYY, h:mm a");
    data.dateHR = moment(data.date).utc().format("MMMM, Do YYYY");
  }
  if (data['post_modified'] || data['modified']) {
    var dateModified = data['post_modified'] || data['modified'];
    data.dateModified = moment(dateModified).utc().format("DD-MM-YYYY");
    data.datetimeModifiedHR = moment(dateModified).utc().format("MMMM, Do YYYY, h:mm a");
    data.dateModifiedHR = moment(dateModified).utc().format("MMMM, Do YYYY");
  }
  if (!data['wpcf-startdate'] || !data['wpcf-startdate'].length){
    var dd = new Date(dateModified);
    data['wpcf-startdate'] = [dd.getTime()/1000];
  }
  if (data['wpcf-startdate']){
    data['wpcf-startdate'] = parseInt(Array.isArray(data['wpcf-startdate']) ? data['wpcf-startdate'][0] : data['wpcf-startdate']);
    data.startdateISO = this.ISODateString(new Date(data['wpcf-startdate']*1000));
    data.startdateHR = moment(data['wpcf-startdate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
  }
  if (data['wpcf-enddate']){
    data['wpcf-enddate'] = parseInt(data['wpcf-enddate']);
    data.enddateISO = this.ISODateString(new Date(data['wpcf-enddate']*1000));
    data.enddateHR = moment(data['wpcf-enddate']*1000).utc().format("MMMM, Do YYYY, h:mm a");
  }
  if (data['wpcf-location']) data['wpcf-location'] = this.formatLocation(data['wpcf-location']);
  if (data['data_evento'] && data['data_evento'].length && typeof (data['data_evento']) == 'object') data['data_evento'] = data['data_evento'][0];
  if (!data['data_evento']) {
    data['data_evento'] = moment(data['post_modified']).utc().format("MMMM D, YYYY");
  }
  data['data_month'] = moment(data['date']).utc().format("MMMM YYYY");
  data['datePublished'] = moment(data['date']).utc().format("DD-MM-YYYY");
  return data;
};