var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
//var MongoStore = require('connect-mongo');
//var methodOverride = require('method-override');
//var helmet = require('helmet');

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

  var env = process.env.NODE_ENV || 'dev';
  /* app.use(helmet.frameguard({
    action: 'allow-from',
    domain: 'https://www.facebook.com'
  })); */
  app.set('views', [app.root + '/app/views']);
  app.set('view engine', 'pug');
  //app.set('view options', { layout: false });
  /* app.use(session({
    secret: 'wp-avnode-nodejs-theme',
    store: new MongoStore({ mongoUrl: 'mongodb://localhost/SessionStore' }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
  })); */
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  //app.use(cookieParser());
  //app.use(methodOverride());
  app.use(i18n.init);
  /* const csp = require('helmet-csp')

  app.use(csp({
    directives: {
      "frame-ancestors": ["'self'", '*.facebook.com']
    }
  })); */
  /* app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "frame-ancestors *facebook.com");
    return next();
  }); */
  //console.log("env "+env);
  /* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); */
  if (env == 'production') {
    //console.log("env "+env);
    app.set('view cache', true);
    //app.set('view options', { doctype : 'html', pretty : true });
  } /*else {
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
    })
  }*/
  app.use(exp.static(app.root + '/public'));
  app.use(exp.static(app.root + '/files'));
  app.use(exp.static(app.root + '/warehouse'));
};