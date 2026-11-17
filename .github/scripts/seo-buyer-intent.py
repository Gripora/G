#!/usr/bin/env python3
"""Buyer-intent SEO for GRIPORA; metadata and existing introductory copy only.
Purpose: readable content for overseas B2B glove buyers, not keyword stuffing.
No layout, assets, navigation, product naming, photos or MOQ terms are changed.
"""
from pathlib import Path
import json, html, re, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else "_site")
specs=[["index.html","Private Label Sports Gloves Manufacturer | GRIPORA","Custom sports gloves for overseas brands. OEM and private-label MTB, cycling, golf, gym and winter glove manufacturing, sampling and branding in Sialkot, Pakistan.",null,null,null,null],["fullfinger.html","Private Label MTB & Cycling Gloves Manufacturer | GRIPORA","Custom MTB and cycling gloves for bike brands and retailers. OEM full-finger and short-finger styles, custom logos, technical palms and sample development.","Private-label MTB and cycling glove development for performance brands. Explore 13 original full-finger styles and 4 separately identified short-finger options, with custom artwork, fit and construction.","Custom MTB and cycling gloves for private-label bike brands, cycling retailers and distributors. Explore 13 full-finger and 4 short-finger designs with OEM branding, technical palms, custom artwork and sample development.",null,null],["fitness.html","Custom Gym & Weightlifting Gloves Manufacturer | GRIPORA","Custom gym, weightlifting and fitness gloves for sports brands and distributors. Private-label logos, palm grip, wrist-support options and OEM sample development.","A selected range of training and lifting glove directions for private-label development, with palm protection, breathable constructions and optional wrist support.","OEM and private-label gym, weightlifting and fitness gloves for training brands, retailers and distributors. Explore 12 designs with palm protection, breathable fabrics, optional wrist support and custom branding.",null,null],["winter.html","OEM Winter & Outdoor Gloves Manufacturer | GRIPORA","OEM winter, insulated and outdoor gloves for sportswear brands and wholesalers. Private-label mittens, thermal constructions, custom materials and sample development.","Private-label winter and outdoor glove development with insulated constructions, technical shells, reinforced palms, extended cuffs and brand-ready detailing.","OEM and private-label winter, thermal and outdoor gloves for sportswear brands, retailers and distributors. Explore insulated gloves, mittens, technical shells, reinforced palms and custom branding.",null,null],["golf.html","Private Label Golf Gloves Manufacturer | GRIPORA","Custom-logo and private-label golf gloves for golf brands, pro shops and retailers. OEM styles, fit, ventilation, palm options and custom retail branding.","Private-label golf glove development with performance-oriented fit, ventilated constructions, reinforced contact zones and custom artwork for golf brands and retail programmes.","Private-label and custom-logo golf gloves for golf brands, pro shops, clubs and distributors. Explore 11 designs with ventilation, palm options, custom artwork and retail branding.",null,null],["private-label-oem.html","OEM & Private Label Glove Manufacturing | GRIPORA","OEM and private-label sports glove manufacturing for international brands, importers and distributors. MTB, golf, fitness and winter styles, custom branding and samples.","GRIPORA helps brands, distributors and product teams develop golf, cycling, MTB, fitness and winter gloves with custom materials, construction, colors, logos, labels and packaging.","GRIPORA develops OEM and private-label MTB, cycling, golf, fitness and winter gloves for brands, retailers and distributors. Discuss custom materials, sizing, logos, labels, packaging and wholesale production.","Use an existing construction as a starting point or develop a glove around your target market, reference sample and technical brief. We coordinate the details from first specification through approved sample and export production.","Use an existing construction as a starting point or develop a glove around your target market, reference sample and technical brief. We coordinate the details from specification to approved sample and export production. Enquiries from the USA, UK, Europe, Canada and Australia are welcome."],["custom-glove-development.html","Custom Glove Sampling & OEM Development | GRIPORA","OEM sports glove prototypes and sample development for brands. Discuss materials, fit, artwork, private-label branding and production planning from a technical brief.","Share a reference glove, artwork or target specification. GRIPORA turns the brief into a practical sample-development route for your market, brand and target quantity.","For bike, golf, gym and outdoor brands, share a glove sample, artwork or technical pack. GRIPORA plans OEM prototypes, custom materials, branding and sample development around your market and target quantity.",null,null]]
def update_meta(markup, attr, key, content):
    pat=re.compile(r'(<meta\s+'+attr+r'="'+re.escape(key)+r'"\s+content=")[^"]*(")',re.I)
    matches=list(pat.finditer(markup))
    assert len(matches)==1, f"Expected one {attr}={key}, found {len(matches)}"
    return pat.sub(lambda m:m.group(1)+html.escape(content,quote=True)+m.group(2),markup,count=1)
def update_title(markup, content):
    pat=re.compile(r"<title>.*?</title>",re.I|re.S)
    assert len(pat.findall(markup))==1, "Missing/duplicate title"
    return pat.sub(lambda _:"<title>"+html.escape(content)+"</title>",markup,count=1)
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
