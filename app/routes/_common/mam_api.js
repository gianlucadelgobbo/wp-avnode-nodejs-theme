var request = require('request');

exports.getEvents = function(req, res) {
  var url = config.mam_api.base_url + '/events';
  if (req.query.lang) url += '?lang=' + req.query.lang;
  request({ url: url, json: true }, function(error, response, body) {
    if (error) return res.status(500).json({ error: 'MAM API unreachable' });
    if (body) res.json(body);
    else res.status(500).json({ error: 'empty response' });
  });
};

exports.getCalendar = function(req, res) {
  var url = config.mam_api.base_url + '/calendar';
  if (req.query.from) url += '?from=' + req.query.from;
  if (req.query.to) url += (url.indexOf('?') > -1 ? '&' : '?') + 'to=' + req.query.to;
  request({ url: url, json: true }, function(error, response, body) {
    if (error) return res.status(500).json({ error: 'MAM API unreachable' });
    if (body) res.json(body);
    else res.status(500).json({ error: 'empty response' });
  });
};
