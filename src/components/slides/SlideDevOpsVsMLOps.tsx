import { motion } from 'framer-motion'

const DEVOPS_LABELS = [
  { label: 'Plan', angle: -135, r: 72, color: '#3b82f6' },
  { label: 'Code', angle: -90, r: 72, color: '#6366f1' },
  { label: 'Build', angle: -45, r: 72, color: '#8b5cf6' },
  { label: 'Test', angle: 0, r: 72, color: '#7c3aed' },
  { label: 'Release', angle: 45, r: 72, color: '#2563eb' },
  { label: 'Deploy', angle: 90, r: 72, color: '#0891b2' },
  { label: 'Operate', angle: 135, r: 72, color: '#059669' },
  { label: 'Monitor', angle: 180, r: 72, color: '#16a34a' },
]

// Infinity figure-8 path points for DevOps loop
function InfinityPath() {
  // Two lobes centered at (-55,0) and (+55,0), radius ~55
  return (
    <motion.path
      d="M 0,0 C -30,-60 -110,-60 -110,0 C -110,60 -30,60 0,0 C 30,-60 110,-60 110,0 C 110,60 30,60 0,0 Z"
      fill="none"
      stroke="url(#devopsGrad)"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
    />
  )
}

// Animated dot traveling along the infinity path
function InfinityDot() {
  return (
    <motion.circle
      r="5"
      fill="#3b82f6"
      filter="url(#glow)"
    >
      <animateMotion
        dur="4s"
        repeatCount="indefinite"
        path="M 0,0 C -30,-60 -110,-60 -110,0 C -110,60 -30,60 0,0 C 30,-60 110,-60 110,0 C 110,60 30,60 0,0 Z"
      />
    </motion.circle>
  )
}

// MLOps triple circle — 3 overlapping circles: ML, DEV, OPS
const ML_STEPS = [
  { label: 'Model', angle: -120 },
  { label: 'Data', angle: 180 },
]
const DEV_STEPS = [
  { label: 'Create', angle: -120 },
  { label: 'Verify', angle: 150 },
  { label: 'Package', angle: 60 },
]
const OPS_STEPS = [
  { label: 'Plan', angle: -60 },
  { label: 'Release', angle: -120 },
  { label: 'Configure', angle: 0 },
  { label: 'Monitor', angle: 90 },
]

function angleToXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
}

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

      {/* Two panels side by side */}
      <div className="flex flex-row gap-6 flex-1 min-h-0 items-stretch max-w-5xl mx-auto w-full">

        {/* LEFT: DevOps infinity loop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 bg-white rounded-3xl border-2 border-blue-200 shadow-lg flex flex-col items-center justify-center py-4 px-4 gap-3"
        >
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-black mb-1">DevOps</div>
            <p className="text-slate-500 text-xs">Código → Infraestructura</p>
          </div>

          <svg width="280" height="180" viewBox="-140 -90 280 180">
            <defs>
              <linearGradient id="devopsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* DEV and OPS labels in each lobe */}
            <motion.text x="-55" y="6" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e3a5f" opacity="0.15"
              initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ delay: 1.5 }}>DEV</motion.text>
            <motion.text x="55" y="6" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e3a5f" opacity="0.15"
              initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ delay: 1.5 }}>OPS</motion.text>

            <InfinityPath />
            <InfinityDot />

            {/* Step labels around the loops */}
            {[
              { label: 'Plan', x: -95, y: -55 },
              { label: 'Code', x: -55, y: -68 },
              { label: 'Build', x: -10, y: -48 },
              { label: 'Test', x: 10, y: -48 },
              { label: 'Release', x: 10, y: 50 },
              { label: 'Deploy', x: 55, y: 68 },
              { label: 'Operate', x: 95, y: 55 },
              { label: 'Monitor', x: 95, y: -55 },
            ].map((item, i) => (
              <motion.text
                key={item.label}
                x={item.x} y={item.y}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="#374151"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
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
          className="flex-1 bg-white rounded-3xl border-2 border-indigo-200 shadow-lg flex flex-col items-center justify-center py-4 px-4 gap-3"
        >
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-black mb-1">MLOps</div>
            <p className="text-slate-500 text-xs">Datos + Código → Modelo en Producción</p>
          </div>

          <svg width="300" height="180" viewBox="-150 -90 300 180">
            <defs>
              <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#374151" />
              </linearGradient>
            </defs>

            {/* Three overlapping circles: ML (left), DEV (center), OPS (right) */}
            {/* ML circle */}
            <motion.circle cx="-65" cy="0" r="58"
              fill="#1e293b" fillOpacity="0.85" stroke="#334155" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 120 }}
              style={{ transformOrigin: '-65px 0px' }}
            />
            {/* DEV circle */}
            <motion.circle cx="0" cy="0" r="58"
              fill="#1e3a6e" fillOpacity="0.85" stroke="#2563eb" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6, type: 'spring', stiffness: 120 }}
              style={{ transformOrigin: '0px 0px' }}
            />
            {/* OPS circle */}
            <motion.circle cx="65" cy="0" r="58"
              fill="#94a3b8" fillOpacity="0.7" stroke="#64748b" strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6, type: 'spring', stiffness: 120 }}
              style={{ transformOrigin: '65px 0px' }}
            />

            {/* Center labels */}
            <motion.text x="-65" y="4" textAnchor="middle" fontSize="14" fontWeight="900" fill="white"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>ML</motion.text>
            <motion.text x="0" y="4" textAnchor="middle" fontSize="14" fontWeight="900" fill="white"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>DEV</motion.text>
            <motion.text x="65" y="4" textAnchor="middle" fontSize="14" fontWeight="900" fill="white"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>OPS</motion.text>

            {/* Icons (emoji via foreignObject not reliable in SVG, use text symbols) */}
            <motion.text x="-65" y="-12" textAnchor="middle" fontSize="18"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>🧠</motion.text>
            <motion.text x="0" y="-12" textAnchor="middle" fontSize="18"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>💻</motion.text>
            <motion.text x="65" y="-12" textAnchor="middle" fontSize="18"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>⚙️</motion.text>

            {/* Step labels around circles */}
            {[
              { label: 'Model', x: -95, y: -52 },
              { label: 'Data', x: -100, y: 45 },
              { label: 'Create', x: -32, y: -72 },
              { label: 'Verify', x: -28, y: 72 },
              { label: 'Package', x: 25, y: 72 },
              { label: 'Plan', x: 30, y: -72 },
              { label: 'Release', x: 95, y: -52 },
              { label: 'Configure', x: 112, y: 0 },
              { label: 'Monitor', x: 95, y: 52 },
            ].map((item, i) => (
              <motion.text
                key={item.label}
                x={item.x} y={item.y}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="#e2e8f0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.08 }}
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
        className="mt-3 max-w-5xl mx-auto w-full grid grid-cols-2 gap-4 text-center"
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
