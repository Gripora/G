(()=>{
  const GROUPS={
    0:[
      'assets/fullfinger-core-1.webp?v=20260829-1',
      'assets/fullfinger-core-2.webp?v=20260829-1',
      'assets/fullfinger-core-3.webp?v=20260829-1'
    ],
    1:[
      'assets/fullfinger-contour-1.webp?v=20260829-1',
      'assets/fullfinger-contour-2.webp?v=20260829-1',
      'assets/fullfinger-contour-3.webp?v=20260829-1'
    ],
    2:[
      'assets/fullfinger-air-1.webp?v=20260829-1',
      'assets/fullfinger-air-2.webp?v=20260829-1',
      'assets/fullfinger-air-3.webp?v=20260829-1'
    ],
    3:[
      'assets/fullfinger-apex-1.webp?v=20260829-2',
      'assets/fullfinger-apex-2.webp?v=20260829-2',
      'assets/fullfinger-apex-3.webp?v=20260829-2'
    ]
  };

  function patchCategory(){
    const root=document.querySelector('[data-dummy-category]');
    if(!root) return;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='fullfinger' && !location.pathname.endsWith('/fullfinger.html')) return;

    const hero=root.querySelector('.inner-hero-media img');
    if(hero) hero.src=GROUPS[0][0];

    root.querySelectorAll('.model-card .model-media img').forEach((img,i)=>{
      if(GROUPS[i]) img.src=GROUPS[i][0];
    });
  }

  function patchProduct(){
    const root=document.querySelector('[data-dummy-product]');
    if(!root) return;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='fullfinger') return;

    const model=Math.max(0,Math.min(3,Number(q.get('model'))||0));
    const images=GROUPS[model];
    if(!images) return;

    const main=root.querySelector('[data-product-main]');
    if(main) main.src=images[0];

    const buttons=[...root.querySelectorAll('.color-thumbs button')];
    buttons.forEach((btn,i)=>{
      if(i<3){
        btn.hidden=false;
        const thumb=btn.querySelector('img');
        if(thumb) thumb.src=images[i];
        btn.addEventListener('click',()=>{
          if(main) main.src=images[i];
          buttons.forEach((b,j)=>b.classList.toggle('selected',j===i));
        });
      }else{
        btn.hidden=true;
      }
    });
  }

  patchCategory();
  patchProduct();
})();
