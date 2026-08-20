
const DATA = {
  cycling: {
    title: 'Cycling Gloves', n: '01',
    tag: 'Engineered grip, breathable comfort and road-ready protection.',
    models: [
      ['GRIPORA Aero Ride','Lightweight half-finger road glove with cushioned palm zones and easy pull tabs.'],
      ['GRIPORA RoadFlex','Full-finger cycling glove for confident control, touch and protection on longer rides.'],
      ['GRIPORA Enduro Grip','Padded performance glove designed to reduce vibration and keep grip stable over rough terrain.'],
      ['GRIPORA Velocity Full','Minimal full-finger glove with clean fit and precise handlebar feel for fast riding.']
    ]
  },
  winter: {
    title: 'Winter Gloves', n: '02',
    tag: 'Warmth, dexterity and dependable protection for cold-weather performance.',
    models: [
      ['GRIPORA Thermo Shield','Soft insulated winter glove with dependable warmth and secure coverage.'],
      ['GRIPORA Urban Heat','Warm everyday glove designed for comfortable cold-weather movement.'],
      ['GRIPORA Alpine Pro','Insulated cold-weather glove with extended protection for outdoor use.'],
      ['GRIPORA Knit Warm','Flexible winter glove with soft warmth and comfortable everyday fit.']
    ]
  },
  fitness: {
    title: 'Fitness Gloves', n: '03',
    tag: 'Palm protection, secure wrist support and confident grip for every workout.',
    models: [
      ['GRIPORA Core Grip','Training glove concept built around grip, comfort and controlled lifting.'],
      ['GRIPORA Power Lift','Protective gym glove for strength sessions and demanding workouts.'],
      ['GRIPORA AirFlex','Breathable fitness glove concept for flexible hand movement and support.'],
      ['GRIPORA LiftSecure','Performance glove concept for weight training and secure hand protection.']
    ]
  },
  player: {
    title: 'Player Gloves', n: '04',
    tag: 'Light, warm and grippy gloves built for training, matchday and field control.',
    models: [
      ['GRIPORA Match Grip','Performance player glove with secure wrist fit and confident handling.'],
      ['GRIPORA Receiver X','Protective field glove for training, control and reliable grip.'],
      ['GRIPORA Field Control','Lightweight player glove designed for movement and ball control.'],
      ['GRIPORA Pro Catch','Performance glove focused on dependable handling and protection.']
    ]
  }
};

const COLORS = [
  ['Black','black','#111418'],
  ['Blue','blue','#1f66d1'],
  ['Red','red','#d52b32'],
  ['Green','green','#65b72e']
];

function logo() {
  return `<a class="logo" href="index.html">GRIP<span class="o">O</span>RA<small><b>GRIP. PROTECT.</b> PERFORM.</small></a>`;
}

function header(active='') {
  return `<header class="header">${logo()}<button class="menu" aria-label="Menu">☰</button><nav>
    <a href="index.html" ${active==='home'?'class="active"':''}>Home</a>
    <a href="index.html#about">About Us</a>
    <a href="categories.html" ${active==='cat'?'class="active"':''}>Category</a>
    <a href="index.html#contact">Contact Us</a>
  </nav><div class="tag">GRIP. <span>PROTECT.</span> PERFORM.</div></header>`;
}

function foot() {
  return `<footer class="foot"><div>${logo()}<p>Performance gloves for cycling, winter, fitness and field players.</p></div>
  <div><strong>Quick Links</strong><a href="index.html">Home</a><a href="categories.html">Category</a><a href="index.html#about">About Us</a><a href="index.html#contact">Contact Us</a></div>
  <div><strong>Categories</strong><a href="cycling.html">Cycling Gloves</a><a href="winter.html">Winter Gloves</a><a href="fitness.html">Fitness Gloves</a><a href="player.html">Player Gloves</a></div>
  <div><strong>GRIPORA</strong><p>Grip. Protect. Perform.</p><p>Built for performance, comfort and durability.</p></div>
  <div class="copyright">© 2026 GRIPORA. All Rights Reserved.</div></footer>`;
}

function swatches() {
  return `<div class="swatches">${COLORS.map((c,i)=>`<button class="swatch ${i?'':'selected'}" style="--sw:${c[2]}" data-color="${c[1]}" title="${c[0]}" aria-label="${c[0]}"></button>`).join('')}</div>`;
}

function tone(el,key) {
  el.classList.remove('tone-black','tone-blue','tone-red','tone-green');
  el.classList.add(`tone-${key}`);
}

function wire() {
  document.querySelectorAll('.menu').forEach(b=>b.onclick=()=>document.querySelector('nav')?.classList.toggle('open'));
  document.querySelectorAll('.swatch').forEach(b=>b.onclick=()=>{
    const group=b.closest('.swatches');
    group?.querySelectorAll('.swatch').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    const card=b.closest('[data-card]')||document;
    const visual=card.querySelector('.tone-image');
    if(visual) tone(visual,b.dataset.color);
    const label=card.querySelector('[data-color]');
    if(label) label.textContent=COLORS.find(x=>x[1]===b.dataset.color)?.[0]||'Black';
  });
}

