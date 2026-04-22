import { motion } from 'framer-motion'
import { MLOpsContainer } from '../MLOpsAnimation'

export function SlideDevOpsVsMLOps() {
  return (
    <div className="slide-container bg-[#eef2ff] flex flex-col px-6 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-3 flex-shrink-0"
      >
        <h1 className="text-3xl font-black text-slate-800 mb-0.5">
          MLOps = DataML <span className="text-slate-400 font-light mx-1">+</span> DevOps
        </h1>
        <p className="text-slate-500 text-sm">
          Dos ciclos independientes se fusionan en el ciclo de vida MLOps continuo
        </p>
      </motion.div>

      {/* Animation — fills remaining height */}
      <motion.div
        className="flex-1 min-h-0 w-full max-w-5xl mx-auto flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <MLOpsContainer />
      </motion.div>

      {/* Footer legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="flex-shrink-0 flex gap-3 justify-center mt-2 flex-wrap"
      >
        {[
          { color: '#92400e', bg: '#fef3c7', label: 'Data — recolección y preparación' },
          { color: '#15803d', bg: '#dcfce7', label: 'ML — entrenamiento y evaluación' },
          { color: '#1d4ed8', bg: '#dbeafe', label: 'Dev — código y pruebas' },
          { color: '#b45309', bg: '#fef9c3', label: 'Ops — despliegue y monitoreo' },
        ].map(({ color, bg, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
            style={{ backgroundColor: bg, borderColor: `${color}40` }}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="font-semibold" style={{ fontSize: '10px', color }}>{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
