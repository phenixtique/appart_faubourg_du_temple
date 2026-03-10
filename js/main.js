/* ============================================================
   AIRBNB APARTMENT GUIDE — Main JS
   - Bilingual toggle (FR / EN)
   - Active nav highlighting
   ============================================================ */

// ── Language ─────────────────────────────────────────────

function getLang() {
  return localStorage.getItem('lang') || 'fr';
}

function applyLang(lang) {
  // Body class drives CSS visibility of .lang-fr / .lang-en blocks
  document.body.classList.remove('lang-fr', 'lang-en');
  document.body.classList.add('lang-' + lang);

  // Update all simple text elements that carry data-en
  document.querySelectorAll('[data-en]').forEach(el => {
    // Cache the French text on first run
    if (!el.dataset.fr) {
      el.dataset.fr = el.textContent.trim();
    }
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.fr;
  });

  // Update <title>
  const titleEl = document.querySelector('title');
  if (titleEl && titleEl.dataset.en) {
    if (!titleEl.dataset.fr) titleEl.dataset.fr = titleEl.textContent.trim();
    titleEl.textContent = lang === 'en' ? titleEl.dataset.en : titleEl.dataset.fr;
  }

  // Update button label
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';

  // Update <html lang>
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
}

function toggleLang() {
  const next = getLang() === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', next);
  applyLang(next);
}

// Expose for onclick in HTML
window.toggleLang = toggleLang;

// ── Active nav ───────────────────────────────────────────

function setActiveNav() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item, .desktop-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const target = href.split('/').pop();
    if (target === filename || (filename === '' && target === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Init ─────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  applyLang(getLang());
  setActiveNav();
});
