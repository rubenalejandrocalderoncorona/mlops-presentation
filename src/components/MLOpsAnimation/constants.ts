// ─── ViewBox ────────────────────────────────────────────────────────────────
// The full animation lives in a 900×480 viewBox.
// Layout matches the ml4devs reference image:
//   Left side:  DataML ∞ (top) + DevOps ∞ (bottom)
//   Right side: Combined MLOps 4-lobe knot
export const VB_W = 900
export const VB_H = 480

// ─── Loop circle centers & radii ────────────────────────────────────────────
// Left side — two stacked independent ∞ loops
export const DATA_C  = { x: 120, y: 110, r: 72 }  // DataML left lobe  (Data)
export const ML_C    = { x: 280, y: 110, r: 72 }  // DataML right lobe (ML)
export const DEV_C   = { x: 120, y: 350, r: 72 }  // DevOps left lobe  (Dev)
export const OPS_C   = { x: 280, y: 350, r: 72 }  // DevOps right lobe (Ops)

// Right side — 4-lobe MLOps knot, same relative geometry but centred at ~(620,240)
export const KX = 620
export const KY = 240
export const KR = 85   // lobe radius
export const KD = 120  // half-distance between lobe centres

export const K_ML   = { x: KX - KD, y: KY - 95, r: KR }
export const K_DATA = { x: KX - KD, y: KY + 95, r: KR }
export const K_DEV  = { x: KX + KD, y: KY + 95, r: KR }
export const K_OPS  = { x: KX + KD, y: KY - 95, r: KR }

// ─── Colors ──────────────────────────────────────────────────────────────────
export const COLOR = {
  data:    '#92400e',   // brown / amber
  ml:      '#15803d',   // green
  dev:     '#1d4ed8',   // blue
  ops:     '#b45309',   // gold
  knot:    '#6366f1',   // indigo accent for the knot line
  active:  '#fbbf24',   // yellow highlight when stage is active
} as const

// ─── Path helper ─────────────────────────────────────────────────────────────
function p(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: +(cx + r * Math.cos(rad)).toFixed(2), y: +(cy + r * Math.sin(rad)).toFixed(2) }
}

// ─── SVG paths ───────────────────────────────────────────────────────────────

// Individual ∞ loop path for DataML (top left pair)
// Left lobe center DATA_C, right lobe center ML_C, crossing at midpoint (200,110)
export function makeInfPath(lx: number, ly: number, rx: number, ry: number, r: number): string {
  const mx = (lx + rx) / 2
  const my = (ly + ry) / 2
  return [
    `M ${lx},${ly - r}`,
    `C ${mx - r * 0.3},${ly - r} ${mx + r * 0.3},${my - r * 0.3} ${mx},${my}`,
    `C ${mx - r * 0.3},${my + r * 0.3} ${rx - r * 0.8},${ry + r} ${rx},${ry + r}`,
    `C ${rx + r},${ry + r} ${rx + r},${ry - r} ${rx},${ry - r}`,
    `C ${rx - r * 0.8},${ry - r} ${mx + r * 0.3},${my + r * 0.3} ${mx},${my}`,
    `C ${mx - r * 0.3},${my - r * 0.3} ${lx + r * 0.8},${ly + r} ${lx},${ly + r}`,
    `C ${lx - r},${ly + r} ${lx - r},${ly - r} ${lx},${ly - r}`,
    'Z',
  ].join(' ')
}

export const DATAML_PATH = makeInfPath(DATA_C.x, DATA_C.y, ML_C.x, ML_C.y, 72)
export const DEVOPS_PATH = makeInfPath(DEV_C.x, DEV_C.y, OPS_C.x, OPS_C.y, 72)

// MLOps knot: single continuous path through all 4 nodes
// Visits: ML(top-left) → exits bottom → crosses → Data(bottom-left) → exits top-right →
//         crosses → Dev(bottom-right) → exits top → crosses → Ops(top-right) → exits bottom-left →
//         crosses back to ML
const kmlx = K_ML.x;   const kmly = K_ML.y;   const kmlr = K_ML.r
const kdax = K_DATA.x; const kday = K_DATA.y
const kdevx = K_DEV.x; const kdevy = K_DEV.y
const kopsx = K_OPS.x; const kopsy = K_OPS.y
const MID_X = KX
const MID_Y = KY

