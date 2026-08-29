(()=>{
  const PARTS=[
    'assets/mtb12-part-0.txt',
    'assets/mtb12-part-1.txt',
    'assets/mtb12-part-2.txt',
    'assets/mtb12-part-3.txt'
  ];
  const VERSION='20260829-3';

  function isFullFingerPage(){
    const q=new URLSearchParams(location.search);
    return q.get('category')==='fullfinger' || location.pathname.endsWith('/fullfinger.html');
  }

  async function addPdfCollection(){
    const root=document.querySelector('[data-dummy-category]');
    if(!root || !isFullFingerPage() || root.querySelector('.pdf-concept-gallery')) return;

    try{
      const parts=await Promise.all(PARTS.map(async path=>{
        const response=await fetch(`${path}?v=${VERSION}`,{cache:'no-store'});
        if(!response.ok) throw new Error(`Unable to load ${path}`);
        return (await response.text()).replace(/\s+/g,'');
      }));
      const source=`data:image/webp;base64,${parts.join('')}`;
      const section=document.createElement('section');
      section.className='pdf-concept-gallery';
      section.setAttribute('aria-label','Full-Finger MTB and Cycling concept image collection');
      const grid=document.createElement('div');
      grid.className='pdf-concept-grid';

      for(let row=0;row<4;row++){
        for(let col=0;col<3;col++){
          const tile=document.createElement('div');
          tile.className='pdf-concept-tile';
          tile.setAttribute('role','img');
          tile.setAttribute('aria-label',`GRIPORA Full-Finger MTB concept ${row*3+col+1}`);
          tile.style.backgroundImage=`url("${source}")`;
          tile.style.backgroundPosition=`${col*50}% ${row*(100/3)}%`;
          grid.appendChild(tile);
        }
      }

      section.appendChild(grid);
      const collection=root.querySelector('.collection');
      if(collection) collection.insertAdjacentElement('afterend',section);
    }catch(error){
      console.error('Full-Finger PDF image collection failed to load',error);
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',addPdfCollection,{once:true});
  }else{
    addPdfCollection();
  }
})();
