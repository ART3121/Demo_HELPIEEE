// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}

// Smooth nav
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function handleAnchorClick(e) {
    const href = this.getAttribute('href');

    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
