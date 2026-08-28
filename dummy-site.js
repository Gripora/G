const DUMMY_DATA={
  fullfinger:{
    number:'01',title:'Full-Finger MTB & Cycling',short:'MTB / CYCLING',concept:true,
    tagline:'Custom printed or sublimated backhands, lightweight performance construction and private-label development for trail and cycling brands.',
    hero:'assets/mtb-core.webp',heroFit:'cover',
    models:[
      {name:'GRIPORA CORE',desc:'Clean everyday MTB glove concept built around lightweight stretch construction and a precise handlebar feel.',colors:[['Black','#111418','assets/mtb-core.webp'],['Charcoal','#555b61','assets/mtb-core.webp'],['Navy','#172746','assets/mtb-core.webp'],['Custom','#75c817','assets/mtb-core.webp']]},
      {name:'GRIPORA CONTOUR',desc:'Graphic-led full-finger development direction with custom printed or sublimated artwork options.',colors:[['Navy','#172746','assets/mtb-contour.webp'],['Cyan','#27a9df','assets/mtb-contour.webp'],['Black','#111418','assets/mtb-contour.webp'],['Custom','#75c817','assets/mtb-contour.webp']]},
      {name:'GRIPORA AIR',desc:'Ventilated summer MTB glove concept focused on airflow, low bulk and responsive control.',colors:[['Black','#111418','assets/mtb-air.webp'],['Grey','#9aa0a6','assets/mtb-air.webp'],['Blue','#1f66d1','assets/mtb-air.webp'],['Custom','#75c817','assets/mtb-air.webp']]},
      {name:'GRIPORA APEX',desc:'Premium technical glove concept with engineered panel construction and adjustable cuff development.',colors:[['Black','#111418','assets/mtb-apex.webp'],['Graphite','#454b50','assets/mtb-apex.webp'],['Olive','#66733b','assets/mtb-apex.webp'],['Custom','#75c817','assets/mtb-apex.webp']]}
    ],
    specs:[['Backhand development','Printed or sublimated options depending on material, artwork and construction.'],['Palm options','Synthetic suede or microfiber constructions with reinforcement options.'],['Grip details','Silicone palm or finger applications and touchscreen development options.'],['Private label','Custom artwork, logos, colors, labels and packaging.']]
  },
  cycling:{
    number:'02',title:'Short-Finger Cycling',short:'CYCLING',concept:false,
    tagline:'Road and performance cycling glove development with breathable construction, palm comfort and brand-ready customization.',
    hero:'assets/cycling-m1-blue.png',heroFit:'contain',
    models:[
      {name:'GRIPORA Aero Ride',desc:'Lightweight half-finger road glove with cushioned palm zones and easy pull-tab development.',colors:[['Blue','#1f66d1','assets/cycling-m1-blue.png'],['Green','#65b72e','assets/cycling-m1-green.png'],['Grey','#9aa0a6','assets/cycling-m1-grey.png'],['Red','#d52b32','assets/cycling-m1-red.png']]},
      {name:'GRIPORA RoadFlex',desc:'Performance cycling construction built around secure fit, ventilation and confident bar control.',colors:[['Blue','#1f66d1','assets/cycling-m2-blue.png'],['Green','#65b72e','assets/cycling-m2-green.png'],['Orange','#f28c28','assets/cycling-m2-orange.png'],['Red','#d52b32','assets/cycling-m2-red.png']]},
      {name:'GRIPORA Enduro Grip',desc:'Padded cycling glove development for vibration control and dependable grip over longer rides.',colors:[['Blue','#1f66d1','assets/cycling-m3-blue.png'],['Green','#65b72e','assets/cycling-m3-green.png'],['Red','#d52b32','assets/cycling-m3-red.png'],['White','#ffffff','assets/cycling-m3-white.png']]},
      {name:'GRIPORA Velocity',desc:'Clean low-profile cycling glove direction for brands seeking a minimal performance aesthetic.',colors:[['Black','#111418','assets/cycling-m4-black.png'],['Blue','#1f66d1','assets/cycling-m4-blue.png'],['Green','#65b72e','assets/cycling-m4-green.png'],['Grey','#9aa0a6','assets/cycling-m4-grey.png']]}
    ],
    specs:[['Backhand options','Breathable mesh, stretch fabrics and custom branded panel development.'],['Palm development','Synthetic suede or microfiber palms with padding and reinforcement zones.'],['Fit & comfort','Pull tabs, adjustable closures and ergonomic panel construction.'],['Private label','Custom colors, logos, labels and packaging for brand programs.']]
  },
  fitness:{
    number:'03',title:'Training & Fitness',short:'FITNESS',concept:false,
    tagline:'Training and lifting glove development with palm protection, breathable materials and optional wrist-support constructions.',
    hero:'assets/fitness-m1-blue.png',heroFit:'contain',
    models:[
      {name:'GRIPORA Core Grip',desc:'Training glove direction built around grip, breathable comfort and controlled lifting.',colors:[['Blue','#1f66d1','assets/fitness-m1-blue.png'],['Olive Green','#66733b','assets/fitness-m1-olive-green.png'],['Red','#d52b32','assets/fitness-m1-red.png']]},
      {name:'GRIPORA Power Lift',desc:'Protective gym glove development for strength sessions and demanding workout programs.',colors:[['Blue','#1f66d1','assets/fitness-m2-blue.png'],['Olive Green','#66733b','assets/fitness-m2-olive-green.png'],['Orange','#f28c28','assets/fitness-m2-orange.png'],['Red','#d52b32','assets/fitness-m2-red.png']]},
      {name:'GRIPORA AirFlex',desc:'Breathable fitness construction focused on flexible hand movement and palm protection.',colors:[['Black','#111418','assets/fitness-m3-black.png'],['Blue','#1f66d1','assets/fitness-m3-blue.png'],['Grey','#9aa0a6','assets/fitness-m3-grey.png'],['Orange','#f28c28','assets/fitness-m3-orange.png']]},
      {name:'GRIPORA LiftSecure',desc:'Performance lifting glove direction with secure fit and integrated support options.',colors:[['Black','#111418','assets/fitness-m4-black.png'],['Green','#65b72e','assets/fitness-m4-green.png'],['Navy Blue','#172746','assets/fitness-m4-navy-blue.png'],['Orange','#f28c28','assets/fitness-m4-orange.png'],['Red','#d52b32','assets/fitness-m4-red.png']]}
    ],
    specs:[['Upper construction','Mesh, stretch fabrics and neoprene combinations depending on required support.'],['Palm protection','Synthetic palm materials with padding, reinforcement and grip options.'],['Wrist support','Short cuff or integrated wrist-wrap development depending on model.'],['Private label','Custom branding, colors, labels and retail packaging.']]
  },
  winter:{
    number:'04',title:'Winter & Outdoor',short:'WINTER / OUTDOOR',concept:false,
    tagline:'Cold-weather glove development using insulated constructions, technical fabrics, leather options and reinforced palms.',
    hero:'winter-m1-brown.png',heroFit:'contain',
    models:[
      {name:'GRIPORA Thermo Shield',desc:'Insulated winter glove development with extended coverage and dependable cold-weather protection.',colors:[['Black','#111418','winter-m1-black.png'],['Brown','#7a4f2b','winter-m1-brown.png'],['Olive Green','#66733b','winter-m1-olive-green.png'],['Tan','#c49a6c','winter-m1-tan.png']]},
      {name:'GRIPORA Urban Heat',desc:'Versatile cold-weather glove direction combining warmth, movement and everyday performance.',colors:[['Black','#111418','winter-m2-black.png'],['Navy Blue','#172746','winter-m2-navy-blue.png'],['Olive Green','#66733b','winter-m2-olive-green.png'],['Tan','#c49a6c','winter-m2-tan.png']]},
      {name:'GRIPORA Alpine Pro',desc:'Technical winter glove development with reinforced construction for demanding outdoor use.',colors:[['Black','#111418','winter-m3-black.png'],['Navy Blue','#172746','winter-m3-navy-blue.png'],['Olive Green','#66733b','winter-m3-olive-green.png'],['Tan','#c49a6c','assets/winter-m3-tan.png']]},
      {name:'GRIPORA Cold Control',desc:'Performance winter glove direction with secure cuff, insulation and durable palm development.',colors:[['Black','#111418','winter-m4-black.png'],['Grey','#9aa0a6','winter-m4-grey.png'],['Navy Blue','#172746','winter-m4-navy-blue.png'],['Olive Green','#66733b','winter-m4-olive-green.png']]}
    ],
    specs:[['Outer materials','Technical fabrics, synthetic materials and leather options depending on target use.'],['Insulation','Warmth level and lining selected around the required climate and dexterity.'],['Palm development','Reinforcement, grip applications and durable palm material options.'],['Cuff & branding','Short or extended cuffs with custom logos, colors, labels and packaging.']]
  }
};

