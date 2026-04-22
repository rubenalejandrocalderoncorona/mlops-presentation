import { motion } from 'framer-motion'
import { slideContent } from '../../data/slideContent'

// ─── Per-system micro-animations ──────────────────────────────────────────────

function FeatureStoreAnim({ color }: { color: string }) {
  // Retail shelf: shelves with feature "products"
  const items = ['dist_norm', 'hora_pico', 'weather', 'traffic']
  return (
    <div className="w-full h-14 flex flex-col justify-end gap-0.5 overflow-hidden">
      {[0, 1].map(row => (
        <div key={row} className="flex gap-1 justify-center">
          {items.slice(row * 2, row * 2 + 2).map((item, i) => (
            <motion.div
              key={item}
              className="px-1.5 py-0.5 rounded text-center"
              style={{ background: `${color}20`, border: `1px solid ${color}50`, fontSize: '7px', color }}
              animate={{ y: [2, -2, 2] }}
              transition={{ duration: 2, repeat: Infinity, delay: (row * 2 + i) * 0.3, ease: 'easeInOut' }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      ))}
      <div className="h-0.5 rounded" style={{ background: `${color}40` }} />
      <div className="text-center" style={{ fontSize: '8px', color: `${color}AA` }}>Feature Store</div>
    </div>
  )
}

function PipelineOrchestratorAnim({ color }: { color: string }) {
  return (
    <div className="w-full h-14 flex items-center justify-center">
      <svg viewBox="0 0 80 40" className="w-full h-full">
        {/* Gear big */}
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '20px 20px' }}>
          <circle cx="20" cy="20" r="10" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
          {[0,60,120,180,240,300].map(a => {
            const r = Math.PI * a / 180
            return <rect key={a} x={20 + 10 * Math.cos(r) - 1.5} y={20 + 10 * Math.sin(r) - 3} width="3" height="6" fill={color} rx="1"
              transform={`rotate(${a} 20 20)`} />
          })}
        </motion.g>
        {/* Gear small */}
        <motion.g animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '44px 20px' }}>
          <circle cx="44" cy="20" r="7" fill={`${color}20`} stroke={color} strokeWidth="1.2" />
          {[0,72,144,216,288].map(a => {
            const r = Math.PI * a / 180
            return <rect key={a} x={44 + 7 * Math.cos(r) - 1} y={20 + 7 * Math.sin(r) - 2} width="2" height="4" fill={color} rx="0.5"
              transform={`rotate(${a} 44 20)`} />
          })}
        </motion.g>
        {/* Flow dots */}
        <motion.circle cx="65" cy="14" r="2" fill={color}
          animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="70" cy="14" r="2" fill={`${color}80`}
          animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
      </svg>
    </div>
  )
}

