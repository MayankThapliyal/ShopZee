const productGrid = document.querySelector('.product-grid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const searchBtn = document.getElementById('searchBtn');

let allProducts = [];

async function loadProducts() {
    try {
        const res = await fetch('http://localhost:8080/api/products');
        const products = await res.json();
        allProducts = products;
        renderProducts(allProducts);
    } catch (err) {
        console.error('Error fetching products: ', err);
    }
}

function renderProducts(products) {
    productGrid.innerHTML = '';

    products.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.dataset.category = p.category.toLowerCase();

        card.innerHTML = `
            <h3>${p.productName}</h3>
            <p><strong>Category: </strong> ${p.category}</p>
            <p data-field="brand"><strong>Brand:</strong> ${p.brand}</p>
            <p><strong>Price:</strong> ₹${p.price}</p>
            <div class="buttons">
                <button class="cart-btn" data-id="${p.product_id}">Add to Cart</button>
                <button class="wishlist-btn">Add to Wishlist</button>
            </div>
        `;

        // Properly attach cart button event
        card.querySelector('.cart-btn').addEventListener('click', () => {
            addToCart(p);
        });

        card.querySelector('.wishlist-btn').addEventListener('click',()=>{
            addToWishlist(p);
        })

        productGrid.appendChild(card);
    });
}

function filterProducts() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();

    const filtered = allProducts.filter(p => {
        const nameMatch = p.productName.toLowerCase().includes(searchText);
        const brandMatch = p.brand.toLowerCase().includes(searchText);
        const categoryMatch = (selectedCategory === "all" || p.category.toLowerCase() === selectedCategory);

        return (nameMatch || brandMatch) && categoryMatch;
    });
    renderProducts(filtered);
}

function addToCart(product) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("Please login to add items to the cart.");
        window.location.href = "login.html";
        return;
    }
    const userId = loggedInUser.userId;

    fetch('http://localhost:8080/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // backend expects userId and productId as request params, but your controller
        // uses @RequestParam, so POST with query parameters or use URLSearchParams
        // Alternatively, change backend to accept JSON body.

        // Here sending as URLSearchParams (simpler for @RequestParam)
        body: JSON.stringify({
            userId: userId,
            productId: product.productId,
            quantity: 1
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add to cart");
        }
        return response.json();
    })
    .then(data => {
        console.log("Cart updated:", data);
        alert(`${product.productName} added to cart!`);
        // TODO: update cart count UI if you have one
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to add to cart. Please try again.");
    });
}

function addToWishlist(product) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("Please login to add items to the wishlist.");
        window.location.href = "login.html";
        return;
    }
    const userId = loggedInUser.userId;

    fetch('http://localhost:8080/wishlist/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            productId: product.productId
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add to wishlist");
        }
        return response.json();
    })
    .then(data => {
        if(data === null) {
            alert(`${product.productName} is already in your wishlist.`);
        } else {
            alert(`${product.productName} added to wishlist!`);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to add to wishlist. Please try again.");
    });
}




// Event bindings
document.addEventListener('DOMContentLoaded', loadProducts);
categorySelect.addEventListener('change', filterProducts);
searchBtn.addEventListener('click', filterProducts);
searchInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") filterProducts();
});
