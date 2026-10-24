/**
 * Koamishin Studio — Interactive Case Study & Navigation Controller
 * Designed for craft, clarity, and accessibility:
 * - Fluid slide-over case study drawer with focus restoration
 * - Mobile navigation with backdrop dimmer and scroll locking
 * - Hardware-accelerated transitions (Emil Kowalski & Apple Design principles)
 */

(function () {
  'use strict';

  // ----------------------------------------------------
  // 1. Live Studio Status
  // ----------------------------------------------------
  const clockDisplay = document.getElementById('studio-clock');
  function updateStudioStatus() {
    if (!clockDisplay) return;
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    clockDisplay.textContent = `Active • ${utcHours}:${utcMinutes} UTC`;
  }
  updateStudioStatus();
  setInterval(updateStudioStatus, 1000 * 30);

  // ----------------------------------------------------
  // 2. Mobile Navigation Controller
  // ----------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navBackdrop = document.getElementById('nav-backdrop');

  if (navToggle && siteNav) {
    function toggleNav(forceState) {
      const currentState = navToggle.getAttribute('aria-expanded') === 'true';
      const nextState = forceState !== undefined ? forceState : !currentState;
      navToggle.setAttribute('aria-expanded', String(nextState));
      siteNav.classList.toggle('is-open', nextState);
      if (navBackdrop) {
        navBackdrop.classList.toggle('is-visible', nextState);
      }
      document.body.classList.toggle('nav-open', nextState);
    }

    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleNav();
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', function () {
        toggleNav(false);
      });
    }

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleNav(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        toggleNav(false);
        navToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (
        navToggle.getAttribute('aria-expanded') === 'true' &&
        !siteNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleNav(false);
      }
    });
  }

  // ----------------------------------------------------
  // 3. Interactive Project Scope & Budget Estimator
  // ----------------------------------------------------
  const estTypeBtns = document.querySelectorAll('#opt-project-type .est-btn');
  const estStageBtns = document.querySelectorAll('#opt-stage .est-btn');
  const estTimelineBtns = document.querySelectorAll('#opt-timeline .est-btn');

  const displayPackage = document.getElementById('est-display-package');
  const displayTime = document.getElementById('est-display-time');
  const displayPrice = document.getElementById('est-display-price');
  const displayBrief = document.getElementById('est-brief-text');
  const ctaBtn = document.getElementById('est-cta-btn');

  let selectedType = 'Full Web Application';
  let selectedStage = 'Concept & Wireframes';
  let selectedTimeline = 'Within 30 Days';

  function updateEstimator() {
    let pkgTitle = 'Full-Cycle Product Build';
    let timeText = '4–6 Weeks';
    let priceText = '~$8,500 – $14,000';

    if (selectedType === 'MVP Launchpad') {
      pkgTitle = 'The 2-Week Launchpad Sprint';
      timeText = '2 Weeks';
      priceText = '$4,500 Fixed';
    } else if (selectedType.includes('Audit')) {
      pkgTitle = 'Architecture & Scale Audit';
      timeText = '2–3 Weeks';
      priceText = '$4,000 Flat';
    } else if (selectedType.includes('Design System')) {
      pkgTitle = 'Design System & Component Kit';
      timeText = '3–4 Weeks';
      priceText = '$5,000 – $7,500';
    }

    if (displayPackage) displayPackage.textContent = pkgTitle;
    if (displayTime) displayTime.textContent = timeText;
    if (displayPrice) displayPrice.textContent = priceText;

    const brief = `Building a ${selectedType} (Stage: ${selectedStage}, Target Launch: ${selectedTimeline}).`;
    if (displayBrief) displayBrief.textContent = brief;

    if (ctaBtn) {
      const subject = encodeURIComponent(`Project Inquiry: ${selectedType}`);
      const body = encodeURIComponent(
        `Hi Koamishin Studio,\n\nWe would like to discuss our upcoming project:\n\n- Scope: ${selectedType}\n- Current Stage: ${selectedStage}\n- Target Timeline: ${selectedTimeline}\n- Recommended Model: ${pkgTitle} (${priceText})\n\nTell us when we can schedule an introduction call.\n\nBest regards,`
      );
      ctaBtn.href = `mailto:team@koamishin.com?subject=${subject}&body=${body}`;
    }
  }

  function bindOptionGroup(buttons, onSelect) {
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        onSelect(btn.getAttribute('data-val'));
        updateEstimator();
      });
    });
  }

  if (estTypeBtns.length) {
    bindOptionGroup(estTypeBtns, function (val) { selectedType = val; });
    bindOptionGroup(estStageBtns, function (val) { selectedStage = val; });
    bindOptionGroup(estTimelineBtns, function (val) { selectedTimeline = val; });
    updateEstimator();
  }

  // ----------------------------------------------------
  // 3. Studio Client Case Studies
  // ----------------------------------------------------
  const caseStudies = {
    opensinop: {
      title: 'OpenSinop — Autonomous Financial Operations Platform',
      sector: 'Fintech & Autonomous Telemetry',
      year: '2025',
      image: 'images/northwind-dashboard-product.jpg',
      alt: 'OpenSinop financial platform and telemetry dashboard',
      summary:
        'OpenSinop is an autonomous financial operations platform designed for organizations delegating operational spending to AI agents without risking budget overruns or compliance breaches.',
      challenge:
        'Traditional accounting platforms lack real-time policy gating for autonomous systems. The client needed a reliable architecture capable of verifying transaction constraints deterministically before settlement.',
      solution:
        'We designed and engineered a three-tier architecture: read-only telemetry ingestion, deterministic policy enforcement, and verified on-chain cryptographic settlement with automated audit logging.',
      deliverables: [
        'End-to-end telemetry dashboard UI/UX',
        'Deterministic policy engine in PHP 8.5',
        'Circle Agent Wallets & Arc protocol integration',
        'Comprehensive automated Pest test suite',
      ],
      impact: 'Eliminated agentic financial drift across thousands of simulated operational budget cycles.',
    },
    starterkit: {
      title: 'KoamiPlatform — Production Web System & Design Architecture',
      sector: 'Web Platform & Design Architecture',
      year: '2025',
      image: 'images/arbor-co-ecommerce-website.jpg',
      alt: 'KoamiPlatform design system and web application interface',
      summary:
        'KoamiPlatform is an enterprise-grade digital foundation engineered to eliminate the friction, inconsistencies, and delays that plague modern web development teams.',
      challenge:
        'Engineering teams frequently spend weeks re-implementing authentication, responsive layout tokens, and deployment pipelines. The objective was a unified, high-concurrency standard with zero technical debt.',
      solution:
        'We built a unified component architecture pairing Laravel with Inertia.js and Tailwind CSS. We implemented typed routing, Octane high-concurrency workers, and deterministic CI/CD workflows out of the box.',
      deliverables: [
        'Unified design system & component library',
        'Inertia.js reactive frontend architecture',
        'Octane concurrency & worker tuning',
        'Automated GitHub Actions deployment pipeline',
      ],
      impact: 'Reduced production application setup and iteration time from several days down to under two minutes.',
    },
    koakademy: {
      title: 'koakademy — Full-Lifecycle Academic Governance Platform',
      sector: 'Education & Institutional Administration',
      year: '2024',
      image: 'images/papier-press-brand-identity.jpg',
      alt: 'koakademy academic management platform',
      summary:
        'koakademy is an institutional management platform engineered to streamline the entire student journey — from admissions and enrollment to scheduling, billing, and faculty grading.',
      challenge:
        'The institution operated on legacy, fragmented spreadsheets that caused billing delays, enrollment errors, and security blind spots across departments.',
      solution:
        'We delivered a centralized platform with granular role-based access control (RBAC), multi-tenant white-labeling, automated invoice generation, and progressive web app (PWA) offline support.',
      deliverables: [
        'Complete user experience architecture',
        'Role-based security & administrative workflows',
        'Offline-capable Progressive Web App (PWA)',
        'Automated billing and scheduling modules',
      ],
      impact: 'Adopted across multi-department academic institutions, reducing enrollment processing time by 65%.',
    },
    konbi: {
      title: 'konbi POS — Multi-Store Retail & Inventory Operations',
      sector: 'Retail & Multi-Store Inventory',
      year: '2024',
      image: 'images/fieldnotes-editorial-magazine.jpg',
      alt: 'konbi POS retail inventory and checkout interface',
      summary:
        'konbi POS is a modern convenience store platform built for multi-location inventory reconciliation, real-time stock replenishment, and sub-100ms cashier terminal checkout.',
      challenge:
        'High-volume retail requires immediate transaction responsiveness. Slow lookups, manual inventory reconciliation, and unreliable network connections frequently resulted in lost sales.',
      solution:
        'We designed a high-speed cashier terminal interface with barcode scanner integration, optimistic UI updates, local offline queueing, and centralized multi-warehouse stock replenishment telemetry.',
      deliverables: [
        'Touch-optimized cashier terminal UI',
        'Hardware hooks for barcode scanners & receipt printers',
        'Real-time multi-location stock synchronization',
        'Offline transaction resilience engine',
      ],
      impact: 'Achieved sub-100ms terminal response times with zero transaction loss during network outages.',
    },
  };

  const caseDrawer = document.getElementById('case-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerContent = document.getElementById('drawer-content');
  let lastActiveElement = null;

  function renderDrawerContent(data) {
    const deliverablesHtml = data.deliverables
      .map(function (d) {
        return `<li>${d}</li>`;
      })
      .join('');

    drawerContent.innerHTML = `
      <div class="drawer-header">
        <span class="drawer-kicker">${data.sector} • ${data.year}</span>
        <h2 id="drawer-title" class="drawer-headline">${data.title}</h2>
      </div>

      <figure class="drawer-media">
        <img src="${data.image}" alt="${data.alt}" width="800" height="540" />
      </figure>

      <div class="drawer-body">
        <div class="drawer-section">
          <h3>Overview</h3>
          <p>${data.summary}</p>
        </div>

        <div class="drawer-section">
          <h3>The Challenge</h3>
          <p>${data.challenge}</p>
        </div>

        <div class="drawer-section">
          <h3>The Solution</h3>
          <p>${data.solution}</p>
        </div>

        <div class="drawer-section">
          <h3>Scope &amp; Deliverables</h3>
          <ul class="drawer-deliverables-list">
            ${deliverablesHtml}
          </ul>
        </div>

        <div class="drawer-metric-box">
          <span class="metric-icon">★</span>
          <div>
            <strong>Verified Outcome</strong>
            <p>${data.impact}</p>
          </div>
        </div>

        <div class="drawer-cta-row">
          <a class="btn btn-primary" href="mailto:team@koamishin.com?subject=Inquiry%20regarding%20${encodeURIComponent(data.title)}">
            Discuss a Similar Project →
          </a>
          <button class="btn btn-ghost" type="button" id="drawer-dismiss-cta">Close</button>
        </div>
      </div>
    `;

    const dismissCta = document.getElementById('drawer-dismiss-cta');
    if (dismissCta) {
      dismissCta.addEventListener('click', closeDrawer);
    }
  }

  function openDrawer(projectId) {
    const data = caseStudies[projectId];
    if (!data || !caseDrawer) return;

    lastActiveElement = document.activeElement;
    renderDrawerContent(data);

    caseDrawer.classList.add('is-open');
    caseDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
      if (drawerCloseBtn) drawerCloseBtn.focus();
    }, 150);
  }

  function closeDrawer() {
    if (!caseDrawer || !caseDrawer.classList.contains('is-open')) return;

    caseDrawer.classList.remove('is-open');
    caseDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // Bind project card click triggers
  document.querySelectorAll('[data-open-project]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const id = el.getAttribute('data-open-project');
      openDrawer(id);
    });
  });

  document.querySelectorAll('.work-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      const id = card.getAttribute('data-project');
      if (id) openDrawer(id);
    });
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && caseDrawer && caseDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // ----------------------------------------------------
  // 4. Progressive Scroll Reveal
  // ----------------------------------------------------
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
