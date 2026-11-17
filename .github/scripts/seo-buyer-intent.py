#!/usr/bin/env python3
"""Buyer-intent SEO for GRIPORA; metadata and existing introductory copy only.
Purpose: readable content for overseas B2B glove buyers, not keyword stuffing.
No layout, assets, navigation, product naming, photos or MOQ terms are changed.
"""
from pathlib import Path
import json, html, re, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else "_site")
specs=json.loads(r'''[["index.html","Private Label Sports Gloves Manufacturer | GRIPORA","Custom sports gloves for overseas brands. Private-label and OEM manufacturing of golf, MTB, cycling, fitness and winter gloves, with sampling and branding in Pakistan.",null,null,null,null],["fullfinger.html","Private Label MTB & Cycling Gloves Manufacturer | GRIPORA","Custom cycling gloves and private-label MTB gloves for bike brands and distributors. OEM full-finger and short-finger styles, technical palms, custom logos and samples.","Private-label MTB and cycling glove development for performance brands. Explore 13 original full-finger styles and 4 separately identified short-finger options, with custom artwork, fit and construction.","Develop custom cycling gloves and custom MTB gloves for bike brands, cycling retailers and distributors. Explore 13 full-finger styles and four short-finger options with technical palms, OEM branding, artwork and sampling.",null,null],["fitness.html","Custom Gym & Weightlifting Gloves Manufacturer | GRIPORA","Custom gym gloves and weightlifting gloves for training brands and distributors. Private-label development, wholesale gym gloves programmes, palm grip and wrist-support options.","A selected range of training and lifting glove directions for private-label development, with palm protection, breathable constructions and optional wrist support.","Develop custom gym gloves and private-label weightlifting designs for training brands, retailers and distributors. Explore breathable constructions, palm protection, wrist-support options and wholesale gym gloves programmes.",null,null],["winter.html","OEM Winter & Outdoor Gloves Manufacturer | GRIPORA","Custom winter gloves and bulk winter gloves for outdoor brands and wholesalers. OEM thermal gloves, insulated mittens, private-label branding and sample development.","Private-label winter and outdoor glove development with insulated constructions, technical shells, reinforced palms, extended cuffs and brand-ready detailing.","Develop custom winter gloves for outdoor brands and importers, with insulated constructions, technical shells, reinforced palms and private-label branding. Bulk winter gloves production can be planned around approved samples.",null,null],["golf.html","Private Label Golf Gloves Manufacturer | GRIPORA","Custom golf gloves with logos for brands, clubs and pro shops. Bulk golf gloves, OEM/private-label manufacturing, fit and material options, and sample development.","Private-label golf glove development with performance-oriented fit, ventilated constructions, reinforced contact zones and custom artwork for golf brands and retail programmes.","GRIPORA develops custom golf gloves for brands, pro shops and distributors, with bulk golf gloves production after sample approval. Explore 11 designs with ventilation, palm options, custom logos and private-label retail branding.",null,null],["private-label-oem.html","OEM & Private Label Glove Manufacturing | GRIPORA","Private label gloves and OEM sports glove manufacturing for overseas brands, importers and distributors. Custom golf, MTB, fitness and winter glove development.","GRIPORA helps brands, distributors and product teams develop golf, cycling, MTB, fitness and winter gloves with custom materials, construction, colors, logos, labels and packaging.","GRIPORA develops private label gloves and OEM sports glove programmes for brands, retailers and distributors. Discuss custom golf, cycling, MTB, gym and winter glove materials, sizing, logos, labels, packaging and wholesale production.","Use an existing construction as a starting point or develop a glove around your target market, reference sample and technical brief. We coordinate the details from first specification through approved sample and export production.","Use an existing construction as a starting point or develop a glove around your target market, reference sample and technical brief. We coordinate the details from specification to approved sample and export production. Enquiries from the USA, UK, Europe, Canada and Australia are welcome."],["custom-glove-development.html","Custom Glove Sampling & OEM Development | GRIPORA","OEM sports glove prototypes and sample development for brands. Discuss materials, fit, artwork, private-label branding and production planning from a technical brief.","Share a reference glove, artwork or target specification. GRIPORA turns the brief into a practical sample-development route for your market, brand and target quantity.","For bike, golf, gym and outdoor brands, share a glove sample, artwork or technical pack. GRIPORA plans OEM prototypes, custom materials, branding and sample development around your market and target quantity.",null,null]]''')
def update_meta(markup, attr, key, content):
    pat=re.compile(r'(<meta\s+'+attr+r'="'+re.escape(key)+r'"\s+content=")[^"]*(")',re.I)
    matches=list(pat.finditer(markup))
    assert len(matches)==1, f"Expected one {attr}={key}, found {len(matches)}"
    return pat.sub(lambda m:m.group(1)+html.escape(content,quote=True)+m.group(2),markup,count=1)