const qs=new URLSearchParams(location.search);
const categoryKey=DUMMY_DATA[qs.get('category')]?qs.get('category'):'fullfinger';
const cat=DUMMY_DATA[categoryKey];
const esc=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function logo(footer=false){return `<a class="logo ${footer?'footer-logo':''}" href="dummy.html">GRIP<span class="o">O</span>RA<small><b>GRIP. PROTECT.</b> PERFORM.</small></a>`}
function header(){return `<header class="site-header">${logo()}<nav class="desktop-nav"><a href="dummy.html#categories">Gloves</a><a href="dummy.html#capabilities">Capabilities</a><a href="dummy.html#process">Development</a><a href="dummy.html#about">About</a></nav><a class="header-cta" href="mailto:ibtesam@griporagloves.com">Start a project</a></header>`}
function footer(){return `<footer><div>${logo(true)}</div><div class="footer-links"><a href="dummy.html#categories">Categories</a><a href="dummy.html#capabilities">Capabilities</a><a href="dummy.html#process">Development</a><a href="mailto:ibtesam@griporagloves.com">ibtesam@griporagloves.com</a></div><div class="footer-meta">© 2026 GRIPORA · Sialkot, Pakistan<br><span>Dummy redesign preview · live site unchanged.</span></div></footer>`}
function commercialStrip(){return `<section class="inner-strip"><div><strong>50 pairs</strong><span>Starting MOQ per design*</span></div><div><strong>Samples free</strong><span>Buyer covers courier/freight</span></div><div><strong>14 days</strong><span>Approx. sample development</span></div><div><strong>60 days</strong><span>Approx. bulk production</span></div></section>`}
function categorySwitch(){return `<section class="category-switch"><h2>Explore other glove categories.</h2><div class="switch-grid">${Object.entries(DUMMY_DATA).map(([key,c])=>`<a class="switch-card" href="dummy-category.html?category=${key}"><span>${c.number} · GRIPORA</span>${c.title} →</a>`).join('')}</div></section>`}
function contactCta(title='Ready to develop your next glove?'){return `<section class="dummy-contact"><div><h2>${title}</h2><p>Share your category, reference, artwork or target specification. We can start with the most relevant development route.</p></div><a href="mailto:ibtesam@griporagloves.com">Start a development ↗</a></section>`}
function swatches(colors,modelIndex,scope){return `<div class="dummy-swatches" data-model="${modelIndex}" data-scope="${scope}">${colors.map((c,i)=>`<button type="button" class="dummy-swatch ${i===0?'selected':''}" style="--sw:${c[1]}" data-index="${i}" title="${esc(c[0])}" aria-label="${esc(c[0])}"></button>`).join('')}</div>`}

