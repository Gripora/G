(()=>{
  const categoryPages={fullfinger:'fullfinger.html',cycling:'cycling.html',fitness:'fitness.html',winter:'winter.html'};
  const seoTitles={
    'fullfinger.html':'Full-Finger MTB Gloves Manufacturer | GRIPORA',
    'cycling.html':'Custom Cycling Gloves Manufacturer | GRIPORA',
    'fitness.html':'Fitness & Training Gloves Manufacturer | GRIPORA',
    'winter.html':'Winter Gloves Manufacturer | GRIPORA'
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

  document.querySelectorAll('.footer-meta span').forEach(el=>{
    if(el.textContent.includes('Dummy redesign preview'))el.textContent='*Final MOQ depends on materials and customization.';
  });

  if(['cycling.html','fitness.html','winter.html','fullfinger.html'].includes(path)&&location.search){
    history.replaceState(null,'',path);
  }
})();
