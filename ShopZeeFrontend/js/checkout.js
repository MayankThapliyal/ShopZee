
document.addEventListener("DOMContentLoaded", async () => {
  const checkoutSummary = document.getElementById('checkoutSummary');
  const checkoutForm = document.getElementById('checkoutForm');
  const orderStatus = document.getElementById('orderStatus');
  const confirmBtn = document.getElementById('confirmBtn');

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Please log in to proceed with checkout.");
    window.location.replace("login.html");
    return;
  }
  const userId = loggedInUser.userId;

  // ----- Coupon definitions (frontend-only rules) -----
  const coupons = {
    "WELCOME10": { type: "percentage", value: 10, appliesTo: "cart", category: null, minPurchase: 0, expiry: "2025-08-31" },
    "FREESHIP":  { type: "freeshipping", value: 0,  appliesTo: "cart", category: null, minPurchase: 4999, expiry: "2025-09-15" },
    "FESTIVE20": { type: "percentage", value: 20, appliesTo: "cart", category: null, minPurchase: 0, expiry: "2025-10-10" },
    "BUY2GET1":  { type: "buyXgetY",  buy: 2, get: 1, appliesTo: "cart", category: null, expiry: "2025-09-30" },
    "SHOP50":    { type: "flat", value: 450, appliesTo: "cart", category: null, minPurchase: 5000, expiry: "2025-09-05" },
    "SUPER30":   { type: "percentage", value: 30, appliesTo: "category", category: "Electronics", minPurchase: 0, expiry: "2025-09-20" },
    "WEEKEND15": { type: "percentage", value: 15, appliesTo: "cart", category: null, minPurchase: 0, expiry: "2025-09-07" },
    "FASHION25": { type: "percentage", value: 25, appliesTo: "category", category: "Clothing", minPurchase: 0, expiry: "2025-09-18" },
    "GROCERY5":  { type: "percentage", value: 5,  appliesTo: "category", category: "Kitchen", minPurchase: 0, expiry: "2025-09-25" },
    "DIWALI250": { type: "flat", value: 250, appliesTo: "cart", category: null, minPurchase: 0, expiry: "2025-11-05" }
  };

  // ----- State -----
  let rawCartItems = [];          // from backend (productId, quantity, etc.)
  let cartItems = [];             // enriched with product data: {productId, name, price, quantity, category}
  let subtotal = 0;               // sum of price*qty
  let finalAmount = 0;            // subtotal - discount
  let discountAmount = 0;
  let appliedCouponCode = null;

  // ----- Utils -----
  const formatINR = (num) => {
    return Number(num).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  // Ensure we read category robustly from product payloads with different schemas
  const getProductCategory = (product) => (
    product.category ||
    product.productCategory ||
    product.type ||
    product.categoryName ||
    "Uncategorized"
  );

  // ----- Fetch cart items and build summary -----
  try {
    const res = await fetch(`http://localhost:8080/cart/${userId}`);
    rawCartItems = await res.json();

    if (!rawCartItems.length) {
      checkoutSummary.innerHTML = "<p>Your cart is empty. Please add items before checkout.</p>";
      checkoutForm.style.display = 'none';
      confirmBtn.style.display = 'none';
      return;
    }

    let rowsHtml = "";
    subtotal = 0;
    cartItems = [];

    for (const item of rawCartItems) {
      const productRes = await fetch(`http://localhost:8080/api/products/${item.productId}`);
      const product = await productRes.json();

      const name = product.productName || product.name || `Product #${item.productId}`;
      const price = Number(product.price) || 0;
      const quantity = Number(item.quantity) || 1;
      const category = getProductCategory(product);

      const itemSubtotal = price * quantity;
      subtotal += itemSubtotal;

      cartItems.push({ productId: item.productId, name, price, quantity, category });

      rowsHtml += `
        <tr>
          <td>${name}</td>
          <td style="text-align:center;">${quantity}</td>
          <td style="text-align:right;">${price.toFixed(2)}</td>
          <td style="text-align:right;">${itemSubtotal.toFixed(2)}</td>
        </tr>
      `;
    }

    finalAmount = subtotal;

    const tableHtml = `
      <h2>Order Summary</h2>
      <table border="1" cellspacing="0" cellpadding="8" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Subtotal (₹)</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align:right; font-weight:bold;">Subtotal:</td>
            <td id="subtotalCell" style="text-align:right; font-weight:bold;">${formatINR(subtotal)}</td>
          </tr>
          <tr id="discountRow" style="display:none;">
            <td colspan="3" style="text-align:right; font-weight:bold;">Discount <span id="appliedCodeLabel"></span>:</td>
            <td id="discountCell" style="text-align:right; font-weight:bold;">-${formatINR(0)}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align:right; font-weight:bold;">Payable:</td>
            <td id="payableCell" style="text-align:right; font-weight:bold;">${formatINR(finalAmount)}</td>
          </tr>
        </tfoot>
      </table>
    `;
    checkoutSummary.innerHTML = tableHtml;

  } catch (err) {
    console.error("Error loading checkout summary:", err);
    checkoutSummary.innerHTML = "<p>Failed to load checkout details. Please try again.</p>";
    checkoutForm.style.display = 'none';
  }

  // ----- Coupon UI elements -----
  const couponCheckBox = document.getElementById('couponApply');
  const applyCouponDiv = document.getElementById('applyCoupon');
  const couponInput = document.getElementById('couponCode');
  const couponBtn = document.getElementById('couponBtn');

  // Create a Remove Coupon button programmatically (so you don't need to change HTML)
  const removeCouponBtn = document.getElementById('removeCouponBtn');
  if (applyCouponDiv) applyCouponDiv.appendChild(removeCouponBtn);

  // Toggle input area
  if (couponCheckBox && applyCouponDiv) {
    couponCheckBox.addEventListener('change', () => {
      applyCouponDiv.style.display = couponCheckBox.checked ? 'block' : 'none';
    });
  }

  // ----- Coupon calculation helpers -----
  const isExpired = (expiryStr) => {
    const now = new Date();
    const expiry = new Date(`${expiryStr}T23:59:59`);
    return now > expiry;
  };

  const sumEligible = (items) => items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const buildEligibleUnits = (items) => {
    // Expand into an array of unit prices for "cheapest free" calc
    const units = [];
    for (const it of items) {
      for (let i = 0; i < it.quantity; i++) units.push(it.price);
    }
    return units.sort((a, b) => a - b);
  };

  const calculateDiscount = (code) => {
    const coupon = coupons[code];
    if (!coupon) return { ok: false, message: "Invalid coupon code." };
    if (isExpired(coupon.expiry)) return { ok: false, message: "Coupon expired." };

    // Min purchase threshold applies to cart subtotal
    if (subtotal < (coupon.minPurchase || 0)) {
      return { ok: false, message: `Minimum purchase of ${formatINR(coupon.minPurchase)} required.` };
    }

    // Eligible pool for category vs cart
    const eligibleItems = (coupon.appliesTo === "category")
      ? cartItems.filter(it => it.category === coupon.category)
      : cartItems.slice();

    const eligibleTotal = sumEligible(eligibleItems);
    let discount = 0;
    let infoText = "";

    switch (coupon.type) {
      case "percentage":
        if (coupon.appliesTo === "category" && eligibleTotal === 0) {
          return { ok: false, message: `No items found in category "${coupon.category}".` };
        }
        discount = (coupon.appliesTo === "category" ? eligibleTotal : subtotal) * (coupon.value / 100);
        infoText = `${coupon.value}%`;
        break;

      case "flat":
        discount = Math.min(coupon.value, subtotal);
        infoText = `${formatINR(coupon.value)}`;
        break;

      case "freeshipping":
        // No monetary discount here unless you maintain a shipping charge variable.
        // We still enforce single-coupon rule and mark it as applied.
        discount = 0;
        infoText = `Free Shipping`;
        break;

      case "buyXgetY": {
        const units = buildEligibleUnits(eligibleItems);
        const buy = Number(coupon.buy) || 0;
        const get = Number(coupon.get) || 0;
        const group = buy + get;

        if (units.length < buy) {
          return { ok: false, message: `Need at least ${buy} eligible item(s) to use this coupon.` };
        }

        const freeUnits = Math.floor(units.length / group) * get;
        // Discount equals the sum of the cheapest 'freeUnits'
        discount = units.slice(0, freeUnits).reduce((a, v) => a + v, 0);
        infoText = `Buy ${buy} Get ${get} Free`;
        break;
      }

      default:
        return { ok: false, message: "Unsupported coupon type." };
    }

    // Clamp and round
    discount = Math.max(0, Math.min(discount, subtotal));
    const payable = Math.max(0, subtotal - discount);

    return { ok: true, discount, payable, infoText };
  };

  const updateTotalsUI = () => {
    const subtotalCell = document.getElementById('subtotalCell');
    const discountRow = document.getElementById('discountRow');
    const discountCell = document.getElementById('discountCell');
    const payableCell = document.getElementById('payableCell');
    const codeLabel = document.getElementById('appliedCodeLabel');

    if (subtotalCell) subtotalCell.textContent = formatINR(subtotal);
    if (payableCell) payableCell.textContent = formatINR(finalAmount);

    if (appliedCouponCode) {
      if (discountRow) discountRow.style.display = '';
      if (discountCell) discountCell.textContent = `-${formatINR(discountAmount)}`;
      if (codeLabel) codeLabel.textContent = `(${appliedCouponCode})`;
    } else {
      if (discountRow) discountRow.style.display = 'none';
      if (discountCell) discountCell.textContent = `-${formatINR(0)}`;
      if (codeLabel) codeLabel.textContent = '';
    }
  };

  const lockCouponUI = (locked) => {
    if (couponInput) couponInput.disabled = locked;
    if (couponBtn) couponBtn.disabled = locked;
    if (removeCouponBtn) removeCouponBtn.style.display = locked ? 'inline-block' : 'none';
  };

  // ----- Apply coupon (one at a time) -----
  if (couponBtn) {
    couponBtn.addEventListener('click', () => {
      const code = (couponInput?.value || "").trim().toUpperCase();
      if (!code) {
        alert("Please enter a coupon code.");
        return;
      }
      if (appliedCouponCode) {
        alert(`Coupon "${appliedCouponCode}" is already applied. Remove it before applying a new one.`);
        return;
      }

      const result = calculateDiscount(code);
      if (!result.ok) {
        alert(result.message);
        return;
      }

      appliedCouponCode = code;
      discountAmount = result.discount;
      finalAmount = result.payable; // enforce single coupon
      updateTotalsUI();
      lockCouponUI(true);

      const label = result.infoText ? ` (${result.infoText})` : "";
      alert(`Coupon applied${label}! You saved ${formatINR(discountAmount)}.`);
    });
  }

  // ----- Remove coupon -----
  removeCouponBtn.addEventListener('click', () => {
    if (!appliedCouponCode) return;
    appliedCouponCode = null;
    discountAmount = 0;
    finalAmount = subtotal;
    updateTotalsUI();
    lockCouponUI(false);
    if (couponInput) couponInput.value = '';
    alert("Coupon removed.");
  });

  // ----- Payment method toggle + validation -----
  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener("change", function () {
      const cardDetails = document.getElementById('cardDetails');
      const upiDetails = document.getElementById('upiDetails');
      if (cardDetails) cardDetails.style.display = (this.value === 'Card') ? 'block' : 'none';
      if (upiDetails) upiDetails.style.display = (this.value === 'UPI') ? 'block' : 'none';
      validateForm();
    });
  });

  function validateForm() {
    const fullName = document.getElementById("fullName")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

    let isValid = !!(fullName && address && phone && email && paymentMethod);

    if (paymentMethod === "Card") {
      const cardNumber = document.getElementById("cardNumber")?.value.trim();
      const expiryDate = document.getElementById("expiry")?.value.trim();
      const cvv = document.getElementById("cvv")?.value.trim();
      isValid = isValid && !!(cardNumber && expiryDate && cvv);
    }
    if (paymentMethod === "UPI") {
      const upiId = document.getElementById("upiId")?.value.trim();
      isValid = isValid && !!upiId;
    }

    if (confirmBtn) confirmBtn.disabled = !isValid;
  }

  document.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", validateForm);
  });
  if (confirmBtn) confirmBtn.disabled = true;

  // ----- Confirm order (uses discounted finalAmount) -----
  if (confirmBtn) {
    confirmBtn.addEventListener("click", async function () {
      try {
        const cartItemsRes = await fetch(`http://localhost:8080/cart/${userId}`);
        const latestCart = await cartItemsRes.json();

        if (!latestCart.length) {
          alert("Cart is empty. Cannot place order");
          return;
        }

        const productNames = [];
        for (const item of latestCart) {
          const productRes = await fetch(`http://localhost:8080/api/products/${item.productId}`);
          const product = await productRes.json();
          productNames.push(product.productName || product.name || `Product #${item.productId}`);
        }

        const orderData = {
          username: loggedInUser.username,
          items: productNames,
          totalAmount: finalAmount // send discounted payable amount
        };

        const orderRes = await fetch(`http://localhost:8080/orders/place`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData)
        });

        if (!orderRes.ok) throw new Error("Failed to save order.");

        // Clear cart after placing order
        for (const item of latestCart) {
          await fetch(`http://localhost:8080/cart/remove/${item.cartItemId}`, { method: 'DELETE' });
        }

        orderStatus.style.color = 'green';
        orderStatus.textContent = "Order placed successfully! Thank you for shopping with ShopZee.";
        if (checkoutForm) checkoutForm.style.display = 'none';
        if (checkoutSummary) checkoutSummary.style.display = 'none';
        if (confirmBtn) confirmBtn.style.display = 'none';
        const upiDetails = document.getElementById('upiDetails');
        if (upiDetails) upiDetails.style.display = 'none';

        setTimeout(() => window.location.href = "orders.html", 100);

      } catch (err) {
        console.error("Error during checkout:", err);
        orderStatus.style.color = 'red';
        orderStatus.textContent = "Failed to place order. Please try again.";
      }
    });
  }

  // Initial UI sync
  updateTotalsUI();
});
