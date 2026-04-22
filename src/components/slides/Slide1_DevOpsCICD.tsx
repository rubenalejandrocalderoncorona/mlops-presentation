import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, Package, CheckCircle, Cpu, Activity, Archive } from 'lucide-react'
import { useEffect, useState } from 'react'

// ─── Shared step data ──────────────────────────────────────────────────────────
const STEPS = [
  { label: '① Código',     color: '#3b82f6' },
  { label: '② Docker',     color: '#7c3aed' },
  { label: '③ CI Tests',   color: '#0891b2' },
  { label: '④ GPU Train',  color: '#d97706' },
  { label: '⑤ Predicción', color: '#059669' },
  { label: '⑥ Registro',   color: '#dc2626' },
]

// ─── Shared window chrome ──────────────────────────────────────────────────────
function WindowChrome({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
      <div className="w-3 h-3 rounded-full bg-red-400" />
      <div className="w-3 h-3 rounded-full bg-yellow-400" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
      <span className="text-slate-400 text-xs font-mono ml-2 flex items-center gap-1.5">
        {icon}{title}
      </span>
    </div>
  )
}

// ─── ACT 0 — Código ───────────────────────────────────────────────────────────
const CODE_LINES: { text: string; color: string }[] = [
  { text: 'import torch',                            color: '#93c5fd' },
  { text: 'import torch.nn as nn',                   color: '#93c5fd' },
  { text: '',                                        color: '#94a3b8' },
  { text: 'class TaxiModel(nn.Module):',             color: '#c4b5fd' },
  { text: '  def forward(self, x):',                 color: '#6ee7b7' },
  { text: '    return self.linear(x)',               color: '#fde68a' },
  { text: '',                                        color: '#94a3b8' },
  { text: '# git commit -m "feat: taxi model v2"',  color: '#4ade80' },
]

function ActCodigo() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    setVisibleLines(0)
    let i = 0
    const id = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= CODE_LINES.length) clearInterval(id)
    }, 260)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      key="codigo"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="flex gap-5 items-start justify-center w-full"
    >
      {/* Terminal panel */}
      <div className="rounded-xl overflow-hidden shadow-xl flex-shrink-0" style={{ width: 420, boxShadow: '0 0 32px rgba(59,130,246,0.18)' }}>
        <WindowChrome title="predict.py — editor" />
        <div className="bg-slate-900 px-5 py-4 min-h-52 font-mono text-sm leading-7">
          {CODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={visibleLines > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              style={{ color: line.color, minHeight: '1.75rem' }}
            >
              {line.text || ' '}
            </motion.div>
          ))}
          {visibleLines >= CODE_LINES.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.75, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-blue-400 align-middle"
            />
          )}
        </div>
      </div>

      {/* Git tree side card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 220 }}
        className="card-light p-5 flex flex-col gap-3 flex-shrink-0"
        style={{ width: 200 }}
      >
        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
          <GitBranch className="w-4 h-4 text-blue-500" />
          Git Tree
        </div>

        {/* main branch */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-400 flex-shrink-0" />
          <span className="text-xs text-slate-500 font-mono">main</span>
        </div>
        {/* branch line */}
        <div className="ml-1.5 h-4 border-l-2 border-dashed border-slate-300" />

        {/* feature branch */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 border-l-2 border-b-2 border-dashed border-blue-300 rounded-bl flex-shrink-0 self-start mt-0 ml-1" />
          <div>
            <div className="text-xs font-mono text-blue-600">feature/v2</div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.0, type: 'spring', stiffness: 320 }}
              className="mt-1 bg-blue-100 border border-blue-300 rounded px-2 py-0.5 text-blue-700 text-xs font-mono"
            >
              ● feat: taxi v2
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="text-xs text-slate-400 text-center mt-1"
        >
          Push → CI activado
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── ACT 1 — Dockerfile ───────────────────────────────────────────────────────
const DOCKER_LINES: { text: string; layerColor: string }[] = [
  { text: 'FROM python:3.11-slim',             layerColor: '#dbeafe' },
  { text: 'COPY requirements.txt .',           layerColor: '#e0e7ff' },
  { text: 'RUN pip install torch torchvision', layerColor: '#ede9fe' },
  { text: 'COPY . /app',                       layerColor: '#d1fae5' },
  { text: 'CMD ["uvicorn", "main:app"]',       layerColor: '#fef3c7' },
]

