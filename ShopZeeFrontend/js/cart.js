document.addEventListener("DOMContentLoaded", () => {
  const loggedInUserStr = localStorage.getItem("loggedInUser");
  
  if (!loggedInUserStr) {
    alert("Please log in to view your cart.");
    window.location.replace("login.html");
    return;
  }

  
  let loggedInUser;
  try {
    loggedInUser = JSON.parse(loggedInUserStr);
  } catch {
    // If JSON.parse fails, clear bad data and redirect
    localStorage.removeItem("loggedInUser");
    alert("Please log in to view your cart.");
    window.location.replace("login.html");
    return;
  }

  if (!loggedInUser || !loggedInUser.userId) {
    localStorage.removeItem("loggedInUser");
    alert("Please log in to view your cart.");
    window.location.replace("login.html");
    return;
  }
  
  // If user is valid, proceed with rest of the code
  const userId = loggedInUser.userId;
  const cartGrid = document.getElementById("cartGrid");
  const emptyMessage = document.getElementById("emptyMessage");
  
  let totalAmountElem = document.getElementById("totalAmount");
  if (!totalAmountElem) {
    totalAmountElem = document.createElement("h3");
    totalAmountElem.id = "totalAmount";
    totalAmountElem.style.textAlign = "right";
    totalAmountElem.style.margin = "10px 20px";
    cartGrid.parentElement.insertBefore(totalAmountElem, cartGrid);
  }

  
  // Map to store price & quantity by cartItemId for total calculation
  const cartItemsMap = new Map();

  fetch(`http://localhost:8080/cart/${userId}`)
    .then(res => res.json())
    .then(async cartItems => {
      if (!cartItems || cartItems.length === 0) {
        proceedToPayBtn.disabled=true;
        proceedToPayBtn.style.backgroundColor="#ccc";
        proceedToPayBtn.style.cursor="not-allowed";
        emptyMessage.style.display = "block";
        totalAmountElem.textContent = "Total: ₹0";
        return;
      }
      emptyMessage.style.display = "none";

      cartGrid.innerHTML = "";

      for (const item of cartItems) {
        try {
          const productRes = await fetch(`http://localhost:8080/api/products/${item.productId}`);
          if (!productRes.ok) throw new Error("Product not found");
          const product = await productRes.json();

          renderCartItem(item, product);
          cartItemsMap.set(item.cartItemId, { quantity: item.quantity, price: product.price });
        } catch (err) {
          console.error("Error fetching product for cart item", err);
        }
      }

      recalcTotal();
    })
    .catch(err => {
      console.error("Error fetching cart items: ", err);
      emptyMessage.style.display = "block";
      emptyMessage.textContent = "Failed to load cart items.";
      totalAmountElem.textContent = "Total: ₹0";
    });

  function renderCartItem(cartItem, product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <h3>${product.productName}</h3>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <div class="quantity-control">
        <button class="decrease">-</button>
        <span class="quantity">${cartItem.quantity}</span>
        <button class="increase">+</button>
        </div>
      <button class="remove-item">Remove</button>
      `;

    const decreaseBtn = card.querySelector(".decrease");
    const increaseBtn = card.querySelector(".increase");
    const quantitySpan = card.querySelector(".quantity");

    decreaseBtn.addEventListener("click", () => {
      const currentQty = cartItemsMap.get(cartItem.cartItemId).quantity;
      if (currentQty > 1) {
        updateQuantity(cartItem.cartItemId, currentQty - 1, quantitySpan);
      }
    });

    increaseBtn.addEventListener("click", () => {
      const currentQty = cartItemsMap.get(cartItem.cartItemId).quantity;
      updateQuantity(cartItem.cartItemId, currentQty + 1, quantitySpan);
    });

    card.querySelector(".remove-item").addEventListener("click", () => {
      removeItem(cartItem.cartItemId, card);
    });

    cartGrid.appendChild(card);
  }
  
  function updateQuantity(cartItemId, newQty, quantitySpan) {
    fetch(`http://localhost:8080/cart/update/${cartItemId}?quantity=${newQty}`, {
      method: "PUT",
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update quantity");
      return res.json();
      })
      .then(updatedItem => {
        // Update local map and UI
        cartItemsMap.set(cartItemId, { quantity: updatedItem.quantity, price: cartItemsMap.get(cartItemId).price });
        quantitySpan.textContent = updatedItem.quantity;
        recalcTotal();
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update quantity. Try again.");
      });
    }
    
    function removeItem(cartItemId, card) {
      fetch(`http://localhost:8080/cart/remove/${cartItemId}`, {
        method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to remove item");
        card.remove();
        cartItemsMap.delete(cartItemId);
        recalcTotal();
        
        if (cartGrid.children.length === 0) {
          emptyMessage.style.display = "block";
          emptyMessage.textContent = "Cart is empty. Shop now to add items here!!!";
          totalAmountElem.textContent = "Total: ₹0";
        }
      })
      .catch(err => {
        console.error(err);
        alert("Failed to remove item. Try again.");
      });
  }

  function recalcTotal() {
    let total = 0;
    cartItemsMap.forEach(({ quantity, price }) => {
      total += quantity * price;
    });
    totalAmountElem.textContent = `Total: ₹${total.toFixed(2)}`;
  }

  const emptyCartBtn = document.getElementById("emptyCartBtn");

  // empty the cart functionality
  emptyCartBtn.addEventListener("click", async () => {
    if (!confirm("Are you sure you want to empty your cart?")) return;

    try {
      const res = await fetch(`http://localhost:8080/cart/clear/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      cartGrid.innerHTML = "";
      cartItemsMap.clear();
      emptyMessage.style.display = "block";
      emptyMessage.textContent = "Cart is empty. Shop now to add items here!!!";
      totalAmountElem.textContent = "Total: ₹0";
      
      alert("Cart emptied successfully!");
    } catch (error) {
      console.error("Failed to empty cart:", error);
      alert("Failed to empty cart. Please try again.");
    }
  });
  
  const proceedToPayBtn = document.getElementById('proceedToPayBtn');
  
  proceedToPayBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
  
});
