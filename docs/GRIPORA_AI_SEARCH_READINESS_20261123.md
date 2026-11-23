# GRIPORA — AI search readiness and Business Hub preparation
**Audit date:** 2026-11-23  
**Scope:** GRIPORA existing Pakistan-based glove business and website; no live deployment, account claim, identity verification, advertising, or paid service.

## Evidence checked
- Public website: https://griporagloves.com/, /golf.html, /fullfinger.html, /fitness.html, /winter.html, /private-label-oem.html.
- GitHub main: `robots.txt`, homepage Organization/WebSite/WebPage JSON-LD and OEM Service JSON-LD.
- Google/web-search result observations are *indexability signals*, **not** evidence that ChatGPT independently recommends the company.
- OpenAI official crawler guidance: https://developers.openai.com/api/docs/bots
- Official OpenAI Businesses in ChatGPT launch: https://openai.com/index/introducing-businesses-chatgpt/
- Official Business Hub claim process: https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt
- Actual unauthenticated Business Hub landing: https://chatgpt.com/business-hub/

## Verified existing strengths
1. Public category/product pages resolve and appear in web search. Four categories: MTB/Cycling, Golf, Fitness/Training and Winter/Outdoor.
2. Sitemap lists **70 canonical URLs** (62 product models and 8 other canonical pages). This **does not mean Google has indexed all 70**.
3. `robots.txt` has `User-agent: *` with `Allow: /` and sitemap location. No observed `OAI-SearchBot` block. **A custom `llms.txt` is not an OpenAI Search requirement.**
4. Homepage Organization/WebSite/WebPage JSON-LD and OEM Service JSON-LD already contain GRIPORA name, domain, Sialkot/Pakistan, contact email and services.
5. Main buyer-focused pages describe OEM/private label, product categories, sampling and material/custom branding options. Development policy and OEM pages describe **indicative**, not unconditional, MOQ and lead times.
6. Official website footer links Instagram and Facebook; a preview-only JSON-LD improvement adds the same Facebook URL to Organization `sameAs`, with no design changes.

## Business Hub: claim vs Business Agent
- Business Hub is a legitimate official OpenAI feature. Its public landing page is accessible but clicking `Claim your business` requires signing in to ChatGPT; the actual GRIPORA search, claim availability and identity process were **not tested behind login**.
- OpenAI says eligible business claims are not categorically limited to the US; approval depends on location, type, listing and supported verification. **Business Agents are a separate, currently US-restricted capability** for eligible ecommerce/online-service firms.
- Do not claim a verified badge, approved business profile or eligibility before approval. Never ask for the user's ChatGPT password or Persona identity documents in chat. The authorized business owner should verify through the official secure flow.
- If owner sees the option, check whether GRIPORA already exists, whether 'add business' appears, and which verification methods are actually offered before submitting. Legal identity fields must exactly match existing official registration; public trade brand may be GRIPORA.
- Do not connect speculative product feeds: GRIPORA is quote-based OEM and generally has no fixed retail prices or live inventory.

## Accurate claim/profile copy for owner review (not submitted)
**Display name:** GRIPORA  
**Business category:** Custom sports glove manufacturer / OEM and private-label glove development (choose closest actual Business Hub category).  
**Location:** Sialkot, Punjab, Pakistan  
**Website:** https://griporagloves.com/  
**Email:** ibtesam@griporagloves.com  
**Description:** GRIPORA is a Sialkot-based custom glove manufacturing and private-label development business serving overseas brands, retailers and distributors. We develop golf, MTB and cycling, fitness and training, and winter and outdoor gloves. Buyers can discuss materials, palm construction, sizing, logos, labels, packaging and sample development before bulk production. Projects are quoted against their approved specifications.
**Social links:** https://www.instagram.com/gripora.gloves/ and https://www.facebook.com/profile.php?id=61593804143170

## Priority next actions
1. **Owner-only:** Sign in at https://chatgpt.com/business-hub/ and check Business Hub's actual GRIPORA listing/claim eligibility. Do not initiate claim from an unverified delegated account.
2. Review actual buyer searches (custom golf glove manufacturer, private-label MTB gloves, OEM fitness gloves, custom winter glove manufacturer) against public results over time. Do not assume one search constitutes an AI recommendation.
3. Measure Search Console organic queries, landing pages, and *verified* business mentions/website clicks if a Business Hub claim is later approved.
4. Add product-level details only when confirmed by GRIPORA's actual sourcing and production specifications. Avoid unverified certifications, own-factory claims, client names, universal MOQ, made-up retail pricing or capacity.
5. Only consider directory backlinks with authentic relevant categories and no paid/subscription requirements.

## Change management
- Current branch `ai-discovery-readiness-20261123` is preview-only. It makes a **one-field, nonvisual** schema change on `index.html` so both publicly linked social identities are represented. Never deploy by merging without checking site release consistency: existing GitHub `main` Pages workflow may resync the full V8.6.8 site upon push.
- Preserve the user's locked `GRIPORA-GOLD-MASTER-V8.6.7-LOCKED-20261116` and approved public design.
