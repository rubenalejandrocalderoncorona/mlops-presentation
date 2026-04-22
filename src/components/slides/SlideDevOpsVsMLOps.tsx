import { motion } from 'framer-motion'

// ─── Shared infinity-loop path ──────────────────────────────────────────────
// Two lobes: left center (-68,0), right center (+68,0), each radius ~60
// Traced clockwise starting from left lobe top (-68,-60)
const INF = 'M -68,-60 C -30,-60 -12,-28 0,0 C 12,28 30,60 68,60 C 106,60 128,33 128,0 C 128,-33 106,-60 68,-60 C 30,-60 12,-28 0,0 C -12,28 -30,60 -68,60 C -106,60 -128,33 -128,0 C -128,-33 -106,-60 -68,-60 Z'

// Helper: point on a circle
function circ(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// DevOps labels: 4 around left lobe (DEV), 4 around right lobe (OPS)
// Lobe centers ±68, label radius 78 so they sit just outside the stroke
const DV_LEFT  = [{ l: 'Plan', d: -135 }, { l: 'Code', d: -90 }, { l: 'Build', d: -45 }, { l: 'Test', d: 90 }]
const DV_RIGHT = [{ l: 'Release', d: -135 }, { l: 'Deploy', d: -90 }, { l: 'Operate', d: -45 }, { l: 'Monitor', d: 90 }]
const DEVOPS_LABELS = [
  ...DV_LEFT.map(({ l, d }) => ({ label: l, ...circ(-68, 0, 80, d) })),
  ...DV_RIGHT.map(({ l, d }) => ({ label: l, ...circ(68, 0, 80, d) })),
]

// DataML labels: 4 around left lobe (Data), 4 around right lobe (ML)
const DML_LEFT  = [{ l: 'Transform', d: -135 }, { l: 'Curate', d: -90 }, { l: 'Collect', d: -45 }, { l: 'Validate', d: 90 }]
const DML_RIGHT = [{ l: 'Train', d: -135 }, { l: 'Evaluate', d: -90 }, { l: 'Formulate', d: -45 }, { l: 'Explore', d: 90 }]
const DATAML_LABELS = [
  ...DML_LEFT.map(({ l, d }) => ({ label: l, ...circ(-68, 0, 80, d) })),
  ...DML_RIGHT.map(({ l, d }) => ({ label: l, ...circ(68, 0, 80, d) })),
]

// MLOps labels: combined loop. Left lobe = Data+Dev mix, right = ML+Ops mix
const ML_LEFT  = [{ l: 'Validate', d: -150 }, { l: 'Curate', d: -90 }, { l: 'Collect', d: -30 }, { l: 'Code', d: 90 }]
const ML_RIGHT = [{ l: 'Train', d: -150 }, { l: 'Deploy', d: -90 }, { l: 'Monitor', d: -30 }, { l: 'Release', d: 90 }]
const MLOPS_LABELS = [
  ...ML_LEFT.map(({ l, d }) => ({ label: l, ...circ(-68, 0, 80, d) })),
  ...ML_RIGHT.map(({ l, d }) => ({ label: l, ...circ(68, 0, 80, d) })),
]

// ─── Reusable infinity diagram ───────────────────────────────────────────────
interface InfinityDiagramProps {
  leftLabel: string
  rightLabel: string
  leftColor: string
  rightColor: string
  strokeColor: string
  dotColor: string
  labels: { label: string; x: number; y: number }[]
  gradId: string
  glowId: string
  animDelay?: number
}

function InfinityDiagram({
  leftLabel, rightLabel, leftColor, rightColor,
  strokeColor, dotColor, labels, gradId, glowId, animDelay = 0,
}: InfinityDiagramProps) {
  return (
    <svg width="240" height="185" viewBox="-120 -92 240 185">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={leftColor} />
          <stop offset="100%" stopColor={rightColor} />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Lobe fills */}
      <ellipse cx="-68" cy="0" rx="58" ry="48" fill={leftColor} fillOpacity="0.08" />
      <ellipse cx="68" cy="0" rx="58" ry="48" fill={rightColor} fillOpacity="0.08" />

      {/* Lobe center labels */}
      <text x="-68" y="6" textAnchor="middle" fontSize="18" fontWeight="900" fill={leftColor} opacity="0.25">{leftLabel}</text>
      <text x="68" y="6" textAnchor="middle" fontSize="18" fontWeight="900" fill={rightColor} opacity="0.25">{rightLabel}</text>

      {/* Path draw-on */}
      <motion.path
        d={INF}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut', delay: animDelay }}
      />

      {/* Traveling dot */}
      <motion.circle r="5" fill={dotColor} filter={`url(#${glowId})`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: animDelay + 1.5 }}>
        <animateMotion dur="5s" repeatCount="indefinite" path={INF} />
      </motion.circle>

      {/* Labels */}
      {labels.map((item, i) => (
        <motion.text
          key={item.label}
          x={item.x} y={item.y}
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill="#1e293b"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animDelay + 1.0 + i * 0.07 }}
        >
          {item.label}
        </motion.text>
      ))}
    </svg>
  )
}

