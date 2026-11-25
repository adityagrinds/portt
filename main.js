/* =========================================================
   EDIT ME — all content lives here
   ========================================================= */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const PROFILE = {
  // Tech cards in the 3D carousel: [name, devicon path, category]. Edit freely.
  tech: [
    ["Python", "python/python-original", "Language"], ["C++", "cplusplus/cplusplus-original", "Language"],
    ["C", "c/c-original", "Language"], ["Java", "java/java-original", "Language"],
    ["JavaScript", "javascript/javascript-original", "Language"], ["HTML5", "html5/html5-original", "Markup"],
    ["CSS3", "css3/css3-original", "Styling"], ["React", "react/react-original", "Framework"],
    ["Node.js", "nodejs/nodejs-original", "Runtime"], ["Tailwind CSS", "tailwindcss/tailwindcss-original", "Styling"],
    ["MySQL", "mysql/mysql-original", "Database"], ["Firebase", "firebase/firebase-original", "Backend"],
    ["Google Cloud", "googlecloud/googlecloud-original", "Cloud"], ["Git", "git/git-original", "Version control"],
    ["GitHub", "github/github-original", "Collaboration"], ["Figma", "figma/figma-original", "Design"],
    ["VS Code", "vscode/vscode-original", "Editor"], ["Linux", "linux/linux-original", "OS"],
  ],
  // Skills shown in the two drifting rows — edit to match Angel's real strengths
  skills: [
    "Data Structures", "Algorithms", "Problem Solving", "OOP", "Web Development", "UI / UX Design",
    "Responsive Design", "REST APIs", "DBMS & SQL", "Operating Systems", "Computer Networks", "Version Control",
    "Cloud Fundamentals", "Machine Learning Basics", "Rapid Prototyping", "Public Speaking", "Team Leadership",
    "Community Building", "Event Management", "Technical Writing", "Collaboration", "Hackathon Strategy",
  ],
  projects: [
    { title: "VisionX Winning Build", text: "The project that took 1st prize at VisionX, GeeksforGeeks office. Add the problem, the idea and what the team shipped.", tags: ["Hackathon", "1st Prize"], image: "assets/events/visionx-3.jpg", link: "" },
    { title: "Project Two", text: "A short description of what this project does and why it matters.", tags: ["Web", "UI"], image: "", link: "" },
    { title: "SoilSight AI", featured: true,
      text: "Predicts topsoil moisture on continents the model has never seen — from Sentinel-1/2 satellite, rainfall, terrain and soil data. 7 regressors + ensembles, leave-one-region-out validation, best RMSE 0.0857 m³/m³.",
      tags: ["Machine Learning", "Remote Sensing", "Python"], image: "assets/soilsight/cover.jpg", link: "soilsight.html", linkText: "Read the case study →" },
  ],
  // Event photos orbit each event. Files live in assets/events/.
  events: [
    { id: "visionx", short: "VisionX", kicker: "Hackathon · 1st Prize", title: "VisionX Hackathon", venue: "GeeksforGeeks office",
      text: "Our team took 1st prize at VisionX, hosted at the GeeksforGeeks office — a sprint of ideas, teamwork and code, shipped under the clock.",
      photos: ["assets/events/visionx-1.jpg", "assets/events/visionx-2.jpg", "assets/events/visionx-3.jpg"] },
    { id: "gsa", short: "Google SA", kicker: "Community · Leadership", title: "Google Student Ambassador 2026", venue: "Gemini Student Ambassador Program",
      text: "Selected for Google's Gemini Student Ambassador Program 2026 — representing Gemini on campus, leading AI workshops and helping peers explore what they can build. Bronze · The Explorer.",
      photos: ["assets/events/gsa-1.jpg", "assets/events/gsa-2.jpg"] },
    { id: "nasa", short: "NASA", kicker: "Hackathon · Innovator", title: "NASA Space Apps Challenge 2025", venue: "Manav Rachna Campus, Noida",
      text: "A 30-hour hackathon powered by NASA's open data, held on 4–5 October 2025 — building with a team of six as an Innovator.",
      photos: ["assets/events/nasa-1.jpg", "assets/events/nasa-2.jpg", "assets/events/nasa-3.jpg", "assets/events/nasa-4.jpg"] },
    { id: "aws", short: "AWS", kicker: "Developer Event · AWS", title: "AWS Builder Center: Future Builders Connect", venue: "AWS Builder Center",
      text: "Learn. Build. Connect. — panels with builders from AWS, hands-on activity zones, a builder passport, and a day spent with people who love to build.",
      photos: ["assets/events/aws-1.jpg", "assets/events/aws-2.jpg", "assets/events/aws-3.jpg", "assets/events/aws-4.jpg"] },
    { id: "tryst", short: "Tryst'26", kicker: "Tech Fest · Workshop", title: "Tryst'26 — IIT Delhi", venue: "IIT Delhi",
      text: "IIT Delhi's technical fest (27 Feb – 1 Mar 2026), themed “Innovating for a Sustainable Future” — completed the Generative AI workshop and explored the campus.",
      photos: ["assets/events/tryst-1.jpg", "assets/events/tryst-2.jpg", "assets/events/tryst-3.jpg", "assets/events/tryst-4.jpg", "assets/events/tryst-5.jpg"] },
    { id: "community", short: "Community", kicker: "Volunteering · Teaching", title: "Teaching & Community", venue: "Rohtak, Haryana",
      text: "Volunteering time to run learning sessions with children in Rohtak — because learning means more when it's shared.",
      photos: ["assets/events/community-1.jpg", "assets/events/community-2.jpg"] },
  ],
};

