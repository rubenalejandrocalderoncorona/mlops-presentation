import { motion } from 'framer-motion'
import { GitBranch, Package, CheckCircle, Cpu, BarChart2, Archive, RefreshCw } from 'lucide-react'
import { slideContent } from '../../data/slideContent'

const iconMap: Record<string, React.ReactNode> = {
  'git-branch': <GitBranch className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  'check-circle': <CheckCircle className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  'bar-chart-2': <BarChart2 className="w-6 h-6" />,
  archive: <Archive className="w-6 h-6" />,
}

// Per-stage annotation chips
const stageAnnotations: Record<string, string> = {
  source: 'git commit',
  build: 'docker build',
  test: '47/47 ✓',
  train: 'epoch 50',
  eval: 'F1: 0.94',
  registry: 'v2.0 tagged',
}

const PIPELINE_STAGES = [
  { label: 'Commit',   color: '#3b82f6', metric: '4 commits/min' },
  { label: 'Build',    color: '#8b5cf6', metric: '1m 42s' },
  { label: 'Test',     color: '#06b6d4', metric: '98.7% pass' },
  { label: 'Train',    color: '#10b981', metric: 'epoch 50/50' },
  { label: 'Eval',     color: '#f59e0b', metric: 'F1: 0.94' },
  { label: 'Registry', color: '#ef4444', metric: 'v2.0 tagged' },
]

function LivePipelineFlow() {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white/80 shadow-sm p-4">
      {/* Top label */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-500"
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">
          Pipeline en acción
        </span>
        <motion.div
          className="w-2 h-2 rounded-full bg-green-500"
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />
      </div>

      {/* Stages + connecting track */}
      <div className="relative mb-4">
        {/* SVG track behind stages */}
        <div className="absolute inset-0 flex items-center pointer-events-none" style={{ top: 14 }}>
          <svg width="100%" height="4" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#3b82f6" />
                <stop offset="20%"  stopColor="#8b5cf6" />
                <stop offset="40%"  stopColor="#06b6d4" />
                <stop offset="60%"  stopColor="#10b981" />
                <stop offset="80%"  stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <line x1="4%" y1="2" x2="96%" y2="2" stroke="url(#trackGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
            {/* 3 animated data packets */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cy={2}
                r={4}
                fill={i === 0 ? '#3b82f6' : i === 1 ? '#10b981' : '#f59e0b'}
                style={{ filter: `drop-shadow(0 0 4px ${i === 0 ? '#3b82f6' : i === 1 ? '#10b981' : '#f59e0b'})` }}
                animate={{ cx: ['-5%' as unknown as number, '105%' as unknown as number] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: i * 1.6 }}
              />
            ))}
          </svg>
        </div>

        {/* Stage boxes */}
        <div className="flex justify-between gap-1">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.label} className="flex flex-col items-center gap-1 flex-1">
              {/* Status dot */}
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color, boxShadow: `0 0 6px ${stage.color}80` }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.28 }}
              />
              {/* Number badge */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-black"
                style={{ backgroundColor: stage.color, fontSize: 10 }}
              >
                {i + 1}
              </div>
              {/* Label */}
              <span className="text-slate-700 font-semibold" style={{ fontSize: 9 }}>
                {stage.label}
              </span>
              {/* Metric */}
              <span className="text-slate-400 font-mono text-center leading-tight" style={{ fontSize: 8 }}>
                {stage.metric}
              </span>
              {/* Progress bar */}
              <div className="w-full rounded-full overflow-hidden" style={{ height: 3, background: `${stage.color}20` }}>
                <motion.div
                  className="h-full rounded-full origin-left"
                  style={{ backgroundColor: stage.color }}
                  animate={{ scaleX: [0, 1, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CI / CD / CT boxes */}
      <div className="flex gap-2">
        {/* CI */}
        <div
          className="flex-1 rounded-xl border-2 px-3 py-2 flex flex-col gap-1"
          style={{ borderColor: '#3b82f640', background: '#3b82f608' }}
        >
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <motion.polyline
                points="2,7 5.5,11 12,3"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
            <span className="text-xs font-black" style={{ color: '#3b82f6' }}>CI</span>
          </div>
          <div className="text-slate-500" style={{ fontSize: '10px' }}>Commit → Build → Test</div>
        </div>

        {/* CD */}
        <div
          className="flex-1 rounded-xl border-2 px-3 py-2 flex flex-col gap-1"
          style={{ borderColor: '#f59e0b40', background: '#f59e0b08' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  style={{ color: '#f59e0b', fontSize: 10, fontWeight: 900 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                >
                  {'>'}
                </motion.span>
              ))}
            </div>
            <span className="text-xs font-black" style={{ color: '#f59e0b' }}>CD</span>
          </div>
          <div className="text-slate-500" style={{ fontSize: '10px' }}>Eval → Registry → Deploy</div>
        </div>

        {/* CT */}
        <div
          className="flex-1 rounded-xl border-2 px-3 py-2 flex flex-col gap-1"
          style={{ borderColor: '#10b98140', background: '#10b98108' }}
        >
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="w-3 h-3" style={{ color: '#10b981' }} />
            </motion.div>
            <span className="text-xs font-black" style={{ color: '#10b981' }}>CT</span>
          </div>
          <div className="text-slate-500" style={{ fontSize: '10px' }}>Monitor → Drift → Retrain</div>
        </div>
      </div>
    </div>
  )
}

// Animated SVG arrow connector between stage boxes
function ArrowConnector({ color }: { color: string }) {
  return (
    <motion.div
      className="self-start mt-8 mx-1 flex-shrink-0"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.4 }}
    >
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="2" y1="10" x2="22" y2="10"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.polyline
          points="16,4 24,10 16,16"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  )
}

export function Slide8_Development() {
  const { title, subtitle, stages } = slideContent.slide6

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-2">{title}</h1>
        <p className="text-slate-500 text-lg">{subtitle}</p>
      </motion.div>

      {/* Stage pipeline row */}
      <div className="flex items-start justify-center gap-0 max-w-5xl mx-auto flex-wrap mb-6">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex items-start">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon box */}
              <div
                className="w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center bg-white hover:scale-110 transition-transform cursor-default"
                style={{
                  borderColor: stage.color,
                  boxShadow: `0 4px 20px ${stage.color}35`,
                  color: stage.color,
                }}
              >
                {iconMap[stage.icon]}
              </div>

              {/* Stage label */}
              <span className="text-slate-700 text-xs text-center font-medium w-20 leading-tight mt-2">
                {stage.label}
              </span>

              {/* Annotation chip */}
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded-full mt-1"
                style={{
                  background: `${stage.color}25`,
                  color: stage.color,
                }}
              >
                {stageAnnotations[stage.id]}
              </span>

              {/* Pulse dot */}
              <motion.div
                className="w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: stage.color }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.div>

            {i < stages.length - 1 && (
              <ArrowConnector color={stages[i + 1].color} />
            )}
          </div>
        ))}
      </div>

      {/* Live pipeline flow */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <LivePipelineFlow />
      </motion.div>
    </div>
  )
}
