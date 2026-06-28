function isExternal(href) {
  return /^https?:\/\//.test(href);
}

export function withRoot(path = "") {
  if (!path || path === ".") {
    return document.documentElement.dataset.root || "./";
  }

  if (isExternal(path)) {
    return path;
  }

  return `${document.documentElement.dataset.root || "./"}${path}`;
}

export function renderSiteHeader(navigation, activeKey) {
  const target = document.getElementById("site-header");
  if (!target) {
    return;
  }

  target.className = "site-header";
  target.innerHTML = `
    <div class="site-header-inner">
      <a class="brand" href="${withRoot("")}">
        <span class="brand-mark">xg</span>
        <span class="brand-copy">
          <strong>xingguangcuican</strong>
          <span>ABK · Android Security · System Engineering</span>
        </span>
      </a>
      <nav class="nav" aria-label="Primary">
        ${navigation.map((item) => `
          <a class="nav-link ${item.key === activeKey ? "is-active" : ""}" href="${withRoot(item.path)}">
            ${item.label}
          </a>
        `).join("")}
      </nav>
    </div>
  `;
}

export function renderSiteFooter(quote) {
  const target = document.getElementById("site-footer");
  if (!target) {
    return;
  }

  target.className = "footer";
  target.innerHTML = `
    <div class="footer-inner">
      <div>
        <strong>xingguangcuican</strong>
        <p class="muted">Minimal static site for selected public work and curated notes.</p>
      </div>
      <div class="footer-meta">
        <span>${quote}</span>
        <span id="footer-year"></span>
      </div>
    </div>
  `;

  const yearTarget = document.getElementById("footer-year");
  if (yearTarget) {
    yearTarget.textContent = `© ${new Date().getFullYear()}`;
  }
}

export function renderChipRow(targetId, values) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  target.innerHTML = values.map((value) => `<span class="chip">${value}</span>`).join("");
}

export function renderPlainList(targetId, values) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  target.innerHTML = values.map((value) => `<li>${value}</li>`).join("");
}

export function projectCardMarkup(project) {
  return `
    <article class="card project-card">
      <p class="category">${project.category}</p>
      <h3>${project.name}</h3>
      <p>${project.summaryZh}</p>
      <p class="muted">${project.summaryEn}</p>
      <div class="chip-row">
        ${project.badges.map((badge) => `<span class="doc-pill">${badge}</span>`).join("")}
      </div>
      <div class="card-footer">
        <a class="text-link" href="${project.repo}" target="_blank" rel="noreferrer">Open repository</a>
      </div>
    </article>
  `;
}

export function docCardMarkup(doc) {
  return `
    <article class="card docs-card">
      <p class="category">${doc.category}</p>
      <h3>${doc.title}</h3>
      <p>${doc.summaryZh}</p>
      <p class="muted">${doc.summaryEn}</p>
      <div class="chip-row">
        ${doc.tags.map((tag) => `<span class="doc-pill">${tag}</span>`).join("")}
      </div>
      <div class="card-footer">
        <a class="text-link" href="${withRoot(`docs/?slug=${doc.slug}`)}">Read note</a>
      </div>
    </article>
  `;
}

export function profileCardMarkup(profile) {
  const isLink = Boolean(profile.href);

  return `
    <article class="card profile-card ${isLink ? "" : "is-textonly"}">
      <p class="category">${profile.platform}</p>
      <h3>${profile.handle}</h3>
      <p>${profile.noteZh}</p>
      <p class="profile-note">${profile.noteEn}</p>
      <div class="profile-actions">
        ${isLink
          ? `<a class="text-link" href="${profile.href}" target="_blank" rel="noreferrer">Open profile</a>`
          : `<span class="muted">Direct URL pending</span>`}
      </div>
    </article>
  `;
}

export function renderCardGrid(targetId, items, markup) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  target.innerHTML = items.map(markup).join("");
}

export function repoChipMarkup(repo) {
  return `
    <a class="repo-chip" href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a>
  `;
}

export function docsCatalogEntryMarkup(doc, activeSlug) {
  return `
    <a class="docs-entry ${doc.slug === activeSlug ? "is-active" : ""}" href="?slug=${encodeURIComponent(doc.slug)}" data-slug="${doc.slug}">
      <p class="section-kicker">${doc.category}</p>
      <h3>${doc.title}</h3>
      <p>${doc.summaryZh}</p>
    </a>
  `;
}
