// Active state variables
let cartItems = [];
let appliedDiscount = 0;
let appliedPromoCode = "";

// Food emoji and category helper
// function getEmojiCategory(itemId) {
//   let menuCategory = localStorage.getItem("cartItems");
//   menuCategory = JSON.parse(menuCategory);

//   const item = menuCategory.find((item) => item.id === itemId);
//   console.log(item);
//   if (item) {
//     const show_Category = document.getElementById("category");
//     show_Category.textContent = item.category;
//   }
// }

// Safe retrieval of items from localStorage
function loadCart() {
  const stored = localStorage.getItem("cartItems");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      // Ensure valid items with quantity > 0
      cartItems = parsed.filter(
        (item) => item && typeof item.price === "number" && item.quantity > 0,
      );
    } else {
      cartItems = [];
      console.log(cartItems);
    }
  } else {
    cartItems = [];
  }
  console.log("Loaded cart items from localStorage:", cartItems);
}

// Save cart to localStorage
function saveCart() {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

// Quantity adjustments
function updateItemQuantity(itemId, change) {
  const item = cartItems.find((i) => i.id === itemId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      if (confirm("Do you want to remove this item")) removeItem(itemId);
    } else {
      saveCart();
      renderCart();
    }
  }
}
// Remove single item
function removeItem(itemId) {
  cartItems = cartItems.filter((item) => item.id !== itemId);
  saveCart();
  renderCart();
}
// Clear entire cart
function clearAllCart() {
  if (confirm("Are you sure you want to clear the entire cart?")) {
    cartItems = [];
    saveCart();
    renderCart();
  }
}
// Render cart items and calculate totals
function renderCart() {
  const container = document.getElementById("cart-items-container");
  const emptyState = document.getElementById("cart-empty-state");
  const countBadge = document.getElementById("cart-items-count-badge");
  const clearBtn = document.getElementById("clear-all-cart-btn");
  const placeOrderBtn = document.getElementById("place-order-btn");

  //ADD CAEGORY TAG TO INDEPENDENT CART ITEM ROWS

  // Calculate total count
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  countBadge.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"}`;

  if (cartItems.length === 0) {
    container.innerHTML = "";
    emptyState.style.display = "flex";
    clearBtn.style.display = "none";
    placeOrderBtn.disabled = true;
    placeOrderBtn.style.opacity = "0.5";
    placeOrderBtn.style.cursor = "not-allowed";
  } else {
    emptyState.style.display = "none";
    clearBtn.style.display = "inline-flex";
    placeOrderBtn.disabled = false;
    placeOrderBtn.style.opacity = "1";
    placeOrderBtn.style.cursor = "pointer";

    // Generate HTML for cart rows
    container.innerHTML = cartItems
      .map((item) => {
        const itemTotal = item.price * item.quantity;

        return `
              <div class="cart-item-row-card" data-id="${item.id}" id="cart-row-${item.id}">
              
                <div class="cart-item-details">
                  <h4 class="cart-item-title">${item.name}</h4>
                  <div class="cart-item-meta">
                    <span class="diet-badge veg">🟢 Veg</span>
                    <span class="category-tag" id="category"></span>
                    <span class="cart-item-unit-price">₹${item.price} each</span>
                  </div>
                </div>

                <div class="quantity-control">
                  <button
                    type="button"
                    class="qty-btn minus"
                    onclick="updateItemQuantity('${item.id}', -1)"
                    aria-label="Decrease quantity">
                    −
                  </button>
                  <span class="qty-value">${item.quantity}</span>
                  <button
                    type="button"
                    class="qty-btn plus"
                    onclick="updateItemQuantity('${item.id}', 1)"
                    aria-label="Increase quantity">
                    +
                  </button>
                </div>

                <div class="cart-item-total-col">
                  <span class="cart-item-subtotal">₹${itemTotal}</span>
                </div>

                <button
                  type="button"
                  class="cart-item-delete-btn"
                  onclick="removeItem('${item.id}')"
                  title="Remove item"
                  aria-label="Remove ${item.name} from cart">
                  🗑
                </button>
              </div>
            `;
      })
      .join("");
  }

  updateOrderSummary();
}

// Calculate and update order summary
function updateOrderSummary() {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  let grandTotal = subtotal + tax;
  document.getElementById("summary-subtotal").textContent =
    `₹${subtotal.toFixed(2)}`;
  document.getElementById("summary-tax").textContent = `₹${tax.toFixed(2)}`;
  document.getElementById("summary-grand-total").textContent =
    `₹${grandTotal.toFixed(2)}`;
}

