var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');
var request = require('request');


exports.facebookSender = (req, res) => {
  request({
    url: "https://graph.facebook.com/oauth/access_token?client_id="+config.accounts.facebook.client_id+"&client_secret="+config.accounts.facebook.client_secret+"&redirect_uri=http://vjtelevision.com/facebookSender",
    /* headers: {
      'User-Agent': 'Awesome-Octocat-App'
    }, */
    json: true
  }, function(error, response, data) {
    //console.log(error)
    //console.log("https://graph.facebook.com/oauth/access_token?client_id="+config.accounts.facebook.client_id+"&client_secret="+config.accounts.facebook.client_secret+"&redirect_uri=http://vjtelevision.com/facebookSender")
    //console.log(data)
    //callback(data);
  });
}


//select * from flyer_wp_20_terms,flyer_wp_20_term_relationships,flyer_wp_20_term_taxonomy where flyer_wp_20_term_taxonomy.term_taxonomy_id=flyer_wp_20_term_relationships.term_taxonomy_id and flyer_wp_20_term_taxonomy.term_id=flyer_wp_20_terms.term_id and  flyer_wp_20_term_relationships.object_id =49197;
//wp.taxonomies().taxonomy( 'author' ).terms().get(function( err2, data2 ) {
