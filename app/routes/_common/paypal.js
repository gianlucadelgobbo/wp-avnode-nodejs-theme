const base = "https://api-m.sandbox.paypal.com";
var request = require( 'request' );


exports.post = async function get(req, res) {
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
    function(error, response, data) {
      console.log(`Bearer ${data.access_token}`)
      const url = `${base}/v2/checkout/orders`;
      const payload = {
        intent: "capture",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100.00",
            },
          },
        ],
      };
    
      request({
        url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access_token}`,
          // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
          // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
        form: JSON.stringify({
          "purchase_units": [
            {
              "amount": {
                "currency_code": "USD",
                "value": "100.00"
              },
              "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b"
            }
          ],
          "intent": "CAPTURE",
          "payment_source": {
            "paypal": {
              "experience_context": {
                "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                "payment_method_selected": "PAYPAL",
                "brand_name": "EXAMPLE INC",
                "locale": "en-US",
                "landing_page": "LOGIN",
                "shipping_preference": "SET_PROVIDED_ADDRESS",
                "user_action": "PAY_NOW",
                "return_url": "https://example.com/returnUrl",
                "cancel_url": "https://example.com/cancelUrl"
              }
            }
          }
        }),
        method: "POST",
        json: true
      }, 
      function(error, response, data) {
        console.log(data)
        res.json (data);
      });
          //res.status(httpStatusCode).json(data);
      //callback(data);
    });
    
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};
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


