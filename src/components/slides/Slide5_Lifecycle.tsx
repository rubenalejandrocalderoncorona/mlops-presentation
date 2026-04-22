import { motion, AnimatePresence } from 'framer-motion'

interface Props { animStep?: number }

const RADIUS = 185
const STEP_R = 60

const steps = [
  { id: 1, label: 'Recolección\nde Datos', color: '#3b82f6', short: 'Datos' },
  { id: 2, label: 'Análisis\nExploratorio', color: '#8b5cf6', short: 'EDA' },
  { id: 3, label: 'Ingeniería de\nCaracterísticas', color: '#0891b2', short: 'Features' },
  { id: 4, label: 'Entrenamiento\ndel Modelo', color: '#059669', short: 'Entrena' },
  { id: 5, label: 'Evaluación\ny Validación', color: '#d97706', short: 'Evalúa' },
  { id: 6, label: 'Empaquetado\ndel Modelo', color: '#f97316', short: 'Empaqueta' },
  { id: 7, label: 'Despliegue\na Producción', color: '#dc2626', short: 'Despliega' },
  { id: 8, label: 'Monitoreo\ny Alertas', color: '#ec4899', short: 'Monitorea' },
  { id: 9, label: 'Detección\nde Desviación', color: '#a855f7', short: 'Deriva' },
  { id: 10, label: 'Reentrenamiento\nAutomático', color: '#14b8a6', short: 'CT' },
]

