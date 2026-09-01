(()=>{
  const categoryPages={fullfinger:'fullfinger.html',cycling:'cycling.html',fitness:'fitness.html',winter:'winter.html'};
  const seoTitles={
    'fullfinger.html':'Full-Finger MTB Gloves Manufacturer | GRIPORA',
    'cycling.html':'Custom Cycling Gloves Manufacturer | GRIPORA',
    'fitness.html':'Fitness & Training Gloves Manufacturer | GRIPORA',
    'winter.html':'Winter Gloves Manufacturer | GRIPORA'
  };
  const seoH1={
    'fullfinger.html':'Full-Finger MTB & Cycling Gloves Manufacturer',
    'cycling.html':'Custom Cycling Gloves Manufacturer',
    'fitness.html':'Fitness & Training Gloves Manufacturer',
    'winter.html':'Winter & Outdoor Gloves Manufacturer'
  };
  const seoLeads={
    'fullfinger.html':'GRIPORA manufactures private-label full-finger MTB and cycling gloves in Sialkot, Pakistan, with custom printed or sublimated backhands, technical palms, silicone grip and sample development for performance brands.',
    'cycling.html':'GRIPORA manufactures private-label short-finger cycling gloves in Sialkot, Pakistan, with breathable backhands, padded synthetic palms, custom branding and low-MOQ sample development for cycling brands.',
    'fitness.html':'GRIPORA manufactures private-label fitness and training gloves in Sialkot, Pakistan, with palm protection, breathable materials, wrist-support options, custom branding and sample development for fitness brands.',
    'winter.html':'GRIPORA manufactures private-label winter and outdoor gloves in Sialkot, Pakistan, with insulated constructions, technical fabrics, reinforced palms, custom branding and sample development for outdoor brands.'
  };
  const buyerInfo={
    'fullfinger.html':{
      heading:'Private-label MTB glove development for brands.',
      intro:'Designed for cycling brands, MTB labels, distributors and product teams looking for a Sialkot manufacturing partner for custom full-finger gloves.',
      items:[
        ['Custom development','Printed or sublimated backhands, custom colors, logos, labels and packaging can be developed around your brand brief.'],
        ['Palm & grip options','Synthetic suede or microfiber palms, reinforcement zones, silicone grip and touchscreen details can be specified during sampling.'],
        ['Sampling','Sample development is available for evaluation, with an approximate 14-day sample lead time.'],
        ['Commercial starting point','Starting MOQ is 50 pairs per design, subject to material and customization requirements.']
      ]
    },
    'cycling.html':{
      heading:'Custom cycling gloves for private-label programs.',
      intro:'GRIPORA supports cycling brands, clubs, distributors and sportswear companies developing branded short-finger cycling gloves for wholesale and private-label programs.',
      items:[
        ['Backhand customization','Breathable mesh and stretch constructions can be combined with custom colors, artwork and brand logos.'],
        ['Palm development','Synthetic suede or microfiber palms can be developed with padding, reinforcement zones and pull-tab options.'],
        ['Sampling','Sample development is available for evaluation, with an approximate 14-day sample lead time.'],
        ['Commercial starting point','Starting MOQ is 50 pairs per design, with bulk production typically around 60 days after approval.']
      ]
    },
    'fitness.html':{
      heading:'Private-label fitness glove manufacturing.',
      intro:'Developed for fitness brands, gym-equipment companies, distributors and retailers that need custom training or lifting gloves with their own branding.',
      items:[
        ['Construction options','Mesh, stretch fabrics and neoprene combinations can be selected around the required fit and support.'],
        ['Palm protection','Padding, reinforcement and grip options can be developed according to the intended training use.'],
        ['Branding','Custom logos, colors, labels and retail packaging are available for private-label programs.'],
        ['Commercial starting point','Starting MOQ is 50 pairs per design; sample development is typically around 14 days.']
      ]
    },
    'winter.html':{
      heading:'Custom winter gloves for outdoor brands.',
      intro:'GRIPORA develops private-label winter and outdoor gloves for brands, distributors and product teams requiring insulated constructions and custom branding.',
      items:[
        ['Material development','Technical fabrics, synthetic materials and leather options can be selected according to the required use.'],
        ['Warmth & lining','Insulation and lining can be developed around the target climate, warmth level and dexterity.'],
        ['Palm & cuff options','Reinforced palms, grip applications, short or extended cuffs and custom branding can be specified.'],
        ['Commercial starting point','Starting MOQ is 50 pairs per design, subject to final materials and customization.']
      ]
    }
  };

  document.querySelectorAll('a[href]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href)return;
    if(href.startsWith('dummy-product.html')){
      const u=new URL(href,location.href);
      a.setAttribute('href',`product.html?${u.searchParams.toString()}`);
      return;
    }
    if(href.startsWith('dummy-category.html')){
      const u=new URL(href,location.href);
      const key=u.searchParams.get('category');
      if(categoryPages[key])a.setAttribute('href',categoryPages[key]);
      return;
    }
    if(href==='dummy.html')a.setAttribute('href','index.html');
    else if(href.startsWith('dummy.html#'))a.setAttribute('href',`index.html${href.slice('dummy.html'.length)}`);
  });

  const path=location.pathname.split('/').pop()||'index.html';
  if(seoTitles[path]) document.title=seoTitles[path];
  else document.title=document.title.replace(' — GRIPORA Dummy',' | GRIPORA').replace(' — Dummy',' | GRIPORA');

  if(seoH1[path]){
    const h1=document.querySelector('.inner-hero-copy h1');
    if(h1)h1.textContent=seoH1[path];
  }
  if(seoLeads[path]){
    const lead=document.querySelector('.inner-hero-copy .lead');
    if(lead)lead.textContent=seoLeads[path];
  }

  if(buyerInfo[path]){
    const existing=document.querySelector('.seo-buyer-info');
    const anchor=document.querySelector('.category-info');
    if(!existing&&anchor){
      const info=buyerInfo[path];
      const section=document.createElement('section');
      section.className='category-info seo-buyer-info';
      section.innerHTML=`<div class="category-info-grid"><div><p class="eyebrow">PRIVATE LABEL & OEM</p><h2>${info.heading}</h2><p>${info.intro}</p></div><div class="spec-list">${info.items.map(item=>`<div class="spec-item"><b>${item[0]}</b><span>${item[1]}</span></div>`).join('')}</div></div>`;
      anchor.insertAdjacentElement('afterend',section);
    }
  }

  document.querySelectorAll('.footer-meta span').forEach(el=>{
    if(el.textContent.includes('Dummy redesign preview'))el.textContent='*Final MOQ depends on materials and customization.';
  });

  if(['cycling.html','fitness.html','winter.html','fullfinger.html'].includes(path)&&location.search){
    history.replaceState(null,'',path);
  }
})();
