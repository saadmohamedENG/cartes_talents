const ProfileFormView = (function () {
  function getFormElements() {
    return {
      form: document.getElementById("profile-form"),
      id: document.getElementById("profile-id"),
      name: document.getElementById("profile-name"),
      email: document.getElementById("profile-email"),
      role: document.getElementById("profile-role"),
      skills: document.getElementById("profile-skills"),
      languages: document.getElementById("profile-languages"),
      projects: document.getElementById("profile-projects"),
      passions: document.getElementById("profile-passions"),
      message: document.getElementById("profile-message"),
    };
  }

  function readForm() {
    const els = getFormElements();
    return {
      id: els.id.value || undefined,
      name: els.name.value,
      email: els.email.value,
      role: els.role.value,
      skills: els.skills.value.split(","),
      languages: els.languages.value.split(","),
      projects: els.projects.value,
      passions: els.passions.value,
    };
  }

  function fillForm(profile) {
    const els = getFormElements();
    els.id.value = profile.id;
    els.name.value = profile.name;
    els.email.value = profile.email || "";
    els.role.value = profile.role || "";
    els.skills.value = (profile.skills || []).join(", ");
    els.languages.value = (profile.languages || []).join(", ");
    els.projects.value = profile.projects || "";
    els.passions.value = profile.passions || "";
  }

  function setMessage(text, isError = false) {
    const { message } = getFormElements();
    message.textContent = text;
    message.style.color = isError ? "var(--danger)" : "var(--accent)";
  }

  return {
    getFormElements,
    readForm,
    fillForm,
    setMessage,
  };
})();
