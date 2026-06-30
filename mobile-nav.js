/**
 * Mobile hamburger drawer — slides in from the left.
 */
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer = document.getElementById('site-drawer');
  const backdrop = document.querySelector('.nav-drawer-backdrop');

  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-drawer-open');

    if (backdrop) {
      backdrop.removeAttribute('hidden');
      requestAnimationFrame(() => backdrop.classList.add('is-visible'));
    }
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-drawer-open');

    if (backdrop) {
      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('hidden', '');
    }
  }

  function toggleDrawer() {
    if (drawer.classList.contains('is-open')) closeDrawer();
    else openDrawer();
  }

  hamburger.addEventListener('click', toggleDrawer);

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  drawer.querySelectorAll('a.nav-drawer-link, a.nav-drawer-home').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
})();
