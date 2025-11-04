(function () {
  const root  = document.documentElement;
  const btn   = document.getElementById('themeToggle');
  const icon  = document.getElementById('themeIcon');
  if (!btn || !icon) return;

  const ICON = {
    light: './imagens/brilho-do-sol.png',
    dark:  './imagens/forma-de-meia-lua.png'
  };

  const stored      = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial     = stored || (prefersDark ? 'dark' : 'light');

  const apply = (t) => {
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    icon.src = ICON[t];
    icon.alt = t === 'dark' ? 'tema escuro' : 'tema claro';
  };

  apply(initial);
  btn.addEventListener('click', () => {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();

(function () {
  const els = Array.from(document.querySelectorAll('.fade-up'));
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });

  els.forEach(el => io.observe(el));
})();

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Enviando…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        status.textContent = 'Mensagem enviada com sucesso! ✔';
      } else {
        const data = await res.json().catch(() => ({}));
        status.textContent = (data?.errors?.[0]?.message) || 'Não foi possível enviar. Tente novamente.';
      }
    } catch {
      status.textContent = 'Falha de rede. Verifique sua conexão.';
    }
  });
})();
