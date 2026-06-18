var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var fs = require('fs');

require('dotenv').config();
global.config = require('config')[process.argv[3]];

// Inject secrets from .env into config
;(function() {
  var site = process.argv[3];
  var acc = global.config.accounts;
  if (!acc) return;
  if (acc.emails && acc.emails.gmail) {
    acc.emails.gmail.user     = process.env.GMAIL_USER;
    acc.emails.gmail.password = process.env.GMAIL_PASSWORD;
  }
  if (acc.newsletter && 'api_key' in acc.newsletter) {
    acc.newsletter.api_key = process.env.NEWSLETTER_API_KEY;
  }
  if (acc.recaptcha) {
    var prefix = site.toUpperCase() + '_';
    acc.recaptcha.site_key   = process.env[prefix + 'RECAPTCHA_SITE_KEY']   || process.env.RECAPTCHA_SITE_KEY;
    acc.recaptcha.secret_key = process.env[prefix + 'RECAPTCHA_SECRET_KEY'] || process.env.RECAPTCHA_SECRET_KEY;
  }
  if (acc.facebook) {
    var prefix = site.toUpperCase() + '_';
    acc.facebook.client_secret = process.env[prefix + 'FACEBOOK_CLIENT_SECRET'];
  }
  if (site === 'lpm') {
    global.config.PAYPAL_CLIENT_ID             = process.env.LPM_PAYPAL_CLIENT_ID;
    global.config.PAYPAL_CLIENT_SECRET         = process.env.LPM_PAYPAL_CLIENT_SECRET;
    global.config.PAYPAL_CLIENT_ID_SANDBOX     = process.env.LPM_PAYPAL_CLIENT_ID_SANDBOX;
    global.config.PAYPAL_CLIENT_SECRET_SANDBOX = process.env.LPM_PAYPAL_CLIENT_SECRET_SANDBOX;
    if (acc.paypal_client_id !== undefined) acc.paypal_client_id = process.env.LPM_PAYPAL_CLIENT_ID;
  }
})();

config.root = app.root = __dirname;

if (process.argv[3]=="lpm" || process.argv[3]=="lcf" || process.argv[3]=="chromosphere"  || process.argv[3]=="digitalatium" || process.argv[3]=="visualsound" || process.argv[3]=="visualsoundacademy" || process.argv[3]=="fotonica" || process.argv[3]=="shockart" || process.argv[3]=="electrokids") {
  var file = config.root+'/cache/'+process.argv[3]+'_editions.json';
  if (fs.existsSync(file)) {
    jsonfile.readFile(file, function(err, obj) {
      config.meta.editions = obj;
    });
  }
}

require('./setup')(app, express);
require('./app/routes/'+global.config.router)(app);

var server = null;

server = app.listen(config.port, function(){
  console.log('Express server listening on (' + config.prefix + ') http://' + config.host + ':' + config.port+ " in "+process.env.NODE_ENV+" mode");
});
if(process.env.NODE_ENV=='dev') server.timeout = 480000;  
