import { motion } from 'framer-motion'

// Infinity path (figure-8): left lobe center ~(-75,0), right lobe center ~(75,0)
// Path traced clockwise starting at the center crossing (0,0)
const INF_PATH = "M 0,0 C 20,-65 130,-65 130,0 C 130,65 20,65 0,0 C -20,-65 -130,-65 -130,0 C -130,65 -20,65 0,0 Z"

// Labels positioned along the infinity path — corrected positions
// Left lobe (DEV): Plan top-left, Code top, Build top-right near center
// Right lobe (OPS): Release bottom-right near center, Deploy bottom, Operate bottom-right, Monitor top-right
const DEVOPS_LABELS = [
  // Left lobe — DEV side
  { label: 'Plan',    x: -110, y: -55 },
  { label: 'Code',    x:  -68, y: -72 },
  { label: 'Build',   x:  -24, y: -55 },
  { label: 'Test',    x:    0, y:  18 },
  // Right lobe — OPS side
  { label: 'Release', x:   24, y: -55 },
  { label: 'Deploy',  x:   68, y: -72 },
  { label: 'Operate', x:  110, y: -55 },
  { label: 'Monitor', x:  110, y:  55 },
]

// MLOps triple circle path — a continuous figure-8 style loop going through all 3 circle centers
// Circle centers: ML at (-80,0), DEV at (0,0), OPS at (80,0), radius 52 each
// Dot travels: top of ML → top of DEV → top of OPS → bottom of OPS → bottom of DEV → bottom of ML → back
const MLOPS_DOT_PATH = "M -80,-52 C -40,-52 -40,-52 0,-52 C 40,-52 40,-52 80,-52 C 100,-26 100,26 80,52 C 40,52 40,52 0,52 C -40,52 -40,52 -80,52 C -100,26 -100,-26 -80,-52 Z"

const MLOPS_LABELS = [
  { label: 'Model',     x: -118, y: -32 },
  { label: 'Data',      x: -118, y:  32 },
  { label: 'Create',    x:  -40, y: -68 },
  { label: 'Verify',    x:  -40, y:  68 },
  { label: 'Package',   x:   40, y:  68 },
  { label: 'Plan',      x:   40, y: -68 },
  { label: 'Release',   x:  118, y: -32 },
  { label: 'Configure', x:  118, y:   8 },
  { label: 'Monitor',   x:  118, y:  48 },
]

