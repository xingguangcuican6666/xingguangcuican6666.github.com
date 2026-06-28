import { siteData } from "../content/site-data.js";
import { renderSiteFooter, renderSiteHeader } from "./site.js";

renderSiteHeader(siteData.navigation, "");
renderSiteFooter(siteData.profile.quote);
