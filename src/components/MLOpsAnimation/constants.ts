// ─── ViewBox ──────────────────────────────────────────────────────────────────
// 860 × 500 — left half: two stacked ∞ loops; right half: 4-node knot
export const VB_W = 860
export const VB_H = 500

// ─── Colors ───────────────────────────────────────────────────────────────────
export const COLOR = {
  data:   '#92400e',
  ml:     '#15803d',
  dev:    '#1d4ed8',
  ops:    '#b45309',
  active: '#fbbf24',
} as const

// ─── Math helpers ─────────────────────────────────────────────────────────────
function deg2rad(d: number) { return (d * Math.PI) / 180 }

/** Point on a circle */
export function cp(cx: number, cy: number, r: number, deg: number) {
  return {
    x: +(cx + r * Math.cos(deg2rad(deg))).toFixed(2),
    y: +(cy + r * Math.sin(deg2rad(deg))).toFixed(2),
  }
}

// ─── Proper infinity (lemniscate-approximation) path ─────────────────────────
//
// A figure-8 made of two circles of radius R whose centers are at (cx±D, cy).
// The path crosses at (cx, cy).  Traced clockwise starting from the top of the
// LEFT circle (cx-D, cy-R), going around the left lobe, crossing the center,
// going around the right lobe, crossing back.
//
// Control-point recipe (cubic Bézier approximation of a semicircle):
//   k = 0.5523  (standard magic number for circle approximation)
//
export function makeInfPath(
  lcx: number, lcy: number,   // left  lobe center
  rcx: number, rcy: number,   // right lobe center
  R: number,                  // lobe radius
): string {
  const k = 0.5523 * R
  const mx = (lcx + rcx) / 2  // crossing x
  const my = (lcy + rcy) / 2  // crossing y (same as both centers if horizontal)

  // We approximate each lobe as two half-circle beziers meeting at the crossing.
  // Left lobe: top of left → bottom of left (via left arc), bottom → top (via crossing)
  // Right lobe: top of right (via crossing) → bottom, bottom → top via right arc

  return [
    // Start: top of left lobe
    `M ${lcx} ${lcy - R}`,
    // Left arc — top → left side → bottom (counter-clockwise outer arc)
    `C ${lcx - k} ${lcy - R}  ${lcx - R} ${lcy - k}  ${lcx - R} ${lcy}`,
    `C ${lcx - R} ${lcy + k}  ${lcx - k} ${lcy + R}  ${lcx} ${lcy + R}`,
    // Bottom of left lobe → sweep through crossing to top of right lobe
    `C ${mx + (lcx - mx) * 0.3} ${lcy + R}  ${mx} ${my + R * 0.4}  ${mx} ${my}`,
    `C ${mx} ${my - R * 0.4}  ${mx + (rcx - mx) * 0.3} ${rcy - R}  ${rcx} ${rcy - R}`,
    // Right arc — top → right side → bottom (clockwise outer arc)
    `C ${rcx + k} ${rcy - R}  ${rcx + R} ${rcy - k}  ${rcx + R} ${rcy}`,
    `C ${rcx + R} ${rcy + k}  ${rcx + k} ${rcy + R}  ${rcx} ${rcy + R}`,
    // Bottom of right lobe → sweep through crossing back to top of left lobe
    `C ${mx + (rcx - mx) * 0.3} ${rcy + R}  ${mx} ${my + R * 0.4}  ${mx} ${my}`,
    `C ${mx} ${my - R * 0.4}  ${mx + (lcx - mx) * 0.3} ${lcy - R}  ${lcx} ${lcy - R}`,
    'Z',
  ].join(' ')
}

// ─── Left-side diagram geometry ───────────────────────────────────────────────
const INF_R = 62   // lobe radius for left diagrams
const INF_D = 80   // half-distance between lobe centers

// DataML loop — centered at (205, 117)
const DML_CX = 205, DML_CY = 117
export const DATA_C = { x: DML_CX - INF_D, y: DML_CY, r: INF_R }  // (125, 117)
export const ML_C   = { x: DML_CX + INF_D, y: DML_CY, r: INF_R }  // (285, 117)
export const DATAML_PATH = makeInfPath(DATA_C.x, DATA_C.y, ML_C.x, ML_C.y, INF_R)

