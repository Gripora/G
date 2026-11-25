#!/usr/bin/env python3
"""GRIPORA V8.6.8 technical SEO hygiene, link-target repairs and release gate.

Purpose: fix old cycling alias and avoid /mtb/development-policy.html detours.
Also validate every indexable sitemap URL, canonical, headings and JSON-LD.
No visual layouts, product copy, model names, pictures or pricing are changed.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import html
import json
import re
import sys
import xml.etree.ElementTree as ET

root=Path(sys.argv[1] if len(sys.argv)>1 else "_site")
site="https://griporagloves.com"
assert root.is_dir(), "Missing website output"

# 1. MTB product pages previously linked a robots-blocked legacy policy alias.
fixed=0
models=sorted((root/"mtb").glob("gmt-???.html"))
assert len(models)==18, f"Expected 18 MTB/cycling styles, found {len(models)}"
for page in models:
    src=page.read_text(encoding="utf8")
    before=src.count('href="development-policy.html"')
    corrected=src.replace('href="development-policy.html"', 'href="/development-policy.html"')
    assert 'href="development-policy.html"' not in corrected
    if before:
        page.write_text(corrected,encoding="utf8")
        fixed+=before

# 2. Old /cycling.html describes short-finger cycling, which now lives in
# /fullfinger.html#shortfinger. Avoid incorrectly sending these buyers to Golf.
alias=root/"cycling.html"
legacy=alias.read_text(encoding="utf8")
assert ('content="noindex,follow"' in legacy and
        'rel="canonical"' in legacy and
        "location.replace(" in legacy), "Unexpected legacy cycling alias"
if 'https://griporagloves.com/golf.html' in legacy:
    assert legacy.count('https://griporagloves.com/golf.html')==1
    assert legacy.count('url=golf.html')==1
    assert legacy.count("location.replace('golf.html')")==1
    assert legacy.count('href="golf.html"')==1
    legacy=legacy.replace('https://griporagloves.com/golf.html',
                          'https://griporagloves.com/fullfinger.html')
    legacy=legacy.replace('url=golf.html','url=fullfinger.html#shortfinger')
    legacy=legacy.replace('location.replace(\'golf.html\')',
                          'location.replace(\'fullfinger.html#shortfinger\')')
    legacy=legacy.replace('href="golf.html"', 'href="fullfinger.html#shortfinger"')
    legacy=legacy.replace('Golf Gloves | GRIPORA','Short-Finger Cycling Gloves | GRIPORA')
    legacy=legacy.replace('GRIPORA Golf Gloves','GRIPORA Short-Finger Cycling Gloves')
    alias.write_text(legacy,encoding="utf8")
assert ('https://griporagloves.com/fullfinger.html' in legacy and
        'url=fullfinger.html#shortfinger' in legacy and
        "location.replace('fullfinger.html#shortfinger')" in legacy)
assert 'id="shortfinger"' in (root/"fullfinger.html").read_text(encoding="utf8")

# 3. Set accurate modification date for four category pages with new SEO
# headings, technical markup, and buyer FAQs (Nov 18 release).
sitemap=root/"sitemap.xml"
xml=sitemap.read_text(encoding="utf8")
for name in ("fullfinger.html","fitness.html","winter.html","golf.html"):
    pattern=re.compile(r'(<loc>'+re.escape(site+"/"+name)+r'</loc>\s*<lastmod>)[^<]+(</lastmod>)')
    assert len(pattern.findall(xml))==1, f"Sitemap category not found: {name}"
    xml=pattern.sub(lambda m:m.group(1)+("2026-11-25" if name=="fullfinger.html" else "2026-11-18")+m.group(2),xml)
sitemap.write_text(xml,encoding="utf8")

class Tags(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.h1=0
        self.title=False
        self.description=False
        self.canonical=[]
        self.robots=[]
        self.links=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=="h1":self.h1+=1
        if tag=="title":self.title=True
        if tag=="meta" and a.get("name","").lower()=="description" and a.get("content","").strip():
            self.description=True
        if tag=="meta" and a.get("name","").lower()=="robots":self.robots.append(a.get("content",""))
        if tag=="link" and a.get("rel")=="canonical":self.canonical.append(a.get("href"))
        if tag=="a" and a.get("href"):self.links.append(a["href"])

parsed=ET.fromstring(xml)
ns="{http://www.sitemaps.org/schemas/sitemap/0.9}"
urls=[x.text for x in parsed.findall(".//"+ns+"loc")]
assert len(urls)==71 and len(set(urls))==71, "Sitemap must include 71 unique URLs"
product_count=0
titles={}
broken_html_links=set()
for url in urls:
    assert url.startswith(site+"/"), "External URL in sitemap: "+url
    rel=url[len(site)+1:] or "index.html"
    file=root/rel
    assert file.is_file(), "Missing sitemap page: "+rel
    markup=file.read_text(encoding="utf8")
    parsed_html=Tags();parsed_html.feed(markup)
    title_match=re.search(r'<title>(.*?)</title>',markup,re.I|re.S)
    assert (parsed_html.title and parsed_html.description and parsed_html.h1==1
            and len(parsed_html.canonical)==1), "Incomplete SEO markup: "+rel
    expected=site+"/" if rel=="index.html" else url
    assert parsed_html.canonical==[expected], "Canonical mismatch: "+rel
    assert not any("noindex" in r.lower() for r in parsed_html.robots), "noindex in sitemap: "+rel
    assert title_match and title_match.group(1).strip(), "Empty SEO title: "+rel
    title=html.unescape(re.sub(r"<[^>]*>","",title_match.group(1))).strip()
    titles.setdefault(title,[]).append(rel)
    for payload in re.findall(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',markup,re.I|re.S):
        json.loads(payload)
    for href in parsed_html.links:
        parts=urlsplit(href)
        if parts.scheme and parts.scheme not in ("https","http"):continue
        if parts.netloc and parts.netloc not in ("griporagloves.com","www.griporagloves.com"):continue
        dest=unquote(parts.path)
        if not dest or dest=="/" or not dest.endswith(".html"):continue
        if dest.startswith("/"):
            resolved=root/dest.lstrip("/")
        else:
            resolved=file.parent/dest
        if not resolved.is_file():
            broken_html_links.add((rel,href))
    if any(rel.startswith(a+"/") for a in ("mtb","fitness","winter","golf")):
        product_count+=1
        assert 'id="gripora-seo-20261117"' in markup, "Missing product schema: "+rel

assert product_count==63, f"Expected 63 product pages, found {product_count}"
duplicates={t:p for t,p in titles.items() if len(p)>1}
assert not duplicates, f"Duplicate SEO titles: {duplicates}"
assert not broken_html_links, "Broken internal HTML links: "+repr(sorted(broken_html_links)[:15])
home=(root/"index.html").read_text(encoding="utf8")
assert 'id="factory-carousel-reel"' in home and home.count("<figure>")>=12, "Factory gallery changed"
assert home.count('href="/custom-glove-development.html"')>=1, "Homepage must link directly to sample development page"
for category in ("fullfinger.html","fitness.html","winter.html","golf.html"):
    page=(root/category).read_text(encoding="utf8")
    assert page.count('id="gripora-category-faq"')==1
    assert page.count("<details>")==3
    assert page.count('id="gripora-category-breadcrumb-20261117"')==1
print(f"SEO_HYGIENE_PASS: 71 canonical sitemap pages, 63 product schemas, "
      f"12 category FAQs, 12+ gallery photos; {fixed} MTB policy links fixed; "
      "cycling alias routes to short-finger category")
