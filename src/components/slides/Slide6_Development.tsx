import { motion } from 'framer-motion'
import { GitBranch, Package, CheckCircle, Cpu, BarChart2, Archive, ChevronRight } from 'lucide-react'
import { slideContent } from '../../data/slideContent'

const iconMap: Record<string, React.ReactNode> = {
  'git-branch': <GitBranch className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  'check-circle': <CheckCircle className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  'bar-chart-2': <BarChart2 className="w-6 h-6" />,
  archive: <Archive className="w-6 h-6" />,
}

export function Slide6_Development() {
  const { title, subtitle, stages } = slideContent.slide6

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-white/60 text-lg">{subtitle}</p>
      </motion.div>

      <div className="flex items-center justify-center gap-0 max-w-5xl mx-auto flex-wrap">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex items-center">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center mb-3 hover:scale-110 transition-transform cursor-default"
                style={{
                  background: `${stage.color}20`,
                  borderColor: stage.color,
                  boxShadow: `0 0 20px ${stage.color}40`,
                  color: stage.color,
                }}
              >
                {iconMap[stage.icon]}
              </div>
              <span className="text-white text-xs text-center font-medium w-20 leading-tight">{stage.label}</span>

              {/* Pulse dot */}
              <motion.div
                className="w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: stage.color }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.div>

            {i < stages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                className="mx-2 mb-8"
              >
                <ChevronRight className="w-6 h-6 text-white/30" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex gap-6 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white/60">
          <span className="text-blue-400 font-semibold">CI</span>
          <span>→ compilación + pruebas</span>
          <span className="text-yellow-400 font-semibold">CD</span>
          <span>→ entrenamiento + evaluación</span>
          <span className="text-green-400 font-semibold">CT</span>
          <span>→ registro + despliegue</span>
        </div>
      </motion.div>
    </div>
  )
}
