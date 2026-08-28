const DUMMY_DATA={
  fullfinger:{
    number:'01',title:'Full-Finger MTB & Cycling',short:'MTB / CYCLING',concept:true,
    tagline:'Custom printed or sublimated backhands, lightweight performance construction and private-label development for trail and cycling brands.',
    hero:'assets/mtb-core.webp',heroFit:'cover',
    models:[
      {name:'GRIPORA CORE',image:'assets/mtb-core.webp',desc:'Clean everyday MTB glove concept built around lightweight stretch construction and a precise handlebar feel.'},
      {name:'GRIPORA CONTOUR',image:'assets/mtb-contour.webp',desc:'Graphic-led full-finger development direction with custom printed or sublimated artwork options.'},
      {name:'GRIPORA AIR',image:'assets/mtb-air.webp',desc:'Ventilated summer MTB glove concept focused on airflow, low bulk and responsive control.'},
      {name:'GRIPORA APEX',image:'assets/mtb-apex.webp',desc:'Premium technical glove concept with engineered panel construction and adjustable cuff development.'}
    ],
    specs:[
      ['Backhand development','Printed or sublimated options depending on material, artwork and construction.'],
      ['Palm options','Synthetic suede or microfiber constructions with reinforcement options.'],
      ['Grip details','Silicone palm or finger applications and touchscreen development options.'],
      ['Private label','Custom artwork, logos, colors, labels and packaging.']
    ]
  },
  cycling:{
    number:'02',title:'Short-Finger Cycling',short:'CYCLING',concept:false,
    tagline:'Road and performance cycling glove development with breathable construction, palm comfort and brand-ready customization.',
    hero:'assets/cycling-m1-blue.png',heroFit:'contain',
    models:[
      {name:'GRIPORA Aero Ride',image:'assets/cycling-m1-blue.png',desc:'Lightweight half-finger road glove with cushioned palm zones and easy pull-tab development.'},
      {name:'GRIPORA RoadFlex',image:'assets/cycling-m2-blue.png',desc:'Performance cycling construction built around secure fit, ventilation and confident bar control.'},
      {name:'GRIPORA Enduro Grip',image:'assets/cycling-m3-blue.png',desc:'Padded cycling glove development for vibration control and dependable grip over longer rides.'},
      {name:'GRIPORA Velocity',image:'assets/cycling-m4-black.png',desc:'Clean low-profile cycling glove direction for brands seeking a minimal performance aesthetic.'}
    ],
    specs:[
      ['Backhand options','Breathable mesh, stretch fabrics and custom branded panel development.'],
      ['Palm development','Synthetic suede or microfiber palms with padding and reinforcement zones.'],
      ['Fit & comfort','Pull tabs, adjustable closures and ergonomic panel construction.'],
      ['Private label','Custom colors, logos, labels and packaging for brand programs.']
    ]
  },
  fitness:{
    number:'03',title:'Training & Fitness',short:'FITNESS',concept:false,
    tagline:'Training and lifting glove development with palm protection, breathable materials and optional wrist-support constructions.',
    hero:'assets/fitness-m1-blue.png',heroFit:'contain',
    models:[
      {name:'GRIPORA Core Grip',image:'assets/fitness-m1-blue.png',desc:'Training glove direction built around grip, breathable comfort and controlled lifting.'},
      {name:'GRIPORA Power Lift',image:'assets/fitness-m2-blue.png',desc:'Protective gym glove development for strength sessions and demanding workout programs.'},
      {name:'GRIPORA AirFlex',image:'assets/fitness-m3-black.png',desc:'Breathable fitness construction focused on flexible hand movement and palm protection.'},
      {name:'GRIPORA LiftSecure',image:'assets/fitness-m4-black.png',desc:'Performance lifting glove direction with secure fit and integrated support options.'}
    ],
    specs:[
      ['Upper construction','Mesh, stretch fabrics and neoprene combinations depending on required support.'],
      ['Palm protection','Synthetic palm materials with padding, reinforcement and grip options.'],
      ['Wrist support','Short cuff or integrated wrist-wrap development depending on model.'],
      ['Private label','Custom branding, colors, labels and retail packaging.']
    ]
  },
  winter:{
    number:'04',title:'Winter & Outdoor',short:'WINTER / OUTDOOR',concept:false,
    tagline:'Cold-weather glove development using insulated constructions, technical fabrics, leather options and reinforced palms.',
    hero:'winter-m1-brown.png',heroFit:'contain',
    models:[
      {name:'GRIPORA Thermo Shield',image:'winter-m1-brown.png',desc:'Insulated winter glove development with extended coverage and dependable cold-weather protection.'},
      {name:'GRIPORA Urban Heat',image:'winter-m2-navy-blue.png',desc:'Versatile cold-weather glove direction combining warmth, movement and everyday performance.'},
      {name:'GRIPORA Alpine Pro',image:'assets/winter-m3-tan.png',desc:'Technical winter glove development with reinforced construction for demanding outdoor use.'},
      {name:'GRIPORA Cold Control',image:'winter-m4-black.png',desc:'Performance winter glove direction with secure cuff, insulation and durable palm development.'}
    ],
    specs:[
      ['Outer materials','Technical fabrics, synthetic materials and leather options depending on target use.'],
      ['Insulation','Warmth level and lining selected around the required climate and dexterity.'],
      ['Palm development','Reinforcement, grip applications and durable palm material options.'],
      ['Cuff & branding','Short or extended cuffs with custom logos, colors, labels and packaging.']
    ]
  }
};

