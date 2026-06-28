import { siteData } from "../content/site-data.js";
import {
  projectCardMarkup,
  renderPlainList,
  renderSiteFooter,
  renderSiteHeader,
  repoChipMarkup,
} from "./site.js";

renderSiteHeader(siteData.navigation, "projects");
renderSiteFooter(siteData.profile.quote);
renderPlainList("project-rules", siteData.projectRules);

const groupsTarget = document.getElementById("project-groups");
if (groupsTarget) {
  groupsTarget.innerHTML = siteData.projectThemes.map((theme) => {
    const projects = siteData.featuredProjects.filter((project) => theme.projects.includes(project.name));

    return `
      <section class="project-group">
        <div class="section-heading">
          <div>
            <p class="section-kicker">${theme.kicker}</p>
            <h2>${theme.title}</h2>
          </div>
        </div>
        <div class="card project-theme">
          <p>${theme.summaryZh}</p>
          <p class="muted">${theme.summaryEn}</p>
        </div>
        <div class="card-grid">
          ${projects.map(projectCardMarkup).join("")}
        </div>
      </section>
    `;
  }).join("");
}

const repoCloud = document.getElementById("repo-cloud");
if (repoCloud) {
  repoCloud.innerHTML = siteData.repoHighlights.map(repoChipMarkup).join("");
}
