(() => {
  const isLookbookRoute = () => window.location.pathname.startsWith('/lookbook');
  const isBlogOrLookbookRoute = () =>
    window.location.pathname.startsWith('/lookbook') || window.location.pathname.startsWith('/blog');

  const initHeaderTheme = () => {
    const header = document.querySelector('header');
    if (!header || !isBlogOrLookbookRoute()) return;

    header.style.backgroundColor = 'var(--pastel-pink)';
    if (!isLookbookRoute()) return;

    document.querySelectorAll('.menu-icon').forEach((icon) => {
      icon.style.filter = 'invert(0)';
      icon.style.opacity = '1';
    });
  };

  const toggleNav = () => {
    const navigationLinks = document.getElementById('navigation-links');
    const overlay = document.getElementById('overlay');
    const menu = document.getElementById('menu');
    if (!navigationLinks || !overlay) return;

    navigationLinks.classList.toggle('active');
    const isOpen = navigationLinks.classList.contains('active');
    if (menu) menu.setAttribute('aria-expanded', String(isOpen));
    overlay.style.display = isOpen ? 'block' : 'none';
  };

  const initNavigationMenu = () => {
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    if (!menu || !overlay) return;

    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (
        target.id === 'menu' ||
        target.closest('#menu') ||
        target.id === 'menu-mobile' ||
        target.classList.contains('btn-close') ||
        target.classList.contains('close-icon')
      ) {
        toggleNav();
      }
    });

    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleNav();
      }
    });

    overlay.addEventListener('click', () => {
      const navigationLinks = document.getElementById('navigation-links');
      if (!navigationLinks?.classList.contains('active')) return;
      toggleNav();
    });
  };

  const initLookbookBodyClass = () => {
    if (isLookbookRoute()) {
      document.body.classList.add('lookbook-page');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderTheme();
    initNavigationMenu();
    initLookbookBodyClass();
  });
})();
