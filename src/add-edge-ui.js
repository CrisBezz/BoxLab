const addEdgeBtn = document.querySelector('#connectVertexBtn');
const cageToggle = document.querySelector('#cageToggle');
const selectionStatus = document.querySelector('#selectionStatus');

if (addEdgeBtn && selectionStatus) {
  addEdgeBtn.addEventListener('click', () => {
    // Let BoxLab's main Add Edge handler run first, then report its visible result.
    setTimeout(() => {
      const created = /\bedge selected\b/i.test(selectionStatus.textContent || '');
      if (created) {
        if (cageToggle && !cageToggle.checked) {
          cageToggle.checked = true;
          cageToggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
        selectionStatus.textContent = 'Add Edge created • new edge selected';
      } else {
        selectionStatus.textContent = 'Add Edge not created • select 2 non-adjacent vertices on the same face';
      }
    }, 0);
  });
}
