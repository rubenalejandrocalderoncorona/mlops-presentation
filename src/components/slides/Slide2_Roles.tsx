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
  return (
    <div className="flex items-end gap-1 h-14 w-full px-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t"
          style={{ background: color }}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: h }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

function OverlayDataEngineer({ color }: { color: string }) {
  const nodes = ['DB', 'ETL', 'Store']
  return (
    <div className="flex items-center justify-between px-2 w-full">
      {nodes.map((n, i) => (
        <div key={i} className="flex items-center gap-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 300 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ background: `${color}20`, color, border: `2px solid ${color}` }}
          >
            {n}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.2 }}
              className="w-5 h-0.5"
              style={{ background: color, transformOrigin: 'left' }}
            />
          )}
        </div>
      ))}
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
  const code = ['<Predict', '  model="v2"', '  data={x} />', '// ✓ 200 OK']
  return (
    <div className="font-mono text-xs space-y-0.5 w-full">
      {code.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          style={{ color: i === 3 ? '#059669' : color }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  )
}

function OverlayMLEngineer({ color }: { color: string }) {
  const metrics = [1, 0.9, 0.95, 0.85, 1, 0.92]
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-end gap-1 h-8 w-full">
        {metrics.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{ background: v > 0.9 ? '#22c55e' : color }}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: v }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-center font-bold"
        style={{ color }}
      >
        Uptime 99.8% ↑
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