// Promo code handler
let promo_codes = {
  NEW100: 10,
  OFF50: 20,
  FREE50: 50,
  FREEDHV: 75,
};
function promoCode() {
  let input_promo = document
    .getElementById("promo-code-input")
    .value.trim()
    .toUpperCase();
  var promoCode_Status = document.getElementById("promo-message");
  if (promo_codes[input_promo] !== undefined) {
    let discount = promo_codes[input_promo];

    document.getElementById("summary-discount-row").style.display = "flex";
    document.getElementById("promo-message").style.display = "flex";
    document.getElementById("discount-label").textContent = `${input_promo}`;
    document.getElementById("summary-discount").textContent =
      `-₹${promo_codes[input_promo]}`;
    console.log(discount);
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.1; // Assuming 10% tax
    let grandTotal = subtotal + tax - discount;
    document.getElementById("summary-grand-total").textContent =
      `₹${grandTotal.toFixed(2)}`;
    promoCode_Status.textContent = `Voucher Redeemed you have Saved   ₹ ${discount}`;
  } else if (input_promo == "") {
    document.getElementById("apply-promo-btn").disabled;
    document.getElementById("promo-message").style.display = "flex";
    promoCode_Status.textContent = "Enter a valid Promo Code";
  } else {
    document.getElementById("promo-message").style.display = "flex";
    promoCode_Status.textContent = "Invalid promo code";
  }
}
// Dining preference pill selector interactions
function setupDiningSelector() {
  const pills = document.querySelectorAll(".dining-option-pill");
  const locationLabel = document.getElementById("location-label");
  const locationInput = document.getElementById("cust-location");

  pills.forEach((pill) => {
    pill.addEventListener("click", function () {
      pills.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      const radio = this.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const diningType = radio ? radio.value : "Dine-In";
      if (diningType === "Dine-In") {
        locationLabel.textContent = "Table Number";
        locationInput.placeholder = "e.g. Table 4";
      } else if (diningType === "Takeaway") {
        locationLabel.textContent = "Pickup Time / Counter Notes";
        locationInput.placeholder = "e.g. Ready in 20 mins";
      } else {
        locationLabel.textContent = "Delivery Address";
        locationInput.placeholder = "e.g. Flat 102, Green Valley Apartments";
      }
    });
  });
}

// Place Order & Open Confirmation Modal
function placeOrder() {
  if (cartItems.length === 0) {
    alert("Your cart is empty! Please add some dishes from the menu first.");
    return;
  }

  const nameInput = document.getElementById("cust-name");
  const phoneInput = document.getElementById("cust-phone");
  const locationInput = document.getElementById("cust-location");

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const location = locationInput.value.trim();

  if (!name) {
    alert("Please enter your name.");
    nameInput.focus();
    return;
  }
  if (!phone || phone.length < 8) {
    alert("Please enter a valid phone number.");
    phoneInput.focus();
    return;
  }
  if (!location) {
    alert("Please enter your table number or delivery address.");
    locationInput.focus();
    return;
  }

  // Active dining mode
  const activeRadio = document.querySelector(
    'input[name="dining_type"]:checked',
  );
  const diningType = activeRadio ? activeRadio.value : "Dine-In";
  const grandTotalText = document.getElementById(
    "summary-grand-total",
  ).textContent;

  // Generate mock Order ID
  const randomId = Math.floor(1000 + Math.random() * 9000);
  const orderId = `#AGK-${randomId}`;

  // Populate receipt modal
  document.getElementById("receipt-order-id").textContent = orderId;
  document.getElementById("receipt-customer-name").textContent = name;
  document.getElementById("receipt-dining-type").textContent = diningType;
  document.getElementById("receipt-location").textContent = location;
  document.getElementById("receipt-total-amount").textContent = grandTotalText;

  // Open modal
  const modal = document.getElementById("order-success-modal");
  modal.classList.add("open");

  // Clear local storage and cart state
  localStorage.removeItem("cartItems");
  cartItems = [];
}

// Attach event listeners when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderCart();
  setupDiningSelector();

  // getEmojiCategory();
  // Event: Clear cart button
  document
    .getElementById("clear-all-cart-btn")
    .addEventListener("click", clearAllCart);

  //Event: Apply promo button
  document
    .getElementById("apply-promo-btn")
    .addEventListener("click", promoCode);

  // Event: Enter key on promo input
  document
    .getElementById("promo-code-input")
    .addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        promoCode();
      }
    });

  // Event: Place order button
  document
    .getElementById("place-order-btn")
    .addEventListener("click", placeOrder);
});
