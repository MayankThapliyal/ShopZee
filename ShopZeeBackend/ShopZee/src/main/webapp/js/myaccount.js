// myaccount.js
document.addEventListener("DOMContentLoaded", () => {
  const accountDiv = document.getElementById("accountDetails");
  const backBtn = document.getElementById("backToHome");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    window.location.href = "login.html";
    return;
  }

  accountDiv.innerHTML = `
    <p><strong>User ID:</strong> ${loggedInUser.userId}</p>
    <p><strong>Username:</strong> ${loggedInUser.username}</p>
    <p><strong>Email:</strong> ${loggedInUser.email}</p>
    <p><strong>Phone Number:</strong> ${loggedInUser.phoneNumber || loggedInUser.phonenumber || ''}</p>
  `;

  backBtn.addEventListener("click", () => {
    window.location.href = "homepage.html";
  });
});
