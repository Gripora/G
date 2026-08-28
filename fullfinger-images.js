(()=>{
  const MODELS=[
    'assets/mtb-core.webp',
    'assets/mtb-contour.webp',
    'assets/mtb-air.webp',
    'assets/mtb-apex.webp'
  ];

  const VERSION='20260828-fullfinger-1';
  const imageUrl=file=>`${file}?v=${VERSION}`;

  function applyImage(el,file,mode='cover'){
    if(!el || !file) return;
    el.classList.remove('tone-black','tone-blue','tone-red','tone-green');
    el.style.setProperty('background-image',`url("${imageUrl(file)}")`,'important');
    el.style.setProperty('background-size',mode,'important');
    el.style.setProperty('background-position','center','important');
    el.style.setProperty('background-repeat','no-repeat','important');
    el.style.setProperty('background-color','#f4f4f2','important');
    el.style.setProperty('filter','none','important');
    el.style.setProperty('transform','none','important');
  }

  function setupCategoryPage(){
    const root=document.querySelector('[data-category="fullfinger"]');
    if(!root) return false;
    applyImage(root.querySelector('.cat-hero.sprite-fullfinger'),MODELS[0],'cover');
    root.querySelectorAll('.cat-main .card').forEach((card,i)=>{
      applyImage(card.querySelector('.tone-image'),MODELS[i],'cover');
    });
    return true;
  }

  function setupProductPage(){
    const root=document.querySelector('[data-product]');
    if(!root) return false;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='fullfinger') return false;
    const i=Math.min(3,Math.max(0,Number(q.get('model'))||0));
    const main=root.querySelector('.mainphoto .tone-image');
    applyImage(main,MODELS[i],'contain');
    applyImage(root.querySelector('.thumbs .product-visual'),MODELS[i],'cover');
    return true;
  }

  function init(){
    setupCategoryPage();
    setupProductPage();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));
  else setTimeout(init,0);
})();
