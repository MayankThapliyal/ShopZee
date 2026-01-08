document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const profileNameSpan = document.getElementById("profileName");

  // Get logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    // If no user is logged in, redirect to login page
    window.location.href = "login.html";
    return;
  }

  // Show username with dropdown arrow
  profileNameSpan.textContent = loggedInUser.username + " ▾";

  // Logout function
  function logout() {
    // Clear local/session storage
    localStorage.clear();
    sessionStorage.clear();

    // Trigger logout event for other tabs
    localStorage.setItem("logoutEvent", Date.now());

    // Redirect to login page with replace (no back)
    window.location.replace("login.html");
  }

  // Attach logout click handler
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
});

// Listen for logout event from other tabs/windows
window.addEventListener("storage", (event) => {
  if (event.key === "logoutEvent") {
    // Clear storage and redirect to login page
    localStorage.clear();
    sessionStorage.clear();

    alert("You have been logged out from another tab.");

    window.location.replace("login.html");
  }
});
