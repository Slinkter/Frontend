import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../.agents/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "../../.agents/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

export function buildLRUCache(theme = "dark") {
  const WIDTH = 640;
  const HEIGHT = 420;

  // DIMENSIONES DEL MUNDO
  const PLATE = { x: -125, y: -70, w: 250, d: 140, r: 8 };
  const PLATE_H = 12;
  const FOOT_H = 6;

  // Torreta de ranuras LRU
  const TOWER = { x: -30, y: -35, w: 70, d: 70, r: 4 };
  const TOWER_BASE_Z = 0;
  const TOWER_H = 85;

  // Postes guía verticales de la torreta
  const POST_RAD = 3.2;

  // Ranuras / Casetes de memoria (5 bloques apilados)
  const SLOT_H = 11;
  const SLOT_GAP = 3;

  // Lector palpador superior en O(1)
  const ARM_Z = 95;

  // Reloj analógico TTL en lateral izquierdo
  const TTL_DIAL = [-85, 0];
  const TTL_RAD = 22;
  const TTL_Z = 25;
  const TTL_H = 8;

  const P = k.fitProjection(
    [
      ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
      [TOWER.x + TOWER.w, TOWER.y + TOWER.d, TOWER_H + 20],
      [TTL_DIAL[0] - TTL_RAD, TTL_DIAL[1] - TTL_RAD, TTL_Z + TTL_H + 10],
    ],
    WIDTH,
    HEIGHT,
    { pad: 26, azimuth: 42, elevation: 32 }
  );

  const at = (point) => k.iso(point, P);
  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => k.lineSvg(d, style);
  const D = (points, style) => k.dotsSvg(points, style);
  const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

  // PLACA BASE
  function basePlate() {
    const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
    for (const [x, y] of byDepth(k.corners(PLATE, 18))) {
      out.push(S(k.cylinder(x, y, 7.5, -PLATE_H - FOOT_H, 2, P, 28), { tone: "lo" }));
      out.push(S(k.cylinder(x, y, 5.5, -PLATE_H - FOOT_H + 2, FOOT_H - 2, P, 28), { tone: "mid" }));
    }
    out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.4), { tone: "mid" }));
    out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "faint" }));

    const screws = k.corners(PLATE, 9);
    out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
    out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

    // Regla milimetrada inferior
    const strip = { x: -105, y: PLATE.y + PLATE.d - 15, w: 210, d: 7.5, r: 1 };
    out.push(S(k.slabOf(strip, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
    const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.8, [2, 3.8], P);
    out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
    out.push(k.faceTextSvg(k.topMatrix([strip.x + 10, strip.y + 6.2], 0.8, P, "x"), "LRU CACHE · O(1) STORE · 300_000ms TTL TIMER", { size: 2.1, tone: "lo" }));

    return out.join("");
  }

  // DIAL TEMPORIZADOR TTL (Reloj pasivo de expiración)
  function ttlTimer() {
    const out = [];
    const [tx, ty] = TTL_DIAL;
    // Soporte
    out.push(S(k.slabOf({ x: tx - TTL_RAD - 4, y: ty - TTL_RAD - 4, w: TTL_RAD * 2 + 8, d: TTL_RAD * 2 + 8, r: 4 }, 0, TTL_Z, P, 4, 0.8), { tone: "mid" }));
    out.push(S(k.cylinder(tx, ty, TTL_RAD, TTL_Z, TTL_H, P, 56, 0.8), { tone: "hi" }));
    out.push(L(k.ring(tx, ty, TTL_RAD - 2, TTL_Z + TTL_H, P, 56), { tone: "lo" }));
    out.push(L(k.ring(tx, ty, TTL_RAD - 5.5, TTL_Z + TTL_H, P, 40), { tone: "faint" }));

    const ticks = k.radialTicks(tx, ty, TTL_RAD - 3, 24, 4, TTL_Z + TTL_H, [1.5, 3.2], P);
    out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
    out.push(k.faceTextSvg(k.topMatrix([tx, ty + 7], TTL_Z + TTL_H, P, "x"), "TTL ESCAPE", { size: 2, tone: "mid", anchor: "middle" }));

    // Aguja del temporizador
    const needleEnd = [tx + Math.cos(Math.PI / 3) * (TTL_RAD - 4), ty + Math.sin(Math.PI / 3) * (TTL_RAD - 4)];
    out.push(L(k.lineOnTop([tx, ty], needleEnd, TTL_Z + TTL_H + 0.2, P), { tone: "mid" }));
    out.push(D([at([tx, ty, TTL_Z + TTL_H + 0.4])], { size: 0.5, tone: "hi" }));

    return out.join("");
  }

  // ESTRUCTURA DE LA TORRETA CON 4 GUÍAS CILÍNDRICAS
  function towerStructure() {
    const out = [];
    // Plataforma de base
    out.push(S(k.slabOf(TOWER, 0, 5, P, 4, 0.8), { tone: "mid" }));

    // 4 Columnas guía
    const towerCorners = k.corners(TOWER, 6);
    for (const [cx, cy] of byDepth(towerCorners)) {
      out.push(S(k.cylinder(cx, cy, POST_RAD, 5, TOWER_H - 5, P, 24), { tone: "mid", crease: "none" }));
      out.push(D([at([cx, cy, TOWER_H])], { size: 0.4, tone: "lo" }));
    }

    // Cabezal superior que une las columnas
    out.push(S(k.slabOf(k.insetPlan(TOWER, 1), TOWER_H, 6, P, 4, 0.6), { tone: "hi" }));
    return out.join("");
  }

  // CASSETTES / BLOQUES DE CACHÉ APILADOS
  // Cada casete representa una entrada [Key, Value]
  const KEYS = [
    { name: "user:torvalds", rank: "MRU #1" },
    { name: "user:gaearon", rank: "SLOT #2" },
    { name: "user:shadcn", rank: "SLOT #3" },
    { name: "user:vercel", rank: "SLOT #4" },
    { name: "user:tailwind", rank: "LRU #5 (Oldest)" }
  ];

  function cacheSlots() {
    const out = [];
    const plan = k.insetPlan(TOWER, 7);

    KEYS.forEach((item, index) => {
      // De arriba hacia abajo (MRU al tope, LRU al fondo)
      const z = TOWER_H - 12 - (index + 1) * (SLOT_H + SLOT_GAP);
      const isLit = index === 0;

      out.push(
        `<g data-part="slot-${index}">` +
          S(k.slabOf(plan, z, SLOT_H, P, 3, 0.6), { tone: isLit ? "hi" : "mid", lit: isLit }) +
          L(k.planOutline(k.insetPlan(plan, 2), z + SLOT_H, P), { tone: "faint" }) +
          k.faceTextSvg(k.topMatrix([plan.x + 4, plan.y + plan.d / 2], z + SLOT_H, P, "x"), item.name, { size: 2.2, tone: isLit ? "hi" : "lo" }) +
        `</g>`
      );
    });

    return out.join("");
  }

  // PALPADOR DE ACCESO O(1)
  function readerProbe() {
    const out = [];
    const probeX = TOWER.x + TOWER.w / 2;
    const probeY = TOWER.y + TOWER.d / 2;

    out.push(S(k.cylinder(probeX, probeY, 2.5, TOWER_H + 6, 12, P, 20), { tone: "hi", lit: true }));
    out.push(S(k.cylinder(probeX, probeY, 4.5, TOWER_H + 18, 5, P, 24), { tone: "mid" }));
    out.push(L(k.knurl(probeX, probeY, 4.5, TOWER_H + 18, TOWER_H + 23, 20, P), { tone: "lo" }));
    return out.join("");
  }

  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label:
      "A mechanical LRU (Least Recently Used) cache instrument. Memory slots are stacked vertically in a four-column precision tower. When an element is read or inserted, it is promoted to the top (MRU in O(1)). If capacity reaches its limit (5), the lowest drawer drops through the bottom eviction trap.",
    body: [
      basePlate(),
      ttlTimer(),
      towerStructure(),
      cacheSlots(),
      readerProbe(),
      k.wireSvg([-85, 0, TTL_Z + TTL_H], [TOWER.x + 6, TOWER.y + 6, TOWER_H], { via: [[-45, -20, 50]], tone: "lo", size: 0.9, ends: "both" })
    ],
  });

  const live = `
const P = ${JSON.stringify(P)};
const KEYS = ${JSON.stringify(KEYS)};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

let activeSlot = 0;
let frame = 0, last = 0, clock = 0, touring = true, visible = false, idleTimer = 0;

function updateHighlights(idx) {
  KEYS.forEach((_, i) => {
    const g = svg.querySelector('[data-part="slot-' + i + '"]');
    if (g) {
      if (i === idx) {
        g.style.filter = "drop-shadow(0 0 4px var(--anatomy-accent, #6366f1))";
      } else {
        g.style.filter = "none";
      }
    }
  });

  const item = KEYS[idx];
  const desc = idx === 0 
    ? 'Access "' + item.name + '" · Cache HIT in O(1) · Promoted to MRU position'
    : idx === 4
    ? 'Capacity full (5/5) · "' + item.name + '" reached LRU tail · Eviction trigger'
    : 'Slot #' + (idx + 1) + ' "' + item.name + '" · Direct hash lookup in O(1)';

  if (readout.textContent !== desc) readout.textContent = desc;
  stage.setAttribute("aria-valuenow", String(idx));
  stage.setAttribute("aria-valuetext", desc);
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;

  if (touring) {
    clock += dt;
    const nextIdx = Math.floor(clock / 2.5) % KEYS.length;
    if (nextIdx !== activeSlot) {
      activeSlot = nextIdx;
      updateHighlights(activeSlot);
    }
  }

  frame = visible ? requestAnimationFrame(tick) : 0;
}

const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (idx) => {
  touring = false;
  activeSlot = Math.max(0, Math.min(KEYS.length - 1, idx));
  updateHighlights(activeSlot);
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = activeSlot * 2.5; run(); }, 4000);
  run();
};

new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (visible) run();
}, { rootMargin: "120px 0px" }).observe(stage);

if (still.matches) touring = false;

stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = (event.clientY - box.top) / box.height;
  const idx = Math.max(0, Math.min(KEYS.length - 1, Math.floor(share * KEYS.length)));
  steer(idx);
});

stage.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    steer(activeSlot + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    steer(activeSlot - 1);
  } else if (event.key >= "1" && event.key <= "5") {
    steer(parseInt(event.key, 10) - 1);
  }
});

updateHighlights(0);
`;

  const cardHtml = k.plateHtml({
    fig: "Fig 2",
    title: "LRU Cache Memory Tower",
    hint: "Hover vertically or press Up / Down arrows to probe memory slots",
    readout: 'Access "user:torvalds" · Cache HIT in O(1) · Promoted to MRU position',
    keys: [
      { mark: "lit", label: "Active MRU memory block accessed in constant time O(1)" },
      { mark: "raised", label: "Precision four-column guiding tower housing fixed cache capacity" },
      { mark: "dim", label: "TTL clock escape mechanism triggering passive eviction upon expiry" },
    ],
    caption:
      "Figure 2: Physical realization of features/github-search/lib/LRUCache.ts. Backed by a JavaScript Map hash store, queries and writes resolve in O(1). When a key is requested, it is promoted to the top (MRU). If the tower exceeds its 25-item boundary, the bottommost entry drops via the gravity trapdoor, keeping client memory strictly bounded.",
    body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="LRU cache slot selector: arrow keys probe slots from MRU to LRU" aria-valuemin="0" aria-valuemax="4" aria-valuenow="0">${svg}</div>`,
  });

  return k.pageHtml({
    title: "Anatomy: LRU Cache Memory Tower",
    theme,
    body: cardHtml,
    script: kitScript() + live,
    width: 680,
  });
}

writeFileSync(join(HERE, "fig2-lru-cache.html"), buildLRUCache("dark"));
writeFileSync(join(HERE, "fig2-lru-cache-light.html"), buildLRUCache("light"));
console.log("Wrote Fig 2: LRU Cache (dark & light)");
