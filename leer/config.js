// Configuração do site. Preencha depois de criar o produto na Hotmart e o pixel no Meta.
window.SITE = {
  pixelId: '',                                   // ID do pixel/conjunto de dados do Meta (só números)
  checkoutUrl: 'https://pay.hotmart.com/N108514533E?checkoutMode=10', // link de pagamento do produto principal na Hotmart
  supportEmail: 'soporte@fichasyguias.com',      // e-mail de suporte que aparece nas páginas
  price: 'US$ 7',
  upsellPrice: 'US$ 12,90'
};

(function () {
  var S = window.SITE;
  if (S.pixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', S.pixelId);
    fbq('track', 'PageView');
  }
  window.track = function (ev, data) { try { if (window.fbq) fbq('track', ev, data || {}); } catch (e) {} };

  // leva UTMs e parâmetros do anúncio até o checkout (src/sck/utm_*)
  window.checkoutLink = function () {
    var u = new URL(S.checkoutUrl);
    var q = new URLSearchParams(location.search);
    q.forEach(function (v, k) { if (/^(utm_|src$|sck$|fbclid$)/.test(k)) u.searchParams.set(k, v); });
    if (!u.searchParams.get('src') && q.get('utm_source')) u.searchParams.set('src', q.get('utm_source'));
    if (!u.searchParams.get('sck') && q.get('utm_campaign')) u.searchParams.set('sck', q.get('utm_campaign'));
    return u.toString();
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-buy]').forEach(function (a) {
      a.href = window.checkoutLink();
      a.addEventListener('click', function () { window.track('InitiateCheckout', { value: 7, currency: 'USD' }); });
    });
    document.querySelectorAll('[data-email]').forEach(function (el) {
      el.textContent = S.supportEmail;
      if (el.tagName === 'A') el.href = 'mailto:' + S.supportEmail;
    });
    document.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = S.price; });
    document.querySelectorAll('[data-upsell-price]').forEach(function (el) { el.textContent = S.upsellPrice; });
  });
})();
