(() => {
  const isLookbookRoute = () => window.location.pathname.startsWith('/lookbook');
  const isBlogOrLookbookRoute = () =>
    window.location.pathname.startsWith('/lookbook') || window.location.pathname.startsWith('/blog');

  const initMicroModal = () => {
    const modal = window.MicroModal;
    if (!modal) return;

    modal.init({
      openTrigger: 'data-micromodal-trigger',
      closeTrigger: 'data-micromodal-close',
      openClass: 'is-open',
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: false,
      awaitCloseAnimation: true,
      debugMode: false,
    });
  };

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
    if (!navigationLinks || !overlay) return;

    navigationLinks.classList.toggle('active');
    overlay.style.display =
      overlay.style.display === 'none' || overlay.style.display === '' ? 'block' : 'none';
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

  const initMoreMenu = () => {
    const moreBtn = document.getElementById('more-btn');
    const moreMenu = document.getElementById('more-menu');
    if (!moreBtn || !moreMenu) return;

    moreBtn.addEventListener('click', (event) => {
      event.preventDefault();
      moreMenu.style.display = moreMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const isClickInsideMenu = moreMenu.contains(target);
      const isClickInsideMoreBtn = moreBtn.contains(target);
      if (!isClickInsideMenu && !isClickInsideMoreBtn) {
        moreMenu.style.display = 'none';
      }
    });
  };

  const initLookbookBodyClass = () => {
    if (isLookbookRoute()) {
      document.body.classList.add('lookbook-page');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMicroModal();
    initHeaderTheme();
    initNavigationMenu();
    initMoreMenu();
    initLookbookBodyClass();
  });
})();
