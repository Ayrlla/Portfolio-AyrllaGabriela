// Toggle de tema simples (data-theme no <html>)
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if(!btn) return;

  // restaura preferência
  const stored = localStorage.getItem('theme');
  if(stored) root.setAttribute('data-theme', stored);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
  });
})();
