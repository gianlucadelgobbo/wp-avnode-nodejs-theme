var helpers = require('../../helpers');
var fnz = require('../../functions');

exports.getTimeline = function getTimeline(req, res) {
  helpers.setSessions(req, function() {
    req.params.page = "timeline";
    helpers.getPage(req, function( result ) {
      //console.log(result);
      var page_data = fnz.setPageData(req, result);
      var year;
      if (req.params.year) {
        year = req.params.year;
      } else{
        var now = new Date();
        var yearAfter = now.getMonth()>7 ? now.getFullYear() : now.getFullYear()-1;
        year = yearAfter+"-"+now.getFullYear();
      }
      var startyear = parseInt(year.split("-")[0])-2;
      var endyear = parseInt(year.split("-")[1])-2;
      if (endyear<2004) endyear = 2004;
      var next = endyear == 2004 ? null : startyear+"-"+endyear;
      //console.log("year "+year);
      //console.log("next "+next);
      helpers.getAllEditionsEvents(req, year, function( results ) {
        var pugpage = (config.sez.pages.conf.timeline.pugpage ? config.sez.pages.conf.timeline.pugpage : config.sez.pages.conf.default.pugpage)+(req.body.ajax ? "_cnt" : "");
        var itemtype = config.sez.pages.conf.timeline.itemtype ? config.sez.pages.conf.timeline.itemtype : config.sez.pages.conf.default.itemtype;
        res.render(config.prefix+'/'+pugpage, {year: year, result: result, results:results, page_data:page_data, sessions:req.session.sessions, itemtype:itemtype, next:next});
      });
    });
  });
};
exports.getMap = function getMap(req, res) {
  helpers.setSessions(req, function() {
    req.params.page = "map";
    helpers.getPage(req, function( result ) {
      //console.log(result);
      var page_data = fnz.setPageData(req, result);
      var year = null;
      helpers.getAllEditionsEvents(req, year, function( results ) {
        var pugpage = (config.sez.pages.conf.map  .pugpage ? config.sez.pages.conf.map  .pugpage : config.sez.pages.conf.default.pugpage)+(req.body.ajax ? "_cnt" : "");
        var itemtype = config.sez.pages.conf.map  .itemtype ? config.sez.pages.conf.map  .itemtype : config.sez.pages.conf.default.itemtype;
        var markers = [];
        for (var item in results) {
          //console.log(results[item]);
          for (var country in results[item]['wpcf-location']){
            var str = "";
            for (var city in results[item]['wpcf-location'][country]){
              for (var venue in results[item]['wpcf-location'][country][city]) {
                if (venue) {
                  str = venue + ", " + city + ", " + country
                } else {
                  str = city + ", " + country
                }
                var marker = {
                  lat:results[item]['wpcf-location'][country][city][venue].lng,
                  lng:results[item]['wpcf-location'][country][city][venue].lat,
                  type:results[item].post_type,
                  slug:'/'+results[item].post_type+'/'+results[item].slug+'/',
                  display_name:results[item].post_title,
                  date:results[item].data_evento,
                  destination:str
                };
                markers.push(marker);
              }
            }
          }
        }
        res.render(config.prefix+'/'+pugpage, {year: year, result: result, markers:markers, page_data:page_data, sessions:req.session.sessions, itemtype:itemtype});
      });
    });
  });
};
