/* Header: mobile / tablet menu */
const nav=document.querySelector('.nav');
const toggle=document.querySelector('.nav-toggle');
if(nav&&toggle){
  const setOpen=open=>{
    nav.classList.toggle('menu-open',open);
    document.body.classList.toggle('menu-lock',open);
    toggle.setAttribute('aria-expanded',open);
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
  };
  toggle.addEventListener('click',()=>{nav.classList.add('menu-anim');setOpen(!nav.classList.contains('menu-open'))});
  nav.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
  matchMedia('(min-width:1101px)').addEventListener('change',e=>{nav.classList.remove('menu-anim');if(e.matches)setOpen(false)});
  const onScroll=()=>nav.classList.toggle('scrolled',scrollY>10);
  addEventListener('scroll',onScroll,{passive:true});onScroll();
}

/* Poster viewer: landscape poster on wide screens, portrait poster on phones */
const viewer=document.getElementById('poster-viewer');
const img=document.getElementById('poster-img');
if(viewer&&img){
  const portrait=matchMedia('(max-width:760px), (orientation:portrait) and (max-width:1100px)');
  document.querySelectorAll('[data-poster]').forEach(el=>el.addEventListener('click',e=>{
    e.preventDefault();
    img.src=(portrait.matches&&el.dataset.posterPortrait)||el.dataset.poster;
    viewer.classList.add('open');
  }));
  const close=()=>viewer.classList.remove('open');
  viewer.querySelector('.poster-close').onclick=close;
  viewer.onclick=e=>{if(e.target===viewer)close()};
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}

/* Horizontal rails with arrows */
document.querySelectorAll('.rail-arrows').forEach(ctrl=>{
  const rail=document.getElementById(ctrl.dataset.rail);
  if(!rail)return;
  const prev=ctrl.querySelector('.prev'),next=ctrl.querySelector('.next');
  const step=()=>{const c=rail.firstElementChild;return c?c.getBoundingClientRect().width+parseFloat(getComputedStyle(rail).columnGap||0):rail.clientWidth};
  prev.onclick=()=>rail.scrollBy({left:-step(),behavior:'smooth'});
  next.onclick=()=>rail.scrollBy({left:step(),behavior:'smooth'});
  const update=()=>{
    const max=rail.scrollWidth-rail.clientWidth-2;
    prev.disabled=rail.scrollLeft<=2;
    next.disabled=rail.scrollLeft>=max;
    ctrl.classList.toggle('idle',max<=0);
  };
  rail.addEventListener('scroll',update,{passive:true});
  addEventListener('resize',update);update();
});
