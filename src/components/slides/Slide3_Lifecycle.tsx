import { motion } from 'framer-motion'
import { slideContent } from '../../data/slideContent'

const RADIUS = 200
const STEP_RADIUS = 68

export function Slide3_Lifecycle() {
  const { title, subtitle, steps } = slideContent.slide3
  const total = steps.length

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-4xl font-bold text-white mb-1">{title}</h1>
        <p className="text-white/60 text-lg">{subtitle}</p>
      </motion.div>

      <div className="relative mx-auto" style={{ width: RADIUS * 2 + STEP_RADIUS * 2, height: RADIUS * 2 + STEP_RADIUS * 2 }}>
        {/* Center label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600/40 to-cyan-500/40 border border-cyan-500/50 flex items-center justify-center text-center glow-cyan">
            <span className="text-cyan-300 font-bold text-sm leading-tight">Ciclo de<br />Vida ML</span>
          </div>
        </motion.div>

        {/* Rotating ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${RADIUS * 2 + STEP_RADIUS * 2} ${RADIUS * 2 + STEP_RADIUS * 2}`}>
            <circle
              cx={RADIUS + STEP_RADIUS}
              cy={RADIUS + STEP_RADIUS}
              r={RADIUS}
              fill="none"
              stroke="rgba(99,102,241,0.15)"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
          </svg>
        </motion.div>

        {/* Step nodes */}
        {steps.map((step, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2
          const cx = RADIUS + STEP_RADIUS + Math.cos(angle) * RADIUS
          const cy = RADIUS + STEP_RADIUS + Math.sin(angle) * RADIUS
          return (
            <motion.div
              key={step.id}
              className="absolute flex flex-col items-center"
              style={{
                left: cx - STEP_RADIUS,
                top: cy - STEP_RADIUS,
                width: STEP_RADIUS * 2,
                height: STEP_RADIUS * 2,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-full h-full rounded-xl border flex flex-col items-center justify-center text-center p-2 cursor-default hover:scale-110 transition-transform"
                style={{
                  background: `${step.color}18`,
                  borderColor: `${step.color}60`,
                  boxShadow: `0 0 12px ${step.color}30`,
                }}
              >
                <span
                  className="text-xs font-bold mb-0.5"
                  style={{ color: step.color }}
                >
                  {step.id}
                </span>
                <span className="text-white text-xs leading-tight font-medium" style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>
                  {step.label}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
