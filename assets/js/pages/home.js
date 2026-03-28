// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 80);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('visible'));
}

// Smooth nav
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

const fluxoNote = document.querySelector('.fluxo-note');

window.addEventListener('message', (event) => {
  const payload = event.data;

  if (!payload || payload.type !== 'helpieee-flow-change' || !fluxoNote) {
    return;
  }

  fluxoNote.textContent = `Grade ativa: ${payload.label} \u00b7 altere a op\u00e7\u00e3o dentro do fluxo para comparar as habilita\u00e7\u00f5es.`;
});

const pageTrailGuide = document.getElementById('page-trail-guide');
const pageTrailDotsGroup = document.getElementById('page-trail-dots');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (pageTrailGuide && pageTrailDotsGroup && !reducedMotionQuery.matches) {
  const svgWidth = 1600;
  const svgHeight = 900;
  const screenPadding = 120;
  const dotCount = 20;
  const dotSpacing = 0.03;
  const trailSpan = dotCount * dotSpacing;
  const dots = [];
  let trailFrame = 0;
  let trailTimer = 0;

  const randomBetween = (min, max) => min + Math.random() * (max - min);
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const pointsToPath = (points) => {
    if (points.length < 2) {
      return '';
    }

    let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

    if (points.length === 2) {
      return `${path} L ${points[1].x.toFixed(1)} ${points[1].y.toFixed(1)}`;
    }

    for (let index = 1; index < points.length - 1; index += 1) {
      const current = points[index];
      const next = points[index + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;

      path += ` Q ${current.x.toFixed(1)} ${current.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
    }

    const beforeLast = points[points.length - 2];
    const last = points[points.length - 1];
    path += ` Q ${beforeLast.x.toFixed(1)} ${beforeLast.y.toFixed(1)} ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;

    return path;
  };

  const buildHorizontalPath = (fromLeft) => {
    const startY = randomBetween(110, svgHeight - 110);
    const endY = clamp(startY + randomBetween(-220, 220), 110, svgHeight - 110);
    const swingAmplitude = randomBetween(110, 210);
    const swingFrequency = randomBetween(1.15, 1.8);
    const detailAmplitude = randomBetween(24, 82);
    const detailFrequency = randomBetween(2.1, 3.4);
    const innerPoints = 4 + Math.floor(Math.random() * 3);
    const direction = fromLeft ? 1 : -1;
    const points = [
      {
        x: fromLeft ? -screenPadding : svgWidth + screenPadding,
        y: startY
      }
    ];

    for (let index = 1; index <= innerPoints; index += 1) {
      const progress = index / (innerPoints + 1);
      const baseX = fromLeft
        ? progress * svgWidth
        : svgWidth - progress * svgWidth;
      const y = clamp(
        startY
          + (endY - startY) * progress
          + Math.sin(progress * Math.PI * swingFrequency) * swingAmplitude
          + Math.sin(progress * Math.PI * detailFrequency) * detailAmplitude,
        90,
        svgHeight - 90
      );

      points.push({
        x: baseX + direction * randomBetween(-44, 44),
        y
      });
    }

    points.push({
      x: fromLeft ? svgWidth + screenPadding : -screenPadding,
      y: endY
    });

    return pointsToPath(points);
  };

  const buildVerticalPath = (fromTop) => {
    const startX = randomBetween(120, svgWidth - 120);
    const endX = clamp(startX + randomBetween(-320, 320), 120, svgWidth - 120);
    const swingAmplitude = randomBetween(150, 280);
    const swingFrequency = randomBetween(1.05, 1.55);
    const detailAmplitude = randomBetween(28, 96);
    const detailFrequency = randomBetween(2.2, 3.2);
    const innerPoints = 4 + Math.floor(Math.random() * 3);
    const direction = fromTop ? 1 : -1;
    const points = [
      {
        x: startX,
        y: fromTop ? -screenPadding : svgHeight + screenPadding
      }
    ];

    for (let index = 1; index <= innerPoints; index += 1) {
      const progress = index / (innerPoints + 1);
      const baseY = fromTop
        ? progress * svgHeight
        : svgHeight - progress * svgHeight;
      const x = clamp(
        startX
          + (endX - startX) * progress
          + Math.sin(progress * Math.PI * swingFrequency) * swingAmplitude
          + Math.sin(progress * Math.PI * detailFrequency) * detailAmplitude,
        90,
        svgWidth - 90
      );

      points.push({
        x,
        y: baseY + direction * randomBetween(-40, 40)
      });
    }

    points.push({
      x: endX,
      y: fromTop ? svgHeight + screenPadding : -screenPadding
    });

    return pointsToPath(points);
  };

  const buildTrailPath = () => {
    const routeType = Math.floor(Math.random() * 4);

    if (routeType === 0) {
      return buildHorizontalPath(true);
    }

    if (routeType === 1) {
      return buildHorizontalPath(false);
    }

    if (routeType === 2) {
      return buildVerticalPath(true);
    }

    return buildVerticalPath(false);
  };

  for (let index = 0; index < dotCount; index += 1) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('class', 'page-trail-dot');
    dot.setAttribute('r', '0');
    pageTrailDotsGroup.appendChild(dot);
    dots.push(dot);
  }

  const hideTrailDots = () => {
    dots.forEach((dot) => {
      dot.setAttribute('opacity', '0');
      dot.setAttribute('r', '0');
    });
  };

  const runTrail = () => {
    window.clearTimeout(trailTimer);
    cancelAnimationFrame(trailFrame);

    pageTrailGuide.setAttribute('d', buildTrailPath());
    pageTrailGuide.style.opacity = '0.34';

    const length = pageTrailGuide.getTotalLength();
    const start = performance.now();
    const duration = 4600 + Math.random() * 1600;

    const frame = (now) => {
      const elapsed = (now - start) / duration;
      const lead = elapsed * (1 + trailSpan * 2 + 0.06) - trailSpan;

      dots.forEach((dot, index) => {
        const progress = lead - index * dotSpacing;

        if (progress <= 0 || progress >= 1) {
          dot.setAttribute('opacity', '0');
          dot.setAttribute('r', '0');
          return;
        }

        const point = pageTrailGuide.getPointAtLength(progress * length);
        const taper = Math.max(0, 1 - index / (dotCount - 1));
        const fadeIn = progress < 0.045 ? progress / 0.045 : 1;
        const fadeOut = progress > 0.955 ? (1 - progress) / 0.045 : 1;
        const opacity = (0.16 + taper * 0.76) * fadeIn * fadeOut;
        const radius = 1.3 + taper * 2.9;

        dot.setAttribute('cx', point.x.toFixed(2));
        dot.setAttribute('cy', point.y.toFixed(2));
        dot.setAttribute('r', radius.toFixed(2));
        dot.setAttribute('opacity', opacity.toFixed(2));
      });

      if (elapsed < 1) {
        trailFrame = requestAnimationFrame(frame);
      } else {
        hideTrailDots();
        pageTrailGuide.style.opacity = '0';
        trailTimer = window.setTimeout(runTrail, 1600 + Math.random() * 2200);
      }
    };

    trailFrame = requestAnimationFrame(frame);
  };

  const handleReducedMotionChange = (event) => {
    if (event.matches) {
      window.clearTimeout(trailTimer);
      cancelAnimationFrame(trailFrame);
      pageTrailGuide.style.opacity = '0';
      hideTrailDots();
      return;
    }

    runTrail();
  };

  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
  } else if (typeof reducedMotionQuery.addListener === 'function') {
    reducedMotionQuery.addListener(handleReducedMotionChange);
  }

  runTrail();
}
