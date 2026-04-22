import { motion } from 'framer-motion'

const STEPS = [
  { label: 'Datos\nCrudos', badge: 'manual', color: '#ef4444' },
  { label: 'EDA\nManual', badge: 'sin CI', color: '#f97316' },
  { label: 'Notebook', badge: 'sin CT', color: '#eab308' },
  { label: 'Modelo', badge: 'sin CD', color: '#a855f7' },
  { label: 'Despliegue\nManual', badge: 'sin monitoreo', color: '#ef4444' },
]

function Arrow() {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18" className="flex-shrink-0">
      <line x1="2" y1="9" x2="22" y2="9" stroke="#94a3b8" strokeWidth="2" />
      <polygon points="22,4 28,9 22,14" fill="#94a3b8" />
    </svg>
  )
}

export function SlideLevel0_MLOps() {
  return (
    <div className="slide-container px-8 bg-[#eef2ff]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5 w-full max-w-5xl"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-1">
          MLOps <span className="text-red-500">Nivel 0</span>: Proceso Manual
        </h1>
        <p className="text-slate-500 text-base">
          Entrenamiento y despliegue artesanal — sin automatización
        </p>
      </motion.div>

      <div className="flex flex-row gap-3 w-full max-w-5xl">
        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {/* Workflow boxes */}
          <div className="flex items-center justify-center gap-1">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center"
                >
                  {/* Warning badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.15, type: 'spring', stiffness: 260 }}
                    className="absolute -top-2.5 -right-2.5 z-10 px-1.5 py-0.5 rounded-full text-white text-[9px] font-bold whitespace-nowrap"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.badge}
                  </motion.div>

                  {/* Box */}
                  <div className="w-[85px] h-[64px] rounded-xl border-2 bg-white shadow-md flex items-center justify-center text-center"
                    style={{ borderColor: step.color }}>
                    <span className="text-slate-700 font-semibold text-sm leading-tight whitespace-pre-line">
                      {step.label}
                    </span>
                  </div>
                </motion.div>
                {i < STEPS.length - 1 && <Arrow />}
              </div>
            ))}
          </div>

          {/* Animated scientist dot */}
          <div className="relative h-10 flex items-center">
            <div className="absolute inset-x-0 h-px bg-slate-200 top-1/2" />
            <motion.div
              className="absolute flex items-center justify-center w-8 h-8 rounded-full border-4 border-blue-500 bg-white shadow-lg text-base z-10"
              animate={{ x: [0, 380, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
              title="Científico de datos haciendo todo a mano"
            >
              🧑‍🔬
            </motion.div>
            <span className="absolute right-0 text-xs text-slate-400 italic">← científico de datos (todo a mano)</span>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span className="font-medium">Tiempo hasta producción</span>
              <span className="text-red-500 font-semibold">semanas / meses</span>
            </div>
            <div className="h-4 rounded-full bg-slate-200 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, #ef4444, #f97316)' }}
                animate={{ width: ['0%', '80%', '80%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.8, 1], ease: 'easeInOut' }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white mix-blend-overlay">
                nunca completa del todo
              </div>
            </div>
          </div>

          {/* Warning banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-2.5 flex items-center gap-2"
          >
            <span className="text-lg">⚠</span>
            <p className="text-red-700 text-sm font-semibold">
              Sin automatización: Reentrenamiento = semanas · Errores detectados tarde · No reproducible
            </p>
          </motion.div>
        </div>

        {/* Side note */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-[155px] flex-shrink-0 rounded-2xl border border-blue-200 bg-white/80 p-3 text-xs text-slate-600 leading-relaxed shadow-sm flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-1 text-blue-700 font-bold text-[11px]">
            <span>📖</span>
            <span>Google MLOps Guide (2021)</span>
          </div>
          <p className="text-slate-500 italic">
            "Nivel 0 representa el proceso más básico: sin CI/CD, sin monitoreo, sin versionado
            automático. El científico de datos hace todo a mano."
          </p>
          <hr className="border-blue-100" />
          <ul className="space-y-0.5 text-red-600 text-[11px]">
            <li>✗ Sin pipeline automatizado</li>
            <li>✗ Sin CI/CD</li>
            <li>✗ Sin CT (reentrenamiento)</li>
            <li>✗ Sin monitoreo</li>
            <li>✗ No reproducible</li>
          </ul>
        </motion.div>
      </div>

      {/* CI / CD / CT strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="mt-3 grid grid-cols-3 gap-2 w-full max-w-5xl"
      >
        {/* Column 1 — CI */}
        <div className="bg-white border border-blue-200 rounded-xl p-2 flex flex-col gap-1">
          <div className="self-start px-2 py-0.5 rounded-full bg-blue-500 text-white font-bold" style={{ fontSize: '10px' }}>
            CI — Integración Continua
          </div>
          <div className="flex flex-col gap-0.5 mt-0.5">
            {[
              { label: 'lint', delay: 0 },
              { label: 'test', delay: 0.8 },
              { label: 'build', delay: 1.6 },
            ].map(({ label, delay: d }) => (
              <motion.div
                key={label}
                className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-2 py-0.5 text-xs"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, delay: d, repeat: Infinity }}
              >
                <span className="text-blue-500 font-bold">✓</span>
                <span className="text-blue-700">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Column 2 — CD */}
        <div className="bg-white border border-amber-200 rounded-xl p-2 flex flex-col gap-1">
          <div className="self-start px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold" style={{ fontSize: '10px' }}>
            CD — Despliegue Continuo
          </div>
          <div className="grid grid-cols-2 gap-1 mt-1">
            <div className="border border-amber-400 rounded-lg px-1.5 py-1 flex flex-col items-center gap-0.5">
              <span style={{ fontSize: '13px' }}>🔒</span>
              <span className="text-amber-700 font-bold" style={{ fontSize: '9px' }}>Delivery</span>
              <span className="text-slate-500 text-center leading-tight" style={{ fontSize: '9px' }}>Aprobación manual antes de producción</span>
            </div>
            <div className="border border-green-500 rounded-lg px-1.5 py-1 flex flex-col items-center gap-0.5">
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '13px' }}
              >
                🚀
              </motion.span>
              <span className="text-green-700 font-bold" style={{ fontSize: '9px' }}>Deployment</span>
              <span className="text-slate-500 text-center leading-tight" style={{ fontSize: '9px' }}>Automático sin intervención humana</span>
            </div>
          </div>
          <div className="text-center text-slate-400" style={{ fontSize: '8px' }}>← manual gate | auto →</div>
        </div>

        {/* Column 3 — CT */}
        <div className="bg-white border border-green-200 rounded-xl p-2 flex flex-col gap-1">
          <div className="self-start px-2 py-0.5 rounded-full bg-green-600 text-white font-bold" style={{ fontSize: '10px' }}>
            CT — Entrenamiento Continuo
          </div>
          <div className="flex justify-center mt-1">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <path d="M12 2 A10 10 0 1 1 4 17" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="4,17 1,13 7,13" fill="#059669" />
              </svg>
            </motion.div>
          </div>
          <div className="flex justify-center">
            <motion.span
              className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-400 text-amber-700 font-bold"
              style={{ fontSize: '9px' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              Trigger: deriva detectada
            </motion.span>
          </div>
          <p className="text-slate-500 text-center leading-tight" style={{ fontSize: '9px' }}>
            Reentrena automáticamente el modelo cuando el contexto cambia
          </p>
        </div>
      </motion.div>
    </div>
  )
}
