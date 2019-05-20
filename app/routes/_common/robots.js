var helpers = require('../../helpers/helpers');

exports.get = function get(req, res) {
  res.header('Content-Type', 'text/txt');
  var str = "User-agent: *\nAllow: /\nDisallow: download/*\nsitemap: "+config.domain+"/sitemap.xml"
  res.send(str);
};
