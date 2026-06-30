/**
 * Toggle About bio summary label and spacing when expanded.
 */
(function () {
  document.querySelectorAll('.about-bio-expand').forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;

    const closedLabel = 'Read full bio';
    const openLabel = 'Read short bio';

    function syncLabel() {
      summary.textContent = details.open ? openLabel : closedLabel;
    }

    details.addEventListener('toggle', syncLabel);
    syncLabel();
  });
})();
