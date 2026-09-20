// BoxLab release bootstrap — generic cache-busting updater.
// This file is intentionally version-agnostic so a cached shell can keep using it.
(() => {
  const titleMatch = document.title.match(/BoxLab\s+v([^\s]+)/i);
  const running = titleMatch?.[1] || null;
  const manifestUrl = new URL('./version.json', window.location.href);
  manifestUrl.searchParams.set('_', String(Date.now()));

  fetch(manifestUrl, { cache: 'no-store', credentials: 'same-origin' })
    .then(response => response.ok ? response.json() : Promise.reject(new Error(`release manifest ${response.status}`)))
    .then(data => {
      const latest = String(data?.version || '').trim();
      if (!latest || latest === running) return;
      const target = new URL(window.location.href);
      if (target.searchParams.get('build') === latest) return;
      target.searchParams.set('build', latest);
      target.searchParams.set('_reload', String(Date.now()));
      window.location.replace(target.href);
    })
    .catch(error => console.warn('BoxLab release check failed', error));
})();
