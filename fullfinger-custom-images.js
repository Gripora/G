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
      'assets/fullfinger-apex-1.webp?v=20260829-4',
      'assets/fullfinger-apex-2.webp?v=20260829-4',
      'assets/fullfinger-apex-3.webp?v=20260829-4'
    ]
  };

  const setImage=(img,src)=>{
    if(!img)return;
    img.removeAttribute('srcset');
    img.src=src;
  };

  function patchCategory(){
    const root=document.querySelector('[data-dummy-category]');
    if(!root)return;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='fullfinger'&&!location.pathname.endsWith('/fullfinger.html'))return;

    const hero=root.querySelector('.inner-hero-media img');
    setImage(hero,GROUPS[0][0]);

    root.querySelectorAll('.model-card .model-media img').forEach((img,i)=>{
      if(GROUPS[i])setImage(img,GROUPS[i][0]);
    });
  }

  function patchProduct(){
    const root=document.querySelector('[data-dummy-product]');
    if(!root)return;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='fullfinger')return;

    const model=Math.max(0,Math.min(3,Number(q.get('model'))||0));
    const images=GROUPS[model];
    if(!images)return;

    const main=root.querySelector('[data-product-main]');
    setImage(main,images[0]);

    const buttons=[...root.querySelectorAll('.color-thumbs button')];
    buttons.forEach((btn,i)=>{
      if(i<3){
        btn.hidden=false;
        const thumb=btn.querySelector('img');
        setImage(thumb,images[i]);
        btn.onclick=e=>{
          e.preventDefault();
          setImage(main,images[i]);
          buttons.forEach((b,j)=>b.classList.toggle('selected',j===i));
        };
      }else{
        btn.hidden=true;
      }
    });
  }

  const apply=()=>{patchCategory();patchProduct();};
  apply();
  requestAnimationFrame(apply);
  setTimeout(apply,150);
})();