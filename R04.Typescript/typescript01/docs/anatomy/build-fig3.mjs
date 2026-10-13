import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../.agents/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "../../.agents/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

export function buildBinarySearchIndex(theme = "dark") {
  const WIDTH = 660;
  const HEIGHT = 430;

  // DIMENSIONES DE MUNDO
  const PLATE = { x: -140, y: -75, w: 280, d: 150, r: 8 };
  const PLATE_H = 14;
  const FOOT_H = 6;

  // Bancada de medición vernier y rieles
  const RAIL_Y = -15;
  const RAIL_FROM = -110;
  const RAIL_TO = 110;
  const RAIL_H = 8;

  // Tambor micrométrico en extremo derecho
  const THIMBLE_X = 118;
  const THIMBLE_RAD = 14;
  const THIMBLE_H = 26;

  // Mordazas deslizantes (LowerBound y UpperBound)
  const JAW_W = 18;
  const JAW_D = 40;
  const JAW_H = 34;

  const P = k.fitProjection(
    [
      ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
      [RAIL_FROM, RAIL_Y, RAIL_H + 40],
      [RAIL_TO, RAIL_Y, RAIL_H + 40],
      [THIMBLE_X + THIMBLE_H, RAIL_Y, THIMBLE_RAD * 2],
    ],
    WIDTH,
    HEIGHT,
    { pad: 28, azimuth: 44, elevation: 32 }
  );

  const at = (point) => k.iso(point, P);
  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => k.lineSvg(d, style);
  const D = (points, style) => k.dotsSvg(points, style);
  const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

  // PLACA BASE
  function basePlate() {
    const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
    for (const [x, y] of byDepth(k.corners(PLATE, 20))) {
      out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 2, P, 28), { tone: "lo" }));
      out.push(S(k.cylinder(x, y, 6, -PLATE_H - FOOT_H + 2, FOOT_H - 2, P, 28), { tone: "mid" }));
    }
    out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.4), { tone: "mid" }));
    out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "faint" }));

    const screws = k.corners(PLATE, 10);
    out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
    out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

    // Regla graduada frontal
    const strip = { x: -120, y: PLATE.y + PLATE.d - 16, w: 240, d: 8, r: 1 };
    out.push(S(k.slabOf(strip, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
    const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 1, 0.8, [2, 4], P);
    out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
    out.push(k.faceTextSvg(k.topMatrix([strip.x + 10, strip.y + 6.5], 0.8, P, "x"), "REPO SEARCH INDEX · BISECTION IN O(log T + k) · CARDINALITY INTERSECTION", { size: 2.1, tone: "lo" }));

    return out.join("");
  }

  // RIELES GUÍA Y ESCALA GRADUADA CENTRAL (Lexicographical Tokens)
  function measuringBed() {
    const out = [];
    // Riel guía en prisma doble
    for (const y of [RAIL_Y - 14, RAIL_Y + 14]) {
      out.push(S(k.slabOf({ x: RAIL_FROM, y, w: RAIL_TO - RAIL_FROM, d: 6, r: 1.2 }, 0, 4, P, 3, 0.5), { tone: "mid" }));
    }

    // Regla milimetrada central donde corren los tokens
    const bedPlan = { x: RAIL_FROM + 5, y: RAIL_Y - 8, w: RAIL_TO - RAIL_FROM - 10, d: 16, r: 1.5 };
    out.push(S(k.slabOf(bedPlan, 0, RAIL_H, P, 4, 0.6), { tone: "hi" }));

    // Ticks graduados de los tokens ordenados
    const rulerTicks = k.topTicks(bedPlan.x + 2, bedPlan.x + bedPlan.w - 2, 8, 4, bedPlan.y + 1, RAIL_H, [2, 4.5], P);
    out.push(L(rulerTicks.minor, { tone: "lo" }), L(rulerTicks.major, { tone: "mid" }));

    // Marcas de topes finales
    out.push(S(k.slabOf({ x: RAIL_FROM - 4, y: RAIL_Y - 16, w: 6, d: 32, r: 1.5 }, 0, 12, P, 3, 0.6), { tone: "mid" }));

    return out.join("");
  }

  // TAMBOR MICROMÉTRICO DERECHO (Husillo de paso logarítmico)
  function thimbleAssembly() {
    const out = [];
    const tx = THIMBLE_X;
    const ty = RAIL_Y;

    // Soporte
    out.push(S(k.slabOf({ x: tx - 6, y: ty - 18, w: 8, d: 36, r: 2 }, 0, 14, P, 3, 0.6), { tone: "mid" }));

    // Tambor cilíndrico
    out.push(S(k.cylinder(tx + 6, ty, THIMBLE_RAD, 2, THIMBLE_H, P, 48, 0.8), { tone: "hi" }));
    out.push(L(k.knurl(tx + 6, ty, THIMBLE_RAD, 2, THIMBLE_H - 6, 32, P), { tone: "lo" }));
    out.push(L(k.ring(tx + 6, ty, THIMBLE_RAD - 2, THIMBLE_H + 2, P, 36), { tone: "lo" }));
    out.push(k.faceTextSvg(k.topMatrix([tx + 2, ty + 6], THIMBLE_H + 2, P, "x"), "log2(T)", { size: 2.2, tone: "mid", anchor: "middle" }));

    // Perilla de trinquete moleteada en el extremo
    out.push(S(k.cylinder(tx + 6, ty, 6, THIMBLE_H + 2, 6, P, 24), { tone: "hi", lit: true }));
    return out.join("");
  }

  // MORDANZAS DESLIZANTES: LOWER BOUND & UPPER BOUND
  function jawLower() {
    const out = [];
    const plan = { x: -JAW_W / 2, y: RAIL_Y - JAW_D / 2, w: JAW_W, d: JAW_D, r: 2.5 };
    out.push(S(k.slabOf(plan, RAIL_H, JAW_H, P, 4, 0.8), { tone: "hi", lit: true }));
    out.push(L(k.planOutline(k.insetPlan(plan, 2), RAIL_H + JAW_H, P), { tone: "faint" }));
    // Puntero / Nonio indicador
    out.push(L(k.lineOnTop([0, plan.y + 2], [0, plan.y + plan.d - 2], RAIL_H + JAW_H, P), { tone: "lit" }));
    out.push(k.faceTextSvg(k.topMatrix([-6, plan.y + 6], RAIL_H + JAW_H, P, "x"), "LOWER", { size: 2.2, tone: "lit" }));
    return out.join("");
  }

  function jawUpper() {
    const out = [];
    const plan = { x: -JAW_W / 2, y: RAIL_Y - JAW_D / 2, w: JAW_W, d: JAW_D, r: 2.5 };
    out.push(S(k.slabOf(plan, RAIL_H, JAW_H, P, 4, 0.8), { tone: "hi" }));
    out.push(L(k.planOutline(k.insetPlan(plan, 2), RAIL_H + JAW_H, P), { tone: "faint" }));
    out.push(L(k.lineOnTop([0, plan.y + 2], [0, plan.y + plan.d - 2], RAIL_H + JAW_H, P), { tone: "hi" }));
    out.push(k.faceTextSvg(k.topMatrix([-6, plan.y + 6], RAIL_H + JAW_H, P, "x"), "UPPER", { size: 2.2, tone: "mid" }));
    return out.join("");
  }

  // TOKENS DE EJEMPLO DE LA SUITE
  const QUERIES = [
    { query: "react*", lower: -45, upper: -10, desc: 'Prefix "react*" · Range [lower: 14 .. upper: 18] · Bisection O(log 128) = 7 · 4 repos' },
    { query: "circuit*", lower: -80, upper: -60, desc: 'Prefix "circuit*" · Range [lower: 4 .. upper: 6] · Exact posting match · 2 repos' },
    { query: "type*", lower: 15, upper: 40, desc: 'Prefix "type*" · Range [lower: 22 .. upper: 25] · Cardinality min-intersection · 3 repos' },
    { query: "zod*", lower: 65, upper: 85, desc: 'Prefix "zod*" · Range [lower: 29 .. upper: 31] · O(1) entity lookup from map · 2 repos' },
  ];

  const initial = QUERIES[0];

  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label:
      "A dual-jaw vernier caliper apparatus representing features/github-search/lib/RepoSearchIndex.ts. Two precision slider calipers converge logaritmically to clamp the exact lexicographical token prefix interval in O(log T + k).",
    body: [
      basePlate(),
      measuringBed(),
      thimbleAssembly(),
      `<g data-part="jaw-lower" transform="${k.translateAlong(P, [initial.lower, 0, 0])}">${jawLower()}</g>`,
      `<g data-part="jaw-upper" transform="${k.translateAlong(P, [initial.upper, 0, 0])}">${jawUpper()}</g>`,
      k.wireSvg([THIMBLE_X, RAIL_Y, THIMBLE_H], [RAIL_TO, RAIL_Y, RAIL_H + 10], { via: [[THIMBLE_X - 10, RAIL_Y + 15, 25]], tone: "lo", size: 0.8, ends: "both" })
    ],
  });

  const live = `
const P = ${JSON.stringify(P)};
const QUERIES = ${JSON.stringify(QUERIES)};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const jawLower = svg.querySelector('[data-part="jaw-lower"]');
const jawUpper = svg.querySelector('[data-part="jaw-upper"]');
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

let activeIdx = 0;
let currentL = QUERIES[0].lower, targetL = currentL;
let currentU = QUERIES[0].upper, targetU = currentU;
let frame = 0, last = 0, clock = 0, touring = true, visible = false, idleTimer = 0;

function draw() {
  jawLower.setAttribute("transform", translateAlong(P, [currentL, 0, 0]));
  jawUpper.setAttribute("transform", translateAlong(P, [currentU, 0, 0]));

  const item = QUERIES[activeIdx];
  if (readout.textContent !== item.desc) readout.textContent = item.desc;
  stage.setAttribute("aria-valuenow", String(activeIdx));
  stage.setAttribute("aria-valuetext", item.desc);
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;

  if (touring) {
    clock += dt;
    const nextIdx = Math.floor(clock / 2.8) % QUERIES.length;
    if (nextIdx !== activeIdx) {
      activeIdx = nextIdx;
      targetL = QUERIES[activeIdx].lower;
      targetU = QUERIES[activeIdx].upper;
    }
  }

  currentL = calm ? targetL : currentL + (targetL - currentL) * (1 - Math.exp(-dt / 0.22));
  currentU = calm ? targetU : currentU + (targetU - currentU) * (1 - Math.exp(-dt / 0.22));

  draw();

  const settled = !touring && Math.abs(currentL - targetL) < 0.01 && Math.abs(currentU - targetU) < 0.01;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}

const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (idx) => {
  touring = false;
  activeIdx = Math.max(0, Math.min(QUERIES.length - 1, idx));
  targetL = QUERIES[activeIdx].lower;
  targetU = QUERIES[activeIdx].upper;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = activeIdx * 2.8; run(); }, 4000);
  run();
};

new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (visible) run();
}, { rootMargin: "120px 0px" }).observe(stage);

if (still.matches) touring = false;

stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = (event.clientX - box.left) / box.width;
  const idx = Math.max(0, Math.min(QUERIES.length - 1, Math.floor(share * QUERIES.length)));
  steer(idx);
});

stage.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    steer(activeIdx + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    steer(activeIdx - 1);
  } else if (event.key >= "1" && event.key <= "4") {
    steer(parseInt(event.key, 10) - 1);
  }
});

draw();
`;

  const cardHtml = k.plateHtml({
    fig: "Fig 3",
    title: "Binary Bisection & Inverted Index Vernier",
    hint: "Hover across the measuring bed or press Left / Right arrows to bisect tokens",
    readout: initial.desc,
    keys: [
      { mark: "lit", label: "Dual caliper jaws clamping lowerBound and upperBound in O(log T + k)" },
      { mark: "raised", label: "Precision measuring bed with lexicographically sorted token scale" },
      { mark: "dim", label: "Micrometric thimble spindle executing logarithmic bisection steps" },
    ],
    caption:
      "Figure 3: Sub-linear search engine from features/github-search/lib/RepoSearchIndex.ts translated into a dual-caliper Vernier rig. Rather than performing an O(N) scan on every keystroke, two calipers converge via binary bisection over sorted tokens in O(log T + k). Resulting posting sets are then intersected using min-cardinality heuristic O(min(|A|, |B|)), returning matched repos in sub-millisecond response time.",
    body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Binary bisection token range selector: arrow keys clamp token intervals" aria-valuemin="0" aria-valuemax="3" aria-valuenow="0">${svg}</div>`,
  });

  return k.pageHtml({
    title: "Anatomy: Binary Bisection & Inverted Index Vernier",
    theme,
    body: cardHtml,
    script: kitScript() + live,
    width: 700,
  });
}

writeFileSync(join(HERE, "fig3-binary-search-index.html"), buildBinarySearchIndex("dark"));
writeFileSync(join(HERE, "fig3-binary-search-index-light.html"), buildBinarySearchIndex("light"));
console.log("Wrote Fig 3: Binary Bisection Index (dark & light)");