export const KNOT_PATH = [
  // Start at top of ML circle
  `M ${kmlx},${kmly - kmlr}`,
  // ML circle clockwise (top → right → bottom)
  `C ${kmlx + kmlr},${kmly - kmlr} ${kmlx + kmlr},${kmly + kmlr} ${kmlx},${kmly + kmlr}`,
  // Arc toward center crossing
  `C ${kmlx + 60},${kmly + kmlr} ${MID_X - 20},${MID_Y + 20} ${MID_X},${MID_Y}`,
  // Cross, enter Data circle at top
  `C ${MID_X + 20},${MID_Y - 20} ${kdax - 60},${kday - kmlr} ${kdax},${kday - kmlr}`,
  // Data circle clockwise (top → left → bottom)
  `C ${kdax - kmlr},${kday - kmlr} ${kdax - kmlr},${kday + kmlr} ${kdax},${kday + kmlr}`,
  // Exit Data toward right crossing
  `C ${kdax + 60},${kday + kmlr} ${MID_X - 20},${MID_Y + 40} ${MID_X},${MID_Y}`,
  // Cross, enter Dev circle at bottom
  `C ${MID_X + 20},${MID_Y - 40} ${kdevx - 60},${kdevy + kmlr} ${kdevx},${kdevy + kmlr}`,
  // Dev circle clockwise (bottom → right → top)
  `C ${kdevx + kmlr},${kdevy + kmlr} ${kdevx + kmlr},${kdevy - kmlr} ${kdevx},${kdevy - kmlr}`,
  // Exit Dev toward top crossing
  `C ${kdevx - 60},${kdevy - kmlr} ${MID_X + 20},${MID_Y - 20} ${MID_X},${MID_Y}`,
  // Cross, enter Ops circle at bottom
  `C ${MID_X - 20},${MID_Y + 20} ${kopsx + 60},${kopsy + kmlr} ${kopsx},${kopsy + kmlr}`,
  // Ops circle clockwise (bottom → left → top)
  `C ${kopsx - kmlr},${kopsy + kmlr} ${kopsx - kmlr},${kopsy - kmlr} ${kopsx},${kopsy - kmlr}`,
  // Return from Ops back to ML start
  `C ${kopsx - 60},${kopsy - kmlr} ${kmlx + 60},${kmly - kmlr} ${kmlx},${kmly - kmlr}`,
  'Z',
].join(' ')

// ─── Stage definitions ───────────────────────────────────────────────────────
// Each stage has: label, position (x,y), color, which loop it belongs to,
// and its progress range [start, end] along the master animation (0–1)

export interface Stage {
  label: string
  x: number
  y: number
  color: string
  loop: 'data' | 'ml' | 'dev' | 'ops'
  // progress range [0,1] when this stage is "active" during the knot animation
  range: [number, number]
}

// DataML loop labels (equidistant around each lobe)
export const DATAML_STAGES: Stage[] = [
  { label: 'Curate',    ...p(DATA_C.x, DATA_C.y, 90, -135), color: COLOR.data, loop: 'data', range: [0.00, 0.06] },
  { label: 'Collect',   ...p(DATA_C.x, DATA_C.y, 90,  -90), color: COLOR.data, loop: 'data', range: [0.06, 0.12] },
  { label: 'Transform', ...p(DATA_C.x, DATA_C.y, 90, -160), color: COLOR.data, loop: 'data', range: [0.12, 0.18] },
  { label: 'Validate',  ...p(DATA_C.x, DATA_C.y, 90,   90), color: COLOR.data, loop: 'data', range: [0.18, 0.24] },
  { label: 'Train',     ...p(ML_C.x,   ML_C.y,   90, -135), color: COLOR.ml,   loop: 'ml',   range: [0.24, 0.31] },
  { label: 'Evaluate',  ...p(ML_C.x,   ML_C.y,   90,  -45), color: COLOR.ml,   loop: 'ml',   range: [0.31, 0.38] },
  { label: 'Formulate', ...p(ML_C.x,   ML_C.y,   90,   90), color: COLOR.ml,   loop: 'ml',   range: [0.38, 0.44] },
  { label: 'Explore',   ...p(ML_C.x,   ML_C.y,   90,  -90), color: COLOR.ml,   loop: 'ml',   range: [0.44, 0.50] },
]

