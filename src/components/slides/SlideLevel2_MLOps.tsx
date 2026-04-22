import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const PIPELINE_STEPS = ['Validación', 'Prep', 'Training', 'Evaluación', 'Validación']

const CICD_STEPS: { id: number; label: string; desc: string }[] = [
  { id: 1, label: 'Orchestrated Experiment', desc: 'Desarrollo' },
  { id: 2, label: 'CI: Build, test, package', desc: 'Componentes del pipeline' },
  { id: 3, label: 'CD: Pipeline deployment', desc: 'Despliegue al entorno' },
  { id: 4, label: 'CD: Model validation', desc: 'Validar nuevo modelo' },
  { id: 5, label: 'CD: Model serving', desc: 'Servir predicciones' },
  { id: 6, label: 'Performance monitoring', desc: 'Detectar deriva' },
]

function Drum({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width="40" height="30" viewBox="0 0 44 34">
        <ellipse cx="22" cy="8" rx="18" ry="6" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
        <rect x="4" y="8" width="36" height="18" fill={`${color}18`} stroke={color} strokeWidth="1.5" />
        <ellipse cx="22" cy="26" rx="18" ry="6" fill={`${color}30`} stroke={color} strokeWidth="1.5" />
      </svg>
      <span className="text-[10px] font-semibold text-center leading-tight" style={{ color }}>{label}</span>
    </div>
  )
}

