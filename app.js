
(() => {
  const current = document.body.dataset.current;
  document.querySelectorAll('.bottom-nav a').forEach(a => {
    if (a.dataset.page === current) a.classList.add('active');
  });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
})();
