const base = "https://api-m.sandbox.paypal.com";
var request = require( 'request' );
const fetch = require('node-fetch-commonjs');


exports.post = async function post(req, res) {
  console.log("stocazzo")
  req.body.id = "lpm2024morocco"
  console.log(req.body)
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const auth = Buffer.from(
      config.PAYPAL_CLIENT_ID + ":" + config.PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    request({
      url: `${base}/v1/oauth2/token`,
      method: "POST",
      form: {grant_type:"client_credentials"},
      headers: {
        Authorization: `Basic ${auth}`,
      },
      json: true
    }, 
    async function(error, response, data) {
      const order = await createOrder(data.access_token);
      res.json(order);    
    });
    
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

function createOrder(accessToken) {
  // create accessToken using your clientID and clientSecret
  // for the full stack example, please see the Standard Integration guide
  // https://developer.paypal.com/docs/multiparty/checkout/standard/integrate/
  //const accessToken = "REPLACE_WITH_YOUR_ACCESS_TOKEN";
  return fetch ("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "purchase_units": [
        {
          "amount": {
            "currency_code": "EUR",
            "value": "300.00"
          },
          "description": "LPM 2024 Full 4 Days",
          "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b"
        }
      ],
      "intent": "CAPTURE"
    })
  })
  .then((response) => response.json());
}

exports.capture = async function get(req, res) {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

/* async function handleResponse(response) {
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
} */


