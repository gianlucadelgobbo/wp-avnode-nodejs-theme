var request = require('request');

var AVNODE_BASE = 'https://api.admin.avnode.net/';

// In-memory cache: key -> { data, ts }
var cache = {};
var CACHE_TTL = 5 * 60 * 1000; // 5 min

function fetch(url, cb) {
  var now = Date.now();
  if (cache[url] && (now - cache[url].ts) < CACHE_TTL) return cb(null, cache[url].data);
  request({ url: url, json: true }, function(err, res, body) {
    if (err) return cb(err);
    if (!body || res.statusCode !== 200) return cb(new Error('avnode ' + res.statusCode));
    cache[url] = { data: body, ts: now };
    cb(null, body);
  });
}

exports.getMamOrg = function(source, cb) {
  fetch(source, cb);
};

exports.getEvent = function(slug, cb) {
  fetch(AVNODE_BASE + 'events/' + slug + '/', cb);
};

exports.getEventProgram = function(slug, cb) {
  fetch(AVNODE_BASE + 'events/' + slug + '/program/', cb);
};

exports.getArtist = function(slug, cb) {
  fetch(AVNODE_BASE + slug + '/', cb);
};

exports.getPerformance = function(slug, cb) {
  fetch(AVNODE_BASE + 'performances/' + slug + '/', cb);
};