function ActDockerfile() {
  const [visibleLayers, setVisibleLayers] = useState(0)
  const [buildDone, setBuildDone] = useState(false)

  useEffect(() => {
    setVisibleLayers(0)
    setBuildDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setVisibleLayers(i)
      if (i >= DOCKER_LINES.length) {
        clearInterval(id)
        setTimeout(() => setBuildDone(true), 500)
      }
    }, 350)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      key="dockerfile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="flex gap-5 items-start justify-center w-full"
    >
      {/* Dockerfile panel */}
      <div className="rounded-xl overflow-hidden shadow-xl flex-shrink-0" style={{ width: 400, boxShadow: '0 0 32px rgba(124,58,237,0.18)' }}>
        <WindowChrome title="Dockerfile" icon={<Package className="w-3.5 h-3.5 text-purple-400" />} />
        <div className="bg-slate-900 px-5 py-4 font-mono text-sm leading-7 min-h-44">
          {DOCKER_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={visibleLayers > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="text-slate-300"
            >
              {line.text}
            </motion.div>
          ))}
        </div>
        {/* build command */}
        <div className="bg-slate-800 border-t border-slate-700 px-5 py-2">
          <span className="text-slate-500 font-mono text-xs">$ </span>
          <span className="text-green-400 font-mono text-xs">docker build -t taxi-model:v2</span>
          {buildDone && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 font-mono text-xs ml-2"
            >
              ✓ done
            </motion.span>
          )}
        </div>
      </div>

      {/* Docker layers stack */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: 190 }}>
        <span className="text-slate-500 text-xs font-semibold mb-2">Docker Layers</span>
        <div className="flex flex-col gap-1 w-full">
          {DOCKER_LINES.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={visibleLayers > i ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ background: layer.layerColor, originX: 0 }}
              className="rounded px-2 py-1.5 text-xs font-mono text-slate-600 text-center border border-white/60 shadow-sm"
            >
              Layer {i + 1}
            </motion.div>
          ))}
        </div>
        {buildDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260 }}
            className="mt-3 flex flex-col items-center gap-1"
          >
            <div
              className="w-16 h-16 rounded-xl border-2 border-purple-400 bg-purple-50 flex flex-col items-center justify-center"
              style={{ boxShadow: '0 0 18px rgba(124,58,237,0.3)' }}
            >
              <Package className="w-7 h-7 text-purple-500" />
              <span className="text-purple-700 font-black text-xs mt-0.5">:v2</span>
            </div>
            <span className="text-xs text-slate-500">Imagen lista ✓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// ─── ACT 2 — CI Tests ─────────────────────────────────────────────────────────
const CI_CHECKS = [
  { label: 'Lint & formato',             detail: 'flake8, black' },
  { label: 'Unit tests 47/47',           detail: 'pytest ✓' },
  { label: 'Integration tests',          detail: 'API + DB ✓' },
  { label: 'Coverage 92%',              detail: '>= 85% threshold ✓' },
]

