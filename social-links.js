/**
 * Inject @stoneworksxx social links — header row on desktop, drawer footer on mobile.
 */
(function () {
  const SOCIAL = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/stoneworksxx',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8zm9.65 1.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>',
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@stoneworksxx',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66a5.25 5.25 0 0 0-5.25 5.25 5.25 5.25 0 0 0 5.25 5.2 5.2 5.2 0 0 0 5.2-5.2V9.01a7.27 7.27 0 0 0 4.12 1.38V7.3a4.85 4.85 0 0 1-1.05-.48z"/></svg>',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@stoneworksxx',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M21.6 7.2a2.8 2.8 0 0 0-1.97-1.98C17.64 4.8 12 4.8 12 4.8s-5.64 0-7.63.42A2.8 2.8 0 0 0 2.4 7.2 29.4 29.4 0 0 0 2 12a29.4 29.4 0 0 0 .4 4.8 2.8 2.8 0 0 0 1.97 1.98C6.36 19.2 12 19.2 12 19.2s5.64 0 7.63-.42a2.8 2.8 0 0 0 1.97-1.98A29.4 29.4 0 0 0 22 12a29.4 29.4 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg>',
    },
    {
      name: 'SoundCloud',
      href: 'https://soundcloud.com/stoneworksxx',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M11.56 15.5c-.15 0-.28.11-.3.26l-.45 2.78c-.02.15.09.29.24.31h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.24-.33h-.04zm-1.05 0a.31.31 0 0 0-.3.33l.18 2.78c.01.16.15.28.31.27h.03c.15-.01.27-.14.26-.29l-.18-2.78a.31.31 0 0 0-.3-.31zm2.1 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zm-3.15 0c-.16 0-.29.12-.3.28l.09 2.78c.01.16.14.28.3.27.16-.01.28-.15.27-.31l-.09-2.78a.31.31 0 0 0-.27-.24zm4.2 0c-.15 0-.28.11-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zm-5.25 0c-.16 0-.29.12-.3.28l.27 2.78c.01.16.14.28.3.27s.28-.15.27-.31l-.27-2.78a.31.31 0 0 0-.27-.24zm6.3 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zm-7.35 0a.31.31 0 0 0-.3.28l.45 2.78c.02.15.14.26.29.25.16-.01.28-.15.27-.31l-.45-2.78a.31.31 0 0 0-.26-.22zm8.4 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zm-9.45 0a.31.31 0 0 0-.3.28l.63 2.78c.03.15.17.25.32.22.16-.03.27-.18.24-.34l-.63-2.78a.31.31 0 0 0-.26-.16zm10.5 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zM4.86 15.5a.31.31 0 0 0-.3.28l.81 2.78c.04.15.19.25.34.21.16-.04.26-.2.22-.35l-.81-2.78a.31.31 0 0 0-.26-.23zm13.65 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zM3.71 15.5a.31.31 0 0 0-.3.28l.99 2.78c.05.15.21.24.36.19.16-.05.25-.22.2-.37l-.99-2.78a.31.31 0 0 0-.26-.1zm15.75 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zM2.56 15.5a.31.31 0 0 0-.3.28l1.17 2.78c.06.15.22.23.37.17.16-.06.24-.23.18-.39l-1.17-2.78a.31.31 0 0 0-.25-.06zm17.85 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35zM1.41 15.5a.31.31 0 0 0-.3.28l1.35 2.78c.07.15.24.22.39.15.16-.07.23-.24.16-.4l-1.35-2.78a.31.31 0 0 0-.25-.03zm19.95 0a.31.31 0 0 0-.3.26l-.45 2.78a.31.31 0 0 0 .24.33h.06c.14 0 .26-.1.28-.24l.45-2.78a.31.31 0 0 0-.28-.35z"/></svg>',
    },
  ];

  function buildNav(className) {
    const nav = document.createElement('nav');
    nav.className = className;
    nav.setAttribute('aria-label', 'Social media');

    SOCIAL.forEach(({ name, href, icon }) => {
      const a = document.createElement('a');
      a.className = 'social-link';
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', `${name} (@stoneworksxx)`);
      a.innerHTML = icon;
      nav.appendChild(a);
    });

    return nav;
  }

  const headerRow = document.querySelector('.header-row');
  if (headerRow) {
    const social = buildNav('site-social site-social--header');
    const homeButton = headerRow.querySelector('.home-button');
    if (homeButton) {
      homeButton.insertAdjacentElement('afterend', social);
    } else {
      headerRow.insertBefore(social, headerRow.firstChild);
    }
  }

  const drawer = document.querySelector('.nav-drawer');
  if (drawer) {
    drawer.appendChild(buildNav('nav-drawer-social'));
  }
})();
