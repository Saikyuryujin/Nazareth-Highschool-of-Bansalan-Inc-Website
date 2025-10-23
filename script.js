// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Teacher modal
const teacherCards = document.querySelectorAll('.teacher-card');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalDept = document.getElementById('modalDept');
const modalAch = document.getElementById('modalAch');
const modalClose = document.querySelector('.modal-close');

teacherCards.forEach(card => {
  card.addEventListener('click', () => {
    const name = card.dataset.name || card.querySelector('strong')?.textContent;
    const dept = card.dataset.dept || card.querySelector('span')?.textContent;
    const ach = card.dataset.ach || '';
    const src = card.dataset.img || card.querySelector('img')?.src;

    modalImg.src = src;
    modalName.textContent = name;
    modalDept.textContent = dept;
    modalAch.textContent = ach;
    modal.style.display = 'flex';
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => modal.style.display = 'none');
}
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

// Simple reveal on scroll
const revealElems = document.querySelectorAll('.card, .teacher-card, .org-box, .faculty-officers, .important-card, .expect-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      ent.target.style.opacity = 1;
      ent.target.style.transform = 'none';
      io.unobserve(ent.target);
    }
  });
}, { threshold: 0.12 });

revealElems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  io.observe(el);
});