const qs=new URLSearchParams(location.search);
const categoryKey=DUMMY_DATA[qs.get('category')]?qs.get('category'):'fullfinger';
const cat=DUMMY_DATA[categoryKey];

function logo(footer=false){return `<a class="logo ${footer?'footer-logo':''}" href="dummy.html">GRIP<span class="o">O</span>RA<small><b>GRIP. PROTECT.</b> PERFORM.</small></a>`}
function header(){return `<header class="site-header">${logo()}<nav class="desktop-nav"><a href="dummy.html#categories">Gloves</a><a href="dummy.html#capabilities">Capabilities</a><a href="dummy.html#process">Development</a><a href="dummy.html#about">About</a></nav><a class="header-cta" href="mailto:ibtesam@griporagloves.com">Start a project</a></header>`}
function footer(){return `<footer><div>${logo(true)}</div><div class="footer-links"><a href="dummy.html#categories">Categories</a><a href="dummy.html#capabilities">Capabilities</a><a href="dummy.html#process">Development</a><a href="mailto:ibtesam@griporagloves.com">ibtesam@griporagloves.com</a></div><div class="footer-meta">© 2026 GRIPORA · Sialkot, Pakistan<br><span>Dummy redesign preview · live site unchanged.</span></div></footer>`}
function commercialStrip(){return `<section class="inner-strip"><div><strong>50 pairs</strong><span>Starting MOQ per design*</span></div><div><strong>Samples free</strong><span>Buyer covers courier/freight</span></div><div><strong>14 days</strong><span>Approx. sample development</span></div><div><strong>60 days</strong><span>Approx. bulk production</span></div></section>`}
function categorySwitch(){return `<section class="category-switch"><h2>Explore other glove categories.</h2><div class="switch-grid">${Object.entries(DUMMY_DATA).map(([key,c])=>`<a class="switch-card" href="dummy-category.html?category=${key}"><span>${c.number} · GRIPORA</span>${c.title} →</a>`).join('')}</div></section>`}
function contactCta(title='Ready to develop your next glove?'){return `<section class="dummy-contact"><div><h2>${title}</h2><p>Share your category, reference, artwork or target specification. We can start with the most relevant development route.</p></div><a href="mailto:ibtesam@griporagloves.com">Start a development ↗</a></section>`}