// Educational popup content for each step
export function Slide5_Lifecycle({ animStep = 0 }: Props) {
  const popups: React.ReactNode[] = [
    // 1 Recolección
    <div key="1" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-2">Datos crudos entrando al sistema</div>
      {['ride_id,dist,hora,tarifa', '001, 5.2, 17:30, $12', '002, 2.1, 08:00, $6', '003, 8.7, 19:45, $22'].map((row, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
          className={`font-mono text-xs px-2 py-1 rounded ${i === 0 ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-slate-50 text-slate-700'}`}>
          {row}
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-xs text-blue-600 font-medium mt-1">
        ✓ 10,482 registros recolectados
      </motion.div>
    </div>,

    // 2 Análisis Exploratorio
    <div key="2" className="space-y-2">
      <div className="text-xs text-slate-500 font-semibold">Distribución de tarifas</div>
      <svg viewBox="0 0 100 50" className="w-full h-16">
        {[4, 8, 14, 20, 18, 14, 10, 6, 3, 2].map((h, i) => (
          <motion.rect key={i} x={i * 10 + 2} y={50 - h * 2} width="8" height={h * 2} fill="#8b5cf6" rx="1"
            initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.07, duration: 0.4 }} />
        ))}
        <line x1="1" y1="49" x2="99" y2="49" stroke="#e2e8f0" strokeWidth="0.5" />
      </svg>
      <div className="grid grid-cols-2 gap-1 text-xs">
        {[['Media', '$14.2'], ['Mediana', '$11.8'], ['Outliers', '3.2%'], ['Nulos', '0.8%']].map(([k, v]) => (
          <div key={String(k)} className="flex justify-between px-1.5 py-0.5 bg-purple-50 rounded text-slate-700">
            <span>{k}</span><span className="font-bold" style={{ color: '#8b5cf6' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>,

    // 3 Ingeniería de Características
    <div key="3" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-1">Transformaciones</div>
      {[
        { from: 'hora: "17:30"', to: 'es_hora_pico: 1', delay: 0.1 },
        { from: 'dist: 5.2', to: 'dist_norm: 0.85', delay: 0.3 },
        { from: 'tarifa: "$12"', to: 'tarifa_log: 2.48', delay: 0.5 },
        { from: 'dia: "lunes"', to: 'es_laboral: 1', delay: 0.7 },
      ].map((t, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: t.delay }}
          className="flex items-center gap-1 text-xs">
          <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-mono truncate">{t.from}</span>
          <span className="text-slate-400">→</span>
          <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-mono truncate">{t.to}</span>
        </motion.div>
      ))}
    </div>,

    // 4 Entrenamiento
    <div key="4" className="space-y-1">
      <div className="flex justify-between text-xs text-slate-500 mb-1">
        <span>Curva de pérdida</span>
        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} style={{ color: '#059669' }}>
          Entrenando...
        </motion.span>
      </div>
      <svg viewBox="0 0 100 50" className="w-full h-14">
        <motion.path
          d="M5,45 C15,40 20,30 30,22 C40,14 50,10 65,7 C75,5 85,4 95,3"
          fill="none" stroke="#059669" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <line x1="5" y1="47" x2="95" y2="47" stroke="#e2e8f0" strokeWidth="0.5" />
        <text x="5" y="50" fontSize="5" fill="#94a3b8">epoch 1</text>
        <text x="80" y="50" fontSize="5" fill="#94a3b8">epoch 50</text>
        <text x="60" y="8" fontSize="4.5" fill="#059669">loss: 0.043</text>
      </svg>
      <div className="flex gap-1 text-xs">
        {[['LR', '0.001'], ['Batch', '64'], ['Epochs', '50']].map(([k, v]) => (
          <div key={String(k)} className="flex-1 text-center py-0.5 rounded bg-green-50 text-green-700">
            <div className="font-mono text-xs">{v}</div>
            <div className="text-slate-400" style={{ fontSize: '9px' }}>{k}</div>
          </div>
        ))}
      </div>
    </div>,

    // 5 Evaluación
    <div key="5" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-1">Matriz de Confusión</div>
      <div className="grid grid-cols-2 gap-1">
        {[
          { label: 'VP', value: 942, bg: '#d1fae5', text: '#065f46' },
          { label: 'FP', value: 58, bg: '#fee2e2', text: '#991b1b' },
          { label: 'FN', value: 41, bg: '#fef3c7', text: '#92400e' },
          { label: 'VN', value: 889, bg: '#d1fae5', text: '#065f46' },
        ].map((cell, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="p-2 rounded text-center"
            style={{ background: cell.bg }}
          >
            <div className="text-xs font-bold" style={{ color: cell.text }}>{cell.label}</div>
            <motion.div className="text-base font-black" style={{ color: cell.text }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }}>
              {cell.value}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="text-xs text-center text-amber-700 font-bold bg-amber-50 rounded py-0.5">
        F1: 0.927 — AUC: 0.96
      </motion.div>
    </div>,

    // 6 Empaquetado
    <div key="6" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-1">Artefactos del Modelo</div>
      {['model_v2.pkl  (18 MB)', 'config.yaml  (2 KB)', 'features.json (1 KB)', 'requirements.txt'].map((f, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.18 }}
          className="flex items-center gap-2 text-xs py-1 px-2 bg-orange-50 rounded border border-orange-100">
          <span className="text-orange-400">📦</span>
          <span className="text-slate-700 font-mono">{f}</span>
        </motion.div>
      ))}
      <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
        className="h-1.5 rounded-full bg-orange-400 mt-1" />
    </div>,

    // 7 Despliegue
    <div key="7" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-1">Despliegue con Kubernetes</div>
      {[
        { step: 'Push imagen Docker', done: true },
        { step: 'Actualizar manifest K8s', done: true },
        { step: 'Rolling update → 3 pods', done: true },
        { step: 'Health check OK ✓', done: true },
      ].map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.25 }}
          className="flex items-center gap-2 text-xs">
          <motion.div className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: s.done ? '#d1fae5' : '#f1f5f9' }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.25, type: 'spring' }}>
            <span style={{ color: '#059669', fontSize: 9 }}>✓</span>
          </motion.div>
          <span className="text-slate-600">{s.step}</span>
        </motion.div>
      ))}
    </div>,

    // 8 Monitoreo
    <div key="8" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-1">Métricas en tiempo real</div>
      <svg viewBox="0 0 100 40" className="w-full h-12">
        <motion.path
          d="M5,25 C10,24 15,22 20,23 C25,24 30,21 35,20 C40,19 45,18 50,19 C55,20 60,17 65,18 C70,19 75,16 80,17 C85,18 90,28 95,35"
          fill="none" stroke="#ec4899" strokeWidth="1.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.circle cx="95" cy="35" r="2.5" fill="#ec4899"
          animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <line x1="5" y1="38" x2="95" y2="38" stroke="#e2e8f0" strokeWidth="0.4" />
      </svg>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="text-xs bg-pink-50 text-pink-700 rounded px-2 py-1 text-center font-medium">
        ⚠ Latencia P99 aumentando: 120ms → 380ms
      </motion.div>
    </div>,

    // 9 Detección de Desviación
    <div key="9" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-1">Test KS — Deriva detectada</div>
      <svg viewBox="0 0 100 50" className="w-full h-14">
        <motion.path d="M5,45 C15,40 25,25 40,15 C50,8 65,5 95,4"
          fill="none" stroke="#8b5cf6" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }} />
        <motion.path d="M5,45 C20,42 30,38 50,30 C65,23 80,18 95,20"
          fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }} />
        <motion.line x1="52" y1="0" x2="52" y2="50" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
        <motion.text x="54" y="15" fontSize="5" fill="#d97706" fontWeight="bold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
          KS=0.42
        </motion.text>
      </svg>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="text-xs font-bold text-center text-red-600 bg-red-50 rounded py-0.5">
        🔴 p-value &lt; 0.05 → Deriva confirmada
      </motion.div>
    </div>,

    // 10 Reentrenamiento
    <div key="10" className="space-y-1">
      <div className="text-xs text-slate-500 font-semibold mb-1">Entrenamiento Continuo (CT)</div>
      <div className="flex items-center justify-center gap-3 my-1">
        <div className="text-center">
          <div className="text-xs text-slate-400">Modelo anterior</div>
          <div className="text-sm font-black text-slate-600">v1.0</div>
          <div className="text-xs text-red-500">F1: 0.71</div>
        </div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-2xl text-teal-500">↻</motion.div>
        <div className="text-center">
          <div className="text-xs text-slate-400">Modelo nuevo</div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
            className="text-sm font-black text-teal-600">v2.0</motion.div>
          <div className="text-xs text-green-600">F1: 0.94</div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="text-xs text-center bg-teal-50 text-teal-700 rounded py-1 font-medium">
        ✓ Nuevo modelo desplegado automáticamente
      </motion.div>
    </div>,
  ]

  return (
    <div className="slide-container px-4">
      <AnimatePresence mode="wait">
        {animStep === 0 ? (
          <motion.div key="wheel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              className="text-center mb-2">
              <h1 className="text-3xl font-black text-slate-800 mb-1">Ciclo de Vida del ML</h1>
              <p className="text-slate-500">10 etapas — Presiona <kbd className="bg-slate-100 border border-slate-300 rounded px-1 py-0.5 text-xs">espacio</kbd> para explorar cada paso</p>
            </motion.div>

            <div className="relative" style={{ width: RADIUS * 2 + STEP_R * 2, height: RADIUS * 2 + STEP_R * 2 - 40 }}>
              {/* Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-200 flex items-center justify-center text-center shadow-md glow-blue">
                  <span className="text-blue-600 font-bold text-xs leading-tight">Ciclo de<br />Vida ML</span>
                </div>
              </motion.div>

              {/* Rotating dashed ring */}
              <motion.div className="absolute inset-0"
                animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}>
                <svg className="absolute inset-0 w-full h-full"
                  viewBox={`0 0 ${RADIUS * 2 + STEP_R * 2} ${RADIUS * 2 + STEP_R * 2}`}>
                  <circle cx={RADIUS + STEP_R} cy={RADIUS + STEP_R} r={RADIUS}
                    fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="2" strokeDasharray="8 6" />
                </svg>
              </motion.div>

              {steps.map((step, i) => {
                const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2
                const cx = RADIUS + STEP_R + Math.cos(angle) * RADIUS
                const cy = RADIUS + STEP_R + Math.sin(angle) * RADIUS
                return (
                  <motion.div key={step.id}
                    className="absolute flex items-center justify-center"
                    style={{ left: cx - STEP_R, top: cy - STEP_R, width: STEP_R * 2, height: STEP_R * 2 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 200 }}
                  >
                    <div
                      className="w-full h-full rounded-xl border-2 flex flex-col items-center justify-center text-center p-1.5 cursor-default hover:scale-110 transition-transform bg-white"
                      style={{ borderColor: step.color, boxShadow: `0 2px 10px ${step.color}30` }}
                    >
                      <span className="text-xs font-black mb-0.5" style={{ color: step.color }}>{step.id}</span>
                      <span className="text-slate-700 leading-tight font-medium" style={{ fontSize: '9px', whiteSpace: 'pre-line' }}>
                        {step.label}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key={`step-${animStep}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-4xl mx-auto">
            {(() => {
              const idx = Math.min(animStep - 1, steps.length - 1)
              const step = steps[idx]
              return (
                <>
                  <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4">
                    <div className="text-xs font-bold mb-1" style={{ color: step.color }}>
                      PASO {step.id} / 10
                    </div>
                    <h2 className="text-3xl font-black text-slate-800">
                      {step.label.replace('\n', ' ')}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      {animStep < steps.length ? 'Espacio → siguiente paso' : 'Flecha → siguiente diapositiva'}
                    </p>
                  </motion.div>

                  <div className="flex gap-6 items-start justify-center w-full">
                    {/* Progress sidebar */}
                    <div className="flex flex-col gap-1.5 w-28 flex-shrink-0">
                      {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-1.5">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                            style={{
                              background: i < idx ? step.color : i === idx ? step.color : '#e2e8f0',
                              color: i <= idx ? 'white' : '#94a3b8',
                              transform: i === idx ? 'scale(1.2)' : 'scale(1)',
                            }}
                          >
                            {i < idx ? '✓' : s.id}
                          </div>
                          <span
                            className="text-xs leading-tight"
                            style={{ color: i === idx ? step.color : i < idx ? '#64748b' : '#cbd5e1', fontSize: '9px' }}
                          >
                            {s.short}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Main visualization */}
                    <motion.div
                      key={`popup-${idx}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 max-w-sm bg-white rounded-2xl border-2 p-5 shadow-lg"
                      style={{ borderColor: step.color, boxShadow: `0 0 30px ${step.color}30` }}
                    >
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: `${step.color}30` }}>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
                          style={{ background: step.color }}
                        >
                          {step.id}
                        </div>
                        <span className="font-bold text-slate-800 text-sm">{step.label.replace('\n', ' ')}</span>
                      </div>
                      {popups[idx]}
                    </motion.div>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
