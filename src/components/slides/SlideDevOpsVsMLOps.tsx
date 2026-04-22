import { motion } from 'framer-motion'

// ─── Math helpers ─────────────────────────────────────────────────────────────
function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: +(cx + r * Math.cos(rad)).toFixed(1), y: +(cy + r * Math.sin(rad)).toFixed(1) }
}

// ─── Small infinity loop path (for left-side diagrams) ────────────────────────
// Lobe centers: left (-52,0), right (+52,0), each radius ~46
// Clockwise from top of left lobe
const SMALL_INF =
  'M -52,-46 C -20,-46 -8,-20 0,0 C 8,20 20,46 52,46 C 84,46 98,23 98,0 C 98,-23 84,-46 52,-46 C 20,-46 8,-20 0,0 C -8,20 -20,46 -52,46 C -84,46 -98,23 -98,0 C -98,-23 -84,-46 -52,-46 Z'

// Labels at equidistant angles around each lobe (angles relative to lobe center)
// 4 labels per lobe at -135°, -90°, -45°, +90° (top-left, top, top-right, bottom)
function lobeLabels(cx: number, r: number, items: string[]) {
  const angles = [-135, -90, -45, 90]
  return items.map((label, i) => ({ label, ...pt(cx, 0, r, angles[i]) }))
}

const DATAML_LABELS = [
  ...lobeLabels(-52, 62, ['Transform', 'Curate', 'Collect', 'Validate']),
  ...lobeLabels(52, 62, ['Train', 'Evaluate', 'Formulate', 'Explore']),
]

const DEVOPS_LABELS = [
  ...lobeLabels(-52, 62, ['Build', 'Code', 'Plan', 'Release']),
  ...lobeLabels(52, 62, ['Deploy', 'Monitor', 'Operate', 'Test']),
]

// ─── MLOps knot: 4 circles at corners of a rectangle ─────────────────────────
// Positions: ML(top-left), Ops(top-right), Data(bottom-left), Dev(bottom-right)
// cx=±90, cy=±55, radius 42 each
// The knot path visits all 4 in a figure-8 knot: ML→Ops→Dev→Data→ML
// Two crossings at top-center and bottom-center
const KNOT_PATH =
  'M 0,-55 C 40,-55 88,-97 90,-55 C 92,-13 50,13 0,0 C -50,-13 -92,-42 -90,0 C -88,42 -40,97 0,55 C 40,55 88,13 90,55 C 92,97 50,97 0,55 C -40,55 -88,97 -90,55 C -92,13 -50,-13 0,0 C 50,13 92,-42 90,0 C 88,42 40,-55 0,-55 Z'

// Labels around each of the 4 circles
const KNOT_LABELS = [
  // ML circle top-left (-90,-55), labels outside at r=54
  { label: 'Train',     ...pt(-90, -55, 54, -120) },
  { label: 'Evaluate',  ...pt(-90, -55, 54, -60)  },
  { label: 'Explore',   ...pt(-90, -55, 54, 180)  },
  { label: 'Formulate', ...pt(-90, -55, 54, 110)  },
  // Ops circle top-right (90,-55)
  { label: 'Deploy',    ...pt(90, -55, 54, -60)   },
  { label: 'Monitor',   ...pt(90, -55, 54, 0)     },
  { label: 'Operate',   ...pt(90, -55, 54, 60)    },
  { label: 'Release',   ...pt(90, -55, 54, -120)  },
  // Data circle bottom-left (-90,55)
  { label: 'Curate',    ...pt(-90, 55, 54, -120)  },
  { label: 'Collect',   ...pt(-90, 55, 54, -60)   },
  { label: 'Validate',  ...pt(-90, 55, 54, 180)   },
  { label: 'Transform', ...pt(-90, 55, 54, 110)   },
  // Dev circle bottom-right (90,55)
  { label: 'Plan',      ...pt(90, 55, 54, -60)    },
  { label: 'Build',     ...pt(90, 55, 54, 0)      },
  { label: 'Test',      ...pt(90, 55, 54, 60)     },
  { label: 'Code',      ...pt(90, 55, 54, -120)   },
]

// ─── Small infinity diagram component ────────────────────────────────────────
interface SmallLoopProps {
  leftText: string
  rightText: string
  leftColor: string
  rightColor: string
  dotColor: string
  gradId: string
  glowId: string
  labels: { label: string; x: number; y: number }[]
  delay: number
  icon: string
  iconRight: string
}

function SmallLoop({ leftText, rightText, leftColor, rightColor, dotColor, gradId, glowId, labels, delay, icon, iconRight }: SmallLoopProps) {
  return (
    <svg width="220" height="155" viewBox="-110 -77 220 155">
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
      <ellipse cx="-52" cy="0" rx="44" ry="38" fill={leftColor} fillOpacity="0.1" />
      <ellipse cx="52" cy="0" rx="44" ry="38" fill={rightColor} fillOpacity="0.1" />

      {/* Icons */}
      <text x="-52" y="-6" textAnchor="middle" fontSize="16">{icon}</text>
      <text x="52" y="-6" textAnchor="middle" fontSize="16">{iconRight}</text>

      {/* Lobe text labels */}
      <text x="-52" y="12" textAnchor="middle" fontSize="11" fontWeight="900" fill={leftColor} opacity="0.7">{leftText}</text>
      <text x="52" y="12" textAnchor="middle" fontSize="11" fontWeight="900" fill={rightColor} opacity="0.7">{rightText}</text>

      {/* Path */}
      <motion.path
        d={SMALL_INF}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay }}
      />

      {/* Dot */}
      <motion.circle r="4.5" fill={dotColor} filter={`url(#${glowId})`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 1.4 }}>
        <animateMotion dur="4s" repeatCount="indefinite" path={SMALL_INF} />
      </motion.circle>

      {/* Step labels */}
      {labels.map((item, i) => (
        <motion.text key={item.label} x={item.x} y={item.y}
          textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#374151"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.9 + i * 0.06 }}
        >
          {item.label}
        </motion.text>
      ))}
    </svg>
  )
}

