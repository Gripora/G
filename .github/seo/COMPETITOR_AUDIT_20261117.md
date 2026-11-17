# GRIPORA — Competitor SEO Audit (16 B2B glove suppliers)

**Research date:** 17 November 2026. **Objective:** attract overseas OEM/private-label glove enquiries, not Pakistan retail. **Scope:** public search-visible landing-page content and GRIPORA's own GitHub HTML/build code. This is a *competitor content and information-architecture review*, not an organic rank/traffic audit. Search positions, keyword difficulty, Core Web Vitals and third-party backend behaviour were **not independently measured**. Search may vary by country/device.

## Competitor shortlist and observed strategy

| # | Supplier | Category / public URL | Verifiable B2B / SEO strategy |
|---:|---|---|---|
| 1 | QST Gloves | [Sports gloves](https://qstgloves.com/sports-gloves/) / [OEM private label](https://qstgloves.com/oem-private-label-gloves/) | Categorized golf/full-finger cycling products; focused OEM page and request-quote contact |
| 2 | Bays Sports | [Golf](https://www.bayssports.com/golf-gloves) / [Gym](https://www.bayssports.com/gym-gloves) | Separate custom-golf and gym glove manufacturer search-intent pages; contact route |
| 3 | Nexora Gear | [Cycling](https://nexoragear.com/cycling-gloves/) / [Private label](https://nexoragear.com/private-label/) | Explicit cycling manufacturer headline; OEM/ODM comparison and brief-based enquiry |
| 4 | The Gloves Factory | [USA golf](https://us.theglovesfactory.com/) | Dedicated USA B2B golf buyer page with materials, quantities, customization, FAQ and quotation form |
| 5 | Texpak | [OEM golf](https://ecotexpak.com/oem/) / [Inquiry](https://ecotexpak.com/inquiry-information/) | Golf-only material, samples and buyer-brief guidance; product-detail pages plus buyer resources |
| 6 | Maxido Golf | [Homepage](https://www.maxidogolf.com/index.html) | Cabretta and synthetic golf glove material focus; manufacturer positioning |
| 7 | DEL | [Golf gloves](https://del.com.pk/golf-gloves.html) | Golf manufacturer/wholesale title, specific models and material variations, per-style enquiry |
| 8 | Caprio Sports | [Gym gloves](https://www.capriosports.com/lifting-gear/gym-gloves-and-grips) / [Sample](https://www.capriosports.com/request-a-sample) | Separate wrist-wrap, half-finger, full-finger and women's glove pages; sample-request route |
| 9 | ZipaSports | [Gym glove](https://zipasports.com/fitnesswear/gym-accessories/gloves/) | Phrase-rich gym glove landing page, buyer types, indicative order thresholds and mockup proposition |
| 10 | Solehre | [Cycling gloves](https://solehre.com/cycling-gloves-manufacturer/) | Cycling OEM/ODM manufacturer page, dedicated OEM services, catalogue |
| 11 | Beera Sports | [Cycling gloves](https://www.beera-ent.com/gloves/cycling-gloves/) | Custom cycling gloves by category, material and export-oriented descriptions |
| 12 | Uswa Sports | [Cycling gloves](https://www.uswasports.com/products/sports-fitness-gloves/cycling-gloves) | Wholesale/private-label cycling focused page, structured sourcing and enquiry route |
| 13 | VORLAN | [Winter gloves](https://vorlan-gloves.com/products/winter-gloves) | Winter category with OEM/private-label and spec/quality explanations |
| 14 | Mi-Gloves | [Custom winter](https://mi-gloves.com/custom-winter-gloves/) | Custom thermal/winter glove category plus deeper material subtopic pages |
| 15 | Blend Sports | [Snowboard glove/mittens](https://blendsports.com/solutions/snowboard-gloves-mittens-manufacturer/) | Niche winter-use pages, sample specs, manufacturing implications and enquiry route |
| 16 | Fabletic Sports | [Winter gloves](https://fableticsport.com/winter-gloves/) | Winter glove manufacturer page, OEM positioning and direct contact |

**Important distinction:** This table documents claims visibly stated on competitor websites, not independently verified promises (e.g., MOQs, lead times, certificates, country shipping or material grade). Do not import competitor-specific promises into GRIPORA copy.

## GRIPORA baseline independently checked in repository

- Six primary B2B landing pages have individual SEO titles, descriptions, OG metadata and verified canonical URL. Home also has organization-oriented JSON-LD, OEM and custom-development pages have Service JSON-LD.
- Four categories: golf 11 styles, MTB/cycling 17, fitness 12, winter 22. The 62 model pages have unique titles/descriptions, Product + Breadcrumb structured data and canonical links. Sitemap contains 70 URLs; submitted successfully to Search Console separately. **Indexed pages are not the same as sitemap URLs.**
- Existing landing pages: detailed product ranges, visible manufacturing descriptions and category-specific email enquiry CTA. Existing on-site MOQ/lead-time descriptions must be honored; don't generalize conditions from buyer quotations.
- **SEO gap:** Four category collection H2 labels were broad/generic (e.g. `GOLF GLOVE RANGE.`) while competition repeatedly uses clear custom/manufacturer terms in prominent headings. Category HTML had visible breadcrumbs but no breadcrumb JSON-LD.
- **Conversion/content opportunities:** Dedicated B2B buyer FAQs, truthful category-specific material comparison guides, more explicit quote-brief fields, and optional buyer-friendly enquiry form *could* improve clarity. These require careful content confirmation and/or a verified backend. Avoid adding unverified pricing, materials, performance standards or delivery promises.
- **Approved design constraint:** Preserve existing hero H1, layouts, images, factory gallery, product names/listings and navigation. Do not add intrusive SEO sections or copied competitor prose.

## Priority decisions and implementation

| Priority | Finding | Decision | Current status |
|---|---|---|---|
| P1 | Specific buyer-intent search terms in titles/descriptions/intros | Keep B2B language from user's 2025–2026 Keyword Planner exports; avoid retail stuffing | Implemented in `.github/scripts/seo-buyer-intent.py`; live deployment must be verified |
| P1 | Generic collection H2 headings | Replace **only four category collection H2s** with `CUSTOM GOLF GLOVES.`, `CUSTOM WINTER GLOVES.`, `CUSTOM GYM GLOVES.`, `CUSTOM MTB & CYCLING GLOVES.`; do not alter hero styling | Build script updated; live deployment must be verified |
| P1 | Missing category breadcrumb structured data | Add factual `BreadcrumbList` JSON-LD using existing canonical and visible Home/category navigation | Build script updated; live deployment must be verified |
| P2 | Buyer-specific product specifications and material education | Existing model pages provide important details; evaluate gaps page-by-page with genuine specs | Defer to Point 4 content optimization |
| P2 | Country landing pages | Do not create thin or misleading country doorway pages; GRIPORA serves overseas buyers from Pakistan | No change |
| P2 | Form/quote brief | Existing category mailto CTAs work without backend; only add forms with an authenticated reliable submission destination | Deferred; no fake form |
| P3 | Backlinks/competitor traffic | Search snippets don't verify backlinks, domain authority or monthly organic traffic | Future Point 5 backlink/authority review, using reliable data |

## Verification requirements

- Run GitHub Pages workflow and pass Python SEO script assertions, mobile/tablet/desktop UI smoke QA, image presence, 12-image factory-gallery check, 62 product pages, 70 sitemap URLs, and canonical checks.
- After successful deployment, inspect representative live category page HTML for updated H2 and valid BreadcrumbList JSON-LD. If not verified, report **committed / deploy pending** rather than completed.
- Search Console index metrics and organic clicks can only be evaluated after Google refreshes; no immediate ranking/indexing guarantee.

## Search guidance

Official Google guidance: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Title Links](https://developers.google.com/search/docs/appearance/title-link), [Link Best Practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
