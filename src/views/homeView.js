const HomeView = (function () {
  function renderProfiles(container, profiles) {
    clearElement(container);
    if (!profiles.length) {
      const empty = document.createElement("p");
      empty.textContent = "Aucun profil ne correspond à la recherche.";
      empty.className = "muted";
      container.appendChild(empty);
      return;
    }

    profiles.forEach((p) => {
      const card = document.createElement("article");
      card.className = "profile-card";

      const header = document.createElement("div");
      header.className = "profile-card-header";

      const left = document.createElement("div");
      const nameEl = document.createElement("div");
      nameEl.className = "profile-name";
      nameEl.textContent = p.name;

      const roleEl = document.createElement("div");
      roleEl.className = "profile-role";
      roleEl.textContent = p.role || "Profil talent";

      left.appendChild(nameEl);
      left.appendChild(roleEl);

      header.appendChild(left);

      if (p.verified) {
        const badge = document.createElement("span");
        badge.className = "badge-verified";
        badge.textContent = "Talent Verified";
        header.appendChild(badge);
      }

      card.appendChild(header);

      // Email pour collaboration
      if (p.email) {
        const emailRow = document.createElement("div");
        emailRow.style.marginTop = "0.5rem";
        emailRow.style.marginBottom = "0.5rem";
        const emailLabel = document.createElement("strong");
        emailLabel.textContent = "📧 Contact : ";
        emailLabel.style.fontSize = "0.8rem";
        emailLabel.style.color = "var(--text-muted)";
        const emailLink = document.createElement("a");
        emailLink.href = `mailto:${p.email}`;
        emailLink.textContent = p.email;
        emailLink.style.fontSize = "0.8rem";
        emailLink.style.color = "var(--accent)";
        emailRow.appendChild(emailLabel);
        emailRow.appendChild(emailLink);
        card.appendChild(emailRow);
      }

      // Compétences
      const skillsRow = document.createElement("div");
      skillsRow.style.marginTop = "0.5rem";
      (p.skills || []).forEach((s) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = s;
        skillsRow.appendChild(tag);
      });
      card.appendChild(skillsRow);

      // Langues
      const langsRow = document.createElement("div");
      (p.languages || []).forEach((l) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = l;
        langsRow.appendChild(tag);
      });
      card.appendChild(langsRow);

      // Projets réalisés
      if (p.projects) {
        const projectsSection = document.createElement("div");
        projectsSection.style.marginTop = "0.8rem";
        projectsSection.style.padding = "0.8rem";
        projectsSection.style.background = "rgba(99, 102, 241, 0.05)";
        projectsSection.style.borderRadius = "8px";
        projectsSection.style.border = "1px solid rgba(99, 102, 241, 0.15)";

        const projectsLabel = document.createElement("strong");
        projectsLabel.textContent = "Projets réalisés :";
        projectsLabel.style.display = "block";
        projectsLabel.style.marginBottom = "0.4rem";
        projectsLabel.style.fontSize = "0.85rem";
        projectsLabel.style.color = "var(--text-color)";

        const projectsText = document.createElement("p");
        projectsText.textContent = p.projects;
        projectsText.style.margin = "0";
        projectsText.style.fontSize = "0.85rem";
        projectsText.style.lineHeight = "1.5";
        projectsText.style.color = "var(--text-muted)";

        projectsSection.appendChild(projectsLabel);
        projectsSection.appendChild(projectsText);
        card.appendChild(projectsSection);
      }

      container.appendChild(card);
    });
  }

  function renderSkillsCloud(container, cloudData) {
    clearElement(container);
    if (!cloudData.length) {
      const p = document.createElement("p");
      p.textContent = "Aucune compétence enregistrée pour le moment.";
      p.className = "muted";
      container.appendChild(p);
      return;
    }

    const counts = cloudData.map((c) => c.count);
    const min = Math.min(...counts);
    const max = Math.max(...counts);

    cloudData.forEach((item) => {
      const span = document.createElement("span");
      span.className = "tag";

      const ratio = max === min ? 1 : (item.count - min) / (max - min);
      const size = 0.8 + ratio * 0.8;

      span.style.fontSize = `${size}rem`;
      span.textContent = `${item.label} (${item.count})`;
      container.appendChild(span);
    });
  }

  return {
    renderProfiles,
    renderSkillsCloud,
  };
})();