function ModelRegistryAnim({ color }: { color: string }) {
  const versions = ['v1.0', 'v1.2', 'v2.0', 'v2.1']
  return (
    <div className="w-full h-14 flex flex-col gap-1 justify-center">
      {versions.map((v, i) => (
        <motion.div key={v}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded"
          style={{ background: i === versions.length - 1 ? `${color}25` : `${color}10`, border: `1px solid ${color}${i === versions.length - 1 ? '60' : '30'}` }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === versions.length - 1 ? color : `${color}60` }} />
          <span style={{ fontSize: '8px', color: i === versions.length - 1 ? color : `${color}90`, fontWeight: i === versions.length - 1 ? 'bold' : 'normal' }}>
            {v} {i === versions.length - 1 ? '← activo' : ''}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function ServingLayerAnim({ color }: { color: string }) {
  return (
    <div className="w-full h-14 flex flex-col gap-1.5 justify-center">
      {[
        { req: 'POST /predict', res: '200 OK 38ms', delay: 0 },
        { req: 'POST /predict', res: '200 OK 41ms', delay: 0.8 },
        { req: 'POST /predict', res: '200 OK 35ms', delay: 1.6 },
      ].map((r, i) => (
        <motion.div key={i}
          className="flex items-center justify-between px-1.5 rounded"
          style={{ fontSize: '7px', background: `${color}10`, border: `1px solid ${color}30` }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: r.delay, times: [0, 0.1, 0.85, 1] }}
        >
          <span style={{ color: `${color}CC` }}>{r.req}</span>
          <span className="text-green-600 font-bold">{r.res}</span>
        </motion.div>
      ))}
    </div>
  )
}

function MonitoringAnim({ color }: { color: string }) {
  const pts = [30, 28, 32, 27, 35, 30, 29, 31, 28, 34, 50, 58, 62]
  return (
    <div className="w-full h-14">
      <svg viewBox="0 0 80 40" className="w-full h-full">
        <line x1="4" y1="35" x2="76" y2="35" stroke="#e2e8f0" strokeWidth="0.5" />
        {/* Threshold line */}
        <line x1="4" y1="20" x2="76" y2="20" stroke="#f97316" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="60" y="18" fontSize="4" fill="#f97316">umbral</text>
        {/* Live line */}
        <motion.polyline
          points={pts.map((y, i) => `${5 + i * 5.5},${y}`).join(' ')}
          fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
          animate={{ points: [
            pts.map((y, i) => `${5 + i * 5.5},${y}`).join(' '),
            [28, 32, 27, 31, 33, 29, 31, 28, 32, 55, 60, 65, 68].map((y, i) => `${5 + i * 5.5},${y}`).join(' '),
            pts.map((y, i) => `${5 + i * 5.5},${y}`).join(' '),
          ] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Live dot */}
        <motion.circle cx="71" cy="28" r="2" fill={color}
          animate={{ cy: [28, 65, 28], scale: [1, 1.4, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
      </svg>
    </div>
  )
}

function ExperimentTrackerAnim({ color }: { color: string }) {
  const experiments = [
    { name: 'exp-001', score: 0.72, color: '#94a3b8' },
    { name: 'exp-002', score: 0.81, color: '#94a3b8' },
    { name: 'exp-003 ★', score: 0.94, color },
  ]
  return (
    <div className="w-full h-14 flex flex-col gap-1 justify-center">
      {experiments.map((exp, i) => (
        <motion.div key={exp.name}
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <div className="w-8 text-right" style={{ fontSize: '7px', color: exp.color, fontWeight: i === 2 ? 'bold' : 'normal' }}>
            {exp.name.replace(' ★', '')}
          </div>
          <div className="flex-1 h-2 bg-slate-100 rounded overflow-hidden">
            <motion.div className="h-full rounded"
              style={{ background: exp.color }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: exp.score }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
            />
          </div>
          <span style={{ fontSize: '7px', color: exp.color, fontWeight: i === 2 ? 'bold' : 'normal' }}>
            {(exp.score * 100).toFixed(0)}%
          </span>
        </motion.div>
      ))}
    </div>
  )
}

const systemAnimations: Array<(color: string) => React.ReactNode> = [
  (c) => <FeatureStoreAnim color={c} />,
  (c) => <PipelineOrchestratorAnim color={c} />,
  (c) => <ModelRegistryAnim color={c} />,
  (c) => <ServingLayerAnim color={c} />,
  (c) => <MonitoringAnim color={c} />,
  (c) => <ExperimentTrackerAnim color={c} />,
]

// ─── Main Slide ────────────────────────────────────────────────────────────────

export function Slide6_Independent() {
  const { title, subtitle, systems } = slideContent.slide4

  // Hexagon positions in a 500x500 square SVG
  const size = 500
  const cx = size / 2
  const cy = size / 2
  const R = 175 // radius from center to node center
  const nodeW = 130
  const nodeH = 110

  const positions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180)
    return { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) }
  })

  const connections = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
    [0,3],[1,4],[2,5],
  ]

  return (
    <div className="slide-container px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2"
      >
        <h1 className="text-3xl font-black text-slate-800 mb-1">{title}</h1>
        <p className="text-slate-500">{subtitle}</p>
      </motion.div>

      <div className="relative mx-auto" style={{ width: size, height: size }}>
        {/* SVG connections — square viewBox for no distortion */}
        <svg
          className="absolute inset-0"
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: size, height: size }}
        >
          {connections.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={positions[a].x} y1={positions[a].y}
              x2={positions[b].x} y2={positions[b].y}
              stroke="rgba(99,102,241,0.18)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.7 }}
            />
          ))}

          {/* Animated data packets on edges */}
          {[[0,1],[1,2],[3,4],[5,0]].map(([a, b], i) => (
            <motion.circle
              key={`packet-${i}`}
              r="3"
              fill="#6366f1"
              opacity="0.6"
              animate={{
                cx: [positions[a].x, positions[b].x, positions[a].x],
                cy: [positions[a].y, positions[b].y, positions[a].y],
              }}
              transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
        </svg>

        {/* System nodes */}
        {systems.map((sys, i) => {
          const pos = positions[i]
          return (
            <motion.div
              key={sys.id}
              className="absolute"
              style={{
                left: pos.x - nodeW / 2,
                top: pos.y - nodeH / 2 - 20,
                width: nodeW,
                height: nodeH + 20,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-full rounded-2xl border-2 p-2 cursor-default bg-white overflow-hidden"
                style={{
                  borderColor: `${sys.color}60`,
                  boxShadow: `0 4px 16px ${sys.color}22`,
                  height: nodeH + 20,
                  overflow: 'hidden',
                }}
              >
                <div className="text-center mb-1">
                  <span className="text-slate-800 font-bold leading-tight whitespace-pre-line" style={{ fontSize: '10px' }}>{sys.name}</span>
                </div>
                {systemAnimations[i](sys.color)}
              </div>
            </motion.div>
          )
        })}

        {/* Center hub */}
        <motion.div
          className="absolute"
          style={{ left: cx - 44, top: cy - 44 - 20 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="w-22 h-22 rounded-full flex items-center justify-center text-center shadow-lg glow-blue"
            style={{ width: 88, height: 88, background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            animate={{ boxShadow: ['0 0 16px rgba(59,130,246,0.4)', '0 0 32px rgba(99,102,241,0.6)', '0 0 16px rgba(59,130,246,0.4)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="text-white text-xs font-bold leading-tight px-2">Plataforma<br />MLOps</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
