/* =========================================================
   SoilSight AI — case study interactions
   ========================================================= */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.Scene3D) Scene3D.intro();
  if (!window.gsap) { document.body.classList.add("no-anim"); return; } // still fully readable without animation
  gsap.registerPlugin(ScrollTrigger);
  // preview helper for tall screenshots: soilsight.html?tall
  if (/tall/.test(location.search)) { $(".cs-cover").style.minHeight = "900px"; gsap.globalTimeline.timeScale(40); }

  /* smooth scroll */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const el = $(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(el, { offset: -20, duration: 1.6 }) : el.scrollIntoView({ behavior: "smooth" });
  });

  /* reading progress */
  gsap.to(".progress span", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  /* cover: title rises, image slowly zooms out, parallax on scroll */
  gsap.timeline({ defaults: { ease: "expo.out" } })
    .from(".cs-cover-img img", { scale: 1.25, filter: "blur(10px)", duration: 2.4 }, 0)
    .from(".cs-title .ln > span", { yPercent: 110, duration: 1.5, stagger: 0.12 }, 0.3)
    .from(".cs-cover-text .kicker, .cs-sub, .cs-meta > div", { y: 26, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.7)
    .from(".cs-bar", { y: -30, opacity: 0, duration: 1.2 }, 0.9)
    .from(".cs-stat", { y: 40, opacity: 0, duration: 1.2, stagger: 0.08 }, 1);
  gsap.to(".cs-cover-img img", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".cs-cover", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".cs-cover-text", { yPercent: -20, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".cs-cover", start: "top top", end: "bottom top", scrub: true } });

  /* counters */
  $$("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), o = { v: 0 };
    gsap.to(o, {
      v: end, duration: 2.2, ease: "power3.out", delay: 1.1,
      onUpdate: () => { el.textContent = dec ? o.v.toFixed(dec) : Math.round(o.v).toLocaleString("en-IN"); },
    });
  });

  /* section reveals */
  $$(".cs-sec").forEach((sec) => {
    gsap.from($$(".cs-num, h2", sec), { y: 40, opacity: 0, duration: 1.3, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: sec, start: "top 80%" } });
  });
  $$(".cs-sec > p, .cs-sec > h3, .callout, .tbl-wrap, .cs-stack, .ticks li").forEach((el) => {
    gsap.from(el, { y: 30, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  $$(".cs-cards, .sources, .findings, .podium").forEach((grid) => {
    gsap.from(grid.children, { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: grid, start: "top 85%" } });
  });
  $$(".dtable tbody").forEach((tb) => {
    gsap.from(tb.children, { x: -16, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.035, scrollTrigger: { trigger: tb, start: "top 85%" } });
  });

  /* figures: rise + unblur */
  $$(".fig img").forEach((img) => {
    gsap.from(img, { y: 60, scale: 0.96, opacity: 0, filter: "blur(8px)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: img, start: "top 88%" } });
  });

  /* pipeline line draws, steps pop */
  const pipe = $(".pipe");
  gsap.to(pipe, { "--prog": 1, ease: "none", scrollTrigger: { trigger: pipe, start: "top 80%", end: "bottom 50%", scrub: 0.6 } });
  gsap.from(".pipe li", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: pipe, start: "top 85%" } });

  /* continent split grows */
  gsap.from(".split-bar span", { scaleX: 0, duration: 1.4, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".split-bar", start: "top 85%" } });

  /* animated bars */
  const growBars = (sel, trigger) => gsap.to(sel, { scaleX: 1, duration: 1.4, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger, start: "top 85%" } });
  growBars(".bars .bar i", ".bars");
  growBars(".hbars .hb i", ".hbars");
  growBars(".imp i", ".imp");

  /* LORO folds light up one after another */
  const rows = $$(".loro-row");
  let fold = 0, loroTimer = null;
  ScrollTrigger.create({
    trigger: ".loro", start: "top 80%", end: "bottom 20%",
    onToggle: (self) => {
      clearInterval(loroTimer);
      if (!self.isActive) { rows.forEach((r) => r.classList.remove("on")); return; }
      const step = () => { rows.forEach((r, i) => r.classList.toggle("on", i === fold)); fold = (fold + 1) % rows.length; };
      step(); loroTimer = setInterval(step, 1600);
    },
  });
  gsap.from(".loro-row", { x: -40, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".loro", start: "top 85%" } });

  /* table of contents: highlight current section */
  const links = $$(".cs-toc a");
  $$(".cs-sec").forEach((sec) => ScrollTrigger.create({
    trigger: sec, start: "top 40%", end: "bottom 40%",
    onToggle: (self) => { if (self.isActive) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${sec.id}`)); },
  }));

  /* click a figure to zoom */
  const zoom = $("#zoom"), zImg = $("img", zoom), zCap = $(".zoom-cap", zoom);
  const openZoom = (fig) => {
    zImg.src = $("img", fig).src; zImg.alt = $("img", fig).alt;
    zCap.textContent = $("figcaption", fig)?.textContent || "";
    zoom.setAttribute("aria-hidden", "false");
    if (lenis) lenis.stop();
    gsap.to(zoom, { autoAlpha: 1, duration: 0.4 });
    gsap.fromTo(zImg, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" });
  };
  const closeZoom = () => {
    zoom.setAttribute("aria-hidden", "true");
    gsap.to(zoom, { autoAlpha: 0, duration: 0.35, onComplete: () => lenis && lenis.start() });
  };
  $$("[data-zoom]").forEach((fig) => fig.addEventListener("click", () => openZoom(fig)));
  zoom.addEventListener("click", closeZoom);
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeZoom(); });

  addEventListener("load", () => ScrollTrigger.refresh());
})();