const PLACEHOLDER_COUNT = 6;

/* =========================================================
   SETUP
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const root = document.documentElement;
const params = new URLSearchParams(location.search);
const skipIntro = reduced || params.has("nointro");
if (params.has("tall")) $(".hero").style.minHeight = "900px"; // preview helper

gsap.registerPlugin(ScrollTrigger);

$("#year").textContent = new Date().getFullYear();

/* ---------- smooth scroll ---------- */
let lenis = null;
if (window.Lenis && !reduced) {
  lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
const lockScroll = (on) => { if (lenis) on ? lenis.stop() : lenis.start(); document.body.style.overflow = on ? "hidden" : ""; };
function scrollToTarget(sel) {
  const el = $(sel);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.8 }); else el.scrollIntoView({ behavior: "smooth" });
}
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  if (a.hasAttribute("data-close")) closeCard();
  scrollToTarget(a.getAttribute("href"));
});

const placeholder = (label) => `<div class="ph mono"><span>${label}</span></div>`;

/* ---------- projects ---------- */
// featured projects (with a full case study) are shown first
const projectsSorted = [...PROFILE.projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
$("#projectGrid").innerHTML = projectsSorted.map((p) => {
  const external = /^https?:/.test(p.link || "");
  const linkAttrs = external ? ' target="_blank" rel="noopener"' : "";
  return `
  <article class="project glass tilt ${p.featured ? "featured" : ""}" ${p.link ? `data-href="${p.link}"` : ""}>
    <div class="photo-slot" data-label="${p.title}" ${p.image ? `data-src="${p.image}"` : ""}></div>
    <div class="project-body">
      ${p.featured ? `<span class="feat-badge mono">★ Featured · Case study</span>` : ""}
      <div class="tags">${p.tags.map((t) => `<span class="mono">${t}</span>`).join("")}</div>
      <h3>${p.title}</h3>
      <p>${p.text}</p>
      ${p.link ? `<a class="link-btn mono" href="${p.link}"${linkAttrs}>${p.linkText || "View project →"}</a>` : ""}
    </div>
  </article>`;
}).join("");
// coming back with the browser's Back button: undo the fade-out
addEventListener("pageshow", (e) => { if (e.persisted) gsap.set("main, .nav", { opacity: 1, y: 0 }); });
// the whole featured card is clickable, with a soft fade-out page transition
$$(".project[data-href]").forEach((card) => card.addEventListener("click", (e) => {
  const href = card.dataset.href;
  if (/^https?:/.test(href)) { if (!e.target.closest("a")) window.open(href, "_blank", "noopener"); return; }
  e.preventDefault();
  gsap.to("main, .nav", { opacity: 0, y: -20, duration: 0.5, ease: "power2.in", onComplete: () => { location.href = href; } });
}));
$$(".photo-slot").forEach((slot) => {
  const src = slot.dataset.src;
  slot.innerHTML = src
    ? `<img src="${src}" alt="${slot.dataset.label}" loading="lazy">`
    : `<div class="slot-label mono"><span>${slot.dataset.label}</span></div>`;
  const blinds = "<i></i>".repeat(6);
  slot.insertAdjacentHTML("beforeend", `<div class="curtain c1">${blinds}</div><div class="curtain c2">${blinds}</div><div class="sheen"></div>`);
});

/* ---------- text splitting ---------- */
$$(".split").forEach((el) => {
  el.innerHTML = [...el.textContent].map((c) => `<span class="char">${c === " " ? "&nbsp;" : c}</span>`).join("");
});
$$(".split-words").forEach((el) => {
  const walk = (node) => {
    [...node.childNodes].forEach((ch) => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(" ")); return; }
          const outer = document.createElement("span"); outer.className = "w";
          const inner = document.createElement("span"); inner.textContent = w;
          outer.appendChild(inner); frag.appendChild(outer);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1) walk(ch);
    });
  };
  walk(el);
});

