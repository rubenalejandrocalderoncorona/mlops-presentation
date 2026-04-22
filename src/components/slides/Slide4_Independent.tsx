import { motion } from 'framer-motion'
import { slideContent } from '../../data/slideContent'

export function Slide4_Independent() {
  const { title, subtitle, systems } = slideContent.slide4

  // Hexagon-ish positions for 6 nodes around a center
  const positions = [
    { x: 50, y: 8 },   // top center
    { x: 82, y: 30 },  // top right
    { x: 82, y: 68 },  // bottom right
    { x: 50, y: 88 },  // bottom center
    { x: 18, y: 68 },  // bottom left
    { x: 18, y: 30 },  // top left
  ]

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 3], [1, 4], [2, 5],
  ]

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold text-white mb-1">{title}</h1>
        <p className="text-white/60 text-lg">{subtitle}</p>
      </motion.div>

      <div className="relative mx-auto" style={{ width: 520, height: 400 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {connections.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={positions[a].x}
              y1={positions[a].y}
              x2={positions[b].x}
              y2={positions[b].y}
              stroke="rgba(99,102,241,0.25)"
              strokeWidth="0.4"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.6 }}
            />
          ))}
        </svg>

        {systems.map((sys, i) => {
          const pos = positions[i]
          return (
            <motion.div
              key={sys.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-28 h-20 rounded-2xl border flex flex-col items-center justify-center text-center p-2 hover:scale-105 transition-transform cursor-default"
                style={{
                  background: `${sys.color}18`,
                  borderColor: `${sys.color}70`,
                  boxShadow: `0 0 16px ${sys.color}30`,
                }}
              >
                <span className="text-white font-semibold text-xs leading-tight whitespace-pre-line">{sys.name}</span>
                <span className="text-xs mt-1 font-mono" style={{ color: sys.color, fontSize: '9px' }}>{sys.desc}</span>
              </div>
            </motion.div>
          )
        })}

        {/* Center node */}
        <motion.div
          className="absolute"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600/50 to-purple-600/50 border border-indigo-400/60 flex items-center justify-center text-center glow-blue">
            <span className="text-white text-xs font-bold leading-tight">Plataforma<br />MLOps</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
