import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase, BarChart2, Database, FlaskConical, Code2, Server,
} from 'lucide-react'
import { StaggerContainer, staggerItem } from '../animations/AnimationWrappers'

interface Props { animStep?: number }

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase className="w-7 h-7" />,
  'bar-chart': <BarChart2 className="w-7 h-7" />,
  database: <Database className="w-7 h-7" />,
  flask: <FlaskConical className="w-7 h-7" />,
  code: <Code2 className="w-7 h-7" />,
  server: <Server className="w-7 h-7" />,
}

const roles = [
  {
    id: 'product', title: 'Gerente de Producto',
    description: 'Define objetivos de negocio y KPIs del modelo ML.',
    color: '#7c3aed', icon: 'briefcase',
  },
  {
    id: 'analyst', title: 'Analista de Datos',
    description: 'Explora, limpia y analiza datos para encontrar patrones.',
    color: '#d97706', icon: 'bar-chart',
  },
  {
    id: 'data-eng', title: 'Ingeniero de Datos',
    description: 'Construye pipelines de datos y almacenes de características.',
    color: '#0891b2', icon: 'database',
  },
  {
    id: 'scientist', title: 'Científico de Datos',
    description: 'Desarrolla, entrena y evalúa los modelos ML.',
    color: '#059669', icon: 'flask',
  },
  {
    id: 'ml-dev', title: 'Desarrollador ML',
    description: 'Integra los modelos en aplicaciones de producción.',
    color: '#2563eb', icon: 'code',
  },
  {
    id: 'ml-eng', title: 'Ingeniero ML',
    description: 'Despliega, monitorea y mantiene modelos escalables.',
    color: '#dc2626', icon: 'server',
  },
]

