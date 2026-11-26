/* =========================================================
   LIGHT / DARK SWITCH — shared by both pages
   The saved theme is applied in <head> before anything draws
   (no flash). This file wires up every switch on the page:
   the sun/moon button in the top bar (#themeToggle) and the
   "Light mode" row inside the phone menu ([data-theme-toggle]).
   ========================================================= */
(function () {
  const KEY = "ac-theme-v3";
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll("#themeToggle, [data-theme-toggle]")];
  if (!buttons.length) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isLight = () => root.dataset.theme === "light";
  function label() {
    buttons.forEach((b) => {
      b.setAttribute("aria-label", isLight() ? "Switch to dark mode" : "Switch to light mode");
      if (b.hasAttribute("data-theme-toggle")) {
        b.setAttribute("aria-pressed", String(isLight()));
        const t = b.querySelector(".mt-label");
        if (t) t.textContent = "Light mode";
      }
    });
  }
  label();

  function apply(next) {
    root.dataset.theme = next;
    root.style.colorScheme = next === "light" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch (e) {}
    label();
    document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }

  buttons.forEach((btn) => btn.addEventListener("click", () => {
    const next = isLight() ? "noir" : "light";
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    // circular reveal from the button that was pressed (where supported)
    if (document.startViewTransition && !reduced) {
      const vt = document.startViewTransition(() => apply(next));
      vt.ready.then(() => {
        const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
          { duration: 900, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" });
      }).catch(() => {});
    } else apply(next);
  }));
})();
