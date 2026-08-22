(()=>{
  const DEST_EMAIL=atob('Z3JpcG9yYThAZ21haWwuY29t');
  const DEST_WHATSAPP=atob('OTIzMTI3NDQ0NzY5');
  const EMAIL_ENDPOINT=`https://formsubmit.co/ajax/${DEST_EMAIL}`;

  function value(el){ return (el?.value||'').trim(); }

  function fields(form){
    return {
      name:value(form.querySelector('input[placeholder="Your name"]')),
      email:value(form.querySelector('input[type="email"]')),
      category:value(form.querySelector('select:not(#contact-method)')),
      company:value(form.querySelector('input[placeholder="Company / Country"]')),
      message:value(form.querySelector('textarea'))
    };
  }

  function buildMessage(form){
    const f=fields(form);
    return [
      'GRIPORA Product Enquiry',
      '',
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      `Category: ${f.category}`,
      `Company / Country: ${f.company||'-'}`,
      '',
      'Requirement:',
      f.message||'-'
    ].join('\n');
  }

  async function sendEmail(form,button,status){
    const f=fields(form);
    const oldText=button?.textContent||'Send Enquiry →';
    if(button){
      button.disabled=true;
      button.textContent='Sending...';
    }
    if(status) status.textContent='Sending your enquiry...';

    try{
      const response=await fetch(EMAIL_ENDPOINT,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body:JSON.stringify({
          name:f.name,
          email:f.email,
          category:f.category,
          'company / country':f.company||'-',
          requirement:f.message||'-',
          _subject:`GRIPORA Product Enquiry - ${f.category}`,
          _template:'table',
          _url:location.href
        })
      });

      const data=await response.json().catch(()=>({}));
      if(!response.ok || data.success===false){
        throw new Error(data.message||'Unable to send enquiry');
      }

      if(status) status.textContent='Thank you. Your enquiry has been sent successfully.';
      form.reset();
      const method=form.querySelector('#contact-method');
      if(method) method.value='email';
      if(button) button.textContent='Send Enquiry →';
    }catch(err){
      console.warn('GRIPORA email submission failed',err);
      if(status) status.textContent='We could not send your enquiry right now. Please try again.';
      if(button) button.textContent=oldText;
    }finally{
      if(button) button.disabled=false;
    }
  }

  function init(){
    const form=document.querySelector('#contact .form');
    if(!form) return;

    let method=form.querySelector('#contact-method');
    if(!method){
      method=document.createElement('select');
      method.id='contact-method';
      method.setAttribute('aria-label','Preferred contact method');
      method.className='contact-method';
      method.style.gridColumn='1 / -1';
      method.innerHTML='<option value="email">Contact by Email</option><option value="whatsapp">Contact by WhatsApp</option>';
      const textarea=form.querySelector('textarea');
      form.insertBefore(method,textarea);
    }

    const button=form.querySelector('button[type="submit"]');
    const status=form.querySelector('#status');

    const syncButton=()=>{
      if(!button) return;
      button.textContent=method.value==='whatsapp'?'Send via WhatsApp →':'Send Enquiry →';
    };
    method.addEventListener('change',syncButton);
    syncButton();

    form.onsubmit=async e=>{
      e.preventDefault();
      if(!form.reportValidity()) return false;

      if(method.value==='whatsapp'){
        const text=buildMessage(form);
        if(status) status.textContent='Opening WhatsApp with your enquiry...';
        window.open(`https://wa.me/${DEST_WHATSAPP}?text=${encodeURIComponent(text)}`,'_blank','noopener');
      }else{
        await sendEmail(form,button,status);
      }
      return false;
    };
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
