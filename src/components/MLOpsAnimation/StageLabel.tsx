import { motion } from 'framer-motion'
import type { Stage } from './constants'

interface StageLabelProps {
  stage: Stage
  active: boolean
  /** scale factor from SVG viewBox to rendered size (for font sizing) */
  scale?: number
}

const LOOP_COLOR: Record<Stage['loop'], string> = {
  data: '#92400e',
  ml:   '#15803d',
  dev:  '#1d4ed8',
  ops:  '#b45309',
}

export function StageLabel({ stage, active }: StageLabelProps) {
  const base = LOOP_COLOR[stage.loop]

  return (
    <motion.g>
      {/* Highlight pill behind text when active */}
      {active && (
        <motion.rect
          x={stage.x - 22}
          y={stage.y - 9}
          width={44}
          height={13}
          rx={6}
          fill="#fbbf24"
          fillOpacity={0.85}
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0 }}
          style={{ transformOrigin: `${stage.x}px ${stage.y}px` }}
          transition={{ duration: 0.18 }}
        />
      )}

      {/* Glow ring when active */}
      {active && (
        <motion.circle
          cx={stage.x}
          cy={stage.y}
          r={14}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={1.5}
          initial={{ opacity: 0, r: 8 }}
          animate={{ opacity: [0.7, 0.2, 0.7], r: [12, 18, 12] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      <motion.text
        x={stage.x}
        y={stage.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={active ? 9.5 : 8.5}
        fontWeight={active ? '900' : '700'}
        fill={active ? '#78350f' : base}
        vectorEffect="non-scaling-stroke"
        animate={{
          fill: active ? '#78350f' : base,
          fontSize: active ? 9.5 : 8.5,
        }}
        transition={{ duration: 0.15 }}
      >
        {stage.label}
      </motion.text>
    </motion.g>
  )
}
