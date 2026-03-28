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

const fluxoNote = document.querySelector('.fluxo-note');

window.addEventListener('message', (event) => {
  const payload = event.data;

  if (!payload || payload.type !== 'helpieee-flow-change' || !fluxoNote) {
    return;
  }

  fluxoNote.textContent = `Grade ativa: ${payload.label} · altere a opção dentro do fluxo para comparar as habilitações.`;
});

const heroTrailGuide = document.getElementById('hero-trail-guide');
const heroTrailDotsGroup = document.getElementById('hero-trail-dots');

if (heroTrailGuide && heroTrailDotsGroup && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const trailPaths = [
    'M-120 650 C 140 590 250 520 390 460 S 720 300 930 320 S 1260 450 1710 180',
    'M-140 270 C 90 210 210 170 350 210 S 650 390 840 350 S 1170 150 1710 250',
    'M-110 760 C 130 640 250 610 420 650 S 760 770 990 650 S 1330 340 1710 410',
    'M-140 470 C 120 520 230 560 390 520 S 690 340 900 380 S 1260 620 1710 520',
    'M-100 180 C 120 120 230 120 410 180 S 760 360 930 280 S 1260 80 1710 120'
  ];
  const dotCount = 14;
  const dots = [];
  let activeIndex = -1;
  let trailFrame = 0;
  let trailTimer = 0;

  for (let index = 0; index < dotCount; index += 1) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('class', 'hero-trail-dot');
    dot.setAttribute('r', '0');
    heroTrailDotsGroup.appendChild(dot);
    dots.push(dot);
  }

  const hideTrailDots = () => {
    dots.forEach((dot) => {
      dot.setAttribute('opacity', '0');
      dot.setAttribute('r', '0');
    });
  };

  const nextTrailPath = () => {
    let nextIndex = Math.floor(Math.random() * trailPaths.length);

    if (trailPaths.length > 1) {
      while (nextIndex === activeIndex) {
        nextIndex = Math.floor(Math.random() * trailPaths.length);
      }
    }

    activeIndex = nextIndex;
    return trailPaths[nextIndex];
  };

  const runTrail = () => {
    window.clearTimeout(trailTimer);
    cancelAnimationFrame(trailFrame);

    heroTrailGuide.setAttribute('d', nextTrailPath());

    const length = heroTrailGuide.getTotalLength();
    const start = performance.now();
    const duration = 3800 + Math.random() * 1200;
    const spacing = 0.052;

    const frame = (now) => {
      const elapsed = (now - start) / duration;
      const lead = elapsed * (1 + dotCount * spacing) - dotCount * spacing * 0.32;

      dots.forEach((dot, index) => {
        const progress = lead - index * spacing;

        if (progress < 0 || progress > 1.08) {
          dot.setAttribute('opacity', '0');
          dot.setAttribute('r', '0');
          return;
        }

        const point = heroTrailGuide.getPointAtLength(Math.max(0, Math.min(length, progress * length)));
        const taper = Math.max(0, 1 - index / dotCount);
        const fadeOut = progress > 0.9 ? Math.max(0, (1.08 - progress) / 0.18) : 1;
        const opacity = (0.18 + taper * 0.78) * fadeOut;
        const radius = 1.4 + taper * 2.8;

        dot.setAttribute('cx', point.x.toFixed(2));
        dot.setAttribute('cy', point.y.toFixed(2));
        dot.setAttribute('r', radius.toFixed(2));
        dot.setAttribute('opacity', opacity.toFixed(2));
      });

      if (elapsed < 1.12) {
        trailFrame = requestAnimationFrame(frame);
      } else {
        hideTrailDots();
        trailTimer = window.setTimeout(runTrail, 1400 + Math.random() * 2400);
      }
    };

    trailFrame = requestAnimationFrame(frame);
  };

  runTrail();
}
