var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var fs = require('fs');

global.config = require('config')[process.argv[3]];

config.root = app.root = __dirname;

jsonfile.readFile(config.root+'/config/users.json', function(err, obj) {
  config.users = obj;
  config.users_sez = {};
  config.users_by_sez = {};
  config.users_by_id = {};
  for(var a=0;a<config.users.length;a++) {
    if (config.users[a][process.argv[3]+"-sez"]) {
      if (!config.users_by_sez[config.users[a][process.argv[3]+"-sez"]]) config.users_by_sez[config.users[a][process.argv[3]+"-sez"]] = [];
      config.users_sez[config.users[a][process.argv[3]+"-sez"]] = true;
      config.users_by_sez[config.users[a][process.argv[3]+"-sez"]].push(config.users[a]["ID"]);
      config.users_by_id[config.users[a]["ID"]] = config.users[a];
    }
  }
  //console.log(config.users_sez);
});

if (process.argv[3]=="lpm" || process.argv[3]=="lcf" || process.argv[3]=="chromosphere" || process.argv[3]=="fotonica") {
  var file = config.root+'/config/'+process.argv[3]+'_editions.json';
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
  console.log('Express server listening on (' + config.prefix + ') http://' + config.host + ':' + config.port);
});
if(process.env.NODE_ENV=='dev') server.timeout = 480000;  
