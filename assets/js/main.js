/**
 * Ernesto España — CV Web
 * Shared behavior: component loading, theme, language, navigation, icons.
 */

(function () {
  'use strict';

  const THEME_KEY = 'eespan-theme';
  const LANG_KEY = 'eespan-lang';

  /**
   * Load shared components (header/footer) into [data-include] placeholders.
   */
  async function loadComponents() {
    const placeholders = document.querySelectorAll('[data-include]');
    const loads = Array.from(placeholders).map(async (placeholder) => {
      const path = placeholder.getAttribute('data-include');
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        const html = await response.text();
        placeholder.insertAdjacentHTML('beforeend', html);
      } catch (error) {
        console.warn('Component load failed:', error);
      }
    });
    await Promise.all(loads);
  }

  /**
   * Theme handling
   */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getEffectiveTheme(stored) {
    if (stored === 'light' || stored === 'dark') return stored;
    return getSystemTheme();
  }

  function applyTheme(theme) {
    const effective = getEffectiveTheme(theme);
    document.documentElement.setAttribute('data-theme', effective);

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      const label = theme === 'system' ? 'System theme' : `${effective.charAt(0).toUpperCase() + effective.slice(1)} theme`;
      themeBtn.setAttribute('aria-label', label);
      themeBtn.title = label;
    }
  }

  function setTheme(theme) {
    const html = document.documentElement;
    html.classList.add('theme-transition');
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    if (window.lucide) lucide.createIcons();
    window.setTimeout(() => html.classList.remove('theme-transition'), 350);
  }

  function cycleTheme() {
    const stored = localStorage.getItem(THEME_KEY) || 'system';
    const order = { light: 'dark', dark: 'system', system: 'light' };
    setTheme(order[stored] || 'light');
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY) || 'system';
    applyTheme(stored);

    document.addEventListener('click', (event) => {
      const target = event.target.closest('#theme-toggle');
      if (target) cycleTheme();
    });

    // React to OS theme changes when in system mode.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const stored = localStorage.getItem(THEME_KEY) || 'system';
      applyTheme(stored);
    });
  }

  /**
   * Language handling
   */
  function setLanguage(lang) {
    if (!window.I18N || !window.I18N[lang]) return;
    localStorage.setItem(LANG_KEY, lang);

    document.documentElement.setAttribute('lang', lang);

    // Update buttons
    const btnEs = document.getElementById('lang-es');
    const btnEn = document.getElementById('lang-en');
    if (btnEs) {
      btnEs.classList.toggle('active', lang === 'es');
      btnEs.setAttribute('aria-pressed', String(lang === 'es'));
    }
    if (btnEn) {
      btnEn.classList.toggle('active', lang === 'en');
      btnEn.setAttribute('aria-pressed', String(lang === 'en'));
    }

    // Update text nodes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = window.I18N[lang][key];
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = window.I18N[lang][key];
      if (value !== undefined) {
        el.setAttribute('placeholder', value);
      }
    });

    // Update HTML title
    const titleKey = document.querySelector('title[data-i18n]');
    if (titleKey) {
      const key = titleKey.getAttribute('data-i18n');
      const value = window.I18N[lang][key];
      if (value !== undefined) document.title = value;
    }
  }

  function toggleLanguage(lang) {
    setLanguage(lang);
  }

  function initLanguage() {
    const stored = localStorage.getItem(LANG_KEY) || 'es';
    setLanguage(stored);

    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-lang]');
      if (target) {
        const lang = target.getAttribute('data-lang');
        toggleLanguage(lang);
      }
    });
  }

  /**
   * Navigation: highlight current page.
   */
  function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const target = href.split('/').pop() || 'index.html';
      if (target === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Mobile menu
   */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const panel = document.getElementById('mobile-nav');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a nav link
    panel.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * Lucide icons
   */
  function initLucide() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /**
   * Reveal elements on scroll using IntersectionObserver.
   * Respects prefers-reduced-motion.
   */
  function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealElements = document.querySelectorAll('.section, .card, .hero');
    revealElements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * Initialize everything after components are loaded.
   */
  function initApp() {
    initTheme();
    initLanguage();
    initNavigation();
    initMobileMenu();
    initLucide();
    initScrollAnimations();
  }

  /**
   * Entry point
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadComponents().then(initApp);
    });
  } else {
    loadComponents().then(initApp);
  }
})();
