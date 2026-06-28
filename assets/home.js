import { siteData } from "../content/site-data.js";
import { docsManifest } from "../content/docs-manifest.js";
import {
  docCardMarkup,
  profileCardMarkup,
  projectCardMarkup,
  renderCardGrid,
  renderChipRow,
  renderPlainList,
  renderSiteFooter,
  renderSiteHeader,
} from "./site.js";

renderSiteHeader(siteData.navigation, "home");
renderSiteFooter(siteData.profile.quote);

renderChipRow("hero-tags", siteData.hero.tags);
renderPlainList("focus-list", siteData.focusList);
renderCardGrid("featured-projects", siteData.featuredProjects, projectCardMarkup);
renderCardGrid("docs-preview", docsManifest.slice(0, 3), docCardMarkup);
renderCardGrid("profile-links", siteData.profiles, profileCardMarkup);

const aboutCards = document.getElementById("about-cards");
if (aboutCards) {
  aboutCards.innerHTML = siteData.aboutCards.map((card) => `
    <article class="card">
      <p class="section-kicker">${card.kicker}</p>
      <h3>${card.title}</h3>
      <p>${card.copyZh}</p>
      <p class="muted">${card.copyEn}</p>
    </article>
  `).join("");
}
