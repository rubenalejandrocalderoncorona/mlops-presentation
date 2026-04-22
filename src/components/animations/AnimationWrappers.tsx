import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  duration?: number
}

export function FadeIn({ children, delay = 0, duration = 0.5, ...rest }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface SlideUpProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  distance?: number
}

export function SlideUp({ children, delay = 0, distance = 40, ...rest }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -distance / 2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}
