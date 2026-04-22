import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, RefreshCw, Zap, Activity, Database, Server, Eye, RotateCcw } from 'lucide-react'

type PipelineStatus = 'idle' | 'running' | 'predicted' | 'drift' | 'retraining' | 'done'

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

// Animated data packet that travels along the pipeline
function DataPacket({ active, stage }: { active: boolean; stage: number }) {
  if (!active) return null
  const pct = (stage / 4) * 100
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-10"
      style={{ left: `${pct}%` }}
      animate={{ left: [`${pct}%`, `${Math.min(pct + 25, 100)}%`] }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-indigo-500 shadow-lg"
        animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 6px #6366f1', '0 0 16px #6366f1', '0 0 6px #6366f1'] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </motion.div>
  )
}

// Live metric chart
function LiveChart({ color, spike }: { color: string; spike: boolean }) {
  const pts = spike
    ? [30, 28, 32, 27, 35, 30, 55, 65, 70, 68]
    : [30, 28, 32, 27, 35, 30, 29, 31, 28, 30]
  return (
    <svg viewBox="0 0 100 45" className="w-full h-10">
      <line x1="0" y1="40" x2="100" y2="40" stroke="#e2e8f0" strokeWidth="0.5" />
      <line x1="0" y1="20" x2="100" y2="20" stroke={`${color}30`} strokeWidth="0.5" strokeDasharray="3 2" />
      <motion.polyline
        points={pts.map((y, i) => `${i * 11},${y}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={{
          points: [
            pts.map((y, i) => `${i * 11},${y}`).join(' '),
            pts.map((y, i) => `${i * 11},${Math.max(5, y - 2 + Math.random() * 4)}`).join(' '),
          ]
        }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.circle
        cx={pts.length * 11 - 11}
        cy={pts[pts.length - 1]}
        r="2.5"
        fill={color}
        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </svg>
  )
}

interface StageBoxProps {
  label: string
  sublabel: string
  color: string
  active: boolean
  pulsing?: boolean
  alerting?: boolean
  icon: React.ReactNode
  children?: React.ReactNode
}

function StageBox({ label, sublabel, color, active, pulsing, alerting, icon, children }: StageBoxProps) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="rounded-2xl border-2 p-3 bg-white w-full"
        style={{ borderColor: active ? color : `${color}30` }}
        animate={alerting ? {
          borderColor: [color, `${color}80`, color],
          boxShadow: [`0 0 0px ${color}`, `0 0 20px ${color}80`, `0 0 0px ${color}`],
        } : pulsing ? {
          boxShadow: [`0 4px 12px ${color}20`, `0 4px 24px ${color}50`, `0 4px 12px ${color}20`],
        } : {
          boxShadow: active ? `0 4px 16px ${color}30` : 'none',
        }}
        transition={{ duration: 1.2, repeat: (alerting || pulsing) ? Infinity : 0 }}
      >
        <div className="flex items-center gap-1.5 mb-2" style={{ color }}>
          {icon}
          <span className="text-xs font-black">{label}</span>
        </div>
        <div className="text-slate-400" style={{ fontSize: '9px' }}>{sublabel}</div>
        {children && <div className="mt-2">{children}</div>}
      </motion.div>
    </motion.div>
  )
}

// Animated neural network diagram inside "Model" stage
function NeuralNetAnim({ retrain }: { retrain: boolean }) {
  const layers = [[0, 1, 2], [0, 1], [0]]
  const color = retrain ? '#d97706' : '#059669'
  return (
    <svg viewBox="0 0 60 40" className="w-full h-10">
      {/* Connections */}
      {[[0,0],[0,1],[1,0],[1,1],[2,0],[2,1]].map(([li, ni], i) => (
        <motion.line key={i}
          x1={10 + li * 20} y1={8 + ni * 12 + (li === 0 ? 4 : 0)}
          x2={10 + (li + 1) * 20} y2={8 + Math.floor(i / 2) * 12}
          stroke={`${color}40`} strokeWidth="0.8"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      {/* Nodes */}
      {layers.map((nodes, li) =>
        nodes.map((_, ni) => (
          <motion.circle key={`${li}-${ni}`}
            cx={10 + li * 20} cy={10 + ni * 12 + (li === 2 ? 6 : 0)}
            r="4" fill={`${color}20`} stroke={color} strokeWidth="1"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity, delay: (li + ni) * 0.2 }}
            style={{ transformOrigin: `${10 + li * 20}px ${10 + ni * 12}px` }}
          />
        ))
      )}
      {retrain && (
        <motion.text x="36" y="36" fontSize="8" fill={color} fontWeight="bold"
          animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
          CT...
        </motion.text>
      )}
    </svg>
  )
}

// Anomaly scatter overlay
function AnomalyPlot({ show }: { show: boolean }) {
  const normal = [[12, 28], [18, 22], [10, 18], [22, 25], [16, 14], [20, 32]]
  const anomaly = [[50, 10], [55, 16], [48, 8]]
  return (
    <svg viewBox="0 0 70 40" className="w-full h-10">
      {normal.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(99,102,241,0.5)" stroke="#6366f1" strokeWidth="0.5" />
      ))}
      {show && anomaly.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="3"
          fill="rgba(239,68,68,0.6)" stroke="#ef4444" strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
          transition={{ delay: i * 0.3, duration: 0.5 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      {show && (
        <motion.line x1="35" y1="0" x2="35" y2="40"
          stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
      )}
    </svg>
  )
}

export function Slide9_InteractiveDemo() {
  const [status, setStatus] = useState<PipelineStatus>('idle')
  const [marketChanged, setMarketChanged] = useState(false)
  const [retrainingDone, setRetrainingDone] = useState(false)
  const [packetStage, setPacketStage] = useState(0)
  const [showPacket, setShowPacket] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const runPipeline = async () => {
    if (status === 'running') return
    setStatus('running')
    setShowPacket(true)
    setPacketStage(0)
    await delay(600)
    setPacketStage(1)
    await delay(600)
    setPacketStage(2)
    await delay(600)
    setPacketStage(3)
    await delay(600)
    setPacketStage(4)
    await delay(400)
    setShowPacket(false)
    setStatus('predicted')
  }

  const simulateMarket = async () => {
    setMarketChanged(true)
    setStatus('running')
    setShowPacket(true)
    setPacketStage(0)
    await delay(500)
    setPacketStage(1)
    await delay(500)
    setPacketStage(2)
    await delay(500)
    setPacketStage(3)
    await delay(500)
    setPacketStage(4)
    await delay(300)
    setShowPacket(false)
    setStatus('drift')
  }

  const retrain = async () => {
    setStatus('retraining')
    await delay(2800)
    setRetrainingDone(true)
    setStatus('done')
  }

  const reset = () => {
    clearTimer()
    setStatus('idle')
    setMarketChanged(false)
    setRetrainingDone(false)
    setShowPacket(false)
    setPacketStage(0)
  }

  useEffect(() => () => clearTimer(), [])

  const isRunning = status === 'running'
  const hasPrediction = ['predicted', 'drift', 'retraining', 'done'].includes(status)
  const hasDrift = ['drift', 'retraining', 'done'].includes(status)
  const isRetraining = status === 'retraining'
  const isDone = status === 'done'

  const stageActive = (i: number) => {
    if (isRunning) return packetStage >= i
    return hasPrediction
  }

  return (
    <div className="slide-container px-6 py-3 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3"
      >
        <h1 className="text-3xl font-black text-slate-800 mb-0.5">
          Demo: Pipeline MLOps Completo
        </h1>
        <p className="text-slate-500 text-sm">
          Datos crudos → Features → Modelo → Predicción → Monitoreo → CT
        </p>
      </motion.div>

      {/* Market change banner */}
      <AnimatePresence>
        {marketChanged && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2 mx-auto max-w-2xl overflow-hidden"
          >
            <div className="bg-orange-50 border border-orange-300 rounded-xl px-4 py-2 flex items-center gap-3">
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                🚕
              </motion.span>
              <span className="text-orange-700 text-sm font-bold">
                Cambio de Mercado: Combustible +40% — Los precios reales han subido
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline stages */}
      <div className="relative max-w-5xl mx-auto mb-3">
        {/* Connector track */}
        <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-red-200 rounded" />

        {/* Animated packet on track */}
        <AnimatePresence>
          {showPacket && (
            <motion.div
              className="absolute top-7 z-20"
              style={{ left: `${10 + (packetStage / 4) * 80}%` }}
              animate={{ left: `${10 + (Math.min(packetStage + 1, 4) / 4) * 80}%` }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-indigo-500 border-2 border-white shadow-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: ['0 0 6px #6366f180', '0 0 18px #6366f1', '0 0 6px #6366f180'],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-5 gap-3">
          {/* Stage 1: Raw Data */}
          <StageBox
            label="Datos Crudos"
            sublabel="CSV / API / Stream"
            color="#3b82f6"
            active={stageActive(0)}
            pulsing={isRunning && packetStage === 0}
            icon={<Database className="w-4 h-4" />}
          >
            {stageActive(0) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="space-y-0.5 font-mono" style={{ fontSize: '8px' }}>
                {['dist: 5.2km', 'hora: 17:30', 'tarifa: $10'].map((row, i) => (
                  <motion.div key={row} initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded">
                    {row}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </StageBox>

          {/* Stage 2: Feature Store */}
          <StageBox
            label="Feature Store"
            sublabel="Transformaciones"
            color="#7c3aed"
            active={stageActive(1)}
            pulsing={isRunning && packetStage === 1}
            icon={<Zap className="w-4 h-4" />}
          >
            {stageActive(1) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="space-y-0.5 font-mono" style={{ fontSize: '8px' }}>
                {['dist_norm: 0.85', 'hora_pico: 1', 'weather: 0.7'].map((row, i) => (
                  <motion.div key={row} initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded">
                    {row}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </StageBox>

          {/* Stage 3: ML Model */}
          <StageBox
            label="Modelo ML"
            sublabel={isRetraining ? 'Reentrenando (CT)...' : isDone ? 'v2.0 actualizado' : 'v1.0 activo'}
            color={isRetraining ? '#d97706' : '#059669'}
            active={stageActive(2)}
            pulsing={isRetraining}
            icon={<RefreshCw className={`w-4 h-4 ${isRetraining ? 'animate-spin' : ''}`} />}
          >
            {stageActive(2) && <NeuralNetAnim retrain={isRetraining} />}
          </StageBox>

          {/* Stage 4: Prediction */}
          <StageBox
            label="Predicción"
            sublabel={hasDrift ? '⚠ Desactualizada' : 'Resultado del modelo'}
            color={hasDrift ? '#ef4444' : '#0891b2'}
            active={stageActive(3)}
            alerting={hasDrift && !isRetraining && !isDone}
            icon={<Activity className="w-4 h-4" />}
          >
            {stageActive(3) && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                className="text-center py-1 rounded-lg"
                style={{ background: hasDrift && !isDone ? '#fee2e2' : '#d1fae5', border: `1px solid ${hasDrift && !isDone ? '#fca5a5' : '#6ee7b7'}` }}>
                <div className="text-slate-400" style={{ fontSize: '8px' }}>Tarifa estimada</div>
                <div className={`text-lg font-black ${hasDrift && !isDone ? 'text-red-600' : isDone ? 'text-green-600' : 'text-teal-700'}`}>
                  {isDone ? '$15.20' : '$10.00'}
                </div>
                {isDone && <div className="text-green-600 font-bold" style={{ fontSize: '8px' }}>✓ Actualizada</div>}
              </motion.div>
            )}
          </StageBox>

          {/* Stage 5: Monitor */}
          <StageBox
            label="Monitoreo"
            sublabel={hasDrift ? 'Error: +50% ⚠' : 'Métricas OK'}
            color={hasDrift ? '#ef4444' : '#ec4899'}
            active={stageActive(4)}
            alerting={hasDrift && !isDone}
            icon={<Eye className="w-4 h-4" />}
          >
            {stageActive(4) && (
              <>
                <LiveChart color={hasDrift && !isDone ? '#ef4444' : '#ec4899'} spike={hasDrift && !isDone} />
                <AnimatePresence>
                  {hasDrift && !isDone && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="mt-1 text-center rounded px-1 py-0.5 bg-red-50 border border-red-200">
                      <span className="text-red-600 font-bold" style={{ fontSize: '8px' }}>KS-test p&lt;0.05</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnomalyPlot show={hasDrift} />
              </>
            )}
          </StageBox>
        </div>
      </div>

      {/* Drift alert + retrain */}
      <AnimatePresence>
        {hasDrift && !isRetraining && !isDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-3"
          >
            <motion.div
              className="inline-flex flex-col items-center gap-2 bg-red-50 border-2 rounded-2xl px-6 py-3 shadow-lg"
              animate={{ borderColor: ['#ef4444', '#fca5a5', '#ef4444'] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </motion.div>
                <span className="text-red-700 font-black text-base">DERIVA DETECTADA — Error 50% &gt; umbral 10%</span>
              </div>
              <button onClick={retrain}
                className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-colors shadow-md">
                ↻ Activar Entrenamiento Continuo (CT)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRetraining && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center mb-3">
            <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-300 rounded-full px-6 py-2">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <RefreshCw className="w-4 h-4 text-amber-600" />
              </motion.div>
              <span className="text-amber-700 font-bold text-sm">Reentrenando con datos recientes de mercado...</span>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <RefreshCw className="w-4 h-4 text-amber-600" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDone && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-3">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-300 rounded-full px-5 py-2">
              <span className="text-green-700 font-bold">✓ Modelo v2.0 desplegado — Tarifa actualizada: $15.20</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {status === 'idle' && (
          <button onClick={runPipeline}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-md">
            ▶ Ejecutar Pipeline
          </button>
        )}
        {status === 'predicted' && !marketChanged && (
          <button onClick={simulateMarket}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-colors shadow-md">
            ⚠ Simular Cambio de Mercado
          </button>
        )}
        {(isDone || hasDrift) && (
          <button onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm transition-colors">
            <RotateCcw className="w-4 h-4" /> Reiniciar Demo
          </button>
        )}
      </div>

      {/* CI / CD / CT explanation strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-4xl mx-auto mt-4 bg-white rounded-2xl border border-blue-100 shadow-sm p-3"
      >
        <div className="grid grid-cols-3 gap-3">

          {/* CI column */}
          <div className="flex flex-col gap-2">
            <div className="self-start px-3 py-0.5 rounded-full bg-blue-600 text-white text-xs font-black tracking-wide">CI</div>
            <div className="text-slate-500 text-center" style={{ fontSize: '9px' }}>Integración Continua</div>
            <div className="flex flex-col gap-1.5 items-center">
              {[
                { label: 'lint', delay: 0 },
                { label: 'test', delay: 0.6 },
                { label: 'build', delay: 1.2 },
              ].map(({ label, delay: d }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 w-full justify-center"
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: d, times: [0, 0.15, 0.8, 1] }}
                >
                  <motion.span
                    className="text-blue-600 font-black"
                    style={{ fontSize: '11px' }}
                    animate={{ scale: [0.5, 1.3, 1] }}
                    transition={{ duration: 0.35, repeat: Infinity, repeatDelay: 2.4 - 0.35, delay: d }}
                  >
                    ✓
                  </motion.span>
                  <span className="text-blue-700 font-mono" style={{ fontSize: '9px' }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CD column */}
          <div className="flex flex-col gap-2">
            <div className="self-start px-3 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black tracking-wide">CD</div>
            <div className="text-slate-500 text-center" style={{ fontSize: '9px' }}>Entrega / Despliegue Continuo</div>
            <div className="flex flex-col gap-1.5">
              {/* Delivery */}
              <motion.div
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-50 border border-amber-200"
                animate={{ boxShadow: ['0 0 0px #f59e0b00', '0 0 8px #f59e0b60', '0 0 0px #f59e0b00'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <span style={{ fontSize: '13px' }}>🔐</span>
                <div>
                  <div className="text-amber-700 font-bold" style={{ fontSize: '8px' }}>Delivery</div>
                  <div className="text-slate-400 leading-tight" style={{ fontSize: '7px' }}>aprobación manual antes de producción</div>
                </div>
              </motion.div>
              {/* Deployment */}
              <motion.div
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-50 border border-green-200"
                animate={{ boxShadow: ['0 0 0px #22c55e00', '0 0 8px #22c55e60', '0 0 0px #22c55e00'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <motion.span
                  style={{ fontSize: '13px', display: 'inline-block' }}
                  animate={{ y: [-1, -3, -1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🚀
                </motion.span>
                <div>
                  <div className="text-green-700 font-bold" style={{ fontSize: '8px' }}>Deployment</div>
                  <div className="text-slate-400 leading-tight" style={{ fontSize: '7px' }}>automático sin intervención</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CT column */}
          <div className="flex flex-col gap-2">
            <div className="self-start px-3 py-0.5 rounded-full bg-green-600 text-white text-xs font-black tracking-wide">CT</div>
            <div className="text-slate-500 text-center" style={{ fontSize: '9px' }}>Entrenamiento Continuo</div>
            <div className="flex flex-col items-center gap-1.5">
              <svg viewBox="0 0 48 48" className="w-12 h-12">
                <motion.path
                  d="M24 8 A16 16 0 1 1 8 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '24px 24px' }}
                />
                <motion.polygon
                  points="8,24 2,18 14,18"
                  fill="#16a34a"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '24px 24px' }}
                />
              </svg>
              <motion.div
                className="px-2 py-0.5 rounded-lg bg-green-50 border border-green-200 text-center w-full"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <span className="text-green-700 font-bold" style={{ fontSize: '8px' }}>Trigger: drift detectado</span>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
