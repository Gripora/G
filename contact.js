(()=>{
  const DEST_EMAIL=atob('Z3JpcG9yYThAZ21haWwuY29t');
  const DEST_WHATSAPP=atob('OTIzMTI3NDQ0NzY5');

  function value(el){ return (el?.value||'').trim(); }

  function buildMessage(form){
    const name=value(form.querySelector('input[placeholder="Your name"]'));
    const customerEmail=value(form.querySelector('input[type="email"]'));
    const category=value(form.querySelector('select:not(#contact-method)'));
    const company=value(form.querySelector('input[placeholder="Company / Country"]'));
    const message=value(form.querySelector('textarea'));
    return [
      'GRIPORA Product Enquiry',
      '',
      `Name: ${name}`,
      `Email: ${customerEmail}`,
      `Category: ${category}`,
      `Company / Country: ${company||'-'}`,
      '',
      'Requirement:',
      message||'-'
    ].join('\n');
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

    form.onsubmit=e=>{
      e.preventDefault();
      if(!form.reportValidity()) return false;
      const text=buildMessage(form);

      if(method.value==='whatsapp'){
        if(status) status.textContent='Opening WhatsApp with your enquiry...';
        window.open(`https://wa.me/${DEST_WHATSAPP}?text=${encodeURIComponent(text)}`,'_blank','noopener');
      }else{
        if(status) status.textContent='Opening your email app with your enquiry...';
        const subject=encodeURIComponent('GRIPORA Product Enquiry');
        window.location.href=`mailto:${DEST_EMAIL}?subject=${subject}&body=${encodeURIComponent(text)}`;
      }
      return false;
    };
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
