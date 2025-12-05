const ADMIN_KEY = "talentAdmins";
const ADMIN_SESSION_KEY = "currentAdmin";

const AdminRepository = (function () {
  function getAll() {
    const admins = LocalStorageService.get(ADMIN_KEY, []);
    return Array.isArray(admins) ? admins : [];
  }

  function saveAll(list) {
    LocalStorageService.set(ADMIN_KEY, list);
  }

  function register(admin) {
    const list = getAll();
    
   
    const exists = list.some((a) => a.email === admin.email);
    if (exists) {
      return { success: false, message: "Cet email est déjà utilisé." };
    }

    list.push(admin);
    saveAll(list);
    return { success: true, admin };
  }

  function login(email, password) {
    const list = getAll();
    const admin = list.find((a) => a.email === email && a.password === password);
    
    if (!admin) {
      return { success: false, message: "Email ou mot de passe incorrect." };
    }

 
    LocalStorageService.set(ADMIN_SESSION_KEY, admin);
    return { success: true, admin };
  }

  function getCurrentAdmin() {
    return LocalStorageService.get(ADMIN_SESSION_KEY, null);
  }

  function logout() {
    LocalStorageService.remove(ADMIN_SESSION_KEY);
  }

  function isLoggedIn() {
    return getCurrentAdmin() !== null;
  }

  return {
    register,
    login,
    getCurrentAdmin,
    logout,
    isLoggedIn,
  };
})();
