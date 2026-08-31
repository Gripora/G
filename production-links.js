(()=>{
  const categoryPages={fullfinger:'fullfinger.html',cycling:'cycling.html',fitness:'fitness.html',winter:'winter.html'};
  const seoTitles={
    'fullfinger.html':'Full-Finger MTB Gloves Manufacturer | GRIPORA',
    'cycling.html':'Custom Cycling Gloves Manufacturer | GRIPORA',
    'fitness.html':'Fitness & Training Gloves Manufacturer | GRIPORA',
    'winter.html':'Winter Gloves Manufacturer | GRIPORA'
  };
  const seoLeads={
    'fullfinger.html':'GRIPORA manufactures private-label full-finger MTB and cycling gloves in Sialkot, Pakistan, with custom printed or sublimated backhands, technical palms, silicone grip and sample development for performance brands.',
    'cycling.html':'GRIPORA manufactures private-label short-finger cycling gloves in Sialkot, Pakistan, with breathable backhands, padded synthetic palms, custom branding and low-MOQ sample development for cycling brands.',
    'fitness.html':'GRIPORA manufactures private-label fitness and training gloves in Sialkot, Pakistan, with palm protection, breathable materials, wrist-support options, custom branding and sample development for fitness brands.',
    'winter.html':'GRIPORA manufactures private-label winter and outdoor gloves in Sialkot, Pakistan, with insulated constructions, technical fabrics, reinforced palms, custom branding and sample development for outdoor brands.'
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

  if(seoLeads[path]){
    const lead=document.querySelector('.inner-hero-copy .lead');
    if(lead)lead.textContent=seoLeads[path];
  }

  document.querySelectorAll('.footer-meta span').forEach(el=>{
    if(el.textContent.includes('Dummy redesign preview'))el.textContent='*Final MOQ depends on materials and customization.';
  });

  if(['cycling.html','fitness.html','winter.html','fullfinger.html'].includes(path)&&location.search){
    history.replaceState(null,'',path);
  }
})();