function bindCategorySwatches(){
  document.querySelectorAll('.dummy-swatches[data-scope="category"]').forEach(box=>{
    const modelIndex=Number(box.dataset.model),model=cat.models[modelIndex],card=box.closest('.model-card'),img=card?.querySelector('.model-media img'),label=card?.querySelector('[data-selected-color]');
    box.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',e=>{
      e.preventDefault();e.stopPropagation();const i=Number(btn.dataset.index),c=model.colors[i];
      box.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');
      if(img&&!cat.concept)img.src=c[2];if(label)label.textContent=c[0];
    }));
  });
}
function bindProductGallery(model){
  const main=document.querySelector('[data-product-main]'),label=document.querySelector('[data-product-color]'),sw=document.querySelector('.product-swatches'),thumbs=document.querySelector('.color-thumbs');
  const pick=i=>{const c=model.colors[i];if(main&&!cat.concept)main.src=c[2];if(label)label.textContent=c[0];sw?.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('selected',j===i));thumbs?.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('selected',j===i));};
  sw?.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>pick(i)));
  thumbs?.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>pick(i)));
}

function renderCategory(){
  const root=document.querySelector('[data-dummy-category]');if(!root)return;document.title=`${cat.title} — GRIPORA Dummy`;
  root.innerHTML=`${header()}<main class="inner-shell"><section class="inner-hero"><div class="inner-hero-copy"><a class="inner-back" href="dummy.html#categories">← Back to all categories</a><p class="eyebrow">${cat.number} · GRIPORA PERFORMANCE DEVELOPMENT</p><h1>${cat.title}</h1><p class="lead">${cat.tagline}</p>${cat.concept?'<p class="status-note">Concept visual — not a production sample. Sample-led specification development available.</p>':''}</div><div class="inner-hero-media ${cat.heroFit==='contain'?'contain':''}"><img src="${cat.hero}" alt="GRIPORA ${cat.title}"></div></section>${commercialStrip()}<section class="collection"><div class="collection-head"><div><p class="eyebrow dark">DEVELOPMENT RANGE</p><h2>Four starting directions.</h2></div><p>Choose a model, review its available colorways, then open the product page for the full development view.</p></div><div class="model-grid">${cat.models.map((m,i)=>`<article class="model-card"><a class="model-media" href="dummy-product.html?category=${categoryKey}&model=${i}"><img src="${m.colors[0][2]}" alt="${esc(m.name)}"></a><div class="model-copy"><div class="model-meta"><span>${String(i+1).padStart(2,'0')} · ${cat.short}</span><span>${m.colors.length} COLORS</span></div><h3><a href="dummy-product.html?category=${categoryKey}&model=${i}">${m.name}</a></h3><p>${m.desc}</p><div class="color-preview"><div><b>Color:</b> <span data-selected-color>${m.colors[0][0]}</span></div>${swatches(m.colors,i,'category')}</div><a class="model-link" href="dummy-product.html?category=${categoryKey}&model=${i}">View product →</a>${cat.concept?'<div class="mini-note">Concept visual — color swatches show development directions; final colorway artwork is confirmed during sampling.</div>':''}</div></article>`).join('')}</div></section><section class="category-info"><div class="category-info-grid"><div><p class="eyebrow">CATEGORY CAPABILITY</p><h2>Developed around your market.</h2></div><div class="spec-list">${cat.specs.map(s=>`<div class="spec-item"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div></div></section>${categorySwitch()}${contactCta()}</main>${footer()}`;
  bindCategorySwatches();
}

function renderProduct(){
  const root=document.querySelector('[data-dummy-product]');if(!root)return;const idx=Math.max(0,Math.min(cat.models.length-1,Number(qs.get('model'))||0)),m=cat.models[idx];document.title=`${m.name} — GRIPORA Dummy`;
  root.innerHTML=`${header()}<main class="inner-shell"><section class="detail-wrap"><div class="crumbs"><a href="dummy.html">Home</a> &nbsp;/&nbsp; <a href="dummy-category.html?category=${categoryKey}">${cat.title}</a> &nbsp;/&nbsp; ${m.name}</div><div class="detail-grid"><div class="detail-gallery"><div class="detail-image"><img data-product-main src="${m.colors[0][2]}" alt="${esc(m.name)}"></div><div class="color-thumbs">${m.colors.map((c,i)=>`<button type="button" class="${i===0?'selected':''}" title="${esc(c[0])}"><img src="${c[2]}" alt="${esc(c[0])} ${esc(m.name)}"></button>`).join('')}</div>${cat.concept?'<p class="gallery-note">Concept visual — alternate production colorways will require approved artwork/sample imagery.</p>':''}</div><div class="detail-info"><p class="kicker">${cat.short} · PRIVATE-LABEL DEVELOPMENT</p><h1>${m.name}</h1><p class="detail-desc">${m.desc}</p>${cat.concept?'<p class="status-note">Concept visual — not a production sample.</p>':''}<div class="product-color-select"><label>Available / Development Colors</label><div class="selected-color">Selected: <b data-product-color>${m.colors[0][0]}</b></div><div class="product-swatches">${m.colors.map((c,i)=>`<button type="button" class="dummy-swatch ${i===0?'selected':''}" style="--sw:${c[1]}" title="${esc(c[0])}" aria-label="${esc(c[0])}"></button>`).join('')}</div></div><div class="detail-rule"></div>${cat.specs.map(s=>`<div class="detail-block"><label>${s[0]}</label><p>${s[1]}</p></div>`).join('')}<div class="detail-actions"><a class="detail-button" href="mailto:ibtesam@griporagloves.com?subject=${encodeURIComponent(m.name+' sample development')}">Request development ↗</a><a class="detail-button secondary" href="dummy-category.html?category=${categoryKey}">Back to category</a></div><div class="detail-commercial"><div><strong>50 pairs</strong><span>Starting MOQ per design*</span></div><div><strong>Free sample</strong><span>Freight only</span></div><div><strong>~14 days</strong><span>Sample development</span></div><div><strong>~60 days</strong><span>Bulk production</span></div></div></div></div></section>${categorySwitch()}${contactCta('Want to develop this direction?')}</main>${footer()}`;
  bindProductGallery(m);
}
renderCategory();renderProduct();
