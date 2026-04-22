import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, RefreshCw, Zap, TrendingUp, Activity } from 'lucide-react'

type PipelineStatus = 'idle' | 'running' | 'predicted' | 'drift' | 'retraining' | 'done'

const RAW_PAYLOAD = {
  usuario_id: 1,
  tarifa: '$10',
  dist: '5km',
  hora: '"17:00"',
}

const FEATURE_PAYLOAD = {
  usuario_id: 1,
  dist_norm: 0.85,
  es_hora_pico: 1,
  dist_km: 5,
}

export function Slide7_InteractiveDemo() {
  const [status, setStatus] = useState<PipelineStatus>('idle')
  const [marketChanged, setMarketChanged] = useState(false)
  const [retrainingDone, setRetrainingDone] = useState(false)

  const runPipeline = async () => {
    if (status === 'running') return
    setStatus('running')
    await delay(2200)
    setStatus('predicted')
  }

  const simulateMarket = async () => {
    setMarketChanged(true)
    setStatus('running')
    await delay(2000)
    setStatus('drift')
  }

  const retrain = async () => {
    setStatus('retraining')
    await delay(2500)
    setRetrainingDone(true)
    setStatus('done')
  }

  const reset = () => {
    setStatus('idle')
    setMarketChanged(false)
    setRetrainingDone(false)
  }

  const showPayload = status !== 'idle'
  const showFeatures = ['predicted', 'drift', 'retraining', 'done'].includes(status) || (status === 'running' && showPayload)
  const showPrediction = ['predicted', 'drift', 'retraining', 'done'].includes(status)
  const showDrift = ['drift', 'retraining', 'done'].includes(status)
  const showRetrain = showDrift

  return (
    <div className="slide-container px-6 py-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          Demo Interactivo: Predicción de Tarifa de Taxi
        </h1>
        <p className="text-white/60 text-base">Pipeline completo: datos → predicción → desviación → reentrenamiento</p>
      </motion.div>

      {/* Market change indicator */}
      <AnimatePresence>
        {marketChanged && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-3 mx-auto max-w-xl bg-orange-900/50 border border-orange-500/60 rounded-lg px-4 py-2 flex items-center gap-3"
          >
            <TrendingUp className="w-5 h-5 text-orange-400 shrink-0" />
            <span className="text-orange-300 text-sm font-medium">
              🚕 Cambio de Mercado Activo: Precio del combustible +40% — Demanda alta
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline */}
      <div className="flex items-start justify-center gap-3 max-w-5xl mx-auto mb-4 flex-wrap">

        {/* Stage 1: Raw Data */}
        <PipelineStage
          label="Datos Crudos"
          color="#3b82f6"
          active={showPayload}
          icon={<Activity className="w-4 h-4" />}
        >
          <DataCard data={RAW_PAYLOAD} color="#3b82f6" visible={showPayload} />
        </PipelineStage>

        <FlowArrow active={showFeatures} />

        {/* Stage 2: Feature Store */}
        <PipelineStage
          label="Almacén de Características"
          color="#8b5cf6"
          active={showFeatures}
          icon={<Zap className="w-4 h-4" />}
        >
          <AnimatePresence mode="wait">
            {showFeatures ? (
              <DataCard key="feat" data={FEATURE_PAYLOAD} color="#8b5cf6" visible={true} transformed />
            ) : (
              <EmptyCard key="empty-feat" />
            )}
          </AnimatePresence>
        </PipelineStage>

        <FlowArrow active={showPrediction} />

        {/* Stage 3: ML Model */}
        <PipelineStage
          label="Modelo ML"
          color="#10b981"
          active={showPrediction}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          <ModelNode active={showPrediction} retraining={status === 'retraining'} done={retrainingDone} />
        </PipelineStage>

        <FlowArrow active={showPrediction} />

        {/* Stage 4: Prediction */}
        <PipelineStage
          label="Predicción"
          color="#06b6d4"
          active={showPrediction}
          icon={<Activity className="w-4 h-4" />}
        >
          <PredictionCard visible={showPrediction} drift={showDrift} />
        </PipelineStage>

        <FlowArrow active={showDrift} up />

        {/* Stage 5: Monitor */}
        <PipelineStage
          label="Monitor de Producción"
          color="#ef4444"
          active={showDrift}
          icon={<AlertTriangle className="w-4 h-4" />}
        >
          <MonitorCard visible={showDrift} />
        </PipelineStage>

      </div>

      {/* Drift Alert */}
      <AnimatePresence>
        {showDrift && status !== 'retraining' && status !== 'done' && (
          <DriftAlert onRetrain={retrain} />
        )}
      </AnimatePresence>

      {/* Retraining animation */}
      <AnimatePresence>
        {status === 'retraining' && <RetrainingBanner />}
      </AnimatePresence>

      {/* Done */}
      <AnimatePresence>
        {status === 'done' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-3"
          >
            <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-500/60 rounded-full px-5 py-2">
              <span className="text-green-400 font-bold">✓ Modelo reentrenado — Tarifa Estimada Actualizada: $15.20</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 flex-wrap mt-2">
        {status === 'idle' && (
          <button
            onClick={runPipeline}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
          >
            ▶ Ejecutar Pipeline
          </button>
        )}

        {status === 'predicted' && (
          <button
            onClick={simulateMarket}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-colors"
          >
            ⚠ Simular Cambio de Mercado
          </button>
        )}

        {(status === 'done' || status === 'drift') && (
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
          >
            ↺ Reiniciar Demo
          </button>
        )}
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

interface PipelineStageProps {
  label: string
  color: string
  active: boolean
  icon: React.ReactNode
  children: React.ReactNode
}

function PipelineStage({ label, color, active, icon, children }: PipelineStageProps) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ opacity: active ? 1 : 0.4 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="w-36 rounded-xl border-2 p-3 min-h-24 flex flex-col items-center gap-2 transition-all"
        style={{
          borderColor: active ? color : `${color}40`,
          background: active ? `${color}18` : `${color}08`,
          boxShadow: active ? `0 0 20px ${color}40` : 'none',
        }}
      >
        <div className="flex items-center gap-1 mb-1" style={{ color }}>
          {icon}
          <span className="text-xs font-bold text-center leading-tight">{label}</span>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </motion.div>
  )
}

function FlowArrow({ active, up = false }: { active: boolean; up?: boolean }) {
  return (
    <motion.div
      className="flex items-center self-center mb-6"
      animate={{ opacity: active ? 1 : 0.2 }}
    >
      <motion.div
        className="w-6 h-0.5 relative"
        style={{ background: active ? 'rgba(99,102,241,0.8)' : 'rgba(99,102,241,0.3)' }}
      >
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400"
          animate={active ? { x: ['-100%', '0%'] } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <div className="w-0 h-0 border-l-4 border-l-indigo-400 border-y-2 border-y-transparent" />
    </motion.div>
  )
}

function DataCard({ data, color, visible, transformed = false }: {
  data: Record<string, unknown>; color: string; visible: boolean; transformed?: boolean
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="rounded-lg p-2 text-xs font-mono space-y-1"
          style={{ background: `${color}15`, border: `1px solid ${color}40` }}
        >
          {Object.entries(data).map(([k, v]) => (
            <motion.div
              key={k}
              initial={transformed ? { backgroundColor: `${color}40` } : {}}
              animate={{ backgroundColor: 'transparent' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="rounded px-1"
            >
              <span style={{ color: `${color}CC` }}>{k}:</span>{' '}
              <span className="text-white/80">{String(v)}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function EmptyCard() {
  return <div className="h-14 rounded-lg border border-dashed border-white/20" />
}

function ModelNode({ active, retraining, done }: { active: boolean; retraining: boolean; done: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-1 py-1"
        >
          <motion.div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: done ? '#10b981' : retraining ? '#f59e0b' : '#10b981',
              background: retraining ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
              boxShadow: retraining ? '0 0 20px rgba(245,158,11,0.5)' : '0 0 20px rgba(16,185,129,0.4)',
            }}
            animate={retraining ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: retraining ? 360 : 0 }}
              transition={{ duration: 1, repeat: retraining ? Infinity : 0, ease: 'linear' }}
            >
              <RefreshCw className="w-5 h-5" style={{ color: retraining ? '#f59e0b' : '#10b981' }} />
            </motion.div>
          </motion.div>
          <span className="text-white/60 text-xs text-center">
            {retraining ? 'Reentrenando...' : done ? 'v2.0 ✓' : 'v1.0'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PredictionCard({ visible, drift }: { visible: boolean; drift: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg p-2 text-center"
          style={{
            background: drift ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
            border: `1px solid ${drift ? 'rgba(239,68,68,0.5)' : 'rgba(16,185,129,0.5)'}`,
          }}
        >
          <div className="text-white/60 text-xs">Tarifa Estimada</div>
          <div className={`text-xl font-black ${drift ? 'text-red-400' : 'text-green-400'}`}>$10.00</div>
          {drift && <div className="text-red-400 text-xs mt-0.5">⚠ Desactualizada</div>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MonitorCard({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-2 space-y-1"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.5)' }}
        >
          <div className="text-xs text-white/70">
            <span className="text-white/40">Predicción:</span>{' '}
            <span className="text-green-400 font-bold">$10.00</span>
          </div>
          <div className="text-xs text-white/70">
            <span className="text-white/40">Real:</span>{' '}
            <span className="text-red-400 font-bold">$15.00</span>
          </div>
          <div className="text-xs text-center mt-1">
            <span className="text-red-400 font-bold">Δ +50%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DriftAlert({ onRetrain }: { onRetrain: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center mb-3"
    >
      <motion.div
        className="inline-flex flex-col items-center gap-2 bg-red-900/60 border-2 border-red-500 rounded-2xl px-6 py-4 glow-red"
        animate={{ borderColor: ['#ef4444', '#fca5a5', '#ef4444'] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </motion.div>
          <span className="text-red-300 font-black text-lg tracking-wider">DESVIACIÓN DETECTADA</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </motion.div>
        </div>
        <span className="text-red-400/80 text-sm">
          Error de predicción: 50% — Umbral superado (máx. 10%)
        </span>
        <button
          onClick={onRetrain}
          className="mt-1 px-5 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-colors"
        >
          ↻ Reentrenar Modelo (CT)
        </button>
      </motion.div>
    </motion.div>
  )
}

function RetrainingBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-center mb-3"
    >
      <div className="inline-flex items-center gap-3 bg-yellow-900/40 border border-yellow-500/60 rounded-full px-6 py-2">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
          <RefreshCw className="w-4 h-4 text-yellow-400" />
        </motion.div>
        <span className="text-yellow-300 font-bold text-sm">
          Reentrenando Modelo (CT) — Incorporando nuevos datos de mercado...
        </span>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
          <RefreshCw className="w-4 h-4 text-yellow-400" />
        </motion.div>
      </div>
    </motion.div>
  )
}
