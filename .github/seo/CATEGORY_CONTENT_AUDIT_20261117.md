# GRIPORA — Point 4 Category Content Optimization

**Date:** 17 November 2026  
**Pages:** `/golf.html`, `/winter.html`, `/fullfinger.html`, `/fitness.html`  
**Audience:** Overseas golf, cycling/MTB, gym and winter glove brands, importers, distributors and private-label buyers.

## Source of truth

Reviewed the existing seven GRIPORA main landing pages and especially the site's published `development-policy.html`, `private-label-oem.html`, and `custom-glove-development.html`. These explain the spec-to-sample-to-production process, material selection, customization, sample and quantity dependence, and export enquiry requirements. Do not invent fixed timelines, universal MOQ or product certifications.

## Current GRIPORA category content

- Golf: eleven product styles, ventilated constructions, palm and print options, custom branding and existing sample-development email CTAs.
- MTB/cycling: thirteen full-finger MTB plus four short-finger cycling models, performance-focused material/palm details, custom artwork and development CTA.
- Fitness: twelve catalogue model pages, palm grip/padding, breathable textiles and wrist support options.
- Winter: twenty-two models, thermal linings, technical fabrics, reinforced palms and outdoor/mitten construction direction.
- All four already had distinct category titles/descriptions, canonical URLs, product links and related category navigation. Avoid duplicate text or unrelated broad retail claims.

## Changes committed

| Page | Buyer questions added | Internal link |
|---|---|---|
| Golf | Custom logo/branding; bulk orders after approved sample; required golf quote details | /development-policy.html |
| Winter | Winter gloves and mittens; variable MOQ; winter sampling brief | /development-policy.html |
| MTB/cycling | Full-finger versus short-finger; customizable construction; starting OEM project | /development-policy.html |
| Fitness | Palm/wrist options; private-label programmes; sampling requirements | /development-policy.html |

Implemented as four lightweight HTML sections with three native accessible `<details><summary>…</summary>…</details>` items each, immediately before the pages' existing final enquiry CTAs. A small scoped CSS block preserves the site's white/black layout, improves mobile fit, and does not change existing hero, images, gallery, cards, models or navigation. No FAQPage structured data or FAQ-rich-result promise. Google has limited and then discontinued FAQ-rich-result search treatment for general commercial sites; this content is for real buyers and crawlable on-page relevance.

The script `.github/scripts/seo-buyer-intent.py` creates the blocks during GitHub Pages build and is idempotent; `.github/workflows/pages.yml` checks all 12 FAQs, their CSS, policy links, the category H2s, breadcrumbs, gallery photo counts and responsive tests.

## Further optimization (deferred responsibly)

- Add a verified specification glossary or detailed material comparison only when GRIPORA confirms which materials are available and under which order conditions.
- Avoid country-specific doorway pages that repeat the same generic text, invented international warehouses or fake case studies.
- A customized multi-field enquiry form would need a verified delivery destination and spam/privacy protections; current mailto buttons remain usable. No fake form created.
- Add product photography alt text only when visual identity is verified; current model pages already have specific alt text. No photo replacements.

## Completion gates

1. Repository script and workflow code committed — **done**.
2. Pre-deployment source checks (4 known insertion anchors, zero previously injected FAQ blocks, existing category text and 7 landing pages metadata) — **done**.
3. GitHub Actions build and mobile/desktop smoke test completed successfully after latest code commit — **not yet independently confirmed**.
4. Deployed public category URLs display the FAQ blocks and structured breadcrumb data — **not yet independently confirmed**.
5. Organic Google search outcomes require later Search Console measurement; cannot guarantee rankings/indexing.

Official reference: https://developers.google.com/search/docs/fundamentals/creating-helpful-content and https://developers.google.com/search/updates.
