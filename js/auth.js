document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const welcomeUser = document.getElementById("welcomeUser");
  const logoutBtn = document.getElementById("logoutBtn");

  const isLoggedIn = localStorage.getItem("loggedIn");

  // =============================
  // AUTO REDIRECT IF LOGGED IN
  // =============================
  if (isLoggedIn && window.location.pathname.includes("login")) {
    window.location.href = "menu.html";
  }

  if (isLoggedIn && window.location.pathname.includes("signup")) {
    window.location.href = "dashboard.html";
  }

  // =============================
  // SIGNUP
  // =============================
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.find((user) => user.email === email);

      if (userExists) {
        alert("Account already exists with this email!");
        return;
      }

      const newUser = {
        name: name,
        email: email,
        password: password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login after signup
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      alert("Sign Up Successful! 🎉");

      window.location.href = "dashboard.html";
    });
  }

  // =============================
  // LOGIN
  // =============================
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!validUser) {
        alert("Invalid Email or Password");
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(validUser));

      // Auto order system
      const autoOrder = localStorage.getItem("autoOrderAfterLogin");

      if (autoOrder === "true") {
        localStorage.removeItem("autoOrderAfterLogin");
        localStorage.removeItem("cart");
        alert("Order Placed Successfully! 🎉");
        window.location.href = "menu.html";
      } else {
        window.location.href = "dashboard.html";
      }
    });
  }

  // =============================
  // DASHBOARD PROTECTION
  // =============================
  if (welcomeUser) {
    if (!isLoggedIn) {
      window.location.href = "login_.html";
    } else {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (currentUser) {
        welcomeUser.textContent = "Welcome, " + currentUser.name + " 👋";
      }
    }
  }

  // =============================
  // LOGOUT
  // =============================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "login_.html";
    });
  }
});
// Show order history in dashboard
const orders = JSON.parse(localStorage.getItem("orders")) || [];

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || !currentUser.email) {
    console.error("User not logged in");
    orderHistory.innerHTML = "<p>Please login first.</p>";
} else {

    const userOrders = orders.filter(order => 
        order.userEmail === currentUser.email
    );

    if (userOrders.length === 0) {
        orderHistory.innerHTML = "<p>No orders yet.</p>";
    } else {
        userOrders.forEach(order => {
            console.log(order);
            // yaha apna order display code likho
    
      orderHistory.innerHTML += `
                <div style="background:#1f1f1f;padding:20px;margin:20px 0;border-radius:10px;">
                    <h3>Order Date: ${order.date}</h3>
                    <ul>${itemsHTML}</ul>
                </div>
            `;
    });
  }
}
