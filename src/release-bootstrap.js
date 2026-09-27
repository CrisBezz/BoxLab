// BoxLab release bootstrap — cache-busting updater.
// If a stale HTML shell survives the first build redirect, retry with a fresh
// reload nonce instead of accepting the stale document indefinitely.
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
      const previousLatest = sessionStorage.getItem('boxlab-refresh-latest');
      const attempts = previousLatest === latest
        ? Number(sessionStorage.getItem('boxlab-refresh-attempts') || 0)
        : 0;

      if (attempts >= 3) {
        console.warn('BoxLab release refresh stopped after repeated stale-shell responses', { running, latest });
        return;
      }

      sessionStorage.setItem('boxlab-refresh-latest', latest);
      sessionStorage.setItem('boxlab-refresh-attempts', String(attempts + 1));
      target.searchParams.set('build', latest);
      target.searchParams.set('_reload', String(Date.now()));
      window.location.replace(target.href);
    })
    .catch(error => console.warn('BoxLab release check failed', error));
})();
