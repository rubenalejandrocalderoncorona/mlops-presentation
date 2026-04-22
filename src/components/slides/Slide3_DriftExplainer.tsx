import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp } from 'lucide-react'

function gaussianPath(mean: number, std: number, ampY: number, steps = 60, xMin = 0, xMax = 100): string {
  const points = Array.from({ length: steps }, (_, i) => {
    const x = xMin + (i / (steps - 1)) * (xMax - xMin)
    const y = ampY * Math.exp(-0.5 * ((x - mean) / std) ** 2)
    return `${x.toFixed(1)},${(78 - y).toFixed(1)}`
  })
  return `M ${points.join(' L ')}`
}

export function Slide3_DriftExplainer() {
  const trainPath = gaussianPath(32, 11, 65)
  const driftPath = gaussianPath(62, 11, 65)

  // Concept drift scatter
  const classA = [[18,62],[23,52],[16,42],[28,47],[21,37],[25,57]]
  const classB = [[68,28],[73,18],[63,23],[78,33],[70,13]]
  const newPoints = [[54,52],[60,46],[57,40]]

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-1">
          ¿Por qué MLOps <span className="text-blue-600">≠</span> DevOps?
        </h1>
        <p className="text-slate-500 text-lg">El software no envejece — los modelos ML sí. Dos tipos de degradación.</p>
      </motion.div>

      <div className="flex gap-6 max-w-5xl mx-auto w-full">
        {/* LEFT: Data Drift */}
        <motion.div
          className="flex-1 card-light p-5 flex flex-col gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ borderTop: '3px solid #3b82f6' }}
        >
          <div className="flex items-center gap-2 text-blue-600">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-black text-base text-slate-800">Deriva de Datos</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Data Drift</span>
          </div>

          {/* Looping chart */}
          <div>
            <div className="flex gap-4 text-xs mb-1 justify-center">
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-blue-500"/><span className="text-slate-500">Entrenamiento</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-red-400 border-dashed"/><span className="text-slate-500">Producción</span></div>
            </div>
            <svg viewBox="0 0 100 90" className="w-full" style={{ height: 130 }}>
              <line x1="5" y1="80" x2="97" y2="80" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="5" y1="10" x2="5" y2="80" stroke="#e2e8f0" strokeWidth="0.8" />

              {/* Training distribution — static */}
              <path d={trainPath} fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="1.5" />

              {/* Drift distribution — oscillates */}
              <motion.path
                d={driftPath}
                fill="rgba(239,68,68,0.15)"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                animate={{ x: [-28, 0, -28] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Animated shift arrow */}
              <motion.g
                animate={{ x: [-14, 0, -14] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <line x1="32" y1="28" x2="58" y2="28" stroke="#f59e0b" strokeWidth="1" />
                <polygon points="58,25 63,28 58,31" fill="#f59e0b" />
                <text x="35" y="24" fontSize="4" fill="#d97706" fontWeight="bold">desviación →</text>
              </motion.g>

              <text x="20" y="87" fontSize="4" fill="#3b82f6">μ=2019</text>
              <motion.text x="50" y="87" fontSize="4" fill="#ef4444"
                animate={{ x: [22, 50, 22] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                μ=ahora
              </motion.text>
            </svg>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">La distribución de los datos de entrada cambia con el tiempo.</p>
          <div className="text-xs leading-relaxed px-3 py-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-100">
            Ejemplo: Modelo de precios de taxi entrenado en 2019 recibe datos post-pandemia.
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
          className="w-px bg-blue-100 self-stretch" />

        {/* RIGHT: Concept Drift */}
        <motion.div
          className="flex-1 card-light p-5 flex flex-col gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ borderTop: '3px solid #7c3aed' }}
        >
          <div className="flex items-center gap-2 text-purple-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-black text-base text-slate-800">Deriva de Concepto</h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">Concept Drift</span>
          </div>

          <div>
            <div className="flex gap-4 text-xs mb-1 justify-center">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-400"/><span className="text-slate-500">Clase A</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-purple-500"/><span className="text-slate-500">Clase B</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-orange-400 border-2 border-dashed border-orange-600"/><span className="text-slate-500">A nuevo</span></div>
            </div>
            <svg viewBox="0 0 100 90" className="w-full" style={{ height: 130 }}>
              <line x1="5" y1="80" x2="97" y2="80" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="5" y1="10" x2="5" y2="80" stroke="#e2e8f0" strokeWidth="0.8" />

              {/* Decision boundary — oscillates between old and new */}
              <motion.line
                x1="10" y1="72" x2="90" y2="22"
                stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="4 2"
                animate={{ x2: [90, 75, 90], y2: [22, 40, 22] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.text x="72" y="18" fontSize="4" fill="#7c3aed" fontWeight="bold"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 5, repeat: Infinity }}>
                Frontera
              </motion.text>

              {/* Class A dots */}
              {classA.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="rgba(59,130,246,0.7)" stroke="#3b82f6" strokeWidth="1" />
              ))}

              {/* Class B squares */}
              {classB.map(([x, y], i) => (
                <rect key={i} x={x - 3.5} y={y - 3.5} width="7" height="7" fill="rgba(124,58,237,0.7)" stroke="#7c3aed" strokeWidth="1" />
              ))}

              {/* New drifted points — pulse in and out */}
              {newPoints.map(([x, y], i) => (
                <motion.circle
                  key={i} cx={x} cy={y} r="3.5"
                  fill="rgba(251,146,60,0.8)" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 1"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
              ))}

              <motion.text x="38" y="38" fontSize="5" fill="#dc2626" fontWeight="bold"
                animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
                ⚠ Error!
              </motion.text>
            </svg>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">La relación P(Y|X) cambia — mismos inputs, diferente output correcto.</p>
          <div className="text-xs leading-relaxed px-3 py-2 rounded-lg bg-purple-50 text-purple-800 border border-purple-100">
            Ejemplo: Modelo de crédito entrenado pre-crisis — el riesgo real de mismos perfiles cambió.
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-5 py-2 text-sm text-blue-700 font-medium">
          <AlertTriangle className="w-4 h-4" />
          DevOps no tiene este problema — el código no aprende ni se degrada con los datos
        </div>
      </motion.div>
    </div>
  )
}
