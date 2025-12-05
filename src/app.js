document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.endsWith("index.html") || path === "/" || path === "") {
    if (typeof HomeController !== "undefined") {
      HomeController.init();
    }
  }

  if (path.endsWith("profile.html")) {
    if (typeof ProfileController !== "undefined") {
      ProfileController.init();
    }
  }

  if (path.endsWith("admin.html")) {
    if (typeof AdminController !== "undefined") {
      AdminController.init();
    }
  }

  if (path.endsWith("login.html")) {
    if (typeof AuthController !== "undefined") {
      AuthController.init();
    }
  }
});