function ActCITests() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    setProgress(0)
    setVisible(0)
    // progress bar
    const pId = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(pId); return 100 }
        return p + 2
      })
    }, 30)
    // checks reveal
    let i = 0
    const cId = setInterval(() => {
      i++
      setVisible(i)
      if (i >= CI_CHECKS.length) clearInterval(cId)
    }, 400)
    return () => { clearInterval(pId); clearInterval(cId) }
  }, [])

  return (
    <motion.div
      key="citests"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="rounded-xl overflow-hidden shadow-xl" style={{ boxShadow: '0 0 32px rgba(8,145,178,0.2)' }}>
        {/* Window header */}
        <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-slate-400 text-xs font-mono ml-2">GitHub Actions ▶ pipeline running</span>
          </div>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: progress < 100 ? Infinity : 0 }}
            className="w-2 h-2 rounded-full bg-yellow-400"
          />
        </div>

        <div className="bg-slate-900 px-6 py-4">
          {/* Progress bar */}
          <div className="mb-5">
            <div className="flex justify-between text-xs text-slate-500 font-mono mb-1.5">
              <span>Pipeline progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0891b2, #6ee7b7)', width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>

          {/* Checks */}
          <div className="space-y-3">
            {CI_CHECKS.map((check, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={visible > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={visible > i ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 380, damping: 18 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </motion.div>
                <div className="flex-1">
                  <span className="text-slate-200 text-sm font-medium">{check.label}</span>
                  <span className="text-slate-500 text-xs ml-2">{check.detail}</span>
                </div>
                <div className="w-24 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-400 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={visible > i ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-green-400 font-mono text-sm"
            >
              ✓ All checks passed — image pushed to registry
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── ACT 3 — GPU Training ─────────────────────────────────────────────────────
function buildLossCurve(epochs: number): string {
  // Descending loss: L(e) = 0.9 * exp(-0.08 * e) + 0.05
  const total = 50
  const pts = Array.from({ length: epochs }, (_, i) => {
    const e = i + 1
    const loss = 0.9 * Math.exp(-0.08 * e) + 0.05
    const x = (i / (total - 1)) * 220
    const y = 90 - loss * 90
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return pts.length < 2 ? '' : `M ${pts.join(' L ')}`
}

function ActGPUTrain() {
  const [epoch, setEpoch] = useState(0)
  const [gpuUtil, setGpuUtil] = useState(0)

  useEffect(() => {
    setEpoch(0)
    setGpuUtil(0)
    // GPU util ramp
    const gId = setInterval(() => {
      setGpuUtil(u => { if (u >= 94) { clearInterval(gId); return 94 } return u + 3 })
    }, 30)
    // Epoch counter
    const eId = setInterval(() => {
      setEpoch(e => { if (e >= 50) { clearInterval(eId); return 50 } return e + 1 })
    }, 60)
    return () => { clearInterval(gId); clearInterval(eId) }
  }, [])

  const trainLoss = epoch > 0 ? (0.9 * Math.exp(-0.08 * epoch) + 0.05).toFixed(4) : '—'
  const valLoss   = epoch > 0 ? (0.95 * Math.exp(-0.075 * epoch) + 0.07).toFixed(4) : '—'
  const lr        = '1e-3'
  const pathD = buildLossCurve(epoch)

  return (
    <motion.div
      key="gputrain"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="flex gap-5 items-start justify-center w-full"
    >
      {/* Loss chart window */}
      <div className="rounded-xl overflow-hidden shadow-xl flex-shrink-0" style={{ width: 370, boxShadow: '0 0 32px rgba(217,119,6,0.2)' }}>
        <WindowChrome title={`train.py — epoch ${epoch}/50`} icon={<Cpu className="w-3.5 h-3.5 text-yellow-400" />} />
        <div className="bg-slate-900 px-5 py-4">
          <svg viewBox="0 0 220 100" className="w-full" style={{ height: 110 }}>
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={y * 0.9} x2="220" y2={y * 0.9} stroke="#334155" strokeWidth="0.5" />
            ))}
            {/* Axes labels */}
            <text x="0" y="98" fill="#64748b" fontSize="6">0</text>
            <text x="200" y="98" fill="#64748b" fontSize="6">50 ep</text>
            <text x="-2" y="5" fill="#64748b" fontSize="6">1.0</text>
            <text x="-2" y="94" fill="#64748b" fontSize="6">0.1</text>
            {/* Loss curve */}
            {pathD && (
              <motion.path
                d={pathD}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.05 }}
              />
            )}
          </svg>
          <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
            <span>Training Loss</span>
            <span className="text-yellow-400">{trainLoss}</span>
          </div>
        </div>
      </div>

      {/* Side metrics */}
      <div className="flex flex-col gap-3 flex-shrink-0" style={{ width: 190 }}>
        {/* Epoch badge */}
        <div className="card-light p-3 text-center rounded-xl">
          <div className="text-xs text-slate-500 mb-1">Epoch</div>
          <div className="text-3xl font-black text-amber-500 leading-none">{epoch}</div>
          <div className="text-xs text-slate-400">/ 50</div>
        </div>

        {/* Metrics */}
        <div className="card-light p-3 rounded-xl space-y-1.5 text-xs font-mono">
          <div className="flex justify-between"><span className="text-slate-500">train_loss</span><span className="text-amber-400">{trainLoss}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">val_loss</span><span className="text-cyan-400">{valLoss}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">lr</span><span className="text-slate-300">{lr}</span></div>
        </div>

        {/* GPU bar */}
        <div className="card-light p-3 rounded-xl">
          <div className="flex items-center gap-1.5 mb-2">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-slate-600 font-semibold">GPU Util</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden mb-1">
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${gpuUtil}%`, background: 'linear-gradient(90deg, #d97706, #f59e0b)' }}
              animate={gpuUtil >= 94 ? { opacity: [1, 0.7, 1] } : {}}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
          <div className="text-xs text-amber-600 font-mono text-right">{gpuUtil}%</div>
          <div className="text-xs text-slate-400 mt-1">NVIDIA A100 · CUDA 12.1</div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── ACT 4 — Predicción ───────────────────────────────────────────────────────
const HIST_BARS = [3, 7, 14, 22, 31, 26, 18, 11, 6, 3]

function ActPrediccion() {
  const [stage, setStage] = useState<'request' | 'processing' | 'response'>('request')

  useEffect(() => {
    setStage('request')
    const t1 = setTimeout(() => setStage('processing'), 900)
    const t2 = setTimeout(() => setStage('response'), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      key="prediccion"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="flex gap-5 items-center justify-center w-full"
    >
      {/* HTTP panel */}
      <div className="rounded-xl overflow-hidden shadow-xl flex-shrink-0" style={{ width: 390, boxShadow: '0 0 32px rgba(5,150,105,0.18)' }}>
        <WindowChrome title="HTTP client — taxi-model:v2" icon={<Activity className="w-3.5 h-3.5 text-green-400" />} />
        <div className="bg-slate-900 px-5 py-4 min-h-52 font-mono text-sm space-y-2">
          {/* Request */}
          <div className="text-slate-400 text-xs">Request</div>
          <div className="bg-slate-800 rounded p-3 text-xs">
            <div className="text-green-400 mb-1">POST /predict  HTTP/1.1</div>
            <div className="text-slate-400">Content-Type: application/json</div>
            <div className="text-slate-300 mt-2">{'{'}</div>
            <div className="text-slate-300 pl-4">"dist":    5.2,</div>
            <div className="text-slate-300 pl-4">"hora":    "17:30",</div>
            <div className="text-slate-300 pl-4">"weather": "clear"</div>
            <div className="text-slate-300">{'}'}</div>
          </div>

          {/* Processing */}
          {(stage === 'processing' || stage === 'response') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-cyan-400 font-mono">
              {stage === 'processing' ? (
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
                  ⚙ model processing…
                </motion.span>
              ) : '⚙ model processed in 38ms'}
            </motion.div>
          )}

          {/* Response */}
          {stage === 'response' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-slate-400 text-xs mt-1">Response</div>
              <div className="bg-green-950 border border-green-800 rounded p-3 text-xs mt-1">
                <div className="text-green-400 mb-1">HTTP/1.1 200 OK</div>
                <div className="text-slate-300">{'{'}</div>
                <div className="text-slate-300 pl-4">"tarifa":   <span className="text-yellow-300">12.40</span>,</div>
                <div className="text-slate-300 pl-4">"confianza": <span className="text-green-300">0.94</span>,</div>
                <div className="text-slate-300 pl-4">"latencia":  <span className="text-cyan-300">"38ms"</span></div>
                <div className="text-slate-300">{'}'}</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Histogram side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, type: 'spring', stiffness: 200 }}
        className="card-light p-4 rounded-xl flex-shrink-0"
        style={{ width: 180 }}
      >
        <div className="text-xs text-slate-600 font-semibold mb-3">Distribución tarifas</div>
        <div className="flex items-end gap-1 h-20">
          {HIST_BARS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ background: '#3b82f6', opacity: 0.6 + (h / 31) * 0.4, originY: 1 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2.5 + i * 0.06, duration: 0.3, ease: 'easeOut' }}
            >
              <div style={{ height: `${(h / 31) * 100}%`, minHeight: 2 }} className="w-full bg-blue-500 rounded-t" />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
          <span>$5</span><span>$20</span>
        </div>
        <div className="mt-2 text-xs text-slate-500 text-center">p50: $12.40</div>
      </motion.div>
    </motion.div>
  )
}

// ─── ACT 5 — Registro ─────────────────────────────────────────────────────────
const ARTIFACTS = [
  { name: 'model.pkl',      size: '18 MB', color: '#dbeafe' },
  { name: 'config.yaml',   size: '2.1 KB', color: '#e0e7ff' },
  { name: 'features.json', size: '8.4 KB', color: '#d1fae5' },
]

function ActRegistro() {
  const [filesVisible, setFilesVisible] = useState(0)
  const [cardVisible, setCardVisible] = useState(false)
  const [badgeVisible, setBadgeVisible] = useState(false)

  useEffect(() => {
    setFilesVisible(0)
    setCardVisible(false)
    setBadgeVisible(false)
    let i = 0
    const fId = setInterval(() => {
      i++
      setFilesVisible(i)
      if (i >= ARTIFACTS.length) {
        clearInterval(fId)
        setTimeout(() => setCardVisible(true), 400)
        setTimeout(() => setBadgeVisible(true), 1000)
      }
    }, 350)
    return () => clearInterval(fId)
  }, [])

  return (
    <motion.div
      key="registro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="flex gap-5 items-start justify-center w-full"
    >
      {/* Artifact window */}
      <div className="rounded-xl overflow-hidden shadow-xl flex-shrink-0" style={{ width: 340, boxShadow: '0 0 32px rgba(220,38,38,0.15)' }}>
        <WindowChrome title="artifact-store / taxi-model-v2" icon={<Archive className="w-3.5 h-3.5 text-red-400" />} />
        <div className="bg-slate-900 px-5 py-4 min-h-40">
          <div className="text-xs text-slate-500 mb-3 font-mono">Packaging artifacts…</div>
          <div className="space-y-2">
            {ARTIFACTS.map((art, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={filesVisible > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{ background: art.color + '22', border: `1px solid ${art.color}55` }}
              >
                <Archive className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-slate-300 font-mono text-xs flex-1">{art.name}</span>
                <span className="text-slate-500 text-xs">{art.size}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={filesVisible > i ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 350 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Registry card */}
      <div className="flex flex-col gap-3 flex-shrink-0" style={{ width: 210 }}>
        <AnimatePresence>
          {cardVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220 }}
              className="card-light p-4 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <Archive className="w-4 h-4 text-red-500" />
                <span className="text-slate-700 font-bold text-sm">Model Registry</span>
              </div>
              <div className="bg-red-50 border border-red-200 rounded px-2 py-1 text-red-700 font-mono text-xs font-bold mb-3">
                taxi-model v2.0
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between"><span className="text-slate-500">F1 Score</span><span className="text-slate-700 font-bold">0.94</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Accuracy</span><span className="text-slate-700 font-bold">0.91</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Latency</span><span className="text-slate-700 font-bold">38ms</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {badgeVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260 }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-green-700"
              style={{ background: '#f0fdf4', border: '1.5px solid #86efac' }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
              Desplegado a Producción
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Main slide ────────────────────────────────────────────────────────────────
interface Props { animStep?: number }

export function Slide1_DevOpsCICD({ animStep = 0 }: Props) {
  return (
    <div className="slide-container px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-1">
          El Ciclo de Vida <span className="text-blue-600">DevOps</span>
        </h1>
        <p className="text-slate-500 text-base">Del código al usuario en producción — de forma continua</p>
        {animStep === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-slate-400 text-sm mt-1"
          >
            Presiona{' '}
            <kbd className="bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-xs font-mono">
              espacio
            </kbd>{' '}
            para avanzar
          </motion.p>
        )}
      </motion.div>

      {/* Step pills */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {STEPS.map((step, i) => {
          const isCurrent = animStep === i
          const isPast    = animStep > i
          return (
            <div
              key={i}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500 whitespace-nowrap"
              style={{
                background: isCurrent ? step.color : isPast ? `${step.color}22` : '#f1f5f9',
                color:      isCurrent ? '#fff'       : isPast ? step.color         : '#94a3b8',
                boxShadow:  isCurrent ? `0 0 14px ${step.color}60` : 'none',
              }}
            >
              {isPast ? '✓ ' : ''}{step.label}
            </div>
          )
        })}
      </div>

      {/* Act area */}
      <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {animStep === 0 && <ActCodigo    key="act0" />}
          {animStep === 1 && <ActDockerfile key="act1" />}
          {animStep === 2 && <ActCITests   key="act2" />}
          {animStep === 3 && <ActGPUTrain  key="act3" />}
          {animStep === 4 && <ActPrediccion key="act4" />}
          {animStep === 5 && <ActRegistro  key="act5" />}
        </AnimatePresence>
      </div>
    </div>
  )
}
