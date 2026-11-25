/* =========================================================
   BACKGROUND
   1. Two "silk ribbons" — bundles of thin flowing lines that
      twist like fabric. Scrolling makes them flow, twist and
      drift up/down the screen; fast scrolling adds a little energy.
   2. A faint starfield with gentle parallax.
   Everything is drawn at low opacity so it stays calm.
   ========================================================= */
(function () {
  const canvas = document.getElementById("bg3d");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [], w = 0, h = 0, shown = 0, introOn = false;
  let smoothY = scrollY, vel = 0, energy = 0;

  function build() {
    const dpr = Math.min(devicePixelRatio, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.round((w * h) / 9000) }, () => {
      const depth = [0.04, 0.1, 0.18][Math.floor(Math.random() * 3)];
      return { x: Math.random() * w, y: Math.random() * h, depth, r: 0.3 + depth * 3 * Math.random(), a: 0.05 + depth * Math.random(), sp: 0.2 + Math.random() * 0.6, ph: Math.random() * 6.28 };
    });
  }
  build();
  addEventListener("resize", build);

  // ribbon settings: [colour, lines, base opacity, vertical anchor, speed, twist]
  const RIBBONS = [
    { rgb: "205,181,154", lines: 26, alpha: 0.27, anchor: 0.62, speed: 1, twist: 1, amp: 0.16, width: 0.22, dir: 1 },
    { rgb: "236,230,218", lines: 18, alpha: 0.15, anchor: 0.32, speed: 0.7, twist: 1.4, amp: 0.12, width: 0.16, dir: -1 },
  ];

  function drawRibbon(r, t, sc) {
    const steps = Math.ceil(w / 10);
    // the ribbon slowly travels up and down the screen as you scroll
    const cy = h * (r.anchor + 0.12 * Math.sin(sc * 0.0004 * r.dir));
    const p = t * 0.00004 * r.speed + sc * 0.0006 * r.dir; // slow, calm drift
    const amp = h * r.amp * (1 + energy * 0.35);
    const width = h * r.width * (1 + energy * 0.5);

    // fade at the left / right edges
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, `rgba(${r.rgb},0)`);
    grad.addColorStop(0.2, `rgba(${r.rgb},1)`);
    grad.addColorStop(0.8, `rgba(${r.rgb},1)`);
    grad.addColorStop(1, `rgba(${r.rgb},0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;

    for (let i = 0; i < r.lines; i++) {
      const k = i / (r.lines - 1) - 0.5; // -0.5 … 0.5 across the ribbon
      // middle lines are brighter, outer ones softer
      ctx.globalAlpha = r.alpha * (1 - Math.abs(k) * 1.1) * shown * (1 + energy * 0.6);
      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const x = (s / steps) * w;
        const u = x / w;
        const centre = cy + amp * Math.sin(u * 4.2 + p * 6) + amp * 0.45 * Math.sin(u * 9.1 - p * 4 + 1.3);
        const spread = width * Math.sin(u * 3.1 * r.twist + p * 5 + 0.6); // twist: spread goes + → − like fabric
        const y = centre + k * spread + Math.sin(u * 14 + i * 0.35 + p * 3) * 2.5;
        s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function draw(t) {
    if (introOn && shown < 1) shown = Math.min(1, shown + 0.02);
    const prev = smoothY;
    smoothY += (scrollY - smoothY) * 0.08;         // eased so motion stays soft
    vel += ((smoothY - prev) - vel) * 0.15;
    energy += ((reduced ? 0 : Math.min(Math.abs(vel) / 30, 1)) - energy) * 0.08;
    const time = reduced ? 0 : t;

    ctx.clearRect(0, 0, w, h);

    // stars
    for (const s of stars) {
      const y = (((s.y - smoothY * s.depth) % h) + h) % h;
      const tw = reduced ? 1 : 0.6 + 0.4 * Math.sin(t * 0.001 * s.sp + s.ph);
      ctx.fillStyle = `rgba(236,230,218,${(Math.min(0.5, s.a * tw) * shown).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, Math.PI * 2); ctx.fill();
    }

    // silk ribbons
    RIBBONS.forEach((r) => drawRibbon(r, time, smoothY));

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  window.Scene3D = { intro() { introOn = true; if (/nointro|bgfull/.test(location.search)) shown = 1; }, setTheme() {}, measure() {} };
})();
