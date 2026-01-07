// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Teacher modal
(function () {
  const teacherCards = document.querySelectorAll('.teacher-card');
  const modal = document.getElementById('teacherModal');
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

      if (modal && modalImg && modalName) {
        modalImg.src = src;
        modalName.textContent = name;
        modalDept.textContent = dept;
        modalAch.textContent = ach;
        modal.style.display = 'flex';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
})();

// Reveal on scroll
(function () {
  const revealElems = document.querySelectorAll('.card, .teacher-card, .org-box, .faculty-officers, .important-card, .expect-item, .accordion-item');
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
    el.style.transform = 'translateY(12px)';
    io.observe(el);
  });
})();

// Accordion behavior (one open at a time, animated)
(function () {
  const accordion = document.getElementById('calendarAccordion');
  if (!accordion) return;
  const items = accordion.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel = item.querySelector('.accordion-panel');
    const toggle = header.querySelector('.accordion-toggle');

    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';

      // Close all
      items.forEach(i => {
        const h = i.querySelector('.accordion-header');
        const p = i.querySelector('.accordion-panel');
        const t = h.querySelector('.accordion-toggle');
        h.setAttribute('aria-expanded', 'false');
        t.textContent = '+';
        p.style.maxHeight = null;
        p.classList.remove('open');
      });

      // If was closed, open this
      if (!isOpen) {
        header.setAttribute('aria-expanded', 'true');
        toggle.textContent = '−';
        // set max-height to scrollHeight for smooth animation
        panel.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });

    // set initial maxHeight (collapsed)
    panel.style.maxHeight = null;
  });

  // Optional: open the first month by default
  const firstHeader = accordion.querySelector('.accordion-item .accordion-header');
  if (firstHeader) firstHeader.click();
})();

// ========== STUDENT PORTAL LOGIN SYSTEM ==========
(function () {
  const loginForm = document.getElementById("loginForm");
  const dashboard = document.getElementById("dashboard");
  const loginSection = document.getElementById("login-section");
  const loginError = document.getElementById("loginError");
  const logoutBtn = document.getElementById("logoutBtn");
  const studentName = document.getElementById("studentName");

  // Check if user already logged in
  if (localStorage.getItem("isLoggedIn") === "true") {
    loginSection.style.display = "none";
    dashboard.style.display = "block";
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "Charlez Bade" && password === "papasaramipls") {
      localStorage.setItem("isLoggedIn", "true");
      loginError.textContent = "";
      loginSection.style.display = "none";
      dashboard.style.display = "block";
      studentName.textContent = username;
    } else {
      loginError.textContent = "Invalid username or password.";
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    loginSection.style.display = "block";
    dashboard.style.display = "none";
  });
})();
