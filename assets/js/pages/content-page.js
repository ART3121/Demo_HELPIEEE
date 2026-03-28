const currentContentPage = window.location.pathname.split('/').pop().split('?')[0];

const contentPageRoutes = [
  { href: '../index.html', label: 'Início', file: 'index.html', theme: 'theme-branch', meta: 'Visão geral' },
  { href: 'primeiros-passos.html', label: 'Começar', file: 'primeiros-passos.html', theme: 'theme-branch', meta: 'Internet, RU e labs' },
  { href: 'faculdade.html', label: 'Faculdade', file: 'faculdade.html', theme: 'theme-ias', meta: 'SIGA, RAG e IRA' },
  { href: 'materiais.html', label: 'Materiais', file: 'materiais.html', theme: 'theme-pes', meta: 'Biblioteca do 1º período', matchPrefix: 'materiais-' },
  { href: 'mapa.html', label: 'Mapa', file: 'mapa.html', theme: 'theme-vts', meta: 'Salas e blocos' },
  { href: 'comunidade.html', label: 'Comunidade', file: 'comunidade.html', theme: 'theme-sight', meta: 'Apoio e grupos' },
  { href: 'ieee.html', label: 'IEEE', file: 'ieee.html', theme: 'theme-wie', meta: 'Capítulos e equipes' },
  { href: 'fluxo.html', label: 'Fluxo', file: 'fluxo.html', theme: 'theme-aess', meta: 'Pré-requisitos' },
];

const isCurrentContentRoute = (route) => {
  if (route.matchPrefix) {
    return currentContentPage === route.file || currentContentPage.startsWith(route.matchPrefix);
  }

  return route.file === currentContentPage;
};

const topbarNav = document.querySelector('.topbar-nav');

if (topbarNav) {
  topbarNav.innerHTML = contentPageRoutes.map((route) => {
    const currentAttribute = isCurrentContentRoute(route) ? ' aria-current="page"' : '';
    return `<a href="${route.href}" class="topbar-link"${currentAttribute}>${route.label}</a>`;
  }).join('');
}

const pageHero = document.querySelector('.page-hero');

if (pageHero) {
  const quickAccessPanel = document.createElement('section');
  quickAccessPanel.className = 'quick-access-panel reveal';
  quickAccessPanel.innerHTML = `
    <div class="quick-access-head">
      <div>
        <div class="section-kicker">Atalhos entre páginas</div>
        <h2 class="quick-access-title">Pule direto para a parte do guia que faz sentido para você agora.</h2>
      </div>
      <a href="../index.html#indice" class="quick-access-home">Ver índice completo na home</a>
    </div>
    <div class="quick-access-grid">
      ${contentPageRoutes
        .filter((route) => route.file !== 'index.html')
        .map((route) => {
          const currentClass = isCurrentContentRoute(route) ? ' current' : '';
          const currentAttribute = isCurrentContentRoute(route) ? ' aria-current="page"' : '';
          return `
            <a href="${route.href}" class="quick-link ${route.theme}${currentClass}"${currentAttribute}>
              <span class="quick-link-label">${route.label}</span>
              <span class="quick-link-meta">${route.meta}</span>
            </a>
          `;
        }).join('')}
    </div>
  `;

  pageHero.insertAdjacentElement('afterend', quickAccessPanel);
}

const contentPageReveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const contentPageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  contentPageReveals.forEach((item) => contentPageObserver.observe(item));
} else {
  contentPageReveals.forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function handleAnchorClick(event) {
    const href = this.getAttribute('href');

    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
