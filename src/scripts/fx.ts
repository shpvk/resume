import Lenis from 'lenis';
import { animate, scroll } from 'motion';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupReveal(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const step = Number(group.dataset.revealStagger ?? 0);
    group.removeAttribute('data-reveal');
    Array.from(group.children).forEach((child, i) => {
      if (!(child instanceof HTMLElement)) return;
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--reveal-delay', String(Math.min(i * step, 240)) + 'ms');
    });
  });

  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!targets.length) return;
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (!entry.isIntersecting) continue;
        el.classList.add('is-revealed');
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -24px 0px', threshold: 0.08 },
  );

  targets.forEach((el) => observer.observe(el));
  document.documentElement.classList.remove('no-js');
}

function setupProgressBar(): void {
  const bar = document.querySelector<HTMLElement>('[data-progress-bar]');
  if (!bar) return;

  scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));
}

function setupParallax(): void {
  if (reducedMotion.matches) return;

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const distance = Number(el.dataset.parallax ?? 80);
    scroll(animate(el, { y: [0, -distance] }, { ease: 'linear' }));
  });
}

function setupCardGlow(): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('.card-glow').forEach((card) => {
    card.addEventListener(
      'pointermove',
      (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      },
      { passive: true },
    );
  });
}

function setupMagnetic(): void {
  if (reducedMotion.matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic ?? 10);

    el.addEventListener(
      'pointermove',
      (event) => {
        const rect = el.getBoundingClientRect();

        const dx = (event.clientX - rect.left) / rect.width - 0.5;
        const dy = (event.clientY - rect.top) / rect.height - 0.5;

        el.style.setProperty('--tx', `${dx * strength * 2}px`);
        el.style.setProperty('--ty', `${dy * strength * 2}px`);
        el.style.setProperty('--lx', `${dx * strength}px`);
        el.style.setProperty('--ly', `${dy * strength}px`);
      },
      { passive: true },
    );

    el.addEventListener('pointerleave', () => {
      el.style.removeProperty('--tx');
      el.style.removeProperty('--ty');
      el.style.removeProperty('--lx');
      el.style.removeProperty('--ly');
    });
  });
}

const THEME_COLORS = { light: '#f6f8fc', dark: '#0a0a0b' } as const;

function setupThemeToggle(): void {
  const button = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (!button) return;

  const root = document.documentElement;
  const meta = document.querySelector<HTMLMetaElement>('#theme-color-meta');

  const apply = (theme: 'light' | 'dark') => {
    root.dataset.theme = theme;
    if (meta) meta.content = THEME_COLORS[theme];

    button.setAttribute('aria-pressed', String(theme === 'dark'));
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  };

  if (root.dataset.theme === 'dark') {
    apply('dark');
  } else {
    apply('light');
  }

  button.addEventListener('click', () => {
    if (root.dataset.theme === 'dark') {
      apply('light');
    } else {
      apply('dark');
    }
  });
}

function setupActiveNav(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((link) => [link.dataset.navLink!, link]));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = byId.get(entry.target.id);
        if (!link) continue;
        link.classList.toggle('text-ink', entry.isIntersecting);
        link.classList.toggle('text-faint', !entry.isIntersecting);
        if (entry.isIntersecting) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    },

    { rootMargin: '-45% 0px -45% 0px' },
  );

  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

function setupCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return;
      }

      const label = button.querySelector<HTMLElement>('[data-copy-label]');
      const done = button.dataset.copiedLabel ?? 'Copied';
      if (!label) return;

      const original = label.textContent ?? '';
      label.textContent = done;
      button.classList.add('text-accent');
      window.setTimeout(() => {
        label.textContent = original;
        button.classList.remove('text-accent');
      }, 1600);
    });
  });
}

function setupSmoothScroll(): void {
  if (reducedMotion.matches) return;

  const lenis = new Lenis({
    duration: 1.05,

    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,

    touchMultiplier: 1.6,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
      history.replaceState(null, '', url.hash);
    });
  });

  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) lenis.destroy();
  });
}

function init(): void {
  setupReveal();
  setupProgressBar();
  setupParallax();
  setupCardGlow();
  setupMagnetic();
  setupThemeToggle();
  setupActiveNav();
  setupCopyButtons();
  setupSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
