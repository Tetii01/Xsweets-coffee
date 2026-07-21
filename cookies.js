(function () {
  'use strict';

  var KEY = 'xsc_cookie_consent';
  var VERSION = '1';

  // Dacă a răspuns deja, nu mai afișăm nimic
  try {
    var saved = localStorage.getItem(KEY);
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed && parsed.v === VERSION) return;
    }
  } catch (e) { /* localStorage blocat — afișăm bannerul oricum */ }

  var css = '' +
    '#xsc-cookie{position:fixed;left:0;right:0;bottom:0;z-index:99999;' +
      'background:rgba(14,13,15,.97);backdrop-filter:blur(14px);' +
      '-webkit-backdrop-filter:blur(14px);' +
      'border-top:1px solid rgba(255,255,255,.12);' +
      'padding:20px clamp(16px,4vw,34px) calc(20px + env(safe-area-inset-bottom));' +
      'font-family:Montserrat,system-ui,-apple-system,sans-serif;color:#D8D6DC;' +
      'transform:translateY(105%);transition:transform .45s cubic-bezier(.2,.8,.2,1)}' +
    '#xsc-cookie.on{transform:translateY(0)}' +
    '#xsc-cookie .in{max-width:1060px;margin:0 auto;display:flex;align-items:center;' +
      'gap:clamp(16px,3vw,34px);flex-wrap:wrap}' +
    '#xsc-cookie p{margin:0;flex:1 1 320px;font-size:13.5px;line-height:1.65;color:#C9C7CE}' +
    '#xsc-cookie a{color:#E0616A;text-decoration:none;' +
      'border-bottom:1px solid rgba(216,50,61,.4)}' +
    '#xsc-cookie a:hover{color:#fff;border-color:#fff}' +
    '#xsc-cookie .btns{display:flex;gap:10px;flex:0 0 auto}' +
    '#xsc-cookie button{font-family:inherit;font-size:12px;letter-spacing:1.4px;' +
      'text-transform:uppercase;padding:11px 22px;border-radius:40px;cursor:pointer;' +
      'transition:all .3s ease;white-space:nowrap}' +
    '#xsc-cookie .no{background:transparent;color:#B4B2B8;' +
      'border:1px solid rgba(255,255,255,.18)}' +
    '#xsc-cookie .no:hover{color:#fff;border-color:rgba(255,255,255,.4)}' +
    '#xsc-cookie .yes{background:#D8323D;color:#fff;border:1px solid #D8323D}' +
    '#xsc-cookie .yes:hover{background:#c02932;border-color:#c02932}' +
    '@media(max-width:620px){' +
      '#xsc-cookie .in{flex-direction:column;align-items:stretch;gap:16px}' +
      '#xsc-cookie .btns{width:100%}' +
      '#xsc-cookie button{flex:1}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.id = 'xsc-cookie';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Consimțământ cookies');
  bar.innerHTML =
    '<div class="in">' +
      '<p>Folosim cookies pentru funcționarea corectă a site-ului. ' +
      'Nu folosim cookies de publicitate sau de urmărire a comportamentului. ' +
      'Detalii în <a href="Confidentialitate.dc.html">Politica de confidențialitate</a>.</p>' +
      '<div class="btns">' +
        '<button type="button" class="no">Refuz</button>' +
        '<button type="button" class="yes">Accept</button>' +
      '</div>' +
    '</div>';

  function save(choice) {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        v: VERSION,
        c: choice,
        t: new Date().toISOString()
      }));
    } catch (e) { /* ignorăm */ }
    bar.classList.remove('on');
    setTimeout(function () {
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    }, 500);
  }

  function mount() {
    document.body.appendChild(bar);
    bar.querySelector('.yes').addEventListener('click', function () { save('accept'); });
    bar.querySelector('.no').addEventListener('click', function () { save('refuz'); });
    setTimeout(function () { bar.classList.add('on'); }, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