function visual(k, extra='') {
  return `<div class="tone-image product-visual sprite-${k} tone-black ${extra}" role="img" aria-label="GRIPORA ${DATA[k].title}"></div>`;
}

function category() {
  const root=document.querySelector('[data-category]');
  if(!root) return;
  const k=root.dataset.category, c=DATA[k];
  document.title=`${c.title} | GRIPORA`;
  document.body.insertAdjacentHTML('afterbegin',header('cat'));
  root.innerHTML=`<section class="cat-hero sprite-${k}"><div class="inner">
    <a class="back" href="categories.html">← Back to Categories</a>
    <p class="eyebrow">GRIPORA PERFORMANCE SERIES</p><h1>${c.title}</h1><p class="lead">${c.tag}</p>
  </div></section>
  <main class="cat-main"><div class="sectitle"><b>${c.n}</b> ${c.title}</div><div class="grid">
  ${c.models.map((m,i)=>`<article class="card" data-card>
    <a href="product.html?category=${k}&model=${i}"><div class="photo">${visual(k,`model-${i}`)}<span class="stamp">GRIPORA</span></div></a>
    <div class="copy"><span class="kind">${c.title.toUpperCase()}</span><h3>${m[0]}</h3><p>${m[1]}</p>
      <div class="colors"><b>Colors:</b>${swatches()}</div><div class="sizes"><b>Sizes:</b> S · M · L · XL</div>
      <a class="btn primary" href="product.html?category=${k}&model=${i}">I'm Interested →</a>
    </div></article>`).join('')}
  </div></main>${foot()}`;
  wire();
}

function categories() {
  const root=document.querySelector('[data-categories]');
  if(!root) return;
  document.body.insertAdjacentHTML('afterbegin',header('cat'));
  root.innerHTML=`<section class="catselect"><p class="eyebrow">GRIPORA COLLECTION</p><h1>Choose Your Category</h1>
  <p class="lead">Four specialist categories. Four different models in each category. Four color options for every model.</p></section>
  <section class="selectgrid">${Object.entries(DATA).map(([k,c])=>`<a class="selectcard sprite-${k}" href="${k}.html">
    <div><p class="eyebrow">${c.n} · GRIPORA</p><h2>${c.title}</h2><span>Explore 4 models →</span></div></a>`).join('')}</section>${foot()}`;
  wire();
}

function product() {
  const root=document.querySelector('[data-product]');
  if(!root) return;
  const q=new URLSearchParams(location.search);
  const k=DATA[q.get('category')]?q.get('category'):'fitness';
  const i=Math.min(3,Math.max(0,Number(q.get('model'))||0));
  const c=DATA[k], m=c.models[i];
  document.title=`${m[0]} | GRIPORA`;
  document.body.insertAdjacentHTML('afterbegin',header('cat'));
  root.innerHTML=`<main class="detail" data-card><div class="crumbs"><a href="categories.html">Categories</a> › <a href="${k}.html">${c.title}</a> › ${m[0]}</div>
    <section class="detailgrid"><div>
      <div class="mainphoto">${visual(k,`model-${i}`)}<span class="stamp">GRIPORA</span></div>
      <div class="thumbs">${COLORS.map(c=>`<button data-tone="${c[1]}" aria-label="${c[0]} color"><div class="product-visual sprite-${k} tone-${c[1]}"></div></button>`).join('')}</div>
    </div><div class="info"><p class="eyebrow">${c.title}</p><h1>${m[0]}</h1><p class="desc">${m[1]}</p>
      <div class="features"><b><span>✓</span> Enhanced Grip</b><b><span>✓</span> Protective Comfort</b><b><span>✓</span> Secure Fit</b></div>
      <div class="option"><label>Available Colors</label>${swatches()}<p>Select a color: <b data-color>Black</b></p></div>
      <div class="option"><label>Size Options</label><div class="sizebtns">${['S','M','L','XL'].map((s,j)=>`<button ${j?'':'class="selected"'}>${s}</button>`).join('')}</div></div>
      <a class="btn primary" href="index.html#contact">I'm Interested →</a>
      <div class="quality"><span>✓ High quality materials</span><span>✓ Durable & long lasting</span><span>✓ Comfortable all-day wear</span><span>✓ Engineered for performance</span></div>
    </div></section></main>${foot()}`;
  wire();
  root.querySelectorAll('.sizebtns button').forEach(b=>b.onclick=()=>{root.querySelectorAll('.sizebtns button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')});
  root.querySelectorAll('.thumbs button').forEach(b=>b.onclick=()=>tone(root.querySelector('.mainphoto .tone-image'),b.dataset.tone));
}

category();
categories();
product();
wire();