// Per-role overlay components
function OverlayProductManager({ color }: { color: string }) {
  const kpis = ['Accuracy: 94%', 'Latencia: 42ms', 'ROI: +28%']
  return (
    <div className="flex flex-col gap-1 w-full">
      {kpis.map((k, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center justify-between px-2 py-1 rounded text-xs font-bold"
          style={{ background: `${color}15`, color }}
        >
          <span>{k.split(':')[0]}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            style={{ color }}
          >
            {k.split(':')[1]}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

function OverlayAnalyst({ color }: { color: string }) {
  const bars = [0.4, 0.75, 0.55, 0.9, 0.6]
  // Sparkline points normalised to SVG viewBox 0 0 50 12
  const sparkPoints = '2,10 10,6 18,8 26,3 34,5 42,2 50,4'
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Histogram */}
      <div className="flex items-end gap-1 h-12 w-full px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{ background: color, transformOrigin: 'bottom' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: h }}
            transition={{ delay: i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      {/* Sparkline */}
      <motion.svg
        viewBox="0 0 50 12"
        className="w-full h-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: bars.length * 0.18 + 0.2, duration: 0.4 }}
        preserveAspectRatio="none"
      >
        <motion.polyline
          points={sparkPoints}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: bars.length * 0.18 + 0.3, duration: 0.8, ease: 'easeInOut' }}
        />
        {/* Trailing dot */}
        <motion.circle
          cx="50" cy="4" r="1.5"
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: bars.length * 0.18 + 1.1, type: 'spring', stiffness: 400 }}
          style={{ transformOrigin: '50px 4px' }}
        />
      </motion.svg>
    </div>
  )
}

function OverlayDataEngineer({ color }: { color: string }) {
  const nodes = ['DB', 'ETL', 'FS']
  // Each segment has 2 dots staggered so motion feels continuous
  const DOT_DURATION = 1.2
  const LOOP_DURATION = DOT_DURATION
  return (
    <div className="flex items-center justify-between px-1 w-full relative">
      {nodes.map((n, i) => {
        // pulse when the dot "arrives": dot travels DOT_DURATION per segment,
        // so node i is hit at roughly i * DOT_DURATION seconds into each loop.
        const pulseDelay = i * DOT_DURATION
        return (
          <div key={i} className="flex items-center" style={{ flex: i < nodes.length - 1 ? '1 1 auto' : '0 0 auto' }}>
            {/* Node box */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, type: 'spring', stiffness: 300 }}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 z-10"
              style={{ background: `${color}20`, color, border: `2px solid ${color}` }}
            >
              {n}
              {/* Pulse ring on arrival */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ border: `2px solid ${color}` }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1.5], opacity: [0, 0.7, 0] }}
                transition={{
                  delay: 0.6 + pulseDelay,
                  duration: 0.45,
                  repeat: Infinity,
                  repeatDelay: nodes.length * DOT_DURATION - 0.45,
                  ease: 'easeOut',
                }}
              />
            </motion.div>

            {/* Connector + travelling dot */}
            {i < nodes.length - 1 && (
              <div className="relative flex-1 mx-1 h-0.5" style={{ background: `${color}40` }}>
                {/* Animated flowing dot */}
                {[0, 1].map((dotIdx) => (
                  <motion.div
                    key={dotIdx}
                    className="absolute top-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      background: color,
                      left: 0,
                    }}
                    initial={{ x: '-50%', opacity: 0 }}
                    animate={{ x: ['−3px', '100%'], opacity: [0, 1, 1, 0] }}
                    transition={{
                      delay: 0.6 + i * DOT_DURATION + dotIdx * (LOOP_DURATION / 2),
                      duration: DOT_DURATION,
                      repeat: Infinity,
                      repeatDelay: nodes.length * DOT_DURATION - DOT_DURATION,
                      ease: 'linear',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function OverlayScientist({ color }: { color: string }) {
  // Mini neural net: 2-3-1
  const layers = [[0, 1], [0, 1, 2], [1]]
  return (
    <svg viewBox="0 0 80 50" className="w-full h-12">
      {/* Connections */}
      {layers[0].map((_, si) =>
        layers[1].map((_, ti) => (
          <motion.line
            key={`${si}-${ti}`}
            x1="15" y1={15 + si * 20}
            x2="40" y2={8 + ti * 17}
            stroke={color} strokeWidth="0.8" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: ti * 0.08, duration: 0.4 }}
          />
        ))
      )}
      {layers[1].map((_, si) =>
        layers[2].map((_, ti) => (
          <motion.line
            key={`h${si}-${ti}`}
            x1="40" y1={8 + si * 17}
            x2="65" y2="25"
            stroke={color} strokeWidth="0.8" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + si * 0.08, duration: 0.4 }}
          />
        ))
      )}
      {/* Nodes */}
      {[15, 35].map((y, i) => (
        <motion.circle key={i} cx="15" cy={y} r="5" fill={color} opacity="0.8"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
          style={{ transformOrigin: `15px ${y}px` }}
        />
      ))}
      {[8, 25, 42].map((y, i) => (
        <motion.circle key={i} cx="40" cy={y} r="5" fill={color} opacity="0.9"
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      <motion.circle cx="65" cy="25" r="5" fill={color}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transformOrigin: '65px 25px' }}
      />
    </svg>
  )
}

function OverlayMLDev({ color }: { color: string }) {
  const stages = ['Ingest', 'Transform', 'Train', 'Serve']
  const STAGE_DELAY = 0.25
  const PACKET_DURATION = 0.35
  return (
    <div className="flex items-center w-full gap-0.5">
      {stages.map((label, i) => (
        <div key={i} className="flex items-center" style={{ flex: i < stages.length - 1 ? '1 1 auto' : '0 0 auto' }}>
          {/* Pipeline node */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * STAGE_DELAY, duration: 0.3, ease: 'easeOut' }}
            className="relative flex-shrink-0 px-1.5 py-1 rounded text-center"
            style={{
              background: `${color}18`,
              border: `1.5px solid ${color}`,
              color,
              fontSize: '0.6rem',
              fontWeight: 700,
              minWidth: 38,
            }}
          >
            {label}
            {/* Highlight flash when packet arrives */}
            <motion.div
              className="absolute inset-0 rounded"
              style={{ background: color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0] }}
              transition={{
                delay: 0.8 + i * PACKET_DURATION,
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: stages.length * PACKET_DURATION + 0.6,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Arrow connector + travelling data packet */}
          {i < stages.length - 1 && (
            <div className="relative flex-1 flex items-center mx-0.5">
              {/* Arrow line */}
              <motion.div
                className="flex-1 h-px"
                style={{ background: `${color}50`, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * STAGE_DELAY + 0.2, duration: 0.2 }}
              />
              {/* Arrowhead */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * STAGE_DELAY + 0.35 }}
                style={{
                  width: 0, height: 0,
                  borderTop: '3px solid transparent',
                  borderBottom: '3px solid transparent',
                  borderLeft: `4px solid ${color}`,
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />
              {/* Data packet dot */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 5, height: 5,
                  background: color,
                  top: '50%',
                  left: 0,
                  translateY: '-50%',
                }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: 0.8 + i * PACKET_DURATION,
                  duration: PACKET_DURATION,
                  repeat: Infinity,
                  repeatDelay: stages.length * PACKET_DURATION + 0.6,
                  ease: 'easeInOut',
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function OverlayMLEngineer({ color }: { color: string }) {
  // Latency wiggle: 8 SVG points along a sine-ish path
  const latencyPoints = '0,8 7,5 14,9 21,4 28,7 35,3 42,6 50,4'
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Server rack — 3 servers */}
      <div className="flex flex-col gap-0.5 w-full">
        {[0, 1, 2].map((si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: si * 0.15, duration: 0.3 }}
            className="flex items-center gap-1.5 px-1.5 py-0.5 rounded"
            style={{ background: `${color}12`, border: `1px solid ${color}30` }}
          >
            {/* Pulsing status dot */}
            <motion.div
              className="rounded-full flex-shrink-0"
              style={{ width: 6, height: 6, background: '#22c55e' }}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: si * 0.45,
                ease: 'easeInOut',
              }}
            />
            <div className="text-xs flex-1" style={{ color, fontSize: '0.6rem', fontWeight: 600 }}>
              srv-{si + 1}
            </div>
            <div className="text-xs font-mono" style={{ color: '#22c55e', fontSize: '0.55rem' }}>
              OK
            </div>
          </motion.div>
        ))}
      </div>

      {/* Realtime latency sparkline */}
      <motion.svg
        viewBox="0 0 50 12"
        className="w-full"
        style={{ height: 16 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}
        preserveAspectRatio="none"
      >
        <motion.polyline
          points={latencyPoints}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.65, duration: 0.9, ease: 'easeInOut' }}
        />
        {/* Continuously wiggling "live" trailing segment */}
        <motion.circle
          cx="50" cy="4" r="1.8"
          fill={color}
          animate={{ cy: [4, 6, 3, 5, 4], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>

      {/* SLA badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 300 }}
        className="self-center px-2 py-0.5 rounded-full text-xs font-black"
        style={{ background: '#22c55e20', color: '#22c55e', border: '1.5px solid #22c55e' }}
      >
        <motion.span
          animate={{ textShadow: ['0 0 0px #22c55e', '0 0 8px #22c55e', '0 0 0px #22c55e'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'inline-block' }}
        >
          SLA 99.9%
        </motion.span>
      </motion.div>
    </div>
  )
}

const overlays: Array<(color: string) => React.ReactNode> = [
  (c) => <OverlayProductManager color={c} />,
  (c) => <OverlayAnalyst color={c} />,
  (c) => <OverlayDataEngineer color={c} />,
  (c) => <OverlayScientist color={c} />,
  (c) => <OverlayMLDev color={c} />,
  (c) => <OverlayMLEngineer color={c} />,
]

export function Slide2_Roles({ animStep = 0 }: Props) {
  const activeIndex = animStep === 0 ? -1 : animStep === 7 ? -2 : animStep - 1
  const allLit = animStep === 7

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Roles en el Ecosistema MLOps</h1>
        <p className="text-slate-500 text-lg">¿Quién hace qué en un equipo de ML moderno?</p>
        {animStep === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-slate-400 text-sm mt-1">
            Presiona <kbd className="bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-xs">espacio</kbd> para explorar cada rol
          </motion.p>
        )}
      </motion.div>

      <StaggerContainer
        staggerDelay={0.1}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
      >
        {roles.map((role, i) => {
          const isActive = activeIndex === i
          const isDimmed = activeIndex >= 0 && !isActive && !allLit

          return (
            <motion.div
              key={role.id}
              variants={staggerItem}
              animate={{
                opacity: isDimmed ? 0.3 : 1,
                scale: isActive ? 1.04 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="relative p-4 rounded-2xl border bg-white cursor-default"
              style={{
                borderColor: isActive || allLit ? role.color : '#dbeafe',
                boxShadow: isActive ? `0 0 22px ${role.color}50` : '0 2px 8px rgba(59,130,246,0.07)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${role.color}18`, color: role.color }}
                >
                  {iconMap[role.icon]}
                </div>
                <h3 className="text-slate-800 font-bold text-sm leading-tight">{role.title}</h3>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed mb-2">{role.description}</p>

              {/* Role-specific animation overlay */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={`overlay-${role.id}`}
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden border-t border-dashed pt-2 mt-2"
                    style={{ borderColor: `${role.color}40` }}
                  >
                    {overlays[i](role.color)}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active glow bar */}
              {(isActive || allLit) && (
                <motion.div
                  layoutId={allLit ? undefined : 'active-bar'}
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: role.color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.div>
          )
        })}
      </StaggerContainer>
    </div>
  )
}
