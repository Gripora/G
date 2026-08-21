(()=>{
  const MODELS=[
    [
      ['Black','black','#111418','winter-m1-black.png'],
      ['Brown','brown','#7a4f2b','winter-m1-brown.png'],
      ['Olive Green','olive-green','#66733b','winter-m1-olive-green.png'],
      ['Tan','tan','#c49a6c','winter-m1-tan.png']
    ],
    [
      ['Black','black','#111418','winter-m2-black.png'],
      ['Navy Blue','navy-blue','#172746','winter-m2-navy-blue.png'],
      ['Olive Green','olive-green','#66733b','winter-m2-olive-green.png'],
      ['Tan','tan','#c49a6c','winter-m2-tan.png']
    ],
    [
      ['Black','black','#111418','winter-m3-black.png'],
      ['Navy Blue','navy-blue','#172746','winter-m3-navy-blue.png'],
      ['Olive Green','olive-green','#66733b','winter-m3-olive-green.png'],
      ['Tan','tan','#c49a6c','assets/winter-m3-tan.png']
    ],
    [
      ['Black','black','#111418','winter-m4-black.png'],
      ['Grey','grey','#9aa0a6','winter-m4-grey.png'],
      ['Navy Blue','navy-blue','#172746','winter-m4-navy-blue.png'],
      ['Olive Green','olive-green','#66733b','winter-m4-olive-green.png']
    ]
  ];

  const VERSION='20260821-winter-direct-1';
  const imageUrl=file=>`${file}?v=${VERSION}`;

  function directImage(el,file,fit='contain'){
    if(!el) return;
    el.style.position='relative';
    el.style.backgroundColor='#fff';
    el.style.filter='none';
    el.style.transform='none';
    let img=el.querySelector(':scope > img.winter-real-image');
    if(!img){
      img=document.createElement('img');
      img.className='winter-real-image';
      img.alt='GRIPORA Winter Gloves';
      img.style.position='absolute';
      img.style.inset='0';
      img.style.width='100%';
      img.style.height='100%';
      img.style.objectPosition='center';
      img.style.display='block';
      img.style.background='#fff';
      img.style.zIndex='1';
      img.style.pointerEvents='none';
      el.appendChild(img);
    }
    img.style.objectFit=fit;
    img.src=imageUrl(file);
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
    const root=document.querySelector('[data-category="winter"]');
    if(!root) return false;
    document.querySelectorAll('.cat-main .card').forEach((card,i)=>{
      const colors=MODELS[i];
      if(!colors) return;
      const visual=card.querySelector('.tone-image');
      directImage(visual,colors[0][3],'contain');
      const swatchBox=card.querySelector('.swatches');
      makeSwatches(swatchBox,colors,c=>directImage(visual,c[3],'contain'));
    });
    return true;
  }

  function setupProductPage(){
    const root=document.querySelector('[data-product]');
    if(!root) return false;
    const q=new URLSearchParams(location.search);
    if(q.get('category')!=='winter') return false;
    const i=Math.min(3,Math.max(0,Number(q.get('model'))||0));
    const colors=MODELS[i];
    const main=root.querySelector('.mainphoto .tone-image');
    directImage(main,colors[0][3],'contain');

    const thumbs=root.querySelector('.thumbs');
    if(thumbs){
      thumbs.innerHTML=colors.map(c=>`<button type="button" aria-label="${c[0]} color"><img src="${imageUrl(c[3])}" alt="${c[0]} GRIPORA Winter Gloves" style="width:100%;height:100%;object-fit:contain;object-position:center;background:#fff;display:block"></button>`).join('');
      thumbs.querySelectorAll('button').forEach((b,idx)=>b.onclick=()=>directImage(main,colors[idx][3],'contain'));
    }

    const option=root.querySelector('.option .swatches');
    const label=root.querySelector('[data-color]');
    if(label) label.textContent=colors[0][0];
    makeSwatches(option,colors,c=>{
      directImage(main,c[3],'contain');
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
