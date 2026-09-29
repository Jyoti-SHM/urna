const viewer=document.getElementById('poster-viewer');const img=document.getElementById('poster-img');
document.querySelectorAll('[data-poster]').forEach(btn=>btn.addEventListener('click',()=>{img.src=btn.dataset.poster;viewer.classList.add('open')}));
document.querySelector('.poster-close').onclick=()=>viewer.classList.remove('open');
viewer.onclick=e=>{if(e.target===viewer)viewer.classList.remove('open')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')viewer.classList.remove('open')});
