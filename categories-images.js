(()=>{
  const IMAGES={
    cycling:'assets/cycling-m1-blue.png',
    winter:'winter-m1-brown.png',
    fitness:'assets/fitness-m1-blue.png',
    player:'assets/player-m1-black.png',
    fullfinger:'assets/mtb-core.webp'
  };

  const VERSION='20260828-fullfinger-1';

  function addImage(card,key,file){
    if(!card || !file) return;
    let img=card.querySelector(':scope > img.category-real-image');
    if(!img){
      img=document.createElement('img');
      img.className='category-real-image';
      img.alt=`GRIPORA ${key} gloves`;
      img.style.position='absolute';
      img.style.inset='0';
      img.style.width='100%';
      img.style.height='100%';
      img.style.objectFit='cover';
      img.style.objectPosition='center';
      img.style.display='block';
      img.style.zIndex='0';
      img.style.pointerEvents='none';
      card.insertBefore(img,card.firstChild);
    }
    img.src=`${file}?v=${VERSION}`;
  }

  function init(){
    const root=document.querySelector('[data-categories]');
    if(!root) return;
    Object.entries(IMAGES).forEach(([key,file])=>{
      addImage(document.querySelector(`.selectcard.sprite-${key}`),key,file);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));
  else setTimeout(init,0);
})();
