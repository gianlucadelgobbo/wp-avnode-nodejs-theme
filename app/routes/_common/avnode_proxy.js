var request = require('request');

module.exports = function(app) {
  app.get('/api/avnode/galleries/:slug', function(req, res) {
    request({ url: 'https://api.admin.avnode.net/galleries/'+req.params.slug, json: true }, function(error, response, body) {
      if (body) res.json(body);
      else res.status(500).json({error: 'failed'});
    });
  });
  app.get('/api/avnode/galleries/:slug/:img', function(req, res) {
    request({ url: 'https://api.admin.avnode.net/galleries/'+req.params.slug+'/img/'+req.params.img, json: true }, function(error, response, body) {
      if (body) res.json(body);
      else res.status(500).json({error: 'failed'});
    });
  });
};
