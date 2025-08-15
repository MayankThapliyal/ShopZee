document.addEventListener("DOMContentLoaded", () => {
    const wishlistGrid = document.getElementById("wishlistGrid");
    const emptyWishlistMessage = document.getElementById("emptyWishlistMessage");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("Please log in to view your wishlist.");
        window.location.replace("login.html");
        return;
    }
    const userId = loggedInUser.userId;

    fetch(`http://localhost:8080/wishlist/${userId}`)
        .then(res => res.json())
        .then(async wishlistItems => {
            if (!wishlistItems || wishlistItems.length === 0) {
                emptyWishlistMessage.style.display = "block";
                return;
            }
            emptyWishlistMessage.style.display = "none";

            wishlistGrid.innerHTML = "";

            for (const item of wishlistItems) {
                try {
                    const productRes = await fetch(`http://localhost:8080/api/products/${item.productId}`);
                    if (!productRes.ok) throw new Error("Product not found");
                    const product = await productRes.json();

                    renderWishlistItem(item, product);
                } catch (err) {
                    console.error("Error fetching product for wishlist item", err);
                }
            }
        })
        .catch(err => {
            console.error("Error fetching wishlist items: ", err);
            emptyWishlistMessage.style.display = "block";
            emptyWishlistMessage.textContent = "Failed to load wishlist items.";
        });

    function renderWishlistItem(wishlistItem, product) {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.productName}</h3>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <div class="buttons">
                <button class="add-to-cart-btn">Add to Cart</button>
                <button class="remove-from-wishlist-btn">Remove</button>
            </div>
        `;

        card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            addToCartFromWishlist(product);
        });

        card.querySelector(".remove-from-wishlist-btn").addEventListener("click", () => {
            removeFromWishlist(wishlistItem.wishlistItemId, card);
        });

        wishlistGrid.appendChild(card);
    }

    function addToCartFromWishlist(product) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Please login to add items to the cart.");
            window.location.href = "login.html";
            return;
        }
        const userId = loggedInUser.userId;

        fetch('http://localhost:8080/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, productId: product.productId, quantity: 1 })
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to add to cart");
            return res.json();
        })
        .then(data => {
            alert(`${product.productName} added to cart!`);
        })
        .catch(err => {
            console.error("Error adding to cart from wishlist:", err);
            alert("Failed to add to cart. Please try again.");
        });
    }

    function removeFromWishlist(wishlistItemId, card) {
        fetch(`http://localhost:8080/wishlist/remove/${wishlistItemId}`, {
            method: "DELETE",
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to remove from wishlist");
            card.remove();

            if (wishlistGrid.children.length === 0) {
                emptyWishlistMessage.style.display = "block";
                emptyWishlistMessage.textContent = "Your wishlist is empty. Add some products!";
            }
        })
        .catch(err => {
            console.error(err);
            alert("Failed to remove from wishlist. Try again.");
        });
    }
});
