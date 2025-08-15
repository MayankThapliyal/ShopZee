// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const messageDiv = document.querySelector(".login-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value;

    if (!username || !password) {
      showMessage("Please fill both username and password", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          showMessage("Invalid username or password", "error");
        } else {
          showMessage("Login failed. Please try again.", "error");
        }
        return;
      }

      const user = await res.json();

      // Remove password before storing (if sent accidentally)
      delete user.password;

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      showMessage(`Welcome, ${user.username}! Redirecting...`, "success");

      // Redirect to homepage after short delay
      setTimeout(() => {
        window.location.href = "homepage.html";
      }, 100);
    } catch (err) {
      showMessage("Network error. Please try again.", "error");
      console.error(err);
    }
  });

  function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = "login-message " + type; // you can style .error and .success in CSS
  }
});