/* =========================================================
   CURSOR — clean dot + a soft stardust trail
   ========================================================= */
const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
let inkRGB = [18, 18, 20], accentRGB = [140, 116, 104];
function readColors() {
  const cs = getComputedStyle(root);
  const hex = (h) => { h = h.trim().replace("#", ""); if (h.length === 3) h = h.split("").map((c) => c + c).join(""); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  try { inkRGB = hex(cs.getPropertyValue("--ink")); accentRGB = hex(cs.getPropertyValue("--accent")); } catch (e) {}
}
readColors();

if (finePointer && !reduced) {
  root.classList.add("has-cursor");
  const dot = $(".cursor-dot");
  const cv = $("#trail"), ctx = cv.getContext("2d");
  const dpr = Math.min(devicePixelRatio, 2);
  const size = () => { cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size(); addEventListener("resize", size);

  const trail = [], dust = [];
  let last = null;
  addEventListener("pointermove", (e) => {
    pointer.x = e.clientX; pointer.y = e.clientY;
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    const now = performance.now();
    trail.push({ x: e.clientX, y: e.clientY, t: now });
    if (last) {
      const d = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      const n = Math.min(3, Math.floor(d / 14));
      for (let i = 0; i < n; i++) {
        if (Math.random() > 0.55) continue;
        dust.push({
          x: e.clientX + (Math.random() - 0.5) * 10, y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.5, vy: -Math.random() * 0.4 - 0.1,
          life: 0, max: 700 + Math.random() * 700, r: 0.6 + Math.random() * 1.4,
          star: Math.random() < 0.28, accent: Math.random() < 0.35,
        });
      }
    }
    last = { x: e.clientX, y: e.clientY };
  });
  document.addEventListener("pointerover", (e) => {
    dot.classList.toggle("hover", !!e.target.closest("a, button, .tilt, .event-orbit, .tcard, .photo-slot"));
  });
  document.addEventListener("pointerleave", () => { dot.style.opacity = 0; });
  document.addEventListener("pointerenter", () => { dot.style.opacity = ""; });

  let prev = performance.now();
  (function draw(now) {
    const dt = Math.min(50, now - prev); prev = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // ribbon
    while (trail.length && now - trail[0].t > 320) trail.shift();
    if (trail.length > 2) {
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1], b = trail[i];
        const k = i / trail.length;
        ctx.strokeStyle = `rgba(${inkRGB.join(",")},${(k * 0.28).toFixed(3)})`;
        ctx.lineWidth = k * 1.6;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    // stardust
    for (let i = dust.length - 1; i >= 0; i--) {
      const p = dust[i];
      p.life += dt;
      if (p.life > p.max) { dust.splice(i, 1); continue; }
      p.x += p.vx * dt * 0.06; p.y += p.vy * dt * 0.06;
      const f = 1 - p.life / p.max;
      const c = p.accent ? accentRGB : inkRGB;
      ctx.fillStyle = `rgba(${c.join(",")},${(f * 0.7).toFixed(3)})`;
      if (p.star) {
        const s = p.r * 2.6 * (0.6 + f * 0.4);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s); ctx.quadraticCurveTo(p.x, p.y, p.x + s, p.y);
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s); ctx.quadraticCurveTo(p.x, p.y, p.x - s, p.y);
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s); ctx.fill();
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * f, 0, Math.PI * 2); ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  })(prev);
} else {
  addEventListener("pointermove", (e) => { pointer.x = e.clientX; pointer.y = e.clientY; });
}

/* =========================================================
   PROFILE CARD — dark ID card with tilt + glare
   ========================================================= */
