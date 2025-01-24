function initializePayPalButtons() {
  // Query all PayPal button containers
  document.querySelectorAll('[id^="paypal-button-container"]').forEach((container) => {
    const containerId = container.id; // e.g., "paypal-button-container-1"
    const productId = container.dataset.id; // Product ID (e.g., lpm2025morocco-2)

    // Render PayPal button for this container
    window.paypal
      .Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
        },
        async createOrder() {
          const box = container.closest(".paypal-box");
        
          // Collect input data
          const quantity = parseInt(box.querySelector(".quantity-input").value, 10) || 1;
          const nameInput = box.querySelector(`#${containerId.replace("paypal-button-container", "name")}`);
          const emailInput = box.querySelector(`#${containerId.replace("paypal-button-container", "email")}`);
          const name = nameInput.value.trim();
          const email = emailInput.value.trim();
        
          const dateRangeInput = box.querySelector(".flatpickr-input");
          let days = 1;
          let selectedDates = [];
          const productType = box.querySelector('[data-mode="by-people-by-day"]') ? "daily" : "fixed";
        
          if (productType === "daily") {
            if (dateRangeInput && dateRangeInput._flatpickr && dateRangeInput._flatpickr.selectedDates.length === 2) {
              selectedDates = dateRangeInput._flatpickr.selectedDates.map((date) => date.toISOString().split("T")[0]);
              days = Math.round(
                (dateRangeInput._flatpickr.selectedDates[1] - dateRangeInput._flatpickr.selectedDates[0]) /
                (24 * 60 * 60 * 1000)
              );
            } else {
              alert("Please select a valid date range for your stay.");
              dateRangeInput.focus();
              return;
            }
          }
        
          const productName = box.querySelector("h3 b").innerText;
          const costPerPerson = parseFloat(box.querySelector('[data-mode="by-people"]').dataset.cost);
          const costPerDay = parseFloat(box.querySelector('[data-mode="by-people-by-day"]')?.dataset.cost || 0);
        
          // Build cart items
          const cart = [];
          cart.push({
            id: productId,
            name: productName,
            quantity,
            days: 0, // Not applicable for fixed costs
            selectedDates: [],
            costPerPerson,
            total: costPerPerson * quantity,
            productType: "fixed",
          });
        
          if (productType === "daily") {
            cart.push({
              id: productId,
              name: `${productName} - Daily`,
              quantity,
              days,
              selectedDates,
              costPerPerson: costPerDay,
              total: costPerDay * quantity * days,
              productType: "daily",
            });
          }
        
          // Send cart to the server
          try {
            const response = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ cart, buyer: { name, email } }),
            });
        
            const orderData = await response.json();
        
            if (!response.ok) {
              throw new Error(orderData.error || "Unknown error occurred while creating the order.");
            }
        
            return orderData.id; // PayPal order ID
          } catch (error) {
            console.error("Order creation error:", error);
            document.querySelector("#result-message").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
          }
        },        
        async onApprove(data, actions) {
          try {
            const response = await fetch(`/api/orders/${data.orderID}/capture`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const orderData = await response.json();

            if (orderData?.details?.[0]?.issue === "INSTRUMENT_DECLINED") {
              return actions.restart();
            } else if (orderData?.details?.[0]) {
              throw new Error(
                `${orderData.details[0].description} (${orderData.debug_id})`
              );
            } else {
              const transaction =
                orderData.purchase_units[0]?.payments?.captures?.[0] ||
                orderData.purchase_units[0]?.payments?.authorizations?.[0];

              resultMessage(
                `<div class="alert alert-success" role="alert">Transaction ${transaction.status}: ${transaction.id}</div>`
              );
              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );
            }
          } catch (error) {
            console.error(error);
            resultMessage(
              `<div class="alert alert-danger" role="alert">Sorry, your transaction could not be processed...<br><br>${error}</div>`
            );
          }
        },
      })
      .render(`#${containerId}`);
  });
}

