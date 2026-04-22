import { motion } from 'framer-motion'
import { slideContent } from '../../data/slideContent'

function Pentagon({ color }: { color: string }) {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * (Math.PI / 180)
    return `${50 + 40 * Math.cos(a)},${50 + 40 * Math.sin(a)}`
  }).join(' ')
  return (
    <motion.svg viewBox="0 0 100 100" className="w-full h-full"
      animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
      <polygon points={pts} fill={`${color}18`} stroke={color} strokeWidth="3" />
      <motion.polygon points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="8 4"
        animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '50px 50px' }} />
    </motion.svg>
  )
}

function Triangle({ color }: { color: string }) {
  return (
    <motion.svg viewBox="0 0 100 100" className="w-full h-full"
      animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
      <polygon points="50,10 90,85 10,85" fill={`${color}18`} stroke={color} strokeWidth="3" />
      <motion.polygon points="50,10 90,85 10,85" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4"
        animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '50px 50px' }} />
    </motion.svg>
  )
}

function Diamond({ color }: { color: string }) {
  return (
    <motion.svg viewBox="0 0 100 100" className="w-full h-full"
      animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
      <polygon points="50,10 90,50 50,90 10,50" fill={`${color}18`} stroke={color} strokeWidth="3" />
      <motion.polygon points="50,10 90,50 50,90 10,50" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="7 5"
        animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '50px 50px' }} />
    </motion.svg>
  )
}

const shapeComponents: Record<string, (color: string) => React.ReactNode> = {
  pentagon: (c) => <Pentagon color={c} />,
  triangle: (c) => <Triangle color={c} />,
  diamond: (c) => <Diamond color={c} />,
}

export function Slide7_DevOpsToMLOps() {
  const { title, subtitle, loops } = slideContent.slide5

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-2">{title}</h1>
        <p className="text-slate-500 text-lg">{subtitle}</p>
      </motion.div>

      <div className="flex gap-10 items-center justify-center max-w-5xl mx-auto">
        {loops.map((loop, i) => (
          <motion.div
            key={loop.id}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-44 h-44 relative mb-4">
              {shapeComponents[loop.shape](loop.color)}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-3xl font-black" style={{ color: loop.color }}>
                  {loop.abbr}
                </span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.5 }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: loop.color }}>{loop.label}</h3>
              <p className="text-slate-500 text-sm max-w-48 leading-relaxed">{loop.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