const overlay = $("#cardOverlay"), pcard = $("#pcard"), portrait = $("#portrait");
let cardOpen = false;
function openCard() {
  if (cardOpen) return;
  cardOpen = true;
  overlay.setAttribute("aria-hidden", "false");
  lockScroll(true);
  gsap.timeline()
    .to(overlay, { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
    .fromTo(pcard, { rotateX: 18, rotateY: -14, y: 80, scale: 0.88, opacity: 0, filter: "blur(10px)" },
      { rotateX: 0, rotateY: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }, 0.05)
    .from(".pcard-media img", { y: 60, opacity: 0, duration: 1.3, ease: "expo.out" }, 0.3)
    .from(".pcard h3, .pcard .role, .pc-brief, .pc-facts > div, .status, .pc-actions", { y: 18, opacity: 0, stagger: 0.05, duration: 0.8, ease: "power3.out" }, 0.35);
  setTimeout(() => $("#pcClose").focus(), 60);
}
function closeCard() {
  if (!cardOpen) return;
  cardOpen = false;
  overlay.setAttribute("aria-hidden", "true");
  gsap.timeline({ onComplete: () => lockScroll(false) })
    .to(pcard, { rotateX: -10, y: 40, scale: 0.92, opacity: 0, duration: 0.45, ease: "power3.in" })
    .to(overlay, { autoAlpha: 0, duration: 0.35 }, "-=0.15");
}
portrait.addEventListener("click", openCard);
$("#pcClose").addEventListener("click", closeCard);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeCard(); });
pcard.addEventListener("pointermove", (e) => {
  const r = pcard.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
  pcard.style.setProperty("--gx", `${px * 100}%`); pcard.style.setProperty("--gy", `${py * 100}%`);
  gsap.to(pcard, { rotateY: (px - 0.5) * 8, rotateX: -(py - 0.5) * 8, duration: 0.8, ease: "power3.out" });
});
pcard.addEventListener("pointerleave", () => gsap.to(pcard, { rotateX: 0, rotateY: 0, duration: 1.2, ease: "power3.out" }));

/* =========================================================
   TILT · MAGNETIC · PORTRAIT
   ========================================================= */
if (finePointer) {
  $$(".tilt").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * 5, rotateX: -py * 5, transformPerspective: 1100, duration: 0.8, ease: "power3.out" });
    });
    el.addEventListener("pointerleave", () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 1.2, ease: "power3.out" }));
  });
  $$(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.6, ease: "power3.out" });
    });
    el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.45)" }));
  });
  $(".hero").addEventListener("pointermove", (e) => {
    const px = e.clientX / innerWidth - 0.5, py = e.clientY / innerHeight - 0.5;
    gsap.to(".portrait", { x: px * 14, y: py * 8, rotateY: px * 6, transformPerspective: 1000, duration: 1.2, ease: "power3.out" });
    gsap.to(".arch", { x: px * -8, y: py * -5, duration: 1.4, ease: "power3.out" });
    gsap.to(".hero-orbits", { x: px * -16, y: py * -10, duration: 1.6, ease: "power3.out" });
  });
}

/* =========================================================
   TOOLKIT — curved carousel of big tech cards (logo + name)
   Cards glide left → right across the full width. Every card
   faces you; the one in the middle is largest and brightest,
   cards toward the edges tilt away slightly like a curved screen.
   Drag / flick to scroll it, hover to slow, page-scroll speeds it.
   ========================================================= */
const cyl = $("#cyl"), cylStage = $("#cylStage");
cyl.innerHTML = PROFILE.tech.map(([name, path, kind]) => `
  <div class="tcard" data-name="${name}">
    <div class="tcard-in">
      <span class="tc-logo"><img src="assets/tech/${path.split("/")[1]}.svg" alt="${name} logo" onerror="this.onerror=null;this.src='${DEVICON}/${path}.svg'"></span>
      <span class="tc-name">${name}</span>
      <span class="tc-kind mono">${kind}</span>
    </div>
  </div>`).join("");
const tcards = $$(".tcard", cyl);
const carousel = { off: 0, vel: 60, base: 60, drag: false, lastX: 0, visible: true, boost: 0, gap: 230 };

function layoutCarousel() { carousel.gap = (tcards[0].offsetWidth || 190) + 34; }
layoutCarousel();
addEventListener("resize", layoutCarousel);
new IntersectionObserver(([en]) => (carousel.visible = en.isIntersecting)).observe(cylStage);

cylStage.addEventListener("pointerdown", (e) => { carousel.drag = true; carousel.lastX = e.clientX; cylStage.setPointerCapture(e.pointerId); cylStage.classList.add("dragging"); });
cylStage.addEventListener("pointermove", (e) => {
  if (!carousel.drag) return;
  const dx = e.clientX - carousel.lastX; carousel.lastX = e.clientX;
  carousel.off += dx;
  carousel.vel = dx * 50; // flick momentum
});
const endDrag = () => { carousel.drag = false; cylStage.classList.remove("dragging"); };
cylStage.addEventListener("pointerup", endDrag);
cylStage.addEventListener("pointercancel", endDrag);
cylStage.addEventListener("pointerenter", () => (carousel.base = 18));
cylStage.addEventListener("pointerleave", () => (carousel.base = 60));