// DevOps loop — centered at (205, 370)
const DV_CX = 205, DV_CY = 370
export const DEV_C  = { x: DV_CX - INF_D, y: DV_CY, r: INF_R }   // (125, 370)
export const OPS_C  = { x: DV_CX + INF_D, y: DV_CY, r: INF_R }   // (285, 370)
export const DEVOPS_PATH = makeInfPath(DEV_C.x, DEV_C.y, OPS_C.x, OPS_C.y, INF_R)

// ─── Right-side knot geometry ─────────────────────────────────────────────────
// 4 circles arranged 2×2.  Crossing points in the middle.
// ML  (top-left),  Ops (top-right)
// Data(bot-left),  Dev (bot-right)
const KX = 635, KY = 245   // centre of the whole knot
const KR = 90              // knot lobe radius
const KDX = 115            // horizontal half-gap between knot lobe centres
const KDY = 118            // vertical   half-gap between knot lobe centres

export const K_ML   = { x: KX - KDX, y: KY - KDY, r: KR }
export const K_OPS  = { x: KX + KDX, y: KY - KDY, r: KR }
export const K_DATA = { x: KX - KDX, y: KY + KDY, r: KR }
export const K_DEV  = { x: KX + KDX, y: KY + KDY, r: KR }

// The knot path: a single closed loop that visits all 4 lobes.
// Sequence: ML → (cross at top-center) → Ops → (cross at right-center) →
//           Dev → (cross at bot-center) → Data → (cross at left-center) → ML
// Each lobe arc is approximated by two cubic Béziers (half-circle each).
const k92 = 0.5523 * KR  // bezier control distance

