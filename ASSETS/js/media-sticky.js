/* ══════════════════════════════════════════
   OPPTY GLOBAL MEDIA STICKY BADGE
   Self-contained: injects its own CSS + HTML.
   Include on every page with:
   <script src="PATH/ASSETS/js/media-sticky.js" defer></script>
═══════════════════════════════════════════ */
(function () {
  'use strict';

  function init() {
    injectStyles();
    injectMarkup();
    wireBehavior();
  }

  function injectStyles() {
    var css = `
      #oppty-media { scroll-margin-top: 90px; }
      .media-sticky {
        position: fixed;
        right: 22px;
        bottom: 22px;
        z-index: 950;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        border-radius: 100px;
        background: rgba(10, 14, 28, 0.82);
        backdrop-filter: blur(18px) saturate(160%);
        -webkit-backdrop-filter: blur(18px) saturate(160%);
        border: 1px solid rgba(242, 101, 34, 0.35);
        box-shadow: 0 10px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset;
        text-decoration: none;
        cursor: pointer;
        overflow: hidden;
        max-width: 56px;
        font-family: 'Inter', 'Poppins', sans-serif;
        transition: max-width 0.45s cubic-bezier(0.22,1,0.36,1),
                    border-color 0.3s ease, box-shadow 0.3s ease,
                    transform 0.3s ease, background 0.3s ease;
      }
      .media-sticky:hover, .media-sticky:focus-visible, .media-sticky.is-open {
        max-width: 280px;
        transform: translateY(-3px);
        border-color: rgba(242, 101, 34, 0.65);
        background: rgba(14, 18, 34, 0.92);
        box-shadow: 0 16px 44px rgba(0,0,0,0.55), 0 0 0 1px rgba(242,101,34,0.25), 0 0 30px rgba(242,101,34,0.18);
      }
      .media-sticky__pulse {
        position: absolute; top: -3px; right: -3px;
        width: 10px; height: 10px; border-radius: 50%;
        background: #f26522; box-shadow: 0 0 10px #f26522;
        animation: media-sticky-pulse 2s ease-in-out infinite;
      }
      @keyframes media-sticky-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
      }
      .media-sticky__icon {
        flex-shrink: 0; width: 34px; height: 34px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #f26522 0%, #ea580c 100%);
        color: #fff; box-shadow: 0 4px 14px rgba(242,101,34,0.45);
      }
      .media-sticky__icon svg { width: 18px; height: 18px; }
      .media-sticky__text { display: flex; flex-direction: column; line-height: 1.25; white-space: nowrap; flex-shrink: 0; }
      .media-sticky__label { font-size: 12.5px; font-weight: 700; color: #fff; letter-spacing: 0.2px; }
      .media-sticky__sub { font-size: 10.5px; font-weight: 500; color: rgba(255,255,255,0.5); }
      .media-sticky__arrow {
        flex-shrink: 0; color: #f26522; opacity: 0; transform: translateX(-6px);
        transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
      }
      .media-sticky:hover .media-sticky__arrow, .media-sticky.is-open .media-sticky__arrow {
        opacity: 1; transform: translateX(0);
      }
      .media-sticky__arrow svg { width: 15px; height: 15px; }
      @media (max-width: 640px) {
        .media-sticky { right: 14px; bottom: 14px; padding: 8px 10px; max-width: 48px; }
        .media-sticky.is-open { max-width: 250px; }
      }
    `;
    var style = document.createElement('style');
    style.setAttribute('data-media-sticky', 'true');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function injectMarkup() {
    var a = document.createElement('a');
    a.href = '#';
    a.id = 'mediaSticky';
    a.className = 'media-sticky';
    a.setAttribute('aria-label', 'See Oppty in the media');
    a.innerHTML =
      '<span class="media-sticky__pulse"></span>' +
      '<span class="media-sticky__icon">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M4 5h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>' +
          '<path d="M4 5V3h13"/>' +
          '<line x1="6" y1="9" x2="14" y2="9"/>' +
          '<line x1="6" y1="12.5" x2="14" y2="12.5"/>' +
          '<line x1="6" y1="16" x2="10" y2="16"/>' +
          '<circle cx="18.5" cy="16" r="2"/>' +
        '</svg>' +
      '</span>' +
      '<span class="media-sticky__text">' +
        '<span class="media-sticky__label">Featured In</span>' +
        '<span class="media-sticky__sub">200+ News Outlets</span>' +
      '</span>' +
      '<span class="media-sticky__arrow">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M5 12h14M13 6l6 6-6 6"/>' +
        '</svg>' +
      '</span>';
    document.body.appendChild(a);
  }

  function wireBehavior() {
    var link = document.getElementById('mediaSticky');
    if (!link) return;

    // Work out relative path to index.html based on current folder depth
    var inHtmlFolder = window.location.pathname.indexOf('/HTML/') !== -1;
    var onIndexPage = !inHtmlFolder && (
      window.location.pathname === '/' ||
      window.location.pathname.toLowerCase().endsWith('index.html') ||
      window.location.pathname.endsWith('/')
    );

    // On index page: use anchor-only href so the page loader doesn't intercept it
    // On other pages: full path back to index.html
    var targetUrl = onIndexPage
      ? '#oppty-media'
      : (inHtmlFolder ? '../index.html' : 'index.html') + '#oppty-media';
    link.setAttribute('href', targetUrl);

    function getTargetY(offset) {
      var section = document.getElementById('oppty-media');
      if (!section) return null;
      return section.getBoundingClientRect().top + window.pageYOffset - (offset || 90);
    }

    function scrollToMedia(smooth) {
      var y = getTargetY();
      if (y === null) return false;
      window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
      return true;
    }

    // ── Keeps correcting scroll position while images/canvas/video
    //    below load and push #oppty-media further down the page.
    //    Cancels the moment the user manually interacts. ──
    function lockScrollToMedia() {
      var cancelled = false;
      var start = performance.now();
      var BUDGET_MS = 3000;

      function cancel() {
        cancelled = true;
        ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (evt) {
          window.removeEventListener(evt, cancel, { passive: true });
        });
      }
      ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (evt) {
        window.addEventListener(evt, cancel, { passive: true, once: true });
      });

      function tick() {
        if (cancelled) return;
        var y = getTargetY();
        if (y !== null) {
          var current = window.pageYOffset;
          // Only correct if we've drifted noticeably (avoids fighting smooth-scroll animation)
          if (Math.abs(current - y) > 4) {
            window.scrollTo({ top: y, behavior: 'auto' });
          }
        }
        if (performance.now() - start < BUDGET_MS) {
          requestAnimationFrame(tick);
        } else {
          cancel();
        }
      }
      requestAnimationFrame(tick);
    }

    link.addEventListener('click', function (e) {
      if (scrollToMedia(true)) {
        e.preventDefault();
        lockScrollToMedia();
      }
      // else browser navigates normally to targetUrl
    });

    // Tap-to-expand on touch devices
    link.addEventListener('touchstart', function () {
      link.classList.toggle('is-open');
    }, { passive: true });

    // Auto-scroll if arriving with #oppty-media in the URL (from another page)
    if (window.location.hash === '#oppty-media') {
      var attempts = 0;
      var tryScroll = function () {
        attempts++;
        if (scrollToMedia(false)) {
          lockScrollToMedia();
          return;
        }
        if (attempts < 40) setTimeout(tryScroll, 100);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          setTimeout(tryScroll, 50);
        });
      } else {
        setTimeout(tryScroll, 50);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();