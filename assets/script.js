(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const favicon = document.getElementById("favicon");
  if (!btn || !favicon) return;

  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  const isDark = () => root.getAttribute("data-theme") === "dark";
  const setFavicon = () => favicon.setAttribute("href", isDark() ? "assets/moon.svg" : "assets/sun.svg");
  const setIcon = () => {
    
    const path = btn.querySelector("path");
    if (!path) return;
    if (isDark()) {
      
    }
  };

  setFavicon(); setIcon();

  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setFavicon(); setIcon();
  });
})();

(function () {
  const nav = document.querySelector(".nav");
  const underline = document.querySelector(".nav-underline");
  if (!nav || !underline) return;

  const links = [...nav.querySelectorAll(".nav-link")];

  function positionUnderline(el) {
    const rect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    underline.style.width = rect.width + "px";
    underline.style.left = (rect.left - navRect.left) + "px";
  }

  positionUnderline(links[0]);

  links.forEach(link => {
    link.addEventListener("mouseenter", () => positionUnderline(link));
  });
  nav.addEventListener("mouseleave", () => positionUnderline(links[0]));

  const about = document.getElementById("sobre");
  if (about) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const lnk = links.find(l => l.getAttribute("href") === "#sobre");
        if (lnk) positionUnderline(lnk);
      } else {
        positionUnderline(links[0]); 
      }
    }, { rootMargin: "-40% 0px -40% 0px" });
    io.observe(about);
  }
})();


(function () {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  }, { rootMargin: "0px 0px -10% 0px" });
  els.forEach(el => io.observe(el));
})();
