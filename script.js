document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  // Header glass effect
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobile menu
  const setMenu = (open) => {
    mobileMenu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  };

  menuToggle.addEventListener("click", () => {
    setMenu(!mobileMenu.classList.contains("open"));
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Scroll Reveal
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("is-visible"));
  }

  // Small animated metric in hero
  const counter = document.querySelector(".counter");
  if (counter && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;

      const target = Number(counter.dataset.target || 0);
      const duration = 1100;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.6 });

    counterObserver.observe(counter);
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Close menu with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
});
