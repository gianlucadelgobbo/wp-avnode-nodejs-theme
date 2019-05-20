var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//var methodOverride = require('method-override');
var helmet = require('helmet');

var i18n = require('i18n');
i18n.configure({
  locales: config.locales,
  defaultLocale: config.default_lang,
  cookie: config.prefix,
  directory: config.root + '/locales/'+config.prefix,
  register: global
});


//global.i18n = i18n;

module.exports = function(app, exp) {

  var env = process.env.NODE_ENV || 'development';
  app.use(helmet());
  app.set('views', [app.root + '/app/views']);
  app.set('view engine', 'pug');
  //app.set('view options', { layout: false });
  app.use(session({
    secret: 'wp-nodejs-theme',
    store: new MongoStore({ url: 'mongodb://localhost/SessionStore' }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(cookieParser());
  //app.use(methodOverride());
  app.use(i18n.init);
  //console.log("env "+env);
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  if (env == 'production') {
    //console.log("env "+env);
    app.set('view cache', true);
    //app.set('view options', { doctype : 'html', pretty : true });
  } else {
    var errorhandler = require('errorhandler');
    app.locals.pretty = true;
    var stylus = require('stylus');
    var nib = require('nib');
    app.use(stylus.middleware({ src: app.root + '/public', compile:function (str, path) {
      return stylus(str)
          .set('filename', path)
          .set('compress', true)
          .use(nib())
          .import('nib');
    } }));
    var logger = require('morgan');
    app.use(logger('combined'));
    app.use(errorhandler());
    app.use(function(err, req, res, next) {
      // Do logging and user-friendly error message display
      console.error(err);
      res.status(500).send({status:500, message: 'internal error', type:'internal'});
    })/**/
  }
  app.use(exp.static(app.root + '/public'));
  app.use(exp.static(app.root + '/files'));
};