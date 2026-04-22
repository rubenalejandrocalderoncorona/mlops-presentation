import { motion } from 'framer-motion'
import { slideContent } from '../../data/slideContent'

function CiCdCtStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="grid grid-cols-3 gap-3 w-full max-w-5xl mx-auto mt-6"
    >
      {/* CI */}
      <div className="bg-white border border-blue-200 rounded-xl p-2 flex flex-col gap-1">
        <div className="self-start px-2 py-0.5 rounded-full bg-blue-500 text-white font-bold" style={{ fontSize: '10px' }}>
          CI — Integración Continua
        </div>
        <div className="flex flex-col gap-0.5 mt-0.5">
          {[{ label: 'lint', delay: 0 }, { label: 'test', delay: 0.8 }, { label: 'build', delay: 1.6 }].map(({ label, delay: d }) => (
            <motion.div
              key={label}
              className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-2 py-0.5 text-xs"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, delay: d, repeat: Infinity }}
            >
              <span className="text-blue-500 font-bold">✓</span>
              <span className="text-blue-700">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CD */}
      <div className="bg-white border border-amber-200 rounded-xl p-2 flex flex-col gap-1">
        <div className="self-start px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold" style={{ fontSize: '10px' }}>
          CD — Despliegue Continuo
        </div>
        <div className="grid grid-cols-2 gap-1 mt-1">
          <div className="border border-amber-400 rounded-lg px-1.5 py-1 flex flex-col items-center gap-0.5">
            <span style={{ fontSize: '13px' }}>🔒</span>
            <span className="text-amber-700 font-bold" style={{ fontSize: '9px' }}>Delivery</span>
            <span className="text-slate-500 text-center leading-tight" style={{ fontSize: '9px' }}>Aprobación manual antes de producción</span>
          </div>
          <div className="border border-green-500 rounded-lg px-1.5 py-1 flex flex-col items-center gap-0.5">
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '13px' }}>🚀</motion.span>
            <span className="text-green-700 font-bold" style={{ fontSize: '9px' }}>Deployment</span>
            <span className="text-slate-500 text-center leading-tight" style={{ fontSize: '9px' }}>Automático sin intervención humana</span>
          </div>
        </div>
        <div className="text-center text-slate-400" style={{ fontSize: '8px' }}>← manual gate | auto →</div>
      </div>

      {/* CT */}
      <div className="bg-white border border-green-200 rounded-xl p-2 flex flex-col gap-1">
        <div className="self-start px-2 py-0.5 rounded-full bg-green-600 text-white font-bold" style={{ fontSize: '10px' }}>
          CT — Entrenamiento Continuo
        </div>
        <div className="flex justify-center mt-1">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
              <path d="M12 2 A10 10 0 1 1 4 17" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="4,17 1,13 7,13" fill="#059669" />
            </svg>
          </motion.div>
        </div>
        <div className="flex justify-center">
          <motion.span
            className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-400 text-amber-700 font-bold"
            style={{ fontSize: '9px' }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            Trigger: deriva detectada
          </motion.span>
        </div>
        <p className="text-slate-500 text-center leading-tight" style={{ fontSize: '9px' }}>
          Reentrena automáticamente el modelo cuando el contexto cambia
        </p>
      </div>
    </motion.div>
  )
}

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
        className="text-center mb-6"
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

      <CiCdCtStrip />
    </div>
  )
}