// Initialize PayPal buttons
document.addEventListener("DOMContentLoaded", () => {
  const paypalScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
  if (paypalScript) {
    console.log("paypalScript")
    initializePayPalButtons();
    document.querySelectorAll(".flatpickr-input").forEach((input) => {
      flatpickr(input, {
        mode: "range",
        dateFormat: "d/m/Y",
        minDate: "02-04-2025", // Replace with actual limits
        maxDate: "07-04-2025", // Replace with actual limits
        onClose: function (selectedDates, dateStr, instance) {
          if (selectedDates.length === 2) {
            const days = Math.round((selectedDates[1] - selectedDates[0]) / (24 * 60 * 60 * 1000)); // Calculate days
            const box = input.closest(".paypal-box");
            updateTotals(box, days);
          }
        },
      });
    });
    
    // Helper: Update totals for a specific product box
    function updateTotals(box, days = 1) {
      const quantityInput = box.querySelector(".quantity-input");
      const numPeople = parseInt(quantityInput.value, 10) || 1; // Default to 1 if invalid
    
      // Iterate over cost rows and calculate totals
      box.querySelectorAll(".row[data-mode]").forEach((row) => {
        const mode = row.dataset.mode;
        const cost = parseFloat(row.dataset.cost);
    
        if (mode === "by-people") {
          const total = cost * numPeople;
          row.querySelector(".peoples").innerText = numPeople;
          row.querySelector(".total").innerText = `€ ${total.toFixed(2)}`;
        } else if (mode === "by-people-by-day") {
          const total = cost * numPeople * days;
          row.querySelector(".peoples").innerText = numPeople;
          row.querySelector(".days").innerText = days;
          row.querySelector(".total").innerText = `€ ${total.toFixed(2)}`;
        }
      });
    
      // Calculate and update the grand total
      const grandTotal = Array.from(box.querySelectorAll(".row[data-mode] .total"))
        .reduce((sum, element) => {
          const amount = parseFloat(element.innerText.replace(/[^\d.]/g, "")) || 0;
          return sum + amount;
        }, 0);
    
      box.querySelector(".grantotal b").innerText = `€ ${grandTotal.toFixed(2)}`;
    }
    
    // Event: Listen for people count changes
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("input", (event) => {
        const box = input.closest(".paypal-box");
        const dateRangeInput = box.querySelector(".flatpickr-input");
        let days = 1; // Default to 1 day if no date range is selected
        if (dateRangeInput && dateRangeInput._flatpickr.selectedDates.length === 2) {
          days = Math.round(
            (dateRangeInput._flatpickr.selectedDates[1] -
              dateRangeInput._flatpickr.selectedDates[0]) /
              (24 * 60 * 60 * 1000)
          );
        }
        updateTotals(box, days);
      });
    });    /* paypalScript.addEventListener("load", () => {
      console.log("paypalScript")
    }); */
  } else {
    console.error("PayPal SDK script not found.");
  }
});
/*window.paypal
  .Buttons({
    style: {
      shape: "rect",
      layout: "vertical"
    },
    async createOrder() {
      console.log("bella")
      console.log($(this))
      console.log("bella2")
      console.log($("#paypal-button-container").data("id"))
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product ids and quantities
          body: JSON.stringify({
            cart: [
              {
                id: $("#paypal-button-container").data("id")
              },
            ],
          }),
        });

        const orderData = await response.json();

        if (orderData.id) {
          return orderData.id;
        } else {
          const errorDetail = orderData?.details?.[0];
          const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
            : JSON.stringify(orderData);

          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error(error);
        resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
      }
    },
    async onApprove(data, actions) {
      try {
        const response = await fetch(`/api/orders/${data.orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orderData = await response.json();
        // Three cases to handle:
        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        //   (2) Other non-recoverable errors -> Show a failure message
        //   (3) Successful transaction -> Show confirmation or thank you message

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          return actions.restart();
        } else if (errorDetail) {
          // (2) Other non-recoverable errors -> Show a failure message
          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
        } else if (!orderData.purchase_units) {
          throw new Error(JSON.stringify(orderData));
        } else {
          // (3) Successful transaction -> Show confirmation or thank you message
          // Or go to another URL:  actions.redirect('thank_you.html');
          const transaction =
            orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
            orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
          resultMessage(
            `<div class="alert alert-success" role="alert">Transaction ${transaction.status}: ${transaction.id}</div>`,
          );
          console.log(
            "Capture result",
            orderData,
            JSON.stringify(orderData, null, 2),
          );
        }
      } catch (error) {
        console.error(error);
        resultMessage(
          `<div class="alert alert-danger" role="alert">Sorry, your transaction could not be processed...<br><br>${error}</div>`,
        );
      }
    },
  })
  .render("#paypal-button-container");
*/
// Example function to show a result to the user. Your site's UI library can be used instead.
