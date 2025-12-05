const AdminView = (function () {
  function renderProfiles(container, profiles, onToggleVerified) {
    clearElement(container);
    if (!profiles.length) {
      const p = document.createElement("p");
      p.textContent = "Aucun profil enregistré pour le moment.";
      p.className = "muted";
      container.appendChild(p);
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

      const button = document.createElement("button");
      button.textContent = p.verified ? "Retirer le badge" : "Valider";
      button.className = p.verified ? "secondary" : "";
      button.addEventListener("click", () => onToggleVerified(p.id));

      header.appendChild(button);
      card.appendChild(header);

      // Email
      if (p.email) {
        const emailRow = document.createElement("div");
        emailRow.style.marginTop = "0.6rem";
        const emailLabel = document.createElement("strong");
        emailLabel.textContent = "📧 Email : ";
        emailLabel.style.fontSize = "0.85rem";
        emailLabel.style.color = "var(--text-muted)";
        const emailText = document.createElement("span");
        emailText.textContent = p.email;
        emailText.style.fontSize = "0.85rem";
        emailText.style.color = "var(--text-color)";
        emailRow.appendChild(emailLabel);
        emailRow.appendChild(emailText);
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

      // Projets réalisés (important pour l'évaluation)
      if (p.projects) {
        const projectsSection = document.createElement("div");
        projectsSection.style.marginTop = "0.8rem";
        projectsSection.style.padding = "0.8rem";
        projectsSection.style.background = "rgba(99, 102, 241, 0.05)";
        projectsSection.style.borderRadius = "8px";
        projectsSection.style.border = "1px solid rgba(99, 102, 241, 0.15)";

        const projectsLabel = document.createElement("strong");
        projectsLabel.textContent = "📂 Projets réalisés :";
        projectsLabel.style.display = "block";
        projectsLabel.style.marginBottom = "0.4rem";
        projectsLabel.style.fontSize = "0.85rem";
        projectsLabel.style.color = "var(--accent)";

        const projectsText = document.createElement("p");
        projectsText.textContent = p.projects;
        projectsText.style.margin = "0";
        projectsText.style.fontSize = "0.85rem";
        projectsText.style.lineHeight = "1.5";
        projectsText.style.color = "var(--text-color)";

        projectsSection.appendChild(projectsLabel);
        projectsSection.appendChild(projectsText);
        card.appendChild(projectsSection);
      }

      container.appendChild(card);
    });
  }

  return {
    renderProfiles,
  };
})();