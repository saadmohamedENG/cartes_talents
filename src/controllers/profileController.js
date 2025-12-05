const ProfileController = (function () {
  function init() {
    const els = ProfileFormView.getFormElements();
    if (!els.form) return;

    els.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = ProfileFormView.readForm();

      if (!Validators.required(data.name)) {
        ProfileFormView.setMessage("Le nom est obligatoire.", true);
        return;
      }

      if (!Validators.required(data.email)) {
        ProfileFormView.setMessage("L'email est obligatoire.", true);
        return;
      }

      if (!Validators.required(data.projects)) {
        ProfileFormView.setMessage("Les projets réalisés sont obligatoires.", true);
        return;
      }

      const profile = createProfile(data);
      ProfileRepository.upsert(profile);
      ProfileFormView.setMessage("Profil enregistré avec succès.");
    });

    const params = new URLSearchParams(window.location.search);
    const editId = params.get("id");
    if (editId) {
      const existing = ProfileRepository.findById(editId);
      if (existing) {
        ProfileFormView.fillForm(existing);
      }
    }
  }

  return {
    init,
  };
})();
