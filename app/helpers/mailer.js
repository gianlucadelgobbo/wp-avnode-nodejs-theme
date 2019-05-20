var email = require('emailjs');
/*
 {
    text: req.body.text,
    from: config.accounts.gmail.from_name+' <'+ config.accounts.gmail.from_email + ">",
    to: config.accounts.gmail.to_name+'<'+config.accounts.gmail.to_email+'>',
    cc: '',
    subject: req.body.subject,
    attachment: [
      {data:req.body.text.replace(/(?:\r\n|\r|\n)/g, '<br />'), alternative:true},
      {path:req.body.folderfile, type:"application/pdf", name:req.body.file}
    ]
  }
  var server = email.server.connect({
    host 	    : config.accounts.gmail.host,
    user 	    : config.accounts.gmail.user,
    password    : config.accounts.gmail.password,
    ssl         : config.accounts.gmail.ssl
  });

 */
exports.send = function send(server, message, callback) {
  //console.log("SEND");
  var e = [];
  var c = [];
  var myserver = email.server.connect(server);
  myserver.send(message, function (err, message) {
    //console.log(err);
    //console.log(message);
    if (err) {
      e.push({m:__("Messagge sent failed")});
    } else {
      c.push({m:__("Messagge sent with success")});
    }
    callback(e, c);
  });
};
