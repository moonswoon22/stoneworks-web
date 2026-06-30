/**
 * Internal nav: slide content up, then navigate. Subpages: fade/slide in on load.
 */
(function () {
  const EXIT_DURATION_MS = 520;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initEnter() {
    if (!document.body.classList.contains('page-enter')) return;
    if (prefersReducedMotion()) {
      document.body.classList.add('page-enter-visible');
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('page-enter-visible');
      });
    });
  }

  function normalizePath(pathname) {
    let p = pathname;
    if (p.endsWith('index.html')) {
      p = p.replace(/\/?index\.html$/, '') || '/';
    }
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  }

  function isInternalNavHref(href) {
    if (!href || href === '#' || href.startsWith('javascript:')) return false;
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return false;
    }
    if (url.origin !== window.location.origin) return false;
    const a = normalizePath(url.pathname);
    const b = normalizePath(window.location.pathname);
    if (a === b && url.search === window.location.search) return false;
    return true;
  }

  function navigateWithExit(href) {
    if (!isInternalNavHref(href) || prefersReducedMotion()) {
      window.location.href = href;
      return;
    }

    document.body.classList.add('nav-exit');

    const slideEl =
      document.querySelector('.page-top') || document.querySelector('.page-foreground');
    if (!slideEl) {
      window.location.href = href;
      return;
    }

    let navigated = false;
    function go() {
      if (navigated) return;
      navigated = true;
      window.location.href = href;
    }

    const fallback = setTimeout(go, EXIT_DURATION_MS + 150);

    function onTransitionEnd(ev) {
      if (ev.target !== slideEl || ev.propertyName !== 'transform') return;
      clearTimeout(fallback);
      slideEl.removeEventListener('transitionend', onTransitionEnd);
      go();
    }

    slideEl.addEventListener('transitionend', onTransitionEnd);
  }

  function initExit() {
    document.body.addEventListener('click', (e) => {
      const a = e.target.closest('a.nav-link, a.home-button');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!isInternalNavHref(href)) return;
      if (prefersReducedMotion()) return;

      e.preventDefault();
      navigateWithExit(href);
    });

    document.querySelectorAll('.nav-select').forEach((select) => {
      select.addEventListener('change', () => {
        const href = select.value;
        if (!href || !isInternalNavHref(href)) return;
        navigateWithExit(href);
      });
    });
  }

  function boot() {
    initEnter();
    initExit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
