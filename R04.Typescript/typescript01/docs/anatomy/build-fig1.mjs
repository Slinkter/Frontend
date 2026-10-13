import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../.agents/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "../../.agents/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

export function buildCircuitBreaker(theme = "dark") {
  const WIDTH = 640;
  const HEIGHT = 420;

  // 1. DIMENSIONES Y COORDENADAS DEL MUNDO (x, y en piso, z altura)
  const PLATE = { x: -130, y: -75, w: 260, d: 150, r: 8 };
  const PLATE_H = 12;
  const FOOT_H = 6;

  // Poste principal y soporte del disyuntor
  const POST = [-85, 0];
  const POST_TOP = 95;
  const CLAMP_Z = 75;

  // Mecanismo del contactor y dial
  const DIAL_CENTER = [30, -5];
  const DIAL_R = 32;
  const DIAL_Z = 30;
  const DIAL_H = 8;
  const DIAL_TOP = DIAL_Z + DIAL_H;

  // Solenoide / Bobina electromagnética
  const SOLENOID = [-40, -35];
  const SOLENOID_R = 14;
  const SOLENOID_H = 36;

  // Proyección Isométrica ajustada
  const P = k.fitProjection(
    [
      ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
      [POST[0], POST[1], POST_TOP + 4],
      [DIAL_CENTER[0] + DIAL_R + 10, DIAL_CENTER[1] + DIAL_R + 10, DIAL_TOP + 20],
      [SOLENOID[0], SOLENOID[1], SOLENOID_H + 5],
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

  // PLACA BASE CON PIES Y TORNILLOS
  function basePlate() {
    const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
    for (const [x, y] of byDepth(k.corners(PLATE, 20))) {
      out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 2, P, 28), { tone: "lo" }));
      out.push(S(k.cylinder(x, y, 6, -PLATE_H - FOOT_H + 2, FOOT_H - 2, P, 28), { tone: "mid" }));
    }
    out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.4), { tone: "mid" }));
    out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "faint" }));

    const screws = k.corners(PLATE, 9);
    out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
    out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

    // Regla graduada inferior
    const strip = { x: -110, y: PLATE.y + PLATE.d - 16, w: 220, d: 8, r: 1 };
    out.push(S(k.slabOf(strip, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
    const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 5, 5, strip.y + 1, 0.8, [2, 4], P);
    out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
    out.push(k.faceTextSvg(k.topMatrix([strip.x + 10, strip.y + 6.5], 0.8, P, "x"), "CIRCUIT BREAKER STATE RIG · 20000ms COOLDOWN", { size: 2.2, tone: "lo" }));

    return out.join("");
  }

  // BOBINA SOLENOIDE (Disparador de sobrecorriente / fallos)
  function solenoidAssembly() {
    const out = [];
    const [sx, sy] = SOLENOID;
    out.push(S(k.cylinder(sx, sy, SOLENOID_R + 3, 0, 4, P, 32), { tone: "lo" }));
    out.push(S(k.cylinder(sx, sy, SOLENOID_R, 4, SOLENOID_H - 8, P, 40), { tone: "mid" }));
    // Ranuras / espiras de la bobina
    for (let z = 8; z <= SOLENOID_H - 10; z += 4) {
      out.push(L(k.sideArc(sx, sy, SOLENOID_R + 0.2, z, P, 24), { tone: "faint" }));
    }
    out.push(S(k.cylinder(sx, sy, SOLENOID_R + 2, SOLENOID_H - 4, 4, P, 32), { tone: "hi" }));
    out.push(L(k.ring(sx, sy, SOLENOID_R - 3, SOLENOID_H, P, 28), { tone: "lo" }));
    // Perno de núcleo central
    out.push(S(k.cylinder(sx, sy, 4, SOLENOID_H, 6, P, 20), { tone: "hi", lit: true }));
    return out.join("");
  }

  // POSTE Y BRAZO SOPORTE
  function columnStructure() {
    const out = [];
    const [px, py] = POST;
    out.push(S(k.cylinder(px, py, 11, 0, 5, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(px, py, 6, 5, POST_TOP - 5, P, 28), { tone: "mid" }));
    out.push(L([30, 55].map((z) => k.sideArc(px, py, 6, z, P, 16)).join(""), { tone: "faint" }));

    // Abrazadera móvil
    const clampPlan = { x: px - 8, y: py - 8, w: 16, d: 16, r: 3 };
    out.push(S(k.slabOf(clampPlan, CLAMP_Z, 12, P, 4, 0.6), { tone: "mid" }));
    out.push(D([at([px + 5, py - 5, CLAMP_Z + 12])], { size: 0.5 }));

    // Brazo horizontal hacia el contactor
    const armPlan = { x: px + 8, y: -4, w: DIAL_CENTER[0] - px - 8, d: 8, r: 2 };
    out.push(S(k.slabOf(armPlan, CLAMP_Z + 2, 6, P, 4, 0.5), { tone: "mid" }));

    // Perilla de ajuste moleteada
    const knob = [px, py - 12];
    out.push(S(k.cylinder(knob[0], knob[1], 4.5, CLAMP_Z + 2, 7, P, 24), { tone: "hi" }));
    out.push(L(k.knurl(knob[0], knob[1], 4.5, CLAMP_Z + 2, CLAMP_Z + 9, 20, P), { tone: "lo" }));
    return out.join("");
  }

  // DIAL ANALÓGICO CON 3 POSICIONES: CLOSED (0°), HALF_OPEN (35°), OPEN (70°)
  function dialGauge() {
    const out = [];
    const [dx, dy] = DIAL_CENTER;
    // Base del dial
    out.push(S(k.slabOf({ x: dx - DIAL_R - 6, y: dy - DIAL_R - 6, w: DIAL_R * 2 + 12, d: DIAL_R * 2 + 12, r: 6 }, 0, DIAL_Z, P, 6, 1), { tone: "mid" }));
    out.push(S(k.cylinder(dx, dy, DIAL_R, DIAL_Z, DIAL_H, P, 64, 0.8), { tone: "hi" }));
    out.push(L(k.ring(dx, dy, DIAL_R - 2.5, DIAL_TOP, P, 64), { tone: "lo" }));
    out.push(L(k.ring(dx, dy, DIAL_R - 7, DIAL_TOP, P, 48), { tone: "faint" }));

    // Marcas de división
    const ticks = k.radialTicks(dx, dy, DIAL_R - 3.5, 36, 4, DIAL_TOP, [1.5, 3.5], P, -Math.PI / 4, (Math.PI * 3) / 4);
    out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

    // Rótulos de estados impresos en la esfera
    out.push(k.faceTextSvg(k.topMatrix([dx - 18, dy - 14], DIAL_TOP, P, "x"), "CLOSED", { size: 2.2, tone: "mid" }));
    out.push(k.faceTextSvg(k.topMatrix([dx - 2, dy - 18], DIAL_TOP, P, "x"), "HALF", { size: 2.2, tone: "mid" }));
    out.push(k.faceTextSvg(k.topMatrix([dx + 14, dy - 14], DIAL_TOP, P, "x"), "OPEN", { size: 2.2, tone: "mid" }));

    // Pivote central
    out.push(S(k.cylinder(dx, dy, 3.5, DIAL_TOP, 3, P, 24), { tone: "mid" }));
    out.push(D([at([dx, dy, DIAL_TOP + 3])], { size: 0.5, tone: "hi" }));

    return out.join("");
  }

  // CONTACTO FIJO (Receptor del circuito cerrado)
  function fixedContact() {
    const out = [];
    const contactPos = [DIAL_CENTER[0] - 22, DIAL_CENTER[1] - 8];
    out.push(S(k.cylinder(contactPos[0], contactPos[1], 4, DIAL_TOP, 5, P, 20), { tone: "mid" }));
    out.push(S(k.cylinder(contactPos[0], contactPos[1], 2.2, DIAL_TOP + 5, 2.5, P, 16), { tone: "hi", lit: true }));
    return out.join("");
  }

  // AGUJA / PALANCA MÓVIL DEL DISYUNTOR
  // Ángulos: CLOSED = -45°, HALF_OPEN = 0°, OPEN = +45°
  function generateNeedlePath(angleRad) {
    const [dx, dy] = DIAL_CENTER;
    const len = DIAL_R - 5;
    const nx = dx + Math.cos(angleRad) * len;
    const ny = dy + Math.sin(angleRad) * len;
    return k.lineOnTop([dx, dy], [nx, ny], DIAL_TOP + 3.2, P);
  }

  // RESORTE DE TRACCIÓN (se estira cuando el circuito pasa a OPEN)
  function generateSpring(length) {
    const [sx, sy] = SOLENOID;
    const [dx, dy] = DIAL_CENTER;
    return k.coil(sx + 5, sx + 5 + length, [sy, SOLENOID_H - 2], 3, 6, "x", P);
  }

  const initialAngle = -Math.PI / 4; // CLOSED
  const springInitial = generateSpring(32);

  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label:
      "A high-precision electromechanical Circuit Breaker test rig. An electromagnetic solenoid trips a spring-loaded rocker contact between CLOSED, HALF_OPEN, and OPEN states. When failures exceed the threshold (3), the circuit trips OPEN, enforcing a 20s cooldown before probing in HALF_OPEN.",
    body: [
      basePlate(),
      solenoidAssembly(),
      columnStructure(),
      dialGauge(),
      fixedContact(),
      `<g data-part="spring-back">${L(springInitial.back, { tone: "lo" })}</g>`,
      `<g data-part="spring-front">${L(springInitial.front, { tone: "mid" })}</g>`,
      `<path data-part="needle" class="iso-line" data-tone="lit" data-free="end" d="${generateNeedlePath(initialAngle)}" style="stroke-width:1.6"/>`,
      k.wireSvg([-40, -35, SOLENOID_H], [-85, 0, CLAMP_Z], { via: [[-65, -20, 45]], tone: "lo", size: 0.9, ends: "both" }),
    ],
  });

  const live = `
const P = ${JSON.stringify(P)};
const DIAL_CENTER = ${JSON.stringify(DIAL_CENTER)};
const DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP};
const SOLENOID = ${JSON.stringify(SOLENOID)};
const SOLENOID_H = ${SOLENOID_H};

const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const needle = svg.querySelector('[data-part="needle"]');
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

// 3 ESTADOS DEL CIRCUIT BREAKER
const STATES = [
  { name: "CLOSED", angle: -Math.PI / 4, desc: "CLOSED (Healthy) · 0 consecutive failures · Normal traffic" },
  { name: "HALF_OPEN", angle: 0, desc: "HALF_OPEN (Probe Trial) · 1/2 trial requests successful" },
  { name: "OPEN", angle: Math.PI / 4, desc: "OPEN (Tripped) · 3 failures · Cooldown 20s · Fail-fast active" }
];

let targetIdx = 0, currentAngle = STATES[0].angle;
let frame = 0, last = 0, clock = 0, touring = true, visible = false, idleTimer = 0;

function needlePath(rad) {
  const dx = DIAL_CENTER[0], dy = DIAL_CENTER[1];
  const len = DIAL_R - 5;
  const nx = dx + Math.cos(rad) * len;
  const ny = dy + Math.sin(rad) * len;
  return lineOnTop([dx, dy], [nx, ny], DIAL_TOP + 3.2, P);
}

function draw() {
  needle.setAttribute("d", needlePath(currentAngle));
  const text = STATES[targetIdx].desc;
  if (readout.textContent !== text) readout.textContent = text;
  stage.setAttribute("aria-valuenow", String(targetIdx));
  stage.setAttribute("aria-valuetext", text);
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;

  if (touring) {
    clock += dt;
    targetIdx = Math.floor(clock / 2.8) % STATES.length;
  }

  const wantAngle = STATES[targetIdx].angle;
  currentAngle = calm ? wantAngle : currentAngle + (wantAngle - currentAngle) * (1 - Math.exp(-dt / 0.22));

  draw();

  const settled = !touring && Math.abs(currentAngle - wantAngle) < 0.005;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}

const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (idx) => {
  touring = false;
  targetIdx = Math.max(0, Math.min(STATES.length - 1, idx));
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { touring = !still.matches; clock = targetIdx * 2.8; run(); }, 4000);
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
  if (share < 0.35) steer(0);
  else if (share < 0.65) steer(1);
  else steer(2);
});

stage.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    steer(targetIdx + 1);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    steer(targetIdx - 1);
  } else if (event.key === "1") steer(0);
  else if (event.key === "2") steer(1);
  else if (event.key === "3") steer(2);
});

draw();
`;

  const cardHtml = k.plateHtml({
    fig: "Fig 1",
    title: "Circuit Breaker Resiliency Rig",
    hint: "Hover or press Left / Right arrows to trip the breaker",
    readout: "CLOSED (Healthy) · 0 consecutive failures · Normal traffic",
    keys: [
      { mark: "lit", label: "Rocker contact and needle indicating state (CLOSED / HALF_OPEN / OPEN)" },
      { mark: "raised", label: "Electromagnetic solenoid coil tripping upon failureThreshold (3)" },
      { mark: "dim", label: "Tension spring providing mechanical return during 20s recoveryTimeout" },
    ],
    caption:
      "Figure 1: Industrial resilience contactor modelling features/github-search/lib/CircuitBreaker.ts. In CLOSED mode, API requests pass unimpeded. After 3 consecutive failures, the trip coil triggers OPEN state with an automatic 20,000ms cooldown, preventing cascading network starvation before probing recovery in HALF_OPEN.",
    body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Circuit breaker state selector: arrow keys toggle CLOSED, HALF_OPEN, OPEN" aria-valuemin="0" aria-valuemax="2" aria-valuenow="0">${svg}</div>`,
  });

  return k.pageHtml({
    title: "Anatomy: Circuit Breaker Resiliency Rig",
    theme,
    body: cardHtml,
    script: kitScript() + live,
    width: 680,
  });
}

// Generar ambas variantes
writeFileSync(join(HERE, "fig1-circuit-breaker.html"), buildCircuitBreaker("dark"));
writeFileSync(join(HERE, "fig1-circuit-breaker-light.html"), buildCircuitBreaker("light"));
console.log("Wrote Fig 1: Circuit Breaker (dark & light)");
