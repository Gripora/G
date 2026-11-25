#!/usr/bin/env python3
"""Buyer-intent SEO for GRIPORA; metadata and existing introductory copy only.
Purpose: readable content for overseas B2B glove buyers, not keyword stuffing.
No layout, assets, navigation, product naming, photos or MOQ terms are changed.
"""
from pathlib import Path
import json, html, re, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else "_site")
thermalgrip_present=(root/"mtb/gmt-018.html").is_file()
specs=json.loads(r'''[["index.html","Private Label Sports Gloves Manufacturer | GRIPORA","Custom sports gloves for overseas brands. Private-label and OEM manufacturing of golf, MTB, cycling, fitness and winter gloves, with sampling and branding in Pakistan.",null,null,null,null],["fullfinger.html","Private Label MTB & Cycling Gloves Manufacturer | GRIPORA","Custom cycling gloves and private-label MTB gloves for bike brands and distributors. OEM full-finger and short-finger styles, technical palms, custom logos and samples.","Private-label MTB and cycling glove development for performance brands. Explore 13 original full-finger styles and 4 separately identified short-finger options, with custom artwork, fit and construction.","Develop custom cycling gloves and custom MTB gloves for bike brands, cycling retailers and distributors. Explore 13 full-finger styles and four short-finger options with technical palms, OEM branding, artwork and sampling.",null,null],["fitness.html","Custom Gym & Weightlifting Gloves Manufacturer | GRIPORA","Custom gym gloves and weightlifting gloves for training brands and distributors. Private-label development, wholesale gym gloves programmes, palm grip and wrist-support options.","A selected range of training and lifting glove directions for private-label development, with palm protection, breathable constructions and optional wrist support.","Develop custom gym gloves and private-label weightlifting designs for training brands, retailers and distributors. Explore breathable constructions, palm protection, wrist-support options and wholesale gym gloves programmes.",null,null],["winter.html","Custom Winter Gloves Manufacturer | Private Label | GRIPORA","Custom winter gloves and bulk winter gloves for outdoor brands and wholesalers. OEM thermal gloves, insulated mittens, private-label branding and sample development.","Private-label winter and outdoor glove development with insulated constructions, technical shells, reinforced palms, extended cuffs and brand-ready detailing.","Develop custom winter gloves for outdoor brands and importers, with insulated constructions, technical shells, reinforced palms and private-label branding. Bulk winter gloves production can be planned around approved samples.",null,null],["golf.html","Custom Golf Gloves Manufacturer | Private Label | GRIPORA","Custom golf gloves with logos for brands, clubs and pro shops. Bulk golf gloves, OEM/private-label manufacturing, fit and material options, and sample development.","Private-label golf glove development with performance-oriented fit, ventilated constructions, reinforced contact zones and custom artwork for golf brands and retail programmes.","GRIPORA develops custom golf gloves for brands, pro shops and distributors, with bulk golf gloves production after sample approval. Explore 11 designs with ventilation, palm options, custom logos and private-label retail branding.",null,null],["private-label-oem.html","OEM & Private Label Glove Manufacturing | GRIPORA","Private label gloves and OEM sports glove manufacturing for overseas brands, importers and distributors. Custom golf, MTB, fitness and winter glove development.","GRIPORA helps brands, distributors and product teams develop golf, cycling, MTB, fitness and winter gloves with custom materials, construction, colors, logos, labels and packaging.","GRIPORA develops private label gloves and OEM sports glove programmes for brands, retailers and distributors. Discuss custom golf, cycling, MTB, gym and winter glove materials, sizing, logos, labels, packaging and wholesale production.","Use an existing construction as a starting point or develop a glove around your target market, reference sample and technical brief. We coordinate the details from first specification through approved sample and export production.","Use an existing construction as a starting point or develop a glove around your target market, reference sample and technical brief. We coordinate the details from specification to approved sample and export production. Enquiries from the USA, UK, Europe, Canada and Australia are welcome."],["custom-glove-development.html","Custom Glove Sampling & OEM Development | GRIPORA","OEM sports glove prototypes and sample development for brands. Discuss materials, fit, artwork, private-label branding and production planning from a technical brief.","Share a reference glove, artwork or target specification. GRIPORA turns the brief into a practical sample-development route for your market, brand and target quantity.","For bike, golf, gym and outdoor brands, share a glove sample, artwork or technical pack. GRIPORA plans OEM prototypes, custom materials, branding and sample development around your market and target quantity.",null,null]]''')
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
# Point 4: compact, visible buyer FAQs grounded in GRIPORA's published development policy.
# No artificial FAQ rich-result markup; Google does not generally show FAQ rich
# results for ordinary commercial websites.
faq_data={
    "golf.html": [
        ("Can you manufacture custom golf gloves with our branding?",
         "Yes. Golf brands, clubs and pro shops can discuss custom artwork, wrist branding, palm options, sizing and retail packaging. Materials and construction are confirmed during development."),
        ("Can we arrange bulk golf gloves after approving a sample?",
         "Bulk production can be planned after sample and specification approval. Final minimum order quantity depends on the selected materials and customization."),
        ("What should we send for a golf glove quotation?",
         "Share the reference design, target quantity, size range, preferred palm material, logo artwork, packaging requirements and destination market.")
    ],
    "winter.html": [
        ("Can GRIPORA develop custom winter gloves and mittens?",
         "Yes. We can discuss insulated glove and mitten designs, technical shell fabrics, linings, palm reinforcement, cuffs and private-label branding, subject to material feasibility."),
        ("Are bulk winter glove minimum order quantities fixed?",
         "No. Final quantities depend on materials, construction and customization. The development scope and order terms are confirmed for each project."),
        ("What details help with a winter glove sample?",
         "Share your intended use and climate, reference design, preferred lining or insulation, grip requirements, size range, branding and target order quantity.")
    ],
    "fullfinger.html": [
        ("Can GRIPORA develop full-finger MTB and short-finger cycling gloves?",
         "Yes. The collection includes both full-finger MTB and short-finger cycling starting points. Glove construction can be reviewed against your brand's fit and intended use."),
        ("Which cycling glove details can be customized?",
         "Discuss backhand fabric, palm material, grip reinforcement, finger panels, cuff fit, custom prints, logos and packaging according to your technical brief."),
        ("How do we start a private-label cycling glove project?",
         "Send reference images or a tech pack, target quantities, sizes, artwork and intended market. We review specifications before sampling and production approval.")
    ],
    "fitness.html": [
        ("Can gym gloves be developed with different palm and wrist options?",
         "Yes. Discuss synthetic palm materials, reinforcement or padding, breathable backhand fabrics, neoprene details and wrist-support options for your target activity."),
        ("Do you offer private-label gym gloves for brands and distributors?",
         "Yes. GRIPORA develops custom gym and weightlifting glove programmes with brand artwork, sizing and packaging options. Final minimum quantities depend on materials and customization."),
        ("What is needed to request a fitness glove sample?",
         "Share a glove reference or tech pack, palm and cuff requirements, size range, target quantity, branding artwork and intended use so development can be reviewed.")
    ],
}
faq_css='''<style id="gripora-category-faq-style">
.gripora-category-faq{background:#fff;color:#161616;border-top:1px solid #e8e8e8;padding:clamp(38px,6vw,72px) 0}
.gripora-category-faq .w{max-width:1180px;margin:0 auto;padding:0 24px}
.gripora-category-faq .faq-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#626262;margin:0 0 12px}
.gripora-category-faq h2{font-size:clamp(23px,3vw,33px);line-height:1.2;font-weight:700;letter-spacing:-.025em;margin:0 0 22px}
.gripora-category-faq details{border-top:1px solid #dfdfdf}
.gripora-category-faq details:last-of-type{border-bottom:1px solid #dfdfdf}
.gripora-category-faq summary{cursor:pointer;list-style:none;position:relative;padding:19px 34px 19px 0;font-size:16px;font-weight:600;line-height:1.45}
.gripora-category-faq summary::-webkit-details-marker{display:none}
.gripora-category-faq summary::after{content:"+";position:absolute;right:4px;top:16px;font-size:23px;font-weight:400}
.gripora-category-faq details[open] summary::after{content:"−"}
.gripora-category-faq details p{margin:0 0 18px;font-size:15px;line-height:1.7;max-width:830px;color:#444}
.gripora-category-faq .faq-more{margin:22px 0 0;font-size:14px;line-height:1.6}
.gripora-category-faq a{color:inherit;text-underline-offset:3px}
@media(max-width:600px){.gripora-category-faq .w{padding:0 20px}.gripora-category-faq summary{font-size:15px;padding-top:16px;padding-bottom:16px}}
</style>'''
def add_buyer_faq(markup,path):
    if path not in faq_data:return markup
    section_marker='id="gripora-category-faq"'
    if section_marker not in markup:
        assert markup.count('<section class="end">')==1,"Expected one end section: "+path
        rows=[]
        for question,answer in faq_data[path]:
            rows.append('<details><summary>'+html.escape(question)+'</summary><p>'+html.escape(answer)+'</p></details>')
        section='<section class="gripora-category-faq" '+section_marker+' aria-label="Frequently asked buyer questions"><div class="w"><p class="faq-eyebrow">PRIVATE LABEL / OEM SUPPORT</p><h2>BUYER QUESTIONS.</h2>'+''.join(rows)+'<p class="faq-more">See our <a href="/development-policy.html">development policy</a> for sample, minimum order quantity and production guidance.</p></div></section>'
        markup=markup.replace('<section class="end">',section+'<section class="end">',1)
    assert markup.count(section_marker)==1,"Duplicate buyer FAQ: "+path
    assert markup.count('class="gripora-category-faq"')==1
    if 'id="gripora-category-faq-style"' not in markup:
        assert markup.count('</head>')==1,"Missing unique head: "+path
        markup=markup.replace('</head>',faq_css+'</head>',1)
    assert markup.count('id="gripora-category-faq-style"')==1
    assert markup.count('<details>')==3,"Expected three buyer FAQs: "+path
    return markup

for path,title,description,old_intro,new_intro,old_more,new_more in specs:
    if path=="fullfinger.html" and thermalgrip_present:
        old_intro=old_intro.replace("13 original", "14 original")
        new_intro=new_intro.replace("13 full-finger", "14 full-finger")
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
    markup=add_buyer_faq(markup,path)
    assert source.count("<h1")==markup.count("<h1"), "Heading count changed: "+path
    assert source.count("<img")==markup.count("<img"), "Image markup changed: "+path
    assert source.count("rel=\"canonical\"")==markup.count("rel=\"canonical\"")
    f.write_text(markup,encoding="utf-8")
assert len(specs)==7
home=(root/"index.html").read_text(encoding="utf-8")
assert 'id="factory-carousel-reel"' in home, "Factory slider removed"
assert home.count('<figure>')>=12
assert (root/"sitemap.xml").read_text(encoding="utf-8").count("<loc>")==(71 if thermalgrip_present else 70)
print("GRIPORA_B2B_SEO_PASS: 7 targeted landing pages; original design and product pages retained")
