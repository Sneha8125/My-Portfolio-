// ============================================================================
// Sneha Mirani Portfolio — vanilla JS interactions
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initNavbarScroll();
  initMobileNav();
  initThemeToggle();
  initScrollReveal();
  initSkillBars();
  initBackToTop();
  initContactForm();
  initSmoothAnchors();
});

// ---- Footer year -----------------------------------------------------------
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ---- Navbar background on scroll -------------------------------------------
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- Mobile nav toggle -------------------------------------------------------
function initMobileNav() {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Dark / light theme toggle ----------------------------------------------
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const stored = getStoredTheme();

  const preferred = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.setAttribute('data-theme', preferred);

  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    setStoredTheme(next);
  });
}

// In-memory fallback since localStorage may be unavailable in some sandboxes;
// still attempts localStorage first for a real multi-visit site.
let memoryTheme = null;
function getStoredTheme() {
  try {
    return window.localStorage.getItem('sm-theme') || memoryTheme;
  } catch (e) {
    return memoryTheme;
  }
}
function setStoredTheme(value) {
  memoryTheme = value;
  try {
    window.localStorage.setItem('sm-theme', value);
  } catch (e) {
    /* ignore — memory fallback already set */
  }
}

// ---- Scroll reveal animations -------------------------------------------------
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-text, .mini-card, .timeline-item, ' +
    '.skill-category, .project-card, .exp-card, .cert-badge, .contact-links, .contact-form'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

// ---- Animate skill bars once visible ------------------------------------------
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;

  if (!('IntersectionObserver' in window)) {
    bars.forEach((b) => b.classList.add('animate'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((b) => observer.observe(b));
}

// ---- Back to top button ---------------------------------------------------
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const onScroll = () => {
    btn.classList.toggle('visible', window.scrollY > 480);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Contact form validation (client-side only, no backend) -------------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const successEl = document.getElementById('formSuccess');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your name.');
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Please enter your email.');
      valid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, messageError, 'Please add a short message.');
      valid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'Message should be at least 10 characters.');
      valid = false;
    } else {
      clearError(messageInput, messageError);
    }

    return valid;
  }

  function showError(input, errorEl, msg) {
    input.classList.add('invalid');
    errorEl.textContent = msg;
  }
  function clearError(input, errorEl) {
    input.classList.remove('invalid');
    errorEl.textContent = '';
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('blur', validate);
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) validate();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      successEl.textContent = '';
      return;
    }

    // No backend is wired up — this simulates a send so the form is fully
    // functional to test. Wire this up to a form service (Formspree, etc.)
    // or your own endpoint to actually deliver messages.
    successEl.textContent = `Thanks, ${nameInput.value.trim().split(' ')[0]}! Your message is ready to send — connect a form backend to deliver it.`;
    form.reset();
  });
}

// ---- Smooth-scroll for in-page anchors (fallback for older browsers) ----------
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
