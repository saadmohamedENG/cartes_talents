const AuthController = (function () {
  function init() {
    const loginSection = document.getElementById("login-section");
    const registerSection = document.getElementById("register-section");
    const showRegisterLink = document.getElementById("show-register");
    const showLoginLink = document.getElementById("show-login");

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    if (!loginForm || !registerForm) return;


    if (showRegisterLink) {
      showRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginSection.style.display = "none";
        registerSection.style.display = "block";
      });
    }

    if (showLoginLink) {
      showLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        registerSection.style.display = "none";
        loginSection.style.display = "block";
      });
    }


    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const messageEl = document.getElementById("login-message");

      const result = AdminRepository.login(email, password);

      if (result.success) {
        messageEl.textContent = "Connexion réussie ! Redirection...";
        messageEl.style.color = "var(--accent)";
        setTimeout(() => {
          window.location.href = "admin.html";
        }, 800);
      } else {
        messageEl.textContent = result.message;
        messageEl.style.color = "var(--danger)";
      }
    });


    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const firstName = document.getElementById("register-firstname").value;
      const lastName = document.getElementById("register-lastname").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const messageEl = document.getElementById("register-message");

      if (!Validators.required(firstName) || !Validators.required(lastName) || !Validators.required(email) || !Validators.required(password)) {
        messageEl.textContent = "Tous les champs sont obligatoires.";
        messageEl.style.color = "var(--danger)";
        return;
      }

      const admin = createAdmin({ firstName, lastName, email, password });
      const result = AdminRepository.register(admin);

      if (result.success) {
        messageEl.textContent = "Compte créé avec succès ! Connexion...";
        messageEl.style.color = "var(--accent)";
        
 
        AdminRepository.login(email, password);
        
        setTimeout(() => {
          window.location.href = "admin.html";
        }, 800);
      } else {
        messageEl.textContent = result.message;
        messageEl.style.color = "var(--danger)";
      }
    });
  }

  return {
    init,
  };
})();
