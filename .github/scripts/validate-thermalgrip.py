"""Release gate for the single GMT-018 addition; never changes the site."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib, json, re, sys
import xml.etree.ElementTree as ET

root=Path(sys.argv[1] if len(sys.argv)>1 else '_site')
page=root/'mtb/gmt-018.html'
markup=page.read_text(encoding='utf8')
category=(root/'fullfinger.html').read_text(encoding='utf8')
photo=root/'assets/mtb-gmt-018-thermalgrip.webp'
assert hashlib.sha256(photo.read_bytes()).hexdigest()=='b1958a5cae04ea05adb0cd311812f0d2535460a958f09a2dcac0ec77b0dff242', 'Supplied image has changed'
assert '<h1>GRIPORA ThermalGrip</h1>' in markup
assert 'Development options, subject to sample approval.' in markup
assert 'Concept visual — not an actual production sample.' in markup
assert '<strong>Colour:</strong> Black' in markup and '<strong>Size category:</strong> Adult' in markup
for feature in ['Internal thermal fleece lining','High-grip silicone palm printing','Touchscreen-compatible index finger and thumb','Secure elasticated slip-on cuff','Full-finger cold-weather construction','OEM and private-label branding options']:
    assert '<li>'+feature+'</li>' in markup, 'Missing development option: '+feature
assert 'GRIPORA%20GMT-018%20GRIPORA%20ThermalGrip' in markup
assert 'GMT-011' not in markup and 'StealthGrip' not in markup
class References(HTMLParser):
    def __init__(self):
        super().__init__(); self.references=[]; self.images=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='a' and 'href' in a:self.references.append(a['href'])
        if tag=='img':self.images.append(a);self.references.append(a.get('src',''))
        if tag=='link' and a.get('rel')=='stylesheet':self.references.append(a['href'])
for rel,source in [('mtb/gmt-018.html',markup),('fullfinger.html',category)]:
    parsed=References();parsed.feed(source)
    for ref in parsed.references:
        url=urlsplit(ref)
        if url.scheme or url.netloc or not url.path:continue
        dest=root/url.path.lstrip('/') if url.path.startswith('/') else (root/rel).parent/url.path
        assert dest.exists(), f'Broken local reference in {rel}: {ref}'
    if rel.startswith('mtb/'):
        assert len(parsed.images)==1, 'Only the supplied product image may be used'
        assert parsed.images[0]['width']=='1536' and parsed.images[0]['height']=='1536'
        assert parsed.images[0]['src']=='/assets/mtb-gmt-018-thermalgrip.webp'

def schemas(source):
    return [json.loads(x) for x in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',source,re.S)]
graph=[n for schema in schemas(markup) for n in schema.get('@graph',[schema])]
products=[x for x in graph if x.get('@type')=='Product']
assert len(products)==1
p=products[0]
url='https://griporagloves.com/mtb/gmt-018.html'
assert (p['sku'],p['name'],p['url'],p['color'],p['size'])==('GMT-018','GRIPORA ThermalGrip',url,'Black','Adult')
assert p['image']==['https://griporagloves.com/assets/mtb-gmt-018-thermalgrip.webp']
assert 'subject to sample approval' in p['description']
assert 'not an actual production sample' in p['description']
assert 'rel="canonical" href="'+url+'"' in markup
full=category.split('id="fullfinger"',1)[1].split('</section>',1)[0]
short=category.split('id="shortfinger"',1)[1].split('</section>',1)[0]
assert full.count('<article class="model reveal">')==14
assert short.count('<article class="model reveal">')==4
assert full.count('href="/mtb/gmt-018.html"')==3 and 'gmt-018.html' not in short
assert '18 MODELS' in category and 'FULL-FINGER / 14 STYLES' in category
listing=[x for x in schemas(category) if x.get('@type')=='ItemList']
assert len(listing)==1 and listing[0]['numberOfItems']==18
assert len({x['url'] for x in listing[0]['itemListElement']})==18
ns='{http://www.sitemaps.org/schemas/sitemap/0.9}'
urls=[x.text for x in ET.parse(root/'sitemap.xml').findall('.//'+ns+'loc')]
assert len(urls)==len(set(urls))==71 and urls.count(url)==1
print('THERMALGRIP_PASS: supplied image unchanged; 14 full-finger + 4 short-finger models; schema, links, options and 71 sitemap URLs verified')
