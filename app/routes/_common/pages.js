var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');
 

exports.get = function get(req, res) {
  helpers.setSessions(req, function() {
    helpers.getPage(req, function( result ) {
      //console.log(result);
      var page_data = fnz.setPageData(req, result);
      if(result && result['ID']) {
        var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
        if (result.event) pug = config.prefix+'/event';
        if (result.performance) pug = config.prefix+'/performance';
        if (result.news) pug = config.prefix+'/new';
        if (result.member) pug = config.prefix+'/member';
        if (result.partnership) pug = config.prefix+'/partnership';
        var check = pug.split("/")[1];
        if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
          var Recaptcha = require('express-recaptcha').Recaptcha;
          var recaptcha = new Recaptcha(config.accounts.recaptcha.site_key, config.accounts.recaptcha.secret_key);
          result.countries = require('../../helpers/country-list');
          result.body = {};
          result.captcha = recaptcha.render()
          var form = pug.split("_")[1];
          pug = config.prefix+"/page";
        }
        res.render(pug, {result: result, page_data: page_data, sessions: req.session.sessions, include_gallery: result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};
exports.post = function post(req, res) {
  var request = require("request");
  if (req.body.formtype == "join") {
    var mailer = require('../../helpers/mailer');
    var message = {
      text: __('New Join submission from: {{name}} <{{email}}>\n\nOrganization name: {{organization_name}}\n\nOrganization country: {{organization_country}}\n\nOrganization activity description\n{{activity_description}}\n\nActivities name list\n{{activity_list}}\n\nMessagge sent from {{website}}', { name: req.body.name, email:req.body.email, organization_name: req.body.organization_name, organization_country:req.body.organization_country, activity_description:req.body.activity_description, activity_list:req.body.activity_list, website:config.domain+req.url}),
      from: config.accounts.emails.defaults[req.params.page].from_name+' <'+ config.accounts.emails.defaults[req.params.page].from_email + ">",
      to: config.accounts.emails.defaults[req.params.page].to_name+' <'+config.accounts.emails.defaults[req.params.page].to_email+'>',
      cc: '',
      subject: __('[{{project_name}} Mailer] New Join from {{organization_name}}', { organization_name: req.body.organization_name, project_name:config.project_name}),
      /*subject: req.body.subject,
       attachment: [
       {data:req.body.text.replace(/(?:\r\n|\r|\n)/g, '<br />'), alternative:true},
       {path:req.body.folderfile, type:"application/pdf", name:req.body.file}
       ]*/
    };
    helpers.validateFormJoin(req.body, function(e, o) {
      recaptcha.verify(req, function(error, data){
        if(!error) {
          if (req.body.ajax) {
            if (e.length) {
              var estr = "<ul>";
              for(var item in e)  estr+= "<li>"+e[item].m+"</li>";
              estr+= "</ul>";
              res.status(200).send({type:"danger", message: estr});
            } else {
              mailer.send(config.accounts.emails.gmail, message, function(e, c){
                if (e.length) {
                  res.status(200).send({type:"danger", message: e[0].m});
                } else {
                  res.status(200).send({type:"success", message: c[0].m});
                }
              });
            }
          } else {
            helpers.setSessions(req, function() {
              helpers.getPage(req, function( result ) {
                if(result && result['ID']) {
                  var page_data = fnz.setPageData(req, result);
                  var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
                  var check = pug.split("/")[1];
                  if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
                    result.countries = require('../../helpers/country-list');
                    result.body = {};
                    var form = pug.split("_")[1];
                    pug = config.prefix+"/page";
                  }
                  if (e.length) {
                    result.body = o;
                    res.render(pug, {result: result, msg:{e:e}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                  } else {
                    mailer.send(config.accounts.emails.gmail, message, function(e, c){
                      if (e.length) {
                        res.render(pug, {result: result, msg:{e:e}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      } else {
                        res.render(pug, {result: result, msg:{c:c}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      }
                    });
                  }
                } else {
                  res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
                }
              });
            });
          }
        } else {
          var estr = "<ul><li>Captcha error ("+error+")</li></ul>";
          res.status(200).send({type:"danger", message: estr});
        }
      });
    });
  } else if (req.body.formtype == "newsletter") {
    helpers.validateFormNewsletter(req.body, function(e, o) {
      var interests = {};
      if (Array.isArray(req.body.topics)){
        for (var item in req.body.topics) interests[req.body.topics[item]] = true;
      } else {
        interests[req.body.topics] = true;
      }
      interests[config.accounts.newsletter.site_from] = true;
      var merge_fields = {};
      if (req.body.name) merge_fields.FNAME = req.body.name;
      if (req.body.surname) merge_fields.LNAME = req.body.surname;
      if (req.body.country) merge_fields.MMERGE6 = req.body.country;
      if (req.body.organization_name) merge_fields.MMERGE4 = req.body.organization_name;
      if (req.body.ajax) {
        //console.log("ajaxajaxajaxajaxajaxajax");
        if (e.length) {
          var estr = "<ul>";
          for(var item in e)  estr+= "<li>"+e[item].m+"</li>";
          estr+= "</ul>";
          res.status(200).send({type:"danger", message: estr});
        } else {
          request({
              method: 'POST',
              url: config.accounts.newsletter.url+"/members",
              body: JSON.stringify({
                "merge_fields": merge_fields,
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
                res.status(200).send({type:"danger", message: __("Subscription failed")});
              } else {
                var bodyObj = JSON.parse(body);
                if (bodyObj.id) {
                  res.status(200).send({type:"success", message: __("Congratulations! Your subscription was successful")});
                } else {
                  res.status(200).send({type:"danger", message: __("Warning!")+" "+bodyObj.title});
                }
              }
            }
          );
        }
      } else {
        helpers.setSessions(req, function() {
          helpers.getPage(req, function( result ) {
            var page_data = fnz.setPageData(req, result);
            if(result && result['ID']) {
              var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
              var check = pug.split("/")[1];
              if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
                result.countries = require('../../helpers/country-list');
                result.body = {};
                var form = pug.split("_")[1];
                pug = "avnode/page";
              }
              result.body = o;
              if (e.length) {

                res.render(pug, {result: result, msg:{e:e}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
              } else {
                request({
                    method: 'POST',
                    url: config.accounts.newsletter.url+"/members",
                    body: JSON.stringify({
                      "merge_fields": merge_fields,
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
                    //console.log("ECCHICE");
                    //console.log(error);
                    //console.log(response);
                    //console.log(body);
                    if(error) {
                      res.render(pug, {result: result, msg:{e:e}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                    } else {
                      var bodyObj = JSON.parse(body);
                      if (bodyObj.id) {
                        res.render(pug, {result: result, msg:{c:[{m:__("Subscription success!!!")}]}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      } else {
                        res.render(pug, {result: result, msg:{e:[{m:__(bodyObj.title)}]}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      }
                    }
                  }
                );
              }
            } else {
              res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
            }
          });
        });
      }
    });
  } else {
    recaptcha.verify(req, function(error, data){
      if(!error) {
        var mailer = require('../../helpers/mailer');
        var message = {
          text: __('New Messagge from: {{name}} <{{email}}>\n\n{{message}}\n\nMessagge sent from {{website}}', { name: req.body.name, email:req.body.email, message:req.body.message, website:config.domain+req.url}),
          from: config.accounts.emails.defaults[req.params.page].from_name+' <'+ config.accounts.emails.defaults[req.params.page].from_email + ">",
          to: config.accounts.emails.defaults[req.params.page].to_name+' <'+config.accounts.emails.defaults[req.params.page].to_email+'>',
          cc: '',
          subject: __('[{{project_name}} Mailer] New Messagge from {{name}}', { name: req.body.name, project_name:config.project_name}),
          /*subject: req.body.subject,
          attachment: [
            {data:req.body.text.replace(/(?:\r\n|\r|\n)/g, '<br />'), alternative:true},
            {path:req.body.folderfile, type:"application/pdf", name:req.body.file}
          ]*/
        };
        helpers.validateFormEmail(req.body, function(e, o) {
          if (req.body.ajax) {
            if (e.length) {
              var estr = "<ul>";
              for(var item in e)  estr+= "<li>"+e[item].m+"</li>";
              estr+= "</ul>";
              res.status(200).send({type:"danger", message: estr});
            } else {
              mailer.send(config.accounts.emails.gmail, message, function(e, c){
                if (e.length) {
                  res.status(200).send({type:"danger", message: e[0].m});
                } else {
                  res.status(200).send({type:"success", message: c[0].m});
                }
              });
            }
          } else {
            helpers.setSessions(req, function() {
              helpers.getPage(req, function( result ) {
                var page_data = fnz.setPageData(req, result);
                if(result && result['ID']) {
                  var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].pugpage ? config.sez.pages.conf[req.params.page].pugpage : config.sez.pages.conf.default.pugpage);
                  var check = pug.split("/")[1];
                  if (check == "page_newsletter" || check == "page_contacts" || check == "page_join") {
                    result.countries = require('../../helpers/country-list');
                    result.body = {};
                    var form = pug.split("_")[1];
                    pug = "avnode/page";
                  }
                  if (e.length) {
                    result.body = o;
                    res.render(pug, {result: result, msg:{e:e}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                  } else {
                    mailer.send(config.accounts.emails.gmail, message, function(e, c){
                      if (e.length) {
                        res.render(pug, {result: result, msg:{e:e}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      } else {
                        res.render(pug, {result: result, msg:{c:c}, page_data:page_data, sessions:req.session.sessions,include_gallery:result.post_content.indexOf("nggthumbnail")>=0, itemtype:config.sez.pages.conf[req.params.page] && config.sez.pages.conf[req.params.page].itemtype ? config.sez.pages.conf[req.params.page].itemtype : config.sez.pages.conf.default.itemtype,q:req.query.q,form:form});
                      }
                    });
                  }
                } else {
                  res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
                }
              });
            });
          }
        });
      } else {
        var estr = "<ul><li>Captcha error ("+error+")</li></ul>";
        res.status(200).send({type:"danger", message: estr});
      }
    });
  }
};

exports.getSubpage = function getSubpage(req, res) {
  helpers.setSessions(req, function() {
    helpers.getPage(req, function( result ) {
      var page_data = fnz.setPageData(req, result);
      if(result && result['ID']) {
        if (result.post_excerpt) result.meta_description = result.post_excerpt;
        var pug = config.prefix+'/'+(config.sez.pages.conf[req.params.subpage] && config.sez.pages.conf[req.params.subpage].pugpage ? config.sez.pages.conf[req.params.subpage].pugpage : config.sez.pages.conf.default.subpage);
        //console.log("getSubpage");
        //console.log(result);
        var itemtype = config.sez.pages.conf[req.params.subpage] && config.sez.pages.conf[req.params.subpage].itemtype ? config.sez.pages.conf[req.params.subpage].itemtype : config.sez.pages.conf.default.itemtype;
        //console.log(itemtype);
        res.render(pug, {result: result, page_data:page_data, sessions:req.session.sessions, itemtype:itemtype,q:req.query.q,include_gallery:result.post_content.indexOf("nggthumbnail")>=0});
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};

exports.get404 = function get404(req, res) {
  //console.log("get404 "+req.url);
  helpers.setSessions(req, function() {
    var page_data = fnz.setPageData(req, {});
    res.render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
  });
};



/*
exports.getSearch = function getSearch(req, res) {
  helpers.setSessions(req, function() {
    res.render(config.prefix+'/search', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
  });
};

*/
//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
