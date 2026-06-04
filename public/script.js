/* ============================================================
   script.js — Nexoresha Portfolio Showcase  v4
   • Full image (no crop) via contain + 16/9 aspect
   • Back-to-top only appears AFTER showcase
   • Hero mouse parallax
   • Animated stats counters section
   • Floating ambient orbs on hero
   ============================================================ */

(function () {
  'use strict';

  // ── PROJECT DATA ──────────────────────────────────────────
  const PROJECTS = [
    { category: 'TECHNOLOGY', date: 'JAN 2026',     title: 'BobPay',                        href: '#' },
    { category: 'TECHNOLOGY', date: 'NOV 2023',     title: 'AgriTrace',                     href: '#' },
    { category: 'TECHNOLOGY', date: 'APRIL 2024',   title: 'IBM — Event Registration Site', href: '#' },
    { category: 'TECHNOLOGY', date: 'JAN 2026',     title: 'Digital Signage',               href: '#' },
    { category: 'TECHNOLOGY', date: 'MAY 2023',     title: 'HogerHomes',                    href: '#' },
  ];

  const TOTAL = PROJECTS.length;

  // ── DOM ───────────────────────────────────────────────────
  const cards          = Array.from(document.querySelectorAll('.showcase__card'));
  const infoCategory   = document.getElementById('infoCategory');
  const infoDate       = document.getElementById('infoDate');
  const infoTitle      = document.getElementById('infoTitle');
  const counterEl      = document.getElementById('counterCurrent');
  const prevBtn        = document.getElementById('prevBtn');
  const nextBtn        = document.getElementById('nextBtn');
  const progressBar    = document.getElementById('progressBar');
  const viewProjectBtn = document.getElementById('viewProjectBtn');
  const hamburger      = document.getElementById('hamburger');
  const mobileMenu     = document.getElementById('mobileMenu');
  const navEl          = document.getElementById('nav');
  const scrollHint     = document.getElementById('scrollHint');
  const showcaseEl     = document.getElementById('showcase');
  const scrollSpace    = document.querySelector('.showcase__scroll-space');
  const globalBackTop  = document.getElementById('globalBackTop');

  // ── STATE ─────────────────────────────────────────────────
  let targetProgress  = 0;
  let currentProgress = 0;
  let activeIndex     = 0;
  let rafId           = null;
  let isRunning       = false;
  const LERP = 0.072;

  // ── CARD DIMENSIONS ───────────────────────────────────────
  let CARD_W   = 0;
  let CARD_GAP = 48;
  let SLOT_W   = 0;

  function measureCards() {
    CARD_W = cards[0].offsetWidth;
    SLOT_W = CARD_W + CARD_GAP;
  }

  // ── MAIN RENDER LOOP ──────────────────────────────────────
  function renderLoop() {
    const diff = targetProgress - currentProgress;
    currentProgress += diff * LERP;

    if (Math.abs(diff) < 0.0008) {
      currentProgress = targetProgress;
      positionCards(currentProgress);
      isRunning = false;
      return;
    }

    positionCards(currentProgress);
    rafId = requestAnimationFrame(renderLoop);
  }

  function startLoop() {
    if (isRunning) return;
    isRunning = true;
    rafId = requestAnimationFrame(renderLoop);
  }

  // ── POSITION CARDS ────────────────────────────────────────
  function positionCards(progress) {
    const viewW   = cards[0].parentElement.offsetWidth;
    const centerX = (viewW - CARD_W) / 2;

    cards.forEach((card, i) => {
      const relPos = i - progress;
      const x      = centerX + relPos * SLOT_W;
      const dist   = Math.abs(relPos);
      const scale  = dist < 1
        ? 1.0 - dist * 0.10
        : 0.90 - (dist - 1) * 0.06;
      const clampedScale = Math.max(0.76, scale);
      const opacity = Math.max(0, 1 - dist * 0.45);

      card.style.transform = `translateX(${x}px) scale(${clampedScale})`;
      card.style.opacity   = opacity;

      // Subtle parallax on image (NO scale — we use contain now)
      const img = card.querySelector('.card-img');
      if (img) {
        const parallax = relPos * 10;
        img.style.transform = `translateX(${parallax}px)`;
      }
    });

    const newActive = Math.round(progress);
    const clamped   = Math.max(0, Math.min(TOTAL - 1, newActive));
    if (clamped !== activeIndex) {
      activeIndex = clamped;
      updateInfoAnimated(activeIndex);
      updateNav(activeIndex);
    }
    updateProgress(progress);
  }

  // ── SCROLL → TARGET PROGRESS ──────────────────────────────
  function onScroll() {
    const rect     = scrollSpace.getBoundingClientRect();
    const total    = scrollSpace.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const raw      = (scrolled / total) * (TOTAL - 1);
    targetProgress = Math.max(0, Math.min(TOTAL - 1, raw));

    startLoop();

    if (scrolled > 60) scrollHint.classList.add('hidden');
    navEl.classList.toggle('scrolled', window.scrollY > 40);

    // ── Back to top: only after showcase fully scrolled past, and not during overlay ──
    const showcaseBottom = showcaseEl.offsetTop + showcaseEl.offsetHeight;
    const bttVisible     = (window.scrollY > showcaseBottom - 80)
                           && document.body.style.overflow !== 'hidden'; // overlay not open
    if (globalBackTop) globalBackTop.classList.toggle('visible', bttVisible);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── BUTTON NAVIGATION ─────────────────────────────────────
  function goToSlide(idx) {
    const clamped      = Math.max(0, Math.min(TOTAL - 1, idx));
    const showcaseTop  = showcaseEl.offsetTop;
    const scrollHeight = scrollSpace.offsetHeight - window.innerHeight;
    const scrollTarget = showcaseTop + (clamped / (TOTAL - 1)) * scrollHeight;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => goToSlide(Math.round(targetProgress) - 1));
  nextBtn.addEventListener('click', () => goToSlide(Math.round(targetProgress) + 1));

  // ── INFO UPDATE ───────────────────────────────────────────
  let lastInfoIndex = -1;

  function updateInfoAnimated(idx) {
    if (idx === lastInfoIndex) return;
    lastInfoIndex = idx;

    const els = [infoCategory, infoDate, infoTitle, counterEl];
    els.forEach(el => {
      el.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(8px)';
    });

    setTimeout(() => {
      const p = PROJECTS[idx];
      infoCategory.textContent = p.category;
      infoDate.textContent     = p.date;
      infoTitle.textContent    = p.title;
      counterEl.textContent    = idx + 1;
      viewProjectBtn.href      = p.href;
      els.forEach(el => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 290);
  }

  function updateNav(idx) {
    prevBtn.disabled = (idx === 0);
    nextBtn.disabled = (idx === TOTAL - 1);
  }

  function updateProgress(progress) {
    progressBar.style.width = ((progress / (TOTAL - 1)) * 100) + '%';
  }

  // ── HAMBURGER ─────────────────────────────────────────────
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close menu and scroll smoothly when a mobile menu link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const text = link.textContent.trim().toLowerCase();
      
      // Close menu
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      
      // Scroll to target smoothly after a small delay to let the menu close
      setTimeout(() => {
        if (text === 'homepage') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 350);
    });
  });

  // Programmatically process the logo to replace the black background with beige and make the lines maroon
  function processLogo() {
    const img = new Image();
    img.src = 'images/logo.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        
        // Beige color: R=250, G=246, B=238
        // Maroon color: R=74, G=15, B=15
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          
          if (r < 100 && g < 100 && b < 100) {
            data[i] = 250;
            data[i+1] = 246;
            data[i+2] = 238;
            data[i+3] = 255;
          } else {
            data[i] = 74;
            data[i+1] = 15;
            data[i+2] = 15;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        document.querySelectorAll('.logo-img').forEach(el => {
          el.src = canvas.toDataURL();
        });
      } catch (e) {
        console.error('Canvas processing failed:', e);
      }
    };
  }

  // ── RESIZE ────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    measureCards();
    positionCards(currentProgress);
  });

  // ─────────────────────────────────────────────────────────
  // HERO MOUSE PARALLAX
  // ─────────────────────────────────────────────────────────
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    let hMX = 0, hMY = 0, hCX = 0, hCY = 0;
    const heroOrbs = document.querySelectorAll('.hero-orb');

    document.addEventListener('mousemove', e => {
      hMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      hMY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    (function heroParallax() {
      hCX += (hMX - hCX) * 0.06;
      hCY += (hMY - hCY) * 0.06;
      heroOrbs.forEach((orb, i) => {
        const depth  = (i + 1) * 0.4;
        const ox     = hCX * depth * 30;
        const oy     = hCY * depth * 20;
        orb.style.transform = `translate(${ox}px, ${oy}px)`;
      });
      requestAnimationFrame(heroParallax);
    })();
  }

  // ─────────────────────────────────────────────────────────
  // ANIMATED STATS COUNTERS
  // ─────────────────────────────────────────────────────────
  function animateCounter(el, target, duration, suffix) {
    const start = performance.now();
    (function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target) + (suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    })(start);
  }

  // Intersection observer to trigger counters when stats section enters viewport
  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat__num[data-target]').forEach(el => {
            const target   = parseInt(el.dataset.target, 10);
            const suffix   = el.dataset.suffix || '';
            animateCounter(el, target, 1800, suffix);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // ─────────────────────────────────────────────────────────
  // MARQUEE: update keywords dynamically with project names
  // ─────────────────────────────────────────────────────────

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    processLogo();
    measureCards();
    cards.forEach(card => {
      card.style.position  = 'absolute';
      card.style.top       = '50%';
      card.style.left      = '0';
      card.style.marginTop = `-${cards[0].offsetHeight / 2}px`;
      card.style.willChange = 'transform, opacity';
    });
    positionCards(0);
    updateInfoAnimated(0);
    updateNav(0);
    updateProgress(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    requestAnimationFrame(init);
  }

})();