export function SlideDevOpsVsMLOps() {
  return (
    <div className="slide-container px-8 flex flex-col bg-[#eef2ff]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-1">
          DevOps <span className="text-slate-400">vs</span> MLOps: Ciclo de Vida
        </h1>
        <p className="text-slate-500 text-base">
          DevOps entrega software · MLOps entrega modelos ML en producción
        </p>
      </motion.div>

      {/* Two panels side by side — items-center so they don't stretch full height */}
      <div className="flex flex-row gap-6 items-start max-w-5xl mx-auto w-full">

        {/* LEFT: DevOps infinity loop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 bg-white rounded-3xl border-2 border-blue-200 shadow-lg flex flex-col items-center py-5 px-4 gap-3"
        >
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-black mb-1">DevOps</div>
            <p className="text-slate-500 text-xs">Código → Infraestructura</p>
          </div>

          <svg width="290" height="190" viewBox="-145 -100 290 190">
            <defs>
              <linearGradient id="devopsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Lobe background fills */}
            <ellipse cx="-65" cy="0" rx="62" ry="48" fill="#eff6ff" opacity="0.6" />
            <ellipse cx="65" cy="0" rx="62" ry="48" fill="#f0fdf4" opacity="0.6" />

            {/* DEV / OPS faint labels inside lobes */}
            <text x="-65" y="6" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1d4ed8" opacity="0.12">DEV</text>
            <text x="65" y="6" textAnchor="middle" fontSize="22" fontWeight="900" fill="#15803d" opacity="0.12">OPS</text>

            {/* Infinity path drawn on */}
            <motion.path
              d={INF_PATH}
              fill="none"
              stroke="url(#devopsGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.3 }}
            />

            {/* Traveling dot */}
            <motion.circle r="6" fill="#6366f1" filter="url(#glow)">
              <animateMotion dur="5s" repeatCount="indefinite" path={INF_PATH} />
            </motion.circle>

            {/* Step labels — dark, readable */}
            {DEVOPS_LABELS.map((item, i) => (
              <motion.text
                key={item.label}
                x={item.x} y={item.y}
                textAnchor="middle"
                fontSize="10"
                fontWeight="800"
                fill="#1e293b"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
              >
                {item.label}
              </motion.text>
            ))}
          </svg>

          <div className="flex gap-2 flex-wrap justify-center">
            {['CI/CD', 'Infraestructura como Código', 'Automatización'].map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold" style={{ fontSize: '10px' }}>{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: MLOps triple circle */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 bg-white rounded-3xl border-2 border-indigo-200 shadow-lg flex flex-col items-center py-5 px-4 gap-3"
        >
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-black mb-1">MLOps</div>
            <p className="text-slate-500 text-xs">Datos + Código → Modelo en Producción</p>
          </div>

          <svg width="290" height="190" viewBox="-145 -95 290 190">
            <defs>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Three overlapping circles: ML (left), DEV (center), OPS (right) */}
            <motion.circle cx="-80" cy="0" r="52"
              fill="#1e293b" fillOpacity="0.88" stroke="#475569" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 120 }}
              style={{ transformOrigin: '-80px 0px' }}
            />
            <motion.circle cx="0" cy="0" r="52"
              fill="#1e3a8a" fillOpacity="0.88" stroke="#2563eb" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6, type: 'spring', stiffness: 120 }}
              style={{ transformOrigin: '0px 0px' }}
            />
            <motion.circle cx="80" cy="0" r="52"
              fill="#64748b" fillOpacity="0.88" stroke="#94a3b8" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6, type: 'spring', stiffness: 120 }}
              style={{ transformOrigin: '80px 0px' }}
            />

            {/* Center labels */}
            <motion.text x="-80" y="-8" textAnchor="middle" fontSize="18" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>🧠</motion.text>
            <motion.text x="-80" y="12" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>ML</motion.text>

            <motion.text x="0" y="-8" textAnchor="middle" fontSize="18" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>💻</motion.text>
            <motion.text x="0" y="12" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>DEV</motion.text>

            <motion.text x="80" y="-8" textAnchor="middle" fontSize="18" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>⚙️</motion.text>
            <motion.text x="80" y="12" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>OPS</motion.text>

            {/* Traveling dot around all 3 circles */}
            <motion.circle r="6" fill="#a5b4fc" filter="url(#glow2)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <animateMotion dur="6s" repeatCount="indefinite" begin="1.5s" path={MLOPS_DOT_PATH} />
            </motion.circle>

            {/* Step labels — dark and readable */}
            {MLOPS_LABELS.map((item, i) => (
              <motion.text
                key={item.label}
                x={item.x} y={item.y}
                textAnchor="middle"
                fontSize="10"
                fontWeight="800"
                fill="#1e293b"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.08 }}
              >
                {item.label}
              </motion.text>
            ))}
          </svg>

          <div className="flex gap-2 flex-wrap justify-center">
            {['CT: Reentrenamiento', 'Feature Store', 'Model Registry'].map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold" style={{ fontSize: '10px' }}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom comparison bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="mt-4 max-w-5xl mx-auto w-full grid grid-cols-2 gap-4 text-center"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
          <span className="text-blue-700 font-bold text-sm">DevOps</span>
          <span className="text-slate-500 text-xs"> — artefacto final: </span>
          <span className="text-blue-700 font-semibold text-xs">aplicación ejecutable</span>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2">
          <span className="text-indigo-700 font-bold text-sm">MLOps</span>
          <span className="text-slate-500 text-xs"> — artefacto final: </span>
          <span className="text-indigo-700 font-semibold text-xs">modelo entrenado + pipeline activo</span>
        </div>
      </motion.div>
    </div>
  )
}
