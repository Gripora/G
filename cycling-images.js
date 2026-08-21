(()=>{
  const MODELS=[
    [
      ['Blue','blue','#1f66d1','assets/cycling-m1-blue.png'],
      ['Green','green','#65b72e','assets/cycling-m1-green.png'],
      ['Grey','grey','#9aa0a6','assets/cycling-m1-grey.png'],
      ['Red','red','#d52b32','assets/cycling-m1-red.png']
    ],
    [
      ['Blue','blue','#1f66d1','assets/cycling-m2-blue.png'],
      ['Green','green','#65b72e','assets/cycling-m2-green.png'],
      ['Orange','orange','#f28c28','assets/cycling-m2-orange.png'],
      ['Red','red','#d52b32','assets/cycling-m2-red.png']
    ],
    [
      ['Blue','blue','#1f66d1','assets/cycling-m3-blue.png'],
      ['Green','green','#65b72e','assets/cycling-m3-green.png'],
      ['Red','red','#d52b32','assets/cycling-m3-red.png'],
      ['White','white','#ffffff','assets/cycling-m3-white.png']
    ],
    [
      ['Black','black','#111418','assets/cycling-m4-black.png'],
      ['Blue','blue','#1f66d1','assets/cycling-m4-blue.png'],
      ['Green','green','#65b72e','assets/cycling-m4-green.png'],
      ['Grey','grey','#9aa0a6','assets/cycling-m4-grey.png']
    ]
  ];

  const VERSION='20260821-cycling-1';
  const imageUrl=file=>`${file}?v=${VERSION}`;

  function applyImage(el,file,mode='cover'){
    if(!el) return;
    el.classList.remove('tone-black','tone-blue','tone-red','tone-green');
    el.style.setProperty('background-image',`url("${imageUrl(file)}")`,'important');
    el.style.setProperty('background-size',mode,'important');
    el.style.setProperty('background-position','center','important');
    el.style.setProperty('background-repeat','no-repeat','important');
    el.style.setProperty('background-color','#050505','important');
    el.style.setProperty('filter','none','important');
    el.style.setProperty('transform','none','important');
  }

  function makeSwatches(container,colors,onPick){
    if(!container) return;
    container.innerHTML=colors.map((c,i)=>`<button class="swatch ${i===0?'selected':''}" style="--sw:${c[2]}" data-real-color="${c[1]}" title="${c[0]}" aria-label="${c[0]}"></button>`).join('');
    container.querySelectorAll('.swatch').forEach((b,idx)=>{
      b.onclick=e=>{
        e.preventDefault();
        e.stopPropagation();
        container.querySelectorAll('.swatch').forEach(x=>x.classList.remove('selected'));
        b.classList.add('selected');
        onPick(colors[idx]);
      };
    });
  }

  function setupCategoryPage(){
    const root=document.querySelector('[data-category="cycling"]');
    if(!root) return false;
    document.querySelectorAll('.cat-main .card').forEach((card,i)=>{
      const colors=MODELS[i];
      if(!colors) return;
      const visual=card.querySelector('.tone-image');
      applyImage(visual,colors[0][3],'cover');
      const swatchBox=card.querySelector('.swatches');
      makeSwatches(swatchBox,colors,c=>applyImage(visual,c[3],'cover'));
    });
    return true;
  }

  function setupProductPage(){
    const root=document.querySelector('[data-product]');
    if(!root) return false;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='cycling') return false;
    const i=Math.min(3,Math.max(0,Number(q.get('model'))||0));
    const colors=MODELS[i];
    const main=root.querySelector('.mainphoto .tone-image');
    applyImage(main,colors[0][3],'contain');

    const thumbs=root.querySelector('.thumbs');
    if(thumbs){
      thumbs.innerHTML=colors.map(c=>`<button type="button" aria-label="${c[0]} color"><div class="product-visual" style="background-image:url('${imageUrl(c[3])}');background-size:cover;background-position:center;background-repeat:no-repeat;filter:none"></div></button>`).join('');
      thumbs.querySelectorAll('button').forEach((b,idx)=>b.onclick=()=>applyImage(main,colors[idx][3],'contain'));
    }

    const option=root.querySelector('.option .swatches');
    const label=root.querySelector('[data-color]');
    if(label) label.textContent=colors[0][0];
    makeSwatches(option,colors,c=>{
      applyImage(main,c[3],'contain');
      if(label) label.textContent=c[0];
    });
    return true;
  }

  function init(){
    setupCategoryPage();
    setupProductPage();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));
  else setTimeout(init,0);
})();