// ─── Main slide ──────────────────────────────────────────────────────────────
export function SlideDevOpsVsMLOps() {
  return (
    <div className="slide-container px-6 flex flex-col bg-[#eef2ff]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3"
      >
        <h1 className="text-3xl font-black text-slate-800 mb-0.5">
          MLOps = DataML <span className="text-slate-400">+</span> DevOps
        </h1>
        <p className="text-slate-500 text-sm">
          Dos ciclos independientes se fusionan en el ciclo de vida MLOps
        </p>
      </motion.div>

      {/* Three diagrams: DataML + DevOps → MLOps */}
      <div className="flex flex-row items-center justify-center gap-2 max-w-6xl mx-auto w-full">

        {/* ── DataML loop ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center bg-white rounded-2xl border-2 border-amber-200 shadow-md py-3 px-3 gap-1"
        >
          <div className="flex gap-1 items-center">
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black">DataML</span>
          </div>
          <InfinityDiagram
            leftLabel="Data" rightLabel="ML"
            leftColor="#d97706" rightColor="#16a34a"
            strokeColor="#d97706" dotColor="#f59e0b"
            gradId="dmlGrad" glowId="dmlGlow"
            labels={DATAML_LABELS}
            animDelay={0.3}
          />
          <div className="flex gap-1 flex-wrap justify-center">
            {['Datos', 'Modelos', 'Experimentos'].map(t => (
              <span key={t} className="px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold" style={{ fontSize: '9px' }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* + symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          className="text-4xl font-black text-slate-300 flex-shrink-0"
        >
          +
        </motion.div>

        {/* ── DevOps loop ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center bg-white rounded-2xl border-2 border-blue-200 shadow-md py-3 px-3 gap-1"
        >
          <div className="flex gap-1 items-center">
            <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-black">DevOps</span>
          </div>
          <InfinityDiagram
            leftLabel="Dev" rightLabel="Ops"
            leftColor="#3b82f6" rightColor="#059669"
            strokeColor="#3b82f6" dotColor="#6366f1"
            gradId="dvGrad" glowId="dvGlow"
            labels={DEVOPS_LABELS}
            animDelay={0.5}
          />
          <div className="flex gap-1 flex-wrap justify-center">
            {['CI/CD', 'Infraestructura', 'Automatización'].map(t => (
              <span key={t} className="px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold" style={{ fontSize: '9px' }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* → symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center gap-1 flex-shrink-0"
        >
          <span className="text-4xl font-black text-slate-300">=</span>
          <motion.div
            className="w-8 h-0.5 bg-indigo-400 rounded"
            animate={{ scaleX: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ── MLOps combined loop ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center bg-white rounded-2xl border-2 border-indigo-300 shadow-lg py-3 px-3 gap-1"
          style={{ boxShadow: '0 0 0 2px #818cf830, 0 4px 24px #6366f120' }}
        >
          <div className="flex gap-1 items-center">
            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-black">MLOps</span>
            <motion.span
              className="text-[9px] font-bold text-indigo-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ∞
            </motion.span>
          </div>
          <InfinityDiagram
            leftLabel="Data+Dev" rightLabel="ML+Ops"
            leftColor="#6366f1" rightColor="#8b5cf6"
            strokeColor="#6366f1" dotColor="#a5b4fc"
            gradId="mloGrad" glowId="mloGlow"
            labels={MLOPS_LABELS}
            animDelay={0.7}
          />
          <div className="flex gap-1 flex-wrap justify-center">
            {['CT', 'Feature Store', 'Model Registry', 'Monitoring'].map(t => (
              <span key={t} className="px-1.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold" style={{ fontSize: '9px' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="mt-3 max-w-6xl mx-auto w-full grid grid-cols-3 gap-3 text-center"
      >
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
          <span className="text-amber-700 font-bold text-xs">DataML</span>
          <span className="text-slate-400 text-xs"> — datos + experimentos</span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5">
          <span className="text-blue-700 font-bold text-xs">DevOps</span>
          <span className="text-slate-400 text-xs"> — código + infraestructura</span>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-1.5">
          <span className="text-indigo-700 font-bold text-xs">MLOps</span>
          <span className="text-slate-400 text-xs"> — modelos en producción continuamente</span>
        </div>
      </motion.div>
    </div>
  )
}
