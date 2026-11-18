# GRIPORA — Search Performance & SEO Action Baseline
**Prepared:** 18 November 2026 (Pakistan). **Source:** GRIPORA's connected Google Search Console Search Analytics and Sitemaps via Windsor.ai, plus the user-supplied Search Console Links screenshots. This is an evidence snapshot, not a ranking forecast.

## 1. Property-level search baseline (daily aggregate, not query-filtered)
Period: 1 September – **16 November 2026**, latest available row in connected dataset. **141 impressions, 11 Google Search clicks** across 77 date rows with data.

| Period | Impressions | Clicks |
| --- | ---: | ---: |
| September 2026 | 62 | 7 |
| October 2026 | 47 | 3 |
| November 1–16, 2026 (partial month) | 32 | 1 |
| **Total available** | **141** | **11** |

These are very small sample sizes; do not extrapolate a ranking trend or predict monthly sales. Query-level dimensions **omit anonymized/private queries** and may be limited. The older 65-impression/2-click query-level export is **not the website total**.

## 2. Search visibility by country (same 1 Sep – 16 Nov range)

| Market | Impressions | Clicks |
| --- | ---: | ---: |
| United States | 35 | 1 |
| Canada | 12 | 3 |
| Germany | 8 | 1 |
| France | 7 | 1 |
| United Kingdom | 3 | 1 |
| Australia | 0 recorded | 0 |
| Pakistan | 22 | 3 |
| India | 24 | 0 |
| Other markets | Remainder | Remainder |

The priority export-market group (US, Canada, UK, Germany, France, Australia) had **65 impressions, 7 clicks** in this period. Country alone does not prove qualified B2B buyer intent.

## 3. Search-result pages (page-dimension diagnostic; don't add impressions to daily total)

- Home `/`: 87 page-level impressions / 8 clicks.
- `/fitness.html`: 61 / 1.
- Legacy `/cycling.html`: 22 / 0 — important because category now consolidated and GitHub contains a corrected `noindex` redirect to `/fullfinger.html#shortfinger`; **live deployment/Google recrawl has not been independently verified**.
- `/winter.html`: 14 / 0.
- `/fullfinger.html`: 12 / 0.
- `/private-label-oem.html`: 9 / 1.
- `/custom-glove-development.html`: 4 / 1.

Page-dimension URL-level impression counts can exceed property-level daily total because one search can generate multiple page impressions, URL variants, or differently grouped metrics. Do not sum the page column and call it total website traffic. Golf has no row in this page performance extract; this does **not** prove it is unindexed.

## 4. Crawl and sitemap baseline
- Search Console sitemap: `https://griporagloves.com/sitemap.xml`.
- **70 URLs submitted; 0 sitemap errors; 0 warnings** as last confirmed.
- Google last downloaded the sitemap on **17 November 2026**.
- 62 product URLs across MTB (17), fitness (12), winter (22), golf (11). All have a category-page link and product-specific SEO title/canonical/schema markers in GitHub main at audit time.
- Recent source commits correct `/cycling.html` redirect, update four category lastmod dates, add homepage link to sample development, and add `.github/scripts/seo-technical-hygiene.py` to the Pages workflow.
- **Important deployment caveat:** Source commits are verified; full Github Pages workflow success and independently fetched live HTML for those changes remain **unconfirmed** in the available tools. Do not mark technical fixes live until confirmed.

## 5. Backlink status and eligibility
- User screenshot 17 Nov: Search Console Links reported **0 external links** (GSC coverage is not an exhaustive internet-wide backlink index).
- Find Golf Suppliers listing submission **#12 awaiting review**, no verified live URL.
- go4WorldBusiness: **REJECTED / PERMANENTLY SKIP** while provider restricts Pakistan accounts; official support reply shared by user on 18 Nov.
- Kompass: no suitable confirmed free Pakistan signup; hold, do not use false-country accounts.
- SialkotMade: new Starter supplier listing **paid USD 19.99 first year**, so skip per no-paid-links policy; free claiming an existing listing is different.
- PSGMEA: actual membership required, GRIPORA not confirmed as a member; hold.
- TDAP Pakistan Exporters Directory: official eligibility enquiry submitted, awaiting reply. No verified directory backlink.

## 6. Action sequence (organic, ethical, measurable)
1. **Verify GitHub Pages release** actually publishes latest source changes and passes SEO + responsive checks; fix failures without redesign.
2. **Check Golf and product indexing** via Search Console Page indexing and URL Inspection; prioritise `/golf.html`, `/fullfinger.html`, `/fitness.html`, `/winter.html`, `/private-label-oem.html`; never claim that 70 submitted means 70 indexed.
3. **Measure non-branded buyer-intent queries** (e.g. custom golf glove manufacturer, OEM cycling gloves manufacturer, private-label training gloves, custom winter gloves) in export markets without keyword stuffing or inventing search volumes.
4. Confirm live links and buyer referrals for legitimately published association/directories; no paid backlink bundles or geographically inaccurate registrations.
5. Reassess performance against this same baseline when new Search Console data is available; Google indexing and rank changes may be delayed.

**Google references:** https://developers.google.com/search/docs/essentials/spam-policies and https://developers.google.com/search/blog/2022/10/performance-data-deep-dive .
