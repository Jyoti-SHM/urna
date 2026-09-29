const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.12});
reveals.forEach(el=>io.observe(el));

const modal = document.getElementById('modal');
const modalImg = modal.querySelector('img');
const modalDownload = modal.querySelector('.modal-download');
const modalCopy = modal.querySelector('.modal-copy');
function openModal(src){modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); modalCopy.classList.remove('active'); modalCopy.innerHTML=''; modalImg.style.display='block'; modalDownload.style.display='inline-flex'; modalImg.src = src; modalDownload.href = src;}
function openTextModal(title, copy){modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); modalImg.style.display='none'; modalImg.src=''; modalDownload.style.display='none'; modalCopy.classList.add('active'); modalCopy.innerHTML = `<h3>${title}</h3><p>${copy}</p>`;}
document.querySelectorAll('[data-img]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.img)));
document.querySelectorAll('[data-poster]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.poster)));
document.querySelectorAll('[data-title][data-copy]').forEach(btn=>btn.addEventListener('click',()=>openTextModal(btn.dataset.title, btn.dataset.copy)));
modal.querySelector('.close').addEventListener('click',()=>{modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); modalImg.src=''; modalCopy.innerHTML=''; modalCopy.classList.remove('active');});
modal.addEventListener('click',(e)=>{if(e.target===modal) modal.querySelector('.close').click();});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape') modal.querySelector('.close').click();});
