const addEdgeBtn = document.querySelector('#connectVertexBtn');
const cageToggle = document.querySelector('#cageToggle');
const selectionStatus = document.querySelector('#selectionStatus');
const multiToggle = document.querySelector('#multiSelectToggle');

let multiWasEnabled = false;

if (addEdgeBtn && selectionStatus) {
  // Capture the selection-mode state before BoxLab's main Join handler runs.
  addEdgeBtn.addEventListener('click', () => {
    multiWasEnabled = !!multiToggle?.checked;
  }, true);

  addEdgeBtn.addEventListener('click', () => {
    // Let BoxLab's main Add Edge handler run first, then report its visible result.
    setTimeout(() => {
      const created = /\bedge selected\b/i.test(selectionStatus.textContent || '');
      if (created) {
        if (cageToggle && !cageToggle.checked) {
          cageToggle.checked = true;
          cageToggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
        // Join temporarily switches to Edge mode, but repeated vertex-joining should
        // not silently disarm Multi. Restore the user's prior Multi state so it is
        // still armed when they switch back to Vertex mode.
        if (multiWasEnabled && multiToggle && !multiToggle.checked) {
          multiToggle.checked = true;
          multiToggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
        selectionStatus.textContent = 'Add Edge created • new edge selected';
      } else {
        selectionStatus.textContent = 'Add Edge not created • select 2 vertices that are not already connected';
      }
    }, 0);
  });
}
