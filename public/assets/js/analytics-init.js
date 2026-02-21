window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

gtag('js', new Date());

// Read GA ID from the gtag script tag src attribute
(function () {
  var script = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (script) {
    var match = script.src.match(/[?&]id=([^&]+)/);
    if (match) gtag('config', match[1]);
  }
})();
