#!/usr/bin/env python3
"""GRIPORA SEO head-only enhancement. No layout, photos or visible copy changed."""
from pathlib import Path
import re, html, json, sys

root=Path(sys.argv[1] if len(sys.argv)>1 else "_site")
site="https://griporagloves.com"
categories={
    "mtb":("Custom MTB Gloves","MTB & Cycling Gloves","fullfinger.html","gmt-???.html"),
    "fitness":("Custom Fitness Gloves","Training & Fitness Gloves","fitness.html","gft-???.html"),
    "winter":("Custom Winter Gloves","Winter & Outdoor Gloves","winter.html","gwo-???.html"),
    "golf":("Custom Golf Gloves","Golf Gloves","golf.html","ggf-???.html"),
}
def value(doc,key,kind="name"):
    m=re.search(r'<meta '+kind+'="'+re.escape(key)+r'" content="([^"]*)"',doc,re.I)
    if not m: raise ValueError("Missing "+key)
    return html.unescape(m.group(1))
def meta(doc,key,new,kind="name"):
    p=re.compile(r'(<meta '+kind+'="'+re.escape(key)+r'" content=")[^"]*(")',re.I)
    if not p.search(doc): raise ValueError("Missing "+key)
    return p.sub(lambda m:m.group(1)+html.escape(new,quote=True)+m.group(2),doc,count=1)
def title(doc,new):
    p=re.compile(r'<title>[\s\S]*?</title>',re.I)
    if not p.search(doc):raise ValueError("No HTML title")
    return p.sub(lambda m:"<title>"+html.escape(new)+"</title>",doc,count=1)
def save(path,doc):
    original=path.read_text(encoding="utf8")
    if doc!=original:path.write_text(doc,encoding="utf8")
def crumbs(items):
    return {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":i,"name":label,"item":url} for i,(label,url) in enumerate(items,1)]}

home=root/"index.html"
h=home.read_text(encoding="utf8")
t="Custom Glove Manufacturer in Pakistan | GRIPORA"
d="GRIPORA manufactures custom MTB, cycling, golf, fitness and winter gloves in Sialkot, Pakistan. Private-label sampling and export production for overseas brands."
h=title(h,t);h=meta(h,"description",d);h=meta(h,"og:title",t,"property");h=meta(h,"og:description",d,"property")
save(home,h)

cat=root/"fullfinger.html"
h=cat.read_text(encoding="utf8")
t="Custom MTB & Cycling Gloves Manufacturer | GRIPORA"
h=title(h,t);h=meta(h,"og:title",t,"property");save(cat,h)

count=0
for dirname,(prefix,category,parent,pattern) in categories.items():
    for file in sorted((root/dirname).glob(pattern)):
        h=file.read_text(encoding="utf8")
        hm=re.search(r'<h1\b[^>]*>(.*?)</h1>',h,re.I|re.S)
        if not hm:raise ValueError("Missing H1 "+str(file))
        full=html.unescape(re.sub(r'<[^>]*>','',hm.group(1))).strip()
        if not full.startswith("GRIPORA "):raise ValueError("Unexpected model "+str(file))
        name=full[len("GRIPORA "):]
        desc=value(h,"description")
        clean=re.sub(r'\bdirection\b','design',desc,flags=re.I).strip().rstrip(".")
        # Preserve complete technical phrases; do not truncate mid-feature.
        suffix="OEM manufacturing in Sialkot, Pakistan."
        newdesc=prefix+": "+clean+". "+suffix
        newtitle=name+" "+prefix+" | GRIPORA"
        url=site+"/"+dirname+"/"+file.name
        canonical=re.search(r'<link rel="canonical" href="([^"]+)"',h)
        if not canonical or canonical.group(1)!=url:raise ValueError("Canonical mismatch "+str(file))
        photo=value(h,"og:image","property")
        if not photo.startswith(site+"/"):raise ValueError("Unverified image "+str(file))
        schema={"@context":"https://schema.org","@graph":[
           {"@type":"Product","name":full,"description":desc,"sku":file.stem.upper(),"image":[photo],"url":url,
            "brand":{"@type":"Brand","name":"GRIPORA"},"manufacturer":{"@type":"Organization","name":"GRIPORA","url":site+"/"},"category":category},
           crumbs([("Home",site+"/"),(category,site+"/"+parent),(full,url)])]}
        h=title(h,newtitle)
        h=meta(h,"description",newdesc)
        h=meta(h,"og:title",newtitle,"property")
        h=meta(h,"og:description",newdesc,"property")
        if 'id="gripora-seo-20261117"' not in h:
            payload=json.dumps(schema,ensure_ascii=True,separators=(",",":"))
            if h.count("</head>")!=1:raise ValueError("Missing unique head "+str(file))
            h=h.replace("</head>",'<script id="gripora-seo-20261117" type="application/ld+json">'+payload+'</script></head>',1)
        save(file,h)
        count+=1
assert count==62, f"Expected 62 product pages, got {count}"
assert 'id="factory-carousel-reel"' in home.read_text(encoding="utf8")
assert (root/"sitemap.xml").read_text(encoding="utf8").count("<loc>")==70
print("GRIPORA SEO PASS: 1 homepage, 1 category, 62 product pages; original gallery/layout preserved")
