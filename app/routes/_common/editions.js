var helpers = require('../../helpers/helpers');
var fnz = require('../../helpers/functions');

const base = "https://api-m.paypal.com";
const fetch = require('node-fetch-commonjs');
var clientId = "";
var clientToken = "";

exports.get = function get(req, res) {
  //console.log(req.params.subedition)
  helpers.setSessions(req, function() {
    //console.log(req.params)
    //console.log(req.session)
    helpers.getEdition(req, async function( result ) {
      var rientro = req.url.indexOf("/program/")>0;
      //console.log("rientro");
      let page_data = fnz.setPageData(req, result);
      //console.log("result.post_title");
      //console.log(result.avnode);
      let include_gallery = false;
      let include_paypal = false;
     if (result.post_title) {
        let template;
        if (req.params.performance) {
          if (result.avnode.performance && result.avnode.performance.title) {
            template = config.prefix+'/'+'edition_performance';
            include_gallery = true;
          }
        } else if (req.params.subedition == "artists") {
          if (result.avnode.advanced && result.avnode.advanced.performers) {
            template = config.prefix+'/'+'edition_artists';
          }
        } else if (req.params.artist) {
          if (result.avnode.performer && result.avnode.performer.stagename) {
            template = config.prefix+'/'+'edition_artist';
          }
        } else if (req.params.subedition == "gallery") {
          if (result.avnode.galleries || result.avnode.medias) {
            include_gallery = true;
            template = config.prefix+'/'+'edition_medias';
          }
        } else if (req.params.subedition == "videos") {
          if (result.avnode.videos || result.avnode.media) {
            include_gallery = true;
            template = config.prefix+'/'+'edition_medias';
          }
        } else if (req.params.subedition == "tickets") {
          include_paypal = true;
          const { jsonResponse } = await generateClientToken();
          clientId = config.PAYPAL_CLIENT_ID,
          clientToken = jsonResponse.client_token,
          template = config.prefix+'/'+'edition';
        } else {
          template = config.prefix+'/'+'edition';
        }
        if (template) {
          res.render(template, {result: result, req_params:req.params, page_data:page_data, sessions:req.session.sessions,rientro:rientro, include_gallery: include_gallery,include_paypal: include_paypal, clientToken:clientToken, clientId:clientId});
        } else {
          res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
        }
      } else {
        res.status(404).render(config.prefix+'/404', {page_data:page_data, sessions:req.session.sessions, itemtype:"WebPage"});
      }
    });
  });
};
/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!config.PAYPAL_CLIENT_ID || !config.PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      config.PAYPAL_CLIENT_ID + ":" + config.PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Generate a client token for rendering the hosted card fields.
 * @see https://developer.paypal.com/docs/checkout/advanced/integrate/#link-integratebackend
 */
const generateClientToken = async () => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v1/identity/generate-token`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "en_US",
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};
async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
