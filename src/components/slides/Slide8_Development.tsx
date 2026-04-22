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

// Items that float through the conveyor belt
const BELT_ITEMS = [
  { label: 'commit a3f2', color: '#3b82f6', icon: '📝' },
  { label: 'build OK', color: '#8b5cf6', icon: '🔨' },
  { label: 'tests ✓', color: '#06b6d4', icon: '✅' },
  { label: 'train epoch 50', color: '#10b981', icon: '🧠' },
  { label: 'F1: 0.94', color: '#f59e0b', icon: '📊' },
  { label: 'model v2.1', color: '#ef4444', icon: '📦' },
]

function ConveyorBelt() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-blue-100"
      style={{ height: 64, background: 'linear-gradient(90deg, #f0f4ff, #e8edff, #f0f4ff)' }}
    >
      {/* Track lines */}
      <div className="absolute inset-x-0" style={{ top: 10, height: 1, background: 'rgba(99,102,241,0.15)' }} />
      <div className="absolute inset-x-0" style={{ bottom: 10, height: 1, background: 'rgba(99,102,241,0.15)' }} />

      {/* Belt roller left */}
      <div className="absolute left-0 top-0 bottom-0 w-4 flex items-center justify-center"
        style={{ background: 'linear-gradient(90deg, #e8edff, transparent)' }}>
        <motion.div className="w-2 h-12 rounded-full bg-blue-200"
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
      </div>
      {/* Belt roller right */}
      <div className="absolute right-0 top-0 bottom-0 w-4 flex items-center justify-center"
        style={{ background: 'linear-gradient(270deg, #e8edff, transparent)' }}>
        <motion.div className="w-2 h-12 rounded-full bg-blue-200"
          animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
      </div>

      {/* Conveyor items */}
      {BELT_ITEMS.map((item, i) => (
        <motion.div
          key={item.label}
          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold whitespace-nowrap"
          style={{
            background: `${item.color}15`,
            borderColor: `${item.color}40`,
            color: item.color,
          }}
          initial={{ x: '110vw' }}
          animate={{ x: '-20vw' }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
            delay: i * (10 / BELT_ITEMS.length),
          }}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </motion.div>
      ))}

      {/* Scanning line */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.5), transparent)' }}
        animate={{ x: ['10%', '90%', '10%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
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

const CI_CD_CT = [
  {
    key: 'CI',
    label: 'CI',
    title: 'Integración Continua',
    desc: 'Compilación + Pruebas',
    color: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    Icon: GitBranch,
  },
  {
    key: 'CD',
    label: 'CD',
    title: 'Entrega Continua',
    desc: 'Entrenamiento + Evaluación',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    Icon: Package,
  },
  {
    key: 'CT',
    label: 'CT',
    title: 'Entrenamiento Continuo',
    desc: 'Registro + Despliegue',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    Icon: RefreshCw,
  },
]

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

      {/* Looping conveyor belt */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-px bg-blue-100" />
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Pipeline en acción</span>
          <div className="flex-1 h-px bg-blue-100" />
        </div>
        <ConveyorBelt />
      </motion.div>

      {/* CI / CD / CT labeled boxes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-4 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-3 gap-3">
          {CI_CD_CT.map(({ key, label, title: t, desc, color, bg, border, Icon }) => (
            <div
              key={key}
              className="flex items-start gap-3 rounded-xl border px-4 py-3"
              style={{ background: bg, borderColor: border }}
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ background: `${color}20`, color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="text-xs font-black tracking-widest"
                    style={{ color }}
                  >
                    {label}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">{t}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
