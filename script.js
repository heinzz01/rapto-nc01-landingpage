/* RAPTO NC-01 — Sticky-CTA, Scroll-Reveal, FAQ-Verhalten */

(function () {
  'use strict';

  /* ----- Sticky Mobile-CTA-Bar: erscheint nach ~1 Viewport Scroll ----- */
  var stickyCta = document.getElementById('stickyCta');

  function toggleStickyCta() {
    var visible = window.scrollY > window.innerHeight * 0.9;
    stickyCta.classList.toggle('is-visible', visible);
    stickyCta.setAttribute('aria-hidden', String(!visible));
  }

  if (stickyCta) {
    window.addEventListener('scroll', toggleStickyCta, { passive: true });
    toggleStickyCta();
  }

  /* ----- Dezentes Fade-in beim Scrollen ----- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* ----- FAQ: immer nur ein Item offen ----- */
  var faqItems = document.querySelectorAll('.faq-list details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
