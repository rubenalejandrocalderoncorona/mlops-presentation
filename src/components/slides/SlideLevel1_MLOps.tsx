import { motion } from 'framer-motion'

const PIPELINE_STEPS = ['Validación', 'Prep', 'Training', 'Evaluación', 'Validación']

function Drum({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width="44" height="34" viewBox="0 0 44 34">
        <ellipse cx="22" cy="8" rx="18" ry="6" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
        <rect x="4" y="8" width="36" height="18" fill={`${color}18`} stroke={color} strokeWidth="1.5" />
        <ellipse cx="22" cy="26" rx="18" ry="6" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
        <motion.ellipse cx="22" cy="8" rx="18" ry="6" fill={`${color}50`}
          animate={{ ry: [6, 4, 6] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
      </svg>
      <span className="text-[10px] font-semibold text-center leading-tight" style={{ color }}>{label}</span>
    </div>
  )
}

function PipelineBox({ steps }: { steps: string[] }) {
  return (
    <div className="flex items-center gap-0.5 bg-white/60 rounded-xl border border-blue-200 px-2 py-1.5 shadow-sm">
      {steps.map((s, i) => (
        <div key={s + i} className="flex items-center gap-0.5">
          <div className="px-1.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[9px] font-semibold text-blue-700 whitespace-nowrap">
            {s}
          </div>
          {i < steps.length - 1 && <span className="text-slate-300 text-[10px]">›</span>}
        </div>
      ))}
    </div>
  )
}

function DataPacket({ delay, rowY }: { delay: number; rowY: number }) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full bg-green-400 shadow-md border-2 border-green-600 z-20"
      style={{ top: rowY }}
      initial={{ left: '8%', opacity: 0 }}
      animate={{ left: ['8%', '75%'], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'linear' }}
    />
  )
}

export function SlideLevel1_MLOps() {
  return (
    <div className="slide-container px-8 flex flex-col bg-[#eef2ff]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-0.5">
          MLOps <span className="text-blue-600">Nivel 1</span>: Automatización del Pipeline ML
        </h1>
        <p className="text-slate-500 text-sm">
          Pipeline automatizado · Entrenamiento continuo (CT) activado
        </p>
      </motion.div>

      <div className="flex flex-row gap-3 flex-1 min-h-0">
        {/* Main diagram */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 px-3 py-2 flex flex-col gap-2 relative"
          >
            {/* MANUAL badge */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300 text-[9px] font-bold whitespace-nowrap">
              MANUAL 🖐
            </div>
            <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">🖐 Desarrollo Manual (Experiment env)</div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-2 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-[10px] font-semibold text-amber-800 whitespace-nowrap">
                Data Analysis
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="flex flex-col items-start gap-1">
                <div className="text-[9px] font-semibold text-amber-600 ml-1">Orchestrated Experiment</div>
                <PipelineBox steps={PIPELINE_STEPS} />
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="px-2 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Source Code
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="px-2 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Source Repo
              </div>
            </div>
          </motion.div>

          {/* Manual vs Automatic separator row */}
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] text-amber-600 font-medium">← MANUAL: el científico ejecuta manualmente</span>
            <div className="w-px h-4 bg-slate-300 flex-shrink-0 mx-2" />
            <span className="text-[10px] text-green-600 font-medium">AUTOMÁTICO: trigger activa solo →</span>
          </div>

          {/* Arrow from Source Repo down */}
          <div className="flex justify-end pr-4">
            <div className="flex items-center gap-1 text-slate-500 text-[11px]">
              <span className="text-slate-400">Pipeline Deployment ↓</span>
            </div>
          </div>

          {/* Bottom row: Production env — AUTOMATIZADO */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-2xl border-2 border-green-300 bg-green-50 px-3 py-2 flex flex-col gap-2 relative overflow-hidden"
            style={{ boxShadow: '0 0 0 1px #86efac33, 0 4px 16px #16a34a18' }}
          >
            {/* AUTOMATIZADO badge */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300 text-[9px] font-bold whitespace-nowrap">
              AUTOMATIZADO ⚡
            </div>
            <div className="text-[10px] font-bold text-green-700 uppercase tracking-wide">⚡ Pipeline Automatizado (Production env)</div>
            <div className="flex items-center gap-2 flex-wrap">
              <Drum color="#16a34a" label="Feature Store" />
              <span className="text-slate-400 text-xs">→</span>

              {/* Trigger pulse */}
              <div className="flex flex-col items-center gap-0.5">
                <motion.div
                  className="w-10 h-10 rounded-full border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-[10px] font-bold text-amber-700"
                  animate={{ boxShadow: ['0 0 0px #f59e0b', '0 0 12px #f59e0b', '0 0 0px #f59e0b'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Trigger
                </motion.div>
                <span className="text-[8px] text-amber-600 font-medium">drift detected</span>
              </div>
              <span className="text-slate-400 text-xs">→</span>

              <div className="flex flex-col items-start gap-1">
                <div className="text-[9px] font-semibold text-green-600 ml-1">Automated Pipeline</div>
                <PipelineBox steps={PIPELINE_STEPS} />
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <Drum color="#64748b" label="Model Registry" />
              <span className="text-slate-400 text-xs">→</span>
              <div className="px-2 py-1.5 rounded-lg bg-green-100 border border-green-300 text-[10px] font-semibold text-green-800 whitespace-nowrap">
                CD: Model Serving
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="px-2 py-1.5 rounded-lg bg-blue-100 border border-blue-300 text-[10px] font-semibold text-blue-800 whitespace-nowrap">
                Prediction Service
              </div>
            </div>

            {/* Data packets animation */}
            <DataPacket delay={0} rowY={58} />
            <DataPacket delay={1.2} rowY={62} />
            <DataPacket delay={2.5} rowY={58} />
          </motion.div>

          {/* ML Metadata Store + Performance Monitoring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex gap-3 items-stretch"
          >
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex-1">
              <Drum color="#6b7280" label="ML Metadata Store" />
              <p className="text-[10px] text-slate-500 leading-tight">Tracking de experimentos, linaje de datos y métricas del pipeline.</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 flex-1">
              <div className="text-lg">📊</div>
              <div>
                <div className="text-[10px] font-bold text-blue-700 mb-1">Performance Monitoring</div>
                <div className="h-2 w-28 rounded-full bg-blue-100 overflow-hidden">
                  <motion.div className="h-full bg-blue-500 rounded-full"
                    animate={{ width: ['20%', '75%', '45%', '80%', '20%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Side note */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="w-[155px] flex-shrink-0 rounded-2xl border border-blue-200 bg-white/80 p-3 text-xs text-slate-600 leading-relaxed shadow-sm flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-1 text-blue-700 font-bold text-[11px]">
            <span>📖</span>
            <span>Google (2021)</span>
          </div>
          <p className="text-slate-500 italic text-[11px]">
            "Nivel 1 automatiza el pipeline de ML completo. El reentrenamiento se dispara
            automáticamente ante nueva data o deriva."
          </p>
          <hr className="border-blue-100" />
          <ul className="space-y-0.5 text-[11px]">
            <li className="text-green-600">✓ CT activado</li>
            <li className="text-green-600">✓ Componentes reutilizables</li>
            <li className="text-green-600">✓ Metadata tracking</li>
            <li className="text-red-500">✗ CI/CD del pipeline aún manual</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
