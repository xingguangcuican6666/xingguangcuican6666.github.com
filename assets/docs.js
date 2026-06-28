import { docsManifest } from "../content/docs-manifest.js";
import { siteData } from "../content/site-data.js";
import {
  docsCatalogEntryMarkup,
  renderPlainList,
  renderSiteFooter,
  renderSiteHeader,
} from "./site.js";

renderSiteHeader(siteData.navigation, "docs");
renderSiteFooter(siteData.profile.quote);
renderPlainList("docs-guide", siteData.docsGuide);

const catalog = document.getElementById("docs-catalog");
const title = document.getElementById("doc-title");
const summary = document.getElementById("doc-summary");
const tags = document.getElementById("doc-tags");
const content = document.getElementById("doc-content");
const kicker = document.getElementById("doc-kicker");
const related = document.getElementById("doc-related");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderInline(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="text-link" href="$2" target="_blank" rel="noreferrer">$1</a>');
  return html;
}

function renderMarkdown(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(`<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`);
      continue;
    }

    if (/^- /.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^- /.test(lines[index].trim())) {
        items.push(`<li>${renderInline(lines[index].trim().slice(2))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(`<li>${renderInline(lines[index].trim().replace(/^\d+\.\s/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const paragraphLines = [trimmed];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || /^(#{1,3})\s+/.test(next) || next.startsWith("> ") || next.startsWith("```") || /^- /.test(next) || /^\d+\.\s/.test(next)) {
        break;
      }
      paragraphLines.push(next);
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraphLines.join(" "))}</p>`);
  }

  return blocks.join("");
}

function currentSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || docsManifest[0].slug;
}

function updateCatalog(activeSlug) {
  if (!catalog) {
    return;
  }

  catalog.innerHTML = docsManifest.map((doc) => docsCatalogEntryMarkup(doc, activeSlug)).join("");
  catalog.querySelectorAll("[data-slug]").forEach((entry) => {
    entry.addEventListener("click", (event) => {
      event.preventDefault();
      const slug = entry.getAttribute("data-slug");
      if (!slug) {
        return;
      }
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("slug", slug);
      window.history.pushState({}, "", nextUrl);
      loadDocument(slug);
    });
  });
}

async function loadDocument(slug) {
  const doc = docsManifest.find((item) => item.slug === slug) || docsManifest[0];
  updateCatalog(doc.slug);

  if (title) {
    title.textContent = doc.title;
  }
  if (summary) {
    summary.textContent = doc.summaryZh;
  }
  if (kicker) {
    kicker.textContent = doc.category;
  }
  if (tags) {
    tags.innerHTML = doc.tags.map((tag) => `<span class="doc-pill">${tag}</span>`).join("");
  }
  if (related) {
    related.innerHTML = doc.relatedRepo
      ? `Related repository: <a class="text-link" href="${doc.relatedRepo}" target="_blank" rel="noreferrer">${doc.relatedName}</a>`
      : "";
  }
  if (content) {
    content.innerHTML = `<p class="muted">Loading document...</p>`;
  }

  try {
    const url = new URL(`../${doc.file}`, import.meta.url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${doc.file}`);
    }

    const markdown = await response.text();
    if (content) {
      content.innerHTML = renderMarkdown(markdown);
    }
  } catch (error) {
    if (content) {
      content.innerHTML = `
        <p class="muted">Unable to load this note right now.</p>
        <p class="muted">${error.message}</p>
      `;
    }
  }
}

window.addEventListener("popstate", () => {
  loadDocument(currentSlug());
});

loadDocument(currentSlug());