export const DEVOPS_STAGES: Stage[] = [
  { label: 'Build',   ...p(DEV_C.x, DEV_C.y, 90, -135), color: COLOR.dev, loop: 'dev', range: [0.00, 0.12] },
  { label: 'Code',    ...p(DEV_C.x, DEV_C.y, 90,  -90), color: COLOR.dev, loop: 'dev', range: [0.12, 0.25] },
  { label: 'Plan',    ...p(DEV_C.x, DEV_C.y, 90,  -45), color: COLOR.dev, loop: 'dev', range: [0.25, 0.37] },
  { label: 'Test',    ...p(DEV_C.x, DEV_C.y, 90,   90), color: COLOR.dev, loop: 'dev', range: [0.37, 0.50] },
  { label: 'Release', ...p(OPS_C.x, OPS_C.y, 90, -135), color: COLOR.ops, loop: 'ops', range: [0.50, 0.62] },
  { label: 'Deploy',  ...p(OPS_C.x, OPS_C.y, 90,  -90), color: COLOR.ops, loop: 'ops', range: [0.62, 0.75] },
  { label: 'Operate', ...p(OPS_C.x, OPS_C.y, 90,  -45), color: COLOR.ops, loop: 'ops', range: [0.75, 0.87] },
  { label: 'Monitor', ...p(OPS_C.x, OPS_C.y, 90,   90), color: COLOR.ops, loop: 'ops', range: [0.87, 1.00] },
]

// Knot stages — same logical stages, positioned around each knot circle
export const KNOT_STAGES: Stage[] = [
  // ML circle (top-left knot)
  { label: 'Train',     ...p(K_ML.x, K_ML.y, K_ML.r + 18, -130), color: COLOR.ml,   loop: 'ml',   range: [0.00, 0.07] },
  { label: 'Evaluate',  ...p(K_ML.x, K_ML.y, K_ML.r + 18,  -50), color: COLOR.ml,   loop: 'ml',   range: [0.07, 0.14] },
  { label: 'Formulate', ...p(K_ML.x, K_ML.y, K_ML.r + 18,  170), color: COLOR.ml,   loop: 'ml',   range: [0.14, 0.21] },
  { label: 'Explore',   ...p(K_ML.x, K_ML.y, K_ML.r + 18,   90), color: COLOR.ml,   loop: 'ml',   range: [0.21, 0.25] },
  // Data circle (bottom-left knot)
  { label: 'Curate',    ...p(K_DATA.x, K_DATA.y, K_DATA.r + 18, -130), color: COLOR.data, loop: 'data', range: [0.25, 0.32] },
  { label: 'Collect',   ...p(K_DATA.x, K_DATA.y, K_DATA.r + 18,  -50), color: COLOR.data, loop: 'data', range: [0.32, 0.39] },
  { label: 'Validate',  ...p(K_DATA.x, K_DATA.y, K_DATA.r + 18,  170), color: COLOR.data, loop: 'data', range: [0.39, 0.46] },
  { label: 'Transform', ...p(K_DATA.x, K_DATA.y, K_DATA.r + 18,   90), color: COLOR.data, loop: 'data', range: [0.46, 0.50] },
  // Dev circle (bottom-right knot)
  { label: 'Code',      ...p(K_DEV.x, K_DEV.y, K_DEV.r + 18, -130), color: COLOR.dev, loop: 'dev', range: [0.50, 0.57] },
  { label: 'Build',     ...p(K_DEV.x, K_DEV.y, K_DEV.r + 18,  -50), color: COLOR.dev, loop: 'dev', range: [0.57, 0.64] },
  { label: 'Test',      ...p(K_DEV.x, K_DEV.y, K_DEV.r + 18,   10), color: COLOR.dev, loop: 'dev', range: [0.64, 0.71] },
  { label: 'Plan',      ...p(K_DEV.x, K_DEV.y, K_DEV.r + 18,   90), color: COLOR.dev, loop: 'dev', range: [0.71, 0.75] },
  // Ops circle (top-right knot)
  { label: 'Release',   ...p(K_OPS.x, K_OPS.y, K_OPS.r + 18, -130), color: COLOR.ops, loop: 'ops', range: [0.75, 0.82] },
  { label: 'Deploy',    ...p(K_OPS.x, K_OPS.y, K_OPS.r + 18,  -50), color: COLOR.ops, loop: 'ops', range: [0.82, 0.89] },
  { label: 'Operate',   ...p(K_OPS.x, K_OPS.y, K_OPS.r + 18,   10), color: COLOR.ops, loop: 'ops', range: [0.89, 0.95] },
  { label: 'Monitor',   ...p(K_OPS.x, K_OPS.y, K_OPS.r + 18,   90), color: COLOR.ops, loop: 'ops', range: [0.95, 1.00] },
]
