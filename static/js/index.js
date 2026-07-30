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
      focusMask(document.querySelector('.panel.on'));
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

  /* ---- size each snippet pane to the screenshot beside it, then open it
          at the masked value rather than at the top of the file ---- */
  function focusMask(panel) {
    if (!panel) return;
    var pre = panel.querySelector('.snip');
    var browser = panel.querySelector('.browser');
    if (pre && browser && browser.offsetHeight > 0) {
      // line the snippet's bottom edge up with the screenshot's bottom edge
      var pr = pre.getBoundingClientRect(), br = browser.getBoundingClientRect();
      pre.style.maxHeight = Math.max(190, Math.round(br.bottom - pr.top)) + 'px';
    }
    var mask = pre && pre.querySelector('.mask');
    if (!mask) return;
    // rect-based: <pre> is not a positioned ancestor, so offsetTop would not be relative to it
    var delta = mask.getBoundingClientRect().top - pre.getBoundingClientRect().top;
    pre.scrollTop = Math.max(0, pre.scrollTop + delta - pre.clientHeight / 2 + mask.offsetHeight / 2);
  }
  document.querySelectorAll('.panel').forEach(focusMask);
  window.addEventListener('resize', function () {
    focusMask(document.querySelector('.panel.on'));
  });

  /* ---- copy buttons ----
     data-copy may list several selectors; they are copied in the order written,
     not in document order, so "prompt then snippet" stays in that order. */
  document.querySelectorAll('.copy').forEach(function (btn) {
    var targets = btn.getAttribute('data-copy').split(',')
      .map(function (sel) { return document.querySelector(sel.trim()); })
      .filter(Boolean);
    var label = btn.querySelector('span');
    if (!targets.length || !label) return;
    var original = label.textContent;
    btn.addEventListener('click', function () {
      var text = targets.map(function (el) {
        return el.innerText.trim();
      }).join('\n\n');
      navigator.clipboard.writeText(text).then(function () {
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = original; }, 1600);
      });
    });
  });
})();
