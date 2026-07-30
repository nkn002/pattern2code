/* Pattern Over Pixels — project page */
(function () {
  'use strict';

  /* ---- sticky nav shadow ---- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- gallery tabs ---- */
  var tabs = document.querySelectorAll('#tabs button');
  var panels = document.querySelectorAll('.panel');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = btn.getAttribute('data-tab');
      tabs.forEach(function (b) {
        b.setAttribute('aria-selected', String(b === btn));
      });
      panels.forEach(function (p) {
        p.classList.toggle('on', p.getAttribute('data-panel') === idx);
      });
    });
  });

  /* ---- reveal the perturbed element ---- */
  document.querySelectorAll('.reveal-btn').forEach(function (btn) {
    var foot = btn.closest('.gal-foot');
    var panel = btn.closest('.panel');
    var view = panel.querySelector('.viewport');
    var answer = foot.querySelector('.answer');
    btn.addEventListener('click', function () {
      var on = view.classList.toggle('reveal');
      answer.classList.toggle('on', on);
      btn.textContent = on ? 'Hide the deviation' : 'Reveal the deviation';
      if (on) {
        var spot = view.querySelector('.spot');
        var top = spot.offsetTop - view.clientHeight / 2 + spot.offsetHeight / 2;
        view.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    });
  });

  /* ---- copy buttons ---- */
  document.querySelectorAll('.copy').forEach(function (btn) {
    var target = document.querySelector(btn.getAttribute('data-copy'));
    var label = btn.querySelector('span');
    if (!target || !label) return;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(target.innerText).then(function () {
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = 'Copy'; }, 1600);
      });
    });
  });
})();
