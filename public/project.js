/* ============================================================
   project.js — v3
   • All 4 AgriTrace images in a gallery grid
   • Click card image OR "View Project" to open overlay
   • Custom cursor on main page
   • Card 3D tilt effect
   • Global back-to-top on LEFT (no overlap)
   • Prev/Next keyboard nav (← →)
   ============================================================ */

(function () {
  'use strict';

  // ── PROJECT DATA ──────────────────────────────────────────
  const PROJECTS = [
    {
      titleBold: 'Bob', titleLight: 'Pay',
      bcTitle: 'BobPay', client: 'Anna University',
      date: 'January 2026', author: 'Nexoresha', tag: 'TECHNOLOGY',
      tagline: 'Simplicity,<br/>elegance,<br/>innovation!',
      para1: `BobPay is a secure work marketplace designed to eliminate payment disputes between clients and freelancers through a milestone-based "Fair Work Protocol." The platform locks funds upfront and automates releases only when specific verification rules are met, removing the need for traditional middlemen. By integrating AI-driven verification, transparent reputation tracking, and dedicated dashboards, BobPay ensures that every project is managed with clear expectations and guaranteed financial security for all parties involved.`,
      para2: `Built on a modern React and Supabase stack, the application prioritizes automation and trust in the gig economy. Key features include private storage for deliverables, integrated digital wallets, and a "Fair Exit" mechanism for resolving incomplete contracts equitably. By strictly enforcing a "money locked, payments automatic" philosophy, BobPay provides a reliable, code-governed environment where work is consistently verified and compensation is securely executed without manual intervention.`,
      images: [
        { src: 'images/project1.png', caption: 'BobPay — Fair Work Protocol Platform' }
      ]
    },
    {
      titleBold: 'Agri', titleLight: 'Trace',
      bcTitle: 'AgriTrace', client: 'Zeroday',
      date: 'November 2023', author: 'Nexoresha', tag: 'TECHNOLOGY',
      tagline: 'Traceability,<br/>Transparency,<br/>Trust.',
      para1: `AgriTrace is a blockchain-powered agricultural supply chain management platform built with React, TypeScript, and Supabase. It enables five user roles — Farmer, Distributor, Retailer, Driver, and Admin — to track produce from farm to table using immutable blockchain records on Ethereum (Sepolia/Monad testnets) and IPFS-based certificates via Pinata. Features include voice-based batch registration (VoiceGenie), QR code verification, IoT soil monitoring via ESP32, and an in-app marketplace.`,
      para2: `The frontend is a Vite + React SPA with role-based access control, protected routes, and rich dashboards. Supporting services include AI crop-health and soil analysis, real-time inventory tracking, truck-pooling for deliveries, and a debug suite for database migrations and transaction testing — all connected through a centralized Supabase backend.`,
      images: [
        { src: 'images/agri1.png', caption: 'AgriTrace — Transparent Agricultural Supply Chain' },
        { src: 'images/agri2.png', caption: 'Certificate Verification & IPFS Storage' },
        { src: 'images/agri3.png', caption: 'Track Agricultural Products — Batch Tracing' },
        { src: 'images/agri4.png', caption: 'IoT Soil Monitoring — ESP32 Hardware Setup' }
      ]
    },
    {
      titleBold: 'IBM', titleLight: 'Event',
      bcTitle: 'IBM Event Registration', client: 'Vivek Prabhu',
      date: 'April 2024', author: 'Nexoresha', tag: 'TECHNOLOGY',
      tagline: 'Simplicity,<br/>elegance,<br/>innovation!',
      para1: `This is a small web-based application built to collect, manage, and view structured user information. It has a simple frontend for entering data and a backend that processes requests, stores records, and returns results for display.`,
      para2: `It also includes reporting/export functionality so data can be reused outside the app, such as in spreadsheet format. In short, it is a practical CRUD-style project focused on form handling, data organization, and basic reporting.`,
      images: [
        { src: 'images/ibm1.png', caption: 'IBM Power Virtual Server — Event Landing Page' },
        { src: 'images/ibm2.png', caption: 'IBM Event — Attendee Registration Form' },
        { src: 'images/ibm3.png', caption: 'IBM Event — Jio World Convention Centre, BKC Mumbai' }
      ]
    },
    {
      titleBold: 'Digital', titleLight: 'Signage',
      bcTitle: 'Digital Signage', client: 'BZTECH',
      date: 'January 2026', author: 'Nexoresha', tag: 'TECHNOLOGY',
      tagline: 'Digital Signage<br/>Solutions for<br/>Modern Businesses.',
      para1: `Our digital signage system empowers you to manage and control screens anywhere in the world from a single platform. Whether you operate retail stores, corporate offices, restaurants, or public spaces, our solution makes it easy to update and deliver content in real time. With cloud-based management, you can control multiple displays remotely, schedule content, and broadcast important updates instantly from any location. Designed for reliability and scalability, our platform allows businesses to communicate effectively with audiences through dynamic visuals, videos, and announcements.`,
      para2: `The platform is engineered with a dark-mode first interface to optimize 24/7 visibility in control rooms and operating centers. Advanced playback caching ensures seamless, uninterrupted display delivery even during network outages. With modular layout tools and comprehensive scheduling triggers, BZTECH Digital Signage offers modern enterprises an incredibly powerful solution to capture viewer attention, drive brand engagement, and streamline communications across hundreds of connected displays globally.`,
      images: [
        { src: 'images/digital1.png', caption: 'Analytics Dashboard — Real-time Screen Performance & Viewer Analytics' },
        { src: 'images/digital2.png', caption: 'Content Management — Media Scheduling and Layout Controls' },
        { src: 'images/digital3.png', caption: 'Screen Management — Device Status & Remote Playback Control' }
      ]
    },
    {
      titleBold: 'Hoger', titleLight: 'Homes',
      bcTitle: 'HogerHomes', client: 'HogerHomes',
      date: 'May 2023', author: 'Nexoresha', tag: 'TECHNOLOGY',
      tagline: 'Simplicity,<br/>elegance,<br/>innovation!',
      para1: `Airbnb connects travelers with unique homes and experiences across the globe.`,
      para2: `Whether you're looking for a cozy apartment in the city, a peaceful countryside retreat, or a luxurious villa by the beach, Airbnb makes it easy to find the perfect place to stay. Our platform allows hosts to share their spaces with guests while offering travelers a more personal and authentic way to explore new destinations. With thousands of homes and experiences available in cities worldwide, guests can discover places that feel comfortable, welcoming, and truly local. From short weekend getaways to long-term stays, Airbnb provides flexible booking options and a wide range of accommodations to suit every type of traveler. By connecting people through travel, Airbnb helps create meaningful experiences and unforgettable journeys wherever you go.`,
      images: [
        { src: 'images/hoger1.png', caption: 'HogerHomes — Premium Vacation Rentals & Property Search' },
        { src: 'images/hoger2.png', caption: 'Cozy Interiors — Thoughtfully Designed Bedrooms and Living Spaces' },
        { src: 'images/hoger3.png', caption: 'Car Rental Service — Seamless Automobile Rental Options' }
      ]
    }
  ];

  // ── DOM REFS ──────────────────────────────────────────────
  const overlay          = document.getElementById('projOverlay');
  const projBody         = document.getElementById('projBody');
  const closeBtn         = document.getElementById('projClose');
  const readMoreBtn      = document.getElementById('projReadMore');
  const projBackTopFloat = document.getElementById('projBackTopFloat');
  const globalBackTop    = document.getElementById('globalBackTop');
  const galleryEl        = document.getElementById('projImageGallery');

  const titleBoldEl  = document.getElementById('projTitleBold');
  const titleLightEl = document.getElementById('projTitleLight');
  const bcTitleEl    = document.getElementById('projBcTitle');
  const clientEl     = document.getElementById('projClient');
  const dateEl       = document.getElementById('projDate');
  const authorEl     = document.getElementById('projAuthor');
  const tagEl        = document.getElementById('projTag');
  const taglineEl    = document.getElementById('projTagline');
  const para1El      = document.getElementById('projPara1');
  const para2El      = document.getElementById('projPara2');

  const navPrevBtn = document.getElementById('projNavPrev');
  const navAllBtn  = document.getElementById('projNavAll');
  const navNextBtn = document.getElementById('projNavNext');

  // ── STATE ─────────────────────────────────────────────────
  let isOverlayOpen = false;
  let currentIdx    = 0;
  let threeRenderer = null, threeScene = null, threeCamera = null;
  let threeMesh = null, threeInner = null, threeRAF = null;
  let mouseX = 0, mouseY = 0;

  // ── TEXT SCRAMBLE ─────────────────────────────────────────
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

  function scrambleText(el, finalText, delay) {
    setTimeout(() => {
      let iter = 0, max = finalText.length * 3;
      const iv = setInterval(() => {
        el.textContent = finalText.split('').map((ch, i) => {
          if (i < Math.floor(iter / 3)) return ch;
          return ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        if (iter++ >= max) { clearInterval(iv); el.textContent = finalText; }
      }, 28);
    }, delay || 0);
  }

  // ── BUILD GALLERY ─────────────────────────────────────────
  function buildGallery(images) {
    galleryEl.innerHTML = '';
    const multi = images.length > 1;
    galleryEl.className = 'proj-image-gallery' + (multi ? ' has-multiple' : '');

    images.forEach((img, i) => {
      const frame = document.createElement('div');
      frame.className = 'proj-image-frame';

      const el = document.createElement('img');
      el.src        = img.src;
      el.alt        = img.caption;
      el.className  = 'proj-image';
      el.loading    = 'eager';
      el.decoding   = 'async';
      // High-quality rendering
      el.style.imageRendering = 'auto';

      const caption = document.createElement('div');
      caption.className   = 'proj-image-caption';
      caption.textContent = img.caption;

      frame.appendChild(el);
      frame.appendChild(caption);
      galleryEl.appendChild(frame);
    });
  }

  // ── DATA INJECTION ────────────────────────────────────────
  function injectData(idx) {
    const p    = PROJECTS[idx];
    currentIdx = idx;

    bcTitleEl.textContent  = p.bcTitle;
    clientEl.textContent   = p.client;
    dateEl.textContent     = p.date;
    authorEl.textContent   = p.author;
    tagEl.textContent      = p.tag;
    taglineEl.innerHTML    = p.tagline;
    para1El.textContent    = p.para1;
    para2El.textContent    = p.para2;

    buildGallery(p.images);

    navPrevBtn.disabled = (idx === 0);
    navNextBtn.disabled = (idx === PROJECTS.length - 1);

    titleBoldEl.dataset.final  = p.titleBold;
    titleLightEl.dataset.final = p.titleLight;
    titleBoldEl.textContent    = p.titleBold;
    titleLightEl.textContent   = p.titleLight;
  }

  function runScramble() {
    scrambleText(titleBoldEl,  titleBoldEl.dataset.final  || '', 300);
    scrambleText(titleLightEl, titleLightEl.dataset.final || '', 500);
  }

  // ── SWITCH PROJECT INSIDE OVERLAY ─────────────────────────
  function switchProject(idx) {
    projBody.style.transition = 'opacity 0.3s ease';
    projBody.style.opacity    = '0';
    setTimeout(() => {
      injectData(idx);
      projBody.scrollTo({ top: 0, behavior: 'instant' });
      resetScrollReveal();
      destroyThree(); destroyParticles();
      projBody.style.opacity = '1';
      setTimeout(() => {
        initThree(); initParticles(); runScramble(); checkScrollReveal();
        projBody.style.transition = '';
      }, 150);
    }, 300);
  }

  // ─────────────────────────────────────────────────────────
  // THREE.JS 3D DODECAHEDRON
  // ─────────────────────────────────────────────────────────
  function initThree() {
    const canvas = document.getElementById('proj3DCanvas');
    if (!canvas || !window.THREE) return;

    const W = canvas.parentElement.offsetWidth;
    const H = canvas.parentElement.offsetHeight;

    threeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeRenderer.setSize(W, H);
    threeRenderer.setClearColor(0x000000, 0);

    threeScene  = new THREE.Scene();
    threeCamera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    threeCamera.position.set(0, 0, 6);

    const outerEdge = new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(2.2, 0));
    const outerMat  = new THREE.LineBasicMaterial({ color: 0x6B1A1A, transparent: true, opacity: 0.55 });
    threeMesh = new THREE.LineSegments(outerEdge, outerMat);
    threeScene.add(threeMesh);

    const innerEdge = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.3, 0));
    const innerMat  = new THREE.LineBasicMaterial({ color: 0x8B2828, transparent: true, opacity: 0.35 });
    threeInner = new THREE.LineSegments(innerEdge, innerMat);
    threeScene.add(threeInner);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x6B1A1A, transparent: true, opacity: 0.7 })
    );
    threeScene.add(sphere);

    overlay.addEventListener('mousemove', onMouseMove3D);
    startThreeLoop();
  }

  function onMouseMove3D(e) {
    const canvas = document.getElementById('proj3DCanvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
  }

  function startThreeLoop() {
    let t = 0, crX = 0, crY = 0;
    function loop() {
      threeRAF = requestAnimationFrame(loop);
      t += 0.005;
      crX += (Math.sin(t * 0.3) * 0.3 + mouseY * 0.6 - crX) * 0.04;
      crY += (t * 0.4 + mouseX * 0.6 - crY) * 0.04;

      threeMesh.rotation.x = crX; threeMesh.rotation.y = crY;
      threeInner.rotation.x = -crX * 0.7;
      threeInner.rotation.y = -crY * 0.5 + t * 0.3;

      const b = 1 + Math.sin(t * 1.2) * 0.04;
      threeMesh.scale.setScalar(b); threeInner.scale.setScalar(b * 0.95);
      threeMesh.material.opacity = 0.45 + Math.sin(t * 2) * 0.15;
      threeRenderer.render(threeScene, threeCamera);
    }
    loop();
  }

  function destroyThree() {
    if (threeRAF) { cancelAnimationFrame(threeRAF); threeRAF = null; }
    if (threeRenderer) { threeRenderer.dispose(); threeRenderer = null; }
    overlay.removeEventListener('mousemove', onMouseMove3D);
    threeScene = threeCamera = threeMesh = threeInner = null;
    mouseX = mouseY = 0;
  }

  // ─────────────────────────────────────────────────────────
  // PARTICLE FIELD
  // ─────────────────────────────────────────────────────────
  let particleRAF = null;

  function initParticles() {
    const canvas = document.getElementById('projParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.05,
    }));

    function draw() {
      particleRAF = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107,26,26,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(107,26,26,${0.06 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
    }
    draw();
  }

  function destroyParticles() {
    if (particleRAF) { cancelAnimationFrame(particleRAF); particleRAF = null; }
  }

  // ── OPEN / CLOSE ──────────────────────────────────────────
  function openOverlay(idx) {
    if (isOverlayOpen) return;
    isOverlayOpen = true;
    injectData(idx);
    projBody.scrollTo({ top: 0, behavior: 'instant' });
    resetScrollReveal();

    overlay.removeAttribute('aria-hidden');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    overlay.classList.add('curtain-in');

    setTimeout(() => {
      overlay.classList.remove('curtain-in');
      overlay.classList.add('curtain-reveal', 'content-visible');
      setTimeout(() => { initThree(); initParticles(); runScramble(); checkScrollReveal(); }, 200);
      setTimeout(() => overlay.classList.remove('curtain-reveal'), 700);
    }, 750);
  }

  function closeOverlay() {
    if (!isOverlayOpen) return;
    overlay.classList.remove('content-visible');
    overlay.classList.add('curtain-close');
    destroyThree(); destroyParticles();
    setTimeout(() => {
      overlay.classList.remove('is-open', 'curtain-close');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      isOverlayOpen = false;
    }, 700);
  }

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const revealTargets = [
    '.proj-about__heading', '.proj-about__para', '.proj-tag',
    '.proj-image-frame', '.proj-nav-bar',
    '.proj-cta__eyebrow', '.proj-cta__heading', '.proj-cta__btn'
  ];

  function resetScrollReveal() {
    revealTargets.forEach(s => projBody.querySelectorAll(s).forEach(el => el.classList.remove('in-view')));
  }

  function checkScrollReveal() {
    const bRect = projBody.getBoundingClientRect();
    const bH    = projBody.clientHeight;
    revealTargets.forEach(s => projBody.querySelectorAll(s).forEach(el => {
      if (el.getBoundingClientRect().top - bRect.top < bH * 0.88) el.classList.add('in-view');
    }));
  }

  projBody.addEventListener('scroll', checkScrollReveal, { passive: true });

  // Overlay back-to-top visibility
  projBody.addEventListener('scroll', () => {
    const show = projBody.scrollTop > 300;
    projBackTopFloat.style.opacity   = show ? '1' : '0';
    projBackTopFloat.style.transform = show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)';
  }, { passive: true });
  projBackTopFloat.addEventListener('click', () => projBody.scrollTo({ top: 0, behavior: 'smooth' }));

  // Global back-to-top (main page) — controlled ONLY by script.js
  // (script.js uses showcase-aware threshold so it never overlaps the info bar)
  globalBackTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── PROJECT NAV BAR ───────────────────────────────────────
  navPrevBtn.addEventListener('click', () => { if (currentIdx > 0) switchProject(currentIdx - 1); });
  navNextBtn.addEventListener('click', () => { if (currentIdx < PROJECTS.length - 1) switchProject(currentIdx + 1); });
  navAllBtn.addEventListener('click',  () => {
    closeOverlay();
    setTimeout(() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }), 750);
  });

  // ── TRIGGER LINKS (View Project buttons + card image click) ─
  function bindCardClicks() {
    // "View Project →" overlay links
    document.querySelectorAll('.overlay-link[data-project]').forEach(link => {
      link.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openOverlay(parseInt(link.dataset.project, 10)); });
    });

    // Clicking the card IMAGE or the whole card article
    document.querySelectorAll('.showcase__card[data-index]').forEach(card => {
      card.addEventListener('click', e => {
        // Don't double-fire if the overlay-link was clicked
        if (e.target.closest('.overlay-link')) return;
        openOverlay(parseInt(card.dataset.index, 10));
      });
    });
  }
  bindCardClicks();

  // VIEW PROJECT button (info bar)
  const vpBtn = document.getElementById('viewProjectBtn');
  if (vpBtn) {
    vpBtn.addEventListener('click', e => {
      e.preventDefault();
      openOverlay(parseInt(vpBtn.dataset.project || '0', 10));
    });
  }

  // Sync viewProjectBtn with active slide
  const counterEl = document.getElementById('counterCurrent');
  if (counterEl && vpBtn) {
    new MutationObserver(() => {
      vpBtn.dataset.project = parseInt(counterEl.textContent, 10) - 1;
    }).observe(counterEl, { childList: true, characterData: true, subtree: true });
  }

  // Close + keyboard
  closeBtn.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', e => {
    if (!isOverlayOpen) return;
    if (e.key === 'Escape')      closeOverlay();
    if (e.key === 'ArrowRight' && currentIdx < PROJECTS.length - 1) switchProject(currentIdx + 1);
    if (e.key === 'ArrowLeft'  && currentIdx > 0)                    switchProject(currentIdx - 1);
  });

  if (readMoreBtn) readMoreBtn.addEventListener('click', () =>
    document.getElementById('projAboutSection')?.scrollIntoView({ behavior: 'smooth' })
  );

  // ─────────────────────────────────────────────────────────
  // CUSTOM CURSOR (main page)
  // ─────────────────────────────────────────────────────────
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring) {
    let dx = 0, dy = 0, rx = 0, ry = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

    // Expand ring on interactive elements
    const hovers = 'a, button, .showcase__card, .overlay-link, .view-project-btn, .nav-btn, .nav__logo';
    document.querySelectorAll(hovers).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    (function cursorLoop() {
      dx += (cx - dx) * 0.9;   // dot follows tightly
      dy += (cy - dy) * 0.9;
      rx += (cx - rx) * 0.12;  // ring lags behind
      ry += (cy - ry) * 0.12;

      dot.style.left  = dx + 'px'; dot.style.top  = dy + 'px';
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(cursorLoop);
    })();
  }

  // ─────────────────────────────────────────────────────────
  // CARD 3D TILT EFFECT
  // ─────────────────────────────────────────────────────────
  document.querySelectorAll('.showcase__card').forEach(card => {
    const img = card.querySelector('.showcase__card-image');
    if (!img) return;

    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      img.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });

  // ─────────────────────────────────────────────────────────
  // CURSOR GLOW TRAIL (inside overlay)
  // ─────────────────────────────────────────────────────────
  const trail = document.createElement('div');
  Object.assign(trail.style, {
    position: 'fixed', pointerEvents: 'none', zIndex: '9999',
    width: '10px', height: '10px', borderRadius: '50%',
    background: 'rgba(107,26,26,0.5)', transform: 'translate(-50%,-50%)',
    opacity: '0', boxShadow: '0 0 24px 10px rgba(107,26,26,0.14)',
    transition: 'opacity 0.3s ease',
  });
  document.body.appendChild(trail);

  let tx = 0, ty = 0, tcx = 0, tcy = 0;
  document.addEventListener('mousemove', e => { tcx = e.clientX; tcy = e.clientY; trail.style.opacity = isOverlayOpen ? '1' : '0'; });

  (function trailLoop() {
    tx += (tcx - tx) * 0.12; ty += (tcy - ty) * 0.12;
    trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    if (!isOverlayOpen) trail.style.opacity = '0';
    requestAnimationFrame(trailLoop);
  })();

})();