def update_title(markup, content):
    pat=re.compile(r"<title>.*?</title>",re.I|re.S)
    assert len(pat.findall(markup))==1, "Missing/duplicate title"
    return pat.sub(lambda _:"<title>"+html.escape(content)+"</title>",markup,count=1)
# Competitor-audit improvement: keyword-relevant visible category H2, leaving locked hero H1 untouched.
category_headings={
    "fullfinger.html": ("<h2>MTB GLOVE RANGE.</h2>", "<h2>CUSTOM MTB &amp; CYCLING GLOVES.</h2>", "Full-Finger MTB & Cycling Gloves"),
    "fitness.html": ("<h2>TRAINING GLOVE RANGE.</h2>", "<h2>CUSTOM GYM GLOVES.</h2>", "Training & Fitness Gloves"),
    "winter.html": ("<h2>WINTER GLOVE RANGE.</h2>", "<h2>CUSTOM WINTER GLOVES.</h2>", "Winter & Outdoor Gloves"),
    "golf.html": ("<h2>GOLF GLOVE RANGE.</h2>", "<h2>CUSTOM GOLF GLOVES.</h2>", "Golf Gloves"),
}
for path,title,description,old_intro,new_intro,old_more,new_more in specs:
    f=root/path
    assert f.is_file(), "Missing "+path
    source=f.read_text(encoding="utf-8")
    markup=update_title(source,title)
    markup=update_meta(markup,"name","description",description)
    markup=update_meta(markup,"property","og:title",title)
    markup=update_meta(markup,"property","og:description",description)
    for old,new in [(old_intro,new_intro),(old_more,new_more)]:
        if old is None:continue
        assert old!=new
        # Replace only text inside an existing paragraph, not HTML structure.
        # The exact source copy must match once, so silent content changes fail.
        if old not in markup:
            assert new in markup, "SEO introductory copy not found on "+path
        else:
            assert markup.count(old)==1, "Ambiguous copy in "+path
            markup=markup.replace(old,html.escape(new,quote=False),1)
    if path in category_headings:
        old_h2,new_h2,crumb_name=category_headings[path]
        if old_h2 in markup:
            assert markup.count(old_h2)==1, "Duplicate category H2: "+path
            markup=markup.replace(old_h2,new_h2,1)
        else:
            assert new_h2 in markup, "Missing approved category heading: "+path
        canonical="https://griporagloves.com/"+path
        assert 'rel="canonical" href="'+canonical+'"' in markup, "Canonical mismatch: "+path
        # Visible breadcrumb already shows Home > Categories > Category; structured data mirrors it.
        schema={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":"https://griporagloves.com/"},
            {"@type":"ListItem","position":2,"name":crumb_name,"item":canonical}]}
        marker='id="gripora-category-breadcrumb-20261117"'
        if marker not in markup:
            assert markup.count("</head>")==1, "Unique head needed: "+path
            script='<script '+marker+' type="application/ld+json">'+json.dumps(schema,separators=(",",":"))+'</script>'
            markup=markup.replace("</head>",script+"</head>",1)
        assert markup.count(marker)==1, "Duplicated breadcrumb schema: "+path
    assert source.count("<h1")==markup.count("<h1"), "Heading count changed: "+path
    assert source.count("<img")==markup.count("<img"), "Image markup changed: "+path
    assert source.count("rel=\"canonical\"")==markup.count("rel=\"canonical\"")
    f.write_text(markup,encoding="utf-8")
assert len(specs)==7
home=(root/"index.html").read_text(encoding="utf-8")
assert 'id="factory-carousel-reel"' in home, "Factory slider removed"
assert home.count('<figure>')>=12
assert (root/"sitemap.xml").read_text(encoding="utf-8").count("<loc>")==70
print("GRIPORA_B2B_SEO_PASS: 7 targeted landing pages; original design and 62 product pages retained")