function StepBadge({ step, active }: { step: number; active: boolean }) {
  return (
    <motion.div
      animate={active ? {
        boxShadow: ['0 0 0px #3b82f6', '0 0 16px #3b82f6', '0 0 4px #3b82f6'],
        scale: [1, 1.15, 1.1],
      } : { boxShadow: '0 0 0px #3b82f6', scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 select-none flex-shrink-0"
      style={{
        background: active ? '#3b82f6' : '#e0e7ff',
        borderColor: active ? '#1d4ed8' : '#a5b4fc',
        color: active ? 'white' : '#6366f1',
      }}
    >
      {step}
    </motion.div>
  )
}

function PipelineBox({ steps, activeBadge }: { steps: string[]; activeBadge: number }) {
  return (
    <div className="flex items-center gap-0.5 bg-white/60 rounded-xl border border-blue-200 px-2 py-1.5 shadow-sm relative">
      {steps.map((s, i) => (
        <div key={s + i} className="flex items-center gap-0.5">
          <div className="px-1.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[9px] font-semibold text-blue-700 whitespace-nowrap">
            {s}
          </div>
          {i < steps.length - 1 && <span className="text-slate-300 text-[10px]">›</span>}
        </div>
      ))}
      {(activeBadge === 3 || activeBadge === 4) && (
        <motion.div className="absolute -top-3 -right-2"
          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
          <StepBadge step={activeBadge} active />
        </motion.div>
      )}
    </div>
  )
}

function DataPacket({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full bg-green-400 shadow-md border-2 border-green-600 z-20"
      style={{ top: '50%' }}
      initial={{ left: '4%', opacity: 0 }}
      animate={{ left: ['4%', '78%'], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'linear' }}
    />
  )
}

export function SlideLevel2_MLOps() {
  const [activeStep, setActiveStep] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(s => (s % 6) + 1)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="slide-container px-8 flex flex-col bg-[#eef2ff]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-0.5">
          MLOps <span className="text-indigo-600">Nivel 2</span>: Automatización CI/CD
        </h1>
        <p className="text-slate-500 text-sm">
          Pipeline del pipeline — CI/CD completo para el sistema ML
        </p>
      </motion.div>

      <div className="flex flex-row gap-3 flex-1 min-h-0">
        {/* Main diagram */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5">

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex gap-2 flex-wrap">
            {CICD_STEPS.map(step => (
              <div key={step.id}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all duration-300"
                style={{
                  background: activeStep === step.id ? '#eff6ff' : '#f8fafc',
                  borderColor: activeStep === step.id ? '#3b82f6' : '#e2e8f0',
                }}
              >
                <StepBadge step={step.id} active={activeStep === step.id} />
                <div>
                  <div className="text-[9px] font-bold text-slate-700 leading-tight">{step.label}</div>
                  <div className="text-[8px] text-slate-400 leading-tight">{step.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-2xl bg-blue-50 border-2 border-blue-200 px-3 py-2 flex flex-col gap-1.5">
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Experiment env</div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <StepBadge step={1} active={activeStep === 1} />
                <div className="px-2 py-1.5 rounded-lg bg-blue-100 border border-blue-300 text-[10px] font-semibold text-blue-800 whitespace-nowrap">Orchestrated Experiment</div>
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="flex items-center gap-1.5">
                <StepBadge step={2} active={activeStep === 2} />
                <div className="px-2 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-[10px] font-semibold text-slate-700 whitespace-nowrap">CI: Build + Test + Package</div>
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="flex items-center gap-1.5">
                <StepBadge step={3} active={activeStep === 3} />
                <div className="px-2 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-[10px] font-semibold text-slate-700 whitespace-nowrap">CD: Pipeline Deployment</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}
            className="rounded-2xl bg-green-50 border-2 border-green-200 px-3 py-2 flex flex-col gap-1.5 relative overflow-hidden">
            <div className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Production env</div>
            <div className="flex items-center gap-2 flex-wrap">
              <Drum color="#16a34a" label="Feature Store" />
              <span className="text-slate-400 text-xs">→</span>
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-[10px] font-bold text-amber-700"
                animate={{ boxShadow: ['0 0 0px #f59e0b', '0 0 10px #f59e0b', '0 0 0px #f59e0b'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Trigger
              </motion.div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="relative">
                <PipelineBox steps={PIPELINE_STEPS} activeBadge={activeStep} />
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <Drum color="#64748b" label="Model Registry" />
              <span className="text-slate-400 text-xs">→</span>
              <div className="flex items-center gap-1.5">
                <StepBadge step={5} active={activeStep === 5} />
                <div className="px-2 py-1 rounded-lg bg-green-100 border border-green-300 text-[10px] font-semibold text-green-800 whitespace-nowrap">CD: Model Serving</div>
              </div>
              <span className="text-slate-400 text-xs">→</span>
              <div className="px-2 py-1 rounded-lg bg-blue-100 border border-blue-300 text-[10px] font-semibold text-blue-800 whitespace-nowrap">Prediction Service</div>
            </div>
            <DataPacket delay={0} />
            <DataPacket delay={1.8} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
            <StepBadge step={6} active={activeStep === 6} />
            <div className="text-[11px] font-bold text-blue-700">Performance Monitoring</div>
            <div className="h-2.5 flex-1 rounded-full bg-blue-100 overflow-hidden">
              <motion.div className="h-full bg-blue-500 rounded-full"
                animate={{ width: ['20%', '70%', '40%', '85%', '20%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
            </div>
            <AnimatePresence>
              {activeStep === 6 && (
                <motion.span
                  key="drift"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 whitespace-nowrap"
                >
                  drift → re-trigger ①
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Comparison legend */}
          <div className="flex gap-2 text-[10px]">
            <span className="px-2 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">Nivel 1: CT automático</span>
            <span className="px-2 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold">Nivel 2: CI/CD del pipeline también automático</span>
          </div>
        </div>

        {/* Side note */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="w-[155px] flex-shrink-0 rounded-2xl border border-indigo-200 bg-white/80 p-3 text-xs text-slate-600 leading-relaxed shadow-sm flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-1 text-indigo-700 font-bold text-[11px]">
            <span>📖</span>
            <span>Google (2021)</span>
          </div>
          <p className="text-slate-500 italic text-[11px]">
            "Nivel 2 añade CI/CD al propio pipeline de ML. Cada cambio al código del pipeline activa
            build + test + deploy automático."
          </p>
          <hr className="border-indigo-100" />
          <ul className="space-y-0.5 text-[11px]">
            <li className="text-green-600">✓ CT + CI + CD completo</li>
            <li className="text-green-600">✓ Zero-touch retraining</li>
            <li className="text-green-600">✓ A/B testing automatizado</li>
            <li className="text-green-600">✓ Rollback instantáneo</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