function halfArc(
  cx: number, cy: number,
  startDeg: number, endDeg: number,
): string {
  // 180-degree arc approximated as two 90-degree cubics
  const mid = (startDeg + endDeg) / 2
  const s = cp(cx, cy, KR, startDeg)
  const m = cp(cx, cy, KR, mid)
  const e = cp(cx, cy, KR, endDeg)
  // tangent directions
  const ts = deg2rad(startDeg + 90)
  const tm = deg2rad(mid + 90)
  const te = deg2rad(endDeg + 90)
  const c1 = { x: s.x + Math.cos(ts) * k92, y: s.y + Math.sin(ts) * k92 }
  const c2 = { x: m.x - Math.cos(tm) * k92, y: m.y - Math.sin(tm) * k92 }
  const c3 = { x: m.x + Math.cos(tm) * k92, y: m.y + Math.sin(tm) * k92 }
  const c4 = { x: e.x - Math.cos(te) * k92, y: e.y - Math.sin(te) * k92 }
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${m.x} ${m.y} C ${c3.x} ${c3.y} ${c4.x} ${c4.y} ${e.x} ${e.y}`
}

// Center crossing points
const TOP_MID  = { x: KX,        y: KY - KDY }  // between ML and Ops
const BOT_MID  = { x: KX,        y: KY + KDY }  // between Data and Dev
const LEFT_MID = { x: KX - KDX,  y: KY }        // between ML and Data
const RIGHT_MID= { x: KX + KDX,  y: KY }        // between Ops and Dev

// Start at top of ML circle
const ML_TOP = cp(K_ML.x, K_ML.y, KR, -90)

export const KNOT_PATH = [
  `M ${ML_TOP.x} ${ML_TOP.y}`,
  // ML outer arc: top → left → bottom (-90 → -180 → -270 i.e. left half)
  halfArc(K_ML.x, K_ML.y, -90, -270),
  // ML bottom to crossing (left-mid), then crossing to Data top
  `C ${K_ML.x} ${K_ML.y + KR + 20} ${LEFT_MID.x - 20} ${LEFT_MID.y + 10} ${LEFT_MID.x} ${LEFT_MID.y}`,
  `C ${LEFT_MID.x + 20} ${LEFT_MID.y - 10} ${K_DATA.x} ${K_DATA.y - KR - 20} ${K_DATA.x} ${K_DATA.y - KR}`,
  // Data outer arc: top → left → bottom (left half of Data)
  halfArc(K_DATA.x, K_DATA.y, -90, -270),
  // Data bottom → crossing (bot-mid) → Dev bottom
  `C ${K_DATA.x} ${K_DATA.y + KR + 20} ${BOT_MID.x - 20} ${BOT_MID.y + 10} ${BOT_MID.x} ${BOT_MID.y}`,
  `C ${BOT_MID.x + 20} ${BOT_MID.y - 10} ${K_DEV.x} ${K_DEV.y + KR + 20} ${K_DEV.x} ${K_DEV.y + KR}`,
  // Dev outer arc: bottom → right → top (right half of Dev)
  halfArc(K_DEV.x, K_DEV.y, 90, -90),
  // Dev top → crossing (right-mid) → Ops top
  `C ${K_DEV.x} ${K_DEV.y - KR - 20} ${RIGHT_MID.x + 20} ${RIGHT_MID.y + 10} ${RIGHT_MID.x} ${RIGHT_MID.y}`,
  `C ${RIGHT_MID.x - 20} ${RIGHT_MID.y - 10} ${K_OPS.x} ${K_OPS.y + KR + 20} ${K_OPS.x} ${K_OPS.y + KR}`,
  // Ops outer arc: bottom → right → top (right half of Ops)
  halfArc(K_OPS.x, K_OPS.y, 90, -90),
  // Ops top → crossing (top-mid) → ML top
  `C ${K_OPS.x} ${K_OPS.y - KR - 20} ${TOP_MID.x + 20} ${TOP_MID.y - 10} ${TOP_MID.x} ${TOP_MID.y}`,
  `C ${TOP_MID.x - 20} ${TOP_MID.y + 10} ${K_ML.x} ${K_ML.y - KR - 20} ${ML_TOP.x} ${ML_TOP.y}`,
  'Z',
].join('\n')

// ─── Stage type ───────────────────────────────────────────────────────────────
export interface Stage {
  label: string
  x: number
  y: number
  color: string
  loop: 'data' | 'ml' | 'dev' | 'ops'
  range: [number, number]   // [0,1] progress window when active
}

// Helper: 4 equidistant labels around a lobe
function lobeStages(
  cx: number, cy: number, r: number,
  loop: Stage['loop'], color: string,
  labels: string[],
  progressStart: number, progressEnd: number,
): Stage[] {
  const angles = [-135, -90, -45, 90]
  const step = (progressEnd - progressStart) / 4
  return labels.map((label, i) => ({
    label,
    ...cp(cx, cy, r + 24, angles[i]),
    color,
    loop,
    range: [progressStart + i * step, progressStart + (i + 1) * step] as [number, number],
  }))
}

// ─── Left-side stages ─────────────────────────────────────────────────────────
export const DATAML_STAGES: Stage[] = [
  ...lobeStages(DATA_C.x, DATA_C.y, INF_R, 'data', COLOR.data,
    ['Curate', 'Collect', 'Transform', 'Validate'], 0, 0.5),
  ...lobeStages(ML_C.x,   ML_C.y,   INF_R, 'ml',   COLOR.ml,
    ['Train', 'Evaluate', 'Formulate', 'Explore'], 0.5, 1.0),
]

export const DEVOPS_STAGES: Stage[] = [
  ...lobeStages(DEV_C.x, DEV_C.y, INF_R, 'dev', COLOR.dev,
    ['Build', 'Code', 'Plan', 'Test'], 0, 0.5),
  ...lobeStages(OPS_C.x, OPS_C.y, INF_R, 'ops', COLOR.ops,
    ['Release', 'Deploy', 'Operate', 'Monitor'], 0.5, 1.0),
]

// ─── Knot stages ──────────────────────────────────────────────────────────────
export const KNOT_STAGES: Stage[] = [
  ...lobeStages(K_ML.x,   K_ML.y,   KR, 'ml',   COLOR.ml,
    ['Train', 'Evaluate', 'Explore', 'Formulate'], 0, 0.25),
  ...lobeStages(K_DATA.x, K_DATA.y, KR, 'data', COLOR.data,
    ['Curate', 'Collect', 'Validate', 'Transform'], 0.25, 0.5),
  ...lobeStages(K_DEV.x,  K_DEV.y,  KR, 'dev',  COLOR.dev,
    ['Code', 'Build', 'Test', 'Plan'], 0.5, 0.75),
  ...lobeStages(K_OPS.x,  K_OPS.y,  KR, 'ops',  COLOR.ops,
    ['Release', 'Deploy', 'Operate', 'Monitor'], 0.75, 1.0),
]
