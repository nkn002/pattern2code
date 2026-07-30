// Gallery tabs
document.querySelectorAll('#gallery-tabs li').forEach(function (li) {
  li.addEventListener('click', function () {
    var idx = li.getAttribute('data-tab');
    document.querySelectorAll('#gallery-tabs li').forEach(function (x) {
      x.classList.remove('is-active');
    });
    li.classList.add('is-active');
    document.querySelectorAll('.gallery-panel').forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-panel') === idx);
    });
  });
});

// Copy prompt
var btn = document.getElementById('copy-btn');
if (btn) {
  btn.addEventListener('click', function () {
    var text = document.getElementById('prompt-text').innerText;
    navigator.clipboard.writeText(text).then(function () {
      var span = btn.querySelector('span:last-child');
      var old = span.innerText;
      span.innerText = 'Copied!';
      setTimeout(function () { span.innerText = old; }, 1500);
    });
  });
}
