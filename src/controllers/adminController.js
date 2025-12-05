const AdminController = (function () {
  function init() {
    const currentAdmin = AdminRepository.getCurrentAdmin();
    
    if (!currentAdmin) {
      window.location.href = "login.html";
      return;
    }


    const adminNameEl = document.getElementById("admin-name");
    if (adminNameEl) {
      adminNameEl.textContent = `${currentAdmin.firstName} ${currentAdmin.lastName}`;
    }


    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        AdminRepository.logout();
        window.location.href = "login.html";
      });
    }

    const listEl = document.getElementById("admin-profiles-list");
    if (!listEl) return;

    function refresh() {
      const profiles = ProfileRepository.getAll();
      AdminView.renderProfiles(listEl, profiles, (id) => {
        ProfileRepository.toggleVerified(id);
        refresh();
      });
    }

    refresh();
  }

  return {
    init,
  };
})();
