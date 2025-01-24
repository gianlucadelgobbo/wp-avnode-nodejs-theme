const sandbox = false;
var base = sandbox ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";
var request = require('request');
const fetch = require('node-fetch-commonjs');

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  let PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET;
  if (sandbox) {
    PAYPAL_CLIENT_ID = config.PAYPAL_CLIENT_ID_SANDBOX;
    PAYPAL_CLIENT_SECRET = config.PAYPAL_CLIENT_SECRET_SANDBOX;
  } else {
    PAYPAL_CLIENT_ID = config.PAYPAL_CLIENT_ID;
    PAYPAL_CLIENT_SECRET = config.PAYPAL_CLIENT_SECRET;
  }
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error generating access token:", data);
      throw new Error(data.error || "Failed to generate access token");
    }
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw error;
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

/**
 * Create an order dynamically based on client-provided cart data.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart) => {
  try {
    console.log("Shopping cart information from the frontend:", cart);

    let totalValue = 0;
    const items = cart.map((item) => {
      const { name, description = name, quantity, days, costPerPerson, productType } = item;

      if (!name || !costPerPerson || !quantity || (productType === "daily" && !days)) {
        throw new Error(`Missing required fields in cart item: ${JSON.stringify(item)}`);
      }

      let unitAmountValue;
      let itemQuantity;

      if (productType === "daily") {
        // For daily products, each unit is a single day per person
        unitAmountValue = costPerPerson.toFixed(2);
        itemQuantity = quantity * days; // Multiply people by days for total quantity
      } else {
        // For fixed products, each unit is a single person
        unitAmountValue = costPerPerson.toFixed(2);
        itemQuantity = quantity;
      }

      const itemTotal = itemQuantity * parseFloat(unitAmountValue);
      totalValue += itemTotal;

      return {
        name,
        quantity: itemQuantity.toString(), // Total quantity for PayPal
        description:
          productType === "daily"
            ? `Daily rate for ${days} day(s) per person`
            : "Fixed price",
        unit_amount: {
          currency_code: "EUR",
          value: unitAmountValue, // Price per unit
        },
      };
    });

    const purchase_units = [
      {
        description: "Combined order for fixed and daily products",
        amount: {
          currency_code: "EUR",
          value: totalValue.toFixed(2), // Total order value
          breakdown: {
            item_total: {
              currency_code: "EUR",
              value: totalValue.toFixed(2), // Sum of all items
            },
          },
        },
        items,
      },
    ];

    console.log("Calculated Item Total:", totalValue.toFixed(2));
    console.log("Payload Sent to PayPal:", JSON.stringify(purchase_units, null, 2));

    const accessToken = await generateAccessToken();
    const response = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
        purchase_units,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("PayPal API Error:", data);
      return { jsonResponse: data, httpStatusCode: response.status || 500 };
    }

    return { jsonResponse: data, httpStatusCode: response.status };
  } catch (error) {
    console.error("Error creating order:", error);
    return { jsonResponse: { error: error.message }, httpStatusCode: 500 };
  }
};


/**
 * Capture payment for a created order.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  try {
    const accessToken = await generateAccessToken();
    const response = await fetch(`${base}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("PayPal API Error:", data);
      return { jsonResponse: data, httpStatusCode: response.status || 500 };
    }

    return { jsonResponse: data, httpStatusCode: response.status };
  } catch (error) {
    console.error("Error capturing order:", error);
    return { jsonResponse: { error: error.message }, httpStatusCode: 500 };
  }
};

/**
 * Handle API responses.
 */
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

/**
 * POST endpoint to create an order.
 */
exports.post = async function post(req, res) {
  try {
    const { cart } = req.body;
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Invalid cart data" });
    }

    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error.message || error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

/**
 * POST endpoint to capture an order.
 */
exports.capture = async function capture(req, res) {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to capture order:", error.message || error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};
