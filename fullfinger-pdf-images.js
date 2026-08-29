(()=>{
  const IMAGES=[
    'assets/mtb-pdf-core.webp',
    'assets/mtb-pdf-contour.webp',
    'assets/mtb-pdf-air.webp',
    'assets/mtb-pdf-apex.webp'
  ];

  function updateCategory(){
    const root=document.querySelector('[data-dummy-category]');
    if(!root) return;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='fullfinger' && !location.pathname.endsWith('/fullfinger.html')) return;

    const hero=root.querySelector('.inner-hero-media img');
    if(hero) hero.src=IMAGES[0];

    root.querySelectorAll('.model-card .model-media img').forEach((img,index)=>{
      if(IMAGES[index]) img.src=IMAGES[index];
    });
  }

  function updateProduct(){
    const root=document.querySelector('[data-dummy-product]');
    if(!root) return;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='fullfinger') return;

    const index=Math.max(0,Math.min(IMAGES.length-1,Number(q.get('model'))||0));
    const src=IMAGES[index];
    const main=root.querySelector('[data-product-main]');
    if(main) main.src=src;
    root.querySelectorAll('.color-thumbs img').forEach(img=>img.src=src);
  }

  updateCategory();
  updateProduct();
})();
