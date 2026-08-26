export function installTransformSelectionCommit() {
  if (globalThis.__boxlabTransformSelectionCommitInstalled) return;
  globalThis.__boxlabTransformSelectionCommitInstalled = true;
  const tools = document.querySelector('#toolModes');
  const multi = document.querySelector('#multiSelectToggle');
  if (!tools || !multi) return;

  tools.addEventListener('click', event => {
    const button = event.target.closest('button[data-tool]');
    if (!button || !multi.checked) return;
    multi.checked = false;
    multi.dispatchEvent(new Event('change', { bubbles: true }));
  }, true);
}
