import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ── Deterministic pseudo-random (no re-render drift) ─────────────────────────
function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

// ── Node positions: brain silhouette point cloud ──────────────────────────────
const NODE_COUNT = 38
const nodeData = (() => {
  const rand = seededRand(42)
  // Brain-shaped distribution: two lobes in an ellipse, y-flipped to sit naturally
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const angle = rand() * Math.PI * 2
    const lobe = i % 2 === 0 ? -0.28 : 0.28   // left / right lobe offset
    const rx = 0.38 + rand() * 0.08
    const ry = 0.30 + rand() * 0.10
    return {
      id: i,
      x: 0.50 + lobe + Math.cos(angle) * rx * (0.5 + rand() * 0.5),
      y: 0.42 + Math.sin(angle) * ry * (0.5 + rand() * 0.5),
      delay: rand() * 2.4,
      pulseSpeed: 1.4 + rand() * 1.8,
      size: 3 + rand() * 4,
    }
  })
})()

// ── Edges: connect nearby nodes ───────────────────────────────────────────────
const EDGE_DIST = 0.22
const edgeData = (() => {
  const edges: { a: number; b: number; delay: number; speed: number }[] = []
  const rand = seededRand(99)
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = nodeData[i].x - nodeData[j].x
      const dy = nodeData[i].y - nodeData[j].y
      if (Math.sqrt(dx * dx + dy * dy) < EDGE_DIST) {
        edges.push({ a: i, b: j, delay: rand() * 3, speed: 2 + rand() * 3 })
      }
    }
  }
  return edges
})()

// ── Pulse that travels along an edge ─────────────────────────────────────────
function EdgePulse({ x1, y1, x2, y2, delay, speed, W, H }: {
  x1: number; y1: number; x2: number; y2: number
  delay: number; speed: number; W: number; H: number
}) {
  return (
    <motion.circle
      r={3}
      fill="#a5b4fc"
      filter="url(#glow)"
      initial={{ opacity: 0 }}
      animate={{
        cx: [x1 * W, x2 * W, x1 * W],
        cy: [y1 * H, y2 * H, y1 * H],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.35, 0.65, 1],
      }}
    />
  )
}

// ── Canvas that draws everything ──────────────────────────────────────────────
function BrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  // We render as SVG so Framer Motion can animate individual elements
  const W = 680
  const H = 420

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-2xl"
        style={{ maxHeight: 340 }}
      >
        <defs>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softglow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="brainBg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow blob */}
        <motion.ellipse
          cx={W * 0.50} cy={H * 0.44} rx={W * 0.42} ry={H * 0.38}
          fill="url(#brainBg)"
          animate={{ rx: [W * 0.40, W * 0.44, W * 0.40], ry: [H * 0.36, H * 0.40, H * 0.36] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Brain outline — two lobes as paths */}
        {[
          // Left lobe
          `M ${W*0.50} ${H*0.62} C ${W*0.48} ${H*0.70} ${W*0.30} ${H*0.72} ${W*0.24} ${H*0.60}
           C ${W*0.14} ${H*0.48} ${W*0.10} ${H*0.28} ${W*0.22} ${H*0.18}
           C ${W*0.30} ${H*0.10} ${W*0.44} ${H*0.12} ${W*0.50} ${H*0.20}`,
          // Right lobe
          `M ${W*0.50} ${H*0.62} C ${W*0.52} ${H*0.70} ${W*0.70} ${H*0.72} ${W*0.76} ${H*0.60}
           C ${W*0.86} ${H*0.48} ${W*0.90} ${H*0.28} ${W*0.78} ${H*0.18}
           C ${W*0.70} ${H*0.10} ${W*0.56} ${H*0.12} ${W*0.50} ${H*0.20}`,
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#818cf8"
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.35}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}

        {/* Circuit edges */}
        {edgeData.map(({ a, b }, i) => {
          const na = nodeData[a], nb = nodeData[b]
          return (
            <motion.line
              key={i}
              x1={na.x * W} y1={na.y * H}
              x2={nb.x * W} y2={nb.y * H}
              stroke="#6366f1"
              strokeWidth={0.8}
              strokeOpacity={0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.025, ease: 'easeOut' }}
            />
          )
        })}

        {/* Pulse signals traveling along edges */}
        {edgeData.map(({ a, b, delay, speed }, i) => {
          const na = nodeData[a], nb = nodeData[b]
          return (
            <EdgePulse
              key={i}
              x1={na.x} y1={na.y}
              x2={nb.x} y2={nb.y}
              delay={delay + 1.5}
              speed={speed}
              W={W} H={H}
            />
          )
        })}

        {/* Nodes */}
        {nodeData.map(({ id, x, y, delay, pulseSpeed, size }) => (
          <motion.g key={id}>
            {/* Outer ring pulse */}
            <motion.circle
              cx={x * W} cy={y * H}
              r={size * 2.2}
              fill="none"
              stroke="#6366f1"
              strokeWidth={0.7}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.6, 0.5] }}
              transition={{ duration: pulseSpeed, delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${x * W}px ${y * H}px` }}
            />
            {/* Core dot */}
            <motion.circle
              cx={x * W} cy={y * H}
              r={size}
              fill="#6366f1"
              fillOpacity={0.7}
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0.6, 1, 0.6] }}
              transition={{
                scale: { duration: 0.5, delay: 0.4 + delay * 0.3 },
                opacity: { duration: pulseSpeed, delay, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{ transformOrigin: `${x * W}px ${y * H}px` }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

// ── Slide ─────────────────────────────────────────────────────────────────────
export function SlideFinal() {
  const textRef = useRef<HTMLDivElement>(null)

  // Typewriter for the tagline
  const tagline = '¿Preguntas?'
  const chars = tagline.split('')

  return (
    <div className="slide-container bg-[#0f0f1a] px-8 relative overflow-hidden">
      {/* Deep background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 45%, #1e1b4b 0%, #0f0f1a 100%)' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Subtle grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#818cf8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center gap-2 w-full max-w-4xl">
        {/* Brain animation */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <BrainCanvas />
        </motion.div>

        {/* Gracias */}
        <motion.div
          className="text-center -mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <h1 className="text-6xl font-black tracking-tight mb-1" style={{
            background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 40%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Gracias
          </h1>

          {/* Typewriter tagline */}
          <div className="text-2xl font-bold text-slate-300 flex justify-center gap-0 mt-0.5">
            {chars.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.07, duration: 0.25 }}
              >
                {c === ' ' ? ' ' : c}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Footer pills */}
        <motion.div
          className="flex gap-3 flex-wrap justify-center mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.6 }}
        >
          {[
            { text: 'MLOps', color: '#6366f1' },
            { text: 'DataML + DevOps', color: '#818cf8' },
            { text: 'CI / CD / CT', color: '#a5b4fc' },
            { text: 'SAP OBS Suite', color: '#c7d2fe' },
          ].map(({ text, color }) => (
            <motion.span
              key={text}
              whileHover={{ scale: 1.06 }}
              className="px-4 py-1.5 rounded-full border text-xs font-black"
              style={{ borderColor: `${color}40`, color, backgroundColor: `${color}12` }}
            >
              {text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
