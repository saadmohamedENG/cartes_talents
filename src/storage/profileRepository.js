const PROFILE_KEY = "talentProfiles";

const ProfileRepository = (function () {
  function getAll() {
    const profiles = LocalStorageService.get(PROFILE_KEY, []);
    return Array.isArray(profiles) ? profiles : [];
  }

  function saveAll(list) {
    LocalStorageService.set(PROFILE_KEY, list);
  }

  function upsert(profile) {
    const list = getAll();
    const index = list.findIndex((p) => p.id === profile.id);
    if (index === -1) {
      list.push(profile);
    } else {
      list[index] = profile;
    }
    saveAll(list);
    return profile;
  }

  function findById(id) {
    return getAll().find((p) => p.id === id) || null;
  }

  function toggleVerified(id) {
    const list = getAll();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;
    list[index].verified = !list[index].verified;
    saveAll(list);
    return list[index];
  }

  function search({ name, skill, language, verifiedOnly }) {
    const list = getAll();
    

    const nameQ = (name || "").toLowerCase().trim();
    const skillQ = (skill || "").toLowerCase().trim();
    const langQ = (language || "").toLowerCase().trim();

    return list.filter((p) => {
      if (verifiedOnly && !p.verified) return false;

      if (!nameQ && !skillQ && !langQ) {
        return true;
      }


      let matchName = true;
      if (nameQ) {
        const searchInName = (p.name || "").toLowerCase().includes(nameQ);
        const searchInRole = (p.role || "").toLowerCase().includes(nameQ);
        const searchInProjects = (p.projects || "").toLowerCase().includes(nameQ);
        const searchInPassions = (p.passions || "").toLowerCase().includes(nameQ);
        const searchInEmail = (p.email || "").toLowerCase().includes(nameQ);
        
        matchName = searchInName || searchInRole || searchInProjects || searchInPassions || searchInEmail;
      }


      let matchSkill = true;
      if (skillQ) {
        matchSkill = (p.skills || []).some((s) => 
          s.toLowerCase().includes(skillQ)
        );
      }


      let matchLang = true;
      if (langQ) {
        matchLang = (p.languages || []).some((l) => 
          l.toLowerCase().includes(langQ)
        );
      }


      return matchName && matchSkill && matchLang;
    });
  }

  function getSkillsCloudData() {
    const map = new Map();
    getAll().forEach((p) => {
      (p.skills || []).forEach((skill) => {
        const key = skill.trim();
        if (!key) return;
        map.set(key, (map.get(key) || 0) + 1);
      });
    });
    return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
  }

  return {
    getAll,
    upsert,
    findById,
    toggleVerified,
    search,
    getSkillsCloudData,
  };
})();
