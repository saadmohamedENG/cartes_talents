const HomeController = (function () {
  function init() {
    const searchForm = document.getElementById("search-form");
    const inputName = document.getElementById("search-name");
    const inputSkill = document.getElementById("search-skill");
    const inputLanguage = document.getElementById("search-language");
    const inputVerified = document.getElementById("search-verified");
    const resetBtn = document.getElementById("search-reset");

    const listEl = document.getElementById("profiles-list");
    const cloudEl = document.getElementById("skills-cloud");
    const heroCountEl = document.getElementById("hero-count");

    if (!searchForm || !listEl || !cloudEl) return;

    function updateHeroCount() {
      if (!heroCountEl) return;
      const total = ProfileRepository.getAll().length;
      heroCountEl.textContent = total;
    }

    function applySearch() {
      const profiles = ProfileRepository.search({
        name: inputName.value,
        skill: inputSkill.value,
        language: inputLanguage.value,
        verifiedOnly: inputVerified.checked,
      });

      HomeView.renderProfiles(listEl, profiles);

      const cloudData = ProfileRepository.getSkillsCloudData();
      HomeView.renderSkillsCloud(cloudEl, cloudData);

      updateHeroCount();
    }

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applySearch();
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        inputName.value = "";
        inputSkill.value = "";
        inputLanguage.value = "";
        inputVerified.checked = false;
        

        clearElement(listEl);
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "muted";
        emptyMsg.textContent = "Utilise la recherche avancée pour afficher les profils.";
        listEl.appendChild(emptyMsg);
      });
    }


    updateHeroCount();
    const cloudData = ProfileRepository.getSkillsCloudData();
    HomeView.renderSkillsCloud(cloudEl, cloudData);

    clearElement(listEl);
    const initialMsg = document.createElement("p");
    initialMsg.className = "muted";
    initialMsg.textContent = "Utilise la recherche avancée pour afficher les profils.";
    listEl.appendChild(initialMsg);
  }

  return {
    init,
  };
})();
