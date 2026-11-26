/* =========================================================
   LIGHT / DARK SWITCH — shared by both pages
   The saved theme is applied in <head> before anything draws
   (no flash). This file wires up the sun/moon button.
   ========================================================= */
(function () {
  const KEY = "ac-theme-v3";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const label = () => btn.setAttribute("aria-label", root.dataset.theme === "light" ? "Switch to dark mode" : "Switch to light mode");
  label();

  function apply(next) {
    root.dataset.theme = next;
    root.style.colorScheme = next === "light" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch (e) {}
    label();
    document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "noir" : "light";
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    // circular reveal from the button (where supported)
    if (document.startViewTransition && !reduced) {
      const vt = document.startViewTransition(() => apply(next));
      vt.ready.then(() => {
        const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
          { duration: 900, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" });
      }).catch(() => {});
    } else apply(next);
  });
})();
