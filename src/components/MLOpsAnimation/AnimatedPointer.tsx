import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'

interface AnimatedPointerProps {
  pathD: string
  /** total loop duration in seconds */
  duration: number
  /** called each frame with current progress [0,1] */
  onProgress?: (p: number) => void
  color?: string
  glowColor?: string
  /** delay before starting (seconds) */
  startDelay?: number
}

export function AnimatedPointer({
  pathD,
  duration,
  onProgress,
  color = '#fbbf24',
  glowColor = '#fde68a',
  startDelay = 0,
}: AnimatedPointerProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const progress = useMotionValue(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const startTime = useRef<number | null>(null)
  const started = useRef(false)

  useAnimationFrame((t) => {
    if (!pathRef.current) return
    // enforce start delay
    if (!started.current) {
      if (t / 1000 < startDelay) return
      started.current = true
      startTime.current = t
    }
    const elapsed = (t - (startTime.current ?? t)) / 1000
    const p = (elapsed / duration) % 1
    progress.set(p)
    onProgress?.(p)

    const totalLen = pathRef.current.getTotalLength()
    const point = pathRef.current.getPointAtLength(p * totalLen)
    setPos({ x: point.x, y: point.y })
  })

  const filterId = `ptrGlow_${color.replace('#', '')}`

  return (
    <>
      {/* Invisible path for length measurements */}
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />

      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow ring */}
      <motion.circle
        cx={pos.x}
        cy={pos.y}
        r={10}
        fill={glowColor}
        fillOpacity={0.25}
        animate={{ r: [8, 14, 8], fillOpacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Pointer dot */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={5.5}
        fill={color}
        filter={`url(#${filterId})`}
      />

      {/* Inner bright core */}
      <circle cx={pos.x} cy={pos.y} r={2.5} fill="white" />
    </>
  )
}