// ─── MLOps knot diagram ───────────────────────────────────────────────────────
function KnotDiagram() {
  return (
    <svg width="340" height="280" viewBox="-170 -140 340 280">
      <defs>
        <linearGradient id="knotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="35%" stopColor="#6366f1" />
          <stop offset="65%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="knotGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* 4 circle backgrounds */}
      <motion.circle cx="-90" cy="-55" r="42" fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 120 }} style={{ transformOrigin: '-90px -55px' }} />
      <motion.circle cx="90" cy="-55" r="42" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.95, type: 'spring', stiffness: 120 }} style={{ transformOrigin: '90px -55px' }} />
      <motion.circle cx="-90" cy="55" r="42" fill="#d97706" fillOpacity="0.15" stroke="#d97706" strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 120 }} style={{ transformOrigin: '-90px 55px' }} />
      <motion.circle cx="90" cy="55" r="42" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.25, type: 'spring', stiffness: 120 }} style={{ transformOrigin: '90px 55px' }} />

      {/* Knot path */}
      <motion.path
        d={KNOT_PATH}
        fill="none"
        stroke="url(#knotGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.6 }}
      />

      {/* Traveling dot */}
      <motion.circle r="5.5" fill="#a5b4fc" filter="url(#knotGlow)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
        <animateMotion dur="7s" repeatCount="indefinite" begin="2s" path={KNOT_PATH} />
      </motion.circle>

      {/* Circle icons + labels */}
      {[
        { x: -90, y: -55, icon: '🧠', label: 'ML',   color: '#16a34a' },
        { x:  90, y: -55, icon: '⚙️', label: 'Ops',  color: '#6366f1' },
        { x: -90, y:  55, icon: '☁️', label: 'Data', color: '#d97706' },
        { x:  90, y:  55, icon: '</>', label: 'Dev',  color: '#3b82f6' },
      ].map(({ x, y, icon, label, color }, i) => (
        <motion.g key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 + i * 0.15 }}>
          <text x={x} y={y - 8} textAnchor="middle" fontSize="18">{icon}</text>
          <text x={x} y={y + 14} textAnchor="middle" fontSize="12" fontWeight="900" fill={color}>{label}</text>
        </motion.g>
      ))}

      {/* Step labels around each circle */}
      {KNOT_LABELS.map((item, i) => (
        <motion.text key={item.label + i} x={item.x} y={item.y}
          textAnchor="middle" fontSize="8" fontWeight="800" fill="#374151"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.8 + i * 0.05 }}
        >
          {item.label}
        </motion.text>
      ))}
    </svg>
  )
}

// ─── Main slide ───────────────────────────────────────────────────────────────
export function SlideDevOpsVsMLOps() {
  return (
    <div className="slide-container px-6 bg-[#eef2ff]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-black text-slate-800 mb-0.5">
          MLOps = DataML <span className="text-slate-400 font-light">+</span> DevOps
        </h1>
        <p className="text-slate-500 text-sm">
          Dos ciclos independientes se fusionan en el ciclo de vida MLOps
        </p>
      </motion.div>

      <div className="flex flex-row items-center justify-center gap-4 w-full max-w-6xl mx-auto">

        {/* ── Left column: DataML stacked over DevOps ── */}
        <div className="flex flex-col items-center gap-1">

          {/* DataML loop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl border-2 border-amber-200 shadow-md px-3 py-2 flex flex-col items-center gap-1"
          >
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">DataML</span>
            <SmallLoop
              leftText="Data" rightText="ML"
              leftColor="#d97706" rightColor="#16a34a"
              dotColor="#f59e0b"
              gradId="dmlGrad" glowId="dmlGlow"
              labels={DATAML_LABELS}
              delay={0.4}
              icon="☁️" iconRight="🧠"
            />
          </motion.div>

          {/* Plus sign */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
            className="text-3xl font-black text-slate-300 leading-none"
          >
            +
          </motion.div>

          {/* DevOps loop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl border-2 border-blue-200 shadow-md px-3 py-2 flex flex-col items-center gap-1"
          >
            <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-black">DevOps</span>
            <SmallLoop
              leftText="Dev" rightText="Ops"
              leftColor="#3b82f6" rightColor="#059669"
              dotColor="#6366f1"
              gradId="dvGrad" glowId="dvGlow"
              labels={DEVOPS_LABELS}
              delay={0.6}
              icon="💻" iconRight="⚙️"
            />
          </motion.div>
        </div>

        {/* ── Arrow ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex flex-col items-center gap-1 flex-shrink-0"
        >
          <span className="text-2xl font-black text-indigo-400">→</span>
          <div className="text-[10px] font-bold text-indigo-300 text-center leading-tight">MLOps<br/>lifecycle</div>
        </motion.div>

        {/* ── Right: MLOps knot ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-2xl border-2 border-indigo-300 shadow-lg px-4 py-3 flex flex-col items-center gap-2"
          style={{ boxShadow: '0 0 0 2px #818cf820, 0 6px 32px #6366f118' }}
        >
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black">MLOps</span>
            <motion.span
              className="text-sm font-black text-indigo-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ∞
            </motion.span>
          </div>
          <KnotDiagram />
          <div className="flex gap-1 flex-wrap justify-center">
            {['ML', 'Data', 'Dev', 'Ops', '→ Producción'].map(t => (
              <span key={t} className="px-1.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold" style={{ fontSize: '9px' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