function carouselFrame(dt, scrollV) {
  if (!carousel.visible) return;
  carousel.boost += (Math.min(Math.abs(scrollV) * 4, 260) - carousel.boost) * 0.08;
  if (!carousel.drag) {
    carousel.vel += (carousel.base - carousel.vel) * 0.04;
    carousel.off += (carousel.vel + carousel.boost) * dt; // positive = moving left → right
  }
  const total = carousel.gap * tcards.length;
  const halfW = cylStage.clientWidth / 2;
  tcards.forEach((c, i) => {
    // wrap each card into [-total/2, total/2) around the centre
    let x = ((i * carousel.gap + carousel.off) % total + total) % total - total / 2;
    const d = Math.max(-1.4, Math.min(1.4, x / halfW)); // -1 left edge … 1 right edge
    const ad = Math.abs(d);
    const scale = 1.12 - Math.min(ad, 1) * 0.3;
    const rot = -d * 22;               // curved-screen tilt
    const z = -ad * ad * 160;
    const y = ad * ad * 18;
    c.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rot}deg) scale(${scale})`;
    c.style.opacity = Math.max(0, 1 - Math.pow(Math.max(0, ad - 0.55), 1.4) * 1.3).toFixed(3);
    c.style.zIndex = 100 - Math.round(ad * 50);
    c.style.setProperty("--lit", Math.max(0, 1 - ad).toFixed(3));
  });
}

/* ---------- skills: two big rows drifting in opposite directions ---------- */
const half = Math.ceil(PROFILE.skills.length / 2);
const skillRow = (list) => [...list, ...list].map((s, i) => `<span class="sk ${i % 3 === 1 ? "serif" : ""}">${s}</span><i>✦</i>`).join("");
$("#skillRows").innerHTML = `
  <div class="sk-row"><div class="sk-track">${skillRow(PROFILE.skills.slice(0, half))}</div></div>
  <div class="sk-row rev"><div class="sk-track">${skillRow(PROFILE.skills.slice(half))}</div></div>`;

/* =========================================================
   EVENTS — photos orbit each event; click to enter
   ========================================================= */
const eventsEl = $("#events");
const eventPhotos = (ev) => (ev.photos.length ? ev.photos : Array.from({ length: PLACEHOLDER_COUNT }, () => ""));
// events with the most photos are shown first
const EVENTS_SORTED = [...PROFILE.events].sort((a, b) => eventPhotos(b).length - eventPhotos(a).length);
eventsEl.innerHTML = EVENTS_SORTED.map((ev, idx) => {
  const photos = eventPhotos(ev);
  return `
  <article class="event" data-event="${ev.id}">
    <div class="event-orbit" data-event="${ev.id}" role="button" tabindex="0" aria-label="Open ${ev.title} photos">
      <div class="ev-path"></div><div class="ev-path p2"></div>
      <div class="event-core"><span class="mono">${String(idx + 1).padStart(2, "0")} / ${String(PROFILE.events.length).padStart(2, "0")}</span><b>${ev.short || ev.title}</b><span class="mono enter">Enter →</span></div>
      ${photos.map((src, i) => `<figure class="orbit-photo">${src ? `<img src="${src}" alt="${ev.title} photo ${i + 1}" loading="lazy">` : placeholder(`Photo ${String(i + 1).padStart(2, "0")}`)}</figure>`).join("")}
    </div>
    <div class="event-info">
      <span class="kicker mono">${ev.kicker}</span>
      <h3>${ev.title}</h3>
      <div class="event-meta mono"><span><b>${String(photos.length).padStart(2, "0")}</b>Photos</span><span><b class="venue">${ev.venue}</b>Venue</span></div>
      <p>${ev.text}</p>
      <button class="btn btn-ghost magnetic" data-open-event="${ev.id}"><span>Enter the event →</span></button>
    </div>
  </article>`;
}).join("");

const orbits = $$(".event-orbit").map((el) => ({
  el, photos: $$(".orbit-photo", el), a: Math.random() * Math.PI * 2, speed: 0.32, target: 0.32, visible: true,
}));
orbits.forEach((o) => {
  o.el.addEventListener("pointerenter", () => (o.target = 0.07));
  o.el.addEventListener("pointerleave", () => (o.target = 0.32));
  o.el.addEventListener("click", (e) => openEvent(o.el.dataset.event, e.clientX, e.clientY));
  o.el.addEventListener("keydown", (e) => { if (e.key === "Enter") openEvent(o.el.dataset.event); });
  new IntersectionObserver(([en]) => (o.visible = en.isIntersecting)).observe(o.el);
});
function eventsFrame(dt) {
  orbits.forEach((o) => {
    if (!o.visible) return;
    o.speed += (o.target - o.speed) * 0.05;
    o.a += o.speed * dt;
    const w = o.el.clientWidth, rx = w * 0.42, ry = w * 0.2, n = o.photos.length;
    o.photos.forEach((ph, i) => {
      const ang = o.a + (i / n) * Math.PI * 2;
      const depth = (Math.sin(ang) + 1) / 2; // 0 back … 1 front
      const x = Math.cos(ang) * rx, y = Math.sin(ang) * ry;
      const s = 0.62 + depth * 0.5;
      ph.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${Math.cos(ang) * -7}deg) scale(${s})`;
      ph.style.zIndex = depth > 0.5 ? 60 + Math.round(depth * 30) : 10 + Math.round(depth * 30);
      ph.style.opacity = (0.45 + depth * 0.55).toFixed(3);
      ph.style.filter = depth < 0.4 ? `blur(${((0.4 - depth) * 5).toFixed(2)}px) grayscale(.6)` : "none";
    });
  });
}

