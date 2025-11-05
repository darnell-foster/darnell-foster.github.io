/* Desktop/tablet: cards open. Phones: closed & toggle. */
(function(){
  const mql = window.matchMedia('(max-width:640px)');
  function apply(){
    const cards = document.querySelectorAll('#experience .tl2__card');
    if (!cards.length) return;
    if (mql.matches){
      cards.forEach(d => d.removeAttribute('open'));   // phones → start closed
    } else {
      cards.forEach(d => d.setAttribute('open',''));    // larger → open
    }
  }
  window.addEventListener('load', apply, { once:true });
  mql.addEventListener('change', apply);
})();
