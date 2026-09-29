const lightbox=document.getElementById('lightbox'),lbImg=lightbox.querySelector('img');document.querySelectorAll('.mosaic img,.lightbox-trigger').forEach(el=>el.onclick=()=>{lbImg.src=el.dataset.img||el.src;lightbox.classList.add('open')});lightbox.querySelector('button').onclick=()=>lightbox.classList.remove('open');lightbox.onclick=e=>{if(e.target===lightbox)lightbox.classList.remove('open')};
const modal=document.getElementById('modal'),mt=document.getElementById('modal-title'),mc=document.getElementById('modal-copy');const content={consume:['Lower consumption','Using less air-conditioning because the home is designed to stay cooler. That means more comfort and lower monthly bills.'],energy:['Clean energy','Using less conventional energy because solar infrastructure supports homes and common areas. That means lower dependence and better long-term value.'],water:['Circular water','Mumbai is water-stressed. 71P is designed around collection, treatment and reuse so every drop works harder for the community.'],food:['Local food','Fresh greens closer to home. Balcony-to-table freshness reduces food miles and adds a new kind of everyday luxury.'],materials:['Responsible materials','Thoughtful materials and finishes can help keep homes cooler, healthier and more comfortable.'],offsets:['Measured offsets','What cannot be reduced must be measured, accounted for and offset transparently as the project evolves.'],'poster-food':['Explore the Earth system','This will open the Homes that grow food poster or detailed vertical farm explainer.'],'poster-water':['Explore the Water system','This will open the Homes that save water poster or detailed water loop explainer.'],'poster-energy':['Explore the Energy system','This will open the Homes that save energy poster or solar explainer.'],'poster-air':['Explore the Air system','This will open the Homes that breathe poster or clean air explainer.'],'poster-space':['Explore the Space system','This will open the Homes that love space poster or space explainer.']};document.querySelectorAll('[data-modal]').forEach(b=>b.onclick=()=>{let d=content[b.dataset.modal];mt.textContent=d[0];mc.textContent=d[1];modal.classList.add('open')});const cluster={life:['Life at 71P/Urna','A future version of One Day in an Urna Home can open here.'],community:['Community','A story of shared spaces, neighbours and belonging can open here.'],future:['Future at 71P/Urna','A 20-year view of value, resilience and future-readiness can open here.']};document.querySelectorAll('[data-cluster]').forEach(b=>b.onclick=()=>{let d=cluster[b.dataset.cluster];mt.textContent=d[0];mc.textContent=d[1];modal.classList.add('open')});document.querySelector('.close').onclick=()=>modal.classList.remove('open');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('open')};


const impactToggle = document.querySelector('.impact-toggle');
const impactPanel = document.getElementById('impact-panel');
if (impactToggle && impactPanel) {
  impactToggle.addEventListener('click', () => {
    impactPanel.classList.toggle('open');
    impactToggle.textContent = impactPanel.classList.contains('open') ? 'Hide the 20-year impact' : 'Reveal the 20-year impact';
  });
}

const systemsScroll = document.querySelector('.systems-scroll');
const trackerItems = document.querySelectorAll('.systems-tracker span');
if (systemsScroll && trackerItems.length) {
  systemsScroll.addEventListener('scroll', () => {
    const index = Math.round(systemsScroll.scrollLeft / window.innerWidth);
    trackerItems.forEach((item, i) => item.classList.toggle('active', i === index));
  });
}


// v3.2 — zoomable poster viewer
const posterViewer = document.getElementById('poster-viewer');
const posterImg = document.getElementById('poster-img');
const posterClose = document.querySelector('.poster-close');
let posterScale = 1;
let posterX = 0;
let posterY = 0;
let isDraggingPoster = false;
let dragStartX = 0;
let dragStartY = 0;

function updatePosterTransform() {
  if (!posterImg) return;
  posterImg.style.transform = `translate(${posterX}px, ${posterY}px) scale(${posterScale})`;
}

function resetPosterView() {
  posterScale = 1;
  posterX = 0;
  posterY = 0;
  updatePosterTransform();
}

document.querySelectorAll('[data-poster]').forEach(button => {
  button.addEventListener('click', () => {
    posterImg.src = button.dataset.poster;
    posterViewer.classList.add('open');
    resetPosterView();
  });
});

if (posterClose) {
  posterClose.addEventListener('click', () => posterViewer.classList.remove('open'));
}

if (posterViewer) {
  posterViewer.addEventListener('click', (e) => {
    if (e.target === posterViewer) posterViewer.classList.remove('open');
  });
  posterViewer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    posterScale = Math.min(4, Math.max(0.65, posterScale + delta));
    updatePosterTransform();
  }, { passive:false });
}

document.querySelectorAll('[data-zoom]').forEach(btn => {
  btn.addEventListener('click', () => {
    posterScale += btn.dataset.zoom === 'in' ? 0.25 : -0.25;
    posterScale = Math.min(4, Math.max(0.65, posterScale));
    updatePosterTransform();
  });
});

if (posterImg) {
  posterImg.addEventListener('mousedown', (e) => {
    isDraggingPoster = true;
    dragStartX = e.clientX - posterX;
    dragStartY = e.clientY - posterY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDraggingPoster) return;
    posterX = e.clientX - dragStartX;
    posterY = e.clientY - dragStartY;
    updatePosterTransform();
  });
  window.addEventListener('mouseup', () => isDraggingPoster = false);

  posterImg.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    isDraggingPoster = true;
    dragStartX = e.touches[0].clientX - posterX;
    dragStartY = e.touches[0].clientY - posterY;
  }, { passive:true });
  window.addEventListener('touchmove', (e) => {
    if (!isDraggingPoster || e.touches.length !== 1) return;
    posterX = e.touches[0].clientX - dragStartX;
    posterY = e.touches[0].clientY - dragStartY;
    updatePosterTransform();
  }, { passive:true });
  window.addEventListener('touchend', () => isDraggingPoster = false);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && posterViewer && posterViewer.classList.contains('open')) {
    posterViewer.classList.remove('open');
  }
});