function renderCategory(){
  const root=document.querySelector('[data-dummy-category]'); if(!root)return;
  document.title=`${cat.title} — GRIPORA Dummy`;
  root.innerHTML=`${header()}<main class="inner-shell"><section class="inner-hero"><div class="inner-hero-copy"><a class="inner-back" href="dummy.html#categories">← Back to all categories</a><p class="eyebrow">${cat.number} · GRIPORA PERFORMANCE DEVELOPMENT</p><h1>${cat.title}</h1><p class="lead">${cat.tagline}</p>${cat.concept?'<p class="status-note">Concept visual — not a production sample. Sample-led specification development available.</p>':''}</div><div class="inner-hero-media ${cat.heroFit==='contain'?'contain':''}"><img src="${cat.hero}" alt="GRIPORA ${cat.title}"></div></section>${commercialStrip()}<section class="collection"><div class="collection-head"><div><p class="eyebrow dark">DEVELOPMENT RANGE</p><h2>Four starting directions.</h2></div><p>Use these as references for construction and design direction. Final materials, colors, branding and specifications are confirmed through sample development.</p></div><div class="model-grid">${cat.models.map((m,i)=>`<a class="model-card" href="dummy-product.html?category=${categoryKey}&model=${i}"><div class="model-media"><img src="${m.image}" alt="${m.name}"></div><div class="model-copy"><div class="model-meta"><span>${String(i+1).padStart(2,'0')} · ${cat.short}</span><span>PRIVATE LABEL</span></div><h3>${m.name}</h3><p>${m.desc}</p><span class="model-link">View development →</span>${cat.concept?'<div class="mini-note">Concept visual — not a production sample.</div>':''}</div></a>`).join('')}</div></section><section class="category-info"><div class="category-info-grid"><div><p class="eyebrow">CATEGORY CAPABILITY</p><h2>Developed around your market.</h2></div><div class="spec-list">${cat.specs.map(s=>`<div class="spec-item"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div></div></section>${categorySwitch()}${contactCta()}</main>${footer()}`;
}

function renderProduct(){
  const root=document.querySelector('[data-dummy-product]'); if(!root)return;
  const idx=Math.max(0,Math.min(cat.models.length-1,Number(qs.get('model'))||0)); const m=cat.models[idx];
  document.title=`${m.name} — GRIPORA Dummy`;
  root.innerHTML=`${header()}<main class="inner-shell"><section class="detail-wrap"><div class="crumbs"><a href="dummy.html">Home</a> &nbsp;/&nbsp; <a href="dummy-category.html?category=${categoryKey}">${cat.title}</a> &nbsp;/&nbsp; ${m.name}</div><div class="detail-grid"><div class="detail-image"><img src="${m.image}" alt="${m.name}"></div><div class="detail-info"><p class="kicker">${cat.short} · PRIVATE-LABEL DEVELOPMENT</p><h1>${m.name}</h1><p class="detail-desc">${m.desc}</p>${cat.concept?'<p class="status-note">Concept visual — not a production sample.</p>':''}<div class="detail-rule"></div>${cat.specs.map(s=>`<div class="detail-block"><label>${s[0]}</label><p>${s[1]}</p></div>`).join('')}<div class="detail-actions"><a class="detail-button" href="mailto:ibtesam@griporagloves.com?subject=${encodeURIComponent(m.name+' sample development')}">Request development ↗</a><a class="detail-button secondary" href="dummy-category.html?category=${categoryKey}">Back to category</a></div><div class="detail-commercial"><div><strong>50 pairs</strong><span>Starting MOQ per design*</span></div><div><strong>Free sample</strong><span>Freight only</span></div><div><strong>~14 days</strong><span>Sample development</span></div><div><strong>~60 days</strong><span>Bulk production</span></div></div></div></div></section>${categorySwitch()}${contactCta('Want to develop this direction?')}</main>${footer()}`;
}

renderCategory();
renderProduct();