/* ---------- event gallery ---------- */
const view = $("#eventView"), slidesEl = $(".ev-slides", view), thumbsEl = $(".ev-thumbs", view);
let evOpen = false, evIndex = 0, evSlides = [], evOrigin = { x: innerWidth / 2, y: innerHeight / 2 };
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-open-event]");
  if (b) openEvent(b.dataset.openEvent, e.clientX, e.clientY);
});
function openEvent(id, x = innerWidth / 2, y = innerHeight / 2) {
  const ev = PROFILE.events.find((v) => v.id === id);
  if (!ev || evOpen) return;
  evOpen = true; evOrigin = { x, y };
  const photos = eventPhotos(ev);
  $(".ev-kicker", view).textContent = `${ev.kicker} · ${ev.venue}`;
  $(".ev-title", view).textContent = ev.title;
  $(".ev-desc", view).textContent = ev.text;
  slidesEl.innerHTML = photos.map((src, i) => `<div class="ev-slide">${src ? `<img src="${src}" alt="${ev.title} photo ${i + 1}">` : placeholder(`${ev.title} — Photo ${String(i + 1).padStart(2, "0")} · add in main.js`)}</div>`).join("");
  thumbsEl.innerHTML = photos.map((src, i) => `<button class="ev-thumb" data-i="${i}" aria-label="Photo ${i + 1}">${src ? `<img src="${src}" alt="">` : placeholder("")}</button>`).join("");
  evSlides = $$(".ev-slide", slidesEl);
  evIndex = 0;
  gsap.set(evSlides, { opacity: 0 });
  view.setAttribute("aria-hidden", "false");
  lockScroll(true);
  gsap.timeline()
    .set(view, { visibility: "visible", clipPath: `circle(0% at ${x}px ${y}px)` })
    .to(view, { clipPath: `circle(150% at ${x}px ${y}px)`, duration: 1.1, ease: "expo.inOut" })
    .from(".ev-head > *, .ev-foot > *", { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: "expo.out" }, 0.55)
    .from($$(".ev-thumb", thumbsEl), { y: 20, opacity: 0, stagger: 0.04, duration: 0.6, ease: "power3.out" }, 0.75)
    .add(() => showSlide(0, 1), 0.6);
  setTimeout(() => $("#evClose").focus(), 80);
}
function showSlide(i, dir = 1) {
  const n = evSlides.length;
  const next = (i + n) % n, cur = evSlides[evIndex], nxt = evSlides[next];
  if (cur && cur !== nxt) gsap.to(cur, { opacity: 0, x: -80 * dir, scale: 0.96, filter: "blur(6px)", duration: 0.7, ease: "power3.inOut" });
  gsap.fromTo(nxt, { opacity: 0, x: 100 * dir, scale: 1.06, filter: "blur(10px)" },
    { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" });
  evIndex = next;
  $(".ev-count", view).textContent = `${String(next + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  $$(".ev-thumb", thumbsEl).forEach((t, k) => t.classList.toggle("active", k === next));
}
function closeEvent() {
  if (!evOpen) return;
  evOpen = false;
  view.setAttribute("aria-hidden", "true");
  gsap.to(view, { clipPath: `circle(0% at ${evOrigin.x}px ${evOrigin.y}px)`, duration: 0.9, ease: "expo.inOut",
    onComplete: () => { gsap.set(view, { visibility: "hidden" }); lockScroll(false); } });
}
$(".ev-prev", view).addEventListener("click", () => showSlide(evIndex - 1, -1));
$(".ev-next", view).addEventListener("click", () => showSlide(evIndex + 1, 1));
thumbsEl.addEventListener("click", (e) => { const t = e.target.closest(".ev-thumb"); if (t) showSlide(+t.dataset.i, +t.dataset.i > evIndex ? 1 : -1); });
$("#evClose").addEventListener("click", closeEvent);
addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeEvent(); closeCard(); }
  if (!evOpen) return;
  if (e.key === "ArrowRight") showSlide(evIndex + 1, 1);
  if (e.key === "ArrowLeft") showSlide(evIndex - 1, -1);
});
// swipe on touch
let touchX = null;
view.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
view.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const d = e.changedTouches[0].clientX - touchX;
  if (Math.abs(d) > 50) showSlide(evIndex + (d < 0 ? 1 : -1), d < 0 ? 1 : -1);
  touchX = null;
});

/* =========================================================
   INTRO + HERO ENTRANCE
   ========================================================= */
const chars = $$(".hero-name .char");
gsap.set(chars, { yPercent: 110, opacity: 0 });
gsap.set(".reveal-up", { y: 24, opacity: 0 });
gsap.set(".arch", { scaleY: 0 });
gsap.set(".hero-orbits", { opacity: 0, scale: 0.92 });
gsap.set(".cutout", { x: 0, xPercent: -50, y: 50, filter: "blur(12px)" });
gsap.set(".pcard-media img", { x: 0, xPercent: -50 });
gsap.set(".tag", { y: 14 });

function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.add(() => window.Scene3D && Scene3D.intro(), 0)
    .to(".arch", { scaleY: 1, duration: 1.6, ease: "expo.inOut" }, 0)
    .to(".portrait-clip", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }, 0.35)
    .to(".cutout", { y: 0, filter: "blur(0px)", duration: 2.2 }, 0.45)
    .to(".hero-orbits", { opacity: 1, scale: 1, duration: 2.2 }, 0.6)
    .to(".eyebrow", { y: 0, opacity: 1, duration: 1.2 }, 0.2)
    .to(chars, { yPercent: 0, opacity: 1, duration: 1.5, stagger: 0.05 }, 0.25)
    .to(".hero-role, .hero-tag, .hero-copy, .hero-cta", { y: 0, opacity: 1, duration: 1.3, stagger: 0.1 }, 0.9)
    .to(".tag", { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, 1.4)
    .to(".tap-hint", { opacity: 1, duration: 1 }, 1.9)
    .to(".nav", { opacity: 1, duration: 1.2 }, 1.1)
    .add(() => { document.body.classList.remove("is-loading"); if (lenis) lenis.start(); }, 1.8);
  $$(".tag").forEach((s, i) => gsap.to(s, { y: i % 2 ? 7 : -7, duration: 3.2 + i * 0.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2.8 }));
  return tl;
}

// split the intro name into individual letters
$$(".in-word").forEach((w) => { w.innerHTML = [...w.textContent].map((c) => `<span class="intro-char">${c}</span>`).join(""); });

function runIntro() {
  if (skipIntro) {
    gsap.set("#intro", { display: "none" });
    heroEntrance().progress(1);
    const y = +params.get("y");
    if (y) setTimeout(() => (lenis ? lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)), 400);
    if (params.get("event")) setTimeout(() => openEvent(params.get("event")), 500); // preview helper: ?nointro&event=nasa
    return;
  }
  gsap.timeline()
    // full name rises letter by letter, unblurring, letter-spacing settling in
    .fromTo(".intro-char", { yPercent: 110, rotate: 6, filter: "blur(8px)", opacity: 0 },
      { yPercent: 0, rotate: 0, filter: "blur(0px)", opacity: 1, duration: 1.3, stagger: 0.06, ease: "expo.out" }, 0.15)
    .fromTo(".intro-name", { letterSpacing: "0.04em" }, { letterSpacing: "-0.03em", duration: 2, ease: "expo.out" }, 0.15)
    .to(".intro-line span", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0.7)
    .to(".intro-label span", { opacity: 1, duration: 0.8, stagger: 0.1 }, 1.0)
    .add(() => $(".intro-name").classList.add("shine"), 1.2)
    .to(".intro-name", { scale: 1.04, duration: 1.2, ease: "power1.inOut" }, 1.6)
    .to(".intro-name, .intro-label, .intro-line", { y: -30, opacity: 0, filter: "blur(6px)", duration: 0.7, ease: "power3.in", stagger: 0.05 }, 2.4)
    .to("#intro", { yPercent: -100, borderBottomLeftRadius: "50% 16vh", borderBottomRightRadius: "50% 16vh", duration: 1.3, ease: "expo.inOut" }, 2.85)
    .add(heroEntrance, 3.25)
    .set("#intro", { display: "none" });
}

/* =========================================================
   CINEMATIC IMAGE REVEAL (projects)
   ========================================================= */
function cinematicReveal(slot) {
  const media = slot.querySelector(":scope > img, :scope > .slot-label");
  const c1 = $$(".curtain.c1 i", slot), c2 = $$(".curtain.c2 i", slot), sheen = $(".sheen", slot);
  if (!media) return;
  gsap.set(media, { scale: 1.45, filter: "blur(16px) grayscale(1)", opacity: 0 });
  const tl = gsap.timeline({ paused: true });
  tl.to(c1, { scaleY: 1, duration: 0.6, ease: "power3.inOut", stagger: 0.05 })
    .to(c2, { scaleY: 1, duration: 0.6, ease: "power3.inOut", stagger: 0.05 }, 0.14)
    .set(media, { opacity: 1 })
    .set([...c1, ...c2], { transformOrigin: "top" })
    .to(c2, { scaleY: 0, duration: 0.75, ease: "power3.inOut", stagger: 0.05 })
    .to(c1, { scaleY: 0, duration: 0.75, ease: "power3.inOut", stagger: 0.05 }, "<0.12")
    .to(media, { scale: 1, filter: "blur(0px) grayscale(0)", duration: 2, ease: "expo.out" }, "<-0.05")
    .fromTo(sheen, { xPercent: -120 }, { xPercent: 120, duration: 1.4, ease: "power2.inOut" }, "<0.5");
  ScrollTrigger.create({ trigger: slot, start: "top 85%", once: true, onEnter: () => tl.play() });
  gsap.fromTo(media, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: slot, start: "top bottom", end: "bottom top", scrub: true } });
}

/* =========================================================
   SCROLL ANIMATIONS
   ========================================================= */
function scrollAnimations() {
  gsap.to(".progress span", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  gsap.to(".hero-text", { y: -90, opacity: 0.1, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-visual", { y: 80, scale: 0.92, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  $$(".split-words").forEach((h) => gsap.from($$(".w > span", h), { yPercent: 115, duration: 1.4, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: h, start: "top 85%" } }));
  $$(".kicker").forEach((k) => gsap.from(k, { opacity: 0, x: -20, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: k, start: "top 90%" } }));
  $$(".about-copy, .stat, .tl-card, .project, .contact-card").forEach((el) =>
    gsap.from(el, { y: 80, opacity: 0, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } }));

  // events: orbit rises out of depth, info slides in
  $$(".event").forEach((ev) => {
    gsap.from($(".event-orbit", ev), { scale: 0.7, rotateX: 40, opacity: 0, transformPerspective: 1200, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: ev, start: "top 85%" } });
    gsap.from($$(".event-info > *", ev), { y: 30, opacity: 0, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ev, start: "top 80%" } });
  });

  // logos fly into their rings
  // tech pills bloom in, the sphere rises
  // carousel cards rise in, skill rows slide in from opposite sides
  gsap.from(".tcard-in", { y: 120, opacity: 0, rotateX: -40, duration: 1.6, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: "#cylStage", start: "top 80%" } });
  gsap.from(".sk-row", { x: (i) => (i ? 200 : -200), opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: "#skillRows", start: "top 90%" } });

  $$(".photo-slot").forEach(cinematicReveal);

  gsap.to(".tl-line span", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: 0.6 } });
  $$(".tl-dot").forEach((d) => gsap.from(d, { scale: 0, duration: 0.9, ease: "back.out(2)", scrollTrigger: { trigger: d, start: "top 75%" } }));

  $$("section[id]").forEach((s) => ScrollTrigger.create({
    trigger: s, start: "top 50%", end: "bottom 50%",
    onToggle: (self) => { if (self.isActive) $$(".nav ul a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${s.id}`)); },
  }));
}

/* =========================================================
   GO
   ========================================================= */
scrollAnimations();
let lastFrame = performance.now(), lastScrollY = scrollY;
gsap.ticker.add(() => {
  const now = performance.now();
  const dt = Math.min(0.05, (now - lastFrame) / 1000); lastFrame = now;
  const scrollV = scrollY - lastScrollY; lastScrollY = scrollY;
  carouselFrame(dt, scrollV);
  eventsFrame(dt);
});
window.addEventListener("load", () => ScrollTrigger.refresh());
setTimeout(() => ScrollTrigger.refresh(), 1200);
runIntro();
