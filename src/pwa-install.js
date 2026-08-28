const button = document.querySelector('#installAppBtn');
const status = document.querySelector('#selectionStatus');
let installPrompt = null;

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installPrompt = event;
  if (button) button.textContent = 'Install BoxLab';
});

button?.addEventListener('click', async () => {
  if (installPrompt) {
    await installPrompt.prompt();
    installPrompt = null;
    return;
  }
  if (status) status.textContent = 'Safari: Share → Add to Home Screen for a full workspace';
});
