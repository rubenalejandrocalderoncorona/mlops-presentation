import { motion } from 'framer-motion'

interface LoopPathProps {
  d: string
  color1: string
  color2: string
  gradId: string
  /** draw-on delay in seconds */
  delay?: number
}

export function LoopPath({ d, color1, color2, gradId, delay = 0 }: LoopPathProps) {
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={color1} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color2} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut', delay }}
      />
    </>
  )
}
