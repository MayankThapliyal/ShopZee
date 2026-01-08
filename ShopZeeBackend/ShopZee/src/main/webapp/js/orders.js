document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || !loggedInUser.userId) {
        alert("Please log in to view your orders.");
        window.location.href = "login.html";
        return;
    }

    //fetch(`http://localhost:8080/orders/${loggedInUser.username}`)
	fetch(`/ShopZee/orders/${loggedInUser.username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }
            return response.json();
        })
        .then(orders => {
            const tableBody = document.getElementById("ordersTableBody");

            if (orders.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No orders found</td></tr>`;
                return;
            }

            orders.forEach(order => {
                const row = document.createElement("tr");

                const itemsList = order.items.map(item => `<li>${item}</li>`).join("");
                row.innerHTML = `
                    <td>${order.orderId}</td>
                    <td><ul>${itemsList}</ul></td> 
                    `;
                    tableBody.appendChild(row);
                });
                let table = document.getElementById("ordersTableBody");
                
                // Loop through rows (skipping the header row if you have one)
                for (let i = 0; i < table.rows.length; i++) {
                    // Create a new cell
                    let statusCell = table.rows[i].insertCell(-1); // -1 means append at the end
                
                    // Assign random status
                    let statuses = ["ORDERED", "OUT FOR DELIVERY"];
                    let randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                    // Set cell text
                    statusCell.innerText = randomStatus;
                }

        })
        .catch(error => {
            console.error("Error loading orders:", error);
        });

        // Get the table

});
